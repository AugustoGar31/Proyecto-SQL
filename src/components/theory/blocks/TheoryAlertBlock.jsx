/**
 * @file TheoryAlertBlock.jsx
 * @description Componente de alerta y callout semántico para notas de ingeniería, tips, advertencias y conceptos clave.
 */

import React from 'react';
import { Cpu, Sparkles, AlertTriangle, Info } from 'lucide-react';

const VARIANT_CONFIG = {
  production: {
    icon: Cpu,
    className: 'theory-alert-production',
    defaultTitle: 'Perspectiva de un Ingeniero de Base de Datos'
  },
  tip: {
    icon: Sparkles,
    className: 'theory-alert-tip',
    defaultTitle: 'Píldora de Micro-Aprendizaje / Pro-Tip'
  },
  warning: {
    icon: AlertTriangle,
    className: 'theory-alert-warning',
    defaultTitle: 'Precaución en Entornos de Producción'
  },
  info: {
    icon: Info,
    className: 'theory-alert-info',
    defaultTitle: 'Dato Técnico Clave'
  }
};

export function TheoryAlertBlock({ block }) {
  const { variant = 'tip', title, content } = block;
  const config = VARIANT_CONFIG[variant] || VARIANT_CONFIG.info;
  const IconComponent = config.icon;

  return (
    <aside className={`theory-alert-card ${config.className}`} role="note">
      <div className="theory-alert-icon-box" aria-hidden="true">
        <IconComponent size={20} />
      </div>

      <div className="theory-alert-body">
        <h5 className="theory-alert-title">
          {title || config.defaultTitle}
        </h5>
        <p className="theory-alert-content">
          {content}
        </p>
      </div>
    </aside>
  );
}
