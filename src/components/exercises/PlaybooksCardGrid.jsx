/**
 * @file PlaybooksCardGrid.jsx
 * @description Vista Principal de Libretos Temáticos en Cuadrados Medianos (Grid).
 * Cada Libreto cuenta con color temático propio y vibrante, resplandor neón,
 * métricas de progreso y micro-interacciones fluidas.
 */

import React from 'react';
import {
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
  Lock,
  CheckCircle2,
  ArrowRight
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
  Cpu
};

// Mapeo de resplandores neón por color o código
const GLOW_MAP = {
  DQL: 'rgba(6, 182, 212, 0.35)',
  DML: 'rgba(16, 185, 129, 0.35)',
  DDL: 'rgba(245, 158, 11, 0.35)',
  TCL: 'rgba(244, 63, 94, 0.35)',
  PROCEDURAL: 'rgba(168, 85, 247, 0.35)'
};

export function PlaybooksCardGrid({ playbooks, onSelectPlaybook, selectedPlaybookId }) {
  return (
    <div className="playbooks-square-grid">
      {playbooks.map((pb) => {
        const Icon = ICON_MAP[pb.icon] || Code2;
        const isUnlocked = pb.isUnlocked;
        const stats = pb.stats || { completed: 0, total: 0, percentage: 0, isCompleted: false };
        const glowColor = GLOW_MAP[pb.code] || 'rgba(6, 182, 212, 0.3)';
        const isSelected = selectedPlaybookId === pb.id;

        return (
          <div
            key={pb.id}
            onClick={() => isUnlocked && onSelectPlaybook(pb.id)}
            className={`playbook-square-card ${!isUnlocked ? 'is-locked' : ''} ${isSelected ? 'is-active' : ''}`}
            style={{
              '--playbook-accent': pb.color,
              '--playbook-glow': glowColor
            }}
            role="button"
            tabIndex={isUnlocked ? 0 : -1}
            aria-disabled={!isUnlocked}
          >
            {/* 1. Cabecera de la Tarjeta */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-sm)',
                    background: isUnlocked ? `linear-gradient(135deg, ${pb.color}22, ${pb.color}44)` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${isUnlocked ? pb.color : 'rgba(255,255,255,0.08)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isUnlocked ? pb.color : 'var(--text-muted)',
                    boxShadow: isUnlocked ? `0 0 16px ${pb.color}33` : 'none'
                  }}
                >
                  {isUnlocked ? <Icon size={22} /> : <Lock size={20} />}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                  <span className={`badge ${pb.badgeClass}`} style={{ fontSize: '0.72rem', fontWeight: 700 }}>
                    {pb.code}
                  </span>
                  <span
                    style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      padding: '0.15rem 0.45rem',
                      borderRadius: 'var(--radius-full)'
                    }}
                  >
                    {stats.total} {stats.total === 1 ? 'Actividad' : 'Actividades'}
                  </span>
                  {stats.isCompleted && (
                    <span
                      style={{
                        background: 'rgba(16, 185, 129, 0.15)',
                        border: '1px solid var(--accent-emerald)',
                        color: 'var(--accent-emerald)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.2rem 0.45rem',
                        borderRadius: 'var(--radius-full)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.2rem'
                      }}
                    >
                      <CheckCircle2 size={12} /> 100%
                    </span>
                  )}
                </div>
              </div>

              {/* 2. Título & Subtítulo */}
              <h2
                style={{
                  fontSize: '1.12rem',
                  color: isUnlocked ? '#ffffff' : 'var(--text-muted)',
                  margin: '0 0 0.3rem 0',
                  fontWeight: 700,
                  lineHeight: 1.3
                }}
              >
                {pb.title}
              </h2>
              <p
                style={{
                  fontSize: '0.82rem',
                  color: isUnlocked ? pb.color : 'var(--text-muted)',
                  margin: '0 0 0.65rem 0',
                  fontWeight: 600,
                  lineHeight: 1.35
                }}
              >
                {pb.subtitle}
              </p>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  margin: 0,
                  lineHeight: 1.45,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {pb.description}
              </p>
            </div>

            {/* 3. Footer con Progreso y Llamado a la Acción */}
            <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              {!isUnlocked ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#fca5a5', fontSize: '0.76rem', fontWeight: 500 }}>
                  <Lock size={13} /> Desbloquea completando el nivel anterior
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.76rem', marginBottom: '0.4rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Avance en el Libreto</span>
                    <span style={{ color: pb.color, fontWeight: 700 }}>
                      {stats.completed} / {stats.total} {stats.total === 1 ? 'Actividad' : 'Actividades'} ({stats.percentage}%)
                    </span>
                  </div>

                  {/* Barra de Progreso Dinámica */}
                  <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${stats.percentage}%`,
                        height: '100%',
                        background: stats.isCompleted ? 'var(--accent-emerald)' : pb.color,
                        boxShadow: `0 0 8px ${stats.isCompleted ? 'var(--accent-emerald)' : pb.color}`,
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.3rem', marginTop: '0.65rem', color: pb.color, fontSize: '0.78rem', fontWeight: 600 }}>
                    <span>Ver Katas</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
