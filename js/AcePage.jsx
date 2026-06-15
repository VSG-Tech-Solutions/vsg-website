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
              ACE is the part of every VSG product that gets smarter. It learns your suppliers, your terminology, your exception patterns, your house voice, your edge cases. Each customer gets their own. Never shared, never trained across customers, never pooled. The moat that compounds.
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
              <span>Per-tenant memory</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(245,240,232,0.18)", alignSelf: "center" }} />
              <span>No cross-customer training</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(245,240,232,0.18)", alignSelf: "center" }} />
              <span>ZA-hosted</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(245,240,232,0.18)", alignSelf: "center" }} />
              <span>Model-agnostic</span>
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
    { tag: "Isolated", title: "Your context lives in your tenant. Nowhere else.", body: "Every customer gets a discrete ACE instance. Your supplier list, your decisions, your edge cases — none of it touches another customer's memory, not even at inference time." },
    { tag: "Portable", title: "Export the whole memory. No lock-in.", body: "If you ever leave, you take your ACE memory with you in a documented, readable format. The audit log too. We'd rather you stay because the product earns it." },
    { tag: "Auditable", title: "Every action, signed and replayable.", body: "Every classification, every draft, every ERP write is logged with the inputs that produced it. Your auditors can replay any decision, any day." },
    { tag: "Local-first", title: "ZA data residency. On-prem if you need it.", body: "Default deployment is in South African infrastructure. For regulated operations or air-gapped sites, ACE runs entirely on your hardware." },
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
      tag: "Your terminology",
      ex: "When your buyer says \"specials\" they mean 12mm bar in 304-grade ex-Vereeniging. When the floor says \"line down\" they mean Bottling 3 specifically. ACE learns the words your team actually uses.",
    },
    {
      tag: "Your suppliers, deeply",
      ex: "Falcon Steel's ETAs are reliable within 1 day. Atlantic Tubing slips 4 days. Pinnacle's quote-to-invoice accuracy is 87%. Westcape Bearings closes on the 25th of every month. None of this is guesswork.",
    },
    {
      tag: "Your decisions",
      ex: "You always confirm POs to Falcon with the Bay 3 instruction. You never split orders below 4t. Repeat-buys under R50k auto-route. Above R250k, ACE pings Sarah, not the CFO. The patterns your team built without writing them down.",
    },
    {
      tag: "Your reference codes",
      ex: "VSG-IN-44211 means delivery to your Epping warehouse. POs with a \"-X\" suffix are inter-branch transfers. Project codes map to customers. ACE references the right code on every outbound message.",
    },
    {
      tag: "Your house voice",
      ex: "Naledi signs off with \"Cheers\" — never \"Regards\". The team uses \"please confirm by\" not \"can you please confirm\". Replies to Pinnacle start with \"Hi Mandla\" because that's how the relationship runs. The drafts sound like your team, not a chatbot.",
    },
    {
      tag: "Your exception patterns",
      ex: "When a supplier asks for early payment, you check with David before responding. Lead-time slips of >5 days trigger a single-source review. Disputed invoices over 60 days route to legal. ACE handles the routine, escalates the exception.",
    },
    {
      tag: "Your edge cases",
      ex: "Holiday season: Pinnacle's lead time goes from 3 weeks to 5. Quarter-end: Falcon prioritises listed-customer orders. Loadshedding stage 4+: Westcape's deliveries shift by a day. The seasonal truths your last buyer just knew.",
    },
    {
      tag: "Your audit lineage",
      ex: "Every PO above R100k requires supporting evidence attached. Every supplier first-time order needs a banking-detail check. Every disputed invoice triggers a 14-day SLA. ACE enforces the audit trail you would otherwise have to chase.",
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
              ACE doesn't just store data. It remembers context — the patterns your last buyer carried in their head, the codes nobody documented, the seasonal truths. Real examples below from a live customer tenant.
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
      tag: "Reads",
      title: "Classifies and structures inbound.",
      body: "Every supplier email — PO confirmation, quote, ASN, statement, dispute — classified, deduplicated, ranked by lead-time risk. Attachments parsed. Quote tables extracted into structured data. The inbox becomes a queue, not a pile.",
    },
    {
      icon: "✎",
      tag: "Drafts",
      title: "Replies in your house voice.",
      body: "Your terminology, your reference codes, your courtesy patterns. Drafts pre-filled with the supplier's correct contact name, the right delivery instruction, the right PO reference. Your buyer reviews and approves — or one-tap edits.",
    },
    {
      icon: "▲",
      tag: "Decides",
      title: "Scores, routes, and prioritises.",
      body: "RFQ auctioneer scoring against your weights. Approval chain selection learned from history. Exception routing to the right person — not always the CFO. Single-source risk flags. Cash-impact prioritisation across pending orders.",
    },
    {
      icon: "→",
      tag: "Acts",
      title: "Writes to ERP, sends, pays.",
      body: "Confirmed POs posted to SysPro / SAP B1 / Sage Pastel. Approved replies sent. Payments triggered via PayShap / EFT / debit-order. Every write logged with the input that produced it. The buyer stays in control of what acts when.",
    },
    {
      icon: "◉",
      tag: "Explains",
      title: "EvidenceButton on every action.",
      body: "Why ACE chose this supplier for this order: scoring breakdown, last 6 POs reliability, lead-time variance, single-source risk. Why this PO routed to Sarah: amount band, supplier tier. Never a black-box answer. CFO-ready, defensible.",
    },
    {
      icon: "↻",
      tag: "Learns",
      title: "Every correction tightens the next round.",
      body: "When your buyer edits a draft, ACE absorbs the diff. When you override a scoring weight, ACE notes the new preference. When you escalate an exception, ACE remembers the new threshold. The system that compounds.",
    },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>What ACE does</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Six capabilities,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>running together.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              Not a chatbot. An agent. ACE reads, drafts, decides, acts, explains, and learns — six loops running in parallel, every minute of every working day, on your tenant only.
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
      t: "Day 1",
      label: "Provisioned",
      accept: "0%",
      detail: "Tenant is live. ACE has read 8 months of supplier email + your PO history. Zero corrections absorbed yet. Drafts go through shadow mode — visible to your team, not sent.",
    },
    {
      t: "Week 4",
      label: "First live drafts",
      accept: "76%",
      detail: "240+ corrections absorbed from your buyer's edits. ACE knows your top-50 suppliers by personality, lead-time variance, and quote-accuracy. First batch of ACE-drafted replies goes to real suppliers, buyer-approved.",
    },
    {
      t: "Month 3",
      label: "Trusted",
      accept: "89%",
      detail: "1,400+ exception patterns learned. Confidence thresholds tuned per supplier. Approval chain routing matches your CFO actual habits. The mobile PWA is the CFO preferred approval surface.",
    },
    {
      t: "Month 12",
      label: "Compounding",
      accept: "94%",
      detail: "5,800+ tuning events. ACE handles seasonal patterns (quarter-end, holiday, loadshedding). New supplier onboarding is one-click with banking + credit detail auto-checked. Your last buyer's quirks are now organisational memory.",
    },
    {
      t: "Month 24",
      label: "Institutional",
      accept: "97%",
      detail: "ACE knows your business better than any single person ever could. Edge cases that took years to learn are remembered. New buyers onboard in days, not months, because ACE briefs them. The moat is built.",
    },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>The compounding curve</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              ACE gets smarter{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>every week.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              Every edit by your buyer, every override, every escalation — absorbed. Acceptance rate is the most honest measure: the % of ACE-drafted replies that go out without an edit. Pulled from a live tenant.
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
                    background: "var(--surface-white)",
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
                      color: "var(--coral)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}>
                      {m.accept}
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
            <strong style={{ color: "var(--coral)", fontWeight: 600 }}>Acceptance rate</strong> = the % of ACE-drafted supplier replies sent without an edit. Pulled from a live customer tenant, anonymised.
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
      vsg: "Yours only. Your tenant, your patterns, your weights.",
    },
    {
      dim: "What ACE remembers about you",
      cross: "Whatever the community supplied. Your specifics don't compound.",
      vsg: "Eight memory categories tuned to your business — terminology, decisions, voice, codes, exceptions.",
    },
    {
      dim: "When you correct a draft",
      cross: "The correction goes into the global model. Maybe.",
      vsg: "Your correction immediately tightens your next inference.",
    },
    {
      dim: "Compliance posture",
      cross: "Your data lives somewhere — often the US, often pooled.",
      vsg: "Per-tenant isolation, ZA-hosted, on-prem-capable. Zero cross-tenant exposure.",
    },
    {
      dim: "Lock-in risk",
      cross: "Your context is fused into the vendor's model. Leaving means starting over.",
      vsg: "Export your full ACE memory in a documented format. Leave anytime.",
    },
    {
      dim: "Who picks the foundation model",
      cross: "The vendor. Locked to whatever they ship.",
      vsg: "We hold the choice and swap when a better model ships. Your data stays put.",
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
                  (Coupa community · Stampli pooled · most platforms)
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
              The model layer is shared and swappable. The memory — the part that actually does the thinking about your business — is yours alone. Diagrammed below the way we draw it for a security review.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ marginTop: 64, background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: "56px 48px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
              {[
                { n: "Customer A", c: "var(--ink-1)", note: "FMCG · SysPro" },
                { n: "Customer B", c: "var(--coral)", note: "Packaging · Sage X3" },
                { n: "Customer C", c: "var(--ink-1)", note: "Distribution · SAP B1" },
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
                    {["Suppliers", "Terminology", "Decisions", "Audit log"].map((l, j) => (
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
                <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", opacity: 0.7 }}>VSG-owned</span>
              </div>
              <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
                {["Foundation model", "Embeddings", "Tool router", "Guardrails"].map((c, i) => (
                  <div key={i} style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.04)", fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--paper)" }}>
                    {c}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "rgba(245,240,232,0.75)", lineHeight: 1.6 }}>
                Inference happens here, against your memory only. Your data never enters another customer's request, prompt, or training run.
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
    { task: "Drafting supplier replies", model: "Frontier reasoning model", why: "Highest quality at house-voice nuance + Afrikaans/isiZulu handling." },
    { task: "Email classification + routing", model: "Fast classification model", why: "Quick, low-cost, accurate enough for triage at inbox scale." },
    { task: "Quote extraction (OCR + structure)", model: "Vision model", why: "Best-in-class for scanned PDFs and noisy quote layouts." },
    { task: "Supplier-pick reasoning + evidence", model: "Frontier reasoning model", why: "Explainable reasoning, with the evidence attached to every call." },
    { task: "Embeddings (your memory)", model: "Self-hosted, in your tenant", why: "Your supplier vectors never leave your tenant." },
    { task: "Guardrails + safety", model: "VSG-built rules engine", why: "Your validation rules, your hard limits. Not the model's defaults." },
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
                Different jobs want different models. We use the best available foundation model for each task — and swap when something better ships. Your memory (the part that matters) stays put.
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
      name: "VSG Source",
      status: "Live",
      statusBg: "rgba(14,122,90,0.12)",
      statusColor: "var(--success)",
      headline: "ACE drafts supplier replies, classifies the inbox, and scores the planning grid against your rules.",
      uses: [
        "Inbox triage: ACE classifies 100% of inbound supplier email",
        "House-voice drafts on every PO confirmation, quote acceptance, dispute reply",
        "EvidenceButton on every AI recommendation — your weights, your evidence",
        "Planning grid alerts when ACE forecasts stock-out vs. supplier lead-time",
      ],
      href: "source.html",
    },
    {
      name: "VSG Pace",
      status: "Q3 2026",
      statusBg: "var(--coral-soft)",
      statusColor: "var(--coral)",
      headline: "ACE will explain every schedule decision in plain language — the explanation layer for OR-driven production scheduling.",
      uses: [
        "\"Why is this job on Mill 2 on Tuesday?\" — answered in operator language",
        "Loadshedding-aware re-scheduling explanations",
        "Setup-time optimisation rationale per sequence change",
        "Due-date risk warnings with the constraint that caused them",
      ],
      href: "pace.html",
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
                { k: "Data residency", v: "South African region by default. On-prem available for regulated or air-gapped operations." },
                { k: "Encryption", v: "AES-256 at rest. TLS 1.3 in transit. Per-tenant encryption keys, customer-rotatable." },
                { k: "Access control", v: "SSO via your identity provider (Microsoft, Okta, Google). Per-action role-based access. Automated user provisioning." },
                { k: "Training data", v: "Your data is never used to train shared models. Period. Cross-tenant inference is impossible by design." },
                { k: "Backups", v: "Daily encrypted snapshots. 30-day retention by default. Customer-extendable to 7 years." },
                { k: "Audit & evidence", v: "Immutable audit log, exportable. Per-event evidence retrieval. Replay any decision, any day." },
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
    a: "Best-in-class foundation models, matched to each task — a frontier reasoning model for drafting and decisions, a fast model for classification, a vision model for reading scanned quotes. We hold the model choice and swap when a better one ships. Your memory and context are yours alone — that's the part that makes ACE work, not the model.",
  },
  {
    q: "What if you change the foundation model? Will my AI 'forget'?",
    a: "No. Your memory (suppliers, terminology, decisions, audit lineage) lives in your tenant — in vector embeddings, structured tables, and replayable event logs. We can swap the foundation model under ACE and your tenant inherits the upgrade. The model is interchangeable. The memory isn't.",
  },
  {
    q: "How is ACE different from a chatbot?",
    a: "ACE acts. It doesn't just talk. It reads inbound supplier email, drafts replies in your house voice, scores RFQs against your weights, posts confirmed POs to your ERP, triggers payments via PayShap. Every action is logged with the inputs that produced it. A chatbot answers questions. ACE handles workflows.",
  },
  {
    q: "Does ACE require us to replace anything?",
    a: "No. ACE reads from your ERP (SysPro, SAP B1, Sage Pastel, etc.) and writes back to it. Your ERP, your master data, your existing approvals — all stay where they are. ACE adds the AI layer that wraps around them.",
  },
  {
    q: "Can we see what ACE has learned about us?",
    a: "Yes. Every memory category is browsable, searchable, and exportable. You can see exactly which supplier ACE has flagged as unreliable, which terminology it's absorbed, which approval pattern it's learned. If you ever leave, you export the lot in a documented format.",
  },
  {
    q: "What happens if the model layer is down?",
    a: "Graceful degradation. The product stays up in read-only mode: your buyer can still see the inbox, the planning grid, the audit log. New ACE drafts queue until the model layer is back. We've never had an outage longer than 14 minutes — and we publish the status page.",
  },
  {
    q: "How do we know ACE isn't making things up?",
    a: "EvidenceButton on every action. Every classification, every draft, every score ships with the inputs that produced it — the supplier history, the email thread, the scoring weights, the alternatives considered. Replayable. Signed. Defensible to your auditor.",
  },
  {
    q: "What does ACE refuse to do?",
    a: "Hard limits: never auto-approves payments above your CFO band. Never sends without buyer review during the first 30 days. Never trains on your data for any model used by another customer. Never crosses the tenant boundary, even at inference. Never makes claims it can't back with evidence from your tenant.",
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
              Book a 30-minute walkthrough. We'll show you how ACE looks the day you provision your tenant — and a year in.
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
