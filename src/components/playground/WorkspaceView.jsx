/**
 * @file WorkspaceView.jsx
 * @description Espacio de Trabajo 2: Taller Práctico SQL / Playground.
 * Incluye el Desafío Activo, Editor SQL, Tabla de Resultados e Internals.
 */

import React, { useState, useEffect } from 'react';
import { SqlEditor } from './SqlEditor.jsx';
import { ResultsTable } from './ResultsTable.jsx';
import { DbInternalsViewer } from './DbInternalsViewer.jsx';
import { ExerciseCard } from '../exercises/ExerciseCard.jsx';
import { ERDDiagram } from '../schema/ERDDiagram.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useDbEngine } from '../../context/DbEngineContext.jsx';
import { Terminal, Cpu, Database, ChevronRight } from 'lucide-react';

export function WorkspaceView() {
  const { currentLesson } = useProgress();
  const { isReady, initError, runQuery } = useDbEngine();

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'internals'
  const [editorSql, setEditorSql] = useState('');
  const [queryResult, setQueryResult] = useState(null);
  const [showErd, setShowErd] = useState(false);

  const activeExercise = currentLesson && currentLesson.exercises ? currentLesson.exercises[0] : null;

  useEffect(() => {
    if (activeExercise) {
      setEditorSql(activeExercise.initialCode);
      setQueryResult(null);
    }
  }, [activeExercise]);

  const handleExecuteSql = () => {
    if (!editorSql.trim()) return;
    const res = runQuery(editorSql);
    setQueryResult(res);
  };

  if (initError) {
    return (
      <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--accent-rose)' }}>
        <h2>⚠️ Error al iniciar el motor SQL WebAssembly</h2>
        <p>{initError}</p>
      </div>
    );
  }

  return (
    <div className="space-container">
      {/* Encabezado del Taller */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Taller Práctico SQL
          </span>
          <h2 style={{ fontSize: '1.5rem', color: '#ffffff', margin: 0 }}>
            {currentLesson ? currentLesson.title : 'Playground Interactivo'}
          </h2>
        </div>

        <button
          onClick={() => setShowErd(!showErd)}
          className="btn-glass"
          style={{ fontSize: '0.82rem' }}
        >
          <Database size={16} />
          {showErd ? 'Ocultar ERD' : 'Ver Diagrama ERD'}
        </button>
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
      ) : (
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
                    onReset={() => activeExercise && setEditorSql(activeExercise.initialCode)}
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
