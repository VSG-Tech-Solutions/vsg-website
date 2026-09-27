/**
 * VSG Tech, lead form serverless function
 *
 * One endpoint for the Bootcamp booking form and the /contact form.
 * Validates, then sends through Resend if RESEND_API_KEY is set, otherwise
 * logs the lead to the function output. A valid submit returns ok=true;
 * `delivered` says whether the email actually went out. The pages treat
 * delivered=false as a soft failure and ask the buyer to email Stephan too.
 * Every undelivered lead is logged with the tag [LEAD_UNDELIVERED] so a log
 * search or alert on that tag finds it.
 *
 * Without JavaScript the contact form posts urlencoded data here. Those
 * requests get a 303 back to /contact#sent, #held (saved, email down) or
 * #error, so nobody lands on a raw JSON page.
 *
 * POST /api/lead
 * Body: { name, email, consent, consent_notice?, company?, phone?, role?, topic?, problem?, message? }
 * consent must be "yes": both forms ask for it (POPIA). The email records it with the
 * notice version and a timestamp, so there is a record of what the person agreed to.
 * Response: { ok: true, delivered: boolean } | { ok: false, error: string }
 */

const FROM_ADDRESS =
  process.env.CONTACT_FROM_ADDRESS ||
  process.env.SERVICES_FROM_ADDRESS ||
  process.env.PILOT_FROM_ADDRESS ||
  "VSG Contact Form <onboarding@resend.dev>";

const TO_ADDRESS =
  process.env.CONTACT_TO_ADDRESS ||
  process.env.SERVICES_TO_ADDRESS ||
  process.env.PILOT_TO_ADDRESS ||
  "stephan@vsgtech.co.za";

function sanitise(v, max = 2000) {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function validEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

function isFormPost(req) {
  const ct = String((req.headers && req.headers["content-type"]) || "").toLowerCase();
  return ct.indexOf("application/x-www-form-urlencoded") === 0 || ct.indexOf("multipart/form-data") === 0;
}

function parse(raw, form) {
  if (!raw) return {};
  return form ? Object.fromEntries(new URLSearchParams(raw)) : JSON.parse(raw);
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  const form = isFormPost(req);
  if (typeof req.body === "string") return parse(req.body, form);
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => { raw += chunk; });
    req.on("end", () => {
      try { resolve(parse(raw, form)); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

function alertUndelivered(why, textBody) {
  console.error("[LEAD_UNDELIVERED] " + why + "\n" + textBody);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const form = isFormPost(req);
  // A no-JS form post gets a redirect back to the contact page instead of JSON.
  const reply = (status, body, anchor) => {
    if (form) {
      res.statusCode = 303;
      res.setHeader("Location", "/contact#" + anchor);
      return res.end();
    }
    return res.status(status).json(body);
  };

  let raw;
  try {
    raw = await readBody(req);
  } catch {
    return reply(400, { ok: false, error: "Bad request body" }, "error");
  }
  if (raw && raw.company_site) return reply(200, { ok: true, delivered: true }, "sent"); // honeypot

  const input = {
    name:    sanitise(raw.name,    120),
    email:   sanitise(raw.email,   200),
    company: sanitise(raw.company, 160),
    phone:   sanitise(raw.phone,    40),
    role:    sanitise(raw.role,    120),
    topic:   sanitise(raw.topic,   120),
    problem: sanitise(raw.problem,  80),
    message: sanitise(raw.message || raw.note, 4000),
    source:  sanitise(raw.source,   60) || (form ? "contact (no JS)" : "unknown"),
    consent: /^(yes|on|true)$/i.test(String(raw.consent == null ? "" : raw.consent)) ? "yes" : "",
    consentNotice: sanitise(raw.consent_notice, 20),
  };

  if (!input.name || !input.email || !input.message) {
    return reply(400, { ok: false, error: "Please fill in name, email and a short message." }, "error");
  }
  if (!validEmail(input.email)) {
    return reply(400, { ok: false, error: "That email address does not look right." }, "error");
  }
  if (!input.consent) {
    return reply(400, { ok: false, error: "Please tick the box to agree that we may use your details to reply." }, "error");
  }

  // The topic leads the subject so demo requests stand out in the inbox.
  const TOPICS = {
    "procure-demo": "DEMO REQUEST, VSG Procure",
    "endorse-demo": "DEMO REQUEST, VSG Endorse",
    "core-demo":    "DEMO REQUEST, VSG Core",
    "bootcamp":     "Bootcamp booking",
    "custom":       "Custom build enquiry",
    "contact":      "General enquiry",
  };
  const topicKey = input.topic.toLowerCase();
  const topicLabel = TOPICS[topicKey] || input.topic || input.problem || "General enquiry";
  const subject = `[VSG] ${topicLabel}: ${input.company || input.name}`;
  const textBody = [
    `${topicLabel}, from vsgtech.co.za (${input.source})`,
    ``,
    `Name:    ${input.name}`,
    `Email:   ${input.email}`,
    input.company ? `Company: ${input.company}` : null,
    input.role    ? `Role:    ${input.role}`    : null,
    input.phone   ? `Phone:   ${input.phone}`   : null,
    input.topic   ? `Topic:   ${input.topic}`   : null,
    input.problem ? `Problem: ${input.problem}` : null,
    `Consent: yes, to reply (form notice ${input.consentNotice || "not recorded"}, ${new Date().toISOString()})`,
    ``,
    `Message:`,
    input.message,
  ].filter(Boolean).join("\n");

  if (!process.env.RESEND_API_KEY) {
    // No Resend key: log so nothing is lost, and report delivered=false.
    alertUndelivered("RESEND_API_KEY not set", textBody);
    return reply(200, { ok: true, delivered: false }, "held");
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    const sendRes = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [TO_ADDRESS],
      replyTo: input.email,
      subject,
      text: textBody,
    });
    if (sendRes.error) {
      console.error("[/api/lead] Resend error:", sendRes.error);
      alertUndelivered("Resend returned an error", textBody);
      return reply(200, { ok: true, delivered: false }, "held");
    }
    return reply(200, { ok: true, delivered: true }, "sent");
  } catch (err) {
    console.error("[/api/lead] Send threw:", err);
    alertUndelivered("Send threw", textBody);
    return reply(200, { ok: true, delivered: false }, "held");
  }
}
