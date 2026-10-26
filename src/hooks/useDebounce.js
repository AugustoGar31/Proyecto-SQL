import { useState, useEffect } from 'react';

/**
 * Hook para retrasar la actualización de un valor hasta que transcurra un tiempo determinado.
 * @param {any} value - Valor a retrasar.
 * @param {number} delay - Tiempo en milisegundos (default 200ms).
 * @returns {any} Valor retrasado (debounced).
 */
export function useDebounce(value, delay = 200) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
