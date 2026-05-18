"use client";

import { motion } from "framer-motion";
import {
  Database,
  Box,
  Layers,
  Cloud,
  Brain,
  Sparkles,
  Cpu,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

/**
 * IntegrationBeams — Magic UI animated-beam school.
 *
 * Three rows of nodes:
 *   • Top row    — ERP systems (Syspro, SAP, Sage, NetSuite)
 *   • Centre     — VSG mark (the hub)
 *   • Bottom row — AI providers + tools (OpenAI, Anthropic, Microsoft 365)
 *
 * Animated beams travel from the top nodes → VSG hub → bottom nodes,
 * showing how data + AI flow through VSG. Each beam is a small bright
 * pulse traveling along an SVG path; the paths themselves are static
 * thin guide-lines.
 */

const ORANGE = "#FF6B2C";
const ease = [0.16, 1, 0.3, 1] as const;

type Node = { label: string; icon: typeof Database; sub: string };

const TOP_NODES: Node[] = [
  { label: "Syspro", icon: Database, sub: "ERP" },
  { label: "SAP", icon: Database, sub: "ERP" },
  { label: "Sage", icon: Layers, sub: "ERP" },
  { label: "NetSuite", icon: Box, sub: "ERP" },
];

const BOTTOM_NODES: Node[] = [
  { label: "OpenAI", icon: Brain, sub: "AI" },
  { label: "Anthropic", icon: Sparkles, sub: "AI" },
  { label: "Microsoft 365", icon: Cloud, sub: "Suite" },
  { label: "Custom stack", icon: Cpu, sub: "On-prem" },
];

export const IntegrationBeams: React.FC = () => {
  return (
    <section
      className="relative py-24 md:py-32 border-t border-b"
      style={{
        background: "hsl(0 0% 5%)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-8 h-px"
                style={{ background: "rgba(255,255,255,0.20)" }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.32em] font-bold"
                style={{ color: ORANGE }}
              >
                Integrations
              </span>
            </div>
            <h2
              className="text-text-primary"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
              }}
            >
              We sit between{" "}
              <span className="text-muted">your stack and the AI.</span>
            </h2>
            <p className="mt-7 text-base md:text-[17px] text-muted leading-relaxed max-w-xl">
              Each VSG product runs alongside your ERP, talks to the AI
              providers you already trust, and writes outcomes back to
              the system of record. No lock-in, owned outright on
              cut-over.
            </p>
            <Link
              href="mailto:stephan@vsgtech.co.za?subject=Integration"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold transition-[gap] hover:gap-3"
              style={{ color: ORANGE }}
            >
              <span>Talk integration</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
            </Link>
          </motion.div>

          {/* RIGHT — the diagram */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease, delay: 0.2 }}
            className="lg:col-span-7 relative"
          >
            <div
              className="relative rounded-3xl p-7 md:p-10 overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, hsl(0 0% 9%) 0%, hsl(0 0% 6%) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.05), 0 30px 80px -30px rgba(0,0,0,0.6)",
              }}
            >
              {/* Top row */}
              <div className="grid grid-cols-4 gap-3">
                {TOP_NODES.map((n, i) => (
                  <NodePill key={i} node={n} />
                ))}
              </div>

              {/* Beam canvas — connects top row to centre to bottom row */}
              <div className="relative h-[140px] my-3">
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 400 140"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="beam-grad"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="rgba(255,107,44,0)" />
                      <stop offset="50%" stopColor="rgba(255,107,44,1)" />
                      <stop offset="100%" stopColor="rgba(255,107,44,0)" />
                    </linearGradient>
                  </defs>

                  {/* Static guide lines from each top node down to centre */}
                  {[50, 150, 250, 350].map((x, i) => (
                    <g key={`top-${i}`}>
                      <line
                        x1={x}
                        y1={0}
                        x2={200}
                        y2={70}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth={1}
                      />
                      {/* Animated bright pulse traveling along the line */}
                      <motion.line
                        x1={x}
                        y1={0}
                        x2={200}
                        y2={70}
                        stroke="url(#beam-grad)"
                        strokeWidth={2}
                        strokeDasharray="40 200"
                        initial={{ strokeDashoffset: 240 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{
                          duration: 3.2,
                          delay: i * 0.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </g>
                  ))}

                  {/* Static guide lines from centre down to each bottom node */}
                  {[50, 150, 250, 350].map((x, i) => (
                    <g key={`bot-${i}`}>
                      <line
                        x1={200}
                        y1={70}
                        x2={x}
                        y2={140}
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth={1}
                      />
                      <motion.line
                        x1={200}
                        y1={70}
                        x2={x}
                        y2={140}
                        stroke="url(#beam-grad)"
                        strokeWidth={2}
                        strokeDasharray="40 200"
                        initial={{ strokeDashoffset: 240 }}
                        animate={{ strokeDashoffset: 0 }}
                        transition={{
                          duration: 3.2,
                          delay: 1.5 + i * 0.5,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </g>
                  ))}
                </svg>

                {/* Centre VSG hub node — sits on top of the SVG */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div
                    className="relative inline-flex items-center justify-center px-4 py-2 rounded-full"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,107,44,0.18) 0%, rgba(255,107,44,0.06) 100%)",
                      border: "1px solid rgba(255,107,44,0.40)",
                      boxShadow: `0 0 28px rgba(255,107,44,0.35)`,
                    }}
                  >
                    <span
                      className="text-[11px] font-bold uppercase tracking-[0.22em]"
                      style={{ color: ORANGE }}
                    >
                      VSG
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom row */}
              <div className="grid grid-cols-4 gap-3">
                {BOTTOM_NODES.map((n, i) => (
                  <NodePill key={i} node={n} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- NodePill ---------------- */

const NodePill: React.FC<{ node: Node }> = ({ node }) => {
  const Icon = node.icon;
  return (
    <div
      className="rounded-xl px-3 py-2.5 flex items-center gap-2.5"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-md shrink-0"
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        <Icon
          className="w-3.5 h-3.5 text-text-primary"
          strokeWidth={1.6}
        />
      </span>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold text-text-primary truncate">
          {node.label}
        </div>
        <div className="text-[9px] uppercase tracking-[0.22em] text-muted">
          {node.sub}
        </div>
      </div>
    </div>
  );
};
