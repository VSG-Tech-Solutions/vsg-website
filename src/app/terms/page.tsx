import { LegalLayout } from "@/components/LegalLayout";

export const metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the VSG Tech Solutions website, Vantage, and services engagements.",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="24 April 2026">
      <p className="lead">
        These terms govern your use of the VSG Tech Solutions website and any
        communication you initiate with us. Your Vantage subscription and any
        services engagement are governed by a separate signed agreement.
      </p>

      <div className="draft-notice">
        <strong>Draft notice:</strong> This is a starter policy published in
        good faith. A fully lawyer-reviewed version will replace it before
        Vantage exits pilot.
      </div>

      <h2>1. Website use</h2>
      <p>
        This website is provided for informational purposes. You may browse,
        read, and share the content. You may not scrape, reverse engineer, or
        attempt to disrupt it.
      </p>

      <h2>2. Vantage</h2>
      <p>
        Access to Vantage is granted under a separate subscription agreement
        that governs fees, SLAs, data handling, and termination. Nothing on
        this website creates a binding commitment to provide Vantage — an
        engagement begins when both parties sign the subscription agreement.
      </p>

      <h2>3. Services engagements</h2>
      <p>
        Custom software, AI, and workflow automation engagements are delivered
        under a fixed-price Statement of Work signed by both parties. Scope,
        deliverables, payment terms and IP ownership are defined per SOW.
      </p>

      <h2>4. Intellectual property</h2>
      <p>
        The VSG name, logo, Vantage name, and all website content are the
        intellectual property of VSG Tech Solutions (Pty) Ltd.
      </p>

      <h2>5. Limitation of liability</h2>
      <p>
        We provide the website &ldquo;as is&rdquo;. To the extent permitted by
        South African law, VSG is not liable for indirect or consequential loss
        arising from use of the website.
      </p>

      <h2>6. Governing law</h2>
      <p>
        These terms are governed by the laws of the Republic of South Africa.
        Disputes are subject to the jurisdiction of South African courts.
      </p>

      <h2>7. Contact</h2>
      <p>
        <a href="mailto:hello@vsgtech.co.za">hello@vsgtech.co.za</a>
      </p>
    </LegalLayout>
  );
}
