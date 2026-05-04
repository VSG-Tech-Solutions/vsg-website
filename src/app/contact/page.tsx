import { SiteShell } from "@/components/SiteShell";
import { Section } from "@/components/patterns/Section";
import { Eyebrow } from "@/components/patterns/Eyebrow";
import { DisplayHead } from "@/components/patterns/DisplayHead";
import { InstrumentRow } from "@/components/patterns/InstrumentRow";
import { ContactDirectory } from "@/components/patterns/ContactDirectory";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "Contact — Talk to a founder, no relay",
  description:
    "Direct line to the VSG founders. Questions, pilot requests, or just curious about what we do — we reply within one working day, every time.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <Section compact divider={false} className="pt-32 sm:pt-44">
        <Eyebrow variant="dot">Talk to a founder</Eyebrow>
        <div className="mt-7 max-w-4xl">
          <DisplayHead level="h1" accent="straight to the founder.">
            Two ways in —
          </DisplayHead>
          <p
            className="mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Send a brief through the form, or email a founder directly —
            whichever feels right. We reply within one working day, every
            time.
          </p>
        </div>
      </Section>

      <Section>
        <div className="grid lg:grid-cols-[7fr_5fr] gap-12 lg:gap-20">
          <div>
            <Eyebrow variant="slash">Send a brief</Eyebrow>
            <div className="mt-6">
              <DisplayHead level="h2">Tell us what you&apos;re trying to fix.</DisplayHead>
            </div>
            <p
              className="mt-6 text-base leading-relaxed max-w-xl"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              The more specific the better. Which workflow leaks days?
              Which exception types pile up? What does &quot;done&quot;
              look like for you? Both founders read every message.
            </p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <ContactDirectory
            founders={[
              {
                name: CONTACT.founders.stephan.name,
                role: CONTACT.founders.stephan.role,
                email: CONTACT.founders.stephan.email,
              },
              {
                name: CONTACT.founders.ernst.name,
                role: CONTACT.founders.ernst.role,
                email: CONTACT.founders.ernst.email,
              },
            ]}
            contacts={[
              {
                icon: "Mail",
                label: "Company",
                value: CONTACT.company.email,
                href: `mailto:${CONTACT.company.email}`,
              },
              {
                icon: "Phone",
                label: "Phone",
                value: CONTACT.company.phone,
                href: CONTACT.company.phoneHref,
              },
              {
                icon: "MapPin",
                label: "Location",
                value: CONTACT.location,
              },
            ]}
          />
        </div>
      </Section>

      <Section>
        <InstrumentRow
          items={[
            {
              icon: "Mail",
              label: "Reply time",
              claim: "Within one working day.",
              proof: "Every message gets read by a founder. No qualification script, no SDR queue.",
            },
            {
              icon: "Phone",
              label: "Calls",
              claim: "Twenty minutes is enough.",
              proof: "Bring your ERP. We bring an exception scenario. We tell you honestly whether a pilot makes sense.",
            },
            {
              icon: "MapPin",
              label: "Location",
              claim: "Cape Town · CAT timezone.",
              proof: "POPIA-aligned. SA mid-market focus. Customer data on infrastructure you choose.",
            },
          ]}
        />
      </Section>
    </SiteShell>
  );
}
