/**
 * @file banco.js
 * @description Esquema de prueba para Operaciones Bancarias y Concurrencia Transaccional.
 */

export const SCHEMA_BANCO = {
  id: 'banco',
  name: 'Sistema Bancario y Financiero',
  description: 'Esquema diseñado para simular transferencias atómicas, aislamiento ACID y registros en diario (WAL).',
  sqlSetup: `
    DROP TABLE IF EXISTS transacciones_log;
    DROP TABLE IF EXISTS cuentas_bancarias;

    CREATE TABLE cuentas_bancarias (
      id_cuenta INTEGER PRIMARY KEY AUTOINCREMENT,
      titular TEXT NOT NULL,
      tipo_cuenta TEXT NOT NULL,
      saldo REAL NOT NULL CHECK(saldo >= 0)
    );

    CREATE TABLE transacciones_log (
      id_log INTEGER PRIMARY KEY AUTOINCREMENT,
      id_origen INTEGER,
      id_destino INTEGER,
      monto REAL NOT NULL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO cuentas_bancarias (titular, tipo_cuenta, saldo) VALUES
    ('Fundación Educativa SQL', 'Corriente', 50000.00),
    ('Empresa Tech Latam', 'Corriente', 125000.50),
    ('Estudiante Demo', 'Ahorros', 2500.00);
  `
};
