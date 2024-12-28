import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000', // Adjust the port if your app runs on a different one
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
