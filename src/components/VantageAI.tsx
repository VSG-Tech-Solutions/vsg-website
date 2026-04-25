"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Lightbulb,
  UserCheck,
  Rocket,
  Shield,
  FileText,
  Sparkles,
  ArrowRight,
  Tags,
  Compass,
  TrendingUp,
  ScanLine,
  Radar,
  Bot,
  Mic,
  MessageSquare,
  BookOpen,
  Workflow,
  Mail,
  AlertTriangle,
} from "lucide-react";

/**
 * Dedicated Vantage AI showcase — the flagship capability gets its own full
 * section between HowItWorks and Features. Designed to make the AI feel
 * structural (not decorative) by showing the 4-stage learning loop, realistic
 * suggestion evidence, and the trust frame all together.
 */

const stages = [
  {
    icon: Eye,
    step: "01",
    title: "Learn",
    body: "Silently watches every exception for the first 30 days. Builds a pattern index by supplier, amount, line item, day-of-week, resolution path.",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Suggest",
    body: "Surfaces recurring patterns as candidate rules — each with the evidence that triggered it: occurrence count, match rate, three real samples.",
  },
  {
    icon: UserCheck,
    step: "03",
    title: "Approve",
    body: "A human reviews the suggestion, edits the rule in plain English if needed, and approves it. Nothing goes live autonomously. Ever.",
  },
  {
    icon: Rocket,
    step: "04",
    title: "Deploy",
    body: "Approved rules run deterministically from that point on. Outcomes feed back into the pattern index. Next suggestion is sharper.",
  },
];

const suggestions = [
  {
    pattern: "Supplier 422 — Tuesday short-ships",
    stat: "8 occurrences",
    match: "94%",
    samples: [
      { ref: "PO 10482 · Tue", delta: "−3 units" },
      { ref: "PO 10519 · Tue", delta: "−7 units" },
      { ref: "PO 10556 · Tue", delta: "−2 units" },
    ],
    rule: "Auto-route Supplier 422 receiving variances to Procurement Lead + flag supplier on dashboard.",
  },
  {
    pattern: "Small invoice variances under R200",
    stat: "47 occurrences",
    match: "98%",
    samples: [
      { ref: "INV 2024-0812", delta: "R 182" },
      { ref: "INV 2024-0914", delta: "R 56" },
      { ref: "INV 2024-0977", delta: "R 141" },
    ],
    rule: "Auto-approve invoice-PO variance when delta ≤ R200 and supplier tier = A.",
  },
  {
    pattern: "Line 3 paint NCRs trending up",
    stat: "12 in 14 days",
    match: "vs. 4 prev. fortnight",
    samples: [
      { ref: "NCR 844 · Line 3", delta: "Paint finish" },
      { ref: "NCR 861 · Line 3", delta: "Paint finish" },
      { ref: "NCR 879 · Line 3", delta: "Paint finish" },
    ],
    rule: "Alert Quality Manager within 15 min for any Line 3 paint NCR; flag trend on QC dashboard.",
  },
];

// The full capability surface — every AI thing Vantage actually does in
// production today or in the live PRD pipeline. Grouped so an operator can
// scan it in 30 seconds and see this is a working AI platform, not a single
// magic trick.
type Capability = {
  icon: typeof Eye;
  group: string;
  title: string;
  body: string;
};

