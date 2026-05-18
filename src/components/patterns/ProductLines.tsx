"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Layers, Wrench, Lock } from "lucide-react";
import { TiltCard } from "../TiltCard";

/**
 * ProductLines — the homepage's two-card "what VSG does" section.
 *
 * Two big product cards side by side:
 *   1. Vantage (flagship SaaS) — dark matte card with warm-amber accent
 *   2. Bespoke AI (custom services) — light cream card, dark text
 *
 * Plus a placeholder third slot below for the eventual third product
 * (CRM or whatever lands next). It's intentionally rendered as "coming
 * soon" so visitors register that VSG is multi-product, even before the
 * third product ships.
 *
 * Each product card is structured like a mini landing-page tile:
 *   eyebrow → title → sub → bullets → metric strip → CTA
 *
 * Designed to be the answer to "what does VSG actually do?" in 8 seconds.
 */

const ease = [0.16, 1, 0.3, 1] as const;

type Bullet = { label: string; sub?: string };

type ProductCardProps = {
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  bullets: Bullet[];
  metric: string;
  href: string;
  ctaLabel: string;
  variant: "dark" | "light";
};

const ProductCard: React.FC<ProductCardProps> = ({
  eyebrow,
  title,
  tagline,
  description,
  bullets,
  metric,
  href,
  ctaLabel,
  variant,
}) => {
  const dark = variant === "dark";

  // Style maps per variant — matches the BentoModule treatment but at
  // bigger scale.
  const styles = dark
    ? {
        bg: "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
        fg: "#F5F5F5",
        muted: "rgba(245, 245, 245, 0.7)",
        mutedSubtle: "rgba(245, 245, 245, 0.42)",
        border: "rgba(255, 255, 255, 0.08)",
        rule: "rgba(255, 255, 255, 0.08)",
        accentEyebrow: "var(--accent)", // warm amber — the single colour note
        bulletDot: "var(--accent)",
        metricBg:
          "linear-gradient(180deg, rgba(244,168,114,0.10), rgba(244,168,114,0.02))",
        metricBorder: "var(--card-border-accent)",
        metricColor: "var(--accent)",
        rimLight:
          "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.7)",
      }
    : {
        bg: "linear-gradient(180deg, #F5F1E8 0%, #ECE6D7 100%)",
        fg: "#1A1A1A",
        muted: "rgba(26, 26, 26, 0.74)",
        mutedSubtle: "rgba(26, 26, 26, 0.48)",
        border: "rgba(26, 26, 26, 0.10)",
        rule: "rgba(26, 26, 26, 0.10)",
        accentEyebrow: "#1A1A1A",
        bulletDot: "rgba(26, 26, 26, 0.65)",
        metricBg:
          "linear-gradient(180deg, rgba(26,26,26,0.05), rgba(26,26,26,0.01))",
        metricBorder: "rgba(26, 26, 26, 0.12)",
        metricColor: "#1A1A1A",
        rimLight:
          "inset 0 1px 0 rgba(255, 255, 255, 0.6), 0 30px 80px -30px rgba(0, 0, 0, 0.4)",
      };

  return (
    <TiltCard max={2.5} glow={dark} className="block h-full">
      <Link
        href={href}
        className="block h-full no-underline"
        style={{ color: styles.fg }}
      >
        <div
          className="relative h-full p-8 sm:p-10 lg:p-12 rounded-3xl flex flex-col overflow-hidden group"
          style={{
            background: styles.bg,
            border: `1px solid ${styles.border}`,
            boxShadow: styles.rimLight,
          }}
        >
          {/* Liquid-steel sweep on hover */}
          <span aria-hidden className="liquid-steel-sweep" />

          {/* Eyebrow */}
          <div
            className="text-[11px] uppercase tracking-[0.32em] font-semibold"
            style={{
              color: styles.accentEyebrow,
              fontFamily: "var(--font-body)",
            }}
          >
            {eyebrow}
          </div>

          {/* Title */}
          <h3
            className="mt-5 font-extrabold"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
              fontSize: "clamp(2.25rem, 4vw, 3.5rem)",
              lineHeight: 0.98,
              color: styles.fg,
            }}
          >
            {title}
          </h3>

          {/* Tagline */}
          <div
            className="mt-3 text-base sm:text-lg font-medium"
            style={{
              color: styles.muted,
              fontFamily: "var(--font-body)",
            }}
          >
            {tagline}
          </div>

          {/* Description */}
          <p
            className="mt-6 text-[15px] sm:text-base leading-relaxed max-w-[520px]"
            style={{
              color: styles.muted,
              fontFamily: "var(--font-body)",
            }}
          >
            {description}
          </p>

          {/* Bullets */}
          <ul
            className="mt-8 space-y-3 border-t pt-7"
            style={{ borderColor: styles.rule }}
          >
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: styles.bulletDot }}
                />
                <div className="flex-1">
                  <div
                    className="text-[14px] sm:text-[15px] font-semibold leading-snug"
                    style={{
                      color: styles.fg,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {b.label}
                  </div>
                  {b.sub && (
                    <div
                      className="text-[13px] mt-0.5"
                      style={{ color: styles.mutedSubtle }}
                    >
                      {b.sub}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Spacer pushes metric + CTA to the bottom */}
          <div className="flex-1" />

          {/* Metric strip */}
          <div
            className="mt-10 inline-flex items-center self-start gap-2 px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.22em] font-semibold"
            style={{
              background: styles.metricBg,
              border: `1px solid ${styles.metricBorder}`,
              color: styles.metricColor,
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: styles.metricColor }}
            />
            {metric}
          </div>

          {/* CTA row */}
          <div
            className="mt-7 flex items-center justify-between border-t pt-6 transition-colors duration-300"
            style={{ borderColor: styles.rule }}
          >
            <span
              className="text-[15px] font-semibold tracking-tight"
              style={{
                color: styles.fg,
                fontFamily: "var(--font-body)",
              }}
            >
              {ctaLabel}
            </span>
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-300 group-hover:translate-x-1"
              style={{
                background: dark
                  ? "var(--accent-soft)"
                  : "rgba(26, 26, 26, 0.06)",
                border: `1px solid ${styles.metricBorder}`,
                color: styles.fg,
              }}
            >
              <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
};

/* ---------------- coming-soon placeholder ---------------- */

const ComingSoonCard: React.FC = () => {
  return (
    <div
      className="relative rounded-3xl p-8 sm:p-10 flex items-center gap-5 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, var(--bg-elev) 0%, var(--bg) 100%)",
        border: "1px dashed rgba(255, 255, 255, 0.10)",
        boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.04)",
      }}
    >
      <div
        className="inline-flex items-center justify-center w-12 h-12 rounded-xl shrink-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Lock
          className="w-5 h-5"
          style={{ color: "rgba(255, 255, 255, 0.45)" }}
          strokeWidth={1.4}
        />
      </div>

      <div className="flex-1">
        <div
          className="text-[10px] uppercase tracking-[0.32em] font-semibold"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          Third product · in planning
        </div>
        <div
          className="mt-1.5 text-[15px] sm:text-base font-medium"
          style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
        >
          We're scoping the next product line. Drop a note if you want a heads-up
          when it ships.
        </div>
      </div>

      <Link
        href="/contact"
        className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors duration-200"
        style={{
          color: "var(--fg)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          fontFamily: "var(--font-body)",
        }}
      >
        Get notified
      </Link>
    </div>
  );
};

