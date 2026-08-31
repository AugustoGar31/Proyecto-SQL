# 🎨 Sistema de Diseño y Paleta de Colores - NexoSQL

**Proyecto:** NexoSQL (QueryMaster Academy / Plataforma Educativa SQL Master)  
**Estilo Visual:** Dark Mode Neón Glassmorphism & High-Contrast Cyber-Tech  
**Ubicación de Tokens:** [`src/styles/theme.css`](file:///c:/Users/Usuario/Documents/Pagina%20SQL/src/styles/theme.css) | [`src/styles/glassmorphism.css`](file:///c:/Users/Usuario/Documents/Pagina%20SQL/src/styles/glassmorphism.css)

---

## 📌 1. Filosofía de Color y Diseño

La identidad visual de **NexoSQL** está construida bajo una estética técnica moderna orientada a la ingeniería de bases de datos. Combina una base en modo ultra oscuro (Midnight Slate) con **acentos neón de alto contraste y código de color semántico por categoría de SQL** (DQL, DML, DDL, TCL y Procedural), garantizando legibilidad, accesibilidad y aprendizaje nemotécnico ágil.

---

## 🌌 2. Fondos, Superficies y Capas (Surfaces & Glassmorphism)

| Token CSS | Color HEX / RGBA | Muestra | Nombre | Uso Principal |
| :--- | :--- | :---: | :--- | :--- |
| `--bg-main` | `#070a12` | ⬛ | Midnight Void | Fondo general de la aplicación y viewport base. |
| `--bg-elevated` | `#0f172a` | 🟦 | Slate Deep | Paneles modales, barras laterales y tarjetas elevadas. |
| `--bg-input` | `#0b1120` | ⬛ | Dark Slate Input | Cajas de texto, editores SQL y consolas de ejecución. |
| `--bg-card` | `rgba(15, 23, 42, 0.75)` | 🔲 | Glassmorphic Surface | Tarjetas translúcidas con desenfoque de fondo (`backdrop-filter: blur(16px)`). |
| `--bg-card-hover` | `rgba(30, 41, 59, 0.85)` | 🔲 | Glassmorphic Hover | Estado activo o hover en tarjetas interactivas. |

---

## ⚡ 3. Colores Semánticos y Taxonomía SQL (Acentos Neón)

Cada rama del lenguaje SQL y estado del sistema posee un identificador cromático único:

### 🔹 DQL (Data Query Language) & Identidad de Marca
* **Token:** `--accent-cyan`
* **HEX:** `#06b6d4`
* **RGB:** `rgb(6, 182, 212)`
* **Glow / Resplandor:** `rgba(6, 182, 212, 0.25)`
* **Borde:** `rgba(6, 182, 212, 0.4)`
* **Aplicación:** Consultas de lectura (`SELECT`, `JOIN`, `GROUP BY`), botones primarios de acción, enlaces activos, branding y acento principal.

### 💜 Teoría, Arquitectura & Claves Foráneas
* **Token:** `--accent-indigo`
* **HEX:** `#6366f1`
* **RGB:** `rgb(99, 102, 241)`
* **Glow / Resplandor:** `rgba(99, 102, 241, 0.25)`
* **Borde:** `rgba(99, 102, 241, 0.4)`
* **Aplicación:** Módulos teóricos, sección *"💡 Cómo piensa un Ingeniero"*, claves foráneas (`FK`) en diagramas ERD y botones secundarios.

### 🟢 DML (Data Manipulation Language) & Éxito
* **Token:** `--accent-emerald`
* **HEX:** `#10b981`
* **RGB:** `rgb(16, 185, 129)`
* **Glow / Resplandor:** `rgba(16, 185, 129, 0.25)`
* **Aplicación:** Modificación de datos (`INSERT`, `UPDATE`, `DELETE`, `MERGE`), katas resueltas exitosamente y estados de validación correctos.

### 🟡 DDL (Data Definition Language) & Claves Primarias
* **Token:** `--accent-amber`
* **HEX:** `#f59e0b`
* **RGB:** `rgb(245, 158, 11)`
* **Glow / Resplandor:** `rgba(245, 158, 11, 0.25)`
* **Aplicación:** Estructura de esquemas (`CREATE`, `ALTER`, `DROP`), claves primarias (`PK`) en diagramas relacionales, advertencias y pistas pedagógicas.

### 🔴 TCL (Transaction Control Language) & Errores
* **Token:** `--accent-rose`
* **HEX:** `#f43f5e`
* **RGB:** `rgb(244, 63, 94)`
* **Glow / Resplandor:** `rgba(244, 63, 94, 0.25)`
* **Aplicación:** Control transaccional (`COMMIT`, `ROLLBACK`, `SAVEPOINT`), mensajes de error de sintaxis SQL y estados críticos.

### 🟣 SQL Procedural & Automatización
* **Token:** `--accent-purple`
* **HEX:** `#a855f7` (Variante clara: `#c084fc`)
* **RGB:** `rgb(168, 85, 247)`
* **Glow / Resplandor:** `rgba(168, 85, 247, 0.25)`
* **Aplicación:** Lógica avanzada en base de datos (`TRIGGERS`, `STORED PROCEDURES`, `FUNCTIONS`).

---

## 📝 4. Tipografía y Escala Neutra de Texto

| Token CSS | Color HEX | Rol y Legibilidad |
| :--- | :--- | :--- |
| `--text-primary` | `#f8fafc` | **Texto Principal**: Títulos (`H1`, `H2`, `H3`), etiquetas de navegación activa y valores destacados. |
| `--text-secondary` | `#94a3b8` | **Texto Secundario**: Párrafos explicativos, descripciones de módulos y etiquetas de apoyo. |
| `--text-muted` | `#64748b` | **Texto Atenuado**: Comentarios de código, números de línea, metadatos y timestamps. |
| *(Mono Code)* | `#e2e8f0` | **Texto de Código**: Código SQL dentro de bloques Markdown y celdas de resultados. |

---

## 🔲 5. Bordes, Sombras y Efectos Glow

```css
/* Bordes Sutiles y Resaltados */
--border-subtle: rgba(255, 255, 255, 0.08);
--border-highlight: rgba(255, 255, 255, 0.18);
--border-cyan: rgba(6, 182, 212, 0.4);
--border-indigo: rgba(99, 102, 241, 0.4);

/* Sombras de Profundidad */
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 16px 40px rgba(0, 0, 0, 0.6);

/* Efectos Glow Neón */
--glow-cyan: 0 0 20px rgba(6, 182, 212, 0.35);
--glow-indigo: 0 0 20px rgba(99, 102, 241, 0.35);
```

---

## 🌈 6. Gradientes Oficiales del Sistema

1. **Fondo Global con Luz Ambiental (App Container)**:
   ```css
   background-image: 
     radial-gradient(circle at 15% 15%, rgba(6, 182, 212, 0.08) 0%, transparent 40%),
     radial-gradient(circle at 85% 85%, rgba(99, 102, 241, 0.08) 0%, transparent 40%);
   ```

2. **Botón de Acción Primario (Cian Eléctrico a Azul Océano)**:
   ```css
   background: linear-gradient(135deg, #06b6d4, #0284c7);
   ```

3. **Botón de Acción Secundario (Índigo a Púrpura Profundo)**:
   ```css
   background: linear-gradient(135deg, #6366f1, #4f46e5);
   ```

4. **Lienzo del Mapa Mental Interactivo**:
   ```css
   background: radial-gradient(circle at center, #0f172a 0%, #030712 100%);
   ```

---

## 📏 7. Tokens de Geometría y Tipografía Complementarios

### Radios de Borde (Border Radius)
* `--radius-sm`: `6px` (Botones, inputs, badges y celdas)
* `--radius-md`: `12px` (Tarjetas, modales pequeños, contenedores de bloques)
* `--radius-lg`: `18px` (Contenedores principales y paneles de secciones)
* `--radius-full`: `9999px` (Píldoras, chips y avatar badges)

### Familias Tipográficas
* **Interfaz (UI):** `'Inter', system-ui, -apple-system, sans-serif`
* **Código & SQL:** `'JetBrains Mono', 'Fira Code', Consolas, monospace`
