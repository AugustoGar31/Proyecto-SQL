/**
 * @file TieredHintsPanel.jsx
 * @description Componente interactivo para el Sistema de Pistas Escalonadas de 3 Niveles:
 * Nivel 1: Pista Conceptual
 * Nivel 2: Estructura Sintáctica (Esqueleto SQL)
 * Nivel 3: Explicación de la Solución Modelo
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Code2, KeyRound, ChevronDown, ChevronUp, Lock, Unlock, HelpCircle } from 'lucide-react';

export function TieredHintsPanel({ hints }) {
  // hints es un array de 3 objetos: [{ level: 1, type, title, content }, ...]
  const [unlockedLevel, setUnlockedLevel] = useState(0); // 0 = sin pistas, 1 = nivel 1, 2 = nivel 2, 3 = nivel 3
  const [showConfirmLevel3, setShowConfirmLevel3] = useState(false);

  if (!hints || hints.length === 0) return null;

  // Normalizar array de pistas para asegurar 3 niveles
  const hintList = hints.map((h, i) => {
    if (typeof h === 'string') {
      const types = ['conceptual', 'syntax_skeleton', 'solution_breakdown'];
      const titles = ['1. Pista Conceptual', '2. Estructura Sintáctica', '3. Solución Explicada'];
      return {
        level: i + 1,
        type: types[i] || 'conceptual',
        title: titles[i] || `Pista Nivel ${i + 1}`,
        content: h
      };
    }
    return h;
  });

  const handleUnlockNext = (targetLevel) => {
    if (targetLevel === 3 && unlockedLevel < 2) {
      // Necesita desbloquear primero el nivel 1 y 2
      setUnlockedLevel(2);
      setShowConfirmLevel3(true);
      return;
    }
    if (targetLevel === 3) {
      setShowConfirmLevel3(true);
      return;
    }
    setUnlockedLevel(Math.max(unlockedLevel, targetLevel));
  };

  const confirmUnlockLevel3 = () => {
    setUnlockedLevel(3);
    setShowConfirmLevel3(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
      {/* Botón Barra de Ayuda / Pistas */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-amber)', fontSize: '0.88rem', fontWeight: 600 }}>
          <Lightbulb size={16} />
          <span>Sistema de Pistas Escalonadas ({unlockedLevel}/3 Reveladas)</span>
        </div>

        {unlockedLevel === 0 ? (
          <button
            onClick={() => handleUnlockNext(1)}
            className="btn-glass"
            style={{ fontSize: '0.78rem', padding: '0.3rem 0.7rem', color: 'var(--accent-amber)' }}
          >
            <Unlock size={13} />
            Revelar Nivel 1 (Conceptual)
          </button>
        ) : (
          <button
            onClick={() => { setUnlockedLevel(0); setShowConfirmLevel3(false); }}
            className="btn-glass"
            style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', color: 'var(--text-muted)' }}
          >
            Ocultar Pistas
          </button>
        )}
      </div>

      {/* Lista Progresiva de Pistas */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {hintList.map((hint, idx) => {
          const levelNum = idx + 1;
          const isRevealed = unlockedLevel >= levelNum;
          const isLocked = !isRevealed;

          let icon = Lightbulb;
          let color = 'var(--accent-amber)';
          let badgeText = 'Nivel 1 • Conceptual';

          if (levelNum === 2) {
            icon = Code2;
            color = 'var(--accent-cyan)';
            badgeText = 'Nivel 2 • Estructura Sintáctica';
          } else if (levelNum === 3) {
            icon = KeyRound;
            color = 'var(--accent-emerald)';
            badgeText = 'Nivel 3 • Solución Explicada';
          }

          const IconComponent = icon;

          return (
            <div
              key={levelNum}
              style={{
                borderRadius: 'var(--radius-sm)',
                border: isRevealed ? `1px solid ${color}` : '1px solid var(--border-subtle)',
                background: isRevealed ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.2)',
                padding: '0.75rem 1rem',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Encabezado del Nivel */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <IconComponent size={16} color={isRevealed ? color : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: isRevealed ? '#ffffff' : 'var(--text-muted)' }}>
                    {badgeText}
                  </span>
                </div>

                {isLocked && (
                  <button
                    onClick={() => handleUnlockNext(levelNum)}
                    className="btn-glass"
                    style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem', color: color }}
                  >
                    <Lock size={12} />
                    Desbloquear Nivel {levelNum}
                  </button>
                )}
              </div>

              {/* Contenido Revelado */}
              <AnimatePresence>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}
                  >
                    {levelNum === 2 ? (
                      <pre style={{ margin: 0, padding: '0.6rem 0.8rem', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', border: '1px solid rgba(6, 182, 212, 0.2)', color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.8rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                        {hint.content}
                      </pre>
                    ) : levelNum === 3 ? (
                      <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                        <p style={{ margin: 0, color: '#e2e8f0', fontSize: '0.84rem' }}>{hint.content}</p>
                      </div>
                    ) : (
                      <p style={{ margin: 0, color: '#fcd34d', fontSize: '0.84rem' }}>{hint.content}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Modal de Confirmación Nivel 3 */}
      {showConfirmLevel3 && (
        <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--accent-amber)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#fcd34d' }}>
            ⚠️ <strong>¿Revelar la solución completa?</strong> Te recomendamos intentar escribir la consulta con el Nivel 2 antes de ver la solución.
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => setShowConfirmLevel3(false)}
              className="btn-glass"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
            >
              Cancelar
            </button>
            <button
              onClick={confirmUnlockLevel3}
              className="btn-primary"
              style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem', background: 'var(--accent-emerald)' }}
            >
              Sí, Mostrar Solución
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
