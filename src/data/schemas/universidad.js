/**
 * @file universidad.js
 * @description Esquema de datos para el dominio Institucional y Académico de NexoSQL.
 */

export const SCHEMA_UNIVERSIDAD = {
  id: 'universidad',
  name: 'Gestión Académica Universitaria (NexoSQL)',
  description: 'Esquema relacional integral con departamentos, carreras, asignaturas, docentes, aulas, comisiones, exámenes y actas de notas.',
  tables: [
    {
      name: 'estudiantes',
      fields: [
        ['id_estudiante (PK)', 'INTEGER'],
        ['nombre', 'TEXT'],
        ['carrera', 'TEXT'],
        ['promedio', 'REAL'],
        ['fecha_ingreso', 'DATE']
      ]
    },
    {
      name: 'profesores',
      fields: [
        ['id_profesor (PK)', 'INTEGER'],
        ['nombre', 'TEXT'],
        ['departamento', 'TEXT'],
        ['email', 'TEXT']
      ]
    },
    {
      name: 'cursos',
      fields: [
        ['id_curso (PK)', 'INTEGER'],
        ['nombre_curso', 'TEXT'],
        ['creditos', 'INTEGER'],
        ['id_profesor (FK)', 'INTEGER']
      ]
    },
    {
      name: 'inscripciones',
      fields: [
        ['id_inscripcion (PK)', 'INTEGER'],
        ['id_alumno (FK)', 'INTEGER'],
        ['id_comision (FK)', 'INTEGER'],
        ['id_estudiante (FK)', 'INTEGER'],
        ['id_curso (FK)', 'INTEGER'],
        ['nota_final', 'REAL']
      ]
    },
    {
      name: 'departamentos',
      fields: [
        ['id_departamento (PK)', 'INTEGER'],
        ['nombre', 'TEXT'],
        ['presupuesto', 'REAL']
      ]
    },
    {
      name: 'alumnos',
      fields: [
        ['id_alumno (PK)', 'INTEGER'],
        ['nombre', 'TEXT'],
        ['apellido', 'TEXT'],
        ['email', 'TEXT'],
        ['dni', 'TEXT'],
        ['fecha_ingreso', 'DATE']
      ]
    },
    {
      name: 'carreras',
      fields: [
        ['id_carrera (PK)', 'INTEGER'],
        ['nombre', 'TEXT'],
        ['titulo', 'TEXT'],
        ['duracion', 'INTEGER'],
        ['id_departamento (FK)', 'INTEGER']
      ]
    },
    {
      name: 'docentes',
      fields: [
        ['id_docente (PK)', 'INTEGER'],
        ['nombre', 'TEXT'],
        ['apellido', 'TEXT'],
        ['salario_base', 'REAL'],
        ['id_departamento (FK)', 'INTEGER']
      ]
    },
    {
      name: 'asignaturas',
      fields: [
        ['id_asignatura (PK)', 'INTEGER'],
        ['nombre', 'TEXT'],
        ['creditos', 'INTEGER'],
        ['id_departamento (FK)', 'INTEGER']
      ]
    },
    {
      name: 'comisiones',
      fields: [
        ['id_comision (PK)', 'INTEGER'],
        ['id_asignatura (FK)', 'INTEGER'],
        ['id_docente (FK)', 'INTEGER'],
        ['cupo', 'INTEGER'],
        ['tipo_comision', 'TEXT']
      ]
    }
  ],
  sqlSetup: `
    -- Limpieza previa
    DROP TABLE IF EXISTS notas;
    DROP TABLE IF EXISTS examenes;
    DROP TABLE IF EXISTS inscripciones_final;
    DROP TABLE IF EXISTS mesas_finales;
    DROP TABLE IF EXISTS inscripciones;
    DROP TABLE IF EXISTS alumno_comision;
    DROP TABLE IF EXISTS comisiones;
    DROP TABLE IF EXISTS correlatividades;
    DROP TABLE IF EXISTS asignaturas;
    DROP TABLE IF EXISTS alumno_carrera;
    DROP TABLE IF EXISTS carreras;
    DROP TABLE IF EXISTS docentes;
    DROP TABLE IF EXISTS aulas;
    DROP TABLE IF EXISTS departamentos;
    DROP TABLE IF EXISTS alumnos;
    DROP TABLE IF EXISTS estudiantes;
    DROP TABLE IF EXISTS profesores;
    DROP TABLE IF EXISTS cursos;

    -- 1. Departamentos
    CREATE TABLE departamentos (
      id_departamento INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      presupuesto REAL NOT NULL
    );

    -- 2. Alumnos
    CREATE TABLE alumnos (
      id_alumno INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      email TEXT UNIQUE,
      telefono TEXT,
      dni TEXT UNIQUE,
      fecha_ingreso DATE NOT NULL
    );

    -- 3. Carreras
    CREATE TABLE carreras (
      id_carrera INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      titulo TEXT NOT NULL,
      duracion INTEGER NOT NULL, -- en años
      carga_horaria INTEGER NOT NULL,
      modalidad TEXT NOT NULL, -- 'presencial' | 'virtual'
      nivel TEXT NOT NULL, -- 'grado' | 'posgrado' | 'pregrado'
      id_departamento INTEGER,
      FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento)
    );

    -- 4. Alumno - Carrera
    CREATE TABLE alumno_carrera (
      id_alumno INTEGER NOT NULL,
      id_carrera INTEGER NOT NULL,
      fecha_inscripcion DATE NOT NULL,
      estado TEXT NOT NULL, -- 'activa' | 'inactiva' | 'graduado'
      PRIMARY KEY (id_alumno, id_carrera),
      FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno),
      FOREIGN KEY (id_carrera) REFERENCES carreras(id_carrera)
    );

    -- 5. Docentes
    CREATE TABLE docentes (
      id_docente INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      fecha_ingreso DATE NOT NULL,
      salario_base REAL NOT NULL CHECK (salario_base >= 0),
      id_departamento INTEGER NOT NULL,
      FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento)
    );

    -- 6. Asignaturas
    CREATE TABLE asignaturas (
      id_asignatura INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      creditos INTEGER NOT NULL,
      carga_horaria INTEGER NOT NULL,
      es_obligatoria INTEGER NOT NULL DEFAULT 1, -- 1 = obligatoria, 0 = optativa
      id_departamento INTEGER NOT NULL,
      FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento)
    );

    -- 7. Correlatividades
    CREATE TABLE correlatividades (
      id_asignatura INTEGER NOT NULL,
      id_correlativa INTEGER NOT NULL,
      PRIMARY KEY (id_asignatura, id_correlativa),
      FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id_asignatura),
      FOREIGN KEY (id_correlativa) REFERENCES asignaturas(id_asignatura)
    );

    -- 8. Aulas
    CREATE TABLE aulas (
      id_aula INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      tipo TEXT NOT NULL, -- 'laboratorio' | 'centro de computos' | 'teorica'
      capacidad INTEGER NOT NULL CHECK (capacidad > 0)
    );

    -- 9. Comisiones
    CREATE TABLE comisiones (
      id_comision INTEGER PRIMARY KEY AUTOINCREMENT,
      id_asignatura INTEGER NOT NULL,
      id_docente INTEGER,
      id_aula INTEGER,
      anio INTEGER NOT NULL,
      cuatrimestre INTEGER NOT NULL,
      cupo INTEGER NOT NULL CHECK (cupo > 0),
      tipo_comision TEXT NOT NULL, -- 'practica' | 'teorica'
      horario TEXT,
      FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id_asignatura),
      FOREIGN KEY (id_docente) REFERENCES docentes(id_docente),
      FOREIGN KEY (id_aula) REFERENCES aulas(id_aula)
    );

    -- 10. Inscripciones a Comisiones y Cursos (Modelo relacional institucional)
    CREATE TABLE inscripciones (
      id_inscripcion INTEGER PRIMARY KEY AUTOINCREMENT,
      id_alumno INTEGER,
      id_comision INTEGER,
      fecha_inscripcion DATE NOT NULL,
      estado TEXT NOT NULL, -- 'Cursa' | 'Aprobada' | 'Regular' | 'Baja'
      id_estudiante INTEGER,
      id_curso INTEGER,
      nota_final REAL,
      FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno),
      FOREIGN KEY (id_comision) REFERENCES comisiones(id_comision),
      FOREIGN KEY (id_estudiante) REFERENCES estudiantes(id_estudiante),
      FOREIGN KEY (id_curso) REFERENCES cursos(id_curso)
    );

    -- 11. Exámenes
    CREATE TABLE examenes (
      id_examen INTEGER PRIMARY KEY AUTOINCREMENT,
      id_asignatura INTEGER NOT NULL,
      id_comision INTEGER,
      tipo TEXT NOT NULL, -- 'Parcial 1' | 'Parcial 2' | 'Final' | 'Recuperatorio'
      fecha DATE NOT NULL,
      FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id_asignatura),
      FOREIGN KEY (id_comision) REFERENCES comisiones(id_comision)
    );

    -- 12. Notas
    CREATE TABLE notas (
      id_nota INTEGER PRIMARY KEY AUTOINCREMENT,
      id_examen INTEGER NOT NULL,
      id_alumno INTEGER NOT NULL,
      nota REAL NOT NULL CHECK (nota >= 0 AND nota <= 10),
      aprobado INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (id_examen) REFERENCES examenes(id_examen),
      FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno)
    );

    -- 13. Mesas Finales
    CREATE TABLE mesas_finales (
      id_mesa INTEGER PRIMARY KEY AUTOINCREMENT,
      id_asignatura INTEGER NOT NULL,
      id_docente INTEGER NOT NULL,
      id_aula INTEGER NOT NULL,
      fecha DATE NOT NULL,
      turno TEXT NOT NULL, -- 'Mañana' | 'Tarde' | 'Noche'
      llamado INTEGER NOT NULL, -- 1 | 2
      FOREIGN KEY (id_asignatura) REFERENCES asignaturas(id_asignatura),
      FOREIGN KEY (id_docente) REFERENCES docentes(id_docente),
      FOREIGN KEY (id_aula) REFERENCES aulas(id_aula)
    );

    -- 14. Inscripciones a Mesas Finales
    CREATE TABLE inscripciones_final (
      id_inscripcion_final INTEGER PRIMARY KEY AUTOINCREMENT,
      id_mesa INTEGER NOT NULL,
      id_alumno INTEGER NOT NULL,
      fecha_inscripcion DATE NOT NULL,
      nota REAL,
      estado TEXT NOT NULL, -- 'inscripto' | 'aprobado' | 'desaprobado' | 'ausente'
      FOREIGN KEY (id_mesa) REFERENCES mesas_finales(id_mesa),
      FOREIGN KEY (id_alumno) REFERENCES alumnos(id_alumno)
    );

    -- Tablas espejo para compatibilidad retroactiva
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
      id_profesor INTEGER
    );

    -- =========================================================================
    -- POBLACIÓN DE DATOS (SEEDING REALISTA)
    -- =========================================================================

    -- Departamentos
    INSERT INTO departamentos (id_departamento, nombre, presupuesto) VALUES
    (1, 'Ingeniería y Computación', 1500000.00),
    (2, 'Ciencias Básicas y Matemáticas', 850000.00),
    (3, 'Ciencias Económicas y Gestión', 1100000.00),
    (4, 'Humanidades y Comunicación', 400000.00),
    (5, 'Departamento sin Asignaciones', 200000.00);

    -- Carreras
    INSERT INTO carreras (id_carrera, nombre, titulo, duracion, carga_horaria, modalidad, nivel, id_departamento) VALUES
    (1, 'Ingeniería en Sistemas', 'Ingeniero en Sistemas de Información', 5, 3800, 'presencial', 'grado', 1),
    (2, 'Ciencia de Datos', 'Licenciado en Ciencia de Datos', 4, 3200, 'presencial', 'grado', 1),
    (3, 'Licenciatura en Administración Digital', 'Licenciado en Administración', 4, 2800, 'virtual', 'grado', 3),
    (4, 'Tecnicatura en Ciberseguridad', 'Técnico Universitario en Ciberseguridad', 2, 1600, 'virtual', 'pregrado', 1),
    (5, 'Maestría en Inteligencia Artificial', 'Magíster en Inteligencia Artificial', 2, 1200, 'virtual', 'posgrado', 1),
    (6, 'Carrera Sin Alumnos Activos', 'Bachiller Universitario', 3, 1800, 'presencial', 'pregrado', 4);

    -- Alumnos
    INSERT INTO alumnos (id_alumno, nombre, apellido, email, telefono, dni, fecha_ingreso) VALUES
    (1, 'Ana', 'Gómez', 'ana.gomez@uni.edu', '11-4589-2231', '42111222', '2023-03-15'),
    (2, 'Carlos', 'Pérez', 'carlos.perez@uni.edu', '11-3322-1144', '41555666', '2023-04-01'),
    (3, 'Lucía', 'Fernández', 'lucia.fernandez@uni.edu', '11-9988-7766', '43888999', '2023-02-20'),
    (4, 'Mateo', 'Rossi', 'mateo.rossi@uni.edu', NULL, '39222333', '2021-03-10'),
    (5, 'Sofia', 'Martínez', 'sofia.martinez@uni.edu', '11-6655-4433', '44123456', '2023-08-15'),
    (6, 'Joaquín', 'Silva', 'joaquin.silva@uni.edu', NULL, '40555777', '2022-03-01'),
    (7, 'Valentina', 'López', 'valentina.lopez@uni.edu', '11-7788-9900', '43111444', '2023-03-10'),
    (8, 'Facundo', 'Castro', 'facundo.castro@uni.edu', '11-2233-4455', '38999888', '2019-08-01'),
    (9, 'Camila', 'Morales', 'camila.morales@uni.edu', NULL, '45222111', '2024-03-01'),
    (10, 'Nicolás', 'Ruiz', 'nicolas.ruiz@uni.edu', '11-8899-0011', '44888777', '2023-06-15');

    -- Alumno - Carrera
    INSERT INTO alumno_carrera (id_alumno, id_carrera, fecha_inscripcion, estado) VALUES
    (1, 1, '2023-03-15', 'activa'),
    (2, 1, '2023-04-01', 'activa'),
    (3, 2, '2023-02-20', 'activa'),
    (4, 1, '2021-03-10', 'activa'),
    (5, 2, '2023-08-15', 'activa'),
    (6, 3, '2022-03-01', 'activa'),
    (7, 3, '2023-03-10', 'activa'),
    (8, 4, '2019-08-01', 'inactiva'),
    (10, 5, '2023-06-15', 'activa');
    -- Alumno 9 queda intencionalmente sin carrera para ejercicios de LEFT JOIN (alumno huérfano)

    -- Docentes
    INSERT INTO docentes (id_docente, nombre, apellido, email, fecha_ingreso, salario_base, id_departamento) VALUES
    (1, 'Roberto', 'Silva', 'rsilva@uni.edu', '2018-03-01', 380000.00, 1),
    (2, 'Elena', 'Torres', 'etorres@uni.edu', '2017-08-15', 520000.00, 2),
    (3, 'Martín', 'Paz', 'mpaz@uni.edu', '2019-02-01', 395000.00, 1),
    (4, 'Valeria', 'Benítez', 'vbenitez@uni.edu', '2021-03-15', 420000.00, 3),
    (5, 'Guillermo', 'Ríos', 'grios@uni.edu', '2023-03-01', 310000.00, 1),
    (6, 'Mariana', 'Acosta', 'macosta@uni.edu', '2016-04-01', 650000.00, 2),
    (7, 'Docente', 'Sin Comisiones', 'docente.libre@uni.edu', '2024-01-10', 300000.00, 4);

    -- Asignaturas
    INSERT INTO asignaturas (id_asignatura, nombre, creditos, carga_horaria, es_obligatoria, id_departamento) VALUES
    (1, 'Bases de Datos I', 6, 80, 1, 1),
    (2, 'Algoritmos y Estructuras de Datos', 6, 96, 1, 1),
    (3, 'Álgebra Lineal', 4, 64, 1, 2),
    (4, 'Inteligencia Artificial', 6, 80, 1, 1),
    (5, 'Sistemas Operativos', 5, 75, 1, 1),
    (6, 'Taller de Emprendimiento', 2, 32, 0, 3),
    (7, 'Ética Profesional', 2, 40, 0, 4),
    (8, 'Arquitectura de Datos Cloud', 6, 90, 1, 1),
    (9, 'Asignatura Sin Comisiones 2025', 4, 60, 1, 1);

    -- Aulas
    INSERT INTO aulas (id_aula, nombre, tipo, capacidad) VALUES
    (1, 'Laboratorio Turing 101', 'laboratorio', 40),
    (2, 'Centro de Cómputos B', 'centro de computos', 35),
    (3, 'Aula Magna San Martín', 'teorica', 120),
    (4, 'Aula 204 (Teórica)', 'teorica', 50),
    (5, 'Laboratorio Ada Lovelace', 'laboratorio', 25),
    (6, 'Aula Pequeña Inutilizada', 'teorica', 15);

    -- Comisiones
    INSERT INTO comisiones (id_comision, id_asignatura, id_docente, id_aula, anio, cuatrimestre, cupo, tipo_comision, horario) VALUES
    (1, 1, 1, 1, 2025, 1, 35, 'practica', 'Lun/Mie 08:00 - 10:00'),
    (2, 1, 3, 2, 2025, 1, 30, 'practica', 'Mar/Jue 18:00 - 20:00'),
    (3, 2, 1, 1, 2025, 1, 40, 'practica', 'Lun/Mie 10:00 - 12:00'),
    (4, 3, 2, 3, 2025, 1, 60, 'teorica', 'Vie 08:00 - 12:00'),
    (5, 4, 1, 5, 2025, 2, 25, 'practica', 'Mar/Jue 14:00 - 16:00'),
    (6, 5, 3, 2, 2025, 1, 35, 'practica', 'Lun/Mie 14:00 - 16:00'),
    (7, 6, 4, 4, 2024, 2, 45, 'teorica', 'Sab 09:00 - 12:00'),
    (8, 8, 1, 1, 2025, 2, 35, 'practica', 'Mar/Jue 10:00 - 12:00');

    -- Inscripciones a comisiones y cursos
    INSERT INTO inscripciones (id_inscripcion, id_alumno, id_comision, fecha_inscripcion, estado, id_estudiante, id_curso, nota_final) VALUES
    (1, 1, 1, '2025-02-15', 'Cursa', 1, 1, 9.5),
    (2, 2, 1, '2025-02-16', 'Cursa', 2, 1, 8.0),
    (3, 3, 1, '2025-02-16', 'Cursa', 3, 2, NULL),
    (4, 4, 2, '2025-02-18', 'Cursa', 4, 2, 7.0),
    (5, 5, 3, '2025-02-20', 'Cursa', 5, 3, NULL),
    (6, 6, 4, '2025-02-21', 'Aprobada', 1, 3, 9.0),
    (7, 7, 4, '2025-02-22', 'Cursa', 2, 4, 8.5),
    (8, 1, 3, '2025-02-15', 'Cursa', 3, 4, NULL),
    (9, 2, 3, '2025-02-16', 'Cursa', 4, 1, 6.5),
    (10, 3, 5, '2025-07-10', 'Cursa', 5, 2, 10.0);

    -- Exámenes
    INSERT INTO examenes (id_examen, id_asignatura, id_comision, tipo, fecha) VALUES
    (1, 1, 1, 'Parcial 1', '2025-04-15'),
    (2, 1, 1, 'Parcial 2', '2025-06-10'),
    (3, 2, 3, 'Parcial 1', '2025-04-20'),
    (4, 3, 4, 'Parcial 1', '2025-05-05');

    -- Notas
    INSERT INTO notas (id_nota, id_examen, id_alumno, nota, aprobado) VALUES
    (1, 1, 1, 9.5, 1),
    (2, 1, 2, 8.0, 1),
    (3, 1, 3, 9.8, 1),
    (4, 2, 1, 9.0, 1),
    (5, 3, 5, 7.5, 1),
    (6, 4, 6, 8.5, 1),
    (7, 4, 7, 3.5, 0);

    -- Mesas Finales
    INSERT INTO mesas_finales (id_mesa, id_asignatura, id_docente, id_aula, fecha, turno, llamado) VALUES
    (1, 1, 1, 3, '2025-07-15', 'Mañana', 1),
    (2, 2, 3, 3, '2025-07-18', 'Tarde', 1),
    (3, 3, 2, 4, '2025-07-20', 'Mañana', 1);

    -- Inscripciones a Mesas Finales
    INSERT INTO inscripciones_final (id_inscripcion_final, id_mesa, id_alumno, fecha_inscripcion, nota, estado) VALUES
    (1, 1, 1, '2025-07-01', 9.0, 'aprobado'),
    (2, 1, 2, '2025-07-02', 4.0, 'aprobado'),
    (3, 2, 5, '2025-07-05', 8.0, 'aprobado');

    -- Población de tablas espejo (compatibilidad)
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
  `
};
