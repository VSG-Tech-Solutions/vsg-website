/* global React, ReactDOM */

/* Services page — deeper than the homepage Services section.
   Three offerings, each with a dedicated section (hero row + use cases),
   plus engagement model + final CTA. */

function ServicesHero({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "96px 0 80px", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-30%",
          right: "-10%",
          width: 1000,
          height: 1000,
          background: "radial-gradient(circle at center, rgba(201,99,58,0.12), rgba(201,99,58,0) 60%)",
          pointerEvents: "none",
        }}
      />
      <Container style={{ position: "relative" }}>
        <Reveal>
          <Eyebrow>What we build</Eyebrow>
          <h1 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--ink-1)", margin: "32px 0 0", maxWidth: 960, textWrap: "balance" }}>
            Software and AI, built <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>around how you work.</em>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ marginTop: 32, maxWidth: 720, fontFamily: "'Geist', sans-serif", fontSize: 21, lineHeight: 1.55, color: "var(--ink-2)" }}>
            Custom software, AI systems, automation, and CRMs — for SA mid-market manufacturers, retailers, and distributors. At the end of the day, all software is custom. Start with one problem; grow from there. Every engagement quoted upfront before we start.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ marginTop: 40, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <PrimaryButton onClick={onBookDemo} size="lg">Start a conversation</PrimaryButton>
            <OutlineButton as="a" href="#custom" size="lg">See the work</OutlineButton>
          </div>
        </Reveal>

        {/* anchor jump nav */}
        <Reveal delay={280}>
          <div style={{ marginTop: 56, display: "flex", gap: 0, borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
            {[
              { h: "#ai-systems", n: "A", l: "AI Systems & Integration" },
              { h: "#automation", n: "B", l: "AI Workflow Automation" },
              { h: "#bespoke", n: "C", l: "Bespoke Software" },
              { h: "#crm", n: "D", l: "Custom CRM" },
            ].map((a, i) => (
              <a
                key={i}
                href={a.h}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "22px 24px",
                  borderRight: i < 3 ? "1px solid var(--hairline)" : "none",
                  textDecoration: "none",
                  color: "var(--ink-1)",
                  transition: "background 220ms cubic-bezier(.2,0,0,1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--paper-2)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>{a.n}</span>
                <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: "-0.015em" }}>{a.l}</span>
                <span style={{ marginLeft: "auto", color: "var(--ink-3)" }}>↓</span>
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// Reuse the visuals from Services.jsx by re-declaring small inline visual cards
// (avoid coupling — keep this page self-sufficient).
function ServiceDeepDive({ id, num, eyebrow, headline, emphasis, body, useCases, deliverables, visual, reverse }) {
  return (
    <Section id={id} alt={reverse}>
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.05fr",
            gap: 80,
            alignItems: "start",
            direction: reverse ? "rtl" : "ltr",
          }}
        >
          <div style={{ direction: "ltr" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                Service {num}
              </span>
              <Eyebrow>{eyebrow}</Eyebrow>
            </div>
            <Headline as="h2" size={56} style={{ marginTop: 28, maxWidth: 540 }}>
              {headline} <em style={{ fontStyle: "italic", fontWeight: 700 }}>{emphasis}</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 540, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.65, color: "var(--ink-2)" }}>
              {body}
            </p>

            <div style={{ marginTop: 36 }}>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                Use cases
              </div>
              <ul style={{ marginTop: 18, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {useCases.map((u, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start", listStyle: "none" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)", marginTop: 8 }} />
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 16, color: "var(--ink-1)", lineHeight: 1.55 }}>{u}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 36 }}>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                Typical deliverables
              </div>
              <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {deliverables.map((d, i) => (
                  <div key={i} style={{ padding: "14px 16px", border: "1px solid var(--hairline)", borderRadius: 10, background: reverse ? "var(--surface-white)" : "var(--paper-2)" }}>
                    <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 14, color: "var(--ink-1)" }}>{d.t}</div>
                    <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", marginTop: 4 }}>{d.s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ direction: "ltr" }}>
            {visual}
          </div>
        </div>
      </Container>
    </Section>
  );
}

// Visuals (lifted/adapted from home Services component)
function VisualCustomBig() {
  return (
    <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.14)" }}>
      <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 18 }}>
        Stack — sits on top, not under
      </div>
      <svg viewBox="0 0 360 240" style={{ width: "100%", height: 260 }}>
        <defs>
          <linearGradient id="svc-fade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="var(--coral)" stopOpacity="0.18" />
            <stop offset="1" stopColor="var(--coral)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect x="20" y="180" width="320" height="42" rx="8" fill="var(--paper-2)" stroke="var(--hairline)" />
        <text x="180" y="206" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" letterSpacing="2.4" fill="var(--ink-3)">ERP · SYSPRO / SAGE / SAP</text>
        <rect x="40" y="120" width="280" height="42" rx="8" fill="var(--surface-white)" stroke="var(--hairline)" />
        <text x="180" y="146" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" letterSpacing="2.4" fill="var(--ink-3)">VENDOR LAYER · STANDARD</text>
        <rect x="60" y="60" width="240" height="42" rx="8" fill="var(--surface-white)" stroke="var(--coral)" />
        <rect x="60" y="60" width="240" height="42" rx="8" fill="url(#svc-fade)" />
        <text x="180" y="86" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" letterSpacing="2.4" fill="var(--coral)">YOUR VSG LAYER</text>
        <rect x="80" y="14" width="200" height="28" rx="8" fill="var(--ink-1)" />
        <text x="180" y="32" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" letterSpacing="2.4" fill="var(--paper)">YOUR USERS</text>
      </svg>
      <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}>
        Your team interacts with a clean surface. The ERP keeps doing the boring stuff it's good at. No replacement, no migration.
      </div>
    </div>
  );
}

