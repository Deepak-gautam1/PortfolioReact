import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { ExternalLink, GithubIcon, ShieldCheck, Server, Star } from "lucide-react";
import FilterPill from "@/Components/FilterPill";
import profile from "@/data/profile.json";

interface Project {
  title: string;
  category: string;
  tags: string[];
  description: string;
  technologies: string[];
  features: string[];
  github?: string;
  demo?: string;
  adminUrl?: string;
  backendUrl?: string;
  featured?: boolean;
}

const projects: Project[] = profile.projects;

const FILTERS = ["All", "Company Projects", "AI / ML", "Full Stack", "Data Engineering"] as const;
type Filter = (typeof FILTERS)[number];

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

  const header = (
    <div>
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <Badge variant="outline">{project.category}</Badge>
        {project.featured && <Star className="w-3.5 h-3.5 text-primary fill-primary" />}
      </div>
      <h3 className={project.featured ? "text-2xl font-bold mb-2" : "text-xl font-bold mb-2"}>
        {project.title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{project.description}</p>
    </div>
  );

  const highlights = (
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
  );

  const techBadges = (
    <div className="flex flex-wrap gap-1">
      {(project.featured ? project.technologies : project.technologies.slice(0, 5)).map(
        (tech, i) => (
          <Badge key={i} variant="secondary" className="text-xs">
            {tech}
          </Badge>
        ),
      )}
      {!project.featured && project.technologies.length > 5 && (
        <Badge variant="secondary" className="text-xs">
          +{project.technologies.length - 5}
        </Badge>
      )}
    </div>
  );

  const actionButtons = (
    <div className="flex flex-wrap gap-2 pt-4" style={{ position: "relative", zIndex: 1 }}>
      {project.github && (
        <Button asChild variant="outline" size="sm">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <GithubIcon className="w-4 h-4 mr-1.5" />
            Code
          </a>
        </Button>
      )}
      {project.demo && (
        <Button asChild size="sm">
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4 mr-1.5" />
            Demo
          </a>
        </Button>
      )}
      {project.adminUrl && (
        <Button asChild variant="secondary" size="sm">
          <a href={project.adminUrl} target="_blank" rel="noopener noreferrer">
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            Admin
          </a>
        </Button>
      )}
      {project.backendUrl && (
        <Button asChild variant="secondary" size="sm">
          <a href={project.backendUrl} target="_blank" rel="noopener noreferrer">
            <Server className="w-4 h-4 mr-1.5" />
            API
          </a>
        </Button>
      )}
    </div>
  );

  return (
    <motion.div
      ref={cardRef}
      layout
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setIsHovered(false);
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.07 }}
      className={project.featured ? "md:col-span-2" : undefined}
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
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow 0.3s",
          boxShadow: isHovered
            ? project.featured
              ? "0 20px 40px -12px hsl(var(--primary) / 0.3), 0 0 0 1px hsl(var(--primary) / 0.15)"
              : "0 16px 32px -8px hsl(var(--primary) / 0.15)"
            : project.featured
              ? "0 4px 20px -4px hsl(var(--primary) / 0.12)"
              : undefined,
        }}
      >
        {/* Cursor glow */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              zIndex: 0,
              background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, hsl(var(--primary) / 0.1) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Featured ribbon */}
        {project.featured && (
          <div
            style={{
              position: "absolute",
              top: 14,
              right: -24,
              transform: "rotate(45deg)",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              fontSize: "10px",
              fontWeight: 600,
              padding: "2px 28px",
              zIndex: 2,
              letterSpacing: "0.05em",
            }}
          >
            FEATURED
          </div>
        )}

        {project.featured ? (
          <div
            className="flex-grow lg:grid lg:grid-cols-5 lg:gap-8"
            style={{ position: "relative", zIndex: 1 }}
          >
            <div className="lg:col-span-3 space-y-4">
              {header}
              {highlights}
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4 mt-4 lg:mt-0">
              {techBadges}
              {actionButtons}
            </div>
          </div>
        ) : (
          <>
            <div className="flex-grow space-y-4" style={{ position: "relative", zIndex: 1 }}>
              {header}
              {highlights}
              {techBadges}
            </div>
            {actionButtons}
          </>
        )}
      </Card>
    </motion.div>
  );
};

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  const filtered =
    activeFilter === "All" ? projects : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10" ref={headingRef}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"
          >
            Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Company projects, AI pipelines, and full-stack applications
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
            const count =
              filter === "All"
                ? projects.length
                : projects.filter((p) => p.tags.includes(filter)).length;
            const isActive = activeFilter === filter;
            return (
              <FilterPill key={filter} active={isActive} onClick={() => setActiveFilter(filter)}>
                {filter}
                <span
                  className={`rounded-full px-1.5 py-px text-[11px] font-semibold ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </FilterPill>
            );
          })}
        </motion.div>

        {/* Cards grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 grid-flow-row-dense items-start"
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-muted-foreground"
          >
            No projects in this category yet.
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
