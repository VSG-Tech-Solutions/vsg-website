/* global React, ReactDOM */

/* Privacy Policy — plain-language legal page, editorial layout.
   Hero → effective date → policy body (numbered sections) → contact strip. */

// ============================================================
// HERO
// ============================================================

function PrivacyHero() {
  return (
    <section style={{
      position: "relative", background: "var(--paper)",
      paddingTop: 120, paddingBottom: 72, overflow: "hidden",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
        width: 1400, height: 700,
        background: "radial-gradient(ellipse at center, rgba(201,99,58,0.06), rgba(201,99,58,0) 60%)",
        pointerEvents: "none",
      }} />
      <Container style={{ position: "relative" }}>
        <Reveal>
          <div style={{
            fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
            marginBottom: 28,
          }}>
            Legal · VSG Tech
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h1 style={{
            fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 96,
            lineHeight: 0.98, letterSpacing: "-0.045em", color: "var(--ink-1)",
            margin: 0, maxWidth: 1100, textWrap: "balance",
          }}>
            Privacy{" "}
            <em style={{ fontStyle: "italic", fontWeight: 700, color: "var(--coral)" }}>
              policy.
            </em>
          </h1>
        </Reveal>
        <Reveal delay={160}>
          <p style={{
            marginTop: 32, maxWidth: 720, fontFamily: "'Geist', sans-serif",
            fontSize: 20, lineHeight: 1.55, color: "var(--ink-2)",
          }}>
            What we collect, why we collect it, and what we do with it. Written in plain language. If anything here is unclear, email us and we'll explain it.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div style={{
            marginTop: 40, display: "flex", flexWrap: "wrap", gap: 32,
            fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
            letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--ink-4)",
          }}>
            <div>
              <div style={{ color: "var(--ink-4)" }}>Effective</div>
              <div style={{ color: "var(--ink-2)", marginTop: 6 }}>28 May 2026</div>
            </div>
            <div>
              <div style={{ color: "var(--ink-4)" }}>Last updated</div>
              <div style={{ color: "var(--ink-2)", marginTop: 6 }}>28 May 2026</div>
            </div>
            <div>
              <div style={{ color: "var(--ink-4)" }}>Governing law</div>
              <div style={{ color: "var(--ink-2)", marginTop: 6 }}>South Africa · POPIA</div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

// ============================================================
// POLICY BODY — numbered sections, single-column editorial
// ============================================================

function PolicySection({ n, title, children }) {
  return (
    <Reveal>
      <section style={{ marginTop: 72, scrollMarginTop: 100 }} id={`s${n}`}>
        <div style={{
          fontFamily: "'Geist Mono', monospace", fontWeight: 500, fontSize: 11,
          letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--coral)",
          marginBottom: 16,
        }}>
          Section {String(n).padStart(2, "0")}
        </div>
        <h2 style={{
          fontFamily: "'Geist', sans-serif", fontWeight: 700, fontSize: 38,
          lineHeight: 1.1, letterSpacing: "-0.025em", color: "var(--ink-1)",
          margin: 0,
        }}>
          {title}
        </h2>
        <div style={{
          marginTop: 24, fontFamily: "'Geist', sans-serif", fontSize: 18,
          lineHeight: 1.7, color: "var(--ink-2)",
        }}>
          {children}
        </div>
      </section>
    </Reveal>
  );
}

function P({ children }) {
  return <p style={{ margin: "0 0 18px" }}>{children}</p>;
}

