"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FileWarning,
  PackageX,
  UserPlus,
  MessageSquare,
  ArrowRight,
  AlertTriangle,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { BookingButton } from "./BookingButton";

// ExceptionScenarios — concrete "before Vantage vs with Vantage" stories.
//
// Replaces the old BuyerPathRouter persona-funnel on the homepage. Where
// BuyerPathRouter asked the visitor to self-select into a lane, this
// section *shows* the work first — four real mid-market exception
// scenarios any operator has already lived through. Clicking a card
// swaps the detail panel to show the today-state (broken) vs the
// Vantage-state (controlled). Much closer to a product demo than a
// marketing page.

type Scenario = {
  id: string;
  icon: LucideIcon;
  chip: string;
  title: string;
  subtitle: string;
  before: {
    headline: string;
    bullets: string[];
    outcome: string;
  };
  after: {
    headline: string;
    bullets: string[];
    outcome: string;
  };
};

const SCENARIOS: Scenario[] = [
  {
    id: "ap-mismatch",
    icon: FileWarning,
    chip: "AP · Finance",
    title: "Invoice arrives. Doesn't match the GRN.",
    subtitle: "Big-ticket invoice, PO quantity doesn't tie out.",
    before: {
      headline: "Today, without Vantage",
      bullets: [
        "AP clerk emails the buyer, the buyer asks the warehouse, the warehouse hunts the paperwork",
        "Invoice sits in the suspense bucket — still owed, still ageing",
        "Supplier eventually calls asking why payment is late, relationship cools",
        "Nothing in your ERP knows who owns resolving this right now",
      ],
      outcome: "Resolution drags into weeks. No audit trail of who said what.",
    },
    after: {
      headline: "With Vantage running",
      bullets: [
        "Exception fires the moment the 3-way match fails — AP, buyer and warehouse see it in the same queue",
        "SLA clock starts, owner is named by your rule (not by email tennis)",
        "Supplier, PO, GRN and invoice images attached automatically — no hunting",
        "Every decision logged append-only, exportable for SARS and external audit",
      ],
      outcome: "One owned queue, one decision, full record. No more email-tennis.",
    },
  },
  {
    id: "qc-fail",
    icon: PackageX,
    chip: "QC · Production",
    title: "Batch fails QC. Already on the truck.",
    subtitle: "Lab retest flags a spec deviation — units in transit.",
    before: {
      headline: "Today, without Vantage",
      bullets: [
        "QC manager WhatsApps production, production calls dispatch, dispatch tries to stop the truck",
        "Customer hears about it from the driver, not from you",
        "Rework vs reject vs concession — decided verbally, written up days later",
        "At the next audit, the CAPA paper trail is a scanned email chain",
      ],
      outcome: "Containment is verbal. The paper trail is whatever you find later.",
    },
    after: {
      headline: "With Vantage running",
      bullets: [
        "Non-conformance triggers the moment the lab result is entered — production line notified instantly",
        "Routing rule escalates to QA manager + ops director based on batch value",
        "Decision captured with rationale · CAPA auto-linked to the affected SKU and supplier",
        "Customer comms template fires with one click — full context attached",
      ],
      outcome: "Containment in minutes, decisions on the record, CAPA closed-loop.",
    },
  },
  {
    id: "supplier-onboard",
    icon: UserPlus,
    chip: "Procurement",
    title: "New supplier. Seven departments need to sign off.",
    subtitle: "Urgent — and bouncing between inboxes.",
    before: {
      headline: "Today, without Vantage",
      bullets: [
        "Procurement emails a PDF form to accounts, compliance, QA, IT, BEE, legal, tax",
        "Some approvals come back quickly, others sit in inboxes for weeks",
        "Someone eventually asks \"has this been approved?\" — nobody knows who's next",
        "Supplier chases your team — for the job you asked them to do",
      ],
      outcome: "Bottlenecks are invisible until someone goes looking.",
    },
    after: {
      headline: "With Vantage running",
      bullets: [
        "Linear workflow — each approver sees only their step, only when it's their turn",
        "Parallel paths where independent (BEE + tax at the same time) — sequential only where required",
        "Every step has a SLA, every delay is visible on one board",
        "Supplier record writes back to your ERP only after final sign-off — nothing premature",
      ],
      outcome: "Onboarding compresses to days. The stuck step is always named and owned.",
    },
  },
  {
    id: "customer-complaint",
    icon: MessageSquare,
    chip: "Customer service",
    title: "Customer logs a complaint. It dies in an inbox.",
    subtitle: "\"Short-delivered. Sent you an email last week.\"",
    before: {
      headline: "Today, without Vantage",
      bullets: [
        "Complaint lands on one rep's email — rep is on leave, auto-responder doesn't escalate",
        "Nothing in your ERP knows this complaint exists until the customer calls the MD",
        "Fix involves three departments, logged in none of them",
        "Repeat complaint weeks later — your team has no record of the first",
      ],
      outcome: "Patterns are invisible. You don't know which accounts complain most.",
    },
    after: {
      headline: "With Vantage running",
      bullets: [
        "Email ingestion turns inbound messages into structured tickets — no rep dependency",
        "Classification + routing by complaint type, customer tier, order value",
        "Resolution links back to the order, the invoice, the delivery note · audit-ready",
        "Trends auto-surface — which customer, which product line, which week",
      ],
      outcome: "Every complaint closed on the record. Repeats surface early, not late.",
    },
  },
];

