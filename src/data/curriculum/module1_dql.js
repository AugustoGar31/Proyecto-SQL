/**
 * @file module1_dql.js
 * @description Módulo 1: Fundamentos de DQL (Proyección, Selección y Filtrado Booleano).
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
      summary: 'La cláusula SELECT proyecta columnas mientras que WHERE filtra filas bajo condiciones booleanas.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
En entornos de alto rendimiento, realizar \`SELECT *\` en tablas masivas es un anti-patrón crítico:
1. **Satura el ancho de banda** transfiriendo campos no requeridos.
2. **Deshabilita Índices Cubrientes (Covering Indexes)**, obligando a realizar accesos aleatorios al disco (*Table Access by Index ROWID*).

**Regla de oro:** Especifica siempre de forma explícita únicamente las columnas necesarias.
      `,
      contentMarkdown: `
En SQL, una consulta básica aplica dos operaciones algebraicas primarias:
* **Proyección (SELECT)**: Elige atributos específicos.
* **Selección (WHERE)**: Filtra registros bajo predicados lógicos.

\`\`\`sql
SELECT nombre, promedio 
FROM estudiantes 
WHERE carrera = 'Ingeniería en Sistemas' AND promedio >= 8.5;
\`\`\`

#### Operadores de Comparación y Filtrado:
* Igualdad y Desigualdad: \`=\`, \`<>\` (o \`!=\`), \`>\`, \`<\`, \`>=\`, \`<=\`
* Verificación de Rangos: \`BETWEEN min AND max\`
* Pertenencia a Colección: \`IN ('Val1', 'Val2')\`
* Evaluación de NULL: \`IS NULL\` / \`IS NOT NULL\`
      `,
      exercises: [
        {
          id: 'ex-dql-1',
          title: 'Filtrar Estudiantes Prominentes',
          category: 'DQL',
          prompt: 'Selecciona el nombre y el promedio de los estudiantes de "Ingeniería en Sistemas" con un promedio mayor o igual a 8.5.',
          initialCode: `-- Escribe tu consulta aquí
SELECT nombre, promedio
FROM estudiantes
WHERE carrera = 'Ingeniería en Sistemas' AND promedio >= 8.5;`,
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
            concept: 'La cláusula WHERE filtra las filas antes de retornar el conjunto final.',
            underTheHood: '⚡ Bajo el Capó: Si existe un índice compuesto en (carrera, promedio), el motor realiza un Index Range Scan ultra rápido.'
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
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
En SQL, la comparación \`columna = NULL\` SIEMPRE evalúa a \`UNKNOWN\` (Falso).
Debes usar imperativamente los operadores \`IS NULL\` o \`IS NOT NULL\`. Además, patrones como \`LIKE '%texto'\` impiden el uso de índices convencionales B-Tree.
      `,
      contentMarkdown: `
#### Operador LIKE y Comodines:
* \`%\`: Representa cero o más caracteres (ej: \`LIKE 'A%'\` empieza con A).
* \`_\`: Representa exactamente un caracter (ej: \`LIKE '_a%'\` segundo caracter es a).

#### Lógica Trivalente (TRUE, FALSE, UNKNOWN):
Un valor \`NULL\` representa la ausencia de información. No se puede comparar con \`=\`.
\`\`\`sql
SELECT nombre, nota_final 
FROM inscripciones 
WHERE nota_final IS NOT NULL;
\`\`\`
      `,
      exercises: [
        {
          id: 'ex-dql-2',
          title: 'Filtrar Cursos sin Calificación Completa',
          category: 'DQL',
          prompt: 'Obtén el id_estudiante y la nota_final de la tabla inscripciones donde la nota_final NO sea NULL.',
          initialCode: `-- Escribe tu consulta aquí
SELECT id_estudiante, nota_final
FROM inscripciones
WHERE nota_final IS NOT NULL;`,
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
            concept: 'IS NOT NULL ignora los registros pendientes de calificación.',
            underTheHood: '⚡ Bajo el Capó: Los motores excluyen entradas NULL de ciertos tipos de índices B-Tree, optimizando el escaneo.'
          }
        }
      ]
    }
  ]
};
