"use client";

import { motion } from "framer-motion";

/**
 * IntegrationStrip — "plays nicely with" tech logo wall.
 *
 * Lifts the Stripe/Supabase pattern of a logo strip directly under the
 * hero. We don't have customer logo rights yet (and never plan to fake
 * any) — this strip lists the systems we INTEGRATE WITH, which is
 * honest, on-message ("we run alongside your stack") and gives the
 * page-after-hero rest moment that B2B SaaS sites use to break the
 * dense type rhythm.
 *
 * Each logo is rendered as a typographic monogram in a hairline pill
 * for now — keeps the file count low, avoids licensing issues, looks
 * cohesive with the rest of the editorial direction. Swap to real SVG
 * logos when each vendor's brand assets are downloaded under their
 * usage terms.
 */

const ease = [0.16, 1, 0.3, 1] as const;

const LOGOS: { name: string; mono: string; subtitle: string }[] = [
  { name: "Syspro", mono: "Syspro", subtitle: "ERP" },
  { name: "SAP", mono: "SAP", subtitle: "ERP" },
  { name: "Sage", mono: "Sage", subtitle: "ERP" },
  { name: "NetSuite", mono: "NetSuite", subtitle: "ERP" },
  { name: "Microsoft 365", mono: "M365", subtitle: "Suite" },
  { name: "Google Workspace", mono: "Workspace", subtitle: "Suite" },
  { name: "OpenAI", mono: "OpenAI", subtitle: "AI" },
  { name: "Anthropic", mono: "Anthropic", subtitle: "AI" },
];

export const IntegrationStrip: React.FC = () => {
  return (
    <section
      className="relative w-full"
      style={{ background: "var(--bg)" }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Eyebrow */}
        <div className="flex items-center justify-center mb-10">
          <div
            className="text-[11px] uppercase tracking-[0.32em] font-semibold flex items-center gap-3"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="inline-block w-8 h-px"
              style={{ background: "var(--muted-2)" }}
            />
            Plays nicely with the systems your team already uses
            <span
              className="inline-block w-8 h-px"
              style={{ background: "var(--muted-2)" }}
            />
          </div>
        </div>

        {/* Logo grid — wraps freely on small viewports, single line on lg+ */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-px"
          style={{ background: "var(--card-border)" }}
        >
          {LOGOS.map((logo, i) => (
            <div
              key={logo.name}
              className="relative px-4 py-7 flex flex-col items-center justify-center gap-1 transition-colors duration-300 hover:bg-white/[0.02]"
              style={{ background: "var(--bg)" }}
            >
              <div
                className="font-bold text-center"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)",
                  letterSpacing: "-0.01em",
                  opacity: 0.78,
                }}
              >
                {logo.mono}
              </div>
              <div
                className="text-[9px] uppercase tracking-[0.22em] font-semibold"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {logo.subtitle}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Footnote — keeps it honest */}
        <div
          className="mt-7 text-center text-[12px] leading-relaxed max-w-2xl mx-auto"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          Vantage runs <em>alongside</em> your ERP — never replaces it.
          Custom builds slot into whichever stack your team already
          operates.
        </div>
      </div>
    </section>
  );
};
