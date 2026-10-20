/**
 * @file index.js
 * @description Exportador principal del Curriculum Ampliado de 11 Módulos de Aprendizaje SQL
 * (Módulo 0: Fundamentos + Módulos 1 a 10).
 */

import { MODULE_0_INTRO } from './module0_intro.js';
import { MODULE_1_DQL } from './module1_dql.js';
import { MODULE_2_AGGREGATIONS } from './module2_aggregations.js';
import { MODULE_3_JOINS } from './module3_joins.js';
import { MODULE_4_SUBQUERIES } from './module4_subqueries.js';
import { MODULE_5_WINDOW } from './module5_window.js';
import { MODULE_6_DML } from './module6_dml.js';
import { MODULE_7_DDL } from './module7_ddl.js';
import { MODULE_8_INDEXES } from './module8_indexes.js';
import { MODULE_9_PROCEDURAL } from './module9_procedural.js';
import { MODULE_10_TRANSACTIONS } from './module10_transactions.js';

export const CURRICULUM_DATA = [
  MODULE_0_INTRO,
  MODULE_1_DQL,
  MODULE_2_AGGREGATIONS,
  MODULE_3_JOINS,
  MODULE_4_SUBQUERIES,
  MODULE_5_WINDOW,
  MODULE_6_DML,
  MODULE_7_DDL,
  MODULE_8_INDEXES,
  MODULE_9_PROCEDURAL,
  MODULE_10_TRANSACTIONS
];

export const MODULES_DATA = CURRICULUM_DATA;

