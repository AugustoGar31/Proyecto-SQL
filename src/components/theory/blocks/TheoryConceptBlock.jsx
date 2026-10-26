/**
 * @file TheoryConceptBlock.jsx
 * @description Componente de píldora conceptual para explicaciones concisas de micro-learning con etiquetas clave.
 */

import React from 'react';
import { BookOpen, CheckCircle2 } from 'lucide-react';

export function TheoryConceptBlock({ block }) {
  const { title, content, highlights = [] } = block;

  return (
    <div className="theory-concept-card">
      {title && (
        <div className="theory-concept-header">
          <BookOpen size={18} />
          <span>{title}</span>
        </div>
      )}

      <p className="theory-concept-text">{content}</p>

      {highlights && highlights.length > 0 && (
        <div className="theory-concept-highlights">
          {highlights.map((item, idx) => (
            <span key={idx} className="theory-highlight-pill">
              <CheckCircle2 size={13} />
              <span>{item}</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
