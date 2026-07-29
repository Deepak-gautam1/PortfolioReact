import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  type MotionValue,
} from "framer-motion";
import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Calendar, MapPin, Building, TrendingUp, Zap } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import profile from "@/data/profile.json";

// Same scroll-spring precedent already established in ScrollProgress.tsx.
const SPRING = { stiffness: 100, damping: 30, restDelta: 0.001 };

// A bullet fades/slides in as its role card's own scroll progress passes its
// slot, then stays lit — a narrator walking line by line, not a re-triggering
// scrubber. `total` spaces the reveal windows evenly across the card's focus
// ramp so it self-adjusts if a bullet is ever added/removed. Reveal is driven
// by a monotonically-increasing "high water mark" of progress (not the raw,
// bidirectional scroll value), so scrolling back up to re-read never re-dims
// a bullet that was already revealed.
const AnimatedBullet = ({
  progress,
  index,
  total,
  reduceMotion,
  className,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduceMotion: boolean;
  className: string;
  children: ReactNode;
}) => {
  const start = 0.05 + index * (0.4 / Math.max(total - 1, 1));
  const maxProgress = useMotionValue(progress.get());
  useMotionValueEvent(progress, "change", (latest) => {
    if (latest > maxProgress.get()) maxProgress.set(latest);
  });
  const opacity = useTransform(maxProgress, [start, start + 0.15], [0.35, 1]);
  const x = useTransform(maxProgress, [start, start + 0.15], [-12, 0]);
  return (
    <motion.div className={className} style={reduceMotion ? undefined : { opacity, x }}>
      {children}
    </motion.div>
  );
};

