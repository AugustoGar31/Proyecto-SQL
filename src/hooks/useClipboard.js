import { useState, useCallback } from 'react';

/**
 * Hook utilitario para gestionar la copia al portapapeles y el estado temporal de feedback.
 * @param {number} timeout - Tiempo en milisegundos durante el cual copied permanece true.
 * @returns {{ copied: boolean, copy: (text: string) => Promise<boolean> }}
 */
export function useClipboard(timeout = 1500) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text) => {
    if (text === null || text === undefined) return false;
    try {
      await navigator.clipboard.writeText(String(text));
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
      return true;
    } catch (err) {
      console.error('Error al copiar al portapapeles:', err);
      setCopied(false);
      return false;
    }
  }, [timeout]);

  return { copied, copy };
}
