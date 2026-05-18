"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

/**
 * HeroOcean — animated dark wave surface that fills the hero as a backdrop.
 *
 * Lazy-loaded R3F canvas. A tilted plane with vertex-shader displacement
 * produces a slowly-undulating dark "ocean" receding to a horizon. Wave
 * crests pick up a faint white edge highlight; far edges fade to black for
 * depth. Mouse parallax tilts the wave subtly toward the cursor.
 *
 * Mounts/unmounts via IntersectionObserver so the GPU isn't doing wave
 * math while the user is reading the rest of the page.
 *
 * Layered behind hero copy. Light streaks live in a separate SVG overlay
 * (LightStreaks) so they composite cleanly over both the wave and any
 * future video / image background swap.
 */

const OceanCanvas = dynamic(() => import("./HeroOceanCanvas"), {
  ssr: false,
});

export const HeroOcean: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px 0px 200px 0px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
    >
      {inView && <OceanCanvas />}
    </div>
  );
};
