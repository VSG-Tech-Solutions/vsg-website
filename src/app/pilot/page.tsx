import { SiteShell } from "@/components/SiteShell";
import { PageBanner } from "@/components/PageBanner";
import { PilotPromo } from "@/components/PilotPromo";
import { PilotContactForm } from "@/components/PilotContactForm";
import { Stats } from "@/components/Stats";

export const metadata = {
  title: "Pilot promotion — First 5 clients · 40% off setup, free support, no per-user fees",
  description:
    "VSG is hand-picking five pilot clients for Vantage. 40% off setup, free founder-led support for the life of the pilot, and no per-user monthly fees. Month-to-month after go-live. Live in five weeks. Apply direct to Stephan.",
};

export default function PilotPage() {
  return (
    <SiteShell>
      <PageBanner
        eyebrow="Launch cohort · now accepting"
        title="Five pilot clients."
        highlight="One serious deal."
        lede={
          <>
            We&apos;re hand-picking the first five mid-market operators to run
            Vantage in production. In exchange for working with us while the
            product is young, you get{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              40% off setup
            </strong>
            ,{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              free support
            </strong>{" "}
            from the people who built it, and{" "}
            <strong style={{ color: "var(--fg)", fontWeight: 600 }}>
              no per-user monthly fees
            </strong>{" "}
            — for the life of your pilot engagement. One fair trade, no
            pricing games, no public price sheet.
          </>
        }
      />
      <PilotPromo />
      <PilotContactForm />
      <Stats />
    </SiteShell>
  );
}
