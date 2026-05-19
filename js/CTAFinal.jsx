/* global React */

function CTAFinal({ onBookDemo }) {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "var(--paper)",
        padding: "160px 0",
        borderTop: "1px solid var(--hairline)",
        overflow: "hidden",
      }}
    >
      {/* coral wash */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 1400,
          height: 1400,
          background: "radial-gradient(circle at center, rgba(201,99,58,0.18), rgba(201,99,58,0) 55%)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 920, margin: "0 auto", position: "relative" }}>
            <Eyebrow>Get in touch</Eyebrow>
            <h2
              style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 700,
                fontSize: 96,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: "var(--ink-1)",
                margin: "32px 0 0",
                textWrap: "balance",
              }}
            >
              Start a conversation. <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>Let's see if we fit.</em>
            </h2>
            <p
              style={{
                marginTop: 32,
                fontFamily: "'Geist', sans-serif",
                fontSize: 21,
                lineHeight: 1.55,
                color: "var(--ink-2)",
                maxWidth: 620,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              30 minutes. No deck, no scripted demo. Bring the actual mess. We'll show you what we'd do with it.
            </p>
            <div style={{ marginTop: 48, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book a demo</PrimaryButton>
              <OutlineButton as="a" href="mailto:hello@vsgtech.co.za" size="lg">hello@vsgtech.co.za</OutlineButton>
            </div>
            <div
              style={{
                marginTop: 36,
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}
            >
              Reply within one working day · Stephan personally
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

Object.assign(window, { CTAFinal });
