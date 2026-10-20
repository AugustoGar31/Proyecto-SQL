# 📌 Próximos Pasos & Roadmap - NexoSQL (QueryMaster Academy)

## 🎮 2. Gamificación, Motivación y Sistema de Logros

### 2.1. Sistema de Puntos (XP), Niveles y Desbloqueos
- **Apartado de usuario pero guardado en el localstorage sin que se pueda hackear con el login de google o sin nada por el estilo**: la idea es que por cada ejercicio que resuelva el usuario se le sumen puntos de experiencia, para que pueda ver sus logros en un apartado aparte, no guardando todo esto en un backend sino que en el mismo local storage!!! ya que la pagina no utiliza un backend. 
- **Puntuación por lección y módulo**: Asignar 10 puntos por lección y bonificaciones por resolver desafíos sin solicitar pistas.
- **Criterio de aprobación modular**: Exigir un mínimo de porsentaje por lo menos la mitad de todas las consultas resueltas del tema para el siguiente modulo, o completar el 100% de lecciones requeridas para desbloquear la insignia y el siguiente módulo.
- **Niveles de rango de ingeniería**: Rango progresivo del alumno (ej. _Junior Query Writer_, _Data Wrangler_, _Join Master_, _Index Architect_, _Database Guru_).

### 2.2. Insignias (Badges) y Logros Especiales

- **Insignias temáticas coleccionables**:
  - 🏅 _Join Champion_ (Completar todos los tipos de JOINs).
  - ⚡ _Index Whisperer_ (Optimizar una consulta reduciendo su costo en un 80%).
  - 🛡️ _ACID Guardian_ (Resolver todos los escenarios de transacciones y rollback).
  - 🔥 _Speed Coder_ (Resolver una kata en menos de 60 segundos).

-  **Porcentajes generales y por módulo**: Medir bien el porsentaje de completado total contando todas las actividades que hay por que no las cuenta a todas ya que a futuro seguro agregue mas!!! 
---

## 🤖 3. Asistente Inteligente con IA (NexoSQL AI Tutor)

### 3.1. Tutor Pedagógico en Tiempo Real

- **Chatbot interactivo integrado**: Asistente flotante o lateral capaz de responder dudas teóricas y guiar en la resolución de ejercicios.
- **Explicador semántico de errores**: En lugar de mostrar solo el error técnico de SQLite, la IA analiza la consulta del alumno y explica en lenguaje amigable qué falló (ej. _"Olvidaste agrupar por la columna ciudad antes de usar COUNT"_).
- **Modo Socrático**: Configuración pedagógica para que la IA brinde preguntas orientadoras y pistas en lugar de entregar el código de respuesta directamente.
- **Sugerencias de optimización**: Botón _"¿Cómo puedo mejorar esta consulta?"_ para que la IA sugiera refactorizaciones y buenas prácticas.

---

## 🗄️ 4. Datos, Esquemas y Persistencia

### 4.1. Expansión y Diversificación de Datasets

- **Nuevos esquemas de datos del mundo real**:
  - 🎬 **Streaming Platform** (Películas, actores, reproducciones, suscripciones, valoraciones).
  - 🏥 **Sistema Hospitalario** (Pacientes, médicos, citas, diagnósticos, recetas).
  - 📦 **Logística & Envíos** (Almacenes, transportistas, paquetes, rutas, entregas).
- **Volumen de datos representativo**: Incrementar los datos de prueba a 100 registros por tabla para que las agregaciones, filtros e índices demuestren diferencias reales de tiempo y rendimiento.

### 4.2. Exportación, Importación y Persistencia

- **Exportación de resultados**: Botón para descargar el resultado de cualquier consulta en formatos **CSV**, **JSON** y **Markdown/HTML**.
- **Importación de scripts y bases de datos**: Permitir al alumno arrastrar archivos `.sql` o `.db` (SQLite) locales para cargarlos en memoria en su navegador mediante WASM.
- **Persistencia en LocalStorage / IndexedDB**: Guardar automáticamente el progreso, consultas favoritas y estado del esquema para que no se pierdan al recargar la página.

---

## 🎨 5. Experiencia de Usuario (UX/UI), Accesibilidad y Navegación

### 5.1. Habilitación y Refactorización de Botones y Vistas Pendientes

- Revisar y habilitar todos los botones actualmente deshabilitados o con etiquetas de "Próximamente" en las tarjetas de ejercicios y panel de herramientas.
- Integrar historial de consultas ejecutadas recientes con timestamp, estado de éxito/error y duración en milisegundos.
- Panel de snippets y marcadores (Bookmarks) para guardar consultas frecuentes.

### 5.2. Página de Error 404 & Manejo de Estados Vacíos

- Diseñar una página 404 Neón Glassmorphic con temática de base de datos (_"Error 404: Tabla o Registro no encontrado en el Esquema"_).
- Crear estados vacíos atractivos (_Empty States_) con ilustraciones o animaciones sutiles cuando no haya resultados o historial.

---

## 🧪 6. Pruebas de Calidad, Resiliencia y Rendimiento

### 6.1. Pruebas de Concepto y Suite de Tests Automatizados

- **Tests unitarios del motor evaluador (`exerciseValidator.test.js`)**: Validar comparaciones de matrices, manejo de NULLs, tipos de datos y consultas con orden indistinto.
- **Tests de integración WASM**: Validar la carga y estabilidad de `sql.js` en diferentes navegadores y condiciones de red lenta.
- **Pruebas de estrés y seguridad**: Asegurar que consultas infinitas o recursivas no bloqueen el hilo principal de la UI (utilizar Web Workers si es necesario para la ejecución SQL).
