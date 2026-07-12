/* global React */

/* Products — the centerpiece. Two products today, one AI.
   Each product gets a big alternating horizontal moment with a live-feeling mockup. */

// ---------- VSG Source: animated inbox + AI draft ----------
const SOURCE_MSGS = [
  { f: "Falcon Steel", subj: "PO-22014 dispatch confirmation", body: "Confirming dispatch on the 12mm bar order. Tracking attached.", ai: true, time: "08:42" },
  { f: "Pinnacle Plastics", subj: "Quote: HDPE 35t — Aug", body: "Pricing valid 14 days. Lead time 3 weeks ex-works.", ai: true, time: "07:18" },
  { f: "Westcape Bearings", subj: "Lead time update — SKF 6205", body: "Stock arriving 22 Aug. Will hold 40 units.", ai: false, time: "Yesterday" },
  { f: "Atlantic Fasteners", subj: "Re: outstanding statement", body: "Settled to date. Balance brought forward R 0.00.", ai: true, time: "Yesterday" },
];

const DRAFT_TEXT =
  "Hi Mandla, thanks. Confirming PO-22014 on the 12mm bar — please ship to Bay 3, Epping. Our reference VSG-IN-44211. Cheers, Naledi.";

function SourceMockup() {
  const [selected, setSelected] = React.useState(0);
  const [typed, setTyped] = React.useState(0);

  // typewriter draft
  React.useEffect(() => {
    setTyped(0);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setTyped(i);
      if (i >= DRAFT_TEXT.length) clearInterval(id);
    }, 22);
    return () => clearInterval(id);
  }, [selected]);

  // auto-cycle which message is selected
  React.useEffect(() => {
    const id = setInterval(() => {
      setSelected((s) => (s + 1) % SOURCE_MSGS.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  const msg = SOURCE_MSGS[selected];

  return (
    <div
      style={{
        background: "var(--surface-white)",
        border: "1px solid var(--hairline)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 24px 60px -28px rgba(26,22,18,0.18), 0 1px 0 rgba(255,255,255,0.6) inset",
        display: "grid",
        gridTemplateColumns: "180px 1fr",
        height: 460,
      }}
    >
      {/* sidebar */}
      <div style={{ borderRight: "1px solid var(--hairline)", padding: "20px 16px", display: "flex", flexDirection: "column", gap: 14, background: "var(--paper-2)" }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
          Inbox
        </div>
        {[
          { l: "Suppliers", n: 24, active: true },
          { l: "Quotes", n: 8 },
          { l: "POs", n: 12 },
          { l: "Disputes", n: 2 },
        ].map((row, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: row.active ? 600 : 500, fontSize: 13, color: row.active ? "var(--ink-1)" : "var(--ink-3)" }}>
              {row.l}
            </span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, color: "var(--ink-4)" }}>
              {row.n}
            </span>
          </div>
        ))}
        <div style={{ height: 1, background: "var(--hairline)", margin: "8px 0" }} />
        <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
          ACE context
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["140 suppliers", "Pastel + Sage", "ZAR, USD, EUR"].map((c, i) => (
            <span key={i} style={{ fontFamily: "'Geist', sans-serif", fontSize: 12, color: "var(--ink-3)" }}>{c}</span>
          ))}
        </div>
      </div>

      {/* main */}
      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", height: "100%" }}>
        {/* list */}
        <div style={{ borderRight: "1px solid var(--hairline)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--hairline)" }}>
            <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 13, color: "var(--ink-1)" }}>Supplier email · 41</div>
            <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--coral)", marginTop: 4 }}>
              12 drafted by ACE
            </div>
          </div>
          <div style={{ flex: 1, overflow: "auto" }}>
            {SOURCE_MSGS.map((m, i) => {
              const active = i === selected;
              return (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    background: active ? "var(--paper-2)" : "transparent",
                    border: 0,
                    borderBottom: "1px solid var(--hairline)",
                    borderLeft: active ? "2px solid var(--coral)" : "2px solid transparent",
                    cursor: "pointer",
                    fontFamily: "'Geist', sans-serif",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: "var(--ink-1)" }}>{m.f}</span>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, color: "var(--ink-4)", letterSpacing: "0.1em" }}>{m.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-2)", fontWeight: 500, marginTop: 3 }}>{m.subj}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                    {m.ai && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, height: 14, padding: "0 6px", borderRadius: 3, background: "var(--coral-soft)", fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 8, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--coral)" }}>
                        <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--coral)" }} />
                        Draft ready
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* detail */}
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16, overflow: "hidden" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ink-1)" }}>
                {msg.f}
              </div>
              <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", marginTop: 2 }}>{msg.subj}</div>
            </div>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "var(--ink-4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
              {msg.time}
            </span>
          </div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.55 }}>
            {msg.body}
          </div>

          {msg.ai && (
            <div style={{ marginTop: 4, border: "1px solid var(--hairline)", borderRadius: 12, background: "var(--paper-2)", padding: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)", animation: "vsg-pulse 2s ease-in-out infinite" }} />
                  ACE draft
                </span>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "var(--ink-4)", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                  Confidence 92%
                </span>
              </div>
              <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-1)", lineHeight: 1.55, minHeight: 60 }}>
                {DRAFT_TEXT.slice(0, typed)}
                {typed < DRAFT_TEXT.length && (
                  <span style={{ display: "inline-block", width: 1, height: 14, background: "var(--ink-1)", marginLeft: 1, verticalAlign: "-2px", animation: "vsg-caret 1s steps(2) infinite" }} />
                )}
              </div>
              <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <span style={{ display: "inline-flex", alignItems: "center", height: 28, padding: "0 12px", borderRadius: 999, background: "var(--ink-1)", color: "var(--paper)", fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 12 }}>
                  Send
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", height: 28, padding: "0 12px", borderRadius: 999, border: "1px solid var(--hairline)", color: "var(--ink-2)", fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 12 }}>
                  Edit
                </span>
                <span style={{ display: "inline-flex", alignItems: "center", height: 28, padding: "0 12px", borderRadius: 999, border: "1px solid var(--hairline)", color: "var(--ink-3)", fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 12 }}>
                  Decline
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- VSG Pace: schedule grid ----------
function PaceMockup() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(id);
  }, []);

  const lines = [
    { name: "Line A · Bottling", days: [1, 1, 1, 1, 1] },
    { name: "Line B · Labelling", days: [1, 1, "x", 2, 1] },
    { name: "Line C · Cartoning", days: [0, 1, 2, 1, 1] },
    { name: "Line D · Palletising", days: [1, 0, 1, 1, 1] },
  ];

  return (
    <div
      style={{
        background: "var(--surface-white)",
        border: "1px solid var(--hairline)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 24px 60px -28px rgba(26,22,18,0.18)",
        padding: 28,
        height: 460,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
            Schedule · Week 32 · 2026
          </div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ink-1)", marginTop: 4 }}>
            Bottling plant · Atlantis
          </div>
        </div>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 22, padding: "0 10px", borderRadius: 999, background: "var(--coral-soft)", fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--coral)", animation: "vsg-pulse 2s ease-in-out infinite" }} />
          Re-sequencing
        </span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "150px repeat(5, 1fr)", gap: 6, alignItems: "center" }}>
        <span></span>
        {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
          <span key={d} style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-4)" }}>{d}</span>
        ))}
        {lines.map((row, i) => (
          <React.Fragment key={i}>
            <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 13, color: "var(--ink-1)" }}>{row.name}</span>
            {row.days.map((d, j) => {
              let bg = "transparent";
              let bd = "1px solid var(--hairline)";
              let label = "";
              if (d === 1) { bg = "var(--ink-1)"; bd = "0"; }
              else if (d === 2) { bg = "var(--coral)"; bd = "0"; }
              else if (d === "x") { bg = "var(--paper-2)"; bd = "1px dashed var(--coral)"; label = "—"; }
              return (
                <div key={j} style={{ height: 34, borderRadius: 6, background: bg, border: bd, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Geist Mono', monospace", fontSize: 10, color: "var(--coral)", transition: "background 220ms cubic-bezier(.2,0,0,1)" }}>
                  {label}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div style={{ marginTop: "auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ border: "1px solid var(--hairline)", borderRadius: 12, padding: "14px 16px", background: "var(--paper-2)" }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
            Risk detected
          </div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 13, color: "var(--ink-1)", marginTop: 4 }}>
            Caps shortage Wed
          </div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>
            Pinnacle Plastics ETA pushed +3d. Line B re-sequenced to Thu.
          </div>
        </div>
        <div style={{ border: "1px solid var(--hairline)", borderRadius: 12, padding: "14px 16px" }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
            Throughput · forecast
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 4 }}>
            <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 22, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
              94.2%
            </span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, color: "var(--success)", letterSpacing: "0.1em" }}>
              ▲ 2.1
            </span>
          </div>
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>
            vs. last week's plan.
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Product row ----------
function ProductRow({ id, idx, status, statusVariant, name, headline, emphasis, body, bullets, primaryCta, primaryHref, secondaryCta, onSecondary, mockup, reverse }) {
  return (
    <Reveal>
      <div
        id={id}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 80,
          alignItems: "center",
          padding: "72px 0",
          borderTop: idx === 0 ? "none" : "1px solid var(--hairline)",
          direction: reverse ? "rtl" : "ltr",
        }}
      >
        <div style={{ direction: "ltr" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Eyebrow>{`0${idx + 1} · ${name}`}</Eyebrow>
            <StatusPill variant={statusVariant}>{status}</StatusPill>
          </div>
          <Headline as="h3" size={48} style={{ marginTop: 24, maxWidth: 460 }}>
            {headline} <em style={{ fontStyle: "italic", fontWeight: 700 }}>{emphasis}</em>
          </Headline>
          <p style={{ marginTop: 24, maxWidth: 480, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.65, color: "var(--ink-2)" }}>
            {body}
          </p>
          <ul style={{ marginTop: 32, padding: 0, display: "flex", flexDirection: "column", gap: 14, maxWidth: 460 }}>
            {bullets.map((b, i) => (
              <FeatureItem key={i} title={b.t} body={b.b} />
            ))}
          </ul>
          <div style={{ marginTop: 36, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <PrimaryButton as="a" href={primaryHref}>{primaryCta}</PrimaryButton>
            {secondaryCta && (
              <OutlineButton onClick={onSecondary}>{secondaryCta}</OutlineButton>
            )}
          </div>
        </div>
        <div style={{ direction: "ltr" }}>
          {mockup}
        </div>
      </div>
    </Reveal>
  );
}

function Products({ onBookDemo }) {
  return (
    <Section id="products" alt>
      <Container wide>
        <Reveal>
          <div style={{ maxWidth: 780 }}>
            <Eyebrow>01 — Products</Eyebrow>
            <Headline as="h2" size={64} style={{ marginTop: 32 }}>
              Built products. <em style={{ fontStyle: "italic", fontWeight: 700 }}>Proven AI.</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)" }}>
              VSG Source is live with South African mid-market customers. The intelligence behind it — your context, your suppliers, your terminology — is the same engine we bring to every build.
            </p>
          </div>
        </Reveal>

        <div style={{ marginTop: 64 }}>
          <ProductRow
            idx={0}
            id="source"
            status="Live"
            statusVariant="live"
            name="VSG Source"
            headline="AI procurement that thinks"
            emphasis="ahead of demand."
            body="A standalone AI procurement platform for South African manufacturers, retailers, and distributors. Forward stock planning, house-voice supplier replies, multi-level approval chains, automatic exception handling, and a supplier portal — all powered by VSG ACE, the AI that learns your specific suppliers and rules."
            bullets={[
              { t: "Forward planning grid", b: "Per-SKU, per-supplier, per-customer. See what to order and when." },
              { t: "Inbox triage + house-voice drafts", b: "Every supplier email classified, ranked by lead-time risk, and replied to in your terminology." },
              { t: "Multi-level approval chains", b: "Approval rules learned from your actual history — not a template." },
              { t: "Native SysPro · SAP B1 · Sage Pastel", b: "Reads and writes through first-class connectors. Live in 5 weeks." },
            ]}
            primaryCta="See VSG Source"
            primaryHref="source.html"
            secondaryCta="Book a demo"
            onSecondary={onBookDemo}
            mockup={<SourceMockup />}
          />
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { Products, SourceMockup, PaceMockup });
