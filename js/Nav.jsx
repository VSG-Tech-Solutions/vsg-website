/* global React */

/* Nav — sticky top bar with Products dropdown.
   Accepts a `current` prop (page slug) to highlight the active link.
   Pages are flat at root level so all hrefs are simple basenames. */

function NavDropdown({ current, onBookDemo }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const closeTimerRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  React.useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const handleEnter = () => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setOpen(true);
  };
  const handleLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpen(false), 180);
  };

  const active = current === "source" || current === "pace" || current === "products";

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'Geist', sans-serif",
          fontWeight: 500,
          fontSize: 14,
          color: active ? "var(--ink-1)" : "var(--ink-2)",
          background: "transparent",
          border: 0,
          cursor: "pointer",
          padding: "8px 0",
          letterSpacing: "-0.005em",
        }}
      >
        Products
        <svg width="10" height="10" viewBox="0 0 10 10" style={{ transition: "transform 220ms cubic-bezier(.2,0,0,1)", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
          <path d="M 1.5 3.5 L 5 7 L 8.5 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* dropdown panel */}
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: "-24px",
          minWidth: 380,
          background: "var(--surface-white)",
          border: "1px solid var(--hairline)",
          borderRadius: 16,
          boxShadow: "0 20px 50px -16px rgba(26,22,18,0.18)",
          padding: 12,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 180ms cubic-bezier(.2,0,0,1), transform 180ms cubic-bezier(.2,0,0,1)",
          zIndex: 60,
        }}
      >
        {[
          {
            href: "source.html",
            title: "VSG Source",
            sub: "Procurement that replies for you.",
            status: "Live",
            variant: "live",
            slug: "source",
          },
          {
            href: "pace.html",
            title: "VSG Pace",
            sub: "Production scheduling that thinks ahead.",
            status: "Q3 2026",
            variant: "upcoming",
            slug: "pace",
          },
        ].map((p) => {
          const isActive = current === p.slug;
          return (
            <a
              key={p.slug}
              href={p.href}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: 16,
                alignItems: "center",
                padding: "14px 16px",
                borderRadius: 10,
                textDecoration: "none",
                background: isActive ? "var(--paper-2)" : "transparent",
                transition: "background 140ms cubic-bezier(.2,0,0,1)",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--paper-2)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <div>
                <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ink-1)", letterSpacing: "-0.01em" }}>
                  {p.title}
                </div>
                <div style={{ marginTop: 4, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.45 }}>
                  {p.sub}
                </div>
              </div>
              <StatusPill variant={p.variant}>{p.status}</StatusPill>
            </a>
          );
        })}
        <div style={{ height: 1, background: "var(--hairline)", margin: "8px 12px" }} />
        <a
          href="ace.html"
          style={{
            display: "block",
            padding: "10px 16px",
            borderRadius: 10,
            textDecoration: "none",
            fontFamily: "'Geist', sans-serif",
            fontSize: 13,
            color: "var(--ink-3)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--paper-2)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ color: "var(--coral)", fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", marginRight: 8 }}>
            Core
          </span>
          Both products run on VSG ACE — the per-customer AI core →
        </a>
      </div>
    </div>
  );
}

