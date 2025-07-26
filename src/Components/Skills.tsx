import { Card } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Code, Database, Brain, Trophy } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";

// Define your certifications with links to the PDFs
const certifications = [
  {
    name: "Introduction to C++",
    link: "/certs/intro-to-cpp.pdf",
  },
  {
    name: "DSA in C++",
    link: "/certs/Data-structure.pdf",
  },
  {
    name: "Advanced Machine Learning",
    link: "/certs/AdvMachineLearning.pdf",
  },
  {
    name: "Deep Learning",
    link: "/certs/DeepLearning.pdf",
  },
  {
    name: "TensorFlow",
    link: "/certs/Tensorflow.pdf",
  },
];

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: [
        "C/C++",
        "Python",
        "Java",
        "JavaScript",
        "HTML/CSS",
        "SQL",
        "TypeScript",
      ],
    },
    {
      title: "Developer Tools",
      icon: Database,
      skills: [
        "Visual Studio Code",
        "Git/GitHub",
        "Google Colab",
        "Jupyter Notebook",
      ],
    },
    {
      title: "Technologies/Frameworks",
      icon: Brain,
      skills: ["React", "Next.js", "Node.js", "MongoDB", "Docker", "FastAPI"],
    },
    {
      title: "Machine Learning",
      icon: Trophy,
      skills: [
        "Advanced Machine Learning Algorithms",
        "Deep Learning",
        "CNN",
        "Sequence Time Series Prediction",
        "Prompt Engineering",
      ],
    },
  ];

  const packages = [
    "Python (Pandas, NumPy, Scikit-learn, Seaborn, TensorFlow, Keras, FAISS, Hugging Face Transformers, Streamlit)",
  ];

  const achievements = [
    {
      title: "Global Ranking in Contest",
      description: "31 on Codechef and 513 on Codeforces in weekly contests",
    },
    {
      title: "Global Rating",
      description:
        "4 Star on CodeChef (1806), Knight at LeetCode (1851), Pupil at Codeforces (1365)",
    },
    {
      title: "2500+ DSA Problems",
      description: "Solved on various competitive programming platforms",
    },
    {
      title: "Amazon ML School 2024",
      description: "Selected among top 5000 applicants for prestigious program",
    },
    {
      title: "Kaggle Data Science Bowl",
      description:
        "Ranked in top 5% with 15% accuracy improvement using deep learning",
    },
    {
      title: "Leadership Experience",
      description:
        "Organized blood donation camp with 350+ donors, led financial assistance initiatives",
    },
  ];

  return (
    <section className="py-20 px-4 bg-muted/60" id="skills">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Skills & Achievements
          </h2>
          <p className="text-lg text-muted-foreground">
            Technical expertise and competitive programming achievements
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="p-6 bg-background border shadow-lg mb-0.5"
            >
              <div className="flex items-center gap-3 mb-4">
                <category.icon className="w-6 h-6 text-primary" />
                <h3 className="text-lg font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap items-center gap-2 divide-x divide-border">
                {category.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <Card className="p-6 bg-background border shadow-lg mb-12">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="w-6 h-6 text-accent" />
            Specialized Packages
          </h3>
          <p className="text-muted-foreground">{packages[0]}</p>
        </Card>
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">
            Achievements & Recognition
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card
                key={index}
                className="p-4 bg-background border shadow-lg mb-0.5 hover:shadow-glow transition-all duration-300"
              >
                <h4 className="font-semibold text-primary mb-2">
                  {achievement.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {achievement.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
        <div className="mt-12 text-center">
          <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border-0">
            <h3 className="text-xl font-semibold mb-2">Certifications</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {certifications.map((cert) => (
                <Dialog key={cert.name}>
                  <DialogTrigger asChild>
                    <Badge
                      variant="outline"
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {cert.name}
                    </Badge>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[80vw] h-[90vh] p-2">
                    <iframe
                      src={cert.link}
                      className="w-full h-full rounded-md border"
                      title={`${cert.name} Certificate`}
                    ></iframe>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Skills;
