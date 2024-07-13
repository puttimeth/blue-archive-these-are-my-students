import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/blue-archive-these-are-my-students/",
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
      images: "/src/images",
      pages: "/src/pages",
    },
  },
});
