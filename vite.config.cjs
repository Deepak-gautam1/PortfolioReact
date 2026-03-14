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
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — changes rarely, cache forever
          "vendor-react": ["react", "react-dom"],
          // Framer Motion — heaviest single lib
          "vendor-framer": ["framer-motion"],
          // Routing + Query
          "vendor-router": ["react-router-dom", "@tanstack/react-query"],
          // UI primitives
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-slot",
          ],
          // Supabase
          "vendor-supabase": ["@supabase/supabase-js"],
          // Lenis smooth scroll
          "vendor-lenis": ["lenis"],
        },
      },
    },
    // Raise warning threshold — 780KB split into chunks is fine
    chunkSizeWarningLimit: 600,
  },
});
