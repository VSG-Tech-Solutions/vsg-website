"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

/**
 * SmoothScrollProvider — initialises Lenis once at the app root.
 *
 * Tuned snappier than the defaults so it doesn't feel "delayed":
 *   - duration: 0.85 (down from default 1.2)
 *   - lerp: 0.18 (up from default 0.1 — more responsive to wheel input)
 *   - wheelMultiplier: 1.1 (slight gain so scroll feels punchier)
 *
 * Result: silky momentum without the "rubber-band" lag.
 */
export const SmoothScrollProvider: React.FC = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.4,
      lerp: 0.18,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
};
