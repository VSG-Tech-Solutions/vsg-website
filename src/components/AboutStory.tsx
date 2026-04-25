"use client";

import { motion } from "framer-motion";
import { Compass, Scale, ShieldCheck, HeartHandshake } from "lucide-react";

const principles = [
  {
    icon: Compass,
    title: "One product, one practice.",
    body: "Vantage is the flagship — an operational control platform for exceptions, approvals and audits. Alongside it, a fixed-price custom software, AI and workflow practice. We don't stretch beyond those two things on purpose.",
  },
  {
    icon: Scale,
    title: "Honest before helpful.",
    body: "If Vantage isn't the fit, we say so in the first call. If the build isn't five weeks, we don't promise five weeks. We'd rather lose the deal than ship a pilot that quietly fails at month three.",
  },
  {
    icon: ShieldCheck,
    title: "Auditable by default.",
    body: "Every exception, every override, every AI suggestion — logged, timestamped, exportable. POPIA-aligned data handling. Row-level security from day one. Compliance isn't a phase two.",
  },
  {
    icon: HeartHandshake,
    title: "Partner, not vendor.",
    body: "Pilot cohorts are intentionally small. You get direct access to the people building the product — no account-manager relay, no ticket queues. If something breaks, you know who's fixing it.",
  },
];

const stats = [
  { value: "2024", label: "Founded, Cape Town" },
  { value: "Local", label: "Billed and supported in-region" },
  { value: "CAT", label: "Working hours · no offshore hand-offs" },
  { value: "POPIA", label: "Data handling aligned day one" },
];

export const AboutStory: React.FC = () => {
  return (
    <>
      {/* Why we exist */}
      <section
        className="relative w-full py-24 border-t"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
              style={{
                color: "var(--accent-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                className="h-px w-8"
                style={{ background: "var(--accent-2)" }}
              />
              <span>Why we exist</span>
            </div>
            <h2
              className="mt-5 text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
            >
              Built for mid-market businesses{" "}
              <span style={{ color: "var(--accent-2)" }}>
                with complex operations.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-5 text-base sm:text-lg leading-relaxed"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            <p>
              Every operations leader we speak to describes the same
              landscape. An ERP that handles the clean transactions,
              surrounded by spreadsheets, shared inboxes and chat threads
              covering the exceptions it was never designed for. Stuck
              approvals. Mismatched invoices. Customer complaints that die
              in somebody&apos;s inbox. Quality non-conformances logged on
              paper and forgotten by Friday.
            </p>
            <p>
              The available alternatives sit at two extremes. Enterprise
              platforms scoped for multinational head offices, with budgets
              and implementation timelines to match. Or generic low-code
              tools that collapse the moment real workflow logic — approval
              ladders, SLA timers, audit trails — has to hold together
              under production load. Nothing was built for the mid-market
              operator running meaningful volume locally.
            </p>
            <p style={{ color: "var(--fg)" }}>
              Vantage is that missing middle. Purpose-built for the
              exception workload, deployed in weeks rather than quarters,
              and supported by a team you can actually reach.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Principles */}
      <section
        className="relative w-full py-24 border-t"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
              style={{
                color: "var(--accent-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                className="h-px w-8"
                style={{ background: "var(--accent-2)" }}
              />
              <span>How we operate</span>
            </div>
            <h2
              className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
            >
              Four principles —{" "}
              <span style={{ color: "var(--accent-2)" }}>
                written before the first line of code.
              </span>
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  className="relative flex flex-col rounded-2xl border p-7 themed-rounded"
                  style={{
                    borderColor: "var(--card-border)",
                    background: "var(--card-bg)",
                  }}
                >
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border themed-rounded"
                    style={{
                      borderColor: "var(--card-border)",
                      background: "var(--bg-elev)",
                      color: "var(--accent-2)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3
                    className="mt-5 text-lg font-semibold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--fg)",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {p.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who runs it */}
      <section
        className="relative w-full py-24 border-t"
        style={{
          background: "var(--bg)",
          color: "var(--fg)",
          borderColor: "var(--card-border)",
        }}
      >
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-12 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div
              className="flex items-center gap-3 text-[11px] uppercase tracking-[0.25em]"
              style={{
                color: "var(--accent-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              <span
                className="h-px w-8"
                style={{ background: "var(--accent-2)" }}
              />
              <span>Who runs it</span>
            </div>
            <h2
              className="mt-5 text-3xl sm:text-4xl font-bold leading-[1.05] tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
            >
              Founder-led.{" "}
              <span style={{ color: "var(--accent-2)" }}>
                Direct line.
              </span>
            </h2>
            <p
              className="mt-5 text-base leading-relaxed"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              VSG Tech Solutions is run hands-on from Cape Town by the
              founders who built the product. Every engagement is staffed by
              the engineers shipping the code — not an account-manager relay
              or an offshore hand-off. When you pick up the phone, you reach
              the people accountable for the outcome.
            </p>
            <a
              href="/contact"
              className="mt-7 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer themed-rounded"
              style={{
                background:
                  "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                color: "#ffffff",
                boxShadow: "0 0 30px var(--accent-glow)",
                fontFamily: "var(--font-body)",
              }}
            >
              Talk to a founder
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 grid sm:grid-cols-2 gap-5"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border p-6 themed-rounded"
                style={{
                  borderColor: "var(--card-border)",
                  background: "var(--card-bg)",
                }}
              >
                <div
                  className="text-3xl sm:text-4xl font-bold tracking-tight"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-2 text-xs uppercase tracking-[0.2em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};
