import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Factory,
  Shield,
  Megaphone,
  Building2,
  Truck,
  Target,
  ClipboardList,
  Activity,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { CTA } from "@/components/CTA";
import {
  caseStudies,
  getCaseStudyBySlug,
  type CaseStudyIcon,
} from "@/lib/case-studies";

const iconMap: Record<CaseStudyIcon, LucideIcon> = {
  Factory,
  Shield,
  Megaphone,
  Building2,
  Truck,
};

// Pre-render every case study at build time. Updates only ship when a new
// slug is added to lib/case-studies.ts.
export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudyBySlug(slug);
  if (!c) return { title: "Case study not found" };
  return {
    title: `${c.vertical} — Case study`,
    description: c.summary,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const Icon = iconMap[study.iconName];

  return (
    <SiteShell>
      {/* Hero */}
      <section
        className="relative w-full pt-20 pb-16 overflow-hidden"
        style={{ background: "var(--bg)", color: "var(--fg)" }}
      >
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] rounded-full blur-[180px] opacity-40"
          style={{ background: "var(--accent-glow)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to case studies
          </Link>

          <div className="mt-10 flex items-start gap-5">
            <div
              className="hidden sm:inline-flex items-center justify-center w-14 h-14 rounded-2xl border-2 themed-rounded shrink-0"
              style={{
                borderColor: "var(--accent-2)",
                background:
                  "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 14%, var(--bg-elev)), var(--bg-elev))",
                boxShadow: "0 0 24px var(--accent-glow)",
              }}
            >
              <Icon
                className="w-6 h-6"
                style={{ color: "var(--accent-2)" }}
                strokeWidth={1.8}
              />
            </div>
            <div>
              <div
                className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]"
                style={{
                  color: "var(--accent-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "var(--accent-2)" }}
                />
                {study.stage} · {study.vertical}
              </div>
              <h1
                className="mt-3 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fg)",
                }}
              >
                {study.headline}
              </h1>
              <p
                className="mt-5 text-base sm:text-lg leading-relaxed max-w-3xl"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {study.summary}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section
        className="relative w-full py-16 border-t"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="mx-auto max-w-5xl px-6 grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main column */}
          <div className="space-y-12">
            {/* The brief */}
            <div>
              <SectionEyebrow icon={ClipboardList} label="The brief" />
              <div
                className="mt-5 space-y-4 text-base leading-relaxed"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {study.brief.map((p, i) => (
                  <p key={i} style={i === 0 ? { color: "var(--fg)" } : {}}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Success metrics */}
            <div>
              <SectionEyebrow icon={Target} label="What we'll measure" />
              <ul className="mt-5 space-y-3">
                {study.successMetrics.map((m, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-base leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5"
                      style={{
                        background:
                          "color-mix(in oklab, var(--accent-2) 20%, transparent)",
                        border:
                          "1px solid color-mix(in oklab, var(--accent-2) 55%, var(--card-border))",
                      }}
                    >
                      <CheckCircle2
                        className="w-3 h-3"
                        style={{ color: "var(--accent-2)" }}
                        strokeWidth={2.6}
                      />
                    </span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome (only shown when published) */}
            {study.published && study.outcome && study.outcome.length > 0 && (
              <div>
                <SectionEyebrow icon={CheckCircle2} label="Outcome" />
                <ul className="mt-5 space-y-3">
                  {study.outcome.map((o, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base leading-relaxed"
                      style={{
                        color: "var(--fg)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <CheckCircle2
                        className="w-5 h-5 mt-0.5 shrink-0"
                        style={{ color: "var(--accent-2)" }}
                      />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div
              className="rounded-2xl border p-6 themed-rounded"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--accent-2) 30%, var(--card-border))",
                background:
                  "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 8%, var(--card-bg)), var(--card-bg))",
              }}
            >
              <SectionEyebrow icon={Activity} label="Current status" />
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {study.currentStatus}
              </p>
            </div>

            {!study.published && (
              <div
                className="rounded-2xl border p-6 themed-rounded"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--card-bg)",
                }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.25em] mb-2"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Honest pre-pilot status
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  No outcome numbers yet — we won&apos;t invent them. The
                  full case study, including the things that didn&apos;t work
                  and the production handover notes, replaces this brief
                  in place once the pilot completes.
                </p>
              </div>
            )}

            <Link
              href="/pilot"
              className="group flex items-center justify-between gap-3 rounded-2xl border p-5 themed-rounded transition-all duration-300"
              style={{
                borderColor: "var(--card-border)",
                background: "var(--bg-elev)",
              }}
            >
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.25em]"
                  style={{
                    color: "var(--accent-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Pilot cohort
                </div>
                <div
                  className="mt-1 text-sm font-semibold"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Open a similar pilot for your business
                </div>
              </div>
              <ArrowRight
                className="w-5 h-5 shrink-0 transition-transform group-hover:translate-x-1"
                style={{ color: "var(--accent-2)" }}
              />
            </Link>
          </aside>
        </div>
      </section>

      {/* Other case studies */}
      <section
        className="relative w-full py-16 border-t"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div
            className="text-[11px] uppercase tracking-[0.25em] mb-6"
            style={{
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            Other pilots in scope
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {caseStudies
              .filter((c) => c.slug !== study.slug)
              .map((c) => {
                const OtherIcon = iconMap[c.iconName];
                return (
                  <Link
                    key={c.slug}
                    href={`/case-studies/${c.slug}`}
                    className="group rounded-2xl border p-6 themed-rounded transition-all duration-300 hover:-translate-y-1"
                    style={{
                      borderColor: "var(--card-border)",
                      background: "var(--card-bg)",
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="inline-flex items-center justify-center w-10 h-10 rounded-xl border-2 themed-rounded shrink-0"
                        style={{
                          borderColor: "var(--accent-2)",
                          background:
                            "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 12%, var(--bg-elev)), var(--bg-elev))",
                        }}
                      >
                        <OtherIcon
                          className="w-4 h-4"
                          style={{ color: "var(--accent-2)" }}
                          strokeWidth={1.8}
                        />
                      </div>
                      <div className="flex-1">
                        <div
                          className="text-[10px] uppercase tracking-[0.25em]"
                          style={{
                            color: "var(--accent-2)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {c.vertical}
                        </div>
                        <div
                          className="mt-1 text-sm font-semibold leading-snug"
                          style={{
                            color: "var(--fg)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {c.headline}
                        </div>
                      </div>
                      <ArrowRight
                        className="w-4 h-4 mt-2 shrink-0 transition-transform group-hover:translate-x-1"
                        style={{ color: "var(--accent-2)" }}
                      />
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </section>

      <CTA variant="minimal" />
    </SiteShell>
  );
}

const SectionEyebrow: React.FC<{ icon: LucideIcon; label: string }> = ({
  icon: Icon,
  label,
}) => (
  <div
    className="flex items-center gap-2 text-[11px] uppercase tracking-[0.25em]"
    style={{ color: "var(--accent-2)", fontFamily: "var(--font-body)" }}
  >
    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
    {label}
  </div>
);