function VisualAutomationBig() {
  return (
    <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.14)" }}>
      <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 18 }}>
        A typical automation pipeline
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: 17, top: 22, bottom: 22, width: 1.5, background: "var(--hairline)" }} />
        {[
          { t: "Trigger", s: "PDF lands in supplier@yourco" },
          { t: "Extract", s: "ACE parses PO number, lines, prices, terms" },
          { t: "Reconcile", s: "Match against ERP open orders. Confidence 96%." },
          { t: "Decide", s: "Auto-confirm under R 50k, route exceptions to human" },
          { t: "Post", s: "GRN drafted in SysPro, email confirmation queued" },
          { t: "Log", s: "Every step signed, replayable, exportable" },
        ].map((e, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: 16, alignItems: "center", padding: "14px 0", position: "relative" }}>
            <span style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--paper)", border: `2px solid ${i === 3 ? "var(--coral)" : "var(--ink-1)"}`, justifySelf: "center", zIndex: 1 }} />
            <div>
              <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 14, color: "var(--ink-1)" }}>{e.t}</div>
              <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{e.s}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualBespokeBig() {
  return (
    <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.14)" }}>
      <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 18 }}>
        Engagement shape · weeks
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 1fr", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <span></span>
        {["1–3", "4–8", "9–12"].map((w, i) => (
          <span key={i} style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-4)" }}>{w}</span>
        ))}
      </div>
      {[
        { name: "Discovery", spans: [1, 0, 0] },
        { name: "Prototype", spans: [0, 1, 0] },
        { name: "Production", spans: [0, 0, 1] },
        { name: "Operator pairing", spans: [1, 1, 0] },
        { name: "Handover", spans: [0, 0, 1] },
      ].map((row, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "120px 1fr 1fr 1fr", gap: 8, alignItems: "center", marginTop: 6 }}>
          <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 13, color: "var(--ink-1)" }}>{row.name}</span>
          {row.spans.map((s, j) => (
            <div key={j} style={{ height: 22, borderRadius: 4, background: s ? (i === 1 ? "var(--coral)" : "var(--ink-1)") : "transparent", border: s ? 0 : "1px dashed var(--hairline)" }} />
          ))}
        </div>
      ))}
      <div style={{ marginTop: 22, padding: "14px 16px", background: "var(--paper-2)", borderRadius: 10, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-2)" }}>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--coral)", marginRight: 6 }}>Week 4</span>
        First working prototype on real data. Not a deck.
      </div>
    </div>
  );
}

function VisualCRMBig() {
  return (
    <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.14)" }}>
      <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 18 }}>
        Your pipeline · your stages
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {[
          { stage: "Lead", n: 12 },
          { stage: "Qualified", n: 7 },
          { stage: "Proposal", n: 4 },
          { stage: "Won", n: 2, hot: true },
        ].map((col, i) => (
          <div key={i} style={{ border: "1px solid var(--hairline)", borderRadius: 10, padding: 12, background: "var(--paper-2)" }}>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-4)" }}>{col.stage}</div>
            <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink-1)", marginTop: 6, letterSpacing: "-0.02em" }}>{col.n}</div>
            <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              {Array.from({ length: Math.min(col.n, 3) }).map((_, j) => (
                <div key={j} style={{ height: 16, borderRadius: 4, background: col.hot && j === 0 ? "var(--coral)" : "var(--surface-white)", border: col.hot && j === 0 ? 0 : "1px solid var(--hairline)" }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 18, padding: "14px 16px", background: "var(--paper-2)", borderRadius: 10, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-2)" }}>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--coral)", marginRight: 6 }}>Built for you</span>
        Not another CRM nobody opens.
      </div>
    </div>
  );
}

