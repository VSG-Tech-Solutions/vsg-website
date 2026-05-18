/* global React */

/* VSG ACE — the per-customer AI core.
   Centerpiece visual: a floating ACE token. Layered cards stacked with depth,
   gentle bob, coral floor glow, small data specks drifting in the surrounding
   space, plus 4 small "memory chip" pills floating around. Reads as an iconic
   brand mark, not a literal "ball of AI". */

const SPECKS = [
  { x: 60,  y: 110, r: 3, dur: 7,  delay: 0.0, coral: true },
  { x: 460, y: 90,  r: 2, dur: 8,  delay: 0.4, coral: false },
  { x: 30,  y: 380, r: 2, dur: 9,  delay: 1.2, coral: false },
  { x: 480, y: 360, r: 3, dur: 7,  delay: 0.8, coral: true },
  { x: 110, y: 480, r: 2, dur: 10, delay: 0.3, coral: false },
  { x: 420, y: 470, r: 2, dur: 8,  delay: 1.5, coral: false },
  { x: 80,  y: 240, r: 2, dur: 9,  delay: 2.0, coral: false },
  { x: 470, y: 220, r: 2, dur: 7,  delay: 0.6, coral: true },
];

const MEMORY_CHIPS = [
  { x: -10,  y: 80,  l: "PO-22014",      dur: 5, delay: 0.3 },
  { x: 360,  y: 60,  l: "Confidence 92", dur: 6, delay: 0.6 },
  { x: -20,  y: 320, l: "EDI · Sage X3", dur: 7, delay: 0.9 },
  { x: 380,  y: 360, l: "Audit · signed",dur: 5, delay: 1.2 },
];

