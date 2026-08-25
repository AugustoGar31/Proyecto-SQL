# 📅 Bitácora Diaria de Cambios - NexoSQL

---

## 📌 24 de Agosto, 2026

- **Git & GitHub**: Repositorio inicial configurado en `https://github.com/AugustoGar31/Proyecto-SQL.git` (rama `main`).
- **`.gitignore`**: Creado para ignorar `node_modules/`, `dist/`, `.env` y logs.
- **Privacidad**: Carpeta `Contenido TEORICO y PRACTICO/` desvinculada de Git (se mantiene localmente).
- **Rebranding**: Cambio de nombre a **NexoSQL** y subtítulo a **QueryMaster Academy** en Navbar y HTML.
- **Favicon**: Restablecido favicon del logo pentagonal 3D con centrado perfecto y fondo transparente (`public/favicon.png`).
- **Logo en Navbar**: Procesada la imagen del cilindro de base de datos clásico en PNG transparente (`public/navbar-logo.png`) colocada en la barra superior.
- **Build**: Compilación verificada con `npm run build` e instalada sin errores.

## 📌 25 de Agosto, 2026

- **SQLite WebAssembly**: Corrección de carga asíncrona de `sql.js` mediante empaquetado directo de `sql-wasm.wasm` en Vite y opción de reintento.
- **Seeding de Datos**: Población inicial de tablas y filas ejecutando DDL/DML multilineal con `db.exec()`.
- **Feedback de Errores**: Captura estructurada de errores SQLite en UI con clasificación amigable y consejos para estudiantes.
- **Motor de Evaluación**: Comparación estricta de columnas, filas, celdas y `ORDER BY` entre la respuesta del alumno y la consulta modelo.
- **Verificación**: Pruebas automatizadas aprobadas al 100% (11/11) en todas las consultas base del currículo.

