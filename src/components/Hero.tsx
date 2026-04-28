"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "./backgrounds/HeroBackground";
import { BookingButton } from "./BookingButton";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Hero — Holo-inspired editorial pattern.
 *
 * Centered column. Tiny pulse-pill eyebrow → giant 2-line H1 (display-tight,
 * Space Grotesk 800, -0.025em tracking) → short subhead in muted gray →
 * single gradient pill CTA + ghost secondary → tiny trust strip with three
 * lockups (cohort status · POPIA · founder-led).
 *
 * Massive top padding by design — the negative space is the design.
 */
export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: as the hero leaves, content drifts up gently and fades.
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.6, 0]);
  // Background grid drifts up at half speed for parallax depth.
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pb-32 sm:pb-48"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <HeroBackground />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 pt-28 sm:pt-44"
        style={{ y, opacity }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          {/* Eyebrow pill */}
          <motion.div variants={item} className="eyebrow-pill">
            <span>Operations platform · South Africa</span>
          </motion.div>

          {/* Display H1 — 2 lines, tight tracking. First line muted, second
             line full white for editorial emphasis. No colored gradient. */}
          <motion.h1
            variants={item}
            className="display-tight mt-7 sm:mt-9 text-[2.6rem] sm:text-[5rem] lg:text-[6.25rem]"
          >
            <span
              className="block"
              style={{ color: "var(--muted)" }}
            >
              Your ERP tracks transactions.
            </span>
            <span className="block" style={{ color: "var(--fg)" }}>
              Who tracks the work?
            </span>
          </motion.h1>

          {/* Subhead — short, single paragraph */}
          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Vantage centralises everything around the ERP transaction —
            approvals, procurement, supplier exceptions, compliance — onto
            one platform, then adds{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              module-specific AI trained on your data
            </span>
            . Procurement AI drafts supplier quotes from live stock levels.
            First workflow live in five weeks.
          </motion.p>

          {/* CTAs — pill primary + ghost secondary */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <BookingButton className="pill-cta">
              <span>Book a 20-minute demo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </BookingButton>
            <Link href="/vantage" className="pill-ghost">
              <span>See how Vantage works</span>
            </Link>
          </motion.div>

          {/* Trust strip — three pill lockups, hairline divider */}
          <motion.div
            variants={item}
            className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 text-xs"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <TrustLockup
              label="Pilot cohort"
              value="3 of 5 booked · 40% off setup"
            />
            <TrustDivider />
            <TrustLockup label="Compliance" value="POPIA-aligned" />
            <TrustDivider />
            <TrustLockup label="Engagement" value="Founder-led · Cape Town" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* Small two-line lockup: faint label on top, foreground value beneath.
   Holo's site uses this exact pattern under their hero ("Backed by VC funds /
   5MM valuation"). */
const TrustLockup: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="px-4 sm:px-6 leading-tight">
    <div
      className="text-[10px] uppercase tracking-[0.18em]"
      style={{ color: "var(--muted-2)" }}
    >
      {label}
    </div>
    <div
      className="mt-0.5 text-sm font-semibold"
      style={{ color: "var(--fg)" }}
    >
      {value}
    </div>
  </div>
);

const TrustDivider: React.FC = () => (
  <span
    aria-hidden
    className="hidden sm:block w-px h-8"
    style={{ background: "var(--card-border)" }}
  />
);
