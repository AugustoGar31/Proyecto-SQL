/**
 * @file module0_intro.js
 * @description Módulo 0: Fundamentos del Motor Relacional y Módulo Cero Interactivo.
 */

export const MODULE_0_INTRO = {
  id: 'mod-0-intro',
  title: '0. Fundamentos del Motor Relacional',
  description: 'Comprende las bases conceptuales de las bases de datos relacionales frente a hojas de cálculo/archivos planos, el funcionamiento interno del motor (Parser, Optimizador, Motor de Ejecución) y la historia y estándares de SQL.',
  icon: 'GraduationCap',
  categoryCode: 'M0',
  lessons: [
    {
      id: 'les-m0-relational',
      title: 'Bases de Datos Relacionales vs. Excel & Archivos Planos',
      schemaId: 'universidad',
      mindmapNodeId: 'INTRO',
      summary: '¿Por qué la industria no corre sobre archivos CSV o Excel? Entiende las garantías ACID, concurrencia masiva e integridad referencial.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
Una hoja de cálculo (Excel/CSV) carece de **mecanismos de bloqueo a nivel de fila (Row-Level Locking)** y **registro de escritura anticipada (WAL - Write-Ahead Logging)**.
* Si 1,000 usuarios intentan escribir a la vez en un archivo plano, se produce una condición de carrera (*race condition*) con **corrupción inevitable de datos**.
* En un RDBMS (PostgreSQL, MySQL, SQLite), el gestor garantiza la propiedad **ACID**: Atomicidad, Consistencia, Aislamiento y Durabilidad, resolviendo transacciones concurrentes en milisegundos mediante índices B-Tree estructurados.
      `,
      contentMarkdown: `
### 📊 Tabla Comparativa Fundamental: RDBMS vs. Archivos Planos / Excel

| Dimensión Crítica | Hoja de Cálculo (Excel / CSV) | Base de Datos Relacional (RDBMS) |
| :--- | :--- | :--- |
| **Integridad de Datos** | Sin restricciones estrictas; errores manuales de tipo. | Restricciones de Dominio, Claves Primarias y Foráneas (\`FK\`). |
| **Concurrencia** | Bloqueo de archivo completo (monousuario para escritura). | Miles de transacciones simultáneas con aislamiento MVCC. |
| **Volumetría y Rendimiento** | Límite práctico de 1M de filas con degradación en RAM. | Decenas de Terabytes gestionados eficientemente en disco. |
| **Consistencia Transaccional** | Sin soporte para ROLLBACK si falla a mitad de proceso. | Garantía **ACID**: O todo se aplica con éxito (\`COMMIT\`) o nada (\`ROLLBACK\`). |
| **Consultas Complejas** | Fórmulas frágiles (\`VLOOKUP\` / \`BUSCARX\`) lentas. | Álgebra Relacional optimizada mediante lenguaje declarativo **SQL**. |

---

### 🛡️ ¿Qué son las Propiedades ACID?
1. **Atomicidad (Atomicity):** Una transacción es indivisible. O se ejecutan todas las instrucciones o ninguna.
2. **Consistencia (Consistency):** La base de datos siempre pasa de un estado válido a otro, respetando todas las reglas de integridad.
3. **Aislamiento (Isolation):** Las operaciones concurrentes se ejecutan sin interferir entre sí como si fueran secuenciales.
4. **Durabilidad (Durability):** Una vez confirmado (\`COMMIT\`), el cambio persiste incluso ante un corte de energía eléctrico.
      `,
      exercises: [
        {
          id: 'ex-m0-1',
          title: 'Verificación del Motor Relacional',
          category: 'DQL',
          prompt: 'Ejecuta una consulta para inspeccionar los primeros 5 alumnos registrados en el sistema universitario.',
          initialCode: `-- Escribe tu consulta aquí
SELECT id_alumno, nombre, apellido
FROM alumnos
LIMIT 5;`,
          expectedQuery: 'SELECT id_alumno, nombre, apellido FROM alumnos LIMIT 5;',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Proyecta las columnas principales de la tabla alumnos y limita el resultado con LIMIT 5.'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'SELECT id_alumno, nombre, apellido\nFROM alumnos\nLIMIT 5;'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'SELECT id_alumno, nombre, apellido FROM alumnos LIMIT 5 recupera 5 tuplas directamente desde la memoria caché o páginas de datos del motor.'
            }
          ],
          explanation: {
            concept: 'SELECT y LIMIT permiten extraer un subconjunto controlado de registros.',
            underTheHood: '⚡ En SQLite, LIMIT 5 detiene el escaneo tan pronto como el cursor B-Tree ha recuperado 5 registros, ahorrando E/S.'
          }
        }
      ]
    },
    {
      id: 'les-m0-engine',
      title: 'Arquitectura Interna del Motor SQL (Parser, Optimizador, Ejecución)',
      schemaId: 'universidad',
      mindmapNodeId: 'ENGINE',
      summary: 'Descubre cómo viaja una consulta SQL desde el texto escrito hasta los bloques de memoria física y disco.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
SQL es un **lenguaje declarativo**: tú defines *QUÉ* datos quieres obtener, pero NO *CÓMO* debe buscarlos el hardware.
El **Optimizador de Consultas basado en Costes (CBO)** evalúa miles de posibles rutas de ejecución (Index Scan vs Table Scan, Hash Join vs Nested Loop) y elige la que consuma menos accesos a páginas de disco (\`I/O cost\`).
      `,
      contentMarkdown: `
### ⚙️ El Pipeline del Motor Relacional en 3 Fases:

\`\`\`
  [ Sentencia SQL ]
          │
          ▼
┌─────────────────────────┐
│  1. PARSER & LEXER      │ ➔ Análisis léxico/sintáctico. Genera el Árbol Sintáctico Abstracto (AST).
└──────────┬──────────────┘
          │
          ▼
┌─────────────────────────┐
│  2. QUERY OPTIMIZER     │ ➔ Analiza estadísticas de tablas/índices. Elige el Plan de Ejecución de menor costo.
└──────────┬──────────────┘
          │
          ▼
┌─────────────────────────┐
│  3. EXECUTION ENGINE    │ ➔ Lee páginas del Buffer Pool / Disco y devuelve las tuplas resultantes.
└─────────────────────────┘
\`\`\`

#### 1. Parser & Validador Semántico:
Verifica que las palabras clave sean válidas, que las tablas y columnas existan en el catálogo del sistema (\`sqlite_master\` / \`information_schema\`) y que el usuario tenga privilegios.

#### 2. Optimizador de Consultas (Query Optimizer):
Es el cerebro del motor. Transforma el AST en un **Plan de Ejecución**. Decide si utiliza un índice B-Tree existente o si debe realizar un escaneo secuencial completo (*Full Table Scan*).

#### 3. Motor de Ejecución & Buffer Pool:
El ejecutor orquesta los cursores. Para maximizar el rendimiento, mantiene las páginas de datos más frecuentes en la memoria RAM (**Buffer Pool**), reduciendo drásticamente las lecturas a disco.
      `,
      exercises: [
        {
          id: 'ex-m0-2',
          title: 'Exploración de Metadatos del Sistema',
          category: 'DQL',
          prompt: 'Consulta el catálogo de tablas del sistema para listar los nombres de todas las tablas existentes en la base de datos.',
          initialCode: `-- Escribe tu consulta aquí
SELECT name
FROM sqlite_master
WHERE type = 'table' AND name NOT LIKE 'sqlite_%';`,
          expectedQuery: "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%';",
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Filtra la tabla de sistema sqlite_master para obtener los registros donde type sea igual a table.'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: "SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%';"
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'La tabla sqlite_master es el diccionario de datos interno que el Parser consulta para validar esquemas.'
            }
          ],
          explanation: {
            concept: 'Los motores relacionales mantienen catálogos de metadatos consultables mediante SQL estándar.',
            underTheHood: '⚡ El catálogo de esquema reside en la página raíz (Page 1) del archivo de base de datos.'
          }
        }
      ]
    },
    {
      id: 'les-m0-history',
      title: 'Historia de SQL, Estándares ANSI y su Relevancia Actual',
      schemaId: 'universidad',
      mindmapNodeId: 'STANDARDS',
      summary: 'De Edgar F. Codd en IBM (1970) a la era del Cloud Analytics, Lakehouses y Text-to-SQL con IA.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
Muchos paradigmas de programación nacen y mueren, pero SQL lleva más de 50 años como el estándar inamovible de los datos.
Hoy en día, incluso tecnologías NoSQL, motores Big Data (Spark, Trino) y almacenes modernos en la nube (Snowflake, BigQuery) exponen capas SQL. Saber SQL profundo es la habilidad de mayor retorno de inversión técnica (*ROI*) en la ingeniería de software.
      `,
      contentMarkdown: `
### 📜 Hitos Históricos de SQL:
* **1970:** Edgar F. Codd publica el paper fundacional: *"A Relational Model of Data for Large Shared Data Banks"*.
* **1974:** Donald Chamberlin y Raymond Boyce desarrollan **SEQUEL** en IBM San Jose Research Laboratory.
* **1986 / 1989:** Publicación de los primeros estándares oficiales **ANSI SQL-86** y **SQL-89**.
* **1992:** El estándar **SQL-92** (SQL2) define la sintaxis formal de los \`JOIN\` explícitos (\`INNER\`, \`LEFT\`, \`RIGHT\`, \`FULL\`).
* **1999 (SQL3):** Incorporación de disparadores (\`TRIGGERS\`), tipos definidos por el usuario y recursividad (\`WITH RECURSIVE\`).
* **2003 en adelante:** Introducción de funciones de ventana (\`OVER()\`, \`ROW_NUMBER()\`, \`PARTITION BY\`) y soporte nativo para JSON/XML.
* **Presente:** SQL se consolida como la interfaz universal para Machine Learning (\`BigQuery ML\`), Lakehouses y agentes de IA generativa (*Text-to-SQL*).
      `,
      exercises: [
        {
          id: 'ex-m0-3',
          title: 'Consulta de Información Institucional',
          category: 'DQL',
          prompt: 'Selecciona el nombre y el presupuesto de todos los departamentos ordenados de mayor a menor presupuesto.',
          initialCode: `-- Escribe tu consulta aquí
SELECT nombre, presupuesto
FROM departamentos
ORDER BY presupuesto DESC;`,
          expectedQuery: 'SELECT nombre, presupuesto FROM departamentos ORDER BY presupuesto DESC;',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Proyecta nombre y presupuesto de departamentos y utiliza ORDER BY con la palabra clave DESC.'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'SELECT nombre, presupuesto FROM departamentos ORDER BY presupuesto DESC;'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'SELECT nombre, presupuesto FROM departamentos ORDER BY presupuesto DESC aplica el estándar ANSI SQL-92 para ordenar tuplas.'
            }
          ],
          explanation: {
            concept: 'ORDER BY DESC ordena los registros numéricos o alfanuméricos de forma descendente.',
            underTheHood: '⚡ Si existe un índice en presupuesto, el motor recorre las hojas del árbol B-Tree en sentido inverso sin necesidad de un Sort en memoria temporal.'
          }
        }
      ]
    }
  ]
};
