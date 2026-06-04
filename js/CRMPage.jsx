/* global React, ReactDOM */

/* Custom CRM — dedicated service page.
   Hero → the 10% problem → what we build instead → how it works → CTA. */

// ============================================================
// HERO
// ============================================================

function CRMHero({ onBookDemo }) {
  return (
    <section style={{
      position: "relative", background: "var(--paper)",
      paddingTop: 96, paddingBottom: 96, overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
        width: 1400, height: 900,
        background: "radial-gradient(ellipse at center, rgba(201,99,58,0.08), rgba(201,99,58,0) 60%)",
        pointerEvents: "none",
      }} />
      <Container style={{ position: "relative" }}>
        <Reveal>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)",
            marginBottom: 32,
          }}>
            <a href="index.html" style={{ color: "var(--ink-4)", textDecoration: "none" }}>← VSG Tech</a>
            <span>/</span>
            <a href="services.html" style={{ color: "var(--ink-4)", textDecoration: "none" }}>What we build</a>
            <span>/</span>
            <span style={{ color: "var(--ink-1)" }}>Custom CRM</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div style={{
            fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
            marginBottom: 24,
          }}>
            Service · Custom CRM
          </div>
        </Reveal>

        <Reveal delay={140}>
          <h1 style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 0.98,
            letterSpacing: "-0.045em", color: "var(--ink-1)", margin: 0,
            maxWidth: 1080, textWrap: "balance",
          }}>
            A CRM shaped around{" "}
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>how you actually sell.</em>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            marginTop: 36, maxWidth: 760,
            fontFamily: "'Geist', sans-serif", fontSize: 21, lineHeight: 1.55, color: "var(--ink-2)",
          }}>
            Here's the open secret about CRM: most businesses pay a fortune for a big-name system and use barely 10% of it. The other 90% is built for someone else's business — getting in the way of yours. We build the opposite: a CRM around your pipeline, your stages, your team. Connected to what you already run, and only as deep as the people using it will genuinely use.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div style={{ marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <PrimaryButton onClick={onBookDemo} size="lg">Talk about your pipeline</PrimaryButton>
            <OutlineButton as="a" href="#problem" size="lg">The 10% problem</OutlineButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ============================================================
// THE 10% PROBLEM
// ============================================================

function TenPercentProblem() {
  return (
    <Section id="problem" alt>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <div>
              <Eyebrow>The 10% problem</Eyebrow>
              <Headline as="h2" size={56} style={{ marginTop: 32 }}>
                You're paying for a CRM{" "}
                <em style={{ fontStyle: "italic", fontWeight: 700 }}>you barely use.</em>
              </Headline>
              <p style={{ marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)", maxWidth: 480 }}>
                A big-name CRM is built to sell to everyone — so it does a thousand things, and ninety percent of them have nothing to do with your business. Your team faces a wall of fields nobody fills in, reports nobody reads, and workflows that fight the way you actually work.
              </p>
              <p style={{ marginTop: 18, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)", maxWidth: 480 }}>
                So they quietly drift back to the spreadsheet. The CRM becomes an expensive address book you pay for every single month — and the deals still live in someone's head.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 24, padding: 40, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.14)" }}>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 20 }}>
                What you pay for vs what you use
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 72, letterSpacing: "-0.04em", color: "var(--coral)", lineHeight: 1 }}>10%</span>
                <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 17, color: "var(--ink-3)" }}>actually used</span>
              </div>
              <div style={{ marginTop: 24, height: 14, borderRadius: 7, background: "var(--paper-2)", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "10%", background: "var(--coral)", borderRadius: 7 }} />
              </div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                <span>What your team touches</span>
                <span>90% bloat you pay for</span>
              </div>
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--hairline)", fontFamily: "'Geist', sans-serif", fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)" }}>
                We build the 10% that matters to you — properly — and leave out the rest. Nothing to pay for and ignore.
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// WHAT WE BUILD INSTEAD — capability cards
// ============================================================

const CRM_FEATURES = [
  {
    n: "01",
    tag: "Your pipeline",
    title: "Stages that match how deals really move.",
    body: "Not a generic lead-to-close funnel. The actual stages your deals pass through — the quote, the site visit, the sample, the credit check, whatever it really is. The board reflects your business, so your team recognises it.",
  },
  {
    n: "02",
    tag: "Connected",
    title: "Talks to the systems you already run.",
    body: "Your ERP, your quoting, your accounting, your existing data. The CRM doesn't sit in its own island making people double-key — it's wired into the tools your team already uses, so the data flows both ways.",
  },
  {
    n: "03",
    tag: "Only what's used",
    title: "No fields nobody fills in.",
    body: "Every field, every step, every screen earns its place. If your team won't use it, we don't build it. The result is a CRM people actually open every day — because it helps them, instead of taxing them.",
  },
  {
    n: "04",
    tag: "Automated",
    title: "Chases and updates without re-typing.",
    body: "Follow-up reminders, status updates, handovers between sales and ops — handled automatically. The admin that makes people abandon a CRM disappears, so the pipeline stays current without anyone babysitting it.",
  },
  {
    n: "05",
    tag: "Readable",
    title: "Reporting the MD reads in two minutes.",
    body: "Not a dashboard nobody opens. The few numbers that actually tell you what's happening — pipeline value, what's stuck, who to chase — in plain language, on one screen, for the people who run the business.",
  },
  {
    n: "06",
    tag: "Yours",
    title: "The code is yours, in your repo.",
    body: "No per-seat trap that punishes you for growing. No vendor lock-in. You own the CRM, the data, and the code. Start lean on a small team, and grow it as the business grows — on your terms, not a price tier.",
  },
];

