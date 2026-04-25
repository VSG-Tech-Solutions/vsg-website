/**
 * Case study source-of-truth.
 *
 * Each entry powers BOTH the card on /case-studies AND the dedicated detail
 * page at /case-studies/[slug]. Honest pre-pilot positioning: every record
 * has an explicit `stage` (scoping / in-pilot / published) and a `published`
 * boolean — we never invent outcomes for cards still in discovery.
 *
 * To add a new case study:
 *   1. Append a record below with a unique `slug`.
 *   2. Pick a Lucide icon name from the `iconName` union (or extend it).
 *   3. Once a real outcome lands, set `published: true` and fill `outcome`.
 */

export type CaseStudyStage =
  | "Scoping conversations"
  | "In active discovery"
  | "Pilot live"
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
  /** Whether the public detail page should announce real outcomes or stay in
   *  honest "we'll publish when it ships" mode. */
  published: boolean;
  /** One-paragraph summary used on the card. */
  summary: string;
  /** Sectioned long-form content rendered on the detail page. */
  brief: string[];
  /** What we will measure during the pilot. */
  successMetrics: string[];
  /** What's currently happening — visible on detail page so prospects can
   *  see we don't hide pre-pilot honestly. */
  currentStatus: string;
  /** Once published, fill in the actual outcome bullets. */
  outcome?: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "manufacturing-distributor-syspro",
    iconName: "Factory",
    vertical: "Manufacturing & distribution",
    headline:
      "Supplier exception handling for a 60-person Syspro distributor.",
    stage: "In active discovery",
    published: false,
    summary:
      "Reduce time-to-resolution on short-shipments and supplier mismatches from days to hours, with an auditable trail for the annual review.",
    brief: [
      "A 60-person distributor running Syspro is losing 18–22 working days per month to supplier exceptions — short-ships, damaged stock, wrong-SKU receipts, and three-way-match failures that sit in shared mailboxes for days before resolution.",
      "Their finance team logs every exception manually into a spreadsheet for the year-end audit. By the time auditors arrive, half the trail has already gone cold.",
      "The brief: drop time-to-resolution from days to hours, capture every exception with operator identity and timestamps, and produce an auditor-ready export at the click of a button.",
    ],
    successMetrics: [
      "Median time-to-resolution on supplier exceptions (target: under 4 hours)",
      "% of exceptions with full audit trail (target: 100%)",
      "Annual audit prep time (target: 80% reduction)",
      "Supplier-side response SLA hit rate (baseline + delta)",
    ],
    currentStatus:
      "Discovery brief signed. Pilot scope locked for the next available cohort slot. Integration plan covers Syspro AP module, GRN data and email-based supplier comms.",
  },
  {
    slug: "specialty-insurer-bordereaux",
    iconName: "Shield",
    vertical: "Specialty insurance",
    headline:
      "Bordereaux + claims front-door workflow for a specialty insurer.",
    stage: "Scoping conversations",
    published: false,
    summary:
      "Catch inbound claims the moment they land, classify by policy and severity, and route to the right adjuster with SLA timers — replacing the current shared-inbox triage.",
    brief: [
      "A specialty insurer handling complex claims runs intake through a shared mailbox. Bordereaux files arrive from brokers in mixed formats — Excel, PDF, sometimes embedded in email body — and triage relies on whoever opens the inbox first that morning.",
      "Claims occasionally sit unread for 48+ hours during volume spikes. The compliance team has no realtime view of front-door dwell time, and audit packs are reconstructed manually when regulators ask.",
      "The brief: capture every inbound claim at the front door, classify by policy line and severity using the insurer's own rules, route to the named adjuster with an SLA timer running from minute one — and produce a regulator-ready trail by default.",
    ],
    successMetrics: [
      "Claims-at-front-door dwell time (target: under 30 minutes)",
      "% of claims correctly classified on first pass (target: > 95%)",
      "SLA breach rate by policy line (baseline + delta)",
      "Audit pack assembly time (target: same-day, not week-long)",
    ],
    currentStatus:
      "Two scoping conversations completed. Awaiting confirmation of pilot start date pending the underwriting head's review of the rules-engine deployment plan.",
  },
  {
    slug: "marketing-agency-intake",
    iconName: "Megaphone",
    vertical: "Marketing services",
    headline:
      "Client-request intake and approval routing for a busy agency.",
    stage: "Scoping conversations",
    published: false,
    summary:
      "Replace Slack-and-email chaos with a structured intake → brief → draft → review → delivery flow with a visible status at every stage.",
    brief: [
      "An agency with ~40 staff and ~25 retained accounts is drowning in client requests across Slack, email, WhatsApp and a project tool that nobody uses consistently. Account managers spend most of Monday reconstructing the previous week.",
      "Repeat work, missed approvals, and quiet scope creep are eating margin. There is no single view of who owes what, to whom, by when — and clients are noticing.",
      "The brief: one intake door, one approval ladder, one status board per client — built on the agency's existing taxonomy of work types, not a generic project template.",
    ],
    successMetrics: [
      "Account manager hours spent on status reconstruction (target: 70% reduction)",
      "% of requests with explicit client approval recorded (target: 100%)",
      "Median request → first response time (target: under 1 working day)",
      "Net retainer margin delta over the pilot quarter",
    ],
    currentStatus:
      "Two scoping conversations completed. Workflow taxonomy mapped against the agency's existing work types — pilot cohort placement pending sign-off.",
  },
];

export const getCaseStudyBySlug = (slug: string): CaseStudy | undefined =>
  caseStudies.find((c) => c.slug === slug);
