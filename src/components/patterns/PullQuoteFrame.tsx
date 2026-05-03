"use client";

import { Quote } from "lucide-react";

/**
 * PullQuoteFrame — single editorial sentence on the canvas.
 *
 * No card, no background, no border — just oversized display-tight type
 * holding the page on its own. The accent moment is one cyan colon-marker
 * on the leading quote glyph; everything else is fg/muted.
 */

type PullQuoteFrameProps = {
  text: string;
  attribution: string;
  /** Optional cite link (e.g. /case-studies/denver-auto-spares). */
  cite?: string;
  citeLabel?: string;
};

import Link from "next/link";

export const PullQuoteFrame: React.FC<PullQuoteFrameProps> = ({
  text,
  attribution,
  cite,
  citeLabel,
}) => (
  <figure className="max-w-4xl">
    <Quote
      aria-hidden
      className="w-8 h-8 sm:w-10 sm:h-10"
      strokeWidth={1.5}
      style={{ color: "var(--accent-2)" }}
    />
    <blockquote
      className="mt-8 font-extrabold leading-[1.08]"
      style={{
        color: "var(--fg)",
        fontFamily: "var(--font-display)",
        letterSpacing: "-0.025em",
        fontSize: "clamp(1.75rem, 4.5vw, 3rem)",
      }}
    >
      &ldquo;{text}&rdquo;
    </blockquote>
    <figcaption
      className="mt-8 text-sm sm:text-base"
      style={{
        color: "var(--muted)",
        fontFamily: "var(--font-body)",
      }}
    >
      — {attribution}
      {cite && (
        <>
          {" · "}
          <Link
            href={cite}
            className="font-semibold underline-offset-4 hover:underline"
            style={{ color: "var(--accent-2)" }}
          >
            {citeLabel ?? "Read the case study"}
          </Link>
        </>
      )}
    </figcaption>
  </figure>
);
