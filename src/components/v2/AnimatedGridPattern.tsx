"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * AnimatedGridPattern — Magic UI grid with periodically-lighting cells.
 *
 * SVG grid background. Random cells "light up" (fill + glow) on a
 * staggered loop, then fade out. Creates an LED-matrix / circuit-board
 * vibe without a per-cell render cost.
 */

type Props = {
  squareWidth?: number;
  squareHeight?: number;
  numSquares?: number;
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
};

const ORANGE = "#FF6B2C";

const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export const AnimatedGridPattern: React.FC<Props> = ({
  squareWidth = 48,
  squareHeight = 48,
  numSquares = 30,
  intensity = "medium",
  className = "",
}) => {
  const opacityCap =
    intensity === "subtle" ? 0.12 : intensity === "medium" ? 0.22 : 0.35;

  // Random squares, deterministic via seed so SSR + client agree.
  const [squares, setSquares] = useState<
    { x: number; y: number; delay: number; dur: number }[]
  >([]);

  useEffect(() => {
    const rng = seeded(91 + numSquares);
    const arr = [];
    for (let i = 0; i < numSquares; i++) {
      arr.push({
        x: Math.floor(rng() * 28),     // column index, will tile across width
        y: Math.floor(rng() * 14),     // row index
        delay: rng() * 6,
        dur: 3 + rng() * 4,
      });
    }
    setSquares(arr);
  }, [numSquares]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        maskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 30%, transparent 80%)",
      }}
    >
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        style={{
          // Static grid pattern via SVG pattern fill
        }}
      >
        <defs>
          <pattern
            id="vsg-grid"
            x={0}
            y={0}
            width={squareWidth}
            height={squareHeight}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M.5 ${squareHeight}V.5H${squareWidth}`}
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth={1}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vsg-grid)" />

        {/* Lighting cells */}
        {squares.map((sq, i) => (
          <motion.rect
            key={i}
            x={sq.x * squareWidth + 1}
            y={sq.y * squareHeight + 1}
            width={squareWidth - 2}
            height={squareHeight - 2}
            fill={ORANGE}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, opacityCap, 0] }}
            transition={{
              duration: sq.dur,
              delay: sq.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};
