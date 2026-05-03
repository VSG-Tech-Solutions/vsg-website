import Link from "next/link";
import {
  ArrowRight,
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
import { caseStudies, type CaseStudyIcon } from "@/lib/case-studies";

export const metadata = {
  title: "Case studies — Real engagements, published with client sign-off",
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
      <Section compact divider={false} className="pt-32 sm:pt-44">
        <Eyebrow variant="dot">Case studies</Eyebrow>
        <div className="mt-7 max-w-4xl">
          <DisplayHead level="h1" accent="published with client sign-off.">
            Real engagements,
          </DisplayHead>
          <p
            className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Real platforms we shipped, with real clients. Each case study is
            the full engagement: the problem before, the architecture, what&apos;s
            live in production now, and what&apos;s still in build. Clients are
            named where they&apos;ve given permission, and anonymised where
            they&apos;ve asked us to.
          </p>
        </div>
      </Section>

      {/* Case study grid — full-bleed editorial cards with hairline grid */}
      <Section>
        <div
          className="grid gap-px lg:grid-cols-2"
          style={{ background: "var(--card-border)" }}
        >
          {caseStudies.map((c) => {
            const Icon = iconMap[c.iconName];
            return (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group p-8 sm:p-10 lg:p-12 transition-colors duration-300"
                style={{ background: "var(--bg)" }}
              >
                <div className="flex items-start justify-between">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl border"
                    style={{
                      borderColor: "var(--card-border)",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--accent-2)" }}
                      strokeWidth={1.6}
                    />
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-[0.22em]"
                    style={{
                      color: "var(--accent-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {c.stage}
                  </span>
                </div>

                <div
                  className="mt-8 text-[10px] uppercase tracking-[0.22em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {c.vertical}
                </div>
                <h3
                  className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {c.headline}
                </h3>
                <p
                  className="mt-5 text-base leading-relaxed max-w-xl"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {c.summary}
                </p>

                <div
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
                  style={{
                    color: "var(--accent-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span>Read the case study</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* Honesty panel — minimal, type-only */}
      <Section>
        <div className="max-w-3xl">
          <Eyebrow>Why there aren&apos;t more logos here yet</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="We won't.">
              Every other early SaaS puts made-up client logos on this page.
            </DisplayHead>
          </div>
          <p
            className="mt-7 text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            A case study is a promise — &quot;this business got this result
            from us.&quot; Each one above is real, with the client&apos;s
            sign-off on the result bullets. Future engagements publish here
            the same way: real client, real architecture, real outcome — or
            we don&apos;t publish them at all. The Vantage product page
            shows the operations system working end-to-end, and the
            commercial model (a scoped five-week pilot with a named success
            outcome, contracted on day one) is how we put our own money
            behind the claim.
          </p>
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
