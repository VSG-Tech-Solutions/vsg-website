"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, X, ArrowRight } from "lucide-react";
import { BookingButton } from "./BookingButton";
import { CONTACT } from "@/lib/contact";

export type ThankYouContext = "contact" | "pilot" | "services";

const COPY: Record<
  ThankYouContext,
  { title: (firstName: string) => string; delivered: string; fallback: string }
> = {
  contact: {
    title: (n) => `Thanks${n ? ", " + n : ""}!`,
    delivered: `Your message just landed in ${CONTACT.founder.name.split(" ")[0]}'s inbox. The team will come back to you directly — most replies inside a few hours, latest within one working day.`,
    fallback: `We've recorded your enquiry and will follow up within one working day. If you'd rather reach out directly, write to ${CONTACT.founder.email}.`,
  },
  pilot: {
    title: (n) => `You're on the list${n ? ", " + n : ""}!`,
    delivered: `Your pilot enquiry just landed. ${CONTACT.founder.name.split(" ")[0]} reads every one personally — same day. You'll hear back within one working day with a yes, a no, or "let's jump on a call."`,
    fallback: `We've recorded your pilot enquiry and will follow up within one working day. If you'd rather reach out directly, write to ${CONTACT.founder.email}.`,
  },
  services: {
    title: (n) => `Brief received${n ? ", " + n : ""}!`,
    delivered: `Your brief just landed. ${CONTACT.founder.name.split(" ")[0]} reads it personally today — within one working day you'll get a yes, a no, or "let's jump on a scoping call."`,
    fallback: `We've recorded your brief and will follow up within one working day. If you'd rather reach out directly, write to ${CONTACT.founder.email}.`,
  },
};

type Props = {
  open: boolean;
  onClose: () => void;
  context: ThankYouContext;
  firstName?: string;
  /** True if the lead was actually delivered via Resend, false if we fell back to logging. */
  delivered: boolean;
};

/**
 * Modal "Thanks for the message" popup shown after a successful form submission.
 * Replaces the previous inline success block on /contact, /pilot, /services.
 *
 * - Backdrop click and Escape key both close.
 * - Calendly CTA inside the modal so leads can self-serve a slot without
 *   leaving the dialog.
 * - Animations via framer-motion (AnimatePresence on the backdrop + card).
 */
export const ThankYouModal: React.FC<Props> = ({
  open,
  onClose,
  context,
  firstName = "",
  delivered,
}) => {
  const c = COPY[context];

  // Lock body scroll while open + close on Escape.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="thankyou-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="thankyou-title"
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            background: "rgba(2, 8, 18, 0.72)",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            key="thankyou-card"
            initial={{ opacity: 0, scale: 0.92, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 26,
              mass: 0.6,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-2xl border p-7 sm:p-8 themed-rounded"
            style={{
              borderColor: "var(--card-border)",
              background: "var(--card-bg)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.45), 0 0 0 1px var(--ring) inset",
            }}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors cursor-pointer"
              style={{
                color: "var(--muted)",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--bg-elev)";
                e.currentTarget.style.color = "var(--fg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--muted)";
              }}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Animated success icon */}
            <motion.div
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 18,
                delay: 0.1,
              }}
              className="inline-flex items-center justify-center rounded-full themed-rounded"
              style={{
                width: 56,
                height: 56,
                background: "var(--accent-soft)",
                border: "1px solid var(--ring)",
              }}
            >
              <CheckCircle2
                className="w-7 h-7"
                style={{ color: "var(--accent-2)" }}
              />
            </motion.div>

            <h2
              id="thankyou-title"
              className="mt-5 text-2xl sm:text-3xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-display)", color: "var(--fg)" }}
            >
              {c.title(firstName)}
            </h2>
            <p
              className="mt-3 text-sm leading-relaxed"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
              }}
            >
              {delivered ? c.delivered : c.fallback}
            </p>

            {/* Calendly self-serve CTA */}
            <div
              className="mt-6 rounded-xl border p-4 themed-rounded"
              style={{
                borderColor: "var(--ring)",
                background: "var(--accent-soft)",
              }}
            >
              <p
                className="text-xs uppercase tracking-[0.14em] font-semibold mb-2"
                style={{ color: "var(--accent-2)" }}
              >
                Skip the wait
              </p>
              <p
                className="text-sm mb-3"
                style={{
                  color: "var(--fg)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Pick a 20-minute slot now and we&apos;ll talk it through.
              </p>
              <BookingButton
                onClick={() => {
                  // Close the modal once Calendly opens so the popup doesn't
                  // sit behind the booking widget.
                  onClose();
                }}
                className="group inline-flex items-center justify-center gap-2 w-full px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer themed-rounded"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--accent), color-mix(in oklab, var(--accent) 80%, black))",
                  color: "#ffffff",
                  boxShadow: "0 0 24px var(--accent-glow)",
                  fontFamily: "var(--font-body)",
                }}
              >
                <span>Book a 20-minute slot</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </BookingButton>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="mt-5 text-sm font-medium transition-colors cursor-pointer"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--font-body)",
                background: "transparent",
                border: "none",
                padding: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--fg)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--muted)";
              }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
