# 📋 Auditoría, Diagnóstico y Propuesta de Arquitectura - SQL Master

**Fecha:** 23 de Agosto, 2026  
**Rol:** Arquitecto de Sistemas & Desarrollador Senior  
**Estado:** Paso 1 y Paso 2 Aprobados por el Cliente

---

## 1. Resumen del Proyecto Inspeccionado (PASO 1)
El proyecto actual es una Single Page Application (SPA) desarrollada en **React + Vite** que ejecuta un motor de base de datos **SQLite en el navegador a través de WebAssembly (`sql.js`)**.
* **Estado Global:** Manejado con React Context (`DbEngineContext` para el motor SQL y `ProgressContext` para guardar avances en `localStorage`).
* **Capa de Datos:** `modulesData.js` (4 lecciones) y `sampleSchemas.js` (esquemas `universidad` y `tienda_online`).
* **Capa de Servicios:** `sqlEngineService.js` (Singleton SQLite WASM) y `exerciseValidator.js` (validación básica de respuestas).
* **Interfaz de Usuario:** `App.jsx` renderiza de forma simultánea todos los componentes (Roadmap, ERD, Teoría, Desafío, Editor SQL, Tabla de Resultados e Internales) en una única página de dos columnas. `MindMapModal.jsx` renderiza una imagen estática.

---

## 2. Diagnóstico de Puntos Débiles y Oportunidades de Mejora

### 🔴 A. Acoplamiento Monolítico en la Interfaz (`App.jsx`)
* **Diagnóstico:** Todos los módulos visuales conviven apretados en una sola pantalla. No existen vistas independientes ni espacios dedicados.
* **Solución Arquitectónica:** Implementar una navegación por **Espacios de Trabajo (Vistas Independientes)**:
  1. 🎓 **Teoría & Plan de Estudio** (Syllabus)
  2. 💻 **Taller Práctico / Workspace** (Editor SQL, ERD, Resultados e Internals)
  3. 🧠 **Mapa Mental Interactivo** (Visualizador SVG/React sin imágenes estáticas)
  4. 🏋️ **Catálogo de Desafíos / Katas** (Estilo LeetCode / SQLZoo)
  5. 📊 **Explorador de Esquemas** (Visualizador ERD y tablas raw)

### 🔴 B. Mapa Mental Estático (`MindMapModal.jsx`)
* **Diagnóstico:** Depende de una imagen estática (`/mindmap_sql.jpg`).
* **Solución Arquitectónica:** Crear un componente interactivo de Mapa Mental en React + SVG donde los nodos (DQL, DML, DDL, TCL, DCL, Procedural) se puedan expandir, filtrar por categoría, consultar tooltips y hacer clic para ir a la lección.

### 🔴 C. Curriculum Escaso e Incompleto (`modulesData.js`)
* **Diagnóstico:** Solo incluye 4 lecciones básicas. Faltan conceptos clave de producción presentes en fuentes de referencia (SQLBolt, Codecademy, LeetCode, Mode, SQLZoo, W3Schools).
* **Solución Arquitectónica:** Reestructurar y ampliar el curriculum en 10 Módulos de Aprendizaje completos desde DQL básico hasta CTEs, Funciones de Ventana, DML, DDL, Índices B-Tree, Triggers y Transacciones ACID.

### 🔴 D. Estética y Sistema de Diseño
* **Diagnóstico:** Los estilos CSS actuales (`main.css` y `glassmorphism.css`) son oscuros genéricos, sin contraste ni micro-animaciones refinadas.
* **Solución Arquitectónica:** Diseñar un **Sistema de Diseño (Design System)** centralizado en `theme.css` con paleta Tailored Dark (Dark Slate `#0b0f19`, Neon Cyan `#06b6d4`, Indigo `#6366f1`, Emerald `#10b981`), fuentes `Inter` y `JetBrains Mono`, bordes con brillo sutil y estados hover animados.

### 🔴 E. Validación y Desacoplamiento de Servicios
* **Diagnóstico:** `sqlEngineService.js` reinicia la base de datos completa en cada cambio de lección y la validación de ejercicios depende de comparaciones simples.
* **Solución Arquitectónica:** Aislar los servicios en clases orientadas a objetos bien documentadas con Type Hints (JSDoc) y respuestas de evaluación detalladas.

---

## 3. Propuesta de Nueva Arquitectura y Estructura de Directorios (PASO 2)

