import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

// This component will wrap each section of your portfolio
const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({
    // This makes the animation trigger only once
    triggerOnce: true,
    // This is the percentage of the element that needs to be on screen to trigger the animation
    threshold: 0.1,
  });

  // These are the animation properties
  const animationVariants = {
    // The state before the element is in view
    hidden: { opacity: 0, y: 20 },
    // The state when the element is in view
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={animationVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default SectionWrapper;
