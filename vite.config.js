import { defineConfig } from 'vite';

export default defineConfig({
  root: './src',  // If your source code is inside the src folder
  build: {
    rollupOptions: {
      input: './src/main.jsx', // Set the entry point here
    }
  }
});
