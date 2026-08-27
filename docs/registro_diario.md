# 📅 Bitácora Diaria de Cambios - NexoSQL

---

## 📌 24 de Agosto, 2026

- **Git & GitHub**: Repositorio inicial configurado en `https://github.com/AugustoGar31/Proyecto-SQL.git` (rama `main`).
- **`.gitignore`**: Creado para ignorar `node_modules/`, `dist/`, `.env` y logs.
- **Privacidad**: Carpeta `Contenido TEORICO y PRACTICO/` desvinculada de Git (se mantiene localmente).
- **Rebranding**: Cambio de nombre a **NexoSQL** y subtítulo a **QueryMaster Academy** en Navbar y HTML.
- **Favicon**: Restablecido favicon del logo pentagonal 3D con centrado perfecto y fondo transparente (`public/favicon.png`).
- **Logo en Navbar**: Procesada la imagen del cilindro de base de datos clásico en PNG transparente (`public/navbar-logo.png`) colocada en la barra superior.
- **Build**: Compilación verificada con `npm run build` e instalada sin errores.---

## 📌 25 de Agosto, 2026

- **SQLite WebAssembly**: Corrección de la carga asíncrona de `sql.js` mediante empaquetado directo de `sql-wasm.wasm` en Vite y soporte de reintento.
- **Seeding de Datos**: Población inicial de tablas y filas ejecutando DDL/DML multilineal con `db.exec()`.
- **Feedback de Errores**: Captura estructurada de errores SQLite en la UI (`ResultsTable.jsx`) con clasificación amigable (sintaxis, tablas/columnas no encontradas, ambigüedad) y consejos pedagógicos.
- **Motor de Evaluación**: Comparación estricta de columnas, número de filas, celdas y `ORDER BY` en `exerciseValidator.js` entre la respuesta del alumno y la consulta modelo.
- **Contexto del Motor DB**: Gestión del estado global en `DbEngineContext.jsx` para inicialización asíncrona y reinicio controlado de esquemas.

## 📌 27 de Agosto, 2026

- **Refactorización del Mapa Mental**: Eliminación de superposiciones visuales y del tooltip fijo inferior que tapaba los nodos.
- **Arquitectura Drill-down**: Implementación de navegación de dos niveles con el mapa base limpio (nodo central "SQL ENGINEERING" + 5 categorías) y vistas detalladas por categoría.
- **Framer Motion**: Integración de animaciones suaves y elegantes (`AnimatePresence`, `fade-in`, `zoom`) sin tirones ni transformaciones SVG caóticas.
- **Botón de Regreso**: Botón `← Volver al Mapa` para retornar con transición fluida al mapa general.
- **Contenidos Actualizados**: Carga exacta de las descripciones y comandos para DQL, DML, DDL, TCL y SQL Procedural con accesos directos al Taller Práctico.
