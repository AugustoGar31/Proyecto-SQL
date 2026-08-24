/**
 * @file SchemaExplorerView.jsx
 * @description Espacio de Trabajo 5: Explorador de Esquemas Relacionales y ERD.
 * Permite seleccionar bases de datos de prueba e inspeccionar tablas y registros de muestra.
 */

import React from 'react';
import { ERDDiagram } from './ERDDiagram.jsx';
import { SAMPLE_SCHEMAS } from '../../data/schemas/index.js';
import { useDbEngine } from '../../context/DbEngineContext.jsx';
import { Database, Table, Layers } from 'lucide-react';

export function SchemaExplorerView() {
  const { currentSchemaId, runQuery } = useDbEngine();
  const [selectedTable, setSelectedTable] = React.useState(null);

  const schemas = Object.values(SAMPLE_SCHEMAS);

  return (
    <div className="space-container">
      {/* Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)' }}>
          <Database size={28} />
          <h1 style={{ fontSize: '1.75rem', color: '#ffffff', margin: 0 }}>
            Explorador de Arquitectura y Esquemas
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          Inspecciona las tablas relacionales, claves primarias/foráneas y los registros iniciales de prueba.
        </p>
      </div>

      {/* Grid del ERD Diagram */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <ERDDiagram />
      </div>
    </div>
  );
}
