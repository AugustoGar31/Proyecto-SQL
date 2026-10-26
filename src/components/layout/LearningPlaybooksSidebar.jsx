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
import { PlaybookAccordion } from './PlaybookAccordion.jsx';
import { PlaybookLessonRow } from './PlaybookLessonRow.jsx';
import {
  BookOpen,
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
    isPlaybookUnlocked,
    getPlaybookStats,
    getLessonStatus,
    progressPercentage,
    completedCount,
    totalLessons
  } = useProgress();

  // Lista unificada: Módulo 0 + los 10 Libretos Temáticos
  const allPlaybooks = [MODULE_ZERO_PLAYBOOK, ...THEMATIC_PLAYBOOKS];

  // Módulos colapsados/expandidos (por defecto, los primeros 2 desbloqueados están abiertos)
  const [expandedPlaybooks, setExpandedPlaybooks] = useState(() => {
    const initial = {};
    allPlaybooks.forEach((pb, idx) => {
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
            <PlaybookAccordion
              key={pb.id}
              playbook={pb}
              icon={Icon}
              isUnlocked={isUnlocked}
              isExpanded={isExpanded}
              isCurrentPlaybook={isCurrentPlaybook}
              stats={stats}
              onToggle={() => togglePlaybook(pb.id, isUnlocked)}
            >
              {lessons.map((les) => {
                const isSelected = currentLesson && currentLesson.id === les.id;
                const status = getLessonStatus(les.id, pb.moduleId);

                return (
                  <PlaybookLessonRow
                    key={les.id}
                    lesson={les}
                    isSelected={isSelected}
                    status={status}
                    isUnlocked={isUnlocked}
                    onClick={() => handleLessonClick(les.id, pb.moduleId, isUnlocked)}
                  />
                );
              })}
            </PlaybookAccordion>
          );
        })}
      </div>
    </aside>
  );
}
