/**
 * @file SqlHistoryRelevance.jsx
 * @description Timeline interactiva sobre la historia de SQL, estándares y su vigencia en la era Cloud / AI.
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Award, Sparkles, Database, CheckCircle2, TrendingUp, Cpu, Bot } from 'lucide-react';

export function SqlHistoryRelevance() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const timeline = [
    {
      year: '1970',
      title: 'El Nacimiento del Modelo Relacional',
      author: 'Edgar F. Codd (IBM)',
      desc: 'Publicación del paper histórico que demostró que los datos debían estructurarse en tablas matemáticas (tuplas y relaciones) en lugar de grafos jerárquicos rígidos.',
      tag: 'Teoría Pura'
    },
    {
      year: '1974',
      title: 'Creación de SEQUEL / SQL',
      author: 'Donald Chamberlin & Ray Boyce',
      desc: 'Desarrollo en IBM San Jose del lenguaje declarativo SEQUEL (luego SQL) diseñado para ser leído como oraciones en inglés estructurado.',
      tag: 'Prototipo System R'
    },
    {
      year: '1986 / 1992',
      title: 'Estándares ANSI & SQL-92',
      author: 'Comité ANSI / ISO',
      desc: 'Consolidación universal de la sintaxis SQL. Se estandarizan los JOINs explícitos (INNER, LEFT, RIGHT), subconsultas y tipos de datos portables.',
      tag: 'Estandarización'
    },
    {
      year: '1999 / 2003',
      title: 'SQL3 & Window Functions',
      author: 'Evolución Moderna',
      desc: 'Llegan los Triggers, Stored Procedures, CTEs recursivas (WITH) y las revolucionarias Funciones de Ventana (OVER, ROW_NUMBER) para analítica compleja.',
      tag: 'Analítica Avanzada'
    },
    {
      year: 'Hoy & Futuro',
      title: 'Cloud Warehouses, Lakehouses & AI',
      author: 'Snowflake, BigQuery & LLMs',
      desc: 'SQL es la lengua franca de la Inteligencia Artificial. Los modelos LLM generan SQL (Text-to-SQL) para consultar Petabytes en segundos.',
      tag: 'Era Moderna & AI'
    }
  ];

  const current = timeline[selectedMilestone];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <History size={22} color="var(--accent-amber)" />
          Historia, Estándares y la Relevancia de SQL
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.25rem 0 0 0' }}>
          Más de 50 años como el estándar inquebrantable de la industria de software y analítica.
        </p>
      </div>

      {/* Timeline Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {timeline.map((item, idx) => {
          const isSelected = selectedMilestone === idx;
          return (
            <button
              key={idx}
              onClick={() => setSelectedMilestone(idx)}
              style={{
                flex: '1 0 160px',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: isSelected ? 'rgba(245, 158, 11, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                border: isSelected ? '1px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease'
              }}
            >
              <span style={{ fontSize: '0.75rem', color: isSelected ? 'var(--accent-amber)' : 'var(--text-muted)', fontWeight: 700 }}>
                {item.year}
              </span>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginTop: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Milestone Card */}
      <motion.div
        key={selectedMilestone}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="glass-card"
        style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '4px solid var(--accent-amber)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-amber)' }}>
              {current.year}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ fontSize: '1.05rem', color: '#ffffff', fontWeight: 600 }}>
              {current.title}
            </span>
          </div>
          <span className="badge badge-amber">{current.tag}</span>
        </div>

        <div style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
          🏛️ {current.author}
        </div>

        <p style={{ color: 'var(--text-primary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
          {current.desc}
        </p>
      </motion.div>

      {/* 3 Pillars of Modern SQL Relevance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.9rem' }}>
            <TrendingUp size={18} />
            <span>Declarativo vs Imperativo</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Tú defines <em>qué</em> resultado requieres; los algoritmos de optimización matemática del motor resuelven <em>cómo</em> acceder a los datos.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-indigo)', fontWeight: 600, fontSize: '0.9rem' }}>
            <Database size={18} />
            <span>Universalidad en Cloud</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Desde microcontroladores con SQLite hasta BigQuery con Exabytes distribuidos, el dialecto SQL es el estándar unificado.
          </p>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-purple)', fontWeight: 600, fontSize: '0.9rem' }}>
            <Bot size={18} />
            <span>La Interfaz de la IA</span>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Los agentes de Inteligencia Artificial utilizan SQL como su principal herramienta para interactuar de forma segura y precisa con datos empresariales.
          </p>
        </div>
      </div>
    </div>
  );
}
