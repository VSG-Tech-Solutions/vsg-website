"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Sparkles,
  Lock,
  Headphones,
  Users,
  Rocket,
  Calendar,
  type LucideIcon,
} from "lucide-react";

// PilotPromo — the full-width sales section for the launch cohort.
// Three headline benefits + slot counter + dual CTA.
// Lives on homepage, vantage page, and the dedicated /pilot route.

const PILOT = {
  slotsTotal: 5,
  slotsFilled: 1, // bump as installs book
  closeWindow: "June – July 2026",
};

type Benefit = {
  icon: LucideIcon;
  badge: string;
  title: string;
  body: string;
};

const BENEFITS: Benefit[] = [
  {
    icon: Sparkles,
    badge: "40% off",
    title: "Setup at 40% off",
    body: "Pilot clients pay 40% less on the one-time setup — the integration, the first workflow live on your data, your rule set written in plain English. Nothing in the delivery shrinks.",
  },
  {
    icon: Headphones,
    badge: "Free",
    title: "Free support for the pilot",
    body: "Direct line to the founding engineers. Slack channel, named responders, no ticket queue, no tier-1 triage. For the lifetime of your pilot engagement.",
  },
  {
    icon: Users,
    badge: "R0 / user",
    title: "No per-user monthly fees",
    body: "Add every operator, every approver, every viewer across every site — no seat math, no user cap, no license creep. Pay only for the workflows you run.",
  },
];

const PROMISES: string[] = [
  "First workflow live in 5 weeks on your real data",
  "Founder on every working session — no SDR, no handoff",
  "Named success outcome, contracted on day one",
  "Month-to-month after go-live · pause or exit anytime",
];

