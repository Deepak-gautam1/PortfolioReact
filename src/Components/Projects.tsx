// import React from "react";
import { Card } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { ExternalLink, GithubIcon, ShieldCheck, Server } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "Safar Squad - Travel Companion Platform",
      category: "Full Stack (React + Supabase)",
      description:
        "A comprehensive travel platform using React + TypeScript + Supabase, featuring real-time trip discovery with interactive maps, clustering algorithms, and earth-tone responsive design across all devices.",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Supabase",
        "PostgreSQL",
        "Leaflet Maps",
        "Real-time",
        "RLS",
      ],
      features: [
        "Built comprehensive travel platform with interactive map-based trip discovery and real-time participant tracking",
        "Implemented advanced join request approval system with creator notifications and AI-powered trip recommendations",
        "Engineered secure user authentication with RLS policies, photo-rich review system, and smart bookmarking",
      ],
      github: "https://github.com/Deepak-gautam1/BunnyTraveler",
      demo: "https://www.safarsquad.in/",
    },
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
      demo: "https://diet-foodrecommendation.streamlit.app/",
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
      demo: "https://querypdf-12.streamlit.app/",
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
      demo: "https://stockpricepredication.streamlit.app/",
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
      demo: "https://pubg-winner.streamlit.app/",
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
      demo: "https://huggingface.co/spaces/AiLover26/digit-recognizer",
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
      title: "Shopper E-Commerce",
      category: "Full Stack (MERN)",
      description:
        "A fully responsive shopping platform using the MERN stack, delivering seamless user experiences with separate interfaces for customers and administrators.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "Tailwind CSS",
      ],
      features: [
        "Complete customer-facing storefront with product catalog and cart functionality.",
        "Separate, secure admin panel for managing products, orders, and users.",
        "Robust backend API to handle all business logic and database interactions.",
      ],
      github: "https://github.com/Deepak-gautam1/Ecommerce_site",
      demo: "https://ecommerce-site-zndy.onrender.com/",
      adminUrl: "https://ecommerce-site-admin.onrender.com/",
      backendUrl: "https://ecommerce-site-backend-drv9.onrender.com/",
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

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.title}
              className="p-6 bg-background border shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group flex flex-col"
            >
              {/* This part makes sure the card content takes up available space */}
              <div className="flex-grow space-y-4">
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
              </div>

              {/* THIS IS THE UPDATED BUTTON SECTION */}
              <div className="flex flex-wrap gap-2 pt-4 mt-auto">
                <Button asChild variant="outline" size="sm">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="w-4 h-4 mr-2" />
                    Code
                  </a>
                </Button>
                {/* Main Demo Button */}
                {project.demo && project.demo !== "#" && (
                  <Button asChild size="sm">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
                {/* Admin Panel Button (only shows if adminUrl exists) */}
                {project.adminUrl && (
                  <Button asChild variant="secondary" size="sm">
                    <a
                      href={project.adminUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ShieldCheck className="w-4 h-4 mr-2" />
                      Admin
                    </a>
                  </Button>
                )}
                {/* Backend API Button (only shows if backendUrl exists) */}
                {project.backendUrl && (
                  <Button asChild variant="secondary" size="sm">
                    <a
                      href={project.backendUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Server className="w-4 h-4 mr-2" />
                      API
                    </a>
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
