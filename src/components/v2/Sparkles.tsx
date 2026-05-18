"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Sparkles — twinkling starfield.
 *
 * Used ONLY at the footer CTA as a different climax effect — distinct
 * motion type from Aurora (which flows). Sparkles twinkle: each one
 * fades in and out on its own clock, with occasional bigger "burst"
 * sparkles that briefly bloom larger.
 *
 * Reads as fireflies / stars / quiet magic. Clean ending note before
 * the user clicks the CTA.
 */

type Spark = {
  id: number;
  top: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  burst: boolean;
};

type Props = {
  count?: number;
  intensity?: "subtle" | "medium" | "strong";
  tint?: "warm" | "cool";
  className?: string;
};

const TINTS = {
  warm: {
    primary: "#FFD580",
    accent: "#FF6B2C",
  },
  cool: {
    primary: "#C5E5FF",
    accent: "#6B8AFF",
  },
};

const INTENSITY = {
  subtle: { count: 40, opacityMul: 0.55 },
  medium: { count: 70, opacityMul: 0.85 },
  strong: { count: 110, opacityMul: 1.0 },
};

// Seeded PRNG so SSR + client agree at first paint.
const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export const Sparkles: React.FC<Props> = ({
  count,
  intensity = "medium",
  tint = "warm",
  className = "",
}) => {
  const C = TINTS[tint];
  const I = INTENSITY[intensity];
  const N = count ?? I.count;

  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    const rng = seeded(73 + N);
    const arr: Spark[] = [];
    for (let i = 0; i < N; i++) {
      const burst = rng() < 0.12; // ~12% are "burst" sparkles
      arr.push({
        id: i,
        top: rng() * 100,
        left: rng() * 100,
        size: burst ? 4 + rng() * 4 : 1.5 + rng() * 2.5,
        duration: 2 + rng() * 4,
        delay: rng() * 6,
        opacity: (0.5 + rng() * 0.5) * I.opacityMul,
        burst,
      });
    }
    setSparks(arr);
  }, [N, I.opacityMul]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.burst ? C.accent : C.primary,
            boxShadow: s.burst
              ? `0 0 ${s.size * 4}px ${C.accent}, 0 0 ${s.size * 8}px ${C.accent}`
              : `0 0 ${s.size * 3}px ${C.primary}`,
          }}
          animate={{
            opacity: s.burst
              ? [0, s.opacity, 0]
              : [0, s.opacity, s.opacity * 0.3, s.opacity, 0],
            scale: s.burst ? [0.5, 1.4, 0.5] : [0.8, 1, 0.9, 1, 0.8],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Very soft warm wash bottom — gives the field weight */}
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
