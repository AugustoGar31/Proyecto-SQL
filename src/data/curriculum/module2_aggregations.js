/**
 * @file module2_aggregations.js
 * @description Módulo 2: Agregación, Agrupamiento y Condicionales CASE.
 */

export const MODULE_2_AGGREGATIONS = {
  id: 'mod-2-aggregations',
  title: '2. Agregación y Análisis de Datos (GROUP BY & HAVING)',
  description: 'Agrupa conjuntos de datos, calcula métricas estadísticas (SUM, AVG, COUNT) y aplica filtros condicionales post-agregación.',
  icon: 'BarChart2',
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
          prompt: 'Obtén la carrera y el promedio general de sus alumnos (alias "promedio_carrera"), agrupados por carrera, mostrando solo aquellas con promedio superior a 8.0.',
          initialCode: 'SELECT carrera, AVG(promedio) AS promedio_carrera\nFROM estudiantes\nGROUP BY ...\nHAVING ...;',
          expectedQuery: 'SELECT carrera, AVG(promedio) AS promedio_carrera FROM estudiantes GROUP BY carrera HAVING AVG(promedio) > 8.0;',
          hints: [
            'Agrupa por la columna carrera con GROUP BY.',
            'Aplica HAVING AVG(promedio) > 8.0.'
          ],
          explanation: {
            theory: 'HAVING filtra únicamente después de realizar la reducción por grupos.',
            underTheHood: '⚡ **Bajo el Capó:** La BD utiliza una tabla hash en memoria donde las claves son las categorías de carrera.'
          }
        }
      ]
    }
  ]
};
