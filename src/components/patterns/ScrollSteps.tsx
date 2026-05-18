"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Eyebrow } from "./Eyebrow";
import { DisplayHead } from "./DisplayHead";

/**
 * ScrollSteps — clean 4-step layout with scroll-driven reveal.
 *
 * Replaces the PinnedNarrative experiment. Sits in a single ~1.2 viewport-
 * height section (no pinning, no 4× viewport height container, no broken
 * sticky behaviour). Each step is a column in a 4-up grid on lg, stacked
 * 2-up on md, single-col on mobile.
 *
 * As the section enters the viewport, the steps fade-up + cascade with
 * a 90ms stagger. A horizontal accent rail underneath lights up
 * progressively as user scrolls through the section — gives the same
 * "narrative advances" feeling as the pinned pattern, but in a compact,
 * always-visible layout that always works.
 *
 * The number on each step animates in size as the section progresses.
 */

export type ScrollStep = {
  /** Eyebrow above the display (e.g. "What Vantage is"). */
  eyebrow: string;
  /** The big display value, e.g. "ONE", "PER MODULE", "5 WEEKS". */
  display: string;
  /** Body explanation. */
  body: string;
};

type ScrollStepsProps = {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  steps: ScrollStep[];
};

const ease = [0.16, 1, 0.3, 1] as const;

export const ScrollSteps: React.FC<ScrollStepsProps> = ({
  eyebrow,
  title,
  accent,
  description,
  steps,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const prefersReduce = useReducedMotion();

  // Rail fill — accent line under all steps that fills as you scroll.
  const railWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref}>
      {/* Header */}
      <div className="max-w-3xl">
        {eyebrow && <Eyebrow variant="slash">{eyebrow}</Eyebrow>}
        <div className={eyebrow ? "mt-6" : ""}>
          <DisplayHead level="h2" accent={accent}>
            {title}
          </DisplayHead>
        </div>
        {description && (
          <p
            className="mt-7 text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            {description}
          </p>
        )}
      </div>

      {/* Progress rail */}
      <div
        className="relative mt-16 mb-12 h-px"
        style={{ background: "var(--card-border)" }}
      >
        {!prefersReduce && (
          <motion.div
            className="absolute inset-y-0 left-0 origin-left"
            style={{
              width: railWidth,
              background:
                "linear-gradient(to right, var(--accent), var(--accent-2))",
              boxShadow: "0 0 12px var(--accent-glow)",
            }}
          />
        )}
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--card-border)" }}>
        {steps.map((step, i) => (
          <StepCell
            key={i}
            step={step}
            index={i}
            total={steps.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
};

const StepCell: React.FC<{
  step: ScrollStep;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}> = ({ step, index, total, scrollYProgress }) => {
  const prefersReduce = useReducedMotion();

  // Each step "activates" as scroll passes its threshold.
  const start = Math.max(0, index / total - 0.05);
  const end = Math.min(1, (index + 1) / total);

  const numberOpacity = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end],
    [0.25, 0.6, 1]
  );

  return (
    <motion.div
      className="relative p-8 sm:p-10 lg:p-12 group"
      style={{ background: "var(--bg)" }}
      initial={prefersReduce ? false : { opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.85,
        ease,
        delay: 0.15 + index * 0.09,
      }}
    >
      {/* Number */}
      <motion.div
        className="font-extrabold tabular-nums leading-none"
        style={{
          color: "var(--accent-2)",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.04em",
          fontSize: "clamp(2rem, 3.5vw, 2.75rem)",
          opacity: prefersReduce ? 1 : numberOpacity,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.div>

      {/* Eyebrow */}
      <div
        className="mt-8 text-[10px] uppercase tracking-[0.22em]"
        style={{
          color: "var(--muted-2)",
          fontFamily: "var(--font-body)",
        }}
      >
        <span style={{ color: "var(--accent-2)" }}>/</span> {step.eyebrow}
      </div>

      {/* Display value */}
      <h3
        className="mt-3 font-extrabold leading-[0.95]"
        style={{
          color: "var(--fg)",
          fontFamily: "var(--font-display)",
          letterSpacing: "-0.03em",
          fontSize: "clamp(1.6rem, 2.4vw, 2rem)",
        }}
      >
        {step.display}
      </h3>

      {/* Body */}
      <p
        className="mt-5 text-sm sm:text-base leading-relaxed"
        style={{
          color: "var(--muted)",
          fontFamily: "var(--font-body)",
        }}
      >
        {step.body}
      </p>
    </motion.div>
  );
};
