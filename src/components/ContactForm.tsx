"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { LinkedInIcon } from "./brand/LinkedInIcon";
import { CONTACT } from "@/lib/contact";
import { submitContactLead } from "@/app/actions/contact-lead";

type ProblemArea =
  | "Custom software"
  | "Custom AI"
  | "Workflow automation"
  | "Vantage"
  | "Something else";

const problemAreas: ProblemArea[] = [
  "Custom software",
  "Custom AI",
  "Workflow automation",
  "Vantage",
  "Something else",
];

/**
 * Primary contact form. Submits via the `submitContactLead` server action —
 * delivers via Resend if RESEND_API_KEY is set, otherwise logs to the server
 * console (so the lead is never silently lost in dev). The UI shows a real
 * confirmation screen on success and an inline error if validation fails.
 */
export const ContactForm: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    problem: "" as ProblemArea | "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setError(null);
    setPending(true);
    try {
      const result = await submitContactLead({
        name: form.name,
        email: form.email,
        company: form.company,
        phone: form.phone,
        problem: form.problem,
        message: form.message,
      });
      if (result.ok) {
        setDelivered(result.delivered);
        setSubmitted(true);
      } else {
        setError(result.error);
      }
    } catch {
      setError(
        "Something went wrong sending your enquiry. Please try again or email stephan@vsgtech.co.za directly."
      );
    } finally {
      setPending(false);
    }
  };

  const fieldStyle: React.CSSProperties = {
    borderColor: "var(--card-border)",
    background: "var(--card-bg)",
    color: "var(--fg)",
    fontFamily: "var(--font-body)",
  };

  return (
    <section
      id="contact-form"
      className="relative w-full py-24 border-t"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
        {/* Form column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
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
            <span>Request an assessment</span>
          </div>
          <h2
            className="mt-5 text-3xl sm:text-4xl font-bold leading-tight tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Welcome to the VSG family.
          </h2>
          <p
            className="mt-3 text-sm leading-relaxed max-w-xl"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Drop us a line — we&apos;d love to meet you. We reply within one
            working day, everything stays confidential under POPIA, and
            we&apos;ll tell you honestly whether Vantage is the right fit for
            where you are.
          </p>

          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              className="mt-8 grid gap-4 sm:grid-cols-2"
            >
              <label className="flex flex-col gap-2">
                <span
                  className="text-xs uppercase tracking-[0.15em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Name
                </span>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="rounded-xl border px-4 py-3 text-sm outline-none transition-colors themed-rounded"
                  style={fieldStyle}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span
                  className="text-xs uppercase tracking-[0.15em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Work email
                </span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  className="rounded-xl border px-4 py-3 text-sm outline-none transition-colors themed-rounded"
                  style={fieldStyle}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span
                  className="text-xs uppercase tracking-[0.15em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Company
                </span>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, company: e.target.value }))
                  }
                  className="rounded-xl border px-4 py-3 text-sm outline-none transition-colors themed-rounded"
                  style={fieldStyle}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span
                  className="text-xs uppercase tracking-[0.15em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Phone (optional)
                </span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className="rounded-xl border px-4 py-3 text-sm outline-none transition-colors themed-rounded"
                  style={fieldStyle}
                />
              </label>
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span
                  className="text-xs uppercase tracking-[0.15em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  What shape is the problem?
                </span>
                <select
                  required
                  value={form.problem}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      problem: e.target.value as ProblemArea,
                    }))
                  }
                  className="rounded-xl border px-4 py-3 text-sm outline-none transition-colors themed-rounded appearance-none"
                  style={{
                    ...fieldStyle,
                    colorScheme: "dark",
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2367e8f9' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 0.85rem center",
                    paddingRight: "2.25rem",
                  }}
                >
                  <option
                    value=""
                    disabled
                    style={{ background: "#0b0f1a", color: "#e5e7eb" }}
                  >
                    Pick the closest fit…
                  </option>
                  {problemAreas.map((p) => (
                    <option
                      key={p}
                      value={p}
                      style={{ background: "#0b0f1a", color: "#e5e7eb" }}
                    >
                      {p}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span
                  className="text-xs uppercase tracking-[0.15em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  A few lines on what&apos;s broken
                </span>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, message: e.target.value }))
                  }
                  placeholder="e.g. Finance spends 3 days a month reconciling Syspro invoices against POs — errors get caught too late, and auditors keep flagging it."
                  className="rounded-xl border px-4 py-3 text-sm outline-none resize-y transition-colors themed-rounded"
                  style={fieldStyle}
                />
              </label>

              {error && (
                <div
                  className="sm:col-span-2 rounded-xl border px-4 py-3 text-sm"
                  style={{
                    borderColor: "color-mix(in oklab, #ef4444 50%, var(--card-border))",
                    background: "color-mix(in oklab, #ef4444 10%, var(--card-bg))",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                  role="alert"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={pending}
                className="sm:col-span-2 group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer themed-rounded disabled:opacity-70 disabled:cursor-wait"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                  color: "#ffffff",
                  boxShadow: "0 0 30px var(--accent-glow)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {pending ? "Sending…" : "Send enquiry"}
                {!pending && (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>

              <p
                className="sm:col-span-2 text-[11px] leading-relaxed"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                By submitting you agree we may contact you about your enquiry.
                We don&apos;t add you to any marketing list without asking. See
                our{" "}
                <a
                  href="/privacy"
                  style={{ color: "var(--accent-2)", textDecoration: "underline" }}
                >
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-2xl border p-8 flex items-start gap-4 themed-rounded"
              style={{
                borderColor: "var(--ring)",
                background: "var(--accent-soft)",
              }}
            >
              <CheckCircle2
                className="w-6 h-6 shrink-0 mt-0.5"
                style={{ color: "var(--accent-2)" }}
              />
              <div>
                <div
                  className="text-base font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  {delivered
                    ? "Got it — thanks, " + (form.name.split(" ")[0] || "we'll be in touch")
                    : "Got it — we have your message."}
                </div>
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {delivered ? (
                    <>
                      Your enquiry landed in {CONTACT.founder.name.split(" ")[0]}&apos;s
                      inbox — most replies inside a few hours, latest within one
                      working day. We&apos;ll come back honestly on whether Vantage is
                      the right fit for where you are.
                    </>
                  ) : (
                    <>
                      We&apos;ve recorded your enquiry and will follow up within one
                      working day. If you&apos;d rather reach out directly, write to{" "}
                      <a
                        href={`mailto:${CONTACT.founder.email}`}
                        style={{ color: "var(--accent-2)" }}
                      >
                        {CONTACT.founder.email}
                      </a>
                      .
                    </>
                  )}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Side column — direct channels + booking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col gap-5"
        >
          <div
            className="rounded-2xl border p-6 themed-rounded"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card-bg)",
            }}
          >
            <div
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background: "var(--bg-elev)",
                color: "var(--accent-2)",
              }}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <h3
              className="mt-4 text-lg font-semibold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fg)",
              }}
            >
              Prefer to book directly?
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              Pick a 20-minute slot that works for you. We&apos;ll walk through
              Vantage on your stack and talk through where a pilot makes sense.
            </p>
            <a
              href="mailto:stephan@vsgtech.co.za?subject=Booking%20request"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium"
              style={{
                color: "var(--accent-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Request a booking link
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

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
            <div
              className="mt-5 pt-5 border-t text-xs leading-relaxed"
              style={{
                borderColor: "var(--card-border)",
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              {CONTACT.location}
              <br />
              {CONTACT.timezone} · {CONTACT.compliance}
            </div>
          </div>

          {/* Founder direct line */}
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
                Skip the relay. Reach the founder directly — most replies inside a few hours.
              </p>
              <a
                href={`mailto:${CONTACT.founder.email}`}
                className="mt-4 flex items-center gap-2.5 text-sm transition-colors"
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
        </motion.div>
      </div>
    </section>
  );
};
