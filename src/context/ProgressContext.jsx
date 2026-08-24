/**
 * @file ProgressContext.jsx
 * @description Contexto global de React para la gestión del progreso de aprendizaje del estudiante.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService.js';
import { MODULES_DATA } from '../data/modulesData.js';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => storageService.loadProgress());
  const [activeLessonId, setActiveLessonId] = useState(progress.lastActiveLessonId || 'les-select-basics');
  const [activeModuleId, setActiveModuleId] = useState('mod-1-dql');

  // Encontrar lección y módulo activos
  const currentModule = MODULES_DATA.find(m => m.lessons.some(l => l.id === activeLessonId)) || MODULES_DATA[0];
  const currentLesson = currentModule.lessons.find(l => l.id === activeLessonId) || currentModule.lessons[0];

  useEffect(() => {
    if (currentModule) {
      setActiveModuleId(currentModule.id);
    }
  }, [activeLessonId]);

  /**
   * Cambia la lección activa actual.
   * @param {string} lessonId - ID de la lección seleccionada.
   */
  const selectLesson = (lessonId) => {
    setActiveLessonId(lessonId);
  };

  /**
   * Registra la resolución correcta de un ejercicio.
   * @param {string} exerciseId - ID del ejercicio resuelto.
   */
  const completeExercise = (exerciseId) => {
    const updated = storageService.markExerciseCompleted(currentLesson.id, exerciseId, 100);
    setProgress(updated);
  };

  /**
   * Reinicia todo el progreso.
   */
  const resetAllProgress = () => {
    const resetData = storageService.resetProgress();
    setProgress(resetData);
    setActiveLessonId('les-select-basics');
  };

  // Cálculo de porcentaje global de avance
  const totalLessons = MODULES_DATA.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const progressPercentage = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  return (
    <ProgressContext.Provider
      value={{
        progress,
        currentModule,
        currentLesson,
        activeLessonId,
        activeModuleId,
        selectLesson,
        completeExercise,
        resetAllProgress,
        progressPercentage
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
