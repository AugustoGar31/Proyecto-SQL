/**
 * @file ProgressContext.jsx
 * @description Contexto global de React para la gestión del progreso de aprendizaje del estudiante.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
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
  }, [activeLessonId, currentModule]);

  /**
   * Cambia la lección activa actual.
   * @param {string} lessonId - ID de la lección seleccionada.
   */
  const selectLesson = useCallback((lessonId) => {
    setActiveLessonId(lessonId);
  }, []);

  /**
   * Registra la resolución correcta de un ejercicio.
   * @param {string} exerciseId - ID del ejercicio resuelto.
   */
  const completeExercise = useCallback((exerciseId) => {
    setProgress((prevProgress) => {
      const updated = storageService.markExerciseCompleted(currentLesson.id, exerciseId, 100);
      return updated;
    });
  }, [currentLesson.id]);

  /**
   * Reinicia todo el progreso.
   */
  const resetAllProgress = useCallback(() => {
    const resetData = storageService.resetProgress();
    setProgress(resetData);
    setActiveLessonId('les-select-basics');
  }, []);

  // Cálculo de porcentaje global de avance
  const totalLessons = useMemo(() => MODULES_DATA.reduce((acc, m) => acc + m.lessons.length, 0), []);
  const completedCount = progress.completedLessons.length;
  const progressPercentage = useMemo(() => Math.min(100, Math.round((completedCount / totalLessons) * 100)), [completedCount, totalLessons]);

  const contextValue = useMemo(() => ({
    progress,
    currentModule,
    currentLesson,
    activeLessonId,
    activeModuleId,
    selectLesson,
    completeExercise,
    resetAllProgress,
    progressPercentage,
    completedCount,
    totalLessons
  }), [
    progress,
    currentModule,
    currentLesson,
    activeLessonId,
    activeModuleId,
    selectLesson,
    completeExercise,
    resetAllProgress,
    progressPercentage,
    completedCount,
    totalLessons
  ]);

  return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => useContext(ProgressContext);
