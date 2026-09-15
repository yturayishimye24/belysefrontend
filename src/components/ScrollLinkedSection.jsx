import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { forwardRef, useRef } from "react";

const ScrollLinkedSection = forwardRef(function ScrollLinkedSection(
  { children, className = "", id, ...props },
  forwardedRef,
) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "start 0.2"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.45,
  });
  const y = useTransform(smoothProgress, [0, 1], ["var(--scroll-enter-y)", "0px"]);
  const opacity = useTransform(smoothProgress, [0, 0.35, 1], [0.15, 0.72, 1]);
  const setSectionRef = (node) => {
    sectionRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <motion.section
      ref={setSectionRef}
      id={id}
      className={`scroll-linked-section ${className}`}
      style={prefersReducedMotion ? undefined : { y, opacity }}
      {...props}
    >
      {children}
    </motion.section>
  );
});

export default ScrollLinkedSection;