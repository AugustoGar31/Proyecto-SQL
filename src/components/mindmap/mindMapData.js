/**
 * @file mindMapData.js
 * @description Datos estructurados para el Mapa Mental Interactivo y su navegación Drill-down.
 * Contiene las 5 ramas taxonómicas principales de SQL (DQL, DML, DDL, TCL, SQL Procedural).
 */

export const MINDMAP_CATEGORIES = [
  {
    id: 'dql',
    title: 'DQL (Data Query Language)',
    shortLabel: 'DQL',
    subtitle: 'Data Query Language',
    icon: 'Search',
    color: '#06b6d4',
    bgGlow: 'rgba(6, 182, 212, 0.15)',
    borderColor: '#06b6d4',
    description: 'Este bloque se enfoca en la lectura y ordenamiento de la información.',
    commands: [
      {
        name: 'SELECT / WHERE',
        description: 'Proyecta columnas específicas y filtra registros bajo condiciones booleanas.',
        lessonId: 'les-select-basics'
      },
      {
        name: 'JOINS (INNER / LEFT / RIGHT)',
        description: 'Combina registros de dos o más tablas relacionándolos mediante claves foráneas.',
        lessonId: 'les-joins-basics'
      },
      {
        name: 'GROUP BY / HAVING',
        description: 'Agrupa filas con valores comunes y aplica filtros sobre métricas agregadas (COUNT, SUM, AVG).',
        lessonId: 'les-group-by'
      },
      {
        name: 'ORDER BY',
        description: 'Ordena los resultados de forma ascendente o descendente.',
        lessonId: 'les-window-functions'
      },
      {
        name: 'LIMIT / OFFSET',
        description: 'Restringe el número de filas devueltas y define dónde empezar.',
        lessonId: 'les-select-basics'
      },
      {
        name: 'DISTINCT',
        description: 'Elimina los registros duplicados de la consulta.',
        lessonId: 'les-select-basics'
      },
      {
        name: 'UNION / UNION ALL',
        description: 'Combina el resultado de dos o más sentencias SELECT.',
        lessonId: 'les-cte-with'
      }
    ]
  },
  {
    id: 'dml',
    title: 'DML (Data Manipulation Language)',
    shortLabel: 'DML',
    subtitle: 'Data Manipulation Language',
    icon: 'Edit3',
    color: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    borderColor: '#10b981',
    description: 'Es el bloque encargado de alterar los datos existentes sin modificar la estructura.',
    commands: [
      {
        name: 'INSERT',
        description: 'Añade nuevos registros o filas a una tabla existente.',
        lessonId: 'les-dml-operations'
      },
      {
        name: 'UPDATE / SET',
        description: 'Modifica los valores de una o más columnas en filas existentes bajo un predicado.',
        lessonId: 'les-dml-operations'
      },
      {
        name: 'DELETE FROM',
        description: 'Elimina registros específicos de una tabla cumpliendo una condición WHERE.',
        lessonId: 'les-dml-operations'
      },
      {
        name: 'TRUNCATE TABLE',
        description: 'Vacía por completo el contenido de una tabla de forma rápida (nota: a veces se debate si es DDL o DML, pero su fin es vaciar datos).',
        lessonId: 'les-dml-operations'
      },
      {
        name: 'MERGE',
        description: 'Realiza operaciones de inserción, actualización o borrado en una sola instrucción (Upsert).',
        lessonId: 'les-dml-operations'
      }
    ]
  },
  {
    id: 'ddl',
    title: 'DDL (Data Definition Language)',
    shortLabel: 'DDL',
    subtitle: 'Data Definition Language',
    icon: 'Layers',
    color: '#f59e0b',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
    borderColor: '#f59e0b',
    description: 'Este cuadrado define la estructura física y lógica de la base de datos (tablas, índices, vistas).',
    commands: [
      {
        name: 'CREATE',
        description: 'Crea nuevos objetos (tablas, vistas, bases de datos).',
        lessonId: 'les-ddl-create-table'
      },
      {
        name: 'ALTER',
        description: 'Modifica la estructura de un objeto existente (añadir columnas, cambiar tipos de datos).',
        lessonId: 'les-ddl-create-table'
      },
      {
        name: 'DROP',
        description: 'Elimina de forma permanente un objeto completo y sus datos.',
        lessonId: 'les-ddl-create-table'
      },
      {
        name: 'RENAME',
        description: 'Cambia el nombre de un objeto.',
        lessonId: 'les-ddl-create-table'
      }
    ]
  },
  {
    id: 'tcl',
    title: 'TCL (Transaction Control Language)',
    shortLabel: 'TCL',
    subtitle: 'Transaction Control Language',
    icon: 'ShieldCheck',
    color: '#f43f5e',
    bgGlow: 'rgba(244, 63, 94, 0.15)',
    borderColor: '#f43f5e',
    description: 'Es el bloque encargado de gestionar la seguridad y consistencia de los cambios de datos en lote.',
    commands: [
      {
        name: 'COMMIT',
        description: 'Guarda de forma permanente los cambios realizados en la transacción.',
        lessonId: 'les-acid'
      },
      {
        name: 'ROLLBACK',
        description: 'Deshace los cambios si ocurre un error, volviendo al estado anterior.',
        lessonId: 'les-acid'
      },
      {
        name: 'SAVEPOINT',
        description: 'Establece un punto de control intermedio dentro de la transacción para volver a él si es necesario.',
        lessonId: 'les-acid'
      }
    ]
  },
  {
    id: 'procedural',
    title: 'SQL Procedural',
    shortLabel: 'PROCEDURAL',
    subtitle: 'SQL Procedural & Automation',
    icon: 'Cpu',
    color: '#a855f7',
    bgGlow: 'rgba(168, 85, 247, 0.15)',
    borderColor: '#a855f7',
    description: 'Añade capacidades de programación avanzada y automatización directamente en el motor de base de datos.',
    commands: [
      {
        name: 'CREATE TRIGGER',
        description: 'Define un disparador automático que se ejecuta en respuesta a eventos DML.',
        lessonId: 'les-triggers'
      },
      {
        name: 'CREATE PROCEDURE',
        description: 'Define un procedimiento almacenado para ejecutar bloques de código repetitivos.',
        lessonId: 'les-triggers'
      },
      {
        name: 'CREATE FUNCTION',
        description: 'Crea funciones personalizadas que devuelven un valor específico.',
        lessonId: 'les-triggers'
      }
    ]
  }
];
