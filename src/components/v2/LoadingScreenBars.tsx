"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * LoadingScreenBars — Variant C.
 *
 * Three vertical bars fill up sequentially in the centre. Each is the
 * orange accent colour. Above the bars, the rotating word
 * (Build / Ship / Scale) cycles. Below, the counter ticks up to 100.
 *
 * Total ~2400ms.
 */

const ROTATING_WORDS = ["Build", "Ship", "Scale"];
const ORANGE = "#FF6B2C";
const DURATION = 2400;

export const LoadingScreenBars: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else {
        setCount(100);
        setTimeout(onComplete, 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const i = setInterval(() => {
      setWordIndex((v) => (v + 1) % ROTATING_WORDS.length);
    }, 800);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center">
      <div className="absolute top-6 left-6 sm:top-8 sm:left-10 text-xs text-muted uppercase tracking-[0.3em]">
        VSG · Loading
      </div>

      {/* Rotating word above bars */}
      <motion.div
        key={wordIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4 }}
        className="font-display text-text-primary/80 mb-10 font-semibold tracking-tight"
        style={{
          fontSize: "clamp(2rem, 4vw, 3rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {ROTATING_WORDS[wordIndex]}
      </motion.div>

      {/* Three vertical bars */}
      <div className="flex items-end gap-3 h-[120px]">
        {[0, 1, 2].map((i) => {
          const delayPct = i * 25;
          const fill = Math.max(0, Math.min(100, (count - delayPct) * (100 / 75)));
          return (
            <div
              key={i}
              className="relative w-3 h-full rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <motion.div
                className="absolute bottom-0 left-0 right-0 rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${ORANGE} 0%, #FF8A4F 100%)`,
                  boxShadow: `0 0 12px rgba(255,107,44,0.55)`,
                }}
                animate={{ height: `${fill}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          );
        })}
      </div>

      {/* Counter */}
      <div
        className="absolute bottom-12 right-6 sm:right-10 sm:bottom-16 font-display tabular-nums text-text-primary font-bold"
        style={{
          fontSize: "clamp(3rem, 7vw, 5rem)",
          lineHeight: 1,
          letterSpacing: "-0.025em",
        }}
      >
        {String(count).padStart(3, "0")}
      </div>

      {/* Bottom progress bar */}
      <div
        className="absolute left-0 right-0 bottom-0 h-px"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="h-full origin-left transition-transform duration-100"
          style={{
            transform: `scaleX(${count / 100})`,
            background: `linear-gradient(90deg, ${ORANGE} 0%, #FF8A4F 100%)`,
          }}
        />
      </div>
    </div>
  );
};
