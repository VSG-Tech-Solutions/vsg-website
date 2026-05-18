"use client";

/**
 * BorderBeam — Magic UI animated traveling border light.
 *
 * Drop inside a `position: relative; overflow: hidden` parent. A bright
 * gradient ribbon travels around the inner border of the parent on a
 * continuous loop, creating the "glowing border" effect.
 *
 * Implemented with a single conic-gradient pseudo-layer that rotates;
 * the parent's border-radius clips it to the outline.
 */

type Props = {
  size?: number;       // length of the beam segment in degrees of the conic
  duration?: number;   // seconds for one full lap
  delay?: number;      // start offset
  color?: string;
  className?: string;
};

export const BorderBeam: React.FC<Props> = ({
  duration = 8,
  delay = 0,
  color = "#FF6B2C",
  className = "",
}) => {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 rounded-[inherit] ${className}`}
      style={{
        // Border-only via mask: a 2px-thick ring on the inside edge
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        padding: 1.5,
      }}
    >
      <div
        className="absolute inset-[-50%] rounded-full"
        style={{
          background: `conic-gradient(from 0deg, transparent 0deg, transparent 290deg, ${color} 320deg, ${color}cc 340deg, ${color} 360deg)`,
          animation: `vsg-border-beam ${duration}s linear ${delay}s infinite`,
          willChange: "transform",
        }}
      />
      <style>{`
        @keyframes vsg-border-beam {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
