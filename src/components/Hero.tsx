"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "./backgrounds/HeroBackground";
import { BookingButton } from "./BookingButton";
import { LiveModuleTicker } from "./patterns/LiveModuleTicker";

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

const TICKER_LINES = [
  "Procurement AI · drafted 24 supplier quotes today",
  "Exception AI · classified 117 inbound items today",
  "Approval AI · surfaced 3 edge cases today",
  "Compliance AI · flagged 6 expiring certificates today",
];

/**
 * Hero — Holo-inspired editorial pattern.
 *
 * Centred column. Pulse-pill eyebrow → 2-line giant H1 with scroll-driven
 * "exhale" tracking transition (-0.04em → -0.02em as you scroll past) →
 * short subhead → primary pill CTA + ghost secondary → live module ticker
 * → trust strip with three lockups.
 *
 * The tracking-exhale is the signature moment: as the H1 leaves the
 * viewport, its letter-spacing releases gently while opacity fades —
 * the type "breathes out" rather than just disappearing.
 */
export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const prefersReduce = useReducedMotion();

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.5, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  // Signature: H1 letter-spacing exhale on scroll.
  const tracking = useTransform(
    scrollYProgress,
    [0, 1],
    ["-0.04em", "-0.015em"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pb-32 sm:pb-44"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <HeroBackground />
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-5 sm:px-6 pt-28 sm:pt-44"
        style={prefersReduce ? undefined : { y, opacity }}
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

          {/* Display H1 — 2 lines, exhale tracking on scroll */}
          <motion.h1
            variants={item}
            className="mt-7 sm:mt-9 font-extrabold text-[2.6rem] sm:text-[5rem] lg:text-[6.25rem]"
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: 1.02,
              letterSpacing: prefersReduce ? "-0.025em" : tracking,
            }}
          >
            <span className="block" style={{ color: "var(--muted)" }}>
              Your ERP tracks transactions.
            </span>
            <span className="block" style={{ color: "var(--fg)" }}>
              Who tracks the work?
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="mt-7 max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Vantage is the operational layer for everything around the ERP
            transaction. One platform for approvals, procurement, supplier
            exceptions and compliance — with{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              module-specific AI trained on your data
            </span>
            . Procurement AI drafts supplier quotes from live stock levels.
            First workflow live in five weeks.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <BookingButton className="pill-cta group">
              <span>Book a 20-minute demo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </BookingButton>
            <Link href="/vantage" className="pill-ghost">
              <span>See how Vantage works</span>
            </Link>
          </motion.div>

          {/* Live module ticker */}
          <motion.div variants={item} className="mt-10">
            <LiveModuleTicker lines={TICKER_LINES} interval={4} />
          </motion.div>

          {/* Trust strip — three lockups */}
          <motion.div
            variants={item}
            className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 text-xs"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <TrustLockup label="Pilot cohort" value="3 of 5 booked" />
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
