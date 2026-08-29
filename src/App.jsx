/**
 * @file App.jsx
 * @description Layout principal y Router de Espacios de Trabajo de SQL Master.
 * Elimina la pantalla monolítica saturada ("todo junto") reemplazándola por 5 espacios desacoplados:
 * 1. 🎓 'theory': Teoría & Plan de Estudio
 * 2. 💻 'playground': Taller Práctico SQL
 * 3. 🧠 'mindmap': Mapa Mental Dinámico e Interactivo (SVG/React)
 * 4. 🏋️ 'exercises': Catálogo de Katas (LeetCode style)
 * 5. 📊 'schema': Explorador de Arquitectura & ERD
 */

import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/common/Navbar.jsx';
import { SplashScreen } from './components/common/SplashScreen.jsx';
import { HomeOnboardingModal } from './components/home/HomeOnboardingModal.jsx';

// Code-Splitting: Carga bajo demanda de las 5 áreas de trabajo
const WorkspaceView = lazy(() => import('./components/playground/WorkspaceView.jsx').then(m => ({ default: m.WorkspaceView })));
const TheorySpaceView = lazy(() => import('./components/theory/TheorySpaceView.jsx').then(m => ({ default: m.TheorySpaceView })));
const MindMapView = lazy(() => import('./components/mindmap/MindMapView.jsx').then(m => ({ default: m.MindMapView })));
const ExerciseHubView = lazy(() => import('./components/exercises/ExerciseHubView.jsx').then(m => ({ default: m.ExerciseHubView })));
const SchemaExplorerView = lazy(() => import('./components/schema/SchemaExplorerView.jsx').then(m => ({ default: m.SchemaExplorerView })));

import { ViewProvider, useView } from './context/ViewContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import { DbEngineProvider } from './context/DbEngineContext.jsx';

function ViewLoadingFallback() {
  return (
    <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--accent-cyan)' }}>
      <div style={{ display: 'inline-block', width: '28px', height: '28px', border: '3px solid rgba(6, 182, 212, 0.2)', borderTopColor: 'var(--accent-cyan)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '1rem' }} />
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Cargando espacio de trabajo...</p>
    </div>
  );
}

function MainLayout() {
  const { activeView } = useView();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="app-container">
      {/* Pantalla de Bienvenida con Salida Suave */}
      <AnimatePresence mode="wait">
        {showSplash && (
          <SplashScreen onFinish={() => setShowSplash(false)} duration={2500} />
        )}
      </AnimatePresence>

      {/* Encabezado con Selector de Espacios y Progreso */}
      <Navbar />

      {/* Modal de Inicio y Onboarding con Bento Box & Carrusel */}
      <HomeOnboardingModal />

      {/* Renderizado Dinámico con Suspense y Code-Splitting */}
      <main className="main-content">
        <Suspense fallback={<ViewLoadingFallback />}>
          {activeView === 'playground' && <WorkspaceView />}
          {activeView === 'theory' && <TheorySpaceView />}
          {activeView === 'mindmap' && <MindMapView />}
          {activeView === 'exercises' && <ExerciseHubView />}
          {activeView === 'schema' && <SchemaExplorerView />}
        </Suspense>
      </main>
    </div>
  );
}

export function App() {
  return (
    <ProgressProvider>
      <DbEngineProvider>
        <ViewProvider>
          <MainLayout />
        </ViewProvider>
      </DbEngineProvider>
    </ProgressProvider>
  );
}

export default App;
