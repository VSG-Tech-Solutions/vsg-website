"use client";

import { Eyebrow } from "./Eyebrow";
import { DisplayHead } from "./DisplayHead";
import { iconRegistry, type IconName } from "./icon-registry";

/**
 * ContactDirectory — sidebar lockup with founder direct lines + company
 * info. Pulled out as a client component so server-side pages don't have
 * to pass icon refs as props.
 */

type Founder = {
  name: string;
  role: string;
  email: string;
};

type ContactInfo = {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
};

type ContactDirectoryProps = {
  founders: Founder[];
  contacts: ContactInfo[];
  eyebrow?: string;
  title?: string;
  accent?: string;
};

export const ContactDirectory: React.FC<ContactDirectoryProps> = ({
  founders,
  contacts,
  eyebrow = "Founder direct",
  title = "Email a",
  accent = "founder.",
}) => (
  <aside>
    <Eyebrow>{eyebrow}</Eyebrow>
    <div className="mt-6">
      <DisplayHead level="h3" accent={accent}>
        {title}
      </DisplayHead>
    </div>

    <ul className="mt-8 space-y-0">
      {founders.map((f, i) => (
        <li
          key={f.email}
          className={`py-6 ${i === 0 ? "" : "border-t"}`}
          style={{ borderColor: i === 0 ? undefined : "var(--card-border)" }}
        >
          <div
            className="text-[10px] uppercase tracking-[0.22em]"
            style={{
              color: "var(--muted-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            {f.role}
          </div>
          <div
            className="mt-1 text-lg font-semibold"
            style={{
              color: "var(--fg)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.015em",
            }}
          >
            {f.name}
          </div>
          <a
            href={`mailto:${f.email}`}
            className="mt-2 inline-block text-sm font-semibold underline-offset-4 hover:underline"
            style={{
              color: "var(--accent-2)",
              fontFamily: "var(--font-body)",
            }}
          >
            {f.email} →
          </a>
        </li>
      ))}
    </ul>

    <div
      className="mt-12 pt-8 border-t space-y-4"
      style={{ borderColor: "var(--card-border)" }}
    >
      {contacts.map((c) => {
        const Icon = iconRegistry[c.icon];
        const inner = (
          <div className="flex items-center gap-3">
            <Icon
              className="w-4 h-4 shrink-0"
              strokeWidth={1.6}
              style={{ color: "var(--accent-2)" }}
            />
            <div>
              <div
                className="text-[10px] uppercase tracking-[0.22em]"
                style={{
                  color: "var(--muted-2)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {c.label}
              </div>
              <div
                className="text-sm"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-body)",
                }}
              >
                {c.value}
              </div>
            </div>
          </div>
        );
        return c.href ? (
          <a
            key={c.label}
            href={c.href}
            className="block hover:opacity-80 transition-opacity"
          >
            {inner}
          </a>
        ) : (
          <div key={c.label}>{inner}</div>
        );
      })}
    </div>
  </aside>
);
