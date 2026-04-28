/**
 * Single source of truth for public contact channels.
 *
 * Two tiers:
 *   - company: general enquiries, auditors, legal, anyone who needs a stable
 *     role-based inbox that outlives individual people.
 *   - founders: direct lines to Stephan + Ernst for buyers who want founder
 *     access without an account-manager relay.
 *
 * `founder` (singular) is kept as an alias to `founders.stephan` so older
 * components and the founder-variant CTA keep working without a refactor.
 */

const stephan = {
  name: "Stephan Esterhuizen",
  role: "Co-founder",
  email: "stephan@vsgtech.co.za",
  linkedin: "https://www.linkedin.com/in/stephan-esterhuizen-459714365/",
  linkedinLabel: "Connect with Stephan",
  initials: "SE",
} as const;

const ernst = {
  name: "Ernst",
  role: "Co-founder",
  email: "Ernst@vsgtech.co.za",
  linkedin: "",
  linkedinLabel: "Connect with Ernst",
  initials: "E",
} as const;

export const CONTACT = {
  company: {
    name: "VSG Tech Solutions",
    email: "hello@vsgtech.co.za",
    phone: "+27 63 616 9780",
    phoneHref: "tel:+27636169780",
    linkedin: "https://www.linkedin.com/company/vsg-tech-solutions",
    linkedinLabel: "Follow VSG on LinkedIn",
  },
  founders: {
    stephan,
    ernst,
    /** Both founders, in display order, for components that render the team. */
    list: [stephan, ernst] as const,
  },
  /** Backwards-compat alias — Stephan remains the default direct-line for
   *  the CTA founder variant and the old `CONTACT.founder` lookups. */
  founder: stephan,
  booking: {
    // Calendly: one event type, "20-minute scoping call".
    // Used by <BookingButton /> (Calendly popup) and the lead autoresponder.
    scopingCall: "https://calendly.com/stephan_esterhuizen/scoping-call",
  },
  location: "Cape Town · South Africa",
  timezone: "CAT time zone",
  compliance: "POPIA-aligned",
} as const;
