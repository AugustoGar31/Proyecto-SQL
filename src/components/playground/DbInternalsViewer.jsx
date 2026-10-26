/**
 * @file DbInternalsViewer.jsx
 * @description Componente pedagógico para explicar la lógica conceptual de la consulta
 * y desglosar el camino de ejecución de la base de datos de forma amigable para principiantes.
 */

import React, { memo } from 'react';
import { Lightbulb, Sparkles, Terminal } from 'lucide-react';
import { getFriendlyExplanation } from '../../data/simpleExplanations.js';

export const DbInternalsViewer = memo(function DbInternalsViewer({
  queryResult,
  activeExercise,
  fallbackExplanation
}) {
  const explainPlan = queryResult && queryResult.explainPlan ? queryResult.explainPlan : null;

  // Obtener la explicación amigable para principiantes
  const friendly = activeExercise
    ? getFriendlyExplanation(activeExercise)
    : (typeof fallbackExplanation === 'string'
        ? {
            command: 'SQL General',
            summary: fallbackExplanation,
            tip: 'Prueba escribir distintas cláusulas para ver cómo responde la base de datos.'
          }
        : getFriendlyExplanation(null));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* 1. Tarjeta Principal: Explicación Lógica para Principiantes */}
      <div
        className="glass-panel"
        style={{
          borderColor: 'var(--accent-indigo-glow)',
          background: 'rgba(99, 102, 241, 0.06)',
          padding: '1.25rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.75rem',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)', fontWeight: 700 }}>
            <Lightbulb size={20} />
            <span style={{ fontSize: '0.98rem' }}>Lógica de la Instrucción (¿Por qué se usa?)</span>
          </div>
          <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
            {friendly.command}
          </span>
        </div>

        <p
          style={{
            color: '#ffffff',
            fontSize: '0.95rem',
            lineHeight: '1.6',
            margin: '0 0 0.85rem 0',
            fontWeight: 500
          }}
        >
          {friendly.summary}
        </p>

        {friendly.tip && (
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.5rem',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <Sparkles size={16} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              <strong style={{ color: 'var(--accent-cyan)' }}>Consejo mental:</strong> {friendly.tip}
            </span>
          </div>
        )}
      </div>

      {/* 2. Ruta de Acceso en la Base de Datos */}
      <div className="glass-panel" style={{ padding: '1.1rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--accent-secondary)',
            fontWeight: 600,
            marginBottom: '0.65rem'
          }}
        >
          <Terminal size={17} />
          <span style={{ fontSize: '0.88rem' }}>Ruta de acceso en la Base de Datos:</span>
        </div>

        {explainPlan && explainPlan.length > 0 ? (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem'
            }}
          >
            {explainPlan.map((step, idx) => (
              <li
                key={idx}
                style={{
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.82rem',
                  color: 'var(--accent-cyan)',
                  background: 'rgba(6, 182, 212, 0.06)',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--accent-cyan-glow)'
                }}
              >
                {step}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            Ejecuta tu consulta en el editor para ver el paso a paso que realiza SQLite al buscar en las tablas.
          </p>
        )}
      </div>
    </div>
  );
});
