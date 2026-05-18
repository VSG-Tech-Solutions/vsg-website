"use client";

import { useEffect, useRef } from "react";

/**
 * HlsBackgroundVideo — full-bleed HLS video that lives behind hero/CTA
 * sections. Loads hls.js dynamically when the browser doesn't ship
 * native HLS support (Safari does; Chrome/Firefox don't).
 *
 * Caller controls overlay + fade — this component just renders the
 * raw <video>. Pass `flipY` to flip the video vertically (used by the
 * footer to mirror the hero).
 */

type Props = {
  src: string;
  flipY?: boolean;
  className?: string;
};

export const HlsBackgroundVideo: React.FC<Props> = ({
  src,
  flipY = false,
  className = "",
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: import("hls.js").default | null = null;

    // Native HLS (Safari, iOS) — easy path.
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return;
    }

    // Fallback — load hls.js on demand.
    let cancelled = false;
    (async () => {
      const Hls = (await import("hls.js")).default;
      if (cancelled) return;
      if (Hls.isSupported()) {
        hls = new Hls({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
      } else {
        // Last-resort: just set src and hope.
        video.src = src;
      }
    })();

    return () => {
      cancelled = true;
      hls?.destroy();
      hls = null;
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden
      className={`absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover ${
        flipY ? "scale-y-[-1]" : ""
      } ${className}`}
    />
  );
};
