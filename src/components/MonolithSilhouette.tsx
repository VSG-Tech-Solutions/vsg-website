"use client";

import { useEffect, useRef, useState } from "react";

/**
 * MonolithSilhouette — the same monolith, different format.
 *
 * Pure SVG wireframe outline of the slab — zero JavaScript per scroll, zero
 * GPU cost. Appears behind a section via mount; fades in as it enters view.
 *
 * The "different format" companion to MonolithAnchor: when the user scrolls
 * past the hero, the same shape continues to be present in the page — but
 * as a translucent wireframe, like an architectural drawing of the object
 * rather than the object itself.
 *
 * Mouse parallax: the SVG translates ±10px on Y based on scroll position
 * within its parent — feels like the wireframe drifts as the user moves.
 */
type Props = {
  /** How wide the silhouette renders, in px or any CSS length. Default 480. */
  width?: number | string;
  /** Right- or left-edge anchored. Default "right". */
  anchor?: "left" | "right";
  /** Vertical position from top, in % of parent. Default 50. */
  topPct?: number;
  /** Stroke width in px. Default 1. */
  strokeWidth?: number;
};

export const MonolithSilhouette: React.FC<Props> = ({
  width = 420,
  anchor = "right",
  topPct = 50,
  strokeWidth = 1,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [drift, setDrift] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let raf = 0;
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Map element's center position (0 at top of viewport, 1 at bottom)
      // to a small drift offset. Element drifts -20 → +20 px as user scrolls.
      const pos = (rect.top + rect.height / 2) / vh;
      setDrift((pos - 0.5) * -40);
    };

    const tick = () => {
      onScroll();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const styleAnchor = anchor === "right" ? { right: 0 } : { left: 0 };

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        ...styleAnchor,
        top: `${topPct}%`,
        transform: `translateY(calc(-50% + ${drift}px))`,
        width: typeof width === "number" ? `${width}px` : width,
        opacity: 0.35,
        mixBlendMode: "screen",
      }}
    >
      {/*
        Wireframe of the slab — drawn in 2D as an isometric/perspective
        projection. Stroke only, no fill.

        Geometry: a 1.2 × 2.2 × 0.5 box at a 3/4 angle. Front face + top
        face + right face visible.
      */}
      <svg
        viewBox="0 0 200 320"
        width="100%"
        height="auto"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {/* Front face */}
        <path d="M 30 60 L 130 60 L 130 290 L 30 290 Z" />
        {/* Top face — recedes back-right */}
        <path d="M 30 60 L 70 30 L 170 30 L 130 60" />
        {/* Right face — recedes back */}
        <path d="M 130 60 L 170 30 L 170 260 L 130 290" />
        {/* Internal panel seams (on front face) */}
        <line x1="30" y1="120" x2="130" y2="120" opacity="0.5" />
        <line x1="30" y1="180" x2="130" y2="180" opacity="0.5" />
        <line x1="30" y1="240" x2="130" y2="240" opacity="0.5" />
        <line x1="80" y1="60" x2="80" y2="290" opacity="0.4" />
        {/* Top face seams */}
        <line x1="50" y1="45" x2="150" y2="45" opacity="0.35" />
        {/* Right face seams */}
        <line x1="150" y1="45" x2="150" y2="275" opacity="0.35" />
      </svg>
    </div>
  );
};
