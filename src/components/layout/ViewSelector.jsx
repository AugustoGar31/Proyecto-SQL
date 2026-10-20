/**
 * @file ViewSelector.jsx
 * @description Selector de Vistas / Espacios de Trabajo de la aplicación.
 * Permite cambiar entre:
 * 🎓 Teoría & Plan de Estudio
 * 💻 Taller SQL (Playground)
 * 🧠 Mapa Mental Interactivo
 * 🏋️ Catálogo de Desafíos (Katas)
 * 📊 Explorador de Esquemas (ERD)
 */

import React from 'react';
import { Home, BookOpen, Terminal, Network, Dumbbell, Database } from 'lucide-react';
import { useView } from '../../context/ViewContext.jsx';

export function ViewSelector() {
  const { activeView, setActiveView, openHomeModal } = useView();

  const views = [
    { id: 'playground', label: 'Taller SQL', icon: Terminal },
    { id: 'theory', label: 'Teoría & Lecciones', icon: BookOpen },
    { id: 'mindmap', label: 'Mapa Mental', icon: Network },
    { id: 'exercises', label: 'Catálogo Katas', icon: Dumbbell },
    { id: 'schema', label: 'Explorador ERD', icon: Database },
  ];

  return (
    <nav className="space-tabs" aria-label="Espacios de trabajo">
      {/* Botón de Inicio / Onboarding como acción accesible */}
      <button
        onClick={openHomeModal}
        className="tab-btn"
        style={{
          borderRight: '1px solid var(--border-subtle)',
          marginRight: '0.25rem',
          paddingRight: '0.85rem'
        }}
        title="Abrir Centro de Inicio y Guía de la Plataforma"
      >
        <Home size={15} color="var(--accent-cyan)" />
        <span style={{ color: 'var(--text-primary)' }}>Inicio</span>
      </button>

      {views.map((v) => {
        const Icon = v.icon;
        const isActive = activeView === v.id;
        return (
          <button
            key={v.id}
            onClick={() => setActiveView(v.id)}
            className={`tab-btn ${isActive ? 'active' : ''}`}
          >
            <Icon size={16} />
            <span>{v.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
