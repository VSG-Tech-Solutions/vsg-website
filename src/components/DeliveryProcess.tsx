"use client";

import { motion } from "framer-motion";
import {
  Compass,
  PenTool,
  Hammer,
  TestTube2,
  Handshake,
  type LucideIcon,
} from "lucide-react";

// DeliveryProcess — a transparent weekly timeline of what a services
// engagement looks like from signed scope to handover. Built for
// procurement and IT leads who've been burned by "agile" as a synonym
// for "we'll figure it out." Every phase lists what YOU do and what WE
// do so the contract feels like a contract, not a blank cheque.

type Phase = {
  week: string;
  icon: LucideIcon;
  name: string;
  weDo: string[];
  youDo: string[];
  milestone: string;
};

const PHASES: Phase[] = [
  {
    week: "Week 1",
    icon: Compass,
    name: "Discovery & scope",
    weDo: [
      "Interview the people who'd use it — not just the budget holder",
      "Map the current workflow, forms, spreadsheets, systems in play",
      "Draft the deliverable list with measurable acceptance criteria",
    ],
    youDo: [
      "Line up 3–5 operator interviews (60 min each)",
      "Share sample data, screenshots, the current-state pain",
      "Confirm who signs off on scope and UAT",
    ],
    milestone: "Signed scope doc · fixed price quoted · timeline committed",
  },
  {
    week: "Week 2",
    icon: PenTool,
    name: "Design & architecture",
    weDo: [
      "Wireframes for every screen · click-through prototype in Figma",
      "Data model sketched — tables, fields, integration surfaces",
      "Infra plan — hosting, auth, backup, secrets, observability",
    ],
    youDo: [
      "Sign off on the prototype · name any must-change screens",
      "Introduce us to your IT / ERP owner if not already in the room",
      "Confirm deployment target (your Azure, ours, or on-prem)",
    ],
    milestone: "Design frozen · infra approved · build can start",
  },
  {
    week: "Weeks 3 – N",
    icon: Hammer,
    name: "Build — weekly demos",
    weDo: [
      "Shipping code every week, demo every Friday · all work source-controlled in a repo you own",
      "Continuous deploy to a staging environment you can log into any time",
      "Blocking issues surfaced same-day, never saved for a surprise on Friday",
    ],
    youDo: [
      "45 minutes a week on the demo call — feedback is the product",
      "Keep one named decision-maker on the project, not a rotating cast",
    ],
    milestone: "Every sprint: demoable increment · staging link shared · burndown updated",
  },
  {
    week: "Penultimate week",
    icon: TestTube2,
    name: "UAT & hardening",
    weDo: [
      "Run your team through a scripted UAT — what to click, what to expect",
      "Performance + load pass · penetration review for public-facing tools",
      "Documentation written — runbook, user guide, admin guide",
    ],
    youDo: [
      "Run UAT with your operators, not just the sponsor",
      "Log issues in one shared tracker — we triage within 24 hours",
    ],
    milestone: "UAT sign-off · go / no-go decision on production cutover",
  },
  {
    week: "Final week",
    icon: Handshake,
    name: "Cutover & handover",
    weDo: [
      "Production deploy with you on the call · rollback plan ready",
      "Walk-through for your ops team · record-and-share training",
      "30-day warranty on every delivered feature — bugs fixed free",
    ],
    youDo: [
      "Identify the internal owner going forward",
      "Book an optional 90-day check-in — free, no agenda, no upsell",
    ],
    milestone: "Go-live · source in your repo · 30-day warranty active",
  },
];

