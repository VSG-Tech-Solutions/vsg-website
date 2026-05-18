import { Mail, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/patterns/Section";
import { Eyebrow } from "@/components/patterns/Eyebrow";
import { DisplayHead } from "@/components/patterns/DisplayHead";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "Contact — Talk to a founder, no relay",
  description:
    "Direct line to the VSG founders. Questions, pilot requests, or just curious about what we do — we reply within one working day, every time.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      {/* Hero — wide, two-column with promise card on the right */}
      <Section compact divider={false} className="pt-32 sm:pt-44" width="full">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-14">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <Eyebrow variant="dot">Talk to a founder</Eyebrow>
              <div className="mt-7">
                <DisplayHead level="h1" accent="straight to the founder.">
                  Two ways in —
                </DisplayHead>
              </div>
              <p
                className="mt-8 max-w-xl text-lg sm:text-xl leading-relaxed"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Send a brief through the form, or email a founder
                directly. No sales relay, no qualification script. Both
                founders read every message and reply within one
                working day.
              </p>
            </div>

            {/* Reply-promise card — establishes premium tone */}
            <div className="lg:col-span-5">
              <div
                className="relative rounded-2xl p-7 sm:p-8 overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{
                      background: "var(--accent-soft)",
                      border: "1px solid var(--card-border-accent)",
                    }}
                  >
                    <Clock
                      className="w-4 h-4"
                      style={{ color: "var(--accent)" }}
                      strokeWidth={1.6}
                    />
                  </span>
                  <div
                    className="text-[10px] uppercase tracking-[0.32em] font-semibold"
                    style={{
                      color: "var(--accent)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    Reply promise
                  </div>
                </div>
                <div
                  className="mt-6 font-bold leading-none"
                  style={{
                    color: "var(--fg)",
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(2rem, 3.4vw, 2.6rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Within one working day.
                </div>
                <p
                  className="mt-4 text-[14px] leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Not a chatbot, not a sales rep, not an auto-responder. A
                  real reply from a founder, every time. If we
                  can&rsquo;t help, we&rsquo;ll say so on day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Main — form left (wide), founder lockup right (clean) */}
      <Section width="full">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8 lg:px-14">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20">
            {/* Form column */}
            <div className="lg:col-span-8">
              <Eyebrow variant="slash">Send a brief</Eyebrow>
              <div className="mt-6">
                <DisplayHead level="h2">
                  Tell us what you&apos;re trying to fix.
                </DisplayHead>
              </div>
              <p
                className="mt-6 text-base leading-relaxed max-w-xl"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                The more specific the better. Which workflow leaks
                days? Which exception types pile up? What does
                &quot;done&quot; look like for you? Both founders read
                every message.
              </p>
              <div className="mt-12">
                <ContactForm />
              </div>
            </div>

            {/* Founders column — premium card stack */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 self-start">
              <Eyebrow variant="dot">Founder direct</Eyebrow>
              <div className="mt-6">
                <DisplayHead level="h2" accent="founder.">
                  Email a
                </DisplayHead>
              </div>
              <p
                className="mt-5 text-[15px] leading-relaxed max-w-md"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Skip the form. Send straight to either of us. We read
                every message ourselves.
              </p>

              {/* Founder cards */}
              <div className="mt-8 grid gap-3">
                {[
                  CONTACT.founders.stephan,
                  CONTACT.founders.ernst,
                ].map((f) => (
                  <Link
                    key={f.email}
                    href={`mailto:${f.email}`}
                    className="group relative rounded-2xl p-5 overflow-hidden block"
                    style={{
                      background:
                        "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.07)",
                      boxShadow:
                        "inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 18px 40px -20px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div
                          className="text-[10px] uppercase tracking-[0.28em] font-semibold"
                          style={{
                            color: "var(--muted-2)",
                            fontFamily: "var(--font-body)",
                          }}
                        >
                          {f.role}
                        </div>
                        <div
                          className="mt-1.5 font-bold"
                          style={{
                            color: "var(--fg)",
                            fontFamily: "var(--font-display)",
                            fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {f.name}
                        </div>
                        <div
                          className="mt-1.5 text-[13px] font-mono"
                          style={{
                            color: "var(--accent)",
                            fontFamily:
                              "var(--font-space-mono), ui-monospace, monospace",
                          }}
                        >
                          {f.email}
                        </div>
                      </div>
                      <span
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                        style={{
                          background: "var(--accent-soft)",
                          border: "1px solid var(--card-border-accent)",
                          color: "var(--accent)",
                        }}
                      >
                        <ArrowUpRight
                          className="w-4 h-4"
                          strokeWidth={1.8}
                        />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Company contact strip */}
              <div
                className="mt-8 rounded-2xl divide-y overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, var(--card-bg-elev) 0%, var(--card-bg-elev-2) 100%)",
                  border: "1px solid rgba(255, 255, 255, 0.07)",
                }}
              >
                <CompanyRow
                  icon={Mail}
                  label="Company inbox"
                  value={CONTACT.company.email}
                  href={`mailto:${CONTACT.company.email}`}
                />
                <CompanyRow
                  icon={Phone}
                  label="Phone"
                  value={CONTACT.company.phone}
                  href={CONTACT.company.phoneHref}
                />
                <CompanyRow
                  icon={MapPin}
                  label="Location"
                  value={CONTACT.location}
                />
              </div>
            </div>
          </div>
        </div>
      </Section>
    </SiteShell>
  );
}

const CompanyRow: React.FC<{
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}> = ({ icon: Icon, label, value, href }) => {
  const inner = (
    <div className="flex items-center gap-4 px-5 py-4">
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          border: "1px solid rgba(255, 255, 255, 0.10)",
        }}
      >
        <Icon
          className="w-4 h-4"
          style={{ color: "rgba(255,255,255,0.85)" }}
          strokeWidth={1.6}
        />
      </span>
      <div className="flex-1 min-w-0">
        <div
          className="text-[10px] uppercase tracking-[0.22em] font-semibold"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          {label}
        </div>
        <div
          className="mt-0.5 text-[13px] truncate"
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-body)",
          }}
        >
          {value}
        </div>
      </div>
      {href && (
        <ArrowUpRight
          className="w-3.5 h-3.5 shrink-0"
          style={{ color: "var(--muted-2)" }}
          strokeWidth={1.8}
        />
      )}
    </div>
  );

  return href ? (
    <Link
      href={href}
      className="block transition-colors duration-200 hover:bg-white/[0.02]"
      style={{
        borderColor: "rgba(255, 255, 255, 0.06)",
      }}
    >
      {inner}
    </Link>
  ) : (
    <div style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}>{inner}</div>
  );
};
