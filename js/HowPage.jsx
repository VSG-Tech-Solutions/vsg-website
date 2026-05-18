/* global React, ReactDOM */

/* How it works — the rollout, expanded. */

function HowHero() {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "96px 0 80px", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-30%", right: "-15%", width: 1000, height: 1000, background: "radial-gradient(circle at center, rgba(201,99,58,0.12), rgba(201,99,58,0) 60%)", pointerEvents: "none" }} />
      <Container style={{ position: "relative" }}>
        <Reveal>
          <Eyebrow>The rollout</Eyebrow>
          <h1 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--ink-1)", margin: "32px 0 0", maxWidth: 1000, textWrap: "balance" }}>
            From kick-off to live in <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>six weeks.</em>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ marginTop: 32, maxWidth: 680, fontFamily: "'Geist', sans-serif", fontSize: 21, lineHeight: 1.55, color: "var(--ink-2)" }}>
            No platform migration. No three-month integration project. No "transformation" deck. Just a clean five-week rollout you'd recognise from any sensible vendor.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function WhatYouOwn() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>The split</Eyebrow>
            <Headline as="h2" size={48} style={{ marginTop: 32 }}>
              What you own. <em style={{ fontStyle: "italic", fontWeight: 700 }}>What we own.</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 540, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              No surprises in week five. Here's exactly who's holding each piece of the rollout.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Reveal>
            <div style={{ padding: 32, border: "1px solid var(--hairline)", borderRadius: 20, background: "var(--surface-white)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--ink-1)" }} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-1)" }}>
                  You own
                </span>
              </div>
              <ul style={{ marginTop: 22, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Decide which inboxes / lines / suppliers go first",
                  "Approve every reply ACE drafts in the first month",
                  "Set the threshold for when ACE may act on its own",
                  "Sign off the audit log monthly",
                  "Own the data, the memory, the export",
                ].map((s, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "start", listStyle: "none" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--ink-1)", marginTop: 9 }} />
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ padding: 32, border: "1px solid var(--coral)", borderRadius: 20, background: "var(--coral-soft)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--coral)" }} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                  We own
                </span>
              </div>
              <ul style={{ marginTop: 22, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  "Provision your ACE tenant, on the region you specify",
                  "Connect to your ERP, your inbox, your file shares",
                  "Tune prompts and rules to your terminology",
                  "Run shadow-mode evaluation and fix the misses",
                  "Stand by every send for the first ninety days",
                ].map((s, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "start", listStyle: "none" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--coral)", marginTop: 9 }} />
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>{s}</span>
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

function AfterRollout() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>After week six</Eyebrow>
            <Headline as="h2" size={48} style={{ marginTop: 32 }}>
              We don't disappear. <em style={{ fontStyle: "italic", fontWeight: 700 }}>We don't overstay.</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 560, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              The pattern most operators wish their vendors followed.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            { d: "First 90 days", t: "Daily standby", b: "We sit in your channel, watch the misses, and tune. SLA on every flag." },
            { d: "Quarterly", t: "Tuning review", b: "Together we look at what ACE got wrong, what your team caught, what could go next. No retainer hours, no extra invoice." },
            { d: "Anytime", t: "Stephan's number", b: "If you signed with us, you have his number. He picks up. So do the engineers." },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: "32px 0", borderTop: "1px solid var(--ink-1)" }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                  {c.d}
                </div>
                <h3 style={{ marginTop: 16, fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 24, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
                  {c.t}
                </h3>
                <p style={{ marginTop: 12, fontFamily: "'Geist', sans-serif", fontSize: 16, color: "var(--ink-2)", lineHeight: 1.65 }}>
                  {c.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function HowCTA({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "144px 0", borderTop: "1px solid var(--hairline)", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)", width: 1300, height: 1300, background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 55%)", pointerEvents: "none" }} />
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <Eyebrow>Ready when you are</Eyebrow>
            <h2 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0, letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance" }}>
              The next six weeks <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>start with a 30-minute call.</em>
            </h2>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book the kick-off</PrimaryButton>
              <OutlineButton as="a" href="contact.html" size="lg">hello@vsg.tech</OutlineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function HowPage({ onBookDemo }) {
  return (
    <React.Fragment>
      <HowHero />
      {/* reuse the homepage HowItWorks timeline */}
      <HowItWorks />
      <WhatYouOwn />
      <AfterRollout />
      <HowCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="how">
      <HowPage />
    </PageShell>
  );
});
