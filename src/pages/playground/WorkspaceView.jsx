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
import { ExerciseValidatorService } from '../../services/exerciseValidator.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useDbEngine } from '../../context/DbEngineContext.jsx';
import { getCleanStarterTemplate } from '../../data/simpleExplanations.js';
import { Button } from '../../components/common/Button.jsx';
import { Terminal, Database, Rocket, BookOpen, MessageSquarePlus } from 'lucide-react';
import { reportContextualFeedback } from '../../services/telemetryService.js';

const DEFAULT_PLAYGROUND_SQL = `-- 🚀 Entorno Playground Libre SQL
-- Escribe y ejecuta cualquier consulta SQL sin restricciones de lecciones
-- Ejemplos: SELECT * FROM estudiantes; | SELECT * FROM cursos;
SELECT * FROM estudiantes;
`;

export function WorkspaceView() {
  const { currentLesson, activeExercise, completeExercise } = useProgress();
  const { isReady, initError, currentSchemaId, switchSchema, runQuery, retryInitialization } = useDbEngine();

  // Estados del Modo Lección / Desafío
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'internals'
  const [editorSql, setEditorSql] = useState(() => getCleanStarterTemplate(activeExercise));
  const editorSqlRef = React.useRef(getCleanStarterTemplate(activeExercise));
  const [queryResult, setQueryResult] = useState(null);
  const [evaluation, setEvaluation] = useState(null);
  const [showErd, setShowErd] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Estados del Modo Playground Libre
  const [isPlaygroundMode, setIsPlaygroundMode] = useState(false);
  const [playgroundSql, setPlaygroundSql] = useState(DEFAULT_PLAYGROUND_SQL);
  const playgroundSqlRef = React.useRef(DEFAULT_PLAYGROUND_SQL);
  const [playgroundResult, setPlaygroundResult] = useState(null);
  const [playgroundTab, setPlaygroundTab] = useState('editor'); // 'editor' | 'internals'
  const [feedbackNotice, setFeedbackNotice] = useState('');

  const handleContextualReport = useCallback(async () => {
    const activeSql = isPlaygroundMode ? playgroundSqlRef.current : editorSqlRef.current;
    const evalMsg = isPlaygroundMode
      ? playgroundResult?.error || ''
      : evaluation?.message || queryResult?.error || '';

    const { copied } = await reportContextualFeedback({
      exerciseId: isPlaygroundMode ? 'playground-libre' : (activeExercise?.id || currentLesson?.id || 'sin-id'),
      exerciseTitle: isPlaygroundMode
        ? 'Playground Interactivo Libre'
        : (activeExercise?.title || currentLesson?.title || 'Taller Práctico SQL'),
      schemaId: isPlaygroundMode
        ? 'universidad'
        : (activeExercise?.schemaId || activeExercise?.schema || currentLesson?.schemaId || currentSchemaId || 'universidad'),
      sqlQuery: activeSql,
      evaluationMessage: evalMsg,
      source: isPlaygroundMode ? 'Taller SQL (Playground Libre)' : 'Taller SQL (Modo Kata/Lección)'
    });

    setFeedbackNotice(
      copied
        ? '📋 Contexto SQL y consulta copiados al portapapeles'
        : '🔗 Abriendo canal de reporte técnico...'
    );
    setTimeout(() => setFeedbackNotice(''), 4000);
  }, [isPlaygroundMode, activeExercise, currentLesson, currentSchemaId, evaluation, queryResult, playgroundResult]);

  useEffect(() => {
    if (activeExercise) {
      const code = getCleanStarterTemplate(activeExercise);
      editorSqlRef.current = code;
      setEditorSql(code);
      setQueryResult(null);
      setEvaluation(null);
    }
  }, [activeExercise]);

  // Regla de Esquema Fijo: Forzar 'universidad' en Playground y restaurar el esquema de la kata/lección activa
  useEffect(() => {
    if (!isReady || !switchSchema) return;
    if (isPlaygroundMode) {
      if (currentSchemaId !== 'universidad') {
        switchSchema('universidad');
      }
    } else {
      const targetSchema = activeExercise?.schemaId || activeExercise?.schema || currentLesson?.schemaId || 'universidad';
      if (currentSchemaId !== targetSchema) {
        switchSchema(targetSchema);
      }
    }
  }, [isPlaygroundMode, isReady, activeExercise, currentLesson, switchSchema, currentSchemaId]);

  const handleExecuteSql = useCallback(async (sqlText) => {
    const code = typeof sqlText === 'string' ? sqlText : editorSqlRef.current;
    if (!code || !code.trim() || isExecuting) return;
    setIsExecuting(true);
    try {
      const res = await runQuery(code);
      setQueryResult(res);
      if (activeExercise) {
        const evalRes = await ExerciseValidatorService.validate(activeExercise, res);
        setEvaluation(evalRes);
        if (evalRes.isPassed) {
          completeExercise(activeExercise.id);
        }
      }
    } finally {
      setIsExecuting(false);
    }
  }, [runQuery, activeExercise, completeExercise, isExecuting]);

  const handleExecutePlayground = useCallback(async (sqlText) => {
    const code = typeof sqlText === 'string' ? sqlText : playgroundSqlRef.current;
    if (!code || !code.trim() || isExecuting) return;
    setIsExecuting(true);
    try {
      const res = await runQuery(code);
      setPlaygroundResult(res);
    } finally {
      setIsExecuting(false);
    }
  }, [runQuery, isExecuting]);

  const handleResetEditor = useCallback(() => {
    const code = getCleanStarterTemplate(activeExercise);
    editorSqlRef.current = code;
    setEditorSql(code);
    setQueryResult(null);
    setEvaluation(null);
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
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

          <Button
            variant="ghost"
            size="md"
            onClick={handleContextualReport}
            icon={MessageSquarePlus}
            title="Reportar un problema o sugerencia adjuntando el ID de la Kata y tu consulta SQL"
            style={{ borderColor: 'rgba(245, 158, 11, 0.35)', color: 'var(--accent-amber)' }}
          >
            Reportar Problema
          </Button>
        </div>
      </div>

      {feedbackNotice && (
        <div
          role="status"
          style={{
            marginBottom: '1rem',
            padding: '0.55rem 0.9rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            color: 'var(--accent-cyan)',
            fontSize: '0.82rem',
            fontWeight: 500
          }}
        >
          {feedbackNotice}
        </div>
      )}

      {/* Visor ERD Colapsable con Esquema Fijo Contextual */}
      {showErd && (
        <div style={{ marginBottom: '1.5rem' }}>
          <ERDDiagram
            schemaId={
              isPlaygroundMode
                ? 'universidad'
                : (activeExercise?.schemaId || activeExercise?.schema || currentLesson?.schemaId || 'universidad')
            }
          />
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
            <div className="card-tab-nav">
              <button
                onClick={() => setPlaygroundTab('editor')}
                className={`card-tab-btn ${playgroundTab === 'editor' ? 'active tab-cyan' : ''}`}
              >
                <Terminal size={16} />
                Editor & Resultados
              </button>
              <button
                onClick={() => setPlaygroundTab('internals')}
                className={`card-tab-btn ${playgroundTab === 'internals' ? 'active tab-indigo' : ''}`}
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
                onChange={(val) => {
                  playgroundSqlRef.current = val;
                  setPlaygroundSql(val);
                }}
                onExecute={handleExecutePlayground}
                onReset={handleResetPlayground}
                isExecuting={isExecuting}
              />
              <ResultsTable queryResult={playgroundResult} />
            </div>
          ) : (
            /* Vista 2: Explicación Lógica Libre */
            <DbInternalsViewer
              queryResult={playgroundResult}
              fallbackExplanation="En el Playground Libre puedes consultar el plan de ejecución de SQLite (EXPLAIN QUERY PLAN) para inspeccionar índices y optimizar tus consultas."
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
                key={activeExercise.id}
                exercise={activeExercise}
                evaluation={evaluation}
              />
            )}
          </div>

          {/* Columna Derecha: Editor + Pestañas de Resultados / Internals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="glass-card" style={{ padding: '1.25rem' }}>
              {/* Selector de Pestañas */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                <div className="card-tab-nav">
                  <button
                    onClick={() => setActiveTab('editor')}
                    className={`card-tab-btn ${activeTab === 'editor' ? 'active tab-cyan' : ''}`}
                  >
                    <Terminal size={16} />
                    Editor & Resultados
                  </button>
                  <button
                    onClick={() => setActiveTab('internals')}
                    className={`card-tab-btn ${activeTab === 'internals' ? 'active tab-indigo' : ''}`}
                  >
                    <BookOpen size={16} />
                    Explicación Lógica
                  </button>
                </div>
              </div>

              {/* Vista 1: Editor y Salida Tabular */}
              {activeTab === 'editor' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <SqlEditor
                    value={editorSql}
                    onChange={(val) => {
                      editorSqlRef.current = val;
                      setEditorSql(val);
                    }}
                    onExecute={handleExecuteSql}
                    onReset={handleResetEditor}
                    isExecuting={isExecuting}
                  />
                  <ResultsTable queryResult={queryResult} />
                </div>
              ) : (
                /* Vista 2: Explicación Lógica */
                <DbInternalsViewer
                  queryResult={queryResult}
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
