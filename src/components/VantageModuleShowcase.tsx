"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  PackageSearch,
  CheckCircle2,
  ShieldCheck,
  UserPlus,
  ClipboardCheck,
  Brain,
  Check,
  Clock,
  ArrowRight,
} from "lucide-react";

/**
 * VantageModuleShowcase — what each Module can do, standalone.
 *
 * Two tiers:
 *   • Live Modules (Procurement, Receiving) get full cards with status,
 *     audience, named AI, "How it works" mini-flow, and full capability list.
 *   • In-design / planned Modules get slim "coming soon" tiles — name,
 *     audience, one teaser line. No feature lists for things we haven't
 *     shipped — keeps the positioning honest.
 */

const ease = [0.16, 1, 0.3, 1] as const;

type Capability = {
  text: string;
  rolling?: boolean;
};

type FlowStep = {
  step: string;
  text: string;
};

type LiveModule = {
  id: string;
  icon: typeof ShoppingCart;
  name: string;
  audience: string;
  oneline: string;
  flow: FlowStep[];
  capabilities: Capability[];
  agents: string[];
};

type ComingModule = {
  id: string;
  icon: typeof CheckCircle2;
  name: string;
  audience: string;
  teaser: string;
  status: "design" | "planned";
};

const LIVE_MODULES: LiveModule[] = [
  {
    id: "procurement",
    icon: ShoppingCart,
    name: "Procurement Module",
    audience: "For your buyer",
    oneline:
      "Forecasts when stock will run out, predicts the right order quantity, picks the supplier, ranks the RFQ quotes. Your buyer decides; every override teaches the AI your way next time.",
    flow: [
      {
        step: "01",
        text: "Vantage watches stock levels round the clock and spots a SKU heading below your reorder line.",
      },
      {
        step: "02",
        text: "Forecaster predicts the right reorder quantity from your consumption pattern, picks a supplier from history, attaches the landed-cost reasoning.",
      },
      {
        step: "03",
        text: "If you go to RFQ, Vantage invites suppliers, captures responses, and Auctioneer ranks every quote on total landed cost — not just unit price.",
      },
      {
        step: "04",
        text: "Your buyer reviews with reasoning + confidence + one-click evidence; approves, edits, or overrides with a reason that trains the next cycle.",
      },
    ],
    capabilities: [
      { text: "Forecast stock running out before it does — velocity + lead-time aware" },
      { text: "Predict the right reorder qty from your consumption pattern" },
      { text: "Pick the supplier from history with landed-cost reasoning" },
      { text: "Rank closed RFQ quotes on total landed cost, not just unit price" },
      { text: "Reject any AI answer outside your real supplier and price data" },
      { text: "Hold per-SKU reorder thresholds and preferred-supplier hints" },
      { text: "Show reasoning + confidence + one-click evidence on every call" },
      { text: "Capture manual purchase requests for ad-hoc buys" },
      { text: "Train on every override with the operator's reason" },
      { text: "Fall back to deterministic rules if the AI is unavailable" },
      { text: "Predict stockouts 4–7 days out from velocity + lead-time variance", rolling: true },
      { text: "Surface live supplier scorecards — on-time, quality, variance", rolling: true },
      { text: "Draft and chase RFQ emails on your behalf", rolling: true },
      { text: "Anti-collusion detection across supplier quotes", rolling: true },
      { text: "Dynamic safety-stock recommendations per SKU", rolling: true },
      { text: "Real-time commodity-price benchmarking on every quote", rolling: true },
    ],
    agents: ["Forecaster", "Auctioneer", "Courier"],
  },
  {
    id: "receiving",
    icon: PackageSearch,
    name: "Receiving Module",
    audience: "For your dock operator and AP team",
    oneline:
      "Captures every delivery, runs the three-way match, classifies every variance with plain-English reasoning, and lifts exceptions to AP without anyone copy-pasting.",
    flow: [
      {
        step: "01",
        text: "Goods arrive at the dock. The operator captures the GRV — multi-line, with PO lookup, condition flags, photo evidence.",
      },
      {
        step: "02",
        text: "Vantage runs the three-way match automatically against the PO and the invoice. Clean matches go straight through.",
      },
      {
        step: "03",
        text: "Inspector classifies every mismatch — short-ship, damage, price drift, lead-time issue — with severity, confidence, and a plain-English reason.",
      },
      {
        step: "04",
        text: "The exception lifts into AP automatically with the evidence attached. No operator copy-paste, no information lost between systems.",
      },
    ],
    capabilities: [
      { text: "Multi-line GRV capture at the dock with PO lookup" },
      { text: "Three-way match (PO ↔ goods received ↔ invoice) — automatic" },
      { text: "Classify every variance: short-ship, damage, price drift, lead-time" },
      { text: "Severity calibration with plain-English reasoning per case" },
      { text: "Reject hallucinated variance types — only known categories accepted" },
      { text: "Fall back to a threshold ladder when the AI is unavailable" },
      { text: "Lift exceptions to AP automatically with evidence attached" },
      { text: "Manual run-match button for operator-triggered checks" },
      { text: "Track historical variance patterns per supplier and per SKU" },
      { text: "Predict which deliveries will have variances before the truck arrives", rolling: true },
      { text: "Photo evidence capture on dock condition flags", rolling: true },
      { text: "Stock-movement and GRV write-back to your ERP", rolling: true },
      { text: "Multi-line invoice partial matching for FIFO/LIFO real-world ops", rolling: true },
      { text: "Auto-resolve patterns: \"last 5 short-ships from Acme accepted — auto?\"", rolling: true },
      { text: "Voice-driven receiving from the dock floor", rolling: true },
    ],
    agents: ["Inspector"],
  },
];

