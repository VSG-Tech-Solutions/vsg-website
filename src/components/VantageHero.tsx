"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BookingButton } from "./BookingButton";
import { MagneticButton } from "./MagneticButton";
import { SplitTextReveal } from "./SplitTextReveal";
import { HeroProductMockup } from "./HeroProductMockup";

/**
 * VantageHero — the /vantage page's product-led hero.
 *
 * Asymmetric layout: type LEFT (Vantage pitch + CTAs) / animated product
 * mockup RIGHT (live exception queue from HeroProductMockup). Different
 * from the brand-level hero on the homepage — this one IS Vantage-specific
 * and shows the actual product UI as proof.
 *
 * Copy is placeholder until the new module-method messaging is finalised.
 * Structure is the part that's locked in: asymmetric grid, mockup as the
 * visual, CTAs that take you to a call.
 */
const ease = [0.16, 1, 0.3, 1] as const;

export const VantageHero: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        minHeight: "100svh",
        color: "var(--fg)",
        background: "var(--bg)",
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl h-full px-5 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-44 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT — type column */}
          <div className="lg:col-span-6 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
              className="eyebrow-pill"
            >
              <span>Flagship SaaS · Vantage</span>
            </motion.div>

            <h1
              className="mt-7 sm:mt-9 font-extrabold"
              style={{
                fontFamily: "var(--font-display)",
                lineHeight: 0.94,
                letterSpacing: "-0.03em",
                fontSize: "clamp(2.6rem, 5.4vw, 5rem)",
                color: "var(--fg)",
              }}
            >
              <SplitTextReveal
                as="span"
                delay={0.25}
                duration={0.95}
                stagger={0.07}
                className="block"
                style={{ color: "var(--muted)" }}
              >
                {"Your ERP tracks transactions."}
              </SplitTextReveal>
              <SplitTextReveal
                as="span"
                delay={0.55}
                duration={0.95}
                stagger={0.07}
                className="block"
              >
                {"Vantage tracks the work."}
              </SplitTextReveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.0 }}
              className="mt-7 max-w-xl text-base sm:text-lg leading-relaxed"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              Your operator opens Vantage. The AI does the work.{" "}
              <span style={{ color: "var(--fg)", fontWeight: 600 }}>
                Eight named AI specialists
              </span>{" "}
              pulling live data from your ERP — drafting orders, ranking
              quotes, classifying variances, routing exceptions, reading
              documents, answering questions. Every one trained on your
              data. Your ERP keeps the records. First workflow live in
              five weeks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: 1.15 }}
              className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              <MagneticButton strength={0.3}>
                <BookingButton className="pill-cta group">
                  <span>Book a 20-minute demo</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </BookingButton>
              </MagneticButton>
              <MagneticButton strength={0.25}>
                <Link href="#modules" className="pill-ghost">
                  <span>See the modules</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT — animated Vantage product mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease, delay: 0.4 }}
            className="lg:col-span-6"
          >
            <HeroProductMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
