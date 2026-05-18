"use client";

import { motion } from "framer-motion";

/**
 * StatsRow — three honest numbers, no vanity.
 *
 * The brief says "no vanity counters". So:
 *   • 2 founders     — both on every engagement
 *   • 2 products live — Procurement + Receiving
 *   • Cape Town       — the place, the cadence
 *
 * Big editorial type, restrained colour, hairline dividers.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const STATS = [
  {
    value: "2",
    label: "Founders",
    detail: "Both on every engagement. No SDR, no relay.",
  },
  {
    value: "2",
    label: "Products live",
    detail: "Procurement and Receiving — selling now.",
  },
  {
    value: "ZA",
    label: "Built in Cape Town",
    detail: "POPIA-aligned, ZAR-invoiced, founder-led.",
  },
];

export const StatsRow: React.FC = () => {
  return (
    <section className="relative bg-bg py-20 md:py-28 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="grid grid-cols-1 md:grid-cols-3 gap-px bg-stroke rounded-2xl overflow-hidden"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="bg-bg p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[200px]"
            >
              <div
                className="font-display text-text-primary leading-[0.92]"
                style={{
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  letterSpacing: "-0.025em",
                }}
              >
                {s.value}
              </div>
              <div className="mt-6">
                <div className="text-[10px] uppercase tracking-[0.32em] text-muted mb-2">
                  {s.label}
                </div>
                <div className="text-[13px] text-muted leading-relaxed max-w-[28ch]">
                  {s.detail}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
