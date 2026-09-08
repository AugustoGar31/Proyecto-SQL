/**
 * @file module5_window.js
 * @description Módulo 5: Funciones de Ventana (Window Functions / Analytics SQL).
 */

export const MODULE_5_WINDOW = {
  id: 'mod-5-window',
  title: '5. Funciones de Ventana (Analytics SQL)',
  description: 'Calcula rankings, totales acumulados y promedios móviles sin colapsar las filas de la consulta (OVER, PARTITION BY).',
  icon: 'TrendingUp',
  categoryCode: 'DQL',
  lessons: [
    {
      id: 'les-window-functions',
      title: 'Ranking y Particionamiento: ROW_NUMBER() y OVER()',
      schemaId: 'universidad',
      mindmapNodeId: 'OVER',
      summary: 'Las funciones de ventana operan sobre un conjunto de filas relacionadas sin colapsar el número de tuplas retornadas.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
A diferencia de GROUP BY que reduce $N$ filas a $1$ fila por grupo, OVER() calcula métricas analíticas manteniendo las $N$ filas intactas. Es la herramienta principal para informes financieros y analítica avanzada.
      `,
      contentMarkdown: `
\`\`\`sql
SELECT nombre, carrera, promedio,
       ROW_NUMBER() OVER(PARTITION BY carrera ORDER BY promedio DESC) AS ranking_carrera
FROM estudiantes;
\`\`\`
      `,
      exercises: [
        {
          id: 'ex-win-1',
          title: 'Ranking de Estudiantes por Carrera',
          category: 'DQL',
          prompt: 'Obtén nombre, carrera, promedio y asigna un ranking por carrera usando ROW_NUMBER() OVER(PARTITION BY carrera ORDER BY promedio DESC) con el alias "ranking".',
          initialCode: `-- Escribe tu consulta aquí
SELECT nombre, carrera, promedio,
       ROW_NUMBER() OVER(PARTITION BY carrera ORDER BY promedio DESC) AS ranking
FROM estudiantes;`,
          expectedQuery: 'SELECT nombre, carrera, promedio, ROW_NUMBER() OVER(PARTITION BY carrera ORDER BY promedio DESC) AS ranking FROM estudiantes;',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Usa PARTITION BY carrera dentro de la cláusula OVER() y ordena por promedio DESC.'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'SELECT nombre, carrera, promedio, ROW_NUMBER() OVER(PARTITION BY carrera ORDER BY promedio DESC) AS ranking FROM estudiantes;'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'PARTITION BY divide el conjunto en sub-ventanas independientes por carrera sin colapsar las tuplas.'
            }
          ],
          explanation: {
            concept: 'PARTITION BY divide el conjunto en sub-ventanas independientes por carrera.',
            underTheHood: '⚡ Bajo el Capó: El motor aplica un Window Aggregate Operator sobre los datos previamente ordenados por el buffer.'
          }
        }
      ]
    }
  ]
};
