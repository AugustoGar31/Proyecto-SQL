/**
 * @file ChatMessageList.jsx
 * @description Renderizado de la lista de mensajes del chat con formateo de texto,
 * bloques de código SQL y soporte para tarjetas socráticas diferenciadas.
 */

import React, { useEffect, useRef } from 'react';
import { Bot, User, AlertCircle, Sparkles } from 'lucide-react';

/**
 * Parser ligero para renderizar markdown básico (negritas, cursivas, bloques de código)
 * sin añadir dependencias externas pesadas.
 */
function FormattedMessageText({ text }) {
  if (!text) return null;

  // Si contiene bloques de código ```
  if (text.includes('```')) {
    const parts = text.split(/(```[\s\S]*?```)/g);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {parts.map((part, index) => {
          if (part.startsWith('```') && part.endsWith('```')) {
            const lines = part.slice(3, -3).trim().split('\n');
            const lang = lines[0].match(/^[a-z]+/i) ? lines[0] : '';
            const code = lang ? lines.slice(1).join('\n') : lines.join('\n');
            return (
              <pre
                key={index}
                style={{
                  background: 'rgba(0, 0, 0, 0.45)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '0.5rem 0.65rem',
                  margin: '0.2rem 0',
                  fontFamily: 'var(--font-code)',
                  fontSize: '0.8rem',
                  overflowX: 'auto',
                  color: '#38bdf8'
                }}
              >
                <code>{code}</code>
              </pre>
            );
          }
          return <p key={index} style={{ margin: 0 }}>{renderInlineFormatting(part)}</p>;
        })}
      </div>
    );
  }

  // Párrafos con saltos de línea
  const paragraphs = text.split('\n\n');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      {paragraphs.map((p, idx) => (
        <p key={idx} style={{ margin: 0, lineHeight: 1.5 }}>
          {renderInlineFormatting(p)}
        </p>
      ))}
    </div>
  );
}

function renderInlineFormatting(rawText) {
  // Dividir líneas individuales si hay saltos simples
  const lines = rawText.split('\n');
  return lines.map((line, lIdx) => {
    // Procesar negrita y código inline
    const tokens = line.split(/(\*\*.*?\*\*|`.*?`|_.*?_)/g);
    return (
      <React.Fragment key={lIdx}>
        {tokens.map((token, tIdx) => {
          if (token.startsWith('**') && token.endsWith('**')) {
            return <strong key={tIdx} style={{ color: '#ffffff' }}>{token.slice(2, -2)}</strong>;
          }
          if (token.startsWith('`') && token.endsWith('`')) {
            return (
              <code
                key={tIdx}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '3px',
                  fontFamily: 'var(--font-code)',
                  color: 'var(--accent-cyan)',
                  fontSize: '0.82rem'
                }}
              >
                {token.slice(1, -1)}
              </code>
            );
          }
          if (token.startsWith('_') && token.endsWith('_')) {
            return <em key={tIdx} style={{ color: 'var(--text-secondary)' }}>{token.slice(1, -1)}</em>;
          }
          return token;
        })}
        {lIdx < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export function ChatMessageList({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="ai-tutor-body">
      {messages.map((msg) => {
        const isUser = msg.sender === 'user';
        const isError = msg.type === 'error-diagnosis';
        const isOptimization = msg.type === 'optimization-tip';

        return (
          <div
            key={msg.id}
            className={`ai-tutor-message ${isUser ? 'user' : 'tutor'}`}
          >
            {/* Avatar */}
            <div
              style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: isUser ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))',
                color: '#ffffff'
              }}
            >
              {isUser ? (
                <User size={14} />
              ) : isError ? (
                <AlertCircle size={14} color="var(--accent-rose)" />
              ) : isOptimization ? (
                <Sparkles size={14} color="var(--accent-emerald)" />
              ) : (
                <Bot size={14} />
              )}
            </div>

            {/* Burbuja */}
            <div
              className={`ai-tutor-bubble ${isUser ? 'user' : isError ? 'error-diagnosis' : isOptimization ? 'optimization-tip' : 'tutor'}`}
            >
              <FormattedMessageText text={msg.text} />
              <div
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  textAlign: isUser ? 'right' : 'left',
                  marginTop: '0.35rem',
                  opacity: 0.7
                }}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        );
      })}

      {/* Indicador de "Escribiendo / Pensando" */}
      {isLoading && (
        <div className="ai-tutor-message tutor">
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-cyan))',
              color: '#ffffff'
            }}
          >
            <Bot size={14} />
          </div>
          <div className="ai-tutor-typing">
            <span className="ai-tutor-dot" />
            <span className="ai-tutor-dot" />
            <span className="ai-tutor-dot" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.3rem' }}>
              NexoAI analizando lógica...
            </span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
