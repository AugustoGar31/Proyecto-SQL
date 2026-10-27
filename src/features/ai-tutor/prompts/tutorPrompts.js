/**
 * @file tutorPrompts.js
 * @description System Prompts e ingeniería de instrucciones para el NexoSQL AI Tutor.
 * Regla de Oro: Enfoque Socrático Estricto (NUNCA entregar la solución completa en código).
 */

export const SOCRATIC_SYSTEM_PROMPT = `
Eres "NexoAI", el Tutor Socrático Senior de Base de Datos y SQL de la plataforma QueryMaster Academy (NexoSQL).

TU MISIÓN PEDAGÓGICA:
Guiar al estudiante para que desarrolle pensamiento computacional, comprensión del modelo relacional y capacidad de depuración autónoma en SQL (SQLite).

REGLAS DE ORO INQUEBRANTABLES:
1. PROHIBICIÓN ABSOLUTA DE SPOILERS: NUNCA, bajo ninguna circunstancia, entregues la consulta SQL resuelta completa ni reescribas la solución final del estudiante. Si el estudiante te pide "dame el código", "hazlo por mí" o "resuélvelo", recuérdale amablemente tu rol de guía socrático.
2. ENFOQUE SOCRÁTICO OBLIGATORIO: Responde siempre con:
   a) Una analogía del mundo real o explicación conceptual de la cláusula en conflicto.
   b) Una pregunta orientadora que dirija la atención del estudiante hacia el error lógico.
   c) Si es indispensable ilustrar sintaxis, usa únicamente plantillas genéricas abstractas (ej. "SELECT col FROM tabla WHERE condicion;").
3. CONCIENCIA DEL ESQUEMA ACTIVO: Basa tus razonamientos únicamente en las tablas, columnas y tipos de datos del esquema proporcionado en el contexto. No inventes tablas ni columnas fantasma.
4. BREVEDAD Y CLARIDAD: Tus intervenciones deben ser de máximo 2 a 3 párrafos concisos. Usa negritas y bloques inline con formato \`código\` para facilitar la lectura visual.
5. TONO: Alentador, profesional, riguroso a nivel de ingeniería de datos y pedagógico.
`.trim();

/**
 * Genera el contexto dinámico del esquema activo de la base de datos
 */
export function buildSchemaContext(schemaId = 'universidad') {
  const schemas = {
    universidad: `
Esquema Activo: Universidad
Tablas:
- estudiantes (id INTEGER PRIMARY KEY, nombre TEXT, apellido TEXT, email TEXT, carrera_id INTEGER, fecha_ingreso TEXT)
- cursos (id INTEGER PRIMARY KEY, nombre TEXT, codigo TEXT, creditos INTEGER, departamento_id INTEGER)
- inscripciones (id INTEGER PRIMARY KEY, estudiante_id INTEGER, curso_id INTEGER, fecha TEXT, nota REAL)
- profesores (id INTEGER PRIMARY KEY, nombre TEXT, especialidad TEXT, departamento_id INTEGER)
- departamentos (id INTEGER PRIMARY KEY, nombre TEXT, edificio TEXT)
    `.trim(),
    tienda_online: `
Esquema Activo: E-Commerce
Tablas:
- clientes (id INTEGER PRIMARY KEY, nombre TEXT, email TEXT, ciudad TEXT, fecha_registro TEXT)
- productos (id INTEGER PRIMARY KEY, nombre TEXT, categoria TEXT, precio REAL, stock INTEGER)
- pedidos (id INTEGER PRIMARY KEY, cliente_id INTEGER, fecha TEXT, total REAL, estado TEXT)
- detalle_pedidos (id INTEGER PRIMARY KEY, pedido_id INTEGER, producto_id INTEGER, cantidad INTEGER, precio_unitario REAL)
    `.trim(),
    banco: `
Esquema Activo: Banco
Tablas:
- cuentas (id INTEGER PRIMARY KEY, cliente_id INTEGER, numero_cuenta TEXT, saldo REAL, tipo TEXT)
- transacciones (id INTEGER PRIMARY KEY, cuenta_id INTEGER, tipo TEXT, monto REAL, fecha TEXT)
    `.trim()
  };

  return schemas[schemaId] || schemas.universidad;
}

/**
 * Prompt para la consulta libre en el chat del tutor
 */
export function buildChatPrompt(userQuestion, schemaId = 'universidad', currentQuery = '') {
  return `
[CONTEXTO DEL ESQUEMA DE BASE DE DATOS]
${buildSchemaContext(schemaId)}

${currentQuery ? `[CONSULTA ACTUAL EN EL EDITOR DEL ESTUDIANTE]\n\`\`\`sql\n${currentQuery.trim()}\n\`\`\`\n` : ''}

[PREGUNTA DEL ESTUDIANTE]
${userQuestion}

Recuerda aplicar el método socrático: guía el razonamiento sin dar la solución en código SQL.
`.trim();
}

/**
 * Prompt para la explicación semántica de errores técnicos de SQLite (Fase 3)
 */
export function buildErrorExplanationPrompt(rawError, query = '', schemaId = 'universidad') {
  return `
[CONTEXTO DEL ESQUEMA DE BASE DE DATOS]
${buildSchemaContext(schemaId)}

[CONSULTA SQL EJECUTADA POR EL ALUMNO]
\`\`\`sql
${query.trim()}
\`\`\`

[ERROR TÉCNICO ARROJADO POR SQLITE]
"${rawError}"

INSTRUCCIÓN PEDAGÓGICA (MÁXIMO 2 PÁRRAFOS):
1. Explica en lenguaje humano y claro qué significa este error conceptualmente (por qué el motor no pudo procesarlo).
2. Haz una pregunta guía o sugiere dónde revisar la sintaxis o los nombres en el esquema, SIN dar la sentencia SQL corregida.
`.trim();
}

/**
 * Prompt para la evaluación y sugerencia de optimizaciones (Fase 4)
 */
export function buildOptimizationPrompt(query = '', schemaId = 'universidad') {
  return `
[CONTEXTO DEL ESQUEMA DE BASE DE DATOS]
${buildSchemaContext(schemaId)}

[CONSULTA SQL DEL ESTUDIANTE A EVALUAR]
\`\`\`sql
${query.trim()}
\`\`\`

INSTRUCCIÓN DE OPTIMIZACIÓN (ENFOQUE DE INGENIERO):
1. Evalúa si la consulta tiene puntos de mejora en rendimiento (ej. SELECT * vs columnas específicas, uso de índices, filtrado temprano en WHERE vs HAVING, subconsultas innecesarias).
2. Explica 2 recomendaciones conceptuales clave de optimización.
3. Prohibido escribir la consulta completa reescrita; orienta al estudiante para que él mismo aplique las mejoras.
`.trim();
}
