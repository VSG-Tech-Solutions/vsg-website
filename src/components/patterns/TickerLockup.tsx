"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * TickerLockup — three-stat horizontal strip with count-up animation.
 *
 * Each stat has a giant number, a unit suffix, a one-line claim. Numbers
 * count up from 0 to value when scrolled into view (once). Hairline
 * dividers between columns. Used for cohort/trust strip below hero.
 */

export type TickerStat = {
  /** The final value to count up to (numeric). */
  value: number;
  /** Optional prefix (e.g. "R", "+"). */
  prefix?: string;
  /** Optional suffix (e.g. "%", " weeks", "/5"). */
  suffix?: string;
  /** Tiny eyebrow above the number. */
  label: string;
  /** One-line claim under the number. */
  description: string;
};

type TickerLockupProps = {
  stats: TickerStat[];
};

const DURATION = 1400; // ms

export const TickerLockup: React.FC<TickerLockupProps> = ({ stats }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div
      ref={ref}
      className="grid grid-cols-1 sm:grid-cols-3"
      style={{ background: "var(--card-border)", gap: "1px" }}
    >
      {stats.map((stat, i) => (
        <Stat key={i} stat={stat} active={inView} />
      ))}
    </div>
  );
};

const Stat: React.FC<{ stat: TickerStat; active: boolean }> = ({
  stat,
  active,
}) => {
  const prefersReduce = useReducedMotion();
  const [n, setN] = useState(prefersReduce ? stat.value : 0);

  useEffect(() => {
    if (!active || prefersReduce) {
      setN(stat.value);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setN(stat.value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, stat.value, prefersReduce]);

  const display =
    stat.value % 1 === 0 ? Math.round(n).toString() : n.toFixed(1);

  return (
    <div className="px-6 py-12 sm:py-14" style={{ background: "var(--bg)" }}>
      <div
        className="text-[10px] uppercase tracking-[0.22em]"
        style={{
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        {stat.label}
      </div>
      <div
        className="mt-3 font-extrabold tabular-nums"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
          fontSize: "clamp(2.5rem, 5vw, 4rem)",
          lineHeight: 1,
        }}
      >
        {stat.prefix}
        {display}
        {stat.suffix && (
          <span
            style={{
              color: "var(--muted-2)",
              fontWeight: 500,
              fontSize: "0.5em",
              marginLeft: "0.15em",
            }}
          >
            {stat.suffix}
          </span>
        )}
      </div>
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        {stat.description}
      </p>
    </div>
  );
};
