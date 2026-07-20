/* global React, ReactDOM */

/* VSG Pace — full product page. Production scheduling.
   Same proven SaaS pattern, with the "Q3 2026 / waitlist" angle. */

function PaceHero({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "80px 0 96px", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: 1000,
          height: 1000,
          background: "radial-gradient(circle at center, rgba(201,99,58,0.12), rgba(201,99,58,0) 60%)",
          pointerEvents: "none",
        }}
      />
      <Container wide style={{ position: "relative" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 32 }}>
            <a href="index.html" style={{ color: "var(--ink-4)", textDecoration: "none" }}>← VSG Tech</a>
            <span>/</span>
            <span style={{ color: "var(--ink-1)" }}>VSG Pace</span>
          </div>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Eyebrow>Product · VSG Pace</Eyebrow>
                <StatusPill variant="upcoming">Q3 2026</StatusPill>
              </div>
              <h1 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.02, letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance" }}>
                Production scheduling that solves <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>the real math.</em>
              </h1>
              <p style={{ marginTop: 32, maxWidth: 560, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55, color: "var(--ink-2)" }}>
                A standalone AI production scheduling product for South African manufacturers. Real mathematical optimization across every machine in your factory — not LLM guesswork. Loadshedding-aware re-scheduling, setup-time reduction, and AI-driven explanation of every schedule decision.
              </p>
              <div style={{ marginTop: 40, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                <PrimaryButton onClick={onBookDemo} size="lg">Join the waitlist</PrimaryButton>
                <OutlineButton as="a" href="#preview" size="lg">See a preview</OutlineButton>
              </div>
              <div style={{ marginTop: 28, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", display: "flex", gap: 18, flexWrap: "wrap" }}>
                <span>Early access · Q3 2026</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--hairline)", alignSelf: "center" }} />
                <span>Constraint programming · not LLM</span>
                <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--hairline)", alignSelf: "center" }} />
                <span>Loadshedding-aware (EskomSePush)</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div id="preview">
              <PaceMockup />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ---------- Authority / waitlist counter ----------
function PaceAuthority() {
  return (
    <section style={{ background: "var(--paper)", padding: "48px 0", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, alignItems: "center" }}>
          {[
            { l: "Design partners on board", v: 4, suffix: "" },
            { l: "Avg. floor minutes saved / shift", v: 38, suffix: "" },
            { l: "Re-sequence time", v: 90, suffix: " sec" },
            { l: "Launch window", v: "Q3 2026", text: true },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                  {s.l}
                </div>
                <div style={{ marginTop: 10, fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 32, color: "var(--ink-1)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {s.text ? s.v : <React.Fragment><CountUp to={s.v} duration={1300} />{s.suffix}</React.Fragment>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ---------- Benefits ----------
function PaceBenefits() {
  const benefits = [
    { tag: "Optimize",    title: "Real mathematical optimization — not LLM guesswork.", body: "Constraint programming and operations research math sequence every job across every machine, accounting for setup times, changeovers, labour shifts, and raw material availability. The actual scheduling problem, solved." },
    { tag: "Re-schedule", title: "Loadshedding-aware re-scheduling.",                    body: "EskomSePush integration. When loadshedding hits or a machine breaks, VSG Pace re-optimises around the outage in seconds. Customer deadlines stay realistic. Rush orders insert without breaking the rest of the plan." },
    { tag: "Explain",     title: "VSG ACE explains every move — in your team's words.",   body: "Your planner asks ‘why did you schedule this on Mill 2?’ — VSG ACE answers in plain language with the actual reasoning. Every schedule risk is flagged before the slip happens, not after." },
  ];
  return (
    <Section id="benefits" alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>Three jobs</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              What Pace does <em style={{ fontStyle: "italic", fontWeight: 700 }}>differently.</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 560, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.65, color: "var(--ink-2)" }}>
              MES vendors give you a Gantt chart. Excel gives you a plan that's true on Monday. Pace gives you a schedule that re-thinks itself when reality moves.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  background: "var(--surface-white)",
                  border: "1px solid var(--hairline)",
                  borderRadius: 20,
                  padding: 32,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  transition: "border-color 220ms cubic-bezier(.2,0,0,1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--divider-strong)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Eyebrow>{`0${i + 1} — ${b.tag}`}</Eyebrow>
                </div>
                <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--ink-1)", margin: 0, textWrap: "balance" }}>
                  {b.title}
                </h3>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, lineHeight: 1.6, color: "var(--ink-3)", margin: 0 }}>
                  {b.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ---------- Feature visualizations ----------

function PaceFeatViz1() {
  // forecast vs reality overlay
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const plan = [60, 80, 95, 88, 70];
  const real = [55, 72, 48, 76, 62];
  return (
    <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.16)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
          Plan vs. reality
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {[
            { l: "Plan", c: "var(--ink-1)" },
            { l: "Reality", c: "var(--coral)" },
          ].map((k, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-3)" }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: k.c }} />
              {k.l}
            </span>
          ))}
        </div>
      </div>
      <svg viewBox="0 0 360 180" style={{ width: "100%", height: 200 }}>
        {/* grid */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="40" x2="350" y1={20 + i * 32} y2={20 + i * 32} stroke="var(--hairline)" />
        ))}
        {/* y labels */}
        {["100%", "75%", "50%", "25%", "0%"].map((l, i) => (
          <text key={i} x="32" y={24 + i * 32} textAnchor="end" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="1.5" fill="var(--ink-4)">{l}</text>
        ))}
        {/* x labels */}
        {days.map((d, i) => (
          <text key={i} x={70 + i * 64} y="170" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="1.5" fill="var(--ink-4)">{d.toUpperCase()}</text>
        ))}
        {/* plan line */}
        <polyline
          points={plan.map((v, i) => `${70 + i * 64},${148 - (v / 100) * 128}`).join(" ")}
          fill="none"
          stroke="var(--ink-1)"
          strokeWidth="2"
        />
        {plan.map((v, i) => (
          <circle key={i} cx={70 + i * 64} cy={148 - (v / 100) * 128} r="3" fill="var(--ink-1)" />
        ))}
        {/* real line */}
        <polyline
          points={real.map((v, i) => `${70 + i * 64},${148 - (v / 100) * 128}`).join(" ")}
          fill="none"
          stroke="var(--coral)"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        {real.map((v, i) => (
          <circle key={i} cx={70 + i * 64} cy={148 - (v / 100) * 128} r="3" fill="var(--coral)" />
        ))}
      </svg>
      <div style={{ marginTop: 16, padding: "12px 14px", background: "var(--coral-soft)", borderRadius: 10, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-1)" }}>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--coral)", marginRight: 6 }}>
          Wed gap
        </span>
        Caps shortage upstream. Pace flagged this 11 days early.
      </div>
    </div>
  );
}

function PaceFeatViz2() {
  // before/after re-sequence
  const Block = ({ c, label, span = 1, dashed }) => (
    <div style={{ gridColumn: `span ${span}`, height: 26, borderRadius: 6, background: dashed ? "transparent" : c, border: dashed ? `1px dashed ${c}` : 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: dashed ? c : "var(--paper)" }}>
      {label}
    </div>
  );
  return (
    <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.16)" }}>
      <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 18 }}>
        Line B · before & after re-sequence
      </div>
      {/* before */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 8 }}>
          08:00 — before
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4 }}>
          <Block c="var(--ink-1)" label="SKU-118" span={3} />
          <Block c="var(--coral)" label="HOLD" span={2} dashed />
          <Block c="var(--ink-1)" label="SKU-204" span={2} />
          <Block c="var(--ink-3)" label="CO" span={1} />
          <Block c="var(--ink-1)" label="SKU-301" span={2} />
        </div>
      </div>
      {/* after */}
      <div>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--coral)", marginBottom: 8 }}>
          08:01 — after ace re-sequence
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: 4 }}>
          <Block c="var(--ink-1)" label="SKU-204" span={2} />
          <Block c="var(--ink-1)" label="SKU-301" span={2} />
          <Block c="var(--ink-3)" label="CO" span={1} />
          <Block c="var(--ink-1)" label="SKU-118" span={3} />
          <Block c="var(--success)" label="MAINT" span={2} />
        </div>
      </div>
      <div style={{ marginTop: 18, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}>
        Pulled SKU-204 and 301 forward, used the wait window for the booked maintenance. Net throughput +6%, on-time unchanged.
      </div>
    </div>
  );
}

