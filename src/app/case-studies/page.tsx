import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  Factory,
  Shield,
  Megaphone,
  Building2,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/patterns/Section";
import { Eyebrow } from "@/components/patterns/Eyebrow";
import { DisplayHead } from "@/components/patterns/DisplayHead";
import { EndCTA } from "@/components/patterns/EndCTA";
import {
  caseStudies,
  type CaseStudy,
  type CaseStudyIcon,
} from "@/lib/case-studies";

export const metadata = {
  title:
    "Case studies — Real engagements, published with client sign-off",
  description:
    "Real platforms VSG has shipped, with real clients. Each case study is a real engagement with the client's sign-off — anonymised only when the client requests it.",
};

const iconMap: Record<CaseStudyIcon, LucideIcon> = {
  Factory,
  Shield,
  Megaphone,
  Building2,
  Truck,
};

export default function CaseStudiesPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <Section
        compact
        divider={false}
        className="pt-32 sm:pt-44"
        width="full"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-8">
              <Eyebrow variant="dot">Case studies</Eyebrow>
              <div className="mt-7">
                <DisplayHead
                  level="h1"
                  accent="published with client sign-off."
                >
                  Real engagements,
                </DisplayHead>
              </div>
              <p
                className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Real platforms we shipped, with real clients. Every
                case study below is a real engagement — named where
                the client gave permission, anonymised only when they
                asked us to. Each one links to the full deep-dive: the
                problem before, the architecture, what shipped, and
                the measurable outcome.
              </p>
            </div>

            {/* Stats lockup */}
            <div className="lg:col-span-4">
              <div
                className="rounded-2xl p-6 grid grid-cols-3 gap-2 text-center"
                style={{
                  background:
                    "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 24px 60px -24px rgba(0, 0, 0, 0.55)",
                }}
              >
                <Stat value={String(caseStudies.length)} label="Published" amber />
                <Stat value="0" label="Fictional" />
                <Stat value="100%" label="Client sign-off" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Featured case studies — full-width editorial cards.
          Light tone — dark cards on cream canvas, the editorial pattern. */}
      <Section width="full" tone="light">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="space-y-6 lg:space-y-7">
            {caseStudies.map((c, i) => (
              <CaseStudyEditorial
                key={c.slug}
                study={c}
                Icon={iconMap[c.iconName]}
                flipped={i % 2 === 1}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* End CTA */}
      <Section spacious>
        <EndCTA
          eyebrow="Open a similar pilot"
          title="Your engagement"
          accent="next on this page."
          body="A 30-minute scoping call to pick the first workflow, agree the success metric, and lock the cohort terms. We publish the outcome — named, with sign-off — when the pilot completes."
          primaryLabel="Book a 20-minute demo"
          secondaryLabel="stephan@vsgtech.co.za"
        />
      </Section>
    </SiteShell>
  );
}

/* ---------------- subcomponents ---------------- */

const Stat: React.FC<{
  value: string;
  label: string;
  amber?: boolean;
}> = ({ value, label, amber }) => (
  <div>
    <div
      className="font-extrabold leading-none"
      style={{
        color: amber ? "var(--accent)" : "var(--fg)",
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
        letterSpacing: "-0.02em",
      }}
    >
      {value}
    </div>
    <div
      className="mt-2 text-[10px] uppercase tracking-[0.22em] font-semibold"
      style={{
        color: "var(--muted-2)",
        fontFamily: "var(--font-body)",
      }}
    >
      {label}
    </div>
  </div>
);

