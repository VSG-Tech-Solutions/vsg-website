/* global React */

/* Services — three engagement shapes for the cashflow line of VSG.
   Each card links to a dedicated deep page. No pricing on the cards. */

// ---------- Visuals ----------

function VisualCustom() {
  return (
    <svg viewBox="0 0 220 120" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <linearGradient id="svc-custom-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--coral)" stopOpacity="0.22" />
          <stop offset="1" stopColor="var(--coral)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="10" y="92" width="200" height="20" rx="4" fill="var(--paper)" stroke="var(--hairline)" />
      <text x="110" y="106" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2.2" fill="var(--ink-3)">ERP / DATA LAYER</text>
      <rect x="26" y="62" width="168" height="20" rx="4" fill="var(--surface-white)" stroke="var(--hairline)" />
      <text x="110" y="76" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2.2" fill="var(--ink-3)">VENDOR · STANDARD</text>
      <rect x="42" y="32" width="136" height="20" rx="4" fill="var(--surface-white)" stroke="var(--coral)" />
      <rect x="42" y="32" width="136" height="20" rx="4" fill="url(#svc-custom-fade)" />
      <text x="110" y="46" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2.2" fill="var(--coral)">YOUR BESPOKE LAYER</text>
      <rect x="62" y="6" width="96" height="16" rx="4" fill="var(--ink-1)" />
      <text x="110" y="17" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2.2" fill="var(--paper)">YOUR USERS</text>
    </svg>
  );
}

function VisualAutomation() {
  return (
    <svg viewBox="0 0 220 120" style={{ width: "100%", height: "100%", display: "block" }}>
      <circle cx="30" cy="60" r="10" fill="var(--ink-1)" />
      <text x="30" y="92" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="1.8" fill="var(--ink-4)">TRIGGER</text>
      <line x1="40" y1="60" x2="92" y2="60" stroke="var(--ink-3)" strokeWidth="1.4" strokeDasharray="3 3" />
      <path d="M 90 56 L 96 60 L 90 64" fill="none" stroke="var(--ink-3)" strokeWidth="1.4" />
      <circle cx="110" cy="60" r="22" fill="var(--coral)" />
      <text x="110" y="64" textAnchor="middle" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="14" fill="var(--paper)">ACE</text>
      <text x="110" y="100" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="1.8" fill="var(--ink-4)">DECISION</text>
      <line x1="132" y1="60" x2="180" y2="60" stroke="var(--ink-3)" strokeWidth="1.4" strokeDasharray="3 3" />
      <path d="M 178 56 L 184 60 L 178 64" fill="none" stroke="var(--ink-3)" strokeWidth="1.4" />
      <rect x="180" y="50" width="30" height="20" rx="4" fill="var(--ink-1)" />
      <text x="195" y="64" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="1.8" fill="var(--paper)">ACT</text>
    </svg>
  );
}

function VisualBespoke() {
  return (
    <svg viewBox="0 0 220 120" style={{ width: "100%", height: "100%", display: "block" }}>
      <defs>
        <pattern id="svc-bes-grid" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="var(--hairline)" strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="220" height="120" fill="url(#svc-bes-grid)" />
      <path d="M 30 92 L 60 62 L 90 80 L 130 36 L 170 56 L 200 28"
            fill="none" stroke="var(--coral)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="60" cy="62" r="3" fill="var(--coral)" />
      <circle cx="130" cy="36" r="3" fill="var(--coral)" />
      <circle cx="200" cy="28" r="3" fill="var(--coral)" />
      <text x="110" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="1.8" fill="var(--ink-4)">YOUR SHAPE — NOT OURS</text>
    </svg>
  );
}

// ---------- ServiceCard (links to a deep page when href is set) ----------

