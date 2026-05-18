"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * DotPattern — Magic UI dot pattern with a few cells pulsing on loop.
 *
 * Static dot lattice via SVG pattern + a handful of brighter pulsing
 * dots randomly placed. The result reads as a circuit-board with a
 * few "alive" nodes blinking.
 */

type Props = {
  cellSize?: number;
  pulseCount?: number;
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

export const DotPattern: React.FC<Props> = ({
  cellSize = 24,
  pulseCount = 16,
  intensity = "medium",
  className = "",
}) => {
  const opacityCap =
    intensity === "subtle" ? 0.45 : intensity === "medium" ? 0.75 : 1.0;

  const [pulses, setPulses] = useState<
    { x: number; y: number; delay: number; dur: number }[]
  >([]);

  useEffect(() => {
    const rng = seeded(53 + pulseCount);
    const arr = [];
    for (let i = 0; i < pulseCount; i++) {
      arr.push({
        x: rng() * 100,
        y: rng() * 100,
        delay: rng() * 5,
        dur: 2 + rng() * 4,
      });
    }
    setPulses(arr);
  }, [pulseCount]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        maskImage:
          "radial-gradient(ellipse at center, black 25%, transparent 85%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at center, black 25%, transparent 85%)",
      }}
    >
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id="vsg-dot"
            x={0}
            y={0}
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={cellSize / 2}
              cy={cellSize / 2}
              r={1}
              fill="rgba(255,255,255,0.10)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#vsg-dot)" />
      </svg>

      {/* Pulsing brighter dots */}
      {pulses.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: 6,
            height: 6,
            background: ORANGE,
            boxShadow: `0 0 12px ${ORANGE}, 0 0 24px ${ORANGE}99`,
          }}
          animate={{
            opacity: [0, opacityCap, 0],
            scale: [0.6, 1.2, 0.6],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
