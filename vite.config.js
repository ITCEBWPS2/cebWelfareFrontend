import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://98.81.11.43/api/",
        changeOrigin: true,
      },
    },
  },
})

//13.61.8.102 - blue
//98.81.11.43 - orange