"use client";

import { motion } from "framer-motion";

/**
 * VantageMetricsStrip — full-bleed quantified-credibility strip that sits
 * directly under the hero. Same role as Stripe's "$1.9T processed · 99.999%
 * uptime" rail: instant trust before the buyer reaches the problem section.
 *
 * Four numbers, four labels. Hairline dividers between cells. No card
 * containment — the row sits on the page itself, separated only by top
 * and bottom hairlines so it reads as continuation of the hero rather
 * than a new section.
 */

const ease = [0.16, 1, 0.3, 1] as const;

type Metric = {
  value: string;
  label: string;
  sub: string;
};

const METRICS: Metric[] = [
  {
    value: "100+",
    label: "Features in production",
    sub: "Workflow, automation, AI, audit, documents, benchmarking",
  },
  {
    value: "8",
    label: "Named AI specialists",
    sub: "Each one trained on your data, never pooled",
  },
  {
    value: "6",
    label: "Modules in the library",
    sub: "Two live · four sequenced over 12 months",
  },
  {
    value: "5 weeks",
    label: "First workflow live",
    sub: "Pilot signed → in production by week six",
  },
];

export const VantageMetricsStrip: React.FC = () => {
  return (
    <section
      className="relative w-full"
      style={{
        background: "var(--bg)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-14 py-10 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.06]">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, ease, delay: i * 0.06 }}
              className="px-5 sm:px-8 py-5 sm:py-3 lg:py-2 first:pl-0 last:pr-0"
            >
              <div
                className="font-extrabold leading-none"
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                {m.value}
              </div>
              <div
                className="mt-3 text-[12px] uppercase tracking-[0.22em] font-semibold"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {m.label}
              </div>
              <div
                className="mt-1.5 text-[12.5px] leading-relaxed"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {m.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
