"use client";

import { motion } from "framer-motion";

/**
 * Lamp — Aceternity-school dramatic top spotlight cone.
 *
 * Two angled gradient cones meeting at the top centre create the
 * "stage lamp" effect — a classic Aceternity moment. Plus a thin
 * bright horizontal hairline at the meeting point that pulses.
 *
 * Use as a hero treatment for a section that needs gravitas
 * (Testimonials, etc).
 */

type Props = {
  intensity?: "subtle" | "medium" | "strong";
  className?: string;
};

const ORANGE = "#FF6B2C";
const ORANGE_SOFT = "rgba(255, 107, 44, 0.45)";

const INTENSITY = {
  subtle: { coneOpacity: 0.30, lineOpacity: 0.40 },
  medium: { coneOpacity: 0.50, lineOpacity: 0.60 },
  strong: { coneOpacity: 0.75, lineOpacity: 0.85 },
};

export const Lamp: React.FC<Props> = ({
  intensity = "medium",
  className = "",
}) => {
  const I = INTENSITY[intensity];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 h-[60%] overflow-hidden ${className}`}
    >
      {/* LEFT cone — gradient angled from top-centre down-left */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: I.coneOpacity }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          left: "50%",
          top: 0,
          width: "44vw",
          height: "44vw",
          maxWidth: 640,
          maxHeight: 640,
          background: `conic-gradient(from 80deg at center top, transparent 0deg, ${ORANGE_SOFT} 35deg, ${ORANGE} 70deg, ${ORANGE_SOFT} 100deg, transparent 130deg)`,
          transform: "translateX(-100%) rotate(-20deg)",
          transformOrigin: "right top",
          filter: "blur(60px)",
          mixBlendMode: "screen",
        }}
      />

      {/* RIGHT cone — mirror */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: I.coneOpacity }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        style={{
          left: "50%",
          top: 0,
          width: "44vw",
          height: "44vw",
          maxWidth: 640,
          maxHeight: 640,
          background: `conic-gradient(from 230deg at center top, transparent 0deg, ${ORANGE_SOFT} 35deg, ${ORANGE} 70deg, ${ORANGE_SOFT} 100deg, transparent 130deg)`,
          transformOrigin: "left top",
          transform: "rotate(20deg)",
          filter: "blur(60px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Pulsing bright hairline at the lamp's "stage" point — where
          the two cones meet at the top centre, the bright bar reads
          as the lamp's filament. */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: "8%",
          width: "min(60vw, 720px)",
          height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${ORANGE} 50%, transparent 100%)`,
          boxShadow: `0 0 16px ${ORANGE}, 0 0 32px ${ORANGE}66`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [I.lineOpacity * 0.6, I.lineOpacity, I.lineOpacity * 0.6] }}
        transition={{
          opacity: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3,
          },
        }}
      />

      {/* Soft warm wash beneath the cones */}
      <div
        className="absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, rgba(255,107,44,0.10) 0%, rgba(255,107,44,0) 70%)",
        }}
      />
    </div>
  );
};
