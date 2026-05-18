"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Workflow,
  Brain,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";

/**
 * ServicesTracks — the three service tracks on /services.
 *
 * Restructured for solidity:
 *   • Whole section sits inside one large rounded container card so the
 *     three tracks read as one offering, not three orphans floating in
 *     space.
 *   • Each track gets a custom 4:5-ratio animated visual instead of a
 *     ribbon strip, so the visual carries weight.
 *   • All three animations rebuilt — see comments at each.
 */

const ease = [0.16, 1, 0.3, 1] as const;

export const ServicesTracks: React.FC = () => {
  return (
    <div className="relative">
      {/* Section header */}
      <div className="max-w-3xl mb-12">
        <div
          className="text-[11px] uppercase tracking-[0.32em] font-semibold flex items-center gap-3"
          style={{ color: "var(--muted-2)", fontFamily: "var(--font-body)" }}
        >
          <span
            className="inline-block w-8 h-px"
            style={{ background: "var(--muted-2)" }}
          />
          Three tracks
        </div>
        <h2
          className="mt-5 font-extrabold"
          style={{
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.03em",
            fontSize: "clamp(2.25rem, 5vw, 4.4rem)",
            lineHeight: 0.95,
            color: "var(--fg)",
          }}
        >
          What we build{" "}
          <span style={{ color: "var(--accent)" }}>when</span>
          <br />
          Vantage isn&rsquo;t the answer.
        </h2>
        <p
          className="mt-6 text-base sm:text-lg leading-relaxed max-w-2xl"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          Some problems need a product. Some need a custom build.
          We&rsquo;re honest about which is which — and we won&rsquo;t
          sell you Vantage if a 6-week custom engagement is the right
          thing.
        </p>
      </div>

      {/* Solid containment frame — the three cards live INSIDE a single
          larger rounded panel so they read as one offering instead of
          three orphans. */}
      <div
        className="relative rounded-3xl p-3 sm:p-4 lg:p-5"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-elev) 0%, var(--bg) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow:
            "inset 0 1px 0 rgba(255, 255, 255, 0.04), 0 30px 80px -30px rgba(0, 0, 0, 0.6)",
        }}
      >
        {/* Subtle dotted backdrop inside the frame */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgba(255,255,255,0.04) 1px, transparent 1.2px)",
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0) 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.6) 30%, rgba(0,0,0,0) 90%)",
          }}
        />

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <TrackCard
            icon={Code2}
            eyebrow="Track 01"
            kicker="Bespoke"
            title="Bespoke software"
            body="Production-grade platforms — multi-tenant SaaS, internal tools, customer-facing apps. Built like Vantage was: same senior bench, same audit-trail discipline, same fixed-price cadence. Owned outright when we hand it over."
            tags={["Multi-tenant", "Audit trail", "Fixed price", "Owned"]}
            background={<BlueprintBackground />}
          />
          <TrackCard
            icon={Cpu}
            eyebrow="Track 02"
            kicker="AI"
            title="Custom AI systems"
            body="AI built for your operation, not the average. AI that reads your documents and answers questions on them, AI that takes action inside your workflows, AI that spots the patterns your team is too busy to. Integrated where the work happens — never parachuted in as a separate tool."
            tags={["On your data", "Reads documents", "Takes action", "Learns patterns"]}
            background={<OrbitBackground />}
            accent
          />
          <TrackCard
            icon={Workflow}
            eyebrow="Track 03"
            kicker="Automation"
            title="AI workflow automation"
            body="End-to-end automation across the systems your team already uses. AI captures from email, chat and forms, classifies what arrived, routes it to the right person, escalates on SLA, and writes the audit trail. We design the flow, build the integrations, and hand it over running on your stack."
            tags={["Capture", "Classify", "Route", "Audit"]}
            background={<PipelineBackground />}
          />
        </div>
      </div>
    </div>
  );
};

/* ---------------- Track card ---------------- */

