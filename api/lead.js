/**
 * VSG Tech — lead form serverless function
 *
 * Single endpoint handling demo bookings (DemoModal) and the /contact form.
 * Ports the behavior of src/app/actions/contact-lead.ts from the previous
 * Next.js app: validates → Resend if RESEND_API_KEY is set → otherwise logs
 * to function output. Always returns ok=true on a valid submit so the UI
 * shows the thank-you state; `delivered` tells you whether email actually
 * went out.
 *
 * POST /api/lead
 * Body: { name, email, company?, phone?, role?, topic?, problem?, message? }
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

async function readJsonBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => { raw += chunk; });
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch (e) { reject(e); }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  let raw;
  try {
    raw = await readJsonBody(req);
  } catch {
    return res.status(400).json({ ok: false, error: "Bad JSON body" });
  }

  const input = {
    name:    sanitise(raw.name,    120),
    email:   sanitise(raw.email,   200),
    company: sanitise(raw.company, 160),
    phone:   sanitise(raw.phone,    40),
    role:    sanitise(raw.role,    120),
    topic:   sanitise(raw.topic,   120),
    problem: sanitise(raw.problem,  80),
    message: sanitise(raw.message || raw.note, 4000),
    source:  sanitise(raw.source,   60) || "unknown",
  };

  if (!input.name || !input.email || !input.message) {
    return res.status(400).json({
      ok: false,
      error: "Please fill in name, email and a short message.",
    });
  }
  if (!validEmail(input.email)) {
    return res.status(400).json({
      ok: false,
      error: "That email address doesn't look right.",
    });
  }

  const tag = input.topic || input.problem || "general enquiry";
  const subject = `[VSG ${input.source}] ${input.company || input.name} — ${tag}`;
  const textBody = [
    `New enquiry via vsgtech.co.za (${input.source})`,
    ``,
    `Name:    ${input.name}`,
    `Email:   ${input.email}`,
    input.company ? `Company: ${input.company}` : null,
    input.role    ? `Role:    ${input.role}`    : null,
    input.phone   ? `Phone:   ${input.phone}`   : null,
    input.topic   ? `Topic:   ${input.topic}`   : null,
    input.problem ? `Problem: ${input.problem}` : null,
    ``,
    `Message:`,
    input.message,
  ].filter(Boolean).join("\n");

  if (!process.env.RESEND_API_KEY) {
    // No Resend key — log so nothing is lost, but report delivered=false.
    console.log("[/api/lead] RESEND_API_KEY not set — logging lead only:\n" + textBody);
    return res.status(200).json({ ok: true, delivered: false });
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
      // Still return ok so the UI shows the thank-you and we don't lose the lead.
      console.log("[/api/lead] Lead (undelivered):\n" + textBody);
      return res.status(200).json({ ok: true, delivered: false });
    }
    return res.status(200).json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[/api/lead] Send threw:", err);
    console.log("[/api/lead] Lead (undelivered):\n" + textBody);
    return res.status(200).json({ ok: true, delivered: false });
  }
}
