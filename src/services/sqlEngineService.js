/**
 * @file sqlEngineService.js
 * @description Supervisor y Worker Bridge para la ejecución de SQLite WebAssembly en un Web Worker dedicado.
 * Protege el hilo de renderizado de la UI mediante un Watchdog con Timeout (default 3s) y autorecuperación (Self-Healing).
 */

import { handleAITutorError } from '../features/ai-tutor/index.js';
import { SAMPLE_SCHEMAS } from '../data/schemas/index.js';

export class SqlEngineService {
  constructor() {
    this.worker = null;
    this.currentSchemaId = 'universidad';
    this.initPromise = null;
    this._nextRequestId = 1;
    this._pendingRequests = new Map();
    this._isNodeEnv = typeof window === 'undefined' && typeof Worker === 'undefined';
    this._directDb = null;
    this._directSql = null;
  }

  /**
   * Instancia el Web Worker dedicado o prepara el modo de ejecución directa (en Node/Tests).
   * @private
   */
  _spawnWorker() {
    if (this._isNodeEnv || typeof Worker === 'undefined') {
      this._isNodeEnv = true;
      return;
    }

    try {
      this.worker = new Worker(new URL('../workers/sqlWorker.js', import.meta.url), { type: 'module' });

      this.worker.onmessage = (event) => {
        const { id, success, data, error } = event.data || {};
        if (!id || !this._pendingRequests.has(id)) return;

        const { resolve, reject, timerId } = this._pendingRequests.get(id);
        clearTimeout(timerId);
        this._pendingRequests.delete(id);

        if (success) {
          resolve(data);
        } else {
          reject(new Error(error || 'Error desconocido en el Web Worker'));
        }
      };

      this.worker.onerror = (errEvent) => {
        console.error('[SqlEngine Bridge] Error no capturado en Web Worker:', errEvent);
        this._terminateAndRespawnWorker('WORKER_ERROR');
      };
    } catch (err) {
      console.warn('[SqlEngine Bridge] Web Worker no disponible, cambiando a modo directo:', err);
      this._isNodeEnv = true;
    }
  }

  /**
   * Envía un mensaje estructurado al Web Worker con soporte de timeout.
   * @private
   */
  _sendToWorker(type, payload = {}, timeoutMs = 15000) {
    if (!this.worker && !this._isNodeEnv) {
      this._spawnWorker();
    }

    if (this._isNodeEnv) {
      return this._executeDirect(type, payload);
    }

    return new Promise((resolve, reject) => {
      const id = this._nextRequestId++;

      const timerId = setTimeout(() => {
        if (!this._pendingRequests.has(id)) return;
        this._pendingRequests.delete(id);

        if (type === 'EXECUTE_QUERY') {
          // Abortar el worker inmediatamente para matar el bucle infinito
          this._terminateAndRespawnWorker('TIMEOUT');

          const timeoutPayload = {
            success: false,
            columns: [],
            values: [],
            rowsAffected: 0,
            executionTimeMs: timeoutMs,
            error: `⚠️ Tiempo de ejecución excedido (Timeout de ${timeoutMs / 1000}s). La consulta fue abortada por seguridad para evitar el bloqueo del navegador.`,
            errorDetails: {
              rawMessage: `Query execution exceeded timeout limit of ${timeoutMs}ms.`,
              category: 'Timeout de Ejecución (Watchdog)',
              suggestion: 'Tu consulta contiene un bucle recursivo infinito (CTE sin condición de parada) o un producto cartesiano (CROSS JOIN) masivo. Revisa las condiciones de parada o filtrado (WHERE).'
            }
          };

          // Notificar al tutor socrático
          handleAITutorError({
            error: timeoutPayload.error,
            query: payload?.sqlQuery || '',
            schemaId: this.currentSchemaId
          });

          resolve(timeoutPayload);
        } else {
          reject(new Error(`Timeout de ${timeoutMs}ms esperando respuesta del Worker para [${type}]`));
        }
      }, timeoutMs);

      this._pendingRequests.set(id, { resolve, reject, timerId });
      this.worker.postMessage({ id, type, payload });
    });
  }

  /**
   * Mata de forma forzada el Web Worker atascado y regenera una nueva instancia limpia (Self-Healing).
   * @private
   */
  _terminateAndRespawnWorker(reason = 'TIMEOUT') {
    console.warn(`[SqlEngine Watchdog] Terminando worker debido a: ${reason}`);

    if (this.worker) {
      try {
        this.worker.terminate();
      } catch (e) {
        console.error('Error al terminar worker:', e);
      }
      this.worker = null;
    }

    // Cancelar cualquier otra petición pendiente
    for (const [id, req] of this._pendingRequests.entries()) {
      clearTimeout(req.timerId);
      req.resolve({
        success: false,
        columns: [],
        values: [],
        rowsAffected: 0,
        executionTimeMs: 0,
        error: 'Operación cancelada por reinicio del motor SQL.',
        errorDetails: {
          category: 'Worker Reset',
          suggestion: 'Por favor vuelve a ejecutar tu consulta.'
        }
      });
    }
    this._pendingRequests.clear();

    // Reinstanciar worker en segundo plano
    this._spawnWorker();
    this.initPromise = this._sendToWorker('INIT')
      .then(async () => {
        if (this.currentSchemaId) {
          await this._sendToWorker('LOAD_SCHEMA', { schemaId: this.currentSchemaId });
        }
        return true;
      })
      .catch((err) => {
        console.error('[SqlEngine Bridge] Error al autorecuperar Worker:', err);
      });
  }

