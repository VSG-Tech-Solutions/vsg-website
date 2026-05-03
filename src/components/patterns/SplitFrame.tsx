"use client";

import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { DisplayHead } from "./DisplayHead";

/**
 * SplitFrame — sticky-left, scrolling-right pattern.
 *
 * Left column sticks at the top of viewport while the right column's items
 * scroll past it. The lockup of "this is the section's claim" + "here are
 * the supporting points" reads like an editorial spread. Used everywhere a
 * single section needs to expand on a single H2.
 *
 * Items are passed in directly; each renders with a consistent hairline
 * divider, a tight H3, and a 2-line description.
 */

type SplitFrameItem = {
  /** Optional small label (e.g. "01" or "Procurement"). */
  label?: string;
  /** Item heading. */
  title: string;
  /** Item body (string or JSX). */
  body: ReactNode;
};

type SplitFrameProps = {
  eyebrow?: string;
  title: ReactNode;
  /** Phrase rendered in --accent-2 after the main title. */
  accent?: ReactNode;
  /** Optional kicker paragraph under the title. */
  description?: ReactNode;
  items: SplitFrameItem[];
};

export const SplitFrame: React.FC<SplitFrameProps> = ({
  eyebrow,
  title,
  accent,
  description,
  items,
}) => (
  <div className="grid lg:grid-cols-[5fr_7fr] gap-12 lg:gap-20">
    <div className="lg:sticky lg:top-32 lg:self-start">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div className={eyebrow ? "mt-6" : ""}>
        <DisplayHead level="h2" accent={accent}>
          {title}
        </DisplayHead>
      </div>
      {description && (
        <p
          className="mt-6 text-base sm:text-lg leading-relaxed max-w-md"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {description}
        </p>
      )}
    </div>

    <ul className="space-y-0">
      {items.map((it, i) => (
        <li
          key={i}
          className={`grid grid-cols-[auto_1fr] gap-x-6 sm:gap-x-10 py-7 sm:py-9 ${
            i === 0 ? "" : "border-t"
          }`}
          style={{
            borderColor: i === 0 ? undefined : "var(--card-border)",
          }}
        >
          {it.label ? (
            <span
              className="text-[11px] uppercase tracking-[0.2em] pt-1.5 min-w-[3rem]"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              {it.label}
            </span>
          ) : (
            <span aria-hidden className="min-w-[1.5rem]" />
          )}
          <div>
            <h3
              className="text-lg sm:text-xl font-semibold leading-snug"
              style={{
                color: "var(--fg)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.01em",
              }}
            >
              {it.title}
            </h3>
            <div
              className="mt-2 text-sm sm:text-base leading-relaxed"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              {it.body}
            </div>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
