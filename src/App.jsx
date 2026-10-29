import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Navbar } from './components/layout/Navbar.jsx';
import { SplashScreen } from './components/common/SplashScreen.jsx';
import { HomeOnboardingModal } from './components/home/HomeOnboardingModal.jsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx';

// Code-Splitting: Carga bajo demanda de las 5 áreas de trabajo
const WorkspaceView = lazy(() => import('./pages/playground/WorkspaceView.jsx').then(m => ({ default: m.WorkspaceView })));
const TheorySpaceView = lazy(() => import('./pages/theory/TheorySpaceView.jsx').then(m => ({ default: m.TheorySpaceView })));
const MindMapView = lazy(() => import('./pages/mindmap/MindMapView.jsx').then(m => ({ default: m.MindMapView })));
const ExerciseHubView = lazy(() => import('./pages/exercises/ExerciseHubView.jsx').then(m => ({ default: m.ExerciseHubView })));
const SchemaExplorerView = lazy(() => import('./pages/schema/SchemaExplorerView.jsx').then(m => ({ default: m.SchemaExplorerView })));

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

import { AITutorWidget } from './features/ai-tutor';

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
        <ErrorBoundary inline key={activeView}>
          <Suspense fallback={<ViewLoadingFallback />}>
            {activeView === 'playground' && <WorkspaceView />}
            {activeView === 'theory' && <TheorySpaceView />}
            {activeView === 'mindmap' && <MindMapView />}
            {activeView === 'exercises' && <ExerciseHubView />}
            {activeView === 'schema' && <SchemaExplorerView />}
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Asistente Inteligente Flotante Desacoplado */}
      <AITutorWidget />
    </div>
  );
}

export function App() {
  return (
    <ProgressProvider>
      <DbEngineProvider>
        <ViewProvider>
          <MainLayout />
          <Analytics />
        </ViewProvider>
      </DbEngineProvider>
    </ProgressProvider>
  );
}

export default App;
