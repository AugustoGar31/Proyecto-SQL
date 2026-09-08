/**
 * @file ExerciseHubView.jsx
 * @description Espacio de Trabajo 4: Catálogo de Katas y Desafíos SQL Ampliado (+50 Katas).
 * Permite filtrar por estado (Todos, Completados, Pendientes), por Categoría (DQL, DML, DDL, TCL, Procedural)
 * y búsqueda en tiempo real.
 */

import React, { useState, useMemo } from 'react';
import { MODULES_DATA } from '../../data/modulesData.js';
import { KATAS_CATALOG } from '../../data/katasData.js';
import { SQL_CATEGORIES } from '../../data/categoriesData.js';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useView } from '../../context/ViewContext.jsx';
import {
  Dumbbell,
  CheckCircle2,
  Circle,
  ArrowRight,
  Search,
  Building,
  Sparkles,
  Layers
} from 'lucide-react';

export function ExerciseHubView() {
  const { selectLesson, progress } = useProgress();
  const { setActiveView } = useView();

  const [statusFilter, setStatusFilter] = useState('ALL'); // 'ALL' | 'COMPLETED' | 'PENDING'
  const [categoryFilter, setCategoryFilter] = useState('ALL'); // 'ALL' | 'DQL' | 'DML' | 'DDL' | 'TCL' | 'PROCEDURAL'
  const [searchQuery, setSearchQuery] = useState('');

  // Unificar ejercicios curriculares con el catálogo de Katas
  const allKatas = useMemo(() => {
    const fromCurriculum = MODULES_DATA.flatMap(m =>
      (m.lessons || []).flatMap(l =>
        (l.exercises || []).map(ex => ({
          ...ex,
          category: ex.category || (m.categoryCode || 'DQL'),
          moduleTitle: m.title,
          lessonId: l.id,
          lessonTitle: l.title,
          schemaId: l.schemaId || ex.schemaId || 'universidad'
        }))
      )
    );

    // Evitar duplicados por ID
    const seenIds = new Set(fromCurriculum.map(k => k.id));
    const standaloneKatas = KATAS_CATALOG.filter(k => !seenIds.has(k.id)).map(k => ({
      ...k,
      moduleTitle: `Kata: ${k.category}`,
      lessonId: 'les-select-basics'
    }));

    return [...fromCurriculum, ...standaloneKatas];
  }, []);

  const filteredKatas = useMemo(() => {
    return allKatas.filter(k => {
      const isDone = progress.completedExercises.includes(k.id);

      // Filtro de Estado
      if (statusFilter === 'COMPLETED' && !isDone) return false;
      if (statusFilter === 'PENDING' && isDone) return false;

      // Filtro de Categoría
      if (categoryFilter !== 'ALL' && k.category !== categoryFilter) return false;

      // Búsqueda por texto
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = k.title.toLowerCase().includes(q);
        const matchesPrompt = (k.prompt || '').toLowerCase().includes(q);
        const matchesDepartment = k.businessCase?.department?.toLowerCase().includes(q);
        if (!matchesTitle && !matchesPrompt && !matchesDepartment) return false;
      }

      return true;
    });
  }, [allKatas, statusFilter, categoryFilter, searchQuery, progress.completedExercises]);

  const handleStartKata = (kata) => {
    if (kata.lessonId) {
      selectLesson(kata.lessonId);
    }
    setActiveView('playground');
  };

  return (
    <div className="space-container">
      {/* Header Principal */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-amber)' }}>
            <Dumbbell size={28} />
            <h1 style={{ fontSize: '1.75rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
              Catálogo de Katas & Casos de Negocio (+50 Retos)
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Desafíos reales de ingeniería de bases de datos con validación automática y pistas multinivel.
          </p>
        </div>

        {/* Buscador Rápido */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-md)', minWidth: '240px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Buscar por caso, cláusula..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: '0.85rem', outline: 'none', width: '100%' }}
          />
        </div>
      </div>

      {/* Barra de Filtros Doble: Categorías + Estado */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* Filtro por Categorías */}
        <div className="space-tabs" style={{ margin: 0 }}>
          <button onClick={() => setCategoryFilter('ALL')} className={`tab-btn ${categoryFilter === 'ALL' ? 'active' : ''}`}>
            Todas las Categorías
          </button>
          <button onClick={() => setCategoryFilter('DQL')} className={`tab-btn ${categoryFilter === 'DQL' ? 'active' : ''}`}>
            🔍 DQL
          </button>
          <button onClick={() => setCategoryFilter('DML')} className={`tab-btn ${categoryFilter === 'DML' ? 'active' : ''}`}>
            🛠️ DML
          </button>
          <button onClick={() => setCategoryFilter('DDL')} className={`tab-btn ${categoryFilter === 'DDL' ? 'active' : ''}`}>
            🏗️ DDL
          </button>
          <button onClick={() => setCategoryFilter('TCL')} className={`tab-btn ${categoryFilter === 'TCL' ? 'active' : ''}`}>
            🔒 TCL
          </button>
          <button onClick={() => setCategoryFilter('PROCEDURAL')} className={`tab-btn ${categoryFilter === 'PROCEDURAL' ? 'active' : ''}`}>
            ⚙️ Procedural
          </button>
        </div>

        {/* Filtro por Estado de Completitud */}
        <div className="space-tabs" style={{ margin: 0 }}>
          <button onClick={() => setStatusFilter('ALL')} className={`tab-btn ${statusFilter === 'ALL' ? 'active' : ''}`}>
            Todos ({allKatas.length})
          </button>
          <button onClick={() => setStatusFilter('COMPLETED')} className={`tab-btn ${statusFilter === 'COMPLETED' ? 'active' : ''}`}>
            Resueltos ({progress.completedExercises.length})
          </button>
          <button onClick={() => setStatusFilter('PENDING')} className={`tab-btn ${statusFilter === 'PENDING' ? 'active' : ''}`}>
            Pendientes ({Math.max(0, allKatas.length - progress.completedExercises.length)})
          </button>
        </div>
      </div>

      {/* Grid de Tarjetas de Katas */}
      {filteredKatas.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p style={{ margin: 0, fontSize: '1rem' }}>No se encontraron Katas con los filtros seleccionados.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {filteredKatas.map((kata) => {
            const isDone = progress.completedExercises.includes(kata.id);

            let badgeClass = 'badge-indigo';
            if (kata.category === 'DML') badgeClass = 'badge-emerald';
            if (kata.category === 'DDL') badgeClass = 'badge-amber';
            if (kata.category === 'TCL') badgeClass = 'badge-rose';
            if (kata.category === 'PROCEDURAL') badgeClass = 'badge-purple';

            return (
              <div
                key={kata.id}
                className="glass-card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                    <span className={`badge ${badgeClass}`}>{kata.category}</span>
                    {isDone ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: 600 }}>
                        <CheckCircle2 size={16} /> Resuelto
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        <Circle size={16} /> Pendiente
                      </div>
                    )}
                  </div>

                  <h3 style={{ fontSize: '1.05rem', color: '#ffffff', marginBottom: '0.4rem', lineHeight: 1.4 }}>
                    {kata.title}
                  </h3>

                  {kata.businessCase && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                      <Building size={13} />
                      <span>{kata.businessCase.department}</span>
                    </div>
                  )}

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                    {kata.prompt}
                  </p>
                </div>

                <button
                  onClick={() => handleStartKata(kata)}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}
                >
                  {isDone ? 'Volver a Resolver' : 'Iniciar Desafío'}
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
