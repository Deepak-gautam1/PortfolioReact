import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const RatingRing = ({
  rating, maxRating, size = 100, strokeWidth = 7, color, delay = 0,
}: {
  rating: number; maxRating: number; size?: number; strokeWidth?: number; color: string; delay?: number;
}) => {
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView({ current: ref.current?.closest("svg") as Element }, { once: true });
  const [animated, setAnimated] = useState(false);
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - Math.min(rating / maxRating, 1) * circumference;

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
      <circle
        ref={ref}
        cx={size / 2} cy={size / 2} r={radius} fill="none"
        stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={animated ? offset : circumference}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
      />
    </svg>
  );
};

interface Platform {
  name: string; handle: string; rating: number; maxRating: number;
  rank: string; rankColor: string; color: string; bgColor: string;
  problems?: string; badge: string; url: string;
}

const PlatformCard = ({ platform, index }: { platform: Platform; index: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={platform.url} target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        display: "block", background: "hsl(var(--background))", textDecoration: "none", cursor: "pointer",
        border: `1px solid ${hovered ? platform.color + "55" : "hsl(var(--border))"}`,
        borderRadius: "16px", padding: "24px", transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered ? `0 16px 40px -12px ${platform.color}40` : "0 2px 8px hsl(var(--foreground) / 0.06)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700, color: "hsl(var(--foreground))" }}>{platform.name}</div>
          <div style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))", marginTop: "2px" }}>{platform.handle}</div>
        </div>
        <div style={{ padding: "4px 12px", borderRadius: "999px", background: platform.color + "18", fontSize: "12px", fontWeight: 700, color: platform.color }}>
          {platform.badge}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <RatingRing rating={platform.rating} maxRating={platform.maxRating} size={100} strokeWidth={7} color={platform.color} delay={index * 120} />
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "20px", fontWeight: 700, color: platform.color, lineHeight: 1 }}>{platform.rating}</span>
            <span style={{ fontSize: "10px", color: "hsl(var(--muted-foreground))", marginTop: "2px" }}>/ {platform.maxRating}</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "10px" }}>
            <div style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Rank</div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: platform.rankColor }}>{platform.rank}</div>
          </div>
          {platform.problems && (
            <div>
              <div style={{ fontSize: "11px", color: "hsl(var(--muted-foreground))", marginBottom: "3px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Problems</div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "hsl(var(--foreground))" }}>{platform.problems}</div>
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
};

const CPRatings = () => {
  const platforms: Platform[] = [
    {
      name: "LeetCode",
      handle: "@Leevi_01",
      rating: 1805,
      maxRating: 2400,
      rank: "Knight",
      rankColor: "#fbbf24",
      color: "#f59e0b",
      bgColor: "#fef3c710",
      badge: "Knight",
      problems: "800+",
      url: "https://leetcode.com/u/Leevi_01/",
    },
    {
      name: "CodeChef",
      handle: "@leevii",
      rating: 1806,
      maxRating: 2500,
      rank: "4★ Coder",
      rankColor: "#3b82f6",
      color: "#3b82f6",
      bgColor: "#3b82f610",
      badge: "4 ★★★★",
      problems: "500+",
      url: "https://www.codechef.com/users/leevii",
    },
    {
      name: "Codeforces",
      handle: "@delhiiboy_2.0",
      rating: 1365,
      maxRating: 2400,
      rank: "Specialist",
      rankColor: "#22c55e",
      color: "#22c55e",
      bgColor: "#22c55e10",
      badge: "Specialist",
      problems: "1200+",
      url: "https://codeforces.com/profile/delhiiboy_2.0",
    },
  ];

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <div ref={headingRef}>
      <motion.h3
        initial={{ opacity: 0, y: 16 }} animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ fontSize: "22px", fontWeight: 700, textAlign: "center", marginBottom: "8px" }}
      >
        Competitive Programming
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }} animate={headingInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ textAlign: "center", color: "hsl(var(--muted-foreground))", fontSize: "14px", marginBottom: "28px" }}
      >
        2,500+ problems solved · Top ratings across all major platforms
      </motion.p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "24px" }}>
        {platforms.map((platform, i) => (
          <PlatformCard key={platform.name} platform={platform} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          background: "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.08))",
          border: "1px solid hsl(var(--primary) / 0.2)", borderRadius: "16px",
          padding: "20px 24px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: "36px", lineHeight: 1 }}>🏆</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "hsl(var(--foreground))" }}>Amazon ML School 2024 — Selected</div>
          <div style={{ fontSize: "14px", color: "hsl(var(--muted-foreground))", marginTop: "4px" }}>
            Chosen from <strong style={{ color: "hsl(var(--primary))" }}>90,000+ applicants</strong> for the prestigious Machine Learning mentorship program
          </div>
        </div>
        <div style={{ padding: "6px 16px", borderRadius: "999px", background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))", fontSize: "12px", fontWeight: 700, whiteSpace: "nowrap" }}>
          Top 0.055%
        </div>
      </motion.div>
    </div>
  );
};

export default CPRatings;
