import { SiteShell } from "@/components/SiteShell";
import { PageBanner } from "@/components/PageBanner";
import { HowItWorks } from "@/components/HowItWorks";
import { TenActions } from "@/components/TenActions";
import { WorkflowLibrary } from "@/components/WorkflowLibrary";
import { VantageAI } from "@/components/VantageAI";
import { VantagePrototype } from "@/components/VantagePrototype";
import { PilotPromo } from "@/components/PilotPromo";
import { LogoCloud } from "@/components/LogoCloud";
import { DayInLife } from "@/components/DayInLife";
import { Stats } from "@/components/Stats";
import { CTA } from "@/components/CTA";

export const metadata = {
  title: "Vantage — Operational control platform | VSG Tech Solutions",
  description:
    "Vantage is the AI-powered operational control platform that runs alongside Syspro, SAP, Sage, NetSuite and internal systems to manage every exception, approval, escalation and discrepancy.",
};

export default function VantagePage() {
  return (
    <SiteShell>
      <PageBanner
        eyebrow="Flagship SaaS product"
        title="Every exception, every workflow —"
        highlight="controlled on one configurable platform."
        lede={
          <>
            Vantage is a configurable operational control platform that sits
            between your ERP and the work it was never built to handle. It
            ships with a{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              standard library of 12 exception workflows
            </strong>{" "}
            — AP mismatches, stuck approvals, QC non-conformances, supplier
            onboarding, customer complaints and more — deployed to your data
            in five weeks and routed through rules you own in plain English.{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              Need logic beyond the library? We build custom workflows and
              features directly on your Vantage instance
            </strong>{" "}
            — no separate platform, no vendor juggling, same audit trail and
            rules engine. Scoped in 1–2 weeks, fixed-price, delivered by the
            team that built Vantage. The built-in AI watches the whole thing,
            proposing new rules with evidence — so the system sharpens every
            week without ever running autonomously.
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
      <PilotPromo />
      <DayInLife />
      <LogoCloud />
      <Stats />
      <CTA variant="demo" />
    </SiteShell>
  );
}
