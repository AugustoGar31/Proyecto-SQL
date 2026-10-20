/**
 * @file playbooksData.js
 * @description Estructura canónica y jerárquica de los 10 Libretos Temáticos de NexoSQL
 * con orden estricto de aprendizaje pedagógico y gamificación.
 */

export const THEMATIC_PLAYBOOKS = [
  {
    id: 'pb-dql-basic',
    order: 1,
    moduleId: 'mod-1-dql',
    code: 'DQL',
    title: '1. DQL Básico',
    subtitle: 'Consultas, Filtros WHERE y Búsqueda',
    icon: 'Search',
    color: 'var(--accent-cyan)',
    badgeClass: 'badge-cyan',
    description: 'Aprende a consultar tablas, seleccionar columnas específicas y aplicar filtros condicionales con WHERE y comodines LIKE.'
  },
  {
    id: 'pb-aggregations',
    order: 2,
    moduleId: 'mod-2-aggregations',
    code: 'DQL',
    title: '2. Agrupaciones & Métricas',
    subtitle: 'GROUP BY, HAVING y Funciones de Resumen',
    icon: 'PieChart',
    color: 'var(--accent-indigo)',
    badgeClass: 'badge-indigo',
    description: 'Consolida grandes volúmenes de datos en grupos lógicos y calcula promedios, sumas y conteos con HAVING.'
  },
  {
    id: 'pb-joins',
    order: 3,
    moduleId: 'mod-3-joins',
    code: 'DQL',
    title: '3. Cruce de Tablas (JOINs)',
    subtitle: 'INNER, LEFT, RIGHT y Relaciones M:N',
    icon: 'GitMerge',
    color: 'var(--accent-cyan)',
    badgeClass: 'badge-cyan',
    description: 'Conecta múltiples tablas utilizando claves foráneas y resuelve el modelo relacional sin duplicar información.'
  },
  {
    id: 'pb-subqueries',
    order: 4,
    moduleId: 'mod-4-subqueries',
    code: 'DQL',
    title: '4. Subconsultas & CTEs',
    subtitle: 'Consultas Anidadas y Cláusula WITH',
    icon: 'Code2',
    color: 'var(--accent-indigo)',
    badgeClass: 'badge-indigo',
    description: 'Divide consultas complejas en pasos modulares y legibles utilizando subconsultas escalares y tablas temporales CTE.'
  },
  {
    id: 'pb-window',
    order: 5,
    moduleId: 'mod-5-window',
    code: 'DQL',
    title: '5. Window Functions',
    subtitle: 'OVER, PARTITION BY y Rankings',
    icon: 'Sliders',
    color: 'var(--accent-purple)',
    badgeClass: 'badge-purple',
    description: 'Calcula rankings analíticos y acumulados fila a fila sin colapsar ni reducir el conjunto de resultados.'
  },
  {
    id: 'pb-dml',
    order: 6,
    moduleId: 'mod-6-dml',
    code: 'DML',
    title: '6. DML (Manipulación)',
    subtitle: 'INSERT, UPDATE y DELETE',
    icon: 'Wrench',
    color: 'var(--accent-emerald)',
    badgeClass: 'badge-emerald',
    description: 'Modifica, agrega y elimina datos en la base de datos aplicando siempre condiciones estrictas de seguridad.'
  },
  {
    id: 'pb-ddl',
    order: 7,
    moduleId: 'mod-7-ddl',
    code: 'DDL',
    title: '7. DDL (Estructura)',
    subtitle: 'CREATE TABLE, ALTER y Restricciones',
    icon: 'Layers',
    color: 'var(--accent-amber)',
    badgeClass: 'badge-amber',
    description: 'Diseña la arquitectura de las tablas, define claves primarias y aplica restricciones CHECK de integridad.'
  },
  {
    id: 'pb-indexes',
    order: 8,
    moduleId: 'mod-8-indexes',
    code: 'DDL',
    title: '8. Índices & Optimización',
    subtitle: 'CREATE INDEX y Aceleración B-Tree',
    icon: 'Zap',
    color: 'var(--accent-amber)',
    badgeClass: 'badge-amber',
    description: 'Crea estructuras de búsqueda ultra rápidas para acelerar consultas críticas en tablas con miles de registros.'
  },
  {
    id: 'pb-transactions',
    order: 9,
    moduleId: 'mod-10-transactions',
    code: 'TCL',
    title: '9. Transacciones / TCL',
    subtitle: 'BEGIN, COMMIT, ROLLBACK y ACID',
    icon: 'ShieldCheck',
    color: 'var(--accent-rose)',
    badgeClass: 'badge-rose',
    description: 'Garantiza la atomicidad de operaciones bancarias o comerciales asegurando que todo se guarde o se revierta en bloque.'
  },
  {
    id: 'pb-procedural',
    order: 10,
    moduleId: 'mod-9-procedural',
    code: 'PROCEDURAL',
    title: '10. SQL Procedural',
    subtitle: 'Disparadores (Triggers) y Lógica',
    icon: 'Cpu',
    color: 'var(--accent-purple)',
    badgeClass: 'badge-purple',
    description: 'Programa robots automáticos que vigilan las tablas y disparan auditorías de seguridad ante cambios no autorizados.'
  }
];

export const MODULE_ZERO_PLAYBOOK = {
  id: 'pb-intro',
  order: 0,
  moduleId: 'mod-0-intro',
  code: 'INTRO',
  title: '0. Fundamentos Relacionales',
  subtitle: 'SGBD, Arquitectura y Micro-Learning',
  icon: 'GraduationCap',
  color: 'var(--accent-cyan)',
  badgeClass: 'badge-cyan',
  description: 'Píldoras rápidas de conocimiento para entender el rol de un SGBD, la arquitectura cliente-servidor y la potencia de SQL.'
};
