import Image from "next/image";
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
  Wrench,
  Activity,
  CheckCircle2,
  Clock,
  Monitor,
  Quote,
  ExternalLink,
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
  const otherStudies = caseStudies.filter((c) => c.slug !== study.slug);

  return (
    <SiteShell>
      {/* Hero — minimal editorial */}
      <section
        className="relative w-full pt-28 sm:pt-40 pb-16"
        style={{ background: "var(--bg)", color: "var(--fg)" }}
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] transition-colors hover:opacity-80"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to case studies
          </Link>

          <div
            className="mt-12 flex items-center gap-2 text-[11px] uppercase tracking-[0.22em]"
            style={{
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              aria-hidden
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent-2)" }}
            />
            <Icon className="w-3.5 h-3.5" strokeWidth={1.6} />
            <span>{study.stage} · {study.vertical}</span>
          </div>
          <h1
            className="mt-5 font-extrabold leading-[1.02]"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--fg)",
              fontSize: "clamp(2.4rem, 6vw, 4.5rem)",
              letterSpacing: "-0.025em",
            }}
          >
            {study.headline}
          </h1>
          <p
            className="mt-7 text-base sm:text-lg leading-relaxed max-w-3xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {study.summary}
          </p>
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
            {/* Problem */}
            <div>
              <SectionEyebrow icon={ClipboardList} label="The problem" />
              <div
                className="mt-5 space-y-4 text-base leading-relaxed"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {study.problem.map((p, i) => (
                  <p key={i} style={i === 0 ? { color: "var(--fg)" } : {}}>
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Approach */}
            <div>
              <SectionEyebrow icon={Wrench} label="The approach" />
              <div
                className="mt-5 space-y-4 text-base leading-relaxed"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {study.approach.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            {/* Inside the platform — screenshot gallery */}
            {study.screenshots && study.screenshots.length > 0 && (
              <div>
                <SectionEyebrow icon={Monitor} label="Inside the platform" />
                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  {study.screenshots.map((shot, i) => (
                    <figure
                      key={shot.src}
                      className="rounded-2xl border overflow-hidden themed-rounded"
                      style={{
                        borderColor: "var(--card-border)",
                        background: "var(--card-bg)",
                      }}
                    >
                      <div
                        className="relative w-full"
                        style={{
                          aspectRatio: "16 / 10",
                          background: "var(--bg-elev)",
                        }}
                      >
                        <Image
                          src={shot.src}
                          alt={shot.alt}
                          fill
                          sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
                          className="object-cover object-top"
                          priority={i === 0}
                        />
                      </div>
                      <figcaption
                        className="px-5 py-4 text-sm leading-relaxed border-t"
                        style={{
                          color: "var(--muted)",
                          fontFamily: "var(--font-body)",
                          borderColor: "var(--card-border)",
                        }}
                      >
                        {shot.caption}
                      </figcaption>
                    </figure>
                  ))}
                </div>
                <p
                  className="mt-4 text-xs leading-relaxed"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Client logo, real names, banking fields and partner
                  identifiers redacted at the client&apos;s request. Sample
                  data shown in place of live records.
                </p>
              </div>
            )}

            {/* What we delivered */}
            <div>
              <SectionEyebrow icon={Target} label="What we delivered" />
              <ul className="mt-5 space-y-3">
                {study.delivered.map((m, i) => (
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

            {/* Outcome */}
            {study.outcome && study.outcome.length > 0 && (
              <div>
                <SectionEyebrow icon={CheckCircle2} label="The result" />
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

            {/* Featured client quote */}
            {study.quote && (
              <figure
                className="relative rounded-2xl border p-7 sm:p-8 themed-rounded overflow-hidden"
                style={{
                  borderColor:
                    "color-mix(in oklab, var(--accent-2) 35%, var(--card-border))",
                  background:
                    "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 10%, var(--card-bg)), var(--card-bg))",
                }}
              >
                <Quote
                  className="absolute top-5 right-5 w-8 h-8 opacity-25"
                  style={{ color: "var(--accent-2)" }}
                  strokeWidth={1.5}
                />
                <blockquote
                  className="relative text-xl sm:text-2xl font-semibold leading-snug tracking-tight"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  &ldquo;{study.quote.text}&rdquo;
                </blockquote>
                <figcaption
                  className="mt-4 text-sm leading-relaxed"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  — {study.quote.attribution}
                </figcaption>
              </figure>
            )}

            {/* Ongoing */}
            {study.ongoing && study.ongoing.length > 0 && (
              <div>
                <SectionEyebrow icon={Clock} label="Ongoing — in build" />
                <ul className="mt-5 space-y-3">
                  {study.ongoing.map((o, i) => (
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
                            "color-mix(in oklab, var(--accent-2) 12%, transparent)",
                          border:
                            "1px solid color-mix(in oklab, var(--accent-2) 35%, var(--card-border))",
                        }}
                      >
                        <Clock
                          className="w-3 h-3"
                          style={{ color: "var(--accent-2)" }}
                          strokeWidth={2.4}
                        />
                      </span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-5">
            {/* Engagement card */}
            <div
              className="rounded-2xl border p-6 themed-rounded"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--accent-2) 30%, var(--card-border))",
                background:
                  "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 8%, var(--card-bg)), var(--card-bg))",
              }}
            >
              <div
                className="text-[10px] uppercase tracking-[0.25em] mb-3"
                style={{
                  color: "var(--accent-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Engagement
              </div>
              <div className="space-y-3">
                <div>
                  <div
                    className="text-[11px] uppercase tracking-[0.18em] mb-1"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Client
                  </div>
                  <div
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {study.client}
                  </div>
                  {study.clientUrl && (
                    <a
                      href={study.clientUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-xs font-semibold underline-offset-4 hover:underline"
                      style={{
                        color: "var(--accent-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <span>
                        {study.clientUrl
                          .replace(/^https?:\/\//, "")
                          .replace(/\/$/, "")}
                      </span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div>
                  <div
                    className="text-[11px] uppercase tracking-[0.18em] mb-1"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Size
                  </div>
                  <div
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {study.size}
                  </div>
                </div>
                {study.engagement && (
                  <div>
                    <div
                      className="text-[11px] uppercase tracking-[0.18em] mb-1"
                      style={{
                        color: "var(--muted-2)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      Engagement
                    </div>
                    <div
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--muted)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {study.engagement}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Current status card */}
            <div
              className="rounded-2xl border p-6 themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background: "var(--card-bg)",
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

            {/* Pending quote honesty panel */}
            {study.pendingQuote && (
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
                  Client quote
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  We&apos;re collecting a quote from the client sponsor. Until
                  it&apos;s in writing we won&apos;t invent one — the result
                  bullets above are what shipped, signed off by the team
                  running the platform every day.
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

      {/* Other case studies — only render when there are others to show */}
      {otherStudies.length > 0 && (
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
              Other case studies
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {otherStudies.map((c) => {
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
      )}

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
