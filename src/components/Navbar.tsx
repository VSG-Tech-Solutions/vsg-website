"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { VSGLogo } from "./VSGLogo";
import { BookingButton } from "./BookingButton";

const links = [
  { label: "Vantage", href: "/vantage" },
  { label: "Services", href: "/services" },
  { label: "Pilot promo", href: "/pilot" },
  { label: "Case studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-12 sm:top-[68px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-6xl rounded-2xl border backdrop-blur-xl transition-all duration-300 themed-rounded"
      style={{
        borderColor: "var(--card-border)",
        background: scrolled
          ? "color-mix(in oklab, var(--bg-elev) 75%, transparent)"
          : "color-mix(in oklab, var(--bg-elev) 40%, transparent)",
        boxShadow: scrolled ? `0 8px 32px var(--accent-glow)` : "none",
      }}
    >
      <div className="flex items-center justify-between px-5 py-3">
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
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative px-4 py-2 text-sm transition-colors cursor-pointer"
                style={{
                  color: active ? "var(--fg)" : "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {l.label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full"
                    style={{ background: "var(--accent)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <BookingButton
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer whitespace-nowrap"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 70%, var(--accent-2)))",
              color: "#ffffff",
              boxShadow: "0 4px 20px var(--accent-glow)",
              fontFamily: "var(--font-body)",
            }}
          >
            Book a demo
          </BookingButton>
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

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t px-5 py-4 flex flex-col gap-2"
          style={{ borderColor: "var(--card-border)" }}
        >
          {links.map((l) => {
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
          <BookingButton
            onClick={() => setOpen(false)}
            className="mt-3 w-full text-center px-4 py-3 text-sm font-semibold rounded-full"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 70%, var(--accent-2)))",
              color: "#ffffff",
              boxShadow: "0 4px 24px var(--accent-glow)",
              fontFamily: "var(--font-body)",
            }}
          >
            Book a demo →
          </BookingButton>
        </motion.div>
      )}
    </motion.nav>
  );
};
