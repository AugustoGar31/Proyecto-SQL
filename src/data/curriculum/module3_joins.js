/**
 * @file module3_joins.js
 * @description Módulo 3: Consultas Multitabla y Relaciones (JOINs).
 * Rediseñado con el sistema de bloques modulares de micro-learning, copywriting expandido y triple ejemplo.
 */

export const MODULE_3_JOINS = {
  id: 'mod-3-joins',
  title: '3. Consultas Multitabla (JOINs & Relaciones)',
  description: 'Conecta múltiples entidades relacionales mediante Foreign Keys (INNER, LEFT, RIGHT, FULL OUTER).',
  icon: 'GitMerge',
  categoryCode: 'DQL',
  lessons: [
    {
      id: 'les-joins-basics',
      title: 'Consultas Multitabla: INNER JOIN y LEFT JOIN',
      schemaId: 'universidad',
      mindmapNodeId: 'JOIN',
      summary: 'Aprende a reconstruir información normalizada conectando tablas mediante Foreign Keys sin duplicar datos.',
      engineerPerspective: `El optimizador de consultas elige entre tres algoritmos de JOIN: Nested Loop, Hash Join y Merge Join según los índices disponibles.`,
      contentMarkdown: `INNER JOIN y LEFT JOIN.`,
      theoryBlocks: [
        {
          id: 'block-joins-concept',
          type: 'concept',
          title: '¿Por qué dividimos los datos en tablas separadas?',
          content: 'En bases de datos profesionales nunca guardamos todo en una sola tabla gigante: eso generaría nombres repetidos, desperdicio de disco e inconsistencias graves (Normalización). Las cláusulas JOIN son los puentes lógicos que unen esas piezas separadas cuando necesitas un reporte integral.',
          highlights: [
            'Normalización = Tablas limpias sin duplicación',
            'Clave Foránea (FK) = El puente conector',
            'JOIN = Reconstrucción ágil de relaciones'
          ]
        },
        {
          id: 'block-joins-grid',
          type: 'operator_grid',
          title: 'La Familia de los JOINs en SQL',
          description: 'Elige el tipo de unión según cuántas filas necesitas preservar de cada lado:',
          items: [
            {
              badge: 'INNER JOIN',
              name: 'Coincidencia Estricta',
              syntax: 'A INNER JOIN B ON A.id = B.id',
              desc: 'Solo devuelve registros que tienen pareja confirmada en ambas tablas.'
            },
            {
              badge: 'LEFT JOIN',
              name: 'Inclusivo Izquierdo',
              syntax: 'A LEFT JOIN B ON A.id = B.id',
              desc: 'Conserva TODAS las filas de la tabla izquierda, rellenando con NULL si no hay match a la derecha.'
            },
            {
              badge: 'RIGHT JOIN',
              name: 'Inclusivo Derecho',
              syntax: 'A RIGHT JOIN B ON A.id = B.id',
              desc: 'Conserva todas las filas de la derecha (poco usado, se suele reescribir como LEFT).'
            },
            {
              badge: 'FULL OUTER',
              name: 'Unión Total',
              syntax: 'A FULL JOIN B ON A.id = B.id',
              desc: 'Conserva todos los registros de ambos lados, rellenando con NULL los vacíos.'
            }
          ]
        },
        {
          id: 'block-joins-example-1',
          type: 'code_snippet',
          title: 'Ejemplo 1: INNER JOIN (Reporte de notas con match estricto)',
          description: 'Cruzamos la tabla de estudiantes con sus inscripciones para ver únicamente a quienes tienen actividad académica registrada:',
          code: `SELECT e.nombre AS estudiante, e.carrera, i.nota_final
FROM estudiantes e
INNER JOIN inscripciones i ON e.id_estudiante = i.id_estudiante;`,
          notes: 'La cláusula ON es el pegamento lógico: el motor compara los IDs de ambas tablas y descarta cualquier alumno sin inscripciones o inscripción sin alumno.'
        },
        {
          id: 'block-joins-example-2',
          type: 'code_snippet',
          title: 'Ejemplo 2: LEFT JOIN + NULL (Detectar alumnos inactivos / huérfanos)',
          description: 'Una técnica analítica indispensable: listamos a TODOS los estudiantes y filtramos con WHERE ... IS NULL para hallar a los que nunca se inscribieron:',
          code: `SELECT e.nombre AS estudiante, e.carrera, i.id_curso
FROM estudiantes e
LEFT JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
WHERE i.id_curso IS NULL;`,
          notes: 'LEFT JOIN garantiza que ningún estudiante quede fuera del escaneo. Si en la tabla derecha no existe registro, SQL inyecta NULL, permitiéndote identificar alumnos inactivos.'
        },
        {
          id: 'block-joins-example-3',
          type: 'code_snippet',
          title: 'Ejemplo 3: Encadenamiento Multitabla (Estudiante → Inscripción → Curso)',
          description: 'Navegamos a través de una tabla intermedia de muchos-a-muchos para obtener el nombre real de cada materia cursada:',
          code: `SELECT e.nombre AS estudiante, c.nombre_curso, i.nota_final
FROM estudiantes e
INNER JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
INNER JOIN cursos c ON i.id_curso = c.id_curso
WHERE i.nota_final >= 7.0;`,
          notes: 'Puedes encadenar tantos JOINs como requiera tu modelo relacional. Cada JOIN expande una dimensión sin alterar la lógica de filtrado del WHERE.'
        },
        {
          id: 'block-joins-alert-prod',
          type: 'alert',
          variant: 'production',
          title: 'Cómo piensa un Ingeniero de Base de Datos: Algoritmos de JOIN',
          content: 'Detrás de escena, el motor relacional analiza el tamaño de tus tablas y los índices para elegir entre 3 algoritmos físicos: 1) Nested Loop (ideal para tablas con índices B-Tree), 2) Hash Join (construye una tabla hash en memoria RAM para tablas masivas sin índices) o 3) Merge Join (si ambas tablas ya están ordenadas).'
        },
        {
          id: 'block-joins-alert-warning',
          type: 'alert',
          variant: 'warning',
          title: 'Peligro en Producción: El Producto Cartesiano Accidental',
          content: 'Si olvidas la cláusula ON o cometes un error en el predicado de unión, el motor multiplicará cada fila de la tabla A por cada fila de la tabla B (CROSS JOIN). En tablas de 10.000 clientes y 10.000 pedidos, generarías 100.000.000 de filas en memoria, congelando la base de datos.'
        }
      ],
      exercises: [
        {
          id: 'ex-join-1',
          title: 'Reporte Completo de Inscripciones',
          category: 'DQL',
          prompt: 'Genera un reporte con el nombre del estudiante (alias "estudiante"), nombre del curso (alias "curso") y nota final (alias "nota").',
          initialCode: `-- Escribe tu consulta aquí\nSELECT `,
          expectedQuery: 'SELECT e.nombre AS estudiante, c.nombre_curso AS curso, i.nota_final AS nota FROM estudiantes e JOIN inscripciones i ON e.id_estudiante = i.id_estudiante JOIN cursos c ON i.id_curso = c.id_curso;',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Relaciona e.id_estudiante = i.id_estudiante e i.id_curso = c.id_curso.'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'SELECT e.nombre AS estudiante, c.nombre_curso AS curso, i.nota_final AS nota\nFROM estudiantes e\nJOIN inscripciones i ON e.id_estudiante = i.id_estudiante\nJOIN cursos c ON i.id_curso = c.id_curso;'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'El doble JOIN resuelve la relación entre estudiantes, cursos e inscripciones.'
            }
          ],
          explanation: {
            concept: 'El JOIN es como encastrar piezas de un rompecabezas: usa los IDs compartidos para unir estudiantes, sus notas y el nombre del curso en una sola fila.',
            tip: 'Cada JOIN necesita su cláusula ON indicando qué columna de la tabla A coincide exactamente con la columna de la tabla B.'
          }
        }
      ]
    }
  ]
};