const CaseStudyEditorial: React.FC<{
  study: CaseStudy;
  Icon: LucideIcon;
  flipped: boolean;
}> = ({ study: c, Icon, flipped }) => {
  return (
    <Link
      href={`/case-studies/${c.slug}`}
      className="on-dark-card group block relative rounded-3xl overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.07)",
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div
        className={`grid lg:grid-cols-12 ${
          flipped ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* Visual panel — uses the first screenshot when available, falls
            back to the icon treatment when the case study has none yet. */}
        {c.screenshots && c.screenshots.length > 0 ? (
          <div
            className="lg:col-span-5 relative overflow-hidden min-h-[280px] lg:min-h-[420px] lg:[direction:ltr]"
            style={{
              background:
                "linear-gradient(135deg, #0E0E12 0%, #050507 100%)",
              borderRight: flipped
                ? "none"
                : "1px solid rgba(255, 255, 255, 0.06)",
              borderLeft: flipped
                ? "1px solid rgba(255, 255, 255, 0.06)"
                : "none",
            }}
          >
            {/* Faint warm wash so the screenshot sits on a brand-tinted
                surface, not flat black. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 0%, rgba(244,168,114,0.10) 0%, transparent 60%)",
              }}
            />

            {/* Screenshot — pinned with breathing room. Shifts on hover for
                the "live UI" feel without leaving the frame. */}
            <div className="absolute inset-0 flex items-center justify-center p-7 sm:p-10">
              <div
                className="relative w-full aspect-[16/10] rounded-xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.015]"
                style={{
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow:
                    "0 30px 80px -30px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <Image
                  src={c.screenshots[0].src}
                  alt={c.screenshots[0].alt}
                  fill
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="object-cover object-left-top"
                />
              </div>
            </div>

            {/* Tiny watermark — vertical label so the screenshot reads as
                a case-study artifact, not a screenshot stripped of context. */}
            <div
              className="absolute bottom-5 left-6 text-[10px] uppercase tracking-[0.28em] font-mono pointer-events-none flex items-center gap-2"
              style={{
                color: "var(--accent)",
                fontFamily:
                  "var(--font-space-mono), ui-monospace, monospace",
              }}
            >
              <Icon className="w-3 h-3" strokeWidth={1.6} />
              <span>{c.vertical}</span>
            </div>

            {/* "Live screenshot" chip top-right */}
            <div className="absolute top-5 right-5">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9.5px] uppercase tracking-[0.22em] font-semibold"
                style={{
                  background:
                    "color-mix(in srgb, var(--bg) 60%, transparent)",
                  border: "1px solid rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "var(--font-body)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                }}
              >
                <span
                  className="inline-block w-1 h-1 rounded-full"
                  style={{ background: "var(--accent)" }}
                />
                Live screenshot
              </span>
            </div>
          </div>
        ) : (
          <div
            className="lg:col-span-5 relative overflow-hidden flex items-center justify-center p-10 sm:p-14 min-h-[280px] lg:min-h-[420px] lg:[direction:ltr]"
            style={{
              background:
                "linear-gradient(135deg, rgba(244,168,114,0.08) 0%, rgba(244,168,114,0.02) 60%, rgba(255,255,255,0.01) 100%)",
              borderRight: flipped
                ? "none"
                : "1px solid rgba(255, 255, 255, 0.06)",
              borderLeft: flipped
                ? "1px solid rgba(255, 255, 255, 0.06)"
                : "none",
            }}
          >
            {/* Soft glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, rgba(244,168,114,0.12) 0%, transparent 60%)",
              }}
            />

            {/* Big icon as visual focal point */}
            <div
              className="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(244,168,114,0.16) 0%, rgba(244,168,114,0.04) 100%)",
                border: "1px solid var(--card-border-accent-strong)",
                boxShadow:
                  "inset 0 1px 0 rgba(244,168,114,0.20), 0 20px 50px -20px rgba(244,168,114,0.30)",
              }}
            >
              <Icon
                className="w-10 h-10"
                style={{ color: "var(--accent)" }}
                strokeWidth={1.4}
              />
            </div>

            {/* Vertical label badge under icon */}
            <div
              className="absolute bottom-6 left-6 right-6 text-[10px] uppercase tracking-[0.28em] font-mono"
              style={{
                color: "var(--accent)",
                fontFamily:
                  "var(--font-space-mono), ui-monospace, monospace",
              }}
            >
              {c.vertical}
            </div>
          </div>
        )}

        {/* Content panel */}
        <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col lg:[direction:ltr]">
          {/* Top row — stage pill + arrow */}
          <div className="flex items-center justify-between">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.22em] font-semibold"
              style={{
                background: "var(--accent-soft)",
                border: "1px solid var(--card-border-accent)",
                color: "var(--accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                className="inline-block w-1 h-1 rounded-full animate-pulse"
                style={{ background: "var(--accent)" }}
              />
              {c.stage}
            </span>
            <span
              className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.10)",
                color: "var(--fg)",
              }}
            >
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} />
            </span>
          </div>

          {/* Headline */}
          <h3
            className="mt-8 font-extrabold leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--fg)",
              fontSize: "clamp(1.55rem, 2.6vw, 2.2rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
            }}
          >
            {c.headline}
          </h3>

          {/* Client + size */}
          <div
            className="mt-4 text-[13px] leading-relaxed"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              {c.client}
            </span>{" "}
            · {c.size}
          </div>

          {/* Summary */}
          <p
            className="mt-5 text-[15px] leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {c.summary}
          </p>

          {/* Outcome chips — first 3 outcomes */}
          {c.outcome.length > 0 && (
            <div
              className="mt-7 pt-6 border-t flex flex-col gap-2.5"
              style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-1"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Outcome
              </div>
              {c.outcome.slice(0, 3).map((o, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-[13px] leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span
                    className="mt-2 w-1 h-1 rounded-full shrink-0"
                    style={{ background: "var(--accent)" }}
                  />
                  <span>{o}</span>
                </div>
              ))}
            </div>
          )}

          {/* Footer row — read CTA */}
          <div
            className="mt-8 pt-5 border-t flex items-center justify-between"
            style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
          >
            <span
              className="text-[14px] font-semibold"
              style={{
                color: "var(--fg)",
                fontFamily: "var(--font-body)",
              }}
            >
              Read the full case study
            </span>
            <span
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] font-semibold"
              style={{
                color: "var(--accent)",
                fontFamily: "var(--font-body)",
              }}
            >
              {c.outcome.length}+ outcomes
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