// ---------- Engagement model section ----------
function EngagementModel() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>How we work</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Three engagement shapes. <em style={{ fontStyle: "italic", fontWeight: 700 }}>No retainer trap.</em>
            </Headline>
          </div>
        </Reveal>

        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { tag: "Sprint", price: "Fixed price", scope: "Two-week sprint. Fixed scope, fixed price. Output: a working prototype, a roadmap, or a plan you can take anywhere. Quoted upfront before we start." },
            { tag: "Project", price: "Scope-priced", scope: "8–16 weeks. Discovery → prototype → production. Fixed price per phase, with a real gate between each. We don't extend without your sign-off." },
            { tag: "Partner", price: "Annual", scope: "Ongoing engineering capacity, treated like an in-house team. Set quarterly objectives together. Walk away with 30 days' notice." },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: "32px 28px", border: "1px solid var(--hairline)", borderRadius: 20, height: "100%", display: "flex", flexDirection: "column", gap: 18, background: i === 1 ? "var(--paper-2)" : "transparent" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Eyebrow>{c.tag}</Eyebrow>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                    {c.price}
                  </span>
                </div>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 16, lineHeight: 1.6, color: "var(--ink-2)", margin: 0 }}>
                  {c.scope}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div style={{ marginTop: 32, padding: "28px 32px", border: "1px solid var(--hairline)", borderRadius: 20, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap", background: "var(--paper)" }}>
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                What you actually get
              </div>
              <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 20, color: "var(--ink-1)", letterSpacing: "-0.015em", maxWidth: 720 }}>
                Source code. Documentation. The phone number of the engineer who built it. No vendor lock-in clause. No "transformation roadmap" that goes nowhere.
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function ServicesCTA({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "144px 0", borderTop: "1px solid var(--hairline)", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{ position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)", width: 1300, height: 1300, background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 55%)", pointerEvents: "none" }}
      />
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <Eyebrow>Start something</Eyebrow>
            <h2 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0, letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance" }}>
              Tell us what's <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>getting in the way.</em>
            </h2>
            <p style={{ marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
              30 minutes with Stephan. Bring the spreadsheet, the bottleneck, or the ask the vendor wouldn't quote. He'll come back with a fit, a no, or a number.
            </p>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Talk to Stephan</PrimaryButton>
              <OutlineButton as="a" href="contact.html" size="lg">hello@vsgtech.co.za</OutlineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ServicesPage({ onBookDemo }) {
  return (
    <React.Fragment>
      <ServicesHero onBookDemo={onBookDemo} />
      <ServiceDeepDive
        id="ai-systems"
        num="A"
        eyebrow="AI Systems & Integration"
        headline="Put AI to work inside"
        emphasis="the systems you run."
        body="Most businesses don't need another piece of software. They need the systems they already run to start thinking for themselves. That's what AI integration does: we take the tools you use every day — your ERP, your spreadsheets, your inbox, your shared drives — and add a layer of intelligence on top. It reads the documents your team would otherwise re-key. It drafts the replies they'd write from scratch. It classifies, reconciles, predicts, and flags the handful of things that genuinely need a person. The rest just gets handled. We're also honest about where AI doesn't belong — part of the job is telling you which parts of your operation AI will quietly transform, and which parts are better left exactly as they are. If you know AI could help somewhere but have no idea where to start, that's the most common place to begin — and the best one."
        useCases={[
          "Reading and extracting data from invoices, POs, contracts, and emails",
          "Drafting replies and documents in your team's own voice",
          "Classifying and routing high-volume inboxes automatically",
          "Reconciling and matching against your ERP and records",
          "Predicting risk early — late deliveries, slow payers, stock-outs",
          "Surfacing the few exceptions that need a human, hiding the noise",
        ]}
        deliverables={[
          { t: "Into your stack", s: "AI added to the tools you already use" },
          { t: "No replacement",  s: "Your systems stay where they are" },
          { t: "Honest scoping",  s: "We tell you where AI won't help, too" },
          { t: "Start with one",  s: "One process, proven, then expand" },
          { t: "Human-in-loop",   s: "AI acts where you allow it, flags the rest" },
          { t: "Audit trail",     s: "Every action logged and explainable" },
        ]}
        visual={<VisualCustomBig />}
      />
      <ServiceDeepDive
        id="automation"
        num="B"
        eyebrow="AI Workflow Automation"
        headline="Automate your"
        emphasis="highest-value workflows."
        body="Some workflows in your business are too important to run on someone re-typing data, following a 12-step manual process, or chasing approvals over WhatsApp. The customer onboarding flow. The credit-check sequence. The supplier-statement reconciliation. The exception-routing decisions someone makes 40 times a week. VSG builds AI workflow automation that takes those workflows over — automating what should be automated, surfacing the decisions that need humans, and getting smarter every week as VSG ACE learns your patterns."
        useCases={[
          "Customer onboarding and credit-check sequences",
          "Supplier-statement reconciliation across 200+ accounts",
          "Quote-to-order handoffs between sales and operations",
          "Exception-routing decisions made 40 times a week",
        ]}
        deliverables={[
          { t: "Custom-built",   s: "Around YOUR business — not a template" },
          { t: "AI decisions",   s: "Not just data movement" },
          { t: "Human-in-loop",  s: "Where it matters; autonomy where it doesn't" },
          { t: "Audit trail",    s: "Every decision the AI makes, logged" },
        ]}
        visual={<VisualAutomationBig />}
        reverse
      />
      <ServiceDeepDive
        id="bespoke"
        num="C"
        eyebrow="Bespoke Software"
        headline="Software built for the problem"
        emphasis="only YOU have."
        body="Every business has a problem that no off-the-shelf software solves. The workflow that's unique to how YOU operate. The internal tool nobody has built because it does not exist off the shelf. The customer portal that does the specific thing your customers actually want. The dashboard that pulls together the data nobody else thinks belongs together. We design, build, and ship that software. Yours. In your repository. With the engineer's phone number on the back of your laptop."
        useCases={[
          "Customer self-service portal that does what YOUR customers ask for",
          "The internal tool nobody has built for you yet",
          "Daily ops dashboard the GM can read in two minutes",
          "Integration layer between systems no vendor will quote",
        ]}
        deliverables={[
          { t: "First slice", s: "Working in two weeks" },
          { t: "Production",  s: "Live in eight" },
          { t: "Source code", s: "Yours, in your repo" },
          { t: "Hand-over",   s: "Docs + the engineer's phone number" },
        ]}
        visual={<VisualBespokeBig />}
      />
      <ServiceDeepDive
        id="crm"
        num="D"
        eyebrow="Custom CRM"
        headline="A CRM shaped around"
        emphasis="how you actually sell."
        body="Here's the open secret about CRM: most businesses pay a fortune for a big-name system and use barely 10% of it. The other 90% is built for someone else's business — getting in the way of yours. So the team quietly drifts back to spreadsheets, and the CRM you're paying for every month becomes an expensive address book. We build the opposite. A CRM shaped around how YOU actually sell — your pipeline, your stages, your data, your team. Connected to the systems you already run, and only as deep as the people using it will genuinely use. No 90% you pay for and ignore. It chases follow-ups, updates records, and reports in plain language — so the people who run the business can read it in two minutes. Start lean, and grow it as you grow."
        useCases={[
          "A pipeline that matches how your deals really move — not a generic funnel",
          "Connected to your ERP, your quotes, and your existing data",
          "Only the fields and steps your team will actually fill in",
          "Automations that chase, remind, and update without anyone re-typing",
          "Reporting the people who run the business can read in two minutes",
          "Replaces the big-name CRM you pay for and barely use",
        ]}
        deliverables={[
          { t: "Your process",  s: "Built around how you sell, not a template" },
          { t: "Connected",     s: "Talks to your existing tools and data" },
          { t: "Actually used", s: "Simple enough that people open it daily" },
          { t: "No bloat",      s: "None of the 90% you'd never touch" },
          { t: "Grows with you", s: "Start lean, add as you need it" },
          { t: "Yours",         s: "Source code, in your repo" },
        ]}
        visual={<VisualCRMBig />}
        reverse
      />
      <EngagementModel />
      <ServicesCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="services">
      <ServicesPage />
    </PageShell>
  );
});
