"use client";

import { motion } from "framer-motion";

/**
 * FrameStreaks — Frame.io-school arcing light.
 *
 * Two layers stacked:
 *
 *   1. Atmospheric layer  — wide, very-blurred warm wash forming the
 *                            "halo" you sense before you see the arcs.
 *   2. Sharp arc layer    — multiple stroked ellipses with a soft SVG
 *                            bloom filter, drifting horizontally on
 *                            their own clocks. THESE are visible — they
 *                            read as distinct arcs of light, not as a
 *                            generic orange smear.
 *
 * The motion is the trick: each arc drifts ±50–80px horizontally on a
 * 9–18s loop, with phase-offset delays so the field never lines up the
 * same way twice. Slow enough to feel organic; fast enough to notice.
 */

type Props = {
  position?: "bottom" | "center" | "top";
  intensity?: "subtle" | "medium" | "strong";
  tint?: "warm" | "cool";
  className?: string;
};

const TINTS = {
  warm: {
    a: "#FF6B2C",
    b: "#FFB45C",
    c: "#FF4500",
    d: "#FFD68A",
    halo: "rgba(255, 107, 44, 0.18)",
  },
  cool: {
    a: "#6B8AFF",
    b: "#A37CFF",
    c: "#3CDDE0",
    d: "#C5E5FF",
    halo: "rgba(107, 138, 255, 0.18)",
  },
};

const INTENSITY = {
  subtle: { atmosphericOpacity: 0.30, arcOpacity: 0.55, strokeWidth: 1.5 },
  medium: { atmosphericOpacity: 0.50, arcOpacity: 0.80, strokeWidth: 2 },
  strong: { atmosphericOpacity: 0.70, arcOpacity: 0.95, strokeWidth: 2.5 },
};

const POS = {
  bottom: { bottom: 0, top: "auto" },
  center: { top: "20%", bottom: "auto" },
  top: { top: 0, bottom: "auto" },
};

// 9 arcs with hand-tuned spread + colours so the result reads as a
// composition, not random noise. cx is in viewBox space (0–1400); the
// ellipses sit just below the bottom edge so the upper half of each
// ring reads as an arc rising into the section.
const ARCS = [
  { cx: 700, rx: 460, ry: 360, c: "a", drift: 70, speed: 14, delay: 0,   strokeMul: 1.0 },
  { cx: 540, rx: 420, ry: 320, c: "b", drift: 60, speed: 12, delay: 1.3, strokeMul: 0.85 },
  { cx: 860, rx: 480, ry: 380, c: "c", drift: 80, speed: 16, delay: 0.7, strokeMul: 0.95 },
  { cx: 660, rx: 380, ry: 290, c: "d", drift: 55, speed: 10, delay: 2.1, strokeMul: 0.7 },
  { cx: 760, rx: 540, ry: 410, c: "a", drift: 90, speed: 18, delay: 0.4, strokeMul: 1.1 },
  { cx: 460, rx: 360, ry: 280, c: "b", drift: 50, speed: 9,  delay: 1.7, strokeMul: 0.75 },
  { cx: 940, rx: 400, ry: 310, c: "c", drift: 65, speed: 13, delay: 2.5, strokeMul: 0.8 },
  { cx: 700, rx: 600, ry: 460, c: "a", drift: 100, speed: 22, delay: 0,  strokeMul: 0.4 },
  { cx: 700, rx: 280, ry: 220, c: "d", drift: 40, speed: 8,  delay: 1.0, strokeMul: 0.6 },
];

export const FrameStreaks: React.FC<Props> = ({
  position = "bottom",
  intensity = "medium",
  tint = "warm",
  className = "",
}) => {
  const C = TINTS[tint];
  const I = INTENSITY[intensity];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 overflow-hidden ${className}`}
      style={{
        height: "70%",
        ...POS[position],
      }}
    >
      <svg
        viewBox="0 0 1400 700"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          {/* Bloom filter — soft glow halo around each arc stroke. The
              key to visible arcs (vs blurry mush) is keeping the source
              graphic intact and ADDING a blurred layer behind it. */}
          <filter id="streak-bloom" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="bloom" />
            <feMerge>
              <feMergeNode in="bloom" />
              <feMergeNode in="bloom" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Atmospheric blur — used on the wide warm wash behind */}
          <filter id="streak-atmosphere" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="80" />
          </filter>
        </defs>

        {/* LAYER 1 — atmospheric warm wash */}
        <g filter="url(#streak-atmosphere)" opacity={I.atmosphericOpacity}>
          <ellipse
            cx={700}
            cy={780}
            rx={620}
            ry={260}
            fill={C.a}
            opacity={0.55}
          />
          <ellipse
            cx={500}
            cy={800}
            rx={400}
            ry={200}
            fill={C.b}
            opacity={0.40}
          />
          <ellipse
            cx={900}
            cy={780}
            rx={420}
            ry={220}
            fill={C.c}
            opacity={0.35}
          />
        </g>

        {/* LAYER 2 — sharp arcs with bloom halo */}
        <g filter="url(#streak-bloom)" opacity={I.arcOpacity}>
          {ARCS.map((arc, i) => (
            <motion.ellipse
              key={i}
              // Initial position
              cx={arc.cx}
              cy={760}
              rx={arc.rx}
              ry={arc.ry}
              fill="none"
              stroke={C[arc.c as "a" | "b" | "c" | "d"]}
              strokeWidth={I.strokeWidth * arc.strokeMul}
              opacity={0.85}
              // Continuous slow drift
              animate={{
                cx: [
                  arc.cx - arc.drift,
                  arc.cx + arc.drift,
                  arc.cx - arc.drift,
                ],
                ry: [arc.ry, arc.ry * 1.04, arc.ry],
                opacity: [0.65, 0.95, 0.65],
              }}
              transition={{
                duration: arc.speed,
                delay: arc.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
      </svg>

      {/* Bottom edge fade — soft falloff so the streaks blend into the
          page-level dark below the section. */}
      <div
        className="absolute inset-x-0 bottom-0 h-12"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(var(--bg)) 100%)",
        }}
      />
    </div>
  );
};
