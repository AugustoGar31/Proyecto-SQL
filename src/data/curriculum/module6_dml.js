/**
 * @file module6_dml.js
 * @description Módulo 6: Manipulación de Datos (DML: INSERT, UPDATE, DELETE).
 */

export const MODULE_6_DML = {
  id: 'mod-6-dml',
  title: '6. Manipulación de Datos (DML)',
  description: 'Inserta nuevos registros, modifica datos existentes y elimina filas respetando la integridad referencial.',
  icon: 'Edit3',
  categoryCode: 'DML',
  lessons: [
    {
      id: 'les-dml-operations',
      title: 'Inserción y Actualización: INSERT INTO y UPDATE',
      schemaId: 'tienda_online',
      mindmapNodeId: 'DML',
      summary: 'Aprende a alterar el estado de la base de datos controlando restricciones de integridad.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
Ejecutar un \`UPDATE\` o \`DELETE\` sin la cláusula \`WHERE\` modificará o borrará el 100% de la tabla. En entornos de producción, ejecuta siempre un \`SELECT\` previo con el mismo predicado para verificar qué filas van a ser impactadas.
      `,
      contentMarkdown: `
\`\`\`sql
INSERT INTO productos (nombre_producto, categoria, precio, stock)
VALUES ('Auriculares Bluetooth', 'Accesorios', 59.99, 50);

UPDATE productos 
SET stock = stock + 10 
WHERE id_producto = 1;
\`\`\`
      `,
      exercises: [
        {
          id: 'ex-dml-1',
          title: 'Reabastecer Inventario de Producto',
          category: 'DML',
          prompt: 'Incrementa en 20 unidades el stock del producto con id_producto = 1 en la tabla productos.',
          initialCode: `-- Escribe tu sentencia DML aquí\nUPDATE `,
          expectedQuery: 'UPDATE productos SET stock = stock + 20 WHERE id_producto = 1;',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Utiliza la cláusula UPDATE productos SET stock = stock + 20 WHERE id_producto = 1;'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'UPDATE productos\nSET stock = stock + 20\nWHERE id_producto = 1;'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'UPDATE modifica atributos in-place de los registros que cumplen el predicado del WHERE.'
            }
          ],
          explanation: {
            concept: 'El UPDATE cambia datos que ya están guardados. ¡Ojo! Siempre va de la mano con un WHERE para actualizar únicamente la fila que querés y no cambiarle el dato a todos por error.',
            tip: 'Regla de oro de los programadores: verificá dos veces la cláusula WHERE antes de ejecutar un UPDATE.'
          }
        }
      ]
    }
  ]
};
