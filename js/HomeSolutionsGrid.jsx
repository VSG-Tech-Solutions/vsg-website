/* global React */

/* Where AI fits in your business — the 8-category coverage grid.
   Demand-side entry point: buyers navigate by pain, not by service type.
   Each card links to the existing page that best serves that area. */

const SOLUTION_AREAS = [
  { n: "01", t: "Finance & back office", k: "Invoices · reconciliation · month-end · reporting", href: "automation.html" },
  { n: "02", t: "Sales & customers", k: "Pipeline · quoting · CRM · follow-up", href: "crm.html" },
  { n: "03", t: "Procurement & suppliers", k: "Planning · supplier emails · approvals", href: "source.html" },
  { n: "04", t: "Stock & warehouse", k: "Visibility · cover · stockouts · counts", href: "ai-systems.html" },
  { n: "05", t: "Production & planning", k: "Scheduling · batches · yield · plant-vs-plant", href: "bespoke.html" },
  { n: "06", t: "Dispatch & logistics", k: "Orders out the door · status · PODs", href: "automation.html" },
  { n: "07", t: "Quality & compliance", k: "Checks · holds · traceability · audit packs", href: "bespoke.html" },
  { n: "08", t: "Management view", k: "One live screen · flags in rands · reports that write themselves", href: "ai-systems.html" },
];

function SolutionAreaCard({ n, t, k, href }) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: "var(--surface-white)",
        border: `1px solid ${hover ? "var(--divider-strong)" : "var(--hairline)"}`,
        borderRadius: 20,
        padding: "26px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        textDecoration: "none",
        color: "inherit",
        height: "100%",
        transition: "border-color 220ms cubic-bezier(.2,0,0,1), transform 220ms",
        transform: hover ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{
          fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
          letterSpacing: "0.28em", textTransform: "uppercase",
          color: hover ? "var(--coral)" : "var(--ink-4)",
          transition: "color 220ms",
        }}>
          {n}
        </span>
        <span aria-hidden="true" style={{
          fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 16, lineHeight: 1,
          color: hover ? "var(--coral)" : "var(--ink-4)",
          transform: hover ? "translateX(3px)" : "translateX(0)",
          transition: "color 220ms, transform 220ms",
        }}>
          →
        </span>
      </div>
      <div style={{
        fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 21,
        lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--ink-1)",
        textWrap: "balance",
      }}>
        {t}
      </div>
      <div style={{
        fontFamily: "'Geist', sans-serif", fontSize: 14.5, lineHeight: 1.55,
        color: "var(--ink-3)",
      }}>
        {k}
      </div>
    </a>
  );
}

function HomeSolutionsGrid() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>Where we fit</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Pick the part that hurts.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>We build the fix.</em>
            </Headline>
            <p style={{
              marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 19,
              lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 620,
            }}>
              Sometimes the fix is AI. Sometimes it's the custom system nobody else
              would build for you. Usually it's both — built into the way your
              business already runs.
            </p>
          </div>
        </Reveal>
        <div
          data-vsg-solutions-grid=""
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 18,
          }}
        >
          {SOLUTION_AREAS.map((a, i) => (
            <Reveal key={a.n} delay={i * 50}>
              <SolutionAreaCard {...a} />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
