/**
 * @file module2_aggregations.js
 * @description Módulo 2: Agregación, Agrupamiento y Condicionales CASE.
 */

export const MODULE_2_AGGREGATIONS = {
  id: 'mod-2-aggregations',
  title: '2. Agregación y Análisis de Datos (GROUP BY & HAVING)',
  description: 'Agrupa conjuntos de datos, calcula métricas estadísticas (SUM, AVG, COUNT) y aplica filtros condicionales post-agregación.',
  icon: 'BarChart2',
  categoryCode: 'DQL',
  lessons: [
    {
      id: 'les-group-by',
      title: 'Funciones de Agregación, GROUP BY y HAVING',
      schemaId: 'universidad',
      mindmapNodeId: 'GROUP BY',
      summary: 'Diferencia crucial entre WHERE (filtrado previo a agrupar) y HAVING (filtrado sobre grupos agregados).',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
Filtrar la mayor cantidad de filas en el **WHERE** antes del GROUP BY reduce drásticamente el consumo de CPU y memoria del *Sort Buffer* o *Hash Aggregate Table*.
      `,
      contentMarkdown: `
#### Funciones Estadísticas Vectores:
* \`COUNT(*)\`: Cuenta registros.
* \`AVG(columna)\`: Promedio numérico.
* \`SUM(columna)\`: Suma acumulada.
* \`MAX() / MIN()\`: Valores extremos.

\`\`\`sql
SELECT carrera, COUNT(*) AS total_alumnos, AVG(promedio) AS promedio_carrera
FROM estudiantes
GROUP BY carrera
HAVING AVG(promedio) > 8.0;
\`\`\`
      `,
      exercises: [
        {
          id: 'ex-dql-agg-1',
          title: 'Promedio por Carrera Académica',
          category: 'DQL',
          prompt: 'Obtén la carrera y el promedio general de sus alumnos (alias "promedio_carrera"), agrupados por carrera, mostrando solo aquellas con promedio superior a 8.0.',
          initialCode: `-- Escribe tu consulta aquí\nSELECT `,
          expectedQuery: 'SELECT carrera, AVG(promedio) AS promedio_carrera FROM estudiantes GROUP BY carrera HAVING AVG(promedio) > 8.0;',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Agrupa por la columna carrera con GROUP BY.'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'SELECT carrera, AVG(promedio) AS promedio_carrera\nFROM estudiantes\nGROUP BY carrera\nHAVING AVG(promedio) > 8.0;'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'HAVING filtra únicamente después de realizar la reducción por grupos.'
            }
          ],
          explanation: {
            concept: 'El GROUP BY junta los alumnos en bolsitas por carrera, y el HAVING es un filtro exclusivo que deja pasar solo las carreras con promedio superior a 8.0.',
            tip: 'Recordá: WHERE filtra filas individuales antes de agrupar; HAVING filtra los grupitos ya calculados.'
          }
        }
      ]
    }
  ]
};
