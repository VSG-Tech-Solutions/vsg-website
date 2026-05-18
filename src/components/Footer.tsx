"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { VSGLogo } from "./VSGLogo";

/**
 * Footer — multi-column matching the reference set (Stripe / Vercel / Cursor).
 *
 * Five content columns (Brand · Vantage · Services · Company · Get in
 * touch), then a bottom legal row. Brand column on the left carries the
 * mark + the one-line description + contact triple. The four nav columns
 * are condensed but deep, so a buyer can deep-link to any section without
 * loading the page first.
 */

const VANTAGE = [
  { label: "Overview", href: "/vantage" },
  { label: "How it works", href: "/vantage#how-it-works" },
  { label: "Architecture", href: "/vantage#architecture" },
  { label: "The Modules", href: "/vantage#modules" },
  { label: "The intelligence inside", href: "/vantage#intelligence" },
  { label: "Platform capabilities", href: "/vantage#platform" },
  { label: "See it running", href: "/vantage#prototype" },
  { label: "Pilot promo", href: "/pilot" },
];

const SERVICES = [
  { label: "Bespoke software", href: "/services#offerings" },
  { label: "Custom AI systems", href: "/services#offerings" },
  { label: "Workflow automation", href: "/services#offerings" },
  { label: "Engagement model", href: "/services#process" },
  { label: "Scope a project", href: "/services#scope" },
];

const COMPANY = [
  { label: "About", href: "/about" },
  { label: "Case studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vsg-tech-solutions",
    external: true,
  },
];

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative w-full"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderTop: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-14 py-20 sm:py-24">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <Link
              href="/"
              className="brand-lockup flex items-center gap-3 group w-fit"
            >
              <span
                className="brand-logo-glow relative inline-flex items-center justify-center"
                style={{
                  transition: "filter 0.35s ease, transform 0.35s ease",
                }}
              >
                <VSGLogo size={42} />
              </span>
              <div className="flex flex-col leading-none">
                <span
                  className="text-2xl font-semibold tracking-[0.24em]"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  VSG
                </span>
                <span
                  className="mt-1.5 text-[9px] tracking-[0.34em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  TECH&nbsp;SOLUTIONS
                </span>
              </div>
            </Link>

            <p
              className="mt-7 max-w-md text-[14px] leading-relaxed"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              The AI operational control platform that runs alongside
              your ERP — and a fixed-price custom software, AI and
              workflow automation practice alongside it.
            </p>

            <p
              className="mt-5 max-w-md text-[13px] leading-relaxed"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Cape Town · South Africa. POPIA-aligned. Both founders on
              every working session.
            </p>
          </div>

          {/* Nav columns */}
          <FooterColumn heading="Vantage" items={VANTAGE} />
          <FooterColumn heading="Services" items={SERVICES} />
          <FooterColumn heading="Company" items={COMPANY} />

          {/* Get in touch column */}
          <div className="lg:col-span-2">
            <h4
              className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-5"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Get in touch
            </h4>
            <ul className="space-y-4">
              <ContactItem
                icon={Mail}
                label="Email"
                value="stephan@vsgtech.co.za"
                href="mailto:stephan@vsgtech.co.za"
              />
              <ContactItem
                icon={Phone}
                label="Phone"
                value="+27 63 616 9780"
                href="tel:+27636169780"
              />
              <ContactItem
                icon={MapPin}
                label="HQ"
                value="Cape Town, ZA"
              />
            </ul>

            <Link
              href="/contact"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-full transition-all duration-200"
              style={{
                background: "linear-gradient(180deg, #FFFFFF, #E5E5E5)",
                color: "#0A0A0A",
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.85) inset, 0 6px 18px rgba(0,0,0,0.5)",
                fontFamily: "var(--font-body)",
              }}
            >
              Book 20 minutes →
            </Link>
          </div>
        </div>

        {/* Bottom legal row */}
        <div
          className="mt-16 pt-8 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{
            borderColor: "rgba(255, 255, 255, 0.06)",
          }}
        >
          <div
            className="text-[11px]"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            © {year} VSG Tech Solutions (Pty) Ltd · All rights reserved
          </div>
          <div
            className="flex items-center gap-6 text-[11px]"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <Link
              href="/privacy"
              className="transition-colors duration-200 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-200 hover:text-white"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="transition-colors duration-200 hover:text-white"
            >
              Cookies
            </Link>
            <span className="hidden sm:inline">POPIA-aligned</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ---------------- subcomponents ---------------- */

const FooterColumn: React.FC<{
  heading: string;
  items: { label: string; href: string; external?: boolean }[];
}> = ({ heading, items }) => (
  <div className="lg:col-span-2">
    <h4
      className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-5"
      style={{
        color: "var(--muted-2)",
        fontFamily: "var(--font-body)",
      }}
    >
      {heading}
    </h4>
    <ul className="space-y-3">
      {items.map((l) => (
        <li key={l.label}>
          <Link
            href={l.href}
            target={l.external ? "_blank" : undefined}
            rel={l.external ? "noopener noreferrer" : undefined}
            className="text-[13px] transition-colors duration-200 hover:text-white"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ContactItem: React.FC<{
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}> = ({ icon: Icon, label, value, href }) => {
  const inner = (
    <div className="flex items-start gap-3">
      <span
        className="inline-flex items-center justify-center w-7 h-7 rounded-md shrink-0 mt-0.5"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        }}
      >
        <Icon
          className="w-3.5 h-3.5"
          style={{ color: "var(--muted)" }}
          strokeWidth={1.6}
        />
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] uppercase tracking-[0.22em] font-semibold"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </div>
        <div
          className="mt-0.5 text-[13px] truncate"
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-body)",
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );

  return href ? (
    <li>
      <Link
        href={href}
        className="block transition-opacity duration-200 hover:opacity-80"
      >
        {inner}
      </Link>
    </li>
  ) : (
    <li>{inner}</li>
  );
};
