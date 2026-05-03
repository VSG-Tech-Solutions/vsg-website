"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Section — site-wide vertical rhythm primitive.
 *
 * Every page is a stack of <Section> wrappers. Consistent vertical breath
 * (py-32 mobile → py-48 desktop), max-w-6xl content column with 6/8/10 gutter.
 * Optional hairline top border for section-to-section transitions.
 *
 * The whole site reads as one editorial book because every section uses the
 * same wrapper. Don't bypass this for one-off layouts.
 */

type SectionProps = {
  children: ReactNode;
  /** Hairline top border. Default true. Set false on the very first section
   *  after the hero. */
  divider?: boolean;
  /** Tighter rhythm — useful for hero or compact subpages. */
  compact?: boolean;
  /** Even more breath — for end-of-page or marquee sections. */
  spacious?: boolean;
  /** Override max width. Default 6xl. Use "full" for edge-to-edge marquees. */
  width?: "6xl" | "5xl" | "4xl" | "full";
  /** ID for in-page anchors. */
  id?: string;
  /** Extra Tailwind classes on the inner container. */
  className?: string;
  /** Reveal on scroll-into-view. Default true. */
  reveal?: boolean;
};

const widthMap = {
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  full: "max-w-none",
};

const ease = [0.16, 1, 0.3, 1] as const;

export const Section: React.FC<SectionProps> = ({
  children,
  divider = true,
  compact = false,
  spacious = false,
  width = "6xl",
  id,
  className = "",
  reveal = true,
}) => {
  const prefersReduce = useReducedMotion();

  const padY = compact
    ? "py-20 sm:py-28"
    : spacious
      ? "py-32 sm:py-48"
      : "py-24 sm:py-36 lg:py-44";

  const containerCls =
    width === "full"
      ? "px-0"
      : `mx-auto ${widthMap[width]} px-5 sm:px-6 lg:px-8`;

  const inner = (
    <div className={`${containerCls} ${className}`}>{children}</div>
  );

  return (
    <section
      id={id}
      className={`relative w-full ${padY} ${
        divider ? "border-t" : ""
      }`}
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderColor: divider ? "var(--card-border)" : undefined,
      }}
    >
      {reveal && !prefersReduce ? (
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
        >
          {inner}
        </motion.div>
      ) : (
        inner
      )}
    </section>
  );
};
