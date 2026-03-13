import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Menu, X, ArrowUp } from "lucide-react";
import { ThemeToggle } from "@/Components/ThemeToggle";

const navItems = [
  { name: "Home", href: "#", id: "" },
  { name: "About", href: "#about", id: "about" },
  { name: "Experience", href: "#experience", id: "experience" },
  { name: "Projects", href: "#projects", id: "projects" },
  { name: "Skills", href: "#skills", id: "skills" },
  { name: "Contact", href: "#contact", id: "contact" },
];

const useActiveSection = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sectionIds = navItems.map((i) => i.id).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(callback, {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      });
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
};

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNavItemActive = (item: typeof navItems[0]) => {
    if (item.id === "" && activeSection === "") return true;
    return item.id === activeSection;
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isScrolled ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent cursor-pointer"
              onClick={() => window.scrollTo({ top: 0 })}
            >
              DG
            </motion.div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const active = isNavItemActive(item);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    style={{ position: "relative", padding: "6px 12px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, transition: "color 0.2s", color: active ? "hsl(var(--primary))" : undefined }}
                    className={active ? "" : "text-foreground hover:text-primary"}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        style={{
                          position: "absolute",
                          bottom: -1,
                          left: "12px",
                          right: "12px",
                          height: "2px",
                          borderRadius: "2px",
                          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
              <div style={{ marginLeft: "8px" }}>
                <ThemeToggle />
              </div>
              <Button asChild size="sm" style={{ marginLeft: "4px" }}>
                <a href="#contact">Hire Me</a>
              </Button>
            </div>

            {/* Mobile toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border"
              >
                <div className="px-4 py-6 space-y-1">
                  {navItems.map((item) => {
                    const active = isNavItemActive(item);
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        style={{
                          display: "block",
                          padding: "10px 12px",
                          borderRadius: "8px",
                          fontWeight: 500,
                          fontSize: "16px",
                          color: active ? "hsl(var(--primary))" : undefined,
                          background: active ? "hsl(var(--primary) / 0.08)" : undefined,
                          transition: "all 0.2s",
                        }}
                        className={active ? "" : "text-foreground hover:text-primary"}
                      >
                        {item.name}
                      </a>
                    );
                  })}
                  <div className="border-b border-border pt-3" />
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-muted-foreground text-sm">Switch Theme</span>
                    <ThemeToggle />
                  </div>
                  <Button asChild className="w-full mt-4">
                    <a href="#contact" onClick={() => setIsOpen(false)}>Hire Me</a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0 })}
            style={{
              position: "fixed",
              bottom: "28px",
              right: "28px",
              zIndex: 9998,
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "hsl(var(--primary))",
              color: "hsl(var(--primary-foreground))",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px hsl(var(--primary) / 0.4)",
            }}
            whileHover={{ scale: 1.1, boxShadow: "0 6px 24px hsl(var(--primary) / 0.55)" }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
          >
            <ArrowUp style={{ width: "18px", height: "18px" }} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
