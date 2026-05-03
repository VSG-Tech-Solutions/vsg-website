import {
  Code2,
  Cpu,
  Workflow,
  FileSearch,
  PenTool,
  Hammer,
  CheckSquare,
  Repeat,
  ScrollText,
  Coins,
  ClipboardList,
} from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/patterns/Section";
import { Eyebrow } from "@/components/patterns/Eyebrow";
import { DisplayHead } from "@/components/patterns/DisplayHead";
import { BentoModule } from "@/components/patterns/BentoModule";
import { NumberedSequence } from "@/components/patterns/NumberedSequence";
import { InstrumentRow } from "@/components/patterns/InstrumentRow";
import { EndCTA } from "@/components/patterns/EndCTA";
import { ServicesContactForm } from "@/components/ServicesContactForm";

export const metadata = {
  title: "Services — Custom software, AI, workflow automation",
  description:
    "Bespoke software, custom AI systems and end-to-end workflow automation. Senior engineers in Cape Town, fixed-price delivery, scoped in 1–2 weeks before anything is signed.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <Section compact divider={false} className="pt-32 sm:pt-44">
        <Eyebrow variant="dot">The services practice</Eyebrow>
        <div className="mt-7 max-w-4xl">
          <DisplayHead level="h1" accent="we build the answer.">
            When off-the-shelf doesn&apos;t fit,
          </DisplayHead>
          <p
            className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Vantage is the product. The services practice is what we run
            alongside it — bespoke software, custom AI systems, and
            end-to-end workflow automation. Scoped in 1–2 weeks. Fixed-price
            in writing before anything is signed.{" "}
            <span style={{ color: "var(--fg)", fontWeight: 600 }}>
              Senior engineers, Cape Town delivery.
            </span>
          </p>
        </div>
      </Section>

      {/* Service tracks */}
      <Section>
        <BentoModule
          eyebrow="Three tracks"
          title="What we build"
          accent="when Vantage isn't the answer."
          description="Some problems need a product. Some need a custom build. We're honest about which is which — and we won't sell you Vantage if a 6-week custom engagement is the right thing."
          cards={[
            {
              icon: "Code2",
              eyebrow: "Featured",
              title: "Bespoke software",
              body: "Production-grade .NET 8 + React platforms. Multi-tenant SaaS, internal tools, customer-facing apps. Built like Vantage was — with the same senior bench, the same audit-trail discipline, the same fixed-price cadence.",
              featured: true,
            },
            {
              icon: "Cpu",
              eyebrow: "Track",
              title: "Custom AI systems",
              body: "Module-specific AI on your operational data. RAG over your docs. Agentic workflows. Integrated into your existing stack, not parachuted in as a separate tool.",
            },
            {
              icon: "Workflow",
              eyebrow: "Track",
              title: "Workflow automation",
              body: "End-to-end automation from intake to handover. Email and chat capture, classification, routing, escalation, audit log. The pieces Vantage assembles, ready to deploy on your stack.",
            },
          ]}
        />
      </Section>

      {/* Engagement model */}
      <Section>
        <NumberedSequence
          eyebrow="Engagement model"
          title="Scope first."
          accent="Then a fixed price in writing."
          description="We don't quote until we've sat with your operators, watched the work, and understood what 'done' actually means. Most engagements close their scoping in 1–2 weeks; the price quoted is the price you pay."
          items={[
            {
              kicker: "Stage 1",
              title: "Scoping (1–2 weeks)",
              body: "Discovery sessions with operators. Data review. Existing-system audit. Success-metric agreement. Output: a written brief with the deliverables, the timeline, and the price.",
            },
            {
              kicker: "Stage 2",
              title: "Build (4–10 weeks)",
              body: "Senior engineers from day one. Weekly demo. No agency middle-layer, no junior templating, no offshore handoff. We ship to staging early and iterate against real users.",
            },
            {
              kicker: "Stage 3",
              title: "Cut-over",
              body: "Production handover with both founders on the call. Documentation, runbooks, monitoring all in your hands. We don't disappear — we agree the support model in writing before cut-over.",
            },
            {
              kicker: "Stage 4",
              title: "Phase 2 / iterate",
              body: "Most engagements grow. We re-scope on the same fixed-price model. The relationship continues; we just don't charge for it being there.",
            },
          ]}
        />
      </Section>

      {/* What you get */}
      <Section>
        <BentoModule
          eyebrow="What's in every engagement"
          title="Senior delivery"
          accent="from day one."
          cards={[
            {
              icon: "FileSearch",
              eyebrow: "01",
              title: "1–2 weeks of scoping",
              body: "Discovery sessions, data review, written brief — before any quote. We won't price what we haven't understood.",
            },
            {
              icon: "PenTool",
              eyebrow: "02",
              title: "Fixed price in writing",
              body: "What we quote is what you pay. No T&M creep, no surprise change-orders, no junior team upselling premium.",
            },
            {
              icon: "Hammer",
              eyebrow: "03",
              title: "Senior engineers from day one",
              body: ".NET 8, React, Postgres, Azure. Same team that ships Vantage. No agency layer, no offshore handoff.",
            },
            {
              icon: "CheckSquare",
              eyebrow: "04",
              title: "Audit trail by default",
              body: "Every action logged, every change attributable, every override traceable. Built like a regulated-industry app, even when it isn't one.",
            },
            {
              icon: "Repeat",
              eyebrow: "05",
              title: "Iterate against real users",
              body: "We ship to staging early. Operators use it before cut-over. The build closes against real feedback, not a wishlist.",
            },
            {
              icon: "ScrollText",
              eyebrow: "06",
              title: "Documentation + runbooks",
              body: "Cut-over hands you the system, the docs, the monitoring. We don't ship dependencies you can't operate.",
            },
            {
              icon: "Coins",
              eyebrow: "07",
              title: "Cape Town delivery rates",
              body: "Senior engineering at SA market rates. No European agency pricing on a regional team.",
            },
            {
              icon: "ClipboardList",
              eyebrow: "08",
              title: "Both founders on the call",
              body: "Every working session. Every cut-over. No relay, no junior CS rep, no qualification gate.",
            },
          ]}
        />
      </Section>

      {/* Form */}
      <Section>
        <div className="max-w-3xl mb-12">
          <Eyebrow>Send a brief</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="we'll reply within a day.">
              Tell us what you&apos;re trying to build —
            </DisplayHead>
          </div>
        </div>
        <ServicesContactForm />
      </Section>

      {/* Trust */}
      <Section>
        <InstrumentRow
          items={[
            {
              icon: "Code2",
              label: "Stack",
              claim: ".NET 8 + React + Postgres + Azure.",
              proof: "Production stacks, not greenfield experiments. Same tech we ship Vantage on, same patterns, same audit discipline.",
            },
            {
              icon: "Cpu",
              label: "AI",
              claim: "Trained on your data.",
              proof: "RAG, agents, classifiers. Integrated into your stack, not parachuted in as a separate tool.",
            },
            {
              icon: "Coins",
              label: "Pricing",
              claim: "Fixed-price in writing.",
              proof: "What we quote is what you pay. No T&M creep, no surprise change-orders, no junior up-sell.",
            },
          ]}
        />
      </Section>

      {/* End CTA */}
      <Section spacious>
        <EndCTA
          eyebrow="Custom build · scoped 1–2 weeks"
          title="Send a brief."
          accent="Get a fixed price."
          body="Most briefs scope in two weeks. We'll tell you upfront if Vantage is a better fit, and walk away from the build if it is."
          primaryLabel="Book a scoping call"
          secondaryLabel="stephan@vsgtech.co.za"
        />
      </Section>
    </SiteShell>
  );
}
