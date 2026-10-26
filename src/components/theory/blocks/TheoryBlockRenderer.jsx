/**
 * @file TheoryBlockRenderer.jsx
 * @description Orquestador que despacha cada bloque teórico estructurado a su respectivo componente UI.
 */

import React from 'react';
import { TheoryConceptBlock } from './TheoryConceptBlock.jsx';
import { SqlCodeSnippetBlock } from './SqlCodeSnippetBlock.jsx';
import { OperatorBadgeGrid } from './OperatorBadgeGrid.jsx';
import { TheoryAlertBlock } from './TheoryAlertBlock.jsx';

export function TheoryBlockRenderer({ block }) {
  if (!block) return null;

  switch (block.type) {
    case 'concept':
      return <TheoryConceptBlock block={block} />;

    case 'code_snippet':
      return <SqlCodeSnippetBlock block={block} />;

    case 'operator_grid':
      return <OperatorBadgeGrid block={block} />;

    case 'alert':
      return <TheoryAlertBlock block={block} />;

    default:
      console.warn(`Tipo de bloque teórico desconocido: ${block.type}`, block);
      return (
        <div style={{ color: 'var(--text-secondary)', padding: '0.75rem 0' }}>
          {block.content || JSON.stringify(block)}
        </div>
      );
  }
}
