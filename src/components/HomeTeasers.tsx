"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, Code2, Sparkles } from "lucide-react";

const cards = [
  {
    eyebrow: "Flagship product",
    title: "Vantage",
    body: "The AI-powered operational control platform for ERP-using mid-market. Catches every exception, approval, escalation and discrepancy the systems you already run leave uncontrolled.",
    href: "/vantage",
    cta: "Explore Vantage",
    icon: Brain,
  },
  {
    eyebrow: "Services practice",
    title: "Custom software, AI, automation",
    body: "When Vantage isn't the right fit, the same engineers build what you need. Fixed-price, senior team, South African rates. Delivered on .NET 8, React, Postgres, Azure.",
    href: "/services",
    cta: "See services",
    icon: Code2,
  },
  {
    eyebrow: "Launch cohort",
    title: "First 5 pilot clients · 40% off",
    body: "Five pilot slots, hand-picked. 40% off setup, free founder-led support for the life of the pilot, and no per-user monthly fees. One fair trade, month-to-month after go-live.",
    href: "/pilot",
    cta: "Claim a pilot slot",
    icon: Sparkles,
  },
];

export const HomeTeasers: React.FC = () => {
  return (
    <section
      className="relative w-full py-24 sm:py-32"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
            style={{
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="h-px w-8"
              style={{ background: "var(--accent-2)" }}
            />
            <span>What we do</span>
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            One product. One services practice.{" "}
            <span style={{ color: "var(--accent-2)" }}>
              Built by the same team.
            </span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
              >
                <Link
                  href={c.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-all duration-300 themed-rounded"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--card-bg)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "var(--accent-glow)" }}
                  />
                  <div
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border themed-rounded"
                    style={{
                      borderColor: "var(--card-border)",
                      background: "var(--bg-elev)",
                      color: "var(--accent-2)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div
                    className="mt-6 text-[11px] uppercase tracking-[0.2em]"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {c.eyebrow}
                  </div>
                  <h3
                    className="mt-2 text-xl font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--fg)",
                    }}
                  >
                    {c.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {c.body}
                  </p>

                  <div
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
                    style={{
                      color: "var(--accent-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {c.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
