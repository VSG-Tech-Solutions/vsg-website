/* global React */

/* Trust strip — ERP names + a stat row.
   The marquee is intentionally slow + monochrome; it must not feel like a logo soup. */

function TrustStrip() {
  const erps = [
    "SysPro",
    "Sage X3",
    "SAP Business One",
    "Sage Pastel",
    "SysPro",
    "Sage X3",
    "SAP Business One",
    "Sage Pastel",
  ];
  return (
    <section
      style={{
        background: "var(--paper)",
        padding: "48px 0 56px",
        borderTop: "1px solid var(--hairline)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <Container>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr",
            alignItems: "center",
            gap: 48,
          }}
        >
          <div
            style={{
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--ink-4)",
              whiteSpace: "nowrap",
            }}
          >
            Runs next to
          </div>

          <div
            style={{
              position: "relative",
              overflow: "hidden",
              maskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 64,
                animation: "vsg-marquee 38s linear infinite",
                width: "max-content",
              }}
            >
              {erps.concat(erps).map((name, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 600,
                    fontSize: 22,
                    color: "var(--ink-3)",
                    letterSpacing: "-0.015em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

Object.assign(window, { TrustStrip });
