"use client";

import { motion } from "framer-motion";

/**
 * MarqueeStrips — two horizontal strips of huge bold text scrolling in
 * opposite directions, on different speeds. Sits behind section
 * content as an unmistakably-moving background.
 *
 * This is the LOUDEST motion the site has had. Use sparingly — it
 * works as a signature moment under the hero and at the closing CTA,
 * not in every section.
 *
 * The text repeats enough times that even when one copy scrolls fully
 * off-screen, another is filling its place — producing a continuous
 * loop with no visible "snap".
 *
 * Edges fade via mask-image so the text disappears smoothly into the
 * page sides instead of clipping at the viewport edge.
 */

type Props = {
  intensity?: "subtle" | "medium" | "strong";
  tint?: "warm" | "cool";
  /** Vertical anchor — places the strips relative to the section.
   *  "split" puts one near the top, one near the bottom. "center"
   *  stacks both around the vertical centre. Default: "split". */
  anchor?: "split" | "center" | "bottom";
  /** Override the words used. Default = VSG brand keywords. */
  words?: string[];
  className?: string;
};

const TINTS = {
  warm: {
    fillStrong: "#FF6B2C",
    fillSoft: "rgba(255,180,90,0.45)",
    outlineSoft: "rgba(255,107,44,0.20)",
  },
  cool: {
    fillStrong: "#6B8AFF",
    fillSoft: "rgba(167,124,255,0.45)",
    outlineSoft: "rgba(107,138,255,0.20)",
  },
};

const INTENSITY = {
  subtle: { topOpacity: 0.10, bottomOpacity: 0.08, fontSize: "9vw" },
  medium: { topOpacity: 0.16, bottomOpacity: 0.12, fontSize: "11vw" },
  strong: { topOpacity: 0.22, bottomOpacity: 0.18, fontSize: "13vw" },
};

const DEFAULT_WORDS = [
  "AI Procurement",
  "Production Scheduling",
  "AI Receiving",
  "Cape Town",
  "AI Products",
  "Built to ship",
];

export const MarqueeStrips: React.FC<Props> = ({
  intensity = "medium",
  tint = "warm",
  anchor = "split",
  words = DEFAULT_WORDS,
  className = "",
}) => {
  const C = TINTS[tint];
  const I = INTENSITY[intensity];

  // Repeat the word list enough that the strip has visual continuity
  // when scrolled. Each word is followed by a separator dot.
  const renderRow = (cycles = 4) => {
    const items: string[] = [];
    for (let c = 0; c < cycles; c++) {
      for (const w of words) items.push(w);
    }
    return items;
  };

  // Anchor → top / bottom positions for the two strips.
  const positions =
    anchor === "split"
      ? { topA: "18%", topB: "70%" }
      : anchor === "center"
      ? { topA: "42%", topB: "54%" }
      : { topA: "55%", topB: "82%" };

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{
        // Edge fade-mask — both sides
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      {/* STRIP A — outline-style word run, scrolling LEFT */}
      <div
        className="absolute left-0 right-0 overflow-hidden"
        style={{ top: positions.topA, height: I.fontSize, opacity: I.topOpacity }}
      >
        <motion.div
          className="inline-flex whitespace-nowrap"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 800,
            fontSize: I.fontSize,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            // Outline-only text using -webkit-text-stroke for the
            // "stencil" look — feels editorial, not screamy
            color: "transparent",
            WebkitTextStroke: `2px ${C.fillStrong}`,
            textShadow: `0 0 24px ${C.outlineSoft}`,
          }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 38,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {renderRow(4).map((w, i) => (
            <span key={i} className="px-6 inline-flex items-center gap-6">
              {w}
              <span style={{ color: C.fillStrong, WebkitTextStroke: 0 }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* STRIP B — solid-fill word run, scrolling RIGHT (opposite direction) */}
      <div
        className="absolute left-0 right-0 overflow-hidden"
        style={{
          top: positions.topB,
          height: I.fontSize,
          opacity: I.bottomOpacity,
        }}
      >
        <motion.div
          className="inline-flex whitespace-nowrap"
          style={{
            fontFamily: "var(--font-body)",
            fontWeight: 800,
            fontSize: I.fontSize,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: C.fillSoft,
          }}
          animate={{ x: ["-50%", "0%"] }}
          transition={{
            duration: 56,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {renderRow(4).map((w, i) => (
            <span key={i} className="px-6 inline-flex items-center gap-6">
              {w}
              <span style={{ color: C.fillStrong, opacity: 0.8 }}>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Soft warm wash anchored at the bottom — atmospheric weight */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            tint === "warm"
              ? `radial-gradient(ellipse 80% 70% at 50% 100%, rgba(255,107,44,0.08) 0%, rgba(255,107,44,0) 70%)`
              : `radial-gradient(ellipse 80% 70% at 50% 100%, rgba(107,138,255,0.08) 0%, rgba(107,138,255,0) 70%)`,
        }}
      />
    </div>
  );
};
