"use client";

import { useEffect, useRef } from "react";

/**
 * GlobalAura — pure CSS / rAF version. Replaces the previous fullscreen
 * fragment-shader canvas, which was tanking scroll perf on integrated GPUs.
 *
 * One fixed div with a single radial-gradient. A rAF loop translates it to
 * follow:
 *   • the cursor (eased)
 *   • a path of waypoints driven by page-scroll progress
 *
 * Result: the cyan glow still "travels" with the user across the entire
 * site — but it's GPU-cheap (single layer, transform-only animation, no
 * per-pixel shader). Runs at native 60fps without competing with scroll.
 *
 * Gracefully disables on prefers-reduced-motion.
 */

// Waypoints in viewport-relative coordinates (0..1).
// Same idea as the shader version's path: glow orbits the screen as you
// scroll the page top → bottom.
const WAYPOINTS: [number, number][] = [
  [0.5, 0.62],   // hero — glow at lower-center
  [0.85, 0.4],   // mid  — glow drifts to the right
  [0.18, 0.58],  // dive — glow sweeps to the left
  [0.5, 0.25],   // deeper — glow rises toward the top
  [0.5, 0.85],   // bottom — glow back down
];

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const positionForScroll = (s: number): [number, number] => {
  const seg = (WAYPOINTS.length - 1) * s;
  const i = Math.min(WAYPOINTS.length - 2, Math.floor(seg));
  const t = seg - i;
  // Smoothstep
  const k = t * t * (3 - 2 * t);
  const [ax, ay] = WAYPOINTS[i];
  const [bx, by] = WAYPOINTS[i + 1];
  return [lerp(ax, bx, k), lerp(ay, by, k)];
};

type Props = {
  /** Reserved for future presets — current build is a single horizon glow. */
  scene?: "horizon";
};

export const GlobalAura: React.FC<Props> = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const target = { x: 0.5, y: 0.5 };  // mouse 0..1
    const eased = { x: 0.5, y: 0.5 };
    let scrollProg = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = e.clientY / window.innerHeight;
    };
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      scrollProg = Math.min(1, Math.max(0, window.scrollY / max));
    };

    const tick = () => {
      eased.x += (target.x - eased.x) * 0.06;
      eased.y += (target.y - eased.y) * 0.06;

      const [sx, sy] = positionForScroll(scrollProg);
      // 70% scroll waypoint, 30% mouse parallax. Mouse is felt but doesn't
      // dominate when the user is actively reading at a given position.
      const fx = sx * 0.7 + eased.x * 0.3;
      const fy = sy * 0.7 + eased.y * 0.3;

      const px = fx * window.innerWidth;
      const py = fy * window.innerHeight;

      if (ref.current) {
        ref.current.style.transform = `translate3d(${px - 600}px, ${
          py - 600
        }px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0, background: "var(--bg)" }}
    >
      <div
        ref={ref}
        className="will-change-transform"
        style={{
          width: "1200px",
          height: "1200px",
          // Two stacked radial gradients — a tight bright core + wide soft halo.
          background: `
            radial-gradient(circle at center, rgba(103, 232, 249, 0.55) 0%, rgba(103, 232, 249, 0.18) 18%, rgba(103, 232, 249, 0) 45%),
            radial-gradient(circle at center, rgba(103, 232, 249, 0.10) 0%, rgba(103, 232, 249, 0.04) 35%, rgba(103, 232, 249, 0) 65%)
          `,
          filter: "blur(60px)",
          mixBlendMode: "screen",
          transform: "translate3d(-1000px, -1000px, 0)",
        }}
      />
    </div>
  );
};
