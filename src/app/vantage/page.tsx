import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/patterns/Section";
import { Eyebrow } from "@/components/patterns/Eyebrow";
import { DisplayHead } from "@/components/patterns/DisplayHead";
import { NumberedSequence } from "@/components/patterns/NumberedSequence";
import { EndCTA } from "@/components/patterns/EndCTA";
import { VantageHero } from "@/components/VantageHero";
import { VantageMetricsStrip } from "@/components/VantageMetricsStrip";
import { VantageUseCases } from "@/components/VantageUseCases";
import { VantagePrototype } from "@/components/VantagePrototype";
import { VantageArchitecture } from "@/components/VantageArchitecture";
import { VantageIntelligence } from "@/components/VantageIntelligence";
import { VantageModuleShowcase } from "@/components/VantageModuleShowcase";
import { VantagePlatformShowcase } from "@/components/VantagePlatformShowcase";
import { VantageCustomisable } from "@/components/VantageCustomisable";
import { VantageConfigurator } from "@/components/VantageConfigurator";
import { VantageProblem } from "@/components/VantageProblem";
import { VantageFlow } from "@/components/VantageFlow";

export const metadata = {
  title: "Vantage — The AI operational control platform for ERP",
  description:
    "Vantage runs the work. Your ERP keeps the records. Your operator opens a Module, eight named AI specialists pull from the ERP and draft the next move — orders, quotes, variances, exceptions — and the operator decides. 100+ features in production. Six Modules, one Core. First workflow live in five weeks.",
};

export default function VantagePage() {
  return (
    <SiteShell>
      {/*
        Page narrative arc — keep this order. Each act builds on the last.

        ACT 1 — Why this exists
          1. Hero — positioning hook
          2. The problem — ERP records, work scatters

        ACT 2 — How it works
          3. The flow — Open Module → AI drafts → Core handles exception → ERP records
          4. The architecture — modules orbiting one Core (visual)

        ACT 3 — How good it is (the depth)
          5. The intelligence inside — 8 named AI specialists + 12 traits
          6. The full platform — 12 capability categories, 100+ features

        ACT 4 — See it running
          7. The product shell — interactive prototype

        ACT 5 — Make it yours
          8. Customisable — anything you need
          9. Configurator — build your pilot

        ACT 6 — Get started
         10. The 5-week pilot — timeline
         11. Trust — three architectural promises
         12. End CTA
      */}

      {/* Hero */}
      <VantageHero />

      {/* Quantified-credibility strip — Stripe-style trust before the buyer scrolls */}
      <VantageMetricsStrip />

      {/* ACT 1 — The problem */}
      <Section>
        <VantageProblem />
      </Section>

      {/* ACT 2 — How it works (4-step flow) */}
      <Section id="how-it-works">
        <VantageFlow />
      </Section>

      {/* ACT 2 — The architecture diagram (the SHAPE) */}
      <Section id="architecture">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <Eyebrow variant="rule">Architecture</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="one Core for every exception.">
              One Module per area,
            </DisplayHead>
          </div>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Each Module is the operational layer for one part of the
            business — Procurement, Receiving, AP, Quality, more on the
            way. The Module&rsquo;s AI does the draft, your operator
            decides, every override teaches the AI your way next time.
            When something can&rsquo;t close cleanly, the{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              Vantage Core takes over the exception
            </span>{" "}
            — routing, approval chains, escalation, audit trail — and
            walks it to resolution. Click any module to see what it does
            for the person at the desk.
          </p>
        </div>
        <VantageArchitecture />
      </Section>

      {/* ACT 3 — See it running (interactive prototype — MOVED UP from after platform showcase) */}
      <Section id="prototype">
        <div className="max-w-3xl mb-10 sm:mb-14">
          <Eyebrow variant="rule">See it running</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="running on representative data.">
              The real product shell,
            </DisplayHead>
          </div>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Click anywhere — every sidebar link is live. Dashboard, Work
            Queue, Receive, Purchase, Documents, Insights, AI Routing, Ask
            History, Reports, Benchmarking, Supplier Portal, Settings.
            This is the shell your operators land in on day 36 of the
            pilot, running on representative data so you can see the
            workflow before you sign anything.
          </p>
        </div>
        <VantagePrototype />
      </Section>

      {/* Vantage in action — three editorial story cards (buyer / dock / auditor)
          On a LIGHT cream section so the dark cards pop (Apple / Stripe break-rhythm). */}
      <Section id="usecases" tone="light">
        <VantageUseCases />
      </Section>

      {/* ACT 4 — Module Showcase (the FUNCTION — what each Module can do) */}
      <Section id="modules">
        <VantageModuleShowcase />
      </Section>

      {/* ACT 4 — The intelligence inside (the AI) */}
      <Section id="intelligence">
        <VantageIntelligence />
      </Section>

      {/* ACT 4 — The Vantage platform (whole-platform outcome pillars) */}
      <Section id="platform">
        <VantagePlatformShowcase />
      </Section>

      {/* ACT 5 — Make it yours (customisable)
          Second LIGHT-tone break — gives the page a strong dark→light→dark
          rhythm so the visual cadence doesn't go flat after 12 dark sections. */}
      <Section tone="light">
        <VantageCustomisable />
      </Section>

      {/* ACT 5 — Configurator (build your pilot quote) */}
      <Section>
        <VantageConfigurator />
      </Section>

      {/* ACT 6 — The 5-week pilot timeline */}
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

      {/* ACT 6 — End CTA */}
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
