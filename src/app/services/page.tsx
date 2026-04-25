import { SiteShell } from "@/components/SiteShell";
import { PageBanner } from "@/components/PageBanner";
import { ServicesOfferings } from "@/components/ServicesOfferings";
import { DeliveryProcess } from "@/components/DeliveryProcess";
import { ServicesContactForm } from "@/components/ServicesContactForm";
import { Stats } from "@/components/Stats";

export const metadata = {
  title: "Services — Custom software, AI, workflow automation",
  description:
    "VSG runs a fixed-price services practice — bespoke software, custom AI systems and end-to-end workflow automation. Senior engineers, Cape Town delivery, 1–2 weeks of scoping then a fixed quote in writing.",
};

export default function ServicesPage() {
  return (
    <SiteShell>
      <PageBanner
        eyebrow="The services practice"
        title="Bespoke software, custom AI,"
        highlight="end-to-end workflow automation."
        lede="If a real business problem doesn't have a clean off-the-shelf answer, we build the answer. Bespoke software, custom AI systems and end-to-end workflow automation — scoped and quoted upfront, delivered fixed-price by senior engineers in Cape Town. Every engagement starts with 1–2 weeks of scoping and ends with a deliverable list and a fixed price in writing before anything else is signed."
      />
      <ServicesOfferings />
      <DeliveryProcess />
      <ServicesContactForm />
      <Stats />
    </SiteShell>
  );
}
