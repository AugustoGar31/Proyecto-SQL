import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { sqlEngine } from '../services/sqlEngineService.js';
import { useCurriculum } from './ProgressContext.jsx';

const DbEngineContext = createContext();

export const DbEngineProvider = ({ children }) => {
  const { currentLesson, activeExercise } = useCurriculum();
  const [isReady, setIsReady] = useState(false);
  const [initError, setInitError] = useState(null);
  const [currentSchemaId, setCurrentSchemaId] = useState(null);

  // Inicialización del motor y seeding de datos al arrancar la app
  useEffect(() => {
    let isMounted = true;

    async function initializeAndSeed() {
      try {
        setIsReady(false);
        setInitError(null);

        // 1. Inicialización asíncrona de WASM sql.js
        await sqlEngine.initEngine();

        // 2. Determinar esquema objetivo (ejercicio activo, lección activa o fallback 'universidad')
        const targetSchema = (activeExercise && activeExercise.schemaId) || (currentLesson && currentLesson.schemaId) || 'universidad';

        // 3. Ejecutar Seeding de datos inmediato (CREATE TABLE + INSERTs)
        await sqlEngine.seedDatabase(targetSchema);

        if (isMounted) {
          setCurrentSchemaId(targetSchema);
          setIsReady(true);
        }
      } catch (err) {
        console.error('Error durante la inicialización y seeding del motor SQL:', err);
        if (isMounted) {
          setInitError(err.message || 'Error al iniciar la base de datos WebAssembly.');
          setIsReady(false);
        }
      }
    }

    initializeAndSeed();
    return () => { isMounted = false; };
  }, []);

  // Cambio dinámico de esquema relacional cuando cambia el ejercicio activo o la lección
  useEffect(() => {
    let isCurrent = true;
    const targetSchema = (activeExercise && activeExercise.schemaId) || (currentLesson && currentLesson.schemaId);
    if (isReady && targetSchema && targetSchema !== currentSchemaId) {
      sqlEngine.loadSchema(targetSchema)
        .then(() => {
          if (isCurrent) setCurrentSchemaId(targetSchema);
        })
        .catch((error) => {
          console.error('Error al cambiar esquema de BD:', error);
        });
    }
    return () => { isCurrent = false; };
  }, [isReady, currentLesson, activeExercise, currentSchemaId]);

  /**
   * Reintenta la inicialización completa del motor SQL y el seeding de datos.
   */
  const retryInitialization = useCallback(async () => {
    setIsReady(false);
    setInitError(null);
    try {
      await sqlEngine.initEngine();
      const targetSchema = (currentLesson && currentLesson.schemaId) ? currentLesson.schemaId : 'universidad';
      await sqlEngine.seedDatabase(targetSchema);
      setCurrentSchemaId(targetSchema);
      setIsReady(true);
    } catch (err) {
      console.error('Error al reintentar inicialización:', err);
      setInitError(err.message || 'Error al iniciar la base de datos WebAssembly.');
      setIsReady(false);
    }
  }, [currentLesson]);

  /**
   * Ejecuta una consulta SQL en la base de datos actual en el Web Worker.
   * @param {string} sqlText - Consulta SQL a ejecutar.
   * @param {Object} [options] - Opciones como timeoutMs.
   */
  const runQuery = useCallback(async (sqlText, options) => {
    return await sqlEngine.executeQuery(sqlText, options);
  }, []);

  /**
   * Reinicia los datos del esquema activo a su estado inicial de fábrica.
   */
  const resetCurrentSchema = useCallback(async () => {
    if (currentSchemaId) {
      return await sqlEngine.loadSchema(currentSchemaId);
    }
  }, [currentSchemaId]);

  /**
   * Cambia manualmente el esquema activo de la base de datos y ejecuta el seeding.
   * @param {string} schemaId - Identificador del esquema ('universidad', 'tienda_online', 'banco')
   */
  const switchSchema = useCallback(async (schemaId) => {
    if (!schemaId) return false;
    try {
      await sqlEngine.loadSchema(schemaId);
      setCurrentSchemaId(schemaId);
      return true;
    } catch (err) {
      console.error(`[DbEngineContext] Error al cambiar a esquema '${schemaId}':`, err);
      return false;
    }
  }, []);

  const contextValue = useMemo(() => ({
    isReady,
    initError,
    currentSchemaId,
    runQuery,
    resetCurrentSchema,
    switchSchema,
    retryInitialization
  }), [
    isReady,
    initError,
    currentSchemaId,
    runQuery,
    resetCurrentSchema,
    switchSchema,
    retryInitialization
  ]);

  return (
    <DbEngineContext.Provider value={contextValue}>
      {children}
    </DbEngineContext.Provider>
  );
};

export const useDbEngine = () => {
  const context = useContext(DbEngineContext);
  if (!context) {
    throw new Error('useDbEngine debe utilizarse dentro de un DbEngineProvider');
  }
  return context;
};
