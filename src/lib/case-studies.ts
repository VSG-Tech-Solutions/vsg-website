/**
 * Case study source-of-truth.
 *
 * Each entry powers BOTH the card on /case-studies AND the dedicated detail
 * page at /case-studies/[slug]. We only publish real engagements with real
 * client sign-off. No invented case studies, no placeholder logos.
 *
 * To add a new case study:
 *   1. Append a record below with a unique `slug`.
 *   2. Pick a Lucide icon name from the `iconName` union (or extend it).
 *   3. Set `published: true` only after client sign-off on naming + outcome.
 */

export type CaseStudyStage =
  | "Scoping conversations"
  | "In active discovery"
  | "Pilot live"
  | "Delivered — phase 2 ongoing"
  | "Live in production"
  | "Published";

export type CaseStudyIcon =
  | "Factory"
  | "Shield"
  | "Megaphone"
  | "Building2"
  | "Truck";

export type CaseStudy = {
  slug: string;
  iconName: CaseStudyIcon;
  vertical: string;
  headline: string;
  stage: CaseStudyStage;
  /** Whether the public detail page should show real outcomes. */
  published: boolean;
  /** One-paragraph summary used on the card. */
  summary: string;
  /** Client label — anonymised string OR named client (e.g. "Denver Auto Spares"). */
  client: string;
  /** Optional public client website. Shown as a link in the engagement sidebar
   *  when the client is named. */
  clientUrl?: string;
  /** Optional engagement window (e.g. "June 2025 – April 2026"). */
  engagement?: string;
  /** Size / shape of the operation. */
  size: string;
  /** Problem narrative — paragraphs. */
  problem: string[];
  /** Approach narrative — paragraphs. */
  approach: string[];
  /** What we delivered — bullets of live scope. */
  delivered: string[];
  /** Measurable result bullets. */
  outcome: string[];
  /** Phase-2 / ongoing work bullets — optional. */
  ongoing?: string[];
  /** Sidebar status copy — visible on the detail page. */
  currentStatus: string;
  /** Set true while a client quote is pending — surfaces an honest panel
   *  instead of a fabricated quote. Mutually exclusive with `quote`. */
  pendingQuote?: boolean;
  /** Real client quote — rendered as a pull-quote on the detail page. Only
   *  add when the client has signed off on the wording. */
  quote?: {
    text: string;
    attribution: string;
  };
  /** Optional in-platform screenshots. All client-identifying chrome must be
   *  scrubbed before adding here (logo, tabs, real names, banking fields). */
  screenshots?: {
    src: string;
    alt: string;
    caption: string;
  }[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "denver-auto-spares",
    iconName: "Truck",
    vertical: "Auto spares — vehicle stripping & retail",
    headline:
      "Stock counts ten times faster with QR-labelled parts.",
    stage: "Live in production",
    published: true,
    summary:
      "A bespoke retail and stripping platform built across 11 sequential work orders. Counter staff scan parts on arrival, customers self-register from the website, and the same codebase is now growing into the company's financial-management hub.",
    client: "Denver Auto Spares (Port Elizabeth, South Africa).",
    clientUrl: "https://denverautospares.co.za",
    engagement: "June 2025 – April 2026 · ongoing.",
    size: "~10 in-store staff, single branch in Port Elizabeth, stripping five different car brands.",
    problem: [
      "Denver Auto Spares strips five different car brands in Port Elizabeth and resells the parts to walk-in, phone and online customers. Off-the-shelf retail and accounting tools don't model what they actually do — a single car becomes a long list of individually-tracked parts, each with photos, pricing and a status (available, in cart, sold, damaged, lost).",
      "Stock counts dragged at the end of every shift. Counter staff captured customer details on paper, then re-typed them into the system, costing roughly twenty minutes per new customer and introducing typos that resurfaced months later on invoices.",
    ],
    approach: [
      "Denver Auto Spares brought us a written spec broken into numbered work orders — WO1 through WO11 — and asked us for a bespoke build rather than an automation layer. We worked through the work orders sequentially against a single owned codebase rather than starting greenfield each time, so every release built on the last.",
      "The app is a custom web platform on serverless infrastructure with a managed database. Server-rendered pages — fast loads, low overhead for a 10-person shop. Where features earned their place, we built them: PDF invoices, quotes and credit notes; QR-coded printable part labels with a batch print queue; automatic photo resizing and thumbnailing on upload; SMS-based PIN login for staff at the counter.",
      "We built the public customer-registration form to write straight into the system with input validation and bot protection, removing the paper-and-retype step at the counter. The bank-statement CSV import ships with duplicate detection so a re-uploaded month does not double-book.",
    ],
    delivered: [
      "Custom web platform on serverless infrastructure with a managed database — no servers for the shop to operate.",
      "Server-rendered pages with light per-page interactivity — fast loads, low overhead for a 10-person shop.",
      "Per-part tracking with photos, pricing and status (available, in cart, sold, damaged, lost) — a stripped car becomes a structured inventory list.",
      "QR-coded printable part labels with a batch print queue.",
      "PDF invoices, quotes and credit notes generated on demand.",
      "SMS-based staff PIN login at the counter.",
      "Public customer-registration form writing straight into the system with input validation and bot protection.",
      "Bank-statement CSV import with duplicate detection so re-uploaded months don't double-book.",
      "Automatic photo resizing and thumbnailing on upload.",
    ],
    outcome: [
      "Stock counting ten times faster, in the owner's words — manual counts replaced by scan-in on arrival, with periodic audits instead of every-shift counts.",
      "≈20 minutes saved per new customer at the counter, plus the typo-driven invoice errors that used to surface months later are gone.",
      "Bank-statement import surfaces mis-keyed payments before they age, instead of being reconstructed at month-end.",
      "Eleven work orders shipped sequentially against one codebase — every release builds on the last instead of starting greenfield.",
    ],
    ongoing: [
      "Steady expansion of the same codebase into Denver Auto Spares' financial-management hub — accounts, reporting and adjacent workflows landing on the existing platform rather than as bolted-on tools.",
    ],
    currentStatus:
      "Live in production, in active use across all in-store stations. Continued releases ship against the same owned codebase as the financial-hub scope grows.",
    quote: {
      text: "You guys are on fire.",
      attribution: "Owner, Denver Auto Spares — standing line on delivery pace.",
    },
  },
  {
    slug: "funeral-insurance-distribution",
    iconName: "Building2",
    vertical: "Funeral insurance — distribution",
    headline:
      "One self-service platform for 900+ agents — onboarding, comms, commission, payroll.",
    stage: "Delivered — phase 2 ongoing",
    published: true,
    summary:
      "Replaced the spreadsheets and WhatsApp threads that ran a six-tier sales force with a single self-service platform. Every agent has their own login. Onboarding, comms, commission and payroll all live on one audit trail.",
    client: "SME funeral insurance distributor, South Africa (published anonymously at client's request).",
    size: "900+ active agents nationwide, organised in a six-tier sales hierarchy (L1 Agents through L6 National Manager) across multiple partner silos.",
    problem: [
      "The client recruits and manages a funeral insurance sales force across a six-level hierarchy — agents, distributors, managers, area managers, regional managers and a national manager — selling policies administered on a separate external system called POL360.",
      "Before this engagement, the sales-force database lived in spreadsheets. Onboarding a new agent meant chasing documents by email, manually capturing details into a sheet, copying verification links into WhatsApps, and hoping nothing fell through.",
      "Commission workings sat in separate workbooks. There was no single place to see which agents were dormant, which were awaiting a verified email, or which had never submitted a first policy.",
    ],
    approach: [
      "We built a centralised sales-force platform on cloud infrastructure, modelling the six-level hierarchy directly in the database so L1–L6 relationships, agent re-allocations, and partner-scoped permissions became data rather than spreadsheet conventions.",
      "Every agent and distributor has their own login, with five enforced access levels — an L1 Agent sees their own commissions, status, documents and stats; an L6 National Manager sees everything across every partner; admin sees the operational control surface.",
      "For communications we wrote a background pipeline with per-message de-duplication, dispatched over SMS and email, every send timestamped and stored under the recipient. The three-email onboarding sequence and status-change notifications fire automatically the moment an agent moves out of Under-Review.",
      "On top of that we automated the money side: commission calculations run on the platform against ingested policy data, and payroll is prepared and managed from the same system — so every agent's journey from onboarding to earnings to payout lives on one audit trail.",
    ],
    delivered: [
      "Centralised self-service platform on cloud infrastructure with managed secrets and managed database.",
      "Six-tier sales hierarchy modelled in the database with partner-scoped permissions.",
      "Per-agent self-service login with five enforced access levels (L1 Agent through L6 National Manager + admin).",
      "Background communications pipeline — three-email onboarding sequence + status-change notifications, SMS and email, every send timestamped.",
      "Commission automation against ingested policy data.",
      "Payroll preparation and management on the same audit trail.",
    ],
    outcome: [
      "900+ active agents nationwide running on one platform, each with their own login.",
      "Agents and distributors self-serve on status, commissions, documents and sales stats — no more phoning head office.",
      "Onboarding is fully remote and digital end-to-end: capture, verification, status tracking and document storage all live in the platform.",
      "What an agent sold, what they earned and what they were paid reconcile on one audit trail.",
      "Spreadsheets and WhatsApp-based manual onboarding retired.",
    ],
    ongoing: [
      "POL360 policy-system integration.",
      "Approval workflow for status transitions.",
      "Operational dashboards on top of the platform base.",
    ],
    currentStatus:
      "Phase 1 delivered and in production on the client's cloud. Phase 2 — POL360 integration, approval workflow and dashboards — is in active build.",
    pendingQuote: true,
    screenshots: [
      {
        src: "/case-studies/funeral-insurance/01-dashboard.png",
        alt: "Sales operations dashboard showing active agents, policies today, MTD volume, new premium, pending approvals and outstanding documents, with charts for captured policies and inception-month breakdowns.",
        caption:
          "The operational control surface — active agents, policies today, MTD volume, pending approvals and outstanding documents on one screen, with captured-policy and inception-month breakdowns underneath.",
      },
      {
        src: "/case-studies/funeral-insurance/02-sales-force-roster.png",
        alt: "Sales force roster table listing agents with role, M&C code, status, province, distributor, area manager and compliance percentage.",
        caption:
          "The six-tier hierarchy modelled in SQL — every agent's role, M&C code, distributor, area manager and compliance score in one filterable roster.",
      },
      {
        src: "/case-studies/funeral-insurance/03-add-member.png",
        alt: "Add Member modal capturing personal information, ID, mobile, role and assessment mark, with tabs for documents, bank, address and notes.",
        caption:
          "Onboarding intake — every new agent captured digitally end-to-end. Submission triggers verification, welcome and policy-link emails automatically.",
      },
      {
        src: "/case-studies/funeral-insurance/04-commission-cycle.png",
        alt: "Commission cycle screen with exception flags (invalid email, compliance below 80%, duplicate M&C code) above a provisional ledger of per-agent and per-distributor earnings totalling R 162,575 across 1476 policies, with an Approve Cycle action.",
        caption:
          "A monthly commission cycle — exceptions surfaced before approval, then a provisional ledger of per-agent, distributor and area-manager earnings on the same audit trail as onboarding.",
      },
      {
        src: "/case-studies/funeral-insurance/05-audit-logs.png",
        alt: "System administration audit log showing timestamped commission rule updates, cycle approvals, hierarchy modifications and compliance setting changes against named users.",
        caption:
          "Every config change, cycle approval and hierarchy edit timestamped against the user — the audit trail that used to be reconstructed from spreadsheets at year-end.",
      },
    ],
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);
