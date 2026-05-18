"use client";

import { motion } from "framer-motion";

/**
 * FlowingPulse — visible vertical "data flow" effect.
 *
 * Replaces AmbientGlow (which was too soft/misty). Instead: a column
 * of thin hairline guide lines, each carrying a bright orange pulse
 * that travels top-to-bottom on a loop. Each pulse has a long glowing
 * trail behind it.
 *
 * Different lines have different positions, speeds, and delays — so
 * pulses are always at different points in their journey. The motion
 * is unmistakable: you watch a bright dot streak down the section.
 *
 * Reads as "AI signals flowing through pipelines" — fits the brand.
 */

type Props = {
  intensity?: "subtle" | "medium" | "strong";
  tint?: "warm" | "cool";
  /** Number of lines to render. Defaults to 8. */
  count?: number;
  className?: string;
};

const TINTS = {
  warm: {
    primary: "#FF6B2C",
    secondary: "#FFB45C",
    glow: "rgba(255,107,44,0.55)",
    glowSoft: "rgba(255,107,44,0.18)",
  },
  cool: {
    primary: "#6B8AFF",
    secondary: "#A37CFF",
    glow: "rgba(107,138,255,0.55)",
    glowSoft: "rgba(107,138,255,0.18)",
  },
};

const INTENSITY = {
  subtle: { lineOpacity: 0.10, pulseOpacity: 0.55, pulseHeight: 90 },
  medium: { lineOpacity: 0.15, pulseOpacity: 0.85, pulseHeight: 120 },
  strong: { lineOpacity: 0.20, pulseOpacity: 1.0, pulseHeight: 150 },
};

// Hand-tuned spread of lines so they read as a composition.
// `x` is a percentage of the section width.
// `delay` and `duration` are in seconds.
const LINES = [
  { x: 8, delay: 0,    dur: 5.0, color: "primary",   secondary: false },
  { x: 17, delay: 1.6, dur: 6.5, color: "secondary", secondary: true },
  { x: 26, delay: 0.4, dur: 4.5, color: "primary",   secondary: false },
  { x: 38, delay: 2.2, dur: 7.5, color: "primary",   secondary: false },
  { x: 49, delay: 0.9, dur: 5.5, color: "secondary", secondary: true },
  { x: 60, delay: 3.0, dur: 6.0, color: "primary",   secondary: false },
  { x: 72, delay: 1.2, dur: 5.0, color: "primary",   secondary: false },
  { x: 83, delay: 2.6, dur: 7.0, color: "secondary", secondary: true },
  { x: 92, delay: 0.7, dur: 5.8, color: "primary",   secondary: false },
];

export const FlowingPulse: React.FC<Props> = ({
  intensity = "medium",
  tint = "warm",
  count = 9,
  className = "",
}) => {
  const C = TINTS[tint];
  const I = INTENSITY[intensity];
  const lines = LINES.slice(0, count);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {lines.map((line, i) => {
        const color = line.color === "primary" ? C.primary : C.secondary;
        return (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{ left: `${line.x}%` }}
          >
            {/* Static guide line — the "pipe" */}
            <div
              className="absolute inset-0 w-px"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, rgba(255,255,255,${I.lineOpacity}) 12%, rgba(255,255,255,${I.lineOpacity}) 88%, transparent 100%)`,
              }}
            />

            {/* Travelling pulse — bright dot with a long glowing trail */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 rounded-full"
              style={{
                width: line.secondary ? 2 : 3,
                height: I.pulseHeight,
                background: `linear-gradient(to bottom, transparent 0%, ${C.glowSoft} 30%, ${color} 75%, ${color} 92%, transparent 100%)`,
                boxShadow: `0 0 12px ${color}, 0 0 28px ${C.glow}`,
                opacity: I.pulseOpacity,
                willChange: "transform",
              }}
              animate={{
                top: ["-20%", "120%"],
              }}
              transition={{
                duration: line.dur,
                delay: line.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        );
      })}

      {/* Soft warm wash anchored at the bottom — gives the effect
          atmospheric weight without obscuring the pulses themselves */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
        style={{
          background:
            tint === "warm"
              ? `radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,107,44,0.10) 0%, rgba(255,107,44,0) 70%)`
              : `radial-gradient(ellipse 80% 70% at 50% 100%, rgba(107,138,255,0.10) 0%, rgba(107,138,255,0) 70%)`,
        }}
      />
    </div>
  );
};
