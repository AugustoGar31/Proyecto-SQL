/**
 * @file Badge.jsx
 * @description Componente visual para renderizar etiquetas de estado, categoría o dificultad.
 */

import React from 'react';

export function Badge({ children, variant = 'cyan' }) {
  return (
    <span className={`badge badge-${variant}`}>
      {children}
    </span>
  );
}
