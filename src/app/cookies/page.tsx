import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Cookie Policy — VSG Tech Solutions",
  description:
    "How VSG Tech Solutions uses cookies and similar technologies on its website.",
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Cookie Policy" lastUpdated="24 April 2026">
      <p className="lead">
        This website uses cookies and similar technologies to run properly,
        measure how it&apos;s used, and improve it over time.
      </p>

      <div className="draft-notice">
        <strong>Draft notice:</strong> This is a starter policy published in
        good faith. A fully lawyer-reviewed version will replace it before
        Vantage exits pilot.
      </div>

      <h2>1. What cookies we use</h2>
      <ul>
        <li>
          <strong>Strictly necessary:</strong> to remember theme preference and
          session state. These cannot be disabled.
        </li>
        <li>
          <strong>Analytics:</strong> anonymous traffic and page-view data so we
          understand what resonates. Aggregate only — we do not track individuals.
        </li>
        <li>
          <strong>Marketing:</strong> if you book a demo through an embedded
          calendar (e.g. Calendly, Cal.com), that provider may set its own cookies
          under its own policy.
        </li>
      </ul>

      <h2>2. Managing cookies</h2>
      <p>
        You can block or delete cookies via your browser settings. Blocking
        strictly-necessary cookies may break parts of the site.
      </p>

      <h2>3. POPIA</h2>
      <p>
        Under POPIA we process only the minimum personal information required.
        See our{" "}
        <a href="/privacy">Privacy Policy</a> for full detail.
      </p>

      <h2>4. Contact</h2>
      <p>
        <a href="mailto:hello@vsgtech.co.za">hello@vsgtech.co.za</a>
      </p>
    </LegalLayout>
  );
}
