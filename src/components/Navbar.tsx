"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Boxes,
  Workflow,
  Brain,
  Layers,
  PackageCheck,
  Zap,
  GitBranch,
  Code2,
  Cpu,
} from "lucide-react";
import { VSGLogo } from "./VSGLogo";

/**
 * Navbar — dark-glass pill with mega-menu dropdowns on Vantage + Services.
 *
 * Reference set (Stripe, Vercel, Cursor) all use mega-menus on the two or
 * three "deep" routes. Flat link rows are an early-stage tell.
 *
 * Hover triggers the dropdown on desktop; tap opens / closes on mobile.
 * Backdrop blur on the panel itself so the page behind is always legible.
 */

type MegaItem = {
  label: string;
  description: string;
  href: string;
  icon: typeof Boxes;
};

type NavLink = {
  label: string;
  href: string;
  mega?: {
    eyebrow: string;
    items: MegaItem[];
    cta: { label: string; href: string };
  };
};

const VANTAGE_MEGA: MegaItem[] = [
  {
    label: "How it works",
    description:
      "Open the Module · AI drafts · Core catches exceptions · ERP keeps the records",
    href: "/vantage#how-it-works",
    icon: Workflow,
  },
  {
    label: "Architecture",
    description:
      "Six Modules orbiting one Core. Click any to see what it does for the operator.",
    href: "/vantage#architecture",
    icon: Layers,
  },
  {
    label: "The Modules",
    description:
      "Procurement, Receiving, Approvals, Compliance, Onboarding, Quality.",
    href: "/vantage#modules",
    icon: Boxes,
  },
  {
    label: "The intelligence inside",
    description:
      "Eight named AI specialists, each tuned to your operation, never pooled.",
    href: "/vantage#intelligence",
    icon: Brain,
  },
  {
    label: "Platform capabilities",
    description:
      "Eight things Vantage does for every Module you switch on.",
    href: "/vantage#platform",
    icon: PackageCheck,
  },
  {
    label: "See it running",
    description:
      "The real product shell on representative data. Every link clickable.",
    href: "/vantage#prototype",
    icon: Zap,
  },
];

const SERVICES_MEGA: MegaItem[] = [
  {
    label: "Bespoke software",
    description:
      "Production-grade platforms — multi-tenant SaaS, internal tools, customer apps.",
    href: "/services#offerings",
    icon: Code2,
  },
  {
    label: "Custom AI systems",
    description:
      "AI built for your operation. Reads documents, takes action, learns patterns.",
    href: "/services#offerings",
    icon: Cpu,
  },
  {
    label: "Workflow automation",
    description:
      "End-to-end automation from intake to handover, on your existing systems.",
    href: "/services#offerings",
    icon: GitBranch,
  },
  {
    label: "Engagement model",
    description:
      "Scope first. Fixed price in writing. Both founders on every call.",
    href: "/services#process",
    icon: Workflow,
  },
];

