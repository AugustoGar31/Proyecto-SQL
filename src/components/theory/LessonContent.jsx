/**
 * @file LessonContent.jsx
 * @description Componente de renderizado para el contenido teórico y la perspectiva de ingeniería.
 */

import React from 'react';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useView } from '../../context/ViewContext.jsx';
import { BookOpen, Terminal, Cpu } from 'lucide-react';

export function LessonContent() {
  const { currentLesson } = useProgress();
  const { setActiveView } = useView();

  if (!currentLesson) return null;

  return (
    <article className="glass-card" style={{ padding: '1.75rem' }}>
      {/* Cabecera de la Lección */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <span className="badge badge-indigo">Lección Activa</span>
          <button
            onClick={() => setActiveView('playground')}
            className="btn-primary"
            style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
          >
            <Terminal size={15} />
            Ir al Taller Práctico SQL
          </button>
        </div>
        <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0 }}>
          {currentLesson.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.4rem' }}>
          {currentLesson.summary}
        </p>
      </div>

      {/* Perspectiva de Ingeniero de Producción */}
      {currentLesson.engineerPerspective && (
        <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--accent-indigo-glow)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-indigo)', fontWeight: 700, marginBottom: '0.5rem' }}>
            <Cpu size={20} />
            <span>💡 Cómo piensa un Ingeniero de Producción:</span>
          </div>
          <div className="markdown-body" style={{ color: '#e2e8f0' }}>
            {currentLesson.engineerPerspective}
          </div>
        </div>
      )}

      {/* Contenido Teórico Principal */}
      <div className="markdown-body">
        {currentLesson.contentMarkdown}
      </div>
    </article>
  );
}
