import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { forwardRef, useRef } from "react";

const ScrollLinkedItem = forwardRef(function ScrollLinkedItem(
  { children, className = "", ...props },
  forwardedRef,
) {
  const itemRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 0.96", "start 0.45"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 130,
    damping: 28,
    mass: 0.4,
  });
  const y = useTransform(smoothProgress, [0, 1], ["var(--scroll-item-y)", "0px"]);
  const opacity = useTransform(smoothProgress, [0, 0.4, 1], [0.2, 0.8, 1]);
  const setItemRef = (node) => {
    itemRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <motion.div
      ref={setItemRef}
      className={`scroll-linked-item ${className}`}
      style={prefersReducedMotion ? undefined : { y, opacity }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export default ScrollLinkedItem;