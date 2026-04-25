"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Single editorial founder quote. No fake client testimonials — we add real
// customer quotes only once case studies publish with explicit attribution.

export const Testimonials: React.FC = () => {
  return (
    <section
      className="relative w-full py-32 overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-0 w-[600px] h-[600px] rounded-full blur-[140px]"
        style={{ background: "var(--accent-soft)" }}
      />

      <div className="relative mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs uppercase tracking-[0.2em] themed-rounded"
            style={{
              borderColor: "var(--ring)",
              background: "var(--accent-soft)",
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Why we built Vantage
          </div>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl border p-10 sm:p-14 themed-rounded"
          style={{
            borderColor: "var(--card-border)",
            background:
              "linear-gradient(to bottom right, var(--card-bg), transparent)",
            boxShadow: "0 20px 60px -20px var(--accent-glow)",
          }}
        >
          <Quote
            className="absolute top-8 left-8 w-10 h-10 opacity-40"
            style={{ color: "var(--accent)" }}
          />
          <div className="relative pt-8">
            <p
              className="text-xl sm:text-2xl lg:text-[1.6rem] leading-[1.4] tracking-tight"
              style={{
                color: "var(--fg)",
                fontFamily: "var(--font-display)",
              }}
            >
              We built Vantage because we watched South African mid-market
              companies — running Syspro, SAP and Sage — lose{" "}
              <span style={{ color: "var(--accent-2)" }}>
                15 to 25 working days a month
              </span>{" "}
              to invoice mismatches, stuck approvals, QC non-conformances and
              supplier onboarding chaos. Nothing on the market was solving it
              at SA pricing. Vantage is the operational control layer your ERP
              was never designed to be.
              <br />
              <br />
              But the software is only half of what we&apos;re building. The
              other half is a{" "}
              <span style={{ color: "var(--accent-2)" }}>
                real relationship with every business we work with
              </span>{" "}
              — pilots are partnerships, not transactions. We&apos;re building
              a community of South African operators who actually own their
              operational data, share what&apos;s working, and shape where
              Vantage goes next. If you&apos;re going to trust us with the
              control layer of your business, you should be on a first-name
              basis with the people building it.
            </p>
            <footer
              className="mt-10 pt-6 border-t flex items-center gap-4"
              style={{ borderColor: "var(--card-border)" }}
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm"
                style={{
                  background: "var(--accent-soft)",
                  color: "var(--accent-2)",
                  border: "1px solid var(--ring)",
                  fontFamily: "var(--font-display)",
                }}
              >
                SE
              </div>
              <div>
                <div
                  className="text-sm font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  Stephan Esterhuizen
                </div>
                <div
                  className="text-xs mt-0.5"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Founder & CEO · VSG Tech Solutions
                </div>
              </div>
            </footer>
          </div>
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 text-center text-sm"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          First pilot case study publishing Q2 2026 — a South African funeral
          insurance distributor running 900+ agents nationally.
        </motion.div>
      </div>
    </section>
  );
};
