/**
 * @file sqlWorkerStress.test.js
 * @description Pruebas de integración, resiliencia y estrés para el motor SQLite WebAssembly.
 * Valida carga WASM, Seeding multiesquema, tolerancia a fallos de red y el mecanismo Watchdog Timeout.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { SqlEngineService } from '../sqlEngineService.js';

describe('Pruebas de Integración y Estrés (WASM & Resiliencia)', () => {
  let engine;

  beforeEach(() => {
    engine = new SqlEngineService();
  });

  describe('Suite 1: Inicialización WASM y Seeding Multiesquema', () => {
    it('Debe inicializar SQLite WASM y poblar el esquema universidad por defecto', async () => {
      await engine.initEngine();
      await engine.seedDatabase('universidad');

      const res = await engine.executeQuery('SELECT * FROM estudiantes;');
      expect(res.success).toBe(true);
      expect(res.columns).toContain('id_estudiante');
      expect(res.columns).toContain('nombre');
      expect(res.values.length).toBeGreaterThan(0);
      expect(res.executionTimeMs).toBeGreaterThanOrEqual(0);
    });

    it('Debe permitir la conmutación dinámica de esquemas (universidad -> tienda_online -> banco)', async () => {
      // 1. Tienda Online
      await engine.loadSchema('tienda_online');
      const resShop = await engine.executeQuery('SELECT * FROM productos;');
      expect(resShop.success).toBe(true);
      expect(resShop.columns).toContain('precio');

      // 2. Banco
      await engine.loadSchema('banco');
      const resBank = await engine.executeQuery('SELECT * FROM cuentas_bancarias;');
      expect(resBank.success).toBe(true);
      expect(resBank.columns).toContain('saldo');

      // 3. Volver a Universidad
      await engine.loadSchema('universidad');
      const resUni = await engine.executeQuery('SELECT * FROM cursos;');
      expect(resUni.success).toBe(true);
      expect(resUni.columns).toContain('nombre_curso');
    });

    it('Debe formatear adecuadamente errores de sintaxis y tablas inexistentes', async () => {
      await engine.loadSchema('universidad');
      const badQueryRes = await engine.executeQuery('SELECT * FROM tabla_fantasma;');
      expect(badQueryRes.success).toBe(false);
      expect(badQueryRes.error).toContain('no such table');
    });
  });

  describe('Suite 2: Resiliencia ante Fallos de Red / WASM Inaccesible', () => {
    it('Debe capturar limpiamente errores de inicialización si el binario WASM no carga', async () => {
      const failingEngine = new SqlEngineService();
      // Simular fallo forzado en la función de carga interna
      vi.spyOn(failingEngine, '_sendToWorker').mockRejectedValueOnce(
        new Error('Failed to fetch wasm binary: 404 Not Found (Network Timeout)')
      );

      await expect(failingEngine.initEngine()).rejects.toThrow(/Failed to fetch wasm binary/i);
    });
  });

  describe('Suite 3: Watchdog Timeout y Estrés de Consultas Infinitas', () => {
    it('Debe interceptar consultas pesadas mediante Watchdog Timeout cuando exceden el límite de tiempo', async () => {
      const timeoutEngine = new SqlEngineService();
      await timeoutEngine.initEngine();
      await timeoutEngine.loadSchema('universidad');

      // Simulamos un Worker Bridge activo con un timeout configurado a 200ms
      const mockWorker = {
        postMessage: vi.fn(),
        terminate: vi.fn()
      };
      timeoutEngine.worker = mockWorker;
      timeoutEngine._isNodeEnv = false; // Forzar modo worker bridge

      // Ejecutar consulta con un timeout ultracorto de 150ms
      const promise = timeoutEngine.executeQuery('WITH RECURSIVE inf(x) AS (SELECT 1 UNION ALL SELECT x+1 FROM inf) SELECT * FROM inf;', {
        timeoutMs: 150
      });

      const result = await promise;

      // Aserciones del Watchdog
      expect(result.success).toBe(false);
      expect(result.error).toContain('Tiempo de ejecución excedido (Timeout');
      expect(result.errorDetails.category).toBe('Timeout de Ejecución (Watchdog)');
      expect(result.errorDetails.suggestion).toContain('bucle recursivo infinito');
      
      // Validar que el worker fue terminado de forma forzada para liberar CPU
      expect(mockWorker.terminate).toHaveBeenCalled();
    });

    it('Debe ejecutar Self-Healing y permitir una consulta inmediata tras una cancelación por Timeout', async () => {
      const recoveryEngine = new SqlEngineService();
      await recoveryEngine.initEngine();
      await recoveryEngine.loadSchema('universidad');

      // Simular terminación forzada y autorecuperación
      recoveryEngine._terminateAndRespawnWorker('TEST_TIMEOUT');

      // La siguiente consulta debe funcionar exitosamente
      const healthyRes = await recoveryEngine.executeQuery('SELECT 1 + 1 AS suma;');
      expect(healthyRes.success).toBe(true);
      expect(healthyRes.values[0][0]).toBe(2);
    });
  });
});
