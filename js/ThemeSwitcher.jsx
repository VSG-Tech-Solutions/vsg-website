/* global React */

/* ThemeSwitcher — floating button + panel for alternate color schemes.
   Persists in localStorage. Applies via [data-theme=...] on <html> root.

   Six distinct schemes designed as different visual ranges, not value tweaks
   of the same recipe:
     Cream     — design-system default · warm cream + coral
     Slate     — warm dark editorial · ink + cream + coral
     Midnight  — cool deep blue cinema · navy + ice + sunset
     Forest    — deep emerald + amber accent · cedar texture
     Lab       — clinical white + cobalt blue · technical / scientific
     Mono      — true mono · pure black on white with a single neon accent
*/

const VSG_THEMES = [
  { id: "cream",    name: "Cream",    sub: "Editorial · warm cream · coral",      swatch: ["#F5F0E8", "#1A1612", "#C9633A"] },
  { id: "slate",    name: "Slate",    sub: "Warm dark editorial · same coral",    swatch: ["#1A1612", "#F5F0E8", "#E58D62"] },
  { id: "midnight", name: "Midnight", sub: "Cool deep blue · cinematic",          swatch: ["#0B0F1A", "#EFF1F6", "#F2A481"] },
  { id: "forest",   name: "Forest",   sub: "Deep emerald · amber accent",         swatch: ["#0F1A14", "#EFF4EE", "#E8B340"] },
  { id: "lab",      name: "Lab",      sub: "Clinical white · cobalt blue",        swatch: ["#F7F8FB", "#0A0E1A", "#2563EB"] },
  { id: "mono",     name: "Mono",     sub: "True mono · single neon accent",      swatch: ["#FFFFFF", "#000000", "#FF3D00"] },
];

const VSG_THEME_VARS = {
  cream: {
    "--paper": "#F5F0E8", "--paper-2": "#FBF7EF", "--surface-white": "#FFFFFF",
    "--ink-1": "#1A1612", "--ink-2": "#3D362E", "--ink-3": "#6B6358", "--ink-4": "#9C9387",
    "--hairline": "#E5DDCC", "--divider-strong": "#C9BFA9",
    "--coral": "#C9633A", "--coral-soft": "rgba(201, 99, 58, 0.10)",
  },
  slate: {
    "--paper": "#1A1612", "--paper-2": "#221E18", "--surface-white": "#2A2520",
    "--ink-1": "#F5F0E8", "--ink-2": "#DCD2C0", "--ink-3": "#A39B8C", "--ink-4": "#6B6358",
    "--hairline": "rgba(245, 240, 232, 0.10)", "--divider-strong": "rgba(245, 240, 232, 0.22)",
    "--coral": "#E58D62", "--coral-soft": "rgba(229, 141, 98, 0.14)",
  },
  midnight: {
    "--paper": "#0B0F1A", "--paper-2": "#11162A", "--surface-white": "#1A2138",
    "--ink-1": "#EFF1F6", "--ink-2": "#C6CCDA", "--ink-3": "#8B93A8", "--ink-4": "#5A6178",
    "--hairline": "rgba(239, 241, 246, 0.10)", "--divider-strong": "rgba(239, 241, 246, 0.22)",
    "--coral": "#F2A481", "--coral-soft": "rgba(242, 164, 129, 0.14)",
  },
  forest: {
    "--paper": "#0F1A14", "--paper-2": "#152922", "--surface-white": "#1C322B",
    "--ink-1": "#EFF4EE", "--ink-2": "#C5D2C7", "--ink-3": "#8B9D8F", "--ink-4": "#5A6E60",
    "--hairline": "rgba(239, 244, 238, 0.10)", "--divider-strong": "rgba(239, 244, 238, 0.22)",
    "--coral": "#E8B340", "--coral-soft": "rgba(232, 179, 64, 0.14)",
  },
  lab: {
    "--paper": "#F7F8FB", "--paper-2": "#EEF1F7", "--surface-white": "#FFFFFF",
    "--ink-1": "#0A0E1A", "--ink-2": "#1F2839", "--ink-3": "#5A6378", "--ink-4": "#94A0B5",
    "--hairline": "#DBE0EC", "--divider-strong": "#BAC2D2",
    "--coral": "#2563EB", "--coral-soft": "rgba(37, 99, 235, 0.10)",
  },
  mono: {
    "--paper": "#FFFFFF", "--paper-2": "#F2F2F2", "--surface-white": "#FFFFFF",
    "--ink-1": "#000000", "--ink-2": "#1E1E1E", "--ink-3": "#535353", "--ink-4": "#8B8B8B",
    "--hairline": "#E0E0E0", "--divider-strong": "#BFBFBF",
    "--coral": "#FF3D00", "--coral-soft": "rgba(255, 61, 0, 0.10)",
  },
};

