"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { BookingButton } from "../BookingButton";

/**
 * EndCTA — type-led end-of-page block with a single warm-amber accent.
 *
 * Eyebrow → 2-line headline (line 2 in muted gray) → body → row of two
 * actions: primary white pill + a framed email-pill secondary (so it
 * reads as a clickable target, not orphan text).
 *
 * Subtle ambient amber wash in the background — matches the warm note
 * used on the Vantage card and the CustomerProof corner glow, ties the
 * brand together without breaking the matte direction.
 */

type EndCTAProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  body?: string;
  /** Primary CTA — opens the BookingButton (Calendly) by default. Pass
   *  `primaryHref` to render as a regular link instead. */
  primaryLabel?: string;
  primaryHref?: string;
  /** Secondary line, usually mailto. */
  secondaryLabel?: string;
  secondaryHref?: string;
};

export const EndCTA: React.FC<EndCTAProps> = ({
  eyebrow = "Talk to a founder",
  title,
  accent,
  body,
  primaryLabel = "Book a 20-minute demo",
  primaryHref,
  secondaryLabel = "stephan@vsgtech.co.za",
  secondaryHref = "mailto:stephan@vsgtech.co.za",
}) => (
  <div className="relative">
    {/* Subtle warm ambient wash — single colour note matching Vantage card */}
    <div
      aria-hidden
      className="pointer-events-none absolute -top-32 -left-32 w-[640px] h-[640px] rounded-full blur-3xl"
      style={{
        background:
          "radial-gradient(circle, rgba(244,168,114,0.06) 0%, rgba(244,168,114,0) 70%)",
      }}
    />

    <div className="relative max-w-4xl">
      {/* Eyebrow with hairline rule + amber dot */}
      <div
        className="text-[11px] uppercase tracking-[0.32em] font-semibold flex items-center gap-3"
        style={{
          color: "var(--accent)",
          fontFamily: "var(--font-body)",
        }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: "var(--accent)" }}
        />
        <span
          className="inline-block w-8 h-px"
          style={{ background: "var(--accent)" }}
        />
        {eyebrow}
      </div>

      {/* Headline — 2-line treatment with accent on second line */}
      <h2
        className="mt-7 font-extrabold"
        style={{
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
          fontSize: "clamp(2.4rem, 6vw, 5.2rem)",
          lineHeight: 0.95,
          color: "var(--fg)",
        }}
      >
        {title}
        {accent && (
          <>
            {" "}
            <span style={{ color: "var(--accent)" }}>{accent}</span>
          </>
        )}
      </h2>

      {body && (
        <p
          className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {body}
        </p>
      )}

      {/* Action row — primary white pill + framed email pill */}
      <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {primaryHref ? (
          <Link href={primaryHref} className="pill-cta group">
            <span>{primaryLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <BookingButton className="pill-cta group">
            <span>{primaryLabel}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </BookingButton>
        )}

        {/* Email — now a properly framed pill, not orphan text */}
        <a
          href={secondaryHref}
          className="group inline-flex items-center gap-3 px-5 py-3 rounded-full transition-all duration-200"
          style={{
            background: "rgba(244, 168, 114, 0.06)",
            border: "1px solid var(--card-border-accent)",
            color: "var(--accent)",
            fontFamily: "var(--font-body)",
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "-0.005em",
          }}
        >
          <Mail className="w-4 h-4" strokeWidth={1.6} />
          <span>{secondaryLabel}</span>
        </a>
      </div>
    </div>
  </div>
);
