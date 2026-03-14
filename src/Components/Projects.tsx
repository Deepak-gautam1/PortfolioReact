import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { ExternalLink, GithubIcon, ShieldCheck, Server, Star } from "lucide-react";

interface Project {
  title: string;
  category: string;
  tags: string[];
  description: string;
  technologies: string[];
  features: string[];
  github: string;
  demo?: string;
  adminUrl?: string;
  backendUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Peet's Coffee Loyalty Platform",
    category: "Production · Americana Restaurants",
    tags: ["Data Engineering", "Production"],
    description:
      "Production backend for the Peet's Coffee loyalty membership system serving 50,000+ daily active users across Middle East & North Africa — built with C#, Azure Functions, and Zoho Creator.",
    technologies: ["C#", "Azure Functions", "Zoho Creator", "REST APIs", "SQL Server", "Idempotency"],
    features: [
      "Engineered tier upgrade workflows, rule enforcement, and earn–burn engine with idempotent processing and automated expiry — zero downtime at production scale.",
      "Built cross-platform validation pipeline spanning Azure services and mobile apps, reducing duplicate transaction incidents by 99%.",
    ],
    github: "https://github.com/Deepak-gautam1",
    featured: true,
  },
  {
    title: "JobPilot – Automated Job Hunting Pipeline",
    category: "AI Automation · MCP Protocol",
    tags: ["AI / ML", "Full Stack"],
    description:
      "End-to-end automated job hunting pipeline that scrapes 7+ platforms (Indeed, Naukri, LinkedIn, Google Jobs, Lever, Greenhouse, Amazon) nightly — zero manual intervention.",
    technologies: ["Python", "Claude AI", "MCP Protocol", "JobSpy", "Gmail API", "SQLite", "Task Scheduler"],
    features: [
      "Resume-aware skill scoring engine ranks every job against a 30-skill profile using regex word-boundary matching, filtering senior roles via 47-pattern experience regex.",
      "Built two custom MCP servers (Gmail MCP + JobSpy MCP) enabling Claude to accept natural language queries over live Gmail data.",
    ],
    github: "https://github.com/Deepak-gautam1",
    featured: true,
  },
  {
    title: "Safar Squad – Travel Companion Platform",
    category: "Full Stack · React + Supabase",
    tags: ["Full Stack"],
    description:
      "Multi-auth travel platform with real-time trip discovery, map-based clustering, and automated trip lifecycle management — 95+ Lighthouse score.",
    technologies: ["React", "TypeScript", "Supabase", "PostgreSQL", "Tailwind", "Google OAuth", "Leaflet", "RLS"],
    features: [
      "Multi-auth (Google OAuth, OTP phone, email/password) with session persistence, protected route guards, and Row Level Security for multi-tenant isolation.",
      "Automated trip expiry via Supabase Edge Functions cron, auto-deleting expired trips and triggering cleanup across chat, notifications, and participant records.",
    ],
    github: "https://github.com/Deepak-gautam1/BunnyTraveler",
    demo: "https://www.safarsquad.in/",
    featured: true,
  },
  {
    title: "Food Point",
    category: "Machine Learning",
    tags: ["AI / ML"],
    description: "Personalized diet recommendation system achieving 94% accuracy using K-Nearest Neighbors with scikit-learn, NumPy, and Pandas.",
    technologies: ["Python", "scikit-learn", "NumPy", "Pandas", "FastAPI", "Streamlit", "Docker", "KNN"],
    features: [
      "94% accuracy recommendation system built with K-Nearest Neighbors.",
      "FastAPI backend + Streamlit frontend deployed with Docker.",
    ],
    github: "https://github.com/Deepak-gautam1/Food-Point",
    demo: "https://diet-foodrecommendation.streamlit.app/",
  },
  {
    title: "Query PDF",
    category: "AI / NLP",
    tags: ["AI / ML"],
    description: "AI chatbot that extracts and answers questions from PDF documents using Hugging Face models, LangChain, and FAISS vector search.",
    technologies: ["Python", "LangChain", "FAISS", "Hugging Face", "FastAPI", "Streamlit", "Docker"],
    features: [
      "Fine-tuned Hugging Face model with LangChain + FAISS for efficient document retrieval.",
      "Deployed as a Streamlit app with FastAPI backend for low-latency responses.",
    ],
    github: "https://github.com/Deepak-gautam1/QueryPDF",
    demo: "https://querypdf-12.streamlit.app/",
  },
  {
    title: "Stock Price Prediction",
    category: "Machine Learning",
    tags: ["AI / ML"],
    description: "LSTM neural network that forecasts stock prices using historical time-series data with TensorFlow and Keras.",
    technologies: ["Python", "TensorFlow", "Keras", "Pandas", "Matplotlib", "LSTM"],
    features: [
      "LSTM for time-series forecasting with normalized historical data.",
      "Live Streamlit dashboard visualizing predicted vs. actual prices.",
    ],
    github: "https://github.com/Deepak-gautam1/Stock_Price_Predication",
    demo: "https://stockpricepredication.streamlit.app/",
  },
  {
    title: "PUBG Winner Prediction",
    category: "Machine Learning",
    tags: ["AI / ML"],
    description: "Ensemble model predicting PUBG match winners from in-game statistics using XGBoost and feature engineering.",
    technologies: ["Python", "scikit-learn", "XGBoost", "Pandas", "Seaborn"],
    features: [
      "Extensive feature engineering on in-game player statistics.",
      "XGBoost ensemble achieving high predictive accuracy.",
    ],
    github: "https://github.com/Deepak-gautam1/PUBG-Predication",
    demo: "https://pubg-winner.streamlit.app/",
  },
  {
    title: "Handwritten Digit Recognition",
    category: "Deep Learning",
    tags: ["AI / ML"],
    description: "CNN trained on MNIST achieving 99%+ accuracy, deployed as an interactive Hugging Face Space.",
    technologies: ["Python", "TensorFlow", "Keras", "CNN", "MNIST"],
    features: [
      "CNN from scratch on the MNIST benchmark — 99%+ accuracy.",
      "Deployed to Hugging Face Spaces as a live interactive demo.",
    ],
    github: "https://github.com/Deepak-gautam1/Digit_Reconginzer",
    demo: "https://huggingface.co/spaces/AiLover26/digit-recognizer",
  },
  {
    title: "Shopper E-Commerce",
    category: "Full Stack · MERN",
    tags: ["Full Stack"],
    description: "Fully responsive MERN stack shopping platform with separate customer storefront, admin panel, and REST API backend.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    features: [
      "Customer storefront with product catalog, cart, and checkout flow.",
      "Separate secure admin panel for managing products, orders, and users.",
    ],
    github: "https://github.com/Deepak-gautam1/Ecommerce_site",
    demo: "https://ecommerce-site-zndy.onrender.com/",
    adminUrl: "https://ecommerce-site-admin.onrender.com/",
    backendUrl: "https://ecommerce-site-backend-drv9.onrender.com/",
  },
];

