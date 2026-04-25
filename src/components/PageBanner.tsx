"use client";

import { motion } from "framer-motion";
import { HeroBackground } from "./backgrounds/HeroBackground";

/**
 * Compact hero banner used at the top of every inner page (Vantage, Services,
 * Pilot, Contact). Same Ocean Deep depth background as the home hero, just
 * shorter so the body content sits higher.
 */
export const PageBanner: React.FC<{
  eyebrow: string;
  title: string;
  highlight?: string;
  lede: React.ReactNode;
}> = ({ eyebrow, title, highlight, lede }) => {
  return (
    <section
      className="relative w-full overflow-hidden pb-16"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="absolute inset-0 z-0">
        <HeroBackground />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-6 pt-28 sm:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div
            className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
            style={{
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="h-px w-8"
              style={{ background: "var(--accent-2)" }}
            />
            <span>{eyebrow}</span>
          </div>

          <h1
            className="mt-6 font-bold text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            {title}
            {highlight && (
              <>
                {" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to bottom right, var(--fg), var(--accent-2), var(--accent))",
                    filter: "drop-shadow(0 0 30px var(--accent-glow))",
                  }}
                >
                  {highlight}
                </span>
              </>
            )}
          </h1>

          <p
            className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {lede}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
