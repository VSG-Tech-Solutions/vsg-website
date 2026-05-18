"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Brain, ShieldCheck, AlertOctagon, Clock } from "lucide-react";
import { TiltCard } from "./TiltCard";

/**
 * HeroProductMockup — the right-hand anchor of the asymmetric hero.
 *
 * A polished Vantage UI mockup showing a live exception queue. The card
 * floats with a subtle bob, tilts toward the cursor (TiltCard), and animates
 * a "live" feeling via two micro-animations:
 *
 *   1. A scan line passes vertically through the rows every ~6s, like the AI
 *      is reading down the queue.
 *   2. The first row's status badge cycles every ~5s through three states:
 *      "Classifying…" → "Routed → S. Reddy" → "Resolved" → repeat.
 *
 * Both animations run on a single rAF-driven interval — cheap on perf.
 *
 * The card itself uses the matte / carbon-fibre treatment: dark gradient
 * surface with a 1px white rim-light along the top edge (the M5 trick),
 * subtle outer shadow, panel-seam dividers between rows.
 */

type RowStatus = "classifying" | "routed" | "resolved";

const ROW_STATUSES: RowStatus[] = ["classifying", "routed", "resolved"];

const ROWS = [
  {
    icon: Mail,
    severity: "HIGH",
    supplier: "ACME Logistics",
    detail: "Late delivery · PO-4827",
    sla: "02:14",
    owner: "S. Reddy",
    live: true,
  },
  {
    icon: AlertOctagon,
    severity: "MED",
    supplier: "Stainless 316 Grp",
    detail: "Quote drift · 8.4% above last",
    sla: "06:48",
    owner: "K. Naidoo",
    live: false,
  },
  {
    icon: ShieldCheck,
    severity: "LOW",
    supplier: "Cape Steel",
    detail: "BEE cert expires in 12 days",
    sla: "—",
    owner: "—",
    live: false,
  },
  {
    icon: Brain,
    severity: "MED",
    supplier: "Apex Components",
    detail: "Reorder point reached",
    sla: "—",
    owner: "K. Naidoo",
    live: false,
  },
];

