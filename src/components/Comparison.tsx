"use client";

import { motion } from "framer-motion";
import { Check, Minus, X } from "lucide-react";

const rows = [
  {
    label: "Time to first workflow live",
    vantage: "5 weeks",
    spreadsheets: "Zero — it's already there",
    enterprise: "6–18 months",
    vantageGood: true,
  },
  {
    label: "Handles exceptions, not just the happy path",
    vantage: "yes",
    spreadsheets: "no",
    enterprise: "yes",
  },
  {
    label: "Full audit trail — one-click export",
    vantage: "yes",
    spreadsheets: "no",
    enterprise: "yes",
  },
  {
    label: "AI that suggests rules with evidence",
    vantage: "yes",
    spreadsheets: "no",
    enterprise: "partial",
  },
  {
    label: "Works alongside your existing ERP",
    vantage: "yes",
    spreadsheets: "yes",
    enterprise: "partial",
  },
  {
    label: "Plain-English rule authoring",
    vantage: "yes",
    spreadsheets: "no",
    enterprise: "no",
  },
  {
    label: "Row-level security per business unit",
    vantage: "yes",
    spreadsheets: "no",
    enterprise: "yes",
  },
  {
    label: "Year-1 implementation cost",
    vantage: "Mid-market scoped · pilot pricing private",
    spreadsheets: "Staff time (hidden)",
    enterprise: "R2m–R8m first year",
    vantageGood: true,
  },
  {
    label: "Time lost to approval chaos",
    vantage: "Tracked + escalated",
    spreadsheets: "Invisible",
    enterprise: "Tracked",
  },
  {
    label: "Vendor lock-in",
    vantage: "Month-to-month, no long contract",
    spreadsheets: "None",
    enterprise: "Multi-year contracts",
    vantageGood: true,
  },
];

const renderCell = (value: string, highlight?: boolean) => {
  if (value === "yes") {
    return (
      <div className="inline-flex items-center gap-1.5">
        <Check
          className="w-4 h-4"
          strokeWidth={2.4}
          style={{ color: highlight ? "var(--accent-2)" : "var(--accent)" }}
        />
        <span
          className="text-sm font-medium"
          style={{ color: highlight ? "var(--accent-2)" : "var(--fg)" }}
        >
          Yes
        </span>
      </div>
    );
  }
  if (value === "no") {
    return (
      <div className="inline-flex items-center gap-1.5">
        <X
          className="w-4 h-4"
          strokeWidth={2.4}
          style={{
            color: "color-mix(in oklab, #f87171 80%, var(--muted-2))",
          }}
        />
        <span className="text-sm" style={{ color: "var(--muted-2)" }}>
          No
        </span>
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="inline-flex items-center gap-1.5">
        <Minus
          className="w-4 h-4"
          strokeWidth={2.4}
          style={{ color: "var(--muted-2)" }}
        />
        <span className="text-sm" style={{ color: "var(--muted-2)" }}>
          Partial
        </span>
      </div>
    );
  }
  return (
    <span
      className="text-sm"
      style={{
        color: highlight ? "var(--accent-2)" : "var(--fg)",
        fontWeight: highlight ? 600 : 400,
        fontFamily: "var(--font-body)",
      }}
    >
      {value}
    </span>
  );
};

