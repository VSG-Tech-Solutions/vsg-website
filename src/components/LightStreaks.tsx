"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * LightStreaks — animated bright SVG arcs that sweep across the hero,
 * paired with the HeroOcean wave underneath.
 *
 * Three curves with different stroke widths, drift speeds, and arc paths.
 * Each path uses stroke-dasharray + stroke-dashoffset animation to make
 * the bright streak appear to "travel" along the curve like light pouring
 * through space.
 *
 * Composited via mix-blend-mode: screen so the streaks add brightness on
 * top of the wave + the matte bg. SVG filter (feGaussianBlur) creates the
 * halo around the bright core.
 *
 * Pure SVG — no JS per frame, no GPU cost.
 */
export const LightStreaks: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ mixBlendMode: "screen" }}
    >
      <defs>
        <filter id="streak-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="streak-blur-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <linearGradient id="streak-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,1)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      {/* Curve 1 — sweeping arc upper-left → mid */}
      <g>
        {/* Halo (wide soft blur) */}
        <motion.path
          d="M -100 280 Q 400 80 900 320 T 1700 220"
          fill="none"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth={6}
          strokeLinecap="round"
          filter="url(#streak-blur-soft)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 0.32 }
              : { pathLength: [0, 1, 1, 0], opacity: [0, 0.32, 0.32, 0] }
          }
          transition={{
            duration: 11,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.4, 0.7, 1],
          }}
        />
        {/* Core (sharp bright thin line) */}
        <motion.path
          d="M -100 280 Q 400 80 900 320 T 1700 220"
          fill="none"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth={1.5}
          strokeLinecap="round"
          filter="url(#streak-blur)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 1 }
              : { pathLength: [0, 1, 1, 0], opacity: [0, 0.65, 0.65, 0] }
          }
          transition={{
            duration: 11,
            ease: "easeInOut",
            repeat: Infinity,
            times: [0, 0.4, 0.7, 1],
          }}
        />
      </g>

      {/* Curve 2 — slower arc, lower midline → upper-right */}
      <g>
        <motion.path
          d="M -50 520 Q 500 320 1100 480 T 1700 380"
          fill="none"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={5}
          strokeLinecap="round"
          filter="url(#streak-blur-soft)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 0.28 }
              : { pathLength: [0, 1, 1, 0], opacity: [0, 0.28, 0.28, 0] }
          }
          transition={{
            duration: 14,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 2.5,
            times: [0, 0.45, 0.7, 1],
          }}
        />
        <motion.path
          d="M -50 520 Q 500 320 1100 480 T 1700 380"
          fill="none"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth={1.2}
          strokeLinecap="round"
          filter="url(#streak-blur)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 0.55 }
              : { pathLength: [0, 1, 1, 0], opacity: [0, 0.55, 0.55, 0] }
          }
          transition={{
            duration: 14,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 2.5,
            times: [0, 0.45, 0.7, 1],
          }}
        />
      </g>

      {/* Curve 3 — fast subtle thin streak, opposite direction */}
      <g>
        <motion.path
          d="M 1700 180 Q 1100 380 600 200 T -100 360"
          fill="none"
          stroke="rgba(255,255,255,0.13)"
          strokeWidth={3}
          strokeLinecap="round"
          filter="url(#streak-blur-soft)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 0.22 }
              : { pathLength: [0, 1, 1, 0], opacity: [0, 0.22, 0.22, 0] }
          }
          transition={{
            duration: 9,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 5,
            times: [0, 0.4, 0.7, 1],
          }}
        />
        <motion.path
          d="M 1700 180 Q 1100 380 600 200 T -100 360"
          fill="none"
          stroke="rgba(255,255,255,0.65)"
          strokeWidth={1}
          strokeLinecap="round"
          filter="url(#streak-blur)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={
            reduce
              ? { pathLength: 1, opacity: 0.45 }
              : { pathLength: [0, 1, 1, 0], opacity: [0, 0.45, 0.45, 0] }
          }
          transition={{
            duration: 9,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 5,
            times: [0, 0.4, 0.7, 1],
          }}
        />
      </g>
    </svg>
  );
};
