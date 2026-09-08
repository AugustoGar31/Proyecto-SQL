/**
 * @file storageService.js
 * @description Servicio de persistencia local mediante localStorage para guardar el avance de lecciones,
 * módulos desbloqueados, katas completadas y configuraciones del estudiante.
 */

const STORAGE_KEY = 'sql_master_user_progress_v3';

export class StorageService {
  /**
   * Carga el progreso del estudiante desde localStorage.
   * @returns {Object} ProgressData - Objeto de progreso guardado.
   */
  static loadProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        return {
          completedLessons: parsed.completedLessons || [],
          completedExercises: parsed.completedExercises || [],
          unlockedModules: parsed.unlockedModules || ['mod-0-intro', 'mod-1-dql'],
          scores: parsed.scores || {},
          lastActiveLessonId: parsed.lastActiveLessonId || 'les-m0-relational'
        };
      }
    } catch (e) {
      console.warn('Error al cargar progreso de localStorage:', e);
    }
    return {
      completedLessons: [],
      completedExercises: [],
      unlockedModules: ['mod-0-intro', 'mod-1-dql'],
      scores: {},
      lastActiveLessonId: 'les-m0-relational'
    };
  }

  /**
   * Guarda el progreso actualizado en localStorage.
   * @param {Object} progress - Datos de progreso.
   */
  static saveProgress(progress) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error al guardar en localStorage:', e);
    }
  }

  /**
   * Marca un ejercicio y su lección como completados.
   * @param {string} lessonId - ID de lección.
   * @param {string} exerciseId - ID de ejercicio.
   * @param {number} score - Puntuación / XP.
   */
  static markExerciseCompleted(lessonId, exerciseId, score = 100) {
    const current = this.loadProgress();
    if (exerciseId && !current.completedExercises.includes(exerciseId)) {
      current.completedExercises.push(exerciseId);
    }
    if (lessonId && !current.completedLessons.includes(lessonId)) {
      current.completedLessons.push(lessonId);
    }
    if (exerciseId) {
      current.scores[exerciseId] = score;
    }
    if (lessonId) {
      current.lastActiveLessonId = lessonId;
    }
    this.saveProgress(current);
    return current;
  }

  /**
   * Desbloquea un módulo específico.
   * @param {string} moduleId - ID del módulo a desbloquear.
   */
  static unlockModule(moduleId) {
    const current = this.loadProgress();
    if (!current.unlockedModules.includes(moduleId)) {
      current.unlockedModules.push(moduleId);
      this.saveProgress(current);
    }
    return current;
  }

  /**
   * Reinicia por completo el progreso guardado.
   */
  static resetProgress() {
    const fresh = {
      completedLessons: [],
      completedExercises: [],
      unlockedModules: ['mod-0-intro', 'mod-1-dql'],
      scores: {},
      lastActiveLessonId: 'les-m0-relational'
    };
    this.saveProgress(fresh);
    return fresh;
  }
}

export const storageService = StorageService;
