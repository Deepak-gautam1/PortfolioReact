// Vercel serverless function — keeps GITHUB_TOKEN server-side only.
// Authenticated requests get a 5,000 req/hr rate limit instead of the
// 60 req/hr limit unauthenticated client-side calls would hit.
import { fetchGitHubStats } from "./_lib/fetchGitHubStats.cjs";

export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).json({ error: "GITHUB_TOKEN is not configured on the server" });
    return;
  }

  try {
    const stats = await fetchGitHubStats(token);
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json(stats);
  } catch (err) {
    res.status(502).json({ error: err.message ?? "Failed to fetch GitHub stats" });
  }
}
