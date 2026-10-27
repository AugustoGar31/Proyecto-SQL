/**
 * @file useAITutor.js
 * @description Hook de estado y sistema de eventos desacoplado para el NexoSQL AI Tutor.
 * Permite que cualquier componente del proyecto interactúe con el tutor sin prop-drilling
 * ni dependencias rígidas.
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { explainSqlErrorWithGemini, optimizeSqlWithGemini } from '../services/geminiClient.js';

// Canal global de eventos CustomEvent para comunicación 100% desacoplada
const AI_TUTOR_EVENT = 'nexosql:ai-tutor:event';

/**
 * Disparador público para abrir el tutor con una solicitud externa (ej. optimizar o reportar error)
 */
export function emitAITutorAction(actionType, payload = {}) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(AI_TUTOR_EVENT, {
        detail: { actionType, payload, timestamp: Date.now() }
      })
    );
  }
}

const INITIAL_MESSAGES = [
  {
    id: 'welcome-1',
    sender: 'tutor',
    type: 'chat',
    text: '¡Hola! Soy tu **Tutor Socrático de NexoSQL** 🤖. Mi misión es guiar tu razonamiento para que descubras la lógica detrás de tus consultas sin entregarte el código resuelto. ¿Qué concepto o desafío estás analizando?',
    timestamp: Date.now()
  }
];

export function useAITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const saved = sessionStorage.getItem('nexosql_ai_tutor_chat');
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const isOpenRef = useRef(isOpen);
  isOpenRef.current = isOpen;

  // Persistir en sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('nexosql_ai_tutor_chat', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Si se abre la ventana, se resetean los mensajes no leídos
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // Agregar mensaje
  const addMessage = useCallback((sender, text, type = 'chat') => {
    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      sender,
      text,
      type,
      timestamp: Date.now()
    };
    setMessages((prev) => [...prev, newMsg]);

    if (!isOpenRef.current && sender === 'tutor') {
      setUnreadCount((c) => c + 1);
    }
    return newMsg;
  }, []);

  // Limpiar historial
  const clearChat = useCallback(() => {
    setMessages(INITIAL_MESSAGES);
    setUnreadCount(0);
    try {
      sessionStorage.removeItem('nexosql_ai_tutor_chat');
    } catch {
      // ignore
    }
  }, []);

  // Escuchar eventos externos (ej. botón "Optimizar Consulta" o errores de SQLite)
  useEffect(() => {
    const handleCustomEvent = (e) => {
      const { actionType, payload } = e.detail || {};
      if (!actionType) return;

      // Abrir la ventana si llega una acción externa
      setIsOpen(true);

      if (actionType === 'OPTIMIZE_QUERY') {
        const queryText = payload.query || '';
        const schemaId = payload.schemaId || 'universidad';

        // 1. Abre el widget automáticamente si estaba cerrado
        setIsOpen(true);

        // 2. Registra la consulta del alumno en la conversación
        addMessage(
          'user',
          `¿Cómo puedo optimizar y pulir esta consulta SQL?\n\n\`\`\`sql\n${queryText.trim() || 'SELECT ...'}\n\`\`\``,
          'optimization'
        );

        // 3. Consulta a Gemini con el System Prompt de Optimización Socrática
        setIsLoading(true);
        optimizeSqlWithGemini({ query: queryText, schemaId })
          .then((advice) => {
            addMessage('tutor', advice, 'optimization-tip');
          })
          .catch(() => {
            addMessage(
              'tutor',
              '⚡ **Enfoque de Rendimiento:**\n\n' +
              '1. **Proyección acotada:** Revisa qué columnas específicas necesitas en el `SELECT`; evita `SELECT *` para reducir el tráfico de datos y uso de memoria.\n' +
              '2. **Aprovechamiento de índices:** Si filtras en `WHERE` por columnas que no son claves primarias o foráneas, el motor realizará un escaneo completo de tabla (Table Scan).',
              'optimization-tip'
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      }

      if (actionType === 'SQL_ERROR') {
        const { error, query, schemaId } = payload;
        setIsLoading(true);
        explainSqlErrorWithGemini({ error, query, schemaId: schemaId || 'universidad' })
          .then((explanation) => {
            addMessage('tutor', explanation, 'error-diagnosis');
          })
          .catch(() => {
            addMessage(
              'tutor',
              `⚠️ **Orientación sobre el error detectado:**\n\n\`${error}\`\n\n` +
              '💡 **Pregunta guía:** ¿Verificaste que los nombres de las columnas o tablas coincidan con el esquema activo?',
              'error-diagnosis'
            );
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    };

    window.addEventListener(AI_TUTOR_EVENT, handleCustomEvent);
    return () => window.removeEventListener(AI_TUTOR_EVENT, handleCustomEvent);
  }, [addMessage]);

  return {
    isOpen,
    setIsOpen,
    messages,
    isLoading,
    setIsLoading,
    unreadCount,
    addMessage,
    clearChat
  };
}
