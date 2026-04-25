import Link from "next/link";
import { VSGLogo } from "./VSGLogo";

export const LegalLayout: React.FC<{
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}> = ({ title, lastUpdated, children }) => {
  return (
    <main
      className="relative min-h-screen"
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Minimal nav */}
      <header
        className="border-b"
        style={{ borderColor: "var(--card-border)" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <VSGLogo size={28} />
            <span
              className="text-base tracking-[0.18em]"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--fg)",
              }}
            >
              VSG
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm"
            style={{
              color: "var(--muted)",
              fontFamily: "var(--font-body)",
            }}
          >
            ← Back to site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-6 py-20">
        <div
          className="text-[11px] uppercase tracking-[0.25em] mb-4"
          style={{ color: "var(--accent-2)", fontFamily: "var(--font-body)" }}
        >
          Legal
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
        >
          {title}
        </h1>
        <div
          className="mt-3 text-xs"
          style={{
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          Last updated · {lastUpdated}
        </div>

        <article className="legal-prose mt-10" style={{ color: "var(--fg)" }}>
          {children}
        </article>
      </div>
    </main>
  );
};
