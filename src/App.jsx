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

import React from 'react';
import { Navbar } from './components/common/Navbar.jsx';
import { WorkspaceView } from './components/playground/WorkspaceView.jsx';
import { TheorySpaceView } from './components/theory/TheorySpaceView.jsx';
import { MindMapView } from './components/mindmap/MindMapView.jsx';
import { ExerciseHubView } from './components/exercises/ExerciseHubView.jsx';
import { SchemaExplorerView } from './components/schema/SchemaExplorerView.jsx';

import { ViewProvider, useView } from './context/ViewContext.jsx';
import { ProgressProvider } from './context/ProgressContext.jsx';
import { DbEngineProvider } from './context/DbEngineContext.jsx';

function MainLayout() {
  const { activeView } = useView();

  return (
    <div className="app-container">
      {/* Encabezado con Selector de Espacios y Progreso */}
      <Navbar />

      {/* Renderizado Dinámico según el Espacio Seleccionado */}
      <main className="main-content">
        {activeView === 'playground' && <WorkspaceView />}
        {activeView === 'theory' && <TheorySpaceView />}
        {activeView === 'mindmap' && <MindMapView />}
        {activeView === 'exercises' && <ExerciseHubView />}
        {activeView === 'schema' && <SchemaExplorerView />}
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
