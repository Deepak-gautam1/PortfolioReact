import * as React from "react";

// Framer Motion's own useReducedMotion() reads the media query once via
// useState(prefersReducedMotion.current) and never re-renders when the OS
// setting changes mid-session (a known, acknowledged limitation in its
// source). Mirrors the useIsMobile() pattern in use-mobile.tsx so toggling
// the OS setting while the page is open is actually reflected live.
export function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(mql.matches);
    mql.addEventListener("change", onChange);
    setPrefersReducedMotion(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return prefersReducedMotion;
}
