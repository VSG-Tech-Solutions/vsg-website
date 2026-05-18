"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  PackageSearch,
  MessageSquare,
  Brain,
  ArrowUpRight,
} from "lucide-react";

/**
 * VantageUseCases — three editorial story cards that show Vantage in
 * action on real operator mornings.
 *
 * Reference pattern: dark grain-textured cards, generous visual panel
 * at the top, title + outcome below, status chip on top-right. Each
 * card narrates one role × one AI specialist × one outcome — so the
 * buyer can see themselves in at least one of them within seconds.
 *
 * Three personas, three Modules, three outcomes:
 *   1. The buyer's morning — Procurement (Forecaster + Auctioneer)
 *   2. The dock at 7am — Receiving (Inspector)
 *   3. The audit question — Core (Ask Vantage)
 */

const ease = [0.16, 1, 0.3, 1] as const;

export const VantageUseCases: React.FC = () => {
  return (
    <div className="relative">
      {/* Header */}
      <div className="max-w-3xl mb-12">
        <div
          className="text-[11px] uppercase tracking-[0.32em] font-semibold flex items-center gap-3"
          style={{ color: "var(--accent)", fontFamily: "var(--font-body)" }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: "var(--accent)" }}
          />
          Vantage in action
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
          Three mornings.
          <br />
          <span style={{ color: "var(--muted)" }}>
            Three different operators. Three AIs at work.
          </span>
        </h2>
        <p
          className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          What Vantage looks like on a real Tuesday — for the buyer,
          for the dock operator, for the auditor when they pick up the
          phone. The named AI specialists doing the operational work
          your ERP doesn&rsquo;t.
        </p>
      </div>

      {/* 3-up editorial cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
        <UseCaseCard
          eyebrow="07:42"
          persona="The buyer's morning"
          aiName="Forecaster + Auctioneer"
          aiModule="Procurement Module"
          headline="Stock low → drafted PO before coffee."
          outcome="Vantage spots SKU-CHEM-018 dipping below the reorder line, drafts the order at 1,200 units from ACME, ranks closed RFQ quotes on landed cost, and lands a one-click recommendation in the buyer's queue. They review, approve, override if needed — and the override teaches next cycle."
          icon={ShoppingCart}
          visual={<BuyerMorningVisual />}
        />
        <UseCaseCard
          eyebrow="07:08"
          persona="The dock at 7am"
          aiName="Inspector"
          aiModule="Receiving Module"
          headline="18 short → exception in AP automatically."
          outcome="Goods arrive, the dock operator captures the GRV. Three-way match runs against the PO and invoice. Inspector classifies the 18-unit shortage as short-ship · medium severity, attaches a plain-English reason and the photos, and lifts an AP exception with the evidence already attached. No copy-paste."
          icon={PackageSearch}
          visual={<DockMorningVisual />}
          accent
        />
        <UseCaseCard
          eyebrow="14:21"
          persona="The auditor's question"
          aiName="Ask Vantage"
          aiModule="Core specialist"
          headline="Cited answer in plain English."
          outcome="The auditor asks: 'Why did we override the buyer's recommendation on PO-8842 last quarter?' Ask Vantage queries the audit trail, returns the override reason, the operator who made the call, and the supplier history that justified it — with one-click evidence to every record. No spreadsheet archaeology."
          icon={MessageSquare}
          visual={<AskVantageVisual />}
        />
      </div>
    </div>
  );
};

/* ---------------- Use case card ---------------- */

const UseCaseCard: React.FC<{
  eyebrow: string;
  persona: string;
  aiName: string;
  aiModule: string;
  headline: string;
  outcome: string;
  icon: typeof ShoppingCart;
  visual: React.ReactNode;
  accent?: boolean;
}> = ({
  eyebrow,
  persona,
  aiName,
  aiModule,
  headline,
  outcome,
  icon: Icon,
  visual,
  accent,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
      className="on-dark-card relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: accent
          ? "linear-gradient(180deg, var(--card-bg-accent) 0%, var(--card-bg-accent-2) 100%)"
          : "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
        border: `1px solid ${
          accent
            ? "var(--card-border-accent-strong)"
            : "var(--card-border-strong)"
        }`,
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Visual panel — taller, weighted at top like the references */}
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{
          background: accent
            ? "linear-gradient(180deg, var(--accent-soft) 0%, transparent 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)",
          borderBottom: `1px solid ${
            accent ? "var(--card-border-accent)" : "var(--card-border)"
          }`,
        }}
      >
        {/* Grain noise texture overlay (subtle) */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.18] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
          }}
        />

        {visual}

        {/* Top-left — module icon + timestamp inline (no overlap with visual) */}
        <div className="absolute top-4 left-4 flex items-center gap-2.5">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-lg shrink-0"
            style={{
              background: accent
                ? "var(--accent-soft)"
                : "color-mix(in srgb, var(--bg) 60%, transparent)",
              border: `1px solid ${
                accent
                  ? "var(--card-border-accent-strong)"
                  : "var(--card-border-strong)"
              }`,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.08), 0 6px 16px -6px rgba(0,0,0,0.4)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <Icon
              className="w-4 h-4"
              style={{
                color: accent ? "var(--accent)" : "var(--on-card-fg)",
              }}
              strokeWidth={1.6}
            />
          </span>
          <div
            className="text-[10px] uppercase tracking-[0.28em] font-mono"
            style={{
              color: accent ? "var(--accent)" : "var(--on-card-muted-2)",
              fontFamily:
                "var(--font-space-mono), ui-monospace, monospace",
            }}
          >
            {eyebrow}
          </div>
        </div>

        {/* Top-right AI chip */}
        <div className="absolute top-4 right-4">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold"
            style={{
              background:
                "color-mix(in srgb, var(--bg) 60%, transparent)",
              border: `1px solid ${
                accent
                  ? "var(--card-border-accent)"
                  : "var(--card-border-strong)"
              }`,
              color: accent ? "var(--accent)" : "var(--on-card-fg)",
              fontFamily: "var(--font-body)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <Brain className="w-3 h-3" strokeWidth={2} />
            {aiName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 sm:p-8 flex flex-col flex-1">
        <div
          className="text-[10px] uppercase tracking-[0.28em] font-semibold"
          style={{
            color: "var(--on-card-muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          {persona} · {aiModule}
        </div>
        <h3
          className="mt-3 font-bold"
          style={{
            color: "var(--on-card-fg)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.3rem, 1.75vw, 1.55rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {headline}
        </h3>
        <p
          className="mt-4 text-[14px] leading-relaxed flex-1"
          style={{
            color: "var(--on-card-muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {outcome}
        </p>
      </div>
    </motion.div>
  );
};

/* ---------------- Visuals (one per use case) ---------------- */

/**
 * BuyerMorningVisual — animated stock-low signal pulsing into a draft
 * PO row. Reads as "AI just put the next move on your desk."
 */
const BuyerMorningVisual: React.FC = () => {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      {/* Stock graph (decreasing line) */}
      <motion.polyline
        points="20,40 50,55 80,65 110,80 140,95 170,110 200,135"
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth={1.2}
        strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2, ease }}
      />
      {/* Threshold line */}
      <line
        x1={20}
        y1={120}
        x2={220}
        y2={120}
        stroke="var(--accent)"
        strokeWidth={0.5}
        strokeDasharray="2 2"
        opacity={0.4}
      />

      {/* Trigger dot (where stock crosses the threshold) */}
      <motion.g>
        <motion.circle
          cx={185}
          cy={120}
          r={4}
          fill="var(--accent)"
          animate={{ r: [3, 6, 3], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx={185}
          cy={120}
          r={10}
          fill="var(--accent)"
          opacity={0.25}
          animate={{ r: [8, 16, 8], opacity: [0.10, 0.30, 0.10] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>

      {/* Draft PO row card (bottom) */}
      <g>
        <rect
          x={28}
          y={140}
          width={184}
          height={28}
          rx={5}
          fill="rgba(255,255,255,0.05)"
          stroke="var(--card-border-accent-strong)"
          strokeWidth={0.6}
        />
        {/* "AI" pill */}
        <rect
          x={36}
          y={148}
          width={20}
          height={12}
          rx={6}
          fill="var(--accent)"
        />
        <text
          x={46}
          y={157}
          textAnchor="middle"
          fontSize="6"
          fontWeight="700"
          fill="#0A0A0A"
          fontFamily="ui-sans-serif"
        >
          AI
        </text>
        {/* Mock content lines */}
        <rect
          x={62}
          y={148}
          width={50}
          height={3}
          rx={1.5}
          fill="rgba(255,255,255,0.55)"
        />
        <rect
          x={62}
          y={156}
          width={130}
          height={3}
          rx={1.5}
          fill="rgba(255,255,255,0.20)"
        />
      </g>

      {/* Travelling pulse from trigger to PO row */}
      <motion.circle
        r={2}
        fill="var(--accent)"
        opacity={0.9}
        initial={{ cx: 185, cy: 120, opacity: 0 }}
        animate={{ cx: [185, 120], cy: [120, 154], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.4,
          repeatDelay: 1.4,
        }}
      />
    </svg>
  );
};

/**
 * DockMorningVisual — three GRV rows, the middle one flashes a
 * short-ship variance and a connection fires to AP.
 */
const DockMorningVisual: React.FC = () => {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      {/* Three GRV rows */}
      {[35, 75, 115].map((y, i) => {
        const isVariance = i === 1;
        return (
          <g key={i}>
            <rect
              x={20}
              y={y}
              width={140}
              height={28}
              rx={5}
              fill="rgba(255,255,255,0.04)"
              stroke={
                isVariance
                  ? "var(--card-border-accent-strong)"
                  : "var(--card-border)"
              }
              strokeWidth={0.6}
            />
            {/* Status dot */}
            <motion.circle
              cx={32}
              cy={y + 14}
              r={3}
              fill={isVariance ? "var(--accent)" : "rgba(255,255,255,0.40)"}
              animate={
                isVariance
                  ? { opacity: [0.7, 1, 0.7], r: [3, 4.5, 3] }
                  : undefined
              }
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <rect
              x={42}
              y={y + 8}
              width={50}
              height={3}
              rx={1.5}
              fill="rgba(255,255,255,0.55)"
            />
            <rect
              x={42}
              y={y + 16}
              width={90}
              height={3}
              rx={1.5}
              fill="rgba(255,255,255,0.18)"
            />
            {/* Variance chip on the row that's short */}
            {isVariance && (
              <g>
                <rect
                  x={140}
                  y={y + 6}
                  width={38}
                  height={16}
                  rx={4}
                  fill="var(--accent-soft)"
                  stroke="var(--card-border-accent-strong)"
                  strokeWidth={0.5}
                />
                <text
                  x={159}
                  y={y + 17}
                  textAnchor="middle"
                  fontSize="6"
                  fontWeight="700"
                  fill="var(--accent)"
                  fontFamily="ui-sans-serif"
                >
                  −18 SHORT
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* AP node — bottom right */}
      <g>
        <rect
          x={185}
          y={75}
          width={45}
          height={28}
          rx={5}
          fill="var(--accent-soft)"
          stroke="var(--card-border-accent-strong)"
          strokeWidth={0.7}
        />
        <text
          x={207}
          y={92}
          textAnchor="middle"
          fontSize="8"
          fontWeight="700"
          fill="var(--accent)"
          fontFamily="ui-sans-serif"
        >
          AP
        </text>
        {/* "Exception" subtext */}
        <text
          x={207}
          y={100}
          textAnchor="middle"
          fontSize="5"
          fill="rgba(255,255,255,0.55)"
          fontFamily="ui-sans-serif"
          letterSpacing="0.4"
        >
          EXCEPTION
        </text>
      </g>

      {/* Connecting line from variance row to AP */}
      <motion.path
        d="M 178 89 Q 184 89 184 89"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.4, ease }}
      />
      {/* Travelling pulse */}
      <motion.circle
        r={2.2}
        fill="var(--accent)"
        initial={{ cx: 178, cy: 89, opacity: 0 }}
        animate={{ cx: [178, 207], opacity: [0, 1, 1, 0] }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
          repeatDelay: 0.8,
        }}
      />
    </svg>
  );
};

/**
 * AskVantageVisual — search/chat row with cited results below.
 */
const AskVantageVisual: React.FC = () => {
  return (
    <svg
      aria-hidden
      viewBox="0 0 240 180"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      {/* Question pill */}
      <g>
        <rect
          x={20}
          y={28}
          width={200}
          height={28}
          rx={14}
          fill="rgba(255,255,255,0.04)"
          stroke="var(--card-border-strong)"
          strokeWidth={0.6}
        />
        <circle cx={36} cy={42} r={3.5} fill="rgba(255,255,255,0.50)" />
        <rect
          x={48}
          y={40}
          width={140}
          height={3}
          rx={1.5}
          fill="rgba(255,255,255,0.55)"
        />
        {/* Animated typing caret */}
        <motion.rect
          x={188}
          y={37}
          width={1.5}
          height={10}
          fill="var(--accent)"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </g>

      {/* Three cited result rows */}
      {[
        { y: 75, label: "PO-8842" },
        { y: 105, label: "Override note" },
        { y: 135, label: "Supplier history" },
      ].map((row, i) => (
        <motion.g
          key={i}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease,
            delay: 0.6 + i * 0.3,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 2.5,
          }}
        >
          <rect
            x={20}
            y={row.y}
            width={200}
            height={22}
            rx={4}
            fill="rgba(255,255,255,0.04)"
            stroke="var(--card-border)"
            strokeWidth={0.5}
          />
          {/* Citation marker */}
          <rect
            x={28}
            y={row.y + 6}
            width={18}
            height={10}
            rx={2}
            fill="var(--accent-soft)"
            stroke="var(--card-border-accent-strong)"
            strokeWidth={0.4}
          />
          <text
            x={37}
            y={row.y + 13}
            textAnchor="middle"
            fontSize="5"
            fontWeight="700"
            fill="var(--accent)"
            fontFamily="ui-sans-serif"
          >
            CITE
          </text>
          {/* Mock label */}
          <text
            x={52}
            y={row.y + 14}
            fontSize="6.5"
            fill="rgba(255,255,255,0.85)"
            fontFamily="ui-sans-serif"
            fontWeight="500"
          >
            {row.label}
          </text>
          {/* Mock data line */}
          <rect
            x={120}
            y={row.y + 9}
            width={88}
            height={3}
            rx={1.5}
            fill="rgba(255,255,255,0.25)"
          />
        </motion.g>
      ))}
    </svg>
  );
};
