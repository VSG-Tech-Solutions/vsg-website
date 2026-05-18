"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

/**
 * NumberTicker — Magic UI-school count-up.
 *
 * When the element scrolls into view, the displayed number animates
 * from 0 (or `from`) to `value` over a smooth spring curve. Doesn't
 * re-trigger on subsequent scrolls.
 *
 * Pass either:
 *   • `value` (a number) — counts straight to it
 *   • `value` + `suffix` (e.g. "+", "wk", "%", "x")
 *   • `value` + `prefix` (e.g. "$")
 *
 * Use `decimals` for fractional numbers.
 */

type Props = {
  value: number;
  from?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

export const NumberTicker: React.FC<Props> = ({
  value,
  from = 0,
  decimals = 0,
  prefix,
  suffix,
  className = "",
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const motionValue = useMotionValue(from);
  const spring = useSpring(motionValue, {
    damping: 32,
    stiffness: 60,
  });
  const [display, setDisplay] = useState<string>(formatNumber(from, decimals));

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      setDisplay(formatNumber(latest, decimals));
    });
    return unsub;
  }, [spring, decimals]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

function formatNumber(n: number, decimals: number): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}
