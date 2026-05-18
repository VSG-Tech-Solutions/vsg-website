"use client";

import { useEffect, useRef } from "react";

/**
 * UnicornBackdrop — wraps a Unicorn Studio scene as a hero backdrop.
 *
 * Loads the Unicorn Studio runtime (a single script, ~30 KB) once per
 * session, then mounts the scene by Project ID into a sized container.
 * Used as Layer 0 behind the hero copy so the cinematic ambient effect
 * fills the whole viewport without fighting the rest of the page.
 *
 * Scene: "Beyond Horizons (Remix)" — dark canvas, single cyan glow rising
 * from the horizon. Recolored to VSG brand:
 *   - Beam + Beam (Flare) + Nebula → #67E8F9 (accent-2 cyan)
 *   - Background → #040408 (--bg)
 *
 * The runtime is loaded with the IIFE Unicorn Studio publishes; we just
 * guard against double-init in the React lifecycle.
 */

// Pull from the GitHub default branch (no version pin) — jsDelivr returned 503
// on the older pinned tag. This always serves the latest published runtime.
const UNICORN_RUNTIME_SRC =
  "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js/dist/unicornStudio.umd.js";

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized: boolean;
      init: () => void;
      destroy?: () => void;
    };
  }
}

type Props = {
  projectId: string;
  className?: string;
};

export const UnicornBackdrop: React.FC<Props> = ({
  projectId,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already loaded in another mount — just (re-)init.
    if (window.UnicornStudio) {
      try {
        window.UnicornStudio.init();
      } catch {
        // ignore — runtime guards itself.
      }
      return;
    }

    window.UnicornStudio = { isInitialized: false, init: () => {} };
    const script = document.createElement("script");
    script.src = UNICORN_RUNTIME_SRC;
    script.async = true;
    script.onload = () => {
      if (window.UnicornStudio && !window.UnicornStudio.isInitialized) {
        window.UnicornStudio.init();
        window.UnicornStudio.isInitialized = true;
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      data-us-project={projectId}
      className={className}
      aria-hidden
    />
  );
};
