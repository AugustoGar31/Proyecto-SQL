/**
 * @file main.jsx
 * @description Punto de entrada principal de la aplicación React.
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.jsx';
import { initTelemetry, registerPwaServiceWorker } from './services/telemetryService.js';

import './styles/main.css';

// Inicialización asíncrona no bloqueante de analítica y Service Worker PWA
initTelemetry();
registerPwaServiceWorker();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