const LINKS: NavLink[] = [
  {
    label: "Vantage",
    href: "/vantage",
    mega: {
      eyebrow: "The flagship platform",
      items: VANTAGE_MEGA,
      cta: { label: "See Vantage end-to-end", href: "/vantage" },
    },
  },
  {
    label: "Services",
    href: "/services",
    mega: {
      eyebrow: "Bespoke practice",
      items: SERVICES_MEGA,
      cta: { label: "See the engagement model", href: "/services#process" },
    },
  },
  { label: "Pilot promo", href: "/pilot" },
  { label: "Case studies", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mega-menu on route change
  useEffect(() => {
    setOpenMega(null);
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  const handleEnter = (label: string) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setOpenMega(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMega(null), 120);
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-12 sm:top-[68px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-6xl rounded-full"
      style={{
        background:
          "linear-gradient(180deg, rgba(18, 18, 22, 0.78) 0%, rgba(8, 8, 10, 0.78) 100%)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        border: scrolled
          ? "1px solid rgba(255, 255, 255, 0.10)"
          : "1px solid rgba(255, 255, 255, 0.07)",
        boxShadow: scrolled
          ? "inset 0 1px 0 rgba(255, 255, 255, 0.07), 0 18px 50px -16px rgba(0, 0, 0, 0.7), 0 2px 6px rgba(0, 0, 0, 0.4)"
          : "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 12px 36px -14px rgba(0, 0, 0, 0.55)",
        transition: "border 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="flex items-center justify-between pl-5 pr-3 py-2.5 sm:py-3">
        <Link
          href="/"
          className="brand-lockup flex items-center gap-3 group"
          style={{ color: "var(--fg)" }}
        >
          <span
            className="brand-logo-glow relative inline-flex items-center justify-center"
            style={{
              transition: "filter 0.35s ease, transform 0.35s ease",
            }}
          >
            <VSGLogo size={30} />
          </span>
          <span
            className="text-xl font-extrabold tracking-[0.24em]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--fg)",
            }}
          >
            VSG
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = isActive(l.href);
            const isOpen = openMega === l.label;
            const hasMega = !!l.mega;

            return (
              <div
                key={l.href}
                className="relative"
                onMouseEnter={hasMega ? () => handleEnter(l.label) : undefined}
                onMouseLeave={hasMega ? handleLeave : undefined}
              >
                <Link
                  href={l.href}
                  className="relative inline-flex items-center gap-1 px-4 py-2 text-sm transition-colors cursor-pointer"
                  style={{
                    color: active ? "var(--fg)" : "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {l.label}
                  {hasMega && (
                    <ChevronDown
                      className="w-3 h-3 transition-transform"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        color: "var(--muted-2)",
                      }}
                      strokeWidth={2}
                    />
                  )}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full"
                      style={{ background: "var(--accent)" }}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{
              background: "linear-gradient(180deg, #FFFFFF, #E5E5E5)",
              color: "#0A0A0A",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.85) inset, 0 6px 18px rgba(0,0,0,0.5)",
              fontFamily: "var(--font-body)",
            }}
          >
            Contact
          </Link>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 cursor-pointer"
            style={{ color: "var(--muted)" }}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop mega-menu panel — full-width, anchored under navbar */}
      <AnimatePresence>
        {openMega &&
          (() => {
            const link = LINKS.find((l) => l.label === openMega);
            if (!link?.mega) return null;
            return (
              <motion.div
                key={openMega}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:block absolute left-1/2 top-full -translate-x-1/2 mt-3 w-[min(56rem,calc(100vw-3rem))] rounded-3xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(18, 18, 22, 0.92) 0%, rgba(8, 8, 10, 0.95) 100%)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.10)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -20px rgba(0, 0, 0, 0.7)",
                }}
                onMouseEnter={() => handleEnter(openMega)}
                onMouseLeave={handleLeave}
              >
                <div className="p-6 sm:p-7">
                  <div
                    className="text-[10px] uppercase tracking-[0.32em] font-semibold mb-5"
                    style={{
                      color: "var(--accent-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {link.mega.eyebrow}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {link.mega.items.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          className="group relative flex items-start gap-3 p-4 rounded-2xl transition-colors duration-200 hover:bg-white/[0.04]"
                        >
                          <span
                            className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0 mt-0.5"
                            style={{
                              background: "var(--accent-soft)",
                              border:
                                "1px solid var(--card-border-accent)",
                            }}
                          >
                            <Icon
                              className="w-4 h-4"
                              style={{ color: "var(--accent)" }}
                              strokeWidth={1.6}
                            />
                          </span>
                          <div className="flex-1 min-w-0">
                            <div
                              className="font-semibold text-[14px]"
                              style={{
                                color: "var(--fg)",
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              {item.label}
                            </div>
                            <div
                              className="mt-1 text-[12.5px] leading-relaxed"
                              style={{
                                color: "var(--muted)",
                                fontFamily: "var(--font-body)",
                              }}
                            >
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Footer CTA row */}
                  <div
                    className="mt-5 pt-5 border-t flex items-center justify-between"
                    style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
                  >
                    <Link
                      href={link.mega.cta.href}
                      className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.22em] font-semibold transition-colors duration-200"
                      style={{
                        color: "var(--accent)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {link.mega.cta.label}
                      <span aria-hidden>→</span>
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-[12px] uppercase tracking-[0.22em] font-semibold"
                      style={{
                        color: "var(--muted-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Talk to a founder
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })()}
      </AnimatePresence>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t px-5 py-4 flex flex-col gap-2"
          style={{ borderColor: "var(--card-border)" }}
        >
          {LINKS.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-2"
                style={{
                  color: active ? "var(--fg)" : "var(--muted)",
                  fontFamily: "var(--font-body)",
                  borderLeft: active
                    ? "2px solid var(--accent)"
                    : "2px solid transparent",
                  paddingLeft: "0.75rem",
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-3 w-full text-center px-4 py-3 text-sm font-semibold rounded-full"
            style={{
              background: "linear-gradient(180deg, #FFFFFF, #E5E5E5)",
              color: "#0A0A0A",
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.85) inset, 0 6px 18px rgba(0,0,0,0.5)",
              fontFamily: "var(--font-body)",
            }}
          >
            Contact →
          </Link>
        </motion.div>
      )}
    </motion.nav>
  );
};
