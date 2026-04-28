"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — hairline accent bar that fills as the user scrolls.
 *
 * Sits fixed at the very top of the viewport, 1px tall, transformed via
 * scroll progress so it scrubs smoothly with a stiff spring. Pure CSS-var
 * accent — automatically picks up the site's current accent colour.
 *
 * Mounted once at the SiteShell level so it's site-wide.
 */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 left-0 right-0 h-px z-[60] origin-left pointer-events-none"
      style={{
        scaleX,
        background:
          "linear-gradient(to right, var(--accent), var(--accent-2))",
      }}
    />
  );
};
