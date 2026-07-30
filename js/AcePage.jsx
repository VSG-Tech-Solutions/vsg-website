/* global React, ReactDOM */

/* VSG ACE page — the per-customer AI engine inside every VSG product. */

// ============================================================
// 1) HERO — dark, declarative
// ============================================================

function AceHero({ onBookDemo }) {
  const HERO_BG = "#13100C";   // darker so the sunrise pops
  const HERO_INK = "#F5F0E8";
  const HERO_INK_2 = "rgba(245,240,232,0.78)";
  const HERO_INK_3 = "rgba(245,240,232,0.50)";
  const HERO_INK_4 = "rgba(245,240,232,0.35)";

  return (
    <section style={{
      position: "relative",
      background: HERO_BG,
      paddingTop: 96,
      paddingBottom: 96,
      overflow: "hidden",
    }}>
      {/* Sunrise — coral horizon rising from the bottom edge. */}
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 110% 55% at 50% 100%, rgba(201,99,58,0.28), rgba(201,99,58,0) 70%)",
        pointerEvents: "none",
      }} />
      <Container style={{ position: "relative" }}>
        <Reveal>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontFamily: "'Geist Mono', monospace",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: HERO_INK_4,
            marginBottom: 36,
          }}>
            <a href="index.html" style={{ color: HERO_INK_4, textDecoration: "none" }}>← VSG Tech</a>
            <span>/</span>
            <span style={{ color: HERO_INK }}>VSG ACE</span>
          </div>
        </Reveal>

        <div style={{ textAlign: "center", maxWidth: 1080, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)" }} />
              <span style={{
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500, fontSize: 11,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--coral)",
              }}>
                VSG ACE · The AI engine inside every product
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 700, fontSize: 104,
              lineHeight: 0.98,
              letterSpacing: "-0.045em",
              color: HERO_INK,
              margin: 0,
              textWrap: "balance",
            }}>
              An AI that learns{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>
                your business.
              </em>
              <br />Never anyone else's.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p style={{
              marginTop: 32,
              maxWidth: 760,
              marginLeft: "auto",
              marginRight: "auto",
              fontFamily: "'Geist', sans-serif",
              fontSize: 21, lineHeight: 1.55,
              color: HERO_INK_2,
            }}>
              ACE is the intelligence inside every VSG product. Today that means history-based forecasting and true landed-cost mathematics, computed from your own ERP data — on your hardware. On the roadmap: drafting, approvals, agents. Each customer gets their own instance. Never shared, never trained across customers, never pooled.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={onBookDemo} style={{
                background: "var(--coral)",
                color: HERO_INK,
                border: "none",
                borderRadius: 999,
                height: 56,
                padding: "0 32px",
                fontFamily: "'Geist', sans-serif",
                fontSize: 15, fontWeight: 600,
                cursor: "pointer",
                boxShadow: "0 12px 32px -12px rgba(201,99,58,0.55)",
              }}>
                See ACE in your context
              </button>
              <a href="#how" style={{
                background: "transparent",
                color: HERO_INK,
                border: `1px solid ${HERO_INK_3}`,
                borderRadius: 999,
                height: 56,
                padding: "0 32px",
                fontFamily: "'Geist', sans-serif",
                fontSize: 15, fontWeight: 600,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
              }}>
                How it works
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div style={{
              marginTop: 36,
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 500, fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: HERO_INK_4,
              display: "flex",
              gap: 20,
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
              <span>Per-customer instance</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(245,240,232,0.18)", alignSelf: "center" }} />
              <span>No cross-customer training</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(245,240,232,0.18)", alignSelf: "center" }} />
              <span>On-premise today</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(245,240,232,0.18)", alignSelf: "center" }} />
              <span>Read-only ERP access</span>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

// ============================================================
// 2) FOUR GUARANTEES
// ============================================================

function AcePrinciples() {
  const principles = [
    { tag: "Isolated", title: "Your context lives in your instance. Nowhere else.", body: "Every customer gets a discrete ACE instance. Your history, your prices, your plans — none of it touches another customer's instance, not even at inference time." },
    { tag: "Portable", title: "Your data stays in files you own. No lock-in.", body: "Your master data never leaves your ERP, and everything ACE produces — plans, snapshots, purchase orders — lands in readable files on your own hardware. If you ever leave, there's nothing to extract. We'd rather you stay because the product earns it." },
    { tag: "Auditable", title: "Every number, traceable to its inputs.", body: "The shipped intelligence is deterministic: the same history produces the same forecast, and every landed-cost figure breaks down line by line — duty, clearing, freight, FX. As roadmap actions ship, each one will be logged with the inputs that produced it." },
    { tag: "Local-first", title: "On-premise today. Your hardware, your network.", body: "The production deployment runs entirely on your own hardware — a self-contained app reading SYSPRO over ODBC, no cloud dependency. Any future hosted components default to South African infrastructure." },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>The four guarantees</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              What ACE <em style={{ fontStyle: "italic", fontWeight: 700 }}>commits to.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 36 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--coral)" }} />
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                    {p.tag}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 26, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--ink-1)", margin: "18px 0 0", textWrap: "balance" }}>
                  {p.title}
                </h3>
                <p style={{ marginTop: 16, fontFamily: "'Geist', sans-serif", fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)" }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// 3) WHAT ACE KNOWS — 8 memory categories with concrete examples
// ============================================================

function AceKnows() {
  const memory = [
    {
      tag: "Your sales history",
      ex: "Up to 18 months of per-SKU movement, seasonality included — December and January trade differently, and the projection knows it. The current month is prorated from actuals, not guessed.",
    },
    {
      tag: "Your stock lots",
      ex: "Every lot with its own cost, its Local-or-Import flag, and the purchase order it arrived on. Drill from any number in the planning grid straight down to the lots behind it.",
    },
    {
      tag: "Your committed orders",
      ex: "What's already on order, month by month, so projected closing stock reflects what's actually arriving — not just what you hope is.",
    },
    {
      tag: "Your customers",
      ex: "Customer share per SKU — see who actually drives a line's movement before you commit to a buy, and what walks out the door if that relationship changes.",
    },
    {
      tag: "Your supplier prices",
      ex: "Every RFQ round-trip imported back and compared per line — multiple suppliers side by side, Local against Import, with container and load fill in view.",
    },
    {
      tag: "Your landed costs",
      ex: "Price plus duty, clearing, freight and FX — the true cost of an import next to a local quote, not the number on the invoice.",
    },
    {
      tag: "Your cover targets",
      ex: "Months-of-cover targets per SKU, RAG-flagged the moment projected stock falls short before the next order can land. Stock-turn and upturn tracked in financial terms.",
    },
    {
      tag: "Your warehouses",
      ex: "Multi-warehouse stock merged into one view, then filtered live — by class, warehouse, wildcard, or compound numeric rules your buyer writes on the fly.",
    },
  ];

  return (
    <Section alt id="how">
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>What ACE knows about your business</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Eight kinds of memory.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>All yours.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              ACE doesn't guess. Inside VSG ICT it works from your own records — the history, lots, orders and costs already sitting in your ERP. Eight categories, all read from your data, nothing invented and nothing pooled.
            </p>
          </div>
        </Reveal>
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 18,
        }}>
          {memory.map((m, i) => (
            <Reveal key={i} delay={i * 50}>
              <div style={{
                background: "var(--surface-white)",
                border: "1px solid var(--hairline)",
                borderRadius: 16,
                padding: 28,
                height: "100%",
              }}>
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "4px 10px",
                  background: "var(--coral-soft)",
                  border: "1px solid rgba(201,99,58,0.22)",
                  borderRadius: 999,
                  marginBottom: 16,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--coral)" }} />
                  <span style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--coral)",
                  }}>
                    {m.tag}
                  </span>
                </div>
                <p style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 15, lineHeight: 1.6,
                  color: "var(--ink-2)",
                  margin: 0,
                }}>
                  {m.ex}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={400}>
          <div style={{
            marginTop: 40,
            padding: "16px 22px",
            background: "var(--coral-soft)",
            border: "1px solid rgba(201,99,58,0.22)",
            borderRadius: 14,
            maxWidth: 720,
            fontFamily: "'Geist', sans-serif",
            fontSize: 14,
            color: "var(--ink-2)",
            lineHeight: 1.55,
          }}>
            <strong style={{ color: "var(--coral)", fontWeight: 600 }}>On the roadmap:</strong> the learned kind of memory — your terminology, your house voice, your exception patterns — absorbed from your buyer's corrections once the drafting features ship. Future tense on purpose.
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// 4) WHAT ACE DOES — Capability pillars
// ============================================================

