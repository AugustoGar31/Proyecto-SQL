/**
 * @file SplashScreen.jsx
 * @description Pantalla de bienvenida con estética Glassmorphism, pulso de neón
 * para el logo de base de datos y transición de salida suave con Framer Motion.
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export function SplashScreen({ onFinish, duration = 2500 }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, duration);

    return () => clearTimeout(timer);
  }, [onFinish, duration]);

  // Variantes del contenedor principal (Fade out + Ligero Zoom In de salida)
  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
    exit: {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(8px)',
      transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] }
    }
  };

  // Animación del halo de luz y pulsación del cilindro de base de datos
  const pulseVariants = {
    initial: { scale: 0.92, filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.3))' },
    animate: {
      scale: [0.95, 1.05, 0.95],
      filter: [
        'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))',
        'drop-shadow(0 0 35px rgba(6, 182, 212, 0.8)) drop-shadow(0 0 50px rgba(99, 102, 241, 0.4))',
        'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))'
      ],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#070a12',
        backgroundImage: `
          radial-gradient(circle at 50% 45%, rgba(6, 182, 212, 0.12) 0%, transparent 60%),
          radial-gradient(circle at 50% 60%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)
        `
      }}
    >
      {/* Tarjeta Glassmorphic Central */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '24px',
          padding: '2.5rem 3.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(6, 182, 212, 0.15)',
          maxWidth: '90vw',
          textAlign: 'center'
        }}
      >
        {/* Logo Pulsante (Cilindro de Base de Datos) */}
        <motion.div
          variants={pulseVariants}
          initial="initial"
          animate="animate"
          style={{ width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <img
            src="/navbar-logo.png"
            alt="NexoSQL Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </motion.div>

        {/* Texto "Bienvenido" con entrada escalonada y gradiente */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              margin: 0,
              background: 'linear-gradient(135deg, #ffffff 30%, var(--accent-cyan) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Bienvenido
          </h1>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
              marginTop: '0.35rem',
              letterSpacing: '0.5px'
            }}
          >
            Nexo<strong style={{ color: 'var(--accent-cyan)' }}>SQL</strong> • QueryMaster Academy
          </p>
        </motion.div>

        {/* Micro Barra de Carga Neón */}
        <div
          style={{
            width: '120px',
            height: '3px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            overflow: 'hidden',
            marginTop: '0.5rem'
          }}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: '50%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, var(--accent-cyan), transparent)',
              borderRadius: '999px'
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
