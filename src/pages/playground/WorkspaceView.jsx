/**
 * @file WorkspaceView.jsx
 * @description Espacio de Trabajo 2: Taller Práctico SQL / Playground.
 * Incluye el Desafío Activo, Editor SQL, Tabla de Resultados e Internals.
 */

import React, { useState, useEffect, useCallback } from 'react';
import { SqlEditor } from '../../components/playground/SqlEditor.jsx';
import { ResultsTable } from '../../components/playground/ResultsTable.jsx';
import { DbInternalsViewer } from '../../components/playground/DbInternalsViewer.jsx';
import { ExerciseCard } from '../../components/exercises/ExerciseCard.jsx';
import { ERDDiagram } from '../../components/schema/ERDDiagram.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useDbEngine } from '../../context/DbEngineContext.jsx';
import { getCleanStarterTemplate } from '../../data/simpleExplanations.js';
import { Button } from '../../components/common/Button.jsx';
import { Terminal, Database, Rocket, BookOpen } from 'lucide-react';

const DEFAULT_PLAYGROUND_SQL = `-- 🚀 Entorno Playground Libre SQL
-- Escribe y ejecuta cualquier consulta SQL sin restricciones de lecciones
-- Ejemplos: SELECT * FROM estudiantes; | SELECT * FROM cursos;
SELECT * FROM estudiantes;
`;

export function WorkspaceView() {
  const { currentLesson, activeExercise } = useProgress();
  const { isReady, initError, runQuery, retryInitialization } = useDbEngine();

  // Estados del Modo Lección / Desafío
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'internals'
  const [editorSql, setEditorSql] = useState(() => getCleanStarterTemplate(activeExercise));
  const editorSqlRef = React.useRef(getCleanStarterTemplate(activeExercise));
  const [queryResult, setQueryResult] = useState(null);
  const [showErd, setShowErd] = useState(false);

  // Estados del Modo Playground Libre
  const [isPlaygroundMode, setIsPlaygroundMode] = useState(false);
  const [playgroundSql, setPlaygroundSql] = useState(DEFAULT_PLAYGROUND_SQL);
  const playgroundSqlRef = React.useRef(DEFAULT_PLAYGROUND_SQL);
  const [playgroundResult, setPlaygroundResult] = useState(null);
  const [playgroundTab, setPlaygroundTab] = useState('editor'); // 'editor' | 'internals'

  useEffect(() => {
    if (activeExercise) {
      const code = getCleanStarterTemplate(activeExercise);
      editorSqlRef.current = code;
      setEditorSql(code);
      setQueryResult(null);
    }
  }, [activeExercise]);

  const handleExecuteSql = useCallback((sqlText) => {
    const code = typeof sqlText === 'string' ? sqlText : editorSqlRef.current;
    if (!code || !code.trim()) return;
    const res = runQuery(code);
    setQueryResult(res);
  }, [runQuery]);

  const handleExecutePlayground = useCallback((sqlText) => {
    const code = typeof sqlText === 'string' ? sqlText : playgroundSqlRef.current;
    if (!code || !code.trim()) return;
    const res = runQuery(code);
    setPlaygroundResult(res);
  }, [runQuery]);

  const handleResetEditor = useCallback(() => {
    const code = getCleanStarterTemplate(activeExercise);
    editorSqlRef.current = code;
    setEditorSql(code);
    setQueryResult(null);
  }, [activeExercise]);

  const handleResetPlayground = useCallback(() => {
    playgroundSqlRef.current = DEFAULT_PLAYGROUND_SQL;
    setPlaygroundSql(DEFAULT_PLAYGROUND_SQL);
    setPlaygroundResult(null);
  }, []);

  if (initError) {
    return (
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--accent-rose)' }}>
        <h2>⚠️ Error al iniciar el motor SQL WebAssembly</h2>
        <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 1.5rem 0' }}>{initError}</p>
        <Button
          variant="primary"
          size="md"
          onClick={retryInitialization}
        >
          🔄 Reintentar Inicialización de Base de Datos
        </Button>
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
              : (activeExercise ? activeExercise.title : (currentLesson ? currentLesson.title : 'Taller Práctico'))}
          </h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsPlaygroundMode(!isPlaygroundMode)}
            icon={Rocket}
            style={isPlaygroundMode ? { borderColor: 'var(--accent-cyan)', color: 'var(--accent-cyan)' } : {}}
          >
            {isPlaygroundMode ? 'Volver a la Lección' : 'Playground'}
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowErd(!showErd)}
            icon={Database}
          >
            {showErd ? 'Ocultar ERD' : 'Ver Diagrama ERD'}
          </Button>
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
                <BookOpen size={16} />
                Explicación Lógica
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
                onChange={(val) => { playgroundSqlRef.current = val; }}
                onExecute={handleExecutePlayground}
                onReset={handleResetPlayground}
              />
              <ResultsTable queryResult={playgroundResult} />
            </div>
          ) : (
            /* Vista 2: Explicación Lógica Libre */
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
                  <BookOpen size={16} />
                  Explicación Lógica
                </button>
              </div>

              {/* Vista 1: Editor y Salida Tabular */}
              {activeTab === 'editor' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <SqlEditor
                    value={editorSql}
                    onChange={(val) => { editorSqlRef.current = val; }}
                    onExecute={handleExecuteSql}
                    onReset={handleResetEditor}
                  />
                  <ResultsTable queryResult={queryResult} />
                </div>
              ) : (
                /* Vista 2: Explicación Lógica */
                <DbInternalsViewer
                  queryResult={queryResult}
                  exerciseExplanation={activeExercise ? activeExercise.explanation : null}
                  activeExercise={activeExercise}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
