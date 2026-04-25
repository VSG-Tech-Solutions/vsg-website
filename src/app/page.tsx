import { SiteShell } from "@/components/SiteShell";
import { Hero } from "@/components/Hero";
import { LogoCloud } from "@/components/LogoCloud";
import { Stats } from "@/components/Stats";
import { HomeTeasers } from "@/components/HomeTeasers";
import { ExceptionScenarios } from "@/components/ExceptionScenarios";
import { PilotPromo } from "@/components/PilotPromo";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";

export default function Home() {
  return (
    <SiteShell>
      <Hero />
      <PilotPromo />
      <LogoCloud />
      <ExceptionScenarios />
      <HomeTeasers />
      <Testimonials />
      <Stats />
      <CTA variant="pilot" />
    </SiteShell>
  );
}
