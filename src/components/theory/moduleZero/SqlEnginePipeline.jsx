/**
 * @file SqlEnginePipeline.jsx
 * @description Visualizador y simulador interactivo del ciclo interno del motor SQL:
 * 1. Parser & Lexer ➔ 2. Query Optimizer (CBO) ➔ 3. Execution Engine & Buffer Pool.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Search, Sparkles, ArrowRight, Play, CheckCircle2, Database, Terminal, Layers } from 'lucide-react';

export function SqlEnginePipeline() {
  const [selectedStage, setSelectedStage] = useState(1); // 1: Parser, 2: Optimizer, 3: Engine
  const [queryInput, setQueryInput] = useState('SELECT nombre, promedio FROM alumnos WHERE id_carrera = 2 AND promedio >= 8.0;');
  const [isSimulating, setIsSimulating] = useState(false);

  const stages = [
    {
      id: 1,
      title: '1. Parser & Lexer',
      subtitle: 'Análisis Léxico & AST',
      icon: Terminal,
      color: 'var(--accent-indigo)',
      badge: 'Fase de Compilación',
      description: 'El analizador descompone el texto SQL en tokens (SELECT, FROM, WHERE), valida la sintaxis contra la gramática y construye un Árbol Sintáctico Abstracto (AST).',
      outputTitle: 'Árbol de Sintaxis Abstracta (AST Generado):',
      outputCode: `{
  "type": "SelectStatement",
  "columns": ["nombre", "promedio"],
  "from": "alumnos",
  "where": {
    "operator": "AND",
    "left": { "field": "id_carrera", "op": "=", "val": 2 },
    "right": { "field": "promedio", "op": ">=", "val": 8.0 }
  }
}`
    },
    {
      id: 2,
      title: '2. Query Optimizer',
      subtitle: 'Optimizador Basado en Costos (CBO)',
      icon: Sparkles,
      color: 'var(--accent-amber)',
      badge: 'Cálculo de Costo & Plan',
      description: 'El cerebro matemático del motor. Consulta las estadísticas del catálogo y evalúa si conviene usar un índice B-Tree (idx_carrera) o un escaneo secuencial completo (Full Table Scan).',
      outputTitle: 'Plan de Ejecución Seleccionado (EXPLAIN PLAN):',
      outputCode: `SEARCH TABLE alumnos USING INDEX idx_alumnos_carrera (id_carrera=?)
  ├─ Estimación de Costo I/O: 3.2 ms (vs 45.0 ms Scan)
  ├─ Filtrado Residual: promedio >= 8.0
  └─ Proyección en Memoria: [nombre, promedio]`
    },
    {
      id: 3,
      title: '3. Execution Engine',
      subtitle: 'Buffer Pool & Storage Engine',
      icon: Cpu,
      color: 'var(--accent-emerald)',
      badge: 'Ejecución & Salida',
      description: 'El ejecutor recorre las páginas de datos en el Buffer Pool de la memoria RAM. Si una página no está en memoria, la solicita al disco físico y retorna las tuplas resultantes.',
      outputTitle: 'Tuplas Retornadas desde el Buffer Pool:',
      outputCode: `[
  { "nombre": "Ana Gómez", "promedio": 9.2 },
  { "nombre": "Carlos Pérez", "promedio": 8.1 }
]
Status: 2 tuplas leídas en 0.42 ms (100% Cache Hit)`
    }
  ];

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setSelectedStage(1);
    setTimeout(() => setSelectedStage(2), 1000);
    setTimeout(() => {
      setSelectedStage(3);
      setIsSimulating(false);
    }, 2200);
  };

  const currentStageData = stages.find(s => s.id === selectedStage);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Cpu size={22} color="var(--accent-indigo)" />
          El Pipeline del Motor SQL por Dentro
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.25rem 0 0 0' }}>
          Descubre cómo el motor transforma texto declarativo en operaciones optimizadas de hardware.
        </p>
      </div>

      {/* Query Bar & Simulator Button */}
      <div className="glass-card" style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(0,0,0,0.4)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
          <Terminal size={16} color="var(--accent-cyan)" />
          <code style={{ fontSize: '0.85rem', color: '#38bdf8', overflowX: 'auto', whiteSpace: 'nowrap' }}>
            {queryInput}
          </code>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="btn-primary"
          style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
        >
          <Play size={15} />
          {isSimulating ? 'Procesando en el Motor...' : 'Simular Pipeline Completo'}
        </button>
      </div>

      {/* Stage Nodes Stepper */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {stages.map((stage) => {
          const isSelected = selectedStage === stage.id;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              onClick={() => setSelectedStage(stage.id)}
              className="glass-card"
              style={{
                padding: '1.25rem',
                cursor: 'pointer',
                border: isSelected ? `2px solid ${stage.color}` : '1px solid var(--border-subtle)',
                background: isSelected ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span className="badge" style={{ background: `rgba(255,255,255,0.05)`, color: stage.color, fontSize: '0.72rem' }}>
                  {stage.badge}
                </span>
                <Icon size={20} color={stage.color} />
              </div>

              <h4 style={{ margin: 0, fontSize: '1rem', color: '#ffffff' }}>
                {stage.title}
              </h4>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                {stage.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      {currentStageData && (
        <motion.div
          key={currentStageData.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="glass-card"
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: currentStageData.color, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Explicación de la Fase
            </span>
            <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.6, margin: '0.4rem 0 0 0' }}>
              {currentStageData.description}
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.4rem' }}>
              <Layers size={14} />
              <span>{currentStageData.outputTitle}</span>
            </div>

            <pre style={{ margin: 0, padding: '1rem', background: 'rgba(0, 0, 0, 0.6)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', color: '#34d399', fontSize: '0.82rem', fontFamily: 'monospace', overflowX: 'auto' }}>
              {currentStageData.outputCode}
            </pre>
          </div>
        </motion.div>
      )}
    </div>
  );
}