function AceDoes() {
  const pillars = [
    {
      icon: "◇",
      tag: "Reads — today",
      title: "Your ERP, read-only.",
      body: "ACE reads SYSPRO over ODBC — up to 18 months of sales history, stock lots with per-lot cost and source PO, committed orders, customer share per SKU. It never writes back. The ERP stays the system of record.",
    },
    {
      icon: "▲",
      tag: "Compares — today",
      title: "True landed cost, side by side.",
      body: "Supplier RFQs imported and compared per line on true landed cost — price plus duty, clearing, freight, FX. Local against Import, container and load fill in view. Award per line or whole column; your buyer makes the call.",
    },
    {
      icon: "◉",
      tag: "Explains — today",
      title: "Every figure shows its working.",
      body: "The maths is deterministic — the same history in produces the same forecast out. Drill from any number to the stock lots, committed orders and cost lines behind it. Never a black-box answer. CFO-ready, defensible.",
    },
    {
      icon: "✎",
      tag: "Drafts — roadmap",
      title: "Replies in your house voice.",
      body: "On the roadmap: supplier emails drafted with your terminology, your reference codes, your courtesy patterns — always reviewed and approved by your buyer before anything sends. Nothing goes out on its own.",
    },
    {
      icon: "→",
      tag: "Acts — roadmap",
      title: "Writes back to your ERP. Where ACE is heading.",
      body: "The acting tier is the roadmap: approved POs posted into SYSPRO via e.net, goods receipts to follow — every write logged with the input that produced it, and always behind explicit human sign-off. Today, ACE recommends and explains; a person acts.",
    },
    {
      icon: "↻",
      tag: "Learns — roadmap",
      title: "Every correction tightens the next round.",
      body: "Arrives with the drafting features: when your buyer edits a draft, ACE absorbs the diff; when you override a threshold, it notes the preference. Today's forecasting stays deterministic, history-based projection — learning ships labelled, not smuggled in.",
    },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>What ACE does</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Six capabilities —{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>three live, three to come.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              Not a chatbot. An engine inside the product. Today ACE reads your ERP, compares your options on true landed cost, and shows its working. Drafting, acting and learning are the roadmap — each shipping behind explicit human approval.
            </p>
          </div>
        </Reveal>
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {pillars.map((p, i) => (
            <Reveal key={i} delay={i * 70}>
              <div style={{
                background: "var(--surface-white)",
                border: "1px solid var(--hairline)",
                borderRadius: 20,
                padding: 32,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 18,
                }}>
                  <span style={{
                    width: 36, height: 36,
                    borderRadius: 10,
                    background: "var(--coral-soft)",
                    color: "var(--coral)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 18, fontWeight: 700,
                  }}>
                    {p.icon}
                  </span>
                  <span style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500, fontSize: 11,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}>
                    {p.tag}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 700, fontSize: 22,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "var(--ink-1)",
                  margin: 0,
                  textWrap: "balance",
                }}>
                  {p.title}
                </h3>
                <p style={{
                  marginTop: 14,
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 14.5, lineHeight: 1.6,
                  color: "var(--ink-3)",
                  margin: "14px 0 0",
                }}>
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// 5) HOW ACE GETS SMARTER — learning curve over time
// ============================================================

function AceLearningCurve() {
  const milestones = [
    {
      t: "Shipped · today",
      label: "In production",
      mark: "01",
      detail: "History-based forecasting ~5 months ahead from up to 18 months of history, true landed-cost comparison, and a SYSPRO-ready purchase order — live at a South African steel distributor, on their own hardware.",
    },
    {
      t: "Next",
      label: "ERP write-back",
      mark: "02",
      detail: "Approved POs posted into SYSPRO via e.net, goods receipts to follow — certified onto e.net and listed on the SYSPRO Marketplace. Until then, ACE stays read-only.",
    },
    {
      t: "Roadmap",
      label: "AI-drafted email",
      mark: "03",
      detail: "Supplier RFQs chased and replies drafted in your house voice — every send behind buyer approval. This is where the learned memory starts to compound.",
    },
    {
      t: "Roadmap",
      label: "Approvals + ML forecasting",
      mark: "04",
      detail: "Multi-level, role-based sign-off chains. Probabilistic forecasting layered over the deterministic baseline — plus a plain-language copilot and deeper inventory intelligence.",
    },
    {
      t: "Roadmap",
      label: "Autonomous buying",
      mark: "05",
      detail: "A guardrailed buying agent: routine repeat buys proposed within hard limits you set, a person signing off anything outside them. The end state — approached step by step, in the open.",
    },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>The build order</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Today is shipped.{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>The rest is roadmap.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              No invented adoption curves, no acceptance rates from tenants that don't exist. The honest version: what runs in production today, and the order the rest arrives in.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 64, position: "relative" }}>
          {/* Connecting line */}
          <div aria-hidden="true" style={{
            position: "absolute",
            top: 36,
            left: "10%",
            right: "10%",
            height: 2,
            background: "linear-gradient(90deg, var(--coral-soft) 0%, var(--coral) 100%)",
            zIndex: 0,
          }} />
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 16,
            position: "relative",
            zIndex: 1,
          }}>
            {milestones.map((m, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ textAlign: "center" }}>
                  <div style={{
                    width: 72, height: 72,
                    borderRadius: "50%",
                    background: i === 0 ? "var(--coral)" : "var(--surface-white)",
                    border: "2px solid var(--coral)",
                    boxShadow: "0 8px 24px -10px rgba(201,99,58,0.4)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 18px",
                  }}>
                    <span style={{
                      fontFamily: "'Geist', sans-serif",
                      fontWeight: 700, fontSize: 20,
                      color: i === 0 ? "#FDF9F3" : "var(--coral)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}>
                      {m.mark}
                    </span>
                  </div>
                  <div style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--coral)",
                    marginBottom: 8,
                  }}>
                    {m.t}
                  </div>
                  <h3 style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 700, fontSize: 18,
                    letterSpacing: "-0.015em",
                    color: "var(--ink-1)",
                    margin: 0,
                  }}>
                    {m.label}
                  </h3>
                  <p style={{
                    marginTop: 12,
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 13, lineHeight: 1.55,
                    color: "var(--ink-3)",
                  }}>
                    {m.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={500}>
          <div style={{
            marginTop: 48,
            padding: "16px 22px",
            background: "var(--coral-soft)",
            border: "1px solid rgba(201,99,58,0.22)",
            borderRadius: 14,
            maxWidth: 720,
            margin: "48px auto 0",
            textAlign: "center",
            fontFamily: "'Geist', sans-serif",
            fontSize: 14,
            color: "var(--ink-2)",
            lineHeight: 1.55,
          }}>
            <strong style={{ color: "var(--coral)", fontWeight: 600 }}>Build order, not dates.</strong> Stage 01 is the only one shipped — everything after it is future tense on purpose. When a stage goes live, this page changes tense.
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// 6) WHY PER-CUSTOMER BEATS CROSS-TRAINED — comparison
// ============================================================

function AceComparison() {
  const rows = [
    {
      dim: "Whose data trains the AI",
      cross: "Everyone's. Your edge cases get averaged into a global pool.",
      vsg: "Yours only. Your instance, computed from your own ERP data. Nothing pooled.",
    },
    {
      dim: "What ACE knows about you",
      cross: "Whatever the community supplied. Your specifics don't compound.",
      vsg: "Your sales history, stock lots, committed orders, supplier prices, landed costs — read straight from your ERP.",
    },
    {
      dim: "Where the intelligence runs",
      cross: "The vendor's cloud. Your data makes the round trip.",
      vsg: "On your hardware. The production deployment is on-premise and reads your ERP read-only.",
    },
    {
      dim: "Compliance posture",
      cross: "Your data lives somewhere — often the US, often pooled.",
      vsg: "On-premise today, per-customer isolation by design. Zero cross-tenant exposure.",
    },
    {
      dim: "Lock-in risk",
      cross: "Your context is fused into the vendor's model. Leaving means starting over.",
      vsg: "Your master data never leaves your ERP; plans and POs are readable files you keep. Leave anytime.",
    },
    {
      dim: "Who picks the foundation model",
      cross: "The vendor. Locked to whatever they ship.",
      vsg: "Today's shipped intelligence needs none — it's deterministic maths. Where models enter on the roadmap, we hold the choice and swap. Your data stays put.",
    },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>The architectural choice</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Per-customer beats{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>community-trained.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              Most procurement AI ships as one cross-trained model serving every customer. Cheaper to build. Worse for you. Here's the trade you're making — and why ACE makes the opposite call.
            </p>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div style={{
            marginTop: 56,
            background: "var(--surface-white)",
            border: "1px solid var(--hairline)",
            borderRadius: 20,
            overflow: "hidden",
          }}>
            {/* Header row */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1.4fr 1.4fr",
              borderBottom: "1px solid var(--hairline)",
              background: "var(--paper-2)",
            }}>
              <div style={{
                padding: "20px 24px",
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500, fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}>
                Dimension
              </div>
              <div style={{
                padding: "20px 24px",
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500, fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
                borderLeft: "1px solid var(--hairline)",
              }}>
                Cross-trained AI<br />
                <span style={{ textTransform: "none", letterSpacing: 0, fontSize: 11, color: "var(--ink-3)", fontWeight: 400 }}>
                  (community-trained models · most procurement platforms)
                </span>
              </div>
              <div style={{
                padding: "20px 24px",
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500, fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--coral)",
                borderLeft: "1px solid var(--hairline)",
                background: "var(--coral-soft)",
              }}>
                ★ Per-customer AI<br />
                <span style={{ textTransform: "none", letterSpacing: 0, fontSize: 11, color: "var(--ink-2)", fontWeight: 400 }}>
                  (VSG ACE)
                </span>
              </div>
            </div>
            {/* Rows */}
            {rows.map((r, i) => (
              <div key={i} style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.4fr 1.4fr",
                borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--hairline)",
              }}>
                <div style={{
                  padding: "20px 24px",
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 14, fontWeight: 600,
                  color: "var(--ink-1)",
                  lineHeight: 1.5,
                }}>
                  {r.dim}
                </div>
                <div style={{
                  padding: "20px 24px",
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 14,
                  color: "var(--ink-3)",
                  lineHeight: 1.55,
                  borderLeft: "1px solid var(--hairline)",
                }}>
                  {r.cross}
                </div>
                <div style={{
                  padding: "20px 24px",
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 14,
                  color: "var(--ink-1)",
                  lineHeight: 1.55,
                  borderLeft: "1px solid var(--hairline)",
                  background: "rgba(201,99,58,0.04)",
                  fontWeight: 500,
                }}>
                  {r.vsg}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// 7) ARCHITECTURE DIAGRAM
// ============================================================

function AceArchitecture() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end" }}>
            <div>
              <Eyebrow>Architecture</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 32, maxWidth: 480 }}>
                Three tenants. <em style={{ fontStyle: "italic", fontWeight: 700 }}>Three brains.</em>
              </Headline>
            </div>
            <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 480 }}>
              Each customer's ACE stands alone — today, as a self-contained deployment on their own hardware. The shared, swappable model layer below is the design for the AI roadmap. Diagrammed the way we'd draw it for a security review: schematic, not a customer map.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ marginTop: 64, background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: "56px 48px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { n: "Customer A", c: "var(--ink-1)", note: "Isolated instance" },
                { n: "Customer B", c: "var(--coral)", note: "Isolated instance" },
                { n: "Customer C", c: "var(--ink-1)", note: "Isolated instance" },
              ].map((t, i) => (
                <div key={i} style={{ border: `1.5px solid ${t.c}`, borderRadius: 16, padding: 24, background: "var(--paper-2)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 16, color: "var(--ink-1)" }}>{t.n}</span>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.c }} />
                  </div>
                  <div style={{ marginTop: 16, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                    Memory · isolated
                  </div>
                  <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
                    {["Sales history", "Stock lots", "Supplier prices", "Landed costs"].map((l, j) => (
                      <div key={j} style={{ height: 6, borderRadius: 3, background: `${t.c}33`, width: `${[90, 70, 80, 60][j]}%` }} />
                    ))}
                  </div>
                  <div style={{ marginTop: 14, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                    {t.note}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", justifyContent: "center" }}>
                  <svg width="40" height="48" viewBox="0 0 40 48">
                    <line x1="20" y1="0" x2="20" y2="40" stroke="var(--ink-3)" strokeWidth="1.5" strokeDasharray="3 3" />
                    <path d="M 14 36 L 20 44 L 26 36" stroke="var(--ink-3)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
                  </svg>
                </div>
              ))}
            </div>

            <div style={{ border: "1px solid var(--ink-1)", borderRadius: 16, padding: 24, background: "var(--ink-1)", color: "var(--paper)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 17 }}>Model layer · shared, swappable</span>
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.7 }}>VSG-owned · roadmap</span>
              </div>
              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {["Foundation model", "Embeddings", "Tool router", "Guardrails"].map((c, i) => (
                  <div key={i} style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--paper)" }}>
                    {c}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.75)", lineHeight: 1.6 }}>
                Where the AI roadmap features will run — drafting, classification, the copilot. Inference happens against your memory only; your data never enters another customer's request, prompt, or training run. Today's forecasting and landed-cost maths don't need this layer at all — they run on your hardware.
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// 8) MODEL LAYER DETAIL
// ============================================================

function AceModelLayer() {
  const models = [
    { task: "Demand projection + cover flags", model: "Deterministic forecasting engine", why: "Auditable arithmetic on your own history, seasonality included — no black box where maths belongs." },
    { task: "Landed-cost comparison", model: "Deterministic cost engine", why: "Duty, clearing, freight and FX — exact, repeatable, defensible in front of an auditor." },
    { task: "Supplier reply drafting (roadmap)", model: "Frontier reasoning model", why: "House-voice nuance + Afrikaans/isiZulu handling — always behind buyer approval." },
    { task: "Email classification (roadmap)", model: "Fast classification model", why: "Quick, low-cost triage at inbox scale — planned, not shipped." },
    { task: "Embeddings (roadmap)", model: "Self-hosted, in your tenant", why: "When learned memory ships, your vectors live in your tenant and never leave it." },
    { task: "Guardrails + safety (roadmap)", model: "VSG-built rules engine", why: "Hard limits around every acting feature — sends, writes, buys. Your rules, not the model's defaults." },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
            <div>
              <Eyebrow>The model layer</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 32, maxWidth: 420 }}>
                We hold the model choice.{" "}
                <em style={{ fontStyle: "italic", fontWeight: 700 }}>You hold the memory.</em>
              </Headline>
              <p style={{ marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 380 }}>
                Different jobs want different engines. Today's shipped intelligence is deterministic — forecasting and landed-cost maths with no model in the loop. Where foundation models enter on the roadmap, we pick the best available per task and swap when something better ships. Your memory stays put.
              </p>
              <div style={{ marginTop: 28, padding: "16px 20px", background: "var(--coral-soft)", border: "1px solid rgba(201,99,58,0.22)", borderRadius: 12, fontFamily: "'Geist', sans-serif", fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>
                <strong style={{ color: "var(--coral)", fontWeight: 600 }}>Why this matters:</strong> when the next generation of models ships, we wire it in. You inherit the upgrade. You don't have to re-train your AI from scratch.
              </div>
            </div>
            <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, overflow: "hidden" }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1.2fr 1.1fr 1.4fr",
                padding: "16px 22px",
                background: "var(--paper-2)",
                borderBottom: "1px solid var(--hairline)",
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500, fontSize: 9,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--ink-4)",
              }}>
                <span>Task</span>
                <span>Model</span>
                <span>Why this one</span>
              </div>
              {models.map((m, i) => (
                <div key={i} style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1.1fr 1.4fr",
                  padding: "16px 22px",
                  borderBottom: i === models.length - 1 ? "none" : "1px solid var(--hairline)",
                  alignItems: "start",
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 13,
                  lineHeight: 1.55,
                }}>
                  <span style={{ color: "var(--ink-1)", fontWeight: 600 }}>{m.task}</span>
                  <span style={{ color: "var(--coral)", fontFamily: "'Geist Mono', monospace", fontSize: 12 }}>{m.model}</span>
                  <span style={{ color: "var(--ink-3)" }}>{m.why}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// 9) ACE INSIDE THE PRODUCTS
// ============================================================

function AceInProducts() {
  const products = [
    {
      name: "VSG ICT",
      status: "Live",
      statusBg: "rgba(14,122,90,0.12)",
      statusColor: "var(--success)",
      headline: "Today: the forecasting and landed-cost engine behind the planning grid. Next: the AI layer on top.",
      uses: [
        "Per-SKU demand projection from up to 18 months of your own sales history, seasonality included",
        "True landed-cost mathematics on every supplier comparison — duty, clearing, freight, FX",
        "Cover flags when projected stock falls below your target before the next order lands",
        "On the roadmap: AI-drafted supplier emails with buyer approval, and a plain-language copilot",
      ],
      href: "source.html",
    },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>Where ACE runs today</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Inside every{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>VSG product.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              ACE isn't a product you buy. It's the intelligence that ships with every VSG product — and the moat that compounds as we add more.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {products.map((p, i) => (
            <Reveal key={i} delay={i * 100}>
              <a href={p.href} style={{
                display: "block",
                background: "var(--surface-white)",
                border: "1px solid var(--hairline)",
                borderRadius: 20,
                padding: 36,
                textDecoration: "none",
                color: "inherit",
                height: "100%",
                transition: "border-color 220ms cubic-bezier(.2,0,0,1), transform 220ms",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--divider-strong)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--hairline)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                  <span style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 700, fontSize: 28,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-1)",
                  }}>
                    {p.name}
                  </span>
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "5px 11px",
                    borderRadius: 999,
                    background: p.statusBg,
                    border: `1px solid ${p.statusColor}40`,
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: p.statusColor,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: p.statusColor }} />
                    {p.status}
                  </span>
                </div>
                <p style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 17, lineHeight: 1.55,
                  color: "var(--ink-2)",
                  margin: "0 0 22px",
                  textWrap: "balance",
                }}>
                  {p.headline}
                </p>
                <div style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontWeight: 500, fontSize: 10,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--ink-4)",
                  marginBottom: 14,
                  paddingTop: 22,
                  borderTop: "1px solid var(--hairline)",
                }}>
                  Where ACE shows up
                </div>
                <ul style={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 9 }}>
                  {p.uses.map((u, j) => (
                    <li key={j} style={{
                      listStyle: "none",
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 10,
                      alignItems: "start",
                      fontFamily: "'Geist', sans-serif",
                      fontSize: 14, color: "var(--ink-2)",
                      lineHeight: 1.55,
                    }}>
                      <span style={{ color: "var(--coral)", fontWeight: 600, marginTop: 1 }}>·</span>
                      <span>{u}</span>
                    </li>
                  ))}
                </ul>
                <div style={{
                  marginTop: 20,
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 13, fontWeight: 600,
                  color: "var(--coral)",
                }}>
                  See {p.name} →
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// 10) SECURITY & DATA
// ============================================================

