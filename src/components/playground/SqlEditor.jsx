/**
 * @file SqlEditor.jsx
 * @description Editor de código SQL con plantilla inicial estricta,
 * atajos de teclado (Ctrl + Enter), copia rápida y reset al estado base pedagógico.
 */

import React, { memo } from 'react';
import { Play, RotateCcw, Copy, Check } from 'lucide-react';
import { Button } from '../common/Button.jsx';

export const STRICT_SQL_TEMPLATE = `-- Escribe tu consulta aquí\nSELECT `;
export const FIXED_SQL_TEMPLATE = STRICT_SQL_TEMPLATE;

export const SqlEditor = memo(function SqlEditor({
  value = FIXED_SQL_TEMPLATE,
  onChange,
  onExecute,
  onReset,
  placeholder = FIXED_SQL_TEMPLATE
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
    <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Barra de Herramientas del Editor */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.65rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--accent-cyan)', fontFamily: 'var(--font-code)' }}>
            💻 Editor SQL
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            (Ctrl + Enter para ejecutar)
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            title="Copiar código al portapapeles"
            icon={copied ? Check : Copy}
          >
            {copied ? 'Copiado' : 'Copiar'}
          </Button>
          
          {onReset && (
            <Button
              variant="danger"
              size="sm"
              onClick={handleReset}
              title="Restablecer plantilla inicial (Acción destructiva)"
              icon={RotateCcw}
            >
              Reset
            </Button>
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
          lineHeight: '1.55',
          resize: 'vertical',
          color: '#ffffff',
          tabSize: 2,
          padding: '0.85rem'
        }}
      />

      {/* Botón Principal de Ejecución: Primary CTA Único */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.25rem' }}>
        <Button
          variant="primary"
          size="lg"
          onClick={handleExecute}
          icon={Play}
        >
          Ejecutar Consulta
        </Button>
      </div>
    </div>
  );
});
