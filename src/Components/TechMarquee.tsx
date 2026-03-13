import { motion } from "framer-motion";

const TECH_STACK = [
  { name: "React", icon: "⚛" },
  { name: "TypeScript", icon: "TS" },
  { name: "Python", icon: "Py" },
  { name: "C#", icon: "C#" },
  { name: "Azure", icon: "☁" },
  { name: "Node.js", icon: "⬡" },
  { name: "SQL Server", icon: "🗄" },
  { name: "Docker", icon: "🐳" },
  { name: "GPT-4o", icon: "✦" },
  { name: "LangChain", icon: "🔗" },
  { name: "TensorFlow", icon: "🧠" },
  { name: "Supabase", icon: "⚡" },
  { name: "FastAPI", icon: "🚀" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Git", icon: "⑂" },
  { name: "Tailwind", icon: "💨" },
  { name: "Next.js", icon: "▲" },
  { name: "PostgreSQL", icon: "🐘" },
];

// Duplicate for seamless loop
const DOUBLED = [...TECH_STACK, ...TECH_STACK];

const TechItem = ({ tech }: { tech: typeof TECH_STACK[0] }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      padding: "8px 18px",
      borderRadius: "999px",
      border: "0.5px solid hsl(var(--border))",
      background: "hsl(var(--background))",
      whiteSpace: "nowrap",
      flexShrink: 0,
    }}
  >
    <span style={{ fontSize: "14px", lineHeight: 1 }}>{tech.icon}</span>
    <span style={{ fontSize: "13px", fontWeight: 500, color: "hsl(var(--foreground))" }}>
      {tech.name}
    </span>
  </div>
);

const TechMarquee = () => {
  return (
    <section className="py-16 px-4 overflow-hidden" id="techstack">
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
        >
          Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-muted-foreground text-lg"
        >
          Tools and technologies I work with every day
        </motion.p>
      </div>

      {/* Row 1 — left to right */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          marginBottom: "12px",
        }}
      >
        {/* Fade edges */}
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, hsl(var(--background)), transparent)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, hsl(var(--background)), transparent)", zIndex: 1, pointerEvents: "none" }} />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ display: "inline-flex", gap: "10px", width: "max-content" }}
        >
          {DOUBLED.map((tech, i) => (
            <TechItem key={`row1-${i}`} tech={tech} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — right to left (reversed) */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to right, hsl(var(--background)), transparent)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "80px", background: "linear-gradient(to left, hsl(var(--background)), transparent)", zIndex: 1, pointerEvents: "none" }} />

        <motion.div
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ display: "inline-flex", gap: "10px", width: "max-content" }}
        >
          {[...DOUBLED].reverse().map((tech, i) => (
            <TechItem key={`row2-${i}`} tech={tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechMarquee;
