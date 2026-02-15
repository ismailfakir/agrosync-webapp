import { defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'
const env = loadEnv(
    'all',
    process.cwd()
);

const PORT = +(env.VITE_APP_PORT as string); // + sign convert it to Number
const API_URL = env.VVITE_BACKEND_API_URL as string;

// https://vite.dev/config/
export default defineConfig({
  server: {
    port:PORT,
    host:'0.0.0.0',
    proxy: {
      '/api': {
        //target: 'http://localhost:3000', // Backend server
        target:  API_URL, // Backend server
        changeOrigin: true, // Ensure the request appears to come from the frontend server
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove '/api' prefix
      },
    },
  },
  plugins: [react()],
})
