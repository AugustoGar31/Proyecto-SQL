/**
 * @file simpleExplanations.js
 * @description Catálogo centralizado de explicaciones simplificadas para principiantes
 * y generador de plantillas limpias (cero spoilers) para el Editor SQL de NexoSQL.
 */

export const CLEAN_TEMPLATES = {
  DQL: `-- Escribe tu consulta aquí\nSELECT `,
  DDL: `-- Escribe tu sentencia DDL aquí\nCREATE `,
  DML: `-- Escribe tu sentencia DML aquí\nINSERT INTO `,
  PROCEDURAL: `-- Escribe tu disparador (Trigger) aquí\nCREATE TRIGGER `,
  TCL: `-- Escribe tu bloque transaccional aquí\nBEGIN TRANSACTION;\n`
};

export const DEFAULT_CLEAN_TEMPLATE = `-- Escribe tu consulta aquí\nSELECT `;

/**
 * Retorna la plantilla inicial limpia según la categoría del ejercicio,
 * garantizando cero respuestas filtradas en el editor.
 * @param {Object} exercise - Objeto del ejercicio o Kata activa.
 * @returns {string}
 */
export function getCleanStarterTemplate(exercise) {
  if (!exercise) return DEFAULT_CLEAN_TEMPLATE;

  const cat = (exercise.category || '').toUpperCase();
  const title = (exercise.title || '').toLowerCase();
  const prompt = (exercise.prompt || '').toLowerCase();

  if (cat === 'DDL') {
    if (title.includes('índice') || title.includes('indice') || prompt.includes('índice')) {
      return `-- Escribe tu sentencia DDL aquí\nCREATE INDEX `;
    }
    return `-- Escribe tu sentencia DDL aquí\nCREATE TABLE `;
  }

  if (cat === 'DML') {
    if (title.includes('actualiz') || prompt.includes('actualiz') || prompt.includes('update')) {
      return `-- Escribe tu sentencia DML aquí\nUPDATE `;
    }
    if (title.includes('elimin') || title.includes('borr') || prompt.includes('delete')) {
      return `-- Escribe tu sentencia DML aquí\nDELETE FROM `;
    }
    return `-- Escribe tu sentencia DML aquí\nINSERT INTO `;
  }

  if (cat === 'PROCEDURAL') {
    return `-- Escribe tu disparador (Trigger) aquí\nCREATE TRIGGER `;
  }

  if (cat === 'TCL') {
    return `-- Escribe tu bloque transaccional aquí\nBEGIN TRANSACTION;\n`;
  }

  // Por defecto para DQL y cualquier otra categoría:
  return `-- Escribe tu consulta aquí\nSELECT `;
}

/**
 * Diccionario de explicaciones simples para principiantes sobre el por qué de cada instrucción.
 */
