/* global React, ReactDOM */

/* VSG ICT — product page. GROUND TRUTH: vault 02-products/ict/WEBSITE-BUILD-CONTEXT.md
   Everything in the main sections is SHIPPED AND TRUE. Future capability lives ONLY in
   the Today/Roadmap section, clearly labelled. "AI-assisted", never "AI-powered".
   No invented metrics, no fake clients ("a South African steel distributor" only). */

// ============================================================
// STATIC PLANNING-GRID MOCKUP (illustrative UI, real feature shape)
// ============================================================

const GRID_ROWS = [
  { sku: "FLT-2050-3", now: "1.8", m1: "1.2", m2: "0.6", m3: "0.2", flag: "#C9633A" },
  { sku: "ANG-5040-6", now: "3.4", m1: "2.9", m2: "2.3", m3: "1.7", flag: "#B8933A" },
  { sku: "CHS-1010-2", now: "5.1", m1: "4.6", m2: "4.0", m3: "3.5", flag: "#5E8C61" },
  { sku: "RND-0812-6", now: "2.2", m1: "1.5", m2: "0.9", m3: "0.4", flag: "#C9633A" },
  { sku: "SHT-3MM-2500", now: "4.0", m1: "3.3", m2: "2.8", m3: "2.1", flag: "#5E8C61" },
];

