/**
 * @file ModuleZeroView.jsx
 * @description Contenedor principal interactivo del Módulo Cero (Fundamentos del Motor Relacional).
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RelationalVsFlatFile } from './RelationalVsFlatFile.jsx';
import { SqlEnginePipeline } from './SqlEnginePipeline.jsx';
import { SqlHistoryRelevance } from './SqlHistoryRelevance.jsx';
import { useProgress } from '../../../context/ProgressContext.jsx';
import { useView } from '../../../context/ViewContext.jsx';
import { BookOpen, Terminal, Database, Cpu, History, ArrowRight } from 'lucide-react';

export function ModuleZeroView() {
  const { currentLesson, selectLesson } = useProgress();
  const { setActiveView } = useView();

  // Mapeo automático de pestaña según la lección activa de Módulo 0
  const getTabFromLesson = (lessonId) => {
    if (lessonId === 'les-m0-engine') return 'engine';
    if (lessonId === 'les-m0-history') return 'history';
    return 'relational';
  };

  const [activeTab, setActiveTab] = useState(() => getTabFromLesson(currentLesson?.id));

  const handleTabChange = (tabKey, targetLessonId) => {
    setActiveTab(tabKey);
    selectLesson(targetLessonId);
  };

  return (
    <article className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Cabecera del Módulo Cero */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
            <span className="badge badge-cyan">Módulo 0 • Fundamentos</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Unidad Teórica & Interactiva</span>
          </div>
          <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0 }}>
            Fundamentos de Bases de Datos & Motor Relacional
          </h2>
        </div>

        <button
          onClick={() => setActiveView('playground')}
          className="btn-primary"
          style={{ fontSize: '0.82rem', padding: '0.45rem 0.9rem' }}
        >
          <Terminal size={15} />
          Ir al Taller Práctico SQL
        </button>
      </div>

      {/* Tabs de Navegación del Módulo Cero */}
      <div className="space-tabs" style={{ margin: 0 }}>
        <button
          onClick={() => handleTabChange('relational', 'les-m0-relational')}
          className={`tab-btn ${activeTab === 'relational' ? 'active' : ''}`}
          style={{ fontSize: '0.85rem' }}
        >
          <Database size={15} />
          1. Relacional vs. Archivo Plano / Excel
        </button>
        <button
          onClick={() => handleTabChange('engine', 'les-m0-engine')}
          className={`tab-btn ${activeTab === 'engine' ? 'active' : ''}`}
          style={{ fontSize: '0.85rem' }}
        >
          <Cpu size={15} />
          2. Pipeline del Motor (Parser / Optimizador)
        </button>
        <button
          onClick={() => handleTabChange('history', 'les-m0-history')}
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          style={{ fontSize: '0.85rem' }}
        >
          <History size={15} />
          3. Historia de SQL & Relevancia Actual
        </button>
      </div>

      {/* Renderizado de Secciones Interactivas */}
      <AnimatePresence mode="wait">
        {activeTab === 'relational' && (
          <motion.div
            key="relational"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <RelationalVsFlatFile />
          </motion.div>
        )}

        {activeTab === 'engine' && (
          <motion.div
            key="engine"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <SqlEnginePipeline />
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <SqlHistoryRelevance />
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
