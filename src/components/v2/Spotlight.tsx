"use client";

import { motion } from "framer-motion";

/**
 * Spotlight — Aceternity-school dramatic radial light on the hero.
 *
 * A large soft elliptical light cone rendered as a blurred SVG ellipse,
 * positioned off-canvas top-left so only the right-edge of the cone
 * spills into the hero. Slowly fades in on mount; otherwise static.
 *
 * Adds drama without motion noise — clean, single-source light feel.
 */

type Props = {
  /** Position of the spotlight source. Default: top-left. */
  position?: "top-left" | "top-right" | "top-center";
  /** Tint colour. */
  tint?: "warm" | "cool" | "white";
  /** Visual intensity (controls opacity + size). */
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
};

const TINTS = {
  warm: "rgba(255, 180, 90, 0.45)",
  cool: "rgba(140, 180, 255, 0.45)",
  white: "rgba(255, 255, 255, 0.30)",
};

const INTENSITY = {
  subtle: { rx: 320, ry: 480, opacity: 0.45 },
  medium: { rx: 420, ry: 580, opacity: 0.65 },
  strong: { rx: 540, ry: 720, opacity: 0.85 },
};

const POSITIONS = {
  "top-left": { cx: 200, cy: -80 },
  "top-right": { cx: 1240, cy: -80 },
  "top-center": { cx: 720, cy: -80 },
};

export const Spotlight: React.FC<Props> = ({
  position = "top-left",
  tint = "warm",
  intensity = "medium",
  className = "",
}) => {
  const I = INTENSITY[intensity];
  const P = POSITIONS[position];
  const color = TINTS[tint];

  return (
    <motion.svg
      aria-hidden
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      viewBox="0 0 1440 700"
      preserveAspectRatio="xMidYMin slice"
      initial={{ opacity: 0 }}
      animate={{ opacity: I.opacity }}
      transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <defs>
        <filter id="spotlight-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="60" />
        </filter>
        <radialGradient id="spotlight-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} />
          <stop offset="40%" stopColor={color.replace(/[\d.]+\)$/, "0.20)")} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <g filter="url(#spotlight-blur)">
        <ellipse
          cx={P.cx}
          cy={P.cy}
          rx={I.rx}
          ry={I.ry}
          fill="url(#spotlight-grad)"
          transform={`rotate(${position === "top-left" ? -25 : position === "top-right" ? 25 : 0} ${P.cx} ${P.cy})`}
        />
      </g>
    </motion.svg>
  );
};
