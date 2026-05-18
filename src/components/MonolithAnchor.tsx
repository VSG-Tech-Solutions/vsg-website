"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

/**
 * MonolithAnchor — the hero-only 3D anchor.
 *
 * A single dark matte slab rendered with @react-three/fiber. Slow rotation,
 * mouse parallax tilt, edge highlight. The object that anchors the brand.
 *
 * Perf strategy:
 *   • Lazy-loaded with next/dynamic — Three.js doesn't bloat the initial JS.
 *   • SSR disabled — Canvas can't render server-side.
 *   • Mounts/unmounts via IntersectionObserver — when the hero scrolls out of
 *     view, the canvas unmounts and stops consuming GPU. When scrolled back
 *     into view, it mounts fresh.
 *
 * The "different format" companion (a wireframe SVG of the same shape) lives
 * in MonolithSilhouette.tsx and is shown behind later sections on scroll.
 */

const MonolithCanvas = dynamic(() => import("./MonolithCanvas"), {
  ssr: false,
});

export const MonolithAnchor: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = wrapRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      // 150px before/after viewport — keep the canvas warm during normal
      // scroll, only kill it once the hero is well out of view.
      { rootMargin: "150px 0px 150px 0px", threshold: 0 }
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
      {inView && <MonolithCanvas />}
    </div>
  );
};
