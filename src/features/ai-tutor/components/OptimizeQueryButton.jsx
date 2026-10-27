/**
 * @file OptimizeQueryButton.jsx
 * @description Botón "Optimizar Consulta" para inyectar en el Editor SQL.
 * Diseñado con jerarquía visual secundaria/sutil para no competir con el Primary CTA "Ejecutar Consulta".
 */

import React from 'react';
import { Sparkles } from 'lucide-react';
import { emitAITutorAction } from '../hooks/useAITutor.js';

export function OptimizeQueryButton({ query, onOptimize, className = '', style = {} }) {
  const handleClick = (e) => {
    e.preventDefault();
    if (onOptimize) {
      onOptimize();
    } else {
      emitAITutorAction('OPTIMIZE_QUERY', { query: query || '' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`ai-optimize-btn ${className}`.trim()}
      style={style}
      title="Evaluar y optimizar consulta con NexoSQL AI Tutor (Enfoque de Rendimiento)"
    >
      <Sparkles size={14} color="var(--accent-indigo)" />
      <span>Optimizar</span>
    </button>
  );
}

export default OptimizeQueryButton;
