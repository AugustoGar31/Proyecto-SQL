/**
 * @file ProgressContext.jsx
 * @description Contexto desacoplado de React para la gestión del progreso y currículum.
 * Aplica el patrón Multi-Context para separar la navegación curricular de las estadísticas y persistencia,
 * evitando re-renderizados masivos en componentes no suscritos.
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { storageService } from '../services/storageService.js';
import { MODULES_DATA } from '../data/curriculum/index.js';
import { KATAS_CATALOG } from '../data/katasData.js';
import { THEMATIC_PLAYBOOKS } from '../data/playbooksData.js';

// Contexto 1: Navegación y Selección Curricular (Lección activa, Ejercicio activo)
const CurriculumContext = createContext(null);

// Contexto 2: Progreso, Gamificación y Estadísticas del Usuario (XP, lecciones superadas, reglas de desbloqueo)
const UserProgressContext = createContext(null);

export const ProgressProvider = ({ children }) => {
  // ----------------------------------------------------
  // Dominio A: Progreso Persistido y Desbloqueos
  // ----------------------------------------------------
  const [progress, setProgress] = useState(() => storageService.loadProgress());

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

  const isPlaybookUnlocked = useCallback((playbookId) => {
    if (playbookId === 'pb-intro') return true;
    const idx = THEMATIC_PLAYBOOKS.findIndex(p => p.id === playbookId);
    if (idx <= 0) return true;

    const targetPb = THEMATIC_PLAYBOOKS[idx];
    if (progress.unlockedModules.includes(targetPb.moduleId)) return true;

    const prevPb = THEMATIC_PLAYBOOKS[idx - 1];
    const prevMod = MODULES_DATA.find(m => m.id === prevPb.moduleId);
    if (!prevMod || !prevMod.lessons) return false;

    return prevMod.lessons.every(l => progress.completedLessons.includes(l.id));
  }, [progress.unlockedModules, progress.completedLessons]);

  const isModuleUnlocked = useCallback((moduleId) => {
    if (moduleId === 'mod-0-intro' || moduleId === 'mod-1-dql') return true;
    if (progress.unlockedModules.includes(moduleId)) return true;
    const pb = THEMATIC_PLAYBOOKS.find(p => p.moduleId === moduleId);
    return pb ? isPlaybookUnlocked(pb.id) : false;
  }, [progress.unlockedModules, isPlaybookUnlocked]);

  // ----------------------------------------------------
  // Dominio B: Navegación Curricular y Ejercicio Activo
  // ----------------------------------------------------
  const [activeLessonId, setActiveLessonId] = useState(() => progress.lastActiveLessonId || 'les-m0-relational');
  const [activeModuleId, setActiveModuleId] = useState('mod-0-intro');
  const [activeExerciseId, setActiveExerciseId] = useState(null);
  const [customExercise, setCustomExercise] = useState(null);

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

  const activeExercise = useMemo(() => {
    if (customExercise) return customExercise;
    if (activeExerciseId) {
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
      const kataFound = KATAS_CATALOG.find(k => k.id === activeExerciseId);
      if (kataFound) return kataFound;
    }
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

  const selectLesson = useCallback((lessonId) => {
    const targetMod = MODULES_DATA.find(m => m.lessons && m.lessons.some(l => l.id === lessonId));
    if (targetMod && !isModuleUnlocked(targetMod.id)) return false;

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

  const selectExercise = useCallback((exerciseOrId) => {
    if (!exerciseOrId) return;
    const targetId = typeof exerciseOrId === 'string' ? exerciseOrId : exerciseOrId.id;
    const exerciseObj = typeof exerciseOrId === 'object' ? exerciseOrId : null;

    let foundLesson = null;
    for (const mod of MODULES_DATA) {
      for (const les of mod.lessons || []) {
        const found = (les.exercises || []).find(ex => ex.id === targetId);
        if (found) {
          foundLesson = les;
          break;
        }
      }
      if (foundLesson) break;
    }

    if (foundLesson) {
      selectLesson(foundLesson.id);
      setActiveExerciseId(targetId);
      setCustomExercise(null);
    } else {
      const kataObj = exerciseObj || KATAS_CATALOG.find(k => k.id === targetId);
      if (kataObj) {
        setCustomExercise(kataObj);
        setActiveExerciseId(kataObj.id);
      }
    }
  }, [selectLesson]);

  const completeExercise = useCallback((exerciseId) => {
    setProgress((prev) => {
      const lessonKey = (currentLesson && currentLesson.exercises?.some(ex => ex.id === exerciseId))
        ? currentLesson.id
        : null;

      const updated = storageService.markExerciseCompleted(lessonKey, exerciseId, 100);

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

  const unlockAllModules = useCallback(() => {
    const allIds = MODULES_DATA.map(m => m.id);
    const current = storageService.loadProgress();
    current.unlockedModules = allIds;
    storageService.saveProgress(current);
    setProgress(current);
  }, []);

  const resetAllProgress = useCallback(() => {
    const resetData = storageService.resetProgress();
    setProgress(resetData);
    setActiveLessonId('les-m0-relational');
  }, []);

  const restoreProgress = useCallback((validatedProgress) => {
    if (!validatedProgress || typeof validatedProgress !== 'object') return;
    storageService.saveProgress(validatedProgress);
    const reloaded = storageService.loadProgress();
    setProgress(reloaded);
    if (reloaded.lastActiveLessonId) {
      setActiveLessonId(reloaded.lastActiveLessonId);
    }
  }, []);

  const getLessonStatus = useCallback((lessonId, moduleId) => {
    if (!isModuleUnlocked(moduleId)) return 'locked';
    if (progress.completedLessons.includes(lessonId)) return 'completed';
    if (activeLessonId === lessonId) return 'in-progress';
    return 'pending';
  }, [isModuleUnlocked, progress.completedLessons, activeLessonId]);

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

  // Cálculo dinámico del catálogo global: lecciones curriculares + katas independientes
  const totalLessons = useMemo(() => MODULES_DATA.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0), []);

  const totalKatas = useMemo(() => {
    const fromCurriculum = MODULES_DATA.flatMap(m =>
      (m.lessons || []).flatMap(l => l.exercises || [])
    );
    const seenIds = new Set(fromCurriculum.map(k => k.id));
    const standaloneKatas = KATAS_CATALOG.filter(k => !seenIds.has(k.id));
    return fromCurriculum.length + standaloneKatas.length;
  }, []);

  const totalGlobalActivities = useMemo(() => totalLessons + totalKatas, [totalLessons, totalKatas]);

  const completedCount = progress.completedLessons.length;
  const completedKatasCount = progress.completedExercises ? progress.completedExercises.length : 0;
  const totalCompletedActivities = completedCount + completedKatasCount;

  const progressPercentage = useMemo(() => {
    if (totalGlobalActivities === 0) return 0;
    return Math.min(100, Math.round((totalCompletedActivities / totalGlobalActivities) * 100));
  }, [totalCompletedActivities, totalGlobalActivities]);

  // Context Values memoizados independientemente para evitar re-renderizados cruzados
  const curriculumValue = useMemo(() => ({
    currentModule,
    currentLesson,
    activeLessonId,
    activeModuleId,
    activeExercise,
    activeExerciseId,
    selectLesson,
    selectExercise
  }), [
    currentModule,
    currentLesson,
    activeLessonId,
    activeModuleId,
    activeExercise,
    activeExerciseId,
    selectLesson,
    selectExercise
  ]);

  const userProgressValue = useMemo(() => ({
    progress,
    completeExercise,
    resetAllProgress,
    restoreProgress,
    unlockAllModules,
    isModuleUnlocked,
    isPlaybookUnlocked,
    getPlaybookStats,
    getLessonStatus,
    nextRecommendedLesson,
    thematicPlaybooks: THEMATIC_PLAYBOOKS,
    progressPercentage,
    completedCount,
    totalLessons,
    totalKatas,
    totalGlobalActivities,
    totalCompletedActivities,
    completedKatasCount
  }), [
    progress,
    completeExercise,
    resetAllProgress,
    restoreProgress,
    unlockAllModules,
    isModuleUnlocked,
    isPlaybookUnlocked,
    getPlaybookStats,
    getLessonStatus,
    nextRecommendedLesson,
    progressPercentage,
    completedCount,
    totalLessons,
    totalKatas,
    totalGlobalActivities,
    totalCompletedActivities,
    completedKatasCount
  ]);

  return (
    <UserProgressContext.Provider value={userProgressValue}>
      <CurriculumContext.Provider value={curriculumValue}>
        {children}
      </CurriculumContext.Provider>
    </UserProgressContext.Provider>
  );
};

/**
 * Hook especializado en Navegación y Currículum.
 * Los componentes suscritos NO se re-renderizan por cambios en XP, puntos ni porcentaje de progreso.
 */
export const useCurriculum = () => {
  const context = useContext(CurriculumContext);
  if (!context) {
    throw new Error('useCurriculum debe utilizarse dentro de un ProgressProvider');
  }
  return context;
};

/**
 * Hook especializado en Progreso, Gamificación y Estadísticas del Usuario.
 */
export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress debe utilizarse dentro de un ProgressProvider');
  }
  return context;
};

/**
 * Fachada combinada para compatibilidad retroactiva completa con código existente.
 */
export const useProgress = () => {
  const curriculum = useCurriculum();
  const userProgress = useUserProgress();
  return useMemo(() => ({
    ...curriculum,
    ...userProgress
  }), [curriculum, userProgress]);
};
