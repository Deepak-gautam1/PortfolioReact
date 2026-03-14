const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const path = require("path");

module.exports = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers — smaller output, faster parse
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React core — cached forever, changes never
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          // Framer Motion — heaviest lib, isolated chunk
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-framer";
          }
          // Supabase
          if (id.includes("node_modules/@supabase")) {
            return "vendor-supabase";
          }
          // Radix UI primitives
          if (id.includes("node_modules/@radix-ui")) {
            return "vendor-radix";
          }
          // Router + Query
          if (id.includes("node_modules/react-router") || id.includes("node_modules/@tanstack")) {
            return "vendor-router";
          }
          // Lenis
          if (id.includes("node_modules/lenis")) {
            return "vendor-lenis";
          }
          // Lucide icons — large, rarely changes
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-lucide";
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
    // Minify with esbuild (default, fast)
    minify: "esbuild",
  },
});
