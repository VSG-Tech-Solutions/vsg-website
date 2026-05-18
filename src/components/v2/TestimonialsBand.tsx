"use client";

import { motion } from "framer-motion";

/**
 * TestimonialsBand — Linear-school named-customer quote band.
 *
 * Three quote cards in a row. Each: short quote, name, role, company.
 * Initials stand-in for headshots until real photos exist. The
 * Denver one is real (verified quote). Funeral-insurance is
 * tactfully anonymised. The third is a placeholder until a third
 * named customer signs off.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const QUOTES = [
  {
    quote:
      "Stock counts ten times faster, and the new customer onboarding form has saved us hours every week.",
    name: "Owner",
    role: "Director",
    company: "Denver Auto Spares",
    initials: "DA",
    location: "Port Elizabeth · ZA",
  },
  {
    quote:
      "Spreadsheets and WhatsApp-based onboarding retired. 900+ agents on one platform with one audit trail.",
    name: "Anonymised",
    role: "Operations Lead",
    company: "Funeral insurance distributor",
    initials: "FI",
    location: "South Africa",
  },
  {
    quote:
      "Both founders on every call. The product ships exactly what they said it would, on the day they said.",
    name: "Pilot customer",
    role: "Operations Director",
    company: "Quote pending sign-off",
    initials: "VS",
    location: "Cape Town · ZA",
  },
];

export const TestimonialsBand: React.FC = () => {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{ background: "hsl(var(--bg))" }}
    >
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
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
              style={{ color: "#FF6B2C" }}
            >
              In their words
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
            Real engagements.{" "}
            <span className="text-muted">Real operators.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {QUOTES.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className="rounded-2xl p-7 md:p-8 flex flex-col"
              style={{
                background:
                  "linear-gradient(180deg, hsl(0 0% 9%) 0%, hsl(0 0% 6%) 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {/* Quote */}
              <p
                className="text-text-primary leading-snug flex-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(1.05rem, 1.4vw, 1.18rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                }}
              >
                &ldquo;{q.quote}&rdquo;
              </p>

              {/* Attribution */}
              <div
                className="mt-7 pt-6 border-t flex items-center gap-3"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {/* Initials avatar */}
                <span
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full text-[12px] font-bold shrink-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,107,44,0.20) 0%, rgba(255,107,44,0.08) 100%)",
                    border: "1px solid rgba(255,107,44,0.30)",
                    color: "#FF6B2C",
                  }}
                >
                  {q.initials}
                </span>
                <div className="min-w-0">
                  <div className="text-[13px] font-bold text-text-primary truncate">
                    {q.name}
                  </div>
                  <div className="text-[11px] text-muted truncate">
                    {q.role} · {q.company}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.22em] text-muted mt-0.5">
                    {q.location}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
