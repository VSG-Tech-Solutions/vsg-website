/* global React */

function Footer() {
  const cols = [
    {
      title: "Products",
      links: [
        { l: "VSG Source", h: "source.html" },
      ],
    },
    {
      title: "What we build",
      links: [
        { l: "AI Systems & Integration", h: "ai-systems.html" },
        { l: "AI Workflow Automation", h: "automation.html" },
        { l: "Bespoke Software", h: "bespoke.html" },
        { l: "Custom CRM", h: "crm.html" },
      ],
    },
    {
      title: "Company",
      links: [
        { l: "About", h: "about.html" },
        { l: "How it works", h: "how-it-works.html" },
        { l: "Contact", h: "contact.html" },
      ],
    },
  ];
  return (
    <footer style={{ background: "var(--paper-2)", borderTop: "1px solid var(--hairline)" }}>
      <Container>
        <div
          style={{
            padding: "80px 0 56px",
            display: "grid",
            gridTemplateColumns: "1.4fr repeat(3, 1fr)",
            gap: 64,
          }}
        >
          <div>
            <div style={{ display: "inline-flex", alignItems: "baseline", gap: 6 }}>
              <span style={{
                fontFamily: "'Geist', sans-serif",
                fontWeight: 800,
                fontSize: 28,
                color: "var(--ink-1)",
                letterSpacing: "-0.04em",
                lineHeight: 1,
              }}>
                VSG
              </span>
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "var(--coral)",
                  marginBottom: 3,
                }}
              />
            </div>
            <p style={{ marginTop: 18, maxWidth: 320, fontFamily: "'Geist', sans-serif", fontSize: 15, lineHeight: 1.6, color: "var(--ink-3)" }}>
              An AI company that specializes in operations — we build AI systems and integrate AI into the way businesses run. A founder-led team in Cape Town.
            </p>
            <div
              style={{
                marginTop: 22,
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}
            >
              hello@vsgtech.co.za
            </div>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                {col.title}
              </div>
              <ul style={{ margin: "20px 0 0", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {col.links.map((link, j) => (
                  <li key={j} style={{ listStyle: "none" }}>
                    <a
                      href={link.h}
                      style={{
                        fontFamily: "'Geist', sans-serif",
                        fontSize: 15,
                        color: "var(--ink-2)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink-1)"; e.currentTarget.style.textDecoration = "underline"; e.currentTarget.style.textDecorationColor = "var(--coral)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-2)"; e.currentTarget.style.textDecoration = "none"; }}
                    >
                      {link.l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          style={{
            borderTop: "1px solid var(--hairline)",
            padding: "28px 0 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
            © 2026 VSG Tech Solutions (Pty) Ltd · Cape Town, ZA
          </div>
          <div style={{ display: "flex", gap: 28, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)" }}>
            <a href="privacy.html" style={{ color: "var(--ink-3)", textDecoration: "none" }}>Privacy</a>
            <a href="privacy.html#s11" style={{ color: "var(--ink-3)", textDecoration: "none" }}>Security</a>
            <a href="mailto:hello@vsgtech.co.za" style={{ color: "var(--ink-3)", textDecoration: "none" }}>Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

Object.assign(window, { Footer });
