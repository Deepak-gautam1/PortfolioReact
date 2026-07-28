// Shared by api/github-stats.js (Vercel's Node runtime, ESM) and the
// Vite dev-server middleware in vite.config.cjs (CommonJS) — written as .cjs
// so both can import it regardless of the caller's module system.
const USERNAME = "Deepak-gautam1";

async function fetchGitHubStats(token) {
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
  };

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers }),
  ]);

  if (!userRes.ok) {
    throw new Error(`GitHub API error: ${userRes.status}`);
  }
  if (!reposRes.ok) {
    throw new Error(`GitHub API error: ${reposRes.status}`);
  }

  const user = await userRes.json();
  const repos = await reposRes.json();

  return {
    user: {
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      created_at: user.created_at,
    },
    repos: Array.isArray(repos)
      ? repos.map((r) => ({
          name: r.name,
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          language: r.language,
          html_url: r.html_url,
          description: r.description,
          fork: r.fork,
        }))
      : [],
  };
}

module.exports = { fetchGitHubStats };
