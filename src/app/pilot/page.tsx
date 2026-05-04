import {
  CheckCircle2,
  XCircle,
  Calendar,
  Coins,
  Headset,
} from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/patterns/Section";
import { Eyebrow } from "@/components/patterns/Eyebrow";
import { DisplayHead } from "@/components/patterns/DisplayHead";
import { NumberedSequence } from "@/components/patterns/NumberedSequence";
import { TickerLockup } from "@/components/patterns/TickerLockup";
import { InstrumentRow } from "@/components/patterns/InstrumentRow";
import { EndCTA } from "@/components/patterns/EndCTA";
import { PilotContactForm } from "@/components/PilotContactForm";

export const metadata = {
  title: "Pilot cohort — First 5 clients · 40% off setup",
  description:
    "VSG is hand-picking five pilot clients for Vantage. 40% off setup, free founder-led support for the life of the pilot, and no per-user fees. First workflow live in five weeks.",
};

export default function PilotPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <Section compact divider={false} className="pt-32 sm:pt-44">
        <Eyebrow variant="dot">Launch cohort · now accepting</Eyebrow>
        <div className="mt-7 max-w-4xl">
          <DisplayHead level="h1" accent="One serious deal.">
            Five pilot clients.
          </DisplayHead>
          <p
            className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            We&apos;re hand-picking the first five mid-market operators to
            run Vantage in production. In exchange for working with us
            while the product is young, you get{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              40% off setup, free founder-led support, and no per-user
              monthly fees
            </span>{" "}
            — for the life of your pilot engagement.
          </p>
        </div>
      </Section>

      {/* Cohort stats */}
      <Section>
        <div className="max-w-3xl mb-12">
          <Eyebrow variant="slash">Cohort terms</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="locked on day one.">
              Fair trade,
            </DisplayHead>
          </div>
        </div>
        <TickerLockup
          stats={[
            {
              value: 3,
              suffix: "/5",
              label: "Pilots booked",
              description: "Two slots remain in the launch cohort.",
            },
            {
              value: 40,
              suffix: "%",
              label: "Off setup",
              description: "Cohort pricing — locked in writing day one.",
            },
            {
              value: 5,
              suffix: " weeks",
              label: "First workflow live",
              description: "Production, on your real data — not a demo.",
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
          description="Fixed-scope, fixed-price, on your real data. Both founders on every working session. The success metric is contracted in writing on day one."
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

      {/* What's in / what's out */}
      <Section>
        <div className="max-w-3xl mb-12">
          <Eyebrow variant="slash">What you&apos;re signing up for</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="what we won't.">
              What we&apos;ll do —
            </DisplayHead>
          </div>
        </div>
        <div
          className="grid lg:grid-cols-2"
          style={{ background: "var(--card-border)", gap: "1px" }}
        >
          <InOutCol
            heading="What's in"
            kind="in"
            items={[
              "Both founders on every working session.",
              "First workflow live in production by week six.",
              "40% off setup, locked in writing on day one.",
              "Free founder-led support for the life of the pilot.",
              "No per-user fees during the pilot.",
              "Custom modules scoped if the standard library doesn't fit.",
              "Full audit trail and POPIA-aligned data handling by default.",
            ]}
          />
          <InOutCol
            heading="What's out"
            kind="out"
            items={[
              "Vapourware demos, sandbox tours, slide decks.",
              "SDR / qualification scripts. You email a founder, you talk to a founder.",
              "Six-month sales cycles. We scope on a 30-min call.",
              "Per-user pricing creep during the pilot.",
              "Vague success metrics. We sign the metric in writing.",
              "Black-box AI. Every rule auditable, every override logged.",
              "Replacing your ERP. Vantage runs alongside, never on top.",
            ]}
          />
        </div>
      </Section>

      {/* Contact form */}
      <Section>
        <div className="max-w-3xl mb-12">
          <Eyebrow variant="slash">Apply to the cohort</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="email a founder.">
              Send a brief, or just
            </DisplayHead>
          </div>
        </div>
        <PilotContactForm />
      </Section>

      {/* Trust */}
      <Section>
        <InstrumentRow
          items={[
            {
              icon: "Calendar",
              label: "Timeline",
              claim: "Live in five weeks.",
              proof: "Operators using Vantage in production by day 36 — on your real data, not a sandbox.",
            },
            {
              icon: "Coins",
              label: "Pricing",
              claim: "Cohort terms locked day one.",
              proof: "40% off setup, free support, no per-user fees during pilot. Public price sheet starts after cohort closes.",
            },
            {
              icon: "Headset",
              label: "Support",
              claim: "Founder-led for life of pilot.",
              proof: "Both founders on every working session and every cut-over call. No relay, no junior CS rep.",
            },
          ]}
        />
      </Section>

      {/* End CTA */}
      <Section spacious>
        <EndCTA
          eyebrow="Two slots remain"
          title="Apply to the cohort."
          accent="Twenty-minute call."
          body="A 30-minute scoping call to pick the first workflow, agree the success metric, and set the five-week timeline. If it's a fit, we kick off within two weeks."
          primaryLabel="Book the scoping call"
          secondaryLabel="stephan@vsgtech.co.za"
        />
      </Section>
    </SiteShell>
  );
}

const InOutCol: React.FC<{
  heading: string;
  kind: "in" | "out";
  items: string[];
}> = ({ heading, kind, items }) => {
  const Icon = kind === "in" ? CheckCircle2 : XCircle;
  return (
    <div className="p-8 sm:p-10" style={{ background: "var(--bg)" }}>
      <div className="flex items-center gap-3">
        <Icon
          className="w-5 h-5"
          strokeWidth={1.6}
          style={{
            color: kind === "in" ? "var(--accent-2)" : "var(--muted-2)",
          }}
        />
        <span
          className="text-[11px] uppercase tracking-[0.22em]"
          style={{
            color: kind === "in" ? "var(--accent-2)" : "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          {heading}
        </span>
      </div>
      <ul className="mt-6 space-y-4">
        {items.map((it, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-base leading-relaxed"
            style={{
              color: kind === "in" ? "var(--fg)" : "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              aria-hidden
              className="mt-2 h-1 w-1 rounded-full shrink-0"
              style={{
                background:
                  kind === "in" ? "var(--accent-2)" : "var(--muted-2)",
              }}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
