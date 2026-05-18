"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal — drop-in scroll reveal wrapper.
 *
 * Applies a refined fade-up + slight blur unblur as content enters the
 * viewport. One curve, used everywhere, so the whole site feels coherent
 * as you scroll.
 *
 * - Stagger children when `as="stagger"` is set; the parent fades while
 *   each child reveals at 0.08s intervals.
 * - Honours prefers-reduced-motion (instant render, no transform).
 * - Triggers once and stays revealed — no jitter on scroll-back.
 */
type RevealProps = {
  children: ReactNode;
  /** Stagger direct children with the same reveal curve. */
  stagger?: boolean;
  /** Initial vertical offset, px. Default 24. */
  y?: number;
  /** Reveal delay (s) — useful for sequencing top-of-section eyebrow → headline → body. */
  delay?: number;
  /** Override the wrapping element. Default "div". */
  as?: "div" | "section" | "article" | "header" | "footer" | "ul" | "ol" | "li";
  /** Additional Tailwind classes on the wrapper. */
  className?: string;
  /** Inline style passthrough (e.g. background, color). */
  style?: React.CSSProperties;
};

const ease = [0.16, 1, 0.3, 1] as const;

export const Reveal: React.FC<RevealProps> = ({
  children,
  stagger = false,
  y = 24,
  delay = 0,
  as = "div",
  className,
  style,
}) => {
  const prefersReduce = useReducedMotion();

  if (prefersReduce) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tag = as as any;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const parent: Variants = stagger
    ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
            duration: 0.6,
            ease,
          },
        },
      }
    : {
        hidden: { opacity: 0, y, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.85, ease, delay },
        },
      };

  // motion supports the same element variants as plain motion.div etc.
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      className={className}
      style={style}
      variants={parent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </Component>
  );
};

/**
 * RevealItem — a child of <Reveal stagger>. Matches the parent's curve
 * with the per-child fade-up-blur.
 */
type RevealItemProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Initial vertical offset, px. Default 18. */
  y?: number;
  as?: "div" | "p" | "span" | "li" | "h1" | "h2" | "h3";
};

export const RevealItem: React.FC<RevealItemProps> = ({
  children,
  className,
  style,
  y = 18,
  as = "div",
}) => {
  const prefersReduce = useReducedMotion();
  if (prefersReduce) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Tag = as as any;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }
  const variants: Variants = {
    hidden: { opacity: 0, y, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease },
    },
  };
  const Component = motion[as] as typeof motion.div;
  return (
    <Component className={className} style={style} variants={variants}>
      {children}
    </Component>
  );
};
