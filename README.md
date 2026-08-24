# 🚀 SQL Master - Plataforma Interactiva de Aprendizaje SQL (Engineering Edition)

> **Aprende SQL como un Verdadero Ingeniero de Producción.**  
> Una experiencia educativa moderna, modular y dinámica diseñada para dominar desde consultas relacionales básicas hasta lógica procedural avanzada, triggers, índices B-Tree y transacciones ACID.

---

## 🌟 Características Principales de la Nueva Versión

- **🎓 10 Módulos de Aprendizaje Estructurado**: Currículum ampliado que abarca desde DQL Básico, Agregaciones (`GROUP BY`/`HAVING`), `JOINs`, Subconsultas y CTEs (`WITH`), Funciones de Ventana (`OVER()`, `PARTITION BY`), Operaciones DML (`INSERT`/`UPDATE`/`DELETE`), Definición de Esquemas DDL, Índices B-Tree, Triggers y Transacciones ACID.
- **🧠 Mapa Mental Dinámico e Interactivo**: Visualizador jerárquico programático en **React + SVG** (sin fotos estáticas) para navegar visualmente por las ramas de SQL (DQL, DML, DDL, TCL, DCL, Procedural) con filtros y acceso directo a lecciones.
- **💻 Taller SQL Interactivo (Playground)**: Editor de código con atajos de teclado (`Ctrl + Enter`), tabla de salida tabular con medición de latencia en milisegundos y botón de reset.
- **⚡ Inspector "Bajo el Capó" (Execution Plan)**: Muestra la estrategia de acceso al almacenamiento estimada (*Abstract Syntax Tree, Index Scan vs Full Table Scan*) tras cada consulta.
- **🏋️ Catálogo de Katas y Desafíos (Estilo LeetCode / SQLZoo)**: Sistema de ejercicios prácticos con validación automática de matrices de datos y pistas escalonadas.
- **📊 Explorador de Arquitectura y ERD**: Visualizador relacional de tablas, tipos de datos y claves primarias/foráneas de esquemas reales (*Universidad, Tienda Online E-Commerce, Sistema Bancario*).
- **⚡ Motor WebAssembly SQLite (100% In-Browser)**: Ejecuta sentencias SQL reales directamente en tu navegador gracias a `sql.js` (SQLite compilado a WebAssembly). ¡Sin servidores y 100% privado!
- **🎨 Sistema de Diseño Neón Glassmorphic**: Interfaz moderna en modo oscuro (*Dark Slate, Cyan Neón, Indigo y Emerald*), tipografía `Inter` + `JetBrains Mono` y micro-animaciones.

---

## 🏛️ Estructura del Proyecto (Arquitectura Modular)

```
src/
├── components/
│   ├── common/         # Navbar, Footer, Badges y ErrorBoundary
│   ├── navigation/     # Selector de Espacios / Router de Vistas
│   ├── theory/         # Espacio 1: Teoría & Plan de Estudio
│   ├── playground/     # Espacio 2: Taller SQL Interactivo
│   ├── mindmap/        # Espacio 3: Mapa Mental Dinámico (SVG)
│   ├── exercises/      # Espacio 4: Catálogo de Desafíos / Katas
│   └── schema/         # Espacio 5: Explorador de Esquemas (ERD)
├── context/            # Estado global (ViewContext, ProgressContext, DbEngineContext)
├── data/               # Curriculum ampliado (10 Módulos) y Esquemas de BD
├── services/           # Servicios aislados (SqlEngineService, ExerciseValidatorService, StorageService)
└── styles/             # Sistema de diseño (theme.css, glassmorphism.css, main.css, mindmap.css)
```

---

## 🛠️ Ejecución Local

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar servidor de desarrollo (Localhost):**
   ```bash
   npm run dev
   ```

3. **Compilar para producción:**
   ```bash
   npm run build
   ```
