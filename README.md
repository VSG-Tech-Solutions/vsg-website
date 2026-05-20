# VSG Tech Solutions — vsgtech.co.za

Marketing site for **VSG Tech Solutions** — Cape Town. AI products + bespoke
AI software for South African mid-market manufacturers and distributors.

Live at: **https://vsgtech.co.za**

## Stack

- **Static HTML + CSS** — 8 pages (index, source, pace, ace, services,
  how-it-works, about, contact) sharing `colors_and_type.css` design tokens
- **React 18 + Babel-in-browser** — all components in `js/*.jsx`, loaded via
  unpkg CDN at runtime, no build step
- **Geist + Geist Mono** — variable fonts in `fonts/`
- **Vercel serverless function** — `api/lead.js` handles all contact and demo
  form submissions, delivers via **Resend** if `RESEND_API_KEY` is set
- Deployed on **Vercel** (project `vsg-website-live`)

## Local development

```bash
# Any static server works. The included npm script uses http-server:
npm run dev                          # → http://localhost:5500

# Or directly:
npx http-server -p 5500 -c-1 --cors
```

The serverless function at `api/lead.js` runs locally via `vercel dev` if you
have the Vercel CLI installed:

```bash
npx vercel dev
```

## Form delivery (Resend)

`api/lead.js` handles all form submissions (demo modal + /contact). It:

1. Validates name / email / message
2. Sends an email via Resend if `RESEND_API_KEY` is set in Vercel env vars
3. Falls back to logging the lead to function output if Resend is missing
4. Always returns `{ ok: true, delivered: bool }` on a valid payload so the UI
   shows the thank-you state and nothing is lost

Required env var on Vercel (Project → Settings → Environment Variables):

```
RESEND_API_KEY        # from resend.com dashboard
```

Optional overrides:

```
CONTACT_TO_ADDRESS    # default: stephan@vsgtech.co.za
CONTACT_FROM_ADDRESS  # default: VSG Contact Form <onboarding@resend.dev>
```

Until you verify a custom domain in Resend, the FROM address must stay as
`onboarding@resend.dev` (Resend's restriction, not ours).

## Project layout

```
.
├── index.html              # home
├── source.html             # /products/source
├── pace.html               # /products/pace
├── ace.html                # /ace
├── services.html           # /services
├── how-it-works.html       # /how-it-works
├── about.html              # /about
├── contact.html            # /contact
├── logos.html              # internal — logo concept previews
├── favicon.svg
├── colors_and_type.css     # design tokens + global styles
├── api/
│   └── lead.js             # Vercel serverless: form delivery via Resend
├── assets/                 # SVG marks
├── fonts/                  # Geist variable fonts
├── js/                     # React components (loaded by Babel at runtime)
│   ├── atoms.jsx           # shared primitives (Button, Section, etc.)
│   ├── Nav.jsx, Footer.jsx, PageShell.jsx
│   ├── Hero.jsx, Products.jsx, Services.jsx, Ace.jsx,
│   │   HowItWorks.jsx, Founder.jsx, FAQ.jsx, CTAFinal.jsx,
│   │   TrustStrip.jsx, HomeExtras.jsx
│   ├── App.jsx             # home page composition
│   ├── SourcePage.jsx, PacePage.jsx, AcePage.jsx,
│   │   ServicesPage.jsx, HowPage.jsx, AboutPage.jsx, ContactPage.jsx
│   ├── DemoModal.jsx       # global "Book a demo" modal
│   └── ThemeSwitcher.jsx
├── vercel.json             # cleanUrls, JSX content-type, asset caching
└── package.json            # one dep (resend) for the serverless function
```

## Deployment

Pushes to `main` deploy to production (vsgtech.co.za).
Pushes to any feature branch get an auto-generated preview URL on Vercel.

Per repo policy: production deploys are gated — review the preview URL on a
feature branch before merging to main.

<!-- auto-deploy webhook test: 2026-05-18T14:53Z -->

<!-- auto-deploy webhook test: 2026-05-20T11:00Z -->
