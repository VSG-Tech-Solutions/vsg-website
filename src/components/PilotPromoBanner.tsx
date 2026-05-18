"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { X, Flame, ArrowRight } from "lucide-react";

// Site-wide promo bar for the Pilot Cohort.
// First 5 pilot clients get:
//   · 50% off setup
//   · free support for the life of the pilot
//   · no per-user monthly fees
//
// Persists "dismissed" in localStorage so returning visitors don't see it again
// — but still re-appears for fresh sessions if the cohort changes.

const STORAGE_KEY = "vsg-pilot-promo-v1-dismissed";

export const PilotPromoBanner: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    try {
      const dismissed = window.localStorage.getItem(STORAGE_KEY);
      if (dismissed === "1") setVisible(false);
    } catch {
      /* no-op — SSR, private mode, etc. */
    }
    setMounted(true);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* no-op */
    }
  };

  // Avoid hydration flash
  if (!mounted) return null;

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          key="pilot-promo"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="sticky top-0 z-[60] w-full overflow-hidden"
          style={{
            // Matte slab — etched dark surface with a 1px white rim along the
            // bottom edge so it reads as a distinct strip without screaming.
            background: "var(--card-bg)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
            boxShadow: "0 1px 0 rgba(255, 255, 255, 0.04) inset",
          }}
        >

          <div className="relative mx-auto max-w-7xl px-3 sm:px-6 py-2 sm:py-3">
            {/* Single-row layout on every breakpoint — never wraps. Mobile
                hides the decorative chip + extras, keeps the promo + CTA + X. */}
            <div className="flex items-center gap-2 sm:gap-4 justify-between">
              {/* Left — icon + label */}
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 flex-1">
                <span
                  className="hidden sm:inline-flex items-center justify-center w-7 h-7 rounded-lg shrink-0"
                  style={{
                    background:
                      "linear-gradient(145deg, var(--accent-2), color-mix(in oklab, var(--accent) 70%, black))",
                    boxShadow: "0 0 14px var(--accent-glow)",
                  }}
                >
                  <Flame
                    className="w-3.5 h-3.5"
                    style={{ color: "var(--bg)" }}
                    strokeWidth={2.4}
                  />
                </span>
                <span
                  className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.25em] font-bold shrink-0"
                  style={{
                    background:
                      "color-mix(in oklab, var(--accent-2) 25%, transparent)",
                    color: "var(--fg)",
                    border:
                      "1px solid color-mix(in oklab, var(--accent-2) 55%, var(--card-border))",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: "var(--accent)" }}
                  />
                  First 5 pilots
                </span>
                <span
                  className="text-[12px] sm:text-[13px] font-semibold leading-tight truncate"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {/* Mobile compact — pulse dot + tight copy */}
                  <span className="sm:hidden inline-flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    <strong style={{ fontWeight: 700 }}>50% off</strong>{" "}
                    pilot setup
                  </span>

                  {/* Desktop full */}
                  <span className="hidden sm:inline">
                    <span className="hidden md:inline">Launch cohort: </span>
                    <strong style={{ fontWeight: 700 }}>50% off</strong> setup
                    {" "}·{" "}
                    <strong style={{ fontWeight: 700 }}>free support</strong>
                    {" "}·{" "}
                    <strong style={{ fontWeight: 700 }}>no per-user fees</strong>
                  </span>
                </span>
              </div>

              {/* Right — CTA + close */}
              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <Link
                  href="/pilot#apply"
                  className="group inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-[11px] sm:text-[12px] font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap"
                  style={{
                    background: "var(--fg)",
                    color: "var(--bg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span>Claim slot</span>
                  <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <button
                  type="button"
                  onClick={dismiss}
                  aria-label="Dismiss promotion"
                  className="inline-flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-md transition-colors cursor-pointer shrink-0"
                  style={{
                    color: "var(--fg)",
                    opacity: 0.7,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.opacity = "0.7";
                  }}
                >
                  <X className="w-3.5 h-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
