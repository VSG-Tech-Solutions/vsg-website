"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Mail, Brain, ArrowRightCircle, ShieldCheck } from "lucide-react";
import { MonolithSilhouette } from "./MonolithSilhouette";

/**
 * ExceptionFlowScroll — scroll-pinned product narrative.
 *
 * Outer wrapper is 400vh tall; an inner 100svh div is `position: sticky`,
 * so for ~3 viewport heights of scroll, this section stays on screen and
 * we drive its contents from the scroll progress.
 *
 * Four beats advance in sequence — Inbound · Classify · Route · Resolve —
 * each owning a slice of the 0..1 scroll range. A cyan timeline rail fills
 * across the slices as the user scrolls.
 */

type Beat = {
  index: number;
  eyebrow: string;
  title: string;
  body: string;
  icon: typeof Mail;
};

const BEATS: Beat[] = [
  {
    index: 1,
    eyebrow: "01 · Inbound",
    title: "An exception lands in the queue.",
    body: "Supplier emails late on a PO. The message is parsed, attachments captured, sender matched to a known vendor. Nothing routed yet — just received, timestamped, audit trail open.",
    icon: Mail,
  },
  {
    index: 2,
    eyebrow: "02 · Classify",
    title: "Exception AI tags it in seconds.",
    body: "Module-specific AI — trained on your exception history — labels the type, assigns severity, attaches the relevant PO and supplier scorecard.",
    icon: Brain,
  },
  {
    index: 3,
    eyebrow: "03 · Route",
    title: "Routed to the right operator.",
    body: "Routing rules — written in plain English — match the exception to the operator who owns it. SLA clock starts. Escalation path armed if it trips.",
    icon: ArrowRightCircle,
  },
  {
    index: 4,
    eyebrow: "04 · Resolve",
    title: "Closed in one click. Audit log writes itself.",
    body: "Operator approves with one click. Decision, evidence and timing log automatically. ERP updates. The buyer sees the same outcome — hours sooner.",
    icon: ShieldCheck,
  },
];

const RANGES: [number, number][] = [
  [0.0, 0.22],
  [0.22, 0.46],
  [0.46, 0.70],
  [0.70, 1.0],
];

const ease = [0.16, 1, 0.3, 1] as const;

export const ExceptionFlowScroll: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const timelineFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={wrapRef}
      className="relative w-full"
      style={{
        height: "400vh",
        background: "var(--bg)",
      }}
    >
      <div
        className="sticky top-0 w-full overflow-hidden"
        style={{ height: "100svh" }}
      >
        {/* Monolith silhouette — same object as the hero, different format
            (wireframe SVG). Drifts subtly with scroll. Anchored far-right
            so it doesn't fight the copy column. */}
        <MonolithSilhouette anchor="right" topPct={50} width={520} />

        <div className="relative z-10 mx-auto max-w-7xl h-full px-5 sm:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT — copy column */}
          <div className="relative">
            <div
              className="text-[10px] uppercase tracking-[0.32em] mb-6"
              style={{ color: "var(--accent-2)" }}
            >
              How a module actually works
            </div>

            <div className="relative h-[360px]">
              {BEATS.map((beat, i) => (
                <BeatCopy
                  key={beat.index}
                  beat={beat}
                  range={RANGES[i]}
                  progress={scrollYProgress}
                />
              ))}
            </div>

            {/* Numbered timeline rail */}
            <div className="mt-10 relative">
              <div
                aria-hidden
                className="absolute top-3 left-0 right-0 h-px"
                style={{ background: "rgba(255,255,255,0.08)" }}
              />
              <motion.div
                aria-hidden
                className="absolute top-3 left-0 h-px"
                style={{ width: timelineFill, background: "var(--accent-2)" }}
              />
              <div className="relative flex justify-between">
                {BEATS.map((beat, i) => (
                  <BeatDot
                    key={beat.index}
                    label={String(beat.index).padStart(2, "0")}
                    range={RANGES[i]}
                    progress={scrollYProgress}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — stacked mockup cards */}
          <div className="relative h-[460px] sm:h-[520px]">
            {BEATS.map((beat, i) => (
              <BeatMockup
                key={beat.index}
                beat={beat}
                range={RANGES[i]}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- subcomponents ---------------- */

const BeatCopy: React.FC<{
  beat: Beat;
  range: [number, number];
  progress: MotionValue<number>;
}> = ({ beat, range, progress }) => {
  const [s, e] = range;
  const span = e - s;
  const inEnd = s + span * 0.3;
  const outStart = e - span * 0.2;

  const opacity = useTransform(progress, [s, inEnd, outStart, e], [0, 1, 1, 0]);
  const y = useTransform(progress, [s, inEnd, outStart, e], [40, 0, 0, -30]);

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity, y }}
      transition={{ ease, duration: 0.6 }}
    >
      <div
        className="text-xs uppercase tracking-[0.28em] mb-4"
        style={{ color: "var(--accent-2)" }}
      >
        {beat.eyebrow}
      </div>
      <h3
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.05] mb-5"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.025em",
        }}
      >
        {beat.title}
      </h3>
      <p
        className="text-base sm:text-lg leading-relaxed max-w-md"
        style={{ color: "var(--muted)" }}
      >
        {beat.body}
      </p>
    </motion.div>
  );
};

