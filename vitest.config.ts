import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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
