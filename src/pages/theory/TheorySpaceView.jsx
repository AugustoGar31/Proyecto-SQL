/**
 * @file TheorySpaceView.jsx
 * @description Espacio de Trabajo 1: Teoría y Plan de Estudio (Libretos de Aprendizaje).
 * Layout modular con Sidebar de Libretos + Lector Teórico / Módulo Cero Interactivo.
 */

import React from 'react';
import { LearningPlaybooksSidebar } from '../../components/layout/LearningPlaybooksSidebar.jsx';
import { LessonContent } from '../../components/theory/LessonContent.jsx';
import { ModuleZeroView } from '../../components/theory/moduleZero/ModuleZeroView.jsx';
import { useCurriculum } from '../../context/ProgressContext.jsx';

export function TheorySpaceView() {
  const { currentLesson, activeModuleId } = useCurriculum();

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
