"use client";

import { useEffect, useState } from "react";

/**
 * Meteors — 21st.dev / Aceternity-style shooting stars.
 *
 * N small bright orange streaks shoot diagonally across the section
 * with long thin trails behind them. Each meteor has a randomised
 * vertical start position, duration, delay and trail length so the
 * field never feels regular.
 *
 * The motion is unmistakable — you watch tiny bright streaks SHOOT
 * across. Different from beams (static), pulses (vertical), mist
 * (no clear motion), arcs (curved), marquee (text), rotating beam
 * (rotation). This is diagonal travelling motion.
 *
 * Built CSS-only for performance — no per-frame React work, just a
 * keyframe loop with randomised parameters baked in at mount.
 */

type Meteor = {
  id: number;
  top: number;          // %
  left: number;         // %
  duration: number;     // s
  delay: number;        // s
  size: number;         // px (length of the trail)
  opacity: number;
};

type Props = {
  /** How many meteors to spawn. */
  count?: number;
  /** Visual intensity — drives opacity + count multiplier. */
  intensity?: "subtle" | "medium" | "strong";
  /** Tint variant. */
  tint?: "warm" | "cool";
  /** Diagonal angle — degrees. Default 215° (top-right to bottom-left). */
  angle?: number;
  className?: string;
};

const TINTS = {
  warm: {
    head: "#FFD580",       // bright cream nucleus
    tail: "#FF6B2C",       // orange trail
    glow: "rgba(255,107,44,0.55)",
  },
  cool: {
    head: "#C5E5FF",
    tail: "#6B8AFF",
    glow: "rgba(107,138,255,0.55)",
  },
};

const INTENSITY = {
  subtle: { count: 10, opacityMul: 0.50 },
  medium: { count: 16, opacityMul: 0.85 },
  strong: { count: 24, opacityMul: 1.00 },
};

// Deterministic pseudo-random — seeded so SSR + client agree on the
// initial render and we don't get hydration mismatch warnings.
const seeded = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

export const Meteors: React.FC<Props> = ({
  count,
  intensity = "medium",
  tint = "warm",
  angle = 215,
  className = "",
}) => {
  const C = TINTS[tint];
  const I = INTENSITY[intensity];
  const N = count ?? I.count;

  // Compute meteor params once on the client to avoid hydration drift.
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const rng = seeded(42 + N);
    const arr: Meteor[] = [];
    for (let i = 0; i < N; i++) {
      arr.push({
        id: i,
        top: rng() * 60 - 10,           // -10% to 50% — start near top
        left: 30 + rng() * 70,          // 30% to 100% — start right side
        duration: 4 + rng() * 7,        // 4s – 11s
        delay: rng() * 12,              // 0s – 12s
        size: 100 + rng() * 220,        // 100px – 320px tail length
        opacity: (0.5 + rng() * 0.5) * I.opacityMul,
      });
    }
    setMeteors(arr);
  }, [N, I.opacityMul]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Per-instance keyframes — translateX so the whole "head + trail"
          line moves diagonally as one. The line itself is rotated to
          match the diagonal angle. */}
      <style>{`
        @keyframes vsg-meteor {
          0%   { transform: translateX(0) translateY(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateX(-130vw) translateY(60vw); opacity: 0; }
        }
      `}</style>

      {meteors.map((m) => (
        <span
          key={m.id}
          style={{
            position: "absolute",
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: m.size,
            height: 1,
            opacity: m.opacity,
            transform: `rotate(${angle}deg)`,
            transformOrigin: "right center",
            willChange: "transform, opacity",
            animation: `vsg-meteor ${m.duration}s linear ${m.delay}s infinite`,
          }}
        >
          {/* The trail — gradient fading from head to nothing */}
          <span
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to left, ${C.tail} 0%, ${C.tail}aa 20%, transparent 100%)`,
              borderRadius: 999,
            }}
          />
          {/* The bright head dot at the leading edge */}
          <span
            style={{
              position: "absolute",
              right: -2,
              top: "50%",
              width: 4,
              height: 4,
              transform: "translateY(-50%)",
              borderRadius: 999,
              background: C.head,
              boxShadow: `0 0 8px ${C.head}, 0 0 18px ${C.glow}`,
            }}
          />
        </span>
      ))}

      {/* Soft warm wash anchored at the bottom — atmospheric weight */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            tint === "warm"
              ? "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,107,44,0.10) 0%, rgba(255,107,44,0) 70%)"
              : "radial-gradient(ellipse 80% 70% at 50% 100%, rgba(107,138,255,0.10) 0%, rgba(107,138,255,0) 70%)",
        }}
      />
    </div>
  );
};
