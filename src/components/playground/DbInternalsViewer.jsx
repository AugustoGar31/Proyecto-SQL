/**
 * @file DbInternalsViewer.jsx
 * @description Componente para inspeccionar el Plan de Ejecución conceptual "Bajo el Capó" de la BD.
 */

import React, { memo } from 'react';
import { Cpu, Zap, Activity } from 'lucide-react';

export const DbInternalsViewer = memo(function DbInternalsViewer({ queryResult, exerciseExplanation }) {
  const explainPlan = queryResult && queryResult.explainPlan ? queryResult.explainPlan : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Explicación del Plan de Ejecución */}
      <div className="glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-secondary)', fontWeight: 700, marginBottom: '0.75rem' }}>
          <Cpu size={20} />
          <span>⚡ Plan de Ejecución Estimado (Execution Plan):</span>
        </div>

        {explainPlan && explainPlan.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {explainPlan.map((step, idx) => (
              <li key={idx} style={{ fontFamily: 'var(--font-code)', fontSize: '0.85rem', color: 'var(--accent-cyan)', background: 'rgba(6, 182, 212, 0.08)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--accent-cyan-glow)' }}>
                {step}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', margin: 0 }}>
            Ejecuta una consulta SQL para desglosar su estrategia de acceso a almacenamiento.
          </p>
        )}
      </div>

      {/* Perspectiva Interna del Ejercicio */}
      {exerciseExplanation && exerciseExplanation.underTheHood && (
        <div className="glass-panel" style={{ borderColor: 'var(--accent-amber-glow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)', fontWeight: 700, marginBottom: '0.5rem' }}>
            <Zap size={18} />
            <span>🧠 ¿Cómo procesó la BD este reto?</span>
          </div>
          <p style={{ color: 'var(--text-primary)', fontSize: '0.88rem', margin: 0 }}>
            {exerciseExplanation.underTheHood}
          </p>
        </div>
      )}
    </div>
  );
});