function applyVsgTheme(id) {
  const vars = VSG_THEME_VARS[id] || VSG_THEME_VARS.cream;
  const root = document.documentElement;
  Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", id);
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "theme-color");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", vars["--paper"]);
}

// Bootstrap persisted theme as early as possible — atoms.jsx loads this file before mount
(function applyPersistedTheme() {
  try {
    const saved = localStorage.getItem("vsg-theme");
    if (saved && VSG_THEME_VARS[saved]) applyVsgTheme(saved);
  } catch (e) { /* ignore */ }
})();

function ThemeButton({ theme, active, onSelect }) {
  return (
    <button
      onClick={() => onSelect(theme.id)}
      style={{
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        gap: 14,
        alignItems: "center",
        width: "100%",
        padding: "12px 14px",
        borderRadius: 10,
        border: `1px solid ${active ? "var(--ink-1)" : "var(--hairline)"}`,
        background: active ? "var(--paper-2)" : "transparent",
        cursor: "pointer",
        textAlign: "left",
        fontFamily: "'Geist', sans-serif",
        transition: "border-color 180ms cubic-bezier(.2,0,0,1), background 180ms",
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = "var(--paper-2)"; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = "transparent"; }}
    >
      <span style={{ display: "inline-flex", overflow: "hidden", border: "1px solid var(--hairline)", borderRadius: 8, height: 30, width: 50 }}>
        {theme.swatch.map((c, i) => (
          <span key={i} style={{ flex: 1, background: c }} />
        ))}
      </span>
      <span>
        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--ink-1)", letterSpacing: "-0.01em" }}>
          {theme.name}
        </div>
        <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{theme.sub}</div>
      </span>
      {active && (
        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--coral)" }}>
          ON
        </span>
      )}
    </button>
  );
}

function ThemeSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState(() => {
    try { return localStorage.getItem("vsg-theme") || "cream"; }
    catch (e) { return "cream"; }
  });

  const select = (id) => {
    setCurrent(id);
    applyVsgTheme(id);
    try { localStorage.setItem("vsg-theme", id); } catch (e) {}
  };

  const currentTheme = VSG_THEMES.find((t) => t.id === current) || VSG_THEMES[0];

  return (
    <React.Fragment>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Theme switcher"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 80,
          height: 48,
          padding: "0 18px 0 14px",
          borderRadius: 999,
          background: "var(--ink-1)",
          color: "var(--paper)",
          border: 0,
          fontFamily: "'Geist', sans-serif",
          fontWeight: 500,
          fontSize: 13,
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          boxShadow: "0 18px 40px -16px rgba(0,0,0,0.4)",
          transition: "transform 220ms cubic-bezier(.2,0,0,1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
      >
        <span style={{ display: "inline-flex", width: 22, height: 22, borderRadius: "50%", overflow: "hidden", border: "1px solid rgba(255,255,255,0.18)" }}>
          {currentTheme.swatch.map((c, i) => (
            <span key={i} style={{ flex: 1, background: c }} />
          ))}
        </span>
        <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, letterSpacing: "0.24em", textTransform: "uppercase" }}>
          Theme · {currentTheme.name}
        </span>
      </button>

      <div
        role="dialog"
        aria-label="Choose theme"
        style={{
          position: "fixed",
          bottom: 84,
          right: 24,
          zIndex: 80,
          width: 340,
          background: "var(--paper)",
          border: "1px solid var(--hairline)",
          borderRadius: 16,
          boxShadow: "0 24px 60px -20px rgba(0,0,0,0.35)",
          padding: 16,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(8px)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 200ms cubic-bezier(.2,0,0,1), transform 200ms cubic-bezier(.2,0,0,1)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 6px 12px" }}>
          <span style={{ fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11, letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)" }}>
            Experiment
          </span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            style={{ width: 22, height: 22, borderRadius: "50%", border: "1px solid var(--hairline)", background: "transparent", cursor: "pointer", color: "var(--ink-2)", fontSize: 13, lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            ×
          </button>
        </div>
        <div style={{ padding: "0 6px 12px", fontFamily: "'Geist', sans-serif", fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}>
          Try the site in another scheme. <span style={{ color: "var(--ink-1)", fontWeight: 500 }}>Cream</span> is the design-system default.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 380, overflowY: "auto" }}>
          {VSG_THEMES.map((t) => (
            <ThemeButton key={t.id} theme={t} active={current === t.id} onSelect={select} />
          ))}
        </div>
        <div style={{ marginTop: 10, padding: "10px 6px 4px", borderTop: "1px solid var(--hairline)", fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink-4)", textAlign: "center" }}>
          Choice persists across pages
        </div>
      </div>
    </React.Fragment>
  );
}

Object.assign(window, { ThemeSwitcher, applyVsgTheme });
