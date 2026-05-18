"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  PackageCheck,
  CheckCircle2,
  ShieldCheck,
  UserPlus,
  ClipboardCheck,
  Database,
  Brain,
  X,
  Server,
} from "lucide-react";

/**
 * VantageArchitecture — clean editorial architecture diagram.
 *
 * Replaces the previous orbital SVG (which cramped at the canvas edges
 * and packed too much animation into a small space) with a simpler
 * vertical lockup:
 *
 *   1. Top  — ERP node (the source of record)
 *   2. Mid  — Vantage Core band (full width, the central nervous system)
 *   3. Btm  — Six Module tiles in a 3-column grid (the surfaces)
 *
 * Connectors are vertical hairlines with travelling dots — only active
 * Modules pulse. No bezier maths, no position fudging, no overlap.
 *
 * Detail-panel UX preserved: click any tile → side panel with the
 * Module's named AI specialists, what it does, and what it sees.
 */

const ease = [0.16, 1, 0.3, 1] as const;

type ModuleStatus = "live" | "design" | "planned";

type ModuleNode = {
  id: string;
  name: string;
  short: string;
  status: ModuleStatus;
  icon: typeof ShoppingCart;
  description: string;
  ai: string;
  sources: string[];
  metric?: string;
  agents: string[];
};

const MODULES: ModuleNode[] = [
  {
    id: "procurement",
    name: "Procurement",
    short: "Procurement",
    status: "live",
    icon: ShoppingCart,
    agents: ["Forecaster", "Auctioneer", "Courier"],
    description:
      "The buyer's day, run by AI. Stock falls below your reorder line and Forecaster drafts the order — how much, from which supplier, with the landed-cost reasoning behind it. When the RFQ closes, Auctioneer ranks every quote on total landed cost. Your buyer reviews, approves or overrides with a reason — and every override teaches the AI your way next time.",
    ai: "Three named specialists in this Module. Forecaster proposes the reorder qty and the supplier. Auctioneer ranks closed RFQ quotes on total landed cost — not just unit price. Courier drafts and chases the RFQ emails. Every recommendation comes with reasoning, confidence, and one-click evidence. The AI cannot invent a supplier or a price it never saw.",
    sources: [
      "Live stock levels from your ERP",
      "Your PO and RFQ history",
      "Supplier quotes from the latest RFQ rounds",
      "Your team's override history (so it learns your way)",
    ],
    metric: "Your buyer keeps the call · AI does the draft",
  },
  {
    id: "receiving",
    name: "Receiving",
    short: "Receiving",
    status: "live",
    icon: PackageCheck,
    agents: ["Inspector"],
    description:
      "Capture every delivery at the dock — multi-line, with PO lookup, condition flags, photo evidence. Vantage runs the three-way match automatically (PO ↔ goods received ↔ invoice). When the numbers don't line up, Inspector classifies the variance — short ship, damage, price drift — with severity and a plain-English reason. The exception goes straight to AP without anyone copy-pasting.",
    ai: "Inspector — the receiving specialist. Classifies every variance with type, severity, confidence and a plain-English reason. Lifts the exception into the next Module automatically. Cannot invent a variance type it doesn't recognise.",
    sources: [
      "Open POs from your ERP (matched on receipt)",
      "Dock capture — quantities, condition flags, photos",
      "Invoice lines (the three-way match)",
      "Historical variance patterns at your operation",
    ],
    metric: "The dock operator stays in flow · AI explains every variance",
  },
  {
    id: "approvals",
    name: "Approvals",
    short: "Approvals",
    status: "design",
    icon: CheckCircle2,
    agents: ["Sentinel + Compass (Core)"],
    description:
      "Invoices, expense claims and POs through your approval ladder — written in plain English, not configured in a flowchart. Sentinel classifies what arrived; Compass proposes the next approver and the reason. Edge cases (unusual vendor, out-of-band amount) get flagged, not silently routed.",
    ai: "Driven by two Core specialists today — Sentinel classifies every inbound approval, Compass routes it to the right person at the right step. Both learn from how your team has decided in the past. A dedicated Approvals specialist rolls out as this Module ships.",
    sources: [
      "Your approval ladder rules",
      "How your team has decided in the past",
      "Vendor and amount patterns",
      "Manager overrides (so it learns your way)",
    ],
  },
  {
    id: "compliance",
    name: "Compliance",
    short: "Compliance",
    status: "design",
    icon: ShieldCheck,
    agents: ["Watcher (rolling out)"],
    description:
      "BEE certificates, vendor docs, license renewals — all the things that quietly expire and bite at audit time. Watcher tracks every expiry and flags before the gap, not after. Triggers the re-certification flow automatically and chases the supplier on your behalf.",
    ai: "Watcher tracks expiry across every vendor and document. Surfaces upcoming gaps weeks ahead. Drafts the re-certification email with the right ask attached, ready for your team to send.",
    sources: [
      "Vendor documents and certificates",
      "BEE compliance records",
      "License registries",
      "Your renewal cadence",
    ],
  },
  {
    id: "onboarding",
    name: "Onboarding",
    short: "Onboarding",
    status: "design",
    icon: UserPlus,
    agents: ["Onboarder (rolling out)", "Scribe (Core)"],
    description:
      "Customer and vendor onboarding without the email-PDF-spreadsheet shuffle. One digital form captures everything; Scribe reads the documents, Onboarder checks them against your checklist and drafts the welcome flow. Your team only sees the cases that need a human eye.",
    ai: "Two specialists. Scribe (Core) reads uploaded documents and extracts the structured fields. Onboarder validates them against your onboarding checklist, drafts the welcome comms, and files everything to the right contact record.",
    sources: [
      "Uploaded documents",
      "Identity and credit verification feeds",
      "Your onboarding checklist",
      "Welcome and confirmation templates",
    ],
  },
  {
    id: "quality",
    name: "Quality",
    short: "Quality",
    status: "planned",
    icon: ClipboardCheck,
    agents: ["Quality Inspector (planned)"],
    description:
      "Quality control for inbound goods, outbound shipments and process audits. Quality Inspector matches every inspection against your historical defect patterns and surfaces what looks off. Routes to QC with the evidence already attached — no more chasing photos in WhatsApp.",
    ai: "Quality Inspector learns your defect patterns from past inspections, surfaces anomalies on new ones, drafts the QC workflow, and pulls the supplier and SKU history together so the QC team has everything in one place.",
    sources: [
      "Your QC checklists",
      "Historical defect records",
      "Supplier quality scores",
      "Inbound inspection logs",
    ],
  },
];

