/**
 * @file module9_procedural.js
 * @description Módulo 9: Lógica Procedural, Triggers y Automatización en BD.
 */

export const MODULE_9_PROCEDURAL = {
  id: 'mod-9-procedural',
  title: '9. SQL Procedural & Triggers',
  description: 'Automatiza lógica de negocio en la base de datos con disparadores (Triggers) ante eventos INSERT, UPDATE y DELETE.',
  icon: 'Cpu',
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
          prompt: 'Crea un Trigger "trg_auditoria_inventario" ejecutado AFTER UPDATE OF stock ON productos FOR EACH ROW que inserte en auditoria_stock (id_producto, stock_anterior, stock_nuevo) los valores OLD e NEW.',
          initialCode: 'CREATE TRIGGER trg_auditoria_inventario\nAFTER UPDATE OF stock ON productos\nFOR EACH ROW\nBEGIN\n  INSERT INTO ...\nEND;',
          expectedQuery: 'CREATE TRIGGER trg_auditoria_inventario AFTER UPDATE OF stock ON productos FOR EACH ROW BEGIN INSERT INTO auditoria_stock (id_producto, stock_anterior, stock_nuevo) VALUES (OLD.id_producto, OLD.stock, NEW.stock); END;',
          hints: [
            'Usa OLD.stock y NEW.stock dentro del bloque BEGIN ... END.'
          ],
          explanation: {
            theory: 'Un trigger registra un hook automático en el catálogo.',
            underTheHood: '⚡ **Bajo el Capó:** La transacción original del UPDATE no se confirma hasta que el Trigger completa síncronamente su inserción.'
          }
        }
      ]
    }
  ]
};
