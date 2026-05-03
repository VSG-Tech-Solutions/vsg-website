import { Users, MapPin, Calendar } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/patterns/Section";
import { Eyebrow } from "@/components/patterns/Eyebrow";
import { DisplayHead } from "@/components/patterns/DisplayHead";
import { SplitFrame } from "@/components/patterns/SplitFrame";
import { InstrumentRow } from "@/components/patterns/InstrumentRow";
import { EndCTA } from "@/components/patterns/EndCTA";
import { FounderCard } from "@/components/patterns/FounderCard";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "About — Two founders, built in Cape Town",
  description:
    "VSG Tech Solutions is a two-founder Cape Town software company. We build Vantage — the operational layer around the ERP transaction — and we build relationships with the operators we work with, not transactions.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <Section compact divider={false} className="pt-32 sm:pt-44">
        <Eyebrow variant="dot">About VSG</Eyebrow>
        <div className="mt-7 max-w-4xl">
          <DisplayHead level="h1" accent="goodwill alone.">
            Operations shouldn&apos;t run on
          </DisplayHead>
          <p
            className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Two founders, a small bench of senior engineers, and a single
            stubborn belief: every operations team we&apos;ve worked with
            has been let down by software that promised to fix the chaos
            and didn&apos;t. We&apos;re building the layer that should have
            existed all along.
          </p>
        </div>
      </Section>

      {/* The why */}
      <Section>
        <SplitFrame
          eyebrow="Why VSG exists"
          title="The same pattern,"
          accent="everywhere we looked."
          description="We started VSG because we kept watching the same thing happen. Mid-market operators paid for ERPs, and the ERPs handled the transaction beautifully — but the actual work that wraps every transaction kept living in spreadsheets, email chains, WhatsApp threads and phone calls. No central platform. No AI. No audit trail. Just people holding it together with goodwill."
          items={[
            {
              label: "01",
              title: "ERPs nearly fit, integrations almost worked",
              body: "Vendor after vendor promised to fix it. Adapters that broke under real load. Workflow tools that needed a workflow tool. Spreadsheets pretending to be systems. The pattern repeated across every operator we worked with.",
            },
            {
              label: "02",
              title: "We build relationships, not transactions",
              body: "We stay past go-live. We fix the things we said we'd fix. We're on the call when something breaks. We treat their systems like our own. Both founders on every pilot. Every rule we ship has been tested against real exception data.",
            },
            {
              label: "03",
              title: "Vantage is what we wished existed",
              body: "The platform that pulls the work around the ERP onto one system. Module-specific AI trained on the operator's actual data. Routing rules in plain English. The thing we wished existed every time an exception fell off the edge of a real ERP.",
            },
          ]}
        />
      </Section>

      {/* Founders */}
      <Section>
        <div className="max-w-3xl mb-12">
          <Eyebrow>The founders</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="Both on every pilot.">
              Two founders.
            </DisplayHead>
          </div>
          <p
            className="mt-6 text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            No SDR, no account-manager relay, no junior CS rep on a script.
            You email a founder, you talk to a founder.
          </p>
        </div>

        <div
          className="grid lg:grid-cols-2"
          style={{ background: "var(--card-border)", gap: "1px" }}
        >
          <FounderCard
            name={CONTACT.founders.stephan.name}
            role={CONTACT.founders.stephan.role}
            initials={CONTACT.founders.stephan.initials}
            email={CONTACT.founders.stephan.email}
            linkedin={CONTACT.founders.stephan.linkedin}
            linkedinLabel={CONTACT.founders.stephan.linkedinLabel}
          >
            <p>
              Every operations team we&apos;ve worked with has been let
              down by the same pattern. The ERP handles the transaction,
              and everything around it sits scattered across spreadsheets,
              email, WhatsApp and phone calls. No centralised platform.
              No AI. No audit trail. Just people holding it together with
              goodwill.
            </p>
            <p>
              That&apos;s exactly what we build. Vantage is the layer
              around the ERP that pulls all of that work onto one platform
              — every approval routed, every exception logged, every
              supplier comm timestamped, every rule auditable.
            </p>
            <p style={{ color: "var(--fg)" }}>
              If you&apos;re evaluating Vantage, you&apos;ll talk to a
              founder directly. Email me — I read every message.
            </p>
          </FounderCard>

          <FounderCard
            name={CONTACT.founders.ernst.name}
            role={CONTACT.founders.ernst.role}
            initials={CONTACT.founders.ernst.initials}
            email={CONTACT.founders.ernst.email}
            linkedin={CONTACT.founders.ernst.linkedin}
            linkedinLabel={CONTACT.founders.ernst.linkedinLabel}
          >
            <p>
              Co-founder of VSG Tech Solutions. Builds and ships alongside
              Stephan on every customer engagement — same direct line, same
              accountability for the work.
            </p>
            <p style={{ color: "var(--fg)" }}>
              Email Ernst directly. Every founder reads every message — no
              relay, no qualification script, no waiting in a queue.
            </p>
          </FounderCard>
        </div>
      </Section>

      {/* Trust instruments */}
      <Section>
        <InstrumentRow
          items={[
            {
              icon: "Users",
              label: "Team",
              claim: "Two founders + senior bench.",
              proof: "We bring engineers we've worked with for years onto every pilot. No outsourcing, no offshore handoff, no junior C# templating.",
            },
            {
              icon: "MapPin",
              label: "Location",
              claim: "Cape Town, South Africa.",
              proof: "POPIA-aligned. SA mid-market focus. Customer data stays on infrastructure you choose — Azure, AWS or your own cloud.",
            },
            {
              icon: "Calendar",
              label: "Founded",
              claim: "2024.",
              proof: "Real engagements live, real case studies published. We won't pretend to be older than we are — we'll prove it on the work.",
            },
          ]}
        />
      </Section>

      {/* End CTA */}
      <Section spacious>
        <EndCTA
          eyebrow="Founder direct · no gatekeeping"
          title="Skip the relay."
          accent="Talk to a founder."
          body="No SDR, no discovery deck, no qualification script. A direct line to the founders for a real conversation about whether VSG is the right fit."
          primaryLabel="Book a 20-minute demo"
          secondaryLabel="stephan@vsgtech.co.za"
        />
      </Section>
    </SiteShell>
  );
}

