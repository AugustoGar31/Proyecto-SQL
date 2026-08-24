/**
 * @file module6_dml.js
 * @description Módulo 6: Manipulación de Datos (DML: INSERT, UPDATE, DELETE).
 */

export const MODULE_6_DML = {
  id: 'mod-6-dml',
  title: '6. Manipulación de Datos (DML)',
  description: 'Inserta nuevos registros, modifica datos existentes y elimina filas respetando la integridad referencial.',
  icon: 'Edit3',
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
          prompt: 'Incrementa en 20 unidades el stock del producto con id_producto = 1 en la tabla productos.',
          initialCode: 'UPDATE productos SET stock = ... WHERE id_producto = 1;',
          expectedQuery: 'UPDATE productos SET stock = stock + 20 WHERE id_producto = 1;',
          hints: [
            'Utiliza la sintaxis: UPDATE productos SET stock = stock + 20 WHERE id_producto = 1;'
          ],
          explanation: {
            theory: 'UPDATE modifica atributos de registros existentes que cumplen la condición del WHERE.',
            underTheHood: '⚡ **Bajo el Capó:** Se localiza la página de disco del registro, se actualiza el valor y se marca la página como dirty en la memoria buffer pool.'
          }
        }
      ]
    }
  ]
};