export const SIMPLIFIED_EXPLANATIONS = {
  SELECT_FROM: {
    command: 'SELECT + FROM',
    summary: 'El SELECT elige qué columnas querés mirar, y el FROM le avisa a la base de datos en qué tabla buscar.',
    tip: 'Pensalo como abrir una libreta (FROM) y elegir con el dedo solo los datos que te interesan leer (SELECT).'
  },
  WHERE: {
    command: 'WHERE',
    summary: 'El WHERE actúa como un filtro o portero: revisa cada fila y solo deja pasar las que cumplen tu condición exacta, descartando todo lo que no te sirve.',
    tip: 'Si no ponés WHERE, la base de datos te traerá absolutamente todas las filas de la tabla.'
  },
  ORDER_BY: {
    command: 'ORDER BY',
    summary: 'El ORDER BY acomoda los resultados para que los leas fácil: de menor a mayor (ASC) o de mayor a menor (DESC), igual que cuando ordenás tus contactos alfabéticamente.',
    tip: 'Por defecto siempre ordena de forma ascendente (de la A a la Z o del menor al mayor número).'
  },
  JOIN: {
    command: 'JOIN (INNER / LEFT)',
    summary: 'El JOIN es como encastrar dos piezas de un rompecabezas: usa un dato que ambas tablas tienen en común (como un ID) para mostrarte toda la información junta en una sola fila.',
    tip: 'En lugar de guardar todo duplicado en una sola tabla gigante, guardás cosas relacionadas en tablas separadas y las unís con JOIN cuando las necesitás.'
  },
  GROUP_BY: {
    command: 'GROUP BY',
    summary: 'El GROUP BY junta las filas en bolsitas (por ejemplo, por curso o carrera) y funciones como COUNT o AVG te dicen cuántos hay o cuál es el promedio de cada bolsita.',
    tip: 'Cualquier columna que pongas en el SELECT que no esté adentro de una función matemática (como SUM o AVG) tiene que figurar en el GROUP BY.'
  },
  HAVING: {
    command: 'HAVING',
    summary: 'El HAVING es un filtro exclusivo para los grupitos que armaste con GROUP BY (por ejemplo: "mostrame solo las carreras que tengan más de 20 alumnos").',
    tip: 'El WHERE filtra filas individuales antes de agrupar; el HAVING filtra los grupos después de haberlos calculado.'
  },
  LIMIT: {
    command: 'LIMIT',
    summary: 'El LIMIT le pone un freno a la consulta: le dice a la base de datos que solo te traiga una cantidad máxima de resultados (por ejemplo, los primeros 5 o 10).',
    tip: 'Es ideal para mostrar resultados paginados o hacer pruebas rápidas sin traer millones de registros.'
  },
  DISTINCT: {
    command: 'DISTINCT',
    summary: 'El DISTINCT es un eliminador de duplicados: si una ciudad o un apellido se repite muchas veces, te lo muestra una sola vez en la lista.',
    tip: 'Úsalo cuando solo quieras ver valores únicos sin importar cuántas veces se repitan en la tabla.'
  },
  INSERT: {
    command: 'INSERT INTO',
    summary: 'El INSERT INTO agrega un renglón nuevo a la tabla con los datos que le pases, igual que cuando inscribís a un estudiante nuevo completando su ficha.',
    tip: 'Los valores tienen que coincidir en orden y tipo de dato con las columnas que especificaste.'
  },
  UPDATE: {
    command: 'UPDATE',
    summary: 'El UPDATE cambia datos que ya están guardados. ¡Ojo! Siempre va de la mano con un WHERE para actualizar únicamente la fila que querés y no cambiarle el dato a todos por error.',
    tip: 'Regla de oro de los programadores: nunca ejecutes un UPDATE sin antes verificar dos veces la cláusula WHERE.'
  },
  DELETE: {
    command: 'DELETE FROM',
    summary: 'El DELETE FROM borra renglones de la tabla. Al igual que el UPDATE, siempre lleva un WHERE para asegurarte de borrar solo el registro que querías eliminar.',
    tip: 'Si te olvidás del WHERE, vas a vaciar toda la tabla por completo.'
  },
  CREATE_TABLE: {
    command: 'CREATE TABLE',
    summary: 'El CREATE TABLE es como diseñar un formulario en blanco o una planilla de Excel: le ponés nombre a la tabla y definís qué casilleros (columnas) va a tener y qué tipo de dato acepta cada uno (texto, número, fecha).',
    tip: 'Asegurate de definir siempre una clave primaria (PRIMARY KEY) para que cada registro tenga un identificador único irrepetible.'
  },
  ALTER_TABLE: {
    command: 'ALTER TABLE',
    summary: 'El ALTER TABLE es para hacerle una reforma a la tabla cuando ya existe (como agregar una columna nueva sin tener que borrarla y volverla a crear).',
    tip: 'Te permite evolucionar tu base de datos a medida que los requerimientos del sistema van cambiando.'
  },
  DROP_TABLE: {
    command: 'DROP TABLE',
    summary: 'El DROP TABLE la demuele por completo: borra la tabla y todos sus datos para siempre, ¡así que se usa con muchísimo cuidado!',
    tip: 'En bases de datos de producción es una de las instrucciones más peligrosas si se ejecuta por accidente.'
  },
  CREATE_INDEX: {
    command: 'CREATE INDEX',
    summary: 'Un ÍNDICE es como el índice alfabético al final de un libro gordo: en lugar de hojear página por página buscando un dato, la base de datos va directo a la página exacta al instante.',
    tip: 'Acelera muchísimo las búsquedas con WHERE o los cruces con JOIN en tablas grandes.'
  },
  CREATE_TRIGGER: {
    command: 'CREATE TRIGGER',
    summary: 'Un TRIGGER (disparador) es como un sensor de movimiento o una alarma automática: se queda vigilando la tabla y, cuando alguien hace un cambio (como insertar o borrar algo), salta solo y ejecuta una acción por su cuenta sin que tengas que pedírselo.',
    tip: 'Se usa mucho para auditorías (guardar quién hizo un cambio y a qué hora) o para validar reglas complejas de negocio.'
  },
  PROCEDURAL: {
    command: 'PROCEDIMIENTO / FUNCIÓN',
    summary: 'Un PROCEDIMIENTO es como guardar una receta o un atajo de teclado: empaquetás una serie de pasos que hacés siempre bajo un solo nombre, para ejecutarlos todos juntos de un solo tiro cuando quieras.',
    tip: 'Evita tener que reescribir consultas largas una y otra vez desde tu aplicación.'
  },
  TRANSACTION: {
    command: 'BEGIN TRANSACTION / COMMIT / ROLLBACK',
    summary: 'Una TRANSACCIÓN es como una red de seguridad: te permite hacer varios cambios en paquete. Si todo sale bien, hacés COMMIT para guardar todo; si algo falla en el camino, hacés ROLLBACK (deshacer) y la base de datos vuelve a quedar exactamente como antes, sin romper nada.',
    tip: 'Es fundamental en operaciones bancarias o de compras: si te cobran el dinero pero el pedido falla, la transacción se cancela y tu dinero no se pierde.'
  }
};

