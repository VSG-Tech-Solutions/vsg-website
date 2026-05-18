/**
 * VSG Products — single source of truth.
 *
 * VSG sells modular AI products (the main offering) AND offers a
 * custom services practice alongside (smaller, secondary).
 *
 * Current focus (2026):
 *   • Procurement AI       — flagship · live + actively expanding
 *   • Production Scheduling — focus · in active development
 *   • Receiving             — in active development (slower track)
 *
 * Future module roadmap retained as `comingSoon` below the main 3.
 *
 * Each entry powers:
 *   • The Navbar's Products dropdown
 *   • The /products index page
 *   • Each /products/[slug] detail page
 *   • The homepage Products bento + feature sections
 */

export type ProductStatus = "live" | "in-development" | "in-design";

export type Product = {
  slug: string;
  name: string;
  /** One-liner under the name in the dropdown + cards. */
  tagline: string;
  /** Two-sentence summary on the homepage bento + product hero. */
  summary: string;
  /** Status pill — drives the "Live" / "In development" indicator. */
  status: ProductStatus;
  /** True for the two products getting active focus on the homepage. */
  focus?: boolean;
  /** Marketing eyebrow for the product detail page. */
  eyebrow: string;
  /** Headline on the product detail page. */
  headline: string;
  /** Capabilities — used on the detail page feature grid. */
  capabilities: { title: string; body: string }[];
  /** Integration story — what it bolts onto. */
  integrations: string[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "procurement-ai",
    name: "Procurement AI",
    tagline: "AI procurement for operators who hate spreadsheets",
    summary:
      "Drafts the order, ranks the quotes, runs the RFQ. Your buyer reviews, approves, or overrides — and every override teaches the next cycle.",
    status: "live",
    focus: true,
    eyebrow: "Procurement AI · Live",
    headline:
      "AI procurement that drafts the work and lets your buyer decide.",
    capabilities: [
      {
        title: "Drafts the next order",
        body: "Stock falls below your reorder line. The AI proposes the order — quantity, supplier, landed-cost reasoning — straight into your buyer's queue.",
      },
      {
        title: "Ranks every quote",
        body: "RFQ closes, the AI ranks supplier responses on total landed cost — not just unit price — with one-click evidence behind every score.",
      },
      {
        title: "Runs the RFQ for you",
        body: "Drafts the RFQ email, sends to invited suppliers, parses replies back into the platform. Your buyer never opens a separate inbox.",
      },
      {
        title: "Learns your way",
        body: "Every override your buyer makes teaches the next cycle. Trained on your data, never pooled with anyone else's.",
      },
    ],
    integrations: ["Syspro", "SAP", "Sage", "NetSuite", "Microsoft 365"],
  },
  {
    slug: "production-scheduling",
    name: "Production Scheduling",
    tagline: "AI-driven production scheduling for manufacturing operators",
    summary:
      "Proposes the production sequence, balances the line, and reroutes around constraints — so the floor manager spends time on exceptions, not on rebuilding the plan every morning.",
    status: "in-development",
    focus: true,
    eyebrow: "Production Scheduling · In development",
    headline:
      "AI scheduling that builds the plan, then reroutes when the floor pushes back.",
    capabilities: [
      {
        title: "Sequence proposal in minutes",
        body: "The AI takes order book, machine state, material availability and labour roster — proposes the day's sequence with a confidence number per shift.",
      },
      {
        title: "Constraint-aware rerouting",
        body: "Machine breakdown, missing component, unplanned changeover — the schedule reroutes around it and surfaces the impact downstream.",
      },
      {
        title: "Visible to the floor",
        body: "Shop-floor view shows what runs next, what's blocked, what's caught up. The supervisor stops being the bottleneck on every reroute.",
      },
      {
        title: "Learns your operation",
        body: "Every override at the floor level — \"actually run B before A\" — gets baked into the next plan. The AI gets sharper at YOUR shop.",
      },
    ],
    integrations: ["Syspro", "SAP", "Sage", "NetSuite", "MES systems"],
  },
  {
    slug: "receiving",
    name: "Receiving",
    tagline: "AI receiving that classifies every variance",
    summary:
      "Capture the GRV at the dock. The AI runs the three-way match, classifies short-ships and price drift, and lifts the AP exception with the evidence already attached.",
    status: "in-development",
    eyebrow: "Receiving · In development",
    headline:
      "AI receiving that takes the dock floor out of the spreadsheet.",
    capabilities: [
      {
        title: "Multi-line GRV capture",
        body: "Dock operator captures every line on arrival, with PO lookup, condition flags, and photo evidence — no copy-paste.",
      },
      {
        title: "Three-way match, automatic",
        body: "PO ↔ goods received ↔ invoice runs the moment capture closes. Variances surface with severity and a plain-English reason.",
      },
      {
        title: "Routes exceptions cleanly",
        body: "Short-ship, damage, price drift — each one classified, attached to the right record, and lifted into AP with the reasoning. No phone calls.",
      },
      {
        title: "Audit trail by default",
        body: "Every capture, every classification, every override — timestamped against the user. POPIA-aligned, regulator-ready.",
      },
    ],
    integrations: ["Syspro", "SAP", "Sage", "NetSuite"],
  },
];

/** Future roadmap — products in design, not yet built. */
export const ROADMAP: { name: string; note: string }[] = [
  { name: "Approvals", note: "Plain-English rules across invoices & POs." },
  { name: "Compliance", note: "Vendor docs that don't expire on you." },
  { name: "Onboarding", note: "Customer + vendor onboarding, end-to-end." },
  { name: "Quality", note: "QC anomaly detection, inbound and out." },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  PRODUCTS.find((p) => p.slug === slug);
