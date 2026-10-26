/**
 * @file LessonContent.jsx
 * @description Componente de renderizado para el contenido teórico modular estructurado de NexoSQL.
 * Transforma los antiguos bloques de texto en micro-learning interactivo con jerarquía visual y puente directo al taller práctico.
 */

import { useCurriculum } from '../../context/ProgressContext.jsx';
import { useView } from '../../context/ViewContext.jsx';
import { Button } from '../common/Button.jsx';
import { TheoryBlockRenderer } from './blocks/TheoryBlockRenderer.jsx';
import { Terminal, ArrowRight, Clock, Sparkles, Cpu } from 'lucide-react';

export function LessonContent() {
  const { currentLesson, currentModule, selectExercise } = useCurriculum();
  const { setActiveView } = useView();

  if (!currentLesson) return null;

  const handleGoToPractice = () => {
    if (currentLesson.exercises && currentLesson.exercises.length > 0) {
      selectExercise(currentLesson.exercises[0].id);
    }
    setActiveView('playground');
  };

  const hasStructuredBlocks = Array.isArray(currentLesson.theoryBlocks) && currentLesson.theoryBlocks.length > 0;

  return (
    <article className="glass-card theory-article">
      {/* 1. Cabecera Estructurada de la Lección */}
      <header className="theory-header">
        <div className="theory-header-meta">
          <div className="theory-header-badges">
            <span className="badge badge-cyan">
              {currentModule?.title?.split('.')[1]?.trim() || 'Lección Activa'}
            </span>
            <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={12} />
              <span>3 min de lectura</span>
            </span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleGoToPractice}
            icon={Terminal}
          >
            Ir al Taller Práctico
          </Button>
        </div>

        <h1 className="theory-title">
          {currentLesson.title}
        </h1>

        {currentLesson.summary && (
          <p className="theory-summary">
            {currentLesson.summary}
          </p>
        )}
      </header>

      {/* 2. Renderizado de Contenido Modular */}
      {hasStructuredBlocks ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {currentLesson.theoryBlocks.map((block, idx) => (
            <TheoryBlockRenderer key={block.id || `block-${idx}`} block={block} />
          ))}
        </div>
      ) : (
        /* Fallback Retrocompatible para módulos en proceso de migración */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {currentLesson.engineerPerspective && (
            <div className="theory-alert-card theory-alert-production">
              <div className="theory-alert-icon-box">
                <Cpu size={20} />
              </div>
              <div className="theory-alert-body">
                <h5 className="theory-alert-title">Cómo piensa un Ingeniero de Base de Datos</h5>
                <div style={{ color: '#e2e8f0', whiteSpace: 'pre-line', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {currentLesson.engineerPerspective.replace(/###.*?\n/, '')}
                </div>
              </div>
            </div>
          )}

          <div className="markdown-body" style={{ color: '#e2e8f0', lineHeight: 1.75, whiteSpace: 'pre-line' }}>
            {currentLesson.contentMarkdown}
          </div>
        </div>
      )}

      {/* 3. Cierre Gamificado y Puente al Taller SQL */}
      <footer className="practice-bridge-card">
        <div className="practice-bridge-info">
          <div className="practice-bridge-badge">
            <Sparkles size={14} />
            <span>Fase Práctica • Desafío SQL</span>
          </div>
          <h3 className="practice-bridge-title">
            ¿Listo para poner a prueba tu conocimiento?
          </h3>
          <p className="practice-bridge-desc">
            Ejecuta consultas reales en el motor interactivo SQLite y consolida lo aprendido con retroalimentación inmediata.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={handleGoToPractice}
          icon={ArrowRight}
          iconPosition="right"
          style={{
            background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))',
            boxShadow: '0 4px 18px rgba(6, 182, 212, 0.35)',
            fontWeight: 700
          }}
        >
          ¡Poner en práctica en el Taller!
        </Button>
      </footer>
    </article>
  );
}
