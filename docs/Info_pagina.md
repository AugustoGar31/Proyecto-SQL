# 📋 Ficha Técnica y Diseño - NexoSQL

## 🏷️ Logo / Nombre

- **Nombre del Proyecto:** NexoSQL
- **Subtítulo / Concepto:** Plataforma Educativa de SQL & Bases de Datos Relacionales
- **Identidad Visual / Logo:**
  - **Navbar:** Cilindro relacional clásico de base de datos con estética Cyber-Tech en PNG transparente ([`public/navbar-logo.png`](file:///c:/Users/Usuario/Documents/Pagina%20SQL/public/navbar-logo.png)).
  - **Favicon & Splash:** Prisma relacional 3D con resplandor neón ([`public/favicon.png`](file:///c:/Users/Usuario/Documents/Pagina%20SQL/public/favicon.png)).
- **Estilo Visual:** Dark Mode Neón Glassmorphism & High-Contrast Cyber-Tech.

## 🎨 Paleta de Colores

### 🌌 Fondos y Superficies (Glassmorphism)

| Token             | HEX / Valor              | Uso                                                    |
| :---------------- | :----------------------- | :----------------------------------------------------- |
| `--bg-main`       | `#070a12`                | Fondo general de la aplicación.                        |
| `--bg-elevated`   | `#0f172a`                | Modales, sidebars y paneles elevados.                  |
| `--bg-input`      | `#0b1120`                | Consolas de código y editores SQL.                     |
| `--bg-card`       | `rgba(15, 23, 42, 0.75)` | Tarjetas translúcidas (`backdrop-filter: blur(16px)`). |
| `--bg-card-hover` | `rgba(30, 41, 59, 0.85)` | Estado hover de tarjetas interactivas.                 |

### ⚡ Acentos Semánticos SQL

| Categoría       | Token              | HEX       | Uso Principal                                                      |
| :-------------- | :----------------- | :-------- | :----------------------------------------------------------------- |
| **DQL / Marca** | `--accent-cyan`    | `#06b6d4` | Consultas (`SELECT`, `JOIN`), botones primarios y branding.        |
| **Teoría & FK** | `--accent-indigo`  | `#6366f1` | Módulos teóricos, claves foráneas (`FK`) y arquitectura.           |
| **DML / Éxito** | `--accent-emerald` | `#10b981` | Modificaciones (`INSERT`, `UPDATE`, `DELETE`) y solución correcta. |
| **DDL / PK**    | `--accent-amber`   | `#f59e0b` | Estructura (`CREATE`, `ALTER`), claves primarias (`PK`) y tips.    |
| **TCL / Error** | `--accent-rose`    | `#f43f5e` | Transacciones (`COMMIT`, `ROLLBACK`) y errores sintácticos.        |
| **Procedural**  | `--accent-purple`  | `#a855f7` | Lógica avanzada (`TRIGGERS`, `PROCEDURES`, `FUNCTIONS`).           |

### 📝 Tipografía

- **Texto Primario (`--text-primary`):** `#f8fafc`
- **Texto Secundario (`--text-secondary`):** `#94a3b8`
- **Texto Atenuado (`--text-muted`):** `#64748b`
- **Fuentes:** `'Inter'` (Interfaz UI) y `'JetBrains Mono'` / `'Fira Code'` (Código SQL).

## 📚 Referencia

DOCUMENTOS FACULTAD Y Aprende SQL

## 📐 Wireframe & Features

### 🏛️ Estructura Global (Layout Base)

- **SplashScreen:** Pantalla de carga con pulso neón y salida animada (`AnimatePresence`).
- **Navbar:** Navegación persistente entre los 5 espacios, acceso a Onboarding y barra de progreso / XP en vivo.
- **Modal Bento Box Onboarding:** Cuadrícula interactiva con carrusel informativo de 3 pasos y resumen de nivel.

### 🚀 5 Espacios de Trabajo (Features Clave)

1. 🎓 **Teoría & Plan de Estudio (`theory`):**
   - Libretos temáticos modulares por taxonomía SQL.
   - Lecciones con pestañas conceptuales, ejemplos interactivos y notas _"💡 Cómo piensa un Ingeniero"_.

2. 💻 **Taller SQL / Playground (`playground`):**
   - **Motor SQLite WASM (`sql.js`):** Ejecución 100% local en cliente sin necesidad de backend.
   - **Editor de Código:** Sintaxis SQL resaltada, ejecución rápida y modo Sandbox libre.
   - **Validador Automático (`exerciseValidator`):** Evaluación estricta de columnas, matrices de datos y ordenamiento.
   - **Consola de Resultados:** Visualización tabular dinámica, feedback pedagógico de errores y métricas de ejecución.

3. 🧠 **Mapa Mental Dinámico (`mindmap`):**
   - Visualización interactiva en SVG con arquitectura drill-down (Vista global + detalle por categoría).
   - Animaciones fluidas con Framer Motion y botones de salto directo al taller práctico.

4. 🏋️ **Catálogo de Katas (`exercises`):**
   - Banco de ejercicios prácticos categorizados por dificultad (Fácil, Medio, Difícil).
   - Filtros por estado (Resuelto / Pendiente) y temas relacionales.

5. 📊 **Explorador de Esquemas & ERD (`schema`):**
   - Diagrama Entidad-Relación visual de las tablas de la base de datos.
   - Identificación visual de tipos de datos, PKs (`#f59e0b`) y FKs (`#6366f1`).
   - Visualizador de registros de muestra de cada tabla.
