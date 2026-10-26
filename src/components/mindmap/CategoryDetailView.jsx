/**
 * @file CategoryDetailView.jsx
 * @description Vista detallada (Drill-down) para una categoría específica del Mapa Mental SQL.
 * Muestra la descripción completa, el listado de comandos y la navegación de regreso al mapa principal.
 */

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Terminal, Sparkles, Database } from 'lucide-react';

// Variantes de animación para Framer Motion (estáticas)
const CONTAINER_VARIANTS = {
  hidden: { opacity: 0, scale: 0.96, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.06
    }
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    y: -15,
    transition: { duration: 0.2, ease: 'easeInOut' }
  }
};

const ITEM_VARIANTS = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

export const CategoryDetailView = memo(function CategoryDetailView({
  category,
  onBack,
  onPracticeCommand
}) {

  if (!category) return null;

  return (
    <motion.div
      className="category-detail-container"
      variants={CONTAINER_VARIANTS}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Barra Superior con Botón Volver al Mapa */}
      <div className="category-detail-topbar">
        <button
          onClick={onBack}
          className="btn-back-map"
          style={{ '--cat-color': category.color }}
        >
          <ArrowLeft size={18} />
          <span>Volver al Mapa</span>
        </button>

        <span
          className="badge"
          style={{
            background: category.bgGlow,
            color: category.color,
            borderColor: category.borderColor,
            fontSize: '0.82rem',
            padding: '0.35rem 0.8rem'
          }}
        >
          {category.shortLabel}
        </span>
      </div>

      {/* Cabecera de la Categoría */}
      <motion.div
        className="category-detail-header glass-card"
        style={{
          borderLeft: `4px solid ${category.color}`,
          boxShadow: `0 0 25px ${category.bgGlow}`
        }}
        variants={ITEM_VARIANTS}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div
            className="category-header-icon"
            style={{
              background: category.bgGlow,
              color: category.color,
              border: `1px solid ${category.color}`
            }}
          >
            <Database size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
              {category.title}
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {category.subtitle}
            </span>
          </div>
        </div>

        <p style={{ color: 'var(--text-primary)', fontSize: '1rem', lineHeight: 1.6, margin: '0.75rem 0 0 0' }}>
          {category.description}
        </p>
      </motion.div>

      {/* Sección de Comandos Detallados */}
      <div style={{ marginTop: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          <Sparkles size={16} color={category.color} />
          <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Comandos y Operaciones Clave ({category.commands.length})
          </span>
        </div>

        <div className="commands-grid">
          {category.commands.map((cmd, idx) => (
            <motion.div
              key={idx}
              className="command-card glass-card"
              variants={ITEM_VARIANTS}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              style={{ '--cmd-color': category.color }}
            >
              <div className="command-card-header">
                <code className="command-badge" style={{ color: category.color, borderColor: `${category.color}50` }}>
                  {cmd.name}
                </code>
                {cmd.lessonId && (
                  <button
                    onClick={() => onPracticeCommand && onPracticeCommand(cmd.lessonId)}
                    className="btn-command-practice"
                    title="Ir a practicar este comando"
                  >
                    <Terminal size={14} />
                    <span>Practicar</span>
                  </button>
                )}
              </div>

              <p className="command-description">
                {cmd.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
});
