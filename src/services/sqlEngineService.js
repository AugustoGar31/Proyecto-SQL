/**
 * @file sqlEngineService.js
 * @description Servicio singleton para la inicialización y gestión del motor SQLite WebAssembly (sql.js).
 * Proporciona métodos para ejecución multilineal, inspección de esquemas y planes de ejecución.
 */

import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { SAMPLE_SCHEMAS } from '../data/schemas/index.js';
import { handleAITutorError } from '../features/ai-tutor/index.js';

export class SqlEngineService {
  constructor() {
    this.SQL = null;
    this.db = null;
    this.currentSchemaId = null;
    this.initPromise = null;
  }

  /**
   * Inicializa la instancia WebAssembly de sql.js localmente.
   * Garantiza la ejecución asíncrona única mediante initPromise.
   * @returns {Promise<boolean>} Devuelve true si la carga del binario WASM fue exitosa.
   */
  async initEngine() {
    if (this.SQL && this.db) return true;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        const initFn = typeof initSqlJs === 'function' ? initSqlJs : (initSqlJs && initSqlJs.default) || window.initSqlJs;
        if (typeof initFn !== 'function') {
          throw new Error('No se encontró la función de inicialización de sql.js WASM.');
        }

        const resolvedWasmUrl = sqlWasmUrl || '/sql-wasm.wasm';

        this.SQL = await initFn({
          locateFile: (file) => (file.endsWith('.wasm') ? resolvedWasmUrl : `/${file}`)
        });

        if (!this.db) {
          this.db = new this.SQL.Database();
        }
        return true;
      } catch (error) {
        console.error('Error al cargar SQLite WebAssembly:', error);
        this.initPromise = null;
        throw new Error(`No se pudo inicializar el motor SQLite WASM: ${error.message || error}`);
      }
    })();

    return this.initPromise;
  }

  /**
   * Ejecuta la población de datos (Seeding) ejecutando el DDL (CREATE TABLE) y DML (INSERT).
   * Usa db.exec() para procesar múltiples sentencias SQL en un solo script.
   * @param {string} [schemaId='universidad'] - Identificador único del esquema.
   * @returns {boolean} True si la población fue exitosa.
   */
  seedDatabase(schemaId = 'universidad') {
    if (!this.db) {
      throw new Error('El motor SQL no está inicializado.');
    }

    const schema = SAMPLE_SCHEMAS[schemaId] || SAMPLE_SCHEMAS['universidad'];
    if (!schema) {
      throw new Error(`Esquema '${schemaId}' no encontrado.`);
    }

    try {
      // Importante: db.exec ejecuta todo el script (múltiples sentencias separadas por punto y coma),
      // a diferencia de db.run que solo ejecuta la primera sentencia del string.
      this.db.exec(schema.sqlSetup);
      this.currentSchemaId = schema.id;
      return true;
    } catch (error) {
      console.error(`[SQL Engine] Error al poblar (seed) el esquema '${schemaId}':`, error);
      throw new Error(`Error en Seeding para esquema '${schemaId}': ${error.message}`);
    }
  }

  /**
   * Carga e inicializa las tablas DDL y registros DML de un esquema relacional.
   * @param {string} schemaId - Identificador único del esquema ('universidad', 'tienda_online', 'banco')
   */
  loadSchema(schemaId) {
    if (!this.db) {
      throw new Error('El motor SQL no está inicializado.');
    }

    const schema = SAMPLE_SCHEMAS[schemaId];
    if (!schema) {
      throw new Error(`Esquema '${schemaId}' no encontrado.`);
    }

    try {
      this.db.close();
      this.db = new this.SQL.Database();
      return this.seedDatabase(schemaId);
    } catch (error) {
      console.error(`Error al cambiar esquema de BD:`, error);
      throw error;
    }
  }

  /**
   * Ejecuta sentencias SQL arbitrarias y calcula el tiempo de respuesta.
   * @param {string} sqlQuery - Consulta o script SQL a evaluar.
   * @returns {Object} Result - Objeto estructurado con columnas, valores y tiempo de latencia.
   */
  executeQuery(sqlQuery) {
    if (!this.db) {
      return {
        success: false,
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: 0,
        error: 'El motor SQL no está listo.'
      };
    }

    const query = sqlQuery ? sqlQuery.trim() : '';
    if (!query) {
      return {
        success: false,
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: 0,
        error: 'La consulta ingresada está vacía.'
      };
    }

    const startTime = performance.now();
    try {
      const results = this.db.exec(query);
      const endTime = performance.now();
      const executionTimeMs = parseFloat((endTime - startTime).toFixed(2));

      if (results && results.length > 0) {
        const lastRes = results[results.length - 1];
        return {
          success: true,
          columns: lastRes.columns || [],
          values: lastRes.values || [],
          rowsAffected: lastRes.values ? lastRes.values.length : 0,
          executionTimeMs,
          explainPlan: this._generateExplainPlan(query)
        };
      }

      const rowsModified = this.db.getRowsModified();
      return {
        success: true,
        columns: ['Resultado'],
        values: [[`Sentencia ejecutada exitosamente. Filas modificadas: ${rowsModified}`]],
        rowsAffected: rowsModified,
        executionTimeMs,
        explainPlan: this._generateExplainPlan(query)
      };

    } catch (error) {
      const endTime = performance.now();
      const rawErrorMsg = error ? (error.message || String(error)) : 'Error de sintaxis o ejecución SQL.';
      const formattedError = this._formatSqlError(rawErrorMsg);

      // Notificación desacoplada al tutor socrático en segundo plano
      handleAITutorError({ error: rawErrorMsg, query, schemaId: this.currentSchemaId });

      return {
        success: false,
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: parseFloat((endTime - startTime).toFixed(2)),
        error: rawErrorMsg,
        errorDetails: formattedError
      };
    }
  }

  /**
   * Analiza el mensaje de error de SQLite y genera retroalimentación amigable para estudiantes.
   * @private
   */
  _formatSqlError(msg) {
    const rawMsg = msg || 'Error de sintaxis o ejecución SQL desconocido.';
    let category = 'Error de Ejecución SQL';
    let suggestion = 'Verifica la estructura sintáctica de tu consulta SQL.';

    if (/no such table/i.test(rawMsg)) {
      category = 'Tabla No Encontrada';
      suggestion = 'La tabla consultada no existe en la base de datos activa. Revisa el diagrama ERD o el nombre exacto de la tabla.';
    } else if (/no such column/i.test(rawMsg)) {
      category = 'Columna No Encontrada';
      suggestion = 'Revisa que la columna pertenezca a la tabla especificada y no tenga errores tipográficos.';
    } else if (/syntax error/i.test(rawMsg)) {
      category = 'Error de Sintaxis SQL';
      suggestion = 'Comprueba si faltan comas entre columnas, si hay comillas no cerradas o si escribiste mal las palabras clave (SELECT, FROM, WHERE).';
    } else if (/ambiguous column name/i.test(rawMsg)) {
      category = 'Columna Ambigua';
      suggestion = 'La columna existe en múltiples tablas unidas mediante JOIN. Antepón el nombre de la tabla (ej. estudiantes.nombre).';
    } else if (/constraint failed/i.test(rawMsg)) {
      category = 'Violación de Restricción';
      suggestion = 'La operación infringe una regla de integridad (NOT NULL, UNIQUE, CHECK o FOREIGN KEY).';
    }

    return {
      rawMessage: rawMsg,
      category,
      suggestion
    };
  }

  /**
   * Genera el análisis del Plan de Ejecución conceptual.
   * @private
   * @param {string} query - Consulta SQL.
   * @returns {string[]} Pasos de ejecución.
   */
  _generateExplainPlan(query) {
    const q = query.toUpperCase();
    const plan = [];

    if (q.includes('SELECT')) {
      plan.push('1. [PARSER]: Análisis sintáctico y semántico del arbol AST (Abstract Syntax Tree).');
      if (q.includes('WHERE')) {
        plan.push('2. [FILTER]: Aplicación del predicado booleano en la etapa de escaneo.');
      } else {
        plan.push('2. [FULL SCAN]: Búsqueda secuencial exhaustiva en páginas de datos.');
      }
      if (q.includes('JOIN')) {
        plan.push('3. [JOIN ENGINE]: Evaluación de claves mediante Hash Join / Nested Loop.');
      }
      if (q.includes('GROUP BY')) {
        plan.push('4. [AGGREGATE]: Agrupamiento en Hash Aggregate Table y cálculo de funciones vectoriales.');
      }
      if (q.includes('ORDER BY')) {
        plan.push('5. [SORT]: Ordenamiento final en el Sort Buffer.');
      }
    } else if (q.includes('CREATE TRIGGER')) {
      plan.push('1. [CATALOG]: Registro de hooks en sqlite_master.');
    } else if (q.includes('BEGIN') || q.includes('COMMIT')) {
      plan.push('1. [WAL LOG]: Apertura/Cierre del diario de registro Write-Ahead Logging.');
    } else {
      plan.push('1. [EXECUTE]: Modificación directa de páginas B-Tree.');
    }

    return plan;
  }
}

export const sqlEngine = new SqlEngineService();
