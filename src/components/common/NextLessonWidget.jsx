/**
 * @file NextLessonWidget.jsx
 * @description Widget motivacional de Gamificación (CTA inteligente) que recomienda
 * y permite reanudar con un solo clic la siguiente lección pendiente en el aprendizaje.
 */

import React from 'react';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useView } from '../../context/ViewContext.jsx';
import { Button } from './Button.jsx';
import { Rocket, ArrowRight } from 'lucide-react';

export function NextLessonWidget({ compact = false }) {
  const { nextRecommendedLesson, selectLesson, progressPercentage } = useProgress();
  const { setActiveView } = useView();

  if (!nextRecommendedLesson || !nextRecommendedLesson.lesson) return null;

  const isAllDone = progressPercentage === 100;

  const handleContinue = () => {
    selectLesson(nextRecommendedLesson.lesson.id);
    setActiveView('playground');
  };

  if (compact) {
    return (
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.12))',
          border: '1px solid var(--accent-indigo-glow)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.65rem 0.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Rocket size={12} /> Próximo Desafío
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
            {nextRecommendedLesson.playbookTitle}
          </span>
        </div>

        <div style={{ fontSize: '0.84rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {nextRecommendedLesson.lesson.title}
        </div>

        <Button
          variant="primary"
          size="sm"
          fullWidth
          onClick={handleContinue}
          icon={ArrowRight}
          iconPosition="right"
          style={{ marginTop: '0.2rem', padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
        >
          {isAllDone ? 'Repasar Lección' : 'Continuar Lección'}
        </Button>
      </div>
    );
  }

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.25rem',
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(99, 102, 241, 0.15))',
        border: '1px solid var(--accent-indigo-glow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)',
            flexShrink: 0
          }}
        >
          <Rocket size={22} />
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              🎯 Tu Siguiente Paso en la Ruta
            </span>
            <span className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>
              {nextRecommendedLesson.playbookTitle}
            </span>
          </div>

          <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0, fontWeight: 600 }}>
            {nextRecommendedLesson.lesson.title}
          </h3>
          <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            {nextRecommendedLesson.playbookSubtitle || 'Continúa acumulando experiencia y desbloqueando módulos.'}
          </p>
        </div>
      </div>

      <Button
        variant="primary"
        size="md"
        onClick={handleContinue}
        icon={ArrowRight}
        iconPosition="right"
      >
        {isAllDone ? 'Volver a Practicar' : 'Continuar Lección'}
      </Button>
    </div>
  );
}
