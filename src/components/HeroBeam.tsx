"use client";

import { useEffect, useRef } from "react";

/**
 * HeroBeam — vertical light beam piercing the hero, Huly-Laser style.
 *
 * Three stacked elements, all positioned absolutely INSIDE the hero
 * section (not the whole page) so it never affects scroll perf elsewhere:
 *
 *   1. Halo — wide soft white glow, gives the beam its "atmosphere"
 *   2. Core — sharp 2px vertical line, brightest mid-height, fades top + bottom
 *   3. Floor scatter — soft horizontal pool at the bottom where the beam
 *      "hits" the page (like the laser scattering on the Huly ref)
 *
 * Mouse parallax: cursor X drives a damped translateX so the beam shifts
 * ±30px with the cursor. A subtle sine-wave drift on top so it's never
 * static. Pure CSS + transform, ~one-cheap-frame to render.
 *
 * Disabled on prefers-reduced-motion.
 */
export const HeroBeam: React.FC = () => {
  const beamRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const scatterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let mouseX = 0.5;
    let easedX = 0.5;
    let raf = 0;
    const start = performance.now();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth;
    };

    const tick = () => {
      easedX += (mouseX - easedX) * 0.05;
      const drift = Math.sin((performance.now() - start) * 0.0005) * 8;
      // Mouse pulls the beam ±30px from center; drift adds a slow ±8px sway.
      const offsetX = (easedX - 0.5) * 60 + drift;
      const t = `translate3d(${offsetX.toFixed(2)}px, 0, 0)`;
      if (beamRef.current) beamRef.current.style.transform = t;
      if (haloRef.current) haloRef.current.style.transform = t;
      if (scatterRef.current) scatterRef.current.style.transform = t;
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
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Halo — wide soft white glow, gives the beam atmosphere. */}
      <div
        ref={haloRef}
        className="absolute top-0 bottom-0 will-change-transform"
        style={{
          left: "calc(50% - 100px)",
          width: "200px",
          background:
            "radial-gradient(ellipse 50% 80% at center, rgba(255,255,255,0.16), rgba(255,255,255,0) 70%)",
          filter: "blur(24px)",
        }}
      />

      {/* Core beam — sharp vertical line, brightest mid-height. */}
      <div
        ref={beamRef}
        className="absolute top-0 bottom-0 will-change-transform"
        style={{
          left: "calc(50% - 1px)",
          width: "2px",
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.35) 12%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0.95) 55%, rgba(255,255,255,0.55) 88%, transparent 100%)",
          boxShadow: "0 0 24px 4px rgba(255,255,255,0.28)",
        }}
      />

      {/* Floor scatter — soft horizontal pool where the beam "lands". */}
      <div
        ref={scatterRef}
        className="absolute bottom-0 will-change-transform"
        style={{
          left: "calc(50% - 320px)",
          width: "640px",
          height: "180px",
          background:
            "radial-gradient(ellipse 50% 100% at center bottom, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 70%)",
          filter: "blur(28px)",
        }}
      />
    </div>
  );
};
