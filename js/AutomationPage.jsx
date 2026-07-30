/* global React, ReactDOM */

/* AI Workflow Automation — the cashflow revenue page.
   Hero → 4 workflow cards → custom workflows → how a sprint runs → FAQ → final CTA. */

// ============================================================
// HERO
// ============================================================

function AutomationHero({ onBookDemo }) {
  return (
    <section style={{
      position: "relative", background: "var(--paper)",
      paddingTop: 96, paddingBottom: 96, overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
        width: 1400, height: 900,
        background: "radial-gradient(ellipse at center, rgba(201,99,58,0.08), rgba(201,99,58,0) 60%)",
        pointerEvents: "none",
      }} />
      <Container style={{ position: "relative" }}>
        <Reveal>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)",
            marginBottom: 32,
          }}>
            <a href="index.html" style={{ color: "var(--ink-4)", textDecoration: "none" }}>← VSG Tech</a>
            <span>/</span>
            <a href="services.html" style={{ color: "var(--ink-4)", textDecoration: "none" }}>Services</a>
            <span>/</span>
            <span style={{ color: "var(--ink-1)" }}>AI Workflow Automation</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div style={{
            fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
            marginBottom: 24,
          }}>
            Service · AI Workflow Automation
          </div>
        </Reveal>

        <Reveal delay={140}>
          <h1 style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 0.98,
            letterSpacing: "-0.045em", color: "var(--ink-1)", margin: 0,
            maxWidth: 1080, textWrap: "balance",
          }}>
            Automate the workflows that{" "}
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>drain your team's week.</em>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            marginTop: 36, maxWidth: 760,
            fontFamily: "'Geist', sans-serif", fontSize: 21, lineHeight: 1.55, color: "var(--ink-2)",
          }}>
            The repetitive operational work your team rebuilds every Monday. The reconciliation nobody wants to do. The collections sequence nobody chases. The stock-take variance investigation that takes three days every month. We hand those over to AI. Fixed scope. Two to four weeks. Live in production.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div style={{ marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <PrimaryButton onClick={onBookDemo} size="lg">Book a discovery call</PrimaryButton>
            <OutlineButton as="a" href="#workflows" size="lg">See the four workflows</OutlineButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ============================================================
// FOUR WORKFLOWS WE SHIP MOST
// ============================================================

const WORKFLOWS = [
  {
    n: "01",
    tag: "Invoice matching (AP three-way match)",
    title: "Stop matching invoices to POs by hand.",
    body: "Your AP team spends two days a week matching every supplier invoice to its purchase order and goods-received note. We automate the whole flow. AI reads every invoice, matches against your PO and GRV, flags variances and duplicates, drafts the exception response. Your team approves; the AI does the matching.",
    facts: [
      ["Removes", "The manual line-by-line match between invoice, PO and GRV"],
      ["Recovers", "Missed credit notes, duplicate payments, supplier overcharges"],
      ["Timeline", "Two to four weeks"],
    ],
  },
  {
    n: "02",
    tag: "Supplier statement reconciliation",
    title: "Month-end supplier rec, done overnight.",
    body: "Monthly supplier statements come in. Your AP team spends three days matching every line against your ledger, finding missing invoices, catching duplicate charges, applying credit notes. We do it overnight. AI reconciles your AP ledger against every supplier statement, surfaces discrepancies, drafts the dispute letters.",
    facts: [
      ["Replaces", "Three to five days of finance team time at month-end"],
      ["Recovers", "Missed credits, duplicate charges, ledger drift"],
      ["Timeline", "Two to three weeks"],
    ],
  },
  {
    n: "03",
    tag: "DSO reduction (credit-hold + collections)",
    title: "Make collections happen on a schedule, not when someone remembers.",
    body: "Your customers pay 90 days late. Your DSO is killing your cashflow. AI runs the collection sequence — polite reminders, firm reminders, attorney letters — with risk-scored escalation based on customer history and credit bureau signals. Auto-holds new orders to chronic late payers. Integrates with your accounting system.",
    facts: [
      ["Removes", "The manual chase list and the escalation decisions behind it"],
      ["Recovers", "Working capital tied up in late payments"],
      ["Timeline", "Three to four weeks"],
    ],
  },
  {
    n: "04",
    tag: "Stock-take variance + shrinkage",
    title: "Find where the stock actually went.",
    body: "Monthly stock-take. Variances everywhere. Your finance team spends three days investigating where the stock went, and still writes off half without finding the cause. AI traces every variance back through stock movements, identifies the likely cause (mis-receipt, mis-issue, theft, data entry), drafts the write-off journal with reasoning.",
    facts: [
      ["Replaces", "Three days a month of finance + ops investigation"],
      ["Recovers", "Retail shrinkage, mfg/distribution inventory variance"],
      ["Timeline", "Two to four weeks"],
    ],
  },
];

function FourWorkflows() {
  return (
    <Section id="workflows" alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>What we build</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Four workflows we scope most often.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>Every one a two-to-four-week sprint.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {WORKFLOWS.map((w, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: "var(--surface-white)", border: "1px solid var(--hairline)",
                borderRadius: 20, padding: 36, height: "100%", display: "flex", flexDirection: "column",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: 10, background: "var(--coral-soft)",
                    color: "var(--coral)", display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Geist Mono', monospace", fontSize: 12, fontWeight: 600,
                  }}>{w.n}</span>
                  <span style={{
                    fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
                    letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-3)",
                  }}>{w.tag}</span>
                </div>
                <h3 style={{
                  fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2,
                  letterSpacing: "-0.02em", color: "var(--ink-1)", margin: "0 0 14px", textWrap: "balance",
                }}>{w.title}</h3>
                <p style={{
                  fontFamily: "'Geist', sans-serif", fontSize: 14.5, lineHeight: 1.65,
                  color: "var(--ink-3)", margin: 0, flex: 1,
                }}>{w.body}</p>
                <div style={{
                  marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--hairline)",
                  display: "flex", flexDirection: "column", gap: 8,
                }}>
                  {w.facts.map(([k, v], j) => (
                    <div key={j} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 14 }}>
                      <span style={{
                        fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                        letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)",
                      }}>{k}</span>
                      <span style={{
                        fontFamily: "'Geist', sans-serif", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5,
                      }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// CUSTOM WORKFLOWS
// ============================================================

function CustomWorkflows({ onBookDemo }) {
  const alsoBuilt = [
    "Supplier onboarding + verification flows",
    "B-BBEE procurement tracking + reporting",
    "WSP/ATR auto-compilation from HRIS",
    "Crime-incident → insurance claim workflows",
    "POD-to-invoice closure + dispute escalation",
    "Customer credit-risk scoring + auto-hold",
    "Sales-order to ERP entry from email or PDF",
    "Internal approval chains with mobile sign-off",
  ];
  const promptItems = [
    { k: "What the workflow does", v: "The step-by-step that someone on your team repeats every week or month." },
    { k: "What's slow or painful", v: "Where the bottleneck sits today. Where errors creep in. What it costs you when it goes wrong." },
    { k: "What 'good' looks like", v: "If this workflow ran itself, what would you do with the time? What would change for your team?" },
  ];

  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 48 }}>
            <Eyebrow>Or anything else</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              These four aren't the limit.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>It's AI Workflow Automation.</em>
            </Headline>
            <p style={{
              marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65,
              color: "var(--ink-2)", maxWidth: 640,
            }}>
              The four workflows above are the ones we ship most often. They are not the catalog. Any high-volume operational workflow that follows the same pattern week after week is a candidate. If yours isn't on the list above, that's the normal case — tell us about it and we'll scope and build.
            </p>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div style={{
            display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24, alignItems: "stretch",
          }}>
            {/* Left — what else we've built */}
            <div style={{
              background: "var(--surface-white)", border: "1px solid var(--hairline)",
              borderRadius: 20, padding: 36,
            }}>
              <div style={{
                fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
                marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid var(--hairline)",
              }}>
                Other workflow shapes we scope
              </div>
              <ul style={{ padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {alsoBuilt.map((it, i) => (
                  <li key={i} style={{
                    listStyle: "none", display: "grid", gridTemplateColumns: "auto 1fr",
                    gap: 10, alignItems: "start",
                    fontFamily: "'Geist', sans-serif", fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5,
                  }}>
                    <span style={{
                      width: 16, height: 16, borderRadius: "50%", background: "var(--coral-soft)",
                      color: "var(--coral)", fontSize: 11, fontWeight: 700, display: "flex",
                      alignItems: "center", justifyContent: "center", marginTop: 1, flexShrink: 0,
                    }}>✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <div style={{
                marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--hairline)",
                fontFamily: "'Geist', sans-serif", fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.55,
                fontStyle: "italic",
              }}>
                The pattern: if it happens 40+ times a week, the same way every time, AI workflow automation has a shape for it.
              </div>
            </div>

            {/* Right — "tell us what you'd want built" */}
            <div style={{
              background: "var(--ink-1)", color: "var(--paper)",
              borderRadius: 20, padding: 36, display: "flex", flexDirection: "column",
            }}>
              <div style={{
                fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
                marginBottom: 18,
              }}>
                Tell us yours
              </div>
              <div style={{
                fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.3,
                letterSpacing: "-0.015em", marginBottom: 22,
              }}>
                In 45 minutes Stephan will know if a sprint fits — and quote it if it does.
              </div>
              <ul style={{ padding: 0, margin: "0 0 22px", display: "flex", flexDirection: "column", gap: 14, flex: 1 }}>
                {promptItems.map((p, i) => (
                  <li key={i} style={{ listStyle: "none" }}>
                    <div style={{
                      fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                      letterSpacing: "0.22em", textTransform: "uppercase",
                      color: "rgba(245,240,232,0.55)", marginBottom: 4,
                    }}>{p.k}</div>
                    <div style={{
                      fontFamily: "'Geist', sans-serif", fontSize: 13.5, lineHeight: 1.55,
                      color: "rgba(245,240,232,0.85)",
                    }}>{p.v}</div>
                  </li>
                ))}
              </ul>
              <button
                onClick={onBookDemo}
                style={{
                  background: "var(--coral)", color: "var(--paper)", border: "none", borderRadius: 999,
                  height: 50, padding: "0 26px", fontFamily: "'Geist', sans-serif", fontSize: 15,
                  fontWeight: 600, cursor: "pointer", marginTop: "auto", alignSelf: "flex-start",
                }}
              >
                Tell us about your workflow →
              </button>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// HOW A SPRINT RUNS
// ============================================================

const SPRINT_STEPS = [
  { w: "Week 0", t: "Discovery call (45 min, free)", b: "We sit with your team. We learn the actual workflow, the real pain, the data that lives in the cracks." },
  { w: "Week 1", t: "Scope signed", b: "Integrations identified. Success metric agreed. Fixed scope, fixed timeline." },
  { w: "Week 2–3", t: "Build + integrate", b: "We build the automation against your real stack — ERP, accounting, email, whatever it touches." },
  { w: "Week 4", t: "Live in shadow mode", b: "Your team reviews every AI action before it sends. We tune what needs tuning." },
  { w: "End of W4", t: "Live in production", b: "AI handles the flow. Your team handles exceptions. You get the audit trail." },
];

function SprintFlow() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>How a sprint runs</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Discovery to live{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>in four weeks.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 23, top: 14, bottom: 14, width: 1.5, background: "var(--hairline)" }} />
          {SPRINT_STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: "grid", gridTemplateColumns: "48px 1fr 1.4fr", gap: 32, alignItems: "start",
                padding: "24px 0",
                borderBottom: i === SPRINT_STEPS.length - 1 ? "none" : "1px solid var(--hairline)",
              }}>
                <span style={{
                  width: 48, height: 48, borderRadius: "50%", background: "var(--paper)",
                  border: "2px solid var(--coral)", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Geist Mono', monospace", fontWeight: 600, fontSize: 11,
                  color: "var(--coral)", position: "relative", zIndex: 1,
                }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <div style={{
                    fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
                    letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)", marginBottom: 8,
                  }}>{s.w}</div>
                  <h3 style={{
                    fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.25,
                    letterSpacing: "-0.02em", color: "var(--ink-1)", margin: 0,
                  }}>{s.t}</h3>
                </div>
                <p style={{
                  fontFamily: "'Geist', sans-serif", fontSize: 15, lineHeight: 1.65, color: "var(--ink-3)",
                  marginTop: 4, maxWidth: 480,
                }}>{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// HOW SPRINTS ARE SCOPED (replaces "Pricing" section per no-pricing rule)
// ============================================================

function Scoping() {
  const items = [
    "Discovery + scoping (Week 0–1)",
    "Build + integration with your stack (Week 2–3)",
    "Shadow mode + tuning (Week 4)",
    "Production handover with the engineer's phone number",
    "30-day post-launch support included",
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
            <div>
              <Eyebrow>How sprints are scoped</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 32, maxWidth: 460 }}>
                Fixed scope.{" "}
                <em style={{ fontStyle: "italic", fontWeight: 700 }}>No surprise overages.</em>
              </Headline>
              <p style={{
                marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65,
                color: "var(--ink-2)", maxWidth: 420,
              }}>
                Every sprint quoted upfront before any work starts. No retainers. No T&M. No "we'll see what it costs" surprises six weeks in. Talk to Stephan — he replies personally within one working day with a number you can sign or walk away from.
              </p>
            </div>
            <div style={{
              background: "var(--surface-white)", border: "1px solid var(--hairline)",
              borderRadius: 20, padding: 36,
            }}>
              <div style={{
                fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
                marginBottom: 18, paddingBottom: 18, borderBottom: "1px solid var(--hairline)",
              }}>
                What's in every sprint
              </div>
              <ul style={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map((it, i) => (
                  <li key={i} style={{
                    listStyle: "none", display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "start",
                    fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55,
                  }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: "50%", background: "var(--coral-soft)",
                      color: "var(--coral)", fontSize: 12, fontWeight: 700, display: "flex",
                      alignItems: "center", justifyContent: "center", marginTop: 1, flexShrink: 0,
                    }}>✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// FINAL CTA
// ============================================================

function AutomationCTA({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "144px 0", borderTop: "1px solid var(--hairline)", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)",
        width: 1300, height: 1300,
        background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 55%)",
        pointerEvents: "none",
      }} />
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <Eyebrow>Try a sprint</Eyebrow>
            <h2 style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0,
              letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance",
            }}>
              Bring us the workflow that{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>shouldn't exist anymore.</em>
            </h2>
            <p style={{
              marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55,
              color: "var(--ink-2)", maxWidth: 620, marginLeft: "auto", marginRight: "auto",
            }}>
              45 minutes. No deck. Show us what your team rebuilds every week — we'll come back with a scope, a timeline, and a number.
            </p>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book a discovery call</PrimaryButton>
              <OutlineButton as="a" href="mailto:hello@vsgtech.co.za" size="lg">hello@vsgtech.co.za</OutlineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ============================================================
// PAGE ASSEMBLY
// ============================================================

function AutomationPage({ onBookDemo }) {
  return (
    <React.Fragment>
      <AutomationHero onBookDemo={onBookDemo} />
      <FourWorkflows />
      <CustomWorkflows onBookDemo={onBookDemo} />
      <SprintFlow />
      <Scoping />
      <AutomationCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="services">
      <AutomationPage />
    </PageShell>
  );
});
