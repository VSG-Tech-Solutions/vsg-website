"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowRight,
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  Phone,
  MessageSquare,
  Lock,
} from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { submitPilotLead, type PilotLeadInput } from "@/app/actions/pilot-lead";
import { BookingButton } from "./BookingButton";

// Dedicated Pilot Promo lead form — sends straight to Stephan's inbox via the
// server action in src/app/actions/pilot-lead.ts.
// Keeps the fields tight: we don't want an enterprise SaaS form, we want a
// founder-to-founder intro.

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success"; delivered: boolean }
  | { kind: "error"; message: string };

const ERP_OPTIONS = ["Syspro", "SAP", "Sage", "NetSuite", "Dynamics", "Other / custom"];

export const PilotContactForm: React.FC = () => {
  const [form, setForm] = useState<PilotLeadInput>({
    name: "",
    company: "",
    email: "",
    phone: "",
    role: "",
    erp: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const update =
    <K extends keyof PilotLeadInput>(key: K) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "submitting") return;
    setStatus({ kind: "submitting" });

    try {
      const result = await submitPilotLead(form);
      if (!result.ok) {
        setStatus({ kind: "error", message: result.error });
        return;
      }
      setStatus({ kind: "success", delivered: result.delivered });
      setForm({
        name: "",
        company: "",
        email: "",
        phone: "",
        role: "",
        erp: "",
        message: "",
      });
    } catch {
      setStatus({
        kind: "error",
        message:
          "Something went wrong on our side. Email stephan@vsgtech.co.za directly and we'll get back to you fast.",
      });
    }
  };

  return (
    <section
      id="apply"
      className="relative w-full py-24 sm:py-28 scroll-mt-24 overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full blur-[150px] opacity-40"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="relative mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] uppercase tracking-[0.25em] themed-rounded"
            style={{
              borderColor:
                "color-mix(in oklab, var(--accent-2) 55%, var(--card-border))",
              background:
                "color-mix(in oklab, var(--accent-2) 14%, transparent)",
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
            Apply for a pilot slot
          </div>
          <h2
            className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.02] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Tell us about your operation —{" "}
            <span style={{ color: "var(--accent-2)" }}>
              Stephan replies personally.
            </span>
          </h2>
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            No SDR, no qualification script, no marketing automation sequence.
            This form drops straight into the founder&apos;s inbox. Reply within
            one working day or it&apos;s on us.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mt-10 rounded-3xl border overflow-hidden themed-rounded"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent-2) 35%, var(--card-border))",
            background:
              "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 8%, var(--card-bg)), var(--card-bg) 60%, var(--bg-elev))",
          }}
        >
          <div
            className="pointer-events-none absolute -top-28 -right-28 w-[360px] h-[360px] rounded-full blur-[110px] opacity-60"
            style={{ background: "var(--accent-glow)" }}
          />

          <div className="relative p-6 sm:p-10 grid lg:grid-cols-[1.4fr_1fr] gap-8">
            {/* Left — fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                label="Your name"
                value={form.name}
                onChange={update("name")}
                placeholder="Jane Venter"
                required
              />
              <Field
                label="Company"
                value={form.company}
                onChange={update("company")}
                placeholder="Blackwood Industries"
                required
              />
              <Field
                label="Work email"
                type="email"
                value={form.email}
                onChange={update("email")}
                placeholder="jane@blackwood.co.za"
                required
              />
              <Field
                label="Mobile"
                type="tel"
                value={form.phone ?? ""}
                onChange={update("phone")}
                placeholder="+27 82 000 0000"
              />
              <Field
                label="Your role"
                value={form.role ?? ""}
                onChange={update("role")}
                placeholder="Ops Director, FM, CFO, IT Lead…"
              />
              <SelectField
                label="ERP you run"
                value={form.erp ?? ""}
                onChange={update("erp")}
                options={ERP_OPTIONS}
                placeholder="Select one…"
              />
              <div className="sm:col-span-2">
                <TextareaField
                  label="Where does work get stuck today?"
                  value={form.message}
                  onChange={update("message")}
                  placeholder="Two or three lines are plenty — e.g. 'AP mismatches pile up by 200/month, stuck approvals cost us 4 days, receiving discrepancies live in WhatsApp.'"
                  required
                  rows={5}
                />
              </div>
            </div>

            {/* Right — trust + submit */}
            <div className="flex flex-col gap-5">
              <div
                className="rounded-2xl border p-5 themed-rounded"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--bg-elev)",
                }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.25em] mb-3"
                  style={{
                    color: "var(--accent-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  What happens next
                </div>
                <ol
                  className="space-y-3 text-sm leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Step n={1} text="Stephan reads the message personally, same day." />
                  <Step
                    n={2}
                    text="You get a reply within one working day — a yes, a no, or a 'let's talk.'"
                  />
                  <Step
                    n={3}
                    text="30-minute scoping call → pilot slot offer in writing within 48 hours."
                  />
                </ol>
              </div>

              <button
                type="submit"
                disabled={status.kind === "submitting"}
                className="group inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer themed-rounded disabled:opacity-70 disabled:cursor-not-allowed"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                  color: "#ffffff",
                  boxShadow: "0 0 36px var(--accent-glow)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {status.kind === "submitting" ? (
                  <>
                    <Send className="w-4 h-4 animate-pulse" />
                    <span>Sending…</span>
                  </>
                ) : (
                  <>
                    <span>Send to Stephan</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Status */}
              {status.kind === "success" && (
                <div
                  className="rounded-xl border p-4 flex flex-col gap-3 text-sm leading-relaxed"
                  style={{
                    borderColor:
                      "color-mix(in oklab, var(--accent-2) 55%, var(--card-border))",
                    background:
                      "color-mix(in oklab, var(--accent-2) 10%, var(--bg-elev))",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 shrink-0 mt-0.5"
                      style={{ color: "var(--accent-2)" }}
                    />
                    <div>
                      <strong>Got it — on its way to Stephan.</strong>
                      {status.delivered ? (
                        <> You&apos;ll hear back within one working day.</>
                      ) : (
                        <>
                          {" "}
                          If you don&apos;t hear back in 24 hours, email{" "}
                          <a
                            href={`mailto:${CONTACT.founder.email}`}
                            style={{ color: "var(--accent-2)" }}
                          >
                            {CONTACT.founder.email}
                          </a>{" "}
                          directly.
                        </>
                      )}
                    </div>
                  </div>
                  <BookingButton
                    className="group inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 cursor-pointer themed-rounded"
                    style={{
                      background:
                        "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                      color: "#ffffff",
                      boxShadow: "0 0 24px var(--accent-glow)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span>Skip the wait — book a 20-min slot now</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </BookingButton>
                </div>
              )}
              {status.kind === "error" && (
                <div
                  className="rounded-xl border p-4 flex items-start gap-3 text-sm leading-relaxed"
                  style={{
                    borderColor:
                      "color-mix(in oklab, #f87171 60%, var(--card-border))",
                    background:
                      "color-mix(in oklab, #f87171 10%, var(--bg-elev))",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <AlertCircle
                    className="w-5 h-5 shrink-0 mt-0.5"
                    style={{ color: "#f87171" }}
                  />
                  <div>{status.message}</div>
                </div>
              )}

              <div
                className="text-[11px] leading-relaxed flex items-start gap-2"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Lock
                  className="w-3.5 h-3.5 shrink-0 mt-0.5"
                  style={{ color: "var(--accent-2)" }}
                />
                <span>
                  POPIA-aligned · your details are used only to reply to you.
                  We don&apos;t enrol you in newsletters or marketing
                  sequences. Ever.
                </span>
              </div>
            </div>
          </div>

          {/* Footer strip — direct channels */}
          <div
            className="relative border-t px-6 sm:px-10 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[12px]"
            style={{
              borderColor:
                "color-mix(in oklab, var(--accent-2) 25%, var(--card-border))",
              background:
                "linear-gradient(180deg, transparent, color-mix(in oklab, var(--accent-2) 6%, transparent))",
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span>Prefer to skip the form? Go direct:</span>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={`mailto:${CONTACT.founder.email}?subject=${encodeURIComponent("Pilot slot enquiry")}`}
                className="inline-flex items-center gap-1.5 transition-colors"
                style={{ color: "var(--fg)" }}
              >
                <Mail className="w-3.5 h-3.5" style={{ color: "var(--accent-2)" }} />
                {CONTACT.founder.email}
              </a>
              <a
                href={CONTACT.company.phoneHref}
                className="inline-flex items-center gap-1.5 transition-colors"
                style={{ color: "var(--fg)" }}
              >
                <Phone className="w-3.5 h-3.5" style={{ color: "var(--accent-2)" }} />
                {CONTACT.company.phone}
              </a>
              <a
                href={CONTACT.founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors"
                style={{ color: "var(--fg)" }}
              >
                <MessageSquare
                  className="w-3.5 h-3.5"
                  style={{ color: "var(--accent-2)" }}
                />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

// ---------- Sub-components ---------- //

const baseInputStyles = {
  background: "var(--bg-elev)",
  borderColor: "var(--card-border)",
  color: "var(--fg)",
  fontFamily: "var(--font-body)",
} as const;

const Field: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}> = ({ label, value, onChange, placeholder, required, type = "text" }) => (
  <label className="flex flex-col gap-1.5">
    <span
      className="text-[11px] uppercase tracking-[0.2em]"
      style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
    >
      {label}
      {required && (
        <span style={{ color: "var(--accent-2)", marginLeft: 4 }}>*</span>
      )}
    </span>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none transition-colors themed-rounded"
      style={baseInputStyles}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-2)";
        e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "var(--card-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  </label>
);

const SelectField: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
}> = ({ label, value, onChange, options, placeholder }) => (
  <label className="flex flex-col gap-1.5">
    <span
      className="text-[11px] uppercase tracking-[0.2em]"
      style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
    >
      {label}
    </span>
    <select
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none transition-colors cursor-pointer themed-rounded appearance-none"
      style={{
        ...baseInputStyles,
        colorScheme: "dark",
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2399a1ad' stroke-width='2.4' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 0.85rem center",
        paddingRight: "2.25rem",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-2)";
        e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "var(--card-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <option
        value=""
        style={{ background: "#0b0f1a", color: "#e5e7eb" }}
      >
        {placeholder ?? "Select…"}
      </option>
      {options.map((o) => (
        <option
          key={o}
          value={o}
          style={{ background: "#0b0f1a", color: "#e5e7eb" }}
        >
          {o}
        </option>
      ))}
    </select>
  </label>
);

const TextareaField: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}> = ({ label, value, onChange, placeholder, required, rows = 4 }) => (
  <label className="flex flex-col gap-1.5">
    <span
      className="text-[11px] uppercase tracking-[0.2em]"
      style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
    >
      {label}
      {required && (
        <span style={{ color: "var(--accent-2)", marginLeft: 4 }}>*</span>
      )}
    </span>
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className="w-full px-3.5 py-2.5 rounded-lg border text-sm outline-none resize-y transition-colors themed-rounded"
      style={baseInputStyles}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--accent-2)";
        e.currentTarget.style.boxShadow = "0 0 0 3px var(--accent-glow)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "var(--card-border)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  </label>
);

const Step: React.FC<{ n: number; text: string }> = ({ n, text }) => (
  <li className="flex items-start gap-3">
    <span
      className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0 text-[11px] font-bold tabular-nums mt-0.5"
      style={{
        background:
          "color-mix(in oklab, var(--accent-2) 20%, transparent)",
        border:
          "1px solid color-mix(in oklab, var(--accent-2) 55%, var(--card-border))",
        color: "var(--accent-2)",
        fontFamily: "var(--font-body)",
      }}
    >
      {n}
    </span>
    <span>{text}</span>
  </li>
);