function AceFloatingToken() {
  return (
    <div
      style={{
        position: "relative",
        width: 520,
        height: 560,
        maxWidth: "100%",
        margin: "0 auto",
        perspective: 1400,
      }}
    >
      {/* coral floor wash */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 24,
          transform: "translateX(-50%)",
          width: 380,
          height: 180,
          background: "radial-gradient(ellipse at center, rgba(201,99,58,0.20), rgba(201,99,58,0) 60%)",
          pointerEvents: "none",
          filter: "blur(2px)",
        }}
      />
      {/* contact shadow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          bottom: 60,
          transform: "translateX(-50%)",
          width: 260,
          height: 24,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center, rgba(0,0,0,0.16), rgba(0,0,0,0) 60%)",
          pointerEvents: "none",
          filter: "blur(8px)",
        }}
      />

      {/* drifting specks (data particles) */}
      {SPECKS.map((s, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.r,
            height: s.r,
            borderRadius: "50%",
            background: s.coral ? "var(--coral)" : "var(--ink-3)",
            opacity: s.coral ? 0.7 : 0.35,
            animation: `vsg-drift ${s.dur}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}

      {/* ghost card back */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: 96,
          transform: "translateX(-50%) translateY(-20px) rotate(-3deg)",
          width: 240,
          height: 320,
          borderRadius: 22,
          background: "var(--paper-2)",
          border: "1px solid var(--hairline)",
          opacity: 0.55,
          animation: "vsg-float-back 6s ease-in-out infinite",
        }}
      />
      {/* ghost card mid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: 96,
          transform: "translateX(-50%) translateY(-10px) rotate(2deg)",
          width: 256,
          height: 332,
          borderRadius: 22,
          background: "var(--surface-white)",
          border: "1px solid var(--hairline)",
          boxShadow: "0 16px 40px -20px rgba(26,22,18,0.16)",
          opacity: 0.85,
          animation: "vsg-float-mid 6s ease-in-out infinite",
        }}
      />

      {/* the ACE token itself — front of the stack */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: 96,
          transform: "translateX(-50%)",
          width: 280,
          height: 360,
          borderRadius: 24,
          background: "linear-gradient(180deg, #25201A, #0E0B08)",
          color: "var(--paper)",
          boxShadow: "0 40px 80px -28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
          padding: "28px 26px",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          overflow: "hidden",
          animation: "vsg-float-front 6s ease-in-out infinite",
          fontFamily: "'Geist', sans-serif",
        }}
      >
        {/* coral inner glint */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 220,
            height: 220,
            borderRadius: "50%",
            background: "radial-gradient(circle at center, rgba(229,141,98,0.28), rgba(229,141,98,0) 60%)",
            pointerEvents: "none",
          }}
        />
        {/* faint scan lines */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, transparent 0 3px, rgba(255,255,255,0.014) 3px 4px)",
            pointerEvents: "none",
          }}
        />

        {/* top row — Live pill + customer id */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.26em", textTransform: "uppercase", color: "#F2A481", fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F2A481", animation: "vsg-pulse 2s ease-in-out infinite" }} />
            Live
          </span>
          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.55)", fontWeight: 500 }}>
            #042
          </span>
        </div>

        {/* the wordmark */}
        <div style={{ position: "relative", marginTop: 4 }}>
          <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(245,240,232,0.55)", fontWeight: 500 }}>
            VSG
          </div>
          <div
            style={{
              fontFamily: "'Geist', sans-serif",
              fontStyle: "italic",
              fontWeight: 700,
              fontSize: 88,
              letterSpacing: "-0.05em",
              lineHeight: 0.95,
              color: "var(--paper)",
              marginTop: 2,
            }}
          >
            ACE
          </div>
          <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.75)", letterSpacing: "-0.005em" }}>
            Your AI · trained on your business.
          </div>
        </div>

        {/* context "memory bars" — proof of structure */}
        <div style={{ position: "relative", marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { l: "Suppliers", v: 0.92 },
            { l: "Terminology", v: 0.76 },
            { l: "Exceptions", v: 0.61 },
            { l: "Decisions", v: 0.84 },
          ].map((b, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 10, alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.55)", fontWeight: 500, marginBottom: 4 }}>
                  {b.l}
                </div>
                <div style={{ height: 3, background: "rgba(245,240,232,0.10)", borderRadius: 2, overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${b.v * 100}%`,
                      background: "#F2A481",
                      borderRadius: 2,
                      transform: "scaleX(0)",
                      transformOrigin: "left",
                      animation: `vsg-bar-grow 1400ms cubic-bezier(.16,1,.3,1) ${600 + i * 120}ms forwards`,
                    }}
                  />
                </div>
              </div>
              <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.12em", color: "rgba(245,240,232,0.65)", fontWeight: 500, minWidth: 24, textAlign: "right" }}>
                {Math.round(b.v * 100)}
              </span>
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 14, borderTop: "1px solid rgba(245,240,232,0.08)" }}>
          <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(245,240,232,0.6)", fontWeight: 500 }}>
            Tenant · isolated
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 9px", borderRadius: 999, background: "rgba(229,141,98,0.16)", fontFamily: "'Geist Mono', monospace", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", color: "#F2A481", fontWeight: 500 }}>
            ZA · on-prem ready
          </span>
        </div>
      </div>

      {/* floating memory chips */}
      {MEMORY_CHIPS.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.x,
            top: c.y,
            padding: "6px 10px",
            background: "var(--surface-white)",
            border: "1px solid var(--hairline)",
            borderRadius: 999,
            fontFamily: "'Geist Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-3)",
            fontWeight: 500,
            boxShadow: "0 6px 20px -10px rgba(26,22,18,0.18)",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            animation: `vsg-chip-float ${c.dur}s ease-in-out ${c.delay}s infinite`,
            opacity: 0.94,
          }}
        >
          <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--coral)" }} />
          {c.l}
        </div>
      ))}
    </div>
  );
}

function Ace() {
  return (
    <Section id="ace">
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 80, alignItems: "center" }}>
          <Reveal>
            <div>
              <Eyebrow>03 — VSG ACE</Eyebrow>
              <Headline as="h2" size={64} style={{ marginTop: 32, maxWidth: 560 }}>
                The <em style={{ fontStyle: "italic", fontWeight: 700 }}>per-customer</em> AI core.
              </Headline>
              <p style={{ marginTop: 32, maxWidth: 540, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.7, color: "var(--ink-2)" }}>
                Every customer gets their own AI context. It learns your suppliers, your terminology, your exception patterns, the decisions you've made before. Never shared, never trained across customers.
              </p>

              <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 540 }}>
                {[
                  { k: "Isolated", v: "Your context lives in your tenant. Nowhere else." },
                  { k: "Portable", v: "Export the full memory if you ever leave. No lock-in." },
                  { k: "Auditable", v: "Every action ACE took, by whom, with what evidence." },
                  { k: "Local-first", v: "South African data residency. On-prem if you need it." },
                ].map((p, i) => (
                  <div key={i} style={{ borderTop: "1px solid var(--hairline)", paddingTop: 14 }}>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--coral)" }}>
                      {p.k}
                    </div>
                    <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>
                      {p.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <AceFloatingToken />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { Ace, AceFloatingToken });
