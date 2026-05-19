/* global React */

/* DemoModal — mocks a contact form. Esc + outside-click close. */

function DemoModal({ open, onClose }) {
  const [sent, setSent] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState({ name: "", email: "", company: "", phone: "" });

  React.useEffect(() => {
    if (!open) {
      // reset after close
      setTimeout(() => setSent(false), 300);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const inputStyle = {
    width: "100%",
    background: "var(--paper-2)",
    border: "1px solid var(--hairline)",
    borderRadius: 8,
    padding: "12px 14px",
    fontFamily: "'Geist', sans-serif",
    fontSize: 15,
    color: "var(--ink-1)",
    outline: "none",
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(26,22,18,0.55)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "vsg-fadein 200ms ease-out",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--paper)",
          borderRadius: 24,
          width: "100%",
          maxWidth: 540,
          padding: 40,
          border: "1px solid var(--hairline)",
          position: "relative",
          boxShadow: "0 40px 80px -20px rgba(26,22,18,0.4)",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid var(--hairline)",
            background: "transparent",
            cursor: "pointer",
            fontSize: 16,
            color: "var(--ink-2)",
          }}
        >
          ×
        </button>

        {!sent ? (
          <React.Fragment>
            <Eyebrow>Book a demo</Eyebrow>
            <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 32, lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--ink-1)", margin: "20px 0 0" }}>
              30 minutes with <em style={{ fontStyle: "italic", fontWeight: 700 }}>Stephan.</em>
            </h3>
            <p style={{ marginTop: 16, fontFamily: "'Geist', sans-serif", fontSize: 15, lineHeight: 1.6, color: "var(--ink-3)" }}>
              No deck. Bring the spreadsheet, the inbox, or the schedule that's slowing things down. We'll show you what would change.
            </p>

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
                      phone: form.phone,
                      message: form.phone ? `Demo request — phone: ${form.phone}` : "Demo request — no phone provided.",
                      source: "demo-modal",
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
              style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 14 }}
            >
              <input
                style={inputStyle}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <input
                style={inputStyle}
                type="email"
                placeholder="Work email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <input
                style={inputStyle}
                placeholder="Company"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
              <input
                style={inputStyle}
                type="tel"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <div style={{ marginTop: 8 }}>
                <PrimaryButton as="button" size="lg" disabled={submitting} style={{ width: "100%", justifyContent: "center", opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? "Sending…" : "Send to Stephan"}
                </PrimaryButton>
              </div>
              {error && (
                <div style={{ marginTop: 4, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--coral)", textAlign: "center" }}>
                  {error}
                </div>
              )}
              <div style={{ marginTop: 4, fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)", textAlign: "center" }}>
                Reply within one working day
              </div>
            </form>
          </React.Fragment>
        ) : (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                background: "var(--success-soft)",
                color: "var(--success)",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              ✓
            </div>
            <h3 style={{ fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 28, color: "var(--ink-1)", margin: "20px 0 0", letterSpacing: "-0.02em" }}>
              On its way to Stephan.
            </h3>
            <p style={{ marginTop: 16, fontFamily: "'Geist', sans-serif", fontSize: 15, color: "var(--ink-3)", lineHeight: 1.6 }}>
              You'll have a reply within one working day, from a real person, with three time slots to choose from.
            </p>
            <div style={{ marginTop: 28 }}>
              <OutlineButton onClick={onClose}>Close</OutlineButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { DemoModal });
