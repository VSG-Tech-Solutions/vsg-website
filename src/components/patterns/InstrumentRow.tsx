"use client";

import { iconRegistry, type IconName } from "./icon-registry";

/**
 * InstrumentRow — three-column claim/proof strip.
 *
 * Each column: tiny icon + small eyebrow → 1-line claim → 1-line proof.
 * Hairline dividers between columns. Used as the trust strip near the end
 * of every page.
 *
 * Icons accepted as strings (icon-registry name) to avoid passing function
 * references across the server→client component boundary.
 */

export type Instrument = {
  icon: IconName;
  label: string;
  claim: string;
  proof: string;
};

export const InstrumentRow: React.FC<{ items: Instrument[] }> = ({
  items,
}) => (
  <div
    className="grid grid-cols-1 md:grid-cols-3"
    style={{ background: "var(--card-border)", gap: "1px" }}
  >
    {items.map((it, i) => {
      const Icon = iconRegistry[it.icon];
      return (
        <div
          key={i}
          className="px-6 py-10 sm:py-12"
          style={{ background: "var(--bg)" }}
        >
          <div className="flex items-center gap-3">
            <Icon
              className="w-4 h-4"
              strokeWidth={1.6}
              style={{ color: "var(--accent-2)" }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              {it.label}
            </span>
          </div>
          <p
            className="mt-4 text-lg sm:text-xl font-semibold leading-snug"
            style={{
              color: "var(--fg)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.01em",
            }}
          >
            {it.claim}
          </p>
          <p
            className="mt-2 text-sm leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {it.proof}
          </p>
        </div>
      );
    })}
  </div>
);
