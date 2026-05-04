import {
  ShoppingCart,
  AlertOctagon,
  CheckCircle2,
  ShieldCheck,
  FileText,
  Link2,
  CreditCard,
  Wallet,
  FileSignature,
  ClipboardCheck,
  Megaphone,
  Truck,
  Layers,
  Cpu,
  Lock,
} from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/patterns/Section";
import { Eyebrow } from "@/components/patterns/Eyebrow";
import { DisplayHead } from "@/components/patterns/DisplayHead";
import { SplitFrame } from "@/components/patterns/SplitFrame";
import { BentoModule } from "@/components/patterns/BentoModule";
import { TerminalBlock } from "@/components/patterns/TerminalBlock";
import { NumberedSequence } from "@/components/patterns/NumberedSequence";
import { PullQuoteFrame } from "@/components/patterns/PullQuoteFrame";
import { InstrumentRow } from "@/components/patterns/InstrumentRow";
import { EndCTA } from "@/components/patterns/EndCTA";

export const metadata = {
  title: "Vantage — Operational layer for the ERP",
  description:
    "Vantage centralises everything around the ERP transaction onto one platform, then adds module-specific AI trained on your operational data. Procurement AI drafts supplier quotes from live stock levels. First workflow live in five weeks.",
};

export default function VantagePage() {
  return (
    <SiteShell>
      {/* Hero — page-specific */}
      <Section compact divider={false} className="pt-32 sm:pt-44">
        <Eyebrow variant="dot">Flagship SaaS product</Eyebrow>
        <div className="mt-7 max-w-4xl">
          <DisplayHead level="h1" accent="around the ERP transaction.">
            The operational layer
          </DisplayHead>
          <p
            className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Your ERP handles the transaction. Vantage handles the work
            around it — approvals, procurement, supplier exceptions,
            compliance — that today lives scattered across spreadsheets,
            email, WhatsApp and phone calls. One platform, full audit
            trail, routing logic you own in plain English. With{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              module-specific AI trained on your operational data
            </span>
            .
          </p>
        </div>
      </Section>

      {/* The problem space */}
      <Section>
        <SplitFrame
          eyebrow="The problem"
          title="Everything around the transaction"
          accent="is scattered."
          description="Modern ERPs are excellent at recording the transaction. They were never built for the work that wraps every transaction — and that's where mid-market operators lose 15–25 days a month."
          items={[
            {
              label: "Email",
              title: "Approvals lost in inboxes",
              body: "Out-of-office replies, missed CCs, threads that fork into three. No audit trail. No SLA timer. No way to know who's holding what.",
            },
            {
              label: "Excel",
              title: "Spreadsheets pretending to be systems",
              body: "Procurement workings, exception logs, compliance trackers — copies emailed around, no version control, the truth depends on who you ask.",
            },
            {
              label: "Chat",
              title: "WhatsApp threads carrying critical comms",
              body: "Supplier confirmations, status changes, escalations. None of it logged against a record. Search is impossible. New staff start blind.",
            },
            {
              label: "Phone",
              title: "Decisions on calls nobody recorded",
              body: "When the auditor asks why the override happened, you ask the team to remember a conversation from six months ago.",
            },
          ]}
        />
      </Section>

      {/* Terminal — Vantage in action */}
      <Section>
        <div className="max-w-3xl mb-12">
          <Eyebrow variant="slash">One inbound exception</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="end-to-end.">
              From scattered to settled,
            </DisplayHead>
          </div>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            What it looks like when Vantage catches a real exception.
            Below — a single supplier short-ship, classified, routed and
            closed without any operator chasing the trail.
          </p>
        </div>
        <TerminalBlock
          label="Vantage · Supplier exceptions"
          lines={[
            { kind: "system", text: "10:14:02  Inbound email · supplier@acme.co.za · subject `Short-ship · PO 8842`" },
            { kind: "ok", text: "10:14:03  Exception AI · classified `short-ship`, severity `medium`, confidence 0.94" },
            { kind: "system", text: "10:14:03  Linked to Syspro PO 8842 · GRN 14118 · buyer Themba N." },
            { kind: "event", text: "10:14:04  Procurement AI · drafted credit-note request to supplier with delta lines" },
            { kind: "event", text: "10:14:04  Approval AI · routed to buyer + finance · SLA 4h running" },
            { kind: "system", text: "10:32:18  Buyer approved · supplier acknowledged via email reply (auto-logged)" },
            { kind: "ok", text: "11:08:47  Closed · `audit trail complete` · 54m end-to-end · zero spreadsheets" },
          ]}
        />
      </Section>

      {/* Modules — bento grid */}
      <Section id="modules">
        <BentoModule
          eyebrow="Module library"
          title="Twelve modules ship today."
          accent="One platform."
          description="Each module is its own trained AI, sharing one platform, one audit trail, one set of operators. Need logic beyond the library? We build custom modules directly on your Vantage instance — same instance, same engine, scoped in 1–2 weeks."
          cards={[
            {
              icon: "ShoppingCart",
              eyebrow: "Featured",
              title: "Procurement",
              body: "AI drafts supplier quotes from live stock levels and historical pricing. Suggests POs based on lead times and reorder points. Learns supplier preferences over time.",
              featured: true,
            },
            {
              icon: "AlertOctagon",
              eyebrow: "Module",
              title: "Supplier exceptions",
              body: "Short-ships, damaged stock, wrong-SKU. AI classifies and routes to the buyer with SLA timers running.",
            },
            {
              icon: "CheckCircle2",
              eyebrow: "Module",
              title: "Approvals",
              body: "AI learns your routing rules and surfaces edge cases. Never decides — proposes, with the rule and evidence.",
            },
            {
              icon: "ShieldCheck",
              eyebrow: "Module",
              title: "Compliance",
              body: "BEE certificates, vendor docs, expiry dates. Flags before the gap, not after.",
            },
            {
              icon: "FileText",
              eyebrow: "Module",
              title: "Bordereaux & claims",
              body: "Specialty insurance front door — capture, classify, route to adjuster with regulator-ready audit trail.",
            },
            {
              icon: "Link2",
              eyebrow: "Module",
              title: "GRN-to-invoice reconciliation",
              body: "Three-way match exceptions surfaced and routed before the invoice ages.",
            },
            {
              icon: "CreditCard",
              eyebrow: "Module",
              title: "Customer credit overrides",
              body: "Limit breaches caught at quote stage; finance approves with full context, every time.",
            },
            {
              icon: "Wallet",
              eyebrow: "Module",
              title: "Expense exceptions",
              body: "Out-of-policy spend caught on submission, not at month-end.",
            },
            {
              icon: "FileSignature",
              eyebrow: "Module",
              title: "Contract & renewal gates",
              body: "Renewal dates surfaced 60 days out; approvals routed before auto-renew.",
            },
            {
              icon: "ClipboardCheck",
              eyebrow: "Module",
              title: "BEE & vendor compliance",
              body: "Refresh cycles tracked per supplier, evidence stored against the record.",
            },
            {
              icon: "Megaphone",
              eyebrow: "Module",
              title: "Customer requests",
              body: "Quotes, complaints, support — one intake, one approval ladder, one status board per client.",
            },
            {
              icon: "Truck",
              eyebrow: "Module",
              title: "Onboarding (vendor + customer)",
              body: "Document capture, verification and welcome comms — fully digital, end-to-end.",
            },
          ]}
        />
      </Section>

      {/* Custom modules CTA */}
      <Section>
        <SplitFrame
          eyebrow="Custom modules"
          title="The library covers most. The rest"
          accent="we build on your instance."
          description="When the standard library doesn't fit, we ship custom modules directly into your Vantage tenant — same engine, same audit trail, same operators. No separate platform, no vendor juggling. Scoped in 1–2 weeks, fixed-price, delivered by the team that built Vantage."
          items={[
            {
              label: "Scope",
              title: "1–2 weeks discovery",
              body: "We sit with your operators, watch the work, agree the success metric. Fixed-scope brief in writing before any build.",
            },
            {
              label: "Build",
              title: "Same Vantage instance",
              body: "Custom logic ships to your tenant. Same rules engine, same audit trail, same reporting surface. No extra vendor on the bill.",
            },
            {
              label: "Live",
              title: "Production handover",
              body: "Module live in your hands with the same five-week cadence as a standard pilot. Iterate from there.",
            },
          ]}
        />
      </Section>

      {/* Pilot phases */}
      <Section>
        <NumberedSequence
          eyebrow="The five-week pilot"
          title="From scoping call"
          accent="to first workflow live."
          description="Fixed-scope, fixed-price, on your real data. Both founders on every working session. The success metric is contracted in writing on day one — we hit it or we keep working until we do."
          items={[
            {
              kicker: "Week 1 · Scope",
              title: "Pick the first workflow",
              body: "30-minute scoping call. We agree the workflow, the success metric, the data sources, the operators. Brief signed before week two.",
            },
            {
              kicker: "Week 2 · Wire",
              title: "Wire Vantage to your data",
              body: "Read-only feeds from your ERP and inboxes first. Nothing writes back yet. We verify the right exceptions surface before any action.",
            },
            {
              kicker: "Weeks 3–4 · Build",
              title: "Module live in staging",
              body: "Routing rules in plain English, AI tuned on your historical data, operators running through scripted walkthroughs.",
            },
            {
              kicker: "Week 5 · Cut over",
              title: "First workflow in production",
              body: "Cut over with both founders on the call. Operators using Vantage on day 36. Spreadsheets retired for that workflow.",
            },
            {
              kicker: "Week 6+ · Iterate",
              title: "Tune against real exceptions",
              body: "Your real exception data sharpens the rules and the module-specific AI every week. Phase 2 scope shaped from week-one learnings.",
            },
          ]}
        />
      </Section>

      {/* Pull quote */}
      <Section>
        <PullQuoteFrame
          text="Stock counts ten times faster, and the new customer onboarding form has saved us hours every week."
          attribution="Owner, Denver Auto Spares — Port Elizabeth"
          cite="/case-studies/denver-auto-spares"
          citeLabel="Read the Denver case study"
        />
      </Section>

      {/* Architectural trust */}
      <Section>
        <InstrumentRow
          items={[
            {
              icon: "Layers",
              label: "Architecture",
              claim: "Runs alongside, never replaces.",
              proof: "Vantage reads from Syspro, SAP, Sage, NetSuite or internal systems. The ERP stays the source of truth; we wrap the work around it.",
            },
            {
              icon: "Cpu",
              label: "AI",
              claim: "Per-module, on your data.",
              proof: "Procurement AI sees procurement data. Approval AI learns your ladder. No generic chatbot, no shared tenant model.",
            },
            {
              icon: "Lock",
              label: "Compliance",
              claim: "POPIA-aligned by default.",
              proof: "Customer data stays on infrastructure you choose. Full audit trail. Every action tied to an authenticated operator.",
            },
          ]}
        />
      </Section>

      {/* End CTA */}
      <Section spacious>
        <EndCTA
          eyebrow="See Vantage on your stack"
          title="Twenty minutes."
          accent="On your real exceptions."
          body="We bring your ERP of choice, mock an exception, and walk through how Vantage catches it, classifies it, routes it, and closes the loop. Then we tell you honestly whether a pilot makes sense."
          primaryLabel="Book a 20-minute demo"
        />
      </Section>
    </SiteShell>
  );
}
