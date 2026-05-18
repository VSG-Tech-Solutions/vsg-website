"use client";

import { motion } from "framer-motion";

/**
 * BackgroundBeams — Aceternity-school vertical pulsing beams.
 *
 * Multiple thin vertical beams at random x positions, each with a
 * gradient that pulses opacity in a staggered loop. Different from my
 * earlier FlowingPulse — these don't TRAVEL, they sit in place and
 * BREATHE. Subtler, less mechanical.
 */

type Props = {
  count?: number;
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
};

const ORANGE = "#FF6B2C";

const BEAMS = [
  { x: 7, dur: 6, delay: 0 },
  { x: 16, dur: 7, delay: 1.2 },
  { x: 25, dur: 5, delay: 0.5 },
  { x: 34, dur: 8, delay: 2.1 },
  { x: 43, dur: 6.5, delay: 1.6 },
  { x: 52, dur: 7.5, delay: 0.3 },
  { x: 61, dur: 5.5, delay: 2.8 },
  { x: 70, dur: 6, delay: 1.0 },
  { x: 79, dur: 7, delay: 2.4 },
  { x: 88, dur: 8, delay: 0.7 },
];

export const BackgroundBeams: React.FC<Props> = ({
  count = 10,
  intensity = "medium",
  className = "",
}) => {
  const opacityCap =
    intensity === "subtle" ? 0.20 : intensity === "medium" ? 0.40 : 0.65;
  const beams = BEAMS.slice(0, count);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {beams.map((b, i) => (
        <motion.div
          key={i}
          className="absolute top-0 bottom-0"
          style={{
            left: `${b.x}%`,
            width: 1,
            background: `linear-gradient(to bottom, transparent 0%, ${ORANGE} 50%, transparent 100%)`,
            boxShadow: `0 0 8px ${ORANGE}66`,
          }}
          animate={{
            opacity: [0, opacityCap, 0],
          }}
          transition={{
            duration: b.dur,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
