/**
 * @file module8_indexes.js
 * @description Módulo 8: Arquitectura B-Tree, Índices y Optimizaciones de Rendimiento.
 */

export const MODULE_8_INDEXES = {
  id: 'mod-8-indexes',
  title: '8. Arquitectura B-Tree, Índices y Performance',
  description: 'Comprende el funcionamiento de los índices B-Tree, reduce la complejidad de $O(N)$ a $O(\\log N)$ y analiza el Query Optimizer.',
  icon: 'Zap',
  categoryCode: 'DDL',
  lessons: [
    {
      id: 'les-b-tree-indexes',
      title: 'Creación de Índices (CREATE INDEX) y EXPLAIN PLAN',
      schemaId: 'universidad',
      mindmapNodeId: 'INDEX',
      summary: 'Acelera las búsquedas de lectura evitando escaneos secuenciales masivos (Full Table Scans).',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
Los índices no son "gratis": aceleran las lecturas (\`SELECT\`) pero penalizan el rendimiento de escrituras (\`INSERT\`, \`UPDATE\`, \`DELETE\`) porque el motor debe reorganizar el árbol B-Tree en cada modificación.
      `,
      contentMarkdown: `
\`\`\`sql
CREATE INDEX idx_alumnos_apellido ON alumnos(apellido);
\`\`\`
      `,
      exercises: [
        {
          id: 'ex-idx-1',
          title: 'Crear Índice de Búsqueda por Apellido',
          category: 'DDL',
          prompt: 'Crea un índice llamado "idx_alumnos_apellido" sobre la columna "apellido" de la tabla "alumnos".',
          initialCode: `-- Escribe tu sentencia DDL aquí
CREATE INDEX idx_alumnos_apellido ON alumnos(apellido);`,
          expectedQuery: 'CREATE INDEX idx_alumnos_apellido ON alumnos(apellido);',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Usa la sintaxis: CREATE INDEX idx_alumnos_apellido ON alumnos(apellido);'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'CREATE INDEX idx_alumnos_apellido ON alumnos(apellido);'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'Un índice genera una estructura B-Tree ordenada de claves apuntando a los punteros de fila.'
            }
          ],
          explanation: {
            concept: 'Un índice genera una estructura B-Tree ordenada de claves apuntando a los punteros de fila.',
            underTheHood: '⚡ Bajo el Capó: Las búsquedas pasan de recorrer N páginas a navegar niveles de profundidad logarítmicos en el árbol.'
          }
        }
      ]
    }
  ]
};
