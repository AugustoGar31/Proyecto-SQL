/**
 * @file progressBackupService.js
 * @description Servicio serverless de exportación e importación protegida del progreso (.nexosql).
 * Implementa sellado criptográfico SHA-256 con salt interno y codificación Base64 para impedir
 * la manipulación manual (anti-tampering) del archivo de respaldo.
 */

import { storageService } from './storageService.js';

const BACKUP_HEADER = 'NXSQL1.';
const INTERNAL_INTEGRITY_SALT = 'NexoSQL::QueryMasterAcademy::IntegritySeal::v3::9f8a7b6c5d4e3f2a1b';

/**
 * Fallback determinista de hash de 256 bits (basado en 8 rondas FNV-1a de 32 bits)
 * para entornos donde crypto.subtle no esté disponible (ej. contextos no seguros o tests).
 * @param {string} input
 * @returns {string}
 */
function computeDeterministicFallbackHash(input) {
  const seeds = [
    0x811c9dc5, 0x01000193, 0x9e3779b9, 0x85ebca6b,
    0xc2b2ae35, 0x27d4eb2f, 0x165667b1, 0xd3a2646c
  ];
  return seeds
    .map((seed, idx) => {
      let h = seed ^ (idx * 0x45d9f3b);
      for (let i = 0; i < input.length; i++) {
        h ^= input.charCodeAt(i);
        h = Math.imul(h, 0x01000193);
      }
      return (h >>> 0).toString(16).padStart(8, '0');
    })
    .join('');
}

/**
 * Normaliza y sanitiza la estructura de progreso para garantizar un JSON canónico determinista.
 * @param {Object} rawProgress
 * @returns {Object}
 */
export function canonicalizeProgress(rawProgress = {}) {
  const completedLessons = Array.isArray(rawProgress.completedLessons)
    ? [...new Set(rawProgress.completedLessons.filter((id) => typeof id === 'string'))].sort()
    : [];

  const completedExercises = Array.isArray(rawProgress.completedExercises)
    ? [...new Set(rawProgress.completedExercises.filter((id) => typeof id === 'string'))].sort()
    : [];

  const unlockedModules = Array.isArray(rawProgress.unlockedModules)
    ? [...new Set(['mod-0-intro', 'mod-1-dql', ...rawProgress.unlockedModules.filter((id) => typeof id === 'string')])].sort()
    : ['mod-0-intro', 'mod-1-dql'];

  const rawScores = rawProgress.scores && typeof rawProgress.scores === 'object' ? rawProgress.scores : {};
  const sortedScoreKeys = Object.keys(rawScores).sort();
  const scores = {};
  for (const key of sortedScoreKeys) {
    const val = Number(rawScores[key]);
    if (Number.isFinite(val) && val >= 0) {
      scores[key] = val;
    }
  }

  const lastActiveLessonId =
    typeof rawProgress.lastActiveLessonId === 'string' && rawProgress.lastActiveLessonId.trim()
      ? rawProgress.lastActiveLessonId.trim()
      : 'les-m0-relational';

  return {
    completedLessons,
    completedExercises,
    unlockedModules,
    scores,
    lastActiveLessonId
  };
}

/**
 * Calcula la firma de integridad SHA-256 sobre el payload canónico + salt interno.
 * @param {Object} payload
 * @returns {Promise<string>}
 */
export async function computePayloadSignature(payload) {
  const canonicalString = `${JSON.stringify(payload)}||${INTERNAL_INTEGRITY_SALT}`;

  try {
    if (typeof globalThis !== 'undefined' && globalThis.crypto && globalThis.crypto.subtle) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(canonicalString);
      const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch {
    // Fallback si Web Crypto falla en contexto HTTP local
  }

  return computeDeterministicFallbackHash(canonicalString);
}

/**
 * Codifica una cadena UTF-8 a Base64 compatible con navegador y Node.
 * @param {string} str
 * @returns {string}
 */
function encodeBase64(str) {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }
  return Buffer.from(str, 'utf-8').toString('base64');
}

/**
 * Decodifica una cadena Base64 a UTF-8 compatible con navegador y Node.
 * @param {string} b64
 * @returns {string}
 */
function decodeBase64(b64) {
  if (typeof window !== 'undefined' && typeof window.atob === 'function') {
    const binary = window.atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  }
  return Buffer.from(b64, 'base64').toString('utf-8');
}

