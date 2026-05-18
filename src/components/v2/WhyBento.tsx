"use client";

import { motion } from "framer-motion";
import {
  Brain,
  ShieldCheck,
  Coins,
  Workflow,
  Users,
  Zap,
} from "lucide-react";

/**
 * WhyBento — Aceternity bento-grid school + Magic UI cursor-following
 * gradient on each tile (MagicCard).
 */

const ease = [0.16, 1, 0.3, 1] as const;
const ORANGE = "#FF6B2C";

type Tile = {
  icon: typeof Brain;
  eyebrow: string;
  title: string;
  body: string;
  className: string;
  accent?: boolean;
};

const TILES: Tile[] = [
  {
    icon: Brain,
    eyebrow: "01 · The model",
    title: "Trained on your data, never pooled.",
    body: "Every product runs in your tenant only. 8,412 historical POs and 312 supplier patterns become YOUR model — no shared training set, no leakage.",
    className: "md:col-span-7 md:row-span-2",
    accent: true,
  },
  {
    icon: Zap,
    eyebrow: "02 · The pace",
    title: "Live in 5 weeks.",
    body: "Pilot signed Monday → in production by week 6. No platform tax, no pilot dance.",
    className: "md:col-span-5",
  },
  {
    icon: ShieldCheck,
    eyebrow: "03 · The trust",
    title: "POPIA-aligned, audit-ready.",
    body: "Every product action timestamped and traceable. Regulator-ready out of the box.",
    className: "md:col-span-5",
  },
  {
    icon: Users,
    eyebrow: "04 · The relationship",
    title: "Both founders on every call.",
    body: "No SDR, no relay, no qualification script. You email a founder, you talk to a founder.",
    className: "md:col-span-4",
  },
  {
    icon: Coins,
    eyebrow: "05 · The commercials",
    title: "Fixed-price, in writing.",
    body: "What we quote is what you pay. No time-and-materials creep, no surprise change-orders.",
    className: "md:col-span-4",
  },
  {
    icon: Workflow,
    eyebrow: "06 · The fit",
    title: "Sits alongside your ERP.",
    body: "Syspro, SAP, Sage, NetSuite. We never replace the system of record — we run the work that wraps it.",
    className: "md:col-span-4",
  },
];

export const WhyBento: React.FC = () => {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{ background: "hsl(var(--bg))" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl mb-16"
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
              Why VSG
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
            Six things that{" "}
            <span className="text-muted">don&rsquo;t change.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(180px,auto)] gap-4 md:gap-5">
          {TILES.map((t, i) => (
            <BentoTile key={i} tile={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- BentoTile ---------------- */

const BentoTile: React.FC<{ tile: Tile; index: number }> = ({
  tile: t,
  index: i,
}) => {
  const Icon = t.icon;
  return (
    <div className={t.className}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease, delay: i * 0.06 }}
        className="group relative rounded-3xl p-7 md:p-8 overflow-hidden flex flex-col h-full"
        style={{
          background: t.accent
            ? "linear-gradient(180deg, rgba(255,107,44,0.08) 0%, hsl(0 0% 6%) 60%, hsl(0 0% 5%) 100%)"
            : "linear-gradient(180deg, hsl(0 0% 9%) 0%, hsl(0 0% 6%) 100%)",
          border: t.accent
            ? "1px solid rgba(255,107,44,0.20)"
            : "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 60px -24px rgba(0,0,0,0.55)",
        }}
      >
        {/* Top hairline that lights up on hover */}
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-px transition-opacity duration-500"
          style={{
            background: `linear-gradient(90deg, transparent 0%, ${ORANGE} 50%, transparent 100%)`,
            opacity: t.accent ? 0.45 : 0,
          }}
        />

        {/* Icon */}
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-xl mb-7"
          style={{
            background: t.accent
              ? "rgba(255,107,44,0.10)"
              : "rgba(255,255,255,0.04)",
            border: t.accent
              ? "1px solid rgba(255,107,44,0.30)"
              : "1px solid rgba(255,255,255,0.10)",
          }}
        >
          <Icon
            className="w-4 h-4"
            style={{ color: t.accent ? ORANGE : "white" }}
            strokeWidth={1.7}
          />
        </span>

        {/* Content */}
        <div className="mt-auto">
          <div className="text-[10px] uppercase tracking-[0.28em] font-bold text-muted mb-2">
            {t.eyebrow}
          </div>
          <h3
            className="text-text-primary mb-3"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: t.accent
                ? "clamp(1.4rem, 2.4vw, 1.9rem)"
                : "clamp(1.1rem, 1.6vw, 1.35rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
            }}
          >
            {t.title}
          </h3>
          <p
            className="text-[13px] md:text-[13.5px] leading-relaxed text-muted"
            style={{ maxWidth: "44ch" }}
          >
            {t.body}
          </p>
        </div>
      </motion.article>
    </div>
  );
};
