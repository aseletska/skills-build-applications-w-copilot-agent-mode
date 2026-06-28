import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const codespaceName = process.env.CODESPACE_NAME ?? '';

export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName),
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
