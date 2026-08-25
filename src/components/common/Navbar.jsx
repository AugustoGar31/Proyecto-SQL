/**
 * @file Navbar.jsx
 * @description Encabezado principal de la plataforma con Logo, Selector de Vistas y Barra de Progreso.
 */

import React from 'react';
import { Database, Trophy, Sparkles } from 'lucide-react';
import { ViewSelector } from '../navigation/ViewSelector.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';

export function Navbar() {
  const { progressPercentage, progress } = useProgress();

  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        {/* Brand & Logo */}
        <div className="brand-logo">
          <div className="logo-icon">
            <img src="/navbar-logo.png" alt="NexoSQL Database Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          </div>
          <div>
            <span style={{ color: '#ffffff' }}>Nexo</span>
            <span style={{ color: 'var(--accent-cyan)' }}>SQL</span>
            <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '1px' }}>
              QueryMaster Academy
            </span>
          </div>
        </div>

        {/* Selector de Espacios de Trabajo */}
        <ViewSelector />

        {/* Métricas de Progreso del Estudiante */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <Trophy size={16} color="var(--accent-amber)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-amber)' }}>
              {progress.completedExercises ? progress.completedExercises.length * 100 : 0} pts
            </span>
          </div>

          <div style={{ width: '120px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
              <span>Avance</span>
              <span>{progressPercentage}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${progressPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald))',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
