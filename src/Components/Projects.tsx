// import React from "react";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { ExternalLink, GithubIcon } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Food Point",
      category: "Machine Learning",
      description:
        "A personalized diet recommendation system achieving 94% accuracy using K-Nearest Neighbors (KNN) algorithm with scikit-learn, NumPy, and Pandas.",
      technologies: [
        "Python",
        "scikit-learn",
        "NumPy",
        "Pandas",
        "FastAPI",
        "Streamlit",
        "Docker",
        "KNN",
      ],
      features: [
        "Developed personalized diet recommendation system with 94% accuracy",
        "Built streamlined API backend using FastAPI",
        "Created user-friendly frontend with Streamlit",
      ],
      github: "https://github.com/Deepak-gautam1/Food-Point",
      demo: "#",
    },
    {
      title: "Query PDF",
      category: "AI/NLP",
      description:
        "An AI chatbot that extracts and interprets information from PDF documents using advanced NLP techniques and Hugging Face models.",
      technologies: [
        "Python",
        "NumPy",
        "Pandas",
        "FastAPI",
        "Streamlit",
        "Docker",
        "FAISS",
        "TF",
      ],
      features: [
        "Developed AI chatbot to answer questions by extracting information from PDFs",
        "Fine-tuned Hugging Face model with Langchain and FAISS for efficient retrieval",
      ],
      github: "https://github.com/Deepak-gautam1/QueryPDF",
      demo: "#",
    },
    {
      title: "Stock Price Prediction",
      category: "Machine Learning",
      description:
        "A model that forecasts future stock prices using historical data and time-series analysis with an LSTM neural network.",
      technologies: [
        "Python",
        "TensorFlow",
        "Keras",
        "Pandas",
        "Matplotlib",
        "LSTM",
      ],
      features: [
        "Utilized LSTM for time-series forecasting",
        "Preprocessed and normalized historical stock data",
        "Visualized predicted vs. actual prices",
      ],
      github: "https://github.com/Deepak-gautam1/Stock_Price_Predication",
      demo: "#",
    },
    {
      title: "PUBG Winner Prediction",
      category: "Machine Learning",
      description:
        "Analyzed in-game statistics to predict the probability of a player winning a PUBG match, using ensemble learning methods.",
      technologies: ["Python", "scikit-learn", "XGBoost", "Pandas", "Seaborn"],
      features: [
        "Performed extensive feature engineering on player data",
        "Trained an XGBoost model for high predictive accuracy",
      ],
      github: "https://github.com/Deepak-gautam1/PUBG-Predication",
      demo: "#",
    },
    {
      title: "Handwritten Digit Recognition",
      category: "Deep Learning",
      description:
        "A Convolutional Neural Network (CNN) trained on the MNIST dataset to recognize handwritten digits with over 99% accuracy.",
      technologies: ["Python", "TensorFlow", "Keras", "CNN", "MNIST"],
      features: [
        "Built and trained a CNN from scratch",
        "Achieved high accuracy on the benchmark MNIST dataset",
      ],
      github: "https://github.com/Deepak-gautam1/Digit_Reconginzer",
      demo: "#",
    },
    {
      title: "Real-time Face Recognition",
      category: "Computer Vision",
      description:
        "A system that detects and identifies faces in real-time from a video stream using OpenCV and deep learning face embeddings.",
      technologies: [
        "Python",
        "OpenCV",
        "dlib",
        "face_recognition",
        "Deep Learning",
      ],
      features: [
        "Implemented real-time face detection from a webcam feed",
        "Matched detected faces against a database of known individuals",
      ],
      github: "https://github.com/Deepak-gautam1/FaceRecongnition",
      demo: "#",
    },
    {
      title: "JS Portfolio",
      category: "Frontend",
      description:
        "A clean and responsive personal portfolio website built from scratch using fundamental web technologies.",
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      features: [
        "Built entirely with vanilla HTML, CSS, and JavaScript",
        "Fully responsive design for mobile and desktop",
      ],
      github: "https://github.com/Deepak-gautam1/Portfolio",
      demo: "https://deepak-gautam1.github.io/Portfolio/",
    },
    {
      title: "Shopper-ECommerce",
      category: "Full Stack",
      description:
        "A fully responsive shopping platform using the MERN stack, delivering seamless user experiences across desktop and mobile devices.",
      technologies: ["HTML5+CSS3", "JavaScript", "React", "Node.js", "MongoDB"],
      features: [
        "Developed fully responsive shopping platform using MERN stack",
        "Built product catalog management and shopping cart functionality",
      ],
      github: "https://github.com/Deepak-gautam1/Ecommerce_site",
      demo: "#",
    },
  ];

  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground">
            A showcase of my technical expertise and problem-solving
            capabilities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="p-6 bg-background border shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div>
                  <Badge variant="outline" className="mb-3">
                    {project.category}
                  </Badge>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {project.features.slice(0, 2).map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-muted-foreground flex items-start gap-2"
                      >
                        <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.technologies.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                  <Button asChild size="sm" className="flex-1">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
