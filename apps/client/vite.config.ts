import react from '@vitejs/plugin-react';
import path from 'node:path';

import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    host: true,
    origin: 'http://0.0.0.O:8080',
    strictPort: true,
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  resolve: {
    alias: {
      '#src': path.resolve(fileURLToPath(new URL('src/', import.meta.url))),
      '#shared': path.resolve(__dirname, '../../shared'),
    },
  },
});