export const Comparison: React.FC = () => {
  return (
    <section
      className="relative w-full py-24 overflow-hidden"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      <div
        className="pointer-events-none absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full blur-[120px] opacity-40"
        style={{ background: "var(--accent-glow)" }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
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
            <span>The honest comparison</span>
          </div>
          <h2
            className="mt-5 text-3xl sm:text-5xl font-bold leading-[1.05] tracking-tight"
            style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
          >
            Where Vantage sits —{" "}
            <span style={{ color: "var(--accent-2)" }}>
              between the spreadsheet and the R20m enterprise platform.
            </span>
          </h2>
          <p
            className="mt-4 text-base sm:text-lg leading-relaxed max-w-2xl"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            Spreadsheets are free and invisible. ServiceNow / Appian / Pega
            handle exceptions properly, but you&apos;ll wait a year and pay
            millions. Vantage is the honest middle — built for mid-market
            operations, priced for mid-market budgets, live in five weeks.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-12 rounded-2xl border overflow-hidden themed-rounded"
          style={{
            borderColor: "var(--card-border)",
            background: "var(--card-bg)",
          }}
        >
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr
                  className="border-b"
                  style={{ borderColor: "var(--card-border)" }}
                >
                  <th
                    className="text-left px-6 py-5 text-[11px] uppercase tracking-[0.25em]"
                    style={{
                      color: "var(--muted-2)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    What you need
                  </th>
                  <th
                    className="text-left px-6 py-5 text-sm font-semibold relative"
                    style={{
                      color: "var(--accent-2)",
                      fontFamily: "var(--font-display)",
                      background:
                        "linear-gradient(180deg, color-mix(in oklab, var(--accent-2) 10%, transparent), transparent)",
                    }}
                  >
                    <span className="inline-flex items-center gap-2">
                      Vantage
                      <span
                        className="px-1.5 py-0.5 rounded text-[9px] uppercase tracking-[0.2em] font-bold"
                        style={{
                          background: "var(--accent-2)",
                          color: "var(--bg)",
                        }}
                      >
                        Us
                      </span>
                    </span>
                  </th>
                  <th
                    className="text-left px-6 py-5 text-sm font-semibold"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Spreadsheets + email
                  </th>
                  <th
                    className="text-left px-6 py-5 text-sm font-semibold"
                    style={{
                      color: "var(--muted)",
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Enterprise platforms
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.label}
                    className="border-b transition-colors"
                    style={{
                      borderColor: "var(--card-border)",
                      background:
                        i % 2 === 0
                          ? "transparent"
                          : "color-mix(in oklab, var(--bg-elev) 40%, transparent)",
                    }}
                  >
                    <td
                      className="px-6 py-4 text-sm"
                      style={{
                        color: "var(--fg)",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {row.label}
                    </td>
                    <td
                      className="px-6 py-4"
                      style={{
                        background:
                          "linear-gradient(90deg, color-mix(in oklab, var(--accent-2) 6%, transparent), transparent)",
                      }}
                    >
                      {renderCell(row.vantage, row.vantageGood ?? true)}
                    </td>
                    <td className="px-6 py-4">
                      {renderCell(row.spreadsheets)}
                    </td>
                    <td className="px-6 py-4">{renderCell(row.enterprise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked */}
          <div className="md:hidden divide-y" style={{}}>
            {rows.map((row, i) => (
              <div
                key={row.label}
                className="p-5"
                style={{
                  borderColor: "var(--card-border)",
                  background:
                    i % 2 === 0
                      ? "transparent"
                      : "color-mix(in oklab, var(--bg-elev) 40%, transparent)",
                }}
              >
                <div
                  className="text-[11px] uppercase tracking-[0.2em] mb-3"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {row.label}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div
                      className="text-[9px] uppercase tracking-[0.2em] mb-1"
                      style={{ color: "var(--accent-2)" }}
                    >
                      Vantage
                    </div>
                    {renderCell(row.vantage, row.vantageGood ?? true)}
                  </div>
                  <div>
                    <div
                      className="text-[9px] uppercase tracking-[0.2em] mb-1"
                      style={{ color: "var(--muted-2)" }}
                    >
                      Spreadsheet
                    </div>
                    {renderCell(row.spreadsheets)}
                  </div>
                  <div>
                    <div
                      className="text-[9px] uppercase tracking-[0.2em] mb-1"
                      style={{ color: "var(--muted-2)" }}
                    >
                      Enterprise
                    </div>
                    {renderCell(row.enterprise)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <p
          className="mt-6 text-xs text-center max-w-2xl mx-auto"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          Enterprise comparison band reflects published ServiceNow, Appian and
          Pega implementation ranges. We&apos;re not competing at the Fortune
          500 tier — we&apos;re the right tool for the 50-person distributor
          who needs it to work by next quarter.
        </p>
      </div>
    </section>
  );
};
