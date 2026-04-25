"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  GitBranch,
  Clock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";

// ServicesOfferings — the replacement for the old CustomWork bento on /services.
//
// Three service lines, each with three concrete sample deliverables, the real
// stack we'd use, and a typical engagement duration. Designed so a procurement
// or IT lead can tell at a glance what category their project falls into and
// roughly what "done" looks like before they book a call.

type Offering = {
  icon: LucideIcon;
  tag: string;
  title: string;
  lede: string;
  deliverables: string[];
  duration: string;
};

const OFFERINGS: Offering[] = [
  {
    icon: Code2,
    tag: "Custom Software",
    title: "Bespoke software for the problem off-the-shelf doesn't solve",
    lede: "Management systems, internal tools, customer portals, line-of-business apps — built around the way your business actually runs, not how a generic SaaS template thinks it should. If a real business problem doesn't have a clean off-the-shelf answer, we build the answer.",
    deliverables: [
      "Management software — bespoke admin systems, portals, dashboards built around your operating model",
      "Internal tools — anything your team currently runs out of spreadsheets, email and WhatsApp",
      "Customer or partner portals — self-service, role-based access, your branding, your data",
    ],
    duration: "3–8 weeks delivery · 1–2 week scoping up front",
  },
  {
    icon: Brain,
    tag: "Custom AI",
    title: "Custom AI systems — and AI bolted onto the systems you already run",
    lede: "We build custom AI systems from scratch, add AI capability into existing software you already use, and train custom models against your business's data when off-the-shelf models miss the nuance. AI that does one useful thing, measurably, in production — not a demo that breaks on real data.",
    deliverables: [
      "Custom AI systems — document intelligence, agents, copilots, knowledge assistants built end-to-end",
      "AI added to existing systems — drop intelligence into the software your team already lives in",
      "Custom AI models — fine-tuned or domain-trained on your own data when generic models aren't enough",
    ],
    duration: "4–10 weeks delivery · prototype in week 2",
  },
  {
    icon: GitBranch,
    tag: "Workflow Automation",
    title: "Any workflow, automated end-to-end",
    lede: "If a process touches more than one tool, more than one person, or repeats more than a few times a week — we can automate it. Sales, finance, ops, HR, marketing, customer service — any workflow, any tools, any direction. Production-grade engines your team owns and can extend.",
    deliverables: [
      "Cross-tool automation — connect anything to anything, in any direction, monitored and alerted",
      "Approval and onboarding flows — sequential, parallel, conditional — for any kind of business process",
      "Repetitive-work elimination — the manual copy-paste, the daily reports, the inbox-to-spreadsheet loops",
    ],
    duration: "2–6 weeks delivery · ownership transfer on handover",
  },
];

export const ServicesOfferings: React.FC = () => {
  return (
    <section
      id="offerings"
      className="relative w-full py-24 overflow-hidden scroll-mt-24"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div
        className="pointer-events-none absolute top-1/3 right-0 w-[700px] h-[500px] rounded-full blur-[160px] opacity-30"
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
            Three service lines
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Scoped engagements,{" "}
            <span style={{ color: "var(--accent-2)" }}>fixed price,</span>{" "}
            real engineers.
          </h2>
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            We don&apos;t sell hours. Every engagement starts with 1–2 weeks
            of scoping, then a fixed price against a written deliverable
            list. Senior engineers, Cape Town delivery, no offshore hand-offs.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {OFFERINGS.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.article
                key={o.title}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="relative flex flex-col rounded-2xl border p-7 overflow-hidden themed-rounded group"
                style={{
                  borderColor: "var(--card-border)",
                  background:
                    "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "color-mix(in oklab, var(--accent-2) 55%, var(--card-border))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--card-border)";
                }}
              >
                <div
                  className="pointer-events-none absolute -top-20 -right-20 w-[240px] h-[240px] rounded-full blur-[80px] opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                  style={{ background: "var(--accent-glow)" }}
                />

                <div className="relative">
                  <div
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 themed-rounded"
                    style={{
                      borderColor: "var(--accent-2)",
                      background:
                        "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 14%, var(--bg-elev)), var(--bg-elev))",
                      boxShadow: "0 0 16px var(--accent-glow)",
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
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {o.tag}
                  </div>
                  <h3
                    className="mt-1 text-xl font-semibold leading-snug tracking-tight"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--fg)",
                    }}
                  >
                    {o.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {o.lede}
                  </p>
                </div>

                <div
                  className="relative mt-6 pt-5 border-t"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.22em] mb-3 flex items-center gap-2"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <CheckCircle2 className="w-3 h-3" strokeWidth={2.2} />
                    Sample deliverables
                  </div>
                  <ul className="space-y-2.5">
                    {o.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-start gap-2 text-[13px] leading-snug"
                        style={{
                          color: "var(--fg)",
                          fontFamily: "var(--font-body)",
                        }}
                      >
                        <span
                          className="inline-block w-1 h-1 rounded-full shrink-0 mt-2"
                          style={{ background: "var(--accent-2)" }}
                        />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className="relative mt-5 pt-5 border-t flex items-center gap-2 text-[12px]"
                  style={{
                    borderColor: "var(--card-border)",
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Clock
                    className="w-3.5 h-3.5 shrink-0"
                    style={{ color: "var(--accent-2)" }}
                    strokeWidth={2}
                  />
                  <span>{o.duration}</span>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