function NavServicesDropdown({ current }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  const closeTimerRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Cleanup any pending close timer on unmount
  React.useEffect(() => () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  }, []);

  const handleEnter = () => {
    if (closeTimerRef.current) { clearTimeout(closeTimerRef.current); closeTimerRef.current = null; }
    setOpen(true);
  };
  const handleLeave = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpen(false), 180);
  };

  const active = current === "services" || current === "automation" || current === "bespoke";

  const items = [
    {
      href: "automation.html",
      title: "AI Workflow Automation",
      sub: "Two-to-four week sprints. Fixed scope. Live in production.",
      slug: "automation",
    },
    {
      href: "bespoke.html",
      title: "Bespoke Software",
      sub: "Custom software for the problem only YOU have.",
      slug: "bespoke",
    },
  ];

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "'Geist', sans-serif",
          fontWeight: 500,
          fontSize: 14,
          color: active ? "var(--ink-1)" : "var(--ink-2)",
          background: "transparent",
          border: 0,
          cursor: "pointer",
          padding: "8px 0",
          letterSpacing: "-0.005em",
        }}
      >
        Services
        <svg width="10" height="10" viewBox="0 0 10 10" style={{ transition: "transform 220ms cubic-bezier(.2,0,0,1)", transform: open ? "rotate(180deg)" : "rotate(0)" }}>
          <path d="M 1.5 3.5 L 5 7 L 8.5 3.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: "-24px",
          minWidth: 380,
          background: "var(--surface-white)",
          border: "1px solid var(--hairline)",
          borderRadius: 16,
          boxShadow: "0 20px 50px -16px rgba(26,22,18,0.18)",
          padding: 12,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 180ms cubic-bezier(.2,0,0,1), transform 180ms cubic-bezier(.2,0,0,1)",
          zIndex: 60,
        }}
      >
        {items.map((p) => {
          const isActive = current === p.slug;
          return (
            <a
              key={p.slug}
              href={p.href}
              style={{
                display: "block",
                padding: "14px 16px",
                borderRadius: 10,
                textDecoration: "none",
                background: isActive ? "var(--paper-2)" : "transparent",
                transition: "background 140ms cubic-bezier(.2,0,0,1)",
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = "var(--paper-2)"; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
            >
              <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 600, fontSize: 15, color: "var(--ink-1)", letterSpacing: "-0.01em" }}>
                {p.title}
              </div>
              <div style={{ marginTop: 4, fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.45 }}>
                {p.sub}
              </div>
            </a>
          );
        })}
        <div style={{ height: 1, background: "var(--hairline)", margin: "8px 12px" }} />
        <a
          href="contact.html"
          style={{
            display: "block",
            padding: "10px 16px",
            borderRadius: 10,
            textDecoration: "none",
            fontFamily: "'Geist', sans-serif",
            fontSize: 13,
            color: "var(--ink-3)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "var(--paper-2)")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <span style={{ color: "var(--coral)", fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", marginRight: 8 }}>
            Or
          </span>
          Workflow not listed? Tell us what to build →
        </a>
      </div>
    </div>
  );
}

function Nav({ onBookDemo, current = "" }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "ace.html", label: "VSG ACE", slug: "ace" },
    { href: "how-it-works.html", label: "How it works", slug: "how" },
    { href: "about.html", label: "About", slug: "about" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "var(--paper)",
        borderBottom: scrolled ? "1px solid var(--hairline)" : "1px solid transparent",
        transition: "border-color 220ms cubic-bezier(.2,0,0,1)",
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "18px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <a
          href="index.html"
          aria-label="VSG Tech — home"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "baseline",
            gap: 5,
          }}
        >
          <span
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 800,
              fontSize: 24,
              color: "var(--ink-1)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            VSG
          </span>
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--coral)",
              marginBottom: 2,
            }}
          />
        </a>

        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          <NavDropdown current={current} onBookDemo={onBookDemo} />
          <NavServicesDropdown current={current} />
          {links.map((l) => {
            const isActive = current === l.slug;
            return (
              <a
                key={l.href}
                href={l.href}
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontWeight: 500,
                  fontSize: 14,
                  color: isActive ? "var(--ink-1)" : "var(--ink-2)",
                  textDecoration: "none",
                  letterSpacing: "-0.005em",
                  position: "relative",
                  padding: "8px 0",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-1)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? "var(--ink-1)" : "var(--ink-2)")}
              >
                {l.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      left: 0,
                      right: 0,
                      bottom: 2,
                      height: 1.5,
                      background: "var(--coral)",
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <a
            href="contact.html"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              color: current === "contact" ? "var(--ink-1)" : "var(--ink-2)",
              textDecoration: "none",
            }}
          >
            Contact
          </a>
          <button
            onClick={onBookDemo}
            style={{
              height: 40,
              padding: "0 18px",
              borderRadius: 999,
              background: "var(--ink-1)",
              color: "var(--paper)",
              fontFamily: "'Geist', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              border: 0,
              cursor: "pointer",
              transition: "transform 220ms cubic-bezier(.2,0,0,1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            Book a demo
          </button>
        </div>
      </div>
    </header>
  );
}

Object.assign(window, { Nav, NavDropdown });
