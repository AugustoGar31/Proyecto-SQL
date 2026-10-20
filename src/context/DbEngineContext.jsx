import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { sqlEngine } from '../services/sqlEngineService.js';
import { useProgress } from './ProgressContext.jsx';

const DbEngineContext = createContext();

export const DbEngineProvider = ({ children }) => {
  const { currentLesson, activeExercise } = useProgress();
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
        sqlEngine.seedDatabase(targetSchema);

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
    const targetSchema = (activeExercise && activeExercise.schemaId) || (currentLesson && currentLesson.schemaId);
    if (isReady && targetSchema && targetSchema !== currentSchemaId) {
      try {
        sqlEngine.loadSchema(targetSchema);
        setCurrentSchemaId(targetSchema);
      } catch (error) {
        console.error('Error al cambiar esquema de BD:', error);
      }
    }
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
      sqlEngine.seedDatabase(targetSchema);
      setCurrentSchemaId(targetSchema);
      setIsReady(true);
    } catch (err) {
      console.error('Error al reintentar inicialización:', err);
      setInitError(err.message || 'Error al iniciar la base de datos WebAssembly.');
      setIsReady(false);
    }
  }, [currentLesson]);

  /**
   * Ejecuta una consulta SQL en la base de datos actual.
   * @param {string} sqlText - Consulta SQL a ejecutar.
   */
  const runQuery = useCallback((sqlText) => {
    return sqlEngine.executeQuery(sqlText);
  }, []);

  /**
   * Reinicia los datos del esquema activo a su estado inicial de fábrica.
   */
  const resetCurrentSchema = useCallback(() => {
    if (currentSchemaId) {
      sqlEngine.loadSchema(currentSchemaId);
    }
  }, [currentSchemaId]);

  const contextValue = useMemo(() => ({
    isReady,
    initError,
    currentSchemaId,
    runQuery,
    resetCurrentSchema,
    retryInitialization
  }), [
    isReady,
    initError,
    currentSchemaId,
    runQuery,
    resetCurrentSchema,
    retryInitialization
  ]);

  return (
    <DbEngineContext.Provider value={contextValue}>
      {children}
    </DbEngineContext.Provider>
  );
};

export const useDbEngine = () => useContext(DbEngineContext);
