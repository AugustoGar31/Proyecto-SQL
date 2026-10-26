/**
 * @file module2_aggregations.js
 * @description Módulo 2: Agregación, Agrupamiento y Condicionales (GROUP BY & HAVING).
 * Rediseñado con el sistema de bloques modulares de micro-learning y doble ejemplo práctico.
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
      summary: 'Diferencia crucial entre WHERE (filtrado previo a agrupar) y HAVING (filtrado sobre métricas agrupadas).',
      engineerPerspective: `Filtrar la mayor cantidad de filas en el WHERE antes del GROUP BY reduce drásticamente el consumo de CPU y memoria del Sort Buffer o Hash Aggregate Table.`,
      contentMarkdown: `Funciones de agregación, GROUP BY y HAVING.`,
      theoryBlocks: [
        {
          id: 'block-agg-concept',
          type: 'concept',
          title: 'De Filas Individuales a Resúmenes Estadísticos',
          content: 'Las funciones de agregación toman múltiples filas y las reducen a un único valor consolidado (un promedio, un total o un recuento). Al combinarlas con GROUP BY, creamos subconjuntos analíticos agrupados por una o más categorías.',
          highlights: [
            'Agregación = Reducción matemática',
            'GROUP BY = Segmentación por categorías',
            'HAVING = Filtro exclusivo para métricas agrupadas'
          ]
        },
        {
          id: 'block-agg-functions-grid',
          type: 'operator_grid',
          title: 'Arsenal de Funciones de Agregación',
          description: 'Funciones universales para sintetizar métricas cuantitativas en SQL:',
          items: [
            {
              badge: 'COUNT(*)',
              name: 'Recuento Total',
              syntax: 'COUNT(*) ó COUNT(col)',
              desc: 'Cuenta el número de filas coincidentes (ignora NULLs si especificas columna).'
            },
            {
              badge: 'AVG(...)',
              name: 'Promedio Numérico',
              syntax: 'AVG(promedio)',
              desc: 'Calcula la media aritmética ignorando valores nulos.'
            },
            {
              badge: 'SUM(...)',
              name: 'Suma Acumulada',
              syntax: 'SUM(creditos)',
              desc: 'Totaliza el importe o suma de valores numéricos.'
            },
            {
              badge: 'MAX / MIN',
              name: 'Extremos',
              syntax: 'MAX(salario), MIN(salario)',
              desc: 'Determina el valor tope superior o inferior del conjunto.'
            }
          ]
        },
        {
          id: 'block-agg-code-example-1',
          type: 'code_snippet',
          title: 'Ejemplo 1: Conteo y promedio agrupado por carrera',
          description: 'Calculamos cuántos estudiantes activos hay en cada carrera y cuál es su rendimiento promedio:',
          code: `SELECT carrera, 
       COUNT(*) AS total_estudiantes, 
       ROUND(AVG(promedio), 2) AS promedio_carrera
FROM estudiantes
GROUP BY carrera;`,
          notes: 'Regla obligatoria de SQL: cualquier columna en el SELECT que no esté envuelta en una función de agregación DEBE estar en la cláusula GROUP BY.'
        },
        {
          id: 'block-agg-alert-where-vs-having',
          type: 'alert',
          variant: 'production',
          title: 'La Regla de Oro: WHERE vs. HAVING',
          content: 'WHERE filtra registros individuales en disco ANTES de que el motor gaste CPU agrupándolos. HAVING filtra los grupos resultantes DESPUÉS de calcular la métrica. Jamás uses HAVING para filtrar condiciones que podías descartar antes en el WHERE.'
        },
        {
          id: 'block-agg-code-example-2',
          type: 'code_snippet',
          title: 'Ejemplo 2: Filtrado estricto post-agregación con HAVING',
          description: 'Mostramos únicamente aquellas carreras de excelencia donde el promedio grupal supera los 8 puntos:',
          code: `SELECT carrera, 
       COUNT(*) AS total_alumnos, 
       AVG(promedio) AS promedio_carrera
FROM estudiantes
GROUP BY carrera
HAVING AVG(promedio) > 8.0;`,
          notes: 'El motor agrupa primero a los alumnos de cada carrera, calcula la media y finalmente descarta a las carreras que no alcancen el 8.0.'
        },
        {
          id: 'block-agg-tip',
          type: 'alert',
          variant: 'tip',
          title: 'Píldora Práctica: COUNT(*) vs COUNT(columna)',
          content: 'COUNT(*) cuenta todas las filas devueltas, incluso si contienen campos nulos. En cambio, COUNT(telefono) cuenta únicamente las filas donde la columna no es NULL.'
        }
      ],
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
