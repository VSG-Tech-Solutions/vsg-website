"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * ProductFeatureCards — dark feature-card section.
 *
 * Three cards, each with:
 *   • A custom SVG "illustration" of the feature — subtle outlined UI
 *     shapes on a dark gradient with film-grain texture. Designed to
 *     blend with the dark canvas (NOT bright photos).
 *   • Title + short body below the illustration.
 *
 * The illustrations are abstract product UI hints, not literal — they
 * suggest the feature without showing it. Each one has a single soft
 * top-edge glow + faint horizontal/diagonal outlined shapes.
 */

const ease = [0.16, 1, 0.3, 1] as const;
const ORANGE = "#FF6B2C";

type CardProps = {
  illustration: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
};

const CARDS: CardProps[] = [
  {
    illustration: <ProcurementIllustration />,
    eyebrow: "Live · shipping today",
    title: "Procurement AI",
    body: "Drafts the order, ranks the quotes, runs the RFQ. Your buyer reviews, approves, or overrides — every override teaches the next cycle.",
    href: "/products/procurement-ai",
  },
  {
    illustration: <SchedulingIllustration />,
    eyebrow: "In active development",
    title: "Production Scheduling",
    body: "Proposes the production sequence, balances the line, reroutes around constraints — the floor manager works exceptions, not the plan.",
    href: "/products/production-scheduling",
  },
  {
    illustration: <ReceivingIllustration />,
    eyebrow: "In active development",
    title: "AI Receiving",
    body: "Captures the GRV at the dock. AI runs the three-way match, classifies variances, lifts AP exceptions with evidence already attached.",
    href: "/products/receiving",
  },
];

export const ProductFeatureCards: React.FC = () => {
  return (
    <section
      className="relative py-24 md:py-32"
      style={{ background: "hsl(var(--bg))" }}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl mx-auto text-center mb-14 md:mb-16"
        >
          <div
            className="text-[10px] uppercase tracking-[0.32em] font-bold mb-5"
            style={{ color: ORANGE }}
          >
            Features
          </div>
          <h2
            className="text-text-primary"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4.6vw, 3.5rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
            }}
          >
            The future of operations{" "}
            <span className="text-muted">is here.</span>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            Three modular AI products that bolt onto your operation —
            sold direct to operators and to ERP partners.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {CARDS.map((card, i) => (
            <FeatureCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------- FeatureCard ---------------- */

const FeatureCard: React.FC<{ card: CardProps; index: number }> = ({
  card,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay: index * 0.1 }}
    >
      <Link
        href={card.href}
        className="group block rounded-3xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
        style={{
          background:
            "linear-gradient(180deg, hsl(0 0% 9%) 0%, hsl(0 0% 6%) 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 60px -24px rgba(0,0,0,0.55)",
        }}
      >
        {/* Illustration panel — square aspect */}
        <div
          className="relative aspect-square overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, hsl(0 0% 8%) 0%, hsl(0 0% 5%) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {card.illustration}

          {/* Status pill top-left */}
          <div className="absolute top-5 left-5">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9.5px] uppercase tracking-[0.22em] font-bold backdrop-blur-md"
              style={{
                background: "rgba(255,107,44,0.10)",
                border: "1px solid rgba(255,107,44,0.28)",
                color: ORANGE,
              }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: ORANGE }}
              />
              {card.eyebrow}
            </span>
          </div>

          {/* Arrow top-right */}
          <div
            className="absolute top-5 right-5 inline-flex items-center justify-center w-9 h-9 rounded-full backdrop-blur-md transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            style={{
              background: "rgba(0,0,0,0.40)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <ArrowUpRight
              className="w-4 h-4 text-text-primary"
              strokeWidth={1.6}
            />
          </div>
        </div>

        {/* Body */}
        <div className="p-7 md:p-8">
          <h3
            className="text-text-primary mb-3"
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: "clamp(1.4rem, 2vw, 1.65rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
            }}
          >
            {card.title}
          </h3>
          <p className="text-[14px] leading-relaxed text-muted">{card.body}</p>
        </div>
      </Link>
    </motion.div>
  );
};

/* ---------------- Custom SVG illustrations ---------------- */

