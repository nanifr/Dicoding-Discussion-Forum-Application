import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.js',
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      // implementasi node event listeners dapat ditambahkan di sini bila diperlukan
      return config;
    },
  },
});
