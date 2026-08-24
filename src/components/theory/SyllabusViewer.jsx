/**
 * @file SyllabusViewer.jsx
 * @description Panel lateral de navegación para los 10 Módulos y Lecciones del currículum.
 */

import React from 'react';
import { MODULES_DATA } from '../../data/modulesData.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { CheckCircle2, Circle, BookOpen } from 'lucide-react';

export function SyllabusViewer() {
  const { currentLesson, selectLesson, progress } = useProgress();

  return (
    <aside className="glass-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)' }}>
        <BookOpen size={20} color="var(--accent-indigo)" />
        <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>
          Plan de Estudio (10 Módulos)
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '72vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
        {MODULES_DATA.map((mod) => (
          <div key={mod.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-indigo)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {mod.title}
            </span>

            {mod.lessons.map((les) => {
              const isSelected = currentLesson && currentLesson.id === les.id;
              const isCompleted = progress.completedLessons.includes(les.id);

              return (
                <button
                  key={les.id}
                  onClick={() => selectLesson(les.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'space-between',
                    gap: '0.5rem',
                    padding: '0.6rem 0.8rem',
                    borderRadius: 'var(--radius-sm)',
                    border: isSelected ? '1px solid var(--accent-indigo)' : '1px solid transparent',
                    background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.02)',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    fontSize: '0.85rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {les.title}
                  </span>
                  {isCompleted ? (
                    <CheckCircle2 size={16} color="var(--accent-emerald)" />
                  ) : (
                    <Circle size={16} color="var(--text-muted)" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </aside>
  );
}
