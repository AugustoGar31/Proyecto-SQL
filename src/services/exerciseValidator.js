/**
 * @file exerciseValidator.js
 * @description Servicio de evaluación estricta y comparativa de consultas SQL (Estudiante vs Modelo).
 * Realiza la ejecución y comparación de columnas, filas, ordenamiento, celdas y tipado estricto.
 */

import { sqlEngine } from './sqlEngineService.js';

export class ExerciseValidatorService {
  /**
   * Normaliza una celda preservando el tipado estricto (string vs number vs null vs boolean).
   * @param {*} val - Valor de la celda.
   * @returns {{ type: string, val: * }} Estructura tipada normalizada.
   */
  static normalizeCell(val) {
    if (val === null || val === undefined) {
      return { type: 'null', val: null };
    }
    if (typeof val === 'number') {
      return {
        type: 'number',
        val: Number.isFinite(val) ? Math.round(val * 10000) / 10000 : val
      };
    }
    if (typeof val === 'boolean') {
      return { type: 'boolean', val };
    }
    if (typeof val === 'string') {
      // Tipado estricto: No realizar conversión implícita de "1" a 1
      return { type: 'string', val: val.trim() };
    }
    return { type: typeof val, val: String(val).trim() };
  }

  /**
   * Compara dos resultados de ejecución SQL (User vs Expected).
   * Función pura y síncrona, ideal para tests unitarios y para desacoplar la lógica de comparación.
   * @param {Object} userResult - Resultado de la consulta del usuario.
   * @param {Object} expectedResult - Resultado de la consulta modelo.
   * @param {boolean} requiresOrder - Si true, exige orden estricto de filas.
   * @returns {Object} Resultado de la validación { isPassed, message, details }.
   */
  static compareResults(userResult, expectedResult, requiresOrder = false) {
    if (!userResult || !userResult.success) {
      return {
        isPassed: false,
        message: 'La consulta contiene errores de sintaxis o ejecución.',
        details: userResult ? (userResult.error || 'Error indeterminado en la consulta.') : 'Sin resultado.'
      };
    }

    if (!expectedResult || !expectedResult.success) {
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

    // 1. Comparar cantidad de columnas
    if (userCols.length !== expectedCols.length) {
      return {
        isPassed: false,
        message: `Número de columnas incorrecto. Se esperaban ${expectedCols.length} columna(s), pero tu consulta retornó ${userCols.length}.`,
        details: `Columnas esperadas: [${expectedCols.join(', ')}]. Tu consulta retorna: [${userCols.join(', ')}].`
      };
    }

    // 2. Comparar nombres de columnas (normalización case-insensitive y sin espacios extra)
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

    // 3. Comparar cantidad de filas
    if (userRows.length !== expectedRows.length) {
      return {
        isPassed: false,
        message: `La cantidad de filas (${userRows.length}) no coincide con el resultado esperado (${expectedRows.length} filas).`,
        details: 'Revisa las condiciones del WHERE o las cláusulas de agregación/agrupación (GROUP BY / HAVING).'
      };
    }

    // 4. Normalización de celdas con tipado estricto
    const normUserRows = userRows.map(row => row.map(cell => ExerciseValidatorService.normalizeCell(cell)));
    const normExpRows = expectedRows.map(row => row.map(cell => ExerciseValidatorService.normalizeCell(cell)));

    // 5. Comparación de orden estricto vs orden indistinto (multiset)
    if (requiresOrder) {
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
            message: 'Los valores o el tipado de las filas retornadas no coinciden con los datos modelo.',
            details: 'Revisa las operaciones, tipos de datos retornados o filtros aplicados.'
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
  }

  /**
   * Ejecuta y valida la consulta del estudiante frente a la kata activa de forma asíncrona.
   * @param {Object} exercise - Objeto del ejercicio (contiene expectedQuery o expectedResult).
   * @param {Object|string} studentInput - Objeto resultado de la consulta o string SQL del estudiante.
   * @returns {Promise<Object>} Resultado detallado de la validación.
   */
  static async validate(exercise, studentInput) {
    if (!exercise || (!exercise.expectedQuery && !exercise.expectedResult)) {
      return {
        isPassed: false,
        message: 'Ejercicio no configurado o falta la consulta modelo esperada.',
        details: 'No se encontró la consulta esperada en la definición del ejercicio.'
      };
    }

    try {
      // 1. Obtener resultado del estudiante
      let userResult;
      if (typeof studentInput === 'string') {
        userResult = await sqlEngine.executeQuery(studentInput);
      } else {
        userResult = studentInput;
      }

      // 2. Obtener resultado esperado
      let expectedResult;
      if (exercise.expectedResult) {
        expectedResult = exercise.expectedResult;
      } else {
        expectedResult = await sqlEngine.executeQuery(exercise.expectedQuery);
      }

      // 3. Determinar si exige orden
      const queryToCheck = exercise.expectedQuery || '';
      const requiresOrder = /order\s+by/i.test(queryToCheck);

      return ExerciseValidatorService.compareResults(userResult, expectedResult, requiresOrder);
    } catch (err) {
      console.error('[ExerciseValidator] Error en la evaluación:', err);
      return {
        isPassed: false,
        message: 'Error inesperado durante la evaluación.',
        details: err.message || String(err)
      };
    }
  }
}

export const exerciseValidator = {
  validateExercise: (exercise, result) => ExerciseValidatorService.validate(exercise, result),
  compareResults: (u, e, r) => ExerciseValidatorService.compareResults(u, e, r),
  normalizeCell: (c) => ExerciseValidatorService.normalizeCell(c)
};
