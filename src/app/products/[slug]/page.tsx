import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/v2/Navbar";
import { Footer } from "@/components/v2/Footer";
import { PRODUCTS, getProductBySlug } from "@/lib/products";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: product.name,
    description: product.summary,
  };
}

export default async function ProductDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Navbar />
      <main className="relative bg-bg text-text-primary min-h-[100svh]">
        {/* Back link */}
        <div className="pt-32 sm:pt-40 px-6 md:px-10 lg:px-16">
          <div className="max-w-[1200px] mx-auto">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-xs text-muted hover:text-text-primary transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" strokeWidth={1.6} />
              <span className="uppercase tracking-[0.22em]">All products</span>
            </Link>
          </div>
        </div>

        {/* Hero */}
        <section className="relative px-6 md:px-10 lg:px-16 pt-10 pb-20 md:pb-28">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-7">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: "#89AACC" }}
              />
              <span className="text-[10px] uppercase tracking-[0.32em] text-muted">
                {product.eyebrow}
              </span>
            </div>

            <h1
              className="font-display text-text-primary max-w-4xl"
              style={{
                fontSize: "clamp(2.75rem, 7vw, 6rem)",
                lineHeight: 0.95,
                letterSpacing: "-0.025em",
              }}
            >
              {product.headline}
            </h1>

            <p className="mt-8 text-base md:text-lg text-muted max-w-2xl leading-relaxed">
              {product.summary}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href="mailto:stephan@vsgtech.co.za?subject=Demo%20%E2%80%94%20VSG%20{product.name}"
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium bg-text-primary text-bg hover:scale-105 transition-transform duration-200"
              >
                <span>Book a 20-min walkthrough</span>
                <ArrowUpRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </Link>
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium border-2 border-stroke bg-bg text-text-primary hover:scale-105 transition-transform duration-200"
              >
                <span>See other products</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Capabilities — 2x2 hairline grid */}
        <section className="relative px-6 md:px-10 lg:px-16 pb-24 md:pb-32">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-stroke" />
              <span className="eyebrow">What it does</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-stroke rounded-3xl overflow-hidden">
              {product.capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="bg-bg p-8 md:p-10 lg:p-12 min-h-[200px] flex flex-col gap-5"
                >
                  <h3
                    className="font-display text-text-primary"
                    style={{
                      fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.015em",
                    }}
                  >
                    {cap.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-muted leading-relaxed">
                    {cap.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations strip */}
        <section className="relative px-6 md:px-10 lg:px-16 pb-24 md:pb-32 border-t border-stroke pt-20">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-8 h-px bg-stroke" />
              <span className="eyebrow">Plays nicely with</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.integrations.map((i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-4 py-2 rounded-full text-sm text-text-primary border border-stroke bg-surface/40"
                >
                  {i}
                </span>
              ))}
            </div>
            <p className="mt-7 text-sm text-muted max-w-2xl leading-relaxed">
              Connect into the ERP your team already runs. We integrate
              once, deliver clean data, and the AI works on top of your
              real records — never a sandbox.
            </p>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
