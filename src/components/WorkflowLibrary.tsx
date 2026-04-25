"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Receipt,
  ShieldCheck,
  UserPlus,
  MessageSquare,
  CheckSquare,
  PackageCheck,
  Sparkles,
  ArrowRight,
  FileText,
  Link2,
  CreditCard,
  Wallet,
  FileSignature,
} from "lucide-react";

// The standard workflow library — the concrete answer to "what does
// Vantage actually DO for me on day one?" Pulled from the ICP and the
// exception types called out in products/vantage.md. Every card here
// ships pre-configured and is deployed to the customer's real data as
// part of the setup engagement.
const standardWorkflows = [
  {
    icon: Receipt,
    title: "AP Exception Management",
    body: "Invoice–PO mismatches, 3-way matching failures, late-payment exposure. Pulled directly from your ERP's AP module.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Non-Conformances",
    body: "QC failures, rework routing, root-cause tracking. Integrates with your QMS or production system.",
  },
  {
    icon: UserPlus,
    title: "Supplier Onboarding",
    body: "KYC, BEE certs, tax clearance, banking details, approval chain, first-order gate — all in one flow.",
  },
  {
    icon: MessageSquare,
    title: "Customer Complaints",
    body: "Capture from email, form or call. Classify, route, escalate and close with full CRM + ERP context.",
  },
  {
    icon: CheckSquare,
    title: "Stuck Approvals",
    body: "Sign-off routing with context, SLA timers and delegation. Catches anything waiting past threshold.",
  },
  {
    icon: PackageCheck,
    title: "Receiving Discrepancies",
    body: "Short-ships, damages, wrong-SKU, over-receipts. Auto-created from GRN vs PO mismatches.",
  },
  {
    icon: FileText,
    title: "Bordereaux & Claims Intake",
    body: "Inbound claims, bordereaux files and policy docs captured at the front door. Classified, severity-scored and routed to the right adjuster with SLA timers.",
  },
  {
    icon: Link2,
    title: "GRN-to-Invoice Reconciliation",
    body: "Three-way match across PO, GRN and invoice — the moment one of them lands. Catches partial receipts, price drift and duplicate invoices before they post.",
  },
  {
    icon: ShieldCheck,
    title: "BEE & Vendor Compliance Refresh",
    body: "Tracks BEE certs, tax clearance, banking proofs and insurance expiries per supplier. Auto-prompts the vendor before they lapse — not after a payment fails.",
  },
  {
    icon: CreditCard,
    title: "Customer Credit-Limit Overrides",
    body: "Orders that breach the credit limit pause for review with full ageing, exposure and override history. Approved or declined with named accountability.",
  },
  {
    icon: Wallet,
    title: "Expense Exceptions",
    body: "Out-of-policy claims, missing receipts, split-billing patterns and approval-chain bypass. Flagged at submission, not at month-end audit.",
  },
  {
    icon: FileSignature,
    title: "Contract & Renewal Gate",
    body: "Service contracts and customer agreements approaching renewal or auto-renewal. Triggers review with margin, usage and counter-party risk in one view.",
  },
];

