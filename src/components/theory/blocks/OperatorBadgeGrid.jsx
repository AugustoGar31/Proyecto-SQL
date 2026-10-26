/**
 * @file OperatorBadgeGrid.jsx
 * @description Componente de grilla de operadores e insignias.
 * Reemplaza viñetas planas por tarjetas interactivas con badges de sintaxis y micro-explicaciones.
 */

import React from 'react';
import { Layers } from 'lucide-react';

export function OperatorBadgeGrid({ block }) {
  const { title, description, items = [] } = block;

  return (
    <section className="operator-grid-section">
      <div className="operator-grid-header">
        <h4 className="operator-grid-title">
          <Layers size={18} style={{ color: 'var(--accent-cyan)' }} />
          <span>{title || 'Operadores y Sintaxis'}</span>
        </h4>
        {description && <p className="operator-grid-desc">{description}</p>}
      </div>

      <div className="operator-cards-container">
        {items.map((item, idx) => (
          <div key={idx} className="operator-card">
            <div className="operator-card-top">
              <span className="operator-badge-token">{item.badge}</span>
              <span className="operator-card-name">{item.name}</span>
            </div>

            {item.syntax && (
              <div className="operator-card-syntax">
                <code>{item.syntax}</code>
              </div>
            )}

            <p className="operator-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
