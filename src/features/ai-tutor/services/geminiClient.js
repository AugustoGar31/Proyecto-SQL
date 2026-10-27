/**
 * @file geminiClient.js
 * @description Servicio aislado para interactuar con la API oficial de Google Gemini (SDK @google/generative-ai).
 * Lee la API key desde process.env.GEMINI_API_KEY o import.meta.env.VITE_GEMINI_API_KEY.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  SOCRATIC_SYSTEM_PROMPT,
  buildChatPrompt,
  buildErrorExplanationPrompt,
  buildOptimizationPrompt
} from '../prompts/tutorPrompts.js';

// Lectura segura y universal de la clave de API
const getApiKey = () => {
  if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY || '';
  }
  return '';
};

let genAIInstance = null;

function getGeminiClient() {
  const key = getApiKey();
  if (!key) {
    console.warn('[NexoSQL AI Tutor] Advertencia: GEMINI_API_KEY no detectada.');
    return null;
  }
  if (!genAIInstance) {
    genAIInstance = new GoogleGenerativeAI(key);
  }
  return genAIInstance;
}

// Modelos modernos ordenados por disponibilidad y velocidad
const MODEL_CANDIDATES = [
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
  'gemini-3.5-flash-lite',
  'gemini-flash-latest'
];

/**
 * Ejecuta la generación probando modelos de forma resiliente si Google arroja 404 o 503
 */
async function generateWithModelFallback(ai, prompt, systemInstruction) {
  let lastErr = null;

  for (const modelName of MODEL_CANDIDATES) {
    try {
      const model = ai.getGenerativeModel({
        model: modelName,
        systemInstruction
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (err) {
      lastErr = err;
      const errorMsg = err.message || '';
      const isUnavailable = err.status === 404 || err.status === 503 || errorMsg.includes('404') || errorMsg.includes('503');
      
      if (isUnavailable) {
        console.warn(`[NexoSQL AI Tutor] Modelo '${modelName}' no disponible (${err.status || 'not found'}). Probando siguiente modelo...`);
        continue;
      }
      throw err;
    }
  }

  throw lastErr;
}

/**
 * Consulta socrática libre al modelo Gemini
 */
export async function askGeminiTutor({ question, currentQuery = '', schemaId = 'universidad' }) {
  const ai = getGeminiClient();

  if (!ai) {
    return (
      '⚠️ **Clave de API no detectada:**\n' +
      'Para recibir respuestas de Gemini en vivo, verifica que tu clave esté en el archivo `.env` (`GEMINI_API_KEY=tu_clave`).\n\n' +
      '💡 **Guía de orientación rápida:** Recuerda que en SQL el orden lógico de resolución es:\n' +
      '`FROM` ➔ `WHERE` ➔ `GROUP BY` ➔ `HAVING` ➔ `SELECT` ➔ `ORDER BY`.'
    );
  }

  try {
    const fullPrompt = buildChatPrompt(question, schemaId, currentQuery);
    return await generateWithModelFallback(ai, fullPrompt, SOCRATIC_SYSTEM_PROMPT);
  } catch (error) {
    console.error('[NexoSQL AI Tutor] Error al consultar Gemini API:', error);
    return (
      '🤖 Tuve un inconveniente al conectar con el motor de IA de Google.\n\n' +
      `_Detalle:_ ${error.message || 'Error de conexión'}.\n\n` +
      '¿Deseas intentar formular la pregunta nuevamente?'
    );
  }
}

/**
 * Explicación semántica socrática de un error de SQLite (Fase 3)
 */
export async function explainSqlErrorWithGemini({ error, query = '', schemaId = 'universidad' }) {
  const ai = getGeminiClient();

  if (!ai) {
    return (
      `⚠️ **Error técnico reportado por SQLite:**\n\`${error}\`\n\n` +
      '💡 **Pista lógica:** Verifica que todas las columnas y tablas invocadas existan en el esquema activo y que no falten comas o comillas de cierre.'
    );
  }

  try {
    const prompt = buildErrorExplanationPrompt(error, query, schemaId);
    return await generateWithModelFallback(ai, prompt, SOCRATIC_SYSTEM_PROMPT);
  } catch (err) {
    console.error('[NexoSQL AI Tutor] Error al explicar fallo de SQLite:', err);
    return `⚠️ **Error en SQLite:** \`${error}\`\n\nRevisa si la sintaxis corresponde a las columnas declaradas en la tabla activa.`;
  }
}

/**
 * Sugerencia socrática de optimización de consulta (Fase 4)
 */
export async function optimizeSqlWithGemini({ query = '', schemaId = 'universidad' }) {
  const ai = getGeminiClient();

  if (!ai) {
    return (
      '⚡ **Orientación de Rendimiento (Modo Local):**\n\n' +
      '1. **Proyección controlada:** Evita `SELECT *` en bases de datos de producción; especifica solo las columnas necesarias para ahorrar ancho de banda y memoria.\n' +
      '2. **Aprovechamiento de índices:** Si filtras en `WHERE` por columnas no indexadas, la base de datos realizará un costoso escaneo completo de tabla (Table Scan).'
    );
  }

  try {
    const prompt = buildOptimizationPrompt(query, schemaId);
    return await generateWithModelFallback(ai, prompt, SOCRATIC_SYSTEM_PROMPT);
  } catch (err) {
    console.error('[NexoSQL AI Tutor] Error al optimizar con Gemini:', err);
    return '⚡ Revisa si estás realizando un producto cartesiano involuntario o si puedes simplificar subconsultas a través de un `JOIN` adecuado.';
  }
}
