"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * HeroAura — the brand-level hero anchor.
 *
 * NOT a product mockup. NOT a 3D shape. A pure-CSS atmospheric piece:
 *   • One soft glowing orb (radial-gradient div) — the "moon"
 *   • Two smaller satellite dots orbiting at different speeds
 *   • Subtle dot-grid backdrop visible only on close inspection (carbon fibre)
 *   • All white-on-black, mix-blend screen so it interacts with the page
 *
 * Mouse parallax: cursor moves the orb ±20px and satellites ±35px on opposite
 * axes (depth illusion). Slow drift + pulse on the orb so it never feels frozen.
 *
 * Reads as "aura" — atmospheric, restrained, brand-level, not product-level.
 * Can be repeated on subpages with different positions / sizes if needed.
 */
export const HeroAura: React.FC = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const sat1Ref = useRef<HTMLDivElement>(null);
  const sat2Ref = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) return;

    let mx = 0.5;
    let my = 0.5;
    let ex = 0.5;
    let ey = 0.5;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const rect = wrapRef.current?.getBoundingClientRect();
      if (!rect) return;
      // Local coordinates so the orb tracks the cursor's position relative
      // to the hero, not the whole page. Outside the hero → falls back to
      // a soft rest position via easing.
      mx = (e.clientX - rect.left) / rect.width;
      my = (e.clientY - rect.top) / rect.height;
    };

    const tick = () => {
      ex += (mx - ex) * 0.04;
      ey += (my - ey) * 0.04;
      const dx = (ex - 0.5) * 40;
      const dy = (ey - 0.5) * 40;

      if (orbRef.current) {
        orbRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      }
      // Satellites move opposite + further for depth.
      if (sat1Ref.current) {
        sat1Ref.current.style.transform = `translate3d(${-dx * 1.5}px, ${
          -dy * 1.2
        }px, 0)`;
      }
      if (sat2Ref.current) {
        sat2Ref.current.style.transform = `translate3d(${-dx * 0.8}px, ${
          dy * 1.6
        }px, 0)`;
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
      ref={wrapRef}
      aria-hidden
      className="relative w-full"
      style={{ height: "min(560px, 70vh)" }}
    >
      {/* Backdrop — a faint dot grid that suggests depth behind the orb.
          Only renders inside this column; doesn't bleed across the hero. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, rgba(255,255,255,0.045) 1px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
          opacity: 0.6,
        }}
      />

      {/* Hairline ring — etched architectural note */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "78%",
          aspectRatio: "1 / 1",
          border: "1px solid rgba(255, 255, 255, 0.045)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "52%",
          aspectRatio: "1 / 1",
          border: "1px solid rgba(255, 255, 255, 0.07)",
        }}
      />

      {/* Main orb — soft white glow, slow pulse */}
      <motion.div
        ref={orbRef}
        className="absolute top-1/2 left-1/2 will-change-transform"
        style={{
          marginTop: "-20%",
          marginLeft: "-20%",
          width: "40%",
          aspectRatio: "1 / 1",
          background:
            "radial-gradient(circle at 38% 32%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.55) 18%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0.04) 60%, rgba(255,255,255,0) 78%)",
          filter: "blur(0.5px)",
          mixBlendMode: "screen",
        }}
        animate={{
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 6.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Halo around the orb — wider, softer */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 pointer-events-none"
        style={{
          marginTop: "-32%",
          marginLeft: "-32%",
          width: "64%",
          aspectRatio: "1 / 1",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 35%, rgba(255,255,255,0) 70%)",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
      />

      {/* Satellite 1 — small drifting dot, upper-right */}
      <motion.div
        ref={sat1Ref}
        className="absolute will-change-transform"
        style={{
          top: "22%",
          right: "16%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,255,255,0) 70%)",
          mixBlendMode: "screen",
        }}
        animate={{
          y: [0, -12, 0, 8, 0],
          opacity: [0.5, 1, 0.7, 0.85, 0.5],
        }}
        transition={{
          duration: 9,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Satellite 2 — even smaller, lower-left */}
      <motion.div
        ref={sat2Ref}
        className="absolute will-change-transform"
        style={{
          bottom: "26%",
          left: "20%",
          width: 4,
          height: 4,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.85), rgba(255,255,255,0) 70%)",
          mixBlendMode: "screen",
        }}
        animate={{
          y: [0, 10, 0, -6, 0],
          opacity: [0.4, 0.85, 0.5, 0.75, 0.4],
        }}
        transition={{
          duration: 11,
          ease: "easeInOut",
          repeat: Infinity,
          delay: 0.8,
        }}
      />

      {/* Hairline mark — a tiny serif / measurement tick at the right edge,
          like a precision mark on a luxury watch face. Static, ornamental. */}
      <div
        aria-hidden
        className="absolute top-1/2 right-[6%] -translate-y-1/2 flex flex-col items-center gap-2"
        style={{ color: "var(--muted-2)" }}
      >
        <div
          className="w-px h-3"
          style={{ background: "rgba(255,255,255,0.4)" }}
        />
        <div
          className="text-[9px] tracking-[0.4em] uppercase"
          style={{ writingMode: "vertical-rl" }}
        >
          VSG · ZA
        </div>
        <div
          className="w-px h-3"
          style={{ background: "rgba(255,255,255,0.4)" }}
        />
      </div>
    </div>
  );
};
