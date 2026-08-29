/**
 * @file HomeOnboardingModal.jsx
 * @description Modal de Inicio y Onboarding con arquitectura Bento Box, Carrusel Interactivo
 * y estética Glassmorphism de alta fidelidad.
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Terminal,
  Network,
  Dumbbell,
  Database,
  Trophy,
  Rocket,
  CheckCircle2,
  Zap,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useView } from '../../context/ViewContext.jsx';
import { useProgress } from '../../context/ProgressContext.jsx';

export function HomeOnboardingModal() {
  const { isHomeModalOpen, closeHomeModal, setActiveView } = useView();
  const { progressPercentage, progress, completedCount, totalLessons } = useProgress();

  const [activeSlide, setActiveSlide] = useState(0);

  // Cerrar modal al presionar la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeHomeModal();
      }
    };
    if (isHomeModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHomeModalOpen, closeHomeModal]);

  const slides = [
    {
      id: 0,
      badge: 'Bienvenida',
      badgeColor: 'var(--accent-cyan)',
      title: '¡Bienvenido a NexoSQL!',
      subtitle: 'La academia interactiva para dominar bases de datos relacionales y SQL de nivel profesional.',
      icon: Database,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, margin: 0 }}>
            Aquí aprenderás SQL ejecutando consultas reales directamente en tu navegador gracias a nuestro motor 
            <strong style={{ color: 'var(--accent-cyan)' }}> SQLite WebAssembly</strong>, sin configuraciones complejas ni servidores externos.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.6rem', marginTop: '0.25rem' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 600, display: 'block' }}>⚡ 0 ms Latencia</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Motor WASM en local</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 600, display: 'block' }}>🧪 Práctica Real</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Feedback al instante</span>
            </div>
            <div style={{ background: 'rgba(255, 255, 255, 0.04)', padding: '0.6rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--accent-indigo)', fontWeight: 600, display: 'block' }}>📊 Planes y ERD</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Enfoque de ingeniería</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 1,
      badge: 'Herramientas Disponibles',
      badgeColor: 'var(--accent-indigo)',
      title: '¿Qué puedes hacer en la plataforma?',
      subtitle: 'Diseñada con espacios dedicados para cada etapa de tu aprendizaje.',
      icon: Rocket,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.4rem' }}>
          <div
            onClick={() => { setActiveView('playground'); closeHomeModal(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            className="hover-highlight"
          >
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', padding: '0.4rem', borderRadius: '6px' }}>
              <Terminal size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '0.88rem', color: '#ffffff', display: 'block' }}>Taller SQL & Playground Libre</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Resuelve katas interactivas o experimenta con consultas libres.</span>
            </div>
            <ArrowRight size={14} color="var(--text-muted)" />
          </div>

          <div
            onClick={() => { setActiveView('mindmap'); closeHomeModal(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            className="hover-highlight"
          >
            <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-indigo)', padding: '0.4rem', borderRadius: '6px' }}>
              <Network size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '0.88rem', color: '#ffffff', display: 'block' }}>Mapa Mental Interactivo</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Explora la taxonomía completa: DQL, DML, DDL, TCL y Procedural.</span>
            </div>
            <ArrowRight size={14} color="var(--text-muted)" />
          </div>

          <div
            onClick={() => { setActiveView('exercises'); closeHomeModal(); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'rgba(255, 255, 255, 0.04)',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)'
            }}
            className="hover-highlight"
          >
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', padding: '0.4rem', borderRadius: '6px' }}>
              <Dumbbell size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <strong style={{ fontSize: '0.88rem', color: '#ffffff', display: 'block' }}>Catálogo de Katas & Desafíos</strong>
              <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>Prácticas de código clasificadas por nivel y dificultad.</span>
            </div>
            <ArrowRight size={14} color="var(--text-muted)" />
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: 'Filosofía & Motivación',
      badgeColor: 'var(--accent-emerald)',
      title: 'Piensa como un Ingeniero de Datos',
      subtitle: 'La maestría en SQL no consiste en memorizar comandos, sino en estructurar datos.',
      icon: Sparkles,
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '0.5rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', borderRadius: 'var(--radius-sm)', padding: '1rem' }}>
            <p style={{ color: '#e6fffa', fontSize: '0.92rem', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>
              "Una base de datos bien diseñada y una consulta optimizada son el corazón invisible de las aplicaciones más veloces del mundo."
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <Zap size={16} color="var(--accent-amber)" />
            <span>Aprovecha la pestaña <strong>"Bajo el Capó"</strong> para ver cómo el motor evalúa tus consultas.</span>
          </div>
        </div>
      )
    }
  ];

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[activeSlide];

  return (
    <AnimatePresence>
      {isHomeModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9000,
            backgroundColor: 'rgba(7, 10, 18, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            overflowY: 'auto'
          }}
          onClick={closeHomeModal}
        >
          {/* Tarjeta Modal Principal (Bento Container) */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '24px',
              padding: '1.75rem',
              maxWidth: '960px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(6, 182, 212, 0.15)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/navbar-logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                    Centro de Inicio <span style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', fontWeight: 500 }}>• Onboarding</span>
                  </h2>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Guía de la plataforma & Estado de tu aprendizaje
                  </span>
                </div>
              </div>

              <button
                onClick={closeHomeModal}
                className="btn-glass"
                style={{ padding: '0.4rem 0.7rem', borderRadius: 'var(--radius-sm)' }}
                title="Cerrar (Esc)"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cuadrícula Bento Box */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: '1rem',
                alignItems: 'stretch'
              }}
            >
              {/* BENTO CARD 1: Carrusel Interactivo Principal (Ocupa 7/12 columnas) */}
              <div
                className="glass-card"
                style={{
                  gridColumn: 'span 7',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '340px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderColor: 'rgba(255, 255, 255, 0.12)',
                  position: 'relative'
                }}
              >
                <div>
                  {/* Badge & Navegación de Dots */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.6px',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '999px',
                        background: 'rgba(255, 255, 255, 0.06)',
                        color: current.badgeColor,
                        border: `1px solid ${current.badgeColor}40`
                      }}
                    >
                      {current.badge}
                    </span>

                    {/* Dots Indicadores */}
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {slides.map((s, idx) => (
                        <button
                          key={s.id}
                          onClick={() => setActiveSlide(idx)}
                          style={{
                            width: activeSlide === idx ? '22px' : '8px',
                            height: '8px',
                            borderRadius: '4px',
                            background: activeSlide === idx ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease'
                          }}
                          title={`Ir a slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Contenido Animado del Slide */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.25 }}
                    >
                      <h3 style={{ fontSize: '1.25rem', color: '#ffffff', fontWeight: 700, margin: '0 0 0.25rem 0' }}>
                        {current.title}
                      </h3>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: 0 }}>
                        {current.subtitle}
                      </p>
                      {current.content}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Controles Inferiores del Carrusel */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.25rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={handlePrevSlide}
                      className="btn-glass"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                      title="Slide Anterior"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNextSlide}
                      className="btn-glass"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem' }}
                      title="Siguiente Slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      if (activeSlide < slides.length - 1) {
                        handleNextSlide();
                      } else {
                        setActiveView('playground');
                        closeHomeModal();
                      }
                    }}
                    className="btn-primary"
                    style={{ fontSize: '0.82rem', padding: '0.45rem 1rem' }}
                  >
                    {activeSlide === slides.length - 1 ? '¡Ir al Taller SQL!' : 'Siguiente'}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* COLUMNA DERECHA DEL BENTO (Ocupa 5/12 columnas) */}
              <div
                style={{
                  gridColumn: 'span 5',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}
              >
                {/* BENTO CARD 2: Tarjeta de Progreso Estética */}
                <div
                  className="glass-card"
                  style={{
                    padding: '1.25rem',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderColor: 'rgba(255, 255, 255, 0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)' }}>
                      <Trophy size={18} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>Tu Progreso de Aprendizaje</span>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
                      {progressPercentage}%
                    </span>
                  </div>

                  {/* Barra de Progreso Neón */}
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '999px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-emerald))',
                        boxShadow: '0 0 10px rgba(6, 182, 212, 0.5)'
                      }}
                    />
                  </div>

                  {/* Métricas de Lecciones & Desafíos */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Lecciones</span>
                      <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>{completedCount}</strong>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}> / {totalLessons || 12}</span>
                    </div>
                    <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>Katas Resueltas</span>
                      <strong style={{ fontSize: '0.95rem', color: 'var(--accent-amber)' }}>
                        {progress.completedExercises ? progress.completedExercises.length : 0}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* BENTO CARD 3: Atajo Rápido al Taller / Playground */}
                <div
                  className="glass-card"
                  style={{
                    padding: '1.15rem',
                    background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08), rgba(99, 102, 241, 0.08))',
                    borderColor: 'rgba(6, 182, 212, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#ffffff', display: 'block' }}>¿Listo para practicar?</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Entra al editor de código interactivo.</span>
                  </div>
                  <button
                    onClick={() => { setActiveView('playground'); closeHomeModal(); }}
                    className="btn-primary"
                    style={{ fontSize: '0.8rem', padding: '0.45rem 0.9rem', whiteSpace: 'nowrap' }}
                  >
                    Abrir Taller <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
