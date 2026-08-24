/**
 * @file SqlEditor.jsx
 * @description Editor de código SQL con soporte para atajos de teclado (Ctrl + Enter),
 * formateo visual, numeración de líneas y limpieza rápida.
 */

import React from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

export function SqlEditor({ value, onChange, onExecute, onReset }) {
  const [copied, setCopied] = React.useState(false);

  /**
   * Captura la combinación Ctrl+Enter o Cmd+Enter para ejecutar la consulta.
   */
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      onExecute();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Barra de Herramientas del Editor */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
          💻 Editor SQL (Ctrl + Enter para ejecutar)
        </span>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleCopy}
            className="btn-glass"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
            title="Copiar código"
          >
            {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
          </button>
          
          {onReset && (
            <button
              onClick={onReset}
              className="btn-glass"
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
              title="Restablecer consulta"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Creador de Área de Texto con Fuente Monospaced */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="-- Escribe tu consulta SQL aquí... Ej: SELECT * FROM estudiantes;"
        rows={7}
        className="glass-input"
        style={{
          width: '100%',
          fontFamily: 'var(--font-code)',
          fontSize: '0.92rem',
          lineHeight: '1.5',
          resize: 'vertical',
          color: '#ffffff',
          tabSize: 2
        }}
      />

      {/* Botón Principal de Ejecución */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={onExecute} className="btn-primary">
          <Play size={16} fill="currentColor" />
          Ejecutar Consulta (Ctrl + Enter)
        </button>
      </div>
    </div>
  );
}
