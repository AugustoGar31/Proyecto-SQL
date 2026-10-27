/**
 * @file ERDDiagram.jsx
 * @description Visualizador interactivo de Diagramas Entidad-Relación (ERD) para los esquemas relacionales.
 */

import React, { memo } from 'react';
import { SAMPLE_SCHEMAS } from '../../data/schemas/index.js';
import { useDbEngine } from '../../context/DbEngineContext.jsx';
import { Database, Key, Table as TableIcon } from 'lucide-react';

function extractTablesFromSql(sql) {
  if (!sql) return [];
  const tableRegex = /CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?([a-zA-Z0-9_]+)\s*\(([\s\S]*?)\);/gi;
  const tables = [];
  let match;
  while ((match = tableRegex.exec(sql)) !== null) {
    const tableName = match[1];
    const body = match[2];
    const lines = body.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('--'));
    const fields = [];
    for (const line of lines) {
      if (/^(PRIMARY\s+KEY|FOREIGN\s+KEY|CHECK|UNIQUE|CONSTRAINT)/i.test(line)) continue;
      const colMatch = line.match(/^([a-zA-Z0-9_]+)\s+([A-Z0-9_]+)(.*)/i);
      if (colMatch) {
        const colName = colMatch[1];
        const colType = colMatch[2].toUpperCase();
        const rest = colMatch[3] || '';
        const isPk = /PRIMARY\s+KEY/i.test(rest) || (colName.startsWith('id_') && !/FOREIGN/i.test(line));
        const isFk = /REFERENCES/i.test(rest) || /FOREIGN\s+KEY/i.test(line);
        let tag = '';
        if (isPk) tag = ' (PK)';
        else if (isFk) tag = ' (FK)';
        fields.push([`${colName}${tag}`, colType]);
      }
    }
    if (fields.length > 0) {
      tables.push({ name: tableName, fields });
    }
  }
  return tables;
}

export const ERDDiagram = memo(function ERDDiagram({ schemaId, schema: schemaProp }) {
  const { currentSchemaId } = useDbEngine();
  const schemaKey = schemaId || schemaProp || currentSchemaId || 'universidad';
  const schema = SAMPLE_SCHEMAS[schemaKey] || SAMPLE_SCHEMAS['universidad'];
  const tables = (schema && schema.tables) ? schema.tables : extractTablesFromSql(schema?.sqlSetup);

  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
          <Database size={20} />
          <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>
            Diagrama ERD del Esquema: <span style={{ color: 'var(--accent-cyan)' }}>{schema.name}</span>
          </h3>
        </div>
        <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
          🔒 Esquema Contextual Fijo
        </span>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        {schema.description}
      </p>

      {/* Grid de Tablas Relacionales del ERD Dinámico */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {tables.map((table) => (
          <TableBox key={table.name} name={table.name} fields={table.fields} />
        ))}
      </div>
    </div>
  );
});

const TableBox = memo(function TableBox({ name, fields }) {
  return (
    <div style={{ background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.88rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.4rem', marginBottom: '0.5rem' }}>
        <TableIcon size={16} />
        <span>{name}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {fields.map(([f, type], idx) => {
          const isPk = f.includes('(PK)');
          const isFk = f.includes('(FK)');
          return (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
              <span style={{ color: isPk ? 'var(--accent-amber)' : isFk ? 'var(--accent-indigo)' : '#ffffff', fontFamily: 'var(--font-code)', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                {isPk && <Key size={12} />}
                {f}
              </span>
              <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-code)' }}>{type}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
});
