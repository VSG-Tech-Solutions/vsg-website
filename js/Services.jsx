/* global React */

/* Services — the second pillar of the business.
   Three offerings, each rendered as a card with a custom SVG diagram + bullets. */

// ----- Small SVG visuals, one per service -----

function VisualCustom() {
  // stacked layers — extending what you already run
  return (
    <svg viewBox="0 0 200 140" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <defs>
        <linearGradient id="vc-fade" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="var(--coral)" stopOpacity="0.18" />
          <stop offset="1" stopColor="var(--coral)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="22" y="86" width="156" height="32" rx="6" fill="var(--paper-2)" stroke="var(--hairline)" />
      <rect x="34" y="56" width="132" height="32" rx="6" fill="var(--surface-white)" stroke="var(--hairline)" />
      <rect x="46" y="26" width="108" height="32" rx="6" fill="var(--surface-white)" stroke="var(--coral)" />
      <rect x="46" y="26" width="108" height="32" rx="6" fill="url(#vc-fade)" />
      <text x="100" y="46" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2.2" fill="var(--coral)">YOUR LAYER</text>
      <text x="100" y="76" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2.2" fill="var(--ink-3)">VSG / VENDOR</text>
      <text x="100" y="106" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2.2" fill="var(--ink-3)">ERP</text>
    </svg>
  );
}

function VisualAutomation() {
  // flow with three nodes and arrows
  return (
    <svg viewBox="0 0 200 140" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      {/* nodes */}
      {[30, 100, 170].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="70" r="22" fill="var(--surface-white)" stroke="var(--hairline)" />
          <circle cx={x} cy="70" r="6" fill={i === 1 ? "var(--coral)" : "var(--ink-1)"} />
          {i === 1 && (
            <circle cx={x} cy="70" r="22" fill="none" stroke="var(--coral)" strokeOpacity="0.4">
              <animate attributeName="r" from="22" to="34" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.5" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
      {/* arrows */}
      <path d="M 56 70 L 72 70" stroke="var(--ink-3)" strokeWidth="1.5" markerEnd="url(#vsg-arrow)" />
      <path d="M 126 70 L 142 70" stroke="var(--ink-3)" strokeWidth="1.5" markerEnd="url(#vsg-arrow)" />
      <defs>
        <marker id="vsg-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 8 5 L 0 10 z" fill="var(--ink-3)" />
        </marker>
      </defs>
      <text x="30" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2" fill="var(--ink-4)">TRIGGER</text>
      <text x="100" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2" fill="var(--coral)">ACE</text>
      <text x="170" y="110" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2" fill="var(--ink-4)">ACTION</text>
    </svg>
  );
}

function VisualBespoke() {
  // blueprint grid with a fitted shape
  return (
    <svg viewBox="0 0 200 140" style={{ width: "100%", height: "100%" }} aria-hidden="true">
      <defs>
        <pattern id="vb-grid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M 16 0 L 0 0 0 16" fill="none" stroke="var(--hairline)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect x="0" y="0" width="200" height="140" fill="url(#vb-grid)" />
      <path d="M 30 100 L 30 50 L 70 50 L 70 30 L 130 30 L 130 70 L 170 70 L 170 100 Z" fill="var(--coral-soft)" stroke="var(--coral)" strokeWidth="1.5" />
      <circle cx="30" cy="100" r="3" fill="var(--coral)" />
      <circle cx="170" cy="100" r="3" fill="var(--coral)" />
      <circle cx="70" cy="30" r="3" fill="var(--ink-1)" />
      <circle cx="130" cy="30" r="3" fill="var(--ink-1)" />
      <text x="100" y="124" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="2.2" fill="var(--ink-4)">YOUR SHAPE · NOT OURS</text>
    </svg>
  );
}

function ServiceCard({ num, name, headline, emphasis, body, bullets, visual, bestFor }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
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
        transition: "border-color 220ms cubic-bezier(.2,0,0,1)",
        height: "100%",
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
    </div>
  );
}

function Services({ onBookDemo }) {
  return (
    <Section id="services">
      <Container wide>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "end" }}>
          <Reveal>
            <div>
              <Eyebrow>02 — Services</Eyebrow>
              <Headline as="h2" size={64} style={{ marginTop: 32 }}>
                Three more ways to <em style={{ fontStyle: "italic", fontWeight: 700 }}>work with us.</em>
              </Headline>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 560 }}>
              Some operational problems are too specific for a product. Our services line is built for the same audience as our products — SA mid-market operators — with the same standards: fixed-scope, source code in your hands, an engineer's phone number.
            </p>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div style={{ marginTop: 80, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            <ServiceCard
              num="A"
              name="AI Sprints"
              headline="Discover, prototype,"
              emphasis="in two weeks."
              body="A two-week sprint, fixed scope, fixed price. Output: a working AI prototype running on your real data, a roadmap you can take anywhere, or a costed plan signed by an engineer. Not a slide deck. Not a workshop. A working thing."
              visual={<VisualBespoke />}
              bullets={[
                "Two-week format · fixed price · fixed deliverable",
                "On your real data — not a sandbox",
                "Discovery, prototype, or proof-of-concept",
                "Roadmap + costed plan to take to production",
              ]}
              bestFor='"We think AI could help with X but we don\u2019t know if it\u2019s real." Two weeks to find out.'
            />
            <ServiceCard
              num="B"
              name="AI Workflow Automation"
              headline="Automate your"
              emphasis="highest-value workflows."
              body="Customer onboarding. Credit-check sequences. Supplier-statement reconciliation. The exception-routing decisions someone makes 40 times a week. VSG builds AI workflow automation that takes those flows over — and gets smarter every week as VSG ACE learns your patterns."
              visual={<VisualAutomation />}
              bullets={[
                "Custom-built around YOUR business — not a template, not Zapier-with-extra-steps",
                "AI that handles decisions, not just data movement",
                "Human-in-the-loop where it matters; full autonomy where it doesn\u2019t",
                "VSG ACE learns your patterns and improves the workflow every week",
                "Audit trail on every decision the AI makes",
              ]}
              bestFor='"We have a critical workflow that takes 15 hours a week and follows the same pattern every time." That workflow becomes 30 minutes of approval — and gets smarter every month.'
            />
            <ServiceCard
              num="C"
              name="Bespoke Software"
              headline="Software built for the problem"
              emphasis="only YOU have."
              body="Every business has a problem no off-the-shelf software solves. The workflow that\u2019s unique to how YOU operate. The internal tool that would save your team 20 hours a week — if anyone built it. We design, build, and ship that software. Yours. In your repository."
              visual={<VisualCustom />}
              bullets={[
                "Production-grade software built around YOUR specific business problem",
                "Web apps, portals, dashboards, internal tools, integration layers",
                "Two-week first slice. In production in eight weeks. Not eighteen months.",
                "Full handover with docs, code, and the engineer\u2019s phone number",
                "Optional ongoing retainer or full handover — your call",
              ]}
              bestFor='"We have a unique problem that no software solves, and the consultant\u2019s answer is R3 million over eighteen months." We solve it in eight weeks for a fraction of that.'
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
