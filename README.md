# VSG Tech Solutions — vsgtech.co.za

Marketing site for **VSG Tech Solutions** — Cape Town. Vantage (operational
control platform) + custom software, custom AI and workflow automation for
South African mid-market operators.

Live at: https://vsgtech.co.za _(once domain is wired in Vercel)_

## Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** + TypeScript
- **Tailwind CSS v4** with theme-aware CSS custom properties
- **Framer Motion** for entrance / scroll animations
- **Resend** REST API for form delivery (server actions)
- Deployed on **Vercel**

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in RESEND_API_KEY (optional in dev)
npm run dev                         # http://localhost:3000
```

Submissions to the contact / pilot / services forms work without a Resend key
— they're logged to the dev-server stdout so nothing is lost in development.
Set `RESEND_API_KEY` in `.env.local` to enable real email delivery.

## Useful scripts

- `npm run dev` — dev server with Turbopack
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — ESLint
- `npx tsc --noEmit` — TypeScript-only check

## Project shape

```
src/
  app/
    actions/           # server actions (contact-lead, pilot-lead, services-lead)
    (page routes)      # /, /vantage, /services, /pilot, /case-studies, /about, /contact, …
  components/          # all UI components (Hero, VantageAI, ContactForm, …)
  lib/                 # shared constants (CONTACT, copy)
public/                # static assets (logos, favicons, opengraph)
```

## Deploying

Pushed to `main` on https://github.com/VSG-Tech-Solutions/vsg-website — Vercel
auto-deploys. Set `RESEND_API_KEY` (and any optional `*_TO_ADDRESS` /
`*_FROM_ADDRESS` overrides — see `.env.local.example`) in the Vercel dashboard.

## Ownership

Solo-founder build by **Stephan** at VSG Tech Solutions. Feedback and pilot
enquiries: stephan@vsgtech.co.za.
