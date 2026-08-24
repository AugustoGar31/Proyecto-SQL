/**
 * @file MindMapModal.jsx
 * @description Proxy que integra el botón del Mindmap con el nuevo Espacio Dinámico de Mapa Mental.
 */

import React from 'react';
import { useView } from '../../context/ViewContext.jsx';

export const MindMapModal = ({ isOpen, onClose }) => {
  const { setActiveView } = useView();

  React.useEffect(() => {
    if (isOpen) {
      setActiveView('mindmap');
      onClose();
    }
  }, [isOpen]);

  return null;
};
