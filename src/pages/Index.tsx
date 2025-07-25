import Navigation from "@/Components/Navigation";
import Hero from "@/Components/Hero";
import About from "@/Components/About";
import Experience from "@/Components/Experience";
import Projects from "@/Components/Projects";
import Skills from "@/Components/Skills";
import Contact from "@/Components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default Index;
