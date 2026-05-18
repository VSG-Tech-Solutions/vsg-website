"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * LoadingScreenBeam — Variant B.
 *
 * A horizontal orange beam draws across the screen left → right, the
 * VSG italic wordmark fades in centred, and the beam sweeps off.
 *
 * Total ~2400ms.
 */

const ORANGE = "#FF6B2C";

export const LoadingScreenBeam: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [phase, setPhase] = useState<"draw" | "settle" | "out">("draw");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("settle"), 1100);
    const t2 = setTimeout(() => setPhase("out"), 2000);
    const t3 = setTimeout(onComplete, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "out" ? 0 : 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Top label */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 text-xs text-muted uppercase tracking-[0.3em]">
        VSG · Loading
      </div>

      {/* Bottom-right counter — animated 000→100 */}
      <BeamCounter />

      {/* The beam itself — full-width line that draws then sweeps */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        style={{
          top: "50%",
          background: `linear-gradient(90deg, transparent 0%, ${ORANGE} 50%, transparent 100%)`,
          boxShadow: `0 0 16px ${ORANGE}, 0 0 36px rgba(255,107,44,0.5)`,
        }}
        initial={{ scaleX: 0, transformOrigin: "left center" }}
        animate={{
          scaleX: phase === "draw" ? 1 : 1,
          x: phase === "out" ? "100%" : "0%",
          transformOrigin: phase === "out" ? "right center" : "left center",
        }}
        transition={{
          duration: phase === "draw" ? 1.1 : 0.6,
          ease: phase === "draw" ? [0.16, 1, 0.3, 1] : [0.7, 0, 0.84, 0],
        }}
      />

      {/* VSG wordmark — fades in once the beam draws */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: phase === "settle" || phase === "out" ? 1 : 0,
          y: phase === "settle" ? 0 : 12,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-text-primary font-bold"
        style={{
          fontSize: "clamp(4rem, 14vw, 12rem)",
          lineHeight: 0.85,
          letterSpacing: "-0.04em",
        }}
      >
        VSG
      </motion.div>
    </motion.div>
  );
};

const BeamCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 2000);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="absolute bottom-6 right-6 sm:right-10 sm:bottom-8 text-xs font-mono tabular-nums text-muted">
      {String(count).padStart(3, "0")}
    </div>
  );
};