function AceSecurity() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}>
            <div>
              <Eyebrow>Security & data</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 32, maxWidth: 420 }}>
                The page your IT lead <em style={{ fontStyle: "italic", fontWeight: 700 }}>needs to see.</em>
              </Headline>
              <p style={{ marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 380 }}>
                Plain-English answers to the things every InfoSec questionnaire asks. We'll happily fill out yours.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {[
                { k: "Deployment", v: "On-premise. The production deployment is a self-contained app on your own hardware, inside your network. No cloud dependency, nothing phones home." },
                { k: "ERP access", v: "Read-only over ODBC. ACE reads SYSPRO; it never writes back. ERP write-back arrives with e.net certification, on the roadmap." },
                { k: "Access control", v: "Runs inside your own Windows environment, under your network controls, with database credentials you hold. Role-based approvals are on the roadmap." },
                { k: "Training data", v: "Your data is never used to train shared models. Period. Cross-tenant exposure is impossible by design — today there isn't even a shared server to pool it on." },
                { k: "Snapshots", v: "Every plan exports as a dated, self-contained snapshot you keep on your own storage — re-importable any time, no server dependency." },
                { k: "Traceability", v: "Deterministic maths: every figure reproducible from your history. POs carry their originating RFQ reference. Plans export for sign-off and re-import." },
              ].map((c, i) => (
                <div key={i} style={{ padding: "22px 24px", border: "1px solid var(--hairline)", borderRadius: 14, background: "var(--surface-white)" }}>
                  <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)" }}>
                    {c.k}
                  </div>
                  <div style={{ marginTop: 10, fontFamily: "'Geist', sans-serif", fontSize: 14, color: "var(--ink-1)", lineHeight: 1.55 }}>
                    {c.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// 11) ACE FAQ
// ============================================================

const ACE_FAQS = [
  {
    q: "Which AI models power ACE?",
    a: "Today, none — and that's deliberate. The shipped intelligence in production is deterministic: history-based forecasting and landed-cost mathematics, auditable arithmetic on your own data. Foundation models enter with the roadmap features — drafting, classification, the copilot — matched per task, and we hold the choice and swap when a better one ships. Your memory and context stay yours alone; that's the part that makes ACE work, not the model.",
  },
  {
    q: "What if you change the foundation model? Will my AI 'forget'?",
    a: "No. Your memory lives in your instance — today, your ERP data plus the self-contained plan snapshots you keep on your own hardware. When foundation models arrive with the roadmap features, they sit under ACE as interchangeable parts: we swap the model, your instance inherits the upgrade. The model is interchangeable. The memory isn't.",
  },
  {
    q: "How is ACE different from a chatbot?",
    a: "ACE works inside a product, not in a chat window. Today, inside VSG ICT, it's the forecasting and landed-cost engine behind every recommendation — with the evidence logged for each one. On the roadmap: reading supplier email and drafting house-voice replies for buyer approval, and posting approved orders into the ERP. A chatbot answers questions; ACE is built to carry workflows — with a human sign-off where it matters.",
  },
  {
    q: "Does ACE require us to replace anything?",
    a: "No. Today ACE reads from SYSPRO over ODBC — read-only, it never writes to your ERP. Write-back, via SYSPRO e.net, is on the roadmap and will only ever post what a person has approved. Your ERP, your master data, your existing sign-off habits — all stay where they are. The ERP stays the system of record; we make your buyers faster.",
  },
  {
    q: "Can we see what ACE has learned about us?",
    a: "Yes — because today nothing is hidden in a model. Every figure in the planning grid drills down to its inputs: the stock lots, the committed orders, the history behind a forecast, the duty-clearing-freight-FX lines behind a landed cost. Everything exports to files you keep. When learned memory ships with the drafting features, the same rule holds: browsable, exportable, yours.",
  },
  {
    q: "What happens if the model layer is down?",
    a: "Today, nothing — there is no model layer to go down. ACE runs entirely on your hardware with no cloud dependency; if your network has a bad day, the last imported data still works. When cloud model calls arrive with the roadmap features, the product degrades gracefully: the planning grid keeps working, AI drafts queue until the layer is back.",
  },
  {
    q: "How do we know ACE isn't making things up?",
    a: "Because today it can't. The forecasting and landed-cost engines are deterministic — the same history in produces the same numbers out, and every figure breaks down to the lots, orders and cost lines that produced it. Reproducible in front of your auditor. Roadmap AI outputs ship with the same discipline: inputs logged, replayable, always behind human review.",
  },
  {
    q: "What does ACE refuse to do?",
    a: "Today it refuses by architecture: it cannot write to your ERP, cannot send an email, cannot move money — it's a read-only engine that recommends. On the roadmap, every acting capability ships behind explicit human approval: no email without buyer sign-off, no ERP write without an approved plan, no autonomous buy outside hard guardrails you set. And permanently: never trains on your data for any other customer, never crosses the instance boundary, even at inference.",
  },
];

function AceFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <Section alt>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          <Reveal>
            <div style={{ position: "sticky", top: 120 }}>
              <Eyebrow>FAQ · ACE</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 32, maxWidth: 380 }}>
                The questions IT leads <em style={{ fontStyle: "italic", fontWeight: 700 }}>always ask.</em>
              </Headline>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              {ACE_FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                    style={{ width: "100%", background: "transparent", border: 0, padding: "24px 0", display: "grid", gridTemplateColumns: "44px 1fr 32px", gap: 20, alignItems: "center", textAlign: "left", cursor: "pointer", fontFamily: "'Geist', sans-serif" }}
                  >
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: 19, color: "var(--ink-1)", letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                      {f.q}
                    </span>
                    <span style={{
                      justifySelf: "end",
                      width: 30, height: 30,
                      borderRadius: "50%",
                      border: "1px solid var(--hairline)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'Geist', sans-serif",
                      fontWeight: 500, fontSize: 16,
                      transition: "transform 220ms cubic-bezier(.2,0,0,1), background 220ms",
                      transform: open === i ? "rotate(45deg)" : "rotate(0)",
                      background: open === i ? "var(--ink-1)" : "transparent",
                      color: open === i ? "var(--paper)" : "var(--ink-1)",
                    }}>
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

// ============================================================
// 12) CTA
// ============================================================

function AceCTA({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "144px 0", borderTop: "1px solid var(--hairline)", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)", width: 1300, height: 1300, background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 55%)", pointerEvents: "none" }} />
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <Eyebrow>See ACE in your context</Eyebrow>
            <h2 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0, letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance" }}>
              An AI that knows <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>your business.</em>
            </h2>
            <p style={{ marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
              Book a 30-minute walkthrough. We'll run the planning grid on demo data, show the landed-cost maths live — and where the AI roadmap takes it.
            </p>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book a demo</PrimaryButton>
              <OutlineButton as="a" href="how-it-works.html" size="lg">See the rollout</OutlineButton>
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

function AcePage({ onBookDemo }) {
  return (
    <React.Fragment>
      <AceHero onBookDemo={onBookDemo} />
      <AcePrinciples />
      <AceKnows />
      <AceDoes />
      <AceLearningCurve />
      <AceComparison />
      <AceArchitecture />
      <AceModelLayer />
      <AceInProducts />
      <AceSecurity />
      <AceFAQ />
      <AceCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="ace">
      <AcePage />
    </PageShell>
  );
});