function PaceFeatViz3() {
  return (
    <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.16)" }}>
      <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 16 }}>
        Why ACE moved Line B
      </div>
      <div style={{ borderLeft: "2px solid var(--coral)", paddingLeft: 18 }}>
        <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 18, color: "var(--ink-1)", letterSpacing: "-0.015em" }}>
          Caps shortage Wed
        </div>
        <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, marginTop: 8 }}>
          Pinnacle Plastics confirmed +3d slip in this morning's email thread (Source flag). Holding SKU-204 to Wed would waste 4 hrs labour standing. Re-sequenced into Tue.
        </p>
      </div>
      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ padding: 14, border: "1px solid var(--hairline)", borderRadius: 10 }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-4)" }}>
            Throughput
          </div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>+6%</span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "var(--success)", letterSpacing: "0.1em" }}>vs. plan</span>
          </div>
        </div>
        <div style={{ padding: 14, border: "1px solid var(--hairline)", borderRadius: 10 }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-4)" }}>
            Overtime
          </div>
          <div style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>0 hrs</span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "var(--success)", letterSpacing: "0.1em" }}>same</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const PACE_FEATURES = [
  {
    eyebrow: "Feature · Engine",
    headline: "Real mathematical optimization —",
    emphasis: "not LLM guesswork.",
    body: "Constraint programming and operations research math sequence every job across every machine in your factory. Setup-times, changeovers, labour shifts, material availability, customer due-dates — all solved as a single problem, in under 90 seconds on a typical week.",
    bullets: [
      "Multi-machine sequencing across the entire factory",
      "Setup-time optimization — −30% changeover hours on pilot",
      "Due-date prioritisation — customer commitments drive the plan",
      "Material-availability cross-check at scheduling time",
    ],
    viz: <PaceFeatViz1 />,
  },
  {
    eyebrow: "Feature · Re-schedule",
    headline: "Loadshedding hits.",
    emphasis: "The schedule heals itself.",
    body: "EskomSePush integration. When loadshedding hits or a machine breaks, VSG Pace re-optimises around the outage automatically — production deadlines stay realistic. Rush orders insert into an existing plan with full trade-off visibility before commit.",
    bullets: [
      "EskomSePush integration — loadshedding windows auto-applied",
      "Live re-optimisation when a machine, shift, or material moves",
      "Rush-order insertion with trade-off preview before commit",
      "What-if simulation: ‘what if we add a Tuesday shift?’ in seconds",
    ],
    viz: <PaceFeatViz2 />,
    reverse: true,
  },
  {
    eyebrow: "Feature · Explain",
    headline: "Every schedule decision,",
    emphasis: "explained in plain language.",
    body: "VSG ACE answers the questions your planner actually asks. ‘Why is this on Mill 2 on Tuesday? Why did SKU-204 jump the queue?’ Plain English, with the real reasoning. Mobile alerts when the schedule changes so the floor never starts a job the plan just cancelled.",
    bullets: [
      "Plain-language reasoning on every schedule move",
      "Schedule-risk alerts before the slip happens",
      "Mobile push to supervisors when the plan changes",
      "Full audit trail for every override and every constraint",
    ],
    viz: <PaceFeatViz3 />,
  },
];

