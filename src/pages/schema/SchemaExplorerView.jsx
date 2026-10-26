/**
 * @file SchemaExplorerView.jsx
 * @description Espacio de Trabajo 5: Explorador de Arquitectura y Esquemas Relacionales.
 * Permite seleccionar interactivamente entre los distintos dominios relacionales (Universidad,
 * E-Commerce y Banco), ver sus diagramas ERD y cargarlos en el motor SQLite en memoria.
 */

import React, { useState } from 'react';
import { ERDDiagram } from '../../components/schema/ERDDiagram.jsx';
import { SAMPLE_SCHEMAS } from '../../data/schemas/index.js';
import { useDbEngine } from '../../context/DbEngineContext.jsx';
import { Database, GraduationCap, ShoppingBag, Landmark, CheckCircle2, Layers } from 'lucide-react';
import { Button } from '../../components/common/Button.jsx';

const SCHEMA_CONFIG = [
  {
    id: 'universidad',
    title: 'Universidad',
    domain: 'Académico & Calificaciones',
    icon: GraduationCap,
    color: 'var(--accent-cyan)',
    borderColor: 'rgba(6, 182, 212, 0.4)'
  },
  {
    id: 'tienda_online',
    title: 'E-Commerce',
    domain: 'Ventas, Clientes & Stock',
    icon: ShoppingBag,
    color: 'var(--accent-emerald)',
    borderColor: 'rgba(16, 185, 129, 0.4)'
  },
  {
    id: 'banco',
    title: 'Banca & Finanzas',
    domain: 'Cuentas & Transacciones ACID',
    icon: Landmark,
    color: 'var(--accent-amber)',
    borderColor: 'rgba(245, 158, 11, 0.4)'
  }
];

export function SchemaExplorerView() {
  const { currentSchemaId, switchSchema, isReady } = useDbEngine();
  const [selectedSchemaId, setSelectedSchemaId] = useState(currentSchemaId || 'universidad');

  const activeSchemaInfo = SAMPLE_SCHEMAS[selectedSchemaId] || SAMPLE_SCHEMAS['universidad'];
  const isCurrentlyLoadedInEngine = currentSchemaId === selectedSchemaId;

  const handleSelectSchema = (schemaId) => {
    setSelectedSchemaId(schemaId);
  };

  const handleLoadIntoEngine = () => {
    if (switchSchema) {
      switchSchema(selectedSchemaId);
    }
  };

  return (
    <div className="space-container">
      {/* Header del Espacio */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)' }}>
            <Database size={28} />
            <h1 style={{ fontSize: '1.75rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
              Explorador de Arquitectura y Esquemas
            </h1>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.25rem', marginBottom: 0 }}>
            Inspecciona las entidades relacionales, claves primarias/foráneas y carga bases de datos de prueba en el motor SQLite.
          </p>
        </div>

        {/* Indicador de Motor */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: isReady ? 'var(--accent-emerald)' : 'var(--accent-amber)' }} />
            Motor activo: <strong style={{ color: '#ffffff' }}>{currentSchemaId || 'universidad'}</strong>
          </span>
        </div>
      </div>

      {/* Selector de Esquemas en Pestañas / Bento Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}
      >
        {SCHEMA_CONFIG.map((config) => {
          const isSelected = selectedSchemaId === config.id;
          const isEngineActive = currentSchemaId === config.id;
          const Icon = config.icon;
          const schemaData = SAMPLE_SCHEMAS[config.id];
          const tableCount = schemaData?.tables?.length || 0;

          return (
            <div
              key={config.id}
              onClick={() => handleSelectSchema(config.id)}
              className="glass-card"
              style={{
                padding: '1.1rem 1.25rem',
                cursor: 'pointer',
                borderRadius: 'var(--radius-md)',
                border: isSelected ? `2px solid ${config.color}` : '1px solid var(--border-subtle)',
                background: isSelected ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.65)',
                boxShadow: isSelected ? `0 0 20px ${config.borderColor}` : 'none',
                transition: 'all 0.25s ease'
              }}
              role="button"
              tabIndex={0}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: config.color,
                      border: `1px solid ${config.borderColor}`
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1rem', color: isSelected ? '#ffffff' : 'var(--text-primary)', fontWeight: 600 }}>
                      {config.title}
                    </h3>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {config.domain}
                    </span>
                  </div>
                </div>

                {isEngineActive && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.7rem',
                      color: 'var(--accent-emerald)',
                      background: 'rgba(16, 185, 129, 0.1)',
                      border: '1px solid rgba(16, 185, 129, 0.25)',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontWeight: 600
                    }}
                  >
                    <CheckCircle2 size={11} /> Activa
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.6rem' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Layers size={13} /> {tableCount} tablas relacionales
                </span>
                <span style={{ color: config.color, fontWeight: 600, fontSize: '0.75rem' }}>
                  {isSelected ? 'Inspeccionando' : 'Clic para ver'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra de Acciones del Esquema Seleccionado */}
      <div
        className="glass-panel"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.85rem 1.25rem',
          marginBottom: '1.25rem',
          borderLeft: '4px solid var(--accent-cyan)'
        }}
      >
        <div>
          <span style={{ fontSize: '0.88rem', color: '#ffffff', fontWeight: 600 }}>
            Base de Datos: <span style={{ color: 'var(--accent-cyan)' }}>{activeSchemaInfo.name}</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>
            ({activeSchemaInfo.id})
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isCurrentlyLoadedInEngine ? (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              <CheckCircle2 size={16} /> Cargada en el Motor SQL
            </span>
          ) : (
            <Button
              variant="primary"
              size="sm"
              onClick={handleLoadIntoEngine}
              icon={Database}
            >
              Cargar "{activeSchemaInfo.name}" en SQLite
            </Button>
          )}
        </div>
      </div>

      {/* Visualizador del Diagrama ERD para el esquema seleccionado */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <ERDDiagram schemaId={selectedSchemaId} />
      </div>
    </div>
  );
}
