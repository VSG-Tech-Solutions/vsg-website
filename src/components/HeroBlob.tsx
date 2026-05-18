"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

/**
 * HeroBlob — flowing liquid mercury / matte chrome organic form.
 *
 * Lazy-loaded R3F scene. A single sphere with drei's MeshDistortMaterial
 * creates the slow organic morphing — the "blob breathing" feel. PBR
 * material is dark with mid-metalness so the directional rim light catches
 * the curved highlights as they roll. The blob almost disappears against
 * the matte page; the light defines the form.
 *
 * Mouse parallax tilts the sphere toward the cursor — the highlights roll
 * with the user's eye. Subtle ambient morph speed keeps it alive at rest.
 *
 * Auto-unmounts when scrolled out of view (saves GPU on long pages).
 */

const BlobCanvas = dynamic(() => import("./HeroBlobCanvas"), {
  ssr: false,
});

export const HeroBlob: React.FC = () => {
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
      className="relative w-full"
      style={{ height: "min(640px, 80vh)" }}
    >
      {inView && <BlobCanvas />}
    </div>
  );
};
