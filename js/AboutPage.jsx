/* global React, ReactDOM */

/* About page — origin story, principles, team. */

function AboutHero() {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "96px 0 80px", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-30%", right: "-15%", width: 1000, height: 1000, background: "radial-gradient(circle at center, rgba(201,99,58,0.12), rgba(201,99,58,0) 60%)", pointerEvents: "none" }} />
      <Container style={{ position: "relative" }}>
        <Reveal>
          <Eyebrow>About · VSG Tech</Eyebrow>
          <h1 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--ink-1)", margin: "32px 0 0", maxWidth: 1080, textWrap: "balance" }}>
            A four-person team building AI for the businesses that <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>actually run South Africa.</em>
          </h1>
        </Reveal>
      </Container>
    </section>
  );
}

function OriginStory() {
  return (
    <Section>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
          <Reveal>
            <div style={{ position: "sticky", top: 120 }}>
              <Eyebrow>The story</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 28, maxWidth: 400 }}>
                Why we <em style={{ fontStyle: "italic", fontWeight: 700 }}>started.</em>
              </Headline>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.7, color: "var(--ink-2)" }}>
                We started VSG because the AI products built for the Fortune 500 don't fit a 200-person factory in Atlantis, and the local consultancies aren't building AI.
              </p>
              <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.7, color: "var(--ink-2)" }}>
                The mid-market here runs serious operations — R20m to R500m in revenue, real factories, real distribution — on ERPs that were chosen ten years ago and Excel sheets that someone rebuilds every Monday. Those teams know exactly what AI should be doing for them. They just don't have anyone building it for them.
              </p>
              <p style={{ fontFamily: "'Geist', sans-serif", fontSize: 19, lineHeight: 1.7, color: "var(--ink-2)" }}>
                That's the team in between, and that's where we sit. Four people, in Cape Town, building AI-native products that earn their keep by week five.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function Principles() {
  const principles = [
    { n: "01", t: "Operator-flavoured, not vendor-flavoured.", b: "If a product page sentence could appear on five SaaS sites, we rewrite it. If a feature wouldn't survive a Tuesday on the floor, we cut it." },
    { n: "02", t: "Specifics beat scale.", b: "We don't build for 'manufacturing'. We build for the 200-row Excel your buyer rebuilds every Monday, for the supplier whose ETAs are always optimistic by four days." },
    { n: "03", t: "Standalone products, not 'gap-fillers'.", b: "Each VSG product is a full solution to a real operational problem. The ERP connection is a feature in the body copy, not the headline value." },
    { n: "04", t: "Your data is yours.", b: "Per-customer AI memory. No cross-training. Full export. Audit log on every action. If you leave, you leave with everything." },
    { n: "05", t: "Stephan's number, in your phone.", b: "If you sign with us, the founder picks up. So do the engineers who built the thing. That's a small-company benefit we'll keep as long as we can." },
    { n: "06", t: "Six weeks or it isn't shipping.", b: "If we can't get a useful slice in front of you in six weeks, the scope is wrong. We'd rather cut scope than miss." },
  ];
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>Principles</Eyebrow>
            <Headline as="h2" size={56} style={{ marginTop: 32 }}>
              How we work. <em style={{ fontStyle: "italic", fontWeight: 700 }}>What we won't do.</em>
            </Headline>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
          {principles.map((p, i) => (
            <Reveal key={i} delay={i * 40}>
              <div
                style={{
                  padding: "32px 32px 32px 0",
                  borderTop: "1px solid var(--hairline)",
                  borderRight: i % 2 === 0 ? "1px solid var(--hairline)" : "none",
                  paddingLeft: i % 2 === 1 ? 32 : 0,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
                    {p.n}
                  </span>
                  <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 24, color: "var(--ink-1)", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.25, textWrap: "balance", flex: 1 }}>
                    {p.t}
                  </h3>
                </div>
                <p style={{ marginTop: 14, marginLeft: 41, fontFamily: "'Geist', sans-serif", fontSize: 16, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 460 }}>
                  {p.b}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function TeamSection() {
  // Stephan + three placeholder slots for the team.
  const team = [
    { initials: "Sv", name: "Stephan van Vuuren", role: "Founder · CEO", note: "Replies to every demo request personally. Picks up when you call." },
    { initials: "—", name: "Lead engineer", role: "Engineering", note: "Builds the products. Holds the pager. Hire pending — talk to Stephan." },
    { initials: "—", name: "Forward deployed", role: "Applied AI", note: "On-site with rollouts. The face you see in week one through six." },
    { initials: "—", name: "Operations", role: "Customer", note: "Owns onboarding, success, the relationship after week six." },
  ];
  return (
    <Section>
      <Container>
        <Reveal>
          <div style={{ maxWidth: 720 }}>
            <Eyebrow>Team</Eyebrow>
            <Headline as="h2" size={48} style={{ marginTop: 32 }}>
              Four people, <em style={{ fontStyle: "italic", fontWeight: 700 }}>on purpose.</em>
            </Headline>
            <p style={{ marginTop: 28, maxWidth: 560, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
              We grow slowly. Each new hire has to make the team better at one of three things: building, shipping, or talking to operators.
            </p>
          </div>
        </Reveal>
        <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {team.map((t, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: 24, border: "1px solid var(--hairline)", borderRadius: 20, background: "var(--surface-white)" }}>
                <div style={{ width: 88, height: 88, borderRadius: "50%", background: "var(--paper-2)", border: "1px solid var(--hairline)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                  <div aria-hidden="true" style={{ position: "absolute", inset: "-10%", background: "radial-gradient(circle at 30% 30%, rgba(201,99,58,0.16), rgba(201,99,58,0) 60%)" }} />
                  <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 30, color: t.initials === "—" ? "var(--ink-4)" : "var(--ink-1)", letterSpacing: "-0.04em", position: "relative" }}>
                    {t.initials}
                  </span>
                </div>
                <div style={{ marginTop: 18, fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 16, color: "var(--ink-1)" }}>
                  {t.name}
                </div>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)", marginTop: 6 }}>
                  {t.role}
                </div>
                <p style={{ marginTop: 12, fontFamily: "'Geist', sans-serif", fontSize: 13, lineHeight: 1.55, color: "var(--ink-3)" }}>
                  {t.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Office() {
  return (
    <Section alt>
      <Container>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <Eyebrow>Where we are</Eyebrow>
              <Headline as="h2" size={48} style={{ marginTop: 32, maxWidth: 460 }}>
                Cape Town. <em style={{ fontStyle: "italic", fontWeight: 700 }}>Continent-wide.</em>
              </Headline>
              <p style={{ marginTop: 28, maxWidth: 460, fontFamily: "'Geist', sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink-2)" }}>
                Our office is in the Mother City. Our customers are in Cape Town, Johannesburg, Durban, and one in Lusaka. We travel for kick-offs and quarterly reviews; the rest happens on a call.
              </p>
              <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { l: "Address", v: "5th Floor · Roeland Square · Cape Town · 8001" },
                  { l: "Email", v: "hello@vsgtech.co.za" },
                  { l: "Hours", v: "Mon–Fri · 08:00–18:00 SAST" },
                ].map((r, i) => (
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 16, paddingTop: 10, borderTop: i === 0 ? "1px solid var(--hairline)" : "none", paddingTop: i === 0 ? 14 : 0 }}>
                    <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>{r.l}</span>
                    <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-1)" }}>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              style={{
                aspectRatio: "4 / 3",
                background: "var(--surface-white)",
                border: "1px solid var(--hairline)",
                borderRadius: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* abstract map: lines + a pinned marker */}
              <svg viewBox="0 0 400 300" style={{ width: "100%", height: "100%", display: "block" }}>
                <defs>
                  <pattern id="abt-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="var(--hairline)" />
                  </pattern>
                </defs>
                <rect width="400" height="300" fill="url(#abt-grid)" />
                {/* coastline-ish curve */}
                <path d="M 0 200 C 80 180, 140 220, 200 200 S 320 210, 400 190" fill="none" stroke="var(--ink-3)" strokeWidth="1.5" />
                <path d="M 0 230 C 80 215, 140 250, 200 235 S 320 240, 400 220" fill="none" stroke="var(--hairline)" strokeWidth="1.5" />
                {/* pin */}
                <circle cx="170" cy="195" r="14" fill="var(--coral-soft)" />
                <circle cx="170" cy="195" r="6" fill="var(--coral)" />
                <line x1="170" y1="195" x2="170" y2="215" stroke="var(--coral)" strokeWidth="1.5" />
                <text x="186" y="200" fontFamily="Geist Mono, monospace" fontSize="11" letterSpacing="2" fill="var(--ink-1)">CPT</text>
                {/* satellites */}
                {[
                  { x: 250, y: 130, l: "JHB" },
                  { x: 320, y: 180, l: "DBN" },
                  { x: 200, y: 70, l: "LUSAKA" },
                ].map((p, i) => (
                  <React.Fragment key={i}>
                    <circle cx={p.x} cy={p.y} r="3" fill="var(--ink-3)" />
                    <line x1="170" y1="195" x2={p.x} y2={p.y} stroke="var(--ink-3)" strokeWidth="0.8" strokeDasharray="2 3" />
                    <text x={p.x + 8} y={p.y + 4} fontFamily="Geist Mono, monospace" fontSize="9" letterSpacing="1.6" fill="var(--ink-3)">{p.l}</text>
                  </React.Fragment>
                ))}
              </svg>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}

function AboutCTA({ onBookDemo }) {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "144px 0", borderTop: "1px solid var(--hairline)", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", bottom: "-40%", left: "50%", transform: "translateX(-50%)", width: 1300, height: 1300, background: "radial-gradient(circle at center, rgba(201,99,58,0.16), rgba(201,99,58,0) 55%)", pointerEvents: "none" }} />
      <Container>
        <Reveal>
          <div style={{ textAlign: "center", maxWidth: 880, margin: "0 auto", position: "relative" }}>
            <Eyebrow>Work with us</Eyebrow>
            <h2 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 80, lineHeight: 1.0, letterSpacing: "-0.035em", color: "var(--ink-1)", margin: "32px 0 0", textWrap: "balance" }}>
              The shortest path is a <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>30-minute call.</em>
            </h2>
            <div style={{ marginTop: 40, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <PrimaryButton onClick={onBookDemo} size="lg">Book a demo</PrimaryButton>
              <OutlineButton as="a" href="contact.html" size="lg">Get in touch</OutlineButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function AboutPage({ onBookDemo }) {
  return (
    <React.Fragment>
      <AboutHero />
      <OriginStory />
      <Principles />
      <TeamSection />
      <Office />
      <AboutCTA onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="about">
      <AboutPage />
    </PageShell>
  );
});