/**
 * Each illustration is a 600×600 SVG with:
 *   • A subtle radial top glow
 *   • Faint outlined UI shapes hinting at the feature
 *   • A film-grain noise overlay via SVG turbulence
 *   • All in dark greyscale + a single orange accent dot
 */

const GrainAndGlow: React.FC = () => (
  <>
    {/* Top edge soft glow */}
    <defs>
      <radialGradient id="card-glow" cx="50%" cy="0%" r="60%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
        <stop offset="60%" stopColor="rgba(255,255,255,0)" />
      </radialGradient>
      <filter id="card-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1   0 0 0 0.08 0" />
      </filter>
    </defs>
    <rect width="600" height="600" fill="url(#card-glow)" />
    <rect
      width="600"
      height="600"
      filter="url(#card-grain)"
      opacity="0.6"
      style={{ mixBlendMode: "overlay" }}
    />
  </>
);

function ProcurementIllustration() {
  // Stylized "AI drafts an order" UI — a rounded search/input bar +
  // a draft row below + an AI button.
  return (
    <svg
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <GrainAndGlow />

      {/* Window chrome dots */}
      <circle cx="60" cy="80" r="6" fill="rgba(255,255,255,0.12)" />
      <circle cx="84" cy="80" r="6" fill="rgba(255,255,255,0.12)" />
      <circle cx="108" cy="80" r="6" fill="rgba(255,255,255,0.12)" />

      {/* Tab pill */}
      <rect
        x="48"
        y="160"
        width="220"
        height="60"
        rx="30"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.5"
      />
      <rect x="80" y="184" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.55)" />

      {/* Big input/search bar — the centrepiece */}
      <rect
        x="48"
        y="252"
        width="504"
        height="92"
        rx="46"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.20)"
        strokeWidth="1.8"
      />
      {/* Subtle inner highlight */}
      <rect
        x="48"
        y="252"
        width="504"
        height="92"
        rx="46"
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="3"
      />
      <rect x="84" y="294" width="180" height="4" rx="2" fill="rgba(255,255,255,0.40)" />

      {/* Two row hints below */}
      <circle
        cx="76"
        cy="404"
        r="20"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.2"
      />
      <line x1="74" y1="404" x2="78" y2="404" stroke="rgba(255,255,255,0.40)" strokeWidth="2" />
      <line x1="76" y1="402" x2="76" y2="406" stroke="rgba(255,255,255,0.40)" strokeWidth="2" />
      <rect x="120" y="396" width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.30)" />
      <rect x="120" y="408" width="240" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />

      <circle
        cx="76"
        cy="476"
        r="20"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1.2"
      />
      <line x1="74" y1="476" x2="78" y2="476" stroke="rgba(255,255,255,0.40)" strokeWidth="2" />
      <line x1="76" y1="474" x2="76" y2="478" stroke="rgba(255,255,255,0.40)" strokeWidth="2" />
      <rect x="120" y="468" width="200" height="3" rx="1.5" fill="rgba(255,255,255,0.30)" />
      <rect x="120" y="480" width="160" height="3" rx="1.5" fill="rgba(255,255,255,0.15)" />

      {/* Single orange accent dot */}
      <circle cx="540" cy="298" r="6" fill={ORANGE}>
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function SchedulingIllustration() {
  // Stylized "production schedule" — horizontal track lines with
  // staggered bars + a vertical "now" line.
  return (
    <svg
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <GrainAndGlow />

      {/* Track baselines */}
      {[150, 220, 290, 360, 430].map((y) => (
        <line
          key={y}
          x1="48"
          y1={y}
          x2="552"
          y2={y}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      ))}

      {/* Schedule bars */}
      <rect
        x="80"
        y="138"
        width="160"
        height="24"
        rx="6"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />
      <rect
        x="260"
        y="138"
        width="100"
        height="24"
        rx="6"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />

      <rect
        x="120"
        y="208"
        width="240"
        height="24"
        rx="6"
        fill="rgba(255,107,44,0.10)"
        stroke="rgba(255,107,44,0.40)"
        strokeWidth="1.2"
      />

      <rect
        x="100"
        y="278"
        width="80"
        height="24"
        rx="6"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />
      <rect
        x="200"
        y="278"
        width="160"
        height="24"
        rx="6"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />
      <rect
        x="380"
        y="278"
        width="100"
        height="24"
        rx="6"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />

      <rect
        x="180"
        y="348"
        width="200"
        height="24"
        rx="6"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />

      <rect
        x="80"
        y="418"
        width="120"
        height="24"
        rx="6"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />
      <rect
        x="240"
        y="418"
        width="180"
        height="24"
        rx="6"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
      />

      {/* "Now" vertical line — orange */}
      <line
        x1="360"
        y1="120"
        x2="360"
        y2="460"
        stroke={ORANGE}
        strokeWidth="1.5"
        opacity="0.85"
      />
      <circle cx="360" cy="120" r="4" fill={ORANGE} />
      <circle cx="360" cy="460" r="4" fill={ORANGE} />

      {/* Pulsing dot somewhere in the schedule */}
      <circle cx="240" cy="220" r="6" fill={ORANGE}>
        <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function ReceivingIllustration() {
  // Stylized "receiving / dock" — stacked package rows with check
  // marks, one with a variance flag, and a cursor in the corner.
  return (
    <svg
      viewBox="0 0 600 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      <GrainAndGlow />

      {/* GRV header */}
      <rect
        x="48"
        y="120"
        width="380"
        height="44"
        rx="10"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.14)"
        strokeWidth="1.2"
      />
      <rect x="68" y="138" width="120" height="3.5" rx="1.5" fill="rgba(255,255,255,0.50)" />
      <rect x="200" y="138" width="80" height="3.5" rx="1.5" fill="rgba(255,255,255,0.25)" />

      {/* Package rows */}
      {[200, 268, 336, 404].map((y, i) => (
        <g key={y}>
          <rect
            x="48"
            y={y}
            width="504"
            height="48"
            rx="10"
            fill={i === 1 ? "rgba(255,107,44,0.08)" : "rgba(255,255,255,0.03)"}
            stroke={i === 1 ? "rgba(255,107,44,0.35)" : "rgba(255,255,255,0.10)"}
            strokeWidth="1.2"
          />
          {/* Status circle */}
          <circle
            cx="78"
            cy={y + 24}
            r="11"
            fill={i === 1 ? "rgba(255,107,44,0.18)" : "rgba(255,255,255,0.04)"}
            stroke={i === 1 ? "rgba(255,107,44,0.50)" : "rgba(255,255,255,0.18)"}
            strokeWidth="1.2"
          />
          {i !== 1 ? (
            <path
              d={`M 73 ${y + 24} L 77 ${y + 28} L 84 ${y + 20}`}
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <text
              x="78"
              y={y + 28}
              textAnchor="middle"
              fontSize="14"
              fill={ORANGE}
              fontWeight="800"
            >
              !
            </text>
          )}
          {/* Row content lines */}
          <rect
            x="106"
            y={y + 16}
            width="160"
            height="3.5"
            rx="1.5"
            fill="rgba(255,255,255,0.45)"
          />
          <rect
            x="106"
            y={y + 28}
            width="120"
            height="3.5"
            rx="1.5"
            fill="rgba(255,255,255,0.18)"
          />
          {/* Quantity column */}
          <rect
            x="430"
            y={y + 22}
            width="60"
            height="3.5"
            rx="1.5"
            fill={i === 1 ? "rgba(255,107,44,0.65)" : "rgba(255,255,255,0.30)"}
          />
          <rect
            x="500"
            y={y + 22}
            width="40"
            height="3.5"
            rx="1.5"
            fill="rgba(255,255,255,0.20)"
          />
        </g>
      ))}

      {/* Cursor in lower-right */}
      <g transform="translate(488 472) rotate(-15)">
        <path
          d="M 0 0 L 0 28 L 8 22 L 14 32 L 18 30 L 12 20 L 22 20 Z"
          fill="rgba(255,255,255,0.85)"
          stroke="rgba(0,0,0,0.7)"
          strokeWidth="1"
        />
      </g>
    </svg>
  );
}
