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
          initialCode: `-- Escribe tu bloque transaccional aquí
BEGIN TRANSACTION;
UPDATE cuentas_bancarias SET saldo = saldo - 500 WHERE id_cuenta = 1;
UPDATE cuentas_bancarias SET saldo = saldo + 500 WHERE id_cuenta = 3;
COMMIT;`,
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
              content: 'La transacción consolida ambos UPDATEs en un cambio atómico garantizado por el registro WAL.'
            }
          ],
          explanation: {
            concept: 'La transacción consolida ambos UPDATEs en un cambio atómico.',
            underTheHood: '⚡ Bajo el Capó: Las escrituras ocurren en el registro Write-Ahead Logging (WAL) antes de reflejarse en las páginas de datos principales.'
          }
        }
      ]
    }
  ]
};
