/**
 * @file MindMapView.jsx
 * @description Componente de espacio completo para el Mapa Mental Dinámico e Interactivo del Lenguaje SQL.
 * Reemplaza totalmente la imagen estática anterior por un renderizador visual basado en SVG/React.
 */

import React, { useState } from 'react';
import { MINDMAP_TREE } from './mindMapData.js';
import { Network, BookOpen, ArrowRight } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext.jsx';
import { useView } from '../../context/ViewContext.jsx';

export function MindMapView() {
  const { selectLesson } = useProgress();
  const { setActiveView } = useView();
  const [selectedNode, setSelectedNode] = useState(MINDMAP_TREE);
  const [filterCategory, setFilterCategory] = useState('ALL');

  /**
   * Maneja el clic en un nodo del mapa mental.
   * @param {Object} node - Objeto de nodo seleccionado.
   */
  const handleNodeClick = (node) => {
    setSelectedNode(node);
  };

  /**
   * Redirige al taller o teoría de la lección vinculada al nodo.
   * @param {string} lessonId - ID de lección.
   */
  const handleGoToLesson = (lessonId) => {
    if (lessonId) {
      selectLesson(lessonId);
      setActiveView('playground');
    }
  };

  // Filtrado de ramas por categoría
  const categories = ['ALL', 'DQL', 'DML', 'DDL', 'TCL', 'PROCEDURAL'];

  return (
    <div className="space-container">
      {/* Encabezado del Espacio Mapa Mental */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)' }}>
            <Network size={28} />
            <h1 style={{ fontSize: '1.75rem', color: '#ffffff', margin: 0 }}>
              Mapa Mental Interactivo de SQL
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Explora de forma visual la taxonomía del lenguaje (DQL, DML, DDL, TCL, Procedural) y navega a la práctica.
          </p>
        </div>

        {/* Filtro por Categorías */}
        <div className="space-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`tab-btn ${filterCategory === cat ? 'active' : ''}`}
            >
              {cat === 'ALL' ? 'Todos los Ramos' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contenedor Principal del Mapa Mental SVG */}
      <div className="mindmap-wrapper">
        <div className="mindmap-canvas-container">
          <svg width="100%" height="100%" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Conectores SVG Curvos */}
            {MINDMAP_TREE.children.map((catNode, idx) => {
              if (filterCategory !== 'ALL' && catNode.category !== filterCategory) return null;
              
              const angle = (idx / MINDMAP_TREE.children.length) * 2 * Math.PI - Math.PI / 2;
              const catX = 500 + Math.cos(angle) * 190;
              const catY = 300 + Math.sin(angle) * 170;

              return (
                <g key={catNode.id}>
                  {/* Línea Central al Nodo Categoría */}
                  <path
                    d={`M 500 300 Q ${(500 + catX) / 2} ${(300 + catY) / 2 - 20} ${catX} ${catY}`}
                    fill="none"
                    stroke={catNode.color}
                    strokeWidth="2.5"
                    opacity="0.6"
                    className="mindmap-connection"
                  />

                  {/* Nodos Hijos del Comando */}
                  {catNode.children && catNode.children.map((childNode, cIdx) => {
                    const childAngle = angle + (cIdx - (catNode.children.length - 1) / 2) * 0.35;
                    const childX = catX + Math.cos(childAngle) * 130;
                    const childY = catY + Math.sin(childAngle) * 110;

                    return (
                      <g key={childNode.id} className="mindmap-node" onClick={() => handleNodeClick(childNode)}>
                        <line
                          x1={catX}
                          y1={catY}
                          x2={childX}
                          y2={childY}
                          stroke={childNode.color}
                          strokeWidth="1.5"
                          opacity="0.4"
                        />
                        <circle
                          cx={childX}
                          cy={childY}
                          r={selectedNode.id === childNode.id ? 22 : 18}
                          fill="#0f172a"
                          stroke={childNode.color}
                          strokeWidth={selectedNode.id === childNode.id ? 3 : 2}
                          style={{ '--node-color': childNode.color }}
                        />
                        <text
                          x={childX}
                          y={childY + 32}
                          textAnchor="middle"
                          fill="#f8fafc"
                          fontSize="11"
                          fontWeight="600"
                          fontFamily="var(--font-ui)"
                        >
                          {childNode.label}
                        </text>
                      </g>
                    );
                  })}

                  {/* Nodo Categoría Principal */}
                  <g className="mindmap-node" onClick={() => handleNodeClick(catNode)}>
                    <rect
                      x={catX - 65}
                      y={catY - 22}
                      width="130"
                      height="44"
                      rx="10"
                      fill="#0f172a"
                      stroke={catNode.color}
                      strokeWidth="2.5"
                      filter="url(#glow)"
                      style={{ '--node-color': catNode.color }}
                    />
                    <text
                      x={catX}
                      y={catY + 5}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="13"
                      fontWeight="700"
                      fontFamily="var(--font-ui)"
                    >
                      {catNode.label}
                    </text>
                  </g>
                </g>
              );
            })}

            {/* Nodo Raíz Principal SQL */}
            <g className="mindmap-node" onClick={() => handleNodeClick(MINDMAP_TREE)}>
              <circle
                cx="500"
                cy="300"
                r="45"
                fill="url(#rootGradient)"
                stroke="#06b6d4"
                strokeWidth="4"
                filter="url(#glow)"
              />
              <defs>
                <linearGradient id="rootGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#1e293b" />
                </linearGradient>
              </defs>
              <text x="500" y="296" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="900">
                SQL
              </text>
              <text x="500" y="312" textAnchor="middle" fill="#94a3b8" fontSize="10">
                ENGINEERING
              </text>
            </g>
          </svg>
        </div>

        {/* Tooltip Informativo e Interactivo del Nodo Seleccionado */}
        {selectedNode && (
          <div className="mindmap-tooltip">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
              <span className="badge badge-cyan" style={{ background: selectedNode.color + '25', color: selectedNode.color, borderColor: selectedNode.color }}>
                {selectedNode.category || 'CATEGORÍA'}
              </span>
              <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                {selectedNode.label}
              </h3>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.5rem 0 1rem 0' }}>
              {selectedNode.description}
            </p>

            {selectedNode.lessonId && (
              <button
                onClick={() => handleGoToLesson(selectedNode.lessonId)}
                className="btn-primary"
                style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}
              >
                <BookOpen size={16} />
                Ir a la Lección y Práctica
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
