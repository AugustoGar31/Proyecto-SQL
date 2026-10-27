/**
 * @file AITutorWidget.jsx
 * @description Widget flotante principal del NexoSQL AI Tutor.
 * Incluye el botón flotante (FAB) y la ventana de chat interactiva con diseño Glassmorphism.
 */

import React, { useState } from 'react';
import { Bot, Sparkles, X, Minus, RotateCcw, Send } from 'lucide-react';
import { useAITutor } from '../hooks/useAITutor.js';
import { ChatMessageList } from './ChatMessageList.jsx';
import { askGeminiTutor } from '../services/geminiClient.js';
import '../styles/ai-tutor.css';

const QUICK_CHIPS = [
  '💡 ¿Cómo planteo la consulta?',
  '⚡ Sugerir optimización',
  '🔍 ¿Cómo funciona un INNER JOIN?',
  '❓ ¿Por qué usar GROUP BY?'
];

export function AITutorWidget() {
  const {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    setIsLoading,
    unreadCount,
    addMessage,
    clearChat
  } = useAITutor();

  const [inputText, setInputText] = useState('');

  const handleSend = async (textToSend) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    // Agregar mensaje del estudiante
    addMessage('user', text);
    setInputText('');
    setIsLoading(true);

    try {
      const reply = await askGeminiTutor({ question: text });
      addMessage('tutor', reply, 'tutor');
    } catch (err) {
      addMessage('tutor', '🤖 No pude conectar con el modelo. ¿Deseas formular tu pregunta nuevamente?', 'error-diagnosis');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Botón Flotante (FAB) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="ai-tutor-fab"
        title="Abrir NexoSQL AI Tutor"
        aria-label="Tutor Socrático Inteligente"
      >
        <div className="ai-tutor-fab-icon">
          <Bot size={17} />
        </div>
        <span>Tutor IA</span>
        {unreadCount > 0 && !isOpen && (
          <span className="ai-tutor-fab-badge">{unreadCount}</span>
        )}
      </button>

      {/* Ventana de Diálogo Flotante */}
      {isOpen && (
        <aside className="ai-tutor-window" role="dialog" aria-label="NexoSQL AI Tutor">
          {/* Cabecera */}
          <header className="ai-tutor-header">
            <div className="ai-tutor-header-title">
              <div className="ai-tutor-avatar">
                <Bot size={18} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#ffffff' }}>NexoAI</span>
                  <span className="ai-tutor-badge-socratic">
                    <Sparkles size={11} color="var(--accent-cyan)" />
                    Socrático
                  </span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Orientación lógica sin soluciones directas
                </span>
              </div>
            </div>

            <div className="ai-tutor-actions">
              <button
                type="button"
                onClick={clearChat}
                className="ai-tutor-action-btn"
                title="Reiniciar conversación"
              >
                <RotateCcw size={15} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="ai-tutor-action-btn"
                title="Minimizar tutor"
              >
                <Minus size={16} />
              </button>
            </div>
          </header>

          {/* Historial de Mensajes */}
          <ChatMessageList messages={messages} isLoading={isLoading} />

          {/* Chips de Pregunta Rápida */}
          <div className="ai-tutor-chips">
            {QUICK_CHIPS.map((chip, index) => (
              <button
                key={index}
                type="button"
                className="ai-tutor-chip"
                onClick={() => handleSend(chip)}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Área de Entrada de Preguntas */}
          <footer className="ai-tutor-footer">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Pregúntale a NexoAI sobre conceptos SQL..."
              className="ai-tutor-input"
              rows={1}
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={!inputText.trim() || isLoading}
              className="ai-tutor-send-btn"
              title="Enviar pregunta"
            >
              <Send size={15} />
            </button>
          </footer>
        </aside>
      )}
    </>
  );
}

export default AITutorWidget;
