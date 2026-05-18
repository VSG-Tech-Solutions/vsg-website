"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Brain,
  AlertTriangle,
  Database,
  ChevronRight,
} from "lucide-react";

/**
 * VantageFlow — "how it actually works" section.
 *
 * Corrected flow direction (Apr 2026):
 *   1. Open the Module — operator starts in Vantage, the Module's AI pulls
 *      everything it needs from the ERP (stock levels, history, open POs).
 *   2. AI drafts — Forecaster / Auctioneer / Inspector etc. propose; the
 *      operator decides; overrides train next cycle.
 *   3. Exception → Core — when work can't close cleanly, the Core handles
 *      routing, approvals, SLAs.
 *   4. Outcome writes back to ERP — the ERP is the system of record at the
 *      end of the chain, not the trigger at the start.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    icon: Boxes,
    label: "01 · Open the Module",
    title: "The work starts in Vantage.",
    body: "Your buyer opens the Procurement Module. Your dock operator opens Receiving. Your auditor opens Ask Vantage. Whichever Module they open, the AI pulls everything it needs from your ERP — stock levels, open POs, supplier history, approval ladder — and surfaces what's coming up. The day starts here.",
    example:
      "Procurement Module opens · Forecaster pulls stock + history · 4 SKUs heading below reorder",
  },
  {
    icon: Brain,
    label: "02 · AI drafts the work",
    title: "AI drafts. Operator decides.",
    body: "Forecaster proposes the reorder qty + supplier with reasoning. Auctioneer ranks closed RFQ quotes on landed cost. Inspector classifies receiving variances with severity. Every recommendation comes with reasoning, confidence, and one-click evidence. Your operator reviews, approves, or overrides with a reason — and every override teaches the AI your way next cycle.",
    example:
      "Forecaster · 1,200 of SKU-CHEM-018 from ACME @ R52/kg · landed cost reasoning · 0.91 confidence",
    accent: true,
  },
  {
    icon: AlertTriangle,
    label: "03 · Exception → the Core",
    title: "When the work can't close cleanly.",
    body: "A three-way-match variance, an approval that needs a manager, a supplier dispute, a low-confidence call. The Module raises the exception to the Vantage Core. Core picks it up: routing, approval chains, escalation rules, SLA timers, the right person at the right step. No copy-paste between systems, no silent auto-routing on a low-trust signal.",
    example:
      "Dock receives 1,182 — 18 short · Inspector flags variance · routed to AP, level-2 approval",
  },
  {
    icon: Database,
    label: "04 · Records to the ERP",
    title: "Outcome writes back to the system of record.",
    body: "The AI walks the case alongside the assigned person — surfacing the data, drafting the supplier reply, answering questions. Once the case closes, the outcome — the approved PO, the closed GRV, the credit memo — writes back to your ERP as the system of record. Every state change is audited. The resolution feeds the AI's training for the next cycle.",
    example:
      "Approved · PO finalised in Syspro · GRV closed · evidence pack exported · sharper next cycle",
  },
];

export const VantageFlow: React.FC = () => {
  return (
    <div className="relative">
      {/* Section header */}
      <div className="max-w-3xl">
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
          How it actually works
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
          Vantage runs the work.
          <br />
          <span style={{ color: "var(--muted)" }}>
            Your ERP keeps the records.
          </span>
        </h2>

        {/* TL;DR lead — the whole story in one line */}
        <p
          className="mt-7 text-[18px] sm:text-[20px] leading-snug font-semibold"
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-body)",
            letterSpacing: "-0.005em",
          }}
        >
          Open the Module · AI does the draft · Core catches the
          exceptions · outcomes write back to your ERP.
        </p>

        <p
          className="mt-5 text-base sm:text-lg leading-relaxed"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Syspro, SAP, Sage and NetSuite are excellent at one job:
          recording transactions. They were never built to run the
          operational work — the chasing, the approvals, the
          variances, the routing when something doesn&rsquo;t fit.
          That work is where your team loses 4&ndash;8 hours a week.
        </p>
        <p
          className="mt-4 text-base sm:text-lg leading-relaxed"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Vantage is where that work happens. Your operator opens a{" "}
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>
            Module
          </span>{" "}
          — Procurement, Receiving, Approvals — and the{" "}
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>
            named AI specialists
          </span>{" "}
          inside it pull everything they need from your ERP and draft
          the next move. Operator decides. When something can&rsquo;t
          close cleanly, the{" "}
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>
            Vantage Core
          </span>{" "}
          takes over the exception — routing, approval chains,
          escalation, audit. The outcome writes back to your ERP as
          the system of record.
        </p>
      </div>

      {/* Stage indicator — horizontal mini-flow showing the four stages
          before the detailed cards. Corrected direction: work starts in
          Vantage, the ERP receives the outcome at the end. */}
      <div className="mt-12 flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2">
        {[
          { label: "Open the Module", sub: "operator starts in Vantage" },
          { label: "AI drafts", sub: "specialist proposes the move" },
          { label: "Exception", sub: "Core handles when it can't close" },
          { label: "Records to ERP", sub: "system of record updated" },
        ].map((s, i, arr) => (
          <div key={s.label} className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div
              className="px-3 py-2 rounded-lg shrink-0"
              style={{
                background:
                  i < 3
                    ? "var(--accent-soft)"
                    : "rgba(255, 255, 255, 0.04)",
                border: `1px solid ${
                  i < 3
                    ? "var(--card-border-accent)"
                    : "rgba(255, 255, 255, 0.08)"
                }`,
              }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.22em] font-semibold"
                style={{
                  color: i < 3 ? "var(--accent)" : "var(--fg)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {s.label}
              </div>
              <div
                className="mt-0.5 text-[10px] font-mono"
                style={{
                  color: "var(--muted-2)",
                  fontFamily:
                    "var(--font-space-mono), ui-monospace, monospace",
                }}
              >
                {s.sub}
              </div>
            </div>
            {i < arr.length - 1 && (
              <span
                aria-hidden
                className="text-[14px] shrink-0"
                style={{ color: "var(--muted-2)" }}
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 4-step flow */}
      <div className="mt-14 grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 relative">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isAccent = step.accent;
          return (
            <div key={step.label} className="relative">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  ease,
                  delay: i * 0.12,
                }}
                className="relative h-full rounded-2xl p-7 overflow-hidden"
                style={{
                  background: isAccent
                    ? "linear-gradient(180deg, var(--card-bg-accent) 0%, var(--card-bg-accent-2) 100%)"
                    : "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
                  border: `1px solid ${isAccent ? "var(--card-border-accent-strong)" : "rgba(255, 255, 255, 0.07)"}`,
                  boxShadow: isAccent
                    ? "inset 0 1px 0 var(--accent-soft), 0 30px 80px -30px rgba(0, 0, 0, 0.6)"
                    : "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <span aria-hidden className="liquid-steel-sweep" />

                {/* Header */}
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{
                      background: isAccent
                        ? "var(--accent-soft)"
                        : "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                      border: `1px solid ${isAccent ? "var(--card-border-accent-strong)" : "rgba(255, 255, 255, 0.10)"}`,
                      boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.06)",
                    }}
                  >
                    <Icon
                      className="w-4 h-4"
                      style={{
                        color: isAccent ? "var(--accent)" : "rgba(255,255,255,0.85)",
                      }}
                      strokeWidth={1.6}
                    />
                  </span>
                  <div
                    className="text-[10px] uppercase tracking-[0.28em] font-semibold"
                    style={{
                      color: isAccent ? "var(--accent)" : "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {step.label}
                  </div>
                </div>

                {/* Title + body */}
                <h3
                  className="mt-7 font-bold leading-tight"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-3 text-[13px] leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {step.body}
                </p>

                {/* Example chip — concrete payload */}
                <div
                  className="mt-6 pt-5 border-t"
                  style={{
                    borderColor: isAccent
                      ? "var(--accent-soft)"
                      : "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.22em] font-semibold mb-2"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Real signal
                  </div>
                  <div
                    className="text-[11px] leading-relaxed font-mono"
                    style={{
                      color: isAccent ? "var(--accent)" : "var(--muted)",
                      fontFamily:
                        "var(--font-space-mono), ui-monospace, monospace",
                    }}
                  >
                    {step.example}
                  </div>
                </div>
              </motion.div>

              {/* Connector arrow — desktop only, sits centred in the
                  24px gap between cards (lg:gap-6 = 1.5rem = 24px,
                  arrow is 24px wide; right: -24px places its right
                  edge 24px past the card → centre lands on the gap
                  centreline at wrapperRight + 12px). */}
              {i < STEPS.length - 1 && (
                <div
                  className="hidden lg:flex absolute top-1/2 -right-6 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, #1F1F22 0%, #16161A 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                  }}
                >
                  <ChevronRight
                    className="w-3.5 h-3.5"
                    style={{ color: "rgba(244, 168, 114, 0.7)" }}
                    strokeWidth={2}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
