/* global React, ReactDOM */

/* AI Systems & Integration — dedicated service page.
   Hero → what AI does → where AI fits (honest) → how it works → CTA. */

// ============================================================
// HERO
// ============================================================

function AISystemsHero({ onBookDemo }) {
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
            <a href="services.html" style={{ color: "var(--ink-4)", textDecoration: "none" }}>What we build</a>
            <span>/</span>
            <span style={{ color: "var(--ink-1)" }}>AI Systems &amp; Integration</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div style={{
            fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
            marginBottom: 24,
          }}>
            Service · AI Systems &amp; Integration
          </div>
        </Reveal>

        <Reveal delay={140}>
          <h1 style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 0.98,
            letterSpacing: "-0.045em", color: "var(--ink-1)", margin: 0,
            maxWidth: 1080, textWrap: "balance",
          }}>
            Put AI to work inside{" "}
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>the systems you already run.</em>
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p style={{
            marginTop: 36, maxWidth: 760,
            fontFamily: "'Geist', sans-serif", fontSize: 21, lineHeight: 1.55, color: "var(--ink-2)",
          }}>
            Most businesses don't need another piece of software. They need the systems they already run — the ERP, the spreadsheets, the inbox — to start thinking for themselves. We add a layer of intelligence on top: it reads, drafts, classifies, reconciles, predicts, and flags the few things that genuinely need a person. No rip-and-replace. Start with one process; grow from there.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div style={{ marginTop: 44, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <PrimaryButton onClick={onBookDemo} size="lg">Ask where AI fits</PrimaryButton>
            <OutlineButton as="a" href="#what" size="lg">See what AI does</OutlineButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ============================================================
// WHAT AI ACTUALLY DOES — capability cards
// ============================================================

const AI_CAPABILITIES = [
  {
    n: "01",
    tag: "Read & extract",
    title: "Turn documents into data, automatically.",
    body: "Invoices, purchase orders, contracts, delivery notes, emails — the documents your team re-keys by hand every day. AI reads them, pulls out the fields that matter, and pushes them straight into your ERP or spreadsheets. No more copy-paste between a PDF and a system.",
    facts: [
      ["Best for", "Any team drowning in manual data entry"],
      ["Touches", "ERP, accounting, shared drives, inbox"],
    ],
  },
  {
    n: "02",
    tag: "Draft & reply",
    title: "Writes the routine replies for you.",
    body: "The supplier emails, the customer queries, the status updates your team writes from scratch a hundred times a week. AI drafts them in your business's own voice and tone — your team reviews and sends. The blank page disappears.",
    facts: [
      ["Best for", "High-volume inboxes and repetitive correspondence"],
      ["Touches", "Email, supplier + customer comms"],
    ],
  },
  {
    n: "03",
    tag: "Classify & route",
    title: "Sorts the noise so people don't have to.",
    body: "Every incoming email, ticket, or request — read, categorised, prioritised, and routed to the right person automatically. The urgent stuff surfaces. The routine stuff handles itself. Nobody triages an inbox by hand anymore.",
    facts: [
      ["Best for", "Shared inboxes, support queues, intake forms"],
      ["Touches", "Email, helpdesk, internal tools"],
    ],
  },
  {
    n: "04",
    tag: "Reconcile & match",
    title: "Matches the numbers overnight.",
    body: "Statements against ledgers. Invoices against POs and delivery notes. Payments against accounts. The reconciliation work that eats days every month — AI does it overnight, surfaces only the discrepancies, and drafts the queries.",
    facts: [
      ["Best for", "Finance, AP/AR, procurement teams"],
      ["Touches", "ERP, accounting, bank feeds"],
    ],
  },
  {
    n: "05",
    tag: "Predict & warn",
    title: "Flags the problem before it lands.",
    body: "Late deliveries. Slow-paying customers. Stock about to run out. Orders at risk. AI watches the patterns in your own data and warns you early — while there's still time to do something about it, not after the customer has already complained.",
    facts: [
      ["Best for", "Operations, supply chain, credit control"],
      ["Touches", "ERP, sales + supplier data"],
    ],
  },
  {
    n: "06",
    tag: "Decide & flag",
    title: "Handles the routine, escalates the rest.",
    body: "You set the rules. AI acts on the clear-cut cases automatically, and flags the genuine exceptions for a human — with the context already gathered. Your team stops handling throughput and starts handling the decisions that actually need them.",
    facts: [
      ["Best for", "Approval chains, exception handling"],
      ["Touches", "ERP, workflow tools, your rules"],
    ],
  },
];

