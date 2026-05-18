"use client";

import type { ReactNode } from "react";
import { BorderBeam } from "./BorderBeam";

/**
 * ProductMockupFrame — polished "window chrome" container.
 *
 * Wraps any product UI mockup with a Linear/Frame.io-style frame:
 * dark surface, hairline border, soft inner highlight, dramatic
 * drop shadow, and a small chrome bar at the top with traffic-light
 * dots + a mono URL fragment.
 *
 * The actual product UI lives in `children`. This component is just
 * the picture frame.
 */

type Props = {
  /** Mono-style fake URL shown in the top chrome bar. */
  url?: string;
  /** Tab label shown next to the URL (optional). */
  tab?: string;
  /** Status pill text on the right side of the chrome (optional). */
  status?: string;
  /** Inner content — the product UI. */
  children: ReactNode;
  /** Extra className for the outer frame. */
  className?: string;
  /** When true, renders an animated BorderBeam light traveling around
   *  the outline. Off by default. */
  borderBeam?: boolean;
};

export const ProductMockupFrame: React.FC<Props> = ({
  url = "vsg.app / procurement",
  tab,
  status = "Live",
  children,
  className = "",
  borderBeam = false,
}) => {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background:
          "linear-gradient(180deg, hsl(0 0% 9%) 0%, hsl(0 0% 6%) 100%)",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 50px 120px -30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Top chrome bar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{
          borderColor: "rgba(255,255,255,0.06)",
          background:
            "linear-gradient(180deg, hsl(0 0% 11%) 0%, hsl(0 0% 9%) 100%)",
        }}
      >
        {/* Traffic-light dots */}
        <div className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.10)" }}
          />
        </div>

        {/* Mono URL */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted">
          <span>{url}</span>
          {tab && (
            <>
              <span style={{ color: "rgba(255,255,255,0.30)" }}>›</span>
              <span className="text-text-primary">{tab}</span>
            </>
          )}
        </div>

        {/* Status pill */}
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.22em] font-bold"
          style={{
            background: "rgba(255,107,44,0.10)",
            border: "1px solid rgba(255,107,44,0.28)",
            color: "#FF6B2C",
          }}
        >
          <span
            className="w-1 h-1 rounded-full animate-pulse"
            style={{ background: "#FF6B2C" }}
          />
          {status}
        </span>
      </div>

      {/* Inner content */}
      <div className="relative">{children}</div>

      {/* Optional traveling border beam */}
      {borderBeam && <BorderBeam duration={9} />}
    </div>
  );
};