export const PilotPromo: React.FC = () => {
  const remaining = PILOT.slotsTotal - PILOT.slotsFilled;
  const pctFilled = (PILOT.slotsFilled / PILOT.slotsTotal) * 100;

  return (
    <section
      id="pilot"
      className="relative w-full py-24 sm:py-28 overflow-hidden scroll-mt-24"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Ambient background */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] rounded-full blur-[160px] opacity-50"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Heading row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-3xl"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] uppercase tracking-[0.25em] themed-rounded"
            style={{
              borderColor:
                "color-mix(in oklab, var(--accent-2) 55%, var(--card-border))",
              background:
                "color-mix(in oklab, var(--accent-2) 14%, transparent)",
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--accent)" }}
            />
            Launch cohort · now accepting
          </div>

          <h2
            className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.98] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Five pilot clients.{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom right, var(--accent-2), var(--accent))",
                filter: "drop-shadow(0 0 30px var(--accent-glow))",
              }}
            >
              One serious deal.
            </span>
          </h2>

          <p
            className="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
          >
            We&apos;re hand-picking the first five businesses to run Vantage in
            production. In exchange for working with us while the product is
            young, you get <strong style={{ color: "var(--fg)" }}>40% off setup</strong>,{" "}
            <strong style={{ color: "var(--fg)" }}>free support</strong> from
            the people who built it, and{" "}
            <strong style={{ color: "var(--fg)" }}>no per-user fees</strong>{" "}
            — forever, for the duration of the pilot. One fair trade, no
            pricing games, no public price sheet.
          </p>
        </motion.div>

        {/* Benefit cards */}
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => {
            const Icon = b.icon;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="relative rounded-2xl border p-6 overflow-hidden themed-rounded group"
                style={{
                  borderColor:
                    "color-mix(in oklab, var(--accent-2) 30%, var(--card-border))",
                  background:
                    "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 8%, var(--card-bg)), var(--card-bg))",
                }}
              >
                <div
                  className="pointer-events-none absolute -top-24 -right-24 w-[240px] h-[240px] rounded-full blur-[80px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "var(--accent-glow)" }}
                />
                <div className="relative flex items-start justify-between gap-3">
                  <div
                    className="inline-flex items-center justify-center w-11 h-11 rounded-xl border-2 themed-rounded"
                    style={{
                      borderColor: "var(--accent-2)",
                      background:
                        "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 16%, var(--bg-elev)), var(--bg-elev))",
                      boxShadow: "0 0 20px var(--accent-glow)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{ color: "var(--accent-2)" }}
                      strokeWidth={1.8}
                    />
                  </div>
                  <span
                    className="inline-flex items-center px-2 py-1 rounded-md text-[10px] uppercase tracking-[0.2em] font-bold"
                    style={{
                      background: "var(--accent-2)",
                      color: "var(--bg)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {b.badge}
                  </span>
                </div>
                <h3
                  className="relative mt-5 text-lg font-semibold leading-snug"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  {b.title}
                </h3>
                <p
                  className="relative mt-2 text-sm leading-relaxed"
                  style={{
                    color: "var(--muted)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {b.body}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Promises + slot counter + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mt-10 overflow-hidden rounded-3xl border themed-rounded"
          style={{
            borderColor:
              "color-mix(in oklab, var(--accent-2) 40%, var(--card-border))",
            background:
              "linear-gradient(145deg, color-mix(in oklab, var(--accent-2) 10%, var(--bg-elev)), var(--bg-elev) 55%, var(--bg))",
          }}
        >
          <div
            className="pointer-events-none absolute -top-40 -right-40 w-[420px] h-[420px] rounded-full blur-[110px]"
            style={{ background: "var(--accent-glow)" }}
          />
          <div
            className="pointer-events-none absolute -bottom-40 -left-40 w-[420px] h-[420px] rounded-full blur-[110px] opacity-50"
            style={{ background: "var(--accent-glow)" }}
          />

          <div className="relative grid lg:grid-cols-[1.2fr_1fr] gap-0">
            {/* Left: what you commit to */}
            <div className="p-8 sm:p-12">
              <div
                className="text-[10px] uppercase tracking-[0.25em] flex items-center gap-2"
                style={{
                  color: "var(--accent-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <Rocket className="w-3.5 h-3.5" strokeWidth={2} />
                What you actually get
              </div>
              <h3
                className="mt-4 text-2xl sm:text-3xl font-bold leading-tight tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--fg)",
                }}
              >
                A real deployment — not a trial, not a pitch deck.
              </h3>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3.5">
                {PROMISES.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2.5 text-sm leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    <span
                      className="inline-flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5"
                      style={{
                        background:
                          "color-mix(in oklab, var(--accent-2) 20%, transparent)",
                        border:
                          "1px solid color-mix(in oklab, var(--accent-2) 55%, var(--card-border))",
                      }}
                    >
                      <Check
                        className="w-3 h-3"
                        style={{ color: "var(--accent-2)" }}
                        strokeWidth={2.6}
                      />
                    </span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/pilot#apply"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 cursor-pointer themed-rounded"
                  style={{
                    background:
                      "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                    color: "#ffffff",
                    boxShadow: "0 0 40px var(--accent-glow)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span>Claim a pilot slot</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/vantage#prototype"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border font-semibold transition-all duration-300 cursor-pointer themed-rounded"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--card-bg)",
                    color: "var(--fg)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  Click through the product first
                </Link>
              </div>
            </div>

            {/* Right: slot counter + terms */}
            <div
              className="p-8 sm:p-12 border-t lg:border-t-0 lg:border-l flex flex-col gap-6"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--accent-2) 22%, var(--card-border))",
                background:
                  "linear-gradient(180deg, color-mix(in oklab, var(--accent-2) 6%, transparent), transparent)",
              }}
            >
              <div>
                <div
                  className="text-[10px] uppercase tracking-[0.25em] flex items-center gap-2"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                  Cohort window · {PILOT.closeWindow}
                </div>
                <div className="mt-3 flex items-baseline gap-3">
                  <div
                    className="text-6xl font-bold leading-none tabular-nums"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--accent-2)",
                    }}
                  >
                    {remaining}
                  </div>
                  <div
                    className="text-sm leading-tight"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    of {PILOT.slotsTotal}
                    <br />
                    slots left
                  </div>
                </div>
                <div
                  className="relative mt-4 h-2 rounded-full overflow-hidden"
                  style={{ background: "var(--bg-elev)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pctFilled}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--accent-2), var(--accent))",
                      boxShadow: "0 0 20px var(--accent-glow)",
                    }}
                  />
                </div>
                <div
                  className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <span>{PILOT.slotsFilled} booked</span>
                  <span>{remaining} open</span>
                </div>
                <div
                  className="mt-3 text-[11px] leading-relaxed"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  First slot booked April 2026 · {remaining} slots remain
                  open for {PILOT.closeWindow} setup
                </div>
              </div>

              <div
                className="rounded-xl border p-4 text-[12px] leading-relaxed"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--card-bg)",
                  color: "var(--muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <div className="flex items-start gap-2">
                  <Lock
                    className="w-3.5 h-3.5 shrink-0 mt-0.5"
                    style={{ color: "var(--accent-2)" }}
                  />
                  <div>
                    <strong style={{ color: "var(--fg)" }}>
                      The fair trade.
                    </strong>{" "}
                    Agree to a named reference call and a short case study on
                    results — we confirm both with you in writing before
                    publishing. That&apos;s it. No logo rights, no exclusivity,
                    no binding lock-in.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tiny fine-print strip */}
        <p
          className="mt-6 text-center text-[11px]"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          Full commercial terms confirmed on a 30-minute scoping call · Pilot
          benefits apply for the life of your pilot engagement · Post-pilot
          pricing discussed after go-live, never before
        </p>
      </div>
    </section>
  );
};
