/**
 * @file WorkspaceView.jsx
 * @description Espacio de Trabajo 2: Taller Práctico SQL / Playground.
 * Incluye el Desafío Activo, Editor SQL, Tabla de Resultados e Internals.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SqlEditor } from './SqlEditor.jsx';
import { ResultsTable } from './ResultsTable.jsx';
import { DbInternalsViewer } from './DbInternalsViewer.jsx';
import { ExerciseCard } from '../exercises/ExerciseCard.jsx';
import { ERDDiagram } from '../schema/ERDDiagram.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useDbEngine } from '../../context/DbEngineContext.jsx';
import { Terminal, Cpu, Database, ChevronRight, Rocket, Sparkles } from 'lucide-react';

const DEFAULT_PLAYGROUND_SQL = `-- 🚀 Entorno Playground Libre SQL
-- Escribe y ejecuta cualquier consulta SQL sin restricciones de lecciones
-- Ejemplos: SELECT * FROM estudiantes; | SELECT * FROM cursos;
SELECT * FROM estudiantes;
`;

export function WorkspaceView() {
  const { currentLesson } = useProgress();
  const { isReady, initError, runQuery, retryInitialization } = useDbEngine();

  // Estados del Modo Lección / Desafío
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'internals'
  const [editorSql, setEditorSql] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [showErd, setShowErd] = useState(false);

  // Estados del Modo Playground Libre
  const [isPlaygroundMode, setIsPlaygroundMode] = useState(false);
  const [playgroundSql, setPlaygroundSql] = useState(DEFAULT_PLAYGROUND_SQL);
  const [playgroundResult, setPlaygroundResult] = useState(null);
  const [playgroundTab, setPlaygroundTab] = useState('editor'); // 'editor' | 'internals'

  const activeExercise = currentLesson && currentLesson.exercises ? currentLesson.exercises[0] : null;

  useEffect(() => {
    if (activeExercise) {
      setEditorSql(activeExercise.initialCode);
      setQueryResult(null);
    }
  }, [activeExercise]);

  const handleExecuteSql = useCallback(() => {
    if (!editorSql.trim()) return;
    const res = runQuery(editorSql);
    setQueryResult(res);
  }, [editorSql, runQuery]);

  const handleExecutePlayground = useCallback(() => {
    if (!playgroundSql.trim()) return;
    const res = runQuery(playgroundSql);
    setPlaygroundResult(res);
  }, [playgroundSql, runQuery]);

  const handleResetEditor = useCallback(() => {
    if (activeExercise) {
      setEditorSql(activeExercise.initialCode);
    }
  }, [activeExercise]);

  const handleResetPlayground = useCallback(() => {
    setPlaygroundSql(DEFAULT_PLAYGROUND_SQL);
  }, []);

  if (initError) {
    return (
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--accent-rose)' }}>
        <h2>⚠️ Error al iniciar el motor SQL WebAssembly</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 1.5rem 0' }}>{initError}</p>
        <button
          onClick={retryInitialization}
          className="btn-glass"
          style={{ background: 'var(--accent-cyan)', color: '#000', fontWeight: 600, padding: '0.66rem 1.25rem' }}
        >
          🔄 Reintentar Inicialización de Base de Datos
        </button>
      </div>
    );
  }

  return (
    <div className="space-container">
      {/* Encabezado del Taller */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {isPlaygroundMode ? 'Sandbox SQL' : 'Taller Práctico SQL'}
            </span>
            {isPlaygroundMode && (
              <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>Modo Libre</span>
            )}
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#ffffff', margin: 0 }}>
            {isPlaygroundMode
              ? 'Playground Interactivo'
              : (currentLesson ? currentLesson.title : 'Taller Práctico')}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            onClick={() => setIsPlaygroundMode(!isPlaygroundMode)}
            className="btn-glass"
            style={{
              fontSize: '0.82rem',
              borderColor: isPlaygroundMode ? 'var(--accent-cyan)' : 'rgba(56, 189, 248, 0.35)',
              background: isPlaygroundMode ? 'rgba(56, 189, 248, 0.18)' : 'rgba(56, 189, 248, 0.08)',
              color: 'var(--accent-cyan)',
              boxShadow: isPlaygroundMode ? '0 0 15px rgba(56, 189, 248, 0.25)' : '0 0 12px rgba(56, 189, 248, 0.1)',
              fontWeight: 600
            }}
          >
            <Rocket size={16} />
            {isPlaygroundMode ? 'Volver a la Lección' : 'Playground'}
          </button>

          <button
            onClick={() => setShowErd(!showErd)}
            className="btn-glass"
            style={{ fontSize: '0.82rem' }}
          >
            <Database size={16} />
            {showErd ? 'Ocultar ERD' : 'Ver Diagrama ERD'}
          </button>
        </div>
      </div>

      {/* Visor ERD Colapsable */}
      {showErd && (
        <div style={{ marginBottom: '1.5rem' }}>
          <ERDDiagram />
        </div>
      )}

      {!isReady ? (
        <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--accent-cyan)' }}>
          <p>⏳ Cargando motor de Base de Datos SQLite en WebAssembly...</p>
        </div>
      ) : isPlaygroundMode ? (
        /* Modo Playground Libre: Sin validaciones de ejercicios */
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          {/* Selector de Pestañas */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setPlaygroundTab('editor')}
                className={`tab-btn ${playgroundTab === 'editor' ? 'active' : ''}`}
              >
                <Terminal size={16} />
                Editor & Resultados
              </button>
              <button
                onClick={() => setPlaygroundTab('internals')}
                className={`tab-btn ${playgroundTab === 'internals' ? 'active' : ''}`}
                style={{ background: playgroundTab === 'internals' ? 'var(--accent-indigo)' : 'transparent' }}
              >
                <Cpu size={16} />
                Explicación "Bajo el Capó"
              </button>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              ⚡ Ejecución libre directa en SQLite WASM (sin validaciones)
            </span>
          </div>

          {/* Vista 1: Editor y Salida Tabular Libre */}
          {playgroundTab === 'editor' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <SqlEditor
                value={playgroundSql}
                onChange={setPlaygroundSql}
                onExecute={handleExecutePlayground}
                onReset={handleResetPlayground}
              />
              <ResultsTable queryResult={playgroundResult} />
            </div>
          ) : (
            /* Vista 2: Explicación de Internals Libre */
            <DbInternalsViewer
              queryResult={playgroundResult}
              exerciseExplanation="En el Playground Libre puedes consultar el plan de ejecución de SQLite (EXPLAIN QUERY PLAN) para inspeccionar índices y optimizar tus consultas."
            />
          )}
        </div>
      ) : (
        /* Modo Taller con Desafíos y Ejercicios */
        <div className="playground-grid">
          {/* Columna Izquierda: Tarjeta del Desafío */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {activeExercise && (
              <ExerciseCard
                exercise={activeExercise}
                currentResult={queryResult}
              />
            )}
          </div>

          {/* Columna Derecha: Editor + Pestañas de Resultados / Internals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              {/* Selector de Pestañas */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
                >
                  <Terminal size={16} />
                  Editor & Resultados
                </button>
                <button
                  onClick={() => setActiveTab('internals')}
                  className={`tab-btn ${activeTab === 'internals' ? 'active' : ''}`}
                  style={{ background: activeTab === 'internals' ? 'var(--accent-indigo)' : 'transparent' }}
                >
                  <Cpu size={16} />
                  Explicación "Bajo el Capó"
                </button>
              </div>

              {/* Vista 1: Editor y Salida Tabular */}
              {activeTab === 'editor' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <SqlEditor
                    value={editorSql}
                    onChange={setEditorSql}
                    onExecute={handleExecuteSql}
                    onReset={handleResetEditor}
                  />
                  <ResultsTable queryResult={queryResult} />
                </div>
              ) : (
                /* Vista 2: Explicación de Internals */
                <DbInternalsViewer
                  queryResult={queryResult}
                  exerciseExplanation={activeExercise ? activeExercise.explanation : null}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
