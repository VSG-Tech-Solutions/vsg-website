"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Eyebrow";
import { DisplayHead } from "./DisplayHead";
import { iconRegistry, type IconName } from "./icon-registry";
import { TiltCard } from "../TiltCard";

/**
 * BentoModule — asymmetric grid of mixed-variant cards.
 *
 * Each card declares a variant ("dark" | "light" | "accent") and an
 * optional metric. The mix of dark / light / accent surfaces creates the
 * "premium magazine grid" feel where most of the page is matte black but
 * a few cards punch with light cream or warm-tone treatment for visual
 * rhythm — instead of a uniform wall of dark tiles.
 *
 * Variants:
 *   • dark   — etched matte gradient + 1px white rim-light. Default.
 *   • light  — cream/off-white surface, dark text. The "punch" card.
 *   • accent — warm dark amber/brown surface, white text. Adds a single
 *              note of colour without breaking the matte direction.
 *
 * Optional metric — small bright stat above the title (e.g. "Saves 4-8
 * hrs/buyer/week") — adds substance, makes each card feel like a fact
 * sheet rather than a marketing slot.
 *
 * Hover: liquid-steel sheen sweeps across (CSS class .liquid-steel-sweep
 * defined globally). TiltCard wrapper handles tilt + cursor sheen.
 */

export type BentoVariant = "dark" | "light" | "accent";

export type BentoCard = {
  icon: IconName;
  eyebrow?: string;
  title: string;
  body: string;
  /** Bright metric/stat above the title — adds substance per card. */
  metric?: string;
  /** Surface variant. Default "dark". Mix variants for rhythm. */
  variant?: BentoVariant;
  /** When true, card spans 2 columns on lg+. At most one per grid. */
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

/* ---------------- variant style maps ---------------- */

type VariantStyles = {
  bg: string;
  bgHover: string;
  fg: string;
  muted: string;
  mutedSubtle: string;
  border: string;
  iconBg: string;
  iconBorder: string;
  iconColor: string;
  metricColor: string;
  rimLight: string;
};

const VARIANTS: Record<BentoVariant, VariantStyles> = {
  dark: {
    bg: "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
    bgHover: "linear-gradient(180deg, #1C1C1F 0%, #131315 100%)",
    fg: "#F5F5F5",
    muted: "rgba(245, 245, 245, 0.65)",
    mutedSubtle: "rgba(245, 245, 245, 0.42)",
    border: "rgba(255, 255, 255, 0.07)",
    iconBg: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
    iconBorder: "rgba(255, 255, 255, 0.10)",
    iconColor: "rgba(255, 255, 255, 0.85)",
    metricColor: "#FFFFFF",
    rimLight:
      "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 1px 0 rgba(0, 0, 0, 0.4)",
  },
  light: {
    bg: "linear-gradient(180deg, #F5F1E8 0%, #ECE6D7 100%)",
    bgHover: "linear-gradient(180deg, #F8F4EE 0%, #EFE9DC 100%)",
    fg: "#1A1A1A",
    muted: "rgba(26, 26, 26, 0.72)",
    mutedSubtle: "rgba(26, 26, 26, 0.48)",
    border: "rgba(26, 26, 26, 0.10)",
    iconBg: "linear-gradient(180deg, rgba(26,26,26,0.06), rgba(26,26,26,0.02))",
    iconBorder: "rgba(26, 26, 26, 0.12)",
    iconColor: "#1A1A1A",
    metricColor: "#1A1A1A",
    rimLight:
      "inset 0 1px 0 rgba(255, 255, 255, 0.55), 0 1px 0 rgba(0, 0, 0, 0.06)",
  },
  accent: {
    // Warm dark amber — the M5-meets-Buttery-leather note. Sparingly used.
    bg: "linear-gradient(180deg, #2A1B12 0%, #1A0F08 100%)",
    bgHover: "linear-gradient(180deg, #321F14 0%, #1F1209 100%)",
    fg: "#FBE5C9",
    muted: "rgba(251, 229, 201, 0.78)",
    mutedSubtle: "rgba(251, 229, 201, 0.5)",
    border: "rgba(251, 229, 201, 0.12)",
    iconBg: "linear-gradient(180deg, rgba(251,229,201,0.08), rgba(251,229,201,0.02))",
    iconBorder: "rgba(251, 229, 201, 0.18)",
    iconColor: "var(--accent)",
    metricColor: "var(--accent)",
    rimLight:
      "inset 0 1px 0 rgba(251, 229, 201, 0.12), 0 1px 0 rgba(0, 0, 0, 0.5)",
  },
};

/* ---------------- component ---------------- */

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
        className="mt-12 grid gap-4 lg:grid-cols-3"
        onMouseLeave={() => setHoverIdx(null)}
      >
        {cards.map((card, i) => {
          const Icon = iconRegistry[card.icon];
          const isHover = hoverIdx === i;
          const variant: BentoVariant = card.variant ?? "dark";
          const v = VARIANTS[variant];

          const restBg = v.bg;
          const hoverBg = v.bgHover;
          const bg =
            prefersReduce || hoverIdx === null
              ? restBg
              : isHover
                ? hoverBg
                : restBg;

          const inner = (
            <motion.div
              animate={{ background: bg }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoverIdx(i)}
              className="relative h-full p-7 sm:p-9 group cursor-default rounded-2xl"
              style={{
                boxShadow: v.rimLight,
                border: `1px solid ${v.border}`,
                overflow: "hidden",
              }}
            >
              {/* Liquid-steel sweep on hover */}
              <span aria-hidden className="liquid-steel-sweep" />

              <div className="flex items-start justify-between">
                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                  style={{
                    background: v.iconBg,
                    border: `1px solid ${v.iconBorder}`,
                    boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.07)",
                  }}
                >
                  <Icon
                    className="w-4 h-4"
                    style={{ color: v.iconColor }}
                    strokeWidth={1.6}
                  />
                </div>
                {card.eyebrow && (
                  <span
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={{
                      color: v.mutedSubtle,
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {card.eyebrow}
                  </span>
                )}
              </div>

              {/* Metric — bright data point, sits above the title */}
              {card.metric && (
                <div
                  className="mt-6 text-[11px] uppercase tracking-[0.22em] font-semibold"
                  style={{
                    color: v.metricColor,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {card.metric}
                </div>
              )}

              <h3
                className={`${card.metric ? "mt-2" : "mt-6"} font-semibold leading-snug ${
                  card.featured
                    ? "text-xl sm:text-2xl"
                    : "text-lg sm:text-xl"
                }`}
                style={{
                  color: v.fg,
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
                  color: v.muted,
                  fontFamily: "var(--font-body)",
                }}
              >
                {card.body}
              </p>
            </motion.div>
          );

          // Wrap in TiltCard for mouse-tilt + cursor sheen on the surface.
          const tilted = (
            <TiltCard
              max={3}
              glow={variant === "dark" || variant === "accent"}
              className={card.featured ? "lg:col-span-2" : ""}
            >
              {inner}
            </TiltCard>
          );

          return card.href ? (
            <Link key={i} href={card.href} className="contents">
              {tilted}
            </Link>
          ) : (
            <div key={i} className="contents">
              {tilted}
            </div>
          );
        })}
      </div>
    </div>
  );
};
