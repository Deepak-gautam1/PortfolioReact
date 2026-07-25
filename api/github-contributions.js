// Vercel serverless function — keeps GITHUB_TOKEN server-side only.
// GitHub's contribution calendar is only available via the authenticated GraphQL API,
// so the token must live here instead of in client-side (VITE_-prefixed) env vars.
import { fetchContributionCalendar } from "./_lib/fetchContributions.cjs";

export default async function handler(req, res) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    res.status(500).json({ error: "GITHUB_TOKEN is not configured on the server" });
    return;
  }

  const year = parseInt(req.query.year, 10);
  if (!Number.isInteger(year)) {
    res.status(400).json({ error: "Invalid or missing 'year' query parameter" });
    return;
  }

  try {
    const calendar = await fetchContributionCalendar(token, year);
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).json(calendar);
  } catch (err) {
    res.status(502).json({ error: err.message ?? "Failed to fetch contributions" });
  }
}
