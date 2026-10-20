/**
 * @file KatasSubGrid.jsx
 * @description Vista de Lecciones (Sub-Grid) dentro de un Libreto Temático.
 * Renderiza los ejercicios como Cuadrados Pequeños interactivos con indicadores sutiles de estado,
 * badges de industria y navegación instantánea hacia el Taller SQL.
 */

import React from 'react';
import { ArrowLeft, Building, Play } from 'lucide-react';
import { Button } from '../common/Button.jsx';

export function KatasSubGrid({
  playbook,
  onBack,
  onSelectKata,
  activeExerciseId,
  completedExerciseIds = []
}) {
  if (!playbook) return null;

  const isUnlocked = playbook.isUnlocked;
  const stats = playbook.stats || { completed: 0, total: 0, percentage: 0 };
  const items = playbook.items || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. Barra de Navegación Superior / Header del Libreto */}
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.85)',
          border: '1px solid var(--glass-border)',
          borderLeft: `4px solid ${playbook.color}`,
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-secondary)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(255, 255, 255, 0.04)'
            }}
          >
            <ArrowLeft size={16} />
            <span>Volver a Libretos</span>
          </Button>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className={`badge ${playbook.badgeClass}`} style={{ fontSize: '0.72rem' }}>
                {playbook.code}
              </span>
              <h2 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                {playbook.title}
              </h2>
            </div>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: playbook.color, fontWeight: 500 }}>
              {playbook.subtitle} — {playbook.description}
            </p>
          </div>
        </div>

        {/* Métricas del Libreto */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              padding: '0.35rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              color: '#ffffff',
              fontWeight: 600
            }}
          >
            {stats.completed} de {stats.total} Superadas ({stats.percentage}%)
          </span>
        </div>
      </div>

      {/* 2. Grid de Katas como Cuadrados Pequeños */}
      {items.length === 0 ? (
        <div
          style={{
            padding: '3rem 1.5rem',
            textAlign: 'center',
            background: 'rgba(15, 23, 42, 0.5)',
            border: '1px dashed var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)'
          }}
        >
          No hay desafíos que coincidan con los filtros actuales en este libreto.
        </div>
      ) : (
        <div className="katas-square-grid">
          {items.map((kata) => {
            const isDone = completedExerciseIds.includes(kata.id);
            const isInProgress = activeExerciseId === kata.id;

            return (
              <div
                key={kata.id}
                onClick={() => isUnlocked && onSelectKata(kata)}
                className={`kata-square-card ${isDone ? 'is-completed' : ''} ${isInProgress ? 'is-active' : ''}`}
                role="button"
                tabIndex={0}
              >
                {/* Cabecera del Cuadrado Pequeño */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.65rem' }}>
                    {/* Micro-indicador de Estado */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      {isDone ? (
                        <>
                          <span className="status-dot status-dot-done" />
                          <span style={{ color: 'var(--accent-emerald)', fontSize: '0.72rem', fontWeight: 600 }}>
                            Superada
                          </span>
                        </>
                      ) : isInProgress ? (
                        <>
                          <span className="status-dot status-dot-active" />
                          <span style={{ color: 'var(--accent-amber)', fontSize: '0.72rem', fontWeight: 600 }}>
                            En Curso
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="status-dot status-dot-pending" />
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                            Pendiente
                          </span>
                        </>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        color: 'var(--text-secondary)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        padding: '0.15rem 0.4rem',
                        borderRadius: 'var(--radius-xs)',
                        border: '1px solid rgba(255, 255, 255, 0.08)'
                      }}
                    >
                      {kata.category || 'SQL'}
                    </span>
                  </div>

                  {/* Título Conciso y Directo */}
                  <h3
                    style={{
                      fontSize: '0.92rem',
                      color: '#ffffff',
                      margin: '0 0 0.4rem 0',
                      lineHeight: 1.35,
                      fontWeight: 600,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {kata.title}
                  </h3>

                  {/* Micro-tag de Industria o Caso de Negocio */}
                  {kata.businessCase?.department && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.72rem',
                        fontWeight: 500,
                        marginTop: '0.35rem'
                      }}
                    >
                      <Building size={12} style={{ flexShrink: 0 }} />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {kata.businessCase.department}
                      </span>
                    </div>
                  )}
                </div>

                {/* Footer del Cuadradito */}
                <div
                  style={{
                    paddingTop: '0.65rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      color: isDone ? 'var(--accent-emerald)' : 'var(--text-muted)',
                      fontWeight: 500
                    }}
                  >
                    {isDone ? 'Completado' : 'Resolver'}
                  </span>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.2rem',
                      color: isDone ? 'var(--accent-emerald)' : 'var(--accent-cyan)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}
                  >
                    <Play size={11} fill="currentColor" />
                    <span>Entrenar</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
