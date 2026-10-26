/**
 * @file MicroLearningCards.jsx
 * @description Píldoras de Micro-Learning interactivas estilo Stories/Flashcards para el Módulo 0.
 * Reemplaza el muro de texto por 3 conceptos fundamentales explicados en máximo 2 oraciones.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useView } from '../../../context/ViewContext.jsx';
import { useCurriculum } from '../../../context/ProgressContext.jsx';
import { Button } from '../../common/Button.jsx';
import {
  Database,
  Server,
  Zap,
  ArrowRight,
  ArrowLeft,
  Rocket,
  Sparkles
} from 'lucide-react';

const FLASHCARDS = [
  {
    id: 'card-sgbd',
    stepNumber: 1,
    icon: Database,
    accentColor: 'var(--accent-cyan)',
    glowColor: 'var(--accent-cyan-glow)',
    badgeText: 'Concepto 1 de 3 • Bases Relacionales',
    title: 'El Guardián Inteligente de los Datos',
    sentence1: 'Un SGBD es un software que organiza, protege y busca tu información a gran velocidad, evitando que se corrompa o se pierda como suele ocurrir en un archivo de Excel.',
    sentence2: 'Es Relacional porque distribuye los datos en tablas simples conectadas mediante identificadores (IDs), evitando duplicar información innecesariamente.'
  },
  {
    id: 'card-client-server',
    stepNumber: 2,
    icon: Server,
    accentColor: 'var(--accent-indigo)',
    glowColor: 'var(--accent-indigo-glow)',
    badgeText: 'Concepto 2 de 3 • Arquitectura',
    title: 'Cómo Viajan tus Consultas (Cliente-Servidor)',
    sentence1: 'Tu aplicación (el Cliente) envía una orden escrita en SQL a través de la red como si fuera un pedido en un restaurante.',
    sentence2: 'El motor de base de datos (el Servidor) recibe la orden, busca los registros en el disco y te devuelve exactamente la tabla de resultados solicitada.'
  },
  {
    id: 'card-sql-dominance',
    stepNumber: 3,
    icon: Zap,
    accentColor: 'var(--accent-amber)',
    glowColor: 'var(--accent-amber-glow)',
    badgeText: 'Concepto 3 de 3 • Estándar SQL',
    title: 'El Idioma Universal de los Datos',
    sentence1: 'SQL es el lenguaje estándar mundial que todas las empresas utilizan para consultar bases de datos desde hace más de 50 años.',
    sentence2: 'Domina la industria porque, sin importar si usas SQLite, PostgreSQL o Big Data, con las mismas instrucciones puedes analizar cualquier volumen de información.'
  }
];

export function MicroLearningCards() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setActiveView } = useView();
  const { selectLesson } = useCurriculum();

  const card = FLASHCARDS[currentStep];
  const IconComponent = card.icon;

  const handleNext = () => {
    if (currentStep < FLASHCARDS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSkipToPractice();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkipToPractice = () => {
    selectLesson('les-select-basics');
    setActiveView('playground');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '820px', margin: '0 auto' }}>
      {/* Barra Superior con Botón de Escape Inmediato */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
          <Sparkles size={18} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Micro-Learning • Lectura en 60 Segundos
          </span>
        </div>

        {/* Botón de Escape Permanente */}
        <Button
          variant="secondary"
          size="sm"
          onClick={handleSkipToPractice}
          icon={Rocket}
          style={{ borderColor: 'rgba(6, 182, 212, 0.4)', color: 'var(--accent-cyan)' }}
        >
          ⚡ Saltar Intro / Ir al Taller Práctico
        </Button>
      </div>

      {/* Indicador de Historias (Stories Progress Bars) */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${FLASHCARDS.length}, 1fr)`, gap: '0.5rem' }}>
        {FLASHCARDS.map((fc, idx) => (
          <div
            key={fc.id}
            onClick={() => setCurrentStep(idx)}
            style={{
              height: '5px',
              borderRadius: '3px',
              background: idx === currentStep
                ? 'var(--accent-cyan)'
                : idx < currentStep
                ? 'var(--accent-emerald)'
                : 'rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>

      {/* Tarjeta Flashcard Animada */}
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -15 }}
          transition={{ duration: 0.25 }}
          className="glass-card"
          style={{
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
            border: `1px solid ${card.glowColor}`,
            background: 'linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.7))',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '340px'
          }}
        >
          {/* Header de la Tarjeta */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span className="badge badge-cyan" style={{ fontSize: '0.78rem' }}>
                {card.badgeText}
              </span>

              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  background: `linear-gradient(135deg, ${card.accentColor}, rgba(255,255,255,0.1))`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  boxShadow: `0 0 20px ${card.glowColor}`
                }}
              >
                <IconComponent size={24} />
              </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '1.25rem', fontWeight: 700, lineHeight: 1.3 }}>
              {card.title}
            </h2>

            {/* Las 2 Oraciones Fundamentales */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              <p style={{ color: '#e2e8f0', fontSize: '1.08rem', lineHeight: '1.65', margin: 0 }}>
                {card.sentence1}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.02rem', lineHeight: '1.65', margin: 0 }}>
                {card.sentence2}
              </p>
            </div>
          </div>

          {/* Navegación Inferior de la Tarjeta */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
              icon={ArrowLeft}
              iconPosition="left"
            >
              Anterior
            </Button>

            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {currentStep + 1} de {FLASHCARDS.length}
            </span>

            {currentStep < FLASHCARDS.length - 1 ? (
              <Button
                variant="primary"
                size="md"
                onClick={handleNext}
                icon={ArrowRight}
                iconPosition="right"
              >
                Siguiente
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                onClick={handleSkipToPractice}
                icon={Rocket}
                iconPosition="right"
                style={{ background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-cyan))' }}
              >
                ¡Comenzar Desafíos Prácticos!
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
