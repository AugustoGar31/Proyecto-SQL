/**
 * @file SqlEditor.jsx
 * @description Editor de código SQL con plantilla inicial estricta,
 * atajos de teclado (Ctrl + Enter), copia rápida y reset al estado base pedagógico.
 */

import React, { memo } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';

export const STRICT_SQL_TEMPLATE = `-- Escribe tu consulta SQL aquí\nSELECT `;

export const SqlEditor = memo(function SqlEditor({
  value = STRICT_SQL_TEMPLATE,
  onChange,
  onExecute,
  onReset,
  placeholder = STRICT_SQL_TEMPLATE
}) {
  const [internalCode, setInternalCode] = React.useState(value);
  const [copied, setCopied] = React.useState(false);

  // Sincronizar buffer solo si la prop externa 'value' cambia de referencia o reset
  React.useEffect(() => {
    setInternalCode(value);
  }, [value]);

  const handleChange = (e) => {
    const val = e.target.value;
    setInternalCode(val);
    if (onChange) {
      onChange(val);
    }
  };

  const handleExecute = () => {
    if (onExecute) {
      onExecute(internalCode);
    }
  };

  const handleReset = () => {
    setInternalCode(value);
    if (onReset) {
      onReset();
    }
  };

  /**
   * Captura la combinación Ctrl+Enter o Cmd+Enter para ejecutar la consulta.
   */
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleExecute();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(internalCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="glass-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Barra de Herramientas del Editor */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
          💻 Editor SQL
        </span>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleCopy}
            className="btn-glass"
            style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
            title="Copiar código"
            type="button"
          >
            {copied ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
          </button>
          
          {onReset && (
            <button
              onClick={handleReset}
              className="btn-glass"
              style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem' }}
              title="Restablecer plantilla inicial"
              type="button"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Área de Texto Monospaced Limpia */}
      <textarea
        value={internalCode}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        rows={7}
        className="glass-input"
        spellCheck="false"
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
        <button onClick={handleExecute} className="btn-primary" type="button">
          <Play size={16} fill="currentColor" />
          Ejecutar Consulta
        </button>
      </div>
    </div>
  );
});
