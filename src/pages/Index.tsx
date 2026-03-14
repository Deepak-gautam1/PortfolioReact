import { lazy, Suspense, useState } from "react";
import Navigation from "@/Components/Navigation";
import Hero from "@/Components/Hero";
import SectionWrapper from "@/Components/SectionWrapper";
import ScrollProgress from "@/Components/ScrollProgress";
import CustomCursor from "@/Components/CustomCursor";
import IntroLoader from "@/Components/IntroLoader";
import SmoothScroll from "@/Components/SmoothScroll";

// Lazy load everything below the fold — reduces initial bundle parse time
const About       = lazy(() => import("@/Components/About"));
const Experience  = lazy(() => import("@/Components/Experience"));
const TechMarquee = lazy(() => import("@/Components/TechMarquee"));
const Projects    = lazy(() => import("@/Components/Projects"));
const Skills      = lazy(() => import("@/Components/Skills"));
const GitHubStats = lazy(() => import("@/Components/GitHubStats"));
const Contact     = lazy(() => import("@/Components/Contact"));
const Footer      = lazy(() => import("@/Components/Footer"));

// Tiny placeholder while lazy chunks load
const Blank = () => <div style={{ minHeight: "200px" }} />;

const INTRO_KEY = "dg_intro_seen";
const alreadySeen = typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY) === "1";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(alreadySeen);

  const handleIntroComplete = () => {
    sessionStorage.setItem(INTRO_KEY, "1");
    setIntroComplete(true);
  };

  return (
    <>
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

      {!alreadySeen && !introComplete && (
        <IntroLoader onComplete={handleIntroComplete} />
      )}

      {introComplete && (
        <div className="min-h-screen">
          <SmoothScroll />
          <ScrollProgress />
          <CustomCursor />
          <Navigation />

          <main id="main-content">
            {/* Hero is above the fold — not lazy */}
            <Hero />

            {/* Everything below fold — lazy loaded */}
            <Suspense fallback={<Blank />}>
              <SectionWrapper><About /></SectionWrapper>
            </Suspense>

            <Suspense fallback={<Blank />}>
              <SectionWrapper><Experience /></SectionWrapper>
            </Suspense>

            <Suspense fallback={<Blank />}>
              <TechMarquee />
            </Suspense>

            <Suspense fallback={<Blank />}>
              <Projects />
            </Suspense>

            <Suspense fallback={<Blank />}>
              <Skills />
            </Suspense>

            <Suspense fallback={<Blank />}>
              <GitHubStats />
            </Suspense>

            <Suspense fallback={<Blank />}>
              <SectionWrapper><Contact /></SectionWrapper>
            </Suspense>
          </main>

          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      )}
    </>
  );
};

export default Index;
