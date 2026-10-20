/**
 * @file module10_transactions.js
 * @description Módulo 10: Control Transaccional, Propiedades ACID y Concurrencia.
 */

export const MODULE_10_TRANSACTIONS = {
  id: 'mod-10-transactions',
  title: '10. Transacciones & Propiedades ACID',
  description: 'Domina las unidades atómicas de trabajo (BEGIN, COMMIT, ROLLBACK), durabilidad WAL y niveles de aislamiento.',
  icon: 'ShieldCheck',
  categoryCode: 'TCL',
  lessons: [
    {
      id: 'les-acid',
      title: 'Transacciones ACID: BEGIN, COMMIT y ROLLBACK',
      schemaId: 'banco',
      mindmapNodeId: 'TCL',
      summary: 'Garantiza la consistencia bancaria aplicando cambios "todo o nada" ante fallos.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
En transferencias bancarias, si el servidor falla tras descontar saldo de la Cuenta A, la propiedad de **Atomicidad** revoca el cambio mediante **ROLLBACK** impidiendo la pérdida de fondos.
      `,
      contentMarkdown: `
\`\`\`sql
BEGIN TRANSACTION;
UPDATE cuentas_bancarias SET saldo = saldo - 500 WHERE id_cuenta = 1;
UPDATE cuentas_bancarias SET saldo = saldo + 500 WHERE id_cuenta = 3;
COMMIT;
\`\`\`
      `,
      exercises: [
        {
          id: 'ex-tx-1',
          title: 'Simulación de Transferencia Bancaria Atómica',
          category: 'TCL',
          prompt: 'Inicia una transacción (BEGIN TRANSACTION;), descuenta 500 de la id_cuenta = 1, acredita 500 a la id_cuenta = 3 y confirma con COMMIT;.',
          initialCode: `-- Escribe tu bloque transaccional aquí\nBEGIN TRANSACTION;\n`,
          expectedQuery: 'BEGIN TRANSACTION; UPDATE cuentas_bancarias SET saldo = saldo - 500 WHERE id_cuenta = 1; UPDATE cuentas_bancarias SET saldo = saldo + 500 WHERE id_cuenta = 3; COMMIT;',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Agrupa las sentencias DML entre BEGIN TRANSACTION; y COMMIT;.'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'BEGIN TRANSACTION;\nUPDATE cuentas_bancarias SET saldo = saldo - 500 WHERE id_cuenta = 1;\nUPDATE cuentas_bancarias SET saldo = saldo + 500 WHERE id_cuenta = 3;\nCOMMIT;'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'La transacción consolida ambos UPDATEs en un cambio atómico que asegura integridad.'
            }
          ],
          explanation: {
            concept: 'Una TRANSACCIÓN es como una red de seguridad: te permite hacer varios cambios en paquete. Si todo sale bien, hacés COMMIT para guardar todo; si algo falla en el camino, hacés ROLLBACK (deshacer) y la base de datos vuelve a quedar exactamente como antes, sin romper nada.',
            tip: 'Es fundamental en operaciones bancarias: si te cobran el dinero pero el depósito en la otra cuenta falla, la transacción se cancela y no se pierde ningún saldo.'
          }
        }
      ]
    }
  ]
};
