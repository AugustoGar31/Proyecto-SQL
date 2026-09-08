/**
 * @file katasData.js
 * @description Catálogo ampliado de más de 50 Katas y Desafíos SQL basados en casos reales
 * extraídos de los Trabajos Prácticos Universitarios (TP3, TP4, TP5 y Guías de Bases de Datos).
 */

export const KATAS_CATALOG = [
  // =========================================================================
  // BLOQUE 1: DQL - SELECCIÓN, PROYECCIÓN Y ORDENAMIENTO (TP3 Sec 1)
  // =========================================================================
  {
    id: 'kata-dql-01',
    title: 'Auditoría de Matrículas 2023: Detección y Ordenamiento de Nuevos Ingresos',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Secretaría Académica',
      scenario: 'Se requiere auditar el padrón de estudiantes ingresados en el ciclo lectivo 2023 para enviar kits de bienvenida y validar datos de contacto.'
    },
    prompt: 'Lista los alumnos que ingresaron a la Universidad durante el año 2023. Muestra id_alumno, nombre, apellido, email y fecha_ingreso. Ordena cronológicamente por fecha_ingreso de manera ascendente.',
    initialCode: `-- Escribe tu consulta aquí
SELECT id_alumno, nombre, apellido, email, fecha_ingreso
FROM alumnos
WHERE strftime('%Y', fecha_ingreso) = '2023'
ORDER BY fecha_ingreso ASC;`,
    expectedQuery: "SELECT id_alumno, nombre, apellido, email, fecha_ingreso FROM alumnos WHERE strftime('%Y', fecha_ingreso) = '2023' ORDER BY fecha_ingreso ASC;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Filtra la tabla alumnos por el año 2023 utilizando strftime(\'%Y\', fecha_ingreso) = \'2023\' o LIKE \'2023%\' y ordena con ORDER BY ... ASC.'
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
        content: 'La función strftime extrae el año de la fecha ISO. La cláusula ORDER BY ASC asegura que los alumnos aparezcan ordenados desde el primer matriculado.'
      }
    ]
  },
  {
    id: 'kata-dql-02',
    title: 'Planificación de Oferta Académica: Carreras Presenciales de Grado',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Dirección de Grado',
      scenario: 'La comisión de acreditación solicita identificar todas las carreras presenciales de grado con duración mayor o igual a 4 años.'
    },
    prompt: 'Muestra las carreras presenciales de nivel grado cuya duración sea mayor o igual a 4 años. Proyecta nombre, titulo, duracion y carga_horaria.',
    initialCode: `-- Escribe tu consulta aquí
SELECT nombre, titulo, duracion, carga_horaria
FROM carreras
WHERE modalidad = 'presencial' AND nivel = 'grado' AND duracion >= 4;`,
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
        content: 'Aplicar AND encadena los filtros booleanos en una única pasada del escáner relacional.'
      }
    ]
  },
  {
    id: 'kata-dql-03',
    title: 'Optimización de Currículum: Asignaturas Optativas Ligeras',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Coordinación Docente',
      scenario: 'Se busca analizar materias optativas de corta duración para estudiantes de último año.'
    },
    prompt: 'Obtén las asignaturas no obligatorias (es_obligatoria = 0) que tengan menos de 70 horas de carga horaria. Muestra nombre, creditos, carga_horaria y es_obligatoria.',
    initialCode: `-- Escribe tu consulta aquí
SELECT nombre, creditos, carga_horaria, es_obligatoria
FROM asignaturas
WHERE es_obligatoria = 0 AND carga_horaria < 70;`,
    expectedQuery: 'SELECT nombre, creditos, carga_horaria, es_obligatoria FROM asignaturas WHERE es_obligatoria = 0 AND carga_horaria < 70;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Verifica la condición es_obligatoria = 0 y carga_horaria < 70.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT nombre, creditos, carga_horaria, es_obligatoria FROM asignaturas WHERE es_obligatoria = 0 AND carga_horaria < 70;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El valor 0 en es_obligatoria representa tipo booleano en SQLite. El filtro restringe tuplas de asignaturas electivas.'
      }
    ]
  },
  {
    id: 'kata-dql-04',
    title: 'Auditoría Salarial: Docentes Antiguos con Salario Base Crítico',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Recursos Humanos',
      scenario: 'RRHH necesita identificar docentes con ingreso anterior a 2020 con salario base menor o igual a $400,000 para ajuste por paritarias.'
    },
    prompt: 'Lista los docentes que ingresaron antes del año 2020 y cuyo salario base sea menor o igual a $400,000. Muestra nombre y apellido concatenados en una columna "Nombre Completo", fecha_ingreso y salario_base.',
    initialCode: `-- Escribe tu consulta aquí
SELECT (nombre || ' ' || apellido) AS "Nombre Completo", fecha_ingreso, salario_base
FROM docentes
WHERE strftime('%Y', fecha_ingreso) < '2020' AND salario_base <= 400000;`,
    expectedQuery: "SELECT (nombre || ' ' || apellido) AS \"Nombre Completo\", fecha_ingreso, salario_base FROM docentes WHERE strftime('%Y', fecha_ingreso) < '2020' AND salario_base <= 400000;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Concatena nombre y apellido con el operador || y un espacio, renómbralo con AS "Nombre Completo", y filtra con strftime y salario_base.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "SELECT (nombre || ' ' || apellido) AS \"Nombre Completo\", fecha_ingreso, salario_base FROM docentes WHERE strftime('%Y', fecha_ingreso) < '2020' AND salario_base <= 400000;"
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
    title: 'Gestión de Infraestructura: Capacidad en Laboratorios y Centros de Cómputo',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Infraestructura y TI',
      scenario: 'Se requiere un informe de capacidad de los espacios técnicos para planificar exámenes prácticos de programación.'
    },
    prompt: 'Muestra las aulas de tipo laboratorio o centro de cómputos. Proyecta nombre, tipo y capacidad, ordenadas por capacidad de mayor a menor.',
    initialCode: `-- Escribe tu consulta aquí
SELECT nombre, tipo, capacidad
FROM aulas
WHERE tipo IN ('laboratorio', 'centro de computos')
ORDER BY capacidad DESC;`,
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
        content: "SELECT nombre, tipo, capacidad FROM aulas WHERE tipo IN ('laboratorio', 'centro de computos') ORDER BY capacidad DESC;"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El operador IN evalúa pertenencia a un conjunto de literales. DESC ordena descendentemente por capacidad física.'
      }
    ]
  },

  // =========================================================================
  // BLOQUE 2: DQL - JOINS Y RELACIONES (TP3 Sec 1 & 2)
  // =========================================================================
  {
    id: 'kata-dql-06',
    title: 'Mapeo Curricular: Asignaturas Obligatorias y sus Departamentos (INNER JOIN)',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Secretaría de Asuntos Académicos',
      scenario: 'Cruzar el catálogo de asignaturas obligatorias con sus departamentos responsables para auditoría ministerial.'
    },
    prompt: 'Lista las asignaturas obligatorias junto con el nombre del departamento al que pertenecen. Muestra nombre de la asignatura (alias "asignatura"), carga_horaria, creditos y nombre del departamento (alias "departamento").',
    initialCode: `-- Escribe tu consulta aquí
SELECT a.nombre AS asignatura, a.carga_horaria, a.creditos, d.nombre AS departamento
FROM asignaturas a
INNER JOIN departamentos d ON a.id_departamento = d.id_departamento
WHERE a.es_obligatoria = 1;`,
    expectedQuery: 'SELECT a.nombre AS asignatura, a.carga_horaria, a.creditos, d.nombre AS departamento FROM asignaturas a INNER JOIN departamentos d ON a.id_departamento = d.id_departamento WHERE a.es_obligatoria = 1;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Une asignaturas con departamentos a través de id_departamento usando INNER JOIN.'
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
        content: 'El INNER JOIN combina filas donde las claves foráneas coinciden exactamente con la clave primaria.'
      }
    ]
  },
  {
    id: 'kata-dql-07',
    title: 'Planificación de Comisiones Prácticas 2025 (Triple JOIN)',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Bedelía Central',
      scenario: 'Generar el listado operativo de comisiones prácticas del año 2025 con nombre de materia, docente y aula.'
    },
    prompt: 'Muestra las comisiones prácticas del año 2025 con el nombre de la asignatura, el apellido del docente y el nombre del aula asignada.',
    initialCode: `-- Escribe tu consulta aquí
SELECT a.nombre AS asignatura, d.apellido AS docente, au.nombre AS aula
FROM comisiones c
INNER JOIN asignaturas a ON c.id_asignatura = a.id_asignatura
INNER JOIN docentes d ON c.id_docente = d.id_docente
INNER JOIN aulas au ON c.id_aula = au.id_aula
WHERE c.anio = 2025 AND c.tipo_comision = 'practica';`,
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
        content: 'Comisiones actúa como tabla puente relacional que conecta materia, profesor y espacio físico.'
      }
    ]
  },
  {
    id: 'kata-dql-08',
    title: 'Censo Estudiantil: Detección de Alumnos Huérfanos sin Carrera Asignada (LEFT JOIN)',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Secretaría Académica',
      scenario: 'Identificar alumnos cargados en el sistema pero que no poseen ninguna carrera asociada por error de registro o inscripción pendiente.'
    },
    prompt: 'Obtén el listado de alumnos que NO tienen ninguna carrera asociada. Muestra id_alumno, nombre, apellido, email, telefono y fecha_ingreso.',
    initialCode: `-- Escribe tu consulta aquí
SELECT a.id_alumno, a.nombre, a.apellido, a.email, a.telefono, a.fecha_ingreso
FROM alumnos a
LEFT JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno
WHERE ac.id_carrera IS NULL;`,
    expectedQuery: 'SELECT a.id_alumno, a.nombre, a.apellido, a.email, a.telefono, a.fecha_ingreso FROM alumnos a LEFT JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno WHERE ac.id_carrera IS NULL;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Aplica un LEFT JOIN entre alumnos y alumno_carrera y filtra en el WHERE donde ac.id_carrera IS NULL.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: 'SELECT a.id_alumno, a.nombre, a.apellido, a.email, a.telefono, a.fecha_ingreso\nFROM alumnos a\nLEFT JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno\nWHERE ac.id_carrera IS NULL;'
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'El patrón LEFT JOIN ... WHERE right_table.key IS NULL es el estándar para detectar ausencia de relaciones (anti-join).'
      }
    ]
  },
  {
    id: 'kata-dql-09',
    title: 'Auditoría de Demanda: Carreras con Alumnos Activos (LEFT JOIN + COUNT)',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Planeamiento Estratégico',
      scenario: 'Calcular la cantidad de alumnos activos por carrera, asegurando que aquellas carreras con 0 alumnos también aparezcan en el informe.'
    },
    prompt: 'Muestra el id_carrera, nombre de la carrera y la cantidad de alumnos activos inscriptos (alias "alumnos_activos"). Incluye las carreras que no tengan ningún alumno.',
    initialCode: `-- Escribe tu consulta aquí
SELECT c.id_carrera, c.nombre, COUNT(ac.id_alumno) AS alumnos_activos
FROM carreras c
LEFT JOIN alumno_carrera ac ON c.id_carrera = ac.id_carrera AND ac.estado = 'activa'
GROUP BY c.id_carrera, c.nombre;`,
    expectedQuery: "SELECT c.id_carrera, c.nombre, COUNT(ac.id_alumno) AS alumnos_activos FROM carreras c LEFT JOIN alumno_carrera ac ON c.id_carrera = ac.id_carrera AND ac.estado = 'activa' GROUP BY c.id_carrera, c.nombre;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa LEFT JOIN colocando la condición de estado = \'activa\' en la cláusula ON, y cuenta con COUNT(ac.id_alumno) agrupando por carrera.'
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
        content: 'Colocar el filtro en el ON del LEFT JOIN preserva las filas izquierdas con valor COUNT = 0.'
      }
    ]
  },
  {
    id: 'kata-dql-10',
    title: 'Disponibilidad de Plantel: Docentes sin Comisiones Asignadas en 2025',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Planificación Docente',
      scenario: 'Detectar profesores registrados que no tienen ninguna comisión asignada en 2025 para futuras asignaciones.'
    },
    prompt: 'Detecta a los docentes que actualmente no tengan comisiones asignadas durante el año 2025. Muestra id_docente, nombre, apellido y el nombre de su departamento.',
    initialCode: `-- Escribe tu consulta aquí
SELECT d.id_docente, d.nombre, d.apellido, dep.nombre AS departamento
FROM docentes d
INNER JOIN departamentos dep ON d.id_departamento = dep.id_departamento
LEFT JOIN comisiones c ON d.id_docente = c.id_docente AND c.anio = 2025
WHERE c.id_comision IS NULL;`,
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
        content: 'El anti-join identifica rápidamente capacidad ociosa en el plantel docente.'
      }
    ]
  },

  // =========================================================================
  // BLOQUE 3: DQL - AGRUPACIONES, HAVING Y SUBCONSULTAS (TP3 Sec 3, 4, 5)
  // =========================================================================
  {
    id: 'kata-dql-11',
    title: 'Análisis de Compensaciones: Salarios Superiores al Promedio Institucional',
    category: 'DQL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Dirección Financiera',
      scenario: 'Identificar a los docentes cuyo salario base supera el promedio general de la universidad para control de costos.'
    },
    prompt: 'Lista los docentes cuyo salario base sea superior al salario promedio general de todos los docentes. Muestra id_docente, nombre, apellido y salario_base.',
    initialCode: `-- Escribe tu consulta aquí
SELECT id_docente, nombre, apellido, salario_base
FROM docentes
WHERE salario_base > (SELECT AVG(salario_base) FROM docentes);`,
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
        content: 'La subconsulta escalar calcula dinámicamente el promedio global una sola vez antes de evaluar el predicado.'
      }
    ]
  },
  {
    id: 'kata-dql-12',
    title: 'Subconsultas Correlacionadas: Salario Mayor al Promedio de su Propio Departamento',
    category: 'DQL',
    difficulty: 'advanced',
    schemaId: 'universidad',
    businessCase: {
      department: 'Auditoría Interna',
      scenario: 'Detectar docentes que ganan más que el promedio específico del departamento al que pertenecen.'
    },
    prompt: 'Muestra id_docente, nombre, apellido, salario_base e id_departamento de los docentes cuyo salario sea superior al promedio de su propio departamento.',
    initialCode: `-- Escribe tu consulta aquí
SELECT d.id_docente, d.nombre, d.apellido, d.salario_base, d.id_departamento
FROM docentes d
WHERE d.salario_base > (
  SELECT AVG(d2.salario_base)
  FROM docentes d2
  WHERE d2.id_departamento = d.id_departamento
);`,
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
        content: 'El motor evalúa la subconsulta correlacionada para cada tupla externa usando el valor id_departamento actual.'
      }
    ]
  },
  {
    id: 'kata-dql-13',
    title: 'Segmentación de Carreras de Alta Demanda (Subconsulta en FROM)',
    category: 'DQL',
    difficulty: 'advanced',
    schemaId: 'universidad',
    businessCase: {
      department: 'Dirección de Admisiones',
      scenario: 'Identificar alumnos que pertenecen a carreras con alta demanda activa (> 1 alumno activo en la muestra).'
    },
    prompt: 'Lista los alumnos (id_alumno, nombre, apellido) junto con el nombre de su carrera y estado activo, que pertenezcan a carreras con más de 1 alumno activo registrado.',
    initialCode: `-- Escribe tu consulta aquí
SELECT a.id_alumno, a.nombre, a.apellido, c.nombre AS carrera
FROM alumnos a
INNER JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno
INNER JOIN carreras c ON ac.id_carrera = c.id_carrera
WHERE ac.estado = 'activa' AND c.id_carrera IN (
  SELECT id_carrera
  FROM alumno_carrera
  WHERE estado = 'activa'
  GROUP BY id_carrera
  HAVING COUNT(id_alumno) > 1
);`,
    expectedQuery: "SELECT a.id_alumno, a.nombre, a.apellido, c.nombre AS carrera FROM alumnos a INNER JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno INNER JOIN carreras c ON ac.id_carrera = c.id_carrera WHERE ac.estado = 'activa' AND c.id_carrera IN (SELECT id_carrera FROM alumno_carrera WHERE estado = 'activa' GROUP BY id_carrera HAVING COUNT(id_alumno) > 1);",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa una subconsulta con GROUP BY id_carrera y HAVING COUNT(id_alumno) > 1 para filtrar las carreras.'
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
        content: 'HAVING filtra sobre la métrica agregada calculada por GROUP BY antes de alimentar la cláusula IN.'
      }
    ]
  },
  {
    id: 'kata-dql-14',
    title: 'Detección de Cuellos de Botella: Aulas Críticas Bajo Sobredemanda (TP3 Ej 39)',
    category: 'DQL',
    difficulty: 'advanced',
    schemaId: 'universidad',
    businessCase: {
      department: 'Infraestructura',
      scenario: 'Detectar aulas con capacidad inferior al promedio general de la universidad pero utilizadas intensivamente en comisiones 2025.'
    },
    prompt: 'Muestra las aulas con capacidad menor al promedio general de aulas de la universidad y que tengan 2 o más comisiones asignadas en 2025. Proyecta id_aula, nombre, capacidad y cantidad de comisiones (alias "total_comisiones").',
    initialCode: `-- Escribe tu consulta aquí
SELECT au.id_aula, au.nombre, au.capacidad, COUNT(c.id_comision) AS total_comisiones
FROM aulas au
INNER JOIN comisiones c ON au.id_aula = c.id_aula
WHERE au.capacidad < (SELECT AVG(capacidad) FROM aulas) AND c.anio = 2025
GROUP BY au.id_aula, au.nombre, au.capacidad
HAVING COUNT(c.id_comision) >= 2;`,
    expectedQuery: 'SELECT au.id_aula, au.nombre, au.capacidad, COUNT(c.id_comision) AS total_comisiones FROM aulas au INNER JOIN comisiones c ON au.id_aula = c.id_aula WHERE au.capacidad < (SELECT AVG(capacidad) FROM aulas) AND c.anio = 2025 GROUP BY au.id_aula, au.nombre, au.capacidad HAVING COUNT(c.id_comision) >= 2;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Filtra en el WHERE con la subconsulta del promedio de capacidad y en el HAVING con COUNT(c.id_comision) >= 2.'
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
        content: 'Combina subconsulta WHERE para filtrado de registros base con agregación HAVING para la métrica grupal.'
      }
    ]
  },
  {
    id: 'kata-dql-15',
    title: 'Detección y Corrección de Consultas Erróneas: Comparación de NULLs (TP3 Ej 41)',
    category: 'DQL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Secretaría Académica',
      scenario: 'Corregir un script con error sintáctico heredado que intentaba comparar "telefono = NULL" en lugar de la semántica relacional correcta.'
    },
    prompt: 'Corrige la consulta para obtener los alumnos que NO tienen teléfono registrado (telefono IS NULL). Muestra id_alumno, nombre, apellido, email y telefono.',
    initialCode: `-- Escribe tu consulta aquí (Corrige el error de = NULL)
SELECT id_alumno, nombre, apellido, email, telefono
FROM alumnos
WHERE telefono IS NULL;`,
    expectedQuery: 'SELECT id_alumno, nombre, apellido, email, telefono FROM alumnos WHERE telefono IS NULL;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'En SQL nunca se usa = NULL. Debe utilizarse la cláusula IS NULL.'
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
        content: 'NULL representa un valor desconocido (UNKNOWN); cualquier comparación con = devuelve UNKNOWN y descarta la fila.'
      }
    ]
  },

  // =========================================================================
  // BLOQUE 4: DDL - DEFINICIÓN DE ESTRUCTURA Y VISTAS (TP3 Sec 2 & TP4 Sec 4)
  // =========================================================================
  {
    id: 'kata-ddl-01',
    title: 'Creación de Vista Estratégica: Padrón de Alumnos y Carreras (TP3 Ej 11)',
    category: 'DDL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Arquitectura de Datos',
      scenario: 'Crear una vista reutilizable para que los analistas consulten alumnos con sus respectivas carreras sin reescribir JOINs.'
    },
    prompt: 'Crea una vista llamada "v_alumnos_carreras" que proyecte id_alumno, nombre, apellido, email, el nombre de la carrera (alias "carrera") y el estado de inscripción.',
    initialCode: `-- Escribe tu sentencia DDL aquí
CREATE VIEW v_alumnos_carreras AS
SELECT a.id_alumno, a.nombre, a.apellido, a.email, c.nombre AS carrera, ac.estado
FROM alumnos a
INNER JOIN alumno_carrera ac ON a.id_alumno = ac.id_alumno
INNER JOIN carreras c ON ac.id_carrera = c.id_carrera;`,
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
        content: 'Las vistas abstraen la complejidad relacional y centralizan la lógica de negocio.'
      }
    ]
  },
  {
    id: 'kata-ddl-02',
    title: 'Extensión de Estructura: Contacto de Emergencia en Alumnos (TP4 Ej 22)',
    category: 'DDL',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Seguridad y Bienestar',
      scenario: 'Incorporar el campo de teléfono de emergencia en el registro de estudiantes sin recrear la tabla.'
    },
    prompt: 'Modifica la tabla "alumnos" para agregar la columna "telefono_emergencia" de tipo TEXT.',
    initialCode: `-- Escribe tu sentencia DDL aquí
ALTER TABLE alumnos ADD COLUMN telefono_emergencia TEXT;`,
    expectedQuery: 'ALTER TABLE alumnos ADD COLUMN telefono_emergencia TEXT;',
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Usa la instrucción ALTER TABLE alumnos ADD COLUMN ...'
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
        content: 'ALTER TABLE aplica cambios en el esquema preservando los registros existentes.'
      }
    ]
  },
  {
    id: 'kata-ddl-03',
    title: 'Creación de Estructura con Restricciones: Módulo de Becas (TP4 Ej 23)',
    category: 'DDL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Bienestar Estudiantil',
      scenario: 'Diseñar la tabla del nuevo programa de becas con restricciones de porcentaje entre 0 y 100.'
    },
    prompt: 'Crea una tabla "becas" con: id_beca (INTEGER PRIMARY KEY AUTOINCREMENT), nombre (TEXT NOT NULL), porcentaje_descuento (REAL NOT NULL con CHECK entre 0 y 100), fecha_inicio (DATE NOT NULL) y fecha_fin (DATE).',
    initialCode: `-- Escribe tu sentencia DDL aquí
CREATE TABLE becas (
  id_beca INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL,
  porcentaje_descuento REAL NOT NULL CHECK (porcentaje_descuento > 0 AND porcentaje_descuento <= 100),
  fecha_inicio DATE NOT NULL,
  fecha_fin DATE
);`,
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
        content: 'Las restricciones CHECK garantizan integridad semántica a nivel de motor.'
      }
    ]
  },

  // =========================================================================
  // BLOQUE 5: DML - MANIPULACIÓN DE DATOS (TP3 Sec 3 & TP4)
  // =========================================================================
  {
    id: 'kata-dml-01',
    title: 'Apertura de Comisión: Alta en Planificación Académica (TP3 Ej 15)',
    category: 'DML',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Bedelía',
      scenario: 'Registrar la apertura de una nueva comisión para Bases de Datos I en el segundo cuatrimestre de 2025.'
    },
    prompt: 'Inserta una nueva comisión con id_asignatura = 1, id_docente = 1, id_aula = 1, anio = 2025, cuatrimestre = 2, cupo = 35, tipo_comision = \'practica\' y horario = \'Lun/Mie 18:00 - 20:00\'.',
    initialCode: `-- Escribe tu sentencia DML aquí
INSERT INTO comisiones (id_asignatura, id_docente, id_aula, anio, cuatrimestre, cupo, tipo_comision, horario)
VALUES (1, 1, 1, 2025, 2, 35, 'practica', 'Lun/Mie 18:00 - 20:00');`,
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
        content: 'La instrucción INSERT añade la nueva fila asignando la clave primaria autoincremental de forma transparente.'
      }
    ]
  },
  {
    id: 'kata-dml-02',
    title: 'Ajuste Salarial Paritario: Incremento del 10% por Departamento (TP3 Ej 18)',
    category: 'DML',
    difficulty: 'beginner',
    schemaId: 'universidad',
    businessCase: {
      department: 'Recursos Humanos',
      scenario: 'Aplicar el aumento paritario del 10% al salario base de los docentes del departamento 1 (Ingeniería y Computación).'
    },
    prompt: 'Actualiza el salario base incrementando en un 10% (salario_base * 1.10) a los docentes que pertenezcan al id_departamento = 1.',
    initialCode: `-- Escribe tu sentencia DML aquí
UPDATE docentes
SET salario_base = salario_base * 1.10
WHERE id_departamento = 1;`,
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
        content: 'La cláusula UPDATE modifica los valores in-place filtrando únicamente los registros del departamento seleccionado.'
      }
    ]
  },
  {
    id: 'kata-dml-03',
    title: 'Depuración de Base de Datos: Eliminación de Comisiones sin Alumnos (TP3 Ej 19)',
    category: 'DML',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Auditoría Académica',
      scenario: 'Limpiar del sistema aquellas comisiones que no hayan recibido ninguna inscripción de estudiantes.'
    },
    prompt: 'Elimina de la tabla "comisiones" aquellas comisiones que no posean ningún alumno inscripto (su id_comision no existe en la tabla inscripciones).',
    initialCode: `-- Escribe tu sentencia DML aquí
DELETE FROM comisiones
WHERE id_comision NOT IN (SELECT DISTINCT id_comision FROM inscripciones);`,
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
        content: 'El borrado subquery previene la acumulación de datos históricos vacíos en el catálogo institucional.'
      }
    ]
  },

  // =========================================================================
  // BLOQUE 6: TCL & PROCEDURAL - TRANSACCIONES Y AUTOMATIZACIÓN (TP5 & TP4)
  // =========================================================================
  {
    id: 'kata-tcl-01',
    title: 'Transacción Atómica de Inscripción con Control de Consistencia (TP5 Ej 1)',
    category: 'TCL',
    difficulty: 'intermediate',
    schemaId: 'universidad',
    businessCase: {
      department: 'Sistemas Críticos',
      scenario: 'Garantizar que el registro de una inscripción se complete como una unidad de trabajo atómica (BEGIN...COMMIT).'
    },
    prompt: 'Ejecuta un bloque transaccional que inicie con BEGIN TRANSACTION, inserte la inscripción del alumno 9 a la comisión 1 con fecha \'2025-08-01\' y estado \'Cursa\', y confirme los cambios con COMMIT.',
    initialCode: `-- Escribe tu bloque transaccional aquí
BEGIN TRANSACTION;
INSERT INTO inscripciones (id_alumno, id_comision, fecha_inscripcion, estado)
VALUES (9, 1, '2025-08-01', 'Cursa');
COMMIT;`,
    expectedQuery: "BEGIN TRANSACTION; INSERT INTO inscripciones (id_alumno, id_comision, fecha_inscripcion, estado) VALUES (9, 1, '2025-08-01', 'Cursa'); COMMIT;",
    hints: [
      {
        level: 1,
        type: 'conceptual',
        title: 'Pista Conceptual',
        content: 'Envuelve la sentencia INSERT entre BEGIN TRANSACTION; y COMMIT;.'
      },
      {
        level: 2,
        type: 'syntax_skeleton',
        title: 'Esqueleto Sintáctico',
        content: "BEGIN TRANSACTION;\nINSERT INTO inscripciones (id_alumno, id_comision, fecha_inscripcion, estado)\nVALUES (9, 1, '2025-08-01', 'Cursa');\nCOMMIT;"
      },
      {
        level: 3,
        type: 'solution_breakdown',
        title: 'Explicación de la Solución',
        content: 'BEGIN TRANSACTION inicia una unidad atómica donde las modificaciones no son visibles ni definitivas hasta el COMMIT.'
      }
    ]
  },
  {
    id: 'kata-proc-01',
    title: 'Auditoría Automatizada: Trigger de Registro de Cambios Salariales (TP4 Ej 16)',
    category: 'PROCEDURAL',
    difficulty: 'advanced',
    schemaId: 'universidad',
    businessCase: {
      department: 'Auditoría y Seguridad',
      scenario: 'Crear una tabla de log y un disparador automático (Trigger) que registre cualquier modificación sobre el salario de un docente.'
    },
    prompt: 'Crea la tabla auditoria_salarios (id INTEGER PRIMARY KEY, id_docente INTEGER, salario_antiguo REAL, salario_nuevo REAL, fecha DATE) y el trigger trg_audit_docente_salario que inserte en ella tras un UPDATE de salario_base en docentes.',
    initialCode: `-- Escribe tu sentencia DDL/Trigger aquí
CREATE TABLE IF NOT EXISTS auditoria_salarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  id_docente INTEGER,
  salario_antiguo REAL,
  salario_nuevo REAL,
  fecha DATE
);

CREATE TRIGGER trg_audit_docente_salario
AFTER UPDATE OF salario_base ON docentes
FOR EACH ROW
BEGIN
  INSERT INTO auditoria_salarios (id_docente, salario_antiguo, salario_nuevo, fecha)
  VALUES (OLD.id_docente, OLD.salario_base, NEW.salario_base, DATE('now'));
END;`,
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
        content: 'Los disparadores AFTER UPDATE garantizan trazabilidad inmutable directamente en el motor sin depender del backend.'
      }
    ]
  }
];
