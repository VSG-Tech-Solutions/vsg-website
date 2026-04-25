"use server";

import { CONTACT } from "@/lib/contact";

// Server action for the Pilot Promo lead form.
//
// Sends the lead to Stephan directly. Two delivery paths in priority order:
//
//   1. RESEND_API_KEY set  → POST to Resend REST API, email to stephan@vsgtech.co.za
//                            (no SDK dep — plain fetch). Resend gives 100 emails/day free.
//                            Set up: https://resend.com → add RESEND_API_KEY to .env.local
//   2. no key, any env     → logs the submission to the server console as "PILOT LEAD"
//                            so Stephan can still see inbound leads in Vercel/server logs.
//
// The form always gets a success response as long as the action itself ran —
// dropping leads because an integration is mis-configured is worse than logging
// them. If Resend returns a 4xx/5xx, we still log + return success but mark
// `delivered: false` so the UI can show a soft "we'll reach out, or email
// stephan@vsgtech.co.za directly" fallback message.

export type PilotLeadInput = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  role?: string;
  erp?: string;
  message: string;
};

export type PilotLeadResult =
  | { ok: true; delivered: boolean }
  | { ok: false; error: string };

const FROM_ADDRESS =
  process.env.PILOT_FROM_ADDRESS ?? "VSG Pilot Form <onboarding@resend.dev>";
const TO_ADDRESS = process.env.PILOT_TO_ADDRESS ?? CONTACT.founder.email;

function sanitise(v: unknown, max = 2000): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function submitPilotLead(
  raw: PilotLeadInput
): Promise<PilotLeadResult> {
  const input = {
    name: sanitise(raw.name, 120),
    company: sanitise(raw.company, 160),
    email: sanitise(raw.email, 200),
    phone: sanitise(raw.phone, 40),
    role: sanitise(raw.role, 120),
    erp: sanitise(raw.erp, 120),
    message: sanitise(raw.message, 4000),
  };

  // Honeypot-equivalent: basic required-field + email check.
  if (!input.name || !input.company || !input.email || !input.message) {
    return { ok: false, error: "Please fill in name, company, email and message." };
  }
  if (!validEmail(input.email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  const subject = `[Pilot slot request] ${input.company} — ${input.name}`;
  const textBody = [
    `New pilot slot request via vsgtech.co.za/pilot`,
    ``,
    `Name:     ${input.name}`,
    `Company:  ${input.company}`,
    `Email:    ${input.email}`,
    input.phone ? `Phone:    ${input.phone}` : null,
    input.role ? `Role:     ${input.role}` : null,
    input.erp ? `ERP:      ${input.erp}` : null,
    ``,
    `Message:`,
    input.message,
    ``,
    `— sent from the Pilot Promo form`,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 640px;">
      <h2 style="margin: 0 0 12px 0; color: #0f766e;">New pilot slot request</h2>
      <p style="margin: 0 0 20px 0; color: #475569;">
        Submitted via <strong>vsgtech.co.za/pilot</strong>
      </p>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding:6px 12px 6px 0; color:#64748b; width: 110px;">Name</td><td style="padding:6px 0;"><strong>${escape(input.name)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0; color:#64748b;">Company</td><td style="padding:6px 0;"><strong>${escape(input.company)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0; color:#64748b;">Email</td><td style="padding:6px 0;"><a href="mailto:${escape(input.email)}">${escape(input.email)}</a></td></tr>
        ${input.phone ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Phone</td><td style="padding:6px 0;">${escape(input.phone)}</td></tr>` : ""}
        ${input.role ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Role</td><td style="padding:6px 0;">${escape(input.role)}</td></tr>` : ""}
        ${input.erp ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">ERP</td><td style="padding:6px 0;">${escape(input.erp)}</td></tr>` : ""}
      </table>
      <div style="margin-top: 22px; padding: 14px 16px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
        <div style="color:#64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;">Message</div>
        <div style="margin-top: 8px; color: #0f172a; white-space: pre-wrap;">${escape(input.message)}</div>
      </div>
    </div>
  `;

  const key = process.env.RESEND_API_KEY;

  // Always log — cheap insurance if email delivery fails.
  // eslint-disable-next-line no-console
  console.log(
    [
      "",
      "================== PILOT LEAD ==================",
      textBody,
      "================================================",
      "",
    ].join("\n")
  );

  if (!key) {
    return { ok: true, delivered: false };
  }

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [TO_ADDRESS],
        reply_to: input.email,
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!resp.ok) {
      const body = await resp.text().catch(() => "");
      // eslint-disable-next-line no-console
      console.error("[pilot-lead] Resend error", resp.status, body);
      return { ok: true, delivered: false };
    }

    return { ok: true, delivered: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[pilot-lead] fetch failed", err);
    return { ok: true, delivered: false };
  }
}

// Minimal HTML-escape for the email template — the inputs are already sanitised
// but we don't want to emit raw user strings into an HTML context.
function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
