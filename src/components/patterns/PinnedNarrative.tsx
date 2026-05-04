"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

/**
 * PinnedNarrative — STR8FIRE-style scroll-pinned numbered storytelling.
 *
 * Layout: 50/50 split. The LEFT pane sticks pinned to the viewport; the
 * RIGHT pane scrolls through `beats.length` slides. As the user scrolls,
 * the active beat fades + slides into view on the right while previous
 * beats fade out. The left pane can either stay static or render a beat-
 * specific visual (controlled by `leftSync`).
 *
 * The container is `beats.length × 100vh` tall, so the user gets a beat
 * per viewport-height of scroll.
 *
 * Each beat renders:
 *   - tiny slash-prefix eyebrow ("/ WHAT WE OFFER")
 *   - hairline rule
 *   - giant numbered label ("01")
 *   - oversized display value ("$3TN" / "RWA" / "5 weeks")
 *   - small explanation paragraph
 *
 * Used on homepage + /vantage to walk through Vantage's value props in a
 * cinematic way.
 */

export type Beat = {
  /** Tiny slash-eyebrow label, e.g. "WHAT WE OFFER". */
  eyebrow: string;
  /** The big display value, e.g. "$3TN", "RWA", "5 WEEKS". */
  display: string;
  /** Optional small kicker (e.g. "Pilot cohort"). */
  kicker?: string;
  /** Body explanation, 1-3 sentences. */
  body: string;
  /** Optional left-pane content for this beat (when leftSync=true).
   *  e.g. an image or a custom JSX visual. If absent, left pane shows
   *  the `defaultLeft` prop. */
  left?: ReactNode;
};

type PinnedNarrativeProps = {
  /** Default content shown in the left pane (when leftSync is false, or
   *  when a beat doesn't define its own `left`). */
  defaultLeft?: ReactNode;
  /** When true, the left pane crossfades to each beat's `left`. When
   *  false (default), left pane stays static throughout. */
  leftSync?: boolean;
  beats: Beat[];
};

