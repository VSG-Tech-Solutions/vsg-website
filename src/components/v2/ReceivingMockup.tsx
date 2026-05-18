"use client";

import { motion } from "framer-motion";
import {
  PackageCheck,
  CheckCircle2,
  AlertTriangle,
  Camera,
  ArrowUpRight,
  TrendingDown,
} from "lucide-react";

/**
 * ReceivingMockup — Receiving product UI mock.
 *
 * Layout differs from Procurement so the two products read distinct:
 *   • Top stat strip (3 small KPI cards)
 *   • Big "GRV-4827" detail panel showing the 3-way match
 *   • Right rail of recent variances
 */

const ease = [0.16, 1, 0.3, 1] as const;
const ORANGE = "#FF6B2C";

export const ReceivingMockup: React.FC = () => {
  return (
    <div className="p-5 md:p-6 min-h-[420px]">
      {/* Top stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "GRVs today", value: "47", note: "+8 vs avg" },
          { label: "Variances flagged", value: "3", note: "auto-routed", accent: true },
          { label: "Three-way match", value: "94%", note: "this month" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg px-4 py-3"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="text-[9px] uppercase tracking-[0.28em] text-muted mb-1.5">
              {s.label}
            </div>
            <div
              className="leading-none"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 800,
                fontSize: "1.6rem",
                letterSpacing: "-0.025em",
                color: s.accent ? ORANGE : "white",
              }}
            >
              {s.value}
            </div>
            <div className="text-[10px] text-muted mt-1">{s.note}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-3">
        {/* Main detail panel — GRV-4827 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="col-span-12 md:col-span-7 rounded-xl p-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[9px] uppercase tracking-[0.28em] text-muted">
                GRV detail
              </div>
              <div className="flex items-center gap-2 mt-1">
                <PackageCheck
                  className="w-4 h-4"
                  style={{ color: ORANGE }}
                  strokeWidth={1.7}
                />
                <span className="text-[14px] font-bold text-white">
                  GRV-4827 · ACME Logistics
                </span>
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.22em] font-bold"
              style={{
                background: "rgba(255,107,44,0.10)",
                border: "1px solid rgba(255,107,44,0.28)",
                color: ORANGE,
              }}
            >
              <span
                className="w-1 h-1 rounded-full animate-pulse"
                style={{ background: ORANGE }}
              />
              Variance
            </span>
          </div>

          {/* 3-way match rows */}
          <div className="space-y-2.5">
            {[
              {
                l: "PO ordered",
                v: "1,200 units",
                ok: true,
              },
              {
                l: "Goods received",
                v: "1,182 units",
                ok: false,
                delta: "−18",
              },
              {
                l: "Invoice",
                v: "1,200 units",
                ok: true,
              },
            ].map((row) => (
              <div
                key={row.l}
                className="flex items-center justify-between gap-3 rounded-lg px-3 py-2.5"
                style={{
                  background: row.ok
                    ? "rgba(255,255,255,0.02)"
                    : "rgba(255,107,44,0.06)",
                  border: row.ok
                    ? "1px solid rgba(255,255,255,0.05)"
                    : "1px solid rgba(255,107,44,0.18)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full"
                    style={{
                      background: row.ok
                        ? "rgba(38, 200, 130, 0.10)"
                        : "rgba(255, 107, 44, 0.10)",
                      border: row.ok
                        ? "1px solid rgba(38, 200, 130, 0.30)"
                        : "1px solid rgba(255, 107, 44, 0.30)",
                    }}
                  >
                    {row.ok ? (
                      <CheckCircle2
                        className="w-3 h-3"
                        style={{ color: "#26C882" }}
                        strokeWidth={2}
                      />
                    ) : (
                      <AlertTriangle
                        className="w-3 h-3"
                        style={{ color: ORANGE }}
                        strokeWidth={2}
                      />
                    )}
                  </span>
                  <span className="text-[12px] text-muted">{row.l}</span>
                </div>
                <div className="flex items-center gap-2">
                  {row.delta && (
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color: ORANGE }}
                    >
                      {row.delta}
                    </span>
                  )}
                  <span className="text-[12px] font-mono text-white">
                    {row.v}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AI verdict */}
          <div
            className="mt-4 rounded-lg px-3 py-2.5 flex items-center justify-between gap-3"
            style={{
              background: "rgba(255,107,44,0.08)",
              border: "1px solid rgba(255,107,44,0.22)",
            }}
          >
            <div className="flex items-center gap-2 min-w-0">
              <TrendingDown
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: ORANGE }}
                strokeWidth={2}
              />
              <span className="text-[12px] text-white">
                Short ship · routed to AP exception
              </span>
            </div>
            <ArrowUpRight
              className="w-3.5 h-3.5"
              style={{ color: ORANGE }}
              strokeWidth={2}
            />
          </div>
        </motion.div>

        {/* Right rail — recent activity */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="col-span-12 md:col-span-5 rounded-xl p-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="text-[9px] uppercase tracking-[0.28em] text-muted mb-4">
            This morning · live
          </div>
          <div className="space-y-3">
            {[
              { time: "07:42", label: "GRV-4828 captured", icon: Camera, ok: true },
              { time: "07:31", label: "PO match · 100%", icon: CheckCircle2, ok: true },
              { time: "07:08", label: "GRV-4827 · −18 short", icon: AlertTriangle, accent: true },
              { time: "06:54", label: "GRV-4826 captured", icon: Camera, ok: true },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.time}
                  className="flex items-center gap-3"
                >
                  <div className="text-[10px] font-mono text-muted w-10 shrink-0">
                    {item.time}
                  </div>
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-md shrink-0"
                    style={{
                      background: item.accent
                        ? "rgba(255,107,44,0.10)"
                        : "rgba(255,255,255,0.04)",
                      border: item.accent
                        ? "1px solid rgba(255,107,44,0.28)"
                        : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <Icon
                      className="w-3 h-3"
                      strokeWidth={1.7}
                      style={{
                        color: item.accent
                          ? ORANGE
                          : "rgba(255,255,255,0.65)",
                      }}
                    />
                  </span>
                  <div className="text-[12px] text-white truncate">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
