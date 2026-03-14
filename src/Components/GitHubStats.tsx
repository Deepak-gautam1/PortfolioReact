import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GithubIcon,
  Star,
  GitFork,
  Code2,
  TrendingUp,
  BookOpen,
} from "lucide-react";

const USERNAME = "Deepak-gautam1";
const GITHUB_API = "https://api.github.com";

interface GHUser {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GHRepo {
  name: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  description: string | null;
  fork: boolean;
}

interface ContribDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

// ── GitHub GraphQL Contribution Hook ──────────────────────────
const useContributions = (year: number) => {
  const [weeks, setWeeks] = useState<ContribDay[][]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setWeeks([]);
    setError(false);

    // read:user scope only — safe to use client-side for public portfolios
    const token = import.meta.env.VITE_GITHUB_TOKEN;

    const from = `${year}-01-01T00:00:00Z`;
    const to = `${year}-12-31T23:59:59Z`;

    const query = `
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

    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables: { userName: USERNAME, from, to },
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`GraphQL Error: ${res.status}`);
        return res.json();
      })
      .then((res) => {
        if (res.errors) throw new Error(res.errors[0]?.message);
        const calendar =
          res.data.user.contributionsCollection.contributionCalendar;
        setTotal(calendar.totalContributions);
        const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
          NONE: 0,
          FIRST_QUARTILE: 1,
          SECOND_QUARTILE: 2,
          THIRD_QUARTILE: 3,
          FOURTH_QUARTILE: 4,
        };
        setWeeks(
          calendar.weeks.map((week: any) =>
            week.contributionDays.map((day: any) => ({
              date: day.date,
              count: day.contributionCount,
              level: levelMap[day.contributionLevel],
            })),
          ),
        );
      })
      .catch((err) => {
        console.error("Failed to fetch contributions:", err);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [year]);

  return { weeks, total, loading, error };
};

// ── GitHub REST data ───────────────────────────────────────────
const useGitHubData = () => {
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${GITHUB_API}/users/${USERNAME}`).then((r) => r.json()),
      fetch(
        `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`,
      ).then((r) => r.json()),
    ])
      .then(([u, r]) => {
        setUser(u);
        setRepos(
          Array.isArray(r) ? r.filter((repo: GHRepo) => !repo.fork) : [],
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const topLanguages = Object.entries(
    repos.reduce((acc: Record<string, number>, r) => {
      if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return { user, repos, totalStars, topLanguages, loading };
};

const LEVEL_COLORS = [
  "hsl(var(--muted))",
  "#0e4429",
  "#006d32",
  "#26a641",
  "#39d353",
];

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// ── Heatmap ────────────────────────────────────────────────────
const ContribHeatmap = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { weeks, total, loading, error } = useContributions(selectedYear);

  // Chronological order: oldest → newest
  const years = [currentYear - 2, currentYear - 1, currentYear];

  const monthLabels: { label: string; weekIdx: number }[] = [];
  weeks.forEach((week, i) => {
    if (week[0]) {
      const d = new Date(week[0].date);
      const prevMonth =
        i > 0 ? new Date(weeks[i - 1]?.[0]?.date ?? "").getMonth() : -1;
      if (d.getMonth() !== prevMonth) {
        monthLabels.push({ label: MONTHS[d.getMonth()], weekIdx: i });
      }
    }
  });

  return (
    <div>
      {/* Header — total + year filters */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span className="text-sm font-medium text-foreground">
          {loading
            ? "Loading..."
            : error
              ? "Could not load contributions"
              : `${total.toLocaleString()} contributions in ${selectedYear}`}
        </span>
        <div className="flex items-center gap-1">
          {years.map((y) => (
            <button
              key={y}
              onClick={() => setSelectedYear(y)}
              style={{
                padding: "3px 10px",
                borderRadius: "999px",
                fontSize: "12px",
                fontWeight: selectedYear === y ? 600 : 400,
                border: `1px solid ${selectedYear === y ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                background:
                  selectedYear === y ? "hsl(var(--primary))" : "transparent",
                color:
                  selectedYear === y
                    ? "hsl(var(--primary-foreground))"
                    : "hsl(var(--muted-foreground))",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-end items-center gap-1.5 text-xs text-muted-foreground mb-2">
        <span>Less</span>
        {LEVEL_COLORS.map((c, i) => (
          <span
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: c,
              display: "inline-block",
            }}
          />
        ))}
        <span>More</span>
      </div>

      {/* Error state */}
      {error ? (
        <div className="text-center text-sm text-muted-foreground py-8">
          Failed to load contributions. Check your token.
        </div>
      ) : loading ? (
        <div
          style={{
            height: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="text-muted-foreground text-sm">Loading...</span>
        </div>
      ) : (
        // Fade animation on year switch
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflowX: "auto" }}
          >
            {/* Month labels */}
            <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
              {weeks.map((_, i) => {
                const lbl = monthLabels.find((m) => m.weekIdx === i);
                return (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      flexShrink: 0,
                      fontSize: 10,
                      color: "hsl(var(--muted-foreground))",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {lbl ? lbl.label : ""}
                  </div>
                );
              })}
            </div>
            {/* Grid */}
            <div style={{ display: "flex", gap: 3 }}>
              {weeks.map((week, wi) => (
                <div
                  key={wi}
                  style={{ display: "flex", flexDirection: "column", gap: 3 }}
                >
                  {Array.from({ length: 7 }).map((_, di) => {
                    const day = week[di];
                    return (
                      <div
                        key={di}
                        title={
                          day
                            ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`
                            : ""
                        }
                        style={{
                          width: 12,
                          height: 12,
                          borderRadius: 2,
                          flexShrink: 0,
                          background: day
                            ? LEVEL_COLORS[day.level]
                            : LEVEL_COLORS[0],
                          transition: "transform 0.1s",
                          cursor: day?.count ? "pointer" : "default",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.transform =
                            "scale(1.5)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.transform =
                            "scale(1)";
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
const GitHubStats = () => {
  const { user, totalStars, topLanguages, repos, loading } = useGitHubData();

  const LANG_COLORS: Record<string, string> = {
    Python: "#3572A5",
    TypeScript: "#3178c6",
    JavaScript: "#f7df1e",
    "Jupyter Notebook": "#DA5B0B",
    "C++": "#f34b7d",
    CSS: "#563d7c",
    HTML: "#e34c26",
    C: "#555555",
    Java: "#b07219",
    "C#": "#178600",
  };

  const statCards = [
    {
      icon: BookOpen,
      label: "Public Repos",
      value: user?.public_repos ?? "—",
      color: "text-primary",
    },
    {
      icon: Star,
      label: "Total Stars",
      value: totalStars || "—",
      color: "text-yellow-500",
    },
    {
      icon: GitFork,
      label: "Total Forks",
      value: repos.reduce((s, r) => s + r.forks_count, 0) || "—",
      color: "text-accent",
    },
    {
      icon: TrendingUp,
      label: "Followers",
      value: user?.followers ?? "—",
      color: "text-primary",
    },
  ];

  return (
    <section className="py-16 px-4" id="github">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            GitHub Activity
          </h2>
          <p className="text-muted-foreground text-lg">
            Consistent daily coding — open source contributions
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {statCards.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-background border border-border rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-foreground">
                  {loading ? "..." : s.value}
                </div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages + Top repos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-background border border-border rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">Top Languages</span>
            </div>
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-3">
                {topLanguages.map(([lang, count]) => {
                  const pct = Math.round((count / repos.length) * 100);
                  return (
                    <div key={lang}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="flex items-center gap-1.5">
                          <span
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: LANG_COLORS[lang] || "#888",
                              display: "inline-block",
                            }}
                          />
                          <span className="text-foreground font-medium">
                            {lang}
                          </span>
                        </span>
                        <span className="text-muted-foreground">{pct}%</span>
                      </div>
                      <div
                        style={{
                          height: 5,
                          background: "hsl(var(--muted))",
                          borderRadius: 3,
                          overflow: "hidden",
                        }}
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          style={{
                            height: "100%",
                            background:
                              LANG_COLORS[lang] || "hsl(var(--primary))",
                            borderRadius: 3,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
          {/* Top Repositories */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-background border border-border rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold">Top Repositories</span>
            </div>
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-3">
                {[
                  // Pinned manually — mix of public (from API) + private (hardcoded)
                  {
                    name: "JobPilot",
                    description:
                      "Automated job hunting application from MCP servers",
                    html_url: "https://github.com/Deepak-gautam1/JobPilot",
                    language: "Python",
                    stargazers_count: 0,
                  },
                  {
                    name: "PortfolioReact",
                    description:
                      repos.find((r) => r.name === "PortfolioReact")
                        ?.description ??
                      "Personal portfolio built with React & TypeScript",
                    html_url:
                      "https://github.com/Deepak-gautam1/PortfolioReact",
                    language: "TypeScript",
                    stargazers_count:
                      repos.find((r) => r.name === "PortfolioReact")
                        ?.stargazers_count ?? 0,
                  },
                  {
                    name: "BunnyTraveler",
                    description:
                      "Travel companion platform — find & match travel partners",
                    html_url: "https://github.com/Deepak-gautam1/BunnyTraveler",
                    language: "TypeScript",
                    stargazers_count: 0,
                  },
                  {
                    name: "Food_Recommendation",
                    description:
                      repos.find((r) => r.name === "Food_Recommendation")
                        ?.description ??
                      "ML model for food recommendation using KNN",
                    html_url:
                      "https://github.com/Deepak-gautam1/Food_Recommendation",
                    language: "Jupyter Notebook",
                    stargazers_count:
                      repos.find((r) => r.name === "Food_Recommendation")
                        ?.stargazers_count ?? 0,
                  },
                ].map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group hover:text-primary transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {repo.name}
                      </div>
                      {repo.description && (
                        <div className="text-xs text-muted-foreground truncate">
                          {repo.description}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-3 text-xs text-muted-foreground">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span
                            style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: LANG_COLORS[repo.language] || "#888",
                              display: "inline-block",
                            }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        {repo.stargazers_count}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </motion.div>
          {/*  THIS CODE FOR MOST STARS REPO I HAVE 0 ON ALL SO HARDCODED BEST OF
          ME */}
          {/* <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-background border border-border rounded-2xl p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-semibold">Top Repositories</span>
            </div>
            {loading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <div className="space-y-3">
                {[...repos]
                  .sort((a, b) => b.stargazers_count - a.stargazers_count)
                  .slice(0, 4)
                  .map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between group hover:text-primary transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                          {repo.name}
                        </div>
                        {repo.description && (
                          <div className="text-xs text-muted-foreground truncate">
                            {repo.description}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-3 text-xs text-muted-foreground">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span
                              style={{
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                background:
                                  LANG_COLORS[repo.language] || "#888",
                                display: "inline-block",
                              }}
                            />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stargazers_count}
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            )}
          </motion.div> */}
        </div>

        {/* Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-background border border-border rounded-2xl p-6"
        >
          <ContribHeatmap />
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Data fetched live from GitHub API
            </span>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              View full profile
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