const COMING_MODULES: ComingModule[] = [
  {
    id: "approvals",
    icon: CheckCircle2,
    name: "Approvals Module",
    audience: "For approvers, finance, ops",
    teaser:
      "Invoices, POs and expense claims through your approval ladder — written in plain English, learned from how your team actually decides.",
    status: "design",
  },
  {
    id: "compliance",
    icon: ShieldCheck,
    name: "Compliance Module",
    audience: "For ops managers and the auditor",
    teaser:
      "Watch every BEE cert, vendor doc and license renewal. Flag before the gap, draft the re-cert email, chase the supplier on your behalf.",
    status: "design",
  },
  {
    id: "onboarding",
    icon: UserPlus,
    name: "Onboarding Module",
    audience: "For sales ops and new-customer team",
    teaser:
      "One digital form replaces the email-PDF-spreadsheet shuffle. AI checks the docs, drafts the welcome flow, files everything correctly.",
    status: "design",
  },
  {
    id: "quality",
    icon: ClipboardCheck,
    name: "Quality Module",
    audience: "For your QC team",
    teaser:
      "Match every inspection against historical defect patterns. Anomalies route to QC with photos, PO and supplier history attached.",
    status: "planned",
  },
];

export const VantageModuleShowcase: React.FC = () => {
  return (
    <div className="relative">
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
          The Modules
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
          What each Module does —
          <br />
          <span style={{ color: "var(--muted)" }}>
            standalone, end-to-end.
          </span>
        </h2>
        <p
          className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Each Module is a complete operational layer for one part of
          the business. Drop any Module into your tenant and it ships
          with its own named AI, its own workflow primitives and its
          own operator surfaces — already wired into the Vantage Core
          for routing, approvals, audit and exceptions.
          <br />
          <br />
          Two Modules are{" "}
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>
            live in production today
          </span>
          ; four more are sequenced over the next 12 months. Custom
          Modules can be scoped on top in 1&ndash;2 weeks.
        </p>
      </div>

      {/* Live module deep-dive cards */}
      <div className="relative mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
        {LIVE_MODULES.map((m, i) => (
          <LiveModuleCard key={m.id} module={m} index={i} />
        ))}
      </div>

      {/* Coming soon — slim tiles, name + audience + one teaser line */}
      <div className="relative mt-12">
        <div
          className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-6"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          On the roadmap · sequenced over 12 months
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {COMING_MODULES.map((m, i) => (
            <ComingSoonTile key={m.id} module={m} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------------- Live module deep-dive card ---------------- */

const LiveModuleCard: React.FC<{
  module: LiveModule;
  index: number;
}> = ({ module: m, index }) => {
  const Icon = m.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
      className="relative rounded-2xl p-7 sm:p-8 overflow-hidden h-full flex flex-col"
      style={{
        background: "linear-gradient(180deg, var(--card-bg-accent) 0%, var(--card-bg-accent-2) 100%)",
        border: "1px solid var(--card-border-accent)",
        boxShadow:
          "inset 0 1px 0 var(--accent-soft), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
      }}
    >
      <span aria-hidden className="liquid-steel-sweep" />

      {/* Header — icon + LIVE pill */}
      <div className="flex items-start justify-between">
        <span
          className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
          style={{
            background: "var(--accent-soft)",
            border: "1px solid var(--card-border-accent-strong)",
            boxShadow: "inset 0 1px 0 rgba(244,168,114,0.10)",
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: "var(--accent)" }}
            strokeWidth={1.6}
          />
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-semibold"
          style={{
            background: "var(--accent-soft)",
            border: "1px solid var(--card-border-accent-strong)",
            color: "var(--accent)",
            fontFamily: "var(--font-body)",
          }}
        >
          <span
            className="inline-block w-1 h-1 rounded-full animate-pulse"
            style={{ background: "var(--accent)" }}
          />
          Live in production
        </span>
      </div>

      {/* Audience tag */}
      <div
        className="mt-7 text-[10px] uppercase tracking-[0.28em] font-semibold"
        style={{
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        {m.audience}
      </div>

      {/* Module name */}
      <h3
        className="mt-2 font-bold"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.5rem, 2.2vw, 2rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
        }}
      >
        {m.name}
      </h3>

      {/* One-line outcome */}
      <p
        className="mt-4 text-[15px] leading-relaxed"
        style={{
          color: "rgba(255,255,255,0.86)",
          fontFamily: "var(--font-body)",
          fontWeight: 500,
        }}
      >
        {m.oneline}
      </p>

      {/* AI inside chip row */}
      {m.agents.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {m.agents.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] font-semibold"
              style={{
                background: "var(--accent-soft)",
                border: "1px solid var(--card-border-accent-strong)",
                color: "var(--accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              <Brain className="w-3 h-3" strokeWidth={1.8} />
              {a}
            </span>
          ))}
        </div>
      )}

      {/* HOW IT WORKS — numbered flow */}
      <div
        className="mt-7 pt-6 border-t"
        style={{ borderColor: "var(--accent-soft)" }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-4"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-body)",
          }}
        >
          How it works
        </div>
        <ol className="space-y-3">
          {m.flow.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-md text-[10px] font-mono font-bold"
                style={{
                  background: "var(--accent-soft)",
                  border: "1px solid var(--card-border-accent)",
                  color: "var(--accent)",
                  fontFamily:
                    "var(--font-space-mono), ui-monospace, monospace",
                }}
              >
                {step.step}
              </span>
              <span
                className="text-[13.5px] leading-relaxed pt-0.5"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {step.text}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* WHAT IT CAN DO — outcome capabilities */}
      <div
        className="mt-7 pt-6 border-t"
        style={{ borderColor: "var(--accent-soft)" }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-4"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          What it can do
        </div>
        <ul className="space-y-2.5 flex-1">
          {m.capabilities.map((c, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px]">
              <span
                className="mt-0.5 inline-flex items-center justify-center shrink-0"
                style={{
                  color: c.rolling ? "var(--muted-2)" : "var(--accent)",
                }}
              >
                {c.rolling ? (
                  <Clock className="w-3.5 h-3.5" strokeWidth={2} />
                ) : (
                  <Check className="w-3.5 h-3.5" strokeWidth={2.2} />
                )}
              </span>
              <span
                style={{
                  color: c.rolling ? "var(--muted-2)" : "var(--muted)",
                  fontFamily: "var(--font-body)",
                  lineHeight: 1.5,
                }}
              >
                {c.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

/* ---------------- Coming soon slim tile ---------------- */

const ComingSoonTile: React.FC<{
  module: ComingModule;
  index: number;
}> = ({ module: m, index }) => {
  const Icon = m.icon;
  const statusLabel = m.status === "design" ? "Coming soon" : "Planned";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, ease, delay: index * 0.06 }}
      className="relative rounded-2xl p-6 overflow-hidden h-full flex flex-col"
      style={{
        background: "linear-gradient(180deg, var(--card-bg-elev) 0%, var(--card-bg-elev-2) 100%)",
        border: "1px dashed rgba(255, 255, 255, 0.12)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
      }}
    >
      {/* Header — icon + status */}
      <div className="flex items-start justify-between">
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            border: "1px solid rgba(255, 255, 255, 0.10)",
          }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: "rgba(255, 255, 255, 0.55)" }}
            strokeWidth={1.6}
          />
        </span>
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] uppercase tracking-[0.22em] font-semibold"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.10)",
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          {statusLabel}
        </span>
      </div>

      {/* Audience */}
      <div
        className="mt-6 text-[10px] uppercase tracking-[0.28em] font-semibold"
        style={{
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        {m.audience}
      </div>

      {/* Name */}
      <h3
        className="mt-2 font-bold"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.1rem, 1.4vw, 1.3rem)",
          letterSpacing: "-0.015em",
          lineHeight: 1.1,
        }}
      >
        {m.name}
      </h3>

      {/* Teaser */}
      <p
        className="mt-3 text-[13px] leading-relaxed flex-1"
        style={{
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        {m.teaser}
      </p>

      {/* Footer line */}
      <div
        className="mt-5 pt-4 border-t flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-semibold"
        style={{
          borderColor: "rgba(255, 255, 255, 0.06)",
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        <span>Full spec on launch</span>
        <ArrowRight className="w-3 h-3" strokeWidth={2} />
      </div>
    </motion.div>
  );
};
