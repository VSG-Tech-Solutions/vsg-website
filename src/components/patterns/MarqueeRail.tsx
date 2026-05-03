"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * MarqueeRail — full-width slow-scrolling typography ticker.
 *
 * Used to communicate the BREADTH of Vantage's modules / topics as a
 * peripheral signal. 60s loop, edge-fade gradient, hairline top + bottom.
 * Does NOT loop on prefers-reduced-motion.
 */

type MarqueeRailProps = {
  /** Items to scroll. Each rendered separated by a center dot. */
  items: string[];
  /** Animation duration, seconds. Default 60 (slow). */
  duration?: number;
};

export const MarqueeRail: React.FC<MarqueeRailProps> = ({
  items,
  duration = 60,
}) => {
  const prefersReduce = useReducedMotion();

  // Duplicate the items so the seamless loop has content to slide into.
  const stream = [...items, ...items];

  return (
    <div
      className="relative w-full overflow-hidden border-t border-b py-6"
      style={{ borderColor: "var(--card-border)" }}
    >
      {/* Edge fade masks */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-32 z-10"
        style={{
          background:
            "linear-gradient(to right, var(--bg), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-32 z-10"
        style={{
          background:
            "linear-gradient(to left, var(--bg), transparent)",
        }}
      />

      {prefersReduce ? (
        <ul
          className="flex items-center gap-12 whitespace-nowrap px-6 text-sm uppercase tracking-[0.22em]"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      ) : (
        <motion.ul
          className="flex items-center gap-12 whitespace-nowrap text-sm uppercase tracking-[0.22em]"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
            width: "max-content",
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {stream.map((it, i) => (
            <li key={i} className="flex items-center gap-12">
              <span>{it}</span>
              <span
                aria-hidden
                className="h-1 w-1 rounded-full"
                style={{ background: "var(--card-border)" }}
              />
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};
