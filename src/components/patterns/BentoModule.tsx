"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Eyebrow";
import { DisplayHead } from "./DisplayHead";
import { iconRegistry, type IconName } from "./icon-registry";

/**
 * BentoModule — asymmetric grid of cards, one card spans 2 columns ("featured").
 *
 * Signature interaction: hovering a card causes a 2px ripple-out — siblings
 * push back fractionally so the focused card "rises" without scaling. Subtle.
 * Mercury / Arc territory.
 *
 * Icons accepted as strings (icon-registry name) to avoid passing function
 * references across the server→client component boundary.
 */

export type BentoCard = {
  icon: IconName;
  eyebrow?: string;
  title: string;
  body: string;
  /** When true, card spans 2 columns on lg+. Place at most one per grid. */
  featured?: boolean;
  /** Optional href — turns the card into a Link. */
  href?: string;
};

type BentoModuleProps = {
  eyebrow?: string;
  title: ReactNode;
  accent?: ReactNode;
  description?: ReactNode;
  cards: BentoCard[];
};

export const BentoModule: React.FC<BentoModuleProps> = ({
  eyebrow,
  title,
  accent,
  description,
  cards,
}) => {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const prefersReduce = useReducedMotion();

  return (
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

      <div
        className="mt-12 grid gap-px lg:grid-cols-3"
        style={{ background: "var(--card-border)" }}
        onMouseLeave={() => setHoverIdx(null)}
      >
        {cards.map((card, i) => {
          const Icon = iconRegistry[card.icon];
          const isHover = hoverIdx === i;
          const someoneElseHover = hoverIdx !== null && hoverIdx !== i;
          const offset =
            prefersReduce || hoverIdx === null
              ? { x: 0, y: 0 }
              : isHover
                ? { x: 0, y: -2 }
                : someoneElseHover
                  ? { x: 0, y: 1 }
                  : { x: 0, y: 0 };

          const inner = (
            <motion.div
              animate={offset}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoverIdx(i)}
              className={`relative h-full p-7 sm:p-9 group cursor-default ${
                card.featured ? "lg:col-span-2" : ""
              }`}
              style={{ background: "var(--bg)" }}
            >
              <div className="flex items-start justify-between">
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl border"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "rgba(255,255,255,0.02)",
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: "var(--accent-2)" }}
                    strokeWidth={1.6}
                  />
                </div>
                {card.eyebrow && (
                  <span
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {card.eyebrow}
                  </span>
                )}
              </div>

              <h3
                className={`mt-6 font-semibold leading-snug ${
                  card.featured
                    ? "text-xl sm:text-2xl"
                    : "text-lg sm:text-xl"
                }`}
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.015em",
                }}
              >
                {card.title}
              </h3>
              <p
                className={`mt-3 leading-relaxed ${
                  card.featured ? "text-base" : "text-sm sm:text-base"
                }`}
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {card.body}
              </p>
            </motion.div>
          );

          return card.href ? (
            <Link key={i} href={card.href} className="contents">
              {inner}
            </Link>
          ) : (
            <div key={i} className="contents">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
};
