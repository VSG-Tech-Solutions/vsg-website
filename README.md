# VSG Tech Solutions, vsgtech.co.za

Website for **VSG**, an AI company that specializes in operations. Cape Town.

Live at: **https://vsgtech.co.za** (branch `main`). Nothing on a feature branch goes live without Stephan.

## Stack

- **Plain HTML, CSS and JS.** No framework, no npm packages for the pages.
- **`site-src/`** holds the page sources, partials and the tiny Node build. Read `site-src/README.md`
  before changing anything: it documents the pages, partials, classes, 3D pieces and the rules.
- **`assets/site/`** holds the shared CSS (`halo.css`, `site.css`), `site.js`, the logo SVGs and the
  page CSS and JS the build copies in.
- **Fonts:** Switzer from Fontshare and IBM Plex Mono from Google Fonts, linked from the page head.
  No font files ship in this public repo.
- **Vercel serverless function** `api/lead.js` delivers form submissions via Resend.

## Build and preview

```bash
node site-src/build.js          # builds every page to the repo root, plus sitemap.xml and robots.txt
node site-src/serve.js 5600     # local preview with clean URLs: http://localhost:5600/
```

The built `*.html`, `sitemap.xml` and `robots.txt` at the root are committed; Vercel serves the repo
root as a static site with `cleanUrls` (`/procure` serves `procure.html`). `vercel.json` holds the
permanent redirects from the old site's URLs and the cache headers.

## Pages

| URL | Source |
|---|---|
| `/` | `site-src/pages/home.html` |
| `/endorse`, `/core`, `/procure` | products |
| `/bootcamp`, `/custom` | services |
| `/about`, `/contact`, `/privacy` | company |
| `/kit` | the shared component kit (noindex, not in the sitemap) |
| `404.html` | not found |

## Form delivery (Resend)

`api/lead.js` handles every form submission (the Bootcamp booking and /contact). It validates the
payload, sends an email via Resend when `RESEND_API_KEY` is set in the Vercel environment, and
otherwise logs the lead to the function output. It returns `{ ok: true, delivered: bool }` on a valid
payload.

```
RESEND_API_KEY        # from the Resend dashboard (Vercel env vars, never in the repo)
CONTACT_TO_ADDRESS    # default: stephan@vsgtech.co.za
CONTACT_FROM_ADDRESS  # default: VSG Contact Form <onboarding@resend.dev>
```

## Deployment

Pushes to `main` deploy to production. Feature branches get a Vercel preview URL. Production is
gated: review the preview before merging to `main`.
