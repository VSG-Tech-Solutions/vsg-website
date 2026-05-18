/* global React */
/* Shared atoms for VSG Tech marketing site. */

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ---------- Eyebrow ----------
function Eyebrow({ children, style, muted }) {
  return (
    <span
      style={{
        fontFamily: "'Geist Mono', monospace",
        fontWeight: 500,
        fontSize: "11px",
        letterSpacing: "0.28em",
        textTransform: "uppercase",
        color: muted ? "var(--ink-4)" : "var(--coral)",
        display: "inline-block",
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

// ---------- StatusPill ----------
function StatusPill({ variant = "live", children, style }) {
  const isLive = variant === "live";
  const color = isLive ? "var(--success)" : "var(--coral)";
  const bg = isLive ? "var(--success-soft)" : "var(--coral-soft)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 28,
        padding: "0 12px",
        borderRadius: 999,
        background: bg,
        fontFamily: "'Geist Mono', monospace",
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color,
        ...style,
      }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: "50%",
          background: color,
          flex: "none",
          animation: isLive ? "none" : "vsg-pulse 2s ease-in-out infinite",
        }}
      />
      {children}
    </span>
  );
}

// ---------- Buttons ----------
function PrimaryButton({ children, onClick, as = "button", href, size = "md", style }) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const Tag = as;
  const lift = press ? 0 : hover ? -2 : 0;
  const shadow = hover && !press ? "0 10px 28px rgba(26,22,18,0.18)" : "none";
  const h = size === "lg" ? 56 : 50;
  const px = size === "lg" ? 32 : 28;
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        height: h,
        padding: `0 ${px}px`,
        borderRadius: 999,
        background: "var(--ink-1)",
        color: "var(--paper)",
        fontFamily: "'Geist', sans-serif",
        fontWeight: 500,
        fontSize: size === "lg" ? 16 : 15,
        border: 0,
        cursor: "pointer",
        textDecoration: "none",
        transform: `translateY(${lift}px)`,
        boxShadow: shadow,
        transition: "transform 220ms cubic-bezier(.2,0,0,1), box-shadow 220ms cubic-bezier(.2,0,0,1)",
        ...style,
      }}
    >
      {children}
      <span
        style={{
          transition: "transform 220ms cubic-bezier(.2,0,0,1)",
          transform: hover ? "translateX(3px)" : "translateX(0)",
          display: "inline-block",
        }}
      >→</span>
    </Tag>
  );
}

function OutlineButton({ children, onClick, as = "button", href, size = "md", style }) {
  const [hover, setHover] = useState(false);
  const Tag = as;
  const h = size === "lg" ? 56 : 50;
  const px = size === "lg" ? 32 : 28;
  return (
    <Tag
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        height: h,
        padding: `0 ${px}px`,
        borderRadius: 999,
        background: hover ? "var(--ink-1)" : "transparent",
        color: hover ? "var(--paper)" : "var(--ink-1)",
        fontFamily: "'Geist', sans-serif",
        fontWeight: 500,
        fontSize: size === "lg" ? 16 : 15,
        border: "1px solid var(--ink-1)",
        cursor: "pointer",
        textDecoration: "none",
        transition: "background-color 220ms cubic-bezier(.2,0,0,1), color 220ms cubic-bezier(.2,0,0,1)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// ---------- Layout ----------
function Section({ alt = false, id, children, style, divider = true }) {
  return (
    <section
      id={id}
      style={{
        background: alt ? "var(--paper-2)" : "var(--paper)",
        padding: "144px 0",
        borderTop: divider ? "1px solid var(--hairline)" : "none",
        position: "relative",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

function Container({ children, style, wide }) {
  return (
    <div
      style={{
        maxWidth: wide ? 1320 : 1200,
        margin: "0 auto",
        padding: "0 48px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ---------- FeatureItem (coral bullet) ----------
function FeatureItem({ title, body }) {
  return (
    <li style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 14, alignItems: "start", listStyle: "none" }}>
      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--coral)", marginTop: 9 }} />
      <div>
        <div style={{ fontFamily: "'Geist', sans-serif", fontWeight: 500, fontSize: 16, color: "var(--ink-1)" }}>{title}</div>
        {body && (
          <div style={{ fontFamily: "'Geist', sans-serif", fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55, marginTop: 2 }}>{body}</div>
        )}
      </div>
    </li>
  );
}

// ---------- Headline ----------
function Headline({ as = "h2", size = 56, children, style }) {
  const Tag = as;
  return (
    <Tag
      style={{
        fontFamily: "'Geist', sans-serif",
        fontWeight: 700,
        fontSize: size,
        lineHeight: size >= 72 ? 1.0 : 1.05,
        letterSpacing: size >= 80 ? "-0.04em" : size >= 72 ? "-0.035em" : "-0.025em",
        color: "var(--ink-1)",
        margin: 0,
        textWrap: "pretty",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// ---------- Reveal on scroll ----------
function Reveal({ children, delay = 0, y = 16, as = "div", style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity 700ms cubic-bezier(.16,1,.3,1) ${delay}ms, transform 700ms cubic-bezier(.16,1,.3,1) ${delay}ms`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// ---------- CountUp ----------
function CountUp({ to, duration = 1400, prefix = "", suffix = "", decimals = 0 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const step = (t) => {
              const p = Math.min(1, (t - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(to * eased);
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  const display = decimals > 0 ? val.toFixed(decimals) : Math.round(val).toLocaleString();
  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

// Inject the pulse keyframes once.
(function injectPulse() {
  if (document.getElementById("vsg-pulse-kf")) return;
  const s = document.createElement("style");
  s.id = "vsg-pulse-kf";
  s.textContent = `
@keyframes vsg-pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.30; } }
@keyframes vsg-marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
@keyframes vsg-caret { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
@keyframes vsg-orbit { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
@keyframes vsg-fadein { 0% { opacity: 0; transform: translateY(8px); } 100% { opacity: 1; transform: translateY(0); } }
@keyframes vsg-tile-in { 0% { opacity: 0; } 100% { opacity: 1; } }

/* ACE token motion */
@keyframes vsg-float-front {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%      { transform: translateX(-50%) translateY(-8px); }
}
@keyframes vsg-float-mid {
  0%, 100% { transform: translateX(-50%) translateY(-10px) rotate(2deg); }
  50%      { transform: translateX(-50%) translateY(-16px) rotate(2deg); }
}
@keyframes vsg-float-back {
  0%, 100% { transform: translateX(-50%) translateY(-20px) rotate(-3deg); }
  50%      { transform: translateX(-50%) translateY(-26px) rotate(-3deg); }
}
@keyframes vsg-drift {
  0%, 100% { transform: translate(0,0); }
  50%      { transform: translate(4px, -8px); }
}
@keyframes vsg-bar-grow {
  0%   { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}
@keyframes vsg-chip-float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@keyframes vsg-typeline { 0% { stroke-dashoffset: 100%; } 100% { stroke-dashoffset: 0; } }

/* Responsive — collapse multi-col grids on narrow viewports */
@media (max-width: 980px) {
  [data-vsg-grid-2], [data-vsg-grid-3], [data-vsg-grid-4] { grid-template-columns: 1fr !important; }
}
@media (max-width: 720px) {
  body { font-size: 16px; }
  /* nudge containers tighter */
  .vsg-container, [data-vsg-container] { padding-left: 20px !important; padding-right: 20px !important; }
}
`;
  document.head.appendChild(s);
})();

Object.assign(window, {
  Eyebrow, StatusPill, PrimaryButton, OutlineButton,
  Section, Container, FeatureItem, Headline, Reveal, CountUp,
});
