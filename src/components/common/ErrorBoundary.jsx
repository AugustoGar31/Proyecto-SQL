/**
 * @file ErrorBoundary.jsx
 * @description Componente ErrorBoundary para capturar cualquier excepción no controlada en React y evitar pantallas en blanco.
 */

import React from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';
import { storageService } from '../../services/storageService.js';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error no capturado en la aplicación React:', error, errorInfo);
  }

  handleReset = () => {
    storageService.resetProgress();
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#0f172a',
          color: '#f8fafc',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif"
        }}>
          <div style={{
            background: 'rgba(30, 41, 59, 0.9)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '16px',
            padding: '2.5rem',
            maxWidth: '550px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ color: '#ef4444', marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
              <AlertOctagon size={56} />
            </div>
            <h1 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', fontWeight: 700 }}>
              ⚠️ Algo no salió como esperábamos
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              Ha ocurrido un detalle al cargar los datos o la interfaz. No te preocupes, puedes restablecer los datos guardados para solucionar la pantalla.
            </p>
            {this.state.error && (
              <pre style={{
                background: '#090d16',
                padding: '0.75rem',
                borderRadius: '8px',
                color: '#fca5a5',
                fontSize: '0.8rem',
                textAlign: 'left',
                overflowX: 'auto',
                marginBottom: '1.5rem',
                maxHeight: '120px'
              }}>
                {this.state.error.toString()}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              style={{
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: '#ffffff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <RotateCcw size={18} />
              <span>Restablecer y Recargar Página</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
