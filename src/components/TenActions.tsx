"use client";

import { motion } from "framer-motion";
import {
  Inbox,
  Tags,
  UserCheck,
  Activity,
  AlertTriangle,
  CheckSquare,
  Link2,
  BarChart3,
  FileText,
  Brain,
} from "lucide-react";

// The canonical 10-action framework. Every Vantage workflow performs these
// ten actions. Source: products/vantage.md in the company brain.
const actions = [
  {
    n: "01",
    icon: Inbox,
    title: "Intake",
    body: "Pulls items in from any source — ERP webhook, email, API, document scan, form post, scheduled poll.",
  },
  {
    n: "02",
    icon: Tags,
    title: "Classify",
    body: "AI categorises by type and severity, with the reasoning shown alongside every decision.",
  },
  {
    n: "03",
    icon: UserCheck,
    title: "Assign",
    body: "Routes to the right person automatically, based on rules you own and past resolutions.",
  },
  {
    n: "04",
    icon: Activity,
    title: "Track",
    body: "Follows items through defined stages with enforced rules, SLA timers and visible status.",
  },
  {
    n: "05",
    icon: AlertTriangle,
    title: "Escalate",
    body: "Alerts when things stick, through configurable escalation ladders that never miss.",
  },
  {
    n: "06",
    icon: CheckSquare,
    title: "Approve",
    body: "Sign-off routing with full context on one screen — no context-switching, no lost threads.",
  },
  {
    n: "07",
    icon: Link2,
    title: "Connect",
    body: "Links related items across workflows so the full picture of an exception stays intact.",
  },
  {
    n: "08",
    icon: BarChart3,
    title: "Show",
    body: "Real-time dashboards plus natural-language Ask Vantage — every answer grounded in your data.",
  },
  {
    n: "09",
    icon: FileText,
    title: "Record",
    body: "Every trigger, decision, escalation and approval recorded. One-click auditor evidence export.",
  },
  {
    n: "10",
    icon: Brain,
    title: "Learn",
    body: "AI gets sharper from every outcome — suggesting new rules with evidence, never running autonomously.",
  },
];

export const TenActions: React.FC = () => {
  return (
    <section
      className="relative w-full py-24 overflow-hidden border-t"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[150px] opacity-50"
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
            <span>The framework</span>
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Every workflow does the{" "}
            <span style={{ color: "var(--accent-2)" }}>same ten things.</span>
          </h2>
          <p
            className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            AP exceptions. Quality non-conformances. Supplier onboarding.
            Customer complaints. Stuck approvals. The operational shape of each
            is the same — capture, classify, route, track, escalate, approve,
            connect, show, record, learn. Vantage is ten actions applied
            consistently, not ten point-tools bolted together.
          </p>
        </motion.div>

        {/* 10-action grid */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {actions.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative rounded-2xl border p-5 overflow-hidden themed-rounded group transition-all duration-300"
                style={{
                  borderColor: "var(--card-border)",
                  background:
                    "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "color-mix(in oklab, var(--accent-2) 50%, var(--card-border))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--card-border)";
                }}
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 w-[120px] h-[120px] rounded-full blur-[50px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: "var(--accent-glow)" }}
                />
                <div className="relative flex items-start justify-between">
                  <div
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border-2 themed-rounded"
                    style={{
                      borderColor: "var(--accent-2)",
                      background:
                        "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 12%, var(--bg-elev)), var(--bg-elev))",
                      boxShadow:
                        "0 0 16px var(--accent-glow), inset 0 0 8px color-mix(in oklab, var(--accent) 8%, transparent)",
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{ color: "var(--accent-2)" }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <div
                    className="text-xs font-mono tracking-[0.2em]"
                    style={{
                      color: "var(--accent-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {a.n}
                  </div>
                </div>
                <h3
                  className="relative mt-4 text-base font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  {a.title}
                </h3>
                <p
                  className="relative mt-1.5 text-xs leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {a.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 text-center text-sm max-w-2xl mx-auto"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          Ten actions. One configurable platform. Applied to whichever
          exception type is costing you the most — starting with the one we
          agree on in the pilot scoping call.
        </motion.p>
      </div>
    </section>
  );
};
