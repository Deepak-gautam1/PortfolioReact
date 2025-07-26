// import React from "react";
import Navigation from "@/Components/Navigation";
import Hero from "@/Components/Hero";
import About from "@/Components/About";
import Experience from "@/Components/Experience";
import Projects from "@/Components/Projects";
import Skills from "@/Components/Skills";
import Contact from "@/Components/Contact";
import Footer from "@/Components/Footer";
import SectionWrapper from "@/Components/SectionWrapper"; // 👈 1. Import the new component

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />

      <SectionWrapper>
        <About />
      </SectionWrapper>

      <SectionWrapper>
        <Experience />
      </SectionWrapper>

      <SectionWrapper>
        <Projects />
      </SectionWrapper>

      <SectionWrapper>
        <Skills />
      </SectionWrapper>

      <SectionWrapper>
        <Contact />
      </SectionWrapper>

      <Footer />
    </div>
  );
};

export default Index;