export const WorkflowLibrary: React.FC = () => {
  return (
    <section
      className="relative w-full py-24 overflow-hidden border-t"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[150px] opacity-40"
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
            <span>What you&apos;re buying</span>
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            One platform. A library of{" "}
            <span style={{ color: "var(--accent-2)" }}>standard workflows.</span>
            <br />
            Plus custom on top.
          </h2>
          <p
            className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Vantage is a configurable platform — not a handful of separate
            tools. On day one you get the full library of pre-built exception
            workflows below, deployed to your data and running on rules you
            own.{" "}
            <strong
              style={{ color: "var(--fg)", fontWeight: 600 }}
            >
              Need something more specific? Bespoke workflows and custom
              features can be built directly on top of your Vantage platform
            </strong>{" "}
            — scoped and quoted after a short discovery.
          </p>
        </motion.div>

        {/* Standard workflow library */}
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {standardWorkflows.map((w, i) => {
            const Icon = w.icon;
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative rounded-2xl border p-6 overflow-hidden themed-rounded group transition-all duration-300"
                style={{
                  borderColor: "var(--card-border)",
                  background:
                    "linear-gradient(180deg, var(--card-bg), color-mix(in oklab, var(--card-bg) 40%, transparent))",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "color-mix(in oklab, var(--accent-2) 50%, var(--card-border))";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    "var(--card-border)";
                }}
              >
                <div
                  className="pointer-events-none absolute -top-10 -right-10 w-[120px] h-[120px] rounded-full blur-[50px] opacity-0 group-hover:opacity-50 transition-opacity duration-500"
                  style={{ background: "var(--accent-glow)" }}
                />
                <div className="relative flex items-start justify-between">
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl border-2 themed-rounded"
                    style={{
                      borderColor: "var(--accent-2)",
                      background:
                        "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 12%, var(--bg-elev)), var(--bg-elev))",
                      boxShadow:
                        "0 0 16px var(--accent-glow), inset 0 0 8px color-mix(in oklab, var(--accent) 8%, transparent)",
                    }}
                  >
                    <Icon
                      className="w-[18px] h-[18px]"
                      style={{ color: "var(--accent-2)" }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-[0.2em] px-2 py-1 rounded-full"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                      background: "var(--bg-elev)",
                      border: "1px solid var(--card-border)",
                    }}
                  >
                    Standard
                  </div>
                </div>
                <h3
                  className="relative mt-5 text-lg font-semibold leading-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  {w.title}
                </h3>
                <p
                  className="relative mt-2 text-sm leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {w.body}
                </p>
                <div
                  className="relative mt-4 pt-3 border-t text-[11px]"
                  style={{
                    borderColor: "var(--card-border)",
                    color: "var(--accent-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Ships on day one · live in 3–4 weeks
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Custom extensions — full-width panel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mt-6 overflow-hidden rounded-3xl border themed-rounded"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
            background:
              "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 10%, var(--bg-elev)), var(--bg-elev) 60%, var(--bg))",
          }}
        >
          <div
            className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full blur-[100px]"
            style={{ background: "var(--accent-glow)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full blur-[100px] opacity-50"
            style={{ background: "var(--accent-glow)" }}
          />

          <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 p-8 sm:p-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="inline-flex items-center justify-center w-11 h-11 rounded-xl border-2 themed-rounded"
                  style={{
                    borderColor: "var(--accent-2)",
                    background:
                      "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 18%, var(--bg-elev)), var(--bg-elev))",
                    boxShadow: "0 0 20px var(--accent-glow)",
                  }}
                >
                  <Sparkles
                    className="w-[18px] h-[18px]"
                    style={{ color: "var(--accent-2)" }}
                    strokeWidth={1.8}
                  />
                </div>
                <div
                  className="text-[10px] uppercase tracking-[0.25em] px-2 py-1 rounded-full"
                  style={{
                    color: "var(--accent-2)",
                    fontFamily: "var(--font-body)",
                    background:
                      "color-mix(in oklab, var(--accent-2) 12%, transparent)",
                    border:
                      "1px solid color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
                  }}
                >
                  Custom · scoped & quoted
                </div>
              </div>

              <h3
                className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight max-w-xl"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fg)",
                }}
              >
                Build custom workflows and features{" "}
                <span style={{ color: "var(--accent-2)" }}>
                  on top of your Vantage platform.
                </span>
              </h3>
              <p
                className="mt-4 text-base leading-relaxed max-w-2xl"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Everything in the standard library is configurable — rename it,
                re-route it, rewrite the rules in plain English. And if an
                exception type isn&apos;t in the library at all, or you need
                custom integrations, UI or logic on your Vantage instance, we
                build it in. One–two weeks of discovery, fixed-price delivery,
                runs on the same platform with the same audit trail and rules
                engine.
              </p>

              <ul
                className="mt-5 grid gap-2 sm:grid-cols-2 text-sm"
                style={{
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 h-1 w-1 rounded-full shrink-0"
                    style={{ background: "var(--accent-2)" }}
                  />
                  <span>Net-new workflow types we don&apos;t ship as standard</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 h-1 w-1 rounded-full shrink-0"
                    style={{ background: "var(--accent-2)" }}
                  />
                  <span>Bespoke integrations to internal systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 h-1 w-1 rounded-full shrink-0"
                    style={{ background: "var(--accent-2)" }}
                  />
                  <span>Custom dashboards, screens or reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span
                    className="mt-2 h-1 w-1 rounded-full shrink-0"
                    style={{ background: "var(--accent-2)" }}
                  />
                  <span>Logic beyond the standard rules engine</span>
                </li>
              </ul>
            </div>

            <div className="flex lg:flex-col gap-3 lg:justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer themed-rounded whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                  color: "#ffffff",
                  boxShadow: "0 0 30px var(--accent-glow)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span>Scope a custom build</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/pilot"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-semibold transition-all duration-300 cursor-pointer themed-rounded whitespace-nowrap"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--card-bg)",
                  color: "var(--fg)",
                  fontFamily: "var(--font-body)",
                }}
              >
                See the pilot offer
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
