/**
 * @file ProgressContext.jsx
 * @description Contexto global de React para la gestión del progreso de aprendizaje del estudiante,
 * soporte de desbloqueo progresivo bloqueado por módulos y estados de lección.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { storageService } from '../services/storageService.js';
import { MODULES_DATA } from '../data/modulesData.js';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => storageService.loadProgress());
  const [activeLessonId, setActiveLessonId] = useState(() => progress.lastActiveLessonId || 'les-m0-relational');
  const [activeModuleId, setActiveModuleId] = useState('mod-0-intro');

  // Encontrar lección y módulo activos
  const currentModule = useMemo(() => {
    return MODULES_DATA.find(m => m.lessons && m.lessons.some(l => l.id === activeLessonId)) || MODULES_DATA[0];
  }, [activeLessonId]);

  const currentLesson = useMemo(() => {
    if (!currentModule || !currentModule.lessons) return null;
    return currentModule.lessons.find(l => l.id === activeLessonId) || currentModule.lessons[0];
  }, [currentModule, activeLessonId]);

  useEffect(() => {
    if (currentModule) {
      setActiveModuleId(currentModule.id);
    }
  }, [currentModule]);

  /**
   * Verifica si un módulo está desbloqueado.
   * @param {string} moduleId
   * @returns {boolean}
   */
  const isModuleUnlocked = useCallback((moduleId) => {
    // Módulo 0 e introducción siempre desbloqueados
    if (moduleId === 'mod-0-intro' || moduleId === 'mod-1-dql') return true;
    return progress.unlockedModules.includes(moduleId);
  }, [progress.unlockedModules]);

  /**
   * Obtiene el estado visual de una lección ('completed' | 'in-progress' | 'pending' | 'locked').
   * @param {string} lessonId
   * @param {string} moduleId
   */
  const getLessonStatus = useCallback((lessonId, moduleId) => {
    if (!isModuleUnlocked(moduleId)) return 'locked';
    if (progress.completedLessons.includes(lessonId)) return 'completed';
    if (activeLessonId === lessonId) return 'in-progress';
    return 'pending';
  }, [isModuleUnlocked, progress.completedLessons, activeLessonId]);

  /**
   * Obtiene estadísticas de completitud de un módulo.
   * @param {string} moduleId
   */
  const getModuleStats = useCallback((moduleId) => {
    const mod = MODULES_DATA.find(m => m.id === moduleId);
    if (!mod || !mod.lessons) {
      return { total: 0, completed: 0, percentage: 0, isUnlocked: false, isCompleted: false };
    }
    const total = mod.lessons.length;
    const completed = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isUnlocked = isModuleUnlocked(moduleId);
    const isCompleted = total > 0 && completed === total;

    return { total, completed, percentage, isUnlocked, isCompleted };
  }, [progress.completedLessons, isModuleUnlocked]);

  /**
   * Cambia la lección activa actual (si no está bloqueada).
   * @param {string} lessonId - ID de la lección seleccionada.
   */
  const selectLesson = useCallback((lessonId) => {
    const targetMod = MODULES_DATA.find(m => m.lessons && m.lessons.some(l => l.id === lessonId));
    if (targetMod && !isModuleUnlocked(targetMod.id)) {
      // Si el módulo está bloqueado, no permitir cambiar
      return false;
    }
    setActiveLessonId(lessonId);
    return true;
  }, [isModuleUnlocked]);

  /**
   * Registra la resolución correcta de un ejercicio y evalúa si desbloquea el siguiente módulo.
   * @param {string} exerciseId - ID del ejercicio resuelto.
   */
  const completeExercise = useCallback((exerciseId) => {
    if (!currentLesson || !currentModule) return;

    setProgress((prevProgress) => {
      const updated = storageService.markExerciseCompleted(currentLesson.id, exerciseId, 100);

      // Evaluar si todas las lecciones del módulo actual fueron completadas
      const currentModuleLessons = currentModule.lessons || [];
      const allCompleted = currentModuleLessons.every(l => updated.completedLessons.includes(l.id));

      if (allCompleted) {
        // Encontrar índice del módulo actual y desbloquear el siguiente
        const currentIdx = MODULES_DATA.findIndex(m => m.id === currentModule.id);
        if (currentIdx !== -1 && currentIdx + 1 < MODULES_DATA.length) {
          const nextMod = MODULES_DATA[currentIdx + 1];
          if (!updated.unlockedModules.includes(nextMod.id)) {
            const withNext = storageService.unlockModule(nextMod.id);
            return withNext;
          }
        }
      }

      return updated;
    });
  }, [currentLesson, currentModule]);

  /**
   * Desbloqueo forzado de todos los módulos (para modo demostración/profesor).
   */
  const unlockAllModules = useCallback(() => {
    const allIds = MODULES_DATA.map(m => m.id);
    const current = storageService.loadProgress();
    current.unlockedModules = allIds;
    storageService.saveProgress(current);
    setProgress(current);
  }, []);

  /**
   * Reinicia todo el progreso.
   */
  const resetAllProgress = useCallback(() => {
    const resetData = storageService.resetProgress();
    setProgress(resetData);
    setActiveLessonId('les-m0-relational');
  }, []);

  // Cálculo de porcentaje global de avance
  const totalLessons = useMemo(() => MODULES_DATA.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0), []);
  const completedCount = progress.completedLessons.length;
  const progressPercentage = useMemo(() => {
    if (totalLessons === 0) return 0;
    return Math.min(100, Math.round((completedCount / totalLessons) * 100));
  }, [completedCount, totalLessons]);

  const contextValue = useMemo(() => ({
    progress,
    currentModule,
    currentLesson,
    activeLessonId,
    activeModuleId,
    selectLesson,
    completeExercise,
    resetAllProgress,
    unlockAllModules,
    isModuleUnlocked,
    getLessonStatus,
    getModuleStats,
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
    unlockAllModules,
    isModuleUnlocked,
    getLessonStatus,
    getModuleStats,
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
