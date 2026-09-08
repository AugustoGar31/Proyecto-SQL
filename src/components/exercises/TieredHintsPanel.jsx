/**
 * @file TieredHintsPanel.jsx
 * @description Sistema de Pistas Escalonadas de 2 Niveles Estrictamente Conceptuales:
 * - Nivel 1 (Indirecta): Sugerencia sutil sobre el enfoque mental o la cláusula clave.
 * - Nivel 2 (Directa): Desglose de los pasos lógicos sin mostrar código SQL.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Compass, Lock, Unlock } from 'lucide-react';

export function TieredHintsPanel({ hints }) {
  // Estado de desbloqueo: 0 = ninguna, 1 = Pista 1 visible, 2 = Ambas pistas visibles
  const [unlockedLevel, setUnlockedLevel] = useState(0);

  if (!hints || hints.length === 0) return null;

  // Garantizar compatibilidad y forzar estrictamente un máximo de 2 niveles conceptuales
  const normalizedHints = hints.slice(0, 2).map((h, i) => {
    if (typeof h === 'string') {
      return {
        level: i + 1,
        type: i === 0 ? 'indirect' : 'direct',
        title: i === 0 ? 'Pista 1 • Indirecta (Enfoque)' : 'Pista 2 • Directa (Pasos Lógicos)',
        content: h
      };
    }
    return {
      level: i + 1,
      type: i === 0 ? 'indirect' : 'direct',
      title: h.title || (i === 0 ? 'Pista 1 • Indirecta (Enfoque)' : 'Pista 2 • Directa (Pasos Lógicos)'),
      content: h.content
    };
  });

  const handleUnlockLevel = (targetLevel) => {
    setUnlockedLevel((prev) => Math.max(prev, targetLevel));
  };

  const handleToggleHide = () => {
    setUnlockedLevel(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
      {/* Barra de Control de Pistas */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '0.5rem',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)', fontSize: '0.88rem', fontWeight: 600 }}>
          <Lightbulb size={16} />
          <span>Pistas Conceptuales ({unlockedLevel}/2 Reveladas)</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {unlockedLevel === 0 ? (
            <button
              onClick={() => handleUnlockLevel(1)}
              className="btn-glass"
              style={{ fontSize: '0.78rem', padding: '0.3rem 0.75rem', color: 'var(--accent-amber)' }}
              type="button"
            >
              <Unlock size={13} />
              Revelar Pista 1 (Indirecta)
            </button>
          ) : (
            <button
              onClick={handleToggleHide}
              className="btn-glass"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', color: 'var(--text-muted)' }}
              type="button"
            >
              Ocultar Pistas
            </button>
          )}
        </div>
      </div>

      {/* Lista de las 2 Pistas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {normalizedHints.map((hint, idx) => {
          const levelNum = idx + 1;
          const isRevealed = unlockedLevel >= levelNum;
          const isLocked = !isRevealed;

          const isLevel1 = levelNum === 1;
          const accentColor = isLevel1 ? 'var(--accent-amber)' : 'var(--accent-cyan)';
          const Icon = isLevel1 ? Compass : Lightbulb;
          const badgeText = isLevel1 ? 'Nivel 1 • Pista Indirecta (Enfoque Sutil)' : 'Nivel 2 • Pista Directa (Estrategia Lógica)';

          return (
            <div
              key={levelNum}
              style={{
                borderRadius: 'var(--radius-sm)',
                border: isRevealed ? `1px solid ${accentColor}` : '1px solid var(--border-subtle)',
                background: isRevealed ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.25)',
                padding: '0.75rem 1rem',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Cabecera del Nivel */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon size={16} color={isRevealed ? accentColor : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: isRevealed ? '#ffffff' : 'var(--text-muted)' }}>
                    {badgeText}
                  </span>
                </div>

                {isLocked && (
                  <button
                    onClick={() => handleUnlockLevel(levelNum)}
                    className="btn-glass"
                    style={{ fontSize: '0.72rem', padding: '0.25rem 0.6rem', color: accentColor }}
                    type="button"
                  >
                    <Lock size={12} />
                    Desbloquear Pista {levelNum}
                  </button>
                )}
              </div>

              {/* Contenido Conceptual Revelado (Sin Código) */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ marginTop: '0.5rem', fontSize: '0.85rem', lineHeight: 1.55 }}
                  >
                    <div
                      style={{
                        background: isLevel1 ? 'rgba(245, 158, 11, 0.06)' : 'rgba(6, 182, 212, 0.06)',
                        borderLeft: `3px solid ${accentColor}`,
                        padding: '0.6rem 0.8rem',
                        borderRadius: '0 4px 4px 0'
                      }}
                    >
                      <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.86rem' }}>
                        {hint.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