const BeatDot: React.FC<{
  label: string;
  range: [number, number];
  progress: MotionValue<number>;
}> = ({ label, range, progress }) => {
  const [s, e] = range;
  const lit = useTransform(progress, [s - 0.05, s, e, e + 0.05], [0, 1, 1, 0]);
  const dotBg = useTransform(
    lit,
    (v) => `rgba(255,255,255,${0.25 + v * 0.75})`
  );
  const labelOpacity = useTransform(lit, [0, 1], [0.4, 1]);
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        className="w-2 h-2 rounded-full"
        style={{ background: dotBg, marginTop: "8px" }}
      />
      <motion.div
        className="text-[10px] tracking-[0.2em]"
        style={{ color: "var(--muted-2)", opacity: labelOpacity }}
      >
        {label}
      </motion.div>
    </div>
  );
};

const BeatMockup: React.FC<{
  beat: Beat;
  range: [number, number];
  progress: MotionValue<number>;
}> = ({ beat, range, progress }) => {
  const [s, e] = range;
  const span = e - s;
  const inEnd = s + span * 0.3;
  const outStart = e - span * 0.2;

  const opacity = useTransform(progress, [s, inEnd, outStart, e], [0, 1, 1, 0]);
  const y = useTransform(progress, [s, inEnd, outStart, e], [60, 0, 0, -40]);
  const scale = useTransform(
    progress,
    [s, inEnd, outStart, e],
    [0.92, 1, 1, 0.96]
  );

  const Icon = beat.icon;

  return (
    <motion.div className="absolute inset-0" style={{ opacity, y, scale }}>
      <div
        className="relative h-full w-full rounded-2xl overflow-hidden border"
        style={{
          // Matte card surface — etched bg with a subtle rim-light along the
          // top edge (the M5 trick: it's the only thing that defines a card
          // when there's no glow underneath).
          background:
            "linear-gradient(180deg, #18181B, #0F0F11)",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 60px -20px rgba(0,0,0,0.6)",
        }}
      >
        {/* Faux app chrome */}
        <div
          className="flex items-center gap-2 px-5 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.05)" }}
        >
          {/* Monochrome traffic-light row — three gray steps instead of mac
              red/yellow/green. Keeps the "this is an app window" cue without
              breaking the matte palette. */}
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.25)" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.18)" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
          <div
            className="ml-3 text-[11px] uppercase tracking-[0.28em]"
            style={{ color: "var(--muted-2)" }}
          >
            Vantage · Exceptions
          </div>
        </div>

        <div className="p-6 sm:p-8 h-full flex flex-col">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
            style={{
              background: "rgba(255,255,255,0.10)",
              border: "1px solid rgba(255,255,255,0.25)",
            }}
          >
            <Icon className="w-6 h-6" style={{ color: "var(--accent-2)" }} />
          </div>

          <div
            className="text-xs uppercase tracking-[0.24em] mb-3"
            style={{ color: "var(--accent-2)" }}
          >
            {beat.eyebrow}
          </div>

          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-3 rounded"
                style={{
                  width: `${[92, 76, 84, 60][i]}%`,
                  background:
                    i === 0
                      ? "linear-gradient(90deg, rgba(255,255,255,0.55), rgba(255,255,255,0.05))"
                      : "rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>

          <div className="flex-1" />

          <div className="grid grid-cols-3 gap-3 mt-6">
            {["SLA", "Severity", "Owner"].map((k, i) => (
              <div
                key={k}
                className="rounded-lg px-3 py-2.5 border"
                style={{
                  borderColor: "rgba(255,255,255,0.06)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                <div
                  className="text-[10px] uppercase tracking-[0.2em]"
                  style={{ color: "var(--muted-2)" }}
                >
                  {k}
                </div>
                <div
                  className="text-sm font-semibold mt-1"
                  style={{ color: "var(--fg)" }}
                >
                  {["02:14", "High", "S. Reddy"][i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
