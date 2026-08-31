# 📌 Próximos Pasos & Roadmap - NexoSQL (QueryMaster Academy)

🌐 **Enlace de Acceso Local**:
- **URL Servidor Local**: [http://localhost:3000/](http://localhost:3000/) (ó [http://127.0.0.1:3000/](http://127.0.0.1:3000/))

---

## 🧭 Visión General de Mejoras

Este documento recopila las tareas pendientes, ideas de expansión y nuevas funcionalidades planificadas para evolucionar **NexoSQL** en una plataforma de referencia universitaria y profesional para el aprendizaje de bases de datos relacionales y optimización de consultas en tiempo real.

---

## 📚 1. Contenido, Libretos y Estructura Curricular

### 1.1. Creación de Libretos de Aprendizaje (Categorías & Lecciones)
- **Estructura modular en Sidebar**: Organizar las lecciones en "Libretos temáticos" por categoría (DQL Básico, Agrupaciones, JOINs, Subconsultas, Window Functions, DML, DDL, Índices, Transacciones/TCL y SQL Procedural).
- **Navegación jerárquica**: Al hacer clic en una categoría, desplegar dinámicamente el listado de lecciones con su estado de completitud (Pendiente, En Progreso, Superada).
- **Desbloqueo progresivo**: Al completar todas las lecciones y desafíos de un libreto, desbloquear automáticamente la siguiente categoría.
- **Módulo Cero / Introducción Fundamental**: Crear una unidad introductoria interactiva que explique:
  - ¿Qué es una base de datos relacional y cómo se diferencia de un archivo plano o Excel?
  - ¿Cómo funciona el motor relacional por dentro (parser, optimizador, motor de ejecución)?
  - ¿Qué es SQL, su historia, estándares y relevancia en la industria actual?

### 1.2. Expansión del Catálogo de Ejercicios y Katas
- **Ampliación de lecciones**: Pasar del set inicial a un catálogo completo de más de 40 lecciones prácticas distribuidas en los 10 módulos.
- **Desafíos con casos de negocio reales**: Incorporar problemas inspirados en situaciones reales de la industria (cálculo de MRR, retención y churn de clientes, detección de transferencias bancarias sospechosas, auditoría de stock).
- **Sistema de pistas escalonadas (Hints)**: Ofrecer 3 niveles de ayuda por ejercicio (1. Pista conceptual, 2. Estructura sintáctica/esqueleto, 3. Explicación de la solución modelo).

---

## 🎮 2. Gamificación, Motivación y Sistema de Logros

### 2.1. Sistema de Puntos (XP), Niveles y Desbloqueos
- **Puntuación por lección y módulo**: Asignar 10 puntos por lección y bonificaciones por resolver desafíos sin solicitar pistas.
- **Criterio de aprobación modular**: Exigir un mínimo de 80 puntos (o completar el 100% de lecciones requeridas) para desbloquear la insignia y el siguiente módulo.
- **Niveles de rango de ingeniería**: Rango progresivo del alumno (ej. *Junior Query Writer*, *Data Wrangler*, *Join Master*, *Index Architect*, *Database Guru*).

### 2.2. Insignias (Badges) y Logros Especiales
- **Insignias temáticas coleccionables**: 
  - 🏅 *Join Champion* (Completar todos los tipos de JOINs).
  - ⚡ *Index Whisperer* (Optimizar una consulta reduciendo su costo en un 80%).
  - 🛡️ *ACID Guardian* (Resolver todos los escenarios de transacciones y rollback).
  - 🔥 *Speed Coder* (Resolver una kata en menos de 60 segundos).
- **Rachas de estudio (Daily Streaks)**: Contador de días consecutivos practicando consultas.

---

## 🤖 3. Asistente Inteligente con IA (NexoSQL AI Tutor)

### 3.1. Tutor Pedagógico en Tiempo Real
- **Chatbot interactivo integrado**: Asistente flotante o lateral capaz de responder dudas teóricas y guiar en la resolución de ejercicios.
- **Explicador semántico de errores**: En lugar de mostrar solo el error técnico de SQLite, la IA analiza la consulta del alumno y explica en lenguaje amigable qué falló (ej. *"Olvidaste agrupar por la columna ciudad antes de usar COUNT"*).
- **Modo Socrático**: Configuración pedagógica para que la IA brinde preguntas orientadoras y pistas en lugar de entregar el código de respuesta directamente.
- **Sugerencias de optimización**: Botón *"¿Cómo puedo mejorar esta consulta?"* para que la IA sugiera refactorizaciones y buenas prácticas.

---

## ⚡ 4. Herramientas Avanzadas de Base de Datos y Rendimiento

### 4.1. Visualizador Gráfico de Planes de Ejecución (Visual EXPLAIN)
- **Árbol visual de escaneo**: Representación gráfica de `EXPLAIN QUERY PLAN` mostrando nodos de `SCAN TABLE` vs `SEARCH TABLE USING INDEX`.
- **Comparador visual "Antes vs Después del Índice"**: Vista interactiva para comparar el tiempo de ejecución y costo antes y después de crear un `CREATE INDEX`.

### 4.2. Simulador de Transacciones Concurrentes y Bloqueos (ACID Playground)
- **Doble consola interactiva**: Dos sesiones de conexión simultáneas lado a lado para experimentar con `BEGIN TRANSACTION`, `COMMIT`, `ROLLBACK`, puntos de guardado (`SAVEPOINT`) y entender bloqueos en bases de datos concurrentes.

### 4.3. Generador Dinámico e Interactivo del Diagrama ERD
- **Sincronización DDL en vivo**: Cuando el estudiante ejecute sentencias `CREATE TABLE`, `ALTER TABLE` o `DROP TABLE` en el Playground, el diagrama ERD debe redibujarse automáticamente en tiempo real para reflejar la nueva estructura relacional.

---

## 🗄️ 5. Datos, Esquemas y Persistencia

### 5.1. Expansión y Diversificación de Datasets
- **Nuevos esquemas de datos del mundo real**:
  - 🎬 **Streaming Platform** (Películas, actores, reproducciones, suscripciones, valoraciones).
  - 🏥 **Sistema Hospitalario** (Pacientes, médicos, citas, diagnósticos, recetas).
  - 📦 **Logística & Envíos** (Almacenes, transportistas, paquetes, rutas, entregas).
- **Volumen de datos representativo**: Incrementar los datos de prueba a 100 registros por tabla para que las agregaciones, filtros e índices demuestren diferencias reales de tiempo y rendimiento.

### 5.2. Exportación, Importación y Persistencia
- **Exportación de resultados**: Botón para descargar el resultado de cualquier consulta en formatos **CSV**, **JSON** y **Markdown/HTML**.
- **Importación de scripts y bases de datos**: Permitir al alumno arrastrar archivos `.sql` o `.db` (SQLite) locales para cargarlos en memoria en su navegador mediante WASM.
- **Persistencia en LocalStorage / IndexedDB**: Guardar automáticamente el progreso, consultas favoritas y estado del esquema para que no se pierdan al recargar la página.

---

## 🎨 6. Experiencia de Usuario (UX/UI), Accesibilidad y Navegación

### 6.1. Habilitación y Refactorización de Botones y Vistas Pendientes
- Revisar y habilitar todos los botones actualmente deshabilitados o con etiquetas de "Próximamente" en las tarjetas de ejercicios y panel de herramientas.
- Integrar historial de consultas ejecutadas recientes con timestamp, estado de éxito/error y duración en milisegundos.
- Panel de snippets y marcadores (Bookmarks) para guardar consultas frecuentes.

### 6.2. Página de Error 404 & Manejo de Estados Vacíos
- Diseñar una página 404 Neón Glassmorphic con temática de base de datos (*"Error 404: Tabla o Registro no encontrado en el Esquema"*).
- Crear estados vacíos atractivos (*Empty States*) con ilustraciones o animaciones sutiles cuando no haya resultados o historial.

### 6.3. Paleta de Comandos y Atajos Globales (Command Palette)
- Acceso rápido mediante `Ctrl + K` / `Cmd + K` para buscar lecciones, tablas, comandos SQL y cambiar entre los 5 espacios de trabajo instantáneamente.
- Selector de temas visuales (Cyberpunk Neon, Deep Space Dark, Midnight Sapphire y Modo Alto Contraste).

---

## 🧪 7. Pruebas de Calidad, Resiliencia y Rendimiento

### 7.1. Pruebas de Concepto y Suite de Tests Automatizados
- **Tests unitarios del motor evaluador (`exerciseValidator.test.js`)**: Validar comparaciones de matrices, manejo de NULLs, tipos de datos y consultas con orden indistinto.
- **Tests de integración WASM**: Validar la carga y estabilidad de `sql.js` en diferentes navegadores y condiciones de red lenta.
- **Pruebas de estrés y seguridad**: Asegurar que consultas infinitas o recursivas no bloqueen el hilo principal de la UI (utilizar Web Workers si es necesario para la ejecución SQL).




