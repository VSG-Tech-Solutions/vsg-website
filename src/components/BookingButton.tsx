"use client";

import { useCallback } from "react";
import { CONTACT } from "@/lib/contact";

// BookingButton — single source for every "book a demo / walkthrough / scoping
// call" CTA on the site. Lazy-loads the Calendly popup widget on first click
// (zero impact on first paint), then triggers `Calendly.initPopupWidget` on
// subsequent clicks. Falls back to opening the URL in a new tab if the
// script fails to load.
//
// Renders as a real <button> so it can sit inside or outside forms safely.
// Pass `className` and `style` to inherit whatever look you want — most CTAs
// on this site already define their own gradient + glow treatments.

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

const CALENDLY_CSS = "https://assets.calendly.com/assets/external/widget.css";
const CALENDLY_JS = "https://assets.calendly.com/assets/external/widget.js";

let loader: Promise<void> | null = null;

function loadCalendly(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.Calendly) return Promise.resolve();
  if (loader) return loader;

  loader = new Promise<void>((resolve, reject) => {
    if (!document.querySelector(`link[href="${CALENDLY_CSS}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CALENDLY_CSS;
      document.head.appendChild(link);
    }

    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_JS}"]`
    );
    if (existing) {
      if (window.Calendly) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Calendly script failed to load"))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = CALENDLY_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Calendly script failed to load"));
    document.head.appendChild(script);
  });

  return loader;
}

type Props = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick"
> & {
  /** Override the default Calendly URL — defaults to the scoping call. */
  url?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BookingButton: React.FC<Props> = ({
  url = CONTACT.booking.scopingCall,
  onClick,
  children,
  ...rest
}) => {
  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
      if (e.defaultPrevented) return;
      try {
        await loadCalendly();
        if (window.Calendly?.initPopupWidget) {
          window.Calendly.initPopupWidget({ url });
          return;
        }
      } catch {
        // fall through to the new-tab fallback
      }
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [url, onClick]
  );

  return (
    <button type="button" onClick={handleClick} {...rest}>
      {children}
    </button>
  );
};
