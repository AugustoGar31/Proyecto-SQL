/**
 * @file module4_subqueries.js
 * @description Módulo 4: Subconsultas y Expresiones CTE (Common Table Expressions).
 */

export const MODULE_4_SUBQUERIES = {
  id: 'mod-4-subqueries',
  title: '4. Subconsultas y Expresiones CTE (WITH)',
  description: 'Estructura consultas complejas mediante subconsultas escalares, correlacionadas y CTEs legibles.',
  icon: 'Layers',
  lessons: [
    {
      id: 'les-cte-with',
      title: 'Common Table Expressions: Cláusula WITH',
      schemaId: 'tienda_online',
      mindmapNodeId: 'WITH',
      summary: 'Las CTEs crean tablas temporales con nombre dentro del scope de la consulta para mejorar la legibilidad.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
A diferencia de las subconsultas anidadas en el WHERE que se pueden reevaluar por cada fila (Subconsulta Correlacionada O(N²)), las CTEs permiten al optimizador materializar el resultado una sola vez en memoria.
      `,
      contentMarkdown: `
\`\`\`sql
WITH MejoresClientes AS (
  SELECT id_cliente, SUM(monto_total) AS total_gastado
  FROM pedidos
  GROUP BY id_cliente
  HAVING SUM(monto_total) > 1000
)
SELECT c.nombre, mc.total_gastado
FROM clientes c
JOIN MejoresClientes mc ON c.id_cliente = mc.id_cliente;
\`\`\`
      `,
      exercises: [
        {
          id: 'ex-cte-1',
          title: 'Identificar Clientes VIP con CTE',
          prompt: 'Utiliza una CTE llamada "ClientesVIP" que seleccione id_cliente y la suma de sus pedidos como "total", e iguala con la tabla clientes para retornar el nombre y total.',
          initialCode: 'WITH ClientesVIP AS (\n  SELECT id_cliente, SUM(monto_total) AS total FROM pedidos GROUP BY id_cliente\n)\nSELECT c.nombre, cv.total FROM clientes c JOIN ClientesVIP cv ON c.id_cliente = cv.id_cliente;',
          expectedQuery: 'WITH ClientesVIP AS (SELECT id_cliente, SUM(monto_total) AS total FROM pedidos GROUP BY id_cliente) SELECT c.nombre, cv.total FROM clientes c JOIN ClientesVIP cv ON c.id_cliente = cv.id_cliente;',
          hints: [
            'Define la CTE con la sintaxis: WITH ClientesVIP AS (...)'
          ],
          explanation: {
            theory: 'La CTE descompone la lógica en pasos modulares legibles.',
            underTheHood: '⚡ **Bajo el Capó:** El motor crea un result-set efímero en la memoria de trabajo de la sesión.'
          }
        }
      ]
    }
  ]
};
