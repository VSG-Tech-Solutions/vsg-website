"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * HoloBlackBg — deep canvas with ambient motion.
 *
 * Pure dark background plus three subtle ambient elements:
 *   1. A faint diagonal cyan beam that sweeps across the top, very slow.
 *   2. A barely-visible noise/grid (CSS background) for surface texture.
 *   3. Two subtle radial halos that pulse slowly.
 *
 * All motion is reduced-motion-aware. The canvas should feel alive but
 * never distract from the foreground type.
 */
export const HoloBlackBg: React.FC = () => {
  const prefersReduce = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base canvas */}
      <div className="absolute inset-0" style={{ background: "var(--bg)" }} />

      {/* Subtle diagonal sweeping beam */}
      {!prefersReduce && (
        <motion.div
          aria-hidden
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[200%]"
          style={{
            background:
              "linear-gradient(115deg, transparent 40%, rgba(103, 232, 249, 0.025) 48%, rgba(103, 232, 249, 0.05) 50%, rgba(103, 232, 249, 0.025) 52%, transparent 60%)",
            transformOrigin: "center",
          }}
          animate={{ x: ["-15%", "15%", "-15%"] }}
          transition={{
            duration: 22,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      )}

      {/* Two soft radial halos that pulse out of phase */}
      {!prefersReduce && (
        <>
          <motion.div
            aria-hidden
            className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(103, 232, 249, 0.06), transparent 70%)",
              filter: "blur(40px)",
            }}
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.06, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-[-30%] left-[-15%] w-[800px] h-[800px] rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(20, 184, 166, 0.05), transparent 70%)",
              filter: "blur(60px)",
            }}
            animate={{ opacity: [0.25, 0.5, 0.25], scale: [1, 1.05, 1] }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </>
      )}

      {/* Faint noise / grid for surface texture */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: "120px 120px",
          maskImage:
            "radial-gradient(ellipse 80% 65% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      {/* Bottom fade so content below the hero blends seamlessly */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg) 90%)",
        }}
      />
    </div>
  );
};
