"use client";

import { motion } from "framer-motion";

// ERP + business system integrations. This is deliberately not a client-logo
// cloud — we don't have permission to publish client logos yet. Showing the
// integration surface is honest AND tells the ICP (Finance / Ops leaders in
// Syspro / SAP / Sage shops) that Vantage speaks their stack.
const systems = [
  "SYSPRO",
  "SAP",
  "SAGE",
  "NETSUITE",
  "POWER AUTOMATE",
  "N8N",
  "REST API",
  "WEBHOOKS",
];

export const LogoCloud: React.FC = () => {
  return (
    <section
      id="integrations"
      className="relative w-full py-16 border-y"
      style={{ background: "var(--bg)", borderColor: "var(--card-border)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-xs uppercase tracking-[0.3em]"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          Plugs into the systems your team already runs on
        </motion.p>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-8 gap-y-6 items-center">
          {systems.map((l, i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="text-center text-sm font-semibold tracking-[0.25em] transition-colors cursor-default"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--muted-2)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.color =
                  "var(--fg)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.color =
                  "var(--muted-2)")
              }
            >
              {l}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