function GridMockup() {
  const cell = {
    fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "var(--ink-2)",
    padding: "7px 10px", borderBottom: "1px solid var(--hairline)", textAlign: "right",
  };
  return (
    <div style={{
      background: "var(--surface-white)", border: "1px solid var(--hairline)",
      borderRadius: 16, overflow: "hidden", boxShadow: "0 24px 60px rgba(26,26,26,0.08)",
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "12px 16px", borderBottom: "1px solid var(--hairline)", background: "var(--paper-2)",
      }}>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
          Analysis · months of cover per SKU
        </span>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)" }}>
          projected →
        </span>
      </div>
      <div role="table" aria-label="Illustration of the VSG ICT planning grid">
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr 1fr" }}>
          {["SKU", "Now", "+1 mo", "+2 mo", "+3 mo"].map((h, i) => (
            <div key={h} style={{ ...cell, textAlign: i === 0 ? "left" : "right", color: "var(--ink-4)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}>{h}</div>
          ))}
          {GRID_ROWS.map((r) => (
            <React.Fragment key={r.sku}>
              <div style={{ ...cell, textAlign: "left", color: "var(--ink-1)", fontWeight: 500 }}>
                <span style={{ display: "inline-block", width: 7, height: 7, borderRadius: "50%", background: r.flag, marginRight: 8, verticalAlign: "middle" }} />
                {r.sku}
              </div>
              <div style={cell}>{r.now}</div>
              <div style={cell}>{r.m1}</div>
              <div style={cell}>{r.m2}</div>
              <div style={{ ...cell, color: parseFloat(r.m3) < 1 ? "#C9633A" : "var(--ink-2)", fontWeight: parseFloat(r.m3) < 1 ? 700 : 400 }}>{r.m3}</div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 16px", fontFamily: "'Geist', sans-serif", fontSize: 12, color: "var(--ink-3)", background: "var(--paper-2)", borderTop: "1px solid var(--hairline)" }}>
        Illustrative data. Red = cover falls below target before your next order would land.
      </div>
    </div>
  );
}

// ============================================================
// HERO
// ============================================================

function SourceHero({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", paddingTop: 96, paddingBottom: 88, overflow: "hidden" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }}>
          <div>
            <Reveal>
              <Eyebrow>VSG ICT · AI-assisted procurement · In production</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h1 style={{
                fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 72,
                lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--ink-1)",
                margin: "28px 0 0", textWrap: "balance",
              }}>
                Procurement that thinks{" "}
                <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>months ahead.</em>
              </h1>
            </Reveal>
            <Reveal delay={160}>
              <p style={{ marginTop: 28, maxWidth: 560, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.6, color: "var(--ink-2)" }}>
                VSG ICT reads your live SYSPRO data and turns it into a clear buying
                decision: what to buy, how much, and from which supplier at the lowest
                true landed cost — ending in a SYSPRO-ready purchase order. In production
                today at a South African steel distributor.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", gap: 10 }}>
                {["Built for SYSPRO", "Read-only against your ERP", "On-premise — nothing leaves the building", "One file, no installer"].map((c) => (
                  <span key={c} style={{
                    fontFamily: "'Geist', sans-serif", fontSize: 13.5, fontWeight: 500,
                    color: "var(--ink-2)", background: "var(--surface-white)",
                    border: "1px solid var(--hairline)", borderRadius: 999, padding: "7px 14px",
                  }}>
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={280}>
              <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <PrimaryButton onClick={onBookDemo}>Book a 30-minute walkthrough</PrimaryButton>
                <PrimaryButton as="a" href="#how-it-works" style={{ background: "transparent", color: "var(--ink-1)", border: "1px solid var(--divider-strong)" }}>
                  See how it works
                </PrimaryButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={200}>
            <GridMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ============================================================
// FACT STRIP — product facts, not performance claims
// ============================================================

function FactStrip() {
  const facts = [
    { v: "5 months", l: "projected ahead, per SKU, with seasonality" },
    { v: "18 months", l: "of your sales history behind every forecast" },
    { v: "Read-only", l: "against SYSPRO — it can never change your ERP data" },
    { v: "1 file", l: "self-contained install — no cloud, no dependencies" },
  ];
  return (
    <Section alt>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {facts.map((f, i) => (
            <Reveal key={f.v} delay={i * 70}>
              <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 16, padding: 26, height: "100%" }}>
                <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 30, letterSpacing: "-0.03em", color: "var(--ink-1)" }}>{f.v}</div>
                <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontSize: 14.5, lineHeight: 1.5, color: "var(--ink-3)" }}>{f.l}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// HOW IT WORKS — the four screens
// ============================================================

function FourScreens() {
  const steps = [
    { n: "01", t: "Connect", b: "Point it at your SYSPRO data source, choose the product classes and warehouses to load, and connect. A built-in demo mode runs the whole app on sample data — so you can see everything before it touches a single record of yours." },
    { n: "02", t: "Analyse", b: "The forward planning grid: every SKU's projected stock and months of cover, five months out, flagged red, amber or green against your target. Click any SKU and drill into the evidence — stock lots with per-lot cost, incoming purchase orders, which customers buy it." },
    { n: "03", t: "Compare", b: "Send suppliers a quote request as a simple file they fill in and return. VSG ICT compares every quote on true landed cost — price plus duty, clearing, freight and exchange rate — and shows how full each supplier's load would be. Award line by line." },
    { n: "04", t: "Sign off", b: "Export the plan for internal review, re-import it approved, and generate the purchase order — in SYSPRO's exact import format, carrying the quote reference for traceability. Your buyer imports it. The decision stays human; the assembly work doesn't." },
  ];
  return (
    <Section id="how-it-works">
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>How it works</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Four screens. One buying decision,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>done properly.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 70}>
              <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 32, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 12, letterSpacing: "0.24em", color: "var(--coral)" }}>{s.n}</span>
                  <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: "-0.02em", color: "var(--ink-1)" }}>{s.t}</span>
                </div>
                <p style={{ marginTop: 14, fontFamily: "'Geist', sans-serif", fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)" }}>{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// THE PLANNING GRID — hero feature deep-dive
// ============================================================

function PlanningGridSection() {
  const items = [
    { t: "Forecast per SKU, five months out", b: "Built from up to 18 months of your own sales history, with seasonality — reduced December and January trade included — and the current month prorated properly." },
    { t: "Cover flags you can act on", b: "Projected closing stock and months of cover per SKU per month, red, amber or green against your target — so the SKU that runs dry in month three gets bought in month one." },
    { t: "The money view", b: "SYSPRO valuation-based stock-turn, an upturn score that weighs turn against margin, and a buy-up cash factor that shows where a small extra spend materially improves cover." },
    { t: "Multi-warehouse, one line", b: "Nets a SKU's stock and usage across the warehouses you select — one honest number instead of four partial ones." },
    { t: "Evidence one click away", b: "Drill into any SKU: every stock lot with its unit cost and local-vs-import split, every incoming purchase order with price and due date, and which customers actually buy it." },
    { t: "Filters that keep up with a buyer", b: "By class, warehouse, or SKU wildcard, with per-column filters that understand ranges — plus show and hide any column." },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>The planning grid</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              The spreadsheet your buyer rebuilds every Monday —{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>rebuilt for good.</em>
            </Headline>
            <p style={{ marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 640 }}>
              This is the heart of VSG ICT: your whole buying picture, per SKU, per
              supplier, per month — live from SYSPRO instead of assembled by hand.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 60}>
              <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, height: "100%" }}>
                <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.015em", color: "var(--ink-1)", textWrap: "balance" }}>{it.t}</div>
                <p style={{ marginTop: 10, fontFamily: "'Geist', sans-serif", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)" }}>{it.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// LANDED COST — RFQ round-trip
// ============================================================

function LandedCostSection() {
  return (
    <Section>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <Reveal>
            <div>
              <Eyebrow>True landed cost</Eyebrow>
              <Headline as="h2" size={52} style={{ marginTop: 32 }}>
                The cheapest quote is often{" "}
                <em style={{ fontStyle: "italic", fontWeight: 700 }}>the expensive one.</em>
              </Headline>
              <p style={{ marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.65, color: "var(--ink-2)" }}>
                Sticker price isn't cost. VSG ICT compares every supplier quote on what
                the stock actually costs delivered — quote price plus import duty,
                clearing, freight and exchange rate — side by side, line by line.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                ["RFQ round-trip", "Export a quote request as a self-contained file. The supplier fills in prices and sends it back. Import it — no portal for them to learn, no retyping for you."],
                ["Local vs import, handled", "Duty, clearing and currency applied where they belong, so a local and an import quote finally compare fairly."],
                ["Container fill", "See how full each supplier's load would be before you award — because half-empty containers are landed cost too."],
                ["Award your way", "Best supplier per line, or a whole column in one move — always on landed cost, never on sticker."],
              ].map(([t, b], i) => (
                <div key={t} style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 16, padding: "20px 24px" }}>
                  <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 16.5, color: "var(--ink-1)" }}>{t}</div>
                  <div style={{ marginTop: 6, fontFamily: "'Geist', sans-serif", fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-2)" }}>{b}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// OUTPUT — the SYSPRO-ready PO
// ============================================================

function POOutputSection() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 800 }}>
            <Eyebrow>The output</Eyebrow>
            <Headline as="h2" size={52} style={{ marginTop: 32 }}>
              It ends the way your ERP{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>wants it to.</em>
            </Headline>
            <p style={{ marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)" }}>
              From the awarded quotes — or straight from the planning grid — VSG ICT
              generates a purchase order in SYSPRO's exact import format, with the
              landed-cost calculations applied and the originating quote reference
              carried through for traceability. Your buyer reviews it and imports it.
            </p>
            <p style={{ marginTop: 18, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)" }}>
              And that's deliberate: <strong style={{ color: "var(--ink-1)" }}>VSG ICT never writes into
              SYSPRO.</strong> Your ERP stays the system of record, your buyer stays the
              decision-maker, and every plan can be exported for internal sign-off and
              kept as a dated snapshot — a paper trail your auditors will actually enjoy.
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// SECURITY / IT
// ============================================================

function SourceSecurity() {
  const rows = [
    ["Read-only by design", "Connects to SYSPRO read-only. It physically cannot corrupt, change or delete your ERP data."],
    ["On-premise, no cloud", "Runs on your own PC. No external transmission — your stock, prices and suppliers never leave the building. POPIA-friendly by architecture, not by policy."],
    ["One self-contained file", "No installer, no dependencies, no agents on your network. IT can inspect exactly what runs."],
    ["Licensed and protected", "Per-PC activation with a machine-locked key, a clear licence agreement, and a hardened build."],
    ["Demo mode built in", "The full application runs on built-in sample data — evaluate everything with zero access granted."],
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 48 }}>
            <Eyebrow>Built for locked-down IT</Eyebrow>
            <Headline as="h2" size={52} style={{ marginTop: 32 }}>
              Your IT manager's favourite{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>kind of software.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {rows.map(([t, b], i) => (
            <Reveal key={t} delay={i * 50}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: 40, padding: "26px 0",
                borderTop: i === 0 ? "1px solid var(--ink-1)" : "1px solid var(--hairline)",
              }}>
                <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 19, color: "var(--ink-1)" }}>{t}</div>
                <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)" }}>{b}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// TODAY vs ROADMAP — the honest line
// ============================================================

function TodayRoadmap() {
  const today = [
    "Forward planning grid — five months of projected cover per SKU",
    "Financial stock-turn, upturn scoring and the buy-up cash factor",
    "Supplier RFQ round-trip with true landed-cost comparison",
    "Container fill and local-vs-import handling",
    "SYSPRO-ready purchase order with quote traceability",
    "Plan export, sign-off re-import and dated snapshots",
  ];
  const roadmap = [
    "Posting approved POs (and later goods receipts) straight into SYSPRO through its official e.net interface — no re-keying",
    "AI-drafted supplier emails, always with buyer approval before anything sends",
    "Multi-level approval workflows — buyer, manager, MD, with thresholds",
    "Machine-learning demand forecasting alongside today's history-based projection",
    "A plain-language copilot: ask questions of your live inventory",
    "Deeper inventory intelligence — classification, safety stock, dead-stock and working-capital optimisation",
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 48 }}>
            <Eyebrow>Today — and where it's going</Eyebrow>
            <Headline as="h2" size={52} style={{ marginTop: 32 }}>
              What it does today.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>What's coming next.</em>
            </Headline>
            <p style={{ marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 640 }}>
              We keep a visible line between the two — you should always know exactly
              what you're buying.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Reveal>
            <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 36, height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--coral)" }} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>Shipped · in production</span>
              </div>
              <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {today.map((s) => (
                  <li key={s} style={{ listStyle: "none", display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, fontFamily: "'Geist', sans-serif", fontSize: 15.5, lineHeight: 1.55, color: "var(--ink-1)" }}>
                    <span style={{ color: "var(--coral)", fontWeight: 700 }}>✓</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 36, height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--ink-4)" }} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>On the roadmap</span>
              </div>
              <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {roadmap.map((s) => (
                  <li key={s} style={{ listStyle: "none", display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, fontFamily: "'Geist', sans-serif", fontSize: 15.5, lineHeight: 1.55, color: "var(--ink-2)" }}>
                    <span style={{ color: "var(--ink-4)" }}>→</span>{s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// ROLES — the morning after go-live
// ============================================================

function SourceRoles() {
  const roles = [
    { t: "The buyer", b: "Stops rebuilding the planning spreadsheet every Monday. The grid assembles the picture; the buyer applies judgement, compares suppliers on landed cost, and awards. Hours of assembly become minutes of deciding." },
    { t: "The financial manager", b: "Sees stock in money terms — valuation-based turn, margin-weighted upturn, and where a small buy-up spend protects cover. Every award is defensible on true delivered cost, with a paper trail." },
    { t: "The MD", b: "Gets a plan that was reviewed before it was ordered — exported, signed off, snapshotted with a date. What was bought, from whom, at what landed cost, and why: answerable in one place." },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 48 }}>
            <Eyebrow>Who feels it</Eyebrow>
            <Headline as="h2" size={52} style={{ marginTop: 32 }}>
              Three desks, the morning{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>after go-live.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {roles.map((r, i) => (
            <Reveal key={r.t} delay={i * 70}>
              <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 30, height: "100%" }}>
                <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 20, color: "var(--ink-1)" }}>{r.t}</div>
                <p style={{ marginTop: 12, fontFamily: "'Geist', sans-serif", fontSize: 15.5, lineHeight: 1.6, color: "var(--ink-2)" }}>{r.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// CTA
// ============================================================

function SourceCTA({ onBookDemo }) {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <Eyebrow style={{ justifyContent: "center" }}>See it for yourself</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Thirty minutes.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>No deck.</em>
            </Headline>
            <p style={{ marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 620, marginLeft: "auto", marginRight: "auto" }}>
              We'll walk you through the working application — the planning grid, the
              landed-cost comparison, the purchase order at the end. It has a built-in
              demo mode, so you see everything before any access is granted.
            </p>
            <div style={{ marginTop: 36 }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book the walkthrough</PrimaryButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// FAQ
// ============================================================

const SOURCE_FAQS = [
  { q: "Is VSG ICT an add-on inside SYSPRO?", a: "No — it's a standalone application that runs on your own PC and reads your SYSPRO data directly, read-only. Nothing is installed inside your ERP, and SYSPRO stays the system of record for everything." },
  { q: "Can it change or corrupt our SYSPRO data?", a: "It can't. The connection is read-only by design — VSG ICT reads stock, sales and purchase data and never writes back. The purchase order it produces is a file in SYSPRO's import format that your buyer reviews and imports." },
  { q: "We don't run SYSPRO — can we still use it?", a: "VSG ICT is built for SYSPRO today. If you run a different ERP, that becomes a custom build conversation — it's exactly the kind of system we build around other ERPs as bespoke work." },
  { q: "Where's the AI in it?", a: "Today, the intelligence is the forecasting and the landed-cost mathematics — which is why we call it AI-assisted, not AI-powered. The deeper AI (drafted supplier emails with buyer approval, learning forecasts, a plain-language copilot) is on the roadmap, and we keep a visible line between what's shipped and what's coming." },
  { q: "What does installation involve?", a: "One self-contained file on one PC — no installer, no server, no cloud account. Setup is choosing your SYSPRO data source, product classes and warehouses. A built-in demo mode runs on sample data with no database access at all." },
  { q: "How is it priced?", a: "Simply, and in writing — we'll take you through it on the walkthrough call once you've seen the application working." },
];

function SourceFAQ() {
  const [open, setOpen] = React.useState(null);
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 48 }}>
            <Eyebrow>Questions</Eyebrow>
            <Headline as="h2" size={52} style={{ marginTop: 32 }}>
              Asked before you{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>have to ask.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ maxWidth: 860 }}>
          {SOURCE_FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 40}>
              <div style={{ borderTop: i === 0 ? "1px solid var(--ink-1)" : "1px solid var(--hairline)" }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{
                    width: "100%", textAlign: "left", background: "none", border: "none",
                    padding: "22px 0", cursor: "pointer", display: "flex",
                    justifyContent: "space-between", alignItems: "center", gap: 20,
                  }}
                >
                  <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 18, color: "var(--ink-1)" }}>{f.q}</span>
                  <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 400, fontSize: 22, color: "var(--coral)", lineHeight: 1 }}>{open === i ? "−" : "+"}</span>
                </button>
                {open === i && (
                  <p style={{ margin: "0 0 24px", fontFamily: "'Geist', sans-serif", fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 720 }}>{f.a}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// PAGE
// ============================================================

function SourcePage({ onBookDemo }) {
  return (
    <React.Fragment>
      <SourceHero onBookDemo={onBookDemo} />
      <FactStrip />
      <FourScreens />
      <PlanningGridSection />
      <LandedCostSection />
      <POOutputSection />
      <SourceSecurity />
      <TodayRoadmap />
      <SourceRoles />
      <SourceCTA onBookDemo={onBookDemo} />
      <SourceFAQ />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="source">
      <SourcePage />
    </PageShell>
  );
});
