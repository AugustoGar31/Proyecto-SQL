/**
 * @file ExerciseCard.jsx
 * @description Componente para mostrar la tarjeta del desafío activo con su consigna,
 * sistema de pistas escalonadas (3 niveles) y feedback de validación en tiempo real.
 */

import React, { useState, useEffect, memo } from 'react';
import { ExerciseValidatorService } from '../../services/exerciseValidator.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { TieredHintsPanel } from './TieredHintsPanel.jsx';
import { Target, CheckCircle2, XCircle, Building } from 'lucide-react';

export const ExerciseCard = memo(function ExerciseCard({ exercise, currentResult }) {
  const { completeExercise } = useProgress();
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
  }, [currentResult, exercise, completeExercise]);

  if (!exercise) return null;

  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Header del Desafío */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)' }}>
          <Target size={20} />
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
            {exercise.title}
          </h3>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {exercise.category && (
            <span className="badge badge-indigo">{exercise.category}</span>
          )}
          <span className="badge badge-amber">Desafío Práctico</span>
        </div>
      </div>

      {/* Caso de Negocio / Contexto si existe */}
      {exercise.businessCase && (
        <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid var(--accent-indigo-glow)', borderRadius: 'var(--radius-sm)', padding: '0.6rem 0.8rem', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
          <Building size={16} color="var(--accent-indigo)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.4 }}>
            <strong style={{ color: 'var(--accent-cyan)' }}>{exercise.businessCase.department}:</strong> {exercise.businessCase.scenario}
          </div>
        </div>
      )}

      {/* Consigna / Prompt Principal */}
      <p style={{ color: 'var(--text-primary)', fontSize: '0.94rem', margin: 0, lineHeight: 1.6 }}>
        {exercise.prompt}
      </p>

      {/* Sistema de Pistas Escalonadas Multinivel */}
      <TieredHintsPanel hints={exercise.hints} />

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