/**
 * Comparación de cadenas en tiempo constante para evitar ataques de timing.
 * @param {string} a
 * @param {string} b
 * @returns {boolean}
 */
function constantTimeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) {
    return false;
  }
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

/**
 * Genera el contenido firmado `.nexosql` a partir del progreso actual o provisto.
 * @param {Object} [customProgress]
 * @returns {Promise<string>} Token firmado listo para guardar en archivo.
 */
export async function createSignedBackupToken(customProgress) {
  const sourceProgress = customProgress || storageService.loadProgress();
  const normalizedProgress = canonicalizeProgress(sourceProgress);

  const payload = {
    app: 'NexoSQL',
    schemaVersion: 3,
    timestamp: Date.now(),
    exportedAt: new Date().toISOString(),
    progress: normalizedProgress
  };

  const signature = await computePayloadSignature(payload);
  const envelope = JSON.stringify({ payload, signature });

  return `${BACKUP_HEADER}${encodeBase64(envelope)}`;
}

/**
 * Verifica la firma criptográfica de un archivo `.nexosql` y devuelve el progreso validado.
 * Lanza un Error descriptivo si el archivo fue modificado manualmente o está corrupto.
 * @param {string} rawToken
 * @returns {Promise<{ progress: Object, exportedAt: string, timestamp: number }>}
 */
export async function verifyAndParseBackupToken(rawToken) {
  if (!rawToken || typeof rawToken !== 'string') {
    throw new Error('El archivo de respaldo está vacío o no es válido.');
  }

  const trimmed = rawToken.trim();
  if (!trimmed.startsWith(BACKUP_HEADER)) {
    throw new Error('Formato de archivo no reconocido. Selecciona un archivo .nexosql válido.');
  }

  const base64Body = trimmed.slice(BACKUP_HEADER.length);
  let parsedEnvelope;

  try {
    const jsonString = decodeBase64(base64Body);
    parsedEnvelope = JSON.parse(jsonString);
  } catch {
    throw new Error('El archivo de respaldo está dañado o fue alterado.');
  }

  const { payload, signature } = parsedEnvelope || {};
  if (!payload || typeof payload !== 'object' || typeof signature !== 'string') {
    throw new Error('Estructura de respaldo incompleta o corrupta.');
  }

  if (payload.app !== 'NexoSQL' || !payload.progress) {
    throw new Error('El respaldo no pertenece a una versión compatible de NexoSQL.');
  }

  // Reconstruir el payload con orden canónico para verificar integridad
  const canonicalPayload = {
    app: payload.app,
    schemaVersion: payload.schemaVersion,
    timestamp: payload.timestamp,
    exportedAt: payload.exportedAt,
    progress: canonicalizeProgress(payload.progress)
  };

  const expectedSignature = await computePayloadSignature(canonicalPayload);
  const fallbackSignature = computeDeterministicFallbackHash(
    `${JSON.stringify(canonicalPayload)}||${INTERNAL_INTEGRITY_SALT}`
  );

  const isSignatureValid =
    constantTimeEqual(signature, expectedSignature) ||
    constantTimeEqual(signature, fallbackSignature);

  if (!isSignatureValid) {
    throw new Error('⚠️ Verificación de seguridad fallida: El archivo de progreso fue modificado manualmente.');
  }

  return {
    progress: canonicalPayload.progress,
    exportedAt: canonicalPayload.exportedAt,
    timestamp: canonicalPayload.timestamp
  };
}

/**
 * Dispara la descarga en el navegador del archivo `.nexosql` con el progreso firmado.
 * @param {Object} [currentProgress]
 * @returns {Promise<string>} Nombre del archivo descargado.
 */
export async function exportProgressFile(currentProgress) {
  const signedToken = await createSignedBackupToken(currentProgress);
  const datePart = new Date().toISOString().slice(0, 10);
  const fileName = `nexosql-backup-${datePart}.nexosql`;

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const blob = new Blob([signedToken], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }

  return fileName;
}

/**
 * Lee un objeto File (.nexosql), verifica su firma de integridad y devuelve el progreso validado.
 * @param {File} file
 * @returns {Promise<{ progress: Object, exportedAt: string, timestamp: number }>}
 */
export async function importProgressFromFile(file) {
  if (!file) {
    throw new Error('No se seleccionó ningún archivo.');
  }
  const rawContent = await file.text();
  return verifyAndParseBackupToken(rawContent);
}

