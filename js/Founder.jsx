/* global React */

/* Founder / About — Stephan, the founder. Personal note + a single pull-quote
   from an anonymous operator (no invented customer names per brand rules). */

function MonogramAvatar({ size = 180 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "var(--paper-2)",
        border: "1px solid var(--hairline)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-10%",
          background: "radial-gradient(circle at 30% 30%, rgba(201,99,58,0.18), rgba(201,99,58,0) 60%)",
        }}
      />
      <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: size * 0.42, color: "var(--ink-1)", letterSpacing: "-0.04em", position: "relative" }}>
        Sv
      </span>
    </div>
  );
}

function Founder() {
  return (
    <Section id="about">
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
          <Reveal>
            <div>
              <Eyebrow>05 — Who we are</Eyebrow>
              <Headline as="h2" size={56} style={{ marginTop: 32, maxWidth: 460 }}>
                Founder-led, built <em style={{ fontStyle: "italic", fontWeight: 700 }}>in Cape Town.</em>
              </Headline>
              <p style={{ marginTop: 28, maxWidth: 480, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)" }}>
                We started VSG because the AI products built for the Fortune 500 don't fit a 200-person factory in Atlantis, and the local consultancies aren't building AI. We sit in the gap between.
              </p>
              <p style={{ marginTop: 18, maxWidth: 480, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.7, color: "var(--ink-2)" }}>
                Stephan replies to every demo request personally, within one working day. If you sign with us, you'll have his number.
              </p>

              <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 18 }}>
                <MonogramAvatar size={64} />
                <div>
                  <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 16, color: "var(--ink-1)" }}>
                    Stephan van Vuuren
                  </div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginTop: 4 }}>
                    Founder · VSG Tech
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div
              style={{
                background: "var(--paper-2)",
                border: "1px solid var(--hairline)",
                borderRadius: 24,
                padding: "56px 56px 48px",
                position: "relative",
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 12,
                  left: 32,
                  fontFamily: "'Geist', sans-serif",
                  fontStyle: "italic",
                  fontWeight: 700,
                  fontSize: 140,
                  lineHeight: 0.9,
                  color: "var(--coral)",
                  userSelect: "none",
                }}
              >
                “
              </div>

              <p
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 500,
                  fontSize: 26,
                  lineHeight: 1.4,
                  letterSpacing: "-0.015em",
                  color: "var(--ink-1)",
                  margin: 0,
                  textWrap: "pretty",
                }}
              >
                The first week, our buyer was sceptical. The fourth week, she was using the drafts. The eighth week, she was the one telling us which suppliers she wanted ACE to handle next.
              </p>
              <div style={{ marginTop: 28, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                Operations director · FMCG manufacturer · 320 staff
              </div>

              <hr style={{ border: 0, borderTop: "1px solid var(--hairline)", margin: "32px 0" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24 }}>
                {[
                  { k: "Founded", v: "2024" },
                  { k: "Team", v: "Four" },
                  { k: "Based", v: "Cape Town" },
                ].map((s, i) => (
                  <div key={i}>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                      {s.k}
                    </div>
                    <div style={{ marginTop: 6, fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 18, color: "var(--ink-1)", letterSpacing: "-0.015em" }}>
                      {s.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { Founder });