export const DeliveryProcess: React.FC = () => {
  return (
    <section
      id="process"
      className="relative w-full py-24 sm:py-28 overflow-hidden scroll-mt-24"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-0 w-[700px] h-[600px] rounded-full blur-[160px] opacity-30 -translate-y-1/2"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
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
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            How we deliver
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Every engagement, week by week —{" "}
            <span style={{ color: "var(--accent-2)" }}>
              on the record before you sign.
            </span>
          </h2>
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Five phases, clear milestones, and a full list of what we do and
            what you do at each stage. Nothing hidden, no scope surprises, no
            invoice you didn&apos;t expect.
          </p>
        </motion.div>

        <div className="mt-14 relative">
          {/* Vertical spine */}
          <div
            className="hidden md:block absolute left-[23px] top-4 bottom-4 w-px"
            style={{
              background:
                "linear-gradient(180deg, transparent, color-mix(in oklab, var(--accent-2) 60%, transparent) 10%, color-mix(in oklab, var(--accent-2) 60%, transparent) 90%, transparent)",
            }}
          />

          <ol className="space-y-5">
            {PHASES.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.li
                  key={p.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.06 }}
                  className="relative md:pl-16"
                >
                  {/* Node */}
                  <div
                    className="hidden md:flex absolute left-0 top-3 w-12 h-12 items-center justify-center rounded-xl border-2 themed-rounded z-10"
                    style={{
                      borderColor: "var(--accent-2)",
                      background:
                        "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 18%, var(--bg-elev)), var(--bg-elev))",
                      boxShadow: "0 0 16px var(--accent-glow)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--accent-2)" }}
                      strokeWidth={1.9}
                    />
                  </div>

                  <div
                    className="rounded-2xl border p-6 sm:p-7 themed-rounded"
                    style={{
                      borderColor: "var(--card-border)",
                      background:
                        "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
                    }}
                  >
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-3 md:hidden">
                        <div
                          className="inline-flex items-center justify-center w-10 h-10 rounded-xl border-2 themed-rounded"
                          style={{
                            borderColor: "var(--accent-2)",
                            background:
                              "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 18%, var(--bg-elev)), var(--bg-elev))",
                          }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: "var(--accent-2)" }}
                            strokeWidth={1.9}
                          />
                        </div>
                        <PhaseHeading week={p.week} name={p.name} />
                      </div>
                      <div className="hidden md:block">
                        <PhaseHeading week={p.week} name={p.name} />
                      </div>
                    </div>

                    <div className="mt-5 grid md:grid-cols-2 gap-5">
                      <Column title="We do" bullets={p.weDo} tone="accent" />
                      <Column title="You do" bullets={p.youDo} tone="muted" />
                    </div>

                    <div
                      className="mt-5 pt-4 border-t text-[13px] flex items-start gap-2"
                      style={{
                        borderColor: "var(--card-border)",
                        color: "var(--fg)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      <span
                        className="text-[10px] uppercase tracking-[0.22em] shrink-0 mt-1"
                        style={{ color: "var(--muted-2)" }}
                      >
                        Milestone
                      </span>
                      <span style={{ fontWeight: 600 }}>{p.milestone}</span>
                    </div>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

const PhaseHeading: React.FC<{ week: string; name: string }> = ({
  week,
  name,
}) => (
  <div>
    <div
      className="text-[10px] uppercase tracking-[0.25em]"
      style={{ color: "var(--accent-2)", fontFamily: "var(--font-body)" }}
    >
      {week}
    </div>
    <h3
      className="text-lg sm:text-xl font-semibold leading-snug tracking-tight mt-0.5"
      style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
    >
      {name}
    </h3>
  </div>
);

const Column: React.FC<{
  title: string;
  bullets: string[];
  tone: "accent" | "muted";
}> = ({ title, bullets, tone }) => (
  <div>
    <div
      className="text-[10px] uppercase tracking-[0.22em] mb-3"
      style={{
        color: tone === "accent" ? "var(--accent-2)" : "var(--muted-2)",
        fontFamily: "var(--font-body)",
      }}
    >
      {title}
    </div>
    <ul className="space-y-2.5">
      {bullets.map((b) => (
        <li
          key={b}
          className="flex items-start gap-2.5 text-[13px] leading-relaxed"
          style={{
            color: tone === "accent" ? "var(--fg)" : "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
            style={{
              background:
                tone === "accent" ? "var(--accent-2)" : "var(--muted-2)",
            }}
          />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);