/**
 * Obtiene la explicación amigable para principiantes correspondiente a un ejercicio o Kata.
 * @param {Object} exercise - Objeto del ejercicio.
 * @returns {Object} { command, summary, tip }
 */
export function getFriendlyExplanation(exercise) {
  if (!exercise) return SIMPLIFIED_EXPLANATIONS.SELECT_FROM;

  // Si el ejercicio ya trae un texto amigable en su propia metadata
  if (exercise.explanation && typeof exercise.explanation === 'string') {
    return {
      command: exercise.category || 'SQL',
      summary: exercise.explanation,
      tip: 'Escribe tu consulta y prueba ejecutarla para ver cómo responde la base de datos.'
    };
  }

  if (exercise.explanation && exercise.explanation.concept) {
    return {
      command: exercise.category || 'SQL',
      summary: exercise.explanation.concept,
      tip: exercise.explanation.tip || 'Comprender el por qué de la instrucción te permite resolver cualquier desafío similar.'
    };
  }

  const cat = (exercise.category || '').toUpperCase();
  const q = (exercise.expectedQuery || exercise.prompt || '').toUpperCase();
  const title = (exercise.title || '').toUpperCase();

  if (cat === 'PROCEDURAL' || q.includes('TRIGGER') || title.includes('TRIGGER')) {
    return SIMPLIFIED_EXPLANATIONS.CREATE_TRIGGER;
  }
  if (cat === 'TCL' || q.includes('TRANSACTION') || q.includes('COMMIT') || q.includes('ROLLBACK')) {
    return SIMPLIFIED_EXPLANATIONS.TRANSACTION;
  }
  if (cat === 'DDL') {
    if (q.includes('INDEX') || title.includes('INDICE') || title.includes('ÍNDICE')) {
      return SIMPLIFIED_EXPLANATIONS.CREATE_INDEX;
    }
    if (q.includes('ALTER') || title.includes('ALTER')) {
      return SIMPLIFIED_EXPLANATIONS.ALTER_TABLE;
    }
    if (q.includes('DROP') || title.includes('DROP')) {
      return SIMPLIFIED_EXPLANATIONS.DROP_TABLE;
    }
    return SIMPLIFIED_EXPLANATIONS.CREATE_TABLE;
  }
  if (cat === 'DML') {
    if (q.includes('UPDATE') || title.includes('ACTUALIZ')) {
      return SIMPLIFIED_EXPLANATIONS.UPDATE;
    }
    if (q.includes('DELETE') || title.includes('ELIMIN') || title.includes('BORR')) {
      return SIMPLIFIED_EXPLANATIONS.DELETE;
    }
    return SIMPLIFIED_EXPLANATIONS.INSERT;
  }

  // DQL y filtros
  if (q.includes('HAVING')) {
    return SIMPLIFIED_EXPLANATIONS.HAVING;
  }
  if (q.includes('GROUP BY') || q.includes('COUNT(') || q.includes('AVG(') || q.includes('SUM(')) {
    return SIMPLIFIED_EXPLANATIONS.GROUP_BY;
  }
  if (q.includes('JOIN')) {
    return SIMPLIFIED_EXPLANATIONS.JOIN;
  }
  if (q.includes('DISTINCT')) {
    return SIMPLIFIED_EXPLANATIONS.DISTINCT;
  }
  if (q.includes('ORDER BY')) {
    return SIMPLIFIED_EXPLANATIONS.ORDER_BY;
  }
  if (q.includes('LIMIT')) {
    return SIMPLIFIED_EXPLANATIONS.LIMIT;
  }
  if (q.includes('WHERE') || q.includes('IS NOT NULL') || q.includes('LIKE')) {
    return SIMPLIFIED_EXPLANATIONS.WHERE;
  }

  return SIMPLIFIED_EXPLANATIONS.SELECT_FROM;
}
