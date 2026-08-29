/**
 * @file ResultsTable.jsx
 * @description Componente de visualización para los resultados de la consulta SQL (filas, columnas, latencia).
 */

import React, { memo } from 'react';
import { Clock, Database, AlertCircle, CheckCircle2 } from 'lucide-react';

export const ResultsTable = memo(function ResultsTable({ queryResult }) {
  if (!queryResult) {
    return (
      <div className="glass-card" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <Database size={32} style={{ opacity: 0.4, marginBottom: '0.5rem' }} />
        <p style={{ margin: 0, fontSize: '0.9rem' }}>Ejecuta una consulta para visualizar el conjunto de datos retornado.</p>
      </div>
    );
  }

  if (!queryResult.success) {
    const errorCategory = queryResult.errorDetails?.category || 'Error al Ejecutar Consulta SQL';
    const errorSuggestion = queryResult.errorDetails?.suggestion;

    return (
      <div
        className="glass-card"
        style={{
          padding: '1.25rem',
          borderColor: 'var(--accent-rose)',
          background: 'rgba(244, 63, 94, 0.08)',
          boxShadow: '0 0 15px rgba(244, 63, 94, 0.15)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-rose)', fontWeight: 600, fontSize: '0.95rem' }}>
          <AlertCircle size={20} style={{ flexShrink: 0 }} />
          <span>⚠️ {errorCategory}</span>
        </div>

        <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid var(--accent-rose)' }}>
          <code style={{ color: '#ffb4b4', fontFamily: 'var(--font-code)', fontSize: '0.85rem', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {queryResult.error}
          </code>
        </div>

        {errorSuggestion && (
          <div style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', background: 'rgba(255, 255, 255, 0.04)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)' }}>
            <strong style={{ color: 'var(--accent-amber)' }}>💡 Consejo para el estudiante:</strong> {errorSuggestion}
          </div>
        )}
      </div>
    );
  }

  const { columns, values, rowsAffected, executionTimeMs } = queryResult;

  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      {/* Encabezado con Métricas de Rendimiento */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-emerald)' }}>
          <CheckCircle2 size={16} />
          <span>Consulta ejecutada con éxito</span>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span>Filas: <strong style={{ color: '#fff' }}>{rowsAffected}</strong></span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Clock size={14} /> <strong style={{ color: 'var(--accent-cyan)' }}>{executionTimeMs} ms</strong>
          </span>
        </div>
      </div>

      {/* Renderizado de Tabla */}
      <div className="table-container">
        <table className="sql-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th key={idx}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((val, cIdx) => (
                  <td key={cIdx}>
                    {val === null ? <em style={{ color: 'var(--accent-amber)' }}>NULL</em> : String(val)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});
