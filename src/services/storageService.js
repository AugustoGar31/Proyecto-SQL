/**
 * @file storageService.js
 * @description Servicio de persistencia local mediante localStorage para guardar el avance de lecciones,
 * ejercicios completados y configuraciones del usuario.
 */

const STORAGE_KEY = 'sql_master_user_progress_v2';

export class StorageService {
  /**
   * Carga el progreso del estudiante desde localStorage.
   * @returns {Object} ProgressData - Objeto de progreso guardado.
   */
  static loadProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.warn('Error al cargar progreso de localStorage:', e);
    }
    return {
      completedLessons: [],
      completedExercises: [],
      scores: {},
      lastActiveLessonId: 'les-select-basics'
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
   * Marca un ejercicio como completado.
   * @param {string} lessonId - ID de lección.
   * @param {string} exerciseId - ID de ejercicio.
   * @param {number} score - Puntuación.
   */
  static markExerciseCompleted(lessonId, exerciseId, score = 100) {
    const current = this.loadProgress();
    if (!current.completedExercises.includes(exerciseId)) {
      current.completedExercises.push(exerciseId);
    }
    if (!current.completedLessons.includes(lessonId)) {
      current.completedLessons.push(lessonId);
    }
    current.scores[exerciseId] = score;
    current.lastActiveLessonId = lessonId;
    this.saveProgress(current);
    return current;
  }

  /**
   * Reinicia por completo el progreso guardado.
   */
  static resetProgress() {
    const fresh = {
      completedLessons: [],
      completedExercises: [],
      scores: {},
      lastActiveLessonId: 'les-select-basics'
    };
    this.saveProgress(fresh);
    return fresh;
  }
}

export const storageService = StorageService;
