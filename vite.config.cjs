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
        manualChunks: (id) => {
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) return "vendor-react";
          if (id.includes("node_modules/framer-motion")) return "vendor-framer";
          if (id.includes("node_modules/@supabase")) return "vendor-supabase";
          if (id.includes("node_modules/lenis")) return "vendor-lenis";
          if (id.includes("node_modules/react-router-dom") || id.includes("node_modules/@tanstack")) return "vendor-router";
          if (id.includes("node_modules/@radix-ui")) return "vendor-radix";
          if (id.includes("node_modules/lucide-react")) return "vendor-icons";
          if (id.includes("node_modules/")) return "vendor-misc";
        },
      },
    },
    chunkSizeWarningLimit: 500,
    cssCodeSplit: true,
    minify: "esbuild",
    sourcemap: false,
    // Inline small assets instead of separate requests
    assetsInlineLimit: 4096,
  },
});
