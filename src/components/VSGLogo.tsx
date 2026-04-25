"use client";

import { motion } from "framer-motion";

/**
 * VSG mark — 8 elliptical petals radiating from centre + a small sparkle.
 * Transparent background (no chip / black box). Petals and sparkle render in
 * `currentColor`, so the mark picks up `--fg` (or whatever colour the parent
 * sets).
 *
 * On hover the petals contract toward centre ("close"); on tap they close
 * tighter and the whole mark rotates 45°. On release they bloom back out.
 *
 * Because framer-motion's `motion.*` elements overwrite the SVG `transform`
 * attribute with their own, each petal lives inside a plain `<g transform>`
 * that handles the rotation, and `motion.ellipse` only drives scale/opacity.
 */
export const VSGLogo: React.FC<{
  size?: number;
  className?: string;
  title?: string;
  animate?: boolean;
}> = ({ size = 28, className, title = "VSG", animate = true }) => {
  const petals = Array.from({ length: 8 }, (_, i) => i * 45);

  const petalVariants = {
    rest: { scale: 1, opacity: 1 },
    hover: { scale: 0.55, opacity: 0.92 },
    tap: { scale: 0.35, opacity: 1 },
  };

  const sparkleVariants = {
    rest: { scale: 1, opacity: 0.9 },
    hover: { scale: 1.35, opacity: 1 },
    tap: { scale: 1.6, opacity: 1 },
  };

  const Svg = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={title}
      style={{ display: "block", color: "currentColor" }}
    >
      <title>{title}</title>
      <g transform="translate(50 50)">
        {petals.map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <motion.ellipse
              cx="0"
              cy="-24"
              rx="8"
              ry="20"
              fill="currentColor"
              variants={petalVariants}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 18,
                delay: (deg / 45) * 0.015,
              }}
              style={{ transformOrigin: "0 -24px" }}
            />
          </g>
        ))}
      </g>
      {/* Sparkle — small 4-pointed star in the bottom-right quadrant */}
      <g transform="translate(82 82)">
        <motion.path
          d="M0,-7 L1.6,-1.6 L7,0 L1.6,1.6 L0,7 L-1.6,1.6 L-7,0 L-1.6,-1.6 Z"
          fill="currentColor"
          variants={sparkleVariants}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          style={{ transformOrigin: "0 0" }}
        />
      </g>
    </svg>
  );

  if (!animate) return <span className={className}>{Svg}</span>;

  return (
    <motion.span
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      animate="rest"
      variants={{
        rest: { rotate: 0 },
        hover: { rotate: 22.5 },
        tap: { rotate: 45 },
      }}
      transition={{ type: "spring", stiffness: 220, damping: 16 }}
      style={{ display: "inline-flex", transformOrigin: "center" }}
      className={className}
    >
      {Svg}
    </motion.span>
  );
};
