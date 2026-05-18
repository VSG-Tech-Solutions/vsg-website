"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowRight, ArrowUpRight, Sparkles } from "lucide-react";
import { MorphingBlob } from "./MorphingBlob";

/**
 * Hero — clean asymmetric layout.
 *
 *   • LEFT  (col-7) — eyebrow chip · big bold headline · subhead ·
 *                     dual CTAs · live-status line
 *   • RIGHT (col-5) — the MorphingBlob, in its own column
 *
 * No big product mockup in the hero. The Procurement Feature
 * section below already shows the full product UI — no need to
 * duplicate. This keeps the hero genuinely clean.
 *
 * Single ambient effect: the blob (morphs + rotates + breathes +
 * tracks the cursor). Plus the site-wide CursorSpotlight. That's it.
 */

const ORANGE = "#FF6B2C";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-stack > *",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.15,
        },
      );
      gsap.fromTo(
        ".hero-blob-wrapper",
        { scale: 0.92, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
          delay: 0.4,
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ background: "hsl(var(--bg))" }}
    >
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16 pt-32 sm:pt-40 pb-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center min-h-[78svh]">
          {/* LEFT — content */}
          <div className="hero-stack lg:col-span-7 max-w-2xl">
            {/* Eyebrow chip */}
            <div
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full backdrop-blur-md"
              style={{
                background: "rgba(255,107,44,0.08)",
                border: "1px solid rgba(255,107,44,0.28)",
              }}
            >
              <Sparkles
                className="w-3.5 h-3.5"
                style={{ color: ORANGE }}
                strokeWidth={2}
              />
              <span
                className="text-[10px] uppercase tracking-[0.32em] font-bold"
                style={{ color: ORANGE }}
              >
                Built in Cape Town · Edition 2026
              </span>
            </div>

            {/* Headline — bold sans, left-aligned */}
            <h1
              className="mt-7 text-text-primary"
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 800,
                fontSize: "clamp(2.75rem, 6.4vw, 5.75rem)",
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
              }}
            >
              AI products built
              <br />
              to ship the work.
            </h1>

            {/* Subhead */}
            <p className="mt-7 max-w-xl text-base md:text-lg text-muted leading-relaxed">
              Standalone AI for procurement and receiving. Sold direct
              to operations teams and to ERP partners. Two products
              live today — four more launching through 2026.
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white hover:scale-[1.04] transition-transform duration-200"
                style={{
                  background: `linear-gradient(180deg, #FF8A4F 0%, ${ORANGE} 100%)`,
                  boxShadow: `0 14px 40px -10px rgba(255,107,44,0.6), inset 0 1px 0 rgba(255,255,255,0.20)`,
                }}
              >
                <span>See the products</span>
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2}
                />
              </Link>
              <Link
                href="mailto:stephan@vsgtech.co.za"
                className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold border text-text-primary backdrop-blur-md hover:bg-surface transition-colors"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  background: "rgba(15,15,18,0.50)",
                }}
              >
                <span>Talk to a founder</span>
                <ArrowUpRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </Link>
            </div>

            {/* Live status line */}
            <div className="mt-8 flex items-center gap-2.5 text-[12px] text-muted">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: ORANGE }}
              />
              <span>
                <span className="text-text-primary font-medium">
                  Procurement
                </span>
                <span style={{ color: ORANGE }}> + </span>
                <span className="text-text-primary font-medium">
                  Receiving
                </span>{" "}
                shipping today
              </span>
            </div>
          </div>

          {/* RIGHT — MorphingBlob in its own column */}
          <div className="lg:col-span-5 hidden lg:block">
            <div
              className="hero-blob-wrapper relative w-full"
              style={{
                aspectRatio: "1 / 1",
                maxWidth: 540,
                marginLeft: "auto",
                willChange: "transform, opacity",
              }}
            >
              <MorphingBlob />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
