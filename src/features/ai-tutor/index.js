/**
 * @file index.js
 * @description Punto de entrada único (Barrel Export) del módulo aislado NexoSQL AI Tutor.
 * Cualquier componente externo solo debe importar desde aquí.
 * Si en el futuro se elimina la carpeta "ai-tutor", basta con retirar las importaciones de este archivo.
 */

export { AITutorWidget } from './components/AITutorWidget.jsx';
export { OptimizeQueryButton } from './components/OptimizeQueryButton.jsx';
export { useAITutor, emitAITutorAction } from './hooks/useAITutor.js';

/**
 * Función puente para interceptar errores de SQLite y enviarlos al tutor
 */
export function handleAITutorError(arg1, query = '', schemaId = 'universidad') {
  let err = arg1;
  let q = query;
  let s = schemaId;

  if (typeof arg1 === 'object' && arg1 !== null && ('error' in arg1 || 'query' in arg1)) {
    err = arg1.error;
    q = arg1.query || '';
    s = arg1.schemaId || arg1.schema || 'universidad';
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('nexosql:ai-tutor:event', {
        detail: {
          actionType: 'SQL_ERROR',
          payload: { error: err, query: q, schemaId: s },
          timestamp: Date.now()
        }
      })
    );
  }
}

/**
 * Función puente para solicitar optimización socrática de consulta
 * (Se conectará con el SDK de Gemini en la Fase 4)
 */
export function handleAITutorOptimization(query = '', schemaId = 'universidad') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('nexosql:ai-tutor:event', {
        detail: {
          actionType: 'OPTIMIZE_QUERY',
          payload: { query, schemaId },
          timestamp: Date.now()
        }
      })
    );
  }
}
