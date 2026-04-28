import { SiteShell } from "@/components/SiteShell";
import { PageBanner } from "@/components/PageBanner";
import { HowItWorks } from "@/components/HowItWorks";
import { TenActions } from "@/components/TenActions";
import { WorkflowLibrary } from "@/components/WorkflowLibrary";
import { VantageNotFor } from "@/components/VantageNotFor";
import { VantageAI } from "@/components/VantageAI";
import { VantagePrototype } from "@/components/VantagePrototype";
import { PilotPromo } from "@/components/PilotPromo";
import { LogoCloud } from "@/components/LogoCloud";
import { DayInLife } from "@/components/DayInLife";
import { Stats } from "@/components/Stats";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "Vantage — Operational layer for the ERP",
  description:
    "Vantage centralises everything around the ERP transaction — company approvals, procurement, supplier exceptions, compliance — onto one platform, then adds module-specific AI trained on your operational data. Procurement AI drafts supplier quotes from live stock levels. First workflow live in five weeks.",
};

export default function VantagePage() {
  return (
    <SiteShell>
      <PageBanner
        eyebrow="Flagship SaaS product"
        title="The operational layer for everything —"
        highlight="around the ERP transaction."
        lede={
          <>
            Your ERP handles the transaction. Vantage handles the work
            around it — company approvals, procurement, supplier
            exceptions, compliance checks, customer requests — that today
            lives scattered across spreadsheets, email chains, WhatsApp
            threads and phone calls.{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              One platform, full audit trail, routing logic you own in
              plain English.
            </strong>{" "}
            And on top of that platform, we add module-specific AI trained
            on your operational data — not a generic chatbot. Procurement
            AI drafts supplier quotes from live stock levels and historical
            pricing. Exception AI classifies and routes inbound work the
            moment it lands. Approval AI learns your routing rules and
            surfaces edge cases.{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              First workflow live in five weeks.
            </strong>{" "}
            Custom modules scoped in 1–2 weeks, fixed-price, built by the
            team that built Vantage — same instance, same audit trail.
          </>
        }
      />
      <div
        id="prototype"
        className="relative w-full py-12 scroll-mt-24"
        style={{ background: "var(--bg)" }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <VantagePrototype />
        </div>
      </div>
      <HowItWorks />
      <TenActions />
      <WorkflowLibrary />
      <VantageAI />
      <DayInLife />
      <VantageNotFor />
      <PilotPromo />
      <LogoCloud />
      <Stats />
      <CTA variant="demo" />
    </SiteShell>
  );
}
