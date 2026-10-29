/**
 * @file Navbar.jsx
 * @description Encabezado principal de la plataforma con Logo, Selector de Vistas,
 * Rango de Ingeniería, Credencial Descargable, Respaldo (.nexosql) y Canal de Feedback.
 */

import React, { useRef, useState } from 'react';
import { Trophy, Award, Download, Upload, MessageSquarePlus } from 'lucide-react';
import { ViewSelector } from './ViewSelector.jsx';
import { useUserProgress } from '../../context/ProgressContext.jsx';
import { getStudentRank, downloadCredentialCard } from '../../services/credentialGeneratorService.js';
import { exportProgressFile, importProgressFromFile } from '../../services/progressBackupService.js';
import { reportContextualFeedback } from '../../services/telemetryService.js';

export function Navbar() {
  const {
    progressPercentage,
    progress,
    completedCount,
    totalLessons,
    totalKatas,
    completedKatasCount,
    restoreProgress
  } = useUserProgress();

  const fileInputRef = useRef(null);
  const [statusNotice, setStatusNotice] = useState(null);

  const xpPoints = progress.completedExercises ? progress.completedExercises.length * 100 : 0;
  const currentRank = getStudentRank(progressPercentage);

  const showTempNotice = (msg, isError = false) => {
    setStatusNotice({ msg, isError });
    setTimeout(() => setStatusNotice(null), 4000);
  };

  const handleDownloadCredential = async () => {
    try {
      await downloadCredentialCard({
        progressPercentage,
        completedKatasCount,
        totalKatas,
        completedCount,
        totalLessons,
        xpPoints
      });
      showTempNotice('🏅 Credencial PNG descargada');
    } catch {
      showTempNotice('Error al generar la credencial', true);
    }
  };

  const handleExportBackup = async () => {
    try {
      await exportProgressFile(progress);
      showTempNotice('💾 Respaldo .nexosql exportado');
    } catch {
      showTempNotice('No se pudo exportar el respaldo', true);
    }
  };

  const handleImportChange = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    try {
      const { progress: verifiedProgress } = await importProgressFromFile(file);
      restoreProgress(verifiedProgress);
      showTempNotice('✅ Progreso verificado y restaurado');
    } catch (err) {
      showTempNotice(err.message || 'Archivo de respaldo inválido', true);
    }
  };

  const handleGeneralFeedback = async () => {
    const { copied } = await reportContextualFeedback({
      source: 'Navbar Superior'
    });
    if (copied) {
      showTempNotice('📋 Plantilla copiada al portapapeles');
    }
  };

  return (
    <header className="navbar-header">
      <div className="navbar-inner">
        {/* Brand & Logo */}
        <div className="brand-logo">
          <div className="logo-icon">
            <img src="/navbar-logo.png" alt="NexoSQL Database Logo" style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
          </div>
          <div>
            <span style={{ color: '#ffffff', fontWeight: 800 }}>Nexo</span>
            <span style={{ color: 'var(--accent-cyan)', fontWeight: 800 }}>SQL</span>
            <span style={{ fontSize: '0.72rem', display: 'block', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.5px' }}>
              QueryMaster Academy
            </span>
          </div>
        </div>

        {/* Selector de Espacios de Trabajo */}
        <ViewSelector />

        {/* Métricas de Progreso, Rango, Backup y Feedback */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative' }}>
          {/* Insignia de Rango Actual */}
          <div
            title={`Rango actual: ${currentRank.title} (${currentRank.specialty})`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(15, 23, 42, 0.7)',
              padding: '0.35rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${currentRank.color}55`,
              fontSize: '0.78rem',
              fontWeight: 600,
              color: currentRank.color
            }}
          >
            <span>{currentRank.badge}</span>
            <span>{currentRank.title}</span>
          </div>

          {/* Puntos XP */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.35rem 0.7rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <Trophy size={15} color="var(--accent-amber)" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-amber)' }}>
              {xpPoints} pts
            </span>
          </div>

          {/* Barra de Avance */}
          <div style={{ width: '105px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
              <span>Avance</span>
              <span>{progressPercentage}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${progressPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald))',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>

          {/* Acciones Rápidas: Credencial, Exportar, Importar y Feedback */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '0.6rem' }}>
            <button
              type="button"
              onClick={handleDownloadCredential}
              title="Compartir Logro / Descargar Credencial PNG (1200x630)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(6, 182, 212, 0.14)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <Award size={15} />
            </button>

            <button
              type="button"
              onClick={handleExportBackup}
              title="Exportar Respaldo Protegido (.nexosql)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.04)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <Download size={15} />
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Importar Progreso (.nexosql)"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.04)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <Upload size={15} />
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".nexosql"
              onChange={handleImportChange}
              style={{ display: 'none' }}
            />

            <button
              type="button"
              onClick={handleGeneralFeedback}
              title="Reportar un problema / Sugerencia"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(245, 158, 11, 0.12)',
                color: 'var(--accent-amber)',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <MessageSquarePlus size={15} />
            </button>
          </div>

          {/* Notificación Flotante de Estado */}
          {statusNotice && (
            <div
              role="status"
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                zIndex: 9999,
                background: statusNotice.isError ? 'rgba(127, 29, 29, 0.96)' : 'rgba(15, 23, 42, 0.96)',
                border: `1px solid ${statusNotice.isError ? 'var(--accent-rose)' : 'var(--accent-cyan)'}`,
                color: '#ffffff',
                padding: '0.45rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.76rem',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.5)'
              }}
            >
              {statusNotice.msg}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
