"use client";

import { motion } from "framer-motion";
import {
  Brain,
  ShoppingCart,
  Gavel,
  PackageSearch,
  Mail,
  Radar,
  Compass as CompassIcon,
  ScanLine,
  MessageSquare,
  Sparkles,
  ShieldOff,
  ScrollText,
  Eye,
  GraduationCap,
  Wand2,
  FileSearch2,
} from "lucide-react";

/**
 * VantageIntelligence — the "AI inside Vantage" section.
 *
 * Sits right after the architecture diagram on /vantage. The architecture
 * shows the modules + core; this section shows WHO IS DOING THE WORK
 * inside them — the named AI specialists.
 *
 * The point: Vantage is not one chatbot. It's a roster of specialised
 * AIs, each with one job, each trained on your data. The combined
 * picture beats anything else in this category — but we let the list
 * make that case rather than claiming it directly.
 *
 * Layout:
 *   1. Section header — "Eleven specialised AIs..."
 *   2. Module specialists grid (4 cards: Forecaster, Auctioneer,
 *      Inspector, Courier)
 *   3. Core specialists grid (4 cards: Sentinel, Compass, Scribe,
 *      Ask Vantage)
 *   4. Traits strip — 8 capabilities that distinguish the AI
 */

const ease = [0.16, 1, 0.3, 1] as const;

type AgentStatus = "live" | "rolling";

type Agent = {
  name: string;
  scope: string;
  role: string;
  body: string;
  icon: typeof Brain;
  status: AgentStatus;
};

const MODULE_AGENTS: Agent[] = [
  {
    name: "Forecaster",
    scope: "Procurement",
    role: "Drafts the order",
    body: "Stock falls below your reorder line and Forecaster proposes the order — how much to buy, from which supplier, with the landed-cost reasoning behind it. Your buyer reviews and approves, or overrides with a reason that trains the next cycle.",
    icon: ShoppingCart,
    status: "live",
  },
  {
    name: "Auctioneer",
    scope: "Procurement",
    role: "Ranks supplier quotes",
    body: "When the RFQ closes, Auctioneer ranks every quote on total landed cost — unit price plus lead-time risk plus supplier reliability. Not just the cheapest line. Your buyer sees the ranking, the reasoning, and one-click evidence behind every score.",
    icon: Gavel,
    status: "live",
  },
  {
    name: "Inspector",
    scope: "Receiving",
    role: "Classifies every variance",
    body: "When the goods received don't match the PO or the invoice, Inspector classifies the variance — short-ship, damage, price drift — with severity and a plain-English reason. The exception goes straight to AP without anyone copy-pasting between systems.",
    icon: PackageSearch,
    status: "live",
  },
  {
    name: "Courier",
    scope: "Procurement",
    role: "Runs the RFQ",
    body: "Drafts the RFQ email, sends it to the invited suppliers, parses the responses back into the platform, and feeds them straight into Auctioneer. The buyer never opens a separate inbox to chase quotes.",
    icon: Mail,
    status: "rolling",
  },
];

const CORE_AGENTS: Agent[] = [
  {
    name: "Sentinel",
    scope: "Core",
    role: "Classifies what arrived",
    body: "Every inbound item — email, document, ERP delta, dock capture — is read by Sentinel and tagged with a type and a severity. Cross-Module: it works the same on a procurement variance and a customer dispute.",
    icon: Radar,
    status: "live",
  },
  {
    name: "Compass",
    scope: "Core",
    role: "Routes to the right person",
    body: "Once Sentinel has classified the case, Compass picks the right operator at the right step — by approval ladder, supplier amount, site, category, or workload. Plain-English rules, no flowchart-builder needed.",
    icon: CompassIcon,
    status: "live",
  },
  {
    name: "Scribe",
    scope: "Core",
    role: "Reads documents",
    body: "PDFs, scanned invoices, supplier emails, photos from the dock floor — Scribe extracts the structured fields and feeds them into the right Module. The operator stops re-typing what's already on the page.",
    icon: ScanLine,
    status: "live",
  },
  {
    name: "Ask Vantage",
    scope: "Core",
    role: "Answers questions on your data",
    body: "Ask anything in plain English — \"why did we override this PO last quarter?\", \"which supplier costs us most in late deliveries?\". Ask Vantage answers with citations to the underlying records, not vibes from a public model.",
    icon: MessageSquare,
    status: "live",
  },
];

