/**
 * @file sqlWorker.js
 * @description Dedicated Web Worker para ejecución de SQLite WebAssembly (sql.js)
 * Fuera del hilo principal (Main UI Thread) para prevenir bloqueos de interfaz.
 */

import initSqlJs from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { SAMPLE_SCHEMAS } from '../data/schemas/index.js';

let SQL = null;
let db = null;
let currentSchemaId = null;

/**
 * Formatea errores comunes de SQLite para retroalimentación pedagógica.
 */
function formatSqlError(msg) {
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
 * Genera el plan de ejecución conceptual.
 */
function generateExplainPlan(query) {
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

/**
 * Inicializa la instancia WASM de sql.js dentro del Worker.
 */
async function handleInit() {
  if (SQL && db) return { ready: true };

  const initFn = typeof initSqlJs === 'function' ? initSqlJs : (initSqlJs && initSqlJs.default) || self.initSqlJs;
  if (typeof initFn !== 'function') {
    throw new Error('No se encontró la función de inicialización de sql.js WASM en el Worker.');
  }

  const resolvedWasmUrl = sqlWasmUrl || '/sql-wasm.wasm';
  SQL = await initFn({
    locateFile: (file) => (file.endsWith('.wasm') ? resolvedWasmUrl : `/${file}`)
  });

  if (!db) {
    db = new SQL.Database();
  }

  return { ready: true };
}

/**
 * Carga e inicializa el esquema solicitado.
 */
function handleLoadSchema(schemaId = 'universidad') {
  if (!db) {
    throw new Error('El motor SQLite no está inicializado.');
  }

  const schema = SAMPLE_SCHEMAS[schemaId] || SAMPLE_SCHEMAS['universidad'];
  if (!schema) {
    throw new Error(`Esquema '${schemaId}' no encontrado.`);
  }

  try {
    db.close();
    db = new SQL.Database();
    db.exec(schema.sqlSetup);
    currentSchemaId = schema.id;
    return { success: true, schemaId: schema.id };
  } catch (error) {
    throw new Error(`Error en Seeding para esquema '${schemaId}': ${error.message || error}`);
  }
}

/**
 * Ejecuta el script DDL/DML de Seeding en la base de datos actual.
 */
function handleSeed(schemaId = 'universidad') {
  if (!db) {
    throw new Error('El motor SQLite no está inicializado.');
  }

  const schema = SAMPLE_SCHEMAS[schemaId] || SAMPLE_SCHEMAS['universidad'];
  if (!schema) {
    throw new Error(`Esquema '${schemaId}' no encontrado.`);
  }

  try {
    db.exec(schema.sqlSetup);
    currentSchemaId = schema.id;
    return { success: true, schemaId: schema.id };
  } catch (error) {
    throw new Error(`Error en Seeding para esquema '${schemaId}': ${error.message || error}`);
  }
}

/**
 * Ejecuta una consulta SQL en SQLite dentro del Worker.
 */
function handleExecuteQuery(sqlQuery) {
  if (!db) {
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
    const results = db.exec(query);
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
        explainPlan: generateExplainPlan(query),
        currentSchemaId
      };
    }

    const rowsModified = db.getRowsModified();
    return {
      success: true,
      columns: ['Resultado'],
      values: [[`Sentencia ejecutada exitosamente. Filas modificadas: ${rowsModified}`]],
      rowsAffected: rowsModified,
      executionTimeMs,
      explainPlan: generateExplainPlan(query),
      currentSchemaId
    };
  } catch (error) {
    const endTime = performance.now();
    const rawErrorMsg = error ? (error.message || String(error)) : 'Error de sintaxis o ejecución SQL.';
    const formattedError = formatSqlError(rawErrorMsg);

    return {
      success: false,
      columns: [],
      values: [],
      rowsAffected: 0,
      executionTimeMs: parseFloat((endTime - startTime).toFixed(2)),
      error: rawErrorMsg,
      errorDetails: formattedError,
      currentSchemaId
    };
  }
}

// Receptor de eventos del hilo principal
self.onmessage = async (event) => {
  const { id, type, payload } = event.data || {};
  if (!id) return;

  try {
    switch (type) {
      case 'INIT': {
        const res = await handleInit();
        self.postMessage({ id, success: true, data: res });
        break;
      }
      case 'LOAD_SCHEMA': {
        const res = handleLoadSchema(payload?.schemaId);
        self.postMessage({ id, success: true, data: res });
        break;
      }
      case 'SEED': {
        const res = handleSeed(payload?.schemaId);
        self.postMessage({ id, success: true, data: res });
        break;
      }
      case 'EXECUTE_QUERY': {
        const res = handleExecuteQuery(payload?.sqlQuery);
        self.postMessage({ id, success: true, data: res });
        break;
      }
      case 'RESET': {
        const res = handleLoadSchema(currentSchemaId || 'universidad');
        self.postMessage({ id, success: true, data: res });
        break;
      }
      default:
        throw new Error(`Tipo de comando desconocido: ${type}`);
    }
  } catch (err) {
    self.postMessage({
      id,
      success: false,
      error: err.message || String(err)
    });
  }
};
