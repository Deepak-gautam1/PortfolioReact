import { motion } from "framer-motion";
import { Card } from "@/Components/ui/card";
import { GraduationCap, MapPin, Briefcase, Code2 } from "lucide-react";
import profile from "@/data/profile.json";

const About = () => {
  const tags = [
    { label: "Loyalty Systems", color: "primary" },
    { label: "RAG Pipelines", color: "accent" },
    { label: "Full Stack", color: "primary" },
    { label: "Machine Learning", color: "accent" },
    { label: "Competitive Programming", color: "primary" },
    { label: "System Design", color: "accent" },
  ];

  const cards = [
    {
      icon: GraduationCap,
      iconColor: "text-primary",
      title: "Education",
      content: (
        <div className="space-y-4">
          {profile.education.map((edu, i) => (
            <div key={edu.school} className={i > 0 ? "border-t border-border pt-3" : undefined}>
              <p className="font-semibold text-foreground">{edu.school}</p>
              <p className="text-muted-foreground text-sm">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">
                {edu.detail} · {edu.period}
              </p>
            </div>
          ))}
        </div>
      ),
    },
    {
      icon: Briefcase,
      iconColor: "text-accent",
      title: "Current Role",
      content: (
        <div>
          <p className="font-semibold text-foreground">{profile.currentRole.title}</p>
          <p className="text-muted-foreground text-sm">
            {profile.currentRole.company} — {profile.currentRole.period}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {profile.currentRole.focus} - {profile.currentRole.brands.join(", ")} -{" "}
            {profile.currentRole.region}
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
            <span className="text-xs font-medium text-accent">{profile.currentRole.type}</span>
          </div>
        </div>
      ),
    },
    {
      icon: MapPin,
      iconColor: "text-primary",
      title: "Location",
      content: (
        <div>
          <p className="text-foreground font-medium">{profile.location.city}</p>
          <p className="text-muted-foreground text-sm mt-1">
            Originally from {profile.location.origin}
          </p>
          <p className="text-muted-foreground text-sm mt-2">{profile.location.note}</p>
        </div>
      ),
    },
    {
      icon: Code2,
      iconColor: "text-accent",
      title: "Competitive Programming",
      content: (
        <div className="space-y-1.5">
          {profile.competitiveProgramming.platforms.map((p) => (
            <p key={p.name} className="text-sm">
              <span className="font-semibold text-foreground">
                {p.name} {p.rank}
              </span>{" "}
              <span className="text-muted-foreground">· Rating {p.rating}</span>
            </p>
          ))}
          <p className="text-sm text-muted-foreground mt-1">
            {profile.competitiveProgramming.totalProblems} problems solved
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 px-4" id="about">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Computer Engineering graduate from{" "}
            <span className="text-primary font-medium">NIT Kurukshetra</span>, now building
            production-grade loyalty platforms, agentic analytics, and AI automation as a{" "}
            <span className="text-primary font-medium">Data Engineer</span> at{" "}
            <span className="text-primary font-medium">Americana Restaurants</span>. I work across
            Peet's Coffee Loyalty, Sales Analyst, and Mail Assistant, combining data engineering,
            GenAI, and competitive problem-solving.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-6 bg-background border shadow-sm h-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <card.icon className={`w-5 h-5 ${card.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-3">{card.title}</h3>
                    {card.content}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          {tags.map((tag, i) => (
            <motion.span
              key={tag.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium cursor-default ${
                tag.color === "primary"
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-accent/10 text-accent border border-accent/20"
              }`}
            >
              {tag.label}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
