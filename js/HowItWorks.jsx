/* global React */

/* How it works — six-week rollout. Editorial timeline.
   Numbered weeks + plain operator-flavored copy. */

const STEPS = [
  {
    week: "Week 1",
    title: "Discovery",
    body: "We sit with your procurement lead, your finance person, your floor supervisor. Read your inbox, walk your line, list the suppliers that actually matter.",
  },
  {
    week: "Week 2 – 3",
    title: "Tenant set-up",
    body: "Your ACE instance is provisioned. We load your suppliers, your terminology, your ERP connection. Nothing leaves your tenant.",
  },
  {
    week: "Week 4",
    title: "Shadow mode",
    body: "ACE drafts replies — but only your team sees them. Every draft is reviewed. We watch the misses together and tune the prompts.",
  },
  {
    week: "Week 5",
    title: "Live",
    body: "The first ACE-drafted email goes to a real supplier, reviewed by your team. Then ten. Then fifty. By the end of the week, ACE is replying for the inboxes you've approved — your team handles exceptions, not throughput. We stay on standby.",
  },
  {
    week: "Then",
    title: "Quarterly tuning",
    body: "Every quarter we sit again, look at what ACE got wrong, what your team caught, what could go next. No retainer, no hours billed.",
  },
];

function HowItWorks() {
  return (
    <Section id="how" alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 780 }}>
            <Eyebrow>04 — How it works</Eyebrow>
            <Headline as="h2" size={64} style={{ marginTop: 32 }}>
              From kick-off to live in <em style={{ fontStyle: "italic", fontWeight: 700 }}>six weeks.</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 580, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)" }}>
              No platform migration. No three-month integration project. No "transformation" deck. Just a clean five-week rollout you'd recognise from any sensible vendor.
            </p>
          </div>
        </Reveal>

        <div style={{ marginTop: 72, position: "relative" }}>
          {/* vertical hairline */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 28,
              top: 14,
              bottom: 14,
              width: 1,
              background: "var(--hairline)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {STEPS.map((s, i) => (
              <Reveal key={i} delay={i * 60}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "56px 200px 1fr",
                    gap: 32,
                    alignItems: "start",
                    padding: "22px 0",
                    borderBottom: i === STEPS.length - 1 ? "0" : "1px solid var(--hairline)",
                  }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      border: "1px solid var(--hairline)",
                      background: "var(--paper)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Geist Mono', monospace",
                      fontWeight: 500,
                      fontSize: 14,
                      color: "var(--ink-1)",
                      letterSpacing: "-0.01em",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ paddingTop: 14 }}>
                    <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                      {s.week}
                    </div>
                    <div style={{ marginTop: 8, fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 22, color: "var(--ink-1)", letterSpacing: "-0.02em" }}>
                      {s.title}
                    </div>
                  </div>
                  <div style={{ paddingTop: 14 }}>
                    <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 640 }}>
                      {s.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

Object.assign(window, { HowItWorks });
