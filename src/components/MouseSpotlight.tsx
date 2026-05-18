"use client";

import { useEffect, useRef } from "react";

/**
 * MouseSpotlight — a soft cyan radial glow that follows the cursor across
 * the entire viewport. Mounted once at the SiteShell level; sits as a fixed
 * pointer-events:none layer above page background but below content.
 *
 * Smooth via requestAnimationFrame easing — never lags, never jitters.
 * Disabled on touch devices and prefers-reduced-motion.
 */
export const MouseSpotlight: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (reduce || isTouch) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const eased = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const tick = () => {
      eased.x += (target.x - eased.x) * 0.12;
      eased.y += (target.y - eased.y) * 0.12;
      if (ref.current) {
        ref.current.style.transform = `translate3d(${eased.x - 320}px, ${eased.y - 320}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[1] mix-blend-screen"
      style={{ contain: "layout paint size" }}
    >
      <div
        ref={ref}
        className="w-[640px] h-[640px] will-change-transform"
        style={{
          background:
            "radial-gradient(circle at center, rgba(103, 232, 249, 0.18) 0%, rgba(103, 232, 249, 0.08) 25%, rgba(103, 232, 249, 0) 60%)",
          transform: "translate3d(-1000px, -1000px, 0)",
        }}
      />
    </div>
  );
};
