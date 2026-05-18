"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { VsgLogo } from "./VsgLogo";

/**
 * Navbar — Frame.io school.
 *
 * Full-width transparent bar sitting flush at the top. NOT a floating
 * pill. Uses backdrop blur once the user scrolls past the hero so the
 * content underneath is readable through it.
 *
 *   • Left  — VSG logo (mark + wordmark)
 *   • Centre / left of right — primary nav (Products dropdown,
 *             Work, About, Pricing-soon)
 *   • Right — Contact link · "Let's talk" white pill CTA
 */

type NavLink = { label: string; href: string };

const PRIMARY_LINKS: NavLink[] = [
  { label: "Work", href: "/case-studies" },
  { label: "About", href: "/about" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!productsOpen) return;
    const onDocClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [productsOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);
  const productsActive = pathname?.startsWith("/products");

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b" : ""
      }`}
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.78)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(140%)" : "none",
        borderColor: "rgba(255, 255, 255, 0.06)",
      }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-12">
        <div className="flex items-center justify-between h-[68px] gap-4">
          {/* LEFT — Logo */}
          <Link
            href="/"
            aria-label="VSG home"
            className="flex items-center text-text-primary hover:opacity-90 transition-opacity"
          >
            <VsgLogo size={22} />
          </Link>

          {/* CENTRE — primary nav (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-1">
            {/* Products dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                type="button"
                onClick={() => setProductsOpen((o) => !o)}
                aria-haspopup="menu"
                aria-expanded={productsOpen}
                className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-medium rounded-md transition-colors ${
                  productsActive
                    ? "text-text-primary bg-white/[0.04]"
                    : "text-muted hover:text-text-primary hover:bg-white/[0.04]"
                }`}
              >
                <span>Products</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${
                    productsOpen ? "rotate-180" : ""
                  }`}
                  strokeWidth={2}
                />
              </button>

              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    role="menu"
                    className="absolute left-0 top-full mt-2 w-[360px] rounded-2xl backdrop-blur-xl p-2 shadow-2xl shadow-black/50"
                    style={{
                      background: "rgba(15, 15, 18, 0.95)",
                      border: "1px solid rgba(255, 255, 255, 0.10)",
                    }}
                  >
                    <div className="px-3 pt-2 pb-3 text-[10px] uppercase tracking-[0.28em] text-muted font-bold">
                      Currently shipping
                    </div>
                    {PRODUCTS.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        onClick={() => setProductsOpen(false)}
                        className="group flex items-start gap-3 rounded-xl p-3 transition-colors duration-150 hover:bg-white/[0.04]"
                      >
                        <span
                          className="mt-1 inline-block w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: "#FF6B2C" }}
                          aria-hidden
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-text-primary">
                              {p.name}
                            </span>
                            {p.status === "live" && (
                              <span className="text-[9px] uppercase tracking-[0.22em] text-muted font-bold">
                                · Live
                              </span>
                            )}
                          </div>
                          <div className="mt-1 text-[12px] leading-relaxed text-muted">
                            {p.tagline}
                          </div>
                        </div>
                        <ArrowUpRight
                          className="w-3.5 h-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                          strokeWidth={1.7}
                        />
                      </Link>
                    ))}
                    <div
                      className="mt-1 mx-3 mb-2 pt-3 border-t text-[11px] text-muted"
                      style={{ borderColor: "rgba(255,255,255,0.08)" }}
                    >
                      4 more launching through 2026.
                    </div>
                    <Link
                      href="/products"
                      onClick={() => setProductsOpen(false)}
                      className="mx-2 mb-1 flex items-center justify-between rounded-xl px-3 py-2.5 text-[12px] text-text-primary hover:bg-white/[0.04] transition-colors"
                    >
                      <span className="font-semibold">See all products</span>
                      <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.7} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Other primary links */}
            {PRIMARY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex items-center px-3 py-2 text-[13px] font-medium rounded-md transition-colors ${
                  isActive(link.href)
                    ? "text-text-primary bg-white/[0.04]"
                    : "text-muted hover:text-text-primary hover:bg-white/[0.04]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* RIGHT — Contact + Let's talk pill */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center text-[13px] font-medium text-muted hover:text-text-primary transition-colors px-3 py-2"
            >
              Contact
            </Link>

            <Link
              href="mailto:stephan@vsgtech.co.za"
              className="group inline-flex items-center gap-1.5 rounded-full px-4 sm:px-5 py-2 text-[13px] font-bold transition-transform duration-200 hover:scale-[1.04]"
              style={{
                background: "white",
                color: "#0A0A0A",
              }}
            >
              <span>Let&rsquo;s talk</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.4} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
