/**
 * @file ecommerce.js
 * @description Esquema de datos para el dominio Tienda Online / E-Commerce.
 */

export const SCHEMA_ECOMMERCE = {
  id: 'tienda_online',
  name: 'Plataforma E-Commerce Global',
  description: 'Esquema relacional con clientes, productos, pedidos, detalles de venta e inventario.',
  tables: [
    {
      name: 'clientes',
      fields: [
        ['id_cliente (PK)', 'INTEGER'],
        ['nombre', 'TEXT'],
        ['email', 'TEXT'],
        ['pais', 'TEXT'],
        ['saldo', 'REAL']
      ]
    },
    {
      name: 'productos',
      fields: [
        ['id_producto (PK)', 'INTEGER'],
        ['nombre_producto', 'TEXT'],
        ['categoria', 'TEXT'],
        ['precio', 'REAL'],
        ['stock', 'INTEGER']
      ]
    },
    {
      name: 'pedidos',
      fields: [
        ['id_pedido (PK)', 'INTEGER'],
        ['id_cliente (FK)', 'INTEGER'],
        ['fecha_pedido', 'DATE'],
        ['monto_total', 'REAL']
      ]
    },
    {
      name: 'detalles_pedido',
      fields: [
        ['id_detalle (PK)', 'INTEGER'],
        ['id_pedido (FK)', 'INTEGER'],
        ['id_producto (FK)', 'INTEGER'],
        ['cantidad', 'INTEGER'],
        ['precio_unitario', 'REAL']
      ]
    },
    {
      name: 'auditoria_stock',
      fields: [
        ['id_auditoria (PK)', 'INTEGER'],
        ['id_producto (FK)', 'INTEGER'],
        ['stock_anterior', 'INTEGER'],
        ['stock_nuevo', 'INTEGER'],
        ['fecha_modificacion', 'DATETIME']
      ]
    }
  ],
  sqlSetup: `
    DROP TABLE IF EXISTS auditoria_stock;
    DROP TABLE IF EXISTS detalles_pedido;
    DROP TABLE IF EXISTS pedidos;
    DROP TABLE IF EXISTS productos;
    DROP TABLE IF EXISTS clientes;

    CREATE TABLE clientes (
      id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      pais TEXT NOT NULL,
      saldo REAL DEFAULT 0.0
    );

    CREATE TABLE productos (
      id_producto INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_producto TEXT NOT NULL,
      categoria TEXT NOT NULL,
      precio REAL NOT NULL,
      stock INTEGER NOT NULL
    );

    CREATE TABLE pedidos (
      id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
      id_cliente INTEGER NOT NULL,
      fecha_pedido DATE NOT NULL,
      monto_total REAL NOT NULL,
      FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
    );

    CREATE TABLE detalles_pedido (
      id_detalle INTEGER PRIMARY KEY AUTOINCREMENT,
      id_pedido INTEGER NOT NULL,
      id_producto INTEGER NOT NULL,
      cantidad INTEGER NOT NULL,
      precio_unitario REAL NOT NULL,
      FOREIGN KEY (id_pedido) REFERENCES pedidos(id_pedido),
      FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
    );

    CREATE TABLE auditoria_stock (
      id_auditoria INTEGER PRIMARY KEY AUTOINCREMENT,
      id_producto INTEGER NOT NULL,
      stock_anterior INTEGER NOT NULL,
      stock_nuevo INTEGER NOT NULL,
      fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO clientes (nombre, email, pais, saldo) VALUES
    ('Juan Valdés', 'jvaldes@mail.com', 'Colombia', 1500.00),
    ('Maria Sharapova', 'maria@mail.com', 'España', 3200.50),
    ('Alex Smith', 'asmith@mail.com', 'México', 450.00),
    ('Chen Wei', 'cwei@mail.com', 'Chile', 2100.00);

    INSERT INTO productos (nombre_producto, categoria, precio, stock) VALUES
    ('Laptop Pro 15', 'Electrónica', 1200.00, 25),
    ('Mouse Inalámbrico', 'Accesorios', 25.00, 150),
    ('Teclado Mecánico RGB', 'Accesorios', 85.00, 80),
    ('Monitor 4K 27"', 'Electrónica', 450.00, 40),
    ('Silla Gamer Ergonomica', 'Muebles', 290.00, 15);

    INSERT INTO pedidos (id_cliente, fecha_pedido, monto_total) VALUES
    (1, '2024-01-10', 1225.00),
    (2, '2024-01-12', 450.00),
    (3, '2024-01-15', 110.00),
    (1, '2024-02-01', 290.00);

    INSERT INTO detalles_pedido (id_pedido, id_producto, cantidad, precio_unitario) VALUES
    (1, 1, 1, 1200.00),
    (1, 2, 1, 25.00),
    (2, 4, 1, 450.00),
    (3, 2, 1, 25.00),
    (3, 3, 1, 85.00),
    (4, 5, 1, 290.00);
  `
};
