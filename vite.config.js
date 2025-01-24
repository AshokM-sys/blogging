import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src', // This tells Vite to treat 'src' as the root directory
  build: {
    outDir: '../dist', // Output folder for the build
    rollupOptions: {
      input: '/src/main.jsx', // The entry point of your app
    },
  },
});
