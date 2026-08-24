/**
 * @file mindMapData.js
 * @description Estructura jerárquica del Mapa Mental Interactivo del Lenguaje SQL.
 * Categoriza comandos en DQL, DML, DDL, TCL, DCL y SQL Procedural con enlaces directos a lecciones.
 */

export const MINDMAP_TREE = {
  id: 'sql-root',
  label: 'SQL (Structured Query Language)',
  category: 'ROOT',
  color: '#06b6d4',
  description: 'Lenguaje estándar para la gestión, consulta y diseño de bases de datos relacionales.',
  children: [
    {
      id: 'cat-dql',
      label: 'DQL (Data Query)',
      category: 'DQL',
      color: '#06b6d4',
      description: 'Recuperación y proyección de datos almacenados.',
      children: [
        { id: 'node-select', label: 'SELECT / WHERE', category: 'DQL', color: '#06b6d4', lessonId: 'les-select-basics', description: 'Filtra y proyecta columnas específicas.' },
        { id: 'node-groupby', label: 'GROUP BY / HAVING', category: 'DQL', color: '#06b6d4', lessonId: 'les-group-by', description: 'Agrupa y calcula métricas vectoriales (AVG, COUNT).' },
        { id: 'node-join', label: 'JOINs (INNER / LEFT)', category: 'DQL', color: '#06b6d4', lessonId: 'les-joins-basics', description: 'Vincula entidades mediantes Foreign Keys.' },
        { id: 'node-cte', label: 'WITH (CTEs)', category: 'DQL', color: '#06b6d4', lessonId: 'les-cte-with', description: 'Subconsultas modulares reutilizables.' },
        { id: 'node-window', label: 'OVER() / PARTITION', category: 'DQL', color: '#06b6d4', lessonId: 'les-window-functions', description: 'Funciones de ventana y rankings analíticos.' }
      ]
    },
    {
      id: 'cat-dml',
      label: 'DML (Data Manipulation)',
      category: 'DML',
      color: '#10b981',
      description: 'Inserción, actualización y eliminación de registros.',
      children: [
        { id: 'node-insert', label: 'INSERT INTO', category: 'DML', color: '#10b981', lessonId: 'les-dml-operations', description: 'Inserta nuevas tuplas en la tabla.' },
        { id: 'node-update', label: 'UPDATE ... SET', category: 'DML', color: '#10b981', lessonId: 'les-dml-operations', description: 'Modifica datos existentes bajo predicado.' },
        { id: 'node-delete', label: 'DELETE FROM', category: 'DML', color: '#10b981', lessonId: 'les-dml-operations', description: 'Elimina tuplas seleccionadas.' }
      ]
    },
    {
      id: 'cat-ddl',
      label: 'DDL (Data Definition)',
      category: 'DDL',
      color: '#f59e0b',
      description: 'Definición de esquemas, tablas y estructuras.',
      children: [
        { id: 'node-create', label: 'CREATE TABLE', category: 'DDL', color: '#f59e0b', lessonId: 'les-ddl-create-table', description: 'Define nuevas entidades y constraints.' },
        { id: 'node-alter', label: 'ALTER TABLE', category: 'DDL', color: '#f59e0b', lessonId: 'les-ddl-create-table', description: 'Modifica estructuras existentes.' },
        { id: 'node-index', label: 'CREATE INDEX', category: 'DDL', color: '#f59e0b', lessonId: 'les-b-tree-indexes', description: 'Crea árboles B-Tree para optimización.' }
      ]
    },
    {
      id: 'cat-tcl',
      label: 'TCL (Transaction Control)',
      category: 'TCL',
      color: '#f43f5e',
      description: 'Garantía de propiedades ACID y control de concurrencia.',
      children: [
        { id: 'node-begin', label: 'BEGIN TRANSACTION', category: 'TCL', color: '#f43f5e', lessonId: 'les-acid', description: 'Inicia un bloque de operaciones atómicas.' },
        { id: 'node-commit', label: 'COMMIT', category: 'TCL', color: '#f43f5e', lessonId: 'les-acid', description: 'Consolida y persiste los cambios.' },
        { id: 'node-rollback', label: 'ROLLBACK', category: 'TCL', color: '#f43f5e', lessonId: 'les-acid', description: 'Deshace cambios en caso de error.' }
      ]
    },
    {
      id: 'cat-procedural',
      label: 'SQL Procedural',
      category: 'PROCEDURAL',
      color: '#a855f7',
      description: 'Automatización y reglas de negocio almacenadas.',
      children: [
        { id: 'node-trigger', label: 'CREATE TRIGGER', category: 'PROCEDURAL', color: '#a855f7', lessonId: 'les-triggers', description: 'Ejecuta acciones automáticas ante eventos DML.' }
      ]
    }
  ]
};
