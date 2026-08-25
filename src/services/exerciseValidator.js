/**
 * @file exerciseValidator.js
 * @description Servicio de evaluación estricta y comparativa de consultas SQL (Estudiante vs Modelo).
 * Realiza la ejecución y comparación de columnas, filas, ordenamiento y celdas.
 */

import { sqlEngine } from './sqlEngineService.js';

export class ExerciseValidatorService {
  /**
   * Ejecuta y compara estrictamente la consulta del estudiante con la consulta modelo esperada.
   * @param {Object} exercise - Objeto del ejercicio activo (contiene expectedQuery).
   * @param {Object|string} studentInput - Objeto resultado de la consulta o string SQL del estudiante.
   * @returns {Object} EvaluationResult - Resultado detallado de la validación.
   */
  static validate(exercise, studentInput) {
    if (!exercise || !exercise.expectedQuery) {
      return {
        isPassed: false,
        message: 'Ejercicio no configurado o falta la consulta modelo esperada.',
        details: 'No se encontró la consulta esperada en la definición del ejercicio.'
      };
    }

    // 1. Obtener resultado del estudiante
    let userResult;
    if (typeof studentInput === 'string') {
      userResult = sqlEngine.executeQuery(studentInput);
    } else {
      userResult = studentInput;
    }

    if (!userResult || !userResult.success) {
      return {
        isPassed: false,
        message: 'La consulta contiene errores de sintaxis o ejecución.',
        details: userResult ? (userResult.error || 'Error indeterminado en la consulta.') : 'Sin resultado.'
      };
    }

    try {
      // 2. Ejecutar la consulta modelo (respuesta correcta de referencia)
      const expectedResult = sqlEngine.executeQuery(exercise.expectedQuery);

      if (!expectedResult || !expectedResult.success) {
        console.error('[ExerciseValidator] Error en la consulta modelo de referencia:', expectedResult?.error);
        return {
          isPassed: false,
          message: 'Error en la consulta modelo de prueba del ejercicio.',
          details: expectedResult ? expectedResult.error : 'No se pudo ejecutar la consulta modelo.'
        };
      }

      const userCols = userResult.columns || [];
      const expectedCols = expectedResult.columns || [];
      const userRows = userResult.values || [];
      const expectedRows = expectedResult.values || [];

      // 3. Comparar cantidad de columnas
      if (userCols.length !== expectedCols.length) {
        return {
          isPassed: false,
          message: `Número de columnas incorrecto. Se esperaban ${expectedCols.length} columna(s), pero tu consulta retornó ${userCols.length}.`,
          details: `Columnas esperadas: [${expectedCols.join(', ')}]. Tu consulta retorna: [${userCols.join(', ')}].`
        };
      }

      // 4. Comparar nombres de columnas (normalización case-insensitive y sin espacios extra)
      const normUserCols = userCols.map(c => String(c).trim().toLowerCase());
      const normExpCols = expectedCols.map(c => String(c).trim().toLowerCase());
      const colsMatch = normUserCols.every((col, idx) => col === normExpCols[idx]);

      if (!colsMatch) {
        return {
          isPassed: false,
          message: 'Los nombres o el orden de las columnas no coinciden con la respuesta esperada.',
          details: `Se esperaba: [${expectedCols.join(', ')}]. Tu consulta retorna: [${userCols.join(', ')}].`
        };
      }

      // 5. Comparar cantidad de filas
      if (userRows.length !== expectedRows.length) {
        return {
          isPassed: false,
          message: `La cantidad de filas (${userRows.length}) no coincide con el resultado esperado (${expectedRows.length} filas).`,
          details: 'Revisa las condiciones del WHERE o las cláusulas de agregación/agrupación (GROUP BY / HAVING).'
        };
      }

      // 6. Normalización de celdas y comparación de valores
      const normalizeCell = (val) => {
        if (val === null || val === undefined) return '__NULL__';
        if (typeof val === 'number') return Math.round(val * 10000) / 10000;
        if (typeof val === 'string' && !isNaN(Number(val)) && val.trim() !== '') {
          const num = Number(val);
          if (Number.isFinite(num)) return Math.round(num * 10000) / 10000;
        }
        return String(val).trim();
      };

      const normUserRows = userRows.map(row => row.map(normalizeCell));
      const normExpRows = expectedRows.map(row => row.map(normalizeCell));

      // Determinar si la consulta requiere un orden específico (ORDER BY)
      const requiresOrder = /order\s+by/i.test(exercise.expectedQuery);

      if (requiresOrder) {
        // Comparación estricta en el orden exacto de filas
        for (let i = 0; i < normExpRows.length; i++) {
          const userRowStr = JSON.stringify(normUserRows[i]);
          const expRowStr = JSON.stringify(normExpRows[i]);
          if (userRowStr !== expRowStr) {
            return {
              isPassed: false,
              message: `El contenido o el orden de la fila ${i + 1} no coincide con el modelo esperado.`,
              details: `Fila esperada: ${JSON.stringify(expectedRows[i])}. Tu fila: ${JSON.stringify(userRows[i])}. Recuerda aplicar ORDER BY.`
            };
          }
        }
      } else {
        // Comparación multiset (las mismas filas independientemente del orden)
        const serializeRow = r => JSON.stringify(r);
        const userRowMap = new Map();
        normUserRows.forEach(r => {
          const key = serializeRow(r);
          userRowMap.set(key, (userRowMap.get(key) || 0) + 1);
        });

        for (const expRow of normExpRows) {
          const key = serializeRow(expRow);
          const count = userRowMap.get(key);
          if (!count || count <= 0) {
            return {
              isPassed: false,
              message: 'Los valores de las filas retornadas no coinciden exactamente con los datos modelo.',
              details: 'Revisa las operaciones, cálculos o filtros aplicados.'
            };
          }
          userRowMap.set(key, count - 1);
        }
      }

      return {
        isPassed: true,
        message: '🎉 ¡Excelente trabajo! Tu consulta ha sido validada con éxito.',
        details: 'Los datos, columnas y filas coinciden 100% con la respuesta modelo.'
      };

    } catch (err) {
      console.error('[ExerciseValidator] Error en la evaluación:', err);
      return {
        isPassed: false,
        message: 'Error inesperado durante la evaluación.',
        details: err.message
      };
    }
  }
}

export const exerciseValidator = {
  validateExercise: (exercise, result) => ExerciseValidatorService.validate(exercise, result)
};
