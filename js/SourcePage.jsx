/* global React, ReactDOM */

/* VSG Source — full product page.
   Layout follows the proven Procurify-style SaaS pattern:
   text hero → social proof → AI feature spotlight w/ animated cursor →
   3-pillar benefits → tabbed product showcase → 4-card tools grid →
   ROI stats → testimonial → CTA → FAQ.
   All copy is VSG's. */

// ============================================================
// 1) Animated cursor demo — virtual mouse moves through the inbox
// ============================================================

/* Choreographed timeline (15s loop):
   t=0.0–2.0s   : cursor enters from top-right, hovers Pinnacle Plastics row
   t=2.0–2.4s   : click (scale-down pulse)
   t=2.4–4.0s   : draft area opens
   t=4.0–10.0s  : draft types out (typewriter)
   t=10.0–12.0s : cursor glides to Send button
   t=12.0–12.4s : click Send (scale-down + flash)
   t=12.4–15.0s : success state, fade
   t=15.0       : loop
*/

const DRAFT_TEXT =
  "Hi Mandla, thanks. Confirming PO-22014 on the 12mm bar — please ship to Bay 3, Epping. Reference VSG-IN-44211. Cheers, Naledi.";

function AnimatedCursorMockup() {
  const [phase, setPhase] = React.useState("idle"); // idle | hovering | typing | sending | sent
  const [typed, setTyped] = React.useState(0);
  const [sentFlash, setSentFlash] = React.useState(false);

  // Master clock — drives the demo
  React.useEffect(() => {
    let cancelled = false;
    let typeInterval;

    const runCycle = async () => {
      if (cancelled) return;
      // Reset
      setPhase("idle"); setTyped(0); setSentFlash(false);
      await wait(1500);
      if (cancelled) return;
      // Hover email
      setPhase("hovering");
      await wait(2200);
      if (cancelled) return;
      // Start typing
      setPhase("typing");
      let i = 0;
      typeInterval = setInterval(() => {
        i++;
        setTyped(i);
        if (i >= DRAFT_TEXT.length) clearInterval(typeInterval);
      }, 32);
      await wait(DRAFT_TEXT.length * 32 + 800);
      if (cancelled) return;
      // Move to send
      setPhase("sending");
      await wait(1800);
      if (cancelled) return;
      // Flash sent
      setSentFlash(true);
      setPhase("sent");
      await wait(2200);
      if (cancelled) return;
      // Loop
      runCycle();
    };
    runCycle();
    return () => { cancelled = true; if (typeInterval) clearInterval(typeInterval); };
  }, []);

  // Cursor position based on phase
  const cursorStyle = (() => {
    const base = { transition: "transform 900ms cubic-bezier(.6,.05,.3,1), opacity 320ms" };
    switch (phase) {
      case "idle":     return { ...base, transform: "translate(360px, -20px) scale(1)", opacity: 0 };
      case "hovering": return { ...base, transform: "translate(228px, 168px) scale(1)", opacity: 1 };
      case "typing":   return { ...base, transform: "translate(420px, 320px) scale(1)", opacity: 1 };
      case "sending":  return { ...base, transform: "translate(478px, 462px) scale(1)", opacity: 1 };
      case "sent":     return { ...base, transform: "translate(478px, 462px) scale(0.85)", opacity: 1 };
      default:         return base;
    }
  })();

  const emailActive = phase !== "idle";

  return (
    <div
      style={{
        position: "relative",
        background: "var(--surface-white)",
        border: "1px solid var(--hairline)",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow:
          "0 32px 80px -32px rgba(26,22,18,0.22), 0 1px 0 rgba(255,255,255,0.6) inset",
        height: 540,
      }}
    >
      {/* Top tab bar (browser chrome stub) */}
      <div style={{
        height: 36,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "0 14px",
        borderBottom: "1px solid var(--hairline)",
        background: "var(--paper-2)",
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E25C5C", opacity: 0.55 }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#E8A23A", opacity: 0.55 }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#5BB97A", opacity: 0.55 }} />
        <span style={{
          marginLeft: 14,
          fontFamily: "'Geist Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--ink-4)",
        }}>
          source.vsg.tech — supplier inbox
        </span>
      </div>

      {/* Layout: sidebar | email list | detail */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "150px 1fr 1.05fr",
        height: "calc(100% - 36px)",
      }}>
        {/* Sidebar */}
        <div style={{
          borderRight: "1px solid var(--hairline)",
          padding: "16px 14px",
          background: "var(--paper-2)",
        }}>
          <div className="mono-caps" style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-4)",
            marginBottom: 14,
          }}>
            Inbox
          </div>
          {[
            ["Suppliers", "24", true],
            ["Quotes", "8"],
            ["POs", "12"],
            ["Disputes", "2"],
          ].map(([l, n, active], i) => (
            <div key={i} style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "6px 0",
              fontFamily: "'Geist', sans-serif",
              fontSize: 12,
              fontWeight: active ? 600 : 400,
              color: active ? "var(--ink-1)" : "var(--ink-3)",
            }}>
              <span>{l}</span>
              <span style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 10,
                color: active ? "var(--coral)" : "var(--ink-4)",
              }}>
                {n}
              </span>
            </div>
          ))}
          <div style={{ height: 1, background: "var(--hairline)", margin: "16px 0" }} />
          <div style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--ink-4)",
            marginBottom: 10,
          }}>
            ACE context
          </div>
          {["140 suppliers", "Pastel + Sage", "ZAR, USD, EUR"].map((t, i) => (
            <div key={i} style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: 11.5,
              color: "var(--ink-3)",
              lineHeight: 1.6,
            }}>
              {t}
            </div>
          ))}
        </div>

        {/* Email list */}
        <div style={{ borderRight: "1px solid var(--hairline)", overflow: "hidden" }}>
          <div style={{ padding: "14px 16px 10px", borderBottom: "1px solid var(--hairline)" }}>
            <div style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: "var(--ink-1)",
            }}>Supplier email · 41</div>
            <div style={{
              marginTop: 4,
              fontFamily: "'Geist Mono', monospace",
              fontSize: 9.5,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--coral)",
            }}>
              12 drafted by ACE
            </div>
          </div>
          {[
            { f: "Falcon Steel", s: "PO-22014 dispatch confirmation", t: "08:42", draft: true },
            { f: "Pinnacle Plastics", s: "Quote: HDPE 35t — Aug", t: "07:18", draft: true, isActive: true },
            { f: "Westcape Bearings", s: "Lead time update — SKF 6205", t: "Yesterday" },
            { f: "Atlantic Fasteners", s: "Re: outstanding statement", t: "Yesterday", draft: true },
          ].map((m, i) => {
            const isHighlighted = m.isActive && emailActive;
            return (
              <div key={i} style={{
                padding: "11px 16px",
                borderBottom: "1px solid var(--hairline)",
                borderLeft: isHighlighted ? "2px solid var(--coral)" : "2px solid transparent",
                background: isHighlighted ? "var(--coral-soft)" : "transparent",
                transition: "background 220ms, border-color 220ms",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: isHighlighted ? 700 : 600,
                    fontSize: 12,
                    color: "var(--ink-1)",
                  }}>{m.f}</span>
                  <span style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 9,
                    color: "var(--ink-4)",
                    letterSpacing: "0.1em",
                  }}>{m.t}</span>
                </div>
                <div style={{
                  marginTop: 4,
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 11,
                  color: "var(--ink-3)",
                  lineHeight: 1.35,
                }}>{m.s}</div>
                {m.draft && (
                  <div style={{
                    marginTop: 4,
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 8.5,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--coral)",
                  }}>
                    ● Draft ready
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Detail + draft */}
        <div style={{ padding: "16px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
            <div style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 700,
              fontSize: 15,
              color: "var(--ink-1)",
              lineHeight: 1.2,
            }}>
              Pinnacle<br />Plastics
            </div>
            <span style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 10,
              color: "var(--ink-4)",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>
              07:18
            </span>
          </div>
          <div style={{
            fontFamily: "'Geist', sans-serif",
            fontSize: 11.5,
            color: "var(--ink-2)",
            lineHeight: 1.55,
            marginBottom: 14,
          }}>
            <strong style={{ color: "var(--ink-1)" }}>Quote: HDPE 35t — Aug</strong>
            <br />
            Pricing valid 14 days. Lead time 3 weeks ex-works. Need confirmation by Friday.
          </div>

          {/* Draft callout */}
          <div style={{
            background: "var(--coral-soft)",
            border: "1px solid rgba(201,99,58,0.28)",
            borderRadius: 10,
            padding: "12px 12px 10px",
            marginBottom: 12,
            minHeight: 130,
          }}>
            <div style={{
              fontFamily: "'Geist Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--coral)",
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}>
              <span>ACE · Confidence</span>
              <span>Draft 92%</span>
            </div>
            <div style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: 11.5,
              color: "var(--ink-2)",
              lineHeight: 1.55,
              minHeight: 80,
            }}>
              {DRAFT_TEXT.slice(0, typed)}
              {(phase === "typing" || phase === "sending" || phase === "sent") && (
                <span aria-hidden="true" style={{
                  display: "inline-block",
                  width: 1.5,
                  height: 12,
                  background: "var(--coral)",
                  marginLeft: 2,
                  verticalAlign: "text-bottom",
                  animation: "vsg-caret-blink 1s steps(1) infinite",
                  opacity: phase === "typing" ? 1 : 0,
                }} />
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
            <button type="button" style={{
              background: sentFlash ? "var(--success)" : "var(--ink-1)",
              color: "var(--paper)",
              border: "none",
              borderRadius: 999,
              padding: "8px 18px",
              fontFamily: "'Geist', sans-serif",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 320ms",
              outline: phase === "sending" ? "2px solid var(--coral)" : "none",
              outlineOffset: "2px",
            }}>
              {sentFlash ? "Sent ✓" : "Send"}
            </button>
            <button type="button" style={{
              background: "transparent",
              color: "var(--ink-1)",
              border: "1px solid var(--hairline)",
              borderRadius: 999,
              padding: "8px 18px",
              fontFamily: "'Geist', sans-serif",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer",
            }}>
              Edit
            </button>
            <button type="button" style={{
              background: "transparent",
              color: "var(--ink-3)",
              border: "1px solid var(--hairline)",
              borderRadius: 999,
              padding: "8px 14px",
              fontFamily: "'Geist', sans-serif",
              fontSize: 11.5,
              fontWeight: 600,
              cursor: "pointer",
              opacity: 0.75,
            }}>
              Decline
            </button>
          </div>
        </div>
      </div>

      {/* Cursor overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 20,
        height: 24,
        pointerEvents: "none",
        zIndex: 20,
        ...cursorStyle,
      }}>
        <svg viewBox="0 0 16 20" width="18" height="22" style={{
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
        }}>
          <path d="M1 1 L1 15 L5 11 L8 18 L10 17 L7 10 L13 10 Z"
                fill="var(--ink-1)" stroke="var(--paper)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ============================================================
// 2) HERO — text-centered, no mockup
// ============================================================

function SourceHero({ onBookDemo }) {
  // Hardcoded dark palette so the hero stays dark across any theme switch
  const HERO_BG = "#13100C";   // darker than before so the sunrise pops
  const HERO_INK = "#F5F0E8";
  const HERO_INK_2 = "rgba(245,240,232,0.78)";
  const HERO_INK_3 = "rgba(245,240,232,0.50)";
  const HERO_INK_4 = "rgba(245,240,232,0.35)";
  const HERO_HAIRLINE = "rgba(245,240,232,0.12)";

  return (
    <section style={{
      position: "relative",
      background: HERO_BG,
      paddingTop: 72,
      paddingBottom: 0, // mockup will sit at the bottom of this section
      overflow: "hidden",
    }}>
      {/* Sunrise — coral horizon rising from the bottom edge.
          Wide ellipse anchored to bottom-centre so the coral spills around
          the floating mockup like a silhouette against dawn. */}
      <div aria-hidden="true" style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 110% 55% at 50% 100%, rgba(201,99,58,0.28), rgba(201,99,58,0) 70%)",
        pointerEvents: "none",
      }} />

      <Container style={{ position: "relative", zIndex: 1 }}>
        {/* Breadcrumb */}
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
            <span style={{ color: HERO_INK }}>VSG Source</span>
          </div>
        </Reveal>

        {/* Centered text */}
        <div style={{ textAlign: "center", maxWidth: 980, margin: "0 auto" }}>
          <Reveal>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 26,
              flexWrap: "wrap",
            }}>
              <span style={{
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500,
                fontSize: 11,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "var(--coral)",
              }}>
                AI Procurement Platform
              </span>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 11px",
                borderRadius: 999,
                background: "rgba(14,122,90,0.18)",
                border: "1px solid rgba(14,122,90,0.45)",
                color: "#5BDFA8",
                fontFamily: "'Geist Mono', monospace",
                fontWeight: 500,
                fontSize: 10,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5BDFA8" }} />
                Live
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 700,
              fontSize: 96,
              lineHeight: 1.0,
              letterSpacing: "-0.045em",
              color: HERO_INK,
              margin: 0,
              textWrap: "balance",
            }}>
              AI procurement that thinks{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>
                four months ahead.
              </em>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p style={{
              marginTop: 32,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
              fontFamily: "'Geist', sans-serif",
              fontSize: 20,
              lineHeight: 1.55,
              color: HERO_INK_2,
            }}>
              A standalone AI procurement platform for South African manufacturers and distributors. Forward planning, house-voice supplier replies, multi-level approvals, exception handling, and a supplier portal — all powered by VSG ACE, the AI that learns YOUR specific suppliers, terminology, and rules.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div style={{
              marginTop: 40,
              display: "flex",
              gap: 16,
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
            }}>
              {/* Inverted primary (coral) — pops on dark */}
              <button
                onClick={onBookDemo}
                style={{
                  background: "var(--coral)",
                  color: HERO_INK,
                  border: "none",
                  borderRadius: 999,
                  height: 56,
                  padding: "0 32px",
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  letterSpacing: "-0.01em",
                  transition: "transform 200ms, box-shadow 200ms",
                  boxShadow: "0 12px 32px -12px rgba(201,99,58,0.55)",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 16px 36px -12px rgba(201,99,58,0.65)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 12px 32px -12px rgba(201,99,58,0.55)"; }}
              >
                Book a Source demo
              </button>
              {/* Outlined secondary on dark */}
              <a
                href="#tour"
                style={{
                  background: "transparent",
                  color: HERO_INK,
                  border: `1px solid ${HERO_INK_3}`,
                  borderRadius: 999,
                  height: 56,
                  padding: "0 32px",
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: "none",
                  letterSpacing: "-0.01em",
                  transition: "background 200ms, border-color 200ms",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,240,232,0.06)"; e.currentTarget.style.borderColor = HERO_INK_2; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = HERO_INK_3; }}
              >
                Take a tour
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div style={{
              marginTop: 28,
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: HERO_INK_4,
              display: "flex",
              gap: 18,
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
              <span>Live in 5 weeks</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: HERO_HAIRLINE, alignSelf: "center" }} />
              <span>SysPro · SAP B1 · Pastel — native</span>
              <span style={{ width: 3, height: 3, borderRadius: "50%", background: HERO_HAIRLINE, alignSelf: "center" }} />
              <span>Buyer keeps full review control</span>
            </div>
          </Reveal>
        </div>

        {/* Animated cursor mockup — sits at the bottom of the hero, overlapping the next section */}
        <Reveal delay={400}>
          <div id="tour" style={{
            marginTop: 80,
            position: "relative",
            zIndex: 2,
            marginBottom: -140, // overlap into the next section
            maxWidth: 1100,
            marginLeft: "auto",
            marginRight: "auto",
          }}>
            <AnimatedCursorMockup />
          </div>
        </Reveal>
      </Container>

      {/* Bottom spacer so the overlap has somewhere to land */}
      <div style={{ height: 80 }} />
    </section>
  );
}

// ============================================================
// 3) SOCIAL PROOF STRIP
// ============================================================

function SocialProofStrip() {
  const erps = ["SysPro", "Sage X3", "SAP B1", "Sage Pastel", "Acumatica", "Odoo"];
  return (
    <section style={{
      background: "var(--paper-2)",
      borderBottom: "1px solid var(--hairline)",
      // Top padding accommodates the hero mockup's negative margin-bottom (~140px overlap)
      padding: "200px 0 44px",
    }}>
      <Container>
        <Reveal>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 48,
            flexWrap: "wrap",
          }}>
            <div style={{
              fontFamily: "'Geist Mono', monospace",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ink-3)",
              maxWidth: 260,
              lineHeight: 1.6,
            }}>
              In production with{" "}
              <span style={{ color: "var(--ink-1)", fontWeight: 700 }}>6 SA manufacturers</span>
              {" "}— connects natively to the ERPs they already run:
            </div>
            <div style={{
              display: "flex",
              gap: 32,
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}>
              {erps.map((e, i) => (
                <span key={i} style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: "var(--ink-2)",
                  letterSpacing: "-0.01em",
                  opacity: 0.85,
                }}>
                  {e}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ============================================================
// 4) AI FEATURE SPOTLIGHT — text left, animated cursor mockup right
// ============================================================

function AIFeatureSpotlight() {
  return (
    <Section id="tour">
      <Container wide>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: 80,
          alignItems: "center",
        }}>
          <Reveal>
            <div>
              <Eyebrow>VSG ACE · The AI inside Source</Eyebrow>
              <Headline as="h2" size={56} style={{ marginTop: 28, maxWidth: 460 }}>
                Watch ACE handle the inbox.{" "}
                <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>Drafted, reviewed, sent.</em>
              </Headline>
              <p style={{
                marginTop: 28,
                maxWidth: 480,
                fontFamily: "'Geist', sans-serif",
                fontSize: 17,
                lineHeight: 1.65,
                color: "var(--ink-2)",
              }}>
                Every supplier email lands in your VSG Source inbox. ACE reads it, classifies it, drafts the response in your house voice, and queues it for your buyer to approve. The buyer reviews. ACE sends. The audit trail writes itself.
              </p>
              <ul style={{ marginTop: 28, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Inbox triage — POs, quotes, ASNs, statements, disputes sorted by actual lead-time risk",
                  "House-voice drafting — references, codes, courtesy your team actually uses",
                  "Confidence + EvidenceButton on every draft — never a black-box answer",
                  "One-tap send, one-tap edit, one-tap decline — the buyer stays in control",
                ].map((b, j) => (
                  <li key={j} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "start", listStyle: "none" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)", marginTop: 9 }} />
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <AnimatedCursorMockup />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// 5) THREE-PILLAR BENEFITS (existing, refreshed)
// ============================================================

function SourceBenefits() {
  const benefits = [
    {
      tag: "Plan",
      title: "4-month forward stock visibility.",
      body: "Per-SKU, per-supplier, per-customer. Forward planning grid with buy-up cash alerts, local-vs-import split, customer-share drilldown, and per-class stock-month targets your team can edit live.",
    },
    {
      tag: "Draft",
      title: "House-voice supplier replies.",
      body: "Every inbound supplier email classified and queued. ACE drafts the reply in your terminology, with your reference codes and the courtesy your team uses with each supplier. Buyer reviews. One tap to send.",
    },
    {
      tag: "Execute",
      title: "Approvals + exceptions + supplier portal.",
      body: "Multi-level approvals learned from your actual history. Exception handling flags variances with evidence. Suppliers see their own POs and disputes through a self-service portal.",
    },
  ];
  return (
    <Section id="benefits" alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>How it works</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Three things — done <em style={{ fontStyle: "italic", fontWeight: 700 }}>well.</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 560, fontFamily: "'Geist', sans-serif", fontSize: 18, lineHeight: 1.65, color: "var(--ink-2)" }}>
              VSG Source is a complete procurement product with its own workflows — from forward planning to RFQ to approval. Powered by VSG ACE, the per-customer AI that learns YOUR business.
            </p>
          </div>
        </Reveal>

        <div style={{ marginTop: 64, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 80}>
              <div
                style={{
                  background: "var(--surface-white)",
                  border: "1px solid var(--hairline)",
                  borderRadius: 20,
                  padding: 32,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                  transition: "border-color 220ms cubic-bezier(.2,0,0,1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--divider-strong)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Eyebrow>{`0${i + 1} — ${b.tag}`}</Eyebrow>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                    Step
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 24, lineHeight: 1.2, letterSpacing: "-0.02em", color: "var(--ink-1)", margin: 0, textWrap: "balance" }}>
                  {b.title}
                </h3>
                <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, lineHeight: 1.6, color: "var(--ink-3)", margin: 0 }}>
                  {b.body}
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
// 6) TABBED PRODUCT SHOWCASE — Planning / Sourcing / Execution
// ============================================================

// Visualizations
function VizPlanning() {
  const rows = [
    { sku: "SS304-12",  cls: "SC304",  oh: "8.4t", m: [{ v: "2.1", s: "ok"   }, { v: "1.4", s: "ok"   }, { v: "0.6", s: "warn" }, { v: "0.0", s: "out"  }] },
    { sku: "SS304L-25", cls: "SP304L", oh: "11.2t", m: [{ v: "2.6", s: "ok"   }, { v: "2.1", s: "ok"   }, { v: "1.8", s: "ok"   }, { v: "1.2", s: "warn" }] },
    { sku: "SS316-08",  cls: "SC316",  oh: "3.1t",  m: [{ v: "1.0", s: "warn" }, { v: "0.4", s: "out"  }, { v: "0.0", s: "out"  }, { v: "0.0", s: "out"  }] },
    { sku: "SS316L-10", cls: "SP316L", oh: "6.8t",  m: [{ v: "1.8", s: "ok"   }, { v: "1.5", s: "ok"   }, { v: "1.2", s: "warn" }, { v: "0.9", s: "warn" }] },
  ];
  const months = ["Aug", "Sep", "Oct", "Nov"];
  const color = (s) => s === "ok" ? "var(--success)" : s === "warn" ? "#E8A23A" : "var(--coral)";
  const bg = (s) => s === "ok" ? "var(--success-soft)" : s === "warn" ? "rgba(232,162,58,0.16)" : "var(--coral-soft)";
  return (
    <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 24, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.16)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
          Planning grid · 4-month forward
        </div>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)" }}>
          Peak Oct-26
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.7fr 0.6fr repeat(4, 1fr)", gap: 8, alignItems: "center", fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-4)" }}>
        <span>SKU</span>
        <span>Class</span>
        <span>On-hand</span>
        {months.map((m) => <span key={m}>{m}</span>)}
      </div>
      <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1.2fr 0.7fr 0.6fr repeat(4, 1fr)", gap: 8, alignItems: "center", padding: "10px 0", borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--hairline)" }}>
            <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 13, color: "var(--ink-1)" }}>{r.sku}</span>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.1em" }}>{r.cls}</span>
            <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-2)" }}>{r.oh}</span>
            {r.m.map((cell, j) => (
              <div key={j} style={{ height: 26, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, background: bg(cell.s), color: color(cell.s), fontFamily: "'Geist Mono', monospace", fontWeight: 600, fontSize: 11 }}>
                {cell.v}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 14, padding: "10px 12px", background: "var(--coral-soft)", border: "1px solid var(--hairline)", borderRadius: 10, fontFamily: "'Geist', sans-serif", fontSize: 12.5, color: "var(--ink-1)" }}>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--coral)", marginRight: 8 }}>
          ✦ ACE
        </span>
        SS316-08 trends to zero by Oct — Stalcor on 14-week lead. Split the buy or commit 12t this week.
      </div>
    </div>
  );
}

