# 🎓 Resumen Ejecutivo de Proyecto - Plataforma Educativa SQL Master

**Proyecto:** Plataforma Web Interactiva para la Enseñanza y Práctica de SQL (Clásico & Procedural)  
**Dirigido a:** Autoridades Académicas  
**Área de Aplicación:** Bases de Datos I, II

---

## 📌 1. Descripción General del Proyecto
**SQL Master** es una plataforma educativa web de última generación diseñada para acompañar el proceso de aprendizaje teórico y práctico de los estudiantes de Ingeniería y Tecnología en el dominio de Bases de Datos Relacionales.

La aplicación combina la fundamentación teórica de la ciencia de datos con un **entorno de ejecución SQL interactivo en tiempo real**, permitiendo a los estudiantes experimentar sin riesgo, analizar el rendimiento de sus consultas y comprender *"cómo piensa un motor de base de datos de producción"*.

---

## 🎯 2. Ventajas Académicas e Innovación Pedagógica

1. **Sin Necesidad de Instalación Compleja en Laboratorios**:
   - Gracias a la integración del motor **SQLite compilado a WebAssembly (`sql.js`)**, la base de datos se ejecuta al 100% de manera privada dentro del navegador web del estudiante.
   - **Cero dependencia de servidores externos** ni configuraciones complejas de credenciales o software pesado en las computadoras de la facultad.

2. **Enfoque de Ingeniería de Producción**:
   - Más allá de la sintaxis SQL básica, enseña conceptos clave de rendimiento: **Índices B-Tree**, análisis de **Planes de Ejecución (`EXPLAIN QUERY PLAN`)**, registros en diario **Write-Ahead Logging (WAL)** y **Propiedades ACID Transaccionales**.

3. **Evaluación y Retroalimentación Inmediata**:
   - Valida automáticamente las respuestas de los estudiantes mediante comparación de matrices de datos esperados vs. obtenidos, acelerando el aprendizaje autónomo.

---

## 🏛️ 3. Componentes de la Plataforma (Espacios de Trabajo)

La plataforma se organiza en **5 Espacios de Trabajo independientes**:

* 🎓 **1. Teoría & Plan de Estudio (Syllabus)**:
  - Currículum estructurado en **10 Módulos de Aprendizaje** desde consultas básicas hasta funciones de ventana, DML, DDL, Triggers y Transacciones.
  - Incluye la sección especial *"💡 Cómo piensa un Ingeniero de Producción"*.

* 💻 **2. Taller SQL Interactivo (Playground)**:
  - Editor de código SQL con atajos de teclado (`Ctrl + Enter`), formateador visual y tabla de resultados con tiempo de latencia en milisegundos.
  - Inspector *"⚡ Bajo el Capó"* para visualizar la estrategia de acceso al almacenamiento.

* 🧠 **3. Mapa Mental Interactivo del Lenguaje SQL**:
  - Arbol taxonómico dinámico en SVG que clasifica las familias del lenguaje (**DQL, DML, DDL, TCL, DCL y SQL Procedural**), facilitando la comprensión estructural del alumno.

* 🏋️ **4. Catálogo de Desafíos & Katas**:
  - Banco de problemas graduados por dificultad con sistema de pistas escalonadas.

* 📊 **5. Explorador de Arquitectura y ERD**:
  - Inspector relacional visual de Diagramas Entidad-Relación y tablas relacionales de prueba (*Universidad, Tienda Online, Banco*).

---

## 💻 4. Especificaciones Técnicas

* **Arquitectura Frontend**: React + Vite (Estructura Modular Desacoplada).
* **Motor de Datos**: SQLite compilado a WebAssembly (WASM).
* **Interfaz de Usuario**: Sistema de Diseño Neón Glassmorphic en Modo Oscuro con tipografía técnica (`Inter` + `JetBrains Mono`).
* **Portabilidad**: 100% ejecutable en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari) sin requerir servidor backend activo.

---

## 📝 5. Conclusión
Este proyecto representa una solución moderna, portátil e interactiva para fortalecer las competencias de los estudiantes en el diseño, consulta y optimización de bases de datos relacionales, constituyendo una herramienta pedagógica complementaria de alto valor para las asignaturas de la facultad.
