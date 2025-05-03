import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@assets": "/src/presentation/assets",
      "@core": "/src/core",
      "@domain": "/src/domain",
      "@infra": "/src/infra",
      "@presentation": "/src/presentation",
      "@main": "/src/main",
      "@components": "/src/presentation/components",
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
