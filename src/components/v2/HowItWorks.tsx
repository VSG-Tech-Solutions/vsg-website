"use client";

import { motion } from "framer-motion";
import { ClipboardCheck, Hammer, Rocket } from "lucide-react";

/**
 * HowItWorks — 3-step process strip.
 *
 * Clean numbered cards (01 / 02 / 03) showing the engagement flow:
 *   01 — Scope (week 0)
 *   02 — Build (weeks 1–4)
 *   03 — Live (week 5+)
 *
 * Hairline dividers between steps on desktop. Subtle hover lift.
 */

const ease = [0.16, 1, 0.3, 1] as const;
const ORANGE = "#FF6B2C";

const STEPS = [
  {
    num: "01",
    icon: ClipboardCheck,
    eyebrow: "Week 0",
    title: "Scope on a 30-min call.",
    body: "Both founders. We pick the workflow, agree the success metric, lock fixed-price terms in writing. No discovery deck.",
  },
  {
    num: "02",
    icon: Hammer,
    eyebrow: "Weeks 1–4",
    title: "We build against your real data.",
    body: "Senior engineers from day one. Working sessions weekly. Every override teaches the model — your tenant, your patterns.",
  },
  {
    num: "03",
    icon: Rocket,
    eyebrow: "Week 5",
    title: "Live in production.",
    body: "First workflow shipped, your operators using it for real. Founder-led support continues. Source code yours on cut-over.",
  },
];

export const HowItWorks: React.FC = () => {
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
              How it works
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
            Three steps.{" "}
            <span className="text-muted">Five weeks. Live.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px rounded-3xl overflow-hidden"
          style={{ background: "rgba(255,255,255,0.08)" }}
        >
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.num}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                className="group relative p-8 md:p-10 lg:p-12 flex flex-col min-h-[280px]"
                style={{
                  background:
                    "linear-gradient(180deg, hsl(0 0% 8%) 0%, hsl(0 0% 5%) 100%)",
                }}
              >
                {/* Big numeral */}
                <div
                  className="leading-none mb-6"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 800,
                    fontSize: "clamp(2.5rem, 4vw, 3.2rem)",
                    letterSpacing: "-0.04em",
                    color: ORANGE,
                  }}
                >
                  {s.num}
                </div>

                {/* Eyebrow + Icon */}
                <div className="flex items-center gap-2.5 mb-5">
                  <span
                    className="inline-flex items-center justify-center w-7 h-7 rounded-md"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.10)",
                    }}
                  >
                    <Icon
                      className="w-3.5 h-3.5 text-text-primary"
                      strokeWidth={1.7}
                    />
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.28em] font-bold text-muted">
                    {s.eyebrow}
                  </span>
                </div>

                {/* Title + Body */}
                <h3
                  className="text-text-primary mb-4"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 800,
                    fontSize: "clamp(1.2rem, 1.8vw, 1.5rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                  }}
                >
                  {s.title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
