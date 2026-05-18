"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ShoppingCart, PackageCheck, Wrench } from "lucide-react";

/**
 * LiveStatusWidget — small dashboard-style card that lives next to
 * the hero. Shows three product states with pulse indicators + small
 * count-up metrics. Adds an "the system is alive" feel without
 * loud animation.
 *
 *   • Procurement — green pulse + count ticker
 *   • Production Scheduling — amber pulse (in dev)
 *   • Receiving — amber pulse (in dev)
 *
 * The metric numbers gently tick up over time on a slow loop so the
 * widget reads as showing live data without spamming the user.
 */

const ORANGE = "#FF6B2C";
const GREEN = "#26C882";
const AMBER = "#FFB45C";

export const LiveStatusWidget: React.FC = () => {
  const [drafts, setDrafts] = useState(12);
  const [tick, setTick] = useState(0);

  // Slow drift on the "drafts today" number — every 8s, +1
  useEffect(() => {
    const id = setInterval(() => {
      setDrafts((d) => d + 1);
      setTick((t) => t + 1);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      className="relative rounded-2xl overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(0 0% 10%) 0%, hsl(0 0% 6%) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 60px -24px rgba(0,0,0,0.55)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <Activity
            className="w-3.5 h-3.5"
            style={{ color: ORANGE }}
            strokeWidth={2}
          />
          <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-muted">
            Live · System status
          </span>
        </div>
        <span
          className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] font-bold"
          style={{ color: GREEN }}
        >
          <span
            className="w-1 h-1 rounded-full animate-pulse"
            style={{ background: GREEN }}
          />
          Operational
        </span>
      </div>

      {/* Rows */}
      <div className="px-4 py-3.5 space-y-2.5">
        <StatusRow
          icon={ShoppingCart}
          name="Procurement AI"
          state="Active"
          stateColor={GREEN}
          metric={
            <>
              <motion.span
                key={tick}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-text-primary font-bold"
              >
                {drafts}
              </motion.span>{" "}
              drafts today
            </>
          }
        />
        <StatusRow
          icon={Wrench}
          name="Production Scheduling"
          state="In dev"
          stateColor={AMBER}
          metric="Pilot — Q3 2026"
        />
        <StatusRow
          icon={PackageCheck}
          name="Receiving"
          state="In dev"
          stateColor={AMBER}
          metric="GRV beta — testing"
        />
      </div>
    </motion.div>
  );
};

/* ---------------- StatusRow ---------------- */

const StatusRow: React.FC<{
  icon: React.ElementType;
  name: string;
  state: string;
  stateColor: string;
  metric: React.ReactNode;
}> = ({ icon: Icon, name, state, stateColor, metric }) => (
  <div className="flex items-center justify-between gap-3 py-1">
    <div className="flex items-center gap-2.5 min-w-0">
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-md shrink-0"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Icon
          className="w-3.5 h-3.5 text-text-primary"
          strokeWidth={1.7}
        />
      </span>
      <div className="min-w-0">
        <div className="text-[12px] font-semibold text-text-primary truncate">
          {name}
        </div>
        <div className="text-[10px] text-muted">{metric}</div>
      </div>
    </div>
    <span
      className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-[0.22em] font-bold shrink-0"
      style={{ color: stateColor }}
    >
      <span
        className="w-1 h-1 rounded-full"
        style={{
          background: stateColor,
          animation:
            state === "Active" ? "vsg-pulse-dot 2s ease-in-out infinite" : undefined,
        }}
      />
      {state}
    </span>
    <style>{`
      @keyframes vsg-pulse-dot {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.35; }
      }
    `}</style>
  </div>
);