type Trait = {
  icon: typeof Brain;
  title: string;
  body: string;
  group: "trust" | "depth" | "control";
};

const GROUPS: Record<Trait["group"], { label: string; blurb: string }> = {
  trust: {
    label: "Trust on every call",
    blurb:
      "Why your operators, your auditors and your CFO can stand behind anything Vantage proposes.",
  },
  depth: {
    label: "Depth your team can feel",
    blurb:
      "Specialists, reasoning, evidence and continuous learning — not a chatbot in a sidebar.",
  },
  control: {
    label: "Control without the maintenance bill",
    blurb:
      "Plain-English rules, deterministic fallbacks, and guards that hold the line when the model is uncertain.",
  },
};

const TRAITS: Trait[] = [
  /* ── Trust on every call ─────────────────────────────────────── */
  {
    icon: Sparkles,
    title: "Trained on your data, never pooled",
    body: "Every AI in the platform is tuned to your operation, your suppliers, your overrides — and rebuilds nightly. Nothing is shared with any other tenant.",
    group: "trust",
  },
  {
    icon: ShieldOff,
    title: "Cannot invent what it never saw",
    body: "Guards reject any answer outside your real records. The AI cannot fabricate a supplier, a price, an SKU or a variance type. If it's not in your data, it doesn't appear.",
    group: "trust",
  },
  {
    icon: Eye,
    title: "One-click evidence on every claim",
    body: "Every recommendation has a button that surfaces the exact rows, POs, emails and documents the AI looked at before it decided. Auditors trust it; operators don't have to.",
    group: "trust",
  },
  {
    icon: ScrollText,
    title: "Cited sources on every answer",
    body: "Ask Vantage answers in plain English with citations to the underlying records — POs, GRNs, override notes, supplier history. Not vibes from a public model.",
    group: "trust",
  },
  {
    icon: FileSearch2,
    title: "Confidence number on every call",
    body: "Each recommendation comes with a confidence figure. Below threshold the case holds at a human — no silent auto-routing on a low-trust signal.",
    group: "trust",
  },
  {
    icon: ScrollText,
    title: "POPIA-aligned audit trail",
    body: "Every recommendation, every override, every state change — logged with the named AI that did it, the data it saw, and the operator who decided. Regulator-ready, complete.",
    group: "trust",
  },

  /* ── Depth your team can feel ────────────────────────────────── */
  {
    icon: Brain,
    title: "Eight named specialists, not one chatbot",
    body: "Forecaster drafts the order. Auctioneer ranks the quote. Inspector classifies the variance. Each AI does one job, in one Module, on your data — and they keep learning.",
    group: "depth",
  },
  {
    icon: Wand2,
    title: "Drafts the work, doesn't just chat",
    body: "Vantage proposes the next move — the order qty, the supplier, the variance call, the next approver. Your operator decides. We don't ship a chatbot that puts the work back on you.",
    group: "depth",
  },
  {
    icon: Brain,
    title: "Reasoning visible on every recommendation",
    body: "Every AI shows its working — why this supplier, why this severity, why this approver. No black-box scores. No \"because the model said so\".",
    group: "depth",
  },
  {
    icon: GraduationCap,
    title: "Learns from every override",
    body: "When your buyer corrects the AI, the reason gets baked into the next cycle. The AI gets sharper at your way of working, week after week — not generic, you-shaped.",
    group: "depth",
  },
  {
    icon: Eye,
    title: "Three pattern analyzers always on",
    body: "Engines watch continuously for stuck stages, repeat exceptions and unassigned high-priority work. The AI surfaces the pattern; you decide the fix.",
    group: "depth",
  },
  {
    icon: Sparkles,
    title: "Cross-Module memory",
    body: "An override on a procurement variance teaches receiving the next time the same supplier ships short. One lesson, every Module — without retraining anything.",
    group: "depth",
  },
  {
    icon: Brain,
    title: "Reads documents the way your team does",
    body: "Scribe extracts structured fields from PDFs, scanned invoices, supplier emails and dock photos — into the right Module, on the right record, with the page references attached.",
    group: "depth",
  },

  /* ── Control without the maintenance bill ────────────────────── */
  {
    icon: Wand2,
    title: "Plain-English automation rules",
    body: "Type a rule the way you'd brief a junior — \"if the variance is above 10% and the supplier is new, route to me.\" The AI parses it, checks for conflicts with existing rules, and ships it. No flowchart-builder, no DSL.",
    group: "control",
  },
  {
    icon: ShieldOff,
    title: "Holds at a human below threshold",
    body: "If confidence drops or the inputs look unusual, the case stops at the right person with the AI's reasoning attached — not a silent escalation, not a wrong call.",
    group: "control",
  },
  {
    icon: Brain,
    title: "Deterministic fallback if the model is down",
    body: "Every Module degrades to a safe rules-based fallback when the AI is unavailable. The work never blocks waiting for a model — operators keep moving on the same screen.",
    group: "control",
  },
  {
    icon: GraduationCap,
    title: "SLA-aware queueing",
    body: "Cases are surfaced by deadline, not by arrival order. Compass routes the right work to the right person at the right step — your highest-risk case is always at the top.",
    group: "control",
  },
  {
    icon: Sparkles,
    title: "Anonymous peer benchmarking, opt-in",
    body: "See how your variance rate, approval cycle time and exception patterns compare to peers in your industry — without a single record of yours leaving your tenant.",
    group: "control",
  },
];

