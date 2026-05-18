"use client";

import { useRef } from "react";
import type { ReactNode } from "react";

/**
 * MagicCard — Magic UI cursor-following gradient.
 *
 * Wrap any card in this; on mouseover, a soft warm gradient orb
 * follows the cursor through the card's surface. Drops away on
 * mouseleave. Pure CSS variables + JS to update them on mousemove,
 * no per-frame React re-renders.
 */

type Props = {
  children: ReactNode;
  className?: string;
  size?: number;       // diameter of the spotlight in px
};

export const MagicCard: React.FC<Props> = ({
  children,
  className = "",
  size = 320,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--opacity", "1");
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--opacity", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative ${className}`}
      style={
        {
          "--mx": "50%",
          "--my": "50%",
          "--opacity": "0",
          "--size": `${size}px`,
        } as React.CSSProperties
      }
    >
      {/* Spotlight overlay — sits ABOVE content but below borders;
          pointer-events-none so it never eats hover. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: "var(--opacity)",
          background:
            "radial-gradient(var(--size) circle at var(--mx) var(--my), rgba(255,107,44,0.18), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
};
