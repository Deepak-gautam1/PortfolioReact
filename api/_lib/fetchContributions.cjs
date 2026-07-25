// Shared by api/github-contributions.js (Vercel's Node runtime, ESM) and the
// Vite dev-server middleware in vite.config.cjs (CommonJS) — written as .cjs
// so both can import it regardless of the caller's module system.
const USERNAME = "Deepak-gautam1";

const QUERY = `
  query($userName: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $userName) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              contributionLevel
            }
          }
        }
      }
    }
  }
`;

async function fetchContributionCalendar(token, year) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        userName: USERNAME,
        from: `${year}-01-01T00:00:00Z`,
        to: `${year}-12-31T23:59:59Z`,
      },
    }),
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const body = await res.json();
  if (body.errors) {
    throw new Error(body.errors[0]?.message ?? "GitHub GraphQL error");
  }

  return body.data.user.contributionsCollection.contributionCalendar;
}

module.exports = { fetchContributionCalendar };