const capabilities: Capability[] = [
  // Classify & route
  {
    icon: Tags,
    group: "Classify & route",
    title: "Auto-classify every exception",
    body: "Reads the item, assigns type, severity and a confidence score. No manual triage queue.",
  },
  {
    icon: Compass,
    group: "Classify & route",
    title: "Smart routing by workload + expertise",
    body: "Picks the right owner using current load, past resolution history and supplier-specific knowledge — not a static round-robin.",
  },
  {
    icon: Sparkles,
    group: "Classify & route",
    title: "Auto-resolve safe, low-risk items",
    body: "Closes simple items automatically when confidence clears 97% — admin opt-in only, fully audited.",
  },

  // Predict
  {
    icon: TrendingUp,
    group: "Predict",
    title: "SLA breach prediction",
    body: "Flags individual items likely to breach SLA before they do, so the team intervenes instead of reacting.",
  },
  {
    icon: TrendingUp,
    group: "Predict",
    title: "Volume & workload forecasting",
    body: "Projects 7/14/30-day exception volume and team capacity gaps. Plan staffing against signal, not guesswork.",
  },
  {
    icon: TrendingUp,
    group: "Predict",
    title: "Month-end readiness scoring",
    body: "Predicts month-end close readiness in the final week and surfaces the items that could derail it.",
  },

  // Document intelligence
  {
    icon: ScanLine,
    group: "Document intelligence",
    title: "OCR + NLP invoice extraction",
    body: "Reads scanned PDFs and warehouse-floor photos, maps text to invoice fields with per-field confidence scores.",
  },
  {
    icon: ScanLine,
    group: "Document intelligence",
    title: "Auto-populated item fields",
    body: "Extracted values land directly in the item — no re-keying, no copy-paste errors, no clipboard tax.",
  },

  // Anomaly radar
  {
    icon: Radar,
    group: "Anomaly radar",
    title: "Proactive anomaly detection",
    body: "Continuous background scans surface emerging issues — supplier drift, AP aging trends, resolution-rate slip — before anyone reports them.",
  },
  {
    icon: AlertTriangle,
    group: "Anomaly radar",
    title: "Supplier performance drift alerts",
    body: "Catches delivery-accuracy and reject-rate drift inside 48 hours instead of the usual 2–6 week manual lag.",
  },
  {
    icon: AlertTriangle,
    group: "Anomaly radar",
    title: "Exception clustering",
    body: "Groups multiple exceptions from the same supplier, PO or site so systemic issues stop hiding inside the daily noise.",
  },

  // Agent mode
  {
    icon: Bot,
    group: "Investigation agents",
    title: "Autonomous multi-step investigation",
    body: "Agent pulls the PO, GRV and invoice, compares pricing, identifies the discrepancy and drafts the supplier email — all in one pass.",
  },
  {
    icon: FileText,
    group: "Investigation agents",
    title: "Investigation dossiers",
    body: "Each investigation produces a structured dossier: documents retrieved, discrepancies found, financial impact in Rand, recommended action.",
  },

  // Voice & NL
  {
    icon: Mic,
    group: "Voice & natural language",
    title: "Voice exception logging",
    body: "Warehouse staff log exceptions hands-free: \u201CSupplier X, 50 units short, PO 4482\u201D — the item is created and routed automatically.",
  },
  {
    icon: MessageSquare,
    group: "Voice & natural language",
    title: "Plain-English querying",
    body: "Ask \u201Cwhich suppliers have the most unresolved exceptions this month?\u201D and get a real answer back, no dashboard navigation.",
  },
  {
    icon: Mic,
    group: "Voice & natural language",
    title: "Voice approvals",
    body: "Approvers say \u201CApprove\u201D in response to a notification. The system reads the item summary back before it commits.",
  },

  // Knowledge capture
  {
    icon: BookOpen,
    group: "Resolution playbooks",
    title: "Auto-generated playbooks",
    body: "Mines how your best operators actually resolve recurring exceptions and turns those patterns into step-by-step playbooks the rest of the team can follow.",
  },
  {
    icon: BookOpen,
    group: "Resolution playbooks",
    title: "Knowledge-transfer reports",
    body: "When an experienced operator leaves, their resolution patterns are already captured. Institutional knowledge stops walking out the door.",
  },

  // Workflow advisor
  {
    icon: Workflow,
    group: "Workflow advisor",
    title: "Cross-tenant configuration insights",
    body: "Recommends optimal stage counts, escalation timers and approval depths based on anonymised patterns from the highest-performing similar workflows.",
  },
  {
    icon: Workflow,
    group: "Workflow advisor",
    title: "Workflow health scoring",
    body: "Weekly 0\u2013100 health score on every workflow — stage efficiency, escalation effectiveness, routing accuracy, SLA compliance.",
  },

  // Executive briefing
  {
    icon: Mail,
    group: "Executive intelligence",
    title: "AI CFO briefing emails",
    body: "Scheduled natural-language briefings: exceptions resolved, items at risk, problem suppliers, AP aging movement, prioritised action list — straight to the inbox.",
  },
  {
    icon: TrendingUp,
    group: "Executive intelligence",
    title: "Anonymised peer benchmarking",
    body: "See where you sit against anonymised industry peers on resolution time, exception rate and SLA compliance — and what top performers do differently.",
  },
];

const guarantees = [
  {
    icon: Shield,
    title: "AI proposes. Humans approve.",
    body: "Nothing runs autonomously. Every rule, every escalation, every approval is human-signed-off before it goes live.",
  },
  {
    icon: FileText,
    title: "Evidence with every suggestion.",
    body: "No black boxes. Every proposed rule ships with the pattern, the occurrence count, the match rate, and three real samples.",
  },
  {
    icon: Sparkles,
    title: "Deterministic once live.",
    body: "AI suggests; rules execute. Once approved, a rule runs the same way every time — auditable, explainable, repeatable.",
  },
];

