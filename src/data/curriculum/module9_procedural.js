/**
 * @file module9_procedural.js
 * @description Módulo 9: Lógica Procedural, Triggers y Automatización en BD.
 */

export const MODULE_9_PROCEDURAL = {
  id: 'mod-9-procedural',
  title: '9. SQL Procedural & Triggers',
  description: 'Automatiza lógica de negocio en la base de datos con disparadores (Triggers) ante eventos INSERT, UPDATE y DELETE.',
  icon: 'Cpu',
  categoryCode: 'PROCEDURAL',
  lessons: [
    {
      id: 'les-triggers',
      title: 'Disparadores de Eventos: CREATE TRIGGER',
      schemaId: 'tienda_online',
      mindmapNodeId: 'TRIGGER',
      summary: 'Los Triggers imponen reglas de integridad y auditoría ejecutándose automáticamente ante modificaciones DML.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
Los Triggers garantizan reglas de negocio sin importar qué lenguaje de Backend (Python, Node, Java) acceda a la BD, pero deben ser livianos para no bloquear la transacción principal.
      `,
      contentMarkdown: `
\`\`\`sql
CREATE TRIGGER trg_auditoria_inventario
AFTER UPDATE OF stock ON productos
FOR EACH ROW
BEGIN
  INSERT INTO auditoria_stock (id_producto, stock_anterior, stock_nuevo)
  VALUES (OLD.id_producto, OLD.stock, NEW.stock);
END;
\`\`\`
      `,
      exercises: [
        {
          id: 'ex-trig-1',
          title: 'Crear Trigger de Auditoría de Inventario',
          category: 'PROCEDURAL',
          prompt: 'Crea un Trigger "trg_auditoria_inventario" ejecutado AFTER UPDATE OF stock ON productos FOR EACH ROW que inserte en auditoria_stock (id_producto, stock_anterior, stock_nuevo) los valores OLD y NEW.',
          initialCode: `-- Escribe tu disparador (Trigger) aquí\nCREATE TRIGGER `,
          expectedQuery: 'CREATE TRIGGER trg_auditoria_inventario AFTER UPDATE OF stock ON productos FOR EACH ROW BEGIN INSERT INTO auditoria_stock (id_producto, stock_anterior, stock_nuevo) VALUES (OLD.id_producto, OLD.stock, NEW.stock); END;',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Usa OLD.stock y NEW.stock dentro del bloque BEGIN ... END;'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'CREATE TRIGGER trg_auditoria_inventario\nAFTER UPDATE OF stock ON productos\nFOR EACH ROW\nBEGIN\n  INSERT INTO auditoria_stock (id_producto, stock_anterior, stock_nuevo)\n  VALUES (OLD.id_producto, OLD.stock, NEW.stock);\nEND;'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'Un trigger registra una acción automática ejecutada por la base de datos ante cada fila modificada.'
            }
          ],
          explanation: {
            concept: 'Un TRIGGER (disparador) es como un sensor de movimiento o una alarma automática: se queda vigilando la tabla y, cuando alguien hace un cambio (como actualizar el stock), salta solo y ejecuta una acción por su cuenta sin que tengas que pedírselo.',
            tip: 'OLD representa los valores antes del cambio y NEW representa los valores nuevos que se acaban de escribir.'
          }
        }
      ]
    }
  ]
};
