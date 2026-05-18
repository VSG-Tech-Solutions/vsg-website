"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  Search,
  Filter,
  Brain,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";

/**
 * ProcurementMockup — high-fidelity fake product UI for the
 * Procurement product. Sits inside ProductMockupFrame.
 *
 * Two-column layout (sidebar + main view), real-feeling product
 * surfaces. No "live" animations beyond a few opacity tweens —
 * the goal is a polished still that reads as a real product.
 */

const ease = [0.16, 1, 0.3, 1] as const;
const ORANGE = "#FF6B2C";

const QUEUE = [
  {
    sku: "SKU-CHEM-018",
    supplier: "ACME Logistics",
    qty: "1,200",
    price: "R 52.40/kg",
    conf: 91,
    status: "AI drafted",
    fresh: true,
  },
  {
    sku: "SKU-METAL-447",
    supplier: "Stainless 316 Grp",
    qty: "800",
    price: "R 104.10/kg",
    conf: 76,
    status: "Awaiting your call",
    fresh: false,
  },
  {
    sku: "SKU-PVC-099",
    supplier: "Cape Polymer",
    qty: "2,400",
    price: "R 18.65/kg",
    conf: 88,
    status: "AI drafted",
    fresh: false,
  },
  {
    sku: "SKU-ALUM-225",
    supplier: "Highveld Alloys",
    qty: "640",
    price: "R 76.90/kg",
    conf: 82,
    status: "AI drafted",
    fresh: false,
  },
];

export const ProcurementMockup: React.FC = () => {
  return (
    <div className="grid grid-cols-12 min-h-[420px]">
      {/* Sidebar */}
      <aside
        className="col-span-3 border-r p-4 hidden md:flex flex-col gap-1"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="text-[9px] uppercase tracking-[0.28em] text-muted mb-3 px-2">
          Procurement
        </div>
        {[
          { label: "Drafts", count: 4, active: true, icon: Brain },
          { label: "RFQ", count: 2, active: false, icon: Search },
          { label: "Approved", count: 28, active: false, icon: CheckCircle2 },
          { label: "Watching", count: 12, active: false, icon: TrendingUp },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-md text-[12px]"
              style={{
                background: item.active ? "rgba(255,107,44,0.08)" : "transparent",
                color: item.active ? ORANGE : "rgba(255,255,255,0.65)",
              }}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5" strokeWidth={1.7} />
                <span className="font-medium">{item.label}</span>
              </div>
              <span
                className="text-[10px] font-mono"
                style={{
                  color: item.active ? ORANGE : "rgba(255,255,255,0.35)",
                }}
              >
                {item.count}
              </span>
            </div>
          );
        })}

        <div
          className="mt-auto rounded-lg p-3 mx-1 text-[11px]"
          style={{
            background: "rgba(255,107,44,0.06)",
            border: "1px solid rgba(255,107,44,0.18)",
          }}
        >
          <div
            className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] font-bold mb-1.5"
            style={{ color: ORANGE }}
          >
            <Brain className="w-3 h-3" strokeWidth={2} />
            AI working
          </div>
          <div className="text-text-primary leading-relaxed">
            8,412 historical POs ·{" "}
            <span style={{ color: ORANGE }}>312 supplier patterns</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="col-span-12 md:col-span-9 p-5 md:p-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-5 gap-4 flex-wrap">
          <div>
            <div className="text-[9px] uppercase tracking-[0.28em] text-muted mb-1">
              Drafts · Today
            </div>
            <div className="flex items-center gap-3">
              <h4
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  letterSpacing: "-0.015em",
                  color: "white",
                }}
              >
                4 awaiting your approval
              </h4>
              <span
                className="text-[10px] font-mono px-1.5 py-0.5 rounded"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.60)",
                }}
              >
                07:42
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px]"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.70)",
              }}
            >
              <Filter className="w-3 h-3" strokeWidth={1.6} />
              Filter
            </button>
            <button
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-bold"
              style={{
                background: ORANGE,
                color: "white",
              }}
            >
              <ShoppingCart className="w-3 h-3" strokeWidth={2} />
              New draft
            </button>
          </div>
        </div>

        {/* Rows */}
        <div className="space-y-2">
          {QUEUE.map((r, i) => (
            <motion.div
              key={r.sku}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.1 + i * 0.08 }}
              className="grid grid-cols-12 items-center gap-3 rounded-lg px-3.5 py-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* SKU */}
              <div className="col-span-12 md:col-span-3">
                <div
                  className="text-[10px] font-mono mb-0.5"
                  style={{ color: ORANGE }}
                >
                  {r.sku}
                </div>
                <div className="text-[12px] font-bold text-white truncate">
                  {r.supplier}
                </div>
              </div>

              {/* Qty + price */}
              <div className="col-span-6 md:col-span-3">
                <div className="text-[12px] text-white tabular-nums">
                  {r.qty} units
                </div>
                <div className="text-[11px] text-muted">{r.price}</div>
              </div>

              {/* Status */}
              <div className="col-span-6 md:col-span-3">
                <div className="flex items-center gap-1.5 text-[11px]">
                  {r.fresh ? (
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: ORANGE }}
                    />
                  ) : (
                    <Clock
                      className="w-3 h-3"
                      strokeWidth={1.6}
                      style={{ color: "rgba(255,255,255,0.40)" }}
                    />
                  )}
                  <span style={{ color: r.fresh ? ORANGE : "rgba(255,255,255,0.65)" }}>
                    {r.status}
                  </span>
                </div>
              </div>

              {/* Confidence */}
              <div className="col-span-12 md:col-span-3 flex items-center gap-2.5">
                <div className="flex-1 h-1 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  <div
                    className="h-full"
                    style={{
                      width: `${r.conf}%`,
                      background: `linear-gradient(90deg, #FF8A4F 0%, ${ORANGE} 100%)`,
                    }}
                  />
                </div>
                <div className="text-[11px] font-mono font-bold tabular-nums text-white shrink-0">
                  {r.conf}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};
