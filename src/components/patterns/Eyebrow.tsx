"use client";

import type { ReactNode } from "react";

/**
 * Eyebrow — 11px uppercase tracked label that sits above every H2.
 *
 * Two variants: "rule" (default) shows a hairline rule on the left, "dot"
 * shows a small accent pulse dot. Pick consistently per page family — pages
 * mixing both feel busier.
 */

type EyebrowProps = {
  children: ReactNode;
  variant?: "rule" | "dot" | "plain";
  className?: string;
};

export const Eyebrow: React.FC<EyebrowProps> = ({
  children,
  variant = "rule",
  className = "",
}) => (
  <div
    className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] ${className}`}
    style={{
      color: "var(--muted-2)",
      fontFamily: "var(--font-body)",
    }}
  >
    {variant === "rule" && (
      <span
        aria-hidden
        className="h-px w-8 shrink-0"
        style={{ background: "var(--accent-2)" }}
      />
    )}
    {variant === "dot" && (
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full shrink-0 animate-pulse"
        style={{ background: "var(--accent-2)" }}
      />
    )}
    <span style={{ color: "var(--accent-2)" }}>{children}</span>
  </div>
);
