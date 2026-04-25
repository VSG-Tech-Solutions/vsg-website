"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock,
  Mail,
  Search,
  PhoneCall,
  FileWarning,
  Check,
  ArrowRight,
  Bell,
  Zap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// DayInLife — two-column "today vs tomorrow" timeline.
// Replaces the old 3-column comparison table (which leaned gimmicky with
// the "US" badge). This tells the same story — spreadsheet chaos vs
// Vantage control — but as a narrative a mid-market ops lead recognises.

type TimelineStep = {
  time: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  tag?: string;
};

const BEFORE: TimelineStep[] = [
  {
    time: "08:12",
    icon: Mail,
    title: "Invoice lands in the shared inbox",
    detail:
      "Supplier emails a PO-mismatched invoice. It sits with 140 others in finance@.",
    tag: "Email",
  },
  {
    time: "09:40",
    icon: Search,
    title: "Someone goes hunting",
    detail:
      "AP clerk opens SYSPRO, then the 'AP Discrepancies' spreadsheet, then Teams to ask the buyer about the PO.",
    tag: "Manual",
  },
  {
    time: "11:05",
    icon: PhoneCall,
    title: "Phone call loop",
    detail:
      "Buyer is on site. Clerk moves to the next invoice. This one drifts.",
    tag: "Dropped",
  },
  {
    time: "14:30",
    icon: FileWarning,
    title: "Stuck approval #47",
    detail:
      "A R180k credit note has been sitting with the FM for 6 days. Nobody notices until the supplier chases.",
    tag: "Invisible",
  },
  {
    time: "16:50",
    icon: AlertTriangle,
    title: "Month-end surprise",
    detail:
      "GRV variances discovered in close. Auditor asks for the trail. Nobody can produce it.",
    tag: "Audit risk",
  },
  {
    time: "17:45",
    icon: Clock,
    title: "Overtime, again",
    detail:
      "Finance stays late reconciling. Ops blames finance. Finance blames ops. Nothing actually changes.",
    tag: "Burnout",
  },
];

const AFTER: TimelineStep[] = [
  {
    time: "08:12",
    icon: Bell,
    title: "Vantage captures it on arrival",
    detail:
      "Invoice hits the mailbox, Vantage reads it, matches it to the PO, flags the variance, opens an exception with full context.",
    tag: "Auto",
  },
  {
    time: "08:13",
    icon: Zap,
    title: "Routed by rule",
    detail:
      "Variance > 5% → buyer for confirmation, CC finance. SLA clock starts. Owner knows, reviewer knows, manager knows.",
    tag: "Routed",
  },
  {
    time: "09:02",
    icon: Check,
    title: "Buyer resolves in 90 seconds",
    detail:
      "Quick approve on mobile with a one-line reason. Vantage updates the ERP and closes the exception.",
    tag: "Closed",
  },
  {
    time: "14:30",
    icon: ShieldCheck,
    title: "Nothing is stuck",
    detail:
      "Every open exception is visible on one queue with its owner, age, and SLA. The R180k credit note is already back with the requester.",
    tag: "Controlled",
  },
  {
    time: "16:50",
    icon: Sparkles,
    title: "AI proposes a new rule",
    detail:
      "Vantage AI: 'Supplier X has mismatched 4 invoices this month — auto-route to buyer and skip finance review?' Approve / decline.",
    tag: "Learning",
  },
  {
    time: "17:30",
    icon: Check,
    title: "Month-end is boring",
    detail:
      "Audit trail exports in one click. Variances are closed with reasons. Finance goes home on time. Ops too.",
    tag: "Quiet",
  },
];

