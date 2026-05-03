"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * LiveModuleTicker — rotating one-line "live" status under the hero.
 *
 * Cycles through a list of module-AI status lines every N seconds, fading
 * the previous out and the next in. Creates the sense the product is alive
 * without faking metrics. Vercel/Inngest-style.
 *
 * Lines should read like operational events — e.g. "Procurement AI drafted
 * 24 supplier quotes today". Pass real data once pilots ship.
 */

type LiveModuleTickerProps = {
  lines: string[];
  /** Seconds between cycles. Default 4. */
  interval?: number;
};

export const LiveModuleTicker: React.FC<LiveModuleTickerProps> = ({
  lines,
  interval = 4,
}) => {
  const [idx, setIdx] = useState(0);
  const prefersReduce = useReducedMotion();

  useEffect(() => {
    if (prefersReduce || lines.length <= 1) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % lines.length);
    }, interval * 1000);
    return () => clearInterval(id);
  }, [lines.length, interval, prefersReduce]);

  return (
    <div
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full border"
      style={{
        borderColor: "var(--card-border)",
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full animate-pulse shrink-0"
        style={{ background: "var(--accent-2)" }}
      />
      <div
        className="text-xs sm:text-sm tabular-nums whitespace-nowrap"
        style={{
          color: "var(--muted)",
          fontFamily:
            "var(--font-space-mono), ui-monospace, SFMono-Regular, monospace",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={prefersReduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduce ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {lines[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};
