/**
 * @file ExerciseCard.jsx
 * @description Componente para mostrar la tarjeta del desafío activo con su consigna, pistas y feedback de validación.
 */

import React, { useState, useEffect, memo } from 'react';
import { ExerciseValidatorService } from '../../services/exerciseValidator.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { Target, Lightbulb, CheckCircle2, XCircle } from 'lucide-react';

export const ExerciseCard = memo(function ExerciseCard({ exercise, currentResult }) {
  const { completeExercise } = useProgress();
  const [showHint, setShowHint] = useState(false);
  const [evaluation, setEvaluation] = useState(null);

  useEffect(() => {
    if (currentResult && exercise) {
      const res = ExerciseValidatorService.validate(exercise, currentResult);
      setEvaluation(res);
      if (res.isPassed) {
        completeExercise(exercise.id);
      }
    } else {
      setEvaluation(null);
    }
  }, [currentResult, exercise]);

  if (!exercise) return null;

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header del Desafío */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)' }}>
          <Target size={20} />
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
            {exercise.title}
          </h3>
        </div>
        <span className="badge badge-amber">Desafío Práctico</span>
      </div>

      {/* Consigna / Prompt */}
      <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: 0, lineHeight: 1.6 }}>
        {exercise.prompt}
      </p>

      {/* Pistas Escalonadas */}
      {exercise.hints && exercise.hints.length > 0 && (
        <div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="btn-glass"
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', color: 'var(--accent-amber)' }}
          >
            <Lightbulb size={14} />
            {showHint ? 'Ocultar Pista' : '¿Necesitas una Pista?'}
          </button>

          {showHint && (
            <ul style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid var(--accent-amber-glow)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem 0.75rem 2.2rem', marginTop: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              {exercise.hints.map((h, i) => (
                <li key={i} style={{ marginBottom: '0.25rem' }}>{h}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Feedback de Evaluación de la Respuesta */}
      {evaluation && (
        <div
          style={{
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            background: evaluation.isPassed ? 'rgba(16, 185, 129, 0.12)' : 'rgba(244, 63, 94, 0.12)',
            border: evaluation.isPassed ? '1px solid var(--accent-emerald)' : '1px solid var(--accent-rose)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}
        >
          {evaluation.isPassed ? (
            <CheckCircle2 size={24} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
          ) : (
            <XCircle size={24} color="var(--accent-rose)" style={{ flexShrink: 0 }} />
          )}

          <div>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: evaluation.isPassed ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
              {evaluation.message}
            </h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {evaluation.details}
            </p>
          </div>
        </div>
      )}
    </div>
  );
});
