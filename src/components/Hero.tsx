"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HeroBackground } from "./backgrounds/HeroBackground";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const Hero: React.FC = () => {
  return (
    <section
      className="relative w-full overflow-hidden pb-24 sm:pb-48"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Theme-aware depth background */}
      <div className="absolute inset-0 z-0">
        <HeroBackground />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 pt-32 sm:pt-48">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start max-w-4xl"
        >
          {/* Refined eyebrow — no more chunky pill */}
          <motion.div
            variants={item}
            className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.25em] whitespace-nowrap"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="h-px w-6 sm:w-8 shrink-0"
              style={{ background: "var(--accent-2)" }}
            />
            <span>VSG Tech Solutions</span>
            <span
              className="h-1 w-1 rounded-full shrink-0"
              style={{ background: "var(--muted-2)" }}
            />
            <span>Cape Town</span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-7 sm:mt-8 font-bold text-[2.15rem] sm:text-7xl lg:text-[5.75rem] leading-[1.05] sm:leading-[0.95] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            <span className="block">Your ERP tracks</span>
            <span className="block">transactions.</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, var(--fg), var(--accent-2), var(--accent))",
                filter: "drop-shadow(0 0 30px var(--accent-glow))",
              }}
            >
              Who tracks the work?
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Mid-market operators lose 15–25 days a month to invoice mismatches,
            stuck approvals, QC non-conformances and supplier onboarding chaos.
            Vantage runs alongside Syspro, SAP, Sage or any internal system —
            pulling that work out of email, spreadsheets and WhatsApp and
            routing it through workflows you own. First workflow live in five
            weeks. Right now we&apos;re hand-picking{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              five pilot clients
            </strong>
            {" "}— 40% off setup, free support, no per-user fees.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold tracking-wide transition-all duration-300 cursor-pointer themed-rounded"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                color: "#ffffff",
                boxShadow: "0 0 40px var(--accent-glow)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span>Book a 20-minute demo</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/vantage"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border backdrop-blur-sm font-semibold transition-all duration-300 cursor-pointer themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background: "var(--card-bg)",
                color: "var(--fg)",
                fontFamily: "var(--font-body)",
              }}
            >
              See how Vantage works
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-1.5 sm:gap-y-2 sm:gap-x-8 text-xs"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="h-1.5 w-1.5 rounded-full animate-pulse shrink-0"
                style={{ background: "var(--accent)" }}
              />
              <span>Setup slots open — May / June 2026</span>
            </div>
            <span
              className="hidden sm:inline-block h-1 w-1 rounded-full"
              style={{ background: "var(--muted-2)" }}
            />
            <span>
              <span className="sm:hidden">· </span>
              Pilot cohort — 40% off setup
            </span>
            <span
              className="hidden sm:inline-block h-1 w-1 rounded-full"
              style={{ background: "var(--muted-2)" }}
            />
            <span>
              <span className="sm:hidden">· </span>
              POPIA-aligned · Founder-led
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
