import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Smooth spring follower for the ring
  const springX = useSpring(cursorX, { stiffness: 120, damping: 18 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkPointer = () => {
      const el = document.elementFromPoint(cursorX.get(), cursorY.get());
      if (!el) return;
      const style = window.getComputedStyle(el);
      setIsPointer(
        style.cursor === "pointer" ||
          el.tagName === "BUTTON" ||
          el.tagName === "A" ||
          el.closest("button") !== null ||
          el.closest("a") !== null
      );
    };

    const handleLeave = () => setIsHidden(true);
    const handleEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", checkPointer);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    // Hide the default cursor globally
    document.documentElement.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", checkPointer);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      document.documentElement.style.cursor = "";
    };
  }, [cursorX, cursorY]);

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Dot — snaps instantly to cursor */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.5 : 1,
            opacity: isHidden ? 0 : 1,
          }}
          transition={{ duration: 0.15 }}
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: "hsl(var(--primary))",
            boxShadow: "0 0 6px hsl(var(--primary)), 0 0 12px hsl(var(--primary) / 0.5)",
          }}
        />
      </motion.div>

      {/* Ring — follows with spring lag */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99998,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isPointer ? 1.8 : 1,
            opacity: isHidden ? 0 : isPointer ? 0.6 : 0.35,
            borderColor: isPointer ? "hsl(var(--accent))" : "hsl(var(--primary))",
          }}
          transition={{ duration: 0.2 }}
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1.5px solid hsl(var(--primary))",
            boxShadow: isPointer ? "0 0 16px hsl(var(--accent) / 0.4)" : "none",
          }}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
