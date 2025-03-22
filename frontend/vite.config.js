
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '771a-2409-40c1-5017-753e-20a8-49e6-db9f-170d.ngrok-free.app',
      '6faf-2409-40c1-501f-42f0-1482-44fc-ee77-903d.ngrok-free.app'
    ]
  }
});