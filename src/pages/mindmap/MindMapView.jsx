/**
 * @file MindMapView.jsx
 * @description Componente de navegación interactiva y Taxonomía Drill-down del Lenguaje SQL.
 * Implementa una arquitectura visual limpia con transiciones suaves (Framer Motion) y vistas detalladas por categoría.
 */

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MINDMAP_CATEGORIES } from '../../data/mindMapData.js';
import { CategoryDetailView } from '../../components/mindmap/CategoryDetailView.jsx';
import { useCurriculum } from '../../context/ProgressContext.jsx';
import { useView } from '../../context/ViewContext.jsx';
import { Network, Sparkles } from 'lucide-react';

// Variantes de animación para el mapa base (estáticas en módulo para evitar re-instanciación)
const BASE_MAP_VARIANTS = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }
  },
  exit: {
    opacity: 0,
    scale: 1.04,
    transition: { duration: 0.25, ease: 'easeInOut' }
  }
};

// Coordenadas fijas simétricas (estáticas)
const CATEGORY_POSITIONS = [
  { id: 'dql', x: 500, y: 95 },         // Superior Centro
  { id: 'dml', x: 740, y: 220 },        // Superior Derecha
  { id: 'ddl', x: 670, y: 475 },        // Inferior Derecha
  { id: 'tcl', x: 330, y: 475 },        // Inferior Izquierda
  { id: 'procedural', x: 260, y: 220 }  // Superior Izquierda
];

export function MindMapView() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const { selectLesson } = useCurriculum();
  const { setActiveView } = useView();

  const handlePracticeCommand = useCallback((lessonId) => {
    if (lessonId) {
      selectLesson(lessonId);
      setActiveView('playground');
    }
  }, [selectLesson, setActiveView]);

  const activeCategory = selectedCategoryId ? MINDMAP_CATEGORIES.find(c => c.id === selectedCategoryId) : null;

  return (
    <div className="space-container">
      {/* Encabezado del Espacio */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)' }}>
            <Network size={28} />
            <h1 style={{ fontSize: '1.75rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
              Mapa Mental Interactivo de SQL
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Explora la taxonomía completa del lenguaje. Haz clic en cualquier categoría para profundizar en sus comandos.
          </p>
        </div>

        {/* Acceso Rápido a Categorías */}
        {!selectedCategoryId && (
          <div className="space-tabs">
            {MINDMAP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className="tab-btn"
                style={{ '--btn-accent': cat.color }}
              >
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: cat.color, marginRight: '6px' }} />
                {cat.shortLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Contenedor Principal con Transiciones Suaves (Drill-down) */}
      <AnimatePresence mode="wait">
        {selectedCategoryId && activeCategory ? (
          <CategoryDetailView
            key={`detail-${selectedCategoryId}`}
            category={activeCategory}
            onBack={() => setSelectedCategoryId(null)}
            onPracticeCommand={handlePracticeCommand}
          />
        ) : (
          <motion.div
            key="base-mindmap"
            className="mindmap-wrapper"
            variants={BASE_MAP_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Banner de Ayuda Visual */}
            <div className="mindmap-hint-banner">
              <Sparkles size={16} color="var(--accent-cyan)" />
              <span>Haz clic en cualquier categoría para abrir su vista detallada</span>
            </div>

            <div className="mindmap-canvas-container">
              <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
                <defs>
                  {/* Gradiente del Nodo Central */}
                  <radialGradient id="rootCenterGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1e293b" />
                    <stop offset="70%" stopColor="#0f172a" />
                    <stop offset="100%" stopColor="#020617" />
                  </radialGradient>
                </defs>

                {/* 1. Conexiones Curvas Bezier entre el Centro y las Categorías */}
                {MINDMAP_CATEGORIES.map((cat) => {
                  const pos = CATEGORY_POSITIONS.find(p => p.id === cat.id) || { x: 500, y: 300 };
                  const controlX = (500 + pos.x) / 2;
                  const controlY = (300 + pos.y) / 2;

                  return (
                    <g key={`conn-${cat.id}`}>
                      {/* Línea de brillo de fondo */}
                      <path
                        d={`M 500 300 Q ${controlX} ${controlY} ${pos.x} ${pos.y}`}
                        fill="none"
                        stroke={cat.color}
                        strokeWidth="5"
                        opacity="0.15"
                      />
                      {/* Línea animada */}
                      <path
                        d={`M 500 300 Q ${controlX} ${controlY} ${pos.x} ${pos.y}`}
                        fill="none"
                        stroke={cat.color}
                        strokeWidth="2.5"
                        opacity="0.75"
                        className="mindmap-connection"
                      />
                    </g>
                  );
                })}

                {/* 2. Nodo Central "SQL ENGINEERING" */}
                <g className="mindmap-center-node">
                  {/* Anillo de pulso exterior */}
                  <circle
                    cx="500"
                    cy="300"
                    r="60"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    opacity="0.3"
                    className="center-pulse-ring"
                  />
                  {/* Círculo Principal */}
                  <circle
                    cx="500"
                    cy="300"
                    r="52"
                    fill="url(#rootCenterGradient)"
                    stroke="#06b6d4"
                    strokeWidth="3"
                  />
                  {/* Textos del Centro */}
                  <text x="500" y="295" textAnchor="middle" fill="#06b6d4" fontSize="18" fontWeight="900" letterSpacing="1px">
                    SQL
                  </text>
                  <text x="500" y="315" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="700" letterSpacing="2px">
                    ENGINEERING
                  </text>
                </g>

                {/* 3. Los 5 Recuadros de Categoría Principales */}
                {MINDMAP_CATEGORIES.map((cat) => {
                  const pos = CATEGORY_POSITIONS.find(p => p.id === cat.id) || { x: 500, y: 300 };
                  const boxWidth = 168;
                  const boxHeight = 68;
                  const boxX = pos.x - boxWidth / 2;
                  const boxY = pos.y - boxHeight / 2;

                  return (
                    <g
                      key={`card-${cat.id}`}
                      className="mindmap-category-node"
                      onClick={() => setSelectedCategoryId(cat.id)}
                      style={{ cursor: 'pointer', '--cat-glow': cat.color }}
                    >
                      {/* Fondo de tarjeta */}
                      <rect
                        x={boxX}
                        y={boxY}
                        width={boxWidth}
                        height={boxHeight}
                        rx="14"
                        fill="#0b1329"
                        stroke={cat.color}
                        strokeWidth="2.5"
                        className="category-box-rect"
                      />

                      {/* Etiqueta de la Categoría */}
                      <text
                        x={pos.x}
                        y={pos.y - 8}
                        textAnchor="middle"
                        fill="#ffffff"
                        fontSize="15"
                        fontWeight="800"
                        fontFamily="var(--font-ui)"
                      >
                        {cat.shortLabel}
                      </text>

                      {/* Subtítulo / Descripción corta */}
                      <text
                        x={pos.x}
                        y={pos.y + 12}
                        textAnchor="middle"
                        fill={cat.color}
                        fontSize="10.5"
                        fontWeight="600"
                        fontFamily="var(--font-ui)"
                      >
                        {cat.commands.length} Comandos • Explorar →
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
