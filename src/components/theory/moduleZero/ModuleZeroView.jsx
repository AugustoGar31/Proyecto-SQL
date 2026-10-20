/**
 * @file ModuleZeroView.jsx
 * @description Contenedor del Módulo Cero refactorizado a formato Micro-Learning (Stories / Flashcards).
 * Elimina la sobredosis de texto e implementa píldoras rápidas con botón permanente de escape al taller.
 */

import React from 'react';
import { MicroLearningCards } from './MicroLearningCards.jsx';

export function ModuleZeroView() {
  return (
    <article
      className="glass-card"
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        minHeight: '520px'
      }}
    >
      <MicroLearningCards />
    </article>
  );
}
