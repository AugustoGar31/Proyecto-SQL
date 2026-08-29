/**
 * @file ERDDiagram.jsx
 * @description Visualizador interactivo de Diagramas Entidad-Relación (ERD) para los esquemas relacionales.
 */

import React, { memo } from 'react';
import { SAMPLE_SCHEMAS } from '../../data/schemas/index.js';
import { useDbEngine } from '../../context/DbEngineContext.jsx';
import { Database, Key, Table as TableIcon } from 'lucide-react';

export const ERDDiagram = memo(function ERDDiagram() {
  const { currentSchemaId } = useDbEngine();
  const schemaKey = currentSchemaId || 'universidad';
  const schema = SAMPLE_SCHEMAS[schemaKey] || SAMPLE_SCHEMAS['universidad'];

  return (
    <div className="glass-card" style={{ padding: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <Database size={20} />
        <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>
          Diagrama ERD del Esquema: <span style={{ color: 'var(--accent-cyan)' }}>{schema.name}</span>
        </h3>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        {schema.description}
      </p>

      {/* Grid de Tablas Relacionales del ERD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {schemaKey === 'universidad' && (
          <>
            <TableBox name="estudiantes" fields={[['id_estudiante (PK)', 'INTEGER'], ['nombre', 'TEXT'], ['carrera', 'TEXT'], ['promedio', 'REAL'], ['fecha_ingreso', 'DATE']]} />
            <TableBox name="profesores" fields={[['id_profesor (PK)', 'INTEGER'], ['nombre', 'TEXT'], ['departamento', 'TEXT'], ['email', 'TEXT']]} />
            <TableBox name="cursos" fields={[['id_curso (PK)', 'INTEGER'], ['nombre_curso', 'TEXT'], ['creditos', 'INTEGER'], ['id_profesor (FK)', 'INTEGER']]} />
            <TableBox name="inscripciones" fields={[['id_inscripcion (PK)', 'INTEGER'], ['id_estudiante (FK)', 'INTEGER'], ['id_curso (FK)', 'INTEGER'], ['nota_final', 'REAL']]} />
          </>
        )}

        {schemaKey === 'tienda_online' && (
          <>
            <TableBox name="clientes" fields={[['id_cliente (PK)', 'INTEGER'], ['nombre', 'TEXT'], ['email', 'TEXT'], ['pais', 'TEXT'], ['saldo', 'REAL']]} />
            <TableBox name="productos" fields={[['id_producto (PK)', 'INTEGER'], ['nombre_producto', 'TEXT'], ['categoria', 'TEXT'], ['precio', 'REAL'], ['stock', 'INTEGER']]} />
            <TableBox name="pedidos" fields={[['id_pedido (PK)', 'INTEGER'], ['id_cliente (FK)', 'INTEGER'], ['fecha_pedido', 'DATE'], ['monto_total', 'REAL']]} />
            <TableBox name="auditoria_stock" fields={[['id_auditoria (PK)', 'INTEGER'], ['id_producto', 'INTEGER'], ['stock_anterior', 'INTEGER'], ['stock_nuevo', 'INTEGER']]} />
          </>
        )}

        {schemaKey === 'banco' && (
          <>
            <TableBox name="cuentas_bancarias" fields={[['id_cuenta (PK)', 'INTEGER'], ['titular', 'TEXT'], ['tipo_cuenta', 'TEXT'], ['saldo', 'REAL']]} />
            <TableBox name="transacciones_log" fields={[['id_log (PK)', 'INTEGER'], ['id_origen', 'INTEGER'], ['id_destino', 'INTEGER'], ['monto', 'REAL']]} />
          </>
        )}
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
