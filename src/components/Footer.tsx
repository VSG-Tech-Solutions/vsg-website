"use client";

import Link from "next/link";
import { VSGLogo } from "./VSGLogo";

const columns = [
  {
    heading: "Product",
    links: [
      { label: "Vantage overview", href: "/vantage" },
      { label: "How it works", href: "/vantage#how-it-works" },
      { label: "Click through the prototype", href: "/vantage#prototype" },
      { label: "Pilot promo", href: "/pilot" },
    ],
  },
  {
    heading: "Services",
    links: [
      { label: "Service lines", href: "/services#offerings" },
      { label: "Delivery process", href: "/services#process" },
      { label: "What we won't do", href: "/services" },
      { label: "Scope a project", href: "/services#scope" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/vsg-tech-solutions",
      },
      { label: "stephan@vsgtech.co.za", href: "mailto:stephan@vsgtech.co.za" },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer
      className="relative w-full border-t"
      style={{
        background: "var(--bg)",
        color: "var(--fg)",
        borderColor: "var(--card-border)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="brand-lockup flex items-center gap-3 group w-fit"
            >
              <span
                className="brand-logo-glow relative inline-flex items-center justify-center"
                style={{
                  transition: "filter 0.35s ease, transform 0.35s ease",
                }}
              >
                <VSGLogo size={38} />
              </span>
              <div className="flex flex-col leading-none">
                <span
                  className="text-xl font-semibold tracking-[0.24em]"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--fg)",
                  }}
                >
                  VSG
                </span>
                <span
                  className="mt-1.5 text-[9px] tracking-[0.34em]"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  TECH&nbsp;SOLUTIONS
                </span>
              </div>
            </Link>
            <p
              className="mt-5 max-w-md text-sm leading-relaxed"
              style={{ color: "var(--muted)", fontFamily: "var(--font-body)" }}
            >
              VSG Tech Solutions builds operational control software for the
              South African mid-market. Vantage is our flagship product. We also
              run a fixed-price custom software, AI, and workflow automation
              practice.
            </p>
            <div
              className="mt-5 text-xs leading-relaxed"
              style={{
                color: "var(--muted-2)",
                fontFamily: "var(--font-body)",
              }}
            >
              Cape Town · South Africa
              <br />
              stephan@vsgtech.co.za · +27 63 616 9780
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((c) => (
              <div key={c.heading}>
                <h4
                  className="text-xs uppercase tracking-[0.2em] mb-4"
                  style={{
                    color: "var(--muted-2)",
                    fontFamily: "var(--font-body)",
                  }}
                >
                  {c.heading}
                </h4>
                <ul className="space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm transition-colors cursor-pointer"
                        style={{
                          color: "var(--muted)",
                          fontFamily: "var(--font-body)",
                        }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--accent-2)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLAnchorElement).style.color =
                            "var(--muted)")
                        }
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderColor: "var(--card-border)",
            color: "var(--muted-2)",
            fontFamily: "var(--font-body)",
          }}
        >
          <div>
            © {new Date().getFullYear()} VSG Tech Solutions (Pty) Ltd · All
            rights reserved · POPIA-aligned
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/privacy"
              style={{ transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--fg)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--muted-2)")
              }
            >
              Privacy
            </a>
            <a
              href="/terms"
              style={{ transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--fg)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--muted-2)")
              }
            >
              Terms
            </a>
            <a
              href="/cookies"
              style={{ transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--fg)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--muted-2)")
              }
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
