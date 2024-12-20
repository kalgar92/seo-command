import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        background: 'background.js',
        content: 'content.js'
      },
      output: {
        entryFileNames: '[name].js'
      }
    }
  }
});