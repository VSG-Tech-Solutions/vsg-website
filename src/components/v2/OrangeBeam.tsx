"use client";

import { motion } from "framer-motion";

/**
 * OrangeBeam — the signature visual thread.
 *
 * A fixed-position warm-orange ribbon running top-to-bottom of the
 * viewport. Sits behind every section (z-0). Dark sections are
 * transparent so the beam shows through; light-tone sections have
 * solid backgrounds so the beam is naturally covered. The beam
 * "reappears" between sections.
 *
 * A travelling glow pulse drifts down the beam on a 7s loop —
 * subtle, never noisy.
 *
 * Position: right edge of the content max-width column, so on a
 * 1280px container at viewport-center, the beam lands at
 * `calc(50% + 640px)` until that exceeds the viewport on smaller
 * screens — at which point it falls back to a fixed right-8 inset.
 */

const ORANGE = "#FF6B2C";

export const OrangeBeam: React.FC = () => {
  return (
    <div
      aria-hidden
      className="fixed inset-y-0 z-0 pointer-events-none"
      style={{
        right: "max(1.25rem, calc(50% - 640px + 2.5rem))",
        width: "2px",
      }}
    >
      {/* Static gradient line — thicker + more visible */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${ORANGE} 10%, ${ORANGE} 90%, transparent 100%)`,
          opacity: 0.55,
          boxShadow: `0 0 8px rgba(255,107,44,0.35)`,
        }}
      />

      {/* Travelling pulse — bright glow drifting down */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          height: 140,
          width: "4px",
          background: `linear-gradient(to bottom, transparent 0%, ${ORANGE} 50%, transparent 100%)`,
          boxShadow: `0 0 24px ${ORANGE}, 0 0 56px rgba(255,107,44,0.55)`,
        }}
        animate={{ top: ["-15%", "115%"] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};