function WhatWeBuildInstead() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>What we build instead</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              The 10% that matters —{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>built properly.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {CRM_FEATURES.map((w, i) => (
            <Reveal key={i} delay={(i % 3) * 80}>
              <div style={{
                background: "var(--surface-white)", border: "1px solid var(--hairline)",
                borderRadius: 20, padding: 32, height: "100%", display: "flex", flexDirection: "column",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: 9, background: "var(--coral-soft)",
                    color: "var(--coral)", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Geist Mono', monospace", fontSize: 11, fontWeight: 600,
                  }}>{w.n}</span>
                  <span style={{
                    fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)",
                  }}>{w.tag}</span>
                </div>
                <h3 style={{
                  fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 21, lineHeight: 1.25,
                  letterSpacing: "-0.02em", color: "var(--ink-1)", margin: "0 0 12px", textWrap: "balance",
                }}>{w.title}</h3>
                <p style={{
                  fontFamily: "'Geist', sans-serif", fontSize: 14, lineHeight: 1.65,
                  color: "var(--ink-3)", margin: 0, flex: 1,
                }}>{w.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// HOW IT WORKS
// ============================================================

const CRM_STEPS = [
  { w: "Step 1", t: "Discovery (45 min, free)", b: "We sit with the people who sell and the people who run delivery. We learn how a deal really moves from first contact to paid." },
  { w: "Step 2", t: "Map the 10%", b: "Together we strip it to what actually matters — the stages, fields, and reports your team will genuinely use. The rest stays out." },
  { w: "Step 3", t: "Build + connect", b: "We build it around your process and wire it into your ERP and existing data. A working version on your real pipeline, fast." },
  { w: "Step 4", t: "Your team uses it", b: "Real deals, real people. We watch what they ignore and what they reach for, and refine until it's the tool they open first." },
  { w: "Then", t: "Grow with you", b: "Add the next stage, the next automation, the next team — as the business needs it. No per-seat tax, no rebuild." },
];

function CRMHowItWorks() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>How it works</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Built lean,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>used daily.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 23, top: 14, bottom: 14, width: 1.5, background: "var(--hairline)" }} />
          {CRM_STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: "grid", gridTemplateColumns: "48px 1fr 1.4fr", gap: 32, alignItems: "start",
                padding: "24px 0",
                borderBottom: i === CRM_STEPS.length - 1 ? "none" : "1px solid var(--hairline)",
              }}>
                <span style={{
                  width: 48, height: 48, borderRadius: "50%", background: "var(--paper)",
                  border: "2px solid var(--coral)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Geist Mono', monospace", fontWeight: 600, fontSize: 11,
                  color: "var(--coral)", position: "relative", zIndex: 1,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div style={{
                    fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
                    letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)", marginBottom: 8,
                  }}>{s.w}</div>
                  <h3 style={{
                    fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.25,
                    letterSpacing: "-0.02em", color: "var(--ink-1)", margin: 0,
                  }}>{s.t}</h3>
                </div>
                <p style={{
                  fontFamily: "'Geist', sans-serif", fontSize: 15, lineHeight: 1.65, color: "var(--ink-3)",
                  marginTop: 4, maxWidth: 480,
                }}>{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function CRMCTA({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "144px 0", borderTop: "1px solid var(--hairline)", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)",
        width: 1300, height: 1300,
        background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 55%)",
        pointerEvents: "none",
      }} />
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <Eyebrow>Build the right one</Eyebrow>
            <h2 style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0,
              letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance",
            }}>
              Stop paying for the 90%{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>you never touch.</em>
            </h2>
            <p style={{
              marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55,
              color: "var(--ink-2)", maxWidth: 620, marginLeft: "auto", marginRight: "auto",
            }}>
              45 minutes. Show us how your team really sells, and the CRM that's failing you. We'll come back with what we'd build instead — and a number.
            </p>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book a discovery call</PrimaryButton>
              <OutlineButton as="a" href="mailto:hello@vsgtech.co.za" size="lg">hello@vsgtech.co.za</OutlineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ============================================================
// PAGE ASSEMBLY
// ============================================================

function CRMPage({ onBookDemo }) {
  return (
    <React.Fragment>
      <CRMHero onBookDemo={onBookDemo} />
      <TenPercentProblem />
      <WhatWeBuildInstead />
      <CRMHowItWorks />
      <CRMCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="services">
      <CRMPage />
    </PageShell>
  );
});
