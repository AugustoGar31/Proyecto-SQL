/**
 * @file DbEngineContext.jsx
 * @description Contexto de React para proveer el servicio de ejecución SQL WebAssembly a la aplicación.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { sqlEngine } from '../services/sqlEngineService.js';
import { useProgress } from './ProgressContext.jsx';

const DbEngineContext = createContext();

export const DbEngineProvider = ({ children }) => {
  const { currentLesson } = useProgress();
  const [isReady, setIsReady] = useState(false);
  const [initError, setInitError] = useState(null);
  const [currentSchemaId, setCurrentSchemaId] = useState(null);

  // Inicialización del motor al arrancar la app
  useEffect(() => {
    let isMounted = true;

    async function setup() {
      try {
        await sqlEngine.initEngine();
        if (isMounted) {
          setIsReady(true);
        }
      } catch (err) {
        if (isMounted) {
          setInitError(err.message || 'Error al iniciar WebAssembly SQL.');
        }
      }
    }

    setup();
    return () => { isMounted = false; };
  }, []);

  // Carga del esquema relacional según la lección activa
  useEffect(() => {
    if (isReady && currentLesson && currentLesson.schemaId) {
      try {
        sqlEngine.loadSchema(currentLesson.schemaId);
        setCurrentSchemaId(currentLesson.schemaId);
      } catch (error) {
        console.error('Error al cambiar esquema de BD:', error);
      }
    }
  }, [isReady, currentLesson]);

  /**
   * Ejecuta una consulta SQL en la base de datos actual.
   * @param {string} sqlText - Consulta SQL a ejecutar.
   */
  const runQuery = (sqlText) => {
    return sqlEngine.executeQuery(sqlText);
  };

  /**
   * Reinicia los datos del esquema activo a su estado inicial de fábrica.
   */
  const resetCurrentSchema = () => {
    if (currentSchemaId) {
      sqlEngine.loadSchema(currentSchemaId);
    }
  };

  return (
    <DbEngineContext.Provider
      value={{
        isReady,
        initError,
        currentSchemaId,
        runQuery,
        resetCurrentSchema
      }}
    >
      {children}
    </DbEngineContext.Provider>
  );
};

export const useDbEngine = () => useContext(DbEngineContext);
