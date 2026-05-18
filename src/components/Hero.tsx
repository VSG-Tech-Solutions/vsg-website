"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "./backgrounds/HeroBackground";
import { BookingButton } from "./BookingButton";
import { LiveDashboardMockup } from "./patterns/LiveDashboardMockup";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Hero — STR8FIRE-inspired editorial cinema.
 *
 * Layout:
 *   - Top-left: tiny logo + city pin lockup
 *   - Top-center: nav menu (handled by Navbar above)
 *   - Top-right: small WHITEPAPER-style affordance (handled by Navbar)
 *   - Centered massive H1 — clamp(4rem, 9vw, 9rem), tracking-tight, two
 *     lines: "Your ERP tracks transactions." (muted) / "Who tracks the
 *     work?" (fg, accent-2 word).
 *   - Below: short subhead, primary CTA, live module ticker.
 *   - Bottom-left: 3-line tagline lockup
 *   - Bottom-center: persistent community/contact strip
 *   - Bottom-right: SCROLL DOWN affordance
 *
 * Page-load sequence:
 *   1. Top + bottom strips slide in
 *   2. H1 first line fades + lifts
 *   3. H1 second line fades + lifts
 *   4. Subhead → CTAs → ticker stagger
 *
 * On scroll-out:
 *   - H1 letter-spacing exhales
 *   - Whole content drifts up + fades
 */
export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const prefersReduce = useReducedMotion();

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);
  const tracking = useTransform(
    scrollYProgress,
    [0, 1],
    ["-0.045em", "-0.02em"]
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        minHeight: "100svh",
      }}
    >
      <div className="absolute inset-0 z-0">
        <HeroBackground />
      </div>

      {/* Centered hero content */}
      <motion.div
        className="relative z-10 mx-auto max-w-[110rem] px-5 sm:px-10 pt-32 sm:pt-44 pb-32 sm:pb-44"
        style={prefersReduce ? undefined : { y, opacity }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            className="eyebrow-pill"
          >
            <span>Operations platform · South Africa</span>
          </motion.div>

          {/* Display H1 — STR8FIRE-scale type with exhale on scroll */}
          <motion.h1
            className="mt-8 sm:mt-10 font-extrabold w-full"
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: 0.92,
              letterSpacing: prefersReduce ? "-0.03em" : tracking,
              fontSize: "clamp(2.8rem, 9vw, 9rem)",
            }}
          >
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease, delay: 0.3 }}
              style={{ color: "var(--muted)" }}
            >
              Your ERP tracks transactions.
            </motion.span>
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease, delay: 0.55 }}
              style={{ color: "var(--fg)" }}
            >
              Who tracks{" "}
              <span style={{ color: "var(--accent-2)" }}>the work?</span>
            </motion.span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="mt-9 max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Vantage is the operational layer for everything around the ERP
            transaction.{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              Module-specific AI trained on your data.
            </span>{" "}
            Procurement AI drafts supplier quotes from live stock levels.
            First workflow live in five weeks.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1 }}
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

          {/* Live product mockup — show, don't tell */}
          <div className="mt-16 sm:mt-20 w-full">
            <LiveDashboardMockup />
          </div>
        </div>
      </motion.div>

      {/* SCROLL DOWN — bottom-center, single subtle affordance */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden sm:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.22em] pointer-events-none"
        style={{
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        <span>Scroll</span>
        <motion.span
          aria-hidden
          className="block w-px h-8"
          animate={{ scaleY: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "var(--accent-2)",
            transformOrigin: "top",
          }}
        />
      </motion.div>
    </section>
  );
};
