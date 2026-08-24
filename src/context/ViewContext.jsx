/**
 * @file ViewContext.jsx
 * @description Contexto global para la gestión del espacio o vista activa en la aplicación.
 * Permite cambiar entre:
 * - 'theory': Teoría y Plan de Estudio (Syllabus)
 * - 'playground': Taller SQL Interactivo (Editor, Resultados, EXPLAIN PLAN)
 * - 'mindmap': Mapa Mental Dinámico e Interactivo
 * - 'exercises': Catálogo de Desafíos y Katas
 * - 'schema': Explorador de Esquemas y ERDs
 */

import React, { createContext, useContext, useState } from 'react';

const ViewContext = createContext(null);

export const ViewProvider = ({ children }) => {
  const [activeView, setActiveView] = useState('playground');

  /**
   * Navega a un espacio y desplaza el scroll arriba.
   * @param {string} view - Espacio destino ('theory' | 'playground' | 'mindmap' | 'exercises' | 'schema').
   */
  const changeView = (view) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ViewContext.Provider value={{ activeView, setActiveView: changeView }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error('useView debe utilizarse dentro de un ViewProvider');
  }
  return context;
};
