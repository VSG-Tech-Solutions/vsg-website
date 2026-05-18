"use client";

import { motion } from "framer-motion";

/**
 * AmbientGlow — drifting blurred orbs.
 *
 * Replaces FrameStreaks (the laser arcs were too aggressive and didn't
 * move clearly). Instead: 4 soft volumetric orbs that drift on slow
 * looped paths across the section. Each orb has its own colour, size,
 * trajectory and speed — they overlap creating an ever-shifting warm
 * mesh that's visibly in motion without screaming for attention.
 *
 * The parent section MUST be `position: relative` and ideally
 * `overflow-hidden` so the orbs don't bleed into adjacent sections.
 *
 * Tints: "warm" (orange/amber) or "cool" (blue/violet).
 * Intensity: "subtle" / "medium" / "strong".
 */

type Props = {
  intensity?: "subtle" | "medium" | "strong";
  tint?: "warm" | "cool";
  /** Anchor the orb field to a region of the section. Default: "all" (fills the whole section). */
  anchor?: "bottom" | "all";
  className?: string;
};

const TINTS = {
  warm: {
    a: "#FF6B2C",
    b: "#FFB45C",
    c: "#FF4500",
    d: "#FFD580",
  },
  cool: {
    a: "#6B8AFF",
    b: "#A37CFF",
    c: "#3CDDE0",
    d: "#C5E5FF",
  },
};

const INTENSITY = {
  subtle: 0.30,
  medium: 0.55,
  strong: 0.80,
};

// Orb paths — each orb is a long slow loop that returns home.
// x/y are percentages of the section so the motion adapts to size.
const ORBS = [
  {
    color: "a",
    size: 720,
    x: ["10%", "32%", "18%", "10%"],
    y: ["20%", "48%", "70%", "20%"],
    dur: 22,
    delay: 0,
    weight: 0.55,
  },
  {
    color: "b",
    size: 640,
    x: ["72%", "58%", "82%", "72%"],
    y: ["24%", "55%", "30%", "24%"],
    dur: 26,
    delay: 1.5,
    weight: 0.55,
  },
  {
    color: "c",
    size: 580,
    x: ["48%", "22%", "62%", "48%"],
    y: ["62%", "30%", "55%", "62%"],
    dur: 30,
    delay: 0.8,
    weight: 0.45,
  },
  {
    color: "d",
    size: 480,
    x: ["86%", "70%", "92%", "86%"],
    y: ["66%", "78%", "60%", "66%"],
    dur: 24,
    delay: 2.4,
    weight: 0.40,
  },
];

export const AmbientGlow: React.FC<Props> = ({
  intensity = "medium",
  tint = "warm",
  anchor = "all",
  className = "",
}) => {
  const colors = TINTS[tint];
  const opacityMul = INTENSITY[intensity];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        // When anchored to bottom, fade the upper half so orbs feel
        // like they belong to the lower band of the section.
        maskImage:
          anchor === "bottom"
            ? "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)"
            : undefined,
        WebkitMaskImage:
          anchor === "bottom"
            ? "linear-gradient(to bottom, transparent 0%, black 35%, black 100%)"
            : undefined,
      }}
    >
      {ORBS.map((orb, i) => {
        const color = colors[orb.color as keyof typeof colors];
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: 0,
              top: 0,
              background: `radial-gradient(circle at 50% 50%, ${color} 0%, ${color} 5%, transparent 65%)`,
              filter: "blur(90px)",
              opacity: orb.weight * opacityMul,
              willChange: "transform",
              // Centre the orb on the % position via translate(-50%, -50%)
              translate: "-50% -50%",
            }}
            animate={{
              left: orb.x,
              top: orb.y,
            }}
            transition={{
              duration: orb.dur,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};
