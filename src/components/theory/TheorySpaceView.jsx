/**
 * @file TheorySpaceView.jsx
 * @description Espacio de Trabajo 1: Teoría y Plan de Estudio.
 * Layout limpio en 2 columnas (Syllabus lateral + Lector Teórico).
 */

import React from 'react';
import { SyllabusViewer } from './SyllabusViewer.jsx';
import { LessonContent } from './LessonContent.jsx';

export function TheorySpaceView() {
  return (
    <div className="space-container">
      <div className="theory-grid">
        <SyllabusViewer />
        <LessonContent />
      </div>
    </div>
  );
}
