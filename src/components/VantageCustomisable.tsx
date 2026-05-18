"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  GitBranch,
  Plug,
  Sparkles,
} from "lucide-react";

/**
 * VantageCustomisable — explicit "this platform is customisable" section.
 *
 * Sits above the configurator on the /vantage page. The point: every
 * customer is going to ask "can it do X?" — the answer is yes, and the
 * cost is a fraction of greenfield because we build on top of an existing
 * Vantage instance.
 *
 * Headline + body + 4 example tiles (dashboard / workflow / module /
 * integration) + a quiet pricing nudge ("fraction of new-build pricing").
 */

const ease = [0.16, 1, 0.3, 1] as const;

const EXAMPLES = [
  {
    icon: LayoutDashboard,
    title: "Custom dashboards",
    body: "Department-specific views, executive summaries, KPI roll-ups — drawn from the same Vantage data, scoped to who needs to see what.",
    timing: "1 week",
  },
  {
    icon: GitBranch,
    title: "Custom workflows",
    body: "Your approval ladder, your routing rules, your escalation tree — written in plain English, owned by your operators, audited end-to-end.",
    timing: "1–2 weeks",
  },
  {
    icon: Sparkles,
    title: "Custom modules",
    body: "A workflow that doesn't fit the library? We build it as a new module on your Vantage instance. Same engine, same audit trail, your spec.",
    timing: "2–4 weeks",
  },
  {
    icon: Plug,
    title: "Custom integrations",
    body: "Anything your business already runs on — custom ERP fields, internal tools, your CRM, your finance system, supplier feeds — wired in, mapped, monitored.",
    timing: "1–3 weeks",
  },
];

export const VantageCustomisable: React.FC = () => {
  return (
    <div className="relative">
      {/* Subtle warm wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,168,114,0.05) 0%, rgba(244,168,114,0) 70%)",
        }}
      />

      <div className="relative max-w-3xl">
        <div
          className="text-[11px] uppercase tracking-[0.32em] font-semibold flex items-center gap-3"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-body)",
          }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: "var(--accent)" }}
          />
          Customisable, end-to-end
        </div>
        <h2
          className="mt-5 font-extrabold"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
            fontSize: "clamp(2.25rem, 5vw, 4.2rem)",
            lineHeight: 0.95,
            color: "var(--fg)",
          }}
        >
          Anything you need.
          <br />
          <span style={{ color: "var(--muted)" }}>
            At a fraction of the price.
          </span>
        </h2>
        <p
          className="mt-6 text-base sm:text-lg leading-relaxed"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Custom dashboards, custom workflows, custom modules, custom
          integrations — added to your Vantage instance after the pilot,
          scoped in days, not months.{" "}
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>
            We build on top of what already runs
          </span>{" "}
          — so what would cost six figures from a greenfield agency
          ships from us at a fraction.
        </p>
      </div>

      {/* 4 example tiles */}
      <div className="relative mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EXAMPLES.map((ex, i) => {
          const Icon = ex.icon;
          return (
            <motion.div
              key={ex.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                ease,
                delay: i * 0.08,
              }}
              className="on-dark-card relative group rounded-2xl p-7 overflow-hidden"
              style={{
                background: "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                boxShadow:
                  "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
              }}
            >
              <span aria-hidden className="liquid-steel-sweep" />

              <div className="flex items-start justify-between">
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(244,168,114,0.10), rgba(244,168,114,0.02))",
                    border: "1px solid var(--card-border-accent)",
                    boxShadow: "inset 0 1px 0 rgba(244,168,114,0.10)",
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: "var(--accent)" }}
                    strokeWidth={1.6}
                  />
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.22em] font-semibold"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  ~{ex.timing}
                </span>
              </div>

              <h3
                className="mt-7 font-bold leading-tight"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.15rem, 1.6vw, 1.4rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {ex.title}
              </h3>
              <p
                className="mt-3 text-[14px] leading-relaxed"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {ex.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
