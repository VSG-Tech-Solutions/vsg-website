"use client";

import { motion } from "framer-motion";

/**
 * Aurora — flowing horizontal ribbons of warm color.
 *
 * Multiple soft gradient ribbons stacked at different y positions,
 * each independently waving (translateY + skewY) on its own slow
 * loop. Reads like aurora borealis / northern lights — clearly
 * flowing motion, organic, never the same shape twice.
 *
 * Different from everything tried so far:
 *   - Not orbs (those drift in 2D, no shape)
 *   - Not pulses (vertical and pipe-like)
 *   - Not arcs (curved, fixed)
 *   - Not meteors (single direction streaks)
 *   - Not marquee (text)
 *
 * Aurora has SHAPE (horizontal bands) + DIRECTION (waves vertically) +
 * COLOR FLOW (gradient stops shift).
 */

type Props = {
  intensity?: "subtle" | "medium" | "strong";
  tint?: "warm" | "cool";
  className?: string;
};

const TINTS = {
  warm: {
    a: "rgba(255, 107, 44, 1)",
    b: "rgba(255, 180, 90, 1)",
    c: "rgba(255, 220, 140, 1)",
    d: "rgba(180, 60, 0, 1)",
  },
  cool: {
    a: "rgba(107, 138, 255, 1)",
    b: "rgba(167, 124, 255, 1)",
    c: "rgba(60, 221, 224, 1)",
    d: "rgba(40, 60, 180, 1)",
  },
};

const INTENSITY = {
  subtle: 0.20,
  medium: 0.35,
  strong: 0.55,
};

const RIBBONS = [
  { y: "20%", height: 200, color: "a", delay: 0,   dur: 14, skew: 6 },
  { y: "40%", height: 280, color: "b", delay: 1.5, dur: 18, skew: -4 },
  { y: "55%", height: 160, color: "c", delay: 3.0, dur: 12, skew: 5 },
  { y: "70%", height: 240, color: "d", delay: 0.8, dur: 16, skew: -7 },
  { y: "85%", height: 200, color: "a", delay: 2.2, dur: 20, skew: 3 },
];

export const Aurora: React.FC<Props> = ({
  intensity = "medium",
  tint = "warm",
  className = "",
}) => {
  const C = TINTS[tint];
  const opacityMul = INTENSITY[intensity];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {RIBBONS.map((r, i) => {
        const color = C[r.color as keyof typeof C];
        return (
          <motion.div
            key={i}
            className="absolute inset-x-0"
            style={{
              top: r.y,
              height: r.height,
              background: `linear-gradient(90deg,
                transparent 0%,
                ${color} 25%,
                ${color} 50%,
                ${color} 75%,
                transparent 100%)`,
              filter: "blur(60px)",
              opacity: 0.7 * opacityMul,
              willChange: "transform",
            }}
            animate={{
              y: [0, 30, -20, 10, 0],
              skewY: [0, r.skew, -r.skew * 0.6, r.skew * 0.4, 0],
              scaleY: [1, 1.15, 0.9, 1.08, 1],
            }}
            transition={{
              duration: r.dur,
              delay: r.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Soft warm wash anchored at the bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            tint === "warm"
              ? "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,107,44,0.08) 0%, rgba(255,107,44,0) 70%)"
              : "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(107,138,255,0.08) 0%, rgba(107,138,255,0) 70%)",
        }}
      />
    </div>
  );
};
