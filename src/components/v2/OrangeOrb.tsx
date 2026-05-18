"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * OrangeOrb — site-wide signature element.
 *
 * Replaces the thin vertical beam with a volumetric, 3D-feeling orange
 * "sun" that drifts diagonally across the viewport as you scroll AND
 * subtly tracks the cursor. Light-tone sections cover it (z-0 behind
 * solid section backgrounds); dark sections let it bleed through.
 *
 * The 3D feel comes from layered radial gradients with multiple stops
 * — bright core fading through warm amber out into deep maroon out
 * into nothing, with a subtle inner highlight that breathes.
 */

const ORANGE = "#FF6B2C";

export const OrangeOrb: React.FC = () => {
  const orbRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!orbRef.current) return;
    const ctx = gsap.context(() => {
      // Slow breathing — the orb scales up + down forever
      gsap.to(innerRef.current, {
        scale: 1.06,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }, orbRef);

    // Quick-to setters — performant cursor-follow + scroll-follow
    const setX = gsap.quickTo(orbRef.current, "x", { duration: 1.4, ease: "power2.out" });
    const setY = gsap.quickTo(orbRef.current, "y", { duration: 1.4, ease: "power2.out" });

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const apply = () => {
      // Scroll drives a gentle diagonal drift — orb travels left as
      // user scrolls down, so it "moves through" the page.
      const scrollOffsetX = -scrollY * 0.18;
      const scrollOffsetY = scrollY * 0.10;
      // Cursor adds a subtle parallax — small, never aggressive
      const cursorOffsetX = (mouseX - window.innerWidth / 2) * 0.04;
      const cursorOffsetY = (mouseY - window.innerHeight / 2) * 0.04;
      setX(scrollOffsetX + cursorOffsetX);
      setY(scrollOffsetY + cursorOffsetY);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      apply();
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      apply();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    apply();

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      aria-hidden
      className="fixed top-0 right-0 z-0 pointer-events-none"
      style={{
        width: 1200,
        height: 1200,
        transform: "translate(20%, -25%)",
        willChange: "transform",
      }}
    >
      {/* Layered radial stops give the orb its volumetric depth */}
      <div
        ref={innerRef}
        className="relative w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 38% 38%, rgba(255, 200, 140, 0.65) 0%, rgba(255, 180, 100, 0.40) 8%, rgba(255, 107, 44, 0.35) 22%, rgba(180, 40, 0, 0.25) 42%, rgba(60, 10, 0, 0.10) 58%, rgba(0,0,0,0) 70%)
          `,
          filter: "blur(40px)",
          willChange: "transform",
        }}
      />
      {/* Inner highlight — small bright nucleus, gives the 3D core */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 36% 36%, rgba(255, 220, 180, 0.55) 0%, rgba(255, 220, 180, 0) 18%)`,
          filter: "blur(60px)",
          mixBlendMode: "screen",
        }}
      />
      {/* Outer rim glow — extends the volume into the surrounding dark */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 40% 40%, rgba(255, 107, 44, 0.18) 28%, rgba(255, 107, 44, 0) 56%)`,
          filter: "blur(80px)",
        }}
      />
    </div>
  );
};
