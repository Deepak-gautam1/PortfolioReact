import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Code, Database, Brain, Trophy } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import CPRatings from "@/Components/CPRatings";

const certifications = [
  { name: "Introduction to C++", link: "/certs/intro-to-cpp.pdf" },
  { name: "DSA in C++", link: "/certs/Data-structure.pdf" },
  { name: "Advanced Machine Learning", link: "/certs/AdvMachineLearning.pdf" },
  { name: "Deep Learning", link: "/certs/DeepLearning.pdf" },
  { name: "TensorFlow", link: "/certs/Tensorflow.pdf" },
];

// ── Animated Counter ──────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = "", duration = 1800 }: { target: number; suffix?: string; duration?: number }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{value.toLocaleString()}{suffix}</span>;
};

// ── Skill Card ────────────────────────────────────────────────
const SkillCard = ({ category, index }: { category: { title: string; icon: React.ElementType; skills: string[] }; index: number }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
    >
      <Card
        className="p-6 bg-background border shadow-lg h-full"
        style={{ transition: "box-shadow 0.3s", boxShadow: hovered ? "0 12px 32px -8px hsl(var(--primary) / 0.2)" : undefined }}
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div animate={{ rotate: hovered ? 15 : 0, scale: hovered ? 1.15 : 1 }} transition={{ duration: 0.25 }}>
            <category.icon className="w-6 h-6 text-primary" />
          </motion.div>
          <h3 className="text-lg font-semibold">{category.title}</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + idx * 0.04, duration: 0.3 }}
            >
              <Badge variant="secondary" className="text-sm">{skill}</Badge>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};

// ── Main ──────────────────────────────────────────────────────
const Skills = () => {
  const skillCategories = [
    { title: "Languages", icon: Code, skills: ["C/C++", "Python", "C#", "JavaScript", "TypeScript", "SQL"] },
    { title: "Developer Tools", icon: Database, skills: ["VS Code", "Git/GitHub", "Azure", "Docker", "Supabase", "Jupyter"] },
    { title: "Frameworks", icon: Brain, skills: ["React", "Next.js", "Node.js", "FastAPI", "LangChain", "TensorFlow"] },
    { title: "Concepts", icon: Trophy, skills: ["RAG Pipelines", "System Design", "REST APIs", "OOP", "Deep Learning", "Prompt Engineering"] },
  ];

  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true });

  return (
    <section className="py-20 px-4 bg-muted/50" id="skills">
      <div className="max-w-6xl mx-auto">

        {/* ── Heading ── */}
        <div className="text-center mb-16" ref={headingRef}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
          >
            Skills & Achievements
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={headingInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            Technical expertise, tools, and competitive programming achievements
          </motion.p>
        </div>

        {/* ── Skill Cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {skillCategories.map((cat, i) => <SkillCard key={i} category={cat} index={i} />)}
        </div>

        {/* ── Packages ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <Card className="p-6 bg-background border shadow-lg">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-accent" />
              Specialized Python Packages
            </h3>
            <p className="text-muted-foreground text-sm">
              Pandas · NumPy · Scikit-learn · Seaborn · TensorFlow · Keras · FAISS · Hugging Face Transformers · Streamlit · LangChain
            </p>
          </Card>
        </motion.div>

        {/* ── CP Ratings ── */}
        <div className="mb-16">
          <CPRatings />
        </div>

        {/* ── Stats row ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { label: "DSA Problems", value: 2500, suffix: "+" },
            { label: "Contest Rank (CodeChef)", value: 31, suffix: "" },
            { label: "Amazon ML — Top", value: 5000, suffix: " selected" },
            { label: "Lighthouse Score", value: 95, suffix: "+" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Card className="p-4 text-center bg-background border shadow-md">
                <div className="text-2xl font-bold text-primary mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ── Certifications ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-0">
            <h3 className="text-xl font-semibold mb-4">Certifications</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert, i) => (
                <Dialog key={cert.name}>
                  <DialogTrigger asChild>
                    <motion.div
                      whileHover={{ scale: 1.08, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors py-1.5 px-3">
                        {cert.name}
                      </Badge>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[90vh] p-2">
                    <iframe src={cert.link} className="w-full h-full rounded-md border" title={`${cert.name} Certificate`} />
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </Card>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
