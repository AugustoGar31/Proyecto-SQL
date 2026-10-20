/**
 * @file katasData.js
 * @description Catálogo profesional de Katas y Desafíos SQL orientados a casos reales de negocio
 * (Fintech, SaaS, E-Commerce, Supply Chain y People Analytics).
 */

export const KATAS_CATALOG = [
  // =========================================================================
  // LIBRETO 1: DQL BÁSICO (mod-1-dql)
  // =========================================================================
  {
    id: 'kata-dql-01',
    moduleId: 'mod-1-dql',
    title: 'Auditoría de Incorporaciones: Detección y Ordenamiento de Nuevos Ingresos',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Secretaría Académica & Admisiones',
      scenario: 'Se requiere auditar la nómina de estudiantes matriculados durante el ciclo lectivo 2023 para validar canales de contacto y remitir los kits de bienvenida institucional.'
    },
    prompt: 'Lista los alumnos que ingresaron durante el año 2023. Muestra id_alumno, nombre, apellido, email y fecha_ingreso. Ordena cronológicamente por fecha_ingreso de manera ascendente.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: "SELECT id_alumno, nombre, apellido, email, fecha_ingreso FROM alumnos WHERE strftime('%Y', fecha_ingreso) = '2023' ORDER BY fecha_ingreso ASC;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Filtra la tabla alumnos por el año 2023 utilizando strftime(\'%Y\', fecha_ingreso) = \'2023\' o LIKE \'2023%\' y ordena con ORDER BY fecha_ingreso ASC.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "SELECT id_alumno, nombre, apellido, email, fecha_ingreso\nFROM alumnos\nWHERE strftime('%Y', fecha_ingreso) = '2023'\nORDER BY fecha_ingreso ASC;"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'La función strftime(\'%Y\', ...) extrae el año de la fecha ISO. ORDER BY ASC garantiza la visualización en orden cronológico.'
      }
    ]
  },
  {
    id: 'kata-dql-02',
    moduleId: 'mod-1-dql',
    title: 'Planificación Estratégica de Oferta: Programas Presenciales de Grado',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Dirección de Grado & Acreditación',
      scenario: 'El comité de acreditación ministerial exige auditar las carreras presenciales de nivel grado con una duración mínima de 4 años para certificar planes de estudio.'
    },
    prompt: 'Muestra las carreras presenciales de nivel grado cuya duración sea mayor o igual a 4 años. Proyecta nombre, titulo, duracion y carga_horaria.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: "SELECT nombre, titulo, duracion, carga_horaria FROM carreras WHERE modalidad = 'presencial' AND nivel = 'grado' AND duracion >= 4;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Combina tres predicados lógicos con el operador AND sobre las columnas modalidad, nivel y duracion.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "SELECT nombre, titulo, duracion, carga_horaria\nFROM carreras\nWHERE modalidad = 'presencial' AND nivel = 'grado' AND duracion >= 4;"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'Encadenar condiciones con AND asegura que el registro cumpla todos los criterios simultáneamente.'
      }
    ]
  },
  {
    id: 'kata-dql-03',
    moduleId: 'mod-1-dql',
    title: 'Optimización de Currículum: Asignaturas Electivas de Formación Ágil',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Coordinación de Formación Continua',
      scenario: 'Se busca analizar materias optativas de carga ligera (menos de 70 horas) para ofrecer créditos rápidos a estudiantes avanzados.'
    },
    prompt: 'Obtén las asignaturas no obligatorias (es_obligatoria = 0) que tengan menos de 70 horas de carga horaria. Muestra nombre, creditos, carga_horaria y es_obligatoria.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT nombre, creditos, carga_horaria, es_obligatoria FROM asignaturas WHERE es_obligatoria = 0 AND carga_horaria < 70;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Evalúa la condición es_obligatoria = 0 y carga_horaria < 70 en la cláusula WHERE.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT nombre, creditos, carga_horaria, es_obligatoria\nFROM asignaturas\nWHERE es_obligatoria = 0 AND carga_horaria < 70;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'En SQLite el tipo booleano se representa con 0 y 1. El operador AND filtra tuplas que cumplan ambos límites.'
      }
    ]
  },
  {
    id: 'kata-dql-04',
    moduleId: 'mod-1-dql',
    title: 'Compensaciones & Nómina: Identificación de Personal con Salario Base Crítico',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Recursos Humanos & Finanzas',
      scenario: 'El equipo de People & Culture necesita identificar colaboradores con ingreso previo al 2020 cuyo salario base no supere los $400,000 para programar el reajuste salarial.'
    },
    prompt: 'Lista los docentes que ingresaron antes de 2020 y cuyo salario base sea menor o igual a $400,000. Muestra nombre y apellido concatenados en una columna "Nombre Completo", fecha_ingreso y salario_base.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: "SELECT (nombre || ' ' || apellido) AS \"Nombre Completo\", fecha_ingreso, salario_base FROM docentes WHERE strftime('%Y', fecha_ingreso) < '2020' AND salario_base <= 400000;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Concatena nombre y apellido con el operador || y un espacio, asígnales el alias "Nombre Completo" y filtra con strftime y salario_base.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "SELECT (nombre || ' ' || apellido) AS \"Nombre Completo\", fecha_ingreso, salario_base\nFROM docentes\nWHERE strftime('%Y', fecha_ingreso) < '2020' AND salario_base <= 400000;"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El operador || realiza concatenación de texto estándar ANSI SQL.'
      }
    ]
  },
  {
    id: 'kata-dql-05',
    moduleId: 'mod-1-dql',
    title: 'Infraestructura y Capacidad: Centros de Cómputo y Laboratorios Especializados',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Operaciones e Infraestructura TI',
      scenario: 'Planificación de espacios físicos equipados para certificaciones técnicas de desarrollo de software.'
    },
    prompt: 'Muestra las aulas de tipo laboratorio o centro de cómputos. Proyecta nombre, tipo y capacidad, ordenadas por capacidad de mayor a menor.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: "SELECT nombre, tipo, capacidad FROM aulas WHERE tipo IN ('laboratorio', 'centro de computos') ORDER BY capacidad DESC;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa el operador IN (\'laboratorio\', \'centro de computos\') o condición OR, y ordena con ORDER BY capacidad DESC.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "SELECT nombre, tipo, capacidad\nFROM aulas\nWHERE tipo IN ('laboratorio', 'centro de computos')\nORDER BY capacidad DESC;"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El operador IN optimiza la verificación de pertenencia en conjuntos discretos.'
      }
    ]
  },
  {
    id: 'kata-dql-15',
    moduleId: 'mod-1-dql',
    title: 'Calidad de Datos: Auditoría de Perfiles con Canales de Contacto Incompletos',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Data Governance & Comunicaciones',
      scenario: 'Depurar la base de datos de usuarios corrigiendo consultas con errores de sintaxis heredados sobre campos no informados (NULLs).'
    },
    prompt: 'Lista los alumnos que NO tienen teléfono registrado (telefono IS NULL). Proyecta id_alumno, nombre, apellido, email y telefono.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT id_alumno, nombre, apellido, email, telefono FROM alumnos WHERE telefono IS NULL;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'En SQL nunca se compara con = NULL. Debe emplearse la cláusula IS NULL.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT id_alumno, nombre, apellido, email, telefono\nFROM alumnos\nWHERE telefono IS NULL;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'NULL representa ausencia de valor bajo lógica trivalente de SQL. El operador IS NULL evalúa formalmente este estado.'
      }
    ]
  },

  // =========================================================================
  // LIBRETO 2: AGRUPACIONES & MÉTRICAS (mod-2-aggregations)
  // =========================================================================
  {
    id: 'kata-agg-mrr',
    moduleId: 'mod-2-aggregations',
    title: 'Finanzas SaaS: Cálculo de Ingreso Mensual Recurrente (MRR) y Facturación',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'Finanzas Corporativas & Growth',
      scenario: 'La junta directiva necesita auditar la evolución mensual de ingresos por ventas y el volumen transaccional consolidado para evaluar el crecimiento neto.'
    },
    prompt: 'Agrupa los pedidos facturados por período mensual utilizando strftime(\'%Y-%m\', fecha_pedido). Calcula el ingreso total sumado (alias "mrr_total") y la cantidad de pedidos procesados (alias "total_pedidos"). Ordena cronológicamente.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: "SELECT strftime('%Y-%m', fecha_pedido) AS periodo, SUM(monto_total) AS mrr_total, COUNT(id_pedido) AS total_pedidos FROM pedidos GROUP BY strftime('%Y-%m', fecha_pedido) ORDER BY periodo ASC;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa strftime(\'%Y-%m\', fecha_pedido) como dimensión de agrupación y calcula SUM(monto_total) y COUNT(id_pedido).'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "SELECT strftime('%Y-%m', fecha_pedido) AS periodo, SUM(monto_total) AS mrr_total, COUNT(id_pedido) AS total_pedidos\nFROM pedidos\nGROUP BY strftime('%Y-%m', fecha_pedido)\nORDER BY periodo ASC;"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'La función SUM calcula la masa monetaria total del mes, mientras COUNT mide la cadencia de operaciones.'
      }
    ]
  },
  {
    id: 'kata-agg-ticket',
    moduleId: 'mod-2-aggregations',
    title: 'Customer Analytics: Ticket Promedio y Facturación Acumulada por Cliente',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'E-Commerce Analytics',
      scenario: 'Segmentación de clientes VIP: aislar aquellos compradores que han generado una facturación acumulada superior a $300 para programa de fidelización.'
    },
    prompt: 'Agrupa las compras por id_cliente obteniendo el total gastado (alias "total_gastado") y el ticket promedio por pedido (alias "ticket_promedio"). Filtra con HAVING solo aquellos clientes con total gastado superior a 300.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT id_cliente, SUM(monto_total) AS total_gastado, AVG(monto_total) AS ticket_promedio FROM pedidos GROUP BY id_cliente HAVING SUM(monto_total) > 300 ORDER BY total_gastado DESC;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Agrupa por id_cliente, proyecta SUM(monto_total) y AVG(monto_total), y aplica la condición HAVING SUM(monto_total) > 300.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT id_cliente, SUM(monto_total) AS total_gastado, AVG(monto_total) AS ticket_promedio\nFROM pedidos\nGROUP BY id_cliente\nHAVING SUM(monto_total) > 300\nORDER BY total_gastado DESC;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'HAVING es mandatorio para filtrar sobre métricas agregadas calculadas por funciones como SUM.'
      }
    ]
  },
  {
    id: 'kata-agg-stock',
    moduleId: 'mod-2-aggregations',
    title: 'Supply Chain: Auditoría de Stock Crítico y Valoración de Capital Remanente',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'Operaciones Logísticas & Almacén',
      scenario: 'Auditar productos con inventario igual o inferior a 20 unidades para activar órdenes de reposición antes de quiebre de stock.'
    },
    prompt: 'Muestra los productos con stock menor o igual a 20 unidades. Proyecta id_producto, nombre_producto, stock, precio y el capital inmovilizado restante (precio * stock con alias "capital_remanente"). Ordena por stock ascendente.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT id_producto, nombre_producto, stock, precio, (precio * stock) AS capital_remanente FROM productos WHERE stock <= 20 ORDER BY stock ASC;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Aplica WHERE stock <= 20, multiplica precio * stock con alias "capital_remanente" y ordena por stock ASC.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT id_producto, nombre_producto, stock, precio, (precio * stock) AS capital_remanente\nFROM productos\nWHERE stock <= 20\nORDER BY stock ASC;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El cálculo relacional proyectado permite evaluar el impacto financiero del inventario crítico restante.'
      }
    ]
  },

  // =========================================================================
  // LIBRETO 3: CRUCE DE TABLAS (mod-3-joins)
  // =========================================================================
  {
    id: 'kata-dql-06',
    moduleId: 'mod-3-joins',
    title: 'Mapeo Curricular: Asignaturas Obligatorias y Departamentos Responsables (INNER JOIN)',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Secretaría de Asuntos Académicos',
      scenario: 'Cruzar el catálogo de asignaturas troncales obligatorias con sus departamentos tutelares para auditoría ministerial.'
    },
    prompt: 'Lista las asignaturas obligatorias junto con el nombre del departamento al que pertenecen. Muestra nombre de la asignatura (alias "asignatura"), carga_horaria, creditos y nombre del departamento (alias "departamento").',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT a.nombre AS asignatura, a.carga_horaria, a.creditos, d.nombre AS departamento FROM asignaturas a INNER JOIN departamentos d ON a.id_departamento = d.id_departamento WHERE a.es_obligatoria = 1;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Une asignaturas con departamentos a través de id_departamento usando INNER JOIN y filtra por es_obligatoria = 1.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT a.nombre AS asignatura, a.carga_horaria, a.creditos, d.nombre AS departamento\nFROM asignaturas a\nINNER JOIN departamentos d ON a.id_departamento = d.id_departamento\nWHERE a.es_obligatoria = 1;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'INNER JOIN resuelve la correspondencia relacional exacta entre clave foránea y clave primaria.'
      }
    ]
  },
  {
    id: 'kata-dql-07',
    moduleId: 'mod-3-joins',
    title: 'Planificación Operativa de Comisiones y Asignación de Aulas (Triple JOIN)',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Bedelía & Operaciones',
      scenario: 'Generar la grilla operativa de comisiones prácticas del ciclo 2025 consolidando asignatura, profesor a cargo y espacio físico asignado.'
    },
    prompt: 'Muestra las comisiones prácticas del año 2025 con el nombre de la asignatura, el apellido del docente y el nombre del aula asignada.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: "SELECT a.nombre AS asignatura, d.apellido AS docente, au.nombre AS aula FROM comisiones c INNER JOIN asignaturas a ON c.id_asignatura = a.id_asignatura INNER JOIN docentes d ON c.id_docente = d.id_docente INNER JOIN aulas au ON c.id_aula = au.id_aula WHERE c.anio = 2025 AND c.tipo_comision = 'practica';",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Haz INNER JOIN desde comisiones hacia asignaturas, docentes y aulas, aplicando los filtros de anio y tipo_comision.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "SELECT a.nombre AS asignatura, d.apellido AS docente, au.nombre AS aula\nFROM comisiones c\nINNER JOIN asignaturas a ON c.id_asignatura = a.id_asignatura\nINNER JOIN docentes d ON c.id_docente = d.id_docente\nINNER JOIN aulas au ON c.id_aula = au.id_aula\nWHERE c.anio = 2025 AND c.tipo_comision = 'practica';"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'Comisiones actúa como tabla puente relacional que conecta los tres dominios cardinales.'
      }
    ]
  },
  {
    id: 'kata-dql-08',
    moduleId: 'mod-3-joins',
    title: 'Customer Retention: Detección de Clientes Inactivos en Riesgo de Churn (LEFT JOIN Anti-Join)',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'Customer Success & CRM',
      scenario: 'Identificar a todos los clientes registrados en la plataforma que nunca han efectuado un pedido para activarles un cupón de reactivación.'
    },
    prompt: 'Obtén el listado de clientes que NO tienen ningún pedido asociado en la tabla pedidos. Muestra id_cliente, nombre, email y pais.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT c.id_cliente, c.nombre, c.email, c.pais FROM clientes c LEFT JOIN pedidos p ON c.id_cliente = p.id_cliente WHERE p.id_pedido IS NULL;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Aplica un LEFT JOIN entre clientes y pedidos, y filtra en el WHERE con p.id_pedido IS NULL.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT c.id_cliente, c.nombre, c.email, c.pais\nFROM clientes c\nLEFT JOIN pedidos p ON c.id_cliente = p.id_cliente\nWHERE p.id_pedido IS NULL;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El patrón LEFT JOIN ... WHERE right.key IS NULL es el estándar relacional de alto rendimiento para detectar ausencia de vínculos.'
      }
    ]
  },
  {
    id: 'kata-dql-09',
    moduleId: 'mod-3-joins',
    title: 'Auditoría de Demanda Institucional: Programas Académicos con Alumnado Activo (LEFT JOIN + COUNT)',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Planeamiento Estratégico',
      scenario: 'Determinar el volumen de alumnos activos por carrera, garantizando que aquellos programas con 0 alumnos también figuren en el informe.'
    },
    prompt: 'Muestra el id_carrera, nombre de la carrera y la cantidad de alumnos activos inscriptos (alias "alumnos_activos"). Incluye las carreras que no tengan ningún alumno.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: "SELECT c.id_carrera, c.nombre, COUNT(ac.id_alumno) AS alumnos_activos FROM carreras c LEFT JOIN alumno_carrera ac ON c.id_carrera = ac.id_carrera AND ac.estado = 'activa' GROUP BY c.id_carrera, c.nombre;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa LEFT JOIN colocando la condición estado = \'activa\' en el ON, y calcula COUNT(ac.id_alumno) agrupando por carrera.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "SELECT c.id_carrera, c.nombre, COUNT(ac.id_alumno) AS alumnos_activos\nFROM carreras c\nLEFT JOIN alumno_carrera ac ON c.id_carrera = ac.id_carrera AND ac.estado = 'activa'\nGROUP BY c.id_carrera, c.nombre;"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El filtro en el ON del LEFT JOIN preserva las filas izquierdas computando COUNT = 0 cuando no hay coincidencias.'
      }
    ]
  },
  {
    id: 'kata-dql-10',
    moduleId: 'mod-3-joins',
    title: 'Optimización de Capacidad: Docentes Disponibles para Nuevas Asignaciones',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Planificación Docente & RRHH',
      scenario: 'Detectar profesores registrados que no poseen ninguna comisión asignada en el ciclo 2025 para cobertura de nuevos cursos.'
    },
    prompt: 'Detecta a los docentes que actualmente no tengan comisiones asignadas durante el año 2025. Muestra id_docente, nombre, apellido y el nombre de su departamento.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT d.id_docente, d.nombre, d.apellido, dep.nombre AS departamento FROM docentes d INNER JOIN departamentos dep ON d.id_departamento = dep.id_departamento LEFT JOIN comisiones c ON d.id_docente = c.id_docente AND c.anio = 2025 WHERE c.id_comision IS NULL;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Combina docentes con departamentos mediante INNER JOIN y haz LEFT JOIN con comisiones en 2025, filtrando WHERE c.id_comision IS NULL.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT d.id_docente, d.nombre, d.apellido, dep.nombre AS departamento\nFROM docentes d\nINNER JOIN departamentos dep ON d.id_departamento = dep.id_departamento\nLEFT JOIN comisiones c ON d.id_docente = c.id_docente AND c.anio = 2025\nWHERE c.id_comision IS NULL;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El anti-join identifica con precisión la capacidad ociosa en la planta profesional.'
      }
    ]
  },

  // =========================================================================
  // LIBRETO 4: SUBCONSULTAS & CTES (mod-4-subqueries)
  // =========================================================================
  {
    id: 'kata-dql-11',
    moduleId: 'mod-4-subqueries',
    title: 'Benchmarking Salarial: Compensaciones Superiores a la Media Corporativa',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Dirección Financiera',
      scenario: 'Auditar colaboradores cuyo salario base se ubica por encima del promedio global institucional para control de presupuestos.'
    },
    prompt: 'Lista los docentes cuyo salario base sea superior al salario promedio general de todos los docentes. Muestra id_docente, nombre, apellido y salario_base.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT id_docente, nombre, apellido, salario_base FROM docentes WHERE salario_base > (SELECT AVG(salario_base) FROM docentes);',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa una subconsulta escalar en la cláusula WHERE con (SELECT AVG(salario_base) FROM docentes).'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT id_docente, nombre, apellido, salario_base\nFROM docentes\nWHERE salario_base > (SELECT AVG(salario_base) FROM docentes);'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'La subconsulta escalar evalúa la media aritmética una única vez para comparar cada tupla.'
      }
    ]
  },
  {
    id: 'kata-dql-12',
    moduleId: 'mod-4-subqueries',
    title: 'Equidad Salarial Interna: Compensación Superior al Promedio Departamental',
    category: 'DQL',
    difficulty: 'advanced',
    schemaId: 'universidad',
    businessCase: {
      department: 'Auditoría & People Analytics',
      scenario: 'Detectar docentes con salarios significativamente superiores a la media específica del departamento al que están asignados.'
    },
    prompt: 'Muestra id_docente, nombre, apellido, salario_base e id_departamento de los docentes cuyo salario sea superior al promedio de su propio departamento.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT d.id_docente, d.nombre, d.apellido, d.salario_base, d.id_departamento FROM docentes d WHERE d.salario_base > (SELECT AVG(d2.salario_base) FROM docentes d2 WHERE d2.id_departamento = d.id_departamento);',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Escribe una subconsulta correlacionada vinculando d2.id_departamento = d.id_departamento.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT d.id_docente, d.nombre, d.apellido, d.salario_base, d.id_departamento\nFROM docentes d\nWHERE d.salario_base > (\n  SELECT AVG(d2.salario_base)\n  FROM docentes d2\n  WHERE d2.id_departamento = d.id_departamento\n);'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'La subconsulta correlacionada se recalcula fila a fila tomando como parámetro el id_departamento de la tupla examinada.'
      }
    ]
  },
  {
    id: 'kata-dql-13',
    moduleId: 'mod-4-subqueries',
    title: 'Segmentación de Mercado: Alumnos en Programas de Alta Concurrencia',
    category: 'DQL',
    difficulty: 'advanced',
    schemaId: 'universidad',
    businessCase: {
      department: 'Admisiones & Marketing',
      scenario: 'Identificar a los alumnos pertenecientes a programas académicos con alta masa crítica (> 1 alumno activo registrado).'
    },
    prompt: 'Lista los alumnos (id_alumno, nombre, apellido) junto con el nombre de su carrera, que pertenezcan a carreras con más de 1 alumno activo.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: "SELECT a.id_alumno, a.nombre, a.apellido, c.nombre AS carrera FROM alumnos a INNER JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno INNER JOIN carreras c ON ac.id_carrera = c.id_carrera WHERE ac.estado = 'activa' AND c.id_carrera IN (SELECT id_carrera FROM alumno_carrera WHERE estado = 'activa' GROUP BY id_carrera HAVING COUNT(id_alumno) > 1);",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa una subconsulta con GROUP BY id_carrera y HAVING COUNT(id_alumno) > 1 dentro de una cláusula IN.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "SELECT a.id_alumno, a.nombre, a.apellido, c.nombre AS carrera\nFROM alumnos a\nINNER JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno\nINNER JOIN carreras c ON ac.id_carrera = c.id_carrera\nWHERE ac.estado = 'activa' AND c.id_carrera IN (\n  SELECT id_carrera FROM alumno_carrera WHERE estado = 'activa' GROUP BY id_carrera HAVING COUNT(id_alumno) > 1\n);"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'HAVING filtra sobre la agregación grupal antes de enviar la lista de claves a la consulta principal.'
      }
    ]
  },
  {
    id: 'kata-dql-14',
    moduleId: 'mod-4-subqueries',
    title: 'Detección de Cuellos de Botella: Espacios Críticos con Sobredemanda Operativa',
    category: 'DQL',
    difficulty: 'advanced',
    schemaId: 'universidad',
    businessCase: {
      department: 'Infraestructura & Facility Management',
      scenario: 'Detectar aulas con capacidad física inferior a la media pero con asignación intensiva (2 o más comisiones simultáneas en 2025).'
    },
    prompt: 'Muestra las aulas con capacidad menor al promedio general y que tengan 2 o más comisiones asignadas en 2025. Proyecta id_aula, nombre, capacidad y cantidad de comisiones (alias "total_comisiones").',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT au.id_aula, au.nombre, au.capacidad, COUNT(c.id_comision) AS total_comisiones FROM aulas au INNER JOIN comisiones c ON au.id_aula = c.id_aula WHERE au.capacidad < (SELECT AVG(capacidad) FROM aulas) AND c.anio = 2025 GROUP BY au.id_aula, au.nombre, au.capacidad HAVING COUNT(c.id_comision) >= 2;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Filtra en el WHERE con la subconsulta de capacidad promedio y en el HAVING con COUNT(c.id_comision) >= 2.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT au.id_aula, au.nombre, au.capacidad, COUNT(c.id_comision) AS total_comisiones\nFROM aulas au\nINNER JOIN comisiones c ON au.id_aula = c.id_aula\nWHERE au.capacidad < (SELECT AVG(capacidad) FROM aulas) AND c.anio = 2025\nGROUP BY au.id_aula, au.nombre, au.capacidad\nHAVING COUNT(c.id_comision) >= 2;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'Combina filtrado escalar en WHERE con condición de agregación en HAVING.'
      }
    ]
  },

  // =========================================================================
  // LIBRETO 5: WINDOW FUNCTIONS (mod-5-window)
  // =========================================================================
  {
    id: 'kata-win-01',
    moduleId: 'mod-5-window',
    title: 'Fintech Analytics: Ranking de Compras por Monto Transaccional (DENSE_RANK)',
    category: 'DQL',
    difficulty: 'advanced',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'Business Intelligence & Tesorería',
      scenario: 'Clasificar las compras de mayor impacto sin colapsar las filas de los pedidos, determinando el podio de facturación.'
    },
    prompt: 'Genera un ranking de pedidos según su monto_total utilizando DENSE_RANK() OVER (ORDER BY monto_total DESC). Muestra id_pedido, id_cliente, fecha_pedido, monto_total y la posición asignada (alias "ranking_monto"). Ordena por ranking_monto ascendente.',
    initialCode: `-- Escribe tu consulta analítica aquí\nSELECT `,
    expectedQuery: 'SELECT id_pedido, id_cliente, fecha_pedido, monto_total, DENSE_RANK() OVER (ORDER BY monto_total DESC) AS ranking_monto FROM pedidos ORDER BY ranking_monto ASC;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa la función de ventana DENSE_RANK() OVER (ORDER BY monto_total DESC) con alias ranking_monto.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT id_pedido, id_cliente, fecha_pedido, monto_total,\n       DENSE_RANK() OVER (ORDER BY monto_total DESC) AS ranking_monto\nFROM pedidos\nORDER BY ranking_monto ASC;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'DENSE_RANK asigna posiciones consecutivas sin dejar huecos cuando existen empates en los valores analizados.'
      }
    ]
  },
  {
    id: 'kata-win-02',
    moduleId: 'mod-5-window',
    title: 'Revenue Operations: Acumulado Progresivo de Facturación (Running Total)',
    category: 'DQL',
    difficulty: 'advanced',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'Finanzas & Planificación Comercial',
      scenario: 'Analizar el ritmo de facturación acumulada operación tras operación a lo largo del tiempo para proyecciones de flujo de caja.'
    },
    prompt: 'Calcula el total facturado acumulado fila a fila. Proyecta id_pedido, fecha_pedido, monto_total y el acumulado histórico (alias "ingreso_acumulado") usando SUM(monto_total) OVER (ORDER BY fecha_pedido ASC, id_pedido ASC).',
    initialCode: `-- Escribe tu consulta analítica aquí\nSELECT `,
    expectedQuery: 'SELECT id_pedido, fecha_pedido, monto_total, SUM(monto_total) OVER (ORDER BY fecha_pedido ASC, id_pedido ASC) AS ingreso_acumulado FROM pedidos ORDER BY fecha_pedido ASC;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Aplica SUM(monto_total) OVER (ORDER BY fecha_pedido ASC, id_pedido ASC) como columna calculada.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT id_pedido, fecha_pedido, monto_total,\n       SUM(monto_total) OVER (ORDER BY fecha_pedido ASC, id_pedido ASC) AS ingreso_acumulado\nFROM pedidos\nORDER BY fecha_pedido ASC;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'La cláusula OVER sin PARTITION BY establece un marco acumulativo continuo desde el primer registro hasta el actual.'
      }
    ]
  },

  // =========================================================================
  // LIBRETO 6: DML (MANIPULACIÓN) (mod-6-dml)
  // =========================================================================
  {
    id: 'kata-dml-01',
    moduleId: 'mod-6-dml',
    title: 'Operaciones de Oferta: Apertura y Alta de Nueva Comisión Académica',
    category: 'DML',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Bedelía Central',
      scenario: 'Registrar la apertura formal de una nueva comisión para el ciclo lectivo con cupo y docente asignado.'
    },
    prompt: "Inserta una nueva comisión con id_asignatura = 1, id_docente = 1, id_aula = 1, anio = 2025, cuatrimestre = 2, cupo = 35, tipo_comision = 'practica' y horario = 'Lun/Mie 18:00 - 20:00'.",
    initialCode: `-- Escribe tu sentencia DML aquí\nINSERT INTO `,
    expectedQuery: "INSERT INTO comisiones (id_asignatura, id_docente, id_aula, anio, cuatrimestre, cupo, tipo_comision, horario) VALUES (1, 1, 1, 2025, 2, 35, 'practica', 'Lun/Mie 18:00 - 20:00');",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa INSERT INTO comisiones (columnas...) VALUES (...)'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "INSERT INTO comisiones (id_asignatura, id_docente, id_aula, anio, cuatrimestre, cupo, tipo_comision, horario)\nVALUES (1, 1, 1, 2025, 2, 35, 'practica', 'Lun/Mie 18:00 - 20:00');"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'La sentencia INSERT añade una nueva tupla asignando automáticamente la clave primaria.'
      }
    ]
  },
  {
    id: 'kata-dml-02',
    moduleId: 'mod-6-dml',
    title: 'Ajuste Salarial Paritario: Incremento Presupuestario del 10% por Departamento',
    category: 'DML',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Recursos Humanos',
      scenario: 'Aplicar el reajuste salarial acordado incrementando el 10% al salario base de los colaboradores del departamento 1.'
    },
    prompt: 'Actualiza el salario base incrementando en un 10% (salario_base * 1.10) a los docentes que pertenezcan al id_departamento = 1.',
    initialCode: `-- Escribe tu sentencia DML aquí\nUPDATE `,
    expectedQuery: 'UPDATE docentes SET salario_base = salario_base * 1.10 WHERE id_departamento = 1;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa UPDATE docentes SET salario_base = salario_base * 1.10 WHERE id_departamento = 1;'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'UPDATE docentes\nSET salario_base = salario_base * 1.10\nWHERE id_departamento = 1;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'UPDATE modifica in-situ los registros que satisfacen la condición del WHERE.'
      }
    ]
  },
  {
    id: 'kata-dml-03',
    moduleId: 'mod-6-dml',
    title: 'Depuración de Base de Datos: Eliminación de Comisiones sin Matrícula Activa',
    category: 'DML',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Auditoría Académica',
      scenario: 'Sanitizar el catálogo de comisiones eliminando aquellas que no recibieron inscripciones.'
    },
    prompt: 'Elimina de la tabla "comisiones" aquellas comisiones que no posean ningún alumno inscripto (su id_comision no existe en la tabla inscripciones).',
    initialCode: `-- Escribe tu sentencia DML aquí\nDELETE FROM `,
    expectedQuery: 'DELETE FROM comisiones WHERE id_comision NOT IN (SELECT DISTINCT id_comision FROM inscripciones);',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Combina DELETE FROM comisiones con una subconsulta NOT IN (SELECT DISTINCT id_comision FROM inscripciones).'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'DELETE FROM comisiones\nWHERE id_comision NOT IN (SELECT DISTINCT id_comision FROM inscripciones);'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El borrado con subconsulta previene la acumulación de entidades inactivas sin afectar registros relacionados.'
      }
    ]
  },
  {
    id: 'kata-dml-ecommerce',
    moduleId: 'mod-6-dml',
    title: 'Fulfillment Logístico: Recepción y Aumento Inmediato de Stock',
    category: 'DML',
    difficulty: 'beginner',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'Operaciones Logísticas',
      scenario: 'Ingreso de nuevo cargamento de mercadería al centro de distribución regional.'
    },
    prompt: 'Incrementa en 50 unidades el stock del producto "Mouse Inalámbrico" (id_producto = 2) en la tabla productos.',
    initialCode: `-- Escribe tu sentencia DML aquí\nUPDATE `,
    expectedQuery: 'UPDATE productos SET stock = stock + 50 WHERE id_producto = 2;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Ejecuta UPDATE productos SET stock = stock + 50 WHERE id_producto = 2;'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'UPDATE productos\nSET stock = stock + 50\nWHERE id_producto = 2;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'La actualización atómica suma directamente sobre el valor previo de la columna en una sola transacción.'
      }
    ]
  },

  // =========================================================================
  // LIBRETO 7: DDL (ESTRUCTURA) (mod-7-ddl)
  // =========================================================================
  {
    id: 'kata-ddl-01',
    moduleId: 'mod-7-ddl',
    title: 'Capa de Presentación: Vista Analítica Consolidada de Matrícula y Programas',
    category: 'DDL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Data Engineering & Arquitectura',
      scenario: 'Crear una vista materializada virtual para simplificar el acceso seguro a los datos de estudiantes y sus carreras a analistas de BI.'
    },
    prompt: 'Crea una vista llamada "v_alumnos_carreras" que proyecte id_alumno, nombre, apellido, email, el nombre de la carrera (alias "carrera") y el estado de inscripción.',
    initialCode: `-- Escribe tu sentencia DDL aquí\nCREATE VIEW `,
    expectedQuery: 'CREATE VIEW v_alumnos_carreras AS SELECT a.id_alumno, a.nombre, a.apellido, a.email, c.nombre AS carrera, ac.estado FROM alumnos a INNER JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno INNER JOIN carreras c ON ac.id_carrera = c.id_carrera;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa la sintaxis CREATE VIEW v_alumnos_carreras AS SELECT ...'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'CREATE VIEW v_alumnos_carreras AS\nSELECT a.id_alumno, a.nombre, a.apellido, a.email, c.nombre AS carrera, ac.estado\nFROM alumnos a\nINNER JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno\nINNER JOIN carreras c ON ac.id_carrera = c.id_carrera;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'Las vistas encapsulan lógica relacional compleja garantizando gobernanza uniforme de datos.'
      }
    ]
  },
  {
    id: 'kata-ddl-02',
    moduleId: 'mod-7-ddl',
    title: 'Evolución de Esquema: Incorporación Segura de Canal de Contacto de Emergencia',
    category: 'DDL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Seguridad Corporativa & Compliance',
      scenario: 'Extender la estructura de la entidad alumnos para añadir el canal de emergencia sin interrumpir la operación ni perder datos históricos.'
    },
    prompt: 'Modifica la tabla "alumnos" para agregar la columna "telefono_emergencia" de tipo TEXT.',
    initialCode: `-- Escribe tu sentencia DDL aquí\nALTER TABLE `,
    expectedQuery: 'ALTER TABLE alumnos ADD COLUMN telefono_emergencia TEXT;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa la instrucción ALTER TABLE alumnos ADD COLUMN telefono_emergencia TEXT;'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'ALTER TABLE alumnos ADD COLUMN telefono_emergencia TEXT;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'ALTER TABLE aplica la migración sobre el catálogo del motor preservando las tuplas existentes.'
      }
    ]
  },
  {
    id: 'kata-ddl-03',
    moduleId: 'mod-7-ddl',
    title: 'Arquitectura DDL: Sistema de Asignación y Control de Becas de Talento',
    category: 'DDL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Gestión de Beneficios & Talento',
      scenario: 'Diseñar la tabla del programa de becas con restricciones CHECK de integridad que validen porcentajes positivos de hasta el 100%.'
    },
    prompt: 'Crea una tabla "becas" con: id_beca (INTEGER PRIMARY KEY AUTOINCREMENT), nombre (TEXT NOT NULL), porcentaje_descuento (REAL NOT NULL con CHECK entre > 0 y <= 100), fecha_inicio (DATE NOT NULL) y fecha_fin (DATE).',
    initialCode: `-- Escribe tu sentencia DDL aquí\nCREATE TABLE `,
    expectedQuery: 'CREATE TABLE becas ( id_beca INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT NOT NULL, porcentaje_descuento REAL NOT NULL CHECK (porcentaje_descuento > 0 AND porcentaje_descuento <= 100), fecha_inicio DATE NOT NULL, fecha_fin DATE );',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Define las columnas y la restricción CHECK (porcentaje_descuento > 0 AND porcentaje_descuento <= 100).'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'CREATE TABLE becas (\n  id_beca INTEGER PRIMARY KEY AUTOINCREMENT,\n  nombre TEXT NOT NULL,\n  porcentaje_descuento REAL NOT NULL CHECK (porcentaje_descuento > 0 AND porcentaje_descuento <= 100),\n  fecha_inicio DATE NOT NULL,\n  fecha_fin DATE\n);'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'Las restricciones CHECK aseguran que ningún registro viole las reglas de negocio a nivel de motor de almacenamiento.'
      }
    ]
  },

  // =========================================================================
  // LIBRETO 8: ÍNDICES & OPTIMIZACIÓN (mod-8-indexes)
  // =========================================================================
  {
    id: 'kata-idx-01',
    moduleId: 'mod-8-indexes',
    title: 'Database Performance: Índice B-Tree Compuesto para Segmentación de Clientes',
    category: 'DDL',
    difficulty: 'intermediate',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'Performance Engineering & DBRE',
      scenario: 'Acelerar consultas recurrentes de analítica que filtran conjuntamente por país de procedencia y correo electrónico.'
    },
    prompt: 'Crea un índice llamado "idx_clientes_pais_email" sobre la tabla "clientes" que indexe conjuntamente las columnas pais y email.',
    initialCode: `-- Escribe tu sentencia DDL aquí\nCREATE INDEX `,
    expectedQuery: 'CREATE INDEX idx_clientes_pais_email ON clientes (pais, email);',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa la sintaxis CREATE INDEX idx_clientes_pais_email ON clientes (pais, email);'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'CREATE INDEX idx_clientes_pais_email ON clientes (pais, email);'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'Los índices compuestos B-Tree permiten búsquedas O(log N) cuando se consulta por el prefijo de las columnas indexadas.'
      }
    ]
  },
  {
    id: 'kata-idx-02',
    moduleId: 'mod-8-indexes',
    title: 'Data Engine Tuning: Índice B-Tree sobre Línea Temporal de Pedidos',
    category: 'DDL',
    difficulty: 'intermediate',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'Infraestructura de Datos',
      scenario: 'Eliminar Table Scans en reportes de facturación basados en rangos de fechas de pedidos.'
    },
    prompt: 'Crea un índice llamado "idx_pedidos_fecha" sobre la columna fecha_pedido de la tabla "pedidos".',
    initialCode: `-- Escribe tu sentencia DDL aquí\nCREATE INDEX `,
    expectedQuery: 'CREATE INDEX idx_pedidos_fecha ON pedidos (fecha_pedido);',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa CREATE INDEX idx_pedidos_fecha ON pedidos (fecha_pedido);'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'CREATE INDEX idx_pedidos_fecha ON pedidos (fecha_pedido);'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'Indexar columnas temporales permite al optimizador de costos ejecutar Index Range Scans instantáneos.'
      }
    ]
  },

  // =========================================================================
  // LIBRETO 9: TRANSACCIONES / TCL (mod-10-transactions)
  // =========================================================================
  {
    id: 'kata-tcl-01',
    moduleId: 'mod-10-transactions',
    title: 'Operaciones ACID: Liquidación Financiera Atómica y Prevención de Sobregiro',
    category: 'TCL',
    difficulty: 'intermediate',
    schemaId: 'banco',
    businessCase: {
      department: 'Core Bancario & Seguridad Financiera',
      scenario: 'Garantizar que el débito de una cuenta y el registro inmutable en el log transaccional se ejecuten bajo una unidad indivisible (All-or-Nothing).'
    },
    prompt: 'Ejecuta una transacción atómica que: inicie con BEGIN TRANSACTION, descuente $1,500 de la cuenta con id_cuenta = 1, inserte el registro en transacciones_log (id_origen = 1, id_destino = 3, monto = 1500) y confirme con COMMIT.',
    initialCode: `-- Escribe tu bloque transaccional aquí\nBEGIN TRANSACTION;\n`,
    expectedQuery: 'BEGIN TRANSACTION; UPDATE cuentas_bancarias SET saldo = saldo - 1500 WHERE id_cuenta = 1; INSERT INTO transacciones_log (id_origen, id_destino, monto) VALUES (1, 3, 1500); COMMIT;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Envuelve el UPDATE a cuentas_bancarias y el INSERT a transacciones_log entre BEGIN TRANSACTION; y COMMIT;.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'BEGIN TRANSACTION;\nUPDATE cuentas_bancarias SET saldo = saldo - 1500 WHERE id_cuenta = 1;\nINSERT INTO transacciones_log (id_origen, id_destino, monto) VALUES (1, 3, 1500);\nCOMMIT;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'BEGIN TRANSACTION asegura el principio ACID de atomicidad: si ocurre un fallo en cualquier sentencia intermedia, no se corrompe el saldo bancario.'
      }
    ]
  },
  {
    id: 'kata-tcl-aml',
    moduleId: 'mod-10-transactions',
    title: 'Fintech Compliance: Monitoreo de Transferencias Sospechosas de Alto Valor (AML)',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'banco',
    businessCase: {
      department: 'Prevención de Lavado de Activos (AML) & Compliance',
      scenario: 'Las normativas de supervisión exigen auditar en tiempo real transferencias financieras que igualen o superen los $5,000 para evaluación de riesgo.'
    },
    prompt: 'Consulta el registro en "transacciones_log" para identificar transferencias con montos mayores o iguales a $5,000. Muestra id_log, id_origen, id_destino, monto y fecha, ordenadas por monto de mayor a menor.',
    initialCode: `-- Escribe tu consulta aquí\nSELECT `,
    expectedQuery: 'SELECT id_log, id_origen, id_destino, monto, fecha FROM transacciones_log WHERE monto >= 5000 ORDER BY monto DESC;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Aplica WHERE monto >= 5000 sobre transacciones_log y ordena con ORDER BY monto DESC.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT id_log, id_origen, id_destino, monto, fecha\nFROM transacciones_log\nWHERE monto >= 5000\nORDER BY monto DESC;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'Filtrar el log auditable permite a los oficiales de compliance actuar antes de la liquidación compensatoria definitiva.'
      }
    ]
  },

  // =========================================================================
  // LIBRETO 10: SQL PROCEDURAL & AUTOMATIZACIÓN (mod-9-procedural)
  // =========================================================================
  {
    id: 'kata-proc-01',
    moduleId: 'mod-9-procedural',
    title: 'Seguridad & Compliance: Trigger de Auditoría Forense sobre Nómina Salarial',
    category: 'PROCEDURAL',
    difficulty: 'advanced',
    schemaId: 'universidad',
    businessCase: {
      department: 'Auditoría Interna & Seguridad de la Información',
      scenario: 'Detectar y dejar trazabilidad inmutable e inmediata ante cualquier modificación de sueldos en la planta institucional.'
    },
    prompt: "Crea la tabla auditoria_salarios (id INTEGER PRIMARY KEY AUTOINCREMENT, id_docente INTEGER, salario_antiguo REAL, salario_nuevo REAL, fecha DATE) y el trigger trg_audit_docente_salario que inserte en ella tras un UPDATE de salario_base en docentes.",
    initialCode: `-- Escribe tu disparador (Trigger) aquí\nCREATE TRIGGER `,
    expectedQuery: "CREATE TABLE IF NOT EXISTS auditoria_salarios ( id INTEGER PRIMARY KEY AUTOINCREMENT, id_docente INTEGER, salario_antiguo REAL, salario_nuevo REAL, fecha DATE ); CREATE TRIGGER trg_audit_docente_salario AFTER UPDATE OF salario_base ON docentes FOR EACH ROW BEGIN INSERT INTO auditoria_salarios (id_docente, salario_antiguo, salario_nuevo, fecha) VALUES (OLD.id_docente, OLD.salario_base, NEW.salario_base, DATE('now')); END;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa CREATE TRIGGER ... AFTER UPDATE OF salario_base ON docentes y accede a OLD.salario_base y NEW.salario_base.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "CREATE TABLE IF NOT EXISTS auditoria_salarios (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  id_docente INTEGER,\n  salario_antiguo REAL,\n  salario_nuevo REAL,\n  fecha DATE\n);\n\nCREATE TRIGGER trg_audit_docente_salario\nAFTER UPDATE OF salario_base ON docentes\nFOR EACH ROW\nBEGIN\n  INSERT INTO auditoria_salarios (id_docente, salario_antiguo, salario_nuevo, fecha)\n  VALUES (OLD.id_docente, OLD.salario_base, NEW.salario_base, DATE('now'));\nEND;"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'Los disparadores (Triggers) AFTER UPDATE garantizan trazabilidad forense inviolable directamente en el motor de persistencia.'
      }
    ]
  },
  {
    id: 'kata-proc-stock',
    moduleId: 'mod-9-procedural',
    title: 'Supply Chain Automation: Disparador de Auditoría Inmutable de Inventario',
    category: 'PROCEDURAL',
    difficulty: 'advanced',
    schemaId: 'tienda_online',
    businessCase: {
      department: 'Logística & Control de Pérdidas',
      scenario: 'Monitorear cada ajuste manual de stock de productos registrando el valor previo y posterior para prevenir mermas no autorizadas.'
    },
    prompt: 'Crea un Trigger llamado "trg_auditoria_stock" que, AFTER UPDATE OF stock ON productos FOR EACH ROW, inserte en auditoria_stock las columnas id_producto, stock_anterior y stock_nuevo con los valores OLD.id_producto, OLD.stock y NEW.stock.',
    initialCode: `-- Escribe tu disparador (Trigger) aquí\nCREATE TRIGGER `,
    expectedQuery: 'CREATE TRIGGER trg_auditoria_stock AFTER UPDATE OF stock ON productos FOR EACH ROW BEGIN INSERT INTO auditoria_stock (id_producto, stock_anterior, stock_nuevo) VALUES (OLD.id_producto, OLD.stock, NEW.stock); END;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Define CREATE TRIGGER trg_auditoria_stock AFTER UPDATE OF stock ON productos FOR EACH ROW BEGIN INSERT INTO auditoria_stock ... END;'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'CREATE TRIGGER trg_auditoria_stock\nAFTER UPDATE OF stock ON productos\nFOR EACH ROW\nBEGIN\n  INSERT INTO auditoria_stock (id_producto, stock_anterior, stock_nuevo)\n  VALUES (OLD.id_producto, OLD.stock, NEW.stock);\nEND;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El Trigger se dispara inmediatamente tras cualquier mutación del stock garantizando consistencia operacional.'
      }
    ]
  }
];