function PaceFeatures() {
  return (
    <Section id="features">
      <Container wide>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>What it actually does</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Less re-planning. <em style={{ fontStyle: "italic", fontWeight: 700 }}>More running.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ marginTop: 48 }}>
          {PACE_FEATURES.map((f, i) => (
            <Reveal key={i} delay={40}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1.15fr",
                  gap: 80,
                  alignItems: "center",
                  padding: "64px 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--hairline)",
                  direction: f.reverse ? "rtl" : "ltr",
                }}
              >
                <div style={{ direction: "ltr" }}>
                  <Eyebrow>{f.eyebrow}</Eyebrow>
                  <Headline as="h3" size={42} style={{ marginTop: 22, maxWidth: 460 }}>
                    {f.headline} <em style={{ fontStyle: "italic", fontWeight: 700 }}>{f.emphasis}</em>
                  </Headline>
                  <p style={{ marginTop: 22, maxWidth: 480, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
                    {f.body}
                  </p>
                  <ul style={{ marginTop: 28, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {f.bullets.map((b, j) => (
                      <li key={j} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "start", listStyle: "none" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)", marginTop: 9 }} />
                        <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div style={{ direction: "ltr" }}>{f.viz}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ---------- Roles ----------
function PaceRoles() {
  const roles = [
    { name: "Supervisor", body: "Stops re-typing the spreadsheet at 5am. Approves a Pace plan in a glance, pushes back with a click, and gets the why for every move." },
    { name: "Planner", body: "Stops being the bottleneck. Models scenarios in minutes instead of a day. Spends Mondays improving the plan, not re-keying it." },
    { name: "GM / COO", body: "One number to watch: on-time-in-full. Sees the trade-offs Pace is making in real time — and the cost of every override." },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>Built for</Eyebrow>
            <Headline as="h2" size={48} style={{ marginTop: 32 }}>
              The three people who run <em style={{ fontStyle: "italic", fontWeight: 700 }}>the floor.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {roles.map((r, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: "32px 0", borderTop: "1px solid var(--ink-1)" }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                  {`0${i + 1} · ${r.name}`}
                </div>
                <p style={{ marginTop: 18, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 360 }}>
                  {r.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ---------- Integrations ----------
function PaceIntegrations() {
  return (
    <Section id="integrations">
      <Container>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <Eyebrow>Where Pace lives</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 32 }}>
                Between the inbox and <em style={{ fontStyle: "italic", fontWeight: 700 }}>the floor.</em>
              </Headline>
            </div>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 480 }}>
              Pace reads from the same ACE tenant Source writes to, plus your ERP's BOM / routing data and (optionally) your MES or PLC layer. No new master data.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { name: "VSG ICT", note: "Inbound material signals · ETAs · risk flags." },
            { name: "SysPro · Sage · SAP B1", note: "BOM, routings, work orders, capacity." },
            { name: "MES (optional)", note: "Real-time line status, downtime, scrap." },
            { name: "Excel today", note: "Yes — Pace will read your current planner sheet." },
          ].map((e, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{ background: "var(--paper-2)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, height: 200, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 18, color: "var(--ink-1)", letterSpacing: "-0.02em", textWrap: "balance" }}>
                  {e.name}
                </div>
                <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>
                  {e.note}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ---------- Roadmap timeline ----------
function PaceRoadmap() {
  const milestones = [
    { d: "Q2 2026", t: "Design partner programme", b: "Four SA manufacturers across FMCG, packaging, and engineered components." },
    { d: "Q3 2026", t: "Early access launch", b: "Pace + Source bundle for design partners and the waitlist." },
    { d: "Q4 2026", t: "General availability", b: "Open enrollment. Sage X3 and SAP B1 first-class. SysPro shortly after." },
    { d: "2027", t: "Multi-site planning", b: "Plant-to-plant load balancing for groups running more than one factory." },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>What's next</Eyebrow>
            <Headline as="h2" size={48} style={{ marginTop: 32 }}>
              From design partner to <em style={{ fontStyle: "italic", fontWeight: 700 }}>GA.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
          {milestones.map((m, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  padding: "28px 24px 28px 0",
                  borderTop: "1px solid var(--ink-1)",
                  borderRight: i === milestones.length - 1 ? "none" : "1px solid var(--hairline)",
                  position: "relative",
                  paddingLeft: i === 0 ? 0 : 24,
                }}
              >
                <span style={{ position: "absolute", top: -7, left: i === 0 ? 0 : 24, width: 12, height: 12, borderRadius: "50%", background: i === 0 ? "var(--coral)" : "var(--paper-2)", border: `2px solid var(--ink-1)` }} />
                <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--coral)" }}>
                  {m.d}
                </div>
                <div style={{ marginTop: 12, fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 20, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
                  {m.t}
                </div>
                <p style={{ marginTop: 10, fontFamily: "'Geist', sans-serif", fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55 }}>
                  {m.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ---------- FAQ ----------
const PACE_FAQS = [
  { q: "Is VSG Pace an MES or APS module?",                a: "Neither. VSG Pace is a standalone AI production scheduling product with its own optimization engine — the same way specialist scheduling tools are standalone products that connect to ERPs. It connects to SysPro, SAP Business One, and Sage Pastel through native integrations, but it is not a module of any of them." },
  { q: "Is the 'AI' really an LLM under the hood?",        a: "No. The scheduling engine is real constraint programming and OR math. LLMs are great for explaining decisions and writing supervisor-readable summaries — they are terrible at sequencing 800 jobs across 40 machines. We use each for what it's good at, and we tell you exactly which is which." },
  { q: "Do we need an MES first?",                          a: "No. VSG Pace works against your ERP and (if you have it) your MES, but it can also read a planner's Excel sheet and replace it directly. The four design partners run very different shop floors; only one has an MES." },
  { q: "How does the loadshedding integration work?",       a: "We read the EskomSePush API for your specific plant addresses. When a Stage 2+ window is announced, Pace re-optimises around the outage automatically and pushes a mobile alert to your supervisor. You can override or pin specific jobs through it." },
  { q: "Will Pace tell my best planner she's wrong?",       a: "No — it'll tell her she's right faster. Every Pace move is an aided decision; she pins and overrides whenever she wants. Pace learns from each override and stops suggesting it." },
  { q: "What does the design-partner programme include?",  a: "Hands-on co-design through 2026: weekly working sessions, your factory's constraints modelled in Pace's engine, early access from Q3, and a discounted year-one licence after GA." },
];

function PaceFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <Section id="faq">
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          <Reveal>
            <div style={{ position: "sticky", top: 120 }}>
              <Eyebrow>FAQ · Pace</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 32, maxWidth: 380 }}>
                What planners <em style={{ fontStyle: "italic", fontWeight: 700 }}>actually ask.</em>
              </Headline>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              {PACE_FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} style={{ width: "100%", background: "transparent", border: 0, padding: "24px 0", display: "grid", gridTemplateColumns: "44px 1fr 32px", gap: 20, alignItems: "center", textAlign: "left", cursor: "pointer", fontFamily: "'Geist', sans-serif" }}>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: 20, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
                      {f.q}
                    </span>
                    <span style={{ justifySelf: "end", width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--hairline)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 16, transition: "transform 220ms cubic-bezier(.2,0,0,1), background 220ms", transform: open === i ? "rotate(45deg)" : "rotate(0)", background: open === i ? "var(--ink-1)" : "transparent", color: open === i ? "var(--paper)" : "var(--ink-1)" }}>
                      +
                    </span>
                  </button>
                  <div style={{ display: "grid", gridTemplateRows: open === i ? "1fr" : "0fr", transition: "grid-template-rows 320ms cubic-bezier(.16,1,.3,1)" }}>
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ paddingLeft: 64, paddingRight: 52, paddingBottom: 26, fontFamily: "'Geist', sans-serif", fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 720 }}>
                        {f.a}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// ---------- Final CTA ----------
function PaceCTA({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "144px 0", borderTop: "1px solid var(--hairline)", overflow: "hidden" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-40%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 1300,
          height: 1300,
          background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 55%)",
          pointerEvents: "none",
        }}
      />
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <Eyebrow>Join the waitlist</Eyebrow>
            <h2 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0, letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance" }}>
              Help us design the schedule <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>that runs itself.</em>
            </h2>
            <p style={{ marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
              We're working with four design partners through 2026. Two seats left. Bring us the spreadsheet you re-plan every Monday.
            </p>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Join the waitlist</PrimaryButton>
              <OutlineButton as="a" href="contact.html" size="lg">Get in touch</OutlineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ---------- Page assembly ----------
function PacePage({ onBookDemo }) {
  return (
    <React.Fragment>
      <PaceHero onBookDemo={onBookDemo} />
      <PaceAuthority />
      <PaceBenefits />
      <PaceFeatures />
      <PaceRoles />
      <PaceIntegrations />
      <PaceRoadmap />
      <PaceFAQ />
      <PaceCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="pace">
      <PacePage />
    </PageShell>
  );
});
