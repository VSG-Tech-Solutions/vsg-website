"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * ShimmerButton — Magic UI shimmer pill.
 *
 * A button/link with a continuous shimmer ring travelling around its
 * border. Built with two stacked layers:
 *   1. Outer rotating gradient ring (the shimmer)
 *   2. Inner solid pill (the actual button surface)
 *
 * Use as a drop-in replacement for the primary CTAs on the homepage.
 */

type Props = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  className?: string;
};

export const ShimmerButton: React.FC<Props> = ({
  href,
  onClick,
  children,
  className = "",
}) => {
  const inner = (
    <span
      className={`relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-transform duration-200 hover:scale-[1.04] ${className}`}
      style={{
        background: "linear-gradient(180deg, #FF8A4F 0%, #FF6B2C 100%)",
        boxShadow:
          "0 14px 40px -10px rgba(255,107,44,0.6), inset 0 1px 0 rgba(255,255,255,0.20)",
      }}
    >
      {/* Shimmer ring — sits behind the button via a clip-path trick:
          a rotating linear-gradient masked to the button's outer edge */}
      <span
        aria-hidden
        className="absolute inset-[-2px] rounded-full pointer-events-none"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.55) 30deg, transparent 60deg, transparent 360deg)",
          animation: "vsg-shimmer 2.4s linear infinite",
          zIndex: -1,
        }}
      />
      <style>{`
        @keyframes vsg-shimmer {
          to { transform: rotate(360deg); }
        }
      `}</style>
      {children}
    </span>
  );

  if (href)
    return (
      <Link href={href} className="group relative inline-flex items-center">
        {inner}
      </Link>
    );

  return (
    <button
      onClick={onClick}
      className="group relative inline-flex items-center cursor-pointer"
      type="button"
    >
      {inner}
    </button>
  );
};
