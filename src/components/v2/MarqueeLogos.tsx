"use client";

import { motion } from "framer-motion";

/**
 * MarqueeLogos — small clean horizontal marquee of integration names.
 *
 * Two rows scrolling in opposite directions, edges fading. Magic UI
 * Marquee school but used at a small/restrained scale — not the
 * dominant huge-text version.
 */

type Props = {
  className?: string;
};

const ROW_A = [
  "Syspro",
  "SAP",
  "Sage",
  "NetSuite",
  "Microsoft 365",
  "OpenAI",
  "Anthropic",
];
const ROW_B = [
  "Manufacturing",
  "Distribution",
  "Operations",
  "Procurement",
  "Logistics",
  "Receiving",
  "Production Scheduling",
];

export const MarqueeLogos: React.FC<Props> = ({ className = "" }) => {
  return (
    <section
      className={`relative py-12 md:py-16 border-t border-b ${className}`}
      style={{
        background: "hsl(var(--bg))",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="text-[10px] uppercase tracking-[0.32em] font-bold text-muted text-center mb-7 max-w-[1280px] mx-auto px-6"
      >
        Plays nicely with the systems your team already runs
      </div>

      {/* Row A — scrolling left */}
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <motion.div
          className="inline-flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        >
          {[...ROW_A, ...ROW_A, ...ROW_A].map((label, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-7"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "-0.015em",
              }}
            >
              {label}
              <span style={{ color: "#FF6B2C" }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Row B — scrolling right (opposite direction), smaller */}
      <div
        className="overflow-hidden mt-3"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <motion.div
          className="inline-flex whitespace-nowrap"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {[...ROW_B, ...ROW_B, ...ROW_B].map((label, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-7"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.30)",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {label}
              <span style={{ color: "rgba(255,107,44,0.55)" }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