```
Pagina SQL/
├── docs/
│   └── auditoria_y_diagnostico.md       # Auditoría y Arquitectura (Guardado)
├── public/
│   └── sql-wasm.wasm                     # Binario local de sql.js SQLite WASM
├── src/
│   ├── assets/                           # Iconos y recursos visuales
│   ├── components/
│   │   ├── common/                       # Componentes compartidos y UI base
│   │   │   ├── Navbar.jsx                # Navegación principal por Espacios/Vistas
│   │   │   ├── Footer.jsx                # Pie de página con recursos de referencia
│   │   │   ├── ErrorBoundary.jsx         # Captura global de errores
│   │   │   ├── Modal.jsx                 # Modal genérico reutilizable
│   │   │   └── Badge.jsx                 # Chips visuales de dificultad y estado
│   │   ├── navigation/                   # Controlador de navegación por espacios
│   │   │   └── ViewSelector.jsx          # Selector de Espacios (Teoría, Taller, Mapa, Katas, ERD)
│   │   ├── theory/                       # ESPACIO 1: Teoría & Plan de Estudio
│   │   │   ├── SyllabusViewer.jsx        # Lista de módulos y lecciones guiadas
│   │   │   ├── LessonContent.jsx         # Renderizador de teoría + Perspectiva Ingeniero
│   │   │   └── ConceptCard.jsx           # Fichas de sintaxis y tips de producción
│   │   ├── playground/                   # ESPACIO 2: Taller Práctico / Workspace
│   │   │   ├── WorkspaceView.jsx         # Contenedor principal del taller interactivo
│   │   │   ├── SqlEditor.jsx             # Editor SQL interactivo con sintaxis y atajos
│   │   │   ├── ResultsTable.jsx          # Visualización de resultados tabulares
│   │   │   ├── QueryHistory.jsx          # Historial de consultas ejecutadas
│   │   │   └── DbInternalsViewer.jsx     # Visualizador "Bajo el Capó" (EXPLAIN PLAN)
│   │   ├── mindmap/                      # ESPACIO 3: Mapa Mental Dinámico (NUEVO - Sin fotos)
│   │   │   ├── MindMapView.jsx           # Espacio principal del mapa mental SVG/React
│   │   │   ├── MindMapNode.jsx           # Nodos interactivos con tooltip y enlaces a lecciones
│   │   │   ├── MindMapControls.jsx       # Zoom, búsqueda y filtros por comando (DQL, DML, DDL, TCL, DCL)
│   │   │   └── mindMapData.js            # Arbol jerárquico del lenguaje SQL
│   │   ├── exercises/                    # ESPACIO 4: Catálogo de Desafíos / Katas
│   │   │   ├── ExerciseHubView.jsx       # Catálogo filtrable por dificultad y tema
│   │   │   ├── ExerciseCard.jsx          # Tarjeta del desafío activo con pistas
│   │   │   └── ValidationFeedback.jsx    # Feedback de evaluación y animación de éxito
│   │   └── schema/                       # ESPACIO 5: Explorador de Esquemas (ERD)
│   │       ├── SchemaExplorerView.jsx    # Visualizador de bases de datos de prueba
│   │       ├── ERDDiagram.jsx            # Diagrama relacional visual de tablas y claves
│   │       └── TablePreview.jsx          # Vista previa de datos raw
│   ├── context/                          # Estado Global
│   │   ├── DbEngineContext.jsx           # Estado del motor SQLite WebAssembly
│   │   ├── ProgressContext.jsx           # Progreso del estudiante y localStorage
│   │   └── ViewContext.jsx               # Navegación y control del espacio activo
│   ├── data/                             # Base de Conocimiento y Curriculum Ampliado
│   │   ├── curriculum/                   # Lecciones estructuradas (10 Módulos)
│   │   │   ├── index.js                  # Exportador principal de módulos
│   │   │   ├── module1_dql.js            # Proyecciones y filtrado (SELECT, WHERE, LIKE)
│   │   │   ├── module2_aggregations.js   # Agregación y agrupamiento (GROUP BY, HAVING)
│   │   │   ├── module3_joins.js          # Relaciones multitabla (INNER, LEFT, RIGHT, FULL)
│   │   │   ├── module4_subqueries.js     # Subconsultas y CTEs (WITH ... AS)
│   │   │   ├── module5_window.js         # Funciones de Ventana (OVER, ROW_NUMBER, RANK)
│   │   │   ├── module6_dml.js            # Manipulación de datos (INSERT, UPDATE, DELETE)
│   │   │   ├── module7_ddl.js            # Definición de estructuras (CREATE, ALTER, DROP)
│   │   │   ├── module8_indexes.js        # Arquitectura B-Tree, Índices y Rendimiento
│   │   │   ├── module9_procedural.js     # Triggers y Lógica Procedural
│   │   │   └── module10_transactions.js  # Transacciones ACID y Control de Concurrencia
│   │   └── schemas/                      # Esquemas de prueba ricos y variados
│   │       ├── index.js                  # Exportador de esquemas
│   │       ├── universidad.js            # Esquema Universidad
│   │       ├── ecommerce.js              # Esquema E-Commerce
│   │       └── banco.js                  # Esquema Transacciones Bancarias
│   ├── services/                         # Servicios Desacoplados
│   │   ├── SqlEngineService.js           # Singleton para sql.js SQLite WASM
│   │   ├── ExerciseValidatorService.js   # Validador inteligente de respuestas
│   │   ├── ExplainPlanService.js         # Generador de planes de ejecución conceptuales
│   │   └── StorageService.js             # Persistencia en localStorage
│   ├── styles/                           # Sistema de Diseño CSS
│   │   ├── theme.css                     # Tokens CSS (Variables de colores, sombras, radios)
│   │   ├── main.css                      # Estilos globales y layouts por espacios
│   │   ├── glassmorphism.css             # Componentes Glassmorphism premium
│   │   └── mindmap.css                   # Estilos del mapa mental dinámico SVG
│   ├── App.jsx                           # Router de Vistas / Layout Principal limpio
│   └── main.jsx                          # Entrada React
```