function VizExecute() {
  return (
    <div style={{ background: "var(--surface-white)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 28, boxShadow: "0 24px 60px -28px rgba(26,22,18,0.16)" }}>
      <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", marginBottom: 18 }}>
        EvidenceButton · audit trail
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0, position: "relative" }}>
        <div aria-hidden="true" style={{ position: "absolute", left: 13, top: 16, bottom: 16, width: 1.5, background: "var(--hairline)" }} />
        {[
          { t: "08:42", l: "ACE proposed reorder", v: "12t SS316-08 · confidence 91%", c: "var(--coral)" },
          { t: "08:43", l: "Naledi reviewed evidence", v: "8-month history + Stalcor lead", c: "var(--ink-1)" },
          { t: "08:43", l: "Approval routed",        v: "R 142,200 · CFO band",         c: "var(--ink-1)" },
          { t: "09:11", l: "CFO approved",            v: "1-tap via mobile · evidence reviewed", c: "var(--success)" },
          { t: "09:12", l: "Posted to SysPro",        v: "PO-22014 · CONFIRMED · audit signed", c: "var(--success)" },
        ].map((e, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "28px 1fr auto", gap: 16, alignItems: "center", padding: "10px 0", position: "relative" }}>
            <span style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--paper)", border: `2px solid ${e.c}`, justifySelf: "center", zIndex: 1 }} />
            <div>
              <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 14, color: "var(--ink-1)" }}>{e.l}</div>
              <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{e.v}</div>
            </div>
            <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink-4)" }}>
              {e.t}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

