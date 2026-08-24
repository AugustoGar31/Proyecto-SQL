/**
 * @file universidad.js
 * @description Esquema de datos para el dominio Académico (Universidad).
 */

export const SCHEMA_UNIVERSIDAD = {
  id: 'universidad',
  name: 'Gestión Académica Universitaria',
  description: 'Esquema relacional con información de estudiantes, cursos, profesores e inscripciones.',
  sqlSetup: `
    DROP TABLE IF EXISTS inscripciones;
    DROP TABLE IF EXISTS cursos;
    DROP TABLE IF EXISTS estudiantes;
    DROP TABLE IF EXISTS profesores;

    CREATE TABLE estudiantes (
      id_estudiante INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      carrera TEXT NOT NULL,
      promedio REAL NOT NULL,
      fecha_ingreso DATE NOT NULL
    );

    CREATE TABLE profesores (
      id_profesor INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      departamento TEXT NOT NULL,
      email TEXT UNIQUE
    );

    CREATE TABLE cursos (
      id_curso INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre_curso TEXT NOT NULL,
      creditos INTEGER NOT NULL,
      id_profesor INTEGER,
      FOREIGN KEY (id_profesor) REFERENCES profesores(id_profesor)
    );

    CREATE TABLE inscripciones (
      id_inscripcion INTEGER PRIMARY KEY AUTOINCREMENT,
      id_estudiante INTEGER NOT NULL,
      id_curso INTEGER NOT NULL,
      nota_final REAL,
      FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
      FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
    );

    INSERT INTO estudiantes (nombre, carrera, promedio, fecha_ingreso) VALUES
    ('Ana Gómez', 'Ingeniería en Sistemas', 9.2, '2022-03-15'),
    ('Carlos Pérez', 'Ingeniería en Sistemas', 8.1, '2021-08-10'),
    ('Lucía Fernández', 'Ciencia de Datos', 9.5, '2023-03-01'),
    ('Mateo Rossi', 'Ingeniería Industrial', 7.4, '2020-03-15'),
    ('Sofia Martínez', 'Ciencia de Datos', 8.8, '2022-08-01');

    INSERT INTO profesores (nombre, departamento, email) VALUES
    ('Dr. Roberto Silva', 'Computación', 'rsilva@uni.edu'),
    ('Dra. Elena Torres', 'Matemática', 'etorres@uni.edu'),
    ('Ing. Martin Paz', 'Computación', 'mpaz@uni.edu');

    INSERT INTO cursos (nombre_curso, creditos, id_profesor) VALUES
    ('Bases de Datos I', 6, 1),
    ('Algoritmos Avanzados', 5, 3),
    ('Estadística Aplicada', 6, 2),
    ('Inteligencia Artificial', 6, 1);

    INSERT INTO inscripciones (id_estudiante, id_curso, nota_final) VALUES
    (1, 1, 9.5),
    (1, 4, 9.0),
    (2, 1, 8.0),
    (3, 1, 9.8),
    (3, 3, 9.5),
    (4, 2, 7.5),
    (5, 3, 8.5);
  `
};
