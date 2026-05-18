"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingScreen — full-bleed counter intro.
 *
 * 000 → 100 over 2700ms with rAF; while it runs, the centre cycles
 * through three rotating words. On hit, fades and calls onComplete.
 *
 * The progress bar uses the cool-blue accent gradient — the only
 * coloured element on the whole site.
 */

const ROTATING_WORDS = ["Build", "Ship", "Scale"];
const DURATION_MS = 2700;

export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Counter — requestAnimationFrame loop, ~60fps, eased to 100 in DURATION_MS.
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION_MS);
      // Ease-out cubic so the counter slows into 100
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * 100));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(100);
        // Hold on 100 for 400ms before handing over.
        setTimeout(onComplete, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  // Rotate the centre word every 900ms.
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const counterDisplay = String(count).padStart(3, "0");

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col">
      {/* Top-left label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-6 left-6 sm:top-8 sm:left-10 text-xs text-muted uppercase tracking-[0.3em]"
      >
        VSG · Loading
      </motion.div>

      {/* Centre — rotating word in editorial italic */}
      <div className="flex-1 flex items-center justify-center px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display text-text-primary/80 font-semibold tracking-tight"
          >
            {ROTATING_WORDS[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom-right — big counter */}
      <div className="absolute bottom-12 right-6 sm:right-10 sm:bottom-16">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none font-bold">
          {counterDisplay}
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute left-0 right-0 bottom-0 h-[3px] bg-stroke/50">
        <div
          className="h-full accent-gradient origin-left transition-transform duration-100"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </div>
  );
};
