"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, ArrowUpRight, Calendar } from "lucide-react";
import { LinkedInIcon } from "./brand/LinkedInIcon";
import { CONTACT } from "@/lib/contact";
import { BookingButton } from "./BookingButton";

type CTAVariant = "pilot" | "demo" | "book" | "founder" | "minimal";

interface CTAProps {
  variant?: CTAVariant;
  showDirectory?: boolean;
}

const copy: Record<
  CTAVariant,
  {
    eyebrow: string;
    headline: string;
    highlight: string;
    sub: string;
    primaryCta: string;
    secondaryCta: string;
  }
> = {
  pilot: {
    eyebrow: "Pilot cohort opening now",
    headline: "Stop losing days to",
    highlight: "exception chaos.",
    sub: "Book a 20-minute call. We'll look at your exceptions, show you Vantage on your stack, and tell you honestly whether a pilot makes sense.",
    primaryCta: "Book a demo",
    secondaryCta: "stephan@vsgtech.co.za",
  },
  demo: {
    eyebrow: "See Vantage on your stack",
    headline: "Your ERP. Your workflows.",
    highlight: "On one live screen.",
    sub: "20 minutes. We bring your ERP of choice, mock an exception, and walk through how Vantage catches it, classifies it, routes it, and closes the loop. No slides.",
    primaryCta: "Book a walkthrough",
    secondaryCta: "stephan@vsgtech.co.za",
  },
  book: {
    eyebrow: "Pilot · 5 weeks · first workflow live",
    headline: "Ready to run the pilot?",
    highlight: "Let's lock the scope.",
    sub: "A 30-minute scoping call to pick the first workflow, agree success criteria, and set the 5-week timeline. If it's a fit, we kick off within two weeks.",
    primaryCta: "Start the pilot",
    secondaryCta: "stephan@vsgtech.co.za",
  },
  founder: {
    eyebrow: "Founder direct · no gatekeeping",
    headline: "Skip the relay.",
    highlight: "Talk to Stephan.",
    sub: "No SDR, no discovery deck, no qualification script. A direct line to the founder for a real conversation about whether VSG is the right fit.",
    primaryCta: "Message Stephan",
    secondaryCta: "Book 20 minutes",
  },
  minimal: {
    eyebrow: "Let's talk",
    headline: "Every exception has",
    highlight: "a pattern. Let's find yours.",
    sub: "A 20-minute call is usually enough to know whether a pilot makes sense.",
    primaryCta: "Book a demo",
    secondaryCta: "stephan@vsgtech.co.za",
  },
};

