"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  AlertOctagon,
  CheckCircle2,
  Clock,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";

/**
 * LiveDashboardMockup — animated glassmorphic Vantage product mockup.
 *
 * A floating, near-realistic product UI panel that shows Vantage handling
 * inbound operational exceptions in real time. Rows tick through statuses
 * (incoming → classified → routed → closed) on a loop. Active row pulses.
 * Mock counter at the bottom ticks up.
 *
 * Show, don't tell — used in the hero so visitors see actual product
 * texture instead of just reading copy.
 */

const ease = [0.16, 1, 0.3, 1] as const;

type Row = {
  id: string;
  module: string;
  ref: string;
  title: string;
  status: "incoming" | "classified" | "routed" | "closed";
  severity: "low" | "med" | "high";
  icon: typeof AlertOctagon;
};

const SEED_ROWS: Row[] = [
  {
    id: "EX-8842",
    module: "Procurement",
    ref: "PO 8842",
    title: "Short-ship · Acme Co · 18 of 24 units",
    status: "routed",
    severity: "med",
    icon: ShoppingCart,
  },
  {
    id: "AP-1729",
    module: "Approvals",
    ref: "INV 41187",
    title: "AP mismatch · 2.4% over PO · routed to finance",
    status: "classified",
    severity: "low",
    icon: CheckCircle2,
  },
  {
    id: "EX-8847",
    module: "Exceptions",
    ref: "GRN 14118",
    title: "Wrong-SKU received · routed to buyer · SLA 4h",
    status: "incoming",
    severity: "high",
    icon: AlertOctagon,
  },
  {
    id: "CO-2210",
    module: "Compliance",
    ref: "VENDOR 9043",
    title: "BEE certificate expires in 11 days · auto-flagged",
    status: "closed",
    severity: "low",
    icon: ShieldCheck,
  },
];

const STATUS_LABEL: Record<Row["status"], string> = {
  incoming: "INCOMING",
  classified: "CLASSIFIED",
  routed: "ROUTED",
  closed: "CLOSED",
};

const STATUS_COLOR: Record<Row["status"], string> = {
  incoming: "var(--muted-2)",
  classified: "var(--accent-2)",
  routed: "var(--accent)",
  closed: "var(--muted)",
};

const SEV_COLOR: Record<Row["severity"], string> = {
  low: "rgba(255,255,255,0.25)",
  med: "var(--accent-2)",
  high: "#fca5a5",
};

const STATUS_FLOW: Row["status"][] = [
  "incoming",
  "classified",
  "routed",
  "closed",
];

export const LiveDashboardMockup: React.FC = () => {
  const prefersReduce = useReducedMotion();
  const [rows, setRows] = useState<Row[]>(SEED_ROWS);
  const [activeIdx, setActiveIdx] = useState(2);
  const [counter, setCounter] = useState(117);

  useEffect(() => {
    if (prefersReduce) return;
    const tick = setInterval(() => {
      setActiveIdx((i) => (i + 1) % SEED_ROWS.length);
      setCounter((c) => c + Math.floor(Math.random() * 3) + 1);
      // Advance the active row's status one step.
      setRows((rows) =>
        rows.map((r, i) => {
          if (i !== activeIdx) return r;
          const cur = STATUS_FLOW.indexOf(r.status);
          const next = STATUS_FLOW[(cur + 1) % STATUS_FLOW.length];
          return { ...r, status: next };
        })
      );
    }, 1800);
    return () => clearInterval(tick);
  }, [activeIdx, prefersReduce]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1.1, ease, delay: 1.4 }}
      className="relative w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border backdrop-blur-xl"
      style={{
        borderColor: "var(--card-border)",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))",
        boxShadow:
          "0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 border-b"
        style={{
          borderColor: "var(--card-border)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.18)" }}
            />
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.12)" }}
            />
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "rgba(255,255,255,0.08)" }}
            />
          </div>
          <span
            className="text-[10px] uppercase tracking-[0.22em]"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            Vantage · Operations queue
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-1.5 w-1.5 rounded-full animate-pulse"
            style={{ background: "var(--accent-2)" }}
          />
          <span
            className="text-[10px] uppercase tracking-[0.22em] tabular-nums"
            style={{
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            Live
          </span>
        </div>
      </div>

      {/* Rows */}
      <ul className="divide-y" style={{ borderColor: "var(--card-border)" }}>
        {rows.map((row, i) => {
          const Icon = row.icon;
          const isActive = i === activeIdx && !prefersReduce;
          return (
            <li
              key={row.id}
              className="relative px-5 py-3.5 grid grid-cols-[20px_1fr_auto] items-center gap-4"
              style={{
                background: isActive
                  ? "rgba(103, 232, 249, 0.04)"
                  : "transparent",
                transition: "background 600ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {/* Active indicator */}
              <span
                aria-hidden
                className="absolute left-0 top-0 bottom-0 w-px"
                style={{
                  background: isActive ? "var(--accent-2)" : "transparent",
                  transition: "background 400ms ease",
                }}
              />
              <Icon
                className="w-4 h-4"
                strokeWidth={1.5}
                style={{
                  color: isActive ? "var(--accent-2)" : "var(--muted)",
                }}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[10px] uppercase tracking-[0.18em]"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {row.module}
                  </span>
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full"
                    style={{ background: "var(--card-border)" }}
                  />
                  <span
                    className="text-[10px] tabular-nums"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily:
                        "var(--font-space-mono), ui-monospace, monospace",
                    }}
                  >
                    {row.ref}
                  </span>
                  <span
                    aria-hidden
                    className="h-1 w-1 rounded-full ml-auto sm:ml-0"
                    style={{ background: SEV_COLOR[row.severity] }}
                  />
                </div>
                <div
                  className="text-sm leading-snug truncate"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {row.title}
                </div>
              </div>
              <AnimatePresence mode="wait">
                <motion.span
                  key={row.status}
                  initial={prefersReduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduce ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease }}
                  className="text-[10px] uppercase tracking-[0.22em] tabular-nums px-2.5 py-1 rounded-full border"
                  style={{
                    color: STATUS_COLOR[row.status],
                    borderColor:
                      "color-mix(in oklab, " +
                      STATUS_COLOR[row.status] +
                      " 30%, var(--card-border))",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {STATUS_LABEL[row.status]}
                </motion.span>
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Footer status bar */}
      <div
        className="px-5 py-3 flex items-center justify-between border-t text-[10px] uppercase tracking-[0.22em] tabular-nums"
        style={{
          borderColor: "var(--card-border)",
          background: "rgba(255,255,255,0.015)",
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        <div className="flex items-center gap-2">
          <Clock className="w-3 h-3" strokeWidth={1.6} />
          <span>Today · {counter} items processed</span>
        </div>
        <span>
          AI confidence{" "}
          <span style={{ color: "var(--accent-2)" }}>0.94</span>
        </span>
      </div>
    </motion.div>
  );
};
