"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { VsgLogo } from "./VsgLogo";

/**
 * Footer — clean dark close. No video, no marquee, no glow.
 *
 * Three editorial bands stacked:
 *   1. CTA  — big confident closing line + email button
 *   2. Nav  — site map columns
 *   3. Bar  — © line + availability dot + socials
 */

const COLUMNS: { label: string; links: { label: string; href: string }[] }[] = [
  {
    label: "Products",
    links: [
      { label: "Procurement", href: "/products/procurement" },
      { label: "Receiving", href: "/products/receiving" },
      { label: "All products", href: "/products" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    label: "Reach us",
    links: [
      { label: "stephan@vsgtech.co.za", href: "mailto:stephan@vsgtech.co.za" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/vsg-tech-solutions",
      },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative w-full"
      style={{ background: "hsl(var(--bg))" }}
    >
      {/* Hairline rule across the top */}
      <div className="border-t border-stroke" />

      {/* Clean CTA band */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-24 md:pt-32 pb-16 md:pb-20">
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <div className="text-[10px] uppercase tracking-[0.32em] text-muted mb-7 flex items-center gap-3">
            <span className="w-8 h-px bg-stroke" />
            <span>Talk to a founder</span>
          </div>
          <h2
            className="font-display text-text-primary mb-10 max-w-4xl"
            style={{
              fontWeight: 800,
              fontSize: "clamp(2.5rem, 7.5vw, 6rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            Twenty minutes.{" "}
            <span className="text-muted">No slides.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              href="mailto:stephan@vsgtech.co.za"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium bg-text-primary text-bg hover:scale-[1.03] transition-transform duration-200"
            >
              <span>stephan@vsgtech.co.za</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
            <Link
              href="mailto:ernst@vsgtech.co.za"
              className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-medium border border-stroke text-text-primary hover:bg-surface/60 transition-colors duration-200"
            >
              <span>ernst@vsgtech.co.za</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.8}
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Nav band */}
      <section className="px-6 md:px-10 lg:px-16 pt-12 pb-12 border-t border-stroke">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Wordmark — uses the proper VsgLogo */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="text-text-primary inline-flex"
              aria-label="VSG home"
            >
              <VsgLogo size={32} />
            </Link>
            <p className="mt-5 text-sm text-muted max-w-sm leading-relaxed">
              AI products for operations. Built in Cape Town. Founder-led.
              POPIA-aligned, ZAR-invoiced, owned outright on cut-over.
            </p>
          </div>

          {/* Columns */}
          <div className="md:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.label}>
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted mb-4">
                  {col.label}
                </div>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text-primary/85 hover:text-text-primary transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom bar */}
      <section className="px-6 md:px-10 lg:px-16 py-7 border-t border-stroke">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-muted">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
            </span>
            <span>Available for engagements · Q3 2026</span>
          </div>
          <div className="flex items-center gap-5 text-[11px] text-muted uppercase tracking-[0.22em]">
            <Link href="/privacy" className="hover:text-text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-text-primary transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-text-primary transition-colors">
              Cookies
            </Link>
            <span>© VSG · 2026</span>
          </div>
        </div>
      </section>
    </footer>
  );
};