const TABS = [
  {
    id: "planning",
    eyebrow: "Feature · Planning",
    label: "Planning",
    title: "Forward visibility, before the month starts.",
    body: "The 4-month planning grid is the hero of VSG Source. Per SKU, per supplier, per class — current on-hand, committed POs, planned orders, and projected closing stock for the next four months. Excel-faithful math, NETWORKDAYS prorate, Dec/Jan half-trade convention. Built from the spreadsheet your buyer already uses.",
    bullets: [
      "Per-class months-stock targets (editable inline)",
      "Buy-up cash factor — surfaces the worst month",
      "Local vs import split for diversification decisions",
      "8-month sales history with sparkline + seasonality",
    ],
    viz: <VizPlanning />,
  },
  {
    id: "execute",
    eyebrow: "Feature · Execute",
    label: "Execution",
    title: "Approvals, exceptions, audit trail.",
    body: "Multi-level approval chains learned from your actual history — not a template. Mobile PWA for CFO approve-on-the-go. Exception handling flags variances with the evidence behind every flag. Every AI decision is replayable and signed. CFO-ready, defensible, never a black-box answer.",
    bullets: [
      "Approval rules learned from YOUR history",
      "Mobile PWA: swipe to approve with evidence",
      "Auto-exception handling with EvidenceButton",
      "Full audit trail · signed and replayable",
    ],
    viz: <VizExecute />,
  },
];

