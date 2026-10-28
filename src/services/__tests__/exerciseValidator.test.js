/**
 * @file exerciseValidator.test.js
 * @description Suite completa de pruebas unitarias para el motor evaluador de katas (ExerciseValidatorService).
 * Cubre matrices, orden indistinto (multiset), orden estricto, NULLs vs 0 vs "", tipado estricto y resiliencia.
 */

import { describe, it, expect } from 'vitest';
import { ExerciseValidatorService } from '../exerciseValidator.js';

describe('ExerciseValidatorService - Suite de Pruebas Unitarias', () => {

  describe('Grupo 1: Matrices y Dimensiones (Columnas y Filas)', () => {
    it('TC-01: Debe aprobar cuando las columnas y filas coinciden exactamente', () => {
      const userResult = {
        success: true,
        columns: ['id', 'nombre'],
        values: [[1, 'Ana'], [2, 'Carlos']]
      };
      const expectedResult = {
        success: true,
        columns: ['id', 'nombre'],
        values: [[1, 'Ana'], [2, 'Carlos']]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(true);
      expect(result.message).toContain('¡Excelente trabajo!');
    });

    it('TC-02: Debe fallar con mensaje claro si la cantidad de columnas es diferente', () => {
      const userResult = {
        success: true,
        columns: ['id', 'nombre'],
        values: [[1, 'Ana']]
      };
      const expectedResult = {
        success: true,
        columns: ['id', 'nombre', 'edad'],
        values: [[1, 'Ana', 20]]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(false);
      expect(result.message).toContain('Número de columnas incorrecto');
      expect(result.details).toContain('Columnas esperadas: [id, nombre, edad]');
    });

    it('TC-03: Debe ser tolerante a mayúsculas/minúsculas y espacios en los encabezados de columna', () => {
      const userResult = {
        success: true,
        columns: ['  ID ', 'NOMBRE'],
        values: [[1, 'Lucia']]
      };
      const expectedResult = {
        success: true,
        columns: ['id', 'nombre'],
        values: [[1, 'Lucia']]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(true);
    });

    it('TC-04: Debe fallar si la cantidad de filas no coincide', () => {
      const userResult = {
        success: true,
        columns: ['id'],
        values: [[1]]
      };
      const expectedResult = {
        success: true,
        columns: ['id'],
        values: [[1], [2]]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(false);
      expect(result.message).toContain('La cantidad de filas (1) no coincide con el resultado esperado (2 filas)');
    });
  });

  describe('Grupo 2: Orden Indistinto vs Orden Estricto (Cláusula ORDER BY)', () => {
    it('TC-05 [Orden Indistinto]: Debe aprobar aunque las filas vengan en diferente orden cuando no se exige ORDER BY', () => {
      const userResult = {
        success: true,
        columns: ['id', 'ciudad'],
        values: [
          [2, 'Bogota'],
          [1, 'Buenos Aires'],
          [3, 'Madrid']
        ]
      };
      const expectedResult = {
        success: true,
        columns: ['id', 'ciudad'],
        values: [
          [1, 'Buenos Aires'],
          [2, 'Bogota'],
          [3, 'Madrid']
        ]
      };

      // requiresOrder = false
      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(true);
    });

    it('TC-06 [Orden Indistinto con duplicados]: Debe validar la cardinalidad exacta de filas repetidas en orden arbitrario', () => {
      const userResult = {
        success: true,
        columns: ['categoria'],
        values: [['A'], ['B'], ['A'], ['C']]
      };
      const expectedResult = {
        success: true,
        columns: ['categoria'],
        values: [['C'], ['A'], ['A'], ['B']]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(true);

      // Si la cardinalidad de duplicados no coincide (ej: tres 'A' y cero 'B')
      const invalidDuplicates = {
        success: true,
        columns: ['categoria'],
        values: [['A'], ['A'], ['A'], ['C']]
      };
      const failResult = ExerciseValidatorService.compareResults(invalidDuplicates, expectedResult, false);
      expect(failResult.isPassed).toBe(false);
    });

    it('TC-07 [Orden Estricto]: Debe fallar si se exige ORDER BY y las filas están en distinto orden', () => {
      const userResult = {
        success: true,
        columns: ['id', 'salario'],
        values: [
          [2, 3000],
          [1, 1500]
        ]
      };
      const expectedResult = {
        success: true,
        columns: ['id', 'salario'],
        values: [
          [1, 1500],
          [2, 3000]
        ]
      };

      // requiresOrder = true
      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, true);
      expect(result.isPassed).toBe(false);
      expect(result.message).toContain('El contenido o el orden de la fila 1 no coincide');
      expect(result.details).toContain('Recuerda aplicar ORDER BY');
    });

    it('TC-08 [Orden Estricto exitoso]: Debe aprobar si contiene ORDER BY y las filas están en el orden idéntico', () => {
      const userResult = {
        success: true,
        columns: ['id', 'salario'],
        values: [
          [1, 1500],
          [2, 3000]
        ]
      };
      const expectedResult = {
        success: true,
        columns: ['id', 'salario'],
        values: [
          [1, 1500],
          [2, 3000]
        ]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, true);
      expect(result.isPassed).toBe(true);
    });
  });

  describe('Grupo 3: Manejo Estricto de NULLs vs Cero vs String Vacío', () => {
    it('TC-09 [NULL vs Cero]: Debe fallar si el modelo espera NULL y el estudiante retorna 0', () => {
      const userResult = {
        success: true,
        columns: ['bono'],
        values: [[0]]
      };
      const expectedResult = {
        success: true,
        columns: ['bono'],
        values: [[null]]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(false);
    });

    it('TC-10 [NULL vs String Vacío]: Debe fallar si el modelo espera NULL y el estudiante retorna ""', () => {
      const userResult = {
        success: true,
        columns: ['telefono'],
        values: [['']]
      };
      const expectedResult = {
        success: true,
        columns: ['telefono'],
        values: [[null]]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(false);
    });

    it('TC-11 [Cero vs String Vacío]: Debe fallar si el modelo espera 0 y el estudiante retorna ""', () => {
      const userResult = {
        success: true,
        columns: ['stock'],
        values: [['']]
      };
      const expectedResult = {
        success: true,
        columns: ['stock'],
        values: [[0]]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(false);
    });

    it('TC-12 [NULL legítimo]: Debe aprobar cuando ambas consultas contienen NULL en la misma columna', () => {
      const userResult = {
        success: true,
        columns: ['id', 'telefono'],
        values: [[1, null], [2, '555-1234']]
      };
      const expectedResult = {
        success: true,
        columns: ['id', 'telefono'],
        values: [[1, null], [2, '555-1234']]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(true);
    });
  });

  describe('Grupo 4: Tipado Estricto de Datos', () => {
    it('TC-13 [Number vs String]: Debe rechazar si el modelo retorna el entero 42 y el estudiante retorna "42"', () => {
      const userResult = {
        success: true,
        columns: ['resultado'],
        values: [['42']] // String
      };
      const expectedResult = {
        success: true,
        columns: ['resultado'],
        values: [[42]] // Number
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(false);
    });

    it('TC-14 [Boolean / Bit]: Debe rechazar ante discrepancia entre booleanos y cadenas', () => {
      const userResult = {
        success: true,
        columns: ['activo'],
        values: [['true']]
      };
      const expectedResult = {
        success: true,
        columns: ['activo'],
        values: [[true]]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(false);
    });

    it('TC-15 [Decimales / Redondeo]: Tolera diferencias insignificantes de precisión de punto flotante manteniéndose numérico', () => {
      const userResult = {
        success: true,
        columns: ['promedio'],
        values: [[10.500001]]
      };
      const expectedResult = {
        success: true,
        columns: ['promedio'],
        values: [[10.5]]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(true);
    });
  });

  describe('Grupo 5: Resiliencia ante Errores de Entrada y Configuración', () => {
    it('TC-16: Debe retornar isPassed: false con el mensaje pedagógico si la consulta del usuario falla por sintaxis SQL', () => {
      const userResult = {
        success: false,
        columns: [],
        values: [],
        error: 'near "FORM": syntax error'
      };
      const expectedResult = {
        success: true,
        columns: ['id'],
        values: [[1]]
      };

      const result = ExerciseValidatorService.compareResults(userResult, expectedResult, false);
      expect(result.isPassed).toBe(false);
      expect(result.message).toContain('La consulta contiene errores de sintaxis o ejecución');
      expect(result.details).toContain('syntax error');
    });

    it('TC-17: Debe manejar de forma segura si la kata no tiene consulta modelo configurada', async () => {
      const exercise = { id: 'ex-corrupted' }; // Sin expectedQuery ni expectedResult
      const result = await ExerciseValidatorService.validate(exercise, 'SELECT 1;');
      expect(result.isPassed).toBe(false);
      expect(result.message).toContain('Ejercicio no configurado');
    });
  });
});
