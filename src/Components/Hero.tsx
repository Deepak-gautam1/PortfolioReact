import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Download, GithubIcon, LinkedinIcon, Mail, Phone } from "lucide-react";
import ParticleBackground from "@/Components/ParticleBackground";
import MagneticButton from "@/Components/MagneticButton";

const TITLES = [
  "Data Engineer @ Americana",
  "Loyalty & Digital Systems Builder",
  "RAG & AI Pipeline Architect",
  "Full Stack Developer",
  "Competitive Programmer",
];

const STATS = [
  { value: "50K+", label: "Daily Active Users" },
  { value: "99%", label: "Duplicate Reduction" },
  { value: "80%", label: "Reporting Saved" },
  { value: "2500+", label: "DSA Problems" },
];

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
    <h2 className="text-2xl lg:text-3xl font-semibold text-foreground min-h-[2.5rem]">
      {displayed}<span className="animate-pulse text-primary">|</span>
    </h2>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

// No filter:blur — replaced with radial-gradient background shapes
// blur(60px) is the single most expensive CSS property on mobile Lighthouse
const BlobCSS = ({ style }: { style: React.CSSProperties }) => (
  <div
    style={{
      position: "absolute",
      borderRadius: "50%",
      pointerEvents: "none",
      willChange: "auto", // don't promote to GPU layer unnecessarily
      ...style,
    }}
  />
);

const Hero = () => {
  return (
    <section
      className="min-h-screen flex items-center justify-center px-4"
      style={{ position: "relative", overflow: "hidden", background: "hsl(var(--background))" }}
    >
      {/* Static blobs — no animation, no blur. Performance-safe. */}
      <BlobCSS style={{ width: 600, height: 600, background: "radial-gradient(circle, hsl(var(--primary) / 0.15) 0%, transparent 70%)", top: "-15%", left: "-15%" }} />
      <BlobCSS style={{ width: 500, height: 500, background: "radial-gradient(circle, hsl(var(--accent) / 0.12) 0%, transparent 70%)", bottom: "-10%", right: "-10%" }} />
      <BlobCSS style={{ width: 350, height: 350, background: "radial-gradient(circle, hsl(var(--primary) / 0.08) 0%, transparent 70%)", top: "35%", left: "25%" }} />

      <ParticleBackground />

      <div
        className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="space-y-8">
          <div className="space-y-4">
            <motion.h1
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="text-5xl lg:text-7xl font-bold bg-gradient-hero-title bg-clip-text text-transparent"
            >
              DEEPAK GAUTAM
            </motion.h1>

            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
              <TypewriterText />
            </motion.div>

            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-lg text-muted-foreground max-w-lg leading-relaxed"
            >
              B.Tech from{" "}
              <span className="text-primary font-medium">NIT Kurukshetra</span>.
              Currently at{" "}
              <span className="text-primary font-medium">Americana Restaurants</span>{" "}
              engineering production services for the{" "}
              <span className="text-accent font-medium">Peet's Coffee Loyalty Platform</span>
              — serving{" "}
              <span className="font-semibold text-foreground">50,000+ daily active users</span>.
              I build RAG pipelines, loyalty systems, and AI-powered tools that ship at scale.
            </motion.p>
          </div>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-wrap gap-4">
            <MagneticButton>
              <Button asChild size="lg" className="group">
                <a href="/Deepak_Resume.pdf" download="Deepak-Resume.pdf">
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

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {STATS.map((stat) => (
              <div key={stat.label} className="bg-primary/5 border border-primary/10 rounded-lg px-3 py-2 text-center">
                <div className="text-lg font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground leading-tight">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" className="flex gap-5">
            {[
              { href: "mailto:deepakgautam2647@gmail.com", icon: <Mail className="w-5 h-5" />, label: "Email" },
              { href: "tel:9599171623", icon: <Phone className="w-5 h-5" />, label: "Phone" },
              { href: "https://www.linkedin.com/in/deepak-a77b93222/", icon: <LinkedinIcon className="w-5 h-5" />, label: "LinkedIn" },
              { href: "https://github.com/Deepak-gautam1", icon: <GithubIcon className="w-5 h-5" />, label: "GitHub" },
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

        {/* Avatar — remove blur from glow ring too */}
        <motion.div
          className="relative flex justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          {/* Rotating glow ring — no blur, use opacity instead */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{
              position: "absolute", inset: "-8px", borderRadius: "50%",
              background: "conic-gradient(from 0deg, hsl(var(--primary) / 0.45), hsl(var(--accent) / 0.45), transparent, hsl(var(--primary) / 0.45))",
              zIndex: 0,
            }}
          />
          <div
            className="w-80 h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center border border-white/20"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-primary to-accent p-1">
              <img
                src="/images/profile.jpg"
                alt="Deepak Gautam — Data Engineer"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full rounded-full object-cover object-top"
              />
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-accent/15 rounded-full" style={{ zIndex: 0 }} />
          <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-primary/15 rounded-full" style={{ zIndex: 0 }} />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
