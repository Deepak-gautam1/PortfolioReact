const { defineConfig, loadEnv } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const path = require("path");
const { fetchContributionCalendar } = require("./api/_lib/fetchContributions.cjs");

// Emulates api/github-contributions.js during `npm run dev`, since plain Vite
// doesn't execute Vercel serverless functions — without this, /api/* requests
// during local dev just serve the raw source file instead of running it.
const githubContributionsDevMiddleware = (env) => ({
  name: "dev-api-github-contributions",
  apply: "serve",
  configureServer(server) {
    server.middlewares.use("/api/github-contributions", async (req, res) => {
      const respond = (status, body) => {
        res.statusCode = status;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(body));
      };

      const token = env.GITHUB_TOKEN;
      if (!token) {
        respond(500, { error: "GITHUB_TOKEN is not configured — set it in .env" });
        return;
      }

      const url = new URL(req.url, "http://localhost");
      const year = parseInt(url.searchParams.get("year"), 10);
      if (!Number.isInteger(year)) {
        respond(400, { error: "Invalid or missing 'year' query parameter" });
        return;
      }

      try {
        const calendar = await fetchContributionCalendar(token, year);
        respond(200, calendar);
      } catch (err) {
        respond(502, { error: err.message ?? "Failed to fetch contributions" });
      }
    });
  },
});

module.exports = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), githubContributionsDevMiddleware(env)],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "vendor-react": ["react", "react-dom"],
            "vendor-framer": ["framer-motion"],
            "vendor-router": ["react-router-dom"],
            "vendor-query": ["@tanstack/react-query"],
            "vendor-supabase": ["@supabase/supabase-js"],
            "vendor-lenis": ["lenis"],
          },
        },
      },
      chunkSizeWarningLimit: 600,
      cssCodeSplit: true,
      minify: "esbuild",
      sourcemap: false,
      assetsInlineLimit: 4096,
    },
  };
});
