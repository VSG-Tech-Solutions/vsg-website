/* global React, ReactDOM */

/* About page — editorial. Statement → essay → principles → note → contact. */

// ============================================================
// HERO
// ============================================================

function AboutHero() {
  return (
    <section style={{
      position: "relative", background: "var(--paper)",
      paddingTop: 120, paddingBottom: 96, overflow: "hidden",
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
            fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
            marginBottom: 28,
          }}>
            About · VSG Tech
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 112,
            lineHeight: 0.98, letterSpacing: "-0.045em", color: "var(--ink-1)",
            margin: 0, maxWidth: 1180, textWrap: "balance",
          }}>
            We build the AI software that{" "}
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>
              the global vendors won't quote.
            </em>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            marginTop: 40, maxWidth: 760, fontFamily: "'Geist', sans-serif",
            fontSize: 22, lineHeight: 1.55, color: "var(--ink-2)",
          }}>
            VSG Tech is a Cape Town AI software company. We build standalone AI products and bespoke AI software for South African mid-market manufacturers, retailers, and distributors.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

// ============================================================
// THE ESSAY — long-form story, single column, no sidebar
// ============================================================

function Essay() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{
              fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
              letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)",
              marginBottom: 28, textAlign: "center",
            }}>
              The story · Why VSG exists
            </div>

            <p style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 30,
              lineHeight: 1.4, letterSpacing: "-0.015em", color: "var(--ink-1)",
              margin: 0, textWrap: "balance",
            }}>
              The AI products built for the Fortune 500 don't fit a 200-person factory in Atlantis. And the local consultancies aren't building AI — they're selling time-and-materials and decks that go nowhere.
            </p>

            <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 22 }}>
              <p style={{
                fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.75,
                color: "var(--ink-2)", margin: 0,
              }}>
                The South African mid-market runs serious operations — R20m to R500m in revenue, real factories, real warehouses, real distribution — on ERPs that were chosen ten years ago and Excel sheets that someone rebuilds every Monday.
              </p>
              <p style={{
                fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.75,
                color: "var(--ink-2)", margin: 0,
              }}>
                Those teams know exactly what AI should be doing for them. They just don't have anyone building it for them. The global SaaS vendors won't quote. The Big 4 wants R3 million over eighteen months. The local SI is selling time and materials.
              </p>
              <p style={{
                fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.75,
                color: "var(--ink-2)", margin: 0,
              }}>
                That's the gap VSG fills. Fixed-scope AI software, quoted upfront, ZA-hosted, live in five weeks, with the engineer's phone number on the back of your laptop.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// PRINCIPLES — 4 (down from 6), bigger, prouder typography
// ============================================================

