import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/patterns/Section";
import { Eyebrow } from "@/components/patterns/Eyebrow";
import { DisplayHead } from "@/components/patterns/DisplayHead";
import { SplitFrame } from "@/components/patterns/SplitFrame";
import { EndCTA } from "@/components/patterns/EndCTA";
import { FounderCard } from "@/components/patterns/FounderCard";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "About — Two founders, built in Cape Town",
  description:
    "VSG Tech Solutions is a two-founder Cape Town software company. Both founders involved in every engagement — Vantage and custom builds. Spotted the same gap everywhere we looked: companies running on spreadsheets, email and goodwill. Here to fix that.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      {/* Hero */}
      <Section compact divider={false} className="pt-32 sm:pt-44">
        <Eyebrow variant="dot">About VSG</Eyebrow>
        <div className="mt-7 max-w-4xl">
          <DisplayHead level="h1" accent="spreadsheets and goodwill.">
            Most companies we meet are running on
          </DisplayHead>
          <p
            className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Two young, ambitious software and systems engineers. We
            started VSG after seeing the same gap on almost every
            project: an ERP at the centre, and around it a real business
            held together by spreadsheets, email threads, WhatsApp
            messages and the goodwill of a few overloaded operators.
            We&apos;re here to fix that — properly, and with people we
            actually like working with.
          </p>
        </div>
      </Section>

      {/* The why — light-tone break so the dark cards inside the
          SplitFrame stand out from the dark hero/founders sections. */}
      <Section tone="light">
        <SplitFrame
          eyebrow="Why VSG exists"
          title="The same gap,"
          accent="on almost every project."
          description="We&rsquo;ve worked across enough mid-market operations to spot the pattern. ERPs are excellent at recording transactions. They were never built for the work that wraps every transaction — approvals, supplier comms, exceptions, document chases, audit trails. So that work lives in spreadsheets pretending to be systems, in inboxes nobody can search, in WhatsApp threads that never make it back to the record. We saw it once, then again, then everywhere. So we built two things to close it: Vantage, our flagship AI operational platform, and a custom build practice for the gaps Vantage doesn&rsquo;t cover. Both founders involved on every engagement — no relay, no handoff."
          items={[
            {
              label: "01",
              title: "Both founders, every engagement",
              body: "Vantage pilot or custom build, it&rsquo;s the same two of us on the call. We scope it, we build it, we sit with you when it goes live, and we pick up the phone when something breaks. No SDR, no account manager, no junior on a script.",
            },
            {
              label: "02",
              title: "Real value, real relationships",
              body: "The product has to work, but that&rsquo;s the floor. We want clients we genuinely connect with — operators we&rsquo;d still grab coffee with three years after go-live. Most of our work today comes from people we built with two years ago. That&rsquo;s the bar.",
            },
          ]}
        />
      </Section>

      {/* Founders */}
      <Section>
        <div className="max-w-3xl mb-12">
          <Eyebrow variant="slash">The founders</Eyebrow>
          <div className="mt-6">
            <DisplayHead level="h2" accent="Both on every engagement.">
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
            Two young, ambitious South African engineers — both of us in
            on every Vantage pilot and every custom build. No sales rep,
            no account-manager relay, no junior on a script. You email a
            founder, you talk to a founder.
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
            photo="/founders/stephan.jpeg"
          >
            <p>
              I&apos;m a software and systems engineer, and I started VSG
              with Ernst because every operation we walked into had the
              same gap. The ERP handled the transaction. The actual work
              — the chasing, the approvals, the exceptions, the
              compliance, the audit trail — lived in spreadsheets, email
              and a buyer&apos;s memory. Once you see it, you can&apos;t
              unsee it.
            </p>
            <p>
              I&apos;m on every engagement we ship — Vantage pilot or
              custom build, doesn&apos;t matter. I scope it with you, I
              sit with the build, and I&apos;m on the call when something
              breaks at 7am. And I don&apos;t leave when the project ships
              — I&apos;m there to help you keep improving the system and
              scale it properly, both at the system level and the
              architecture level, as your operation grows. The thing I
              care about most is the relationship — clients I&apos;d
              still grab coffee with three years after go-live.
            </p>
            <p style={{ color: "var(--fg)" }}>
              Email me. I read every message myself, and you&apos;ll get
              a real reply within a working day — no qualification form,
              no relay.
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
              I&apos;m a software and systems engineer, and I co-founded
              VSG with Stephan. My side of the bench is the architecture
              — how Vantage actually fits onto a Syspro or Sage or NetSuite
              without breaking it, where the AI plugs in, how the data
              model holds up under five years of growth instead of buckling
              at month six. The questions nobody asks until they&apos;re
              expensive.
            </p>
            <p>
              I&apos;m in on every engagement, same as Stephan — Vantage
              pilot or custom build, both founders on the call. I&apos;d
              rather over-engineer the foundation and ship a product that
              still feels right in year three than win on a slide and lose
              on a spreadsheet six months in. Quality of the build and
              quality of the relationship — both have to be there.
            </p>
            <p style={{ color: "var(--fg)" }}>
              Email me directly on the architecture, the integration, or
              just the question you&apos;d normally save for a junior. No
              relay, no qualification script, real reply within a working
              day.
            </p>
          </FounderCard>
        </div>
      </Section>

      {/* End CTA */}
      <Section spacious>
        <EndCTA
          eyebrow="Founder direct · no gatekeeping"
          title="Skip the relay."
          accent="Talk to a founder."
          body="No sales rep, no discovery deck, no qualification script. A direct line to the founders for a real conversation about whether VSG is the right fit."
          primaryLabel="Book a 20-minute demo"
          secondaryLabel="stephan@vsgtech.co.za"
        />
      </Section>
    </SiteShell>
  );
}

