"use client";

import { motion } from "framer-motion";
import { NumberTicker } from "./NumberTicker";

/**
 * StatsBlock — Frame.io-flavoured cited stats band.
 *
 * Big numbers + thin labels + a citation-style attribution under each.
 * Restrained. Hairline borders top and bottom.
 */

const ease = [0.16, 1, 0.3, 1] as const;

// `value` is now a number where it makes sense (so the NumberTicker
// can count up to it on scroll-into-view) plus an optional suffix /
// label-only variant for non-numeric stats like "ZA".
type Stat = {
  value: number | null;
  suffix?: string;
  textValue?: string;        // for non-numeric (e.g. "ZA")
  label: string;
  cite: string;
  accent?: boolean;
};

const STATS: Stat[] = [
  {
    value: 5,
    suffix: "wk",
    label: "Spec to live",
    cite: "Pilot signed Monday → in production by week 6",
  },
  {
    value: 100,
    suffix: "%",
    label: "POPIA-aligned",
    cite: "Audit-ready logging across every product action",
    accent: true,
  },
  {
    value: 2,
    label: "Founders on every call",
    cite: "No SDR, no relay, no qualification script",
  },
  {
    value: null,
    textValue: "ZA",
    label: "Cape Town",
    cite: "Built on the ground · ZAR-invoiced · founder-led",
  },
];

export const StatsBlock: React.FC = () => {
  return (
    <section
      className="relative py-24 md:py-32 border-t border-b"
      style={{
        background: "hsl(var(--bg))",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-8 h-px"
              style={{ background: "rgba(255,255,255,0.20)" }}
            />
            <span
              className="text-[10px] uppercase tracking-[0.32em] font-bold"
              style={{ color: "#FF6B2C" }}
            >
              By the numbers
            </span>
          </div>
          <h2
            className="text-text-primary"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
            }}
          >
            What you get when{" "}
            <span className="text-muted">you sign with us.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="flex flex-col"
            >
              <div
                className="leading-none"
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 800,
                  fontSize: "clamp(2.75rem, 5.4vw, 4.75rem)",
                  letterSpacing: "-0.04em",
                  color: s.accent ? "#FF6B2C" : "white",
                  // value rendering: numeric values use NumberTicker
                  // (counts up on scroll-into-view), non-numeric use
                  // textValue plain.
                }}
              >
                {s.value !== null ? (
                  <NumberTicker value={s.value} suffix={s.suffix} />
                ) : (
                  s.textValue
                )}
              </div>
              <div className="mt-4 text-[10px] uppercase tracking-[0.28em] font-bold text-text-primary">
                {s.label}
              </div>
              <div className="mt-2 text-[12px] text-muted leading-relaxed max-w-[24ch]">
                {s.cite}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