function TabbedShowcase() {
  const [active, setActive] = React.useState(0);
  const tab = TABS[active];
  return (
    <Section id="features">
      <Container wide>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>What it actually does</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Less spreadsheet. <em style={{ fontStyle: "italic", fontWeight: 700 }}>More buying.</em>
            </Headline>
          </div>
        </Reveal>

        {/* Tab nav */}
        <Reveal delay={80}>
          <div style={{
            marginTop: 48,
            display: "flex",
            gap: 0,
            borderBottom: "1px solid var(--hairline)",
          }}>
            {TABS.map((t, i) => {
              const isActive = i === active;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActive(i)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "16px 28px",
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 16,
                    color: isActive ? "var(--ink-1)" : "var(--ink-4)",
                    cursor: "pointer",
                    borderBottom: isActive ? "2px solid var(--coral)" : "2px solid transparent",
                    marginBottom: -1,
                    transition: "color 200ms, border-color 200ms",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <span style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--coral)" : "var(--ink-4)",
                    marginRight: 10,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {t.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Tab content */}
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: 80,
          alignItems: "center",
        }}>
          <Reveal key={`copy-${active}`}>
            <div>
              <Eyebrow>{tab.eyebrow}</Eyebrow>
              <Headline as="h3" size={42} style={{ marginTop: 22, maxWidth: 460 }}>
                {tab.title}
              </Headline>
              <p style={{ marginTop: 22, maxWidth: 480, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
                {tab.body}
              </p>
              <ul style={{ marginTop: 28, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {tab.bullets.map((b, j) => (
                  <li key={j} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 12, alignItems: "start", listStyle: "none" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)", marginTop: 9 }} />
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55 }}>
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal key={`viz-${active}`} delay={80}>
            {tab.viz}
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// 7) TOOLS GRID — 4-card 2x2
// ============================================================

function ToolsGrid() {
  const tools = [
    {
      eyebrow: "ERP Connectors",
      title: "Native to the four ERPs SA mid-market runs.",
      body: "SysPro, Sage X3, SAP Business One, and Sage Pastel — first-class round-trip connectors for sales orders, POs, and GRNs. Acumatica + Odoo too.",
      tags: ["SysPro", "Sage X3", "SAP B1", "Pastel"],
    },
    {
      eyebrow: "Mobile PWA",
      title: "CFO approves from a phone.",
      body: "Mobile-first approval interface. Each pending order is a card with the SKU, qty, cash impact, AI risk badge, and EvidenceButton. Swipe to approve, tap for evidence.",
      tags: ["iOS · Android", "Offline-capable", "Audit-signed"],
    },
    {
      eyebrow: "VSG ACE",
      title: "Per-customer AI memory.",
      body: "ACE learns YOUR suppliers, YOUR terminology, YOUR exception patterns. Never shared, never trained across customers. Isolated, portable, auditable.",
      tags: ["Per-tenant", "ZA-hosted", "No cross-training"],
    },
    {
      eyebrow: "Audit Trail",
      title: "Every decision, signed and replayable.",
      body: "Every AI proposal, every approval, every ERP write — logged with the inputs that produced it. Immutable retention, every decision replayable.",
      tags: ["Auditable", "Immutable", "Replayable", "Signed"],
    },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>What's in the box</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Powerful tools, <em style={{ fontStyle: "italic", fontWeight: 700 }}>actually shipped.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
        }}>
          {tools.map((t, i) => (
            <Reveal key={i} delay={i * 60}>
              <div
                style={{
                  background: "var(--surface-white)",
                  border: "1px solid var(--hairline)",
                  borderRadius: 20,
                  padding: 36,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 220ms cubic-bezier(.2,0,0,1)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--divider-strong)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
              >
                <Eyebrow>{t.eyebrow}</Eyebrow>
                <h3 style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 700,
                  fontSize: 24,
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "var(--ink-1)",
                  margin: "18px 0 14px",
                  textWrap: "balance",
                }}>
                  {t.title}
                </h3>
                <p style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--ink-3)",
                  margin: 0,
                  flex: 1,
                }}>
                  {t.body}
                </p>
                <div style={{
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: "1px solid var(--hairline)",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                }}>
                  {t.tags.map((tag, j) => (
                    <span key={j} style={{
                      padding: "4px 10px",
                      background: "var(--paper-2)",
                      border: "1px solid var(--hairline)",
                      borderRadius: 999,
                      fontFamily: "'Geist Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--ink-3)",
                    }}>
                      {tag}
                    </span>
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
// 7b) WHO IT'S FOR — Roles
// ============================================================

function SourceRoles() {
  const roles = [
    {
      n: "01",
      name: "Buyer",
      lede: "Gets the morning back.",
      body: "The planning grid shows the next four months at a glance. ACE drafts the routine inbox traffic and queues it for review. The buyer stops re-typing supplier responses and focuses on the conversations that actually move price — supplier negotiation, single-source de-risking, exception handling.",
      gets: [
        "4-month planning grid open by 7:30am, fully refreshed",
        "12 ACE-drafted replies waiting for one-tap approval",
        "Single-source risk heatmap across your supplier panel",
        "Direct line to suppliers via the portal — no email tag",
      ],
    },
    {
      n: "02",
      name: "Finance / CFO",
      lede: "Mobile approve-on-the-go with full evidence.",
      body: "Every pending order is a card on the CFO's phone with the SKU, quantity, cash impact, AI risk badge, and EvidenceButton. Swipe to approve, tap for the supporting evidence chain. The full audit trail writes itself — every approval, signed and replayable.",
      gets: [
        "Mobile PWA: swipe-approve with one thumb",
        "EvidenceButton on every AI recommendation",
        "Cash-impact forecast 4 months forward",
        "Full audit trail on every approval, signed and replayable",
      ],
    },
    {
      n: "03",
      name: "Ops / GM",
      lede: "One screen with the signals that move the floor.",
      body: "Late raw materials. Single-source risk. Supplier price moves. Quality dispute trends. Lead-time variance. Every signal that could shake your production schedule, surfaced the day it happens — not the week after it bit. Linked back to the production line it affects.",
      gets: [
        "Single-source risk heatmap across your supplier panel",
        "Lead-time variance alerts vs. plan",
        "Supplier price-move tracker · 6-month rolling",
        "Quality dispute dashboard per supplier per SKU",
      ],
    },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>Built for</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              The three people who feel it{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>on day one.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 580, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              VSG Source ships value to three roles immediately. Below: what each one actually gets, the morning after go-live.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {roles.map((r, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{
                background: "var(--surface-white)",
                border: "1px solid var(--hairline)",
                borderRadius: 20,
                padding: 32,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <span style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: "var(--coral-soft)",
                    color: "var(--coral)",
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 600, fontSize: 12,
                    letterSpacing: "0.1em",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {r.n}
                  </span>
                  <span style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500, fontSize: 11,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--ink-3)",
                  }}>
                    {r.name}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 700, fontSize: 22, lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                  color: "var(--ink-1)",
                  margin: 0,
                  textWrap: "balance",
                }}>
                  {r.lede}
                </h3>
                <p style={{
                  marginTop: 16,
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 14.5, lineHeight: 1.6,
                  color: "var(--ink-3)",
                }}>
                  {r.body}
                </p>
                <div style={{ marginTop: 22, paddingTop: 22, borderTop: "1px solid var(--hairline)" }}>
                  <div style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--ink-4)",
                    marginBottom: 12,
                  }}>
                    What they get
                  </div>
                  <ul style={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                    {r.gets.map((g, j) => (
                      <li key={j} style={{
                        listStyle: "none",
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        gap: 10,
                        alignItems: "start",
                        fontFamily: "'Geist', sans-serif",
                        fontSize: 13.5,
                        color: "var(--ink-2)",
                        lineHeight: 1.5,
                      }}>
                        <span style={{ color: "var(--coral)", fontWeight: 600, marginTop: 1 }}>·</span>
                        <span>{g}</span>
                      </li>
                    ))}
                  </ul>
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
// 7c) COMPLETE CAPABILITIES — categorized feature inventory
// ============================================================

function SourceCapabilities() {
  const categories = [
    {
      tag: "Planning & forecasting",
      items: [
        "4-month forward planning grid (per-SKU, per-supplier, per-customer)",
        "Per-class stock-month targets, editable inline by the buyer",
        "Buy-up cash factor — surfaces the worst cash-month at a glance",
        "Local vs import split for diversification & FX exposure decisions",
        "Customer-share drilldown per SKU (who's buying what, when)",
        "8-month sales history with sparkline + seasonality flags",
        "NETWORKDAYS prorate · Dec/Jan half-trade convention built in",
        "Excel export of any view — for the buyer who still wants the sheet",
      ],
    },
    {
      tag: "Inbox & supplier email automation",
      items: [
        "ACE drafts replies in your house voice (references, codes, courtesy)",
        "POs, ASNs, statements, disputes — classified and ranked by lead-time risk",
        "Multi-language: English, Afrikaans, isiZulu (per-supplier per-buyer)",
        "Single-source risk warnings when a supplier dominates a SKU",
        "Dispute resolution thread per PO — searchable, signed, exportable",
        "Confidence + EvidenceButton on every draft — never a black-box answer",
        "Buyer keeps full review control through shadow mode + per-supplier thresholds",
        "Supplier portal: counterparts see their own POs, GRNs, disputes self-service",
      ],
    },
    {
      tag: "Approvals, exceptions & ERP I/O",
      items: [
        "Multi-level approval chains learned from your actual history",
        "Mobile PWA: CFO approves with a swipe + EvidenceButton context",
        "Auto-exception handling — variances flagged with the evidence trail",
        "Two-way ERP sync: POs out, GRNs back, every status update logged",
        "Native connectors: SysPro, SAP Business One, Sage X3, Sage Pastel",
        "Bespoke connectors for Acumatica, Odoo, and custom ERPs on request",
        "Audit log on every AI decision, every approval, every ERP write",
        "Immutable retention — every decision replayable, any day",
      ],
    },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>Complete capability map</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Everything Source does,{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>in one list.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              No mystery features behind a sales call. Four categories, 32 capabilities, all live on day one.
            </p>
          </div>
        </Reveal>
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 24,
        }}>
          {categories.map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: "var(--surface-white)",
                border: "1px solid var(--hairline)",
                borderRadius: 20,
                padding: 32,
                height: "100%",
              }}>
                <div style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontWeight: 500,
                  fontSize: 11,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--coral)",
                  marginBottom: 18,
                  paddingBottom: 18,
                  borderBottom: "1px solid var(--hairline)",
                }}>
                  {c.tag}
                </div>
                <ul style={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
                  {c.items.map((it, j) => (
                    <li key={j} style={{
                      listStyle: "none",
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 12,
                      alignItems: "start",
                      fontFamily: "'Geist', sans-serif",
                      fontSize: 14.5,
                      color: "var(--ink-2)",
                      lineHeight: 1.55,
                    }}>
                      <span style={{
                        width: 16, height: 16, borderRadius: "50%",
                        background: "var(--coral-soft)",
                        color: "var(--coral)",
                        fontSize: 11, fontWeight: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginTop: 1, flexShrink: 0,
                      }}>✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// ============================================================
// 7d) 5-WEEK ROLLOUT TIMELINE
// ============================================================

function SourceRollout() {
  const weeks = [
    {
      w: "Week 1",
      title: "Discovery + tenant provisioning",
      body: "We sit with your procurement lead, your finance person, your floor supervisor. Read your last 6 months of supplier email. Walk your warehouse. List the suppliers that actually matter. Your dedicated ACE tenant is provisioned on ZA infrastructure on day one.",
      deliverables: [
        "Supplier panel mapped (top 50)",
        "Approval chain documented",
        "Your ACE tenant — live, isolated, on-prem-ready",
      ],
    },
    {
      w: "Week 2",
      title: "Data load + ERP connection",
      body: "We load 8 months of historical sales, supplier master, current open POs, and outstanding GRNs from your ERP. Two-way connector tested. Planning grid populated and reconciled against your latest Excel sheet — line-by-line.",
      deliverables: [
        "Historical sales loaded (8mo)",
        "SysPro/SAP/Sage connector live",
        "Planning grid reconciled to your Excel",
      ],
    },
    {
      w: "Week 3",
      title: "Shadow mode + ACE tuning",
      body: "ACE drafts every supplier reply — but only your team sees them. We review the misses together, tune the prompts, tune the auctioneer weights. Your buyer starts trusting the drafts. Nothing has been sent yet.",
      deliverables: [
        "ACE shadow-drafting 100% of inbox",
        "Confidence thresholds locked per supplier",
        "Approval thresholds set",
      ],
    },
    {
      w: "Week 4",
      title: "First live drafts + review loop",
      body: "The first ACE-drafted reply goes to a real supplier — your buyer approved every word. Then ten. Then fifty. Daily standup with us watching the queue together. Confidence climbing.",
      deliverables: [
        "First 50 live drafts shipped",
        "Buyer confidence baseline measured",
        "Exception cases documented",
      ],
    },
    {
      w: "Week 5",
      title: "Go-live + monitoring",
      body: "ACE is replying for the inboxes you've approved. Your team handles exceptions, not throughput. We stay on standby for the first month. Then a quarterly review — no retainer, no hours billed for the standby.",
      deliverables: [
        "Source running production",
        "Mobile PWA rolled out to CFO",
        "First quarterly review scheduled",
      ],
    },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>Implementation</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Five weeks from kick-off{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>to live.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              No three-month "transformation" project. No twelve-month migration. The rollout you'd expect from any sensible vendor — with a real engineer on the call, not an account manager.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 64, position: "relative" }}>
          {/* Vertical timeline line */}
          <div aria-hidden="true" style={{
            position: "absolute",
            left: 23,
            top: 14,
            bottom: 14,
            width: 1.5,
            background: "var(--hairline)",
          }} />
          {weeks.map((w, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "48px 1fr 1.4fr",
                gap: 32,
                alignItems: "start",
                padding: "28px 0",
                borderBottom: i === weeks.length - 1 ? "none" : "1px solid var(--hairline)",
                position: "relative",
              }}>
                <span style={{
                  width: 48, height: 48,
                  borderRadius: "50%",
                  background: "var(--paper)",
                  border: "2px solid var(--coral)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Geist Mono', monospace",
                  fontWeight: 600, fontSize: 11,
                  letterSpacing: "0.06em",
                  color: "var(--coral)",
                  position: "relative",
                  zIndex: 1,
                }}>
                  W{i + 1}
                </span>
                <div>
                  <div style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500, fontSize: 11,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--coral)",
                    marginBottom: 8,
                  }}>
                    {w.w}
                  </div>
                  <h3 style={{
                    fontFamily: "'Geist', sans-serif",
                    fontWeight: 700, fontSize: 22,
                    lineHeight: 1.25,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-1)",
                    margin: 0,
                    textWrap: "balance",
                  }}>
                    {w.title}
                  </h3>
                  <p style={{
                    marginTop: 14,
                    fontFamily: "'Geist', sans-serif",
                    fontSize: 14.5, lineHeight: 1.6,
                    color: "var(--ink-3)",
                    maxWidth: 440,
                  }}>
                    {w.body}
                  </p>
                </div>
                <div>
                  <div style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: "var(--ink-4)",
                    marginBottom: 14,
                    marginTop: 4,
                  }}>
                    Deliverables
                  </div>
                  <ul style={{ padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                    {w.deliverables.map((d, j) => (
                      <li key={j} style={{
                        listStyle: "none",
                        display: "grid",
                        gridTemplateColumns: "auto 1fr",
                        gap: 10,
                        alignItems: "start",
                        fontFamily: "'Geist', sans-serif",
                        fontSize: 14,
                        color: "var(--ink-2)",
                        lineHeight: 1.5,
                      }}>
                        <span style={{
                          width: 14, height: 14, borderRadius: "50%",
                          background: "var(--success-soft)",
                          color: "var(--success)",
                          fontSize: 9, fontWeight: 700,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          marginTop: 2, flexShrink: 0,
                        }}>✓</span>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
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
// 7e) SECURITY & COMPLIANCE
// ============================================================

function SourceSecurity() {
  const items = [
    {
      tag: "Data residency",
      title: "ZA-hosted by default. On-prem if you need it.",
      body: "Every customer's ACE tenant runs in South African infrastructure (Cape Town + Johannesburg). For regulated operations or air-gapped sites, ACE can deploy entirely on your own hardware behind your firewall.",
    },
    {
      tag: "Per-customer isolation",
      title: "Your context never touches another customer.",
      body: "Each tenant is a discrete ACE instance. Your supplier list, your decisions, your edge cases — not shared, not pooled, not used to train cross-customer models. Even inference is per-tenant.",
    },
    {
      tag: "Immutable audit trail",
      title: "Every action, signed and replayable.",
      body: "Every AI proposal, every approval, every ERP write is logged with the inputs that produced it. Your auditors can replay any decision, on any day, in the original context — searchable, signed, exportable.",
    },
    {
      tag: "Encryption",
      title: "AES-256 at rest. TLS 1.3 in transit.",
      body: "Per-tenant encryption keys, customer-rotatable. Every byte that touches Source is encrypted on disk and on the wire. No exceptions, no plaintext logs.",
    },
    {
      tag: "Access control",
      title: "SSO via your IdP. Per-action RBAC.",
      body: "Connect Azure AD, Okta, or Google. Per-role permissions on every action. SCIM provisioning for joiners and leavers. Audit log records who approved what, when, and with which evidence.",
    },
    {
      tag: "Portable on exit",
      title: "Export the whole memory. No lock-in.",
      body: "If you ever leave, you take your ACE memory in a documented, readable format. The audit log too. We'd rather you stay because the product earns it — not because we trapped your data.",
    },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 760 }}>
            <Eyebrow>Security & data</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              Built to pass an audit{" "}
              <em style={{ fontStyle: "italic", fontWeight: 700 }}>in any boardroom.</em>
            </Headline>
            <p style={{ marginTop: 24, maxWidth: 620, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              Six commitments your IT lead can verify on day one.
            </p>
          </div>
        </Reveal>
        <div style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                background: "var(--surface-white)",
                border: "1px solid var(--hairline)",
                borderRadius: 18,
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
                  marginBottom: 18,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--coral)" }} />
                  <span style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontWeight: 500, fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--coral)",
                  }}>
                    {it.tag}
                  </span>
                </div>
                <h3 style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 700, fontSize: 20,
                  lineHeight: 1.25,
                  letterSpacing: "-0.015em",
                  color: "var(--ink-1)",
                  margin: 0,
                  textWrap: "balance",
                }}>
                  {it.title}
                </h3>
                <p style={{
                  marginTop: 14,
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 14, lineHeight: 1.6,
                  color: "var(--ink-3)",
                }}>
                  {it.body}
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
// 8) ROI STATS — 4-col stat cards
// ============================================================

function ROIStats() {
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720, marginBottom: 56 }}>
            <Eyebrow>Measurable ROI</Eyebrow>
            <Headline as="h2" size={48} style={{ marginTop: 32 }}>
              What changes <em style={{ fontStyle: "italic", fontWeight: 700 }}>in the first month.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { label: "In production with", val: 6, suffix: " SA mfrs" },
            { label: "Supplier emails / month", val: 42000, suffix: "+" },
            { label: "Avg. drafts approved", val: 91, suffix: "%" },
            { label: "Hours back / buyer / week", val: 11, suffix: " hrs" },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{
                background: "var(--paper-2)",
                border: "1px solid var(--hairline)",
                borderRadius: 16,
                padding: 28,
                height: "100%",
              }}>
                <div style={{
                  fontFamily: "'Geist Mono', monospace",
                  fontWeight: 500,
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--ink-4)",
                  marginBottom: 14,
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 700,
                  fontSize: 36,
                  color: "var(--ink-1)",
                  letterSpacing: "-0.025em",
                  lineHeight: 1,
                }}>
                  <CountUp to={s.val} duration={1400} suffix={s.suffix} />
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
// 9) PULL QUOTE
// ============================================================

function SourceQuote() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}>
            <span aria-hidden="true" style={{ fontFamily: "'Geist', sans-serif", fontStyle: "italic", fontWeight: 700, fontSize: 120, lineHeight: 0.9, color: "var(--coral)", display: "block" }}>"</span>
            <p style={{
              marginTop: 0,
              fontFamily: "'Geist', sans-serif",
              fontWeight: 500,
              fontSize: 36,
              lineHeight: 1.3,
              letterSpacing: "-0.02em",
              color: "var(--ink-1)",
              textWrap: "balance",
            }}>
              The first week, our buyer was sceptical. The fourth week, she was using the drafts. The eighth week, she was the one telling us which suppliers she wanted ACE to handle next.
            </p>
            <div style={{ marginTop: 36, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--ink-4)" }}>
              Operations director · FMCG manufacturer · 320 staff
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

// ============================================================
// 10) FINAL CTA
// ============================================================

function SourceCTA({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "144px 0", borderTop: "1px solid var(--hairline)", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute",
        bottom: "-40%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 1300,
        height: 1300,
        background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 55%)",
        pointerEvents: "none",
      }} />
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <Eyebrow>Try VSG Source</Eyebrow>
            <h2 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0, letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance" }}>
              Bring us your <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>planning spreadsheet.</em>
            </h2>
            <p style={{ marginTop: 28, fontFamily: "'Geist', sans-serif", fontSize: 20, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 580, marginLeft: "auto", marginRight: "auto" }}>
              30 minutes, no deck. We'll show you the same SKUs in the VSG Source planning grid — with the cash factor, the supplier risk lanes, and ACE's reorder suggestions on top.
            </p>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book a Source demo</PrimaryButton>
              <OutlineButton as="a" href="contact.html" size="lg">Get in touch</OutlineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ============================================================
// 11) FAQ
// ============================================================

const SOURCE_FAQS = [
  { q: "Is VSG Source an add-on to my ERP?",         a: "No. VSG Source is a standalone AI procurement platform with its own workflows — 4-month forward planning, multi-level approvals, supplier portal. It connects to SysPro, SAP Business One, and Sage Pastel through first-class native integrations, the same way Procurify connects to NetSuite. Your ERP keeps doing what it's good at." },
  { q: "What does ACE need to get started?",          a: "Read access to your ERP (we provide the SQL scripts), supplier contact information, and 8 months of historical sales data — which lives in your ERP already. We provision your tenant, load the data, and ACE starts producing the planning grid in week one." },
  { q: "Can our CFO approve from a phone?",           a: "Yes — mobile PWA. Each pending order is a card with the SKU, quantity, cash impact, AI risk badge, and EvidenceButton. Swipe to approve, tap for evidence. Full audit trail on every action." },
  { q: "Who decides what Source actually posts?",     a: "Your team. The default for the first 30 days is shadow mode — every ACE-drafted action is reviewed by your buyer before it leaves the tenant. After that, you set per-supplier thresholds for what ACE may act on autonomously." },
  { q: "How is Source priced?",                       a: "A base subscription plus per-active-user. No per-seat surprises. Implementation is included in year one. Talk to us for your number — Stephan replies personally within one working day." },
];

function SourceFAQ() {
  const [open, setOpen] = React.useState(0);
  return (
    <Section id="faq" alt>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }}>
          <Reveal>
            <div style={{ position: "sticky", top: 120 }}>
              <Eyebrow>FAQ · Source</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 32, maxWidth: 380 }}>
                The questions buyers <em style={{ fontStyle: "italic", fontWeight: 700 }}>always ask.</em>
              </Headline>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div>
              {SOURCE_FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <button
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                    style={{ width: "100%", background: "transparent", border: 0, padding: "24px 0", display: "grid", gridTemplateColumns: "44px 1fr 32px", gap: 20, alignItems: "center", textAlign: "left", cursor: "pointer", fontFamily: "'Geist', sans-serif" }}
                  >
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: 20, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
                      {f.q}
                    </span>
                    <span style={{
                      justifySelf: "end",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      border: "1px solid var(--hairline)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Geist', sans-serif",
                      fontWeight: 500,
                      fontSize: 16,
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
// PAGE ASSEMBLY
// ============================================================

function SourcePage({ onBookDemo }) {
  return (
    <React.Fragment>
      <SourceHero onBookDemo={onBookDemo} />
      <SocialProofStrip />
      <SourceBenefits />
      <TabbedShowcase />
      <ToolsGrid />
      <SourceRoles />
      <SourceCapabilities />
      <SourceRollout />
      <SourceSecurity />
      <ROIStats />
      <SourceQuote />
      <SourceCTA onBookDemo={onBookDemo} />
      <SourceFAQ />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="source">
      <SourcePage />
    </PageShell>
  );
});
