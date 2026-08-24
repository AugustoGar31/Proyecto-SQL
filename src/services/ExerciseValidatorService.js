/**
 * @file ExerciseValidatorService.js
 * @description Servicio de validación de soluciones para los desafíos y katas SQL.
 * Evalúa resultados mediante comparación de matrices de datos y firmas de tablas.
 */

import { sqlEngine } from './SqlEngineService.js';

export class ExerciseValidatorService {
  /**
   * Valida la solución ingresada por el usuario contra el resultado de la consulta esperada.
   * @param {Object} exercise - Objeto del ejercicio activo.
   * @param {Object} userResult - Resultado obtenido de la consulta ejecutada por el usuario.
   * @returns {Object} EvaluationResult - Resultado detallado con pasante, mensaje y feedback.
   */
  static validate(exercise, userResult) {
    if (!userResult || !userResult.success) {
      return {
        isPassed: false,
        message: 'La consulta contiene errores de sintaxis o ejecución.',
        details: userResult ? userResult.error : 'Sin resultado.'
      };
    }

    try {
      // Ejecutar consulta de referencia esperada
      const expectedResult = sqlEngine.executeQuery(exercise.expectedQuery);

      if (!expectedResult || !expectedResult.success) {
        return {
          isPassed: false,
          message: 'Error interno en la consulta de prueba del ejercicio.',
          details: expectedResult ? expectedResult.error : ''
        };
      }

      // 1. Validar coincidencia de filas devueltas
      const userRows = userResult.values || [];
      const expectedRows = expectedResult.values || [];

      if (userRows.length !== expectedRows.length) {
        return {
          isPassed: false,
          message: `El número de filas retornadas (${userRows.length}) no coincide con el esperado (${expectedRows.length}).`,
          details: 'Verifica los filtros aplicados en el WHERE o agregaciones.'
        };
      }

      // 2. Validar coincidencia del contenido de celdas
      const userStr = JSON.stringify(userRows);
      const expectedStr = JSON.stringify(expectedRows);

      if (userStr !== expectedStr) {
        return {
          isPassed: false,
          message: 'Las filas retornadas no coinciden exactamente con los datos esperados.',
          details: 'Asegúrate de haber seleccionado el orden de columnas y valores requeridos.'
        };
      }

      return {
        isPassed: true,
        message: '🎉 ¡Excelente trabajo! Has resuelto el desafío correctamente.',
        details: 'Tu consulta produjo exactamente los mismos resultados que el Query de referencia.'
      };

    } catch (err) {
      return {
        isPassed: false,
        message: 'Error durante la evaluación de la respuesta.',
        details: err.message
      };
    }
  }
}