const STATUS_STYLES: Record<
  ModuleStatus,
  { label: string; bg: string; fg: string; border: string; pulse: boolean }
> = {
  live: {
    label: "Live",
    bg: "var(--accent-soft)",
    fg: "var(--accent)",
    border: "var(--card-border-accent-strong)",
    pulse: true,
  },
  design: {
    label: "In design",
    bg: "rgba(255, 255, 255, 0.04)",
    fg: "rgba(255, 255, 255, 0.7)",
    border: "rgba(255, 255, 255, 0.14)",
    pulse: false,
  },
  planned: {
    label: "Planned",
    bg: "rgba(255, 255, 255, 0.02)",
    fg: "rgba(255, 255, 255, 0.45)",
    border: "rgba(255, 255, 255, 0.08)",
    pulse: false,
  },
};

export const VantageArchitecture: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = MODULES.find((m) => m.id === selectedId) ?? null;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* DIAGRAM column */}
        <div className="lg:col-span-7">
          <div
            className="relative w-full rounded-3xl overflow-hidden p-7 sm:p-9"
            style={{
              background:
                "linear-gradient(180deg, var(--bg-elev) 0%, var(--bg) 100%)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              boxShadow:
                "inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
            }}
          >
            {/* Dotted grid backdrop */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(255,255,255,0.04) 1px, transparent 1.2px)",
                backgroundSize: "32px 32px",
                maskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 90%)",
              }}
            />

            <div className="relative flex flex-col items-stretch gap-7">
              {/* TOP — Six Module tiles in a 3-col grid (where work starts) */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {MODULES.map((m, i) => (
                  <ModuleTile
                    key={m.id}
                    module={m}
                    index={i}
                    selected={selectedId === m.id}
                    onClick={() =>
                      setSelectedId((prev) => (prev === m.id ? null : m.id))
                    }
                  />
                ))}
              </div>

              {/* Six small pulse lines Module → Core (only live ones pulse) */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {MODULES.map((m) => (
                  <div key={`pulse-${m.id}`} className="flex justify-center">
                    <PulseLine height={20} active={m.status === "live"} />
                  </div>
                ))}
              </div>

              {/* MIDDLE — Vantage Core band (the workflow + audit spine) */}
              <CoreBand />

              {/* Vertical pulse line Core → ERP (outcomes write back) */}
              <PulseLine height={28} />

              {/* BOTTOM — ERP node (system of record, end of the chain) */}
              <div className="flex justify-center">
                <ErpNode />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em]">
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full animate-pulse"
                style={{ background: "var(--accent)" }}
              />
              <span style={{ color: "var(--muted)" }}>Live</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.4)" }}
              />
              <span style={{ color: "var(--muted)" }}>In design</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "rgba(255,255,255,0.18)" }}
              />
              <span style={{ color: "var(--muted)" }}>Planned</span>
            </div>
            <div
              className="ml-auto"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Click any module to see what it does
            </div>
          </div>
        </div>

        {/* DETAIL panel column */}
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease }}
                className="relative rounded-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, var(--card-bg-elev) 0%, var(--card-bg-elev-2) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <ModuleDetail
                  module={selected}
                  onClose={() => setSelectedId(null)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl p-8 sm:p-10"
                style={{
                  background:
                    "linear-gradient(180deg, var(--card-bg-elev) 0%, var(--card-bg-elev-2) 100%)",
                  border: "1px dashed rgba(255, 255, 255, 0.10)",
                }}
              >
                <div
                  className="text-[11px] uppercase tracking-[0.32em] font-semibold flex items-center gap-3"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span
                    className="inline-block w-8 h-px"
                    style={{ background: "var(--muted-2)" }}
                  />
                  How it reads
                </div>
                <h3
                  className="mt-5 font-bold leading-tight"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Vantage runs the work. Your ERP keeps the records.
                </h3>
                <p
                  className="mt-5 text-[14px] sm:text-[15px] leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Your operator opens a{" "}
                  <span style={{ color: "var(--fg)", fontWeight: 600 }}>
                    Module
                  </span>{" "}
                  — Procurement, Receiving, Approvals. The Module&rsquo;s AI
                  pulls everything it needs from your ERP, drafts the next
                  move, and the operator decides. When a case can&rsquo;t
                  close cleanly, the{" "}
                  <span style={{ color: "var(--fg)", fontWeight: 600 }}>
                    Vantage Core
                  </span>{" "}
                  takes over the exception. The outcome writes back to
                  your ERP as the system of record.
                </p>
                <p
                  className="mt-4 text-[13px] leading-relaxed"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Click any module on the left to see what it does for
                  the person at the desk.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

/* ---------------- ERP node (top) ---------------- */

const ErpNode: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: -8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease, delay: 0.1 }}
    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl"
    style={{
      background:
        "linear-gradient(180deg, var(--card-bg-elev) 0%, var(--card-bg-elev-2) 100%)",
      border: "1px solid rgba(255, 255, 255, 0.10)",
      boxShadow:
        "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 12px 32px -12px rgba(0,0,0,0.6)",
    }}
  >
    <span
      className="inline-flex items-center justify-center w-8 h-8 rounded-md shrink-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
        border: "1px solid rgba(255, 255, 255, 0.10)",
      }}
    >
      <Server
        className="w-4 h-4"
        style={{ color: "rgba(255, 255, 255, 0.85)" }}
        strokeWidth={1.6}
      />
    </span>
    <div>
      <div
        className="text-[10px] uppercase tracking-[0.32em] font-semibold"
        style={{
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        Your ERP · System of record
      </div>
      <div
        className="text-[12px] font-semibold mt-0.5"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-body)",
        }}
      >
        Syspro · SAP · Sage · NetSuite
      </div>
    </div>
  </motion.div>
);

