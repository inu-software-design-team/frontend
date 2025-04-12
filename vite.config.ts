/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  test: {
    globals: true,
    pool: 'threads',
    environment: 'jsdom',
    setupFiles: 'vitest.setup',
    include: ['src/**/*.(spec|test).ts?(x)'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src'],
      exclude: ['src/**/!(*.spec|*.test).ts?(x)'],
    },
  },
});
