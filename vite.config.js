import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { BASE_URL } from "./src/constants";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: BASE_URL,
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