const Column: React.FC<{
  heading: string;
  subheading: string;
  steps: TimelineStep[];
  tone: "before" | "after";
}> = ({ heading, subheading, steps, tone }) => {
  const isAfter = tone === "after";
  return (
    <div
      className="relative rounded-3xl border overflow-hidden themed-rounded"
      style={{
        borderColor: isAfter
          ? "color-mix(in oklab, var(--accent-2) 45%, var(--card-border))"
          : "var(--card-border)",
        background: isAfter
          ? "linear-gradient(180deg, color-mix(in oklab, var(--accent-2) 8%, var(--card-bg)), var(--card-bg) 60%, var(--bg-elev))"
          : "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 50%, var(--bg-elev)))",
      }}
    >
      {isAfter && (
        <div
          className="pointer-events-none absolute -top-16 -right-16 w-[220px] h-[220px] rounded-full blur-[70px] opacity-60"
          style={{ background: "var(--accent-glow)" }}
        />
      )}

      <div
        className="relative px-6 py-5 border-b flex items-center justify-between gap-4"
        style={{ borderColor: "var(--card-border)" }}
      >
        <div>
          <div
            className="text-[10px] uppercase tracking-[0.25em]"
            style={{
              color: isAfter ? "var(--accent-2)" : "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            {subheading}
          </div>
          <div
            className="mt-1 text-lg sm:text-xl font-semibold"
            style={{
              color: "var(--fg)",
              fontFamily: "var(--font-display)",
            }}
          >
            {heading}
          </div>
        </div>
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] themed-rounded"
          style={
            isAfter
              ? {
                  background:
                    "color-mix(in oklab, var(--accent-2) 18%, transparent)",
                  color: "var(--accent-2)",
                  border:
                    "1px solid color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
                  fontFamily: "var(--font-body)",
                }
              : {
                  background:
                    "color-mix(in oklab, #f87171 12%, transparent)",
                  color: "color-mix(in oklab, #f87171 90%, var(--fg))",
                  border:
                    "1px solid color-mix(in oklab, #f87171 30%, var(--card-border))",
                  fontFamily: "var(--font-body)",
                }
          }
        >
          {isAfter ? "With Vantage" : "Without Vantage"}
        </div>
      </div>

      <ol className="relative px-6 py-6 space-y-5">
        {/* vertical rail */}
        <span
          aria-hidden
          className="absolute left-[34px] top-8 bottom-8 w-px"
          style={{
            background: isAfter
              ? "color-mix(in oklab, var(--accent-2) 35%, transparent)"
              : "var(--card-border)",
          }}
        />
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: isAfter ? 12 : -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative flex gap-4"
            >
              <div
                className="relative z-10 flex items-center justify-center w-9 h-9 rounded-xl border shrink-0 themed-rounded"
                style={
                  isAfter
                    ? {
                        borderColor: "var(--accent-2)",
                        background:
                          "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 22%, var(--bg-elev)), var(--bg-elev))",
                        boxShadow: "0 0 14px var(--accent-glow)",
                      }
                    : {
                        borderColor: "var(--card-border)",
                        background: "var(--bg-elev)",
                      }
                }
              >
                <Icon
                  className="w-4 h-4"
                  strokeWidth={1.9}
                  style={{
                    color: isAfter ? "var(--accent-2)" : "var(--muted)",
                  }}
                />
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span
                    className="text-[11px] font-mono tabular-nums"
                    style={{
                      color: "var(--muted-2)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {step.time}
                  </span>
                  <span
                    className="text-sm font-semibold leading-tight"
                    style={{
                      color: "var(--fg)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    {step.title}
                  </span>
                  {step.tag && (
                    <span
                      className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] uppercase tracking-[0.18em] font-semibold themed-rounded"
                      style={
                        isAfter
                          ? {
                              background:
                                "color-mix(in oklab, var(--accent-2) 14%, transparent)",
                              color: "var(--accent-2)",
                            }
                          : {
                              background:
                                "color-mix(in oklab, #f87171 10%, transparent)",
                              color:
                                "color-mix(in oklab, #f87171 85%, var(--muted))",
                            }
                      }
                    >
                      {step.tag}
                    </span>
                  )}
                </div>
                <p
                  className="mt-1 text-[13px] leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {step.detail}
                </p>
              </div>
            </motion.li>
          );
        })}
      </ol>

      {/* summary footer */}
      <div
        className="relative px-6 py-5 border-t"
        style={{
          borderColor: "var(--card-border)",
          background: isAfter
            ? "color-mix(in oklab, var(--accent-2) 6%, transparent)"
            : "color-mix(in oklab, var(--bg-elev) 40%, transparent)",
        }}
      >
        <div className="grid grid-cols-3 gap-3">
          {(isAfter
            ? [
                { label: "Cycle time", value: "Minutes" },
                { label: "Audit trail", value: "One click" },
                { label: "Finished by", value: "17:30" },
              ]
            : [
                { label: "Cycle time", value: "Days" },
                { label: "Audit trail", value: "Rebuild it" },
                { label: "Finished by", value: "Late" },
              ]
          ).map((m) => (
            <div key={m.label}>
              <div
                className="text-[9px] uppercase tracking-[0.2em]"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {m.label}
              </div>
              <div
                className="mt-1 text-sm font-semibold"
                style={{
                  color: isAfter ? "var(--accent-2)" : "var(--fg)",
                  fontFamily: "var(--font-display)",
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const DayInLife: React.FC = () => {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div
        className="pointer-events-none absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-30"
        style={{ background: "var(--accent-glow)" }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full blur-[140px] opacity-25"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
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
            <span>A day in the life — same team, same volume</span>
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            The difference isn&apos;t more people.{" "}
            <span style={{ color: "var(--accent-2)" }}>
              It&apos;s a system that actually handles exceptions.
            </span>
          </h2>
          <p
            className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Two finance clerks. One 50-person distributor. Same Tuesday. The
            only thing that changes between these two timelines is whether
            Vantage is running underneath the ERP.
          </p>
        </motion.div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6">
          <Column
            tone="before"
            heading="Today, without Vantage"
            subheading="Spreadsheets, email, memory"
            steps={BEFORE}
          />
          <Column
            tone="after"
            heading="Tomorrow, with Vantage"
            subheading="One control layer, full trail"
            steps={AFTER}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border p-5 themed-rounded"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent-2) 30%, var(--card-border))",
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--accent-2) 8%, var(--card-bg)), var(--card-bg))",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border shrink-0 themed-rounded"
              style={{
                borderColor: "var(--accent-2)",
                background:
                  "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 22%, var(--bg-elev)), var(--bg-elev))",
              }}
            >
              <Sparkles
                className="w-5 h-5"
                style={{ color: "var(--accent-2)" }}
                strokeWidth={1.8}
              />
            </div>
            <div>
              <div
                className="text-sm font-semibold"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-display)",
                }}
              >
                Your team isn&apos;t the problem. The workflow is.
              </div>
              <div
                className="mt-1 text-xs sm:text-sm leading-relaxed max-w-xl"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Vantage doesn&apos;t replace anyone. It gives the people you
                already trust a place where nothing gets lost, nothing drifts,
                and every decision leaves a trail.
              </div>
            </div>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer themed-rounded shrink-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
              color: "#ffffff",
              boxShadow: "0 0 24px var(--accent-glow)",
              fontFamily: "var(--font-body)",
            }}
          >
            Walk my Tuesday with us
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