function Bullets({ items }) {
  return (
    <ul style={{ margin: "0 0 18px", padding: 0 }}>
      {items.map((t, i) => (
        <li key={i} style={{
          display: "grid", gridTemplateColumns: "auto 1fr", gap: 14,
          alignItems: "start", listStyle: "none", marginBottom: 10,
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "var(--coral)", marginTop: 11,
          }} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function PolicyBody() {
  return (
    <section style={{ background: "var(--paper)", paddingBottom: 120 }}>
      <Container>
        <div style={{ maxWidth: 800 }}>

          <PolicySection n={1} title="Who we are">
            <P>
              VSG Tech Solutions (Pty) Ltd ("VSG Tech", "we", "us", "our") is a private company registered in South Africa. We build AI products and bespoke AI software for the South African mid-market. Our registered office is in Cape Town.
            </P>
            <P>
              For any privacy-related question, email <strong>privacy@vsgtech.co.za</strong> or <strong>hello@vsgtech.co.za</strong>. We're the Responsible Party under the Protection of Personal Information Act, 2013 (POPIA) for the personal information we collect through this website and our products.
            </P>
          </PolicySection>

          <PolicySection n={2} title="What this policy covers">
            <P>
              This policy covers personal information we collect through:
            </P>
            <Bullets items={[
              "Our marketing website (vsgtech.co.za) — including any subdomains.",
              "Our contact forms, demo-booking forms, and email correspondence.",
              "Calls and meetings you book with us (Zoom, Google Meet, or in person).",
            ]} />
            <P>
              It does <em>not</em> cover personal information we process on behalf of a customer inside their own deployment of our products. Those are governed by a separate Data Processing Agreement between VSG Tech and that customer — in that scenario, we are the Operator and the customer is the Responsible Party.
            </P>
          </PolicySection>

          <PolicySection n={3} title="What we collect">
            <P><strong>Information you give us directly.</strong> When you fill in a contact form, book a demo, or email us, we collect: your name, your work email, your phone number (if you provide it), your company name, and whatever you write in the message field.</P>
            <P><strong>Information we collect automatically.</strong> When you visit the site, our hosting provider (Vercel) logs your IP address, browser type, referring page, and the pages you visit. This is standard web-server logging and is used to keep the site reliable and secure.</P>
            <P><strong>What we don't collect.</strong> We don't run third-party advertising trackers. We don't sell your data. We don't have a Facebook Pixel, a Google Ads conversion pixel, or anything similar. If we ever add product analytics, we'll update this policy and tell you what it does.</P>
          </PolicySection>

          <PolicySection n={4} title="Why we collect it">
            <P>We only use your personal information for these purposes:</P>
            <Bullets items={[
              "To reply to your enquiry or set up the demo you asked for.",
              "To send you the proposal, scope, or follow-up you've asked us to send.",
              "To keep records of our engagements for accounting, tax, and legal reasons.",
              "To keep the website running, debug issues, and prevent abuse.",
            ]} />
            <P>
              We will not email you marketing material you didn't sign up for. If we ever start a newsletter, it will be explicit opt-in and you'll be able to unsubscribe with one click.
            </P>
          </PolicySection>

          <PolicySection n={5} title="Legal basis (POPIA)">
            <P>Under POPIA, we process your personal information on the following grounds:</P>
            <Bullets items={[
              "Consent — you've voluntarily given us your details by filling in a form or emailing us.",
              "Performance of a contract — to deliver the work you've engaged us for.",
              "Legitimate interests — to run our business, keep records, and improve our products.",
              "Legal obligation — where we're required by South African law to retain certain records (e.g., tax records under the Tax Administration Act).",
            ]} />
          </PolicySection>

          <PolicySection n={6} title="Who we share it with">
            <P>We share personal information with a small number of operators who help us run the business. Each one is bound by a contract that requires them to protect your data:</P>
            <Bullets items={[
              "Vercel Inc. — website hosting and serverless functions (USA, EU regions).",
              "Resend (resend.com) — transactional email delivery for the contact form.",
              "Google Workspace — our work email and document storage.",
              "Our accountants and auditors — only when legally required.",
            ]} />
            <P>
              We do not sell, rent, or trade your personal information to anyone. Ever.
            </P>
          </PolicySection>

          <PolicySection n={7} title="Where it goes (cross-border transfer)">
            <P>
              Some of our operators (Vercel, Resend, Google) store data outside South Africa, typically in the European Union or the United States. Where we transfer your personal information outside the Republic, we ensure the receiving party is subject to laws, binding corporate rules, or contractual terms that provide an adequate level of protection — as required by Section 72 of POPIA.
            </P>
          </PolicySection>

          <PolicySection n={8} title="How long we keep it">
            <P>
              We keep personal information only as long as we need it for the purpose we collected it:
            </P>
            <Bullets items={[
              "Unsuccessful enquiries: 12 months, then deleted.",
              "Active customer records: for the life of the engagement plus 5 years.",
              "Tax and accounting records: 5 years from the end of the relevant tax year (as required by SARS).",
              "Server access logs: 30 days, then automatically rotated.",
            ]} />
          </PolicySection>

          <PolicySection n={9} title="Your rights">
            <P>POPIA gives you the right to:</P>
            <Bullets items={[
              "Ask what personal information we hold about you.",
              "Ask us to correct anything that's wrong or outdated.",
              "Ask us to delete your personal information (subject to our legal retention obligations).",
              "Object to processing, or withdraw consent at any time.",
              "Lodge a complaint with the Information Regulator of South Africa.",
            ]} />
            <P>
              To exercise any of these rights, email <strong>privacy@vsgtech.co.za</strong>. We'll respond within 30 days. There is no charge for reasonable requests.
            </P>
            <P>
              The Information Regulator can be reached at <strong>complaints.IR@justice.gov.za</strong> or via <strong>justice.gov.za/inforeg</strong>.
            </P>
          </PolicySection>

          <PolicySection n={10} title="Cookies">
            <P>
              This site uses one category of cookies only: <strong>strictly necessary</strong> cookies that keep the site working — for example, remembering whether a modal is open or what theme you've chosen. We don't set advertising cookies, social-media tracking cookies, or analytics cookies that follow you across the web.
            </P>
            <P>
              You can clear or block cookies in your browser settings. The site will keep working without them; you might just lose small bits of state between page loads.
            </P>
          </PolicySection>

          <PolicySection n={11} title="Security">
            <P>
              We take reasonable, technically appropriate measures to protect your personal information. The site is served over HTTPS, our hosting provider runs in SOC 2-audited data centres, and access to our internal systems is restricted to people who need it and protected with strong authentication.
            </P>
            <P>
              No system is perfectly secure. If we become aware of a breach that affects your personal information, we'll notify you and the Information Regulator as required by Section 22 of POPIA.
            </P>
          </PolicySection>

          <PolicySection n={12} title="Children">
            <P>
              Our website and products are aimed at businesses, not children. We don't knowingly collect personal information from anyone under the age of 18. If you believe a child has given us personal information, email us and we'll delete it.
            </P>
          </PolicySection>

          <PolicySection n={13} title="Changes to this policy">
            <P>
              We may update this policy from time to time. If we make a material change, we'll update the "Last updated" date at the top of the page, and — where the change is significant — we'll email customers and prospects whose contact details we hold.
            </P>
          </PolicySection>

          <PolicySection n={14} title="Contact us">
            <P>
              For any privacy question, request, or complaint:
            </P>
            <P>
              <strong>VSG Tech Solutions (Pty) Ltd</strong><br />
              Cape Town, South Africa<br />
              <strong>privacy@vsgtech.co.za</strong> · <strong>hello@vsgtech.co.za</strong>
            </P>
          </PolicySection>

        </div>
      </Container>
    </section>
  );
}

// ============================================================
// CONTACT STRIP
// ============================================================

function PrivacyContactStrip({ onBookDemo }) {
  return (
    <section style={{
      background: "var(--paper-2)",
      borderTop: "1px solid var(--hairline)",
      padding: "96px 0",
    }}>
      <Container>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: 64,
          alignItems: "center",
        }} data-vsg-grid-2>
          <div>
            <Eyebrow>Questions?</Eyebrow>
            <Headline as="h2" size={44} style={{ marginTop: 16 }}>
              If anything here is unclear, ask us.
            </Headline>
            <p style={{
              marginTop: 20, fontFamily: "'Geist', sans-serif",
              fontSize: 18, lineHeight: 1.6, color: "var(--ink-3)",
              maxWidth: 560,
            }}>
              We answer privacy questions the same day. Email us directly or book a 30-minute call.
            </p>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <PrimaryButton as="a" href="mailto:privacy@vsgtech.co.za">
              Email privacy@
            </PrimaryButton>
            <OutlineButton onClick={onBookDemo}>
              Book a call
            </OutlineButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ============================================================
// PAGE ASSEMBLY
// ============================================================

function PrivacyPage({ onBookDemo }) {
  return (
    <React.Fragment>
      <PrivacyHero />
      <PolicyBody />
      <PrivacyContactStrip onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="privacy">
      <PrivacyPage />
    </PageShell>
  );
});
