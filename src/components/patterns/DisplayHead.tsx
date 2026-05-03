"use client";

import type { ReactNode } from "react";

/**
 * DisplayHead — site-wide display headline primitive.
 *
 * Variants:
 *   "h1"      — 56-100px, hero only. -0.025em tracking, 1.02 line-height.
 *   "h2"      — 36-64px, every section heading. -0.02em tracking.
 *   "h3"      — 22-32px, sub-headings inside sections.
 *
 * `accent` highlights a phrase in cyan-2 with no extra styling — keeps the
 * typography flat and editorial; never apply colored gradients to display
 * type on this design.
 */

type DisplayHeadProps = {
  level?: "h1" | "h2" | "h3";
  children: ReactNode;
  /** Optional phrase rendered in --accent-2. Append after `children`. */
  accent?: ReactNode;
  className?: string;
};

const sizeMap = {
  h1: "text-[2.6rem] sm:text-[4.5rem] lg:text-[6rem]",
  h2: "text-[2rem] sm:text-[3rem] lg:text-[3.75rem]",
  h3: "text-[1.4rem] sm:text-[1.75rem] lg:text-[2rem]",
};

const trackingMap = {
  h1: "-0.025em",
  h2: "-0.02em",
  h3: "-0.015em",
};

const lineHeightMap = {
  h1: "1.02",
  h2: "1.05",
  h3: "1.15",
};

export const DisplayHead: React.FC<DisplayHeadProps> = ({
  level = "h2",
  children,
  accent,
  className = "",
}) => {
  const Tag = level as React.ElementType;
  return (
    <Tag
      className={`font-extrabold ${sizeMap[level]} ${className}`}
      style={{
        fontFamily: "var(--font-display)",
        color: "var(--fg)",
        letterSpacing: trackingMap[level],
        lineHeight: lineHeightMap[level],
      }}
    >
      {children}
      {accent ? (
        <>
          {" "}
          <span style={{ color: "var(--accent-2)" }}>{accent}</span>
        </>
      ) : null}
    </Tag>
  );
};
