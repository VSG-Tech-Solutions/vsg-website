import Link from "next/link";
import { ArrowRight, Factory, Shield, Megaphone } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { PageBanner } from "@/components/PageBanner";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "Case studies — Real pilots, published as they complete",
  description:
    "VSG is in active pilot discovery with mid-market distribution, insurance and marketing clients. Real case studies publish here as each pilot completes — no placeholder companies, no invented outcomes.",
};

const pipeline = [
  {
    icon: Factory,
    vertical: "Manufacturing & distribution",
    stage: "In active discovery",
    focus:
      "Supplier exception handling and PO-mismatch resolution for a 60-person distributor on Syspro. The pilot brief: reduce time-to-resolution on short-shipments from days to hours, with an auditable trail for the annual review.",
  },
  {
    icon: Shield,
    vertical: "Insurance",
    stage: "Scoping conversations",
    focus:
      "Bordereaux controls and claims front-door workflow for a specialty insurer. The brief: catch inbound claims the moment they land, classify by policy + severity, and route to the right adjuster with SLA timers.",
  },
  {
    icon: Megaphone,
    vertical: "Marketing services",
    stage: "Scoping conversations",
    focus:
      "Client-request intake and approval routing for an agency drowning in Slack and email. The brief: every client request captured, tracked through brief → draft → review → delivery with a visible status at every stage.",
  },
];

export default function CaseStudiesPage() {
  return (
    <SiteShell>
      <PageBanner
        eyebrow="Case studies"
        title="Real pilots —"
        highlight="published as each one lands."
        lede="We're pre-pilot and honest about it. Three case studies are in active scoping: one manufacturing distributor, one specialty insurer, one marketing agency. When each pilot closes its five-week window, the real write-up publishes here — with real numbers, a named outcome, and a reference call on request. We won't invent client names to look bigger than we are."
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
              Each one is a five-week fixed-scope pilot. Full write-ups
              publish here as each completes — including the things that
              didn&apos;t work, the exception volumes measured, and the
              production handover notes.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {pipeline.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.vertical}
                  className="relative rounded-2xl border p-7 overflow-hidden themed-rounded"
                  style={{
                    borderColor: "var(--card-border)",
                    background:
                      "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 50%, transparent))",
                  }}
                >
                  <div
                    className="pointer-events-none absolute -top-16 -right-16 w-[180px] h-[180px] rounded-full blur-[60px] opacity-30"
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
                      className="mt-5 text-[10px] uppercase tracking-[0.25em]"
                      style={{
                        color: "var(--accent-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {p.stage}
                    </div>
                    <h3
                      className="mt-2 text-lg font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--fg)",
                      }}
                    >
                      {p.vertical}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {p.focus}
                    </p>
                  </div>
                </div>
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
