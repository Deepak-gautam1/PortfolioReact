import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IntroLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"letters" | "merge" | "expand" | "done">("letters");
  // Store onComplete in a ref so it never triggers the effect to re-run
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("merge"), 900);
    const t2 = setTimeout(() => setPhase("expand"), 1600);
    const t3 = setTimeout(() => {
      setPhase("done");
      onCompleteRef.current();
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []); // empty deps — runs once, StrictMode-safe

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            background: "hsl(var(--background))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: phase === "merge" || phase === "expand" ? "0px" : "24px",
              transition: "gap 0.5s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <motion.span
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0, scale: phase === "expand" ? 8 : 1 }}
              transition={{
                opacity: { duration: 0.4 },
                x: { duration: 0.5, ease: "easeOut" },
                scale: { duration: 0.5, ease: "easeIn" },
              }}
              style={{
                fontSize: "64px", fontWeight: 700, lineHeight: 1, display: "block",
                background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              D
            </motion.span>

            <motion.span
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, scale: phase === "expand" ? 8 : 1 }}
              transition={{
                opacity: { duration: 0.4 },
                x: { duration: 0.5, ease: "easeOut" },
                scale: { duration: 0.5, ease: "easeIn" },
              }}
              style={{
                fontSize: "64px", fontWeight: 700, lineHeight: 1, display: "block",
                background: "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}
            >
              G
            </motion.span>
          </div>

          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: phase === "expand" ? 0 : "80px", opacity: phase === "expand" ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{
              height: "2px",
              background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))",
              borderRadius: "2px",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: phase === "expand" ? 0 : 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              fontSize: "13px", letterSpacing: "0.15em",
              color: "hsl(var(--muted-foreground))", textTransform: "uppercase",
            }}
          >
            Deepak Gautam
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroLoader;
