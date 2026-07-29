import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import profile from "@/data/profile.json";

const RatingRing = ({
  rating,
  maxRating,
  size = 100,
  strokeWidth = 7,
  color,
  delay = 0,
}: {
  rating: number;
  maxRating: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  delay?: number;
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
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth={strokeWidth}
      />
      <circle
        ref={ref}
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={animated ? offset : circumference}
        style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)" }}
      />
    </svg>
  );
};

interface Platform {
  name: string;
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  /** Theme palette variable this card is keyed to, e.g. "--primary". Kept as a
      variable name (not a literal) so both light and dark themes resolve it. */
  colorVar: string;
  problems?: string;
  badge: string;
  url: string;
}

const tone = (colorVar: string, alpha?: number) =>
  alpha === undefined ? `hsl(var(${colorVar}))` : `hsl(var(${colorVar}) / ${alpha})`;

const PlatformCard = ({ platform, index }: { platform: Platform; index: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={platform.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6, scale: 1.02 }}
      style={{
        display: "block",
        background: "hsl(var(--background))",
        textDecoration: "none",
        cursor: "pointer",
        border: `1px solid ${hovered ? tone(platform.colorVar, 0.35) : "hsl(var(--border))"}`,
        borderRadius: "16px",
        padding: "24px",
        transition: "border-color 0.3s, box-shadow 0.3s",
        boxShadow: hovered
          ? `0 16px 40px -12px ${tone(platform.colorVar, 0.25)}`
          : "0 2px 8px hsl(var(--foreground) / 0.06)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <div
            className="font-display"
            style={{ fontSize: "18px", fontWeight: 700, color: "hsl(var(--foreground))" }}
          >
            {platform.name}
          </div>
          <div
            style={{ fontSize: "12px", color: "hsl(var(--muted-foreground))", marginTop: "2px" }}
          >
            {platform.handle}
          </div>
        </div>
        <div
          style={{
            padding: "4px 12px",
            borderRadius: "999px",
            background: tone(platform.colorVar, 0.12),
            fontSize: "12px",
            fontWeight: 700,
            color: tone(platform.colorVar),
          }}
        >
          {platform.badge}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <RatingRing
            rating={platform.rating}
            maxRating={platform.maxRating}
            size={100}
            strokeWidth={7}
            color={tone(platform.colorVar)}
            delay={index * 120}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: tone(platform.colorVar),
                lineHeight: 1,
              }}
            >
              {platform.rating}
            </span>
            <span
              style={{ fontSize: "10px", color: "hsl(var(--muted-foreground))", marginTop: "2px" }}
            >
              / {platform.maxRating}
            </span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontSize: "11px",
                color: "hsl(var(--muted-foreground))",
                marginBottom: "3px",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Rank
            </div>
            <div style={{ fontSize: "16px", fontWeight: 700, color: tone(platform.colorVar) }}>
              {platform.rank}
            </div>
          </div>
          {platform.problems && (
            <div>
              <div
                style={{
                  fontSize: "11px",
                  color: "hsl(var(--muted-foreground))",
                  marginBottom: "3px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Problems
              </div>
              <div style={{ fontSize: "16px", fontWeight: 700, color: "hsl(var(--foreground))" }}>
                {platform.problems}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.a>
  );
};

// Badge text has its own display quirks (e.g. CodeChef spells out the stars)
// that don't belong in the shared data, so it's kept as a small local lookup.
const BADGES: Record<string, string> = {
  LeetCode: "Knight",
  CodeChef: "4 ★★★★",
  Codeforces: "Specialist",
};

const platforms: Platform[] = profile.competitiveProgramming.platforms.map((p) => ({
  ...p,
  badge: BADGES[p.name] ?? p.rank,
}));

const CPRatings = () => {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <div ref={headingRef}>
      <motion.h3
        initial={{ opacity: 0, y: 16 }}
        animate={headingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        style={{ fontSize: "22px", fontWeight: 700, textAlign: "center", marginBottom: "8px" }}
      >
        Competitive Programming
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={headingInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{
          textAlign: "center",
          color: "hsl(var(--muted-foreground))",
          fontSize: "14px",
          marginBottom: "28px",
        }}
      >
        {profile.competitiveProgramming.totalProblems} problems solved · Top ratings across all
        major platforms
      </motion.p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          marginBottom: "24px",
        }}
      >
        {platforms.map((platform, i) => (
          <PlatformCard key={platform.name} platform={platform} index={i} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          background:
            "linear-gradient(135deg, hsl(var(--primary) / 0.08), hsl(var(--accent) / 0.08))",
          border: "1px solid hsl(var(--primary) / 0.2)",
          borderRadius: "16px",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: "36px", lineHeight: 1 }}>🏆</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "hsl(var(--foreground))" }}>
            {profile.achievements[0].title} — Selected
          </div>
          <div
            style={{ fontSize: "14px", color: "hsl(var(--muted-foreground))", marginTop: "4px" }}
          >
            Chosen from{" "}
            <strong style={{ color: "hsl(var(--primary))" }}>
              {profile.achievements[0].applicantPool}
            </strong>{" "}
            {profile.achievements[0].context}
          </div>
        </div>
        <div
          style={{
            padding: "6px 16px",
            borderRadius: "999px",
            background: "hsl(var(--primary))",
            color: "hsl(var(--primary-foreground))",
            fontSize: "12px",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          {profile.achievements[0].badge}
        </div>
      </motion.div>
    </div>
  );
};

export default CPRatings;
