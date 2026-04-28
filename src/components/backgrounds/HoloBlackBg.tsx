"use client";

/**
 * HoloBlackBg — quiet editorial backdrop.
 *
 * Pure deep-graphite canvas with one barely-visible cobalt halo at the top
 * and a hairline 1px grid that fades to nothing at the page edges. No motion,
 * no orchestral animation — the Holo aesthetic is built on negative space
 * and confident type, not effects.
 */
export const HoloBlackBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base canvas */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--bg)" }}
      />

      {/* Single soft cobalt halo, top-center, very low opacity */}
      <div
        className="absolute -top-[280px] left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, var(--accent-glow), transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.55,
        }}
      />

      {/* Hairline grid — 1px lines at 64px intervals, faded by radial mask */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 80%)",
        }}
      />

      {/* Bottom fade so content below the hero blends seamlessly */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg) 90%)",
        }}
      />
    </div>
  );
};