export const HeroProductMockup: React.FC = () => {
  const [statusIdx, setStatusIdx] = useState(0);
  const [scanT, setScanT] = useState(0);

  // Status cycle on row 1.
  useEffect(() => {
    const t = setInterval(() => {
      setStatusIdx((i) => (i + 1) % ROW_STATUSES.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  // Scan line — cycles 0 → 1 every 6s.
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setScanT(0.5);
      return;
    }
    startRef.current = performance.now();
    const tick = () => {
      const dt = (performance.now() - startRef.current) / 1000;
      // Slow phase: one full pass every 6s.
      const phase = (dt / 6) % 1;
      setScanT(phase);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const currentStatus = ROW_STATUSES[statusIdx];

  return (
    <TiltCard max={3} glow={false} className="block w-full">
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        className="relative w-full overflow-hidden"
        style={{
          borderRadius: 18,
          background: "linear-gradient(180deg, #15151A 0%, #0A0A0C 100%)",
          border: "1px solid rgba(255, 255, 255, 0.07)",
          boxShadow:
            "inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 40px 80px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.02)",
        }}
      >
        {/* App chrome */}
        <div
          className="flex items-center gap-2 px-5 py-3.5"
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.05)" }}
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.22)" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.16)" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255, 255, 255, 0.10)" }}
          />
          <div
            className="ml-3 text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--muted-2)" }}
          >
            Vantage · Exceptions
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "rgba(255, 255, 255, 0.6)" }}
            />
            <div
              className="text-[10px] uppercase tracking-[0.24em]"
              style={{ color: "var(--muted-2)" }}
            >
              Live
            </div>
          </div>
        </div>

        {/* Filter row */}
        <div
          className="flex items-center gap-2 px-5 py-2.5"
          style={{
            background: "rgba(255, 255, 255, 0.015)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--muted)" }}
          >
            Module
          </div>
          <div
            className="text-[11px] font-semibold"
            style={{ color: "var(--fg)" }}
          >
            Procurement
          </div>
          <div
            className="ml-auto text-[10px] uppercase tracking-[0.2em]"
            style={{ color: "var(--muted-2)" }}
          >
            {ROWS.length} open
          </div>
        </div>

        {/* Rows */}
        <div className="relative">
          {/* Scan line — passes down through the rows */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0"
            style={{
              top: `${scanT * 100}%`,
              height: 56,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0) 100%)",
              transform: "translateY(-50%)",
              transition: "top 0s linear",
            }}
          />

          {ROWS.map((row, i) => {
            const Icon = row.icon;
            const isLiveRow = row.live;
            return (
              <div
                key={i}
                className="relative flex items-center gap-3 px-5 py-3.5"
                style={{
                  borderBottom:
                    i === ROWS.length - 1
                      ? "none"
                      : "1px solid rgba(255, 255, 255, 0.04)",
                }}
              >
                {/* Severity dot */}
                <div
                  className="w-1 h-8 rounded-full shrink-0"
                  style={{
                    background:
                      row.severity === "HIGH"
                        ? "rgba(255,255,255,0.85)"
                        : row.severity === "MED"
                          ? "rgba(255,255,255,0.45)"
                          : "rgba(255,255,255,0.18)",
                  }}
                />

                {/* Icon block */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                    strokeWidth={1.6}
                  />
                </div>

                {/* Body */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div
                      className="text-[12px] font-semibold truncate"
                      style={{ color: "var(--fg)" }}
                    >
                      {row.supplier}
                    </div>
                    <div
                      className="text-[10px] uppercase tracking-[0.2em] shrink-0"
                      style={{
                        color: "var(--muted-2)",
                      }}
                    >
                      {row.severity}
                    </div>
                  </div>
                  <div
                    className="text-[11px] truncate"
                    style={{ color: "var(--muted)" }}
                  >
                    {row.detail}
                  </div>
                </div>

                {/* SLA + status */}
                <div className="text-right shrink-0">
                  {isLiveRow ? (
                    <div className="min-w-[120px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStatus}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.3 }}
                          className="flex items-center justify-end gap-1.5 text-[11px] font-semibold"
                          style={{ color: "var(--fg)" }}
                        >
                          {currentStatus === "classifying" && (
                            <>
                              <span
                                className="inline-block w-2 h-2 rounded-full animate-pulse"
                                style={{ background: "rgba(255,255,255,0.7)" }}
                              />
                              <span>Classifying…</span>
                            </>
                          )}
                          {currentStatus === "routed" && (
                            <>
                              <span
                                className="inline-block w-2 h-2 rounded-full"
                                style={{ background: "rgba(255,255,255,0.85)" }}
                              />
                              <span>Routed → {row.owner}</span>
                            </>
                          )}
                          {currentStatus === "resolved" && (
                            <>
                              <span
                                className="inline-block w-2 h-2 rounded-full"
                                style={{ background: "rgba(255,255,255,0.95)" }}
                              />
                              <span>Resolved</span>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                      <div
                        className="text-[10px] tracking-[0.18em] uppercase mt-1 flex items-center justify-end gap-1"
                        style={{ color: "var(--muted-2)" }}
                      >
                        <Clock className="w-2.5 h-2.5" strokeWidth={2} />
                        SLA {row.sla}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div
                        className="text-[11px] font-semibold"
                        style={{ color: "var(--fg)" }}
                      >
                        {row.owner === "—" ? "Unassigned" : `→ ${row.owner}`}
                      </div>
                      <div
                        className="text-[10px] tracking-[0.18em] uppercase mt-1"
                        style={{ color: "var(--muted-2)" }}
                      >
                        SLA {row.sla}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer status strip */}
        <div
          className="flex items-center justify-between px-5 py-2.5"
          style={{
            background: "rgba(255, 255, 255, 0.015)",
            borderTop: "1px solid rgba(255, 255, 255, 0.04)",
          }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted-2)" }}
          >
            Audit trail · open
          </div>
          <div
            className="text-[10px] uppercase tracking-[0.22em]"
            style={{ color: "var(--muted-2)" }}
          >
            Module-AI · v1.4
          </div>
        </div>
      </motion.div>
    </TiltCard>
  );
};
