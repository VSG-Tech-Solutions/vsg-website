"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";

/**
 * CustomerProof — combined quote + hard metrics from a real customer.
 *
 * Replaces the standalone PullQuoteFrame on the homepage. Instead of a
 * quote floating in empty space, it's wrapped in a substantial proof
 * panel with:
 *   • Big quote on the left (kept as the primary visual)
 *   • Customer attribution + sector label
 *   • A row of 4 hard metrics from the actual case (right side desktop,
 *     below quote on mobile)
 *   • CTA to the full case study
 *
 * The metrics are the difference — they turn a soft-feeling testimonial
 * into a fact sheet. Each is one number + one label, kept tight.
 */

const ease = [0.16, 1, 0.3, 1] as const;

type Metric = {
  value: string;
  label: string;
  detail?: string;
};

type CustomerProofProps = {
  eyebrow?: string;
  /** Short "what we built" line — anchors the case study to the work. */
  summary?: string;
  quote: string;
  attribution: {
    name: string;
    role: string;
    company: string;
    location?: string;
    sector?: string;
  };
  metrics: Metric[];
  href?: string;
  ctaLabel?: string;
};

export const CustomerProof: React.FC<CustomerProofProps> = ({
  eyebrow = "Proof · Case study",
  summary,
  quote,
  attribution,
  metrics,
  href,
  ctaLabel = "Read the full case study",
}) => {
  return (
    <section className="relative w-full" style={{ background: "var(--bg)" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-36">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
          className="relative overflow-hidden rounded-3xl"
          style={{
            background:
              "linear-gradient(180deg, #131316 0%, #0B0B0D 100%)",
            border: "1px solid rgba(255, 255, 255, 0.07)",
            boxShadow:
              "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 40px 100px -30px rgba(0, 0, 0, 0.7)",
          }}
        >
          {/* Subtle ambient corner glow — quietest possible warm note,
              echoes the Vantage card without breaking the matte feel. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(244,168,114,0.06) 0%, rgba(244,168,114,0) 70%)",
            }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 p-8 sm:p-12 lg:p-16">
            {/* LEFT — quote + attribution */}
            <div className="lg:col-span-7">
              <div
                className="text-[11px] uppercase tracking-[0.32em] font-semibold flex items-center gap-3"
                style={{
                  color: "var(--accent)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span
                  className="inline-block w-8 h-px"
                  style={{ background: "var(--accent)" }}
                />
                {eyebrow}
              </div>

              {/* What we built — anchors the quote to the actual work */}
              {summary && (
                <div
                  className="mt-7 text-[15px] sm:text-base font-medium"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  {summary}
                </div>
              )}

              {/* Quote mark */}
              <Quote
                className={`${summary ? "mt-5" : "mt-7"} w-8 h-8`}
                strokeWidth={1.4}
                style={{ color: "rgba(244, 168, 114, 0.5)" }}
              />

              <blockquote
                className="mt-5 font-extrabold"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.02em",
                  fontSize: "clamp(1.75rem, 3.4vw, 2.8rem)",
                  lineHeight: 1.12,
                  color: "var(--fg)",
                }}
              >
                &ldquo;{quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div
                className="mt-8 pt-6 border-t flex flex-wrap items-baseline gap-x-3 gap-y-1"
                style={{ borderColor: "rgba(255, 255, 255, 0.07)" }}
              >
                <span
                  className="text-[15px] font-semibold"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {attribution.name}
                </span>
                <span
                  className="text-[13px]"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  · {attribution.role}, {attribution.company}
                </span>
                {(attribution.location || attribution.sector) && (
                  <span
                    className="text-[11px] uppercase tracking-[0.22em] mt-1 sm:mt-0 sm:ml-1"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {[attribution.location, attribution.sector]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
              </div>

              {/* CTA */}
              {href && (
                <div className="mt-8">
                  <Link
                    href={href}
                    className="inline-flex items-center gap-2 text-[14px] font-semibold group"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span>{ctaLabel}</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                      strokeWidth={1.8}
                    />
                  </Link>
                </div>
              )}
            </div>

            {/* RIGHT — hard metrics in a 2x2 grid */}
            <div className="lg:col-span-5">
              <div
                className="grid grid-cols-2 gap-px rounded-2xl overflow-hidden"
                style={{ background: "rgba(255, 255, 255, 0.06)" }}
              >
                {metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-6 sm:p-8 flex flex-col justify-between min-h-[140px] sm:min-h-[170px]"
                    style={{
                      background:
                        "linear-gradient(180deg, #15151A 0%, #0E0E12 100%)",
                    }}
                  >
                    <div
                      className="font-extrabold leading-[0.95] break-words hyphens-none"
                      style={{
                        fontFamily: "var(--font-display)",
                        // Cap the upper-bound lower so long single-word values
                        // ("Custom", "Owned") don't overflow the cell.
                        fontSize: "clamp(1.75rem, 3.4vw, 2.5rem)",
                        letterSpacing: "-0.02em",
                        color: "var(--fg)",
                        wordBreak: "break-word",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {m.value}
                    </div>
                    <div className="mt-4">
                      <div
                        className="text-[11px] uppercase tracking-[0.22em] font-semibold"
                        style={{
                          color: "var(--accent)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        {m.label}
                      </div>
                      {m.detail && (
                        <div
                          className="text-[12px] mt-1"
                          style={{
                            color: "var(--muted)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {m.detail}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
