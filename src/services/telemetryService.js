/**
 * @file telemetryService.js
 * @description Módulo ligero de analítica sin backend (Microsoft Clarity / Google Analytics 4),
 * registro seguro de Service Worker PWA y canal de feedback contextual.
 */

export const DEFAULT_FEEDBACK_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_FEEDBACK_URL) ||
  'https://github.com/nexosql/querymaster-academy/issues/new';

/**
 * Inyecta dinámicamente los scripts de Microsoft Clarity y/o Google Analytics 4
 * únicamente si existen las variables de entorno correspondientes.
 */
export function initTelemetry() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const env = (typeof import.meta !== 'undefined' && import.meta.env) || {};
  const clarityId = env.VITE_CLARITY_ID ? String(env.VITE_CLARITY_ID).trim() : '';
  const gaId = env.VITE_GA_ID ? String(env.VITE_GA_ID).trim() : '';

  // 1. Microsoft Clarity (Mapas de calor y sesiones anónimas gratuitas)
  if (clarityId && !window.clarity) {
    try {
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = 'https://www.clarity.ms/tag/' + i;
        y = l.getElementsByTagName(r)[0];
        if (y && y.parentNode) {
          y.parentNode.insertBefore(t, y);
        } else {
          l.head.appendChild(t);
        }
      })(window, document, 'clarity', 'script', clarityId);
    } catch {
      // Silenciar bloqueadores de anuncios para no afectar la app
    }
  }

  // 2. Google Analytics 4 (Opcional)
  if (gaId && !window.gtag) {
    try {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', gaId, { anonymize_ip: true });
    } catch {
      // Silenciar bloqueadores de anuncios
    }
  }
}

/**
 * Registra el Service Worker de la PWA (/sw.js) de forma no bloqueante en producción.
 */
export function registerPwaServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

  const isProd = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.PROD;
  if (!isProd) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Registro silencioso en caso de entorno restringido
    });
  });
}

/**
 * Construye el resumen técnico contextual, lo copia al portapapeles y abre el canal de feedback.
 * @param {Object} context
 * @param {string} [context.exerciseId]
 * @param {string} [context.exerciseTitle]
 * @param {string} [context.schemaId]
 * @param {string} [context.sqlQuery]
 * @param {string} [context.evaluationMessage]
 * @param {string} [context.source]
 * @returns {Promise<{ copied: boolean, reportText: string, targetUrl: string }>}
 */
export async function reportContextualFeedback({
  exerciseId = 'general',
  exerciseTitle = 'Consulta General / Sugerencia',
  schemaId = 'universidad',
  sqlQuery = '',
  evaluationMessage = '',
  source = 'Navbar'
} = {}) {
  const reportTitle = `[Feedback NexoSQL] ${exerciseId !== 'general' ? `Kata ${exerciseId}: ${exerciseTitle}` : exerciseTitle}`;

  const reportLines = [
    `### 🛠️ Reporte Técnico / Sugerencia - NexoSQL`,
    `- **Origen:** ${source}`,
    `- **Ejercicio / Kata ID:** \`${exerciseId}\` (${exerciseTitle})`,
    `- **Esquema Activo:** \`${schemaId}\``,
    evaluationMessage ? `- **Estado / Mensaje del Validador:** ${evaluationMessage}` : null,
    sqlQuery
      ? `\n#### 💻 Consulta SQL Escrita:\n\`\`\`sql\n${sqlQuery.trim()}\n\`\`\``
      : null,
    `\n#### 📝 Descripción del problema o sugerencia:\n(Escribe aquí tu comentario...)`
  ].filter(Boolean);

  const reportText = reportLines.join('\n');
  let copied = false;

  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(reportText);
      copied = true;
    } catch {
      copied = false;
    }
  }

  let targetUrl = DEFAULT_FEEDBACK_URL;
  try {
    const urlObj = new URL(DEFAULT_FEEDBACK_URL);
    urlObj.searchParams.set('title', reportTitle);
    urlObj.searchParams.set('body', reportText);
    targetUrl = urlObj.toString();
  } catch {
    targetUrl = DEFAULT_FEEDBACK_URL;
  }

  if (typeof window !== 'undefined' && typeof window.open === 'function') {
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  }

  return { copied, reportText, targetUrl };
}

