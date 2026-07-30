/* global React */

/* HomeExtras — three additions to bring the home page to 10/10:
   1. WhatWeAre — differentiation positioning ("This / Not this")
   2. ROICalculator — interactive sliders + computed value
   3. Pricing — three-shape pricing teaser
*/

// ============================================================
// 1. WhatWeAre — differentiation positioning
// ============================================================
function WhatWeAre() {
  const isThis = [
    "Custom software, AI systems, and products — built around how you actually run",
    "Works with the systems you already run — our procurement product connects to SYSPRO; other ERPs are a build",
    "Built specifically for SA mid-market manufacturers, retailers, and distributors",
    "Runs on your infrastructure — on-premise and read-only, so your data never leaves your network",
    "Live in five weeks. Stephan replies personally.",
    "Quoted upfront before any work starts — no surprise overages, no retainer trap.",
  ];
  const isNot = [
    "An ERP add-on, plugin, module, or 'gap-filler'",
    "A consulting agency selling time and materials",
    "A platform migration disguised as 'transformation'",
    "A multi-tenant model trained across all customers",
    "An SDR funnel that takes three weeks to reach an engineer",
    "A usage-based contract that punishes you for adopting it",
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>Where we stand</Eyebrow>
            <Headline as="h2" size={64} style={{ marginTop: 32 }}>
              What we are — <em style={{ fontStyle: "italic", fontWeight: 700 }}>and what we're not.</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 580, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)" }}>
              The clearest way to explain VSG is to draw the line — what we build for you, and what we'll never be.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Reveal>
            <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--coral)" }} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                  This is us
                </span>
              </div>
              <ul style={{ marginTop: 24, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {isThis.map((s, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start", listStyle: "none", paddingBottom: 14, borderBottom: i === isThis.length - 1 ? "none" : "1px solid var(--hairline)" }}>
                    <span style={{ marginTop: 2, color: "var(--coral)", fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1 }}>+</span>
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 16, color: "var(--ink-1)", lineHeight: 1.55 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 36 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--ink-4)" }} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                  This isn't us
                </span>
              </div>
              <ul style={{ marginTop: 24, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {isNot.map((s, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start", listStyle: "none", paddingBottom: 14, borderBottom: i === isNot.length - 1 ? "none" : "1px solid var(--hairline)" }}>
                    <span style={{ marginTop: 2, color: "var(--ink-4)", fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: 1 }}>—</span>
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55, textDecoration: "line-through", textDecorationColor: "var(--divider-strong)", textDecorationThickness: "1px", textUnderlineOffset: 4 }}>
                      {s}
                    </span>
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

// ============================================================
// 2. ROICalculator — interactive
// ============================================================
function Slider({ label, value, min, max, step = 1, onChange, format = (v) => v }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
          {label}
        </div>
        <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 28, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
          {format(value)}
        </div>
      </div>
      <div style={{ position: "relative", marginTop: 14, height: 28 }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            opacity: 0,
            cursor: "pointer",
            margin: 0,
            zIndex: 2,
          }}
        />
        <div style={{ position: "absolute", top: 12, left: 0, right: 0, height: 4, background: "var(--hairline)", borderRadius: 2 }} />
        <div style={{ position: "absolute", top: 12, left: 0, width: `${pct}%`, height: 4, background: "var(--ink-1)", borderRadius: 2, transition: "width 120ms cubic-bezier(.2,0,0,1)" }} />
        <div style={{ position: "absolute", top: 5, left: `calc(${pct}% - 9px)`, width: 18, height: 18, borderRadius: "50%", background: "var(--surface-white)", border: "2px solid var(--ink-1)", boxShadow: "0 4px 12px rgba(26,22,18,0.18)", transition: "left 120ms cubic-bezier(.2,0,0,1)" }} />
      </div>
      <div style={{ marginTop: 8, display: "flex", justifyContent: "space-between", fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-4)" }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

function ROICalculator() {
  const [suppliers, setSuppliers] = React.useState(140);
  const [hoursPerBuyer, setHoursPerBuyer] = React.useState(11);
  const [buyers, setBuyers] = React.useState(3);
  const [hourlyCost, setHourlyCost] = React.useState(420);

  // Compute. These are illustrative formulas — operator-realistic, not over-claimed.
  // Hours back / week = hoursPerBuyer × buyers × adoption(0.7) — assume ACE handles ~70% routine
  const adoption = 0.7; // ILLUSTRATIVE ONLY — not a measured efficacy figure; calculator is unrendered
  const hoursBack = hoursPerBuyer * buyers * adoption;
  const weeklyValue = hoursBack * hourlyCost;
  const annualValue = weeklyValue * 48; // working weeks
  const monthlyValue = annualValue / 12;

  return (
    <Section alt>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <Reveal>
            <div>
              <Eyebrow>Quick estimate</Eyebrow>
              <Headline as="h2" size={56} style={{ marginTop: 32 }}>
                What VSG ICT might save <em style={{ fontStyle: "italic", fontWeight: 700 }}>your team.</em>
              </Headline>
              <p style={{ marginTop: 28, maxWidth: 480, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
                Most procurement teams spend a week's worth of work per month on the planning grid, supplier follow-up, and RFQ admin VSG ICT handles automatically. Move the sliders to match your operation.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 36, display: "flex", flexDirection: "column", gap: 28 }}>
              <Slider
                label="Suppliers you actively work with"
                value={suppliers}
                min={20}
                max={500}
                step={10}
                onChange={setSuppliers}
              />
              <Slider
                label="Hours / week / buyer on planning + supplier admin"
                value={hoursPerBuyer}
                min={2}
                max={25}
                onChange={setHoursPerBuyer}
                format={(v) => `${v} hrs`}
              />
              <Slider
                label="Buyers in your team"
                value={buyers}
                min={1}
                max={20}
                onChange={setBuyers}
              />
              <Slider
                label="Fully-loaded cost per hour"
                value={hourlyCost}
                min={150}
                max={1200}
                step={10}
                onChange={setHourlyCost}
                format={(v) => `R${v}`}
              />

              <div style={{ borderTop: "1px solid var(--hairline)", paddingTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)" }}>
                    Hours back / week
                  </div>
                  <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 40, color: "var(--ink-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    {Math.round(hoursBack)}
                    <span style={{ fontSize: 18, color: "var(--ink-3)", marginLeft: 8, fontWeight: 500 }}>hrs</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)" }}>
                    Annual value
                  </div>
                  <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 40, color: "var(--ink-1)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                    R{(annualValue / 1000).toFixed(0)}k
                  </div>
                </div>
              </div>

              <div style={{ padding: "12px 14px", background: "var(--paper-2)", border: "1px solid var(--hairline)", borderRadius: 10, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-4)", textAlign: "center" }}>
                Assumes ~70% of routine email handled by ACE · {suppliers} suppliers · {Math.round(monthlyValue / 1000)}k / month
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// 3. Pricing — three shapes
// ============================================================
function Pricing({ onBookDemo }) {
  const tiers = [
    {
      name: "Source",
      sub: "VSG ICT — Procurement",
      from: "Flat monthly",
      blurb: "Per-mailbox flat fee. Scales with active supplier volume. Implementation included in year one.",
      bullets: ["VSG ACE tenant included", "First-class ERP connector", "Quarterly tuning, no extra charge", "Cancel with 60 days' notice"],
      cta: "See Source",
      href: "source.html",
    },
    
    {
      name: "Services",
      sub: "Custom · Automation · Bespoke",
      from: "Fixed scope",
      blurb: "Fixed-price sprints, fixed-price projects, or annual partnership. No retainer trap.",
      bullets: ["Two-week sprint format", "Scope-priced projects", "Source code, in your repo", "Phone number, not a portal"],
      cta: "Explore services",
      href: "services.html",
    },
  ];

  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <Eyebrow>Pricing</Eyebrow>
              <Headline as="h2" size={56} style={{ marginTop: 32 }}>
                One number. <em style={{ fontStyle: "italic", fontWeight: 700 }}>No surprises.</em>
              </Headline>
            </div>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 480 }}>
              Flat monthly per product, scaled to your supplier count. No per-seat, no per-token, no overages. Services are quoted scope-by-scope before we start.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {tiers.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  background: t.featured ? "var(--ink-1)" : "var(--surface-white)",
                  color: t.featured ? "var(--paper)" : "var(--ink-1)",
                  border: t.featured ? "1px solid var(--ink-1)" : "1px solid var(--hairline)",
                  borderRadius: 20,
                  padding: 36,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                  position: "relative",
                }}
              >
                {t.featured && (
                  <span style={{ position: "absolute", top: -12, left: 36, padding: "5px 12px", borderRadius: 999, background: "var(--coral)", color: "var(--paper)", fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                    Most picked
                  </span>
                )}
                <div>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: t.featured ? "var(--coral)" : "var(--coral)" }}>
                    {t.name}
                  </div>
                  <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontSize: 14, color: t.featured ? "rgba(245,240,232,0.7)" : "var(--ink-3)" }}>
                    {t.sub}
                  </div>
                </div>
                <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 36, letterSpacing: "-0.025em", color: t.featured ? "var(--paper)" : "var(--ink-1)", lineHeight: 1 }}>
                  {t.from}
                </div>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, lineHeight: 1.6, color: t.featured ? "rgba(245,240,232,0.78)" : "var(--ink-3)", margin: 0 }}>
                  {t.blurb}
                </p>
                <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {t.bullets.map((b, j) => (
                    <li key={j} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "start", listStyle: "none" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)", marginTop: 8 }} />
                      <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: t.featured ? "var(--paper)" : "var(--ink-1)", lineHeight: 1.55 }}>
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: 8 }}>
                  {t.href ? (
                    <a href={t.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 14, color: t.featured ? "var(--paper)" : "var(--ink-1)", textDecoration: "underline", textDecorationColor: "var(--coral)", textDecorationThickness: "1.5px", textUnderlineOffset: 4 }}>
                      {t.cta} →
                    </a>
                  ) : (
                    <button
                      onClick={onBookDemo}
                      style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 42, padding: "0 22px", borderRadius: 999, background: t.featured ? "var(--paper)" : "var(--ink-1)", color: t.featured ? "var(--ink-1)" : "var(--paper)", border: 0, fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 14, cursor: "pointer" }}
                    >
                      {t.cta} →
                    </button>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={240}>
          <div style={{ marginTop: 32, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", textAlign: "center" }}>
            Indicative ranges · final quote inside the first call
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

Object.assign(window, { WhatWeAre, ROICalculator, Pricing });
