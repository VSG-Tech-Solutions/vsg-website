import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/v2/Navbar";
import { Footer } from "@/components/v2/Footer";
import { PRODUCTS } from "@/lib/products";

/**
 * /products — index of every product VSG sells.
 *
 * Two live (Procurement, Receiving) + four in design (Approvals,
 * Compliance, Onboarding, Quality). Lives on the dark canvas with
 * the same nav + footer system as the homepage.
 */

export const metadata = {
  title: "Products",
  description:
    "Modular AI products from VSG — Procurement and Receiving live now. More launching through 2026.",
};

const COMING_SOON = [
  { name: "Approvals", note: "Invoice and PO approvals on plain-English rules." },
  { name: "Compliance", note: "Vendor docs and BEE certificates that don't expire on you." },
  { name: "Onboarding", note: "Customer + vendor onboarding without the email shuffle." },
  { name: "Quality", note: "QC anomaly detection across inbound and outbound." },
];

export default function ProductsIndexPage() {
  return (
    <>
      <Navbar />
      <main className="relative bg-bg text-text-primary min-h-[100svh]">
        {/* Hero */}
        <section className="relative pt-40 sm:pt-48 pb-20 px-6 md:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-7">
              <span className="w-8 h-px bg-stroke" />
              <span className="eyebrow">All products</span>
            </div>
            <h1
              className="font-display text-text-primary max-w-3xl"
              style={{
                fontSize: "clamp(2.75rem, 7vw, 6rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              Modular AI{" "}
              <span className="italic text-muted">for operations.</span>
            </h1>
            <p className="mt-7 text-base md:text-lg text-muted max-w-2xl leading-relaxed">
              Each product is standalone — sold to teams that run it, and
              wholesale to ERP vendors that embed it. Two live today.
              More through 2026.
            </p>
          </div>
        </section>

        {/* Live products */}
        <section className="relative pb-24 px-6 md:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "#89AACC" }}
              />
              <span className="text-[10px] uppercase tracking-[0.32em] text-muted">
                Currently shipping
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {PRODUCTS.map((product) => (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="group relative block overflow-hidden rounded-3xl border border-stroke bg-surface p-7 sm:p-10 min-h-[320px] flex flex-col justify-between"
                >
                  {/* Hover gradient ring */}
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 accent-border-anim"
                    style={{ inset: "-1px", padding: "1px" }}
                  />
                  <span className="absolute inset-0 rounded-3xl bg-surface" />

                  <div className="relative flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-[0.22em] text-text-primary bg-stroke/40">
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: "#89AACC" }}
                      />
                      Live
                    </span>
                    <ArrowUpRight
                      className="w-5 h-5 text-muted group-hover:text-text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div className="relative">
                    <h3
                      className="font-display text-text-primary"
                      style={{
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {product.name}
                    </h3>
                    <p className="mt-4 text-[14px] text-muted leading-relaxed max-w-md">
                      {product.tagline}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {product.integrations.map((i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] uppercase tracking-[0.18em] text-muted border border-stroke"
                        >
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Coming-soon — quieter strip */}
        <section className="relative pb-32 px-6 md:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-stroke"
              />
              <span className="text-[10px] uppercase tracking-[0.32em] text-muted">
                In design · 2026
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-stroke rounded-2xl overflow-hidden">
              {COMING_SOON.map((p) => (
                <div
                  key={p.name}
                  className="bg-bg p-7 min-h-[140px] flex flex-col justify-between"
                >
                  <h4 className="font-display text-text-primary text-2xl md:text-3xl tracking-tight">
                    {p.name}
                  </h4>
                  <p className="text-[13px] text-muted leading-relaxed">
                    {p.note}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-between flex-wrap gap-4 text-sm text-muted">
              <span>Want one of these earlier? Tell us which.</span>
              <Link
                href="mailto:stephan@vsgtech.co.za?subject=Early%20access%20%E2%80%94%20VSG%20product"
                className="inline-flex items-center gap-1.5 text-text-primary hover:gap-2.5 transition-[gap]"
              >
                Ask about early access
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.6} />
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
