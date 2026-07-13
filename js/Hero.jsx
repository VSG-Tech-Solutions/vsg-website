/* global React */

/* Hero — type-led, editorial. Cycles the italicised clause through several
   operator roles to make the headline feel alive without being gimmicky.
   No product mockup; this is the company-level moment. */

const HERO_PHRASES = [
  "your business",
  "your operations",
  "your month-end",
];

/* The cycling word owns its own LINE (block-level, fixed height): every phrase
   is stacked in the same grid cell and crossfades in place, so the headline is
   always exactly three lines and nothing on the page ever reflows. */
function CycleEm({ phrases, interval = 3200 }) {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % phrases.length), interval);
    return () => clearInterval(id);
  }, [phrases.length, interval]);

  return (
    <span style={{ display: "grid", justifyItems: "start" }}>
      {phrases.map((p, idx) => (
        <em
          key={p}
          aria-hidden={idx !== i}
          style={{
            gridArea: "1 / 1",
            fontStyle: "italic",
            fontWeight: 700,
            color: "var(--coral)",
            whiteSpace: "nowrap",
            opacity: idx === i ? 1 : 0,
            transition: "opacity 520ms cubic-bezier(.16,1,.3,1)",
          }}
        >
          {p}
        </em>
      ))}
    </span>
  );
}

function MiniMetricCard({ label, value, suffix, sub }) {
  return (
    <div
      style={{
        background: "var(--surface-white)",
        border: "1px solid var(--hairline)",
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        minWidth: 160,
      }}
    >
      <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
        <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 32, color: "var(--ink-1)", letterSpacing: "-0.025em", lineHeight: 1 }}>
          {value}
        </span>
        {suffix && (
          <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 14, color: "var(--ink-3)" }}>
            {suffix}
          </span>
        )}
      </div>
      {sub && (
        <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.4 }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function Hero({ onBookDemo }) {
  return (
    <section
      id="top"
      style={{
        position: "relative",
        background: "var(--paper)",
        padding: "120px 0 128px",
        overflow: "hidden",
      }}
    >
      {/* coral wash, off-axis */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-25%",
          right: "-12%",
          width: 1100,
          height: 1100,
          background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 60%)",
          pointerEvents: "none",
        }}
      />
      {/* faint vertical hairline grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(229,221,204,0.55) 1px, transparent 1px)",
          backgroundSize: "calc((100% - 96px) / 6) 100%",
          backgroundPosition: "48px 0",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0) 80%)",
          pointerEvents: "none",
        }}
      />

      <Container style={{ position: "relative" }}>
        {/* announcement bar */}
        <Reveal>
          <a
            href="automation.html"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "6px 14px 6px 6px",
              borderRadius: 999,
              background: "var(--surface-white)",
              border: "1px solid var(--hairline)",
              textDecoration: "none",
              marginBottom: 36,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                height: 22,
                padding: "0 10px",
                borderRadius: 999,
                background: "var(--ink-1)",
                color: "var(--paper)",
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              New
            </span>
            <span
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 14,
                color: "var(--ink-2)",
                fontWeight: 500,
              }}
            >
              Finance &amp; back-office automation — invoices, reconciliation, month-end
            </span>
            <span
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 14,
                color: "var(--coral)",
                fontWeight: 500,
              }}
            >→</span>
          </a>
        </Reveal>

        <Reveal delay={80}>
          <Eyebrow>VSG Tech · An AI company for operations</Eyebrow>
        </Reveal>

        <Reveal delay={140}>
          <h1
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 700,
              fontSize: 104,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "var(--ink-1)",
              margin: 0,
              marginTop: 36,
              maxWidth: 1080,
              textWrap: "balance",
            }}
          >
            <span style={{ display: "block" }}>Streamline</span>
            <CycleEm phrases={HERO_PHRASES} />
            <span style={{ display: "block" }}>with AI.</span>
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p
            style={{
              marginTop: 36,
              maxWidth: 640,
              fontFamily: "'Geist', sans-serif",
              fontSize: 21,
              lineHeight: 1.55,
              color: "var(--ink-2)",
              fontWeight: 400,
            }}
          >
            We're an AI company in Cape Town that specializes in operations. We build AI systems, automate your processes and integrate AI into the way your business runs — so everything gets faster, leaner and smarter. Start with one problem — grow from there. Founder-led.
          </p>
        </Reveal>

        <Reveal delay={250}>
          <p
            style={{
              marginTop: 18,
              maxWidth: 640,
              fontFamily: "'Geist', sans-serif",
              fontSize: 16,
              lineHeight: 1.6,
              color: "var(--ink-3)",
              fontWeight: 400,
            }}
          >
            Every part of your business is an operation — sales, finance, production, admin. We put AI wherever it makes the business run better.
          </p>
        </Reveal>

        <Reveal delay={280}>
          <div style={{ marginTop: 44, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
            <PrimaryButton onClick={onBookDemo} size="lg">Book a demo</PrimaryButton>
            <OutlineButton as="a" href="#products" size="lg">See the products</OutlineButton>
          </div>
        </Reveal>

        <Reveal delay={340}>
          <div
            style={{
              marginTop: 36,
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-4)",
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <span>Cape Town · serving SA mid-market</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--hairline)" }} />
            <span>Live in 5 weeks</span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--hairline)" }} />
            <span>Stephan replies personally</span>
          </div>
        </Reveal>

        {/* Floating metric row — gives the hero a second beat */}
        <Reveal delay={420}>
          <div
            style={{
              marginTop: 80,
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              gap: 16,
              maxWidth: 880,
            }}
          >
            <MiniMetricCard label="Live since" value="2025" sub="VSG Source in production" />
            <MiniMetricCard label="Rollout" value="5" suffix="weeks" sub="From kick-off to live" />
            <MiniMetricCard label="ERPs we connect to" value="6+" sub="SysPro · Sage · SAP B1 · Pastel +" />
            <MiniMetricCard label="Footprint" value="ZA" sub="Cape Town, working continent-wide" />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

Object.assign(window, { Hero });
