import type { Metadata } from "next";
import {
  Orbitron,
  Exo_2,
  Inter,
  Space_Grotesk,
  Space_Mono,
  Fraunces,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/themes/ThemeProvider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});
const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VSG Tech Solutions",
    template: "%s | VSG Tech Solutions",
  },
  description:
    "Vantage is the AI-powered operational control platform that runs alongside your ERP and internal systems to manage every exception, approval, and escalation. Built in Cape Town for Syspro, SAP, Sage, and NetSuite shops. First workflow live in five weeks. Pilot cohort now accepting — first five clients get 40% off setup, free support, no per-user fees.",
  metadataBase: new URL("https://vsgtech.co.za"),
  keywords: [
    "operational control platform",
    "exception management software",
    "workflow automation South Africa",
    "Syspro workflow automation",
    "SAP exception management",
    "AP automation South Africa",
    "ERP workflow layer",
    "POPIA compliant software",
    "Cape Town software company",
    "Vantage VSG",
  ],
  authors: [{ name: "VSG Tech Solutions" }],
  creator: "VSG Tech Solutions",
  publisher: "VSG Tech Solutions",
  applicationName: "VSG Tech Solutions",
  category: "Business Software",
  openGraph: {
    title:
      "VSG Tech Solutions — Vantage, the operational control platform for SA mid-market",
    description:
      "Your ERP tracks transactions. Who tracks the work? Vantage catches every exception, approval and escalation — live in 5 weeks, POPIA-aligned. Pilot cohort: first 5 clients get 40% off setup, free support, no per-user fees.",
    url: "https://vsgtech.co.za",
    siteName: "VSG Tech Solutions",
    locale: "en_ZA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "VSG Tech Solutions — Vantage, the operational control platform for SA mid-market",
    description:
      "Your ERP tracks transactions. Who tracks the work? Pilot live in 5 weeks.",
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
  logo: "https://vsgtech.co.za/icon",
  description:
    "VSG Tech Solutions builds Vantage, an AI-powered operational control platform, and runs a fixed-price custom software, AI, and workflow automation practice alongside it.",
  foundingDate: "2024",
  founders: [
    {
      "@type": "Person",
      name: "Stephan Esterhuizen",
      jobTitle: "Founder",
    },
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
      telephone: "+27-63-616-9780",
      areaServed: "ZA",
      availableLanguage: ["English", "Afrikaans"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@vsgtech.co.za",
      areaServed: "ZA",
      availableLanguage: ["English"],
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/vsg-tech-solutions",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Vantage Pilot Cohort",
      description:
        "Launch cohort for the first five pilot clients — 40% off setup, free founder-led support for the life of the pilot, and no per-user monthly fees. First workflow live in five weeks on the customer's real data. Scoped on a 30-minute call; pricing shared privately.",
      availability: "https://schema.org/LimitedAvailability",
    },
  ],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Vantage",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Operational Control Platform",
  operatingSystem: "Web, Cloud, On-premises",
  publisher: {
    "@type": "Organization",
    name: "VSG Tech Solutions",
  },
  description:
    "Vantage is an AI-powered operational control platform that runs alongside an ERP (Syspro, SAP, Sage, NetSuite) to manage every exception, approval, escalation and audit trail.",
  offers: {
    "@type": "Offer",
    name: "Vantage — pilot cohort",
    description:
      "Launch pilot programme for the first five mid-market clients. 40% off setup, free support for the life of the pilot, no per-user monthly fees. Commercial terms confirmed on a 30-minute scoping call.",
    availability: "https://schema.org/LimitedAvailability",
    priceCurrency: "ZAR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClasses = [
    orbitron.variable,
    exo2.variable,
    inter.variable,
    spaceGrotesk.variable,
    spaceMono.variable,
    fraunces.variable,
  ].join(" ");
  return (
    <html lang="en" className={`${fontClasses} antialiased`}>
      <body className="min-h-full selection:bg-[color:var(--accent-soft)] selection:text-[color:var(--fg)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
