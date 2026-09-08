/**
 * @file RelationalVsFlatFile.jsx
 * @description Comparador interactivo: Base de Datos Relacional (RDBMS) vs. Hojas de Cálculo (Excel/CSV).
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, FileSpreadsheet, ShieldAlert, ShieldCheck, Zap, Lock, RefreshCw, Layers, Check, X } from 'lucide-react';

export function RelationalVsFlatFile() {
  const [activeTab, setActiveTab] = useState('matrix'); // 'matrix' | 'simulator'
  const [concurrencyStatus, setConcurrencyStatus] = useState('idle'); // 'idle' | 'conflict' | 'resolved'

  const comparisonData = [
    {
      feature: 'Concurrencia y Bloqueos',
      excel: 'Bloqueo de archivo completo. Si 2 usuarios guardan cambios a la vez, se sobrescriben o crean copias de conflicto.',
      rdbms: 'Control de concurrencia multiversión (MVCC) y bloqueos a nivel de fila (Row-Level Locking) en milisegundos.',
      winner: 'rdbms'
    },
    {
      feature: 'Integridad y Restricciones',
      excel: 'Celdas no tipadas; se pueden ingresar textos en columnas de fechas o números sin validación de motor.',
      rdbms: 'Tipado estricto, claves foráneas (FK), restricciones CHECK, NOT NULL y claves únicas garantizadas.',
      winner: 'rdbms'
    },
    {
      feature: 'Consistencia Transaccional (ACID)',
      excel: 'No existe ROLLBACK automático si se interrumpe una macro o fórmula a mitad de camino.',
      rdbms: 'Atomicidad y Durabilidad completas. Las transacciones incompletas se revierten (ROLLBACK) sin corromper datos.',
      winner: 'rdbms'
    },
    {
      feature: 'Volumen y Rendimiento',
      excel: 'Límite de 1,048,576 filas; consumo exponencial de memoria RAM y congelamientos.',
      rdbms: 'Millones de filas organizadas en estructuras de árbol B-Tree optimizadas para almacenamiento en disco y caché.',
      winner: 'rdbms'
    },
    {
      feature: 'Seguridad y Privilegios',
      excel: 'Contraseña simple de apertura; no permite ocultar columnas o filas específicas por rol de usuario.',
      rdbms: 'Permisos granulares (GRANT/REVOKE) por tabla, vista, columna e incluso seguridad a nivel de fila (RLS).',
      winner: 'rdbms'
    }
  ];

  const handleSimulateConcurrency = () => {
    setConcurrencyStatus('conflict');
    setTimeout(() => {
      setConcurrencyStatus('resolved');
    }, 2200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header & Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.75rem' }}>
        <div>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Database size={22} color="var(--accent-cyan)" />
            RDBMS vs. Archivos Planos & Excel
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: '0.25rem 0 0 0' }}>
            Descubre por qué las aplicaciones empresariales y la ingeniería moderna requieren un motor relacional.
          </p>
        </div>

        <div className="space-tabs" style={{ margin: 0 }}>
          <button
            onClick={() => setActiveTab('matrix')}
            className={`tab-btn ${activeTab === 'matrix' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
          >
            📊 Matriz Comparativa
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`tab-btn ${activeTab === 'simulator' ? 'active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem' }}
          >
            ⚡ Simulador de Concurrencia
          </button>
        </div>
      </div>

      {activeTab === 'matrix' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.4fr 1.4fr', gap: '0.75rem', fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', padding: '0 0.5rem' }}>
            <span>Característica</span>
            <span style={{ color: 'var(--accent-rose)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FileSpreadsheet size={16} /> Hoja de Cálculo / CSV
            </span>
            <span style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Database size={16} /> Base de Datos Relacional
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {comparisonData.map((item, idx) => (
              <div
                key={idx}
                className="glass-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.2fr 1.4fr 1.4fr',
                  gap: '1rem',
                  padding: '1rem',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderColor: 'rgba(255, 255, 255, 0.06)'
                }}
              >
                <div style={{ fontWeight: 600, color: '#ffffff', fontSize: '0.92rem' }}>
                  {item.feature}
                </div>

                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                  <X size={16} color="var(--accent-rose)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{item.excel}</span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#e2e8f0', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: 'rgba(6, 182, 212, 0.06)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                  <Check size={16} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{item.rdbms}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'simulator' && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="glass-card"
          style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h4 style={{ margin: 0, color: '#ffffff', fontSize: '1.05rem' }}>
                Simulación: 2 Usuarios Modificando el Mismo Registro Simultáneamente
              </h4>
              <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Observa cómo reacciona un archivo Excel frente al motor transaccional de NexoSQL.
              </p>
            </div>

            <button
              onClick={handleSimulateConcurrency}
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
            >
              <Zap size={16} />
              Simular Escritura Concurrente
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginTop: '0.5rem' }}>
            {/* Lado Excel */}
            <div style={{ background: 'rgba(244, 63, 94, 0.06)', border: '1px solid var(--accent-rose-glow)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-rose)', fontWeight: 600, fontSize: '0.92rem' }}>
                <FileSpreadsheet size={18} />
                <span>Archivo Plano (Excel / CSV)</span>
              </div>

              {concurrencyStatus === 'idle' && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Presiona "Simular Escritura" para intentar actualizar el saldo de la fila 42 desde dos puestos de trabajo.
                </p>
              )}

              {concurrencyStatus === 'conflict' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-rose)', fontSize: '0.85rem' }}>
                  <ShieldAlert size={20} className="pulse" />
                  <span><strong>⚠️ Colisión Detectada:</strong> El archivo está bloqueado para edición. La versión del Usuario B sobreescribirá la del Usuario A sin previo aviso (Datos Corruptos).</span>
                </div>
              )}

              {concurrencyStatus === 'resolved' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-rose)', fontSize: '0.85rem' }}>
                  <X size={20} />
                  <span><strong>❌ Fallo de Integridad:</strong> Sobrescritura silenciosa completada. Se perdieron cambios financieros críticos.</span>
                </div>
              )}
            </div>

            {/* Lado RDBMS */}
            <div style={{ background: 'rgba(6, 182, 212, 0.06)', border: '1px solid var(--accent-cyan-glow)', borderRadius: 'var(--radius-md)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontWeight: 600, fontSize: '0.92rem' }}>
                <Database size={18} />
                <span>Motor Relacional (NexoSQL / SQLite RDBMS)</span>
              </div>

              {concurrencyStatus === 'idle' && (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  El motor relacional aplica aislamiento ACID y cola de transacciones con registro WAL (Write-Ahead Log).
                </p>
              )}

              {concurrencyStatus === 'conflict' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>
                  <RefreshCw size={20} style={{ animation: 'spin 1s linear infinite' }} />
                  <span><strong>🛡️ Transacción Atómica en Curso:</strong> Bloqueo de fila aislado. La transacción 2 aguarda serializada en el Buffer Pool.</span>
                </div>
              )}

              {concurrencyStatus === 'resolved' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--accent-emerald)', fontSize: '0.85rem' }}>
                  <ShieldCheck size={20} />
                  <span><strong>✅ COMMIT Exitoso:</strong> Ambas operaciones aplicadas de forma secuencial sin pérdida de información (ACID Garantizado).</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
