"use server";

import { CONTACT } from "@/lib/contact";
import { sendLeadAutoresponder } from "@/lib/lead-autoresponder";

// Server action for the main /contact form ("Request an assessment").
//
// Same delivery pattern as services-lead and pilot-lead:
//   · Resend if RESEND_API_KEY is set, otherwise log to server console.
//   · Action always returns ok=true if it ran; `delivered` flag tells the UI
//     whether email actually went out.
//
// Routed to stephan@vsgtech.co.za by default. Override with
// CONTACT_TO_ADDRESS / CONTACT_FROM_ADDRESS env vars.

export type ContactLeadInput = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  problem?: string;
  message: string;
};

export type ContactLeadResult =
  | { ok: true; delivered: boolean }
  | { ok: false; error: string };

const FROM_ADDRESS =
  process.env.CONTACT_FROM_ADDRESS ??
  process.env.SERVICES_FROM_ADDRESS ??
  process.env.PILOT_FROM_ADDRESS ??
  "VSG Contact Form <onboarding@resend.dev>";
const TO_ADDRESS =
  process.env.CONTACT_TO_ADDRESS ??
  process.env.SERVICES_TO_ADDRESS ??
  process.env.PILOT_TO_ADDRESS ??
  CONTACT.founder.email;

function sanitise(v: unknown, max = 2000): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function validEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function submitContactLead(
  raw: ContactLeadInput
): Promise<ContactLeadResult> {
  const input = {
    name: sanitise(raw.name, 120),
    email: sanitise(raw.email, 200),
    company: sanitise(raw.company, 160),
    phone: sanitise(raw.phone, 40),
    problem: sanitise(raw.problem, 80),
    message: sanitise(raw.message, 4000),
  };

  if (!input.name || !input.email || !input.message) {
    return {
      ok: false,
      error: "Please fill in name, email and a short message.",
    };
  }
  if (!validEmail(input.email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  const subject = `[Vantage enquiry] ${
    input.company || input.name
  }${input.problem ? ` — ${input.problem}` : ""}`;
  const textBody = [
    `New enquiry via vsgtech.co.za/contact`,
    ``,
    `Name:         ${input.name}`,
    `Email:        ${input.email}`,
    input.company ? `Company:      ${input.company}` : null,
    input.phone ? `Phone:        ${input.phone}` : null,
    input.problem ? `Problem area: ${input.problem}` : null,
    ``,
    `Message:`,
    input.message,
    ``,
    `— sent from the /contact form`,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 640px;">
      <h2 style="margin: 0 0 12px 0; color: #0f766e;">New /contact enquiry</h2>
      <p style="margin: 0 0 20px 0; color: #475569;">
        Submitted via <strong>vsgtech.co.za/contact</strong>
      </p>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding:6px 12px 6px 0; color:#64748b; width: 130px;">Name</td><td style="padding:6px 0;"><strong>${escape(input.name)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0; color:#64748b;">Email</td><td style="padding:6px 0;"><a href="mailto:${escape(input.email)}">${escape(input.email)}</a></td></tr>
        ${input.company ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Company</td><td style="padding:6px 0;"><strong>${escape(input.company)}</strong></td></tr>` : ""}
        ${input.phone ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Phone</td><td style="padding:6px 0;">${escape(input.phone)}</td></tr>` : ""}
        ${input.problem ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Problem area</td><td style="padding:6px 0;">${escape(input.problem)}</td></tr>` : ""}
      </table>
      <div style="margin-top: 22px; padding: 14px 16px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
        <div style="color:#64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;">Message</div>
        <div style="margin-top: 8px; color: #0f172a; white-space: pre-wrap;">${escape(input.message)}</div>
      </div>
    </div>
  `;

  const key = process.env.RESEND_API_KEY;

  // eslint-disable-next-line no-console
  console.log(
    [
      "",
      "=============== CONTACT LEAD ===============",
      textBody,
      "============================================",
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
      console.error("[contact-lead] Resend error", resp.status, body);
      return { ok: true, delivered: false };
    }

    // Fire-and-forget autoresponder to the lead. Failure here is logged
    // inside the helper — we never block the user response on it.
    void sendLeadAutoresponder({
      toEmail: input.email,
      toName: input.name,
      context: "contact",
      fromAddress: FROM_ADDRESS,
    });

    return { ok: true, delivered: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[contact-lead] fetch failed", err);
    return { ok: true, delivered: false };
  }
}

function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
