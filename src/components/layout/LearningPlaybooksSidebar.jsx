/**
 * @file LearningPlaybooksSidebar.jsx
 * @description Sidebar de Navegación de Libretos Temáticos con jerarquía estricta (1 al 10),
 * navegación acordeón suave, estados visuales (Superada, En Progreso, Pendiente, Bloqueada)
 * y motor de desbloqueo progresivo 100%.
 */

import React, { useState } from 'react';
import { MODULES_DATA } from '../../data/curriculum/index.js';
import { THEMATIC_PLAYBOOKS, MODULE_ZERO_PLAYBOOK } from '../../data/playbooksData.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { NextLessonWidget } from '../common/NextLessonWidget.jsx';
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Lock,
  ChevronDown,
  ChevronRight,
  Search,
  PieChart,
  GitMerge,
  Code2,
  Sliders,
  Wrench,
  Layers,
  Zap,
  ShieldCheck,
  Cpu,
  GraduationCap
} from 'lucide-react';

const ICON_MAP = {
  Search,
  PieChart,
  GitMerge,
  Code2,
  Sliders,
  Wrench,
  Layers,
  Zap,
  ShieldCheck,
  Cpu,
  GraduationCap
};

export function LearningPlaybooksSidebar() {
  const {
    currentLesson,
    activeModuleId,
    selectLesson,
    isModuleUnlocked,
    isPlaybookUnlocked,
    getPlaybookStats,
    getLessonStatus,
    progressPercentage,
    completedCount,
    totalLessons
  } = useProgress();

  // Lista unificada: Módulo 0 + los 10 Libretos Temáticos
  const allPlaybooks = [MODULE_ZERO_PLAYBOOK, ...THEMATIC_PLAYBOOKS];

  // Módulos colapsados/expandidos (por defecto, el activo está abierto)
  const [expandedPlaybooks, setExpandedPlaybooks] = useState(() => {
    const initial = {};
    allPlaybooks.forEach((pb, idx) => {
      // Expandir los primeros desbloqueados por defecto
      initial[pb.id] = idx <= 1;
    });
    return initial;
  });

  const [lockedAlert, setLockedAlert] = useState(null);

  const togglePlaybook = (playbookId, isUnlocked) => {
    if (!isUnlocked) {
      setLockedAlert('🔒 Libreto bloqueado. Debes completar el 100% del libreto anterior para desbloquearlo.');
      setTimeout(() => setLockedAlert(null), 3500);
      return;
    }
    setExpandedPlaybooks(prev => ({
      ...prev,
      [playbookId]: !prev[playbookId]
    }));
  };

  const handleLessonClick = (lesId, modId, isUnlocked) => {
    if (!isUnlocked) {
      setLockedAlert('🔒 Lección bloqueada. Supera el libreto anterior para avanzar en tu ruta.');
      setTimeout(() => setLockedAlert(null), 3500);
      return;
    }
    selectLesson(lesId);
  };

  return (
    <aside
      className="glass-card"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        height: '100%',
        minWidth: '310px'
      }}
    >
      {/* Header del Sidebar con Progreso Global */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-indigo)' }}>
            <BookOpen size={20} />
            <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
              Libretos Temáticos
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
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
          <span>{completedCount} de {totalLessons} superadas</span>
          <span style={{ color: 'var(--accent-cyan)' }}>Ruta Lineal</span>
        </div>
      </div>

      {/* Widget Inteligente de Próximo Paso (Gamificación CTA) */}
      <NextLessonWidget compact />

      {/* Alerta de Contenido Bloqueado */}
      {lockedAlert && (
        <div
          style={{
            background: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid var(--accent-rose)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.5rem 0.75rem',
            fontSize: '0.76rem',
            color: '#fca5a5',
            lineHeight: 1.4
          }}
        >
          {lockedAlert}
        </div>
      )}

      {/* Lista de los 10 Libretos Temáticos + Módulo 0 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          maxHeight: '62vh',
          overflowY: 'auto',
          paddingRight: '0.2rem'
        }}
      >
        {allPlaybooks.map((pb) => {
          const Icon = ICON_MAP[pb.icon] || BookOpen;
          const isUnlocked = isPlaybookUnlocked(pb.id);
          const stats = getPlaybookStats(pb.id);
          const isExpanded = isUnlocked && !!expandedPlaybooks[pb.id];
          const mod = MODULES_DATA.find(m => m.id === pb.moduleId);
          const lessons = mod ? mod.lessons || [] : [];
          const isCurrentPlaybook = activeModuleId === pb.moduleId;

          return (
            <div
              key={pb.id}
              style={{
                borderRadius: 'var(--radius-sm)',
                border: isCurrentPlaybook
                  ? `1px solid ${pb.color}`
                  : '1px solid rgba(255, 255, 255, 0.06)',
                background: isCurrentPlaybook
                  ? 'rgba(99, 102, 241, 0.08)'
                  : isUnlocked
                  ? 'rgba(15, 23, 42, 0.65)'
                  : 'rgba(15, 23, 42, 0.3)',
                opacity: isUnlocked ? 1 : 0.45,
                transition: 'all 0.25s ease',
                overflow: 'hidden'
              }}
            >
              {/* Botón Acordeón del Libreto */}
              <button
                onClick={() => togglePlaybook(pb.id, isUnlocked)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.65rem 0.75rem',
                  background: 'transparent',
                  border: 'none',
                  color: isUnlocked ? '#ffffff' : 'var(--text-muted)',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed',
                  textAlign: 'left',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, minWidth: 0 }}>
                  {isUnlocked ? (
                    stats.isCompleted ? (
                      <CheckCircle2 size={16} color="var(--accent-emerald)" style={{ flexShrink: 0 }} />
                    ) : (
                      <Icon size={16} color={pb.color} style={{ flexShrink: 0 }} />
                    )
                  ) : (
                    <Lock size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
                  )}

                  <div style={{ minWidth: 0, overflow: 'hidden' }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.84rem', color: isUnlocked ? '#ffffff' : 'var(--text-muted)' }}>
                      {pb.title}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
                  <span style={{ fontSize: '0.7rem', color: stats.isCompleted ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                    {stats.completed}/{stats.total}
                  </span>
                  {isUnlocked && (
                    isExpanded ? <ChevronDown size={14} color="var(--text-muted)" /> : <ChevronRight size={14} color="var(--text-muted)" />
                  )}
                </div>
              </button>

              {/* Lista Desplegable de Lecciones */}
              {isExpanded && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.25rem',
                    padding: '0.2rem 0.5rem 0.55rem 0.5rem',
                    background: 'rgba(0, 0, 0, 0.25)',
                    borderTop: '1px solid rgba(255, 255, 255, 0.04)'
                  }}
                >
                  {lessons.map((les) => {
                    const isSelected = currentLesson && currentLesson.id === les.id;
                    const status = getLessonStatus(les.id, pb.moduleId);

                    let statusBadge;
                    let rowStyle = {
                      background: 'transparent',
                      border: '1px solid transparent'
                    };

                    if (status === 'completed') {
                      statusBadge = (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-emerald)', fontSize: '0.7rem' }}>
                          <CheckCircle2 size={13} />
                        </div>
                      );
                      rowStyle.background = isSelected ? 'rgba(16, 185, 129, 0.12)' : 'rgba(16, 185, 129, 0.04)';
                      rowStyle.border = isSelected ? '1px solid var(--accent-emerald)' : '1px solid rgba(16, 185, 129, 0.15)';
                    } else if (status === 'in-progress') {
                      statusBadge = (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--accent-amber)', fontSize: '0.7rem' }}>
                          <Clock size={13} />
                        </div>
                      );
                      rowStyle.background = 'rgba(245, 158, 11, 0.12)';
                      rowStyle.border = '1px solid var(--accent-amber)';
                    } else if (status === 'locked') {
                      statusBadge = <Lock size={12} color="var(--text-muted)" />;
                    } else {
                      // Pendiente
                      statusBadge = <Circle size={12} color="var(--text-muted)" />;
                    }

                    return (
                      <button
                        key={les.id}
                        onClick={() => handleLessonClick(les.id, pb.moduleId, isUnlocked)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.5rem',
                          padding: '0.45rem 0.65rem',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.79rem',
                          color: isSelected ? '#ffffff' : status === 'completed' ? '#cbd5e1' : 'var(--text-secondary)',
                          cursor: isUnlocked ? 'pointer' : 'not-allowed',
                          textAlign: 'left',
                          transition: 'all 0.15s ease',
                          ...rowStyle
                        }}
                      >
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                          {les.title}
                        </span>
                        {statusBadge}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
