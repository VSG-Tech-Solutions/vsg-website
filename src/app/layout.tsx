import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * Layout — VSG 2026 dark redesign.
 *
 * Forced-dark theme (no toggle). Two type families:
 *   • Inter (300–700)         — body, UI, nav
 *   • Instrument Serif italic — display, hero, editorial moments
 *
 * The previous Vantage / orbital / 8-specialist content has been
 * dissolved. VSG sells modular AI products now (Procurement and
 * Receiving live; more launching). Metadata reflects the new line.
 */

// Geist — primary type now. Cleaner than Inter at heavy weights, more
// modern proportions, pairs well with the dark editorial direction.
const geist = Geist({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Inter kept loaded under a fallback variable in case any leftover
// component still references it; not used as the body font anymore.
const inter = Inter({
  variable: "--font-fallback",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VSG — AI products for operations",
    template: "%s · VSG",
  },
  description:
    "VSG builds modular AI products that bolt onto your operation. Procurement and Receiving live now. Built in Cape Town, sold to operators and ERP partners worldwide.",
  metadataBase: new URL("https://vsgtech.co.za"),
  keywords: [
    "AI procurement software",
    "AI receiving software",
    "ERP AI module",
    "operations AI",
    "Cape Town AI",
    "VSG Tech Solutions",
  ],
  authors: [{ name: "VSG Tech Solutions" }],
  creator: "VSG Tech Solutions",
  publisher: "VSG Tech Solutions",
  applicationName: "VSG",
  category: "Business Software",
  openGraph: {
    title: "VSG — AI products for operations",
    description:
      "Modular AI products that bolt onto your operation. Procurement and Receiving live now.",
    url: "https://vsgtech.co.za",
    siteName: "VSG",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VSG — AI products for operations",
    description: "Modular AI products that bolt onto your operation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://vsgtech.co.za",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VSG Tech Solutions",
  legalName: "VSG Tech Solutions (Pty) Ltd",
  url: "https://vsgtech.co.za",
  description:
    "VSG Tech Solutions builds modular AI products for operations teams — Procurement and Receiving live, more launching. Founded in Cape Town.",
  foundingDate: "2024",
  founders: [
    { "@type": "Person", name: "Stephan Esterhuizen", jobTitle: "Founder" },
    { "@type": "Person", name: "Ernst Schloms", jobTitle: "Co-founder" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cape Town",
    addressCountry: "ZA",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "stephan@vsgtech.co.za",
      areaServed: "ZA",
      availableLanguage: ["English", "Afrikaans"],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-full bg-bg text-text-primary selection:bg-white/15 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
