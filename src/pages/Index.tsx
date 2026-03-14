import { useState } from "react";
import Navigation from "@/Components/Navigation";
import Hero from "@/Components/Hero";
import About from "@/Components/About";
import Experience from "@/Components/Experience";
import Projects from "@/Components/Projects";
import Skills from "@/Components/Skills";
import Contact from "@/Components/Contact";
import Footer from "@/Components/Footer";
import SectionWrapper from "@/Components/SectionWrapper";
import ScrollProgress from "@/Components/ScrollProgress";
import CustomCursor from "@/Components/CustomCursor";
import IntroLoader from "@/Components/IntroLoader";
import SmoothScroll from "@/Components/SmoothScroll";
import TechMarquee from "@/Components/TechMarquee";
import GitHubStats from "@/Components/GitHubStats";

const INTRO_KEY = "dg_intro_seen";
const alreadySeen =
  typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY) === "1";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(alreadySeen);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntroComplete(true);
  };

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        style={{
          position: "fixed", top: "-100px", left: "16px", zIndex: 999999,
          padding: "8px 16px", background: "hsl(var(--primary))",
          color: "hsl(var(--primary-foreground))", borderRadius: "8px",
          fontSize: "14px", fontWeight: 600, textDecoration: "none", transition: "top 0.2s",
        }}
        onFocus={(e) => (e.currentTarget.style.top = "16px")}
        onBlur={(e) => (e.currentTarget.style.top = "-100px")}
      >
        Skip to main content
      </a>

      {/* Intro loader — overlays the page visually but content stays in DOM for Lighthouse */}
      {!alreadySeen && !introComplete && (
        <IntroLoader onComplete={handleIntroComplete} />
      )}

      {/*
        CRITICAL PERF FIX: page content is ALWAYS in the DOM.
        Previously gated behind introComplete which hid everything from Lighthouse
        for 2.4s, destroying LCP. Now the loader is just a visual overlay.
      */}
      <div
        className="min-h-screen"
        style={{
          // Hide visually during intro (but still in DOM for Lighthouse / browser parsing)
          visibility: introComplete ? "visible" : "hidden",
        }}
      >
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />

        <Navigation />

        <main id="main-content">
          <Hero />

          <SectionWrapper>
            <About />
          </SectionWrapper>

          <SectionWrapper>
            <Experience />
          </SectionWrapper>

          <TechMarquee />

          <Projects />
          <Skills />

          <GitHubStats />

          <SectionWrapper>
            <Contact />
          </SectionWrapper>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
