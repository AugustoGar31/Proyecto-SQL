/**
 * @file LearningPath.jsx
 * @description Visualizador modular de la ruta de aprendizaje con lecciones interactiva y estado de avance.
 */

import React from 'react';
import { MODULES_DATA } from '../../data/modulesData.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { CheckCircle2, Circle, Search, GitMerge, Zap, ShieldCheck } from 'lucide-react';

const ICON_MAP = {
  Search: Search,
  GitMerge: GitMerge,
  Zap: Zap,
  ShieldCheck: ShieldCheck
};

export const LearningPath = () => {
  const { progress, activeLessonId, selectLesson } = useProgress();

  return (
    <div className="card glass-card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ fontSize: '1.1rem', color: '#f8fafc', margin: 0 }}>
          🗺️ Ruta de Aprendizaje SQL
        </h2>
        <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
          Selecciona un tema para avanzar
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {MODULES_DATA.map((module) => {
          const IconComponent = ICON_MAP[module.icon] || Search;
          
          return (
            <div 
              key={module.id} 
              style={{ 
                background: 'rgba(15, 23, 42, 0.6)', 
                borderRadius: '10px', 
                padding: '1rem',
                border: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                <div style={{ color: '#06b6d4', background: 'rgba(6, 182, 212, 0.1)', padding: '0.4rem', borderRadius: '6px' }}>
                  <IconComponent size={18} />
                </div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e2e8f0', margin: 0 }}>
                  {module.title}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {module.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isCompleted = progress.completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => selectLesson(lesson.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justify: 'space-between',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '6px',
                        border: isActive ? '1px solid #6366f1' : '1px solid transparent',
                        background: isActive 
                          ? 'rgba(99, 102, 241, 0.2)' 
                          : 'rgba(255, 255, 255, 0.02)',
                        color: isActive ? '#ffffff' : '#cbd5e1',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        fontSize: '0.85rem'
                      }}
                    >
                      <span style={{ fontWeight: isActive ? 600 : 400 }}>
                        {lesson.title}
                      </span>

                      {isCompleted ? (
                        <CheckCircle2 size={16} color="#10b981" />
                      ) : (
                        <Circle size={16} color={isActive ? '#6366f1' : '#475569'} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