const Experience = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const fullTimeRef = useRef<HTMLDivElement>(null);
  const internRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const reduceMotion = isMobile || prefersReducedMotion;

  const { scrollYProgress: pFT } = useScroll({
    target: fullTimeRef,
    offset: ["start 0.9", "end 0.1"],
  });
  const { scrollYProgress: pIn } = useScroll({
    target: internRef,
    offset: ["start 0.9", "end 0.1"],
  });
  const { scrollYProgress: pCard } = useScroll({
    target: cardRef,
    offset: ["start 0.85", "end 0.15"],
  });

  // Triangular "focus" curve: 0 at the edges, 1 when the card is centered.
  const focusFT = useSpring(useTransform(pFT, [0, 0.5, 1], [0, 1, 0]), SPRING);
  const focusIn = useSpring(useTransform(pIn, [0, 0.5, 1], [0, 1, 0]), SPRING);
  const mobileBarScaleX = useSpring(pCard, SPRING);

  // Opacity/brightness floors are deliberately high (not the dramatic dim a
  // "spotlight" metaphor might suggest) — a card at rest in the unfocused
  // state still holds muted-foreground body text, and a heavier dim would
  // blend that text toward the background below WCAG AA contrast.
  const scaleFT = useTransform(focusFT, [0, 1], [0.96, 1]);
  const opacityFT = useTransform(focusFT, [0, 1], [0.88, 1]);
  const filterFT = useTransform(
    focusFT,
    (f) => `brightness(${0.92 + f * 0.08}) saturate(${0.94 + f * 0.06})`,
  );

  const scaleIn = useTransform(focusIn, [0, 1], [0.96, 1]);
  const opacityIn = useTransform(focusIn, [0, 1], [0.88, 1]);
  const filterIn = useTransform(
    focusIn,
    (f) => `brightness(${0.92 + f * 0.08}) saturate(${0.94 + f * 0.06})`,
  );

  const eyebrowOpacityFT = useTransform(focusFT, [0, 0.3], [0, 1]);
  const eyebrowOpacityIn = useTransform(focusIn, [0, 0.3], [0, 1]);

  const glowMail = useTransform(focusFT, (f) => `0 0 ${18 * f}px hsl(var(--accent) / ${0.32 * f})`);
  const glowPeet = useTransform(focusFT, (f) => `0 0 ${18 * f}px hsl(var(--primary) / ${0.32 * f})`);
  const glowSales = useTransform(focusIn, (f) => `0 0 ${18 * f}px hsl(var(--accent) / ${0.32 * f})`);

  // Deliberately snappier spring than SPRING — a small overshoot is the
  // intended "payoff" feel for the PPO capstone beat, not a general pattern.
  const ppoRaw = useTransform(pIn, [0.45, 0.6, 0.75], [0.85, 1.05, 1]);
  const ppoScale = useSpring(ppoRaw, { stiffness: 260, damping: 18 });
  const ppoOpacity = useTransform(pIn, [0.45, 0.65], [0, 1]);
  const ppoGlowIntensity = useTransform(pIn, [0.45, 0.65], [0, 1]);
  const ppoGlow = useTransform(
    ppoGlowIntensity,
    (v) => `0 0 ${24 * v}px hsl(var(--accent) / ${0.4 * v})`,
  );

  return (
    <section className="py-20 px-4 bg-muted" id="experience">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Experience
          </h2>
          <p className="text-lg text-muted-foreground">
            My professional journey and key accomplishments.
          </p>
          {!prefersReducedMotion && (
            <motion.div
              className="md:hidden h-[2px] w-full max-w-xs mx-auto rounded-full mt-6"
              style={{
                scaleX: mobileBarScaleX,
                transformOrigin: "left",
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
              }}
            />
          )}
        </div>

        <Card ref={cardRef} className="p-8 bg-background border shadow-lg">
          {/* Company Header */}
          <div className="flex items-center gap-4 mb-6">
            <Building className="w-8 h-8 text-primary" />
            <div>
              <h3 className="text-2xl font-semibold">{profile.currentRole.company}</h3>
              <p className="text-sm text-muted-foreground">
                {profile.currentRole.brands.join(" · ")} — {profile.currentRole.region}
              </p>
            </div>
          </div>

          <div className="space-y-8">
            {/* ── Full-Time Role ── */}
            <motion.div
              ref={fullTimeRef}
              style={reduceMotion ? undefined : { scale: scaleFT, opacity: opacityFT, filter: filterFT }}
            >
              <motion.span
                style={reduceMotion ? undefined : { opacity: eyebrowOpacityFT }}
                className="text-xs font-semibold tracking-wide uppercase text-accent/80 block mb-1"
              >
                Chapter 01 — Now
              </motion.span>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <div>
                  <h4 className="text-xl font-semibold text-primary">
                    {profile.currentRole.title} ({profile.currentRole.type})
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    {profile.currentRole.focus}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1 sm:mt-0">
                  <Calendar className="w-4 h-4" />
                  <span>{profile.currentRole.period}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{profile.location.city}</span>
              </div>

              <motion.div
                className="bg-accent/5 border border-accent/15 rounded-lg px-4 py-3 mb-4 flex items-center gap-3"
                style={reduceMotion ? undefined : { boxShadow: glowMail }}
              >
                <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <span className="font-semibold text-sm text-foreground">Mail Assistant</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    AI Automation · Outlook · Azure OpenAI
                  </span>
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Azure OpenAI</Badge>
                <Badge variant="secondary">Microsoft Graph API</Badge>
                <Badge variant="secondary">Outlook</Badge>
                <Badge variant="secondary">FastAPI</Badge>
              </div>

              <div className="space-y-3 mb-6">
                <AnimatedBullet
                  progress={pFT}
                  index={0}
                  total={6}
                  reduceMotion={reduceMotion}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>AI Mail Workflow:</strong> Built an internal mail assistant to classify
                    incoming requests, summarize context, and prepare response drafts for repetitive
                    operational communication.
                  </p>
                </AnimatedBullet>
                <AnimatedBullet
                  progress={pFT}
                  index={1}
                  total={6}
                  reduceMotion={reduceMotion}
                  className="border-l-2 border-accent pl-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>Human-in-the-Loop Review:</strong> Designed the assistant around
                    controlled prompts and review-first workflows, keeping final communication
                    approval with the business user.
                  </p>
                </AnimatedBullet>
              </div>

              <motion.div
                className="bg-primary/5 border border-primary/15 rounded-lg px-4 py-3 mb-4 flex items-center gap-3"
                style={reduceMotion ? undefined : { boxShadow: glowPeet }}
              >
                <Zap className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <span className="font-semibold text-sm text-foreground">
                    Peet's Coffee Loyalty Platform
                  </span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Production system · 50,000+ daily active users
                  </span>
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">C#</Badge>
                <Badge variant="secondary">Azure Functions</Badge>
                <Badge variant="secondary">Zoho Creator</Badge>
                <Badge variant="secondary">REST APIs</Badge>
                <Badge variant="secondary">SQL Server</Badge>
              </div>

              <div className="space-y-3">
                <AnimatedBullet
                  progress={pFT}
                  index={2}
                  total={6}
                  reduceMotion={reduceMotion}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>Membership Workflows:</strong> Collaborated with cross-functional teams
                    to engineer production backend services implementing tier upgrades and rule
                    enforcement for{" "}
                    <span className="text-foreground font-medium">50,000+ daily active users</span>.
                  </p>
                </AnimatedBullet>
                <AnimatedBullet
                  progress={pFT}
                  index={3}
                  total={6}
                  reduceMotion={reduceMotion}
                  className="border-l-2 border-accent pl-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>Earn–Burn Engine:</strong> Refactored the core engine with idempotent
                    processing, tier multipliers, and automated expiry policies — processing
                    high-volume transactions with{" "}
                    <span className="text-foreground font-medium">zero downtime</span>.
                  </p>
                </AnimatedBullet>
                <AnimatedBullet
                  progress={pFT}
                  index={4}
                  total={6}
                  reduceMotion={reduceMotion}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>Database Architecture:</strong> Designed normalised schemas tracking
                    earn, burn, and gain states, enabling automated reconciliation across
                    distributed systems.
                  </p>
                </AnimatedBullet>
                <AnimatedBullet
                  progress={pFT}
                  index={5}
                  total={6}
                  reduceMotion={reduceMotion}
                  className="border-l-2 border-accent pl-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>Validation Pipeline:</strong> Built a cross-platform validation pipeline
                    spanning Azure services and mobile applications, reducing duplicate transaction
                    incidents by <span className="text-foreground font-medium">99%</span>.
                  </p>
                </AnimatedBullet>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-b" />

            {/* ── Internship Role ── */}
            <motion.div
              ref={internRef}
              style={reduceMotion ? undefined : { scale: scaleIn, opacity: opacityIn, filter: filterIn }}
            >
              <motion.span
                style={reduceMotion ? undefined : { opacity: eyebrowOpacityIn }}
                className="text-xs font-semibold tracking-wide uppercase text-accent/80 block mb-1"
              >
                Chapter 02 — Where It Started
              </motion.span>
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                <div>
                  <h4 className="text-xl font-semibold text-primary">
                    {profile.priorRole.title} ({profile.priorRole.type})
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium">
                    {profile.priorRole.focus}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1 sm:mt-0">
                  <Calendar className="w-4 h-4" />
                  <span>{profile.priorRole.period}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
                <MapPin className="w-4 h-4" />
                <span>{profile.location.city}</span>
              </div>

              <motion.div
                className="bg-accent/5 border border-accent/15 rounded-lg px-4 py-3 mb-4 flex items-center gap-3"
                style={reduceMotion ? undefined : { boxShadow: glowSales }}
              >
                <Zap className="w-5 h-5 text-accent flex-shrink-0" />
                <div>
                  <span className="font-semibold text-sm text-foreground">Sales Analyst</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    Agentic AI - GPT-4o - Azure SQL
                  </span>
                </div>
              </motion.div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">Next.js</Badge>
                <Badge variant="secondary">FastAPI</Badge>
                <Badge variant="secondary">GPT-4o</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">Azure SQL</Badge>
                <Badge variant="secondary">Convex</Badge>
                <Badge variant="secondary">Plotly</Badge>
              </div>

              <div className="space-y-3">
                <AnimatedBullet
                  progress={pIn}
                  index={0}
                  total={3}
                  reduceMotion={reduceMotion}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>Agentic Analytics Platform:</strong> Architected Sales Analyst to
                    convert natural language business questions into validated SQL queries, removing
                    SQL/Excel dependency for sales users.
                  </p>
                </AnimatedBullet>
                <AnimatedBullet
                  progress={pIn}
                  index={1}
                  total={3}
                  reduceMotion={reduceMotion}
                  className="border-l-2 border-accent pl-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>End-to-End AI Pipeline:</strong> Integrated Schema RAG, GPT-4o, FastAPI,
                    and Azure SQL to retrieve relevant tables, validate generated queries, execute
                    safely, and stream results to the frontend.
                  </p>
                </AnimatedBullet>
                <AnimatedBullet
                  progress={pIn}
                  index={2}
                  total={3}
                  reduceMotion={reduceMotion}
                  className="border-l-2 border-primary pl-4"
                >
                  <p className="text-muted-foreground text-sm">
                    <strong>Self-Service Features:</strong> Shipped interactive pivot tables, Plotly
                    charts, AI-generated insights, and conversation memory through Convex-backed
                    chat sessions.
                  </p>
                </AnimatedBullet>
                <motion.div
                  style={
                    reduceMotion
                      ? undefined
                      : { opacity: ppoOpacity, scale: ppoScale, boxShadow: ppoGlow }
                  }
                >
                  <p className="text-muted-foreground text-sm flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Achievement:</strong> {profile.priorRole.outcome}
                    </span>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Experience;
