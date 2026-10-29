/**
 * @file credentialGeneratorService.js
 * @description Motor de cálculo de rangos de ingeniería SQL y generador de credenciales
 * descargables en alta resolución (1200x630px) mediante HTML5 Canvas API nativo.
 */

export const SQL_ENGINEERING_RANKS = [
  {
    id: 'sql-novice',
    min: 0,
    max: 20,
    title: 'SQL Novice',
    badge: '🌱',
    color: '#38bdf8',
    secondaryColor: '#0284c7',
    specialty: 'Fundamentos Relacionales y Consultas SELECT'
  },
  {
    id: 'query-crafter',
    min: 21,
    max: 50,
    title: 'Query Crafter',
    badge: '⚡',
    color: '#06b6d4',
    secondaryColor: '#0891b2',
    specialty: 'Filtrado Avanzado, Funciones Escalares y Agrupación DQL'
  },
  {
    id: 'join-master',
    min: 51,
    max: 80,
    title: 'Join Master',
    badge: '🏅',
    color: '#818cf8',
    secondaryColor: '#6366f1',
    specialty: 'Arquitectura Multi-Tabla, JOINs Complejos y Subconsultas'
  },
  {
    id: 'database-guru',
    min: 81,
    max: 100,
    title: 'Database Guru',
    badge: '👑',
    color: '#10b981',
    secondaryColor: '#f59e0b',
    specialty: 'Optimización de Índices B-Tree, Planes de Ejecución y ACID'
  }
];

/**
 * Calcula dinámicamente el rango del estudiante según su porcentaje de avance.
 * @param {number} progressPercentage
 * @returns {Object} Objeto con metadatos del rango actual.
 */
export function getStudentRank(progressPercentage = 0) {
  const pct = Math.max(0, Math.min(100, Math.round(Number(progressPercentage) || 0)));
  return (
    SQL_ENGINEERING_RANKS.find((r) => pct >= r.min && pct <= r.max) ||
    SQL_ENGINEERING_RANKS[0]
  );
}

/**
 * Dibuja un rectángulo con bordes redondeados compatible con todos los navegadores.
 */
function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Carga una imagen de forma segura devolviendo null si falla para no bloquear el Canvas.
 * @param {string} src
 * @returns {Promise<HTMLImageElement|null>}
 */
