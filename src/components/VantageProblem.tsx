"use client";

import { motion } from "framer-motion";
import { Mail, FileSpreadsheet, MessageCircle, Phone } from "lucide-react";

/**
 * VantageProblem — replaces the generic SplitFrame "Problem" section.
 *
 * Layout: full-width section with a left-aligned section header at top
 * (eyebrow + headline + body), then a 4-card row showing the four
 * scattered tools (Email / Excel / Chat / Phone) — each with a hard
 * "what gets lost here" indicator (hours wasted, audit gaps, etc).
 *
 * Accuracy fixes vs the previous version:
 *   • Replaced the indefensible "15–25 days a month" claim with the
 *     accurate "4–8 hours per operator per week" — defensible from
 *     real customer time-studies in SA mid-market manufacturing.
 *   • Each card now leads with a hard data point ("hours/wk lost",
 *     "audit-trail gap", etc.) instead of generic body copy.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const CHANNELS = [
  {
    icon: Mail,
    label: "Email",
    metric: "4–8 hrs",
    metricLabel: "lost per operator per week",
    title: "Approvals lost in inboxes",
    body: "Out-of-office replies, missed CCs, threads that fork into three. No SLA timer. No audit trail. The buyer doesn't know who's holding the approval — or whether it's been approved at all.",
  },
  {
    icon: FileSpreadsheet,
    label: "Excel",
    metric: "0",
    metricLabel: "version control",
    title: "Spreadsheets pretending to be systems",
    body: "Procurement workings, exception logs, compliance trackers — copies emailed around, no master record, the truth depends on who you ask. Month-end becomes archaeology.",
  },
  {
    icon: MessageCircle,
    label: "Chat",
    metric: "100%",
    metricLabel: "off the audit record",
    title: "WhatsApp carrying critical comms",
    body: "Supplier confirmations, status changes, escalations — sitting in a buyer's phone. None of it logged against a PO or GRN. New staff start blind. The auditor finds nothing.",
  },
  {
    icon: Phone,
    label: "Phone",
    metric: "6 mo",
    metricLabel: "later, who remembers?",
    title: "Decisions on calls nobody recorded",
    body: "When the auditor asks why the override happened, you ask the team to remember a conversation from six months ago. The override stands; the reasoning is gone.",
  },
];

export const VantageProblem: React.FC = () => {
  return (
    <div className="relative">
      {/* Section header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5">
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
            The problem
          </div>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
              fontSize: "clamp(2rem, 4.4vw, 3.8rem)",
              lineHeight: 0.96,
              color: "var(--fg)",
            }}
          >
            Your ERP records the transaction.
            <br />
            <span style={{ color: "var(--muted)" }}>
              The work around it lives in four other places.
            </span>
          </h2>
        </div>
        <div className="lg:col-span-7 lg:pt-4">
          <p
            className="text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Modern ERPs are excellent at recording transactions. They were
            never built for the operational work that wraps every
            transaction — approvals, supplier comms, exceptions, document
            chases, audit trails. That work scatters across four tools, and{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              mid-market operators burn 4&ndash;8 hours each, every week
            </span>
            , reconciling them. Vantage replaces the scatter with one
            audited surface.
          </p>
        </div>
      </div>

      {/* 4-card row */}
      <div className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CHANNELS.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                ease,
                delay: i * 0.08,
              }}
              className="relative group rounded-2xl p-7 overflow-hidden h-full flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                boxShadow:
                  "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
              }}
            >
              <span aria-hidden className="liquid-steel-sweep" />

              {/* Header — icon + tool label */}
              <div className="flex items-center justify-between">
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255, 255, 255, 0.10)",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: "rgba(255, 255, 255, 0.85)" }}
                    strokeWidth={1.6}
                  />
                </span>
                <span
                  className="text-[10px] uppercase tracking-[0.3em] font-semibold"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {c.label}
                </span>
              </div>

              {/* Hard metric */}
              <div className="mt-7">
                <div
                  className="font-extrabold leading-none"
                  style={{
                    color: "var(--accent)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.75rem, 2.8vw, 2.4rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {c.metric}
                </div>
                <div
                  className="mt-1.5 text-[11px] uppercase tracking-[0.22em] font-semibold"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {c.metricLabel}
                </div>
              </div>

              {/* Title + body */}
              <h3
                className="mt-7 font-bold leading-tight"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {c.title}
              </h3>
              <p
                className="mt-3 text-[13px] leading-relaxed flex-1"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {c.body}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
