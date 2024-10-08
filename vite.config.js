import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  plugins: [react({ include: /\.(mdx|js|jsx|ts|tsx|css|scss)$/ })],
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      component: "/src/component",
      data: "/src/data",
      images: "/src/images",
      utils: "/src/utils",
    },
  },
});
