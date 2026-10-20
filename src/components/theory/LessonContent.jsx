/**
 * @file LessonContent.jsx
 * @description Componente de renderizado para el contenido teórico y la perspectiva de ingeniería.
 */

import React from 'react';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useView } from '../../context/ViewContext.jsx';
import { Button } from '../common/Button.jsx';
import { Terminal, Cpu, ArrowRight } from 'lucide-react';

export function LessonContent() {
  const { currentLesson } = useProgress();
  const { setActiveView } = useView();

  if (!currentLesson) return null;

  return (
    <article className="glass-card" style={{ padding: '2rem' }}>
      {/* Cabecera de la Lección */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span className="badge badge-indigo">Lección Activa</span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setActiveView('playground')}
            icon={Terminal}
          >
            Ir al Taller Práctico
          </Button>
        </div>
        <h2 style={{ fontSize: '1.65rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
          {currentLesson.title}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginTop: '0.45rem', lineHeight: 1.6 }}>
          {currentLesson.summary}
        </p>
      </div>

      {/* Perspectiva de Ingeniero de Producción */}
      {currentLesson.engineerPerspective && (
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid var(--accent-indigo-glow)', borderRadius: 'var(--radius-md)', padding: '1.35rem', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-indigo)', fontWeight: 700, marginBottom: '0.5rem' }}>
            <Cpu size={20} />
            <span style={{ fontSize: '0.95rem' }}>💡 Cómo piensa un Ingeniero de Producción:</span>
          </div>
          <div className="markdown-body" style={{ color: '#e2e8f0' }}>
            {currentLesson.engineerPerspective}
          </div>
        </div>
      )}

      {/* Contenido Teórico Principal */}
      <div className="markdown-body" style={{ lineHeight: 1.75 }}>
        {currentLesson.contentMarkdown}
      </div>

      {/* Cierre de Lección y Puente Natural al Taller Práctico */}
      <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
        <div>
          <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem', fontWeight: 600 }}>¿Listo para aplicar lo aprendido?</h4>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Pon a prueba tu comprensión ejecutando consultas reales en el motor interactivo SQLite.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => setActiveView('playground')}
          icon={ArrowRight}
          iconPosition="right"
        >
          Practicar en el Taller SQL
        </Button>
      </div>
    </article>
  );
}
