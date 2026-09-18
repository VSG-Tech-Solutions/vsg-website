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
// Live carries the brand accent (shipped = on-brand); anything not-yet-live
// gets amber. They used to share the accent colour, which made "in production"
// and "on the roadmap" render identically — a truth problem, not just a visual one.
function StatusPill({ variant = "live", children, style }) {
  const isLive = variant === "live";
  const color = isLive ? "var(--live)" : "var(--amber)";
  const bg = isLive ? "var(--live-soft)" : "var(--amber-soft)";
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
// Hover and press live in CSS (.vsg-btn in colors_and_type.css), not in React
// state. onMouseEnter fires on tap, so the old JS-hover version left phones
// stuck in a hover state after every press, and had no :active feedback at all.
// CSS also gets us hover gated behind `(hover: hover) and (pointer: fine)`,
// a real `scale(0.97)` press, and reduced-motion support for free.
function PrimaryButton({ children, onClick, as = "button", href, size = "md", style, className = "", arrow = true, ...rest }) {
  const Tag = as;
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`vsg-btn vsg-btn--primary${size === "lg" ? " vsg-btn--lg" : ""} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
      {arrow && <span className="vsg-btn__arrow" aria-hidden="true">→</span>}
    </Tag>
  );
}

function OutlineButton({ children, onClick, as = "button", href, size = "md", style, className = "", ...rest }) {
  const Tag = as;
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`vsg-btn vsg-btn--ghost${size === "lg" ? " vsg-btn--lg" : ""} ${className}`.trim()}
      style={style}
      {...rest}
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

// ---------- FeatureItem (accent bullet) ----------
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
// Reduced motion means fewer and gentler animations, not zero: the opacity
// fade still aids comprehension, the upward travel is what causes trouble.
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Reveal({ children, delay = 0, y = 16, as = "div", style }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const reduced = prefersReducedMotion();
  if (reduced) y = 0;
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
        transition: `opacity 600ms var(--ease-out) ${delay}ms, transform 600ms var(--ease-out) ${delay}ms`,
        // Drop the compositing-layer hint once the reveal has played. Leaving
        // it on pins a GPU layer per Reveal for the life of the page.
        willChange: shown ? "auto" : "opacity, transform",
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
/* Nothing in the real world appears from nothing, so the panel starts at a
   visible 0.96 rather than scale(0). Origin stays centre: a modal is not
   anchored to its trigger the way a popover is. */
@keyframes vsg-modal-in {
  0%   { opacity: 0; transform: scale(0.96); }
  100% { opacity: 1; transform: scale(1); }
}
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

// ---------- Mount ----------
// Page entries used to defer their first render to requestAnimationFrame,
// which browsers do not fire while a tab is in the background. Opening any
// page in a new background tab (middle-click, ctrl-click, a restored session)
// therefore left it blank until it was focused. Nothing needs waiting for:
// Babel runs these scripts in document order, so every dependency is already
// defined by the time a page entry executes.
function vsgMount(render) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render, { once: true });
  } else {
    render();
  }
}

Object.assign(window, {
  Eyebrow, StatusPill, PrimaryButton, OutlineButton,
  Section, Container, FeatureItem, Headline, Reveal, CountUp, vsgMount,
});
