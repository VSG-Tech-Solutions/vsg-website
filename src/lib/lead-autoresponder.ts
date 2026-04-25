import { CONTACT } from "@/lib/contact";

// Sends a friendly "thanks, we got your message" email back to the lead, with
// the Calendly link so they can self-serve a scoping call instead of waiting.
// Called fire-and-forget by the three lead server actions (contact / pilot /
// services) AFTER the internal-notification email to Stephan has been queued.
//
// No-op if RESEND_API_KEY is missing — same fallback behaviour as the rest
// of the email pipeline.

export type AutoresponderContext = "pilot" | "services" | "contact";

const BOOKING_URL = CONTACT.booking.scopingCall;

const COPY: Record<
  AutoresponderContext,
  {
    subject: string;
    intro: string;
    whatNext: string[];
    signoff: string;
  }
> = {
  pilot: {
    subject: "Got your pilot enquiry — VSG Tech Solutions",
    intro:
      "Thanks for the pilot slot enquiry. It just landed in my inbox and I'll be reading it personally today.",
    whatNext: [
      "I read every pilot enquiry myself, same day.",
      "You'll hear back within one working day — a yes, a no, or 'let's jump on a call.'",
      "If we're a fit, the 30-minute scoping call → pilot offer in writing within 48 hours.",
    ],
    signoff:
      "If you'd rather skip the wait, grab a 20-minute slot directly on my calendar:",
  },
  services: {
    subject: "Got your custom-build enquiry — VSG Tech Solutions",
    intro:
      "Thanks for sending the brief. It just landed in my inbox and I'll read it personally today.",
    whatNext: [
      "I read the brief same day.",
      "Within one working day: a yes, a no, or 'let's jump on a scoping call.'",
      "If it's a fit — a 1–2 week scoping engagement → fixed-price quote in writing.",
    ],
    signoff: "If you'd rather book the call now, here's my calendar:",
  },
  contact: {
    subject: "Got your message — VSG Tech Solutions",
    intro:
      "Thanks for reaching out. Your enquiry just landed with us and we'll come back inside one working day.",
    whatNext: [
      "We read every message personally, same day.",
      "You'll hear back inside one working day — most replies inside a few hours.",
      "If we're not a fit, we'll tell you honestly. No follow-up sequence.",
    ],
    signoff: "Want to skip the wait and talk now? Pick a 20-minute slot:",
  },
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendLeadAutoresponder(opts: {
  toEmail: string;
  toName: string;
  context: AutoresponderContext;
  fromAddress: string;
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return false;

  const c = COPY[opts.context];
  const firstName = (opts.toName.split(/\s+/)[0] || "there").slice(0, 60);

  const text = [
    `Hi ${firstName},`,
    ``,
    c.intro,
    ``,
    `What happens next:`,
    ...c.whatNext.map((s, i) => `  ${i + 1}. ${s}`),
    ``,
    c.signoff,
    BOOKING_URL,
    ``,
    `Or just reply to this email — it goes straight back to me.`,
    ``,
    `— ${CONTACT.founder.name}`,
    `Founder, VSG Tech Solutions`,
    `${CONTACT.founder.email} · ${CONTACT.company.phone}`,
  ].join("\n");

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;color:#0f172a;font-size:15px;line-height:1.6;">
      <p style="margin:0 0 16px 0;">Hi ${escapeHtml(firstName)},</p>
      <p style="margin:0 0 18px 0;">${escapeHtml(c.intro)}</p>
      <div style="margin:22px 0;padding:18px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;">
        <div style="font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:#64748b;margin-bottom:10px;">What happens next</div>
        <ol style="margin:0;padding-left:20px;color:#1e293b;">
          ${c.whatNext
            .map((s) => `<li style="margin:6px 0;">${escapeHtml(s)}</li>`)
            .join("")}
        </ol>
      </div>
      <p style="margin:0 0 12px 0;">${escapeHtml(c.signoff)}</p>
      <p style="margin:0 0 22px 0;">
        <a href="${BOOKING_URL}" style="display:inline-block;padding:12px 20px;background:#0f766e;color:#ffffff;font-weight:600;border-radius:9px;text-decoration:none;">
          Book a 20-minute scoping call →
        </a>
      </p>
      <p style="margin:0 0 4px 0;color:#475569;">Or just reply to this email — it goes straight back to me.</p>
      <hr style="margin:28px 0;border:none;border-top:1px solid #e2e8f0;" />
      <p style="margin:0;color:#64748b;font-size:13px;line-height:1.5;">
        — <strong style="color:#0f172a;">${escapeHtml(CONTACT.founder.name)}</strong><br />
        Founder, VSG Tech Solutions<br />
        <a href="mailto:${CONTACT.founder.email}" style="color:#0f766e;">${escapeHtml(CONTACT.founder.email)}</a> · ${escapeHtml(CONTACT.company.phone)}
      </p>
    </div>
  `;

  try {
    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        from: opts.fromAddress,
        to: [opts.toEmail],
        reply_to: CONTACT.founder.email,
        subject: c.subject,
        text,
        html,
      }),
    });
    if (!resp.ok) {
      const body = await resp.text().catch(() => "");
      // eslint-disable-next-line no-console
      console.error(
        "[autoresponder] Resend error",
        opts.context,
        resp.status,
        body
      );
      return false;
    }
    return true;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[autoresponder] fetch failed", opts.context, err);
    return false;
  }
}
