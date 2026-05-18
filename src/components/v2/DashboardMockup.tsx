"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  Clock,
  Brain,
} from "lucide-react";

/**
 * DashboardMockup — three-panel layered "live product UI" for the hero.
 *
 * No video, no real product — but believable. Three offset surfaces:
 *
 *   • Back card  — supplier comparison ranking (Auctioneer-flavoured)
 *   • Front card — AI-drafted PO with reasoning + confidence bar
 *   • Floating side card — status timeline with live pulse
 *
 * Subtle ambient cool-blue glow + faint gridlines on the back surface.
 * Numbers animate on a slow loop so the panel feels alive.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const ROWS = [
  {
    sku: "SKU-CHEM-018",
    supplier: "ACME Logistics",
    qty: "1,200",
    price: "R 52.40/kg",
    conf: 91,
    delta: "+R 1,840 vs last cycle",
    pulse: true,
  },
  {
    sku: "SKU-METAL-447",
    supplier: "Stainless 316 Grp",
    qty: "800",
    price: "R 104.10/kg",
    conf: 76,
    delta: "−R 920 vs last cycle",
    pulse: false,
  },
  {
    sku: "SKU-PVC-099",
    supplier: "Cape Polymer",
    qty: "2,400",
    price: "R 18.65/kg",
    conf: 88,
    delta: "Best landed cost",
    pulse: false,
  },
];

const TIMELINE = [
  { label: "RFQ closed", icon: CheckCircle2, time: "07:08", done: true },
  { label: "Quotes ranked", icon: TrendingUp, time: "07:09", done: true },
  { label: "Draft proposed", icon: Sparkles, time: "07:09", done: true, accent: true },
  { label: "Awaiting buyer", icon: Clock, time: "now", done: false },
];

export const DashboardMockup: React.FC = () => {
  const [tick, setTick] = useState(0);

  // Slow tick to drive subtle live feel on confidence + status
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-[640px] mx-auto">
      {/* Ambient glow halo */}
      <div
        aria-hidden
        className="absolute -inset-12 -z-10 blur-3xl opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 30%, rgba(137,170,204,0.20) 0%, rgba(137,170,204,0) 65%)",
        }}
      />

      {/* BACK CARD — supplier comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotateY: -3 }}
        animate={{ opacity: 1, y: 0, rotateY: -3 }}
        transition={{ duration: 1, ease, delay: 0.1 }}
        className="absolute right-0 top-12 w-[85%] rounded-2xl overflow-hidden hidden md:block"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 9%) 0%, hsl(0 0% 6%) 100%)",
          border: "1px solid hsl(var(--stroke))",
          boxShadow:
            "0 30px 80px -30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)",
          transformOrigin: "left center",
        }}
      >
        <div className="px-5 pt-4 pb-3 border-b border-stroke flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-[0.28em] text-muted">
            Receiving · Live
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-muted">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            Streaming
          </span>
        </div>
        <div className="p-5 space-y-2">
          {[
            { label: "Dock receipt PO-4827", val: "1,182 / 1,200 units" },
            { label: "Variance flagged", val: "−18 short" },
            { label: "Routed", val: "→ AP exception" },
          ].map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-1.5 text-[11px]"
            >
              <span className="text-muted">{row.label}</span>
              <span className="text-text-primary font-medium">{row.val}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* FRONT CARD — Procurement AI draft */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.25 }}
        className="relative rounded-3xl overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 10%) 0%, hsl(0 0% 7%) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "0 50px 100px -30px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Window chrome */}
        <div className="px-5 py-3.5 border-b border-stroke flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stroke" />
            <span className="w-2.5 h-2.5 rounded-full bg-stroke" />
            <span className="w-2.5 h-2.5 rounded-full bg-stroke" />
          </div>
          <div className="text-[10px] font-mono text-muted">
            vsg.procurement / drafts
          </div>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.22em] text-text-primary bg-stroke/40 border border-stroke">
            <span
              className="w-1 h-1 rounded-full"
              style={{ background: "#89AACC" }}
            />
            Live
          </span>
        </div>

        {/* Header row */}
        <div className="px-6 pt-5 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-xl"
              style={{
                background: "rgba(137,170,204,0.10)",
                border: "1px solid rgba(137,170,204,0.30)",
              }}
            >
              <ShoppingCart
                className="w-4 h-4"
                style={{ color: "#89AACC" }}
                strokeWidth={1.6}
              />
            </span>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted">
                Procurement · Drafts
              </div>
              <div className="text-sm font-medium text-text-primary">
                3 awaiting your approval
              </div>
            </div>
          </div>
          <div className="text-[10px] font-mono text-muted">07:42</div>
        </div>

        {/* Rows */}
        <div className="px-3 pb-3 space-y-2">
          {ROWS.map((r, i) => {
            // Slight per-tick wobble on confidence to feel live
            const conf = Math.max(0, Math.min(100, r.conf + ((tick + i) % 3) - 1));
            return (
              <motion.div
                key={r.sku}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.5 + i * 0.12 }}
                className="rounded-xl px-4 py-3.5 flex items-center justify-between gap-4"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: "#89AACC" }}
                    >
                      {r.sku}
                    </span>
                    {r.pulse && (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.18em] text-muted">
                        <span
                          className="w-1 h-1 rounded-full animate-pulse"
                          style={{ background: "#89AACC" }}
                        />
                        Just drafted
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-[13px] font-medium text-text-primary truncate">
                    {r.supplier} · {r.qty} units
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted">
                    {r.price} · {r.delta}
                  </div>
                </div>
                {/* Confidence */}
                <div className="shrink-0 text-right w-[88px]">
                  <div className="text-[9px] uppercase tracking-[0.22em] text-muted">
                    Confidence
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 justify-end">
                    <div className="text-[12px] font-mono font-bold tabular-nums text-text-primary">
                      {conf}%
                    </div>
                  </div>
                  <div className="mt-1.5 h-1 w-full rounded-full bg-stroke overflow-hidden">
                    <motion.div
                      className="h-full accent-gradient"
                      initial={{ width: 0 }}
                      animate={{ width: `${conf}%` }}
                      transition={{ duration: 0.9, ease, delay: 0.6 + i * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer — AI status line */}
        <div className="px-6 py-4 border-t border-stroke flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-muted">
            <Brain
              className="w-3.5 h-3.5"
              style={{ color: "#89AACC" }}
              strokeWidth={1.6}
            />
            <span>
              Trained on your data ·{" "}
              <span className="text-text-primary">8,412 historical POs</span>
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "#89AACC" }}
            />
            <span className="text-[10px] uppercase tracking-[0.22em] text-text-primary">
              Working
            </span>
          </div>
        </div>
      </motion.div>

      {/* FLOATING SIDE CARD — timeline */}
      <motion.div
        initial={{ opacity: 0, x: 30, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.5 }}
        className="absolute -bottom-10 -left-8 w-[260px] rounded-2xl overflow-hidden hidden lg:block"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 11%) 0%, hsl(0 0% 7%) 100%)",
          border: "1px solid rgba(255,255,255,0.10)",
          boxShadow:
            "0 30px 70px -20px rgba(0,0,0,0.85), inset 0 1px 0 rgba(255,255,255,0.05)",
          transformOrigin: "right center",
        }}
      >
        <div className="px-4 pt-3.5 pb-3 border-b border-stroke">
          <div className="text-[10px] uppercase tracking-[0.28em] text-muted">
            This morning · live
          </div>
          <div className="mt-1 text-[13px] font-medium text-text-primary">
            RFQ closed at 07:08
          </div>
        </div>
        <div className="px-4 py-3 space-y-2.5">
          {TIMELINE.map((t) => {
            const Icon = t.icon;
            return (
              <div key={t.label} className="flex items-center gap-2.5">
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-md shrink-0"
                  style={{
                    background: t.accent
                      ? "rgba(137,170,204,0.10)"
                      : "rgba(255,255,255,0.03)",
                    border: t.accent
                      ? "1px solid rgba(137,170,204,0.30)"
                      : "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Icon
                    className="w-3 h-3"
                    style={{
                      color: t.accent
                        ? "#89AACC"
                        : t.done
                        ? "rgba(255,255,255,0.65)"
                        : "rgba(255,255,255,0.3)",
                    }}
                    strokeWidth={1.6}
                  />
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[11px] truncate"
                    style={{
                      color: t.done
                        ? "var(--color-text-primary)"
                        : "hsl(var(--muted))",
                    }}
                  >
                    {t.label}
                  </div>
                </div>
                <div className="text-[9px] font-mono text-muted shrink-0">
                  {t.time}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
