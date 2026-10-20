/**
 * @file ProgressContext.jsx
 * @description Contexto global de React para la gestión del progreso de aprendizaje del estudiante,
 * soporte de desbloqueo progresivo bloqueado por módulos y estados de lección.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { storageService } from '../services/storageService.js';
import { MODULES_DATA } from '../data/curriculum/index.js';
import { KATAS_CATALOG } from '../data/katasData.js';
import { THEMATIC_PLAYBOOKS } from '../data/playbooksData.js';

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [progress, setProgress] = useState(() => storageService.loadProgress());
  const [activeLessonId, setActiveLessonId] = useState(() => progress.lastActiveLessonId || 'les-m0-relational');
  const [activeModuleId, setActiveModuleId] = useState('mod-0-intro');
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [customExercise, setCustomExercise] = useState(null);

  // Encontrar lección y módulo activos
  const currentModule = useMemo(() => {
    return MODULES_DATA.find(m => m.lessons && m.lessons.some(l => l.id === activeLessonId)) || MODULES_DATA[0];
  }, [activeLessonId]);

  const currentLesson = useMemo(() => {
    if (!currentModule || !currentModule.lessons) return null;
    return currentModule.lessons.find(l => l.id === activeLessonId) || currentModule.lessons[0];
  }, [currentModule, activeLessonId]);

  // Encontrar ejercicio activo con prioridad para la Kata seleccionada
  const activeExercise = useMemo(() => {
    // 1. Si hay una Kata independiente seleccionada directamente
    if (customExercise) return customExercise;

    // 2. Si hay un ID de ejercicio activo
    if (activeExerciseId) {
      // Buscar en el currículum
      for (const mod of MODULES_DATA) {
        for (const les of mod.lessons || []) {
          const found = (les.exercises || []).find(ex => ex.id === activeExerciseId);
          if (found) {
            return {
              ...found,
              lessonId: les.id,
              lessonTitle: les.title,
              schemaId: les.schemaId || found.schemaId || 'universidad'
            };
          }
        }
      }
      // Buscar en Katas independientes
      const kataFound = KATAS_CATALOG.find(k => k.id === activeExerciseId);
      if (kataFound) return kataFound;
    }

    // 3. Fallback: primer ejercicio de la lección activa
    if (currentLesson && currentLesson.exercises && currentLesson.exercises.length > 0) {
      return {
        ...currentLesson.exercises[0],
        lessonId: currentLesson.id,
        lessonTitle: currentLesson.title,
        schemaId: currentLesson.schemaId || 'universidad'
      };
    }

    return null;
  }, [customExercise, activeExerciseId, currentLesson]);

  useEffect(() => {
    if (currentModule) {
      setActiveModuleId(currentModule.id);
    }
  }, [currentModule]);

  /**
   * Obtiene estadísticas de completitud de un Libreto Temático.
   * @param {string} playbookId
   */
  const getPlaybookStats = useCallback((playbookId) => {
    const pb = THEMATIC_PLAYBOOKS.find(p => p.id === playbookId);
    if (!pb) {
      if (playbookId === 'pb-intro') {
        const mod0 = MODULES_DATA.find(m => m.id === 'mod-0-intro');
        const total = mod0?.lessons?.length || 3;
        const completed = (mod0?.lessons || []).filter(l => progress.completedLessons.includes(l.id)).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        return { total, completed, percentage, isCompleted: completed >= total, isUnlocked: true };
      }
      return { total: 0, completed: 0, percentage: 0, isCompleted: false, isUnlocked: false };
    }

    const mod = MODULES_DATA.find(m => m.id === pb.moduleId);
    if (!mod || !mod.lessons) {
      return { total: 0, completed: 0, percentage: 0, isCompleted: false, isUnlocked: false };
    }

    const total = mod.lessons.length;
    const completed = mod.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const isCompleted = total > 0 && completed === total;

    return { total, completed, percentage, isCompleted };
  }, [progress.completedLessons]);

  /**
   * Evalúa si un Libreto Temático está desbloqueado según la regla estricta del 100% del anterior.
   * @param {string} playbookId
   * @returns {boolean}
   */
  const isPlaybookUnlocked = useCallback((playbookId) => {
    if (playbookId === 'pb-intro') return true;

    const idx = THEMATIC_PLAYBOOKS.findIndex(p => p.id === playbookId);
    if (idx === -1) return true;

    // El Libreto 1 (DQL Básico) siempre está desbloqueado de inicio
    if (idx === 0) return true;

    const targetPb = THEMATIC_PLAYBOOKS[idx];
    if (progress.unlockedModules.includes(targetPb.moduleId)) return true;

    // Regla estricta del 100%: el libreto previo debe tener todas sus lecciones superadas
    const prevPb = THEMATIC_PLAYBOOKS[idx - 1];
    const prevMod = MODULES_DATA.find(m => m.id === prevPb.moduleId);
    if (!prevMod || !prevMod.lessons) return false;

    const allPrevCompleted = prevMod.lessons.every(l => progress.completedLessons.includes(l.id));
    return allPrevCompleted;
  }, [progress.unlockedModules, progress.completedLessons]);

  /**
   * Verifica si un módulo está desbloqueado.
   * @param {string} moduleId
   * @returns {boolean}
   */
  const isModuleUnlocked = useCallback((moduleId) => {
    if (moduleId === 'mod-0-intro' || moduleId === 'mod-1-dql') return true;
    if (progress.unlockedModules.includes(moduleId)) return true;

    const pb = THEMATIC_PLAYBOOKS.find(p => p.moduleId === moduleId);
    if (pb) {
      return isPlaybookUnlocked(pb.id);
    }
    return false;
  }, [progress.unlockedModules, isPlaybookUnlocked]);

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
   * Calcula de forma inteligente la siguiente lección recomendada a realizar (Gamificación).
   */
  const nextRecommendedLesson = useMemo(() => {
    for (const pb of THEMATIC_PLAYBOOKS) {
      if (isPlaybookUnlocked(pb.id)) {
        const mod = MODULES_DATA.find(m => m.id === pb.moduleId);
        if (mod && mod.lessons) {
          const pendingLesson = mod.lessons.find(l => !progress.completedLessons.includes(l.id));
          if (pendingLesson) {
            return {
              lesson: pendingLesson,
              moduleId: mod.id,
              moduleTitle: mod.title,
              playbookId: pb.id,
              playbookTitle: pb.title,
              playbookSubtitle: pb.subtitle,
              exercise: pendingLesson.exercises?.[0] || null
            };
          }
        }
      }
    }

    // Si ya completó todo o en fallback
    const firstMod = MODULES_DATA[1] || MODULES_DATA[0];
    const fallbackLesson = firstMod?.lessons?.[0];
    return {
      lesson: fallbackLesson,
      moduleId: firstMod?.id,
      moduleTitle: firstMod?.title,
      playbookId: 'pb-dql-basic',
      playbookTitle: '1. DQL Básico',
      playbookSubtitle: 'Consultas y Filtros',
      exercise: fallbackLesson?.exercises?.[0] || null
    };
  }, [isPlaybookUnlocked, progress.completedLessons]);

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
      return false;
    }
    setActiveLessonId(lessonId);
    setCustomExercise(null);
    const targetLesson = targetMod?.lessons?.find(l => l.id === lessonId);
    if (targetLesson?.exercises?.[0]) {
      setActiveExerciseId(targetLesson.exercises[0].id);
    } else {
      setActiveExerciseId(null);
    }
    return true;
  }, [isModuleUnlocked]);

  /**
   * Selecciona un ejercicio o Kata específica para practicar en el Taller SQL.
   * @param {Object|string} exerciseOrId - Objeto Kata o ID del ejercicio.
   */
  const selectExercise = useCallback((exerciseOrId) => {
    if (!exerciseOrId) return;

    const targetId = typeof exerciseOrId === 'string' ? exerciseOrId : exerciseOrId.id;
    const exerciseObj = typeof exerciseOrId === 'object' ? exerciseOrId : null;

    // Buscar si pertenece a alguna lección curricular
    let foundLesson = null;
    let foundExercise = null;

    for (const mod of MODULES_DATA) {
      for (const les of mod.lessons || []) {
        const found = (les.exercises || []).find(ex => ex.id === targetId);
        if (found) {
          foundLesson = les;
          foundExercise = found;
          break;
        }
      }
      if (foundLesson) break;
    }

    if (foundLesson) {
      // Es un ejercicio curricular: activamos su lección y su ejercicio
      selectLesson(foundLesson.id);
      setActiveExerciseId(targetId);
      setCustomExercise(null);
    } else {
      // Es una Kata independiente
      const kataObj = exerciseObj || KATAS_CATALOG.find(k => k.id === targetId);
      if (kataObj) {
        setCustomExercise(kataObj);
        setActiveExerciseId(kataObj.id);
      }
    }
  }, [selectLesson]);

  /**
   * Registra la resolución correcta de un ejercicio y evalúa si desbloquea el siguiente módulo.
   * @param {string} exerciseId - ID del ejercicio resuelto.
   */
  const completeExercise = useCallback((exerciseId) => {
    setProgress((prevProgress) => {
      // Determinar lección si es curricular o standalone
      const lessonKey = (currentLesson && currentLesson.exercises?.some(ex => ex.id === exerciseId))
        ? currentLesson.id
        : null;

      const updated = storageService.markExerciseCompleted(lessonKey, exerciseId, 100);

      // Si pertenece a una lección del currículum, evaluar desbloqueo
      if (lessonKey && currentModule) {
        const currentModuleLessons = currentModule.lessons || [];
        const allCompleted = currentModuleLessons.every(l => updated.completedLessons.includes(l.id));

        if (allCompleted) {
          const currentIdx = MODULES_DATA.findIndex(m => m.id === currentModule.id);
          if (currentIdx !== -1 && currentIdx + 1 < MODULES_DATA.length) {
            const nextMod = MODULES_DATA[currentIdx + 1];
            if (!updated.unlockedModules.includes(nextMod.id)) {
              return storageService.unlockModule(nextMod.id);
            }
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
    activeExercise,
    activeExerciseId,
    selectLesson,
    selectExercise,
    completeExercise,
    resetAllProgress,
    unlockAllModules,
    isModuleUnlocked,
    isPlaybookUnlocked,
    getPlaybookStats,
    nextRecommendedLesson,
    thematicPlaybooks: THEMATIC_PLAYBOOKS,
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
    activeExercise,
    activeExerciseId,
    selectLesson,
    selectExercise,
    completeExercise,
    resetAllProgress,
    unlockAllModules,
    isModuleUnlocked,
    isPlaybookUnlocked,
    getPlaybookStats,
    nextRecommendedLesson,
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