function loadImageSafe(src) {
  return new Promise((resolve) => {
    if (typeof Image === 'undefined') {
      resolve(null);
      return;
    }
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

/**
 * Genera un código corto de verificación determinista basado en las métricas del alumno.
 */
function generateVerificationCode(pct, katas, lessons, xp) {
  const seed = `${pct}-${katas}-${lessons}-${xp}-NEXOSQL`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return `NX-${(hash >>> 0).toString(16).toUpperCase().padStart(8, '0')}`;
}

/**
 * Renderiza y descarga la tarjeta de credencial (1200x630px) en formato PNG.
 * @param {Object} stats
 * @param {number} stats.progressPercentage
 * @param {number} stats.completedKatasCount
 * @param {number} stats.totalKatas
 * @param {number} stats.completedCount
 * @param {number} stats.totalLessons
 * @param {number} stats.xpPoints
 * @returns {Promise<string>} Nombre del archivo descargado.
 */
export async function downloadCredentialCard({
  progressPercentage = 0,
  completedKatasCount = 0,
  totalKatas = 0,
  completedCount = 0,
  totalLessons = 0,
  xpPoints = 0
} = {}) {
  if (typeof document === 'undefined') return '';

  const pct = Math.max(0, Math.min(100, Math.round(Number(progressPercentage) || 0)));
  const rank = getStudentRank(pct);

  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');

  // 1. Fondo profundo con gradiente espacial
  const bgGradient = ctx.createLinearGradient(0, 0, 1200, 630);
  bgGradient.addColorStop(0, '#060913');
  bgGradient.addColorStop(0.5, '#0b1120');
  bgGradient.addColorStop(1, '#09192c');
  ctx.fillStyle = bgGradient;
  ctx.fillRect(0, 0, 1200, 630);

  // 2. Cuadrícula técnica sutil estilo Blueprint SQL
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x <= 1200; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 630);
    ctx.stroke();
  }
  for (let y = 0; y <= 630; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // 3. Focos de luz ambiental (Glows radiales)
  const glowLeft = ctx.createRadialGradient(240, 260, 20, 240, 260, 340);
  glowLeft.addColorStop(0, `${rank.color}33`);
  glowLeft.addColorStop(1, 'rgba(6, 182, 212, 0)');
  ctx.fillStyle = glowLeft;
  ctx.fillRect(0, 0, 1200, 630);

  const glowRight = ctx.createRadialGradient(980, 160, 20, 980, 160, 320);
  glowRight.addColorStop(0, 'rgba(99, 102, 241, 0.20)');
  glowRight.addColorStop(1, 'rgba(99, 102, 241, 0)');
  ctx.fillStyle = glowRight;
  ctx.fillRect(0, 0, 1200, 630);

  // 4. Contenedor Principal Glassmorphism
  drawRoundedRect(ctx, 50, 45, 1100, 540, 28);
  ctx.fillStyle = 'rgba(15, 23, 42, 0.86)';
  ctx.fill();

  const borderGrad = ctx.createLinearGradient(50, 45, 1150, 585);
  borderGrad.addColorStop(0, rank.color);
  borderGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.55)');
  borderGrad.addColorStop(1, '#10b981');
  ctx.strokeStyle = borderGrad;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 5. Cabecera: Logo NexoSQL + Sello Oficial
  const logoImg = await loadImageSafe('/navbar-logo.png');
  if (logoImg) {
    ctx.drawImage(logoImg, 95, 80, 48, 48);
  } else {
    drawRoundedRect(ctx, 95, 80, 48, 48, 12);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.2)';
    ctx.fill();
  }

  ctx.textAlign = 'left';
  ctx.font = '800 30px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText('Nexo', 158, 110);
  const nexoWidth = ctx.measureText('Nexo').width;
  ctx.fillStyle = '#06b6d4';
  ctx.fillText('SQL', 158 + nexoWidth, 110);

  ctx.font = '500 13px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('QUERYMASTER ACADEMY · CREDENCIAL DE INGENIERÍA', 158, 130);

  // Badge superior derecho
  drawRoundedRect(ctx, 825, 82, 280, 38, 19);
  ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
  ctx.fill();
  ctx.strokeStyle = 'rgba(6, 182, 212, 0.4)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.textAlign = 'center';
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#38bdf8';
  ctx.fillText('⚡ SQLITE WASM VERIFIED', 965, 106);

  // Línea divisoria superior
  ctx.beginPath();
  ctx.moveTo(95, 152);
  ctx.lineTo(1105, 152);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // 6. Anillo Circular de Progreso (Izquierda)
  const centerX = 215;
  const centerY = 285;
  const radius = 86;

  // Pista del anillo
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 14;
  ctx.stroke();

  // Arco de avance activo
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + (Math.PI * 2 * Math.max(pct, 3)) / 100;
  const ringGrad = ctx.createLinearGradient(centerX - radius, centerY - radius, centerX + radius, centerY + radius);
  ringGrad.addColorStop(0, rank.color);
  ringGrad.addColorStop(1, '#10b981');

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.strokeStyle = ringGrad;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.stroke();

  // Porcentaje dentro del anillo
  ctx.textAlign = 'center';
  ctx.font = '800 40px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${pct}%`, centerX, centerY + 8);

  ctx.font = '600 12px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('DOMINIO GLOBAL', centerX, centerY + 32);

  // 7. Bloque Central Derecha: Rango y Especialidad
  const infoX = 355;
  ctx.textAlign = 'left';
  ctx.font = '700 13px "JetBrains Mono", monospace';
  ctx.fillStyle = rank.color;
  ctx.fillText('RANGO DE INGENIERÍA ALCANZADO', infoX, 212);

  ctx.font = '800 52px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(`${rank.badge} ${rank.title}`, infoX, 272);

  ctx.font = '500 18px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(rank.specialty, infoX, 310);

  // Barra de progreso lineal
  drawRoundedRect(ctx, infoX, 335, 750, 14, 7);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.fill();

  const barWidth = Math.max(24, Math.round((750 * pct) / 100));
  drawRoundedRect(ctx, infoX, 335, barWidth, 14, 7);
  ctx.fillStyle = ringGrad;
  ctx.fill();

  // 8. Tres Tarjetas Bento de Estadísticas
  const cards = [
    {
      label: 'KATAS SQL RESUELTAS',
      value: `${completedKatasCount} / ${totalKatas || completedKatasCount}`,
      accent: '#06b6d4'
    },
    {
      label: 'LECCIONES DOMINADAS',
      value: `${completedCount} / ${totalLessons || completedCount}`,
      accent: '#818cf8'
    },
    {
      label: 'PUNTOS DE EXPERIENCIA',
      value: `${xpPoints} XP`,
      accent: '#f59e0b'
    }
  ];

  cards.forEach((card, idx) => {
    const cardX = 95 + idx * 345;
    const cardY = 400;
    const cardW = 320;
    const cardH = 98;

    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 16);
    ctx.fillStyle = 'rgba(30, 41, 59, 0.65)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.09)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Acento lateral
    drawRoundedRect(ctx, cardX + 16, cardY + 22, 4, 54, 2);
    ctx.fillStyle = card.accent;
    ctx.fill();

    ctx.textAlign = 'left';
    ctx.font = '600 12px "JetBrains Mono", monospace';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(card.label, cardX + 34, cardY + 40);

    ctx.font = '800 28px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(card.value, cardX + 34, cardY + 74);
  });

  // 9. Pie de Credencial: Fecha, Hash y URL
  const formattedDate = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const verificationCode = generateVerificationCode(pct, completedKatasCount, completedCount, xpPoints);

  ctx.textAlign = 'left';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillStyle = '#64748b';
  ctx.fillText(`EMISIÓN: ${formattedDate.toUpperCase()}   ·   ID: ${verificationCode}`, 95, 548);

  ctx.textAlign = 'right';
  ctx.font = '700 14px "JetBrains Mono", monospace';
  ctx.fillStyle = '#06b6d4';
  ctx.fillText('https://nexosql.vercel.app', 1105, 548);

  // 10. Exportar como PNG y disparar descarga
  const slugRank = rank.title.toLowerCase().replace(/\s+/g, '-');
  const fileName = `Credencial-NexoSQL-${slugRank}.png`;
  const dataUrl = canvas.toDataURL('image/png');

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return fileName;
}

