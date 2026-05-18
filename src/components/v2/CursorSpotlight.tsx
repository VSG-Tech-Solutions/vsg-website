"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * CursorSpotlight — soft warm spotlight that tracks the cursor.
 *
 * Lives at z-0 fixed across the entire viewport. Light-tone sections
 * cover it (their solid backgrounds win); dark sections show it
 * bleeding through. Uses gsap.quickTo for buttery-smooth lag.
 *
 * Two layers: a sharp inner core and a wide soft halo. Both follow
 * the same coordinates with the same easing, so the highlight always
 * stays anchored to a single perceived light source.
 */

const ORANGE_CORE = "rgba(255, 200, 140, 0.18)";
const ORANGE_HALO = "rgba(255, 107, 44, 0.10)";

export const CursorSpotlight: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Skip on touch / no-pointer environments.
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const setX = gsap.quickTo(ref.current, "x", {
      duration: 0.55,
      ease: "power2.out",
    });
    const setY = gsap.quickTo(ref.current, "y", {
      duration: 0.55,
      ease: "power2.out",
    });

    const onMove = (e: MouseEvent) => {
      // The element is 800px tall/wide; offset half so it centres on
      // the cursor.
      setX(e.clientX - 400);
      setY(e.clientY - 400);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-0"
      style={{
        width: 800,
        height: 800,
        willChange: "transform",
        // Two stacked radial gradients in the same element — the core
        // cream highlight + the wider warm halo behind.
        background: `
          radial-gradient(circle at 50% 50%, ${ORANGE_CORE} 0%, transparent 25%),
          radial-gradient(circle at 50% 50%, ${ORANGE_HALO} 0%, transparent 50%)
        `,
        filter: "blur(20px)",
      }}
    />
  );
};