function ServiceCard({ num, name, headline, emphasis, body, bullets, visual, bestFor, href }) {
  const [hover, setHover] = React.useState(false);
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface-white)",
        border: `1px solid ${hover ? "var(--divider-strong)" : "var(--hairline)"}`,
        borderRadius: 20,
        padding: 32,
        display: "flex",
        flexDirection: "column",
        gap: 22,
        transition: "border-color 220ms cubic-bezier(.2,0,0,1), transform 220ms",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
        transform: hover && href ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
          {num}
        </span>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
          {name}
        </span>
      </div>

      <div
        style={{
          background: "var(--paper-2)",
          border: "1px solid var(--hairline)",
          borderRadius: 14,
          height: 140,
          padding: 14,
          overflow: "hidden",
        }}
      >
        {visual}
      </div>

      <div>
        <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.15, letterSpacing: "-0.025em", color: "var(--ink-1)", margin: 0, textWrap: "balance" }}>
          {headline} <em style={{ fontStyle: "italic", fontWeight: 700 }}>{emphasis}</em>
        </h3>
        <p style={{ marginTop: 14, fontFamily: "'Geist', sans-serif", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-3)" }}>
          {body}
        </p>
      </div>

      <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "start", listStyle: "none" }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--coral)", marginTop: 8 }} />
            <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>
              {b}
            </span>
          </li>
        ))}
      </ul>

      {bestFor && (
        <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--hairline)" }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 8 }}>
            Best for
          </div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13.5, lineHeight: 1.5, color: "var(--ink-2)", fontStyle: "italic" }}>
            {bestFor}
          </div>
        </div>
      )}

      {href && (
        <div style={{ paddingTop: 14, fontFamily: "'Geist', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--coral)" }}>
          See {name} →
        </div>
      )}
    </Wrapper>
  );
}

// ---------- Main Services section ----------

function Services({ onBookDemo }) {
  return (
    <Section id="services">
      <Container wide>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "end" }}>
          <Reveal>
            <div>
              <Eyebrow>02 — Services</Eyebrow>
              <Headline as="h2" size={64} style={{ marginTop: 32 }}>
                Three ways to <em style={{ fontStyle: "italic", fontWeight: 700 }}>work with us.</em>
              </Headline>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 560 }}>
              We build the AI products you saw above. We also build the workflows that drain your team's week. Three formats. Each one fixed-scope. Each one starts in two weeks.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            <ServiceCard
              num="A"
              name="AI Workflow Automation"
              headline="Automate the workflows that"
              emphasis="drain your team."
              body="Invoice matching. Supplier statement reconciliation. DSO collections. Stock-take variance investigation. The high-value operational workflows your team rebuilds every week, every month, forever. We hand those over to AI. Fixed scope. Two to four weeks. Live in production."
              visual={<VisualAutomation />}
              bullets={[
                "Invoice matching automation (AP three-way match)",
                "Supplier statement reconciliation",
                "DSO reduction with risk-scored collections",
                "Stock-take variance + shrinkage investigation",
                "Custom workflows — talk to us, scope-and-quote",
              ]}
              bestFor={'"We have a workflow that takes 15 hours a week and follows the same pattern every time." That workflow becomes 30 minutes of approval.'}
              href="automation.html"
            />
            <ServiceCard
              num="B"
              name="Bespoke Software"
              headline="Software built for the problem"
              emphasis="only YOU have."
              body="Every business has a problem no off-the-shelf software solves. The workflow that's unique to how YOU operate. The internal tool that would save your team 20 hours a week if anyone built it. We design, build, and ship that software. Yours. In your repository."
              visual={<VisualCustom />}
              bullets={[
                "Production-grade software built around YOUR specific business problem",
                "Web apps, portals, dashboards, internal tools, integration layers",
                "Two-week first slice. In production in eight weeks. Not eighteen months.",
                "Full handover with docs, code, and the engineer's phone number",
                "Optional ongoing retainer or full handover — your call",
              ]}
              bestFor={'"We have a unique problem that no software solves, and the consultant’s answer is eighteen months and millions." We solve it in eight weeks.'}
              href="bespoke.html"
            />
          </div>
        </Reveal>

        <Reveal delay={240}>
          <div
            style={{
              marginTop: 32,
              border: "1px solid var(--hairline)",
              borderRadius: 20,
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 32,
              flexWrap: "wrap",
              background: "var(--paper-2)",
            }}
          >
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                Not sure which fits?
              </div>
              <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 22, color: "var(--ink-1)", letterSpacing: "-0.015em" }}>
                Tell Stephan what's getting in the way. He'll write back within one working day.
              </div>
            </div>
            <PrimaryButton onClick={onBookDemo}>Start a conversation</PrimaryButton>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

Object.assign(window, { Services });
