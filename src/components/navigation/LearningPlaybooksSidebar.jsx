/**
 * @file LearningPlaybooksSidebar.jsx
 * @description Sidebar de Navegación de Libretos de Aprendizaje con estructura jerárquica,
 * desbloqueo progresivo bloqueado y estados visuales (Superada, En Progreso, Pendiente, Bloqueada).
 */

import React, { useState } from 'react';
import { MODULES_DATA } from '../../data/modulesData.js';
import { SQL_CATEGORIES } from '../../data/categoriesData.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Lock,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Layers,
  Search,
  Wrench,
  ShieldCheck,
  Cpu,
  GraduationCap,
  Unlock
} from 'lucide-react';

const ICON_MAP = {
  GraduationCap,
  Search,
  Wrench,
  Layers,
  ShieldCheck,
  Cpu
};

export function LearningPlaybooksSidebar() {
  const {
    currentLesson,
    activeModuleId,
    selectLesson,
    isModuleUnlocked,
    getLessonStatus,
    getModuleStats,
    progressPercentage,
    completedCount,
    totalLessons,
    unlockAllModules
  } = useProgress();

  // Módulos colapsados/expandidos (por defecto, el módulo activo está expandido)
  const [expandedModules, setExpandedModules] = useState(() => {
    const initial = {};
    MODULES_DATA.forEach(m => { initial[m.id] = true; });
    return initial;
  });

  const [lockedAlert, setLockedAlert] = useState(null);

  const toggleModule = (modId) => {
    setExpandedModules(prev => ({
      ...prev,
      [modId]: !prev[modId]
    }));
  };

  const handleLessonClick = (lesId, modId) => {
    if (!isModuleUnlocked(modId)) {
      setLockedAlert(`🔒 Módulo bloqueado. Completa todas las lecciones anteriores para desbloquear.`);
      setTimeout(() => setLockedAlert(null), 3500);
      return;
    }
    selectLesson(lesId);
  };

  return (
    <aside className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%', minWidth: '290px' }}>
      {/* Header del Sidebar con Progreso Global */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-indigo)' }}>
            <BookOpen size={20} />
            <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>
              Libretos de Aprendizaje
            </h3>
          </div>
          <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
            {progressPercentage}%
          </span>
        </div>

        {/* Barra de Progreso Global */}
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden', marginTop: '0.4rem' }}>
          <div
            style={{
              width: `${progressPercentage}%`,
              height: '100%',
              background: 'linear-gradient(90deg, var(--accent-indigo), var(--accent-cyan))',
              transition: 'width 0.4s ease'
            }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
          <span>{completedCount} de {totalLessons} lecciones</span>
          <span>Desbloqueo lineal</span>
        </div>
      </div>

      {/* Alerta de Módulo Bloqueado */}
      {lockedAlert && (
        <div style={{ background: 'rgba(244, 63, 94, 0.12)', border: '1px solid var(--accent-rose)', borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.75rem', fontSize: '0.78rem', color: '#fca5a5' }}>
          {lockedAlert}
        </div>
      )}

      {/* Lista Jerárquica de Categorías y Módulos */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '68vh', overflowY: 'auto', paddingRight: '0.25rem' }}>
        {SQL_CATEGORIES.map((category) => {
          const CategoryIcon = ICON_MAP[category.icon] || BookOpen;
          const categoryModules = MODULES_DATA.filter(m => (category.moduleIds || []).includes(m.id));

          if (categoryModules.length === 0) return null;

          return (
            <div key={category.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {/* Encabezado de la Categoría */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.4rem', borderLeft: `3px solid ${category.color}`, background: 'rgba(255,255,255,0.02)', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>
                <CategoryIcon size={14} color={category.color} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {category.shortTitle}
                </span>
              </div>

              {/* Módulos dentro de esta Categoría */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingLeft: '0.4rem' }}>
                {categoryModules.map((mod) => {
                  const stats = getModuleStats(mod.id);
                  const isUnlocked = isModuleUnlocked(mod.id);
                  const isExpanded = !!expandedModules[mod.id];
                  const isCurrent = activeModuleId === mod.id;

                  return (
                    <div
                      key={mod.id}
                      style={{
                        borderRadius: 'var(--radius-sm)',
                        border: isCurrent ? '1px solid var(--accent-indigo)' : '1px solid rgba(255, 255, 255, 0.05)',
                        background: isCurrent ? 'rgba(99, 102, 241, 0.08)' : 'rgba(0, 0, 0, 0.2)',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Acordeón del Módulo */}
                      <button
                        onClick={() => toggleModule(mod.id)}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '0.55rem 0.75rem',
                          background: 'transparent',
                          border: 'none',
                          color: isUnlocked ? '#ffffff' : 'var(--text-muted)',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flex: 1, overflow: 'hidden' }}>
                          {isUnlocked ? (
                            stats.isCompleted ? (
                              <CheckCircle2 size={14} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                            ) : (
                              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: category.color, flexShrink: 0 }} />
                            )
                          ) : (
                            <Lock size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                          )}
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {mod.title}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span style={{ fontSize: '0.7rem', color: isUnlocked ? 'var(--text-secondary)' : 'var(--text-muted)' }}>
                            {stats.completed}/{stats.total}
                          </span>
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </div>
                      </button>

                      {/* Lista de Lecciones del Módulo */}
                      {isExpanded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.2rem 0.5rem 0.5rem 0.5rem', background: 'rgba(0,0,0,0.15)' }}>
                          {mod.lessons.map((les) => {
                            const isSelected = currentLesson && currentLesson.id === les.id;
                            const status = getLessonStatus(les.id, mod.id);

                            let statusIcon = <Circle size={13} color="var(--text-muted)" />;
                            if (status === 'completed') {
                              statusIcon = <CheckCircle2 size={14} color="var(--accent-emerald)" />;
                            } else if (status === 'in-progress') {
                              statusIcon = <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-cyan)', boxShadow: '0 0 8px var(--accent-cyan)' }} />;
                            } else if (status === 'locked') {
                              statusIcon = <Lock size={12} color="rgba(255,255,255,0.2)" />;
                            }

                            return (
                              <button
                                key={les.id}
                                onClick={() => handleLessonClick(les.id, mod.id)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: '0.5rem',
                                  padding: '0.45rem 0.65rem',
                                  borderRadius: 'var(--radius-sm)',
                                  border: isSelected ? '1px solid var(--accent-cyan)' : '1px solid transparent',
                                  background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                                  color: isSelected ? '#ffffff' : status === 'locked' ? 'var(--text-muted)' : 'var(--text-secondary)',
                                  fontSize: '0.78rem',
                                  textAlign: 'left',
                                  cursor: status === 'locked' ? 'not-allowed' : 'pointer',
                                  opacity: status === 'locked' ? 0.6 : 1,
                                  transition: 'all 0.15s ease'
                                }}
                              >
                                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                  {les.title}
                                </span>
                                {statusIcon}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Acceso Rápido Modo Profesor / Unlock All */}
      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.6rem', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={unlockAllModules}
          className="btn-glass"
          style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem', color: 'var(--text-muted)' }}
          title="Desbloquear todos los módulos para revisión docente"
        >
          <Unlock size={12} />
          Desbloquear Todo (Modo Docente)
        </button>
      </div>
    </aside>
  );
}
