/**
 * @file TheorySpaceView.jsx
 * @description Espacio de Trabajo 1: Teoría y Plan de Estudio (Libretos de Aprendizaje).
 * Layout modular con Sidebar de Libretos + Lector Teórico / Módulo Cero Interactivo.
 */

import React from 'react';
import { LearningPlaybooksSidebar } from '../navigation/LearningPlaybooksSidebar.jsx';
import { LessonContent } from './LessonContent.jsx';
import { ModuleZeroView } from './moduleZero/ModuleZeroView.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';

export function TheorySpaceView() {
  const { currentLesson, activeModuleId } = useProgress();

  const isModuleZero = activeModuleId === 'mod-0-intro' || (currentLesson && currentLesson.id.startsWith('les-m0'));

  return (
    <div className="space-container">
      <div className="theory-grid" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '1.5rem', alignItems: 'start' }}>
        <LearningPlaybooksSidebar />
        <main>
          {isModuleZero ? (
            <ModuleZeroView />
          ) : (
            <LessonContent />
          )}
        </main>
      </div>
    </div>
  );
}
