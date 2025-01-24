import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // Proxy API requests to the backend server
    }
  }
});
