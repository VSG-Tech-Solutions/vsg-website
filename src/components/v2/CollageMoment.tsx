"use client";

import { motion } from "framer-motion";
import {
  ShoppingCart,
  PackageCheck,
  Brain,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/**
 * CollageMoment — Stripe-school assembled UI artifacts.
 *
 * Five floating cards on a dark canvas, arranged like a magazine
 * spread. Each card is a tasteful product artifact — a draft PO row,
 * a 3-way match preview, a confidence chip, an "AI is working" pulse.
 * The whole thing reads as proof-by-collage rather than a single
 * mockup.
 *
 * The OrangeBeam shows through this section because the background is
 * dark and transparent.
 */

const ease = [0.16, 1, 0.3, 1] as const;

export const CollageMoment: React.FC = () => {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{ background: "hsl(var(--bg))" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-6">
            <span
              className="w-8 h-px"
              style={{ background: "rgba(255,255,255,0.20)" }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.32em] font-semibold"
              style={{ color: "#FF6B2C" }}
            >
              How it ships
            </span>
          </div>
          <h2
            className="font-display text-text-primary"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2.25rem, 5.4vw, 4.5rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            The work, drafted.{" "}
            <span className="text-muted">The decision, yours.</span>
          </h2>
          <p className="mt-7 text-base md:text-[17px] text-muted leading-relaxed">
            Each VSG product opens onto a queue your operator can move
            through in twenty minutes flat. The AI does the draft, the
            ranking, the match, the routing. Your team approves, edits,
            or overrides — and every override teaches the next cycle.
          </p>
        </motion.div>

        {/* Collage grid — 12 cols, asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {/* CARD A — big PO draft, top-left, spans 7 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
            className="md:col-span-7 md:row-span-2 rounded-3xl overflow-hidden p-7 md:p-10"
            style={{
              background:
                "linear-gradient(180deg, hsl(0 0% 9%) 0%, hsl(0 0% 6%) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 80px -30px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-7">
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
                style={{
                  background: "rgba(255,107,44,0.10)",
                  border: "1px solid rgba(255,107,44,0.30)",
                }}
              >
                <ShoppingCart
                  className="w-4 h-4"
                  style={{ color: "#FF6B2C" }}
                  strokeWidth={1.6}
                />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted">
                  Procurement · Drafts
                </div>
                <div className="text-sm text-text-primary">
                  3 awaiting your approval
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {[
                { sku: "SKU-CHEM-018", supplier: "ACME Logistics", qty: "1,200", conf: 91 },
                { sku: "SKU-METAL-447", supplier: "Stainless 316 Grp", qty: "800", conf: 76 },
                { sku: "SKU-PVC-099", supplier: "Cape Polymer", qty: "2,400", conf: 88 },
              ].map((r) => (
                <div
                  key={r.sku}
                  className="flex items-center justify-between gap-4 rounded-xl p-3.5"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-[10px] font-mono mb-1"
                      style={{ color: "#FF6B2C" }}
                    >
                      {r.sku}
                    </div>
                    <div className="text-[13px] font-medium text-text-primary truncate">
                      {r.supplier} · {r.qty} units
                    </div>
                  </div>
                  <div className="shrink-0 text-right w-[80px]">
                    <div className="text-[9px] uppercase tracking-[0.22em] text-muted mb-1">
                      Confidence
                    </div>
                    <div className="text-[12px] font-mono font-bold tabular-nums text-text-primary">
                      {r.conf}%
                    </div>
                    <div
                      className="mt-1.5 h-1 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.05)" }}
                    >
                      <div
                        className="h-full"
                        style={{
                          width: `${r.conf}%`,
                          background:
                            "linear-gradient(90deg, #FF8A4F 0%, #FF6B2C 100%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CARD B — 3-way match, top-right, spans 5 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="md:col-span-5 rounded-3xl overflow-hidden p-7"
            style={{
              background:
                "linear-gradient(180deg, hsl(0 0% 11%) 0%, hsl(0 0% 7%) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 80px -30px rgba(0,0,0,0.6)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <PackageCheck
                  className="w-4 h-4 text-text-primary"
                  strokeWidth={1.6}
                />
              </span>
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted">
                  Receiving · GRV PO-4827
                </div>
                <div className="text-sm text-text-primary">3-way match</div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { l: "PO ordered", v: "1,200 units", ok: true },
                { l: "Goods received", v: "1,182 units", ok: false },
                { l: "Invoice", v: "1,200 units", ok: true },
              ].map((row) => (
                <div
                  key={row.l}
                  className="flex items-center justify-between text-[13px]"
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
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: "#FF6B2C" }}
                        />
                      )}
                    </span>
                    <span className="text-muted">{row.l}</span>
                  </div>
                  <span className="text-text-primary font-mono text-[12px]">
                    {row.v}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-xl px-4 py-3"
              style={{
                background: "rgba(255,107,44,0.08)",
                border: "1px solid rgba(255,107,44,0.22)",
              }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.22em] mb-1"
                style={{ color: "#FF6B2C" }}
              >
                Variance flagged
              </div>
              <div className="text-[13px] text-text-primary">
                −18 short · auto-routed to AP
              </div>
            </div>
          </motion.div>

          {/* CARD C — AI is working, mid-right, spans 5 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease, delay: 0.3 }}
            className="md:col-span-5 rounded-3xl overflow-hidden p-7"
            style={{
              background:
                "linear-gradient(180deg, hsl(0 0% 9%) 0%, hsl(0 0% 6%) 100%)",
              border: "1px solid rgba(255,107,44,0.20)",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 80px -30px rgba(255,107,44,0.10)",
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg"
                  style={{
                    background: "rgba(255,107,44,0.10)",
                    border: "1px solid rgba(255,107,44,0.30)",
                  }}
                >
                  <Brain
                    className="w-4 h-4"
                    style={{ color: "#FF6B2C" }}
                    strokeWidth={1.6}
                  />
                </span>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted">
                    Status · live
                  </div>
                  <div className="text-sm text-text-primary">
                    Trained on your data
                  </div>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.22em] text-text-primary">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#FF6B2C" }}
                />
                Working
              </span>
            </div>
            <p className="text-[13px] text-muted leading-relaxed">
              Your team's overrides become the next cycle's defaults.
              <span className="text-text-primary">
                {" "}
                8,412 historical POs
              </span>{" "}
              and{" "}
              <span className="text-text-primary">312 supplier patterns</span>{" "}
              live in your tenant — never pooled.
            </p>
          </motion.div>

          {/* CARD D — Confidence chip, bottom-left, spans 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease, delay: 0.4 }}
            className="md:col-span-4 rounded-3xl p-7 flex flex-col justify-between min-h-[180px]"
            style={{
              background:
                "linear-gradient(180deg, hsl(0 0% 11%) 0%, hsl(0 0% 7%) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted">
              <Sparkles
                className="w-3 h-3"
                style={{ color: "#FF6B2C" }}
                strokeWidth={2}
              />
              Live in 5 weeks
            </div>
            <div>
              <div
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  letterSpacing: "-0.025em",
                  color: "#FF6B2C",
                }}
              >
                5
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.28em] text-muted">
                weeks · spec to live
              </div>
              <p className="mt-3 text-[12px] text-muted leading-relaxed">
                Pilot signed Monday. First workflow in production by week
                six. No platform tax, no pilot dance.
              </p>
            </div>
          </motion.div>

          {/* CARD E — Plays nicely with, bottom-right, spans 8 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease, delay: 0.5 }}
            className="md:col-span-8 rounded-3xl p-7 md:p-9 flex flex-col justify-between min-h-[180px]"
            style={{
              background:
                "linear-gradient(180deg, hsl(0 0% 9%) 0%, hsl(0 0% 6%) 100%)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-[10px] uppercase tracking-[0.28em] text-muted">
              Plays nicely with the systems your team already runs
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4">
              {[
                "Syspro",
                "SAP",
                "Sage",
                "NetSuite",
                "Microsoft 365",
                "OpenAI",
                "Anthropic",
              ].map((tech, i) => (
                <span
                  key={tech}
                  className={`font-display tracking-tight ${
                    i === 0 ? "text-text-primary" : "text-muted"
                  }`}
                  style={{
                    fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
