/**
 * @file module1_dql.js
 * @description Módulo 1: Fundamentos de DQL (Proyección, Selección y Filtrado Booleano).
 * Rediseñado con el sistema de bloques modulares de micro-learning y doble ejemplo práctico.
 */

export const MODULE_1_DQL = {
  id: 'mod-1-dql',
  title: '1. Fundamentos DQL (Data Query Language)',
  description: 'Aprende a consultar la base de datos, proyectar columnas y aplicar filtros lógicos avanzados.',
  icon: 'Search',
  categoryCode: 'DQL',
  lessons: [
    {
      id: 'les-select-basics',
      title: 'Proyección y Selección: SELECT y WHERE',
      schemaId: 'universidad',
      mindmapNodeId: 'SELECT',
      summary: 'Domina la proyección de atributos y el filtrado booleano de tuplas en el motor relacional.',
      engineerPerspective: `En entornos de alto rendimiento, realizar SELECT * en tablas masivas satura la red y rompe Covering Indexes. Especifica siempre las columnas necesarias.`,
      contentMarkdown: `Proyección (SELECT) y Selección (WHERE).`,
      theoryBlocks: [
        {
          id: 'block-concept-intro',
          type: 'concept',
          title: '¿Cómo viajan y se filtran los datos?',
          content: 'Una consulta SQL fundamental divide su trabajo en dos operaciones algebraicas primarias: la Proyección (elegir qué columnas viajan a tu pantalla) y la Selección (filtrar qué registros cumplen tus condiciones lógicas en disco).',
          highlights: [
            'Proyección = SELECT (Columnas)',
            'Selección = WHERE (Filas filtradas)'
          ]
        },
        {
          id: 'block-code-basic',
          type: 'code_snippet',
          title: 'Ejemplo 1: Proyección limpia con filtro simple',
          description: 'Recuperamos únicamente el nombre y promedio de los estudiantes de Sistemas, evitando transferir campos innecesarios por la red:',
          code: `SELECT nombre, promedio
FROM estudiantes
WHERE carrera = 'Ingeniería en Sistemas';`,
          notes: 'En memoria RAM y en el socket de red solo viajan los campos solicitados explícitamente.'
        },
        {
          id: 'block-operators-grid',
          type: 'operator_grid',
          title: 'Arsenal de Operadores de Comparación',
          description: 'Herramientas lógicas para construir predicados precisos en tu cláusula WHERE:',
          items: [
            {
              badge: '=',
              name: 'Igualdad',
              syntax: "carrera = 'Sistemas'",
              desc: 'Coincidencia exacta de texto o valor numérico.'
            },
            {
              badge: '<> ó !=',
              name: 'Desigualdad',
              syntax: "carrera <> 'Derecho'",
              desc: 'Excluye los registros que coincidan con ese valor.'
            },
            {
              badge: '>= , <=',
              name: 'Comparadores',
              syntax: 'promedio >= 8.5',
              desc: 'Filtros numéricos relacionales e inclusivos.'
            },
            {
              badge: 'BETWEEN',
              name: 'Rango Cerrado',
              syntax: 'promedio BETWEEN 7.0 AND 9.0',
              desc: 'Abreviatura equivalente a (promedio >= 7.0 AND promedio <= 9.0).'
            },
            {
              badge: 'IN (...)',
              name: 'Pertenencia',
              syntax: "carrera IN ('Sistemas', 'Industrial')",
              desc: 'Evalúa coincidencia contra una lista discreta de valores.'
            },
            {
              badge: 'IS NULL',
              name: 'Ausencia de Dato',
              syntax: 'telefono IS NULL',
              desc: 'Obligatorio: en SQL, los valores vacíos nunca se comparan con =.'
            }
          ]
        },
        {
          id: 'block-alert-production',
          type: 'alert',
          variant: 'production',
          title: 'Cómo piensa un Ingeniero de Base de Datos',
          content: 'Hacer "SELECT *" en producción satura el ancho de banda y deshabilita los Covering Indexes (Índices Cubrientes), forzando al motor a hacer lecturas físicas adicionales en disco. Regla de oro: pide siempre solo las columnas que vas a procesar.'
        },
        {
          id: 'block-code-multi',
          type: 'code_snippet',
          title: 'Ejemplo 2: Filtrado compuesto con múltiples condiciones (AND / OR)',
          description: 'Combinamos predicados para aislar estudiantes sobresalientes con alto rendimiento académico:',
          code: `SELECT nombre, carrera, promedio
FROM estudiantes
WHERE carrera = 'Ingeniería en Sistemas'
  AND promedio >= 8.5;`,
          notes: 'El operador AND exige que ambas condiciones sean verdaderas simultáneamente para que la fila pase el filtro.'
        },
        {
          id: 'block-tip-execution-order',
          type: 'alert',
          variant: 'tip',
          title: 'Píldora Mental: Orden Escrito vs. Orden de Ejecución',
          content: 'Aunque escribes primero SELECT, el motor ejecuta primero el FROM (ubica la tabla), luego el WHERE (descarta filas en disco) y por último el SELECT (recorta las columnas solicitadas).'
        }
      ],
      exercises: [
        {
          id: 'ex-dql-1',
          title: 'Filtrar Estudiantes Prominentes',
          category: 'DQL',
          prompt: 'Selecciona el nombre y el promedio de los estudiantes de "Ingeniería en Sistemas" con un promedio mayor o igual a 8.5.',
          initialCode: `-- Escribe tu consulta aquí\nSELECT `,
          expectedQuery: "SELECT nombre, promedio FROM estudiantes WHERE carrera = 'Ingeniería en Sistemas' AND promedio >= 8.5;",
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Proyecta únicamente las columnas "nombre" y "promedio".'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: "SELECT nombre, promedio\nFROM estudiantes\nWHERE carrera = 'Ingeniería en Sistemas' AND promedio >= 8.5;"
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'La cláusula WHERE filtra las filas antes de retornar el conjunto final.'
            }
          ],
          explanation: {
            concept: 'El WHERE actúa como un filtro o portero: revisa cada fila y solo deja pasar a los de Sistemas con promedio mayor o igual a 8.5.',
            tip: 'El operador AND exige que se cumplan las dos condiciones juntas para que el registro aparezca.'
          }
        }
      ]
    },
    {
      id: 'les-filtering-nulls',
      title: 'Búsqueda de Patrones (LIKE) y Manejo de NULLs',
      schemaId: 'universidad',
      mindmapNodeId: 'WHERE',
      summary: 'Domina los comodines de búsqueda de texto y la lógica trivalente de valores NULL.',
      engineerPerspective: `En SQL, la comparación columna = NULL SIEMPRE evalúa a UNKNOWN. Debes usar imperativamente los operadores IS NULL o IS NOT NULL.`,
      contentMarkdown: `Operador LIKE y Manejo de NULLs.`,
      theoryBlocks: [
        {
          id: 'block-concept-like-intro',
          type: 'concept',
          title: 'Búsquedas Difusas en Cadenas de Texto',
          content: 'Cuando no conoces el texto exacto que buscas (por ejemplo, buscar nombres que comiencen con cierta letra o correos corporativos), el operador LIKE te permite escanear patrones utilizando comodines especiales.',
          highlights: [
            '% = Cero o más caracteres',
            '_ = Exactamente un solo carácter'
          ]
        },
        {
          id: 'block-like-operators-grid',
          type: 'operator_grid',
          title: 'Comodines de Búsqueda de Texto (LIKE)',
          description: 'Sintaxis y ejemplos de uso de comodines para filtrado de texto:',
          items: [
            {
              badge: "LIKE 'A%'",
              name: 'Empieza con A',
              syntax: "nombre LIKE 'A%'",
              desc: 'Encuentra "Ana", "Agustín", "Alejandro".'
            },
            {
              badge: "LIKE '%ez'",
              name: 'Termina con ez',
              syntax: "apellido LIKE '%ez'",
              desc: 'Encuentra "González", "López", "Rodríguez".'
            },
            {
              badge: "LIKE '%sql%'",
              name: 'Contiene palabra',
              syntax: "nombre_curso LIKE '%SQL%'",
              desc: 'Encuentra cualquier curso que mencione SQL en su título.'
            },
            {
              badge: "LIKE '_a%'",
              name: 'Segundo Carácter',
              syntax: "nombre LIKE '_a%'",
              desc: 'Encuentra "Carlos", "Pablo", "Manuel" (segunda letra "a").'
            }
          ]
        },
        {
          id: 'block-code-like-example',
          type: 'code_snippet',
          title: 'Ejemplo 1: Filtrar alumnos por dominio de correo electrónico',
          description: 'Recuperamos los estudiantes que utilizan una casilla académica oficial universitaria:',
          code: `SELECT nombre, email
FROM alumnos
WHERE email LIKE '%@universidad.edu.ar';`,
          notes: 'El comodín % al principio absorbe cualquier nombre de usuario antes del arroba.'
        },
        {
          id: 'block-warning-like-perf',
          type: 'alert',
          variant: 'warning',
          title: 'Precaución de Rendimiento: LIKE con comodín inicial',
          content: 'Patrones como LIKE \'%termina\' impiden que el motor de base de datos utilice índices convencionales B-Tree, forzando un Full Table Scan (escaneo completo en disco). Si necesitas búsquedas en cualquier posición sobre millones de filas, se debe usar Full-Text Search (FTS).'
        },
        {
          id: 'block-concept-nulls',
          type: 'concept',
          title: 'La Trampa de los NULLs y la Lógica Trivalente',
          content: 'Un valor NULL representa la ausencia total de información o un dato aún desconocido. En SQL existe la lógica trivalente (TRUE, FALSE, UNKNOWN). Debido a esto, la expresión "columna = NULL" NUNCA es verdadera.',
          highlights: [
            'NULL no es cero ni cadena vacía',
            'Comparar con = NULL siempre evalúa a UNKNOWN',
            'Se debe usar siempre IS NULL / IS NOT NULL'
          ]
        },
        {
          id: 'block-code-null-example',
          type: 'code_snippet',
          title: 'Ejemplo 2: Recuperar alumnos con notas pendientes de calificación',
          description: 'Encontramos las inscripciones donde el docente todavía no cargó la nota definitiva:',
          code: `SELECT id_estudiante, id_curso, nota_final
FROM inscripciones
WHERE nota_final IS NULL;`,
          notes: 'Usar "nota_final = NULL" devolvería cero filas porque nada es igual a lo desconocido.'
        },
        {
          id: 'block-tip-null-functions',
          type: 'alert',
          variant: 'tip',
          title: 'Píldora Práctica: COALESCE para valores por defecto',
          content: 'Para evitar mostrar "NULL" en pantallas de usuarios o reportes, puedes usar COALESCE(nota_final, 0), que reemplaza el valor ausente por un número o texto predeterminado.'
        }
      ],
      exercises: [
        {
          id: 'ex-dql-2',
          title: 'Filtrar Cursos sin Calificación Completa',
          category: 'DQL',
          prompt: 'Obtén el id_estudiante y la nota_final de la tabla inscripciones donde la nota_final NO sea NULL.',
          initialCode: `-- Escribe tu consulta aquí\nSELECT `,
          expectedQuery: 'SELECT id_estudiante, nota_final FROM inscripciones WHERE nota_final IS NOT NULL;',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Utiliza el operador IS NOT NULL en el predicado WHERE.'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'SELECT id_estudiante, nota_final\nFROM inscripciones\nWHERE nota_final IS NOT NULL;'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'IS NOT NULL ignora los registros pendientes de calificación.'
            }
          ],
          explanation: {
            concept: 'IS NOT NULL descarta los registros vacíos o pendientes, trayendo únicamente los alumnos que ya tienen su nota cargada.',
            tip: 'En SQL nunca se usa != NULL porque la ausencia de datos no es un valor comparable; siempre se usa IS NOT NULL.'
          }
        }
      ]
    }
  ]
};
