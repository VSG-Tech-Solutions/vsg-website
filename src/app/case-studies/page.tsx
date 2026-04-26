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
import { PageBanner } from "@/components/PageBanner";
import { CTA } from "@/components/CTA";
import {
  caseStudies,
  type CaseStudyIcon,
} from "@/lib/case-studies";

export const metadata = {
  title: "Case studies — Real engagements, published with client sign-off",
  description:
    "VSG ships real platforms for South African SMEs. Each case study published here is a real engagement with real client sign-off — no placeholder logos, no invented outcomes.",
};

// Icon registry — keeps the lucide imports inside the page (server component)
// while letting the data file stay JSON-friendly.
const iconMap: Record<CaseStudyIcon, LucideIcon> = {
  Factory,
  Shield,
  Megaphone,
  Building2,
  Truck,
};

export default function CaseStudiesPage() {
  const count = caseStudies.length;
  return (
    <SiteShell>
      <PageBanner
        eyebrow="Case studies"
        title="Real engagements —"
        highlight="published with client sign-off."
        lede="Real platforms we shipped, with real clients. Each case study is the full engagement: the problem before, the architecture, what's live in production now, and what's still in build. Clients are named where they've given permission, and anonymised where they've asked us to. Either way the architecture and outcome are real."
      />

      <section
        className="relative w-full py-16 overflow-hidden"
        style={{ background: "var(--bg)", color: "var(--fg)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          {/* Live engagements */}
          <div className="max-w-3xl">
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
              <span>Live engagements</span>
            </div>
            <h2
              className="mt-5 text-3xl sm:text-4xl font-bold leading-tight tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fg)",
              }}
            >
              {count === 1
                ? "One published case study so far."
                : `${count} published case studies so far.`}
            </h2>
            <p
              className="mt-4 text-base sm:text-lg leading-relaxed"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              Click through for the full engagement: the problem before, the
              architecture, what we delivered, what&apos;s live in production
              now, and what&apos;s still in build for phase 2. Client name is
              redacted at the client&apos;s request — everything else is real.
            </p>
          </div>

          <div
            className={
              count === 1
                ? "mt-12 grid gap-5 md:grid-cols-1 max-w-2xl"
                : count === 2
                  ? "mt-12 grid gap-5 md:grid-cols-2"
                  : "mt-12 grid gap-5 md:grid-cols-3"
            }
          >
            {caseStudies.map((c) => {
              const Icon = iconMap[c.iconName];
              return (
                <Link
                  key={c.slug}
                  href={`/case-studies/${c.slug}`}
                  className="group relative rounded-2xl border p-7 overflow-hidden themed-rounded transition-all duration-300 hover:-translate-y-1"
                  style={{
                    borderColor: "var(--card-border)",
                    background:
                      "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 50%, transparent))",
                  }}
                >
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-[180px] h-[180px] rounded-full blur-[60px] opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                    style={{ background: "var(--accent-glow)" }}
                  />
                  <div className="relative">
                    <div
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 themed-rounded"
                      style={{
                        borderColor: "var(--accent-2)",
                        background:
                          "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 12%, var(--bg-elev)), var(--bg-elev))",
                        boxShadow: "0 0 20px var(--accent-glow)",
                      }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: "var(--accent-2)" }}
                        strokeWidth={1.8}
                      />
                    </div>
                    <div
                      className="mt-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em]"
                      style={{
                        color: "var(--accent-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: "var(--accent-2)" }}
                      />
                      {c.stage}
                    </div>
                    <h3
                      className="mt-2 text-lg font-semibold leading-tight"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--fg)",
                      }}
                    >
                      {c.vertical}
                    </h3>
                    <p
                      className="mt-1 text-sm font-medium leading-snug"
                      style={{
                        color: "var(--fg)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {c.headline}
                    </p>
                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {c.summary}
                    </p>
                    <div
                      className="mt-5 pt-4 border-t flex items-center gap-2 text-sm font-semibold"
                      style={{
                        borderColor: "var(--card-border)",
                        color: "var(--accent-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <span>Read the case study</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Honesty panel */}
          <div
            className="relative mt-16 rounded-2xl border p-8 sm:p-10 overflow-hidden themed-rounded"
            style={{
              borderColor:
                "color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
              background:
                "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 10%, var(--card-bg)), var(--card-bg))",
            }}
          >
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-[260px] h-[260px] rounded-full blur-[70px] opacity-60"
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
                Why there aren&apos;t more logos here yet
              </div>
              <h3
                className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fg)",
                }}
              >
                Every other early SaaS puts made-up client logos on this page.
                We won&apos;t.
              </h3>
              <p
                className="mt-4 text-base leading-relaxed max-w-2xl"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                A case study is a promise — &quot;this business got this result
                from us.&quot; The funeral insurance distribution write-up
                above is real, with the client&apos;s sign-off on the result
                bullets and a quote landing once the sponsor signs off the
                wording. Future engagements publish here the same way: real
                client, real architecture, real outcome — or we don&apos;t
                publish them at all. The Vantage product page shows the
                operations system working end-to-end, and the commercial model
                (a scoped five-week pilot with a named success outcome,
                contracted on day one) is how we put our own money behind the
                claim.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link
                  href="/vantage"
                  className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer themed-rounded"
                  style={{
                    background:
                      "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                    color: "#ffffff",
                    boxShadow: "0 0 28px var(--accent-glow)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span>See Vantage in detail</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 themed-rounded"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--bg-elev)",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Request a pilot slot
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA variant="minimal" />
    </SiteShell>
  );
}
