"use client";

import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";
import { DisplayHead } from "./DisplayHead";

/**
 * NumberedSequence — vertical numbered steps with editorial weight.
 *
 * Each step: massive display-tight number on the left, title + body on the
 * right. Hairline dividers between. Used for pilot phases / engagement
 * model / "how it works" sequences.
 */

type NumberedSequenceItem = {
  title: string;
  body: ReactNode;
  /** Optional small kicker (e.g. "Week 1"). */
  kicker?: string;
};

type NumberedSequenceProps = {
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  description?: ReactNode;
  items: NumberedSequenceItem[];
  /** Number-format function. Default zero-padded "01", "02"… */
  formatNumber?: (i: number) => string;
};

const defaultFormat = (i: number) => String(i + 1).padStart(2, "0");

export const NumberedSequence: React.FC<NumberedSequenceProps> = ({
  eyebrow,
  title,
  accent,
  description,
  items,
  formatNumber = defaultFormat,
}) => (
  <div>
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <div className={eyebrow ? "mt-6" : ""}>
        <DisplayHead level="h2" accent={accent}>
          {title}
        </DisplayHead>
      </div>
      {description && (
        <p
          className="mt-6 text-base sm:text-lg leading-relaxed"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {description}
        </p>
      )}
    </div>

    <ol className="mt-14 space-y-0">
      {items.map((it, i) => (
        <li
          key={i}
          className={`grid grid-cols-[5rem_1fr] sm:grid-cols-[8rem_1fr] gap-6 sm:gap-12 py-10 sm:py-14 ${
            i === 0 ? "" : "border-t"
          }`}
          style={{
            borderColor: i === 0 ? undefined : "var(--card-border)",
          }}
        >
          <div
            className="font-extrabold tabular-nums leading-none"
            style={{
              color: "var(--accent-2)",
              opacity: 0.6,
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.03em",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            }}
          >
            {formatNumber(i)}
          </div>
          <div className="pt-1">
            {it.kicker && (
              <div
                className="text-[11px] uppercase tracking-[0.22em] mb-2"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {it.kicker}
              </div>
            )}
            <h3
              className="text-xl sm:text-2xl font-semibold leading-snug"
              style={{
                color: "var(--fg)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.015em",
              }}
            >
              {it.title}
            </h3>
            <div
              className="mt-3 text-base leading-relaxed max-w-2xl"
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
    </ol>
  </div>
);
