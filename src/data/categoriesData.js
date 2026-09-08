/**
 * @file categoriesData.js
 * @description Metadata estructural oficial para los Libretos de Aprendizaje y Categorías de NexoSQL.
 */

export const SQL_CATEGORIES = [
  {
    id: 'cat-m0-intro',
    code: 'M0',
    title: '🎓 Módulo 0: Fundamentos del Motor Relacional',
    shortTitle: 'Módulo Cero',
    icon: 'GraduationCap',
    color: 'var(--accent-cyan)',
    badgeColor: 'badge-cyan',
    description: 'Comprende las bases conceptuales de las bases de datos relacionales frente a hojas de cálculo/archivos planos, el funcionamiento interno del motor (Parser, Optimizador, Motor de Ejecución) y la historia y estándares de SQL.',
    tags: ['Arquitectura', 'Parser', 'Optimizador', 'ACID vs FlatFiles'],
    moduleIds: ['mod-0-intro']
  },
  {
    id: 'cat-dql',
    code: 'DQL',
    title: '🔍 DQL (Data Query Language)',
    shortTitle: 'DQL',
    icon: 'Search',
    color: 'var(--accent-indigo)',
    badgeColor: 'badge-indigo',
    description: 'Este bloque se enfoca en la lectura y ordenamiento de la información. Incluye: SELECT / WHERE, JOINS (INNER / LEFT / RIGHT), GROUP BY / HAVING, ORDER BY — Ordena los resultados de forma ascendente o descendente. LIMIT / OFFSET — Restringe el número de filas devueltas y define dónde empezar. DISTINCT — Elimina los registros duplicados de la consulta. UNION / UNION ALL — Combina el resultado de dos o más sentencias SELECT.',
    tags: ['SELECT', 'WHERE', 'JOINs', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'DISTINCT', 'UNION'],
    moduleIds: ['mod-1-dql', 'mod-2-aggregations', 'mod-3-joins', 'mod-4-subqueries', 'mod-5-window']
  },
  {
    id: 'cat-dml',
    code: 'DML',
    title: '🛠️ DML (Data Manipulation Language)',
    shortTitle: 'DML',
    icon: 'Wrench',
    color: 'var(--accent-emerald)',
    badgeColor: 'badge-emerald',
    description: 'Es el bloque encargado de alterar los datos existentes sin modificar la estructura. Incluye: INSERT, UPDATE / SET, DELETE FROM, TRUNCATE TABLE — Vacía por completo el contenido de una tabla de forma rápida (nota: a veces se debate si es DDL o DML, pero su fin es vaciar datos). MERGE — Realiza operaciones de inserción, actualización o borrado en una sola instrucción (Upsert).',
    tags: ['INSERT', 'UPDATE', 'DELETE', 'TRUNCATE', 'MERGE'],
    moduleIds: ['mod-6-dml']
  },
  {
    id: 'cat-ddl',
    code: 'DDL',
    title: '🏗️ DDL (Data Definition Language)',
    shortTitle: 'DDL',
    icon: 'Layers',
    color: 'var(--accent-amber)',
    badgeColor: 'badge-amber',
    description: 'Este cuadrado define la estructura física y lógica de la base de datos (tablas, índices, vistas). Incluye: CREATE — Crea nuevos objetos (tablas, vistas, bases de datos). ALTER — Modifica la estructura de un objeto existente (añadir columnas, cambiar tipos de datos). DROP — Elimina de forma permanente un objeto completo y sus datos. RENAME — Cambia el nombre de un objeto.',
    tags: ['CREATE TABLE', 'ALTER TABLE', 'DROP', 'RENAME', 'CREATE VIEW', 'CREATE INDEX'],
    moduleIds: ['mod-7-ddl', 'mod-8-indexes']
  },
  {
    id: 'cat-tcl',
    code: 'TCL',
    title: '🔒 TCL (Transaction Control Language)',
    shortTitle: 'TCL',
    icon: 'ShieldCheck',
    color: 'var(--accent-rose)',
    badgeColor: 'badge-rose',
    description: 'Es el bloque encargado de gestionar la seguridad y consistencia de los cambios de datos en lote. Incluye: COMMIT — Guarda de forma permanente los cambios realizados en la transacción. ROLLBACK — Deshace los cambios si ocurre un error, volviendo al estado anterior. SAVEPOINT — Establece un punto de control intermedio dentro de la transacción para volver a él si es necesario.',
    tags: ['COMMIT', 'ROLLBACK', 'SAVEPOINT', 'ACID', 'Transacciones'],
    moduleIds: ['mod-10-transactions']
  },
  {
    id: 'cat-procedural',
    code: 'PROCEDURAL',
    title: '⚙️ SQL Procedural',
    shortTitle: 'SQL Procedural',
    icon: 'Cpu',
    color: 'var(--accent-purple)',
    badgeColor: 'badge-purple',
    description: 'Añade capacidades de programación avanzada y automatización directamente en el motor de base de datos. Incluye: CREATE TRIGGER, CREATE PROCEDURE — Define un procedimiento almacenado para ejecutar bloques de código repetitivos. CREATE FUNCTION — Crea funciones personalizadas que devuelven un valor específico.',
    tags: ['CREATE TRIGGER', 'CREATE PROCEDURE', 'CREATE FUNCTION', 'Automatización'],
    moduleIds: ['mod-9-procedural']
  }
];
