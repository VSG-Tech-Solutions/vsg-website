/* global React, ReactDOM */

/* AI Sprints — two-week proof page.
   Hero → what you get → typical outcomes → what you DON'T get → final CTA. */

function SprintsHero({ onBookDemo }) {
  const HERO_BG = "#13100C";
  const HERO_INK = "#F5F0E8";
  const HERO_INK_2 = "rgba(245,240,232,0.78)";
  const HERO_INK_3 = "rgba(245,240,232,0.50)";
  const HERO_INK_4 = "rgba(245,240,232,0.35)";

  return (
    <section style={{ position: "relative", background: HERO_BG, paddingTop: 72, paddingBottom: 96, overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 110% 55% at 50% 100%, rgba(201,99,58,0.28), rgba(201,99,58,0) 70%)",
        pointerEvents: "none",
      }} />
      <Container style={{ position: "relative" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
          fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
          letterSpacing: "0.22em", textTransform: "uppercase", color: HERO_INK_4, marginBottom: 36,
        }}>
          <a href="index.html" style={{ color: HERO_INK_4, textDecoration: "none" }}>← VSG Tech</a>
          <span>/</span>
          <a href="services.html" style={{ color: HERO_INK_4, textDecoration: "none" }}>Services</a>
          <span>/</span>
          <span style={{ color: HERO_INK }}>AI Sprints</span>
        </div>

        <div style={{ textAlign: "center", maxWidth: 980, margin: "0 auto" }}>
          <Reveal>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 28,
              fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
              letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)" }} />
              Service · AI Sprints
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 0.98,
              letterSpacing: "-0.045em", color: HERO_INK, margin: 0, textWrap: "balance",
            }}>
              Discover, prototype,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>in two weeks.</em>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{
              marginTop: 32, maxWidth: 720, marginLeft: "auto", marginRight: "auto",
              fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55, color: HERO_INK_2,
            }}>
              A two-week sprint, fixed scope, fixed timeline. Output: a working AI prototype running on your real data, a roadmap you can take anywhere, or a costed plan signed by an engineer. Not a slide deck. Not a workshop. A working thing.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={onBookDemo} style={{
                background: "var(--coral)", color: HERO_INK, border: "none", borderRadius: 999,
                height: 56, padding: "0 32px", fontFamily: "'Geist', sans-serif", fontSize: 15,
                fontWeight: 600, cursor: "pointer", boxShadow: "0 12px 32px -12px rgba(201,99,58,0.55)",
              }}>
                Book a scoping call
              </button>
              <a href="#what-you-get" style={{
                background: "transparent", color: HERO_INK, border: `1px solid ${HERO_INK_3}`,
                borderRadius: 999, height: 56, padding: "0 32px", fontFamily: "'Geist', sans-serif",
                fontSize: 15, fontWeight: 600, textDecoration: "none",
                display: "inline-flex", alignItems: "center",
              }}>
                See what you get
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// What you get in two weeks
const DAYS = [
  { d: "Day 1–2", t: "Discovery", b: "We sit with your team. We learn the actual problem. We see the real data, the real workflow, the real pain." },
  { d: "Day 3–5", t: "Architecture + technical scoping", b: "We design the solution. Pick the right model layer. Document the integration points. Lock the success metric." },
  { d: "Day 6–10", t: "Build on your real data", b: "Working prototype, running against your actual data — not a demo dataset. You watch it work, iteration by iteration." },
  { d: "Day 11–14", t: "Demo + handover", b: "Live demo to your team. Costed plan to take it to production. Roadmap you can hand to any engineer." },
];

function WhatYouGet() {
  return (
    <Section id="what-you-get" alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>What you get</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Ten working days,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>tracked end-to-end.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 23, top: 14, bottom: 14, width: 1.5, background: "var(--hairline)" }} />
          {DAYS.map((s, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{
                display: "grid", gridTemplateColumns: "48px 1fr 1.4fr", gap: 32, alignItems: "start",
                padding: "26px 0",
                borderBottom: i === DAYS.length - 1 ? "none" : "1px solid var(--hairline)",
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
                  }}>{s.d}</div>
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

// Typical sprint outcomes
const OUTCOMES = [
  { q: "Could AI classify our customer support emails?", a: "Yes. 94% accuracy on your real ticket history. Here's the working prototype, here's the production cost." },
  { q: "Could AI auto-draft supplier responses?", a: "Yes. Here's the prototype running on your inbox. Here's what it'd take to ship it to production." },
  { q: "Could AI replace our 14-day customer onboarding?", a: "Mostly. Here's the working flow that handles 80% of cases. Here's the human escalation pattern for the rest." },
];

function TypicalOutcomes() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>Typical sprint outcomes</Eyebrow>
            <Headline as="h2" size={48} style={{ marginTop: 32 }}>
              The question goes in.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>A working answer comes out.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ display: "grid", gap: 18, maxWidth: 920 }}>
          {OUTCOMES.map((o, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{
                background: "var(--surface-white)", border: "1px solid var(--hairline)",
                borderRadius: 16, padding: "28px 32px",
                display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 32, alignItems: "start",
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 10,
                  }}>The question</div>
                  <div style={{
                    fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 17,
                    letterSpacing: "-0.01em", color: "var(--ink-1)", lineHeight: 1.4,
                  }}>"{o.q}"</div>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)", marginBottom: 10,
                  }}>The two-week answer</div>
                  <div style={{
                    fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6,
                  }}>{o.a}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// What you DON'T get
function WhatYouDontGet() {
  const items = [
    "A PowerPoint deck",
    "A 'we'll get back to you in six weeks' outcome",
    "A consultant's retainer trap",
    "A theoretical answer to a real problem",
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
              Things this sprint is{" "}
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

// Final CTA
function SprintsCTA({ onBookDemo }) {
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
            <Eyebrow>Start a sprint</Eyebrow>
            <h2 style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0,
              letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance",
            }}>
              Two weeks.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>One working answer.</em>
            </h2>
            <p style={{
              marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55,
              color: "var(--ink-2)", maxWidth: 620, marginLeft: "auto", marginRight: "auto",
            }}>
              Tell Stephan what you'd want to find out. He scopes it in 24 hours, you sign it or walk away, the sprint starts the following Monday.
            </p>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book a scoping call</PrimaryButton>
              <OutlineButton as="a" href="mailto:hello@vsgtech.co.za" size="lg">hello@vsgtech.co.za</OutlineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function SprintsPage({ onBookDemo }) {
  return (
    <React.Fragment>
      <SprintsHero onBookDemo={onBookDemo} />
      <WhatYouGet />
      <TypicalOutcomes />
      <WhatYouDontGet />
      <SprintsCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="services">
      <SprintsPage />
    </PageShell>
  );
});
