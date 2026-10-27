import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

/**
 * Configuración de Vite para la Plataforma de Aprendizaje SQL.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  // Soporte tanto para GEMINI_API_KEY=xxx como para clave directa pegada en .env
  let apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || '';
  if (!apiKey) {
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const raw = fs.readFileSync(envPath, 'utf-8').trim();
        if (raw && !raw.includes('=')) {
          apiKey = raw;
        }
      }
    } catch {
      // ignore
    }
  }

  return {
    plugins: [react()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(apiKey)
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      open: true
    }
  };
});
