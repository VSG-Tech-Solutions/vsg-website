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
  title: "Case studies — Real pilots, published as they complete",
  description:
    "VSG is in active pilot discovery with mid-market distribution, insurance and marketing clients. Real case studies publish here as each pilot completes — no placeholder companies, no invented outcomes.",
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
  return (
    <SiteShell>
      <PageBanner
        eyebrow="Case studies"
        title="Real pilots —"
        highlight="published as each one lands."
        lede="We're pre-pilot and honest about it. Three case studies are in active scoping: one manufacturing distributor, one specialty insurer, one marketing agency. Click any card to read the full brief, what we'll measure, and the current status. When each pilot closes its five-week window, the real write-up — with numbers, named outcome and a reference call on request — replaces the brief in place."
      />

      <section
        className="relative w-full py-16 overflow-hidden"
        style={{ background: "var(--bg)", color: "var(--fg)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          {/* Pipeline section */}
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
              <span>Active pipeline</span>
            </div>
            <h2
              className="mt-5 text-3xl sm:text-4xl font-bold leading-tight tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fg)",
              }}
            >
              Three pilots currently in scope.
            </h2>
            <p
              className="mt-4 text-base sm:text-lg leading-relaxed"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              Each one is a five-week fixed-scope pilot. Click a card to read
              the full brief, the success metrics we&apos;ll measure, and the
              current status. Full write-ups publish here as each completes —
              including the things that didn&apos;t work, the exception volumes
              measured, and the production handover notes.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
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
                      <span>Read the brief</span>
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
                Why there aren&apos;t fake logos here
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
                from us.&quot; Until we can prove a result with a named
                customer, a real number, and a reference call on request,
                there&apos;s nothing to publish. In the meantime, the Vantage
                product page shows the system working end-to-end, and the
                commercial model (a scoped five-week pilot with a named
                success outcome, contracted on day one) is how we put our own
                money behind the claim.
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
