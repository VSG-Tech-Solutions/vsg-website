import { SiteShell } from "@/components/SiteShell";
import { PageBanner } from "@/components/PageBanner";
import { AboutStory } from "@/components/AboutStory";
import { LogoCloud } from "@/components/LogoCloud";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "About — Cape Town-built operational software | VSG Tech Solutions",
  description:
    "VSG Tech Solutions builds Vantage and runs a fixed-price custom software, AI and workflow practice. Cape Town-based, POPIA-aligned, founder-led.",
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageBanner
        eyebrow="About VSG"
        title="Built in Cape Town."
        highlight="For operators who need it to actually work."
        lede="VSG Tech Solutions is a Cape Town software company. We make Vantage — an operational control platform for exceptions, approvals and audits — and we run a small fixed-price custom software, AI and workflow practice alongside it. POPIA-aligned. Founder-led."
      />
      <AboutStory />
      <LogoCloud />
      <CTA variant="founder" />
    </SiteShell>
  );
}