const TrackCard: React.FC<{
  icon: typeof Code2;
  eyebrow: string;
  kicker: string;
  title: string;
  body: string;
  tags: string[];
  background: React.ReactNode;
  accent?: boolean;
}> = ({ icon: Icon, eyebrow, kicker, title, body, tags, background, accent }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
      className="on-dark-card relative rounded-2xl overflow-hidden flex flex-col h-full"
      style={{
        background: accent
          ? "linear-gradient(180deg, var(--card-bg-accent) 0%, var(--card-bg-accent-2) 100%)"
          : "linear-gradient(180deg, var(--card-bg) 0%, var(--card-bg-2) 100%)",
        border: `1px solid ${
          accent ? "var(--card-border-accent-strong)" : "rgba(255, 255, 255, 0.10)"
        }`,
        boxShadow:
          "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 24px 60px -24px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Visual panel — taller, 4:5 ratio so the visual carries weight */}
      <div
        className="relative aspect-[5/4] overflow-hidden"
        style={{
          background: accent
            ? "linear-gradient(180deg, rgba(244,168,114,0.10) 0%, rgba(244,168,114,0.02) 100%)"
            : "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)",
          borderBottom: `1px solid ${
            accent ? "rgba(244, 168, 114, 0.20)" : "rgba(255, 255, 255, 0.07)"
          }`,
        }}
      >
        {background}

        {/* Track label top-left */}
        <div className="absolute top-5 left-5">
          <div
            className="text-[9.5px] uppercase tracking-[0.32em] font-semibold font-mono"
            style={{
              color: accent ? "var(--accent)" : "var(--muted-2)",
              fontFamily:
                "var(--font-space-mono), ui-monospace, monospace",
            }}
          >
            {eyebrow}
          </div>
          <div
            className="mt-1 text-[14px] uppercase tracking-[0.18em] font-semibold"
            style={{
              color: accent ? "var(--accent)" : "var(--fg)",
              fontFamily: "var(--font-body)",
            }}
          >
            {kicker}
          </div>
        </div>

        {/* Icon corner — bottom-left, glass-blurred */}
        <div className="absolute bottom-5 left-5">
          <span
            className="inline-flex items-center justify-center w-12 h-12 rounded-xl"
            style={{
              background: accent
                ? "var(--accent-soft)"
                : "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: `1px solid ${
                accent
                  ? "var(--accent-glow)"
                  : "rgba(255, 255, 255, 0.14)"
              }`,
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.10), 0 8px 24px -8px rgba(0,0,0,0.4)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          >
            <Icon
              className="w-5 h-5"
              style={{ color: accent ? "var(--accent)" : "rgba(255,255,255,0.92)" }}
              strokeWidth={1.6}
            />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-7 sm:p-8 flex flex-col flex-1">
        <h3
          className="font-bold"
          style={{
            color: "var(--fg)",
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 1.85vw, 1.65rem)",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>

        <p
          className="mt-4 text-[14px] leading-relaxed flex-1"
          style={{
            color: "var(--muted)",
            fontFamily: "var(--font-body)",
          }}
        >
          {body}
        </p>

        {/* Tag chips */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] uppercase tracking-[0.16em] font-mono font-semibold"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "var(--muted-2)",
                fontFamily:
                  "var(--font-space-mono), ui-monospace, monospace",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- Animated backgrounds — all three rebuilt ---------------- */

/**
 * BlueprintBackground — for Bespoke software.
 *
 * Architectural blueprint: a wireframe building footprint drawn line-by-line
 * (animated path drawing), with a faint isometric grid behind. Reads as
 * "we build production-grade platforms," not "we render abstract pixels."
 */
const BlueprintBackground: React.FC = () => {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <defs>
        <linearGradient id="bp-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
        </linearGradient>
      </defs>

      {/* Isometric grid lines */}
      <g
        stroke="rgba(255,255,255,0.06)"
        strokeWidth={0.4}
        fill="none"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`d1-${i}`}
            x1={i * 22 - 80}
            y1={0}
            x2={i * 22}
            y2={160}
          />
        ))}
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`d2-${i}`}
            x1={i * 22 + 80}
            y1={0}
            x2={i * 22}
            y2={160}
          />
        ))}
      </g>

      {/* Building wireframe — animated draw */}
      <g stroke="rgba(255,255,255,0.55)" strokeWidth={0.7} fill="none">
        {/* Floor outline (parallelogram, isometric) */}
        <motion.path
          d="M 60 110 L 140 110 L 160 90 L 80 90 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6, ease, repeat: Infinity, repeatDelay: 4 }}
        />
        {/* Walls — verticals */}
        <motion.path
          d="M 60 110 L 60 60"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.6,
            ease,
            repeat: Infinity,
            repeatDelay: 5,
            delay: 1.6,
          }}
        />
        <motion.path
          d="M 140 110 L 140 60"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.6,
            ease,
            repeat: Infinity,
            repeatDelay: 5,
            delay: 1.7,
          }}
        />
        <motion.path
          d="M 160 90 L 160 40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.6,
            ease,
            repeat: Infinity,
            repeatDelay: 5,
            delay: 1.8,
          }}
        />
        <motion.path
          d="M 80 90 L 80 40"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 0.6,
            ease,
            repeat: Infinity,
            repeatDelay: 5,
            delay: 1.9,
          }}
        />
        {/* Roof outline */}
        <motion.path
          d="M 60 60 L 140 60 L 160 40 L 80 40 Z"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 1.2,
            ease,
            repeat: Infinity,
            repeatDelay: 4,
            delay: 2.5,
          }}
        />
      </g>

      {/* Floor fill — fades in after the outline draws */}
      <motion.path
        d="M 60 110 L 140 110 L 160 90 L 80 90 Z"
        fill="url(#bp-fade)"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.6, 0.6, 0] }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0,
          delay: 3.5,
        }}
      />

      {/* Corner ticks */}
      {[
        [60, 110],
        [140, 110],
        [160, 90],
        [80, 90],
      ].map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={1.2}
          fill="rgba(255,255,255,0.85)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1 + i * 0.2,
          }}
        />
      ))}
    </svg>
  );
};

/**
 * OrbitBackground — for Custom AI systems.
 *
 * A central pulsing core with three concentric rings of orbiting amber
 * dots at different radii and speeds. Reads as "intelligence at the
 * centre, signals coming and going." Cleaner than the neural-network
 * scribble it replaces.
 */
const OrbitBackground: React.FC = () => {
  // Three rings: radius, dot count, duration.
  const rings = [
    { r: 32, count: 3, dur: 8, dot: 1.6 },
    { r: 50, count: 5, dur: 14, dot: 1.4 },
    { r: 70, count: 8, dur: 22, dot: 1.2 },
  ];

  return (
    <svg
      aria-hidden
      viewBox="-100 -80 200 160"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      {/* Faint ring guides */}
      {rings.map((ring, i) => (
        <circle
          key={`ring-${i}`}
          cx={0}
          cy={0}
          r={ring.r}
          fill="none"
          stroke="var(--accent-soft)"
          strokeWidth={0.3}
          strokeDasharray="1.5 3"
        />
      ))}

      {/* Central core — pulsing dot */}
      <motion.circle
        cx={0}
        cy={0}
        r={6}
        fill="var(--accent)"
        animate={{
          r: [5, 7, 5],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Core halo */}
      <motion.circle
        cx={0}
        cy={0}
        r={12}
        fill="var(--accent)"
        opacity={0.3}
        animate={{
          r: [10, 16, 10],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbiting dots — each ring rotates as a group */}
      {rings.map((ring, ri) => (
        <motion.g
          key={`orbit-${ri}`}
          animate={{ rotate: 360 }}
          transition={{
            duration: ring.dur,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{ transformOrigin: "0px 0px" }}
        >
          {Array.from({ length: ring.count }).map((_, di) => {
            const angle = (di / ring.count) * Math.PI * 2;
            const x = Math.cos(angle) * ring.r;
            const y = Math.sin(angle) * ring.r;
            return (
              <g key={di}>
                {/* Halo */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={ring.dot * 2.5}
                  fill="var(--accent)"
                  opacity={0.18}
                  animate={{ opacity: [0.10, 0.25, 0.10] }}
                  transition={{
                    duration: 2.4 + di * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: di * 0.15,
                  }}
                />
                {/* Dot */}
                <motion.circle
                  cx={x}
                  cy={y}
                  r={ring.dot}
                  fill="var(--accent)"
                  animate={{
                    r: [ring.dot * 0.85, ring.dot * 1.2, ring.dot * 0.85],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 2 + di * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: di * 0.18,
                  }}
                />
              </g>
            );
          })}
        </motion.g>
      ))}

      {/* Faint connecting beams from core to outer ring */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const x2 = Math.cos(angle) * 70;
        const y2 = Math.sin(angle) * 70;
        return (
          <motion.line
            key={`beam-${i}`}
            x1={0}
            y1={0}
            x2={x2}
            y2={y2}
            stroke="rgba(244, 168, 114, 0.15)"
            strokeWidth={0.25}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        );
      })}
    </svg>
  );
};

/**
 * PipelineBackground — for AI workflow automation.
 *
 * A node-and-edge pipeline: input nodes feeding into a central "AI"
 * decision junction that branches to multiple output nodes (escalate /
 * route / audit). Tokens travel through the pipeline. Reads as
 * "intelligence routing work end-to-end."
 */
const PipelineBackground: React.FC = () => {
  // Layout (200x160 viewBox)
  const inputs = [
    { x: 30, y: 40, label: "@" },
    { x: 30, y: 80, label: "📄" },
    { x: 30, y: 120, label: "▶" },
  ];
  const ai = { x: 100, y: 80 };
  const outputs = [
    { x: 170, y: 40 },
    { x: 170, y: 80 },
    { x: 170, y: 120 },
  ];

  return (
    <svg
      aria-hidden
      viewBox="0 0 200 160"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      {/* Input lines */}
      {inputs.map((inp, i) => (
        <line
          key={`in-${i}`}
          x1={inp.x}
          y1={inp.y}
          x2={ai.x}
          y2={ai.y}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth={0.4}
          strokeDasharray="2 3"
        />
      ))}

      {/* Output lines */}
      {outputs.map((out, i) => (
        <line
          key={`out-${i}`}
          x1={ai.x}
          y1={ai.y}
          x2={out.x}
          y2={out.y}
          stroke="rgba(255,255,255,0.14)"
          strokeWidth={0.4}
          strokeDasharray="2 3"
        />
      ))}

      {/* Travelling tokens — input → AI */}
      {inputs.map((inp, i) => (
        <motion.circle
          key={`tok-in-${i}`}
          r={1.6}
          fill="rgba(255,255,255,0.95)"
          initial={{ cx: inp.x, cy: inp.y, opacity: 0 }}
          animate={{
            cx: [inp.x, ai.x],
            cy: [inp.y, ai.y],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}

      {/* Travelling tokens — AI → output */}
      {outputs.map((out, i) => (
        <motion.circle
          key={`tok-out-${i}`}
          r={1.6}
          fill="rgba(255,255,255,0.95)"
          initial={{ cx: ai.x, cy: ai.y, opacity: 0 }}
          animate={{
            cx: [ai.x, out.x],
            cy: [ai.y, out.y],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2 + i * 0.8,
          }}
        />
      ))}

      {/* Input nodes */}
      {inputs.map((inp, i) => (
        <g key={`node-in-${i}`}>
          <circle
            cx={inp.x}
            cy={inp.y}
            r={4}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.30)"
            strokeWidth={0.5}
          />
          <motion.circle
            cx={inp.x}
            cy={inp.y}
            r={4}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={0.6}
            initial={{ r: 4, opacity: 0 }}
            animate={{ r: [4, 8, 4], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.8,
            }}
          />
        </g>
      ))}

      {/* AI junction — bigger, amber, pulsing */}
      <g>
        <motion.circle
          cx={ai.x}
          cy={ai.y}
          r={9}
          fill="var(--accent-soft)"
          stroke="var(--accent-strong)"
          strokeWidth={0.8}
          animate={{
            r: [8, 10, 8],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.circle
          cx={ai.x}
          cy={ai.y}
          r={4}
          fill="var(--accent)"
          animate={{
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </g>
      {/* AI label */}
      <text
        x={ai.x}
        y={ai.y + 1.5}
        textAnchor="middle"
        fontSize="3.2"
        fontWeight="700"
        fill="#100A06"
        fontFamily="var(--font-body), system-ui"
        style={{ letterSpacing: "0.5px" }}
      >
        AI
      </text>

      {/* Output nodes */}
      {outputs.map((out, i) => (
        <g key={`node-out-${i}`}>
          <circle
            cx={out.x}
            cy={out.y}
            r={4}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.30)"
            strokeWidth={0.5}
          />
          <motion.circle
            cx={out.x}
            cy={out.y}
            r={4}
            fill="none"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={0.6}
            initial={{ r: 4, opacity: 0 }}
            animate={{ r: [4, 8, 4], opacity: [0, 0.5, 0] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1.2 + i * 0.8,
            }}
          />
        </g>
      ))}
    </svg>
  );
};
