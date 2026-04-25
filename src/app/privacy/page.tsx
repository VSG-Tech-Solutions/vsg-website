import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How VSG Tech Solutions collects, uses, and protects personal information under POPIA.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="24 April 2026">
      <p className="lead">
        VSG Tech Solutions (Pty) Ltd (&ldquo;VSG&rdquo;, &ldquo;we&rdquo;,
        &ldquo;us&rdquo;) is committed to protecting your personal information
        in line with the Protection of Personal Information Act (POPIA) of South
        Africa.
      </p>

      <div className="draft-notice">
        <strong>Draft notice:</strong> This is a starter policy published in
        good faith. A fully lawyer-reviewed version will replace it before
        Vantage exits pilot. If you have a specific question about how we
        handle your data today, email{" "}
        <a href="mailto:hello@vsgtech.co.za">hello@vsgtech.co.za</a>.
      </div>

      <h2>1. Information we collect</h2>
      <p>
        We collect information you provide directly (name, email, phone,
        company, role) when you contact us, book a demo, or enter a pilot or
        services agreement. We collect technical information (IP address,
        browser, referrer, pages viewed) automatically when you visit this site.
      </p>

      <h2>2. How we use it</h2>
      <p>
        To respond to enquiries, schedule meetings, deliver contracted services,
        send operational communications, and improve our website and product.
        We do not sell personal information. We do not share it with third
        parties except the processors we use to run the business (email, CRM,
        analytics, calendar), each of whom is contractually bound to POPIA-
        aligned handling.
      </p>

      <h2>3. Customer data in Vantage</h2>
      <p>
        When you run Vantage, the data your team enters or syncs from your ERP
        belongs to you. We process it only to deliver the service you have
        contracted. We do not train AI models on customer data without explicit
        written consent in a Data Processing Agreement.
      </p>

      <h2>4. Your rights</h2>
      <p>
        Under POPIA you may request access to, correction of, or deletion of
        your personal information. Email{" "}
        <a href="mailto:hello@vsgtech.co.za">hello@vsgtech.co.za</a> with the
        subject line &ldquo;POPIA request&rdquo; and we will respond within a
        reasonable period.
      </p>

      <h2>5. Contact</h2>
      <p>
        Information Officer: Stephan Esterhuizen
        <br />
        Email:{" "}
        <a href="mailto:hello@vsgtech.co.za">hello@vsgtech.co.za</a>
        <br />
        Phone: +27 63 616 9780
      </p>
    </LegalLayout>
  );
}
