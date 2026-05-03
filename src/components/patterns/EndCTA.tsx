"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingButton } from "../BookingButton";
import { Eyebrow } from "./Eyebrow";
import { DisplayHead } from "./DisplayHead";

/**
 * EndCTA — minimal type-only end-of-page CTA.
 *
 * No card, no border, no halo. Just an eyebrow → 2-line H2 → primary pill
 * CTA + secondary text link breathing on the canvas. Used as the last
 * section of every page.
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
  <div className="max-w-4xl">
    <Eyebrow variant="dot">{eyebrow}</Eyebrow>
    <div className="mt-6">
      <DisplayHead level="h2" accent={accent}>
        {title}
      </DisplayHead>
    </div>
    {body && (
      <p
        className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
        style={{
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        {body}
      </p>
    )}
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
      <a
        href={secondaryHref}
        className="text-sm font-semibold underline-offset-4 hover:underline"
        style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
      >
        {secondaryLabel}
      </a>
    </div>
  </div>
);
