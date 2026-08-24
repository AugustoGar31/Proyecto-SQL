/**
 * @file index.js
 * @description Exportador unificado de esquemas de bases de datos relacionales.
 */

import { SCHEMA_UNIVERSIDAD } from './universidad.js';
import { SCHEMA_ECOMMERCE } from './ecommerce.js';
import { SCHEMA_BANCO } from './banco.js';

export const SAMPLE_SCHEMAS = {
  universidad: SCHEMA_UNIVERSIDAD,
  tienda_online: SCHEMA_ECOMMERCE,
  banco: SCHEMA_BANCO
};
