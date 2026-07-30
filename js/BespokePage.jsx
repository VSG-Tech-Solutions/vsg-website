/* global React, ReactDOM */

/* Bespoke Software — the custom build page.
   Hero → what we build → how we work → what you DON'T get → final CTA. */

function BespokeHero({ onBookDemo }) {
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
            <a href="services.html" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Services</a>
            <span>/</span>
            <span style={{ color: "var(--ink-1)" }}>Bespoke Software</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div style={{
            fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
            marginBottom: 24,
          }}>
            Service · Bespoke Software
          </div>
        </Reveal>

        <Reveal delay={140}>
          <h1 style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 0.98,
            letterSpacing: "-0.045em", color: "var(--ink-1)", margin: 0,
            maxWidth: 1080, textWrap: "balance",
          }}>
            Software built for the problem{" "}
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>only YOU have.</em>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            marginTop: 36, maxWidth: 760,
            fontFamily: "'Geist', sans-serif", fontSize: 21, lineHeight: 1.55, color: "var(--ink-2)",
          }}>
            Every business has a problem no off-the-shelf software solves. The workflow unique to how YOU operate. The internal tool nobody has built because it does not exist off the shelf — the one your team works around every week. We design, build, and ship that software. Yours. In your repository.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div style={{ marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <PrimaryButton onClick={onBookDemo} size="lg">Get a scoping call</PrimaryButton>
            <OutlineButton as="a" href="#what-we-build" size="lg">See what we build</OutlineButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

const BUILDS = [
  { tag: "Web apps", title: "Production-grade web applications.", body: "Full-stack web apps for the specific workflow your team runs. Built on a modern stack you'll actually be able to maintain." },
  { tag: "Customer portals", title: "Self-service surfaces for your customers.", body: "Order history, dispute resolution, document download, payment, anything your customers ask for that your ERP can't surface." },
  { tag: "Internal dashboards", title: "Reporting tools the GM can read in two minutes.", body: "Daily operations dashboards. Cash position, supplier health, customer drift, stock variance — whatever signals you need at 7am." },
  { tag: "Integration layers", title: "The systems your ERP can't talk to.", body: "Middleware between your ERP and the third-party systems nobody else will quote — courier APIs, banking, B-BBEE agencies, marketplace platforms." },
  { tag: "Data pipelines", title: "Pipelines + analytics surfaces.", body: "ETL from operational systems into clean reporting surfaces. Power BI, Looker, Metabase — or a custom dashboard if that fits better." },
  { tag: "Mobile admin tools", title: "Mobile-friendly tools for the floor.", body: "Approve-on-the-go interfaces, stock-take scanners, dispatch confirmation tools — built for one-thumb operation, signed audit trail." },
];

function WhatWeBuild() {
  return (
    <Section id="what-we-build" alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>What we build</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Six shapes.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>All production-grade.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {BUILDS.map((b, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                background: "var(--surface-white)", border: "1px solid var(--hairline)",
                borderRadius: 18, padding: 28, height: "100%",
              }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 8, padding: "4px 10px",
                  background: "var(--coral-soft)", border: "1px solid rgba(201,99,58,0.22)",
                  borderRadius: 999, marginBottom: 18,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--coral)" }} />
                  <span style={{
                    fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)",
                  }}>{b.tag}</span>
                </div>
                <h3 style={{
                  fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 20, lineHeight: 1.25,
                  letterSpacing: "-0.015em", color: "var(--ink-1)", margin: 0, textWrap: "balance",
                }}>{b.title}</h3>
                <p style={{
                  marginTop: 14, fontFamily: "'Geist', sans-serif", fontSize: 14, lineHeight: 1.6,
                  color: "var(--ink-3)",
                }}>{b.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const WEEKS = [
  { w: "Week 1", t: "Discovery + scoping", b: "We learn your business, your stack, your team. Open questions get answered before scope locks." },
  { w: "Week 2", t: "Scope signed", b: "Fixed scope. Fixed timeline. Architecture decisions documented. Success criteria agreed upfront." },
  { w: "Week 3–4", t: "First slice ships", b: "Real working software you can use. Not a Figma mockup, not a wireframe — an actual deployed application running on your data." },
  { w: "Week 5–8", t: "Iteration on real usage", b: "Your team uses the first slice. We iterate on what they actually need vs what we initially scoped. Production by end of Week 8." },
  { w: "Post-launch", t: "Your call", b: "Optional ongoing retainer to keep building, or full handover with docs, source code, and the engineer's phone number. You're never locked in." },
];

function HowWeWork() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>How we work</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              First slice in two weeks.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>Production in eight.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 23, top: 14, bottom: 14, width: 1.5, background: "var(--hairline)" }} />
          {WEEKS.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: "grid", gridTemplateColumns: "48px 1fr 1.4fr", gap: 32, alignItems: "start",
                padding: "24px 0",
                borderBottom: i === WEEKS.length - 1 ? "none" : "1px solid var(--hairline)",
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

function WhatYouDontGet() {
  const items = [
    "An 18-month build cycle",
    "A team of consultants billing hourly",
    "Locked-in proprietary software you can't take elsewhere",
    "A vendor portal — you get the engineer's phone number",
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{
            background: "var(--surface-white)", border: "1px solid var(--hairline)",
            borderRadius: 20, padding: "48px 56px", maxWidth: 920, margin: "0 auto",
          }}>
            <Eyebrow>What you don't get</Eyebrow>
            <Headline as="h2" size={42} style={{ marginTop: 22 }}>
              Things this engagement is{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>specifically not.</em>
            </Headline>
            <ul style={{ marginTop: 32, padding: 0, display: "grid", gap: 14 }}>
              {items.map((it, i) => (
                <li key={i} style={{
                  listStyle: "none", display: "grid", gridTemplateColumns: "auto 1fr",
                  gap: 14, alignItems: "center",
                  fontFamily: "'Geist', sans-serif", fontSize: 17, color: "var(--ink-2)", lineHeight: 1.5,
                  textDecoration: "line-through", textDecorationColor: "var(--ink-4)",
                }}>
                  <span style={{ color: "var(--coral)", fontSize: 20, fontWeight: 600, textDecoration: "none" }}>×</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function BespokeCTA({ onBookDemo }) {
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
            <Eyebrow>Start the build</Eyebrow>
            <h2 style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0,
              letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance",
            }}>
              Tell us the problem{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>no vendor will quote.</em>
            </h2>
            <p style={{
              marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55,
              color: "var(--ink-2)", maxWidth: 620, marginLeft: "auto", marginRight: "auto",
            }}>
              Stephan scopes it. The engineer who builds it joins the first call. No account managers. No handoffs. You sign the scope, the first slice ships in two weeks.
            </p>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Get a scoping call</PrimaryButton>
              <OutlineButton as="a" href="mailto:hello@vsgtech.co.za" size="lg">hello@vsgtech.co.za</OutlineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function BespokePage({ onBookDemo }) {
  return (
    <React.Fragment>
      <BespokeHero onBookDemo={onBookDemo} />
      <WhatWeBuild />
      <HowWeWork />
      <WhatYouDontGet />
      <BespokeCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="services">
      <BespokePage />
    </PageShell>
  );
});