/* ---------------- Vantage Core band (middle) ---------------- */

const CoreBand: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, ease }}
    className="relative w-full rounded-2xl overflow-hidden"
    style={{
      background:
        "linear-gradient(180deg, var(--card-bg-accent) 0%, var(--card-bg-accent-2) 100%)",
      border: "1px solid var(--card-border-accent-strong)",
      boxShadow:
        "inset 0 1px 0 var(--accent-soft), 0 24px 60px -24px rgba(244, 168, 114, 0.20)",
    }}
  >
    {/* Glow halo */}
    <motion.div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: [0.45, 0.75, 0.45] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background:
          "radial-gradient(ellipse at center, rgba(244,168,114,0.10) 0%, rgba(244,168,114,0) 70%)",
      }}
    />

    <div className="relative px-6 py-5 sm:px-8 sm:py-6">
      {/* Top row — icon + title block */}
      <div className="flex items-center gap-4">
        <span
          className="inline-flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
          style={{
            background: "var(--accent-soft)",
            border: "1px solid var(--accent-glow)",
            boxShadow: "inset 0 1px 0 rgba(244,168,114,0.20)",
          }}
        >
          <Database
            className="w-5 h-5"
            style={{ color: "var(--accent)" }}
            strokeWidth={1.6}
          />
        </span>
        <div className="min-w-0 flex-1">
          <div
            className="text-[10px] uppercase tracking-[0.32em] font-semibold"
            style={{
              color: "var(--accent)",
              fontFamily: "var(--font-body)",
            }}
          >
            Vantage Core
          </div>
          <div
            className="mt-1 font-bold leading-tight"
            style={{
              color: "var(--fg)",
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1rem, 1.35vw, 1.2rem)",
              letterSpacing: "-0.01em",
            }}
          >
            Workflow · Exceptions · Audit · AI Fabric
          </div>
        </div>
      </div>

      {/* Bottom row — capability chips, wraps freely */}
      <div className="mt-4 pt-4 flex flex-wrap items-center gap-1.5"
        style={{ borderTop: "1px solid var(--card-border-accent)" }}
      >
        {["Sentinel", "Compass", "Scribe", "Ask Vantage"].map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9.5px] uppercase tracking-[0.18em] font-semibold whitespace-nowrap"
            style={{
              background: "var(--accent-soft)",
              border: "1px solid var(--card-border-accent)",
              color: "var(--accent)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Brain className="w-2.5 h-2.5" strokeWidth={2} />
            {c}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

/* ---------------- Pulse line connector ---------------- */

const PulseLine: React.FC<{ height?: number; active?: boolean }> = ({
  height = 24,
  active = true,
}) => (
  <div
    className="relative mx-auto"
    style={{ width: 1, height }}
  >
    {/* Static line */}
    <span
      aria-hidden
      className="absolute inset-0"
      style={{
        background: active
          ? "linear-gradient(to bottom, rgba(244, 168, 114, 0.20), var(--accent-soft))"
          : "rgba(255, 255, 255, 0.08)",
      }}
    />
    {/* Travelling pulse — only when active */}
    {active && (
      <motion.span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 w-[3px] rounded-full"
        style={{
          height: 8,
          background:
            "linear-gradient(to bottom, rgba(244,168,114,0), var(--accent), rgba(244,168,114,0))",
          boxShadow: "0 0 8px rgba(244, 168, 114, 0.6)",
        }}
        animate={{
          top: ["-10%", "110%"],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "linear",
          delay: Math.random() * 1.4,
        }}
      />
    )}
  </div>
);

/* ---------------- Module tile ---------------- */

const ModuleTile: React.FC<{
  module: ModuleNode;
  index: number;
  selected: boolean;
  onClick: () => void;
}> = ({ module: m, index, selected, onClick }) => {
  const Icon = m.icon;
  const status = STATUS_STYLES[m.status];

  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay: 0.2 + index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group relative text-left rounded-xl p-3.5 sm:p-4 transition-colors duration-200 cursor-pointer"
      style={{
        background: selected
          ? "linear-gradient(180deg, var(--card-bg-accent) 0%, var(--card-bg-accent-2) 100%)"
          : "linear-gradient(180deg, var(--card-bg-elev) 0%, var(--card-bg-elev-2) 100%)",
        border: `1px solid ${
          selected ? "var(--accent-strong)" : "rgba(255, 255, 255, 0.08)"
        }`,
        boxShadow: selected
          ? "0 0 0 1px var(--accent-soft), 0 18px 40px -10px rgba(0, 0, 0, 0.6)"
          : "inset 0 1px 0 rgba(255,255,255,0.04), 0 8px 20px -8px rgba(0,0,0,0.4)",
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
          style={{
            background: status.bg,
            border: `1px solid ${status.border}`,
          }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: status.fg }}
            strokeWidth={1.6}
          />
        </span>
        <span
          className="inline-flex items-center gap-1 text-[8.5px] uppercase tracking-[0.18em] font-semibold pt-1.5"
          style={{
            color: status.fg,
            fontFamily: "var(--font-body)",
          }}
        >
          {status.pulse && (
            <span
              className="inline-block w-1 h-1 rounded-full animate-pulse"
              style={{ background: status.fg }}
            />
          )}
          {status.label}
        </span>
      </div>

      <div
        className="mt-3 text-[13px] sm:text-[14px] font-semibold leading-tight"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-body)",
        }}
      >
        {m.short}
      </div>

      {m.agents.length > 0 && (
        <div
          className="mt-1.5 text-[10px] leading-tight font-mono truncate"
          style={{
            color: "var(--accent)",
            fontFamily:
              "var(--font-space-mono), ui-monospace, monospace",
          }}
          title={`AI: ${m.agents.join(" · ")}`}
        >
          AI: {m.agents.join(" · ")}
        </div>
      )}
    </motion.button>
  );
};

