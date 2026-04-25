"use client";

import { motion } from "framer-motion";
import {
  Radio,
  Brain,
  GitBranch,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const steps = [
  {
    n: "01",
    icon: Radio,
    title: "Trigger captured",
    body: "An invoice hits Syspro with a PO mismatch. An email complaint lands in a shared inbox. A QC non-conformance gets logged on the line. A form fires from the web. Vantage listens on every surface — ERP webhooks, IMAP, REST, form posts, scheduled polls.",
  },
  {
    n: "02",
    icon: Brain,
    title: "AI classifies + suggests",
    body: "Vantage AI reads the context — supplier, amount, line items, history — and suggests a route, a rule, or a resolution. You see the suggestion; a human approves it. Nothing runs autonomously on the first pass, and escalations above a configurable threshold always hold at a person.",
  },
  {
    n: "03",
    icon: GitBranch,
    title: "Routed through the workflow",
    body: "Up to a 10-step workflow per exception type — assignment, sub-tasks, approval gates, supplier callbacks, auto-replies, SLA timers, escalation ladders. Plain-English rules. Row-level security. All the routing happens in Vantage, not in your ERP — your core system stays clean.",
  },
  {
    n: "04",
    icon: CheckCircle2,
    title: "Resolved + learned",
    body: "Every outcome feeds the audit trail and the AI. Auditors get one-click evidence exports. The AI gets sharper — next time a similar exception lands, the suggested route is more accurate. You ship the five-week pilot and the accuracy curve keeps rising from there.",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="relative w-full py-24 border-t overflow-hidden"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
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
            <span>How it works</span>
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            From trigger to resolved —{" "}
            <span style={{ color: "var(--accent-2)" }}>
              in one auditable flow.
            </span>
          </h2>
          <p
            className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Every exception moves through the same four stages. Deterministic
            where it has to be, AI-assisted where it helps, and always
            recorded for the auditor.
          </p>
        </motion.div>

        {/* Process timeline bar — md+ only */}
        <div className="mt-16 relative hidden md:block">
          <div className="relative px-8">
            {/* Base line */}
            <div
              className="absolute left-8 right-8 top-[15px] h-px"
              style={{
                background:
                  "linear-gradient(to right, var(--card-border), var(--card-border))",
              }}
            />
            {/* Animated glow line */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-8 right-8 top-[14px] h-[3px] origin-left rounded-full"
              style={{
                background:
                  "linear-gradient(to right, var(--accent-2), var(--accent), var(--accent-2))",
                boxShadow: "0 0 16px var(--accent-glow)",
              }}
            />

            {/* Step dots + labels on the bar */}
            <div className="relative grid grid-cols-4">
              {steps.map((s, i) => (
                <motion.div
                  key={s.n}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.45,
                    delay: 0.4 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="relative z-10 h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-mono font-bold"
                    style={{
                      background:
                        "linear-gradient(145deg, var(--accent-2), var(--accent))",
                      color: "var(--bg)",
                      boxShadow:
                        "0 0 20px var(--accent-glow), inset 0 1px 0 rgba(255,255,255,0.25)",
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="mt-3 text-[10px] uppercase tracking-[0.2em] text-center"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {s.title}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 md:mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4 relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.n} className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="relative h-full flex flex-col rounded-2xl border p-6 themed-rounded overflow-hidden"
                  style={{
                    borderColor: "var(--card-border)",
                    background:
                      "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 50%, transparent))",
                  }}
                >
                  {/* Top-right accent glow */}
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-[160px] h-[160px] rounded-full blur-[60px] opacity-40"
                    style={{ background: "var(--accent-glow)" }}
                  />

                  <div className="relative flex items-center gap-3">
                    {/* Large numbered badge with icon inside */}
                    <div
                      className="inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 themed-rounded"
                      style={{
                        borderColor: "var(--accent-2)",
                        background:
                          "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 12%, var(--bg-elev)), var(--bg-elev))",
                        boxShadow:
                          "0 0 20px var(--accent-glow), inset 0 0 10px color-mix(in oklab, var(--accent) 8%, transparent)",
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: "var(--accent-2)" }}
                        strokeWidth={1.8}
                      />
                    </div>
                    <div
                      className="text-xs font-mono tracking-[0.3em]"
                      style={{
                        color: "var(--accent-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      STEP {s.n}
                    </div>
                  </div>

                  <h3
                    className="relative mt-5 text-lg font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--fg)",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="relative mt-2 text-sm leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {s.body}
                  </p>
                </motion.div>

                {/* Chevron between cards — lg+ only, not after last */}
                {i < steps.length - 1 && (
                  <div
                    className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 rounded-full"
                    style={{
                      background: "var(--bg)",
                      border: "1px solid var(--card-border)",
                    }}
                  >
                    <ChevronRight
                      className="w-3.5 h-3.5"
                      style={{ color: "var(--accent-2)" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
