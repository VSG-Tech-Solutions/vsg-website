"use client";

/**
 * HoloBlackBg — pure dark canvas.
 *
 * Just the deep-graphite background. No halo, no grid, no motion. The hero
 * type does all the talking.
 */
export const HoloBlackBg: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{ background: "var(--bg)" }}
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
