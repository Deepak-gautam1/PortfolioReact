import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GithubIcon, Star, GitFork, Code2, TrendingUp, BookOpen } from "lucide-react";

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

// ── Contribution heatmap hook ─────────────────────────────────
const useContributions = () => {
  const [weeks, setWeeks] = useState<ContribDay[][]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // No ?y param — returns { contributions: [...allDays], total: {...} }
    fetch(`https://github-contributions-api.jogruber.de/v4/${USERNAME}`)
      .then((r) => r.json())
      .then((data) => {
        let days: ContribDay[] = data.contributions ?? [];
        // Keep only the last 371 days (53 weeks)
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - 371);
        days = days.filter((d: ContribDay) => new Date(d.date) >= cutoff);
        setTotal(days.reduce((s: number, d: ContribDay) => s + d.count, 0));
        // Chunk into columns of 7 days
        const w: ContribDay[][] = [];
        for (let i = 0; i < days.length; i += 7) w.push(days.slice(i, i + 7));
        setWeeks(w);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { weeks, total, loading };
};

// ── GitHub REST data ───────────────────────────────────────────
const useGitHubData = () => {
  const [user, setUser] = useState<GHUser | null>(null);
  const [repos, setRepos] = useState<GHRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${GITHUB_API}/users/${USERNAME}`).then((r) => r.json()),
      fetch(`${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated`).then((r) => r.json()),
    ])
      .then(([u, r]) => {
        setUser(u);
        setRepos(Array.isArray(r) ? r.filter((repo: GHRepo) => !repo.fork) : []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const topLanguages = Object.entries(
    repos.reduce((acc: Record<string, number>, r) => {
      if (r.language) acc[r.language] = (acc[r.language] || 0) + 1;
      return acc;
    }, {})
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

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

// ── Heatmap ────────────────────────────────────────────────────
const ContribHeatmap = () => {
  const { weeks, total, loading } = useContributions();

  if (loading) return (
    <div style={{ height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span className="text-muted-foreground text-sm">Loading contributions...</span>
    </div>
  );

  const monthLabels: { label: string; weekIdx: number }[] = [];
  weeks.forEach((week, i) => {
    if (week[0]) {
      const d = new Date(week[0].date);
      const prevMonth = i > 0 ? new Date(weeks[i - 1]?.[0]?.date ?? "").getMonth() : -1;
      if (d.getMonth() !== prevMonth) {
        monthLabels.push({ label: MONTHS[d.getMonth()], weekIdx: i });
      }
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <span className="text-sm font-medium text-foreground">
          {total.toLocaleString()} contributions in the last year
        </span>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span>Less</span>
          {LEVEL_COLORS.map((c, i) => (
            <span key={i} style={{ width: 10, height: 10, borderRadius: 2, background: c, display: "inline-block" }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div style={{ overflowX: "auto" }}>
        {/* Month labels */}
        <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
          {weeks.map((_, i) => {
            const lbl = monthLabels.find((m) => m.weekIdx === i);
            return (
              <div key={i} style={{ width: 12, flexShrink: 0, fontSize: 10, color: "hsl(var(--muted-foreground))", whiteSpace: "nowrap" }}>
                {lbl ? lbl.label : ""}
              </div>
            );
          })}
        </div>

        {/* Grid */}
        <div style={{ display: "flex", gap: 3 }}>
          {weeks.map((week, wi) => (
            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {Array.from({ length: 7 }).map((_, di) => {
                const day = week[di];
                return (
                  <div
                    key={di}
                    title={day ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}` : ""}
                    style={{
                      width: 12, height: 12, borderRadius: 2, flexShrink: 0,
                      background: day ? LEVEL_COLORS[day.level] : LEVEL_COLORS[0],
                      transition: "transform 0.1s",
                      cursor: day?.count ? "pointer" : "default",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1.5)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ── Main Component ─────────────────────────────────────────────
const GitHubStats = () => {
  const { user, totalStars, topLanguages, repos, loading } = useGitHubData();

  const LANG_COLORS: Record<string, string> = {
    Python: "#3572A5", TypeScript: "#3178c6", JavaScript: "#f7df1e",
    "Jupyter Notebook": "#DA5B0B", "C++": "#f34b7d", CSS: "#563d7c",
    HTML: "#e34c26", C: "#555555", Java: "#b07219", "C#": "#178600",
  };

  const statCards = [
    { icon: BookOpen,  label: "Public Repos", value: user?.public_repos ?? "—",                                   color: "text-primary"    },
    { icon: Star,      label: "Total Stars",  value: totalStars || "—",                                           color: "text-yellow-500" },
    { icon: GitFork,   label: "Total Forks",  value: repos.reduce((s, r) => s + r.forks_count, 0) || "—",        color: "text-accent"     },
    { icon: TrendingUp,label: "Followers",    value: user?.followers ?? "—",                                      color: "text-primary"    },
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
                <div className="text-xl font-bold text-foreground">{loading ? "..." : s.value}</div>
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
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: LANG_COLORS[lang] || "#888", display: "inline-block" }} />
                          <span className="text-foreground font-medium">{lang}</span>
                        </span>
                        <span className="text-muted-foreground">{pct}%</span>
                      </div>
                      <div style={{ height: 5, background: "hsl(var(--muted))", borderRadius: 3, overflow: "hidden" }}>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                          style={{ height: "100%", background: LANG_COLORS[lang] || "hsl(var(--primary))", borderRadius: 3 }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

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
                        <div className="text-sm font-medium truncate group-hover:text-primary transition-colors">{repo.name}</div>
                        {repo.description && (
                          <div className="text-xs text-muted-foreground truncate">{repo.description}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0 ml-3 text-xs text-muted-foreground">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span style={{ width: 7, height: 7, borderRadius: "50%", background: LANG_COLORS[repo.language] || "#888", display: "inline-block" }} />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />{repo.stargazers_count}
                        </span>
                      </div>
                    </a>
                  ))}
              </div>
            )}
          </motion.div>
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
            <span className="text-xs text-muted-foreground">Data fetched live from GitHub API</span>
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
