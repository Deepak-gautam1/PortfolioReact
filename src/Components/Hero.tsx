import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Download, GithubIcon, LinkedinIcon, Mail, Phone } from "lucide-react";
import ParticleBackground from "@/Components/ParticleBackground";
import MagneticButton from "@/Components/MagneticButton";
import { getPhoneHref } from "@/lib/contact";
import profile from "@/data/profile.json";

const TITLES = profile.roleTitles;
const STATS = profile.heroStats;

const TypewriterText = () => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = TITLES[titleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 30);
    } else {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, titleIndex]);

  return (
    <h2 className="inline-flex items-center gap-2 min-h-[2.75rem] px-4 py-2 rounded-lg border border-border bg-card/80 font-mono text-lg lg:text-xl text-foreground">
      <span className="text-primary" aria-hidden="true">
        {">"}
      </span>
      {displayed}
      <span className="animate-pulse text-primary" aria-hidden="true">
        _
      </span>
    </h2>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

const Hero = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "hsl(var(--background))",
      }}
    >
      {/* Static radial blobs — no filter:blur, no animation = zero perf cost */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)",
          top: "-15%",
          left: "-15%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)",
          bottom: "-10%",
          right: "-10%",
          pointerEvents: "none",
        }}
      />

      <ParticleBackground />

      <div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.h1
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl lg:text-7xl font-bold bg-gradient-hero-title bg-clip-text text-transparent"
            >
              DEEPAK GAUTAM
            </motion.h1>
            <motion.div
              custom={0.6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="h-1 w-24 lg:w-32 rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
                boxShadow: "0 0 20px hsl(var(--primary) / 0.55)",
              }}
            />
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <TypewriterText />
            </motion.div>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              Building{" "}
              <span className="font-semibold text-foreground">production-grade AI systems</span>,
              <span className="font-semibold text-foreground"> scalable loyalty platforms</span>,
              and <span className="font-semibold text-foreground">RAG-powered analytics </span>
              serving <span className="text-primary font-medium">50,000+ daily active users</span>{" "}
              across the Middle East & North Africa.
              <br />
              <br />
              B.Tech in Computer Engineering from{" "}
              <span className="text-primary font-medium">NIT Kurukshetra</span>. Currently working
              at <span className="text-primary font-medium">Americana Restaurants</span>, where I
              build enterprise solutions including{" "}
              <span className="text-accent font-medium">Peet's Coffee Loyalty</span>,{" "}
              <span className="text-accent font-medium">Sales Analyst</span>, and{" "}
              <span className="text-accent font-medium">Mail Assistant</span> using Generative AI,
              Azure, and modern cloud technologies.
            </motion.p>
          </div>

          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <MagneticButton>
              <Button asChild size="lg" className="group">
                <a href={profile.resumeUrl} download="Deepak-Resume.pdf">
                  <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Download Resume
                </a>
              </Button>
            </MagneticButton>
            <MagneticButton>
              <Button asChild variant="outline" size="lg" className="group">
                <a href="#contact">
                  <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Contact Me
                </a>
              </Button>
            </MagneticButton>
          </motion.div>

          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-primary/5 border border-primary/10 rounded-lg px-3 py-2 text-center"
              >
                <div className="text-lg font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex gap-5"
          >
            {[
              {
                href: `mailto:${profile.contact.email}`,
                icon: <Mail className="w-5 h-5" />,
                label: "Email",
              },
              {
                href: getPhoneHref(),
                icon: <Phone className="w-5 h-5" />,
                label: "Phone",
              },
              {
                href: profile.contact.linkedin,
                icon: <LinkedinIcon className="w-5 h-5" />,
                label: "LinkedIn",
              },
              {
                href: profile.contact.github,
                icon: <GithubIcon className="w-5 h-5" />,
                label: "GitHub",
              },
            ].map(({ href, icon, label }) => (
              <MagneticButton key={label} strength={0.5}>
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="text-muted-foreground hover:text-primary transition-colors block p-1"
                >
                  {icon}
                </a>
              </MagneticButton>
            ))}
          </motion.div>
        </div>

        {/* Avatar */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          {/* Sized wrapper so the rotating ring and accent blobs anchor to the
              avatar rather than stretching across the whole grid column. */}
          <div className="relative w-80 h-80">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                inset: "-8px",
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, hsl(var(--primary) / 0.55), hsl(var(--accent) / 0.55), transparent, hsl(var(--primary) / 0.55))",
                zIndex: 0,
              }}
            />
            <div
              className="w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border border-border/60"
              style={{ position: "relative", zIndex: 1 }}
            >
              <div className="w-72 h-72 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                <img
                  src="/images/ProfilePic.png"
                  alt="Deepak Gautam — Data Engineer"
                  fetchPriority="high"
                  decoding="async"
                  width="288"
                  height="288"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
            </div>
            <div
              className="absolute -top-4 -right-4 w-20 h-20 bg-accent/15 rounded-full"
              style={{ zIndex: 0 }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/15 rounded-full"
              style={{ zIndex: 0 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
