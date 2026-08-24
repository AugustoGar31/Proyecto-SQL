/**
 * @file ExerciseHubView.jsx
 * @description Espacio de Trabajo 4: Catálogo de Katas / Desafíos (Estilo LeetCode / SQLZoo).
 * Permite filtrar desafíos por módulo, nivel de dificultad y estado de resolución.
 */

import React, { useState } from 'react';
import { MODULES_DATA } from '../../data/modulesData.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useView } from '../../context/ViewContext.jsx';
import { Dumbbell, CheckCircle2, Circle, ArrowRight, Filter, Search } from 'lucide-react';

export function ExerciseHubView() {
  const { selectLesson, progress } = useProgress();
  const { setActiveView } = useView();
  const [filter, setFilter] = useState('ALL'); // 'ALL' | 'COMPLETED' | 'PENDING'

  // Extraer todos los ejercicios del curriculum
  const allExercises = MODULES_DATA.flatMap(m => 
    m.lessons.flatMap(l => 
      (l.exercises || []).map(ex => ({
        ...ex,
        moduleTitle: m.title,
        lessonId: l.id,
        lessonTitle: l.title
      }))
    )
  );

  const filtered = allExercises.filter(ex => {
    const isDone = progress.completedExercises.includes(ex.id);
    if (filter === 'COMPLETED') return isDone;
    if (filter === 'PENDING') return !isDone;
    return true;
  });

  const handleStartExercise = (lessonId) => {
    selectLesson(lessonId);
    setActiveView('playground');
  };

  return (
    <div className="space-container">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-amber)' }}>
            <Dumbbell size={28} />
            <h1 style={{ fontSize: '1.75rem', color: '#ffffff', margin: 0 }}>
              Catálogo de Katas y Desafíos SQL
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Pon a prueba tus habilidades de ingeniería de bases de datos resolviendo retos reales de producción.
          </p>
        </div>

        {/* Filtros */}
        <div className="space-tabs">
          <button onClick={() => setFilter('ALL')} className={`tab-btn ${filter === 'ALL' ? 'active' : ''}`}>
            Todos ({allExercises.length})
          </button>
          <button onClick={() => setFilter('COMPLETED')} className={`tab-btn ${filter === 'COMPLETED' ? 'active' : ''}`}>
            Completados ({progress.completedExercises.length})
          </button>
          <button onClick={() => setFilter('PENDING')} className={`tab-btn ${filter === 'PENDING' ? 'active' : ''}`}>
            Pendientes ({allExercises.length - progress.completedExercises.length})
          </button>
        </div>
      </div>

      {/* Grid de Tarjetas de Katas */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filtered.map((ex) => {
          const isDone = progress.completedExercises.includes(ex.id);
          return (
            <div key={ex.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <span className="badge badge-amber">{ex.moduleTitle.split('.')[0]}</span>
                  {isDone ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: 600 }}>
                      <CheckCircle2 size={16} /> Resuelto
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                      <Circle size={16} /> Pendiente
                    </div>
                  )}
                </div>

                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                  {ex.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {ex.prompt}
                </p>
              </div>

              <button
                onClick={() => handleStartExercise(ex.lessonId)}
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
              >
                {isDone ? 'Volver a Resolver' : 'Iniciar Desafío'}
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
