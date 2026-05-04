import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/patterns/Section";
import { MarqueeRail } from "@/components/patterns/MarqueeRail";
import { SplitFrame } from "@/components/patterns/SplitFrame";
import { BentoModule } from "@/components/patterns/BentoModule";
import { TickerLockup } from "@/components/patterns/TickerLockup";
import { PullQuoteFrame } from "@/components/patterns/PullQuoteFrame";
import { InstrumentRow } from "@/components/patterns/InstrumentRow";
import { EndCTA } from "@/components/patterns/EndCTA";
import { PinnedNarrative } from "@/components/patterns/PinnedNarrative";

export default function Home() {
  return (
    <SiteShell>
      <Hero />

      {/* Module breadth ticker — peripheral signal */}
      <MarqueeRail
        items={[
          "Procurement",
          "Approvals",
          "Supplier exceptions",
          "Compliance",
          "Customer requests",
          "Quote-to-cash",
          "Bordereaux & claims",
          "Onboarding",
          "Receiving & GRN",
          "Expense exceptions",
          "Contract & renewal",
          "Vendor compliance",
        ]}
        duration={70}
      />

      {/* Pinned narrative — STR8FIRE-style scroll storytelling */}
      <PinnedNarrative
        defaultLeft={
          <div className="space-y-4">
            <div
              className="text-[10px] uppercase tracking-[0.22em]"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span style={{ color: "var(--accent-2)" }}>/</span> Vantage in
              four beats
            </div>
            <h2
              className="font-extrabold leading-[0.92]"
              style={{
                color: "var(--fg)",
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              The
              <br />
              operational
              <br />
              <span style={{ color: "var(--accent-2)" }}>layer.</span>
            </h2>
            <p
              className="text-base leading-relaxed max-w-sm pt-4"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              Scroll through how Vantage handles everything around the ERP
              transaction — one beat at a time.
            </p>
          </div>
        }
        beats={[
          {
            eyebrow: "What Vantage is",
            display: "ONE",
            kicker: "Centralised platform",
            body: "Every approval, exception, supplier comm and compliance check on one platform. Same data the ERP already owns, one system on top of it. Full audit trail by default.",
          },
          {
            eyebrow: "How the AI works",
            display: "PER MODULE",
            kicker: "Trained on your data",
            body: "Procurement AI sees procurement data. Approval AI learns your routing rules. Exception AI classifies the moment work lands. Not a generic chatbot stretched across everything.",
          },
          {
            eyebrow: "Time to value",
            display: "5 WEEKS",
            kicker: "First workflow live",
            body: "Fixed-scope pilot, fixed-price, on your real data. Not a demo, not a sandbox — operators using Vantage in production by day 36.",
          },
          {
            eyebrow: "Pilot cohort",
            display: "3 / 5",
            kicker: "Slots booked",
            body: "We're hand-picking the first five. 40% off setup, free founder-led support, no per-user fees. Two slots remain.",
          },
        ]}
      />

      {/* Vantage in 4 lines */}
      <Section divider={false}>
        <SplitFrame
          eyebrow="What Vantage is"
          title="The operational layer"
          accent="around the ERP transaction."
          description={
            <>
              Your ERP handles the transaction. Vantage handles everything
              around it — approvals, procurement, supplier exceptions,
              compliance, customer requests — that today lives scattered
              across spreadsheets, email, WhatsApp and phone calls.
            </>
          }
          items={[
            {
              label: "01",
              title: "One centralised platform",
              body: "Every approval routed, every exception logged, every supplier comm timestamped. Same data the ERP already owns, one system on top of it. Full audit trail by default.",
            },
            {
              label: "02",
              title: "Module-specific AI, trained on your data",
              body: "Not a generic chatbot. Procurement AI sees procurement data. Approval AI learns your routing rules. Exception AI classifies inbound work the moment it lands.",
            },
            {
              label: "03",
              title: "Routing logic you own in plain English",
              body: "No black-box decisions. Every rule auditable, every override logged, every escalation tied to the operator who triggered it.",
            },
            {
              label: "04",
              title: "First workflow live in five weeks",
              body: "Fixed-scope pilot, fixed-price, on your data. Not a demo, not a sandbox — a production workflow your team uses on day 36.",
            },
          ]}
        />
      </Section>

      {/* Modules — bento with featured procurement */}
      <Section>
        <BentoModule
          eyebrow="Modules"
          title="Each module is its own"
          accent="trained AI."
          description="The procurement module knows procurement. The approvals module knows your approval ladder. They share one platform, one audit trail, one set of operators — but the AI on each is purpose-built for that workflow, not a generic LLM stretched thin."
          cards={[
            {
              icon: "ShoppingCart",
              eyebrow: "Featured",
              title: "Procurement AI",
              body: "Drafts supplier quotes against live stock levels and historical pricing. Suggests POs based on lead times, reorder points and seasonality. Learns your supplier preferences over time.",
              featured: true,
            },
            {
              icon: "AlertOctagon",
              eyebrow: "Module",
              title: "Exception AI",
              body: "Classifies inbound exceptions the moment they land. Routes to the right operator with SLA timers running.",
            },
            {
              icon: "CheckCircle2",
              eyebrow: "Module",
              title: "Approval AI",
              body: "Learns your routing rules. Surfaces edge cases. Never decides — proposes, with the rule and the evidence.",
            },
            {
              icon: "ShieldCheck",
              eyebrow: "Module",
              title: "Compliance AI",
              body: "Watches expiry dates, BEE certificates, vendor docs. Flags before the gap, not after.",
            },
            {
              icon: "Boxes",
              eyebrow: "Library",
              title: "12 modules ship today",
              body: "Plus custom modules built on the same instance, scoped in 1–2 weeks. See the full library on the Vantage page.",
              href: "/vantage#modules",
            },
          ]}
        />
      </Section>

      {/* Pilot stats */}
      <Section spacious>
        <div className="max-w-3xl mb-12">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05]"
            style={{
              color: "var(--fg)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.025em",
            }}
          >
            Pilot cohort —{" "}
            <span style={{ color: "var(--accent-2)" }}>
              first five clients only.
            </span>
          </h2>
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
              value: 5,
              suffix: " weeks",
              label: "First workflow live",
              description: "Production, on your data — not a demo.",
            },
            {
              value: 40,
              suffix: "%",
              label: "Off setup",
              description: "Cohort pricing. Locked in writing on day one.",
            },
          ]}
        />
      </Section>

      {/* Pull quote — Denver */}
      <Section>
        <PullQuoteFrame
          text="Stock counts ten times faster, and the new customer onboarding form has saved us hours every week."
          attribution="Owner, Denver Auto Spares — Port Elizabeth"
          cite="/case-studies/denver-auto-spares"
          citeLabel="Read the Denver case study"
        />
      </Section>

      {/* Trust instruments */}
      <Section>
        <InstrumentRow
          items={[
            {
              icon: "Users",
              label: "Two founders",
              claim: "Both on every pilot call.",
              proof: "No SDR, no qualification script, no relay. Direct line to the people building the product.",
            },
            {
              icon: "Clock",
              label: "Five-week pilot",
              claim: "First workflow in production by week six.",
              proof: "Fixed scope, fixed price, on your real data. Not a demo, not a sandbox.",
            },
            {
              icon: "MapPin",
              label: "Cape Town",
              claim: "POPIA-aligned. SA mid-market focus.",
              proof: "Built for Syspro, SAP and Sage shops. Customer data stays on infrastructure you choose.",
            },
          ]}
        />
      </Section>

      {/* End CTA */}
      <Section spacious>
        <EndCTA
          eyebrow="Talk to a founder"
          title="Twenty minutes."
          accent="No slides."
          body="We bring your ERP of choice, mock an exception, and walk through how Vantage catches it, classifies it, routes it, and closes the loop. Then we tell you honestly whether a pilot makes sense."
          primaryLabel="Book a 20-minute demo"
          secondaryLabel="stephan@vsgtech.co.za"
        />
      </Section>
    </SiteShell>
  );
}
