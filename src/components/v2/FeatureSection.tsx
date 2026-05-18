"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

/**
 * FeatureSection — alternating text+mockup block.
 *
 * Frame.io / Linear school: each scroll stop is a single product
 * feature — text on one side, polished product mockup on the other.
 * Pass `flipped` to alternate orientation.
 */

const ease = [0.16, 1, 0.3, 1] as const;

type Bullet = { title: string; body: string };

type Props = {
  eyebrow: string;
  icon: LucideIcon;
  title: string;
  /** Optional muted accent that closes the headline (renders below). */
  titleAccent?: string;
  body: string;
  bullets?: Bullet[];
  cta?: { label: string; href: string };
  /** The mockup component to render in the visual column. */
  mockup: ReactNode;
  /** Reverse layout — mockup left / text right. */
  flipped?: boolean;
  /** Section background tone. Default dark; pass "tinted" for slight off-canvas. */
  tone?: "dark" | "tinted";
  /** Optional decoration rendered behind the content (z-0). Useful for
   *  per-section background animations like DotPattern, etc. */
  decoration?: ReactNode;
};

export const FeatureSection: React.FC<Props> = ({
  eyebrow,
  icon: Icon,
  title,
  titleAccent,
  body,
  bullets = [],
  cta,
  mockup,
  flipped = false,
  tone = "dark",
  decoration,
}) => {
  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          tone === "tinted" ? "hsl(0 0% 5%)" : "hsl(var(--bg))",
      }}
    >
      {decoration}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
            flipped ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Content column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5 lg:[direction:ltr]"
          >
            {/* Eyebrow with icon */}
            <div className="flex items-center gap-2.5 mb-6">
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-md"
                style={{
                  background: "rgba(255,107,44,0.10)",
                  border: "1px solid rgba(255,107,44,0.28)",
                }}
              >
                <Icon
                  className="w-3.5 h-3.5"
                  style={{ color: "#FF6B2C" }}
                  strokeWidth={1.8}
                />
              </span>
              <span
                className="text-[10px] uppercase tracking-[0.32em] font-bold"
                style={{ color: "#FF6B2C" }}
              >
                {eyebrow}
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-text-primary"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 800,
                fontSize: "clamp(2.25rem, 4.6vw, 3.75rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.035em",
              }}
            >
              {title}
              {titleAccent && (
                <>
                  <br />
                  <span className="text-muted">{titleAccent}</span>
                </>
              )}
            </h2>

            {/* Body */}
            <p className="mt-7 text-base md:text-lg text-muted leading-relaxed max-w-xl">
              {body}
            </p>

            {/* Bullets */}
            {bullets.length > 0 && (
              <div
                className="mt-8 pt-7 border-t space-y-5"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {bullets.map((b) => (
                  <div key={b.title}>
                    <div className="text-[14px] font-bold text-text-primary mb-1">
                      {b.title}
                    </div>
                    <div className="text-[13px] text-muted leading-relaxed max-w-md">
                      {b.body}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA */}
            {cta && (
              <div className="mt-9">
                <Link
                  href={cta.href}
                  className="inline-flex items-center gap-2 text-sm font-bold transition-[gap] hover:gap-3"
                  style={{ color: "#FF6B2C" }}
                >
                  <span>{cta.label}</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2} />
                </Link>
              </div>
            )}
          </motion.div>

          {/* Mockup column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="lg:col-span-7 lg:[direction:ltr]"
          >
            {mockup}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
