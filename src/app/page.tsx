"use client";

import { useState } from "react";
import { ShoppingCart, PackageCheck } from "lucide-react";
import { Navbar } from "@/components/v2/Navbar";
import { Hero } from "@/components/v2/Hero";
import { MarqueeLogos } from "@/components/v2/MarqueeLogos";
import { ProductFeatureCards } from "@/components/v2/ProductFeatureCards";
import { FeatureSection } from "@/components/v2/FeatureSection";
import { ProductMockupFrame } from "@/components/v2/ProductMockupFrame";
import { ProcurementMockup } from "@/components/v2/ProcurementMockup";
import { ReceivingMockup } from "@/components/v2/ReceivingMockup";
import { HowItWorks } from "@/components/v2/HowItWorks";
import { WhyBento } from "@/components/v2/WhyBento";
import { StatsBlock } from "@/components/v2/StatsBlock";
import { IntegrationBeams } from "@/components/v2/IntegrationBeams";
import { TestimonialsBand } from "@/components/v2/TestimonialsBand";
import { Footer } from "@/components/v2/Footer";
import { LoadingScreenBeam } from "@/components/v2/LoadingScreenBeam";
import { CursorSpotlight } from "@/components/v2/CursorSpotlight";

/**
 * Homepage — VSG 2026, Aceternity + Magic UI components added.
 *
 * Section flow:
 *   1.  LoadingScreenBeam   — orange thread + VSG wordmark
 *   2.  Hero (Spotlight)    — Linear-style, with Aceternity Spotlight effect
 *   3.  MarqueeLogos        — small clean two-row marquee under hero
 *   4.  Procurement Feature — text + mockup
 *   5.  HowItWorks          — 3-step engagement flow (NEW)
 *   6.  Receiving Feature   — flipped, tinted
 *   7.  WhyBento            — Aceternity-school 6-tile bento (NEW)
 *   8.  StatsBlock          — with NumberTicker count-ups
 *   9.  IntegrationBeams    — Magic UI animated beams diagram (replaces old Integrations FeatureSection)
 *  10.  TestimonialsBand    — Linear-style named-customer quotes
 *  11.  Footer              — clean dark close
 *
 * Strip whatever isn't landing — every new section is independent.
 */

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreenBeam onComplete={() => setIsLoading(false)} />}
      <Navbar />
      {/* Site-wide cursor spotlight — soft warm halo follows the
          mouse through every section. Single quiet motion element. */}
      <CursorSpotlight />
      <main className="relative bg-bg text-text-primary">
        <Hero />

        <MarqueeLogos />

        <ProductFeatureCards />

        <FeatureSection
          eyebrow="Procurement AI · Live"
          icon={ShoppingCart}
          title="Drafts the order."
          titleAccent="Your buyer decides."
          body="Stock falls below your reorder line and the AI proposes the order — quantity, supplier, landed-cost reasoning, confidence number. Your buyer reviews, approves, or overrides with a reason — and every override teaches the next cycle."
          bullets={[
            {
              title: "Trained on your data, never pooled",
              body: "8,412 historical POs and 312 supplier patterns live in your tenant only. Rebuilds nightly.",
            },
            {
              title: "One-click evidence",
              body: "Every recommendation cites the exact rows and supplier history the AI saw before it decided.",
            },
            {
              title: "Confidence on every call",
              body: "Below threshold the case holds at a human — never silent auto-routing on a low-trust signal.",
            },
          ]}
          cta={{ label: "See Procurement AI", href: "/products/procurement-ai" }}
          mockup={
            <ProductMockupFrame
              url="vsg.app / procurement"
              tab="drafts"
              status="Live"
            >
              <ProcurementMockup />
            </ProductMockupFrame>
          }
        />

        <HowItWorks />

        <FeatureSection
          eyebrow="Receiving · In development"
          icon={PackageCheck}
          title="Captures the dock."
          titleAccent="Routes the variance."
          body="Multi-line GRV at the dock, three-way match the moment capture closes, and short-ship / damage / price drift exceptions classified with severity and routed straight to AP — the evidence already attached. No phone calls, no copy-paste."
          bullets={[
            {
              title: "Three-way match, automatic",
              body: "PO ↔ goods received ↔ invoice — variances surface with severity and a plain-English reason.",
            },
            {
              title: "Audit trail by default",
              body: "Every capture, every classification, every override — timestamped against the user. POPIA-aligned.",
            },
            {
              title: "Lifts exceptions cleanly",
              body: "AP gets the reasoning, the photos, the supplier history — all on one record, all without a follow-up email.",
            },
          ]}
          cta={{ label: "See Receiving", href: "/products/receiving" }}
          flipped
          tone="tinted"
          mockup={
            <ProductMockupFrame
              url="vsg.app / receiving"
              tab="GRV-4827"
              status="In development"
            >
              <ReceivingMockup />
            </ProductMockupFrame>
          }
        />

        <WhyBento />

        <StatsBlock />

        <IntegrationBeams />

        <TestimonialsBand />

        <Footer />
      </main>
    </>
  );
}
