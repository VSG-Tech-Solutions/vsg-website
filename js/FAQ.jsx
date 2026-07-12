/* global React */

/* FAQ — the questions a CFO/COO actually asks, in plain language. */

const FAQS = [
  {
    q: "Do you have customers using this today?",
    a: "Yes. VSG Source is in active deployment with South African mid-market customers (names available on the discovery call). Workflow automation sprints are running every month.",
  },
  {
    q: "Where does our data sit?",
    a: "In your own ACE tenant, on South African infrastructure. Never trained across customers. On-prem deployment is available for regulated operations.",
  },
  {
    q: "Do we have to replace our ERP?",
    a: "No. VSG products are standalone — they connect to SysPro, Sage, SAP Business One, Sage Pastel, Acumatica, or Odoo through first-class connectors. Your ERP stays exactly where it is and keeps doing what it's good at.",
  },
  {
    q: "Who reviews what the AI says?",
    a: "Your team, until you decide otherwise. The default is shadow mode for the first month — every draft is reviewed before it sends. You set the threshold for when ACE acts on its own.",
  },
  {
    q: "How is this priced?",
    a: "Talk to us. Every engagement is quoted upfront before any work starts — no surprise overages, no retainer trap. Stephan replies personally within one working day with a number you can sign or walk away from.",
  },
  {
    q: "What if we leave?",
    a: "Export the full ACE memory and audit log. No lock-in clause. We'd rather you stay because the product earns it.",
  },
];

function FaqRow({ q, a, idx, open, onToggle }) {
  return (
    <div
      style={{
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: "100%",
          background: "transparent",
          border: 0,
          padding: "26px 0",
          display: "grid",
          gridTemplateColumns: "44px 1fr 32px",
          gap: 20,
          alignItems: "center",
          textAlign: "left",
          cursor: "pointer",
          fontFamily: "'Geist', sans-serif",
        }}
      >
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink-4)" }}>
          {String(idx + 1).padStart(2, "0")}
        </span>
        <span style={{ fontWeight: 600, fontSize: 22, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
          {q}
        </span>
        <span
          style={{
            justifySelf: "end",
            width: 32,
            height: 32,
            borderRadius: "50%",
            border: "1px solid var(--hairline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink-1)",
            fontFamily: "'Geist', sans-serif",
            fontWeight: 500,
            fontSize: 18,
            transition: "transform 220ms cubic-bezier(.2,0,0,1), background 220ms cubic-bezier(.2,0,0,1), color 220ms",
            transform: open ? "rotate(45deg)" : "rotate(0)",
            background: open ? "var(--ink-1)" : "transparent",
            color: open ? "var(--paper)" : "var(--ink-1)",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 320ms cubic-bezier(.16,1,.3,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              paddingLeft: 64,
              paddingRight: 52,
              paddingBottom: 28,
              fontFamily: "'Geist', sans-serif",
              fontSize: 17,
              lineHeight: 1.65,
              color: "var(--ink-2)",
              maxWidth: 760,
            }}
          >
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openIdx, setOpenIdx] = React.useState(0);
  return (
    <Section id="faq" alt>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          <Reveal>
            <div style={{ position: "sticky", top: 120 }}>
              <Eyebrow>06 — FAQ</Eyebrow>
              <Headline as="h2" size={56} style={{ marginTop: 32, maxWidth: 420 }}>
                The questions a CFO <em style={{ fontStyle: "italic", fontWeight: 700 }}>actually asks.</em>
              </Headline>
              <p style={{ marginTop: 28, maxWidth: 380, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
                If something here is missing, write to <a href="mailto:hello@vsgtech.co.za">hello@vsgtech.co.za</a>. Stephan will reply.
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              {FAQS.map((f, i) => (
                <FaqRow
                  key={i}
                  q={f.q}
                  a={f.a}
                  idx={i}
                  open={openIdx === i}
                  onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { FAQ });
