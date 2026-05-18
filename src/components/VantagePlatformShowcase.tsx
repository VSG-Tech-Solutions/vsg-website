"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Eye,
  Sparkles,
  Layers,
  Clock4,
  BarChart3,
  Settings2,
  ScrollText,
} from "lucide-react";

/**
 * VantagePlatformShowcase — what Vantage as a WHOLE can do.
 *
 * Outcome pillars, not feature lists. This is the section the buyer
 * reads and says "yes, this is the platform we need." Reads like
 * positioning, not internal documentation.
 *
 * Eight pillars, each one a one-line claim + supporting paragraph.
 * Visually a 2-column grid of clean cards. No bullet lists.
 */

const ease = [0.16, 1, 0.3, 1] as const;

type Pillar = {
  icon: typeof AlertTriangle;
  claim: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    icon: AlertTriangle,
    claim: "Catch every exception your ERP misses.",
    body: "Every variance, every approval, every escalation lands somewhere with a name and a clock against it. Nothing falls between systems again — and the case is tracked, owned and auditable from raise to resolution.",
  },
  {
    icon: Eye,
    claim: "Show its working — every time.",
    body: "Every AI recommendation comes with reasoning you can read, a confidence score, and one-click access to the data behind it. Auditors love it; operators trust it; black-box decisions never reach a human queue without their working attached.",
  },
  {
    icon: Sparkles,
    claim: "Adapt to your operation, not the average.",
    body: "Per-tenant tuning means the AI gets sharper at your way of working every cycle. Your overrides train your AI; nothing is pooled with another customer's data. Your moat compounds the more you use it.",
  },
  {
    icon: Layers,
    claim: "Run alongside your ERP, not on top.",
    body: "Reads from Syspro, SAP, Sage, NetSuite or your custom system. The ERP stays the system of record; Vantage wraps the operational work around it. No replatforming, no migration project, no five-quarter rollout.",
  },
  {
    icon: Clock4,
    claim: "Live in five weeks, not five quarters.",
    body: "Pilot signed → first workflow running on your real data by week six. Both founders on every working session. Fixed scope, fixed price, success metric contracted on day one. No vapourware demos, no consultant relay.",
  },
  {
    icon: BarChart3,
    claim: "Compare yourself anonymously.",
    body: "Cross-tenant peer benchmarking shows where your variance rate, cycle time and override rate sit against operators in your industry — without exposing a single record. Know what's normal before you spend on a fix.",
  },
  {
    icon: Settings2,
    claim: "Configure without coding.",
    body: "Routing rules in plain English. SLAs and escalation timers as form inputs. Workflow templates you can save and apply across teams. The configuration depth your operators need without forcing your stack into a flowchart-builder.",
  },
  {
    icon: ScrollText,
    claim: "Audit-ready by default.",
    body: "Every state change, every AI claim, every override — logged, attributable, exportable as an evidence pack in one click. POPIA-aligned. Every action tied to an authenticated operator and the named AI specialist that did it.",
  },
];

export const VantagePlatformShowcase: React.FC = () => {
  return (
    <div className="relative">
      {/* Subtle warm wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,168,114,0.05) 0%, rgba(244,168,114,0) 70%)",
        }}
      />

      {/* Header */}
      <div className="relative max-w-4xl">
        <div
          className="text-[11px] uppercase tracking-[0.32em] font-semibold flex items-center gap-3"
          style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: "var(--accent)" }}
          />
          The Vantage platform
        </div>
        <h2
          className="mt-5 font-extrabold"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
            fontSize: "clamp(2.25rem, 5vw, 4.4rem)",
            lineHeight: 0.95,
            color: "var(--fg)",
          }}
        >
          Eight things Vantage does —
          <br />
          <span style={{ color: "var(--muted)" }}>
            for every Module you switch on.
          </span>
        </h2>
        <p
          className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          The Modules are where the work happens. The Vantage platform
          is what makes them all behave like one system —{" "}
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>
            one workflow engine, one audit trail, one AI fabric, one
            evidence layer
          </span>{" "}
          across every Module you switch on. These are the eight things
          your operators, your auditor and your CFO get the day Vantage
          goes live.
        </p>
      </div>

      {/* Pillars grid */}
      <div className="relative mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
        {PILLARS.map((p, i) => (
          <PillarCard key={p.claim} pillar={p} index={i} />
        ))}
      </div>
    </div>
  );
};

/* ---------------- subcomponents ---------------- */

const PillarCard: React.FC<{
  pillar: Pillar;
  index: number;
}> = ({ pillar, index }) => {
  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: (index % 4) * 0.06 }}
      className="relative rounded-2xl p-7 sm:p-8 overflow-hidden h-full flex flex-col"
      style={{
        background: "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.55)",
      }}
    >
      <span aria-hidden className="liquid-steel-sweep" />

      {/* Icon + index */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl"
          style={{
            background: "var(--accent-soft)",
            border: "1px solid var(--card-border-accent)",
            boxShadow: "inset 0 1px 0 rgba(244,168,114,0.10)",
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: "var(--accent)" }}
            strokeWidth={1.6}
          />
        </span>
        <div
          className="text-[10px] uppercase tracking-[0.32em] font-mono"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-space-mono), ui-monospace, monospace",
          }}
        >
          {String(index + 1).padStart(2, "0")} / 08
        </div>
      </div>

      {/* Claim */}
      <h3
        className="mt-7 font-bold"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.25rem, 1.75vw, 1.55rem)",
          letterSpacing: "-0.018em",
          lineHeight: 1.15,
        }}
      >
        {pillar.claim}
      </h3>

      {/* Body */}
      <p
        className="mt-4 text-[14px] leading-relaxed flex-1"
        style={{
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        {pillar.body}
      </p>
    </motion.div>
  );
};