export const VantageAI: React.FC = () => {
  return (
    <section
      id="vantage-ai"
      className="relative w-full py-28 border-t overflow-hidden"
      // Scoped pink override — every child reading var(--accent*) inside this
      // section reads pink, without touching the global teal/cyan palette.
      style={
        {
          background: "var(--bg)",
          color: "var(--fg)",
          borderColor: "var(--card-border)",
          "--accent": "#ec4899",
          "--accent-2": "#f9a8d4",
          "--accent-glow": "rgba(244, 114, 182, 0.45)",
          "--accent-soft": "rgba(236, 72, 153, 0.12)",
          "--ring": "rgba(236, 72, 153, 0.55)",
        } as React.CSSProperties
      }
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[160px] opacity-70"
        style={{ background: "var(--accent-soft)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
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
            <span>Vantage AI</span>
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            An AI that earns{" "}
            <span style={{ color: "var(--accent-2)" }}>
              the operator&apos;s trust.
            </span>
          </h2>
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Vantage AI manages and controls the operation around your
            workflows — watching every exception, routing work to the right
            owner, learning from every decision, and proposing new rules with
            evidence for a human to approve. The more exceptions flow through
            the system, the sharper the suggestions. The rules themselves,
            once live, are deterministic: no drift, no surprises, no black
            boxes.
          </p>
        </motion.div>

        {/* Ask Vantage — NL model that knows your operation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="relative mt-14 rounded-3xl border overflow-hidden themed-rounded"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent) 45%, var(--card-border))",
            background:
              "linear-gradient(145deg, color-mix(in oklab, var(--accent) 10%, var(--card-bg)), var(--card-bg))",
            boxShadow:
              "0 30px 80px -30px var(--accent-glow), inset 0 0 0 1px color-mix(in oklab, var(--accent-2) 18%, transparent)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-24 -left-16 w-[360px] h-[360px] rounded-full blur-[120px] opacity-70"
            style={{ background: "var(--accent-glow)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 -right-10 w-[420px] h-[420px] rounded-full blur-[140px] opacity-50"
            style={{
              background:
                "color-mix(in oklab, var(--accent) 60%, transparent)",
            }}
          />

          <div className="relative grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left — copy */}
            <div className="p-8 sm:p-10 lg:p-12">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] uppercase tracking-[0.25em] themed-rounded"
                style={{
                  borderColor: "var(--ring)",
                  background: "var(--accent-soft)",
                  color: "var(--accent-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Sparkles className="w-3 h-3" />
                Ask Vantage
              </div>
              <h3
                className="mt-5 text-2xl sm:text-3xl lg:text-[2.1rem] font-bold leading-[1.1] tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fg)",
                }}
              >
                A natural-language model that already{" "}
                <span style={{ color: "var(--accent-2)" }}>
                  knows your business.
                </span>
              </h3>
              <p
                className="mt-4 text-sm sm:text-base leading-relaxed"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Vantage indexes every exception, every approval, every
                supplier interaction, every resolution path — every operational
                event the platform has ever seen on your tenant. Ask it
                anything in plain English. It pulls the answer from your real
                data, with citations back to the underlying items.
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  "Pulls from your full operational history — every item, comment, approval and audit-trail entry, indefinitely.",
                  "Knows your suppliers, sites, teams, SLA targets, escalation rules, common exceptions and how you usually resolve them.",
                  "Answers in plain English — and links back to the actual PO, invoice, NCR or item it pulled the answer from.",
                  "Suggests next actions, drafts supplier emails, proposes new rules, summarises a week — all grounded in your data, not generic web text.",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2.5 text-[13px] leading-relaxed"
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span
                      className="mt-1.5 inline-block h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ background: "var(--accent)" }}
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — chat preview */}
            <div
              className="relative p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--accent) 25%, var(--card-border))",
                background:
                  "color-mix(in oklab, var(--accent) 4%, var(--bg))",
              }}
            >
              <div
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] mb-4"
                style={{
                  color: "var(--accent-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--accent)" }}
                />
                Live · grounded in your tenant
              </div>

              <div className="space-y-3">
                {/* User question */}
                <div
                  className="rounded-2xl border p-3.5 themed-rounded text-[13px] leading-relaxed"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--card-bg)",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.2em] mb-1"
                    style={{ color: "var(--muted-2)" }}
                  >
                    You
                  </div>
                  &ldquo;Which supplier has cost us the most in
                  exceptions this quarter, and what&apos;s the pattern?&rdquo;
                </div>

                {/* AI answer */}
                <div
                  className="rounded-2xl border p-3.5 themed-rounded text-[13px] leading-relaxed"
                  style={{
                    borderColor:
                      "color-mix(in oklab, var(--accent) 40%, var(--card-border))",
                    background:
                      "color-mix(in oklab, var(--accent) 7%, var(--card-bg))",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                    boxShadow: "0 0 24px var(--accent-glow)",
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.2em] mb-1.5 inline-flex items-center gap-1"
                    style={{ color: "var(--accent-2)" }}
                  >
                    <Sparkles className="w-2.5 h-2.5" />
                    Vantage AI
                  </div>
                  <p>
                    Supplier{" "}
                    <span
                      className="font-semibold"
                      style={{ color: "var(--accent-2)" }}
                    >
                      422 (PrecisionParts)
                    </span>{" "}
                    — 14 exceptions, 8 of them Tuesday short-ships
                    averaging 4 units below PO. Same root cause as Q3.{" "}
                    <span style={{ color: "var(--muted)" }}>
                      Want me to draft the supplier email, or open a rule to
                      auto-route Tuesday receipts from them?
                    </span>
                  </p>
                  <div
                    className="mt-3 pt-3 border-t flex flex-wrap gap-1.5 text-[10px]"
                    style={{
                      borderColor:
                        "color-mix(in oklab, var(--accent) 25%, var(--card-border))",
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span>Sources:</span>
                    <span
                      className="px-1.5 py-0.5 rounded font-mono"
                      style={{
                        background: "var(--bg-elev)",
                        color: "var(--fg)",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      PO-10482
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded font-mono"
                      style={{
                        background: "var(--bg-elev)",
                        color: "var(--fg)",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      PO-10519
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded font-mono"
                      style={{
                        background: "var(--bg-elev)",
                        color: "var(--fg)",
                        border: "1px solid var(--card-border)",
                      }}
                    >
                      +12 more
                    </span>
                  </div>
                </div>

                {/* Prompt chips */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {[
                    "What items are overdue right now?",
                    "How is the team performing this week?",
                    "Show me Sage invoice mismatches this month",
                    "Draft a month-end ops summary for the CFO",
                  ].map((q) => (
                    <div
                      key={q}
                      className="rounded-lg border px-3 py-2 text-[11px] leading-snug themed-rounded"
                      style={{
                        borderColor: "var(--card-border)",
                        background: "var(--card-bg)",
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 4-stage loop */}
        <div className="mt-16 relative">
          {/* Connector line (md+ only) */}
          <div
            className="hidden md:block pointer-events-none absolute top-[34px] left-[5%] right-[5%] h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, var(--accent-2), var(--accent), var(--accent-2), transparent)",
              opacity: 0.5,
            }}
          />
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="hidden md:block pointer-events-none absolute top-[34px] left-[5%] right-[5%] h-[2px] origin-left"
            style={{
              background:
                "linear-gradient(to right, var(--accent-2), var(--accent))",
              boxShadow: "0 0 12px var(--accent-glow)",
            }}
          />

          <div className="grid gap-8 md:grid-cols-4 relative">
            {stages.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.12 }}
                  className="flex flex-col items-center text-center px-2"
                >
                  <div
                    className="relative inline-flex items-center justify-center w-[68px] h-[68px] rounded-full border-2 themed-rounded"
                    style={{
                      borderColor: "var(--accent-2)",
                      background:
                        "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 15%, var(--bg-elev)), var(--bg-elev))",
                      boxShadow:
                        "0 0 32px var(--accent-glow), inset 0 0 20px color-mix(in oklab, var(--accent) 10%, transparent)",
                    }}
                  >
                    <Icon
                      className="w-6 h-6"
                      style={{ color: "var(--accent-2)" }}
                      strokeWidth={1.8}
                    />
                    <span
                      className="absolute -bottom-2 -right-2 text-[10px] font-mono tracking-widest px-1.5 py-0.5 rounded-md border"
                      style={{
                        color: "var(--accent-2)",
                        borderColor: "var(--card-border)",
                        background: "var(--bg)",
                      }}
                    >
                      {s.step}
                    </span>
                  </div>
                  <h3
                    className="mt-5 text-lg font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--fg)",
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {s.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Example suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <div
                className="text-[11px] uppercase tracking-[0.25em]"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                What a real suggestion looks like
              </div>
              <h3
                className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fg)",
                }}
              >
                Patterns Vantage AI has actually spotted.
              </h3>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {suggestions.map((sug, i) => (
              <motion.div
                key={sug.pattern}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="relative rounded-2xl border p-5 flex flex-col themed-rounded"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--card-bg)",
                }}
              >
                <div
                  className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-md text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color: "var(--accent-2)",
                    background: "var(--accent-soft)",
                    border: "1px solid var(--ring)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Sparkles className="w-3 h-3" />
                  AI suggestion
                </div>

                <h4
                  className="mt-4 text-base font-semibold leading-snug"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  {sug.pattern}
                </h4>

                <div className="mt-3 flex items-center gap-3 text-xs">
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border font-mono"
                    style={{
                      borderColor: "var(--card-border)",
                      background: "var(--bg-elev)",
                      color: "var(--fg)",
                    }}
                  >
                    {sug.stat}
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md border font-mono"
                    style={{
                      borderColor: "var(--ring)",
                      background: "var(--accent-soft)",
                      color: "var(--accent-2)",
                    }}
                  >
                    {sug.match}
                  </span>
                </div>

                <div
                  className="mt-4 pt-4 border-t space-y-1.5"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.2em]"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Sample evidence
                  </div>
                  {sug.samples.map((s) => (
                    <div
                      key={s.ref}
                      className="flex items-center justify-between text-[11px] font-mono"
                      style={{ color: "var(--muted)" }}
                    >
                      <span>{s.ref}</span>
                      <span style={{ color: "var(--fg)" }}>{s.delta}</span>
                    </div>
                  ))}
                </div>

                <div
                  className="mt-4 pt-4 border-t"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.2em] mb-2"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Proposed rule
                  </div>
                  <p
                    className="text-xs leading-relaxed"
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {sug.rule}
                  </p>
                </div>

                <div
                  className="mt-5 pt-4 border-t flex items-center justify-between"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <span
                    className="inline-flex items-center gap-1.5 text-[11px]"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: "var(--muted-2)" }}
                    />
                    Awaiting human approval
                  </span>
                  <ArrowRight
                    className="w-3.5 h-3.5"
                    style={{ color: "var(--accent-2)" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Full capability surface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div className="max-w-2xl">
              <div
                className="text-[11px] uppercase tracking-[0.25em]"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                The full AI surface
              </div>
              <h3
                className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fg)",
                }}
              >
                Everything Vantage AI actually does.
              </h3>
              <p
                className="mt-3 text-sm sm:text-base leading-relaxed"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Not a single chatbot bolted onto an ERP. A working operational
                AI surface — classification, prediction, document
                intelligence, anomaly detection, autonomous investigation,
                voice and natural-language interfaces, auto-generated
                playbooks, workflow advisory and scheduled executive briefings
                — all sitting on the same audit trail and the same human
                approval guardrails.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.45,
                    delay: Math.min(i * 0.04, 0.5),
                  }}
                  className="relative rounded-2xl border p-5 flex flex-col themed-rounded group overflow-hidden"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--card-bg)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "color-mix(in oklab, var(--accent-2) 50%, var(--card-border))";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--card-border)";
                  }}
                >
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-[200px] h-[200px] rounded-full blur-[70px] opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                    style={{ background: "var(--accent-glow)" }}
                  />

                  <div className="relative flex items-start gap-3">
                    <div
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border themed-rounded"
                      style={{
                        borderColor: "var(--card-border)",
                        background: "var(--bg-elev)",
                        color: "var(--accent-2)",
                      }}
                    >
                      <Icon className="w-4 h-4" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <div
                        className="text-[10px] uppercase tracking-[0.2em]"
                        style={{
                          color: "var(--muted-2)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {cap.group}
                      </div>
                      <h4
                        className="mt-1 text-sm font-semibold leading-snug"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--fg)",
                        }}
                      >
                        {cap.title}
                      </h4>
                    </div>
                  </div>

                  <p
                    className="relative mt-3 text-xs leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {cap.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Trust guarantees */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl border p-6 sm:p-8 themed-rounded"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent-2) 25%, var(--card-border))",
            background:
              "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 5%, var(--card-bg)), var(--card-bg))",
          }}
        >
          <div
            className="text-[11px] uppercase tracking-[0.25em] mb-5"
            style={{
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            The guarantees that make it safe to deploy
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {guarantees.map((g) => {
              const Icon = g.icon;
              return (
                <div key={g.title} className="flex gap-4">
                  <div
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border themed-rounded"
                    style={{
                      borderColor: "var(--card-border)",
                      background: "var(--bg-elev)",
                      color: "var(--accent-2)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--fg)",
                      }}
                    >
                      {g.title}
                    </div>
                    <p
                      className="mt-1 text-xs leading-relaxed"
                      style={{
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {g.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
