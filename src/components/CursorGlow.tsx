"use client";

import { useEffect, useRef } from "react";

/**
 * CursorGlow — a small cyan-bordered ring that follows the mouse and grows
 * over interactive targets (`a`, `button`, `[role=button]`, `[data-cursor]`).
 *
 * Works alongside the system cursor (we don't hide it). The ring trails with
 * gentle damping; over interactive elements it scales 1.6× and glows brighter.
 *
 * Disabled on touch + reduced-motion.
 */
export const CursorGlow: React.FC = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const noHover = window.matchMedia("(hover: none)").matches;
    if (reduce || noHover) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dotPos = { x: target.x, y: target.y };
    const ringPos = { x: target.x, y: target.y };
    let ringScale = 1;
    let ringScaleTarget = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = !!t.closest(
        "a, button, [role='button'], [data-cursor='hover'], input, textarea, select"
      );
      ringScaleTarget = interactive ? 1.7 : 1;
    };

    const tick = () => {
      // dot is near-instant
      dotPos.x += (target.x - dotPos.x) * 0.6;
      dotPos.y += (target.y - dotPos.y) * 0.6;
      // ring trails
      ringPos.x += (target.x - ringPos.x) * 0.18;
      ringPos.y += (target.y - ringPos.y) * 0.18;
      ringScale += (ringScaleTarget - ringScale) * 0.18;

      if (dot.current) {
        dot.current.style.transform = `translate3d(${dotPos.x - 3}px, ${
          dotPos.y - 3
        }px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x - 18}px, ${
          ringPos.y - 18
        }px, 0) scale(${ringScale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        ref={ring}
        className="pointer-events-none fixed top-0 left-0 z-[60] w-9 h-9 rounded-full will-change-transform mix-blend-screen"
        style={{
          border: "1px solid rgba(103, 232, 249, 0.55)",
          boxShadow: "0 0 24px rgba(103, 232, 249, 0.25)",
          transition: "border-color 200ms ease, box-shadow 200ms ease",
        }}
      />
      <div
        aria-hidden
        ref={dot}
        className="pointer-events-none fixed top-0 left-0 z-[61] w-1.5 h-1.5 rounded-full will-change-transform"
        style={{
          background: "rgba(103, 232, 249, 0.95)",
          boxShadow: "0 0 12px rgba(103, 232, 249, 0.7)",
        }}
      />
    </>
  );
};