function Principles() {
  const principles = [
    {
      n: "01",
      t: "Operator-flavoured, not vendor-flavoured.",
      b: "If a sentence on our product page could appear on five SaaS sites, we rewrite it. If a feature wouldn't survive a Tuesday on the floor, we cut it.",
    },
    {
      n: "02",
      t: "Specifics beat scale.",
      b: "We don't build for 'manufacturing'. We build for the 200-row Excel your buyer rebuilds every Monday, for the supplier whose ETAs are always optimistic by four days.",
    },
    {
      n: "03",
      t: "Your data is yours.",
      b: "Per-customer AI memory. No cross-training. Full export. Audit log on every action. If you leave, you leave with everything — in a documented, readable format.",
    },
    {
      n: "04",
      t: "Five weeks or the scope is wrong.",
      b: "If we can't get a useful slice in front of you in five weeks, the scope is too big. We'd rather cut scope than miss the date.",
    },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 64 }}>
            <Eyebrow>Principles</Eyebrow>
            <Headline as="h2" size={64} style={{ marginTop: 32 }}>
              Four rules.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>No exceptions.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: "grid", gridTemplateColumns: "80px 1fr 1.4fr",
                gap: 48, alignItems: "start",
                padding: "40px 0",
                borderTop: i === 0 ? "1px solid var(--ink-1)" : "1px solid var(--hairline)",
              }}>
                <span style={{
                  fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 32,
                  letterSpacing: "-0.025em", color: "var(--coral)", lineHeight: 1,
                }}>
                  {p.n}
                </span>
                <h3 style={{
                  fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 28,
                  lineHeight: 1.2, letterSpacing: "-0.025em", color: "var(--ink-1)",
                  margin: 0, textWrap: "balance",
                }}>
                  {p.t}
                </h3>
                <p style={{
                  fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65,
                  color: "var(--ink-2)", margin: 0, maxWidth: 480,
                }}>
                  {p.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// FOUNDER NOTE — short, signed
// ============================================================

function FounderNote() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
            <div style={{
              fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
              letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
              marginBottom: 32,
            }}>
              A note from the founder
            </div>
            <p style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 32,
              lineHeight: 1.4, letterSpacing: "-0.02em", color: "var(--ink-1)",
              margin: 0, textWrap: "balance",
            }}>
              The thing I'm proudest of is what we don't do. We don't sell time-and-materials. We don't pitch transformations. We don't roadmap features we haven't built. We quote upfront, ship in weeks, and keep your data yours.
            </p>
            <div style={{
              marginTop: 40, display: "inline-flex", alignItems: "center", gap: 14,
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "var(--coral-soft)", color: "var(--coral)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 14,
                letterSpacing: "-0.02em",
              }}>
                SV
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{
                  fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 15,
                  color: "var(--ink-1)",
                }}>
                  Stephan van Vuuren
                </div>
                <div style={{
                  fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                  letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)",
                  marginTop: 2,
                }}>
                  Founder · VSG Tech
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// CONTACT STRIP — minimal, replaces big map
// ============================================================

function ContactStrip() {
  const rows = [
    { l: "Where", v: "Cape Town · serving SA mid-market" },
    { l: "Email", v: "hello@vsgtech.co.za" },
    { l: "Reply window", v: "One working day · Stephan personally" },
    { l: "Hours", v: "Mon–Fri · 08:00–18:00 SAST" },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
            <div>
              <Eyebrow>Where to find us</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 28, maxWidth: 400 }}>
                Cape Town.{" "}
                <em style={{ fontStyle: "italic", fontWeight: 700 }}>One reply away.</em>
              </Headline>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {rows.map((r, i) => (
                <div key={i} style={{
                  display: "grid", gridTemplateColumns: "180px 1fr", gap: 24,
                  padding: "22px 0",
                  borderTop: "1px solid var(--hairline)",
                  borderBottom: i === rows.length - 1 ? "1px solid var(--hairline)" : "none",
                  alignItems: "center",
                }}>
                  <span style={{
                    fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
                    letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)",
                  }}>{r.l}</span>
                  <span style={{
                    fontFamily: "'Geist', sans-serif", fontSize: 17, color: "var(--ink-1)",
                    lineHeight: 1.5,
                  }}>{r.v}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// CTA
// ============================================================

function AboutCTA({ onBookDemo }) {
  return (
    <section style={{
      position: "relative", background: "var(--paper)", padding: "144px 0",
      borderTop: "1px solid var(--hairline)", overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)",
        width: 1300, height: 1300,
        background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 55%)",
        pointerEvents: "none",
      }} />
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <Eyebrow>Work with us</Eyebrow>
            <h2 style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0,
              letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance",
            }}>
              The shortest path is a{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>
                30-minute call.
              </em>
            </h2>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book a demo</PrimaryButton>
              <OutlineButton as="a" href="contact.html" size="lg">Get in touch</OutlineButton>
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

function AboutPage({ onBookDemo }) {
  return (
    <React.Fragment>
      <AboutHero />
      <Essay />
      <Principles />
      <FounderNote />
      <ContactStrip />
      <AboutCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="about">
      <AboutPage />
    </PageShell>
  );
});
