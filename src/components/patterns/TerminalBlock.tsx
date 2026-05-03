"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * TerminalBlock — JetBrains-mono mock output block showing Vantage in action.
 *
 * Lines stream in on scroll-into-view. Each line has an optional accent
 * marker on the left (▌). Used on /vantage to show "the operational layer"
 * concretely instead of describing it.
 */

export type TerminalLine = {
  /** Line text. Use {"<text>"} for words you want highlighted accent-2. */
  text: string;
  /** Treat the line as system output (muted) vs an event (fg). */
  kind?: "event" | "system" | "ok" | "error";
  /** Manual delay override, ms. */
  delay?: number;
};

type TerminalBlockProps = {
  /** Optional small label, e.g. "VANTAGE · SUPPLIER EXCEPTIONS". */
  label?: string;
  lines: TerminalLine[];
};

const kindColor = (kind?: TerminalLine["kind"]) => {
  switch (kind) {
    case "event":
      return "var(--fg)";
    case "ok":
      return "var(--accent-2)";
    case "error":
      return "#fca5a5";
    case "system":
    default:
      return "var(--muted)";
  }
};

const renderHighlighted = (text: string) => {
  // Replace `<word>` segments with highlighted spans.
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("`") && p.endsWith("`")) {
      return (
        <span
          key={i}
          style={{
            color: "var(--accent-2)",
            background: "var(--accent-soft)",
            padding: "0 0.3em",
            borderRadius: "3px",
          }}
        >
          {p.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{p}</span>;
  });
};

export const TerminalBlock: React.FC<TerminalBlockProps> = ({
  label,
  lines,
}) => {
  const prefersReduce = useReducedMotion();
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        borderColor: "var(--card-border)",
        background: "var(--bg-elev)",
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-3 border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <span className="flex gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
        </span>
        {label && (
          <span
            className="ml-3 text-[10px] uppercase tracking-[0.22em]"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            {label}
          </span>
        )}
      </div>
      <pre
        className="px-5 sm:px-7 py-6 sm:py-8 text-sm sm:text-[0.95rem] leading-[1.85] overflow-x-auto"
        style={{
          fontFamily:
            "var(--font-space-mono), ui-monospace, SFMono-Regular, monospace",
          color: "var(--muted)",
          margin: 0,
        }}
      >
        {lines.map((line, i) => {
          const baseDelay = line.delay ?? 0.25 + i * 0.18;
          const content = (
            <span style={{ color: kindColor(line.kind) }}>
              <span
                aria-hidden
                className="inline-block w-3 mr-2"
                style={{
                  color:
                    line.kind === "event" || line.kind === "ok"
                      ? "var(--accent-2)"
                      : "rgba(255,255,255,0.15)",
                }}
              >
                ▌
              </span>
              {renderHighlighted(line.text)}
            </span>
          );
          return (
            <div key={i}>
              {prefersReduce ? (
                content
              ) : (
                <motion.div
                  initial={{ opacity: 0, x: -6 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: baseDelay, ease: [0.16, 1, 0.3, 1] }}
                >
                  {content}
                </motion.div>
              )}
            </div>
          );
        })}
      </pre>
    </div>
  );
};
