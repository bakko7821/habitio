import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,               // чтобы Vite слушал все IP
    allowedHosts: true        // ВАЖНО: boolean, не строка
  }
});
