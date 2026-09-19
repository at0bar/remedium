import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxies the API to the dev backend (see server/) so both stay same-origin —
    // no CORS, cookies "just work" (see docs/adr/0002 — same-origin deploy in prod too).
    proxy: {
      '/trpc': 'http://localhost:3000',
      '/api': 'http://localhost:3000',
    },
  },
})
