/**
 * @file sqlEngineService.js
 * @description Servicio singleton para la inicialización y gestión del motor SQLite WebAssembly (sql.js).
 * Proporciona métodos para ejecución multilineal, inspección de esquemas y planes de ejecución.
 */

import initSqlJs from 'sql.js';
import { SAMPLE_SCHEMAS } from '../data/schemas/index.js';

export class SqlEngineService {
  constructor() {
    this.SQL = null;
    this.db = null;
    this.currentSchemaId = null;
    this.isInitializing = false;
  }

  /**
   * Inicializa la instancia WebAssembly de sql.js localmente.
   * @returns {Promise<boolean>} Devuelve true si la carga del binario WASM fue exitosa.
   */
  async initEngine() {
    if (this.SQL) return true;
    if (this.isInitializing) return false;

    this.isInitializing = true;
    try {
      const initFn = typeof initSqlJs === 'function' ? initSqlJs : (initSqlJs && initSqlJs.default) || window.initSqlJs;
      if (typeof initFn !== 'function') {
        throw new Error('No se encontró la función de inicialización de sql.js WASM.');
      }
      this.SQL = await initFn({
        locateFile: (file) => `/${file}`
      });
      this.db = new this.SQL.Database();
      this.isInitializing = false;
      return true;
    } catch (error) {
      console.error('Error al cargar SQLite WebAssembly:', error);
      this.isInitializing = false;
      throw new Error('No se pudo inicializar el motor SQLite WASM en el navegador.');
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
      this.db.run(schema.sqlSetup);
      this.currentSchemaId = schemaId;
      return true;
    } catch (error) {
      console.error(`Error al cargar el esquema ${schemaId}:`, error);
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
      return {
        success: false,
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: parseFloat((endTime - startTime).toFixed(2)),
        error: error.message || 'Error de sintaxis o ejecución SQL.'
      };
    }
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
