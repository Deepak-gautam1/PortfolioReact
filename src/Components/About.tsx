import { motion } from "framer-motion";
import { Card } from "@/Components/ui/card";
import { GraduationCap, MapPin, Briefcase, Code2 } from "lucide-react";

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
          <div>
            <p className="font-semibold text-foreground">NIT Kurukshetra</p>
            <p className="text-muted-foreground text-sm">B.Tech — Computer Engineering</p>
            <p className="text-sm text-muted-foreground">CGPA: 8.14 / 10 · Graduated May 2025</p>
          </div>
          <div className="border-t border-border pt-3">
            <p className="font-semibold text-foreground">School of Excellence, Dwarka</p>
            <p className="text-muted-foreground text-sm">CBSE Class XII</p>
            <p className="text-sm text-muted-foreground">95.2% · 2019–2020</p>
          </div>
        </div>
      ),
    },
    {
      icon: Briefcase,
      iconColor: "text-accent",
      title: "Current Role",
      content: (
        <div>
          <p className="font-semibold text-foreground">Data Engineer</p>
          <p className="text-muted-foreground text-sm">Americana Restaurants — July 2025–Present</p>
          <p className="text-sm text-muted-foreground mt-2">
            Loyalty & Digital Systems · KFC · Pizza Hut · Hardee's · Krispy Kreme — MENA region
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse inline-block" />
            <span className="text-xs font-medium text-accent">Full-time</span>
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
          <p className="text-foreground font-medium">Mohali, Punjab</p>
          <p className="text-muted-foreground text-sm mt-1">Originally from West Delhi, New Delhi</p>
          <p className="text-muted-foreground text-sm mt-2">Open to remote & hybrid opportunities</p>
        </div>
      ),
    },
    {
      icon: Code2,
      iconColor: "text-accent",
      title: "Competitive Programming",
      content: (
        <div className="space-y-1.5">
          <p className="text-sm"><span className="font-semibold text-foreground">LeetCode Knight</span> <span className="text-muted-foreground">· Rating 1851</span></p>
          <p className="text-sm"><span className="font-semibold text-foreground">CodeChef 4★</span> <span className="text-muted-foreground">· Rating 1806</span></p>
          <p className="text-sm"><span className="font-semibold text-foreground">Codeforces Specialist</span> <span className="text-muted-foreground">· Rating 1365</span></p>
          <p className="text-sm text-muted-foreground mt-1">2,500+ problems solved</p>
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
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Computer Engineering graduate from <span className="text-primary font-medium">NIT Kurukshetra</span>,
            now building production-grade loyalty systems and AI pipelines as a{" "}
            <span className="text-primary font-medium">Data Engineer</span> at{" "}
            <span className="text-primary font-medium">Americana Restaurants</span>.
            I thrive at the intersection of data engineering, AI, and competitive problem-solving.
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
