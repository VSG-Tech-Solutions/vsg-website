"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * SplitTextReveal — splits a string of text into words and reveals them
 * on mount with a staggered fade + slide-up + slight blur-clear.
 *
 * Use it for hero h1s. Whitespace and line breaks are preserved.
 */
type Props = {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  /** Stagger between words in seconds. */
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  style?: React.CSSProperties;
};

const ease = [0.16, 1, 0.3, 1] as const;

export const SplitTextReveal: React.FC<Props> = ({
  children,
  className,
  delay = 0,
  duration = 0.9,
  stagger = 0.06,
  as = "h1",
  style,
}) => {
  const reduce = useReducedMotion();
  const words = useMemo(() => children.split(/(\s+)/), [children]);
  const Tag = motion[as as keyof typeof motion] as React.ElementType;

  if (reduce) {
    const Plain = as as React.ElementType;
    return (
      <Plain className={className} style={style}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag className={className} style={style} aria-label={children}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        return (
          <span
            key={i}
            aria-hidden
            style={{ display: "inline-block", overflow: "hidden" }}
          >
            <motion.span
              style={{ display: "inline-block", willChange: "transform, opacity, filter" }}
              initial={{ y: "115%", opacity: 0, filter: "blur(8px)" }}
              animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
              transition={{
                duration,
                ease,
                delay: delay + i * stagger * 0.5,
              }}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
};