function WhatAIDoes() {
  return (
    <Section id="what" alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>What AI does</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Six things AI can do inside your business{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>starting now.</em>
            </Headline>
            <p style={{ marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 640 }}>
              You don't have to adopt all of these. Most businesses start with one — the process that wastes the most time today — and grow from there.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {AI_CAPABILITIES.map((w, i) => (
            <Reveal key={i} delay={(i % 2) * 80}>
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
                    <div key={j} style={{ display: "grid", gridTemplateColumns: "76px 1fr", gap: 14 }}>
                      <span style={{
                        fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10,
                        letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-4)",
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
// WHERE AI FITS — the honest section (helps vs doesn't)
// ============================================================

function WhereAIFits({ onBookDemo }) {
  const helps = [
    "Work that's high-volume and follows the same pattern every time",
    "Reading, sorting, and re-keying data between systems",
    "Drafting routine replies and documents",
    "Catching what a tired human misses at 4pm on a Friday",
    "Watching data constantly and warning you early",
  ];
  const doesnt = [
    "Decisions that need real judgement, relationships, or trust",
    "One-off work that never repeats the same way twice",
    "Anything where a wrong answer is worse than a slow one",
    "Replacing the people who actually run your business",
    "Problems a simple fix or a clear process would solve better",
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 48 }}>
            <Eyebrow>Where AI fits</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              We'll tell you where AI helps —{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>and where it doesn't.</em>
            </Headline>
            <p style={{ marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 640 }}>
              Half the value of working with us is honesty. Plenty of "AI projects" should never have been AI projects. Sometimes the fix is AI; often it's making one decision sharper by putting the right numbers in front of it at the right moment. We'll always tell you which is which — and which parts of your operation are better left exactly as they are.
            </p>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <Reveal>
            <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 36, height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--coral)" }} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                  Where AI helps
                </span>
              </div>
              <ul style={{ marginTop: 24, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {helps.map((s, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start", listStyle: "none", paddingBottom: 14, borderBottom: i === helps.length - 1 ? "none" : "1px solid var(--hairline)" }}>
                    <span style={{ marginTop: 2, color: "var(--coral)", fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1 }}>+</span>
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 16, color: "var(--ink-1)", lineHeight: 1.55 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ background: "var(--paper-2)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 36, height: "100%" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--ink-4)" }} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                  Where it doesn't
                </span>
              </div>
              <ul style={{ marginTop: 24, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {doesnt.map((s, i) => (
                  <li key={i} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start", listStyle: "none", paddingBottom: 14, borderBottom: i === doesnt.length - 1 ? "none" : "1px solid var(--hairline)" }}>
                    <span style={{ marginTop: 2, color: "var(--ink-4)", fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 16, lineHeight: 1 }}>—</span>
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 16, color: "var(--ink-3)", lineHeight: 1.55 }}>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div style={{
            marginTop: 32, padding: "28px 32px", borderRadius: 20, background: "var(--ink-1)", color: "var(--paper)",
            display: "flex", justifyContent: "space-between", alignItems: "center", gap: 32, flexWrap: "wrap",
          }}>
            <div>
              <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                Don't know where to start?
              </div>
              <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 22, letterSpacing: "-0.015em", maxWidth: 640 }}>
                That's the most common — and the best — place to begin. Tell us how your operation runs. We'll point at exactly where AI would earn its keep.
              </div>
            </div>
            <button
              onClick={onBookDemo}
              style={{
                background: "var(--coral)", color: "var(--paper)", border: "none", borderRadius: 999,
                height: 50, padding: "0 26px", fontFamily: "'Geist', sans-serif", fontSize: 15,
                fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
              }}
            >
              Start the conversation →
            </button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// HOW IT WORKS
// ============================================================

const AI_STEPS = [
  { w: "Step 1", t: "Discovery (45 min, free)", b: "We sit with your team, learn how the work actually flows, and find the one process where AI would save the most — fast." },
  { w: "Step 2", t: "Scope signed", b: "We agree what we'll build, what it connects to, and what success looks like. Fixed scope, quoted upfront." },
  { w: "Step 3", t: "Build + connect", b: "We build the AI against your real stack — your ERP, your inbox, your data. On real examples, not a demo." },
  { w: "Step 4", t: "Shadow & tune", b: "It runs alongside your team first. Every action reviewed, every miss tuned, before it touches anything live." },
  { w: "Then", t: "Live, then grow", b: "AI handles the routine. Your team handles exceptions. Once it's proven, we look at the next process." },
];

function AIHowItWorks() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760, marginBottom: 56 }}>
            <Eyebrow>How it works</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              One process, proven,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>then we widen.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ position: "relative" }}>
          <div aria-hidden="true" style={{ position: "absolute", left: 23, top: 14, bottom: 14, width: 1.5, background: "var(--hairline)" }} />
          {AI_STEPS.map((s, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: "grid", gridTemplateColumns: "48px 1fr 1.4fr", gap: 32, alignItems: "start",
                padding: "24px 0",
                borderBottom: i === AI_STEPS.length - 1 ? "none" : "1px solid var(--hairline)",
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
// FINAL CTA
// ============================================================

function AISystemsCTA({ onBookDemo }) {
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
            <Eyebrow>Start your AI journey</Eyebrow>
            <h2 style={{
              fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0,
              letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance",
            }}>
              You know your operation.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>We'll bring the AI.</em>
            </h2>
            <p style={{
              marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55,
              color: "var(--ink-2)", maxWidth: 620, marginLeft: "auto", marginRight: "auto",
            }}>
              45 minutes. No deck. Tell us how the work really flows — we'll come back with exactly where AI would help, what we'd build first, and a number.
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

function AISystemsPage({ onBookDemo }) {
  return (
    <React.Fragment>
      <AISystemsHero onBookDemo={onBookDemo} />
      <WhatAIDoes />
      <WhereAIFits onBookDemo={onBookDemo} />
      <AIHowItWorks />
      <AISystemsCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="services">
      <AISystemsPage />
    </PageShell>
  );
});
