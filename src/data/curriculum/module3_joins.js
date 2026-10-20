/**
 * @file module3_joins.js
 * @description Módulo 3: Consultas Multitabla y Relaciones (JOINs).
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
      title: 'Combinación Relacional: INNER JOIN y LEFT JOIN',
      schemaId: 'universidad',
      mindmapNodeId: 'JOIN',
      summary: 'Reconstruye entidades normalizadas uniendo filas coincidentes o conservando registros de la tabla izquierda.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
El optimizador de consultas elige entre tres algoritmos de JOIN:
1. **Nested Loop Join**: Tablas pequeñas o con índices únicos en la clave de unión.
2. **Hash Join**: Para tablas grandes sin orden preexistente.
3. **Sort-Merge Join**: Cuando ambas entradas están previamente ordenadas por el índice.
      `,
      contentMarkdown: `
#### Tipos de JOIN:
* **INNER JOIN**: Retorna solo donde hay coincidencia en ambas tablas.
* **LEFT JOIN**: Conserva todas las filas de la tabla izquierda e inserta NULL si no hay match a la derecha.

\`\`\`sql
SELECT e.nombre AS estudiante, c.nombre_curso AS curso, i.nota_final AS nota
FROM estudiantes e
INNER JOIN inscripciones i ON e.id_estudiante = i.id_estudiante
INNER JOIN cursos c ON i.id_curso = c.id_curso;
\`\`\`
      `,
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