export const CTA: React.FC<CTAProps> = ({
  variant = "pilot",
  showDirectory = true,
}) => {
  const c = copy[variant];
  const isFounderVariant = variant === "founder";

  return (
    <section
      id="contact"
      className="relative w-full py-32 overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl border p-10 sm:p-16 lg:p-20 themed-rounded"
          style={{
            borderColor: "var(--card-border)",
            background:
              "linear-gradient(to bottom right, color-mix(in oklab, var(--accent) 8%, var(--bg-elev)), var(--bg), var(--bg))",
          }}
        >
          <div
            className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-[120px]"
            style={{ background: "var(--accent-glow)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full blur-[120px] opacity-60"
            style={{ background: "var(--accent-glow)" }}
          />
          <div className="relative text-center">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs uppercase tracking-[0.2em] mb-8 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background: "var(--card-bg)",
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                className="h-1 w-1 rounded-full animate-pulse"
                style={{ background: "var(--accent)" }}
              />
              {c.eyebrow}
            </div>
            <h2
              className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight max-w-4xl mx-auto"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fg)",
              }}
            >
              {c.headline}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom right, var(--accent-2), var(--accent), color-mix(in oklab, var(--accent) 60%, black))",
                  filter: "drop-shadow(0 0 30px var(--accent-glow))",
                }}
              >
                {c.highlight}
              </span>
            </h2>
            <p
              className="mt-6 max-w-xl mx-auto text-lg"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              {c.sub}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isFounderVariant ? (
                <a
                  href={`mailto:${CONTACT.founder.email}`}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 cursor-pointer themed-rounded"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 70%, var(--accent-2)))",
                    color: "#ffffff",
                    boxShadow: "0 0 40px var(--accent-glow)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span>{c.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              ) : (
                <BookingButton
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold transition-all duration-300 cursor-pointer themed-rounded"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent), color-mix(in oklab, var(--accent) 70%, var(--accent-2)))",
                    color: "#ffffff",
                    boxShadow: "0 0 40px var(--accent-glow)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{c.primaryCta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </BookingButton>
              )}
              {isFounderVariant ? (
                <BookingButton
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border font-semibold transition-all duration-300 cursor-pointer themed-rounded"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--card-bg)",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Calendar className="w-4 h-4" />
                  {c.secondaryCta}
                </BookingButton>
              ) : (
                <a
                  href={`mailto:${CONTACT.founder.email}`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border font-semibold transition-all duration-300 cursor-pointer themed-rounded"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--card-bg)",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Mail className="w-4 h-4" />
                  {c.secondaryCta}
                </a>
              )}
            </div>

            {/* Two-channel directory — company vs founder direct line */}
            {showDirectory && (
              <div
                className="mt-14 pt-10 border-t grid gap-5 sm:grid-cols-2 text-left max-w-3xl mx-auto"
                style={{ borderColor: "var(--card-border)" }}
              >
                {/* Company channel */}
                <div
                  className="rounded-2xl border p-6 themed-rounded"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--card-bg)",
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.25em]"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    VSG Tech Solutions
                  </div>
                  <h4
                    className="mt-2 text-base font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--fg)",
                    }}
                  >
                    Talk to the team
                  </h4>
                  <div className="mt-4 space-y-2.5 text-sm">
                    <a
                      href={`mailto:${CONTACT.company.email}`}
                      className="flex items-center gap-2.5 transition-colors"
                      style={{
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--fg)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--muted)")
                      }
                    >
                      <Mail
                        className="w-4 h-4 shrink-0"
                        style={{ color: "var(--accent-2)" }}
                      />
                      {CONTACT.company.email}
                    </a>
                    <a
                      href={CONTACT.company.phoneHref}
                      className="flex items-center gap-2.5 transition-colors"
                      style={{
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--fg)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLAnchorElement).style.color =
                          "var(--muted)")
                      }
                    >
                      <Phone
                        className="w-4 h-4 shrink-0"
                        style={{ color: "var(--accent-2)" }}
                      />
                      {CONTACT.company.phone}
                    </a>
                  </div>
                  <a
                    href={CONTACT.company.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 group inline-flex items-center justify-between gap-3 w-full px-4 py-2.5 rounded-xl border font-medium text-sm transition-all duration-200 themed-rounded"
                    style={{
                      borderColor: "var(--card-border)",
                      background: "var(--bg-elev)",
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--accent-2)";
                      el.style.boxShadow = "0 0 24px var(--accent-glow)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.borderColor = "var(--card-border)";
                      el.style.boxShadow = "none";
                    }}
                  >
                    <span className="inline-flex items-center gap-2.5">
                      <LinkedInIcon
                        size={18}
                        style={{ color: "var(--accent-2)" }}
                      />
                      {CONTACT.company.linkedinLabel}
                    </span>
                    <ArrowUpRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ color: "var(--accent-2)" }}
                    />
                  </a>
                </div>

                {/* Founder direct channel */}
                <div
                  className="relative rounded-2xl border p-6 themed-rounded overflow-hidden"
                  style={{
                    borderColor:
                      "color-mix(in oklab, var(--accent-2) 35%, var(--card-border))",
                    background:
                      "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 8%, var(--card-bg)), var(--card-bg))",
                  }}
                >
                  <div
                    className="pointer-events-none absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full blur-[60px] opacity-60"
                    style={{ background: "var(--accent-glow)" }}
                  />
                  <div className="relative">
                    <div
                      className="text-[10px] uppercase tracking-[0.25em]"
                      style={{
                        color: "var(--accent-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Direct line · Founder
                    </div>
                    <h4
                      className="mt-2 text-base font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--fg)",
                      }}
                    >
                      {CONTACT.founder.name} — {CONTACT.founder.role}
                    </h4>
                    <p
                      className="mt-1 text-xs leading-relaxed"
                      style={{
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Skip the relay. Reach me directly.
                    </p>
                    <div className="mt-4 space-y-2.5 text-sm">
                      <a
                        href={`mailto:${CONTACT.founder.email}`}
                        className="flex items-center gap-2.5 transition-colors"
                        style={{
                          color: "var(--muted)",
                          fontFamily: "var(--font-body)",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--fg)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--muted)")
                        }
                      >
                        <Mail
                          className="w-4 h-4 shrink-0"
                          style={{ color: "var(--accent-2)" }}
                        />
                        {CONTACT.founder.email}
                      </a>
                    </div>
                    <a
                      href={CONTACT.founder.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 group inline-flex items-center justify-between gap-3 w-full px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 themed-rounded"
                      style={{
                        background:
                          "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 75%, black))",
                        color: "#ffffff",
                        boxShadow: "0 0 28px var(--accent-glow)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <span className="inline-flex items-center gap-2.5">
                        <LinkedInIcon size={18} />
                        {CONTACT.founder.linkedinLabel}
                      </span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            <p
              className="mt-8 text-xs"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              {CONTACT.location} · {CONTACT.compliance}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
