"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingButton } from "./BookingButton";
import { MagneticButton } from "./MagneticButton";
import { SplitTextReveal } from "./SplitTextReveal";
import { HeroOcean } from "./HeroOcean";
import { LightStreaks } from "./LightStreaks";

/**
 * HeroExperience — Synapse-Dark direction.
 *
 * Layer stack (back-to-front):
 *   0. HeroOcean       — full-bleed animated dark wave (R3F)
 *   1. LightStreaks    — animated bright SVG arcs sweeping across the hero
 *   2. Bottom fade     — gradient that blends the hero into the next section
 *   3. Hero copy       — centered eyebrow + h1 + body + CTAs + scroll cue
 *
 * Layout is centered on this hero (different from the asymmetric pattern
 * we use elsewhere). The visual fills the whole canvas; the type sits
 * front-and-centre on top.
 */
const ease = [0.16, 1, 0.3, 1] as const;

export const HeroExperience: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100svh",
        color: "var(--fg)",
        background: "var(--bg)",
      }}
    >
      {/* Layer 0 — animated wave backdrop */}
      <HeroOcean />

      {/* Layer 1 — animated light streaks */}
      <LightStreaks />

      {/* Layer 2 — bottom fade so hero blends into next section */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-48 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg) 92%)",
        }}
      />

      {/* Layer 3 — centred hero copy */}
      <div className="relative z-20 mx-auto max-w-5xl h-full px-5 sm:px-8 pt-44 sm:pt-52 pb-32 flex flex-col items-center text-center min-h-[100svh] justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          className="eyebrow-pill"
        >
          <span>VSG Tech Solutions · Cape Town</span>
        </motion.div>

        <h1
          className="mt-7 sm:mt-9 font-extrabold max-w-4xl"
          style={{
            fontFamily: "var(--font-display)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            fontSize: "clamp(2.6rem, 6.4vw, 5.6rem)",
            color: "var(--fg)",
            textShadow: "0 2px 30px rgba(0,0,0,0.55)",
          }}
        >
          <SplitTextReveal
            as="span"
            delay={0.3}
            duration={0.95}
            stagger={0.07}
            className="block"
            style={{ color: "var(--muted)" }}
          >
            {"VSG builds AI-first"}
          </SplitTextReveal>
          <SplitTextReveal
            as="span"
            delay={0.6}
            duration={0.95}
            stagger={0.07}
            className="block"
          >
            {"operational software."}
          </SplitTextReveal>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.05 }}
          className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
            textShadow: "0 1px 14px rgba(0,0,0,0.6)",
          }}
        >
          A Cape Town engineering company building two things for the South
          African mid-market.{" "}
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>Vantage</span>{" "}
          — our flagship AI operational control platform that runs alongside
          your ERP, with eight named AI specialists drafting the work. And a{" "}
          <span style={{ color: "var(--fg)", fontWeight: 600 }}>
            custom build practice
          </span>{" "}
          — bespoke software, custom AI systems, AI workflow automation,
          fixed-price.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1.2 }}
          className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
        >
          <MagneticButton strength={0.3}>
            <BookingButton className="pill-cta group">
              <span>Book a 20-minute call</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </BookingButton>
          </MagneticButton>
          <MagneticButton strength={0.25}>
            <Link href="/vantage" className="pill-ghost">
              <span>See Vantage</span>
            </Link>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: 1.55 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.32em] pointer-events-none"
          style={{ color: "var(--muted-2)" }}
        >
          <span>Scroll</span>
          <motion.span
            aria-hidden
            className="block w-px h-10"
            animate={{ scaleY: [0.2, 1, 0.2] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background: "var(--fg)",
              transformOrigin: "top",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
};
