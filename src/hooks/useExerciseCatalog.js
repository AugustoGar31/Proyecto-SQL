import { useMemo } from 'react';
import { MODULES_DATA } from '../data/curriculum/index.js';
import { KATAS_CATALOG } from '../data/katasData.js';
import { THEMATIC_PLAYBOOKS } from '../data/playbooksData.js';
import { useUserProgress } from '../context/ProgressContext.jsx';

/**
 * Custom Hook para procesar, categorizar y filtrar el catálogo completo de desafíos y katas.
 * @param {Object} options
 * @param {string} options.statusFilter - 'ALL' | 'COMPLETED' | 'PENDING'
 * @param {string} options.searchQuery - Cadena de búsqueda (generalmente debounced)
 */
export function useExerciseCatalog({ statusFilter = 'ALL', searchQuery = '' } = {}) {
  const { isPlaybookUnlocked, progress } = useUserProgress();

  const playbooksWithKatas = useMemo(() => {
    // 1. Obtener ejercicios curriculares con metadata
    const fromCurriculum = MODULES_DATA.flatMap(m =>
      (m.lessons || []).flatMap(l =>
        (l.exercises || []).map(ex => ({
          ...ex,
          moduleId: m.id,
          category: ex.category || (m.categoryCode || 'DQL'),
          moduleTitle: m.title,
          lessonId: l.id,
          lessonTitle: l.title,
          schemaId: l.schemaId || ex.schemaId || 'universidad'
        }))
      )
    );

    const seenIds = new Set(fromCurriculum.map(k => k.id));

    // 2. Mapear Katas independientes al libreto temático correspondiente
    const standaloneKatas = KATAS_CATALOG.filter(k => !seenIds.has(k.id)).map(k => {
      let targetModuleId = 'mod-1-dql';
      if (k.moduleId) {
        targetModuleId = k.moduleId;
      } else {
        if (k.category === 'DML') targetModuleId = 'mod-6-dml';
        if (k.category === 'DDL') targetModuleId = 'mod-7-ddl';
        if (k.category === 'TCL') targetModuleId = 'mod-10-transactions';
        if (k.category === 'PROCEDURAL') targetModuleId = 'mod-9-procedural';
      }

      return {
        ...k,
        moduleId: targetModuleId,
        moduleTitle: `Kata: ${k.category}`,
        lessonTitle: `Kata Práctica (${k.category})`,
        schemaId: k.schemaId || 'universidad'
      };
    });

    const allExercises = [...fromCurriculum, ...standaloneKatas];

    // 3. Agrupar por los 10 Libretos Temáticos oficiales
    return THEMATIC_PLAYBOOKS.map((pb) => {
      const isUnlocked = isPlaybookUnlocked(pb.id);
      const pbExercises = allExercises.filter(ex => ex.moduleId === pb.moduleId);

      // Métricas reales basadas en todas las actividades/katas del libreto
      const totalActivities = pbExercises.length;
      const completedActivities = pbExercises.filter(ex => progress.completedExercises.includes(ex.id)).length;
      const percentage = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
      const isCompleted = totalActivities > 0 && completedActivities === totalActivities;

      const stats = {
        total: totalActivities,
        completed: completedActivities,
        percentage,
        isCompleted
      };

      // Aplicar filtros de búsqueda y estado
      const filteredExercises = pbExercises.filter(ex => {
        const isDone = progress.completedExercises.includes(ex.id);

        if (statusFilter === 'COMPLETED' && !isDone) return false;
        if (statusFilter === 'PENDING' && isDone) return false;

        if (searchQuery && searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = ex.title.toLowerCase().includes(q);
          const matchesPrompt = (ex.prompt || '').toLowerCase().includes(q);
          const matchesDept = ex.businessCase?.department?.toLowerCase().includes(q);
          if (!matchesTitle && !matchesPrompt && !matchesDept) return false;
        }

        return true;
      });

      return {
        ...pb,
        isUnlocked,
        stats,
        totalItems: pbExercises.length,
        items: filteredExercises
      };
    });
  }, [isPlaybookUnlocked, statusFilter, searchQuery, progress.completedExercises]);

  return { playbooksWithKatas };
}
