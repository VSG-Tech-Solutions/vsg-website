import { SiteShell } from "@/components/SiteShell";
import { PageBanner } from "@/components/PageBanner";
import { ContactForm } from "@/components/ContactForm";
import { Testimonials } from "@/components/Testimonials";

export const metadata = {
  title: "Contact — Request a Vantage assessment | VSG Tech Solutions",
  description:
    "Come say hello — we'd love to meet you. Drop us a line about where Vantage might help or what you're trying to build, and we'll reply within one working day. Cape Town-based, POPIA-aligned, honest about fit.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <PageBanner
        eyebrow="Come say hello"
        title="Two ways in —"
        highlight="straight to the founder if you want."
        lede="Reach the VSG team through the form below, or go direct to Stephan — whichever feels right. Questions, project briefs, pilot requests, or just curious about what we do, we'd love to hear from you. We reply within one working day, every time."
      />
      <ContactForm />
      <Testimonials />
    </SiteShell>
  );
}