const FILTERS = ["All", "AI / ML", "Full Stack", "Data Engineering", "Production"] as const;
type Filter = typeof FILTERS[number];

const TiltCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTilt({
      x: ((y - rect.height / 2) / (rect.height / 2)) * -8,
      y: ((x - rect.width / 2) / (rect.width / 2)) * 8,
    });
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? 1.02 : 1,
      }}
    >
      <Card
        className="p-6 bg-background border shadow-md flex flex-col h-full"
        style={{
          position: "relative", overflow: "hidden", transition: "box-shadow 0.3s",
          boxShadow: isHovered
            ? project.featured
              ? "0 20px 40px -12px hsl(var(--primary) / 0.3), 0 0 0 1px hsl(var(--primary) / 0.15)"
              : "0 16px 32px -8px hsl(var(--primary) / 0.15)"
            : project.featured ? "0 4px 20px -4px hsl(var(--primary) / 0.12)" : undefined,
        }}
      >
        {/* Cursor glow */}
        {isHovered && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
            background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, hsl(var(--primary) / 0.1) 0%, transparent 60%)`,
          }} />
        )}

        {/* Featured ribbon */}
        {project.featured && (
          <div style={{
            position: "absolute", top: 14, right: -24, transform: "rotate(45deg)",
            background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))",
            fontSize: "10px", fontWeight: 600, padding: "2px 28px", zIndex: 2, letterSpacing: "0.05em",
          }}>
            FEATURED
          </div>
        )}

        <div className="flex-grow space-y-4" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant="outline">{project.category}</Badge>
              {project.featured && <Star className="w-3.5 h-3.5 text-primary fill-primary" />}
            </div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm">Key Highlights</h4>
            <ul className="space-y-1.5">
              {project.features.map((f, i) => (
                <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1">
            {project.technologies.slice(0, 5).map((tech, i) => (
              <Badge key={i} variant="secondary" className="text-xs">{tech}</Badge>
            ))}
            {project.technologies.length > 5 && (
              <Badge variant="secondary" className="text-xs">+{project.technologies.length - 5}</Badge>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 mt-auto" style={{ position: "relative", zIndex: 1 }}>
          <Button asChild variant="outline" size="sm">
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <GithubIcon className="w-4 h-4 mr-1.5" />Code
            </a>
          </Button>
          {project.demo && (
            <Button asChild size="sm">
              <a href={project.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-1.5" />Demo
              </a>
            </Button>
          )}
          {project.adminUrl && (
            <Button asChild variant="secondary" size="sm">
              <a href={project.adminUrl} target="_blank" rel="noopener noreferrer">
                <ShieldCheck className="w-4 h-4 mr-1.5" />Admin
              </a>
            </Button>
          )}
          {project.backendUrl && (
            <Button asChild variant="secondary" size="sm">
              <a href={project.backendUrl} target="_blank" rel="noopener noreferrer">
                <Server className="w-4 h-4 mr-1.5" />API
              </a>
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  const filtered = activeFilter === "All"
    ? projects
    : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10" ref={headingRef}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Production systems, AI pipelines, and full-stack applications
          </motion.p>
        </div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {FILTERS.map((filter) => {
            const count = filter === "All" ? projects.length : projects.filter(p => p.tags.includes(filter)).length;
            const isActive = activeFilter === filter;
            return (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  position: "relative",
                  padding: "7px 18px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: isActive ? 600 : 500,
                  border: isActive ? "none" : "1px solid hsl(var(--border))",
                  background: isActive ? "hsl(var(--primary))" : "hsl(var(--background))",
                  color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  boxShadow: isActive ? "0 4px 14px hsl(var(--primary) / 0.35)" : undefined,
                }}
              >
                {filter}
                <span style={{
                  fontSize: "11px",
                  padding: "1px 6px",
                  borderRadius: "999px",
                  background: isActive ? "hsl(var(--primary-foreground) / 0.2)" : "hsl(var(--muted))",
                  color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))",
                  fontWeight: 600,
                }}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Cards grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          style={{ perspective: "1200px" }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <TiltCard key={project.title} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-muted-foreground">
            No projects in this category yet.
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
