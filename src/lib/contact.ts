/**
 * Single source of truth for public contact channels.
 *
 * Two tiers:
 *   - company: general enquiries, auditors, legal, anyone who needs a stable
 *     role-based inbox that outlives individual people.
 *   - founder: direct line to Stephan for buyers who want founder access
 *     without an account-manager relay.
 */

export const CONTACT = {
  company: {
    name: "VSG Tech Solutions",
    email: "hello@vsgtech.co.za",
    phone: "+27 63 616 9780",
    phoneHref: "tel:+27636169780",
    linkedin: "https://www.linkedin.com/company/vsg-tech-solutions",
    linkedinLabel: "Follow VSG on LinkedIn",
  },
  founder: {
    name: "Stephan Esterhuizen",
    role: "Founder",
    email: "stephan@vsgtech.co.za",
    linkedin: "https://www.linkedin.com/in/stephan-esterhuizen-459714365/",
    linkedinLabel: "Connect with Stephan",
  },
  booking: {
    // Calendly: one event type, "20-minute scoping call".
    // Used by <BookingButton /> (Calendly popup) and the lead autoresponder.
    scopingCall: "https://calendly.com/stephan_esterhuizen/scoping-call",
  },
  location: "Cape Town · South Africa",
  timezone: "CAT time zone",
  compliance: "POPIA-aligned",
} as const;
