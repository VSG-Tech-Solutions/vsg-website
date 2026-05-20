# VSG Tech — Brand Assets

Logo files for every platform. Use the SVG where you can (it scales infinitely
without loss). Use the PNG where the platform won't accept SVG (most social
profiles, WhatsApp Business, some email clients).

## What's in here

```
brand-assets/
├── svg/
│   ├── mark-cream.svg              # V on cream rounded-square + coral dot
│   ├── mark-dark.svg               # V on dark rounded-square + coral dot
│   ├── mark-transparent.svg        # V + coral dot, no background
│   ├── wordmark-cream.svg          # VSG· wordmark on cream
│   ├── wordmark-dark.svg           # VSG· wordmark on dark
│   ├── wordmark-transparent.svg    # VSG· wordmark, no background
│   └── favicon-16.svg              # Tiny mark for browser tab favicons
└── png/
    ├── mark-cream/                 # 32 / 64 / 128 / 256 / 512 / 1024 px
    ├── mark-dark/                  # same sizes
    ├── mark-transparent/           # same sizes
    ├── wordmark-cream/             # 200x64 / 400x128 / 800x256 / 1250x400 / 1600x512
    ├── wordmark-dark/              # same sizes
    └── wordmark-transparent/       # same sizes
```

## What to use where

| Where | File to use |
|---|---|
| **LinkedIn personal profile photo** | `png/mark-cream/512.png` (or 1024 for max quality) |
| **LinkedIn company page logo** | `png/mark-cream/256.png` or `512.png` |
| **X / Twitter avatar** | `png/mark-cream/400.png` — but 512 works (X scales it) |
| **GitHub profile / org logo** | `png/mark-cream/256.png` or `512.png` |
| **WhatsApp Business display photo** | `png/mark-cream/512.png` |
| **Slack workspace icon** | `png/mark-cream/512.png` |
| **Google Workspace** | `png/mark-cream/256.png` |
| **Email signature inline image** | `png/wordmark-transparent/200x64.png` |
| **Email signature avatar** | `png/mark-cream/128.png` |
| **PowerPoint / Keynote slides** | `svg/wordmark-cream.svg` (scales) or `png/wordmark-cream/800x256.png` |
| **Presentations on dark slides** | `svg/wordmark-dark.svg` or `png/wordmark-dark/800x256.png` |
| **Letterhead / Word docs** | `svg/wordmark-transparent.svg` or `png/wordmark-transparent/800x256.png` |
| **Browser tab favicon (in code)** | `svg/favicon-16.svg` (already on vsgtech.co.za) |
| **App icon / pinned site** | `png/mark-cream/512.png` |

## Quick rules

- **On cream/light backgrounds:** use `cream` or `transparent` variants
- **On dark/black backgrounds:** use `dark` or `transparent` variants
- **On a coloured background (LinkedIn cover, X header etc):** use `transparent` so the V+dot reads against your colour, OR `cream`/`dark` if you want a contained mark
- **Never re-colour the V or the dot** — coral `#C9633A` and ink `#1A1612` are the brand, don't swap them out

## Colours (for anyone making their own VSG-branded graphics)

| Token | Hex | Where it's used |
|---|---|---|
| Paper (cream) | `#F5F0E8` | Backgrounds, light surfaces |
| Ink (near-black) | `#1A1612` | V letterform, headlines, body text |
| Coral | `#C9633A` | The dot, accents, italic emphasis |
| Dark base | `#13100C` | Dark mode backgrounds |

## Fonts

The wordmark uses **Geist** (weight 800, letter-spacing -0.04em). Free + open
source. Download from https://vercel.com/font or via `next/font/google` in any
React/Next project.

For email signatures or platforms where you can't embed Geist, the PNGs are
already rasterised at high quality — use those instead of trying to render
the SVG with a fallback font.