export const ExceptionScenarios: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id);
  const active = SCENARIOS.find((s) => s.id === activeId) ?? SCENARIOS[0];
  const ActiveIcon = active.icon;

  return (
    <section
      className="relative w-full py-24 sm:py-28 overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[160px] opacity-30"
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
            The work your ERP can&apos;t see
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Pick a scenario. See how it breaks —{" "}
            <span style={{ color: "var(--accent-2)" }}>
              and how Vantage fixes it.
            </span>
          </h2>
          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Four real exception scenarios every mid-market operator has lived
            through. Click one — we&apos;ll show you where the work hides today
            and what changes the day Vantage goes live.
          </p>
        </motion.div>

        {/* Scenario chip row */}
        <div className="mt-10 flex flex-wrap gap-2.5">
          {SCENARIOS.map((s) => {
            const Icon = s.icon;
            const selected = s.id === activeId;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setActiveId(s.id)}
                className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm transition-all duration-200 cursor-pointer themed-rounded"
                style={{
                  borderColor: selected
                    ? "var(--accent-2)"
                    : "var(--card-border)",
                  background: selected
                    ? "color-mix(in oklab, var(--accent-2) 14%, var(--card-bg))"
                    : "var(--card-bg)",
                  color: selected ? "var(--fg)" : "var(--muted)",
                  boxShadow: selected
                    ? "0 0 18px var(--accent-glow)"
                    : "none",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Icon
                  className="w-4 h-4 shrink-0"
                  strokeWidth={1.9}
                  style={{
                    color: selected ? "var(--accent-2)" : "var(--muted-2)",
                  }}
                />
                <span className="font-medium">{s.chip}</span>
              </button>
            );
          })}
        </div>

        {/* Detail panel */}
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 rounded-3xl border overflow-hidden themed-rounded"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent-2) 28%, var(--card-border))",
            background: "var(--bg-elev)",
          }}
        >
          {/* Header */}
          <div
            className="p-6 sm:p-8 border-b"
            style={{
              borderColor: "var(--card-border)",
              background:
                "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 8%, var(--card-bg)), var(--card-bg))",
            }}
          >
            <div className="flex items-start gap-4">
              <div
                className="inline-flex items-center justify-center w-12 h-12 rounded-xl border-2 shrink-0 themed-rounded"
                style={{
                  borderColor: "var(--accent-2)",
                  background:
                    "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 16%, var(--bg-elev)), var(--bg-elev))",
                  boxShadow: "0 0 18px var(--accent-glow)",
                }}
              >
                <ActiveIcon
                  className="w-5 h-5"
                  style={{ color: "var(--accent-2)" }}
                  strokeWidth={1.9}
                />
              </div>
              <div className="min-w-0">
                <h3
                  className="text-xl sm:text-2xl font-semibold leading-tight tracking-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  {active.title}
                </h3>
                <p
                  className="mt-1.5 text-sm"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {active.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Before vs After */}
          <div
            className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x"
            style={{ borderColor: "var(--card-border)" }}
          >
            <BeforeAfterPanel
              tone="before"
              icon={AlertTriangle}
              data={active.before}
            />
            <BeforeAfterPanel
              tone="after"
              icon={CheckCircle2}
              data={active.after}
            />
          </div>
        </motion.div>

        {/* Footer CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p
            className="text-sm leading-relaxed max-w-xl"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            Your exceptions won&apos;t look identical — but they&apos;ll rhyme.
            We run a free 45-minute mapping session to show you yours, before
            any contract talk.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/vantage#prototype"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 cursor-pointer themed-rounded"
              style={{
                borderColor: "var(--card-border)",
                background: "var(--card-bg)",
                color: "var(--fg)",
                fontFamily: "var(--font-body)",
              }}
            >
              Click through the prototype
            </Link>
            <BookingButton
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer themed-rounded"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                color: "#ffffff",
                boxShadow: "0 0 30px var(--accent-glow)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span>Book a mapping session</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </BookingButton>
          </div>
        </div>
      </div>
    </section>
  );
};

const BeforeAfterPanel: React.FC<{
  tone: "before" | "after";
  icon: LucideIcon;
  data: { headline: string; bullets: string[]; outcome: string };
}> = ({ tone, icon: Icon, data }) => {
  const isAfter = tone === "after";
  return (
    <div
      className="p-6 sm:p-8"
      style={{
        borderColor: "var(--card-border)",
        background: isAfter
          ? "linear-gradient(180deg, color-mix(in oklab, var(--accent-2) 6%, transparent), transparent)"
          : "transparent",
      }}
    >
      <div
        className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-[0.22em] font-semibold"
        style={{
          background: isAfter
            ? "color-mix(in oklab, var(--accent-2) 20%, transparent)"
            : "color-mix(in oklab, #ef4444 16%, transparent)",
          color: isAfter ? "var(--accent-2)" : "#ef4444",
          border: isAfter
            ? "1px solid color-mix(in oklab, var(--accent-2) 45%, var(--card-border))"
            : "1px solid color-mix(in oklab, #ef4444 40%, var(--card-border))",
          fontFamily: "var(--font-body)",
        }}
      >
        <Icon className="w-3 h-3" strokeWidth={2.4} />
        {data.headline}
      </div>
      <ul className="mt-5 space-y-3">
        {data.bullets.map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full shrink-0 mt-2"
              style={{
                background: isAfter ? "var(--accent-2)" : "#ef4444",
              }}
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div
        className="mt-5 pt-4 border-t text-[13px] leading-relaxed"
        style={{
          borderColor: "var(--card-border)",
          color: "var(--fg)",
          fontFamily: "var(--font-body)",
        }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.22em] block mb-1.5"
          style={{ color: "var(--muted-2)" }}
        >
          Outcome
        </span>
        <strong style={{ fontWeight: 600 }}>{data.outcome}</strong>
      </div>
    </div>
  );
};