export const VantageIntelligence: React.FC = () => {
  return (
    <div className="relative">
      {/* Subtle warm wash so this section feels like a different layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[1100px] h-[700px] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(244,168,114,0.06) 0%, rgba(244,168,114,0) 70%)",
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
          The intelligence inside
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
          Eight specialised AIs.
          <br />
          <span style={{ color: "var(--muted)" }}>
            Each one a specialist. Each one in your data.
          </span>
        </h2>
        <p
          className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Vantage isn&rsquo;t one chatbot doing everything badly. It&rsquo;s
          eight purpose-built AIs, each with{" "}
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>
            one job it does well
          </span>{" "}
          — and{" "}
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>
            trained on your data, never pooled with anyone else&rsquo;s.
          </span>{" "}
          One drafts orders. One ranks supplier quotes. One automates the
          RFQ. One classifies receiving variances. One classifies whatever
          arrived in the queue. One routes work to the right person. One
          reads documents. One answers questions on your data, with
          citations. Every one shows its reasoning before you decide.
        </p>

        {/* Capability strip — six distinct things the AIs do */}
        <div className="mt-7 flex flex-wrap gap-2">
          {[
            { label: "Draft", count: 2 },
            { label: "Rank", count: 1 },
            { label: "Automate", count: 1 },
            { label: "Classify", count: 2 },
            { label: "Route", count: 1 },
            { label: "Read", count: 1 },
            { label: "Answer", count: 1 },
          ].map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-semibold"
              style={{
                background: "var(--accent-soft)",
                border: "1px solid var(--card-border-accent)",
                color: "var(--accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              {c.label}
              <span
                className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono font-bold"
                style={{
                  background: "color-mix(in srgb, var(--accent) 24%, transparent)",
                  color: "var(--on-card-fg, var(--fg))",
                  fontFamily:
                    "var(--font-space-mono), ui-monospace, monospace",
                }}
              >
                ×{c.count}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Module specialists */}
      <div className="relative mt-16">
        <div
          className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-6"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          Module specialists · live in each Module
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MODULE_AGENTS.map((a, i) => (
            <AgentCard key={a.name} agent={a} index={i} variant="module" />
          ))}
        </div>
      </div>

      {/* Core specialists */}
      <div className="relative mt-12">
        <div
          className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-6"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          Core specialists · work across every Module
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CORE_AGENTS.map((a, i) => (
            <AgentCard key={a.name} agent={a} index={i} variant="core" />
          ))}
        </div>
      </div>

      {/* Traits — what makes the AI different */}
      <div className="relative mt-20">
        <div className="max-w-4xl">
          <div
            className="text-[11px] uppercase tracking-[0.28em] font-semibold mb-4"
            style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
          >
            What makes the AI different
          </div>
          <h3
            className="font-extrabold"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
              fontSize: "clamp(1.7rem, 3vw, 2.6rem)",
              lineHeight: 1.05,
              color: "var(--fg)",
            }}
          >
            Eighteen things every Vantage AI does
            <span style={{ color: "var(--muted)" }}>
              {" "}— before your operator sees a single recommendation.
            </span>
          </h3>
          <p
            className="mt-5 text-base leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Three groups: the trust guarantees that hold on every call,
            the depth your team feels day-to-day, and the controls that
            keep the AI in line without a maintenance bill.
          </p>
        </div>

        {(["trust", "depth", "control"] as const).map((g, gIdx) => {
          const groupTraits = TRAITS.filter((t) => t.group === g);
          return (
            <div key={g} className={gIdx === 0 ? "mt-12" : "mt-14"}>
              {/* Group header */}
              <div className="flex items-baseline gap-4 max-w-3xl mb-6">
                <span
                  className="text-[10px] uppercase tracking-[0.32em] font-mono shrink-0"
                  style={{
                    color: "var(--accent)",
                    fontFamily:
                      "var(--font-space-mono), ui-monospace, monospace",
                  }}
                >
                  0{gIdx + 1}
                </span>
                <div>
                  <h4
                    className="font-bold"
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(1.15rem, 1.6vw, 1.45rem)",
                      letterSpacing: "-0.015em",
                      lineHeight: 1.15,
                    }}
                  >
                    {GROUPS[g].label}
                  </h4>
                  <p
                    className="mt-1.5 text-[13.5px] leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {GROUPS[g].blurb}
                  </p>
                </div>
              </div>

              {/* Group grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupTraits.map((t, i) => {
                  const Icon = t.icon;
                  return (
                    <motion.div
                      key={t.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.55, ease, delay: i * 0.04 }}
                      className="relative rounded-2xl p-6 overflow-hidden h-full"
                      style={{
                        background:
                          "linear-gradient(180deg, var(--card-bg-elev) 0%, var(--card-bg-elev-2) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.07)",
                        boxShadow:
                          "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 20px 50px -20px rgba(0, 0, 0, 0.5)",
                      }}
                    >
                      <span
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg"
                        style={{
                          background: "var(--accent-soft)",
                          border: "1px solid var(--card-border-accent)",
                        }}
                      >
                        <Icon
                          className="w-4 h-4"
                          style={{ color: "var(--accent)" }}
                          strokeWidth={1.6}
                        />
                      </span>
                      <h5
                        className="mt-5 font-bold"
                        style={{
                          color: "var(--fg)",
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
                          letterSpacing: "-0.005em",
                          lineHeight: 1.2,
                        }}
                      >
                        {t.title}
                      </h5>
                      <p
                        className="mt-2 text-[13px] leading-relaxed"
                        style={{
                          color: "var(--muted)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {t.body}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ---------------- subcomponents ---------------- */

const AgentCard: React.FC<{
  agent: Agent;
  index: number;
  variant: "module" | "core";
}> = ({ agent, index, variant }) => {
  const Icon = agent.icon;
  const live = agent.status === "live";
  const accent = variant === "module";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease, delay: index * 0.06 }}
      className="relative rounded-2xl p-7 overflow-hidden h-full flex flex-col"
      style={{
        background: accent
          ? "linear-gradient(180deg, var(--card-bg-accent) 0%, var(--card-bg-accent-2) 100%)"
          : "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
        border: `1px solid ${
          accent ? "var(--card-border-accent)" : "rgba(255, 255, 255, 0.08)"
        }`,
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
      }}
    >
      <span aria-hidden className="liquid-steel-sweep" />

      {/* Header — icon + status pill */}
      <div className="flex items-start justify-between">
        <span
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl"
          style={{
            background: accent
              ? "var(--accent-soft)"
              : "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
            border: `1px solid ${
              accent ? "var(--card-border-accent-strong)" : "rgba(255, 255, 255, 0.10)"
            }`,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: accent ? "var(--accent)" : "rgba(255,255,255,0.85)" }}
            strokeWidth={1.6}
          />
        </span>
        <span
          className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] font-semibold"
          style={{
            color: live ? "var(--accent)" : "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          {live && (
            <span
              className="inline-block w-1 h-1 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
          )}
          {live ? "Live" : "Rolling out"}
        </span>
      </div>

      {/* Name + scope */}
      <div className="mt-6">
        <div
          className="text-[10px] uppercase tracking-[0.28em] font-semibold"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          {agent.scope} · {agent.role}
        </div>
        <h4
          className="mt-2 font-bold leading-none"
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 2vw, 1.75rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {agent.name}
        </h4>
      </div>

      {/* Body */}
      <p
        className="mt-5 text-[13.5px] leading-relaxed flex-1"
        style={{
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        {agent.body}
      </p>
    </motion.div>
  );
};
