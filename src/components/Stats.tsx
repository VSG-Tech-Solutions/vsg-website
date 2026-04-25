"use client";

import { motion } from "framer-motion";

// Credibility signals that are factually defensible — not invented metrics.
// Every number here ties to something real in the product or the delivery model.
const stats = [
  { value: "5 weeks", label: "Setup to first workflow live" },
  { value: "12", label: "Standard workflows in the library" },
  { value: "4 ERPs", label: "Syspro · SAP · Sage · NetSuite" },
  { value: "POPIA", label: "SA data protection aligned" },
];

export const Stats: React.FC = () => {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent-glow), transparent)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden border themed-rounded"
          style={{
            background: "var(--card-border)",
            borderColor: "var(--card-border)",
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative group p-8 sm:p-10 text-center transition-colors duration-500"
              style={{ background: "var(--bg)" }}
            >
              <div
                className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  backgroundImage:
                    "linear-gradient(to bottom, var(--fg), color-mix(in oklab, var(--fg) 40%, transparent))",
                }}
              >
                {s.value}
              </div>
              <div
                className="mt-3 text-xs sm:text-sm uppercase tracking-[0.2em]"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {s.label}
              </div>
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-2/3 transition-all duration-500"
                style={{ background: "var(--accent)" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
