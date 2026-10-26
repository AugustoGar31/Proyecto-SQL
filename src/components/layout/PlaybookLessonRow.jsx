import React, { memo } from 'react';
import { CheckCircle2, Clock, Circle, Lock } from 'lucide-react';

/**
 * Componente atómico para renderizar la fila de una lección individual en el sidebar.
 */
export const PlaybookLessonRow = memo(function PlaybookLessonRow({
  lesson,
  isSelected,
  status,
  isUnlocked,
  onClick
}) {
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
    statusBadge = <Circle size={12} color="var(--text-muted)" />;
  }

  return (
    <button
      onClick={onClick}
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
        {lesson.title}
      </span>
      {statusBadge}
    </button>
  );
});