  /**
   * Fallback de ejecución directa para entornos sin Web Worker (Node / Tests de Vitest).
   * @private
   */
  async _executeDirect(type, payload) {
    if (!this._directSql && type === 'INIT') {
      const initSqlJs = (await import('sql.js')).default;
      this._directSql = await initSqlJs();
      this._directDb = new this._directSql.Database();
      return { ready: true };
    }

    if (!this._directDb) {
      if (!this._directSql) {
        const initSqlJs = (await import('sql.js')).default;
        this._directSql = await initSqlJs();
      }
      this._directDb = new this._directSql.Database();
    }

    switch (type) {
      case 'INIT':
        return { ready: true };
      case 'LOAD_SCHEMA': {
        const schema = SAMPLE_SCHEMAS[payload.schemaId] || SAMPLE_SCHEMAS['universidad'];
        this._directDb.close();
        this._directDb = new this._directSql.Database();
        this._directDb.exec(schema.sqlSetup);
        this.currentSchemaId = schema.id;
        return { success: true, schemaId: schema.id };
      }
      case 'SEED': {
        const schema = SAMPLE_SCHEMAS[payload.schemaId] || SAMPLE_SCHEMAS['universidad'];
        this._directDb.exec(schema.sqlSetup);
        this.currentSchemaId = schema.id;
        return { success: true, schemaId: schema.id };
      }
      case 'EXECUTE_QUERY': {
        const query = (payload.sqlQuery || '').trim();
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
          const results = this._directDb.exec(query);
          const endTime = performance.now();
          const executionTimeMs = parseFloat((endTime - startTime).toFixed(2));
          if (results && results.length > 0) {
            const lastRes = results[results.length - 1];
            return {
              success: true,
              columns: lastRes.columns || [],
              values: lastRes.values || [],
              rowsAffected: lastRes.values ? lastRes.values.length : 0,
              executionTimeMs
            };
          }
          const rowsModified = this._directDb.getRowsModified();
          return {
            success: true,
            columns: ['Resultado'],
            values: [[`Sentencia ejecutada exitosamente. Filas modificadas: ${rowsModified}`]],
            rowsAffected: rowsModified,
            executionTimeMs
          };
        } catch (err) {
          const endTime = performance.now();
          return {
            success: false,
            columns: [],
            values: [],
            rowsAffected: 0,
            executionTimeMs: parseFloat((endTime - startTime).toFixed(2)),
            error: err.message || String(err)
          };
        }
      }
      default:
        return { success: true };
    }
  }

  /**
   * Inicializa la instancia WebAssembly de sql.js en el Web Worker.
   * @returns {Promise<boolean>}
   */
  async initEngine() {
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        await this._sendToWorker('INIT', {}, 10000);
        return true;
      } catch (error) {
        console.error('Error al inicializar el Worker de SQLite WASM:', error);
        this.initPromise = null;
        throw error;
      }
    })();

    return this.initPromise;
  }

  /**
   * Carga e inicializa las tablas DDL y registros DML de un esquema relacional.
   * @param {string} schemaId - Identificador único del esquema ('universidad', 'tienda_online', 'banco')
   */
  async loadSchema(schemaId) {
    await this.initEngine();
    const res = await this._sendToWorker('LOAD_SCHEMA', { schemaId }, 10000);
    this.currentSchemaId = schemaId;
    return res;
  }

  /**
   * Ejecuta la población de datos (Seeding).
   * @param {string} [schemaId='universidad']
   */
  async seedDatabase(schemaId = 'universidad') {
    await this.initEngine();
    const res = await this._sendToWorker('SEED', { schemaId }, 10000);
    this.currentSchemaId = schemaId;
    return res;
  }

  /**
   * Ejecuta sentencias SQL en el Web Worker protegido por Watchdog Timeout.
   * @param {string} sqlQuery - Consulta o script SQL a evaluar.
   * @param {Object} [options]
   * @param {number} [options.timeoutMs=3000] - Tiempo máximo antes de abortar la consulta.
   * @returns {Promise<Object>} Result - Columnas, valores, tiempo y estado.
   */
  async executeQuery(sqlQuery, options = {}) {
    const timeoutMs = options.timeoutMs ?? 3000;
    await this.initEngine();

    const result = await this._sendToWorker('EXECUTE_QUERY', { sqlQuery }, timeoutMs);

    // Integración de tutor IA para errores de sintaxis
    if (!result.success && result.error && !result.error.includes('Timeout')) {
      handleAITutorError({
        error: result.error,
        query: sqlQuery,
        schemaId: this.currentSchemaId
      });
    }

    return result;
  }

  /**
   * Resetea el esquema actual a su estado de fábrica.
   */
  async resetCurrentSchema() {
    return this.loadSchema(this.currentSchemaId);
  }
}

export const sqlEngine = new SqlEngineService();
