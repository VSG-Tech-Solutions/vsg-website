/* global React, ReactDOM */

/* Contact page — form + direct contact + FAQ teaser. */

function ContactHero() {
  return (
    <section style={{ position: "relative", background: "var(--paper)", padding: "96px 0 0", overflow: "hidden" }}>
      <div aria-hidden="true" style={{ position: "absolute", top: "-30%", right: "-15%", width: 1000, height: 1000, background: "radial-gradient(circle at center, rgba(201,99,58,0.12), rgba(201,99,58,0) 60%)", pointerEvents: "none" }} />
      <Container style={{ position: "relative" }}>
        <Reveal>
          <Eyebrow>Get in touch</Eyebrow>
          <h1 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96, lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--ink-1)", margin: "32px 0 0", maxWidth: 1080, textWrap: "balance" }}>
            Tell us what's <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>getting in the way.</em>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ marginTop: 32, maxWidth: 680, fontFamily: "'Geist', sans-serif", fontSize: 21, lineHeight: 1.55, color: "var(--ink-2)" }}>
            One form. One reply, from Stephan, within one working day. Bring the spreadsheet, the bottleneck, or the ask the vendor wouldn't quote.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function ContactForm() {
  const [form, setForm] = React.useState({ name: "", email: "", company: "", role: "", topic: "Book a demo", note: "" });
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const inputStyle = {
    width: "100%",
    background: "var(--surface-white)",
    border: "1px solid var(--hairline)",
    borderRadius: 10,
    padding: "14px 16px",
    fontFamily: "'Geist', sans-serif",
    fontSize: 16,
    color: "var(--ink-1)",
    outline: "none",
    transition: "border-color 220ms cubic-bezier(.2,0,0,1)",
  };

  return (
    <Section>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 80, alignItems: "start" }}>
          <Reveal>
            {!sent ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (submitting) return;
                  setError("");
                  setSubmitting(true);
                  try {
                    const res = await fetch("/api/lead", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        company: form.company,
                        role: form.role,
                        topic: form.topic,
                        message: form.note || `${form.topic} — no extra context provided.`,
                        source: "contact-page",
                      }),
                    });
                    const data = await res.json().catch(() => ({}));
                    if (data && data.ok) {
                      setSent(true);
                    } else {
                      setError((data && data.error) || "Couldn't send — try emailing hello@vsgtech.co.za");
                    }
                  } catch {
                    setError("Network error — try emailing hello@vsgtech.co.za");
                  } finally {
                    setSubmitting(false);
                  }
                }}
                style={{ display: "flex", flexDirection: "column", gap: 18 }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Your name</label>
                    <input style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div>
                    <label style={labelStyle}>Work email</label>
                    <input type="email" style={inputStyle} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input style={inputStyle} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>Your role</label>
                    <input style={inputStyle} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="CFO · COO · Ops director · …" />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Reason for getting in touch</label>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                    {["VSG Source", "VSG Pace", "Book a demo", "AI Sprints", "AI Workflow Automation", "Bespoke Software", "Press / other"].map((t) => {
                      const sel = form.topic === t;
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setForm({ ...form, topic: t })}
                          style={{
                            padding: "10px 16px",
                            borderRadius: 999,
                            border: `1px solid ${sel ? "var(--ink-1)" : "var(--hairline)"}`,
                            background: sel ? "var(--ink-1)" : "transparent",
                            color: sel ? "var(--paper)" : "var(--ink-1)",
                            fontFamily: "'Geist', sans-serif",
                            fontWeight: 500,
                            fontSize: 14,
                            cursor: "pointer",
                            transition: "all 220ms cubic-bezier(.2,0,0,1)",
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>What's getting in the way?</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 140, resize: "vertical", fontFamily: "'Geist', sans-serif" }}
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder="The 200-row Excel. The PO confirmations no one wants to type. The integration the vendor won't quote. Whatever it is."
                  />
                </div>
                <div style={{ marginTop: 8, display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                  <PrimaryButton as="button" size="lg" disabled={submitting} style={{ opacity: submitting ? 0.7 : 1 }}>
                    {submitting ? "Sending…" : "Send to Stephan"}
                  </PrimaryButton>
                  <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                    Reply within one working day
                  </span>
                </div>
                {error && (
                  <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: "var(--coral)" }}>
                    {error}
                  </div>
                )}
              </form>
            ) : (
              <div style={{ background: "var(--paper-2)", border: "1px solid var(--hairline)", borderRadius: 20, padding: 48, textAlign: "center" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--success-soft)", color: "var(--success)", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700 }}>
                  ✓
                </div>
                <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 32, color: "var(--ink-1)", margin: "20px 0 0", letterSpacing: "-0.025em" }}>
                  On its way to Stephan.
                </h3>
                <p style={{ marginTop: 18, fontFamily: "'Geist', sans-serif", fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>
                  You'll have a reply within one working day, from a real person, with three time slots to choose from. Or you can email him directly at hello@vsgtech.co.za if you want a faster track.
                </p>
              </div>
            )}
          </Reveal>

          <Reveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ padding: 32, border: "1px solid var(--hairline)", borderRadius: 20, background: "var(--paper-2)" }}>
                <Eyebrow>Direct</Eyebrow>
                <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { l: "Email", v: "hello@vsgtech.co.za", h: "mailto:hello@vsgtech.co.za" },
                    { l: "Phone", v: "+27 21 000 0000", h: "tel:+27210000000" },
                    { l: "LinkedIn", v: "@vsg-tech", h: "#" },
                  ].map((c, i) => (
                    <a key={i} href={c.h} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 14, padding: "10px 0", textDecoration: "none", color: "var(--ink-1)", borderBottom: i === 2 ? "none" : "1px solid var(--hairline)" }}>
                      <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>{c.l}</span>
                      <span style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 16, color: "var(--ink-1)" }}>{c.v}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div style={{ padding: 32, border: "1px solid var(--hairline)", borderRadius: 20 }}>
                <Eyebrow>Office</Eyebrow>
                <div style={{ marginTop: 18, fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65 }}>
                  5th Floor · Roeland Square<br />
                  Cape Town · 8001<br />
                  South Africa
                </div>
                <div style={{ marginTop: 18, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)" }}>
                  Mon–Fri · 08:00–18:00 SAST
                </div>
              </div>

              <div style={{ padding: 28, border: "1px solid var(--coral)", borderRadius: 20, background: "var(--coral-soft)" }}>
                <div style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--coral)" }}>
                  Stephan replies personally
                </div>
                <div style={{ marginTop: 10, fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 17, color: "var(--ink-1)", letterSpacing: "-0.01em", lineHeight: 1.45 }}>
                  No SDR funnel. No qualifying form. The founder picks up the email.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

const labelStyle = {
  display: "block",
  marginBottom: 8,
  fontFamily: "'Geist Mono', monospace",
  fontWeight: 500,
  fontSize: 10,
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--ink-4)",
};

function ContactPage() {
  return (
    <React.Fragment>
      <ContactHero />
      <ContactForm />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="contact">
      <ContactPage />
    </PageShell>
  );
});
