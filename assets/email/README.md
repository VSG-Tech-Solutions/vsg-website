# assets/email: hot-linked by every VSG email signature

These files are loaded by every signature we paste into Outlook or Gmail, and by every email already sent with one. Email clients fetch them live from `https://www.vsgtech.co.za/assets/email/`:

- `vsg-logo-v1.png`: the "VSG." wordmark on a white rounded box
- `icon-mail-v1.png`, `icon-phone-v1.png`, `icon-web-v1.png`: the teal contact icons

- **Never move, rename or delete them.** The first signature broke when the 2026-09-27 rebuild put `brand-assets-v2/` in `.vercelignore`: every logo and icon in every inbox went 404.
- **Never overwrite one in place.** `/assets/` is served as `immutable` for a year, so a changed file at the same URL won't reach anyone. A changed image gets a new name (`-v2`) plus new signature HTML.
- Built by `brand-assets-v2/make-email.js`; the logo comes from `assets/site/logo/wordmark.svg`.
- The signature HTML and install steps live in the business vault, `04-operations/ops/email-signature/`.

This README is kept out of the deploy by the `README.md` line in `.vercelignore`.
