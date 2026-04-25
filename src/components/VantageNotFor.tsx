"use client";

import { motion } from "framer-motion";
import { XCircle, ShieldOff, BotOff, Building2 } from "lucide-react";

// Honest objection-handling block. Operators with scars from over-promised
// SaaS need to know what Vantage explicitly is NOT before the buy signal is
// real. Mirrors the principle "honest before helpful" from /about.
const notFor = [
  {
    icon: XCircle,
    title: "Not an ERP replacement",
    body: "Vantage runs alongside Syspro, SAP, Sage and NetSuite — it doesn't try to be them. We sit in the gap between the ERP and the work it was never designed to handle.",
  },
  {
    icon: ShieldOff,
    title: "Not a generic BPM suite",
    body: "We don't ship a blank canvas with 400 features. The library is opinionated, the workflows are exception-shaped, and we build new ones with you — not for you to build alone.",
  },
  {
    icon: BotOff,
    title: "Won't run autonomously without your rules",
    body: "The AI proposes, your rules engine approves. Nothing executes on its own — every action has an operator, every override has an audit trail, every escalation has a name.",
  },
  {
    icon: Building2,
    title: "Not priced for sub-20-person teams",
    body: "Vantage is built for mid-market operators with real volume and real exception cost. Below ~20 staff and one ERP, a spreadsheet probably still works — and we'll tell you so.",
  },
];

export const VantageNotFor: React.FC = () => {
  return (
    <section
      className="relative w-full py-24 border-t overflow-hidden"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-30"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
            style={{
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="h-px w-8"
              style={{ background: "var(--accent-2)" }}
            />
            <span>Honest before helpful</span>
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--fg)",
            }}
          >
            What Vantage{" "}
            <span style={{ color: "var(--accent-2)" }}>isn&apos;t.</span>
          </h2>
          <p
            className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Every operator we talk to has been burned by a SaaS that promised
            everything and delivered a demo. So before you keep reading,
            here&apos;s the short list of things Vantage explicitly is not.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {notFor.map((n, i) => {
            const Icon = n.icon;
            return (
              <motion.div
                key={n.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="relative rounded-2xl border p-7 themed-rounded"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--card-bg)",
                }}
              >
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border themed-rounded"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--bg-elev)",
                    color: "var(--accent-2)",
                  }}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.8} />
                </div>
                <h3
                  className="mt-5 text-lg font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  {n.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {n.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