/* ---------------- main section ---------------- */

export const ProductLines: React.FC = () => {
  return (
    <section
      className="relative w-full"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
        {/* Section header */}
        <div className="max-w-3xl">
          <div
            className="text-[11px] uppercase tracking-[0.32em] font-semibold"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            What VSG builds
          </div>
          <h2
            className="mt-5 font-extrabold"
            style={{
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
              fontSize: "clamp(2.25rem, 5.2vw, 4.4rem)",
              lineHeight: 0.95,
              color: "var(--fg)",
            }}
          >
            Two product lines.
            <br />
            <span style={{ color: "var(--muted)" }}>
              Both for the same buyer.
            </span>
          </h2>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Vantage is our flagship SaaS — operational AI for ERP. Bespoke is
            the custom arm — when you need something off-the-shelf doesn't
            cover. Same team behind both. Same standard.
          </p>
        </div>

        {/* Two big cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6 items-stretch"
        >
          <ProductCard
            variant="dark"
            eyebrow="Flagship SaaS"
            title="Vantage"
            tagline="The operational layer for everything around the ERP transaction."
            description="Module-specific AI trained on your data. Approvals, procurement, supplier exceptions, compliance, customer requests — orchestrated, audited, and live in five weeks."
            bullets={[
              {
                label: "Procurement + Receiving live today",
                sub: "More modules in active design — Approvals, Compliance, Onboarding, Quality",
              },
              {
                label: "Module-specific AI, not a generic chatbot",
                sub: "Each module trained on its own workflow + your historical data",
              },
              {
                label: "First workflow live in five weeks",
                sub: "Fixed-scope pilot, fixed-price, on production data",
              },
              {
                label: "Plain-English routing rules, full audit trail",
                sub: "No black-box decisions, every override logged",
              },
            ]}
            metric="Live in 5 weeks · Pilot from R30K/mo"
            href="/vantage"
            ctaLabel="See Vantage"
          />
          <ProductCard
            variant="light"
            eyebrow="Bespoke services"
            title="Custom AI"
            tagline="When off-the-shelf doesn't fit, we build it."
            description="Custom AI agents, workflow automation, and bespoke software — scoped, fixed-price, delivered by the same team behind Vantage. Two founders on every project."
            bullets={[
              {
                label: "Custom AI agents trained on your processes",
                sub: "Built for one workflow on your data — not a generic chatbot stretched thin",
              },
              {
                label: "Workflow automation across your existing systems",
                sub: "We connect the systems that don't talk to each other",
              },
              {
                label: "Custom software builds",
                sub: "Inventory systems, internal tools, dashboards, ops platforms",
              },
              {
                label: "Founder-led, direct to who builds",
                sub: "No sales rep, no qualification script, no offshore relay",
              },
            ]}
            metric="Fixed-scope · Fixed-price · 4–8 weeks"
            href="/services"
            ctaLabel="See services"
          />
        </motion.div>

        {/* Coming-soon third slot */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="mt-5 lg:mt-6"
        >
          <ComingSoonCard />
        </motion.div>
      </div>
    </section>
  );
};
