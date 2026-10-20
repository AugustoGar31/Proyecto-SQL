/**
 * @file module7_ddl.js
 * @description Módulo 7: Definición de Estructura y Esquemas (DDL).
 */

export const MODULE_7_DDL = {
  id: 'mod-7-ddl',
  title: '7. Definición de Esquemas (DDL)',
  description: 'Diseña y crea tablas relacionales, define tipos de datos y establece restricciones de integridad (PRIMARY KEY, FOREIGN KEY, CHECK).',
  icon: 'Database',
  categoryCode: 'DDL',
  lessons: [
    {
      id: 'les-ddl-create-table',
      title: 'Creación de Tablas y Restricciones (CREATE TABLE)',
      schemaId: 'universidad',
      mindmapNodeId: 'DDL',
      summary: 'Establece el diseño de objetos relacionales e impón reglas de dominio.',
      engineerPerspective: `
### 💡 Cómo piensa un Ingeniero de Base de Datos:
La elección correcta de tipos de datos ahorra terabytes de almacenamiento. Utiliza tipos enteros del tamaño adecuado y define restricciones como \`NOT NULL\` y \`CHECK\` para impedir que datos corruptos entren a tu base de datos.
      `,
      contentMarkdown: `
\`\`\`sql
CREATE TABLE departamentos (
  id_departamento INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL UNIQUE,
  presupuesto REAL CHECK(presupuesto >= 0)
);
\`\`\`
      `,
      exercises: [
        {
          id: 'ex-ddl-1',
          title: 'Crear Tabla de Departamentos',
          category: 'DDL',
          prompt: 'Crea una tabla llamada "departamentos_nuevos" con id_departamento (INTEGER PRIMARY KEY), nombre (TEXT NOT NULL) y presupuesto (REAL).',
          initialCode: `-- Escribe tu sentencia DDL aquí\nCREATE TABLE `,
          expectedQuery: 'CREATE TABLE departamentos_nuevos (id_departamento INTEGER PRIMARY KEY, nombre TEXT NOT NULL, presupuesto REAL);',
          hints: [
            {
              level: 1,
              type: 'conceptual',
              title: 'Pista Conceptual',
              content: 'Usa la instrucción CREATE TABLE departamentos_nuevos (...)'
            },
            {
              level: 2,
              type: 'syntax_skeleton',
              title: 'Esqueleto Sintáctico',
              content: 'CREATE TABLE departamentos_nuevos (\n  id_departamento INTEGER PRIMARY KEY,\n  nombre TEXT NOT NULL,\n  presupuesto REAL\n);'
            },
            {
              level: 3,
              type: 'solution_breakdown',
              title: 'Explicación de la Solución',
              content: 'DDL define la estructura registrando la nueva tabla en el catálogo del sistema.'
            }
          ],
          explanation: {
            concept: 'El CREATE TABLE es como diseñar un formulario en blanco o una planilla de Excel: le ponés nombre a la tabla y definís qué casilleros (columnas) va a tener y qué tipo de dato acepta cada uno (número, texto, fecha).',
            tip: 'Asegurate de definir siempre una clave primaria (PRIMARY KEY) para que cada registro tenga un identificador único irrepetible.'
          }
        }
      ]
    }
  ]
};
