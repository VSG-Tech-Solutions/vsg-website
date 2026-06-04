/* global React */

/* How it works — six-week rollout. Editorial timeline.
   Numbered weeks + plain operator-flavored copy. */

const STEPS = [
  {
    week: "Step 1",
    title: "Discovery",
    body: "We sit with the people who actually do the work. We map how it flows today, find where it breaks, and pick the one problem worth solving first.",
  },
  {
    week: "Step 2",
    title: "First working slice",
    body: "We build something real on your actual data — not a mockup, not a deck. Connected to the systems you already run, so it fits how you actually work.",
  },
  {
    week: "Step 3",
    title: "Shadow & tune",
    body: "You and your team use it alongside how you work today. We watch what's right, what's wrong, and tune it together before it touches anything live.",
  },
  {
    week: "Step 4",
    title: "Go live",
    body: "It goes live on the real work, with your team in control. We start small, prove it, and widen from there. We stay on standby.",
  },
  {
    week: "Then",
    title: "Grow from there",
    body: "Once it's earned the next step, we look at what's next — a bigger build, another workflow, the next system. No retainer, no hours billed for the catch-up.",
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
              From kick-off to live in <em style={{ fontStyle: "italic", fontWeight: 700 }}>weeks, not quarters.</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 580, fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.65, color: "var(--ink-2)" }}>
              No platform migration. No three-month integration project. No "transformation" deck. Just a clean rollout — small first, proven fast, widened once you've seen it work. Same approach whether it's a workflow, a system, a custom build, or one of our products.
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
