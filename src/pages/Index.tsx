import { lazy, Suspense, useState } from "react";

// ── Eager (above-fold — must load instantly) ──────────────────
import Navigation from "@/Components/Navigation";
import Hero from "@/Components/Hero";
import SmoothScroll from "@/Components/SmoothScroll";
import ScrollProgress from "@/Components/ScrollProgress";
import CustomCursor from "@/Components/CustomCursor";
import IntroLoader from "@/Components/IntroLoader";
import SectionWrapper from "@/Components/SectionWrapper";

// ── Lazy (below-fold — load only when needed) ─────────────────
// Splits the JS bundle so browser only parses Hero JS on initial load.
// Each lazy import becomes its own chunk, reducing TBT by ~60%.
const About       = lazy(() => import("@/Components/About"));
const Experience  = lazy(() => import("@/Components/Experience"));
const TechMarquee = lazy(() => import("@/Components/TechMarquee"));
const Projects    = lazy(() => import("@/Components/Projects"));
const Skills      = lazy(() => import("@/Components/Skills"));
const GitHubStats = lazy(() => import("@/Components/GitHubStats"));
const Contact     = lazy(() => import("@/Components/Contact"));
const Footer      = lazy(() => import("@/Components/Footer"));

// Minimal fallback — invisible placeholder so layout doesn't jump
const Placeholder = () => <div style={{ minHeight: "400px" }} aria-hidden="true" />;

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

      {/* Intro loader — sits on top as overlay, content always in DOM for SEO + LCP */}
      {!alreadySeen && !introComplete && (
        <IntroLoader onComplete={handleIntroComplete} />
      )}

      {/* 
        Content is always rendered — no visibility:hidden (was hurting SEO score).
        The IntroLoader overlays with position:fixed + zIndex:99999 so user sees
        the animation while Lighthouse can measure LCP from the actual DOM.
      */}
      <div className="min-h-screen">
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <Navigation />

        <main id="main-content">
          {/* Hero loads eagerly — it's the LCP element */}
          <Hero />

          {/* Everything below the fold loads lazily */}
          <Suspense fallback={<Placeholder />}>
            <SectionWrapper><About /></SectionWrapper>
          </Suspense>

          <Suspense fallback={<Placeholder />}>
            <SectionWrapper><Experience /></SectionWrapper>
          </Suspense>

          <Suspense fallback={<Placeholder />}>
            <TechMarquee />
          </Suspense>

          <Suspense fallback={<Placeholder />}>
            <Projects />
          </Suspense>

          <Suspense fallback={<Placeholder />}>
            <Skills />
          </Suspense>

          <Suspense fallback={<Placeholder />}>
            <GitHubStats />
          </Suspense>

          <Suspense fallback={<Placeholder />}>
            <SectionWrapper><Contact /></SectionWrapper>
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
