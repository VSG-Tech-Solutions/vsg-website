"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

/**
 * ProductsBento — light cream tone break, type-led product cards.
 *
 * No photos. Each card is a clean editorial layout:
 *   • Top — status pill + corner arrow
 *   • Middle — huge product name (Inter 800)
 *   • Below — tagline as a generous paragraph
 *   • Capability hints — 3 bullets, restrained
 *   • Footer — integration tags + "Read more" link
 *
 * Verden / CargoWave-flavoured: lots of whitespace, type-only, calm.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const CAPABILITY_HINTS: Record<string, string[]> = {
  procurement: [
    "Drafts the next order with reasoning",
    "Ranks supplier quotes on landed cost",
    "Runs the RFQ in your inbox",
  ],
  receiving: [
    "Captures GRVs at the dock",
    "Runs the three-way match automatically",
    "Routes variances straight to AP",
  ],
};

const ROADMAP = [
  { name: "Approvals", note: "Plain-English rules across invoices & POs." },
  { name: "Compliance", note: "Vendor docs that don't expire on you." },
  { name: "Onboarding", note: "Customer + vendor onboarding, end-to-end." },
  { name: "Quality", note: "QC anomaly detection, inbound and out." },
];

export const ProductsBento: React.FC = () => {
  return (
    <section
      className="relative py-28 md:py-40"
      style={{ background: "#F2EEE6", color: "#15110B" }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header — generous, breathable */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <div className="flex items-center gap-3 mb-7">
            <span
              className="w-8 h-px"
              style={{ background: "rgba(21,17,11,0.30)" }}
            />
            <span
              className="text-[11px] uppercase tracking-[0.32em] font-bold"
              style={{ color: "#FF6B2C" }}
            >
              Products
            </span>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
              color: "#15110B",
            }}
          >
            Two products live.
            <br />
            <span style={{ color: "rgba(21,17,11,0.50)" }}>
              Built to ship today.
            </span>
          </h2>
          <p
            className="mt-7 max-w-xl text-base md:text-lg leading-relaxed"
            style={{ color: "rgba(21,17,11,0.68)" }}
          >
            Standalone AI products. Sold direct to operators and to ERP
            partners. No platform tax, no pilot dance, owned outright on
            cut-over.
          </p>
        </motion.div>

        {/* Two big tiles — type-led, no photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease, delay: i * 0.1 }}
              className="group"
            >
              <Link
                href={`/products/${product.slug}`}
                className="block rounded-3xl bg-white p-8 md:p-10 lg:p-12 transition-shadow duration-300 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.18)] h-full flex flex-col"
                style={{
                  border: "1px solid rgba(21,17,11,0.10)",
                  boxShadow: "0 12px 40px -20px rgba(0,0,0,0.08)",
                  minHeight: "560px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Top — status pill + corner arrow */}
                <div className="flex items-center justify-between mb-12">
                  <span
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-bold"
                    style={{
                      background: "rgba(255,107,44,0.10)",
                      border: "1px solid rgba(255,107,44,0.28)",
                      color: "#FF6B2C",
                    }}
                  >
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ background: "#FF6B2C" }}
                    />
                    Live · {product.status === "live" ? "Shipping today" : "Soon"}
                  </span>
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{
                      background: "rgba(21,17,11,0.04)",
                      border: "1px solid rgba(21,17,11,0.10)",
                    }}
                  >
                    <ArrowUpRight
                      className="w-4 h-4"
                      strokeWidth={1.8}
                      style={{ color: "#15110B" }}
                    />
                  </span>
                </div>

                {/* Big product name */}
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 800,
                    fontSize: "clamp(2.6rem, 5vw, 4rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.035em",
                    color: "#15110B",
                  }}
                >
                  {product.name}
                </h3>

                {/* Tagline — readable paragraph */}
                <p
                  className="mt-6 text-[16px] leading-relaxed"
                  style={{ color: "rgba(21,17,11,0.78)" }}
                >
                  {product.tagline}
                </p>

                {/* Capability hints — three short bullets */}
                <ul className="mt-8 space-y-2.5 flex-1">
                  {(CAPABILITY_HINTS[product.slug] ?? []).map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-3 text-[14px] leading-snug"
                      style={{ color: "rgba(21,17,11,0.74)" }}
                    >
                      <span
                        className="mt-2 w-1 h-1 rounded-full shrink-0"
                        style={{ background: "#FF6B2C" }}
                      />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                {/* Footer — integration tags + read more */}
                <div
                  className="mt-10 pt-7 border-t flex items-center justify-between flex-wrap gap-4"
                  style={{ borderColor: "rgba(21,17,11,0.10)" }}
                >
                  <div className="flex flex-wrap gap-1.5">
                    {product.integrations.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.18em] font-semibold"
                        style={{
                          color: "rgba(21,17,11,0.55)",
                          border: "1px solid rgba(21,17,11,0.12)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-[13px] font-bold inline-flex items-center gap-1.5"
                    style={{ color: "#FF6B2C" }}
                  >
                    Read more
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Roadmap strip — quieter, more open */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
          className="mt-16 md:mt-20 rounded-3xl p-8 md:p-10"
          style={{
            background: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(21,17,11,0.10)",
          }}
        >
          <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.28em] font-bold mb-3"
                style={{ color: "#FF6B2C" }}
              >
                Coming through 2026
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 800,
                  fontSize: "clamp(1.5rem, 2.8vw, 2.2rem)",
                  letterSpacing: "-0.025em",
                  color: "#15110B",
                }}
              >
                Four more products in design.
              </h3>
            </div>
            <Link
              href="mailto:stephan@vsgtech.co.za?subject=Early%20access"
              className="text-sm font-semibold inline-flex items-center gap-2 hover:gap-3 transition-[gap]"
              style={{ color: "#15110B" }}
            >
              <span>Ask about early access</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
            </Link>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px rounded-2xl overflow-hidden"
            style={{ background: "rgba(21,17,11,0.10)" }}
          >
            {ROADMAP.map((p) => (
              <div
                key={p.name}
                className="p-6 sm:p-7 flex flex-col gap-3 min-h-[140px] bg-white"
              >
                <h4
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    letterSpacing: "-0.02em",
                    color: "#15110B",
                  }}
                >
                  {p.name}
                </h4>
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ color: "rgba(21,17,11,0.62)" }}
                >
                  {p.note}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
