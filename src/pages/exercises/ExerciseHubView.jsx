/**
 * @file ExerciseHubView.jsx
 * @description Catálogo Jerárquico de Katas y Desafíos NexoSQL organizado en Cuadrados Medianos
 * (Libretos Temáticos) y Cuadrados Pequeños (Katas con casos de negocio).
 */

import React, { useState, useMemo } from 'react';
import { MODULES_DATA } from '../../data/curriculum/index.js';
import { KATAS_CATALOG } from '../../data/katasData.js';
import { THEMATIC_PLAYBOOKS } from '../../data/playbooksData.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useView } from '../../context/ViewContext.jsx';
import { NextLessonWidget } from '../../components/common/NextLessonWidget.jsx';
import { PlaybooksCardGrid } from '../../components/exercises/PlaybooksCardGrid.jsx';
import { KatasSubGrid } from '../../components/exercises/KatasSubGrid.jsx';
import { Button } from '../../components/common/Button.jsx';
import { Search, LayoutGrid } from 'lucide-react';

export function ExerciseHubView() {
  const {
    selectExercise,
    progress,
    activeExerciseId,
    isPlaybookUnlocked,
    getPlaybookStats
  } = useProgress();
  const { setActiveView } = useView();

  const [selectedPlaybookId, setSelectedPlaybookId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'COMPLETED' | 'PENDING'
  const [searchInput, setSearchInput] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce ligero para el buscador
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchInput);
    }, 150);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // Unificar ejercicios y clasificarlos jerárquicamente por Libreto Temático
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

    // 2. Mapear Katas independientes al libreto temático correspondiente según su categoría y módulo
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
      const stats = getPlaybookStats(pb.id);

      const pbExercises = allExercises.filter(ex => ex.moduleId === pb.moduleId);

      // Aplicar filtros de búsqueda y estado
      const filteredExercises = pbExercises.filter(ex => {
        const isDone = progress.completedExercises.includes(ex.id);

        if (statusFilter === 'COMPLETED' && !isDone) return false;
        if (statusFilter === 'PENDING' && isDone) return false;

        if (debouncedSearch.trim()) {
          const q = debouncedSearch.toLowerCase();
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
  }, [isPlaybookUnlocked, getPlaybookStats, statusFilter, debouncedSearch, progress.completedExercises]);

  // Libreto enfocado actualmente
  const activeSelectedPlaybook = useMemo(() => {
    if (!selectedPlaybookId) return null;
    return playbooksWithKatas.find(pb => pb.id === selectedPlaybookId) || null;
  }, [selectedPlaybookId, playbooksWithKatas]);

  const handleStartKata = (kata) => {
    selectExercise(kata);
    setActiveView('playground');
  };

  const handleSelectPlaybook = (pbId) => {
    setSelectedPlaybookId(pbId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-container">
      {/* 1. Header Principal y Buscador */}
      <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)' }}>
            <LayoutGrid size={26} />
            <h1 style={{ fontSize: '1.75rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
              Catálogo de Libretos & Katas SQL
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginTop: '0.25rem' }}>
            Explora los 10 Libretos Temáticos basados en escenarios reales de Fintech, E-Commerce y SaaS.
          </p>
        </div>

        {/* Buscador Rápido con Debounce */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-subtle)',
            padding: '0.45rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            minWidth: '280px'
          }}
        >
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Buscar por caso, tabla o cláusula..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '0.85rem',
              outline: 'none',
              width: '100%'
            }}
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.8rem'
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2. Widget de Gamificación: Siguiente Desafío Recomendado */}
      <NextLessonWidget />

      {/* 3. Filtros de Estado & Navegación */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div className="space-tabs" style={{ margin: 0 }}>
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`tab-btn ${statusFilter === 'ALL' ? 'active' : ''}`}
          >
            Todos los Retos
          </button>
          <button
            onClick={() => setStatusFilter('PENDING')}
            className={`tab-btn ${statusFilter === 'PENDING' ? 'active' : ''}`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setStatusFilter('COMPLETED')}
            className={`tab-btn ${statusFilter === 'COMPLETED' ? 'active' : ''}`}
          >
            Superados ({progress.completedExercises.length})
          </button>
        </div>

        {/* Botón rápido para alternar entre Libretos o volver a la vista general */}
        {selectedPlaybookId && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedPlaybookId(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              background: 'rgba(255, 255, 255, 0.04)'
            }}
          >
            <LayoutGrid size={15} />
            <span>Ver Todos los 10 Libretos</span>
          </Button>
        )}
      </div>

      {/* 4. Renderizado Condicional: Sub-Grid de Katas o Grid de Libretos */}
      {activeSelectedPlaybook ? (
        <KatasSubGrid
          playbook={activeSelectedPlaybook}
          onBack={() => setSelectedPlaybookId(null)}
          onSelectKata={handleStartKata}
          activeExerciseId={activeExerciseId}
          completedExerciseIds={progress.completedExercises}
        />
      ) : (
        <PlaybooksCardGrid
          playbooks={playbooksWithKatas}
          onSelectPlaybook={handleSelectPlaybook}
          selectedPlaybookId={selectedPlaybookId}
        />
      )}
    </div>
  );
}
