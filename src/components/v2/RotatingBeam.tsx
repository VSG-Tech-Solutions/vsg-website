"use client";

import { motion } from "framer-motion";

/**
 * RotatingBeam — slow searchlight sweep.
 *
 * A conic-gradient cone of warm light slowly rotates around a centre
 * point. Reads as a soft beam sweeping across the section like a
 * lighthouse / radar / film projector. Visible motion (you see it
 * rotate), premium feel, totally different from pipes / arcs / mist.
 *
 * Stack:
 *   1. Atmospheric base wash (static, soft warm halo)
 *   2. Rotating conic-gradient beam (the moving element)
 *   3. Counter-rotating second beam (creates an interaction pattern
 *      so it never reads as "just a single rotation")
 *   4. A bright nucleus at the centre to anchor the rotation
 *
 * 35–55 second rotation period — slow enough to feel cinematic.
 */

type Props = {
  intensity?: "subtle" | "medium" | "strong";
  tint?: "warm" | "cool";
  /** Vertical centre of the beam, % of section height. Default 75%. */
  centerY?: number;
  className?: string;
};

const TINTS = {
  warm: {
    primary: "#FF6B2C",
    secondary: "#FFB45C",
    halo: "rgba(255,107,44,0.10)",
  },
  cool: {
    primary: "#6B8AFF",
    secondary: "#A37CFF",
    halo: "rgba(107,138,255,0.10)",
  },
};

const INTENSITY = {
  subtle: { primary: 0.18, secondary: 0.10, nucleus: 0.30, base: 0.25 },
  medium: { primary: 0.30, secondary: 0.18, nucleus: 0.45, base: 0.40 },
  strong: { primary: 0.45, secondary: 0.28, nucleus: 0.65, base: 0.60 },
};

export const RotatingBeam: React.FC<Props> = ({
  intensity = "medium",
  tint = "warm",
  centerY = 75,
  className = "",
}) => {
  const C = TINTS[tint];
  const I = INTENSITY[intensity];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* Atmospheric base wash — gives the section weight under the beam */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 75% 60% at 50% ${centerY + 15}%, ${C.halo} 0%, transparent 70%)`,
          opacity: I.base,
        }}
      />

      {/* PRIMARY beam — bigger, slower clockwise rotation */}
      <motion.div
        className="absolute"
        style={{
          width: "180vmax",
          height: "180vmax",
          left: "50%",
          top: `${centerY}%`,
          x: "-50%",
          y: "-50%",
          willChange: "transform",
          // Conic gradient: a soft warm cone occupying ~80° of the
          // circle, transparent the rest of the way around.
          background: `conic-gradient(from 0deg at 50% 50%,
            transparent 0deg,
            transparent 140deg,
            ${C.primary} 175deg,
            ${C.secondary} 200deg,
            ${C.primary} 225deg,
            transparent 260deg,
            transparent 360deg)`,
          opacity: I.primary,
          filter: "blur(80px)",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 55,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* SECONDARY beam — smaller, faster, counter-rotating, slightly
          offset so the two beams interact differently every revolution */}
      <motion.div
        className="absolute"
        style={{
          width: "130vmax",
          height: "130vmax",
          left: "50%",
          top: `${centerY}%`,
          x: "-50%",
          y: "-50%",
          willChange: "transform",
          background: `conic-gradient(from 90deg at 50% 50%,
            transparent 0deg,
            transparent 160deg,
            ${C.secondary} 195deg,
            ${C.primary} 220deg,
            transparent 250deg,
            transparent 360deg)`,
          opacity: I.secondary,
          filter: "blur(60px)",
        }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 38,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Bright nucleus — small breathing core at the centre of the
          rotation so the beams feel anchored to a source. */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          left: "50%",
          top: `${centerY}%`,
          x: "-50%",
          y: "-50%",
          background: `radial-gradient(circle at 50% 50%, ${C.primary} 0%, ${C.primary} 6%, transparent 60%)`,
          filter: "blur(50px)",
          opacity: I.nucleus,
          willChange: "transform",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};
