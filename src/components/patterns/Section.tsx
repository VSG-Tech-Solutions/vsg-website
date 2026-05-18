"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Section — site-wide vertical rhythm primitive.
 *
 * Every page is a stack of <Section> wrappers. Consistent vertical breath
 * (py-32 mobile → py-48 desktop), max-w-6xl content column with 6/8/10 gutter.
 *
 * `tone` lets us break the dark-canvas monotony with periodic light-tone
 * sections (Apple / Stripe / Linear pattern). When tone="light", the
 * section's local CSS variables flip to a light palette and any cards
 * inside automatically pick up dark surfaces — so cards on a light
 * section read as inverse dark cards (the editorial pattern from the
 * reference screenshots).
 */

type SectionTone = "dark" | "light" | "tinted";

type SectionProps = {
  children: ReactNode;
  /** Hairline top border. Default OFF — sections flow smoothly into each
   *  other on the matte page. Opt-in only when a section genuinely needs
   *  a hard separator. */
  divider?: boolean;
  /** Tighter rhythm — useful for hero or compact subpages. */
  compact?: boolean;
  /** Even more breath — for end-of-page or marquee sections. */
  spacious?: boolean;
  /** Override max width. Default 6xl. Use "full" for edge-to-edge marquees. */
  width?: "6xl" | "5xl" | "4xl" | "full";
  /** ID for in-page anchors. */
  id?: string;
  /** Extra Tailwind classes on the inner container. */
  className?: string;
  /** Reveal on scroll-into-view. Default true. */
  reveal?: boolean;
  /**
   * Section tone:
   *   "dark"   (default) — canvas matches the active theme
   *   "light"  — flips to a cream/light surface, cards inside become dark
   *   "tinted" — slight off-canvas tint to break monotony without inverting
   */
  tone?: SectionTone;
};

const widthMap = {
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  full: "max-w-none",
};

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Tone variable maps. The light tone overrides the local CSS variables so
 * every child component reading var(--bg) / var(--fg) / var(--card-bg)
 * etc. gets the inverse colours automatically.
 *
 * Light tone = cream paper canvas + dark cards (the reference pattern).
 */
const toneVars: Record<SectionTone, CSSProperties> = {
  dark: {},
  light: {
    // Soft warm-paper canvas (not bright white) — warmer, easier on the eye,
    // sits comfortably between the dark sections without flashing.
    "--bg": "#EBE3D2",
    "--bg-elev": "#F0E9DA",
    "--fg": "#15110B",
    "--muted": "rgba(21,17,11,0.74)",
    "--muted-2": "rgba(21,17,11,0.48)",
    // Dark cards on the light canvas (the inversion)
    "--card-bg": "#161618",
    "--card-bg-2": "#0E0E10",
    "--card-bg-elev": "#15151A",
    "--card-bg-elev-2": "#0B0B0D",
    "--card-bg-accent": "#1F1611",
    "--card-bg-accent-2": "#100A06",
    "--card-border": "rgba(14,13,11,0.10)",
    "--card-border-strong": "rgba(14,13,11,0.18)",
    // Cards on a light section are still DARK cards. Their internal text
    // must stay LIGHT — keep the on-card vars white so child components
    // using var(--on-card-fg) / var(--on-card-muted) read correctly even
    // though the surrounding section flipped to a light canvas.
    "--on-card-fg": "#FFFFFF",
    "--on-card-muted": "rgba(255,255,255,0.70)",
    "--on-card-muted-2": "rgba(255,255,255,0.45)",
  } as CSSProperties,
  tinted: {
    // Slight off-canvas warm tint — keeps dark feel but breaks monotony
    "--bg": "#0F0E11",
    "--bg-elev": "#15141A",
  } as CSSProperties,
};

export const Section: React.FC<SectionProps> = ({
  children,
  divider = false,
  compact = false,
  spacious = false,
  width = "6xl",
  id,
  className = "",
  reveal = true,
  tone = "dark",
}) => {
  const prefersReduce = useReducedMotion();

  const padY = compact
    ? "py-20 sm:py-28"
    : spacious
      ? "py-32 sm:py-48"
      : "py-24 sm:py-36 lg:py-44";

  const containerCls =
    width === "full"
      ? "px-0"
      : `mx-auto ${widthMap[width]} px-5 sm:px-6 lg:px-8`;

  const inner = (
    <div className={`${containerCls} ${className}`}>{children}</div>
  );

  return (
    <section
      id={id}
      className={`relative w-full ${padY} ${
        divider ? "border-t" : ""
      }`}
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderColor: divider ? "var(--card-border)" : undefined,
        // Local-scope variable overrides per tone. CSS custom properties
        // inherit, so any child reading var(--bg)/var(--card-bg)/etc gets
        // the tone's values.
        ...toneVars[tone],
      }}
    >
      {reveal && !prefersReduce ? (
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease }}
        >
          {inner}
        </motion.div>
      ) : (
        inner
      )}
    </section>
  );
};
