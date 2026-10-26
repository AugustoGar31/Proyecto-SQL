/**
 * @file SqlCodeSnippetBlock.jsx
 * @description Componente de bloque de código SQL moderno estilo IDE con botones macOS,
 * syntax highlighting ligero nativo, botón de copia interactivo y notas de producción.
 */

import React from 'react';
import { Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { useClipboard } from '../../../hooks/useClipboard.js';

/**
 * Función de resaltado de sintaxis SQL nativa sin dependencias externas.
 * Tokeniza comentarios, cadenas, palabras clave, funciones y números.
 */
function renderHighlightedSql(code) {
  if (!code) return null;

  // Lista de palabras clave reservadas de SQL
  const KEYWORDS = [
    'SELECT', 'FROM', 'WHERE', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN',
    'JOIN', 'CROSS JOIN', 'ON', 'GROUP BY', 'HAVING', 'ORDER BY', 'ASC', 'DESC',
    'LIMIT', 'OFFSET', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
    'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'PRIMARY KEY', 'FOREIGN KEY',
    'REFERENCES', 'CHECK', 'DEFAULT', 'UNIQUE', 'NOT NULL', 'AND', 'OR', 'NOT',
    'IN', 'BETWEEN', 'LIKE', 'IS NULL', 'IS NOT NULL', 'AS', 'CASE', 'WHEN',
    'THEN', 'ELSE', 'END', 'DISTINCT', 'UNION ALL', 'UNION', 'EXISTS'
  ];

  const FUNCTIONS = [
    'COUNT', 'AVG', 'SUM', 'MAX', 'MIN', 'COALESCE', 'ROUND', 'LOWER', 'UPPER',
    'LENGTH', 'SUBSTR', 'TRIM', 'ROW_NUMBER', 'RANK', 'DENSE_RANK'
  ];

  // Regex para segmentar el código en tokens
  const tokenRegex = /(--[^\n]*)|('(?:''|[^'\\]|\\.)*')|(\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b)|([(),;=<>!+\-*/])|(\s+)|(.)/g;

  const elements = [];
  let match;
  let keyIndex = 0;

  while ((match = tokenRegex.exec(code)) !== null) {
    const [full, comment, stringVal, numberVal, wordVal, opVal, whitespace, other] = match;

    if (comment) {
      elements.push(<span key={keyIndex++} className="sql-comment">{comment}</span>);
    } else if (stringVal) {
      elements.push(<span key={keyIndex++} className="sql-string">{stringVal}</span>);
    } else if (numberVal) {
      elements.push(<span key={keyIndex++} className="sql-number">{numberVal}</span>);
    } else if (wordVal) {
      const upperWord = wordVal.toUpperCase();
      if (KEYWORDS.includes(upperWord)) {
        elements.push(<span key={keyIndex++} className="sql-keyword">{wordVal}</span>);
      } else if (FUNCTIONS.includes(upperWord)) {
        elements.push(<span key={keyIndex++} className="sql-function">{wordVal}</span>);
      } else {
        elements.push(<span key={keyIndex++}>{wordVal}</span>);
      }
    } else if (opVal) {
      if (['=', '<', '>', '<>', '!=', '<=', '>='].includes(opVal)) {
        elements.push(<span key={keyIndex++} className="sql-operator">{opVal}</span>);
      } else {
        elements.push(<span key={keyIndex++}>{opVal}</span>);
      }
    } else if (whitespace) {
      elements.push(whitespace);
    } else {
      elements.push(other);
    }
  }

  return elements;
}

export function SqlCodeSnippetBlock({ block }) {
  const { copied, copy } = useClipboard(2000);
  const { title, description, code, notes, language = 'SQL' } = block;

  const handleCopy = () => copy(code);

  return (
    <div className="code-snippet-box">
      {/* Top Bar estilo IDE */}
      <div className="code-snippet-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div className="code-window-controls" aria-hidden="true">
            <span className="window-dot window-dot-red" />
            <span className="window-dot window-dot-amber" />
            <span className="window-dot window-dot-green" />
          </div>
          <div className="code-snippet-title">
            <Terminal size={15} style={{ color: 'var(--accent-cyan)' }} />
            <span>{title || 'Consulta SQL'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span className="badge badge-cyan" style={{ fontSize: '0.72rem', padding: '0.15rem 0.5rem' }}>
            {language}
          </span>
          <button
            className={`code-copy-btn ${copied ? 'copied' : ''}`}
            onClick={handleCopy}
            title="Copiar consulta SQL"
            aria-label="Copiar consulta SQL al portapapeles"
          >
            {copied ? (
              <>
                <Check size={13} />
                <span>¡Copiado!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copiar SQL</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Descripción explicativa opcional */}
      {description && (
        <div className="code-snippet-description">
          {description}
        </div>
      )}

      {/* Editor Canvas */}
      <pre className="code-snippet-canvas">
        <code>{renderHighlightedSql(code)}</code>
      </pre>

      {/* Footer con notas de ingeniería */}
      {notes && (
        <div className="code-snippet-footer">
          <Sparkles size={16} className="code-snippet-footer-icon" />
          <span>{notes}</span>
        </div>
      )}
    </div>
  );
}