/* ---------------- Detail panel ---------------- */

const ModuleDetail: React.FC<{
  module: ModuleNode;
  onClose: () => void;
}> = ({ module, onClose }) => {
  const Icon = module.icon;
  const status = STATUS_STYLES[module.status];

  return (
    <div className="p-7 sm:p-9 relative">
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 hover:bg-white/5"
        style={{ color: "var(--muted)" }}
      >
        <X className="w-4 h-4" strokeWidth={1.6} />
      </button>

      {/* Status + icon */}
      <div className="flex items-center gap-3">
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl shrink-0"
          style={{
            background: status.bg,
            border: `1px solid ${status.border}`,
          }}
        >
          <Icon
            className="w-5 h-5"
            style={{ color: status.fg }}
            strokeWidth={1.6}
          />
        </span>
        <div
          className="text-[10px] uppercase tracking-[0.28em] font-semibold flex items-center gap-2"
          style={{
            color: status.fg,
            fontFamily: "var(--font-body)",
          }}
        >
          {status.pulse && (
            <span
              className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: status.fg }}
            />
          )}
          {status.label}
        </div>
      </div>

      {/* Title */}
      <h3
        className="mt-5 font-bold"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
        }}
      >
        {module.name}
      </h3>

      {/* AI specialists chip row */}
      {module.agents.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {module.agents.map((a) => (
            <span
              key={a}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold"
              style={{
                background: "var(--accent-soft)",
                border: "1px solid var(--card-border-accent)",
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

      {/* What it does */}
      <p
        className="mt-5 text-[14px] sm:text-[15px] leading-relaxed"
        style={{
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        {module.description}
      </p>

      {/* AI specifics */}
      <div
        className="mt-7 pt-6 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div
          className="text-[10px] uppercase tracking-[0.28em] font-semibold flex items-center gap-2"
          style={{
            color: "var(--accent)",
            fontFamily: "var(--font-body)",
          }}
        >
          <Brain className="w-3.5 h-3.5" strokeWidth={1.6} />
          The AI
        </div>
        <p
          className="mt-3 text-[14px] leading-relaxed"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {module.ai}
        </p>
      </div>

      {/* Data sources */}
      <div className="mt-6">
        <div
          className="text-[10px] uppercase tracking-[0.28em] font-semibold"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          What it sees
        </div>
        <ul className="mt-3 space-y-1.5">
          {module.sources.map((src, i) => (
            <li
              key={i}
              className="flex items-center gap-3 text-[13px]"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                className="inline-block w-1 h-1 rounded-full"
                style={{ background: "rgba(255,255,255,0.4)" }}
              />
              {src}
            </li>
          ))}
        </ul>
      </div>

      {/* Optional metric */}
      {module.metric && (
        <div
          className="mt-7 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold"
          style={{
            background: "var(--accent-soft)",
            border: "1px solid var(--card-border-accent)",
            color: "var(--accent)",
            fontFamily: "var(--font-body)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--accent)" }}
          />
          {module.metric}
        </div>
      )}
    </div>
  );
};