export const PinnedNarrative: React.FC<PinnedNarrativeProps> = ({
  defaultLeft,
  leftSync = false,
  beats,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const prefersReduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative w-full"
      style={{ height: `${beats.length * 100}vh` }}
    >
      <div className="sticky top-0 left-0 right-0 h-screen overflow-hidden">
        <div className="relative h-full grid lg:grid-cols-2">
          {/* Left pane */}
          <div
            className="relative hidden lg:flex items-center justify-center px-10 lg:px-16 border-r"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--bg)",
            }}
          >
            {leftSync ? (
              <LeftSync
                beats={beats}
                scrollYProgress={scrollYProgress}
                defaultLeft={defaultLeft}
              />
            ) : (
              <div className="w-full max-w-md">
                {defaultLeft ?? null}
              </div>
            )}
          </div>

          {/* Right pane — beats stack overlaid, fade based on scroll */}
          <div
            className="relative h-full flex items-center px-6 sm:px-10 lg:px-16"
            style={{ background: "var(--bg)" }}
          >
            {beats.map((beat, i) => {
              if (prefersReduce) {
                return (
                  <div key={i} className="absolute inset-0 px-6 sm:px-10 lg:px-16 py-20 flex items-center">
                    <BeatContent beat={beat} index={i} total={beats.length} />
                  </div>
                );
              }
              return (
                <BeatRight
                  key={i}
                  beat={beat}
                  index={i}
                  total={beats.length}
                  scrollYProgress={scrollYProgress}
                />
              );
            })}
          </div>
        </div>

        {/* Progress dots — top right */}
        <div className="absolute top-6 right-6 flex items-center gap-1.5 z-10">
          {beats.map((_, i) => (
            <ProgressDot
              key={i}
              index={i}
              total={beats.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Right-side beat — each beat fades + slides in based on scrollYProgress.    */
/* -------------------------------------------------------------------------- */
const BeatRight: React.FC<{
  beat: Beat;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}> = ({ beat, index, total, scrollYProgress }) => {
  // Beat i is fully visible when progress is in [i/total, (i+1)/total].
  const start = index / total;
  const end = (index + 1) / total;
  const buffer = 1 / (total * 4);

  const opacity = useTransform(
    scrollYProgress,
    [start - buffer, start + buffer, end - buffer, end + buffer],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start - buffer, start + buffer, end - buffer, end + buffer],
    [40, 0, 0, -40]
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 px-6 sm:px-10 lg:px-16 py-20 flex items-center"
    >
      <BeatContent beat={beat} index={index} total={total} />
    </motion.div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Beat content — eyebrow + number + giant display + body.                    */
/* -------------------------------------------------------------------------- */
const BeatContent: React.FC<{
  beat: Beat;
  index: number;
  total: number;
}> = ({ beat, index, total }) => (
  <div className="w-full max-w-2xl">
    <Eyebrow variant="slash">{beat.eyebrow}</Eyebrow>
    <div
      className="mt-6 pt-6 border-t flex items-baseline gap-5 sm:gap-7"
      style={{ borderColor: "var(--card-border)" }}
    >
      <span
        className="font-extrabold tabular-nums leading-none"
        style={{
          color: "var(--muted-2)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          letterSpacing: "-0.02em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        className="font-extrabold leading-[0.9]"
        style={{
          color: "var(--accent-2)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(3.25rem, 9vw, 8rem)",
          letterSpacing: "-0.045em",
        }}
      >
        {beat.display}
      </h3>
    </div>
    {beat.kicker && (
      <div
        className="mt-7 text-[11px] uppercase tracking-[0.22em]"
        style={{
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        {beat.kicker}
      </div>
    )}
    <p
      className="mt-5 max-w-md text-base sm:text-lg leading-relaxed"
      style={{
        color: "var(--muted)",
        fontFamily: "var(--font-body)",
      }}
    >
      {beat.body}
    </p>
    <div
      className="mt-10 text-[10px] uppercase tracking-[0.22em] tabular-nums"
      style={{
        color: "var(--muted-2)",
        fontFamily: "var(--font-body)",
      }}
    >
      {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Progress dots — top right corner shows current beat.                       */
/* -------------------------------------------------------------------------- */
const ProgressDot: React.FC<{
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}> = ({ index, total, scrollYProgress }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(
    scrollYProgress,
    [start, end],
    [0.25, 1]
  );
  const width = useTransform(
    scrollYProgress,
    [start, end],
    ["20px", "32px"]
  );
  return (
    <motion.span
      style={{
        opacity,
        width,
        height: "2px",
        background: "var(--accent-2)",
      }}
      className="rounded-full"
    />
  );
};

/* -------------------------------------------------------------------------- */
/*  Left pane — synced visuals per beat (crossfade).                            */
/* -------------------------------------------------------------------------- */
const LeftSync: React.FC<{
  beats: Beat[];
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  defaultLeft?: ReactNode;
}> = ({ beats, scrollYProgress, defaultLeft }) => (
  <div className="relative w-full max-w-md h-full flex items-center">
    {beats.map((beat, i) => (
      <LeftBeat
        key={i}
        index={i}
        total={beats.length}
        scrollYProgress={scrollYProgress}
      >
        {beat.left ?? defaultLeft}
      </LeftBeat>
    ))}
  </div>
);

const LeftBeat: React.FC<{
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  children: ReactNode;
}> = ({ index, total, scrollYProgress, children }) => {
  const start = index / total;
  const end = (index + 1) / total;
  const buffer = 1 / (total * 4);

  const opacity = useTransform(
    scrollYProgress,
    [start - buffer, start + buffer, end - buffer, end + buffer],
    index === 0
      ? [1, 1, 1, 0]
      : index === total - 1
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0]
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 flex items-center">
      {children}
    </motion.div>
  );
};
