"use server";

import { CONTACT } from "@/lib/contact";
import { sendLeadAutoresponder } from "@/lib/lead-autoresponder";

// Server action for the /services custom-build scoping form.
//
// Same delivery pattern as the pilot-lead action — Resend if RESEND_API_KEY
// is set, otherwise log to the server console. The form always reports a
// successful submission as long as the action ran; delivery-failure just
// toggles the `delivered` flag so the UI can show a soft fallback.
//
// Routed to stephan@vsgtech.co.za by default. Override with
// SERVICES_TO_ADDRESS / SERVICES_FROM_ADDRESS env vars if needed.

export type ServicesLeadInput = {
  name: string;
  company: string;
  email: string;
  phone?: string;
  role?: string;
  serviceLine?: string;
  budget?: string;
  timeline?: string;
  message: string;
};

export type ServicesLeadResult =
  | { ok: true; delivered: boolean }
  | { ok: false; error: string };

const FROM_ADDRESS =
  process.env.SERVICES_FROM_ADDRESS ??
  process.env.PILOT_FROM_ADDRESS ??
  "VSG Services Form <onboarding@resend.dev>";
const TO_ADDRESS =
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

export async function submitServicesLead(
  raw: ServicesLeadInput
): Promise<ServicesLeadResult> {
  const input = {
    name: sanitise(raw.name, 120),
    company: sanitise(raw.company, 160),
    email: sanitise(raw.email, 200),
    phone: sanitise(raw.phone, 40),
    role: sanitise(raw.role, 120),
    serviceLine: sanitise(raw.serviceLine, 80),
    budget: sanitise(raw.budget, 80),
    timeline: sanitise(raw.timeline, 80),
    message: sanitise(raw.message, 4000),
  };

  if (!input.name || !input.company || !input.email || !input.message) {
    return {
      ok: false,
      error: "Please fill in name, company, email and a short brief.",
    };
  }
  if (!validEmail(input.email)) {
    return { ok: false, error: "That email address doesn't look right." };
  }

  const subject = `[Custom build enquiry] ${input.company} — ${input.name}`;
  const textBody = [
    `New custom-build enquiry via vsgtech.co.za/services`,
    ``,
    `Name:         ${input.name}`,
    `Company:      ${input.company}`,
    `Email:        ${input.email}`,
    input.phone ? `Phone:        ${input.phone}` : null,
    input.role ? `Role:         ${input.role}` : null,
    input.serviceLine ? `Service line: ${input.serviceLine}` : null,
    input.budget ? `Budget band:  ${input.budget}` : null,
    input.timeline ? `Timeline:     ${input.timeline}` : null,
    ``,
    `Brief:`,
    input.message,
    ``,
    `— sent from the /services scoping form`,
  ]
    .filter(Boolean)
    .join("\n");

  const htmlBody = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 640px;">
      <h2 style="margin: 0 0 12px 0; color: #0f766e;">New custom-build enquiry</h2>
      <p style="margin: 0 0 20px 0; color: #475569;">
        Submitted via <strong>vsgtech.co.za/services</strong>
      </p>
      <table style="width:100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding:6px 12px 6px 0; color:#64748b; width: 130px;">Name</td><td style="padding:6px 0;"><strong>${escape(input.name)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0; color:#64748b;">Company</td><td style="padding:6px 0;"><strong>${escape(input.company)}</strong></td></tr>
        <tr><td style="padding:6px 12px 6px 0; color:#64748b;">Email</td><td style="padding:6px 0;"><a href="mailto:${escape(input.email)}">${escape(input.email)}</a></td></tr>
        ${input.phone ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Phone</td><td style="padding:6px 0;">${escape(input.phone)}</td></tr>` : ""}
        ${input.role ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Role</td><td style="padding:6px 0;">${escape(input.role)}</td></tr>` : ""}
        ${input.serviceLine ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Service line</td><td style="padding:6px 0;">${escape(input.serviceLine)}</td></tr>` : ""}
        ${input.budget ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Budget band</td><td style="padding:6px 0;">${escape(input.budget)}</td></tr>` : ""}
        ${input.timeline ? `<tr><td style="padding:6px 12px 6px 0; color:#64748b;">Timeline</td><td style="padding:6px 0;">${escape(input.timeline)}</td></tr>` : ""}
      </table>
      <div style="margin-top: 22px; padding: 14px 16px; border: 1px solid #e2e8f0; border-radius: 8px; background: #f8fafc;">
        <div style="color:#64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;">Brief</div>
        <div style="margin-top: 8px; color: #0f172a; white-space: pre-wrap;">${escape(input.message)}</div>
      </div>
    </div>
  `;

  const key = process.env.RESEND_API_KEY;

  // eslint-disable-next-line no-console
  console.log(
    [
      "",
      "=============== SERVICES LEAD ===============",
      textBody,
      "=============================================",
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
      console.error("[services-lead] Resend error", resp.status, body);
      return { ok: true, delivered: false };
    }

    void sendLeadAutoresponder({
      toEmail: input.email,
      toName: input.name,
      context: "services",
      fromAddress: FROM_ADDRESS,
    });

    return { ok: true, delivered: true };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[services-lead] fetch failed", err);
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
