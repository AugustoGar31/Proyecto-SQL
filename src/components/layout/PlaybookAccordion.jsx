import React, { memo } from 'react';
import { CheckCircle2, Lock, ChevronDown, ChevronRight, BookOpen } from 'lucide-react';

/**
 * Componente de acordeón colapsable para cada Libreto Temático en el Sidebar.
 */
export const PlaybookAccordion = memo(function PlaybookAccordion({
  playbook,
  icon: Icon = BookOpen,
  isUnlocked,
  isExpanded,
  isCurrentPlaybook,
  stats,
  onToggle,
  children
}) {
  return (
    <div
      style={{
        borderRadius: 'var(--radius-sm)',
        border: isCurrentPlaybook
          ? `1px solid ${playbook.color}`
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
      {/* Botón Cabecera del Libreto */}
      <button
        onClick={onToggle}
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
              <Icon size={16} color={playbook.color} style={{ flexShrink: 0 }} />
            )
          ) : (
            <Lock size={15} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          )}

          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: '0.84rem', color: isUnlocked ? '#ffffff' : 'var(--text-muted)' }}>
              {playbook.title}
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

      {/* Lista Desplegable de Lecciones Hijas */}
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
          {children}
        </div>
      )}
    </div>
  );
});
