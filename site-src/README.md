# vsgtech.co.za, the site source

Plain HTML, CSS and JS. No framework, no npm packages. A tiny Node build assembles each page
from shared partials and writes it to the repo root, where Vercel serves it with `cleanUrls`
(`/endorse` serves `endorse.html`). The live site is `main`; this work is on `feat/halo-site`.

Open **kit.html** (built from `pages/_kit.html`, noindex) to see every shared piece working,
then copy its markup.

## Build and preview

A full build also writes `sitemap.xml` (every page without `noindex`, minus the 404) and `robots.txt`.
HTML comments in a page source are stripped from the served page, so builder notes stay in `site-src`.
The repo is public, so never put anything private in them either.


```
node site-src/build.js            # builds every page in site-src/pages
node site-src/build.js endorse    # builds one page (page builders: only ever your own)
node site-src/serve.js 5600       # local preview with clean URLs: http://localhost:5600/kit
```

The build warns if a page contains an en or em dash, an image tag, an unresolved `{{...}}`, or a
name from the local banned list (`site-src/banned.local.txt`, one per line, kept out of git). Fix every warning.

## Add a page

1. Create `site-src/pages/<name>.html`. It starts with front matter, then the sections:

   ```
   ---
   title: VSG Procure | Buy the right stock at the right landed cost
   description: One or two plain sentences for search and link previews.
   path: /procure
   nav: procure
   ---
   <section class="w-hero">...</section>
   ```

   | Key | Meaning |
   |---|---|
   | `title`, `description`, `path` | Required. `path` makes the canonical and OG URL |
   | `nav` | `home`, `endorse`, `core`, `procure`, `bootcamp`, `custom`, `about`, `contact`: lights the menu |
   | `og_title`, `og_description` | Optional overrides for link previews |
   | `announce: false` | Hides the announcement bar |
   | `noindex: true` | For non-public pages |
   | `body` | Extra class on `<body>` |
   | `out` | Output file name (default `<name>.html`; `home` writes `index.html`) |

2. Optional `pages/<name>.css` and `pages/<name>.js` are copied to `assets/site/pages/` and linked
   only on that page, with a content hash for cache busting (Vercel caches `/assets` for a year).
   Page CSS lays things out with tokens; it never restyles a shared class. Prefix page classes
   with a short page letter (`p-`, `e-`, `k-` in the kit).
3. The build wraps your sections in `<main id="main">` between the shared nav and footer. Do not
   add another `<main>`, nav or footer. Use one `<h1>` per page.
4. All pages sit at the root, so asset paths are relative (`assets/site/...`) and links are clean
   (`/procure`, `/bootcamp#book`).

## Partials (include with `{{> name key="value"}}`)

| Partial | What | Params |
|---|---|---|
| `engine` | The exploded 3D engine stack | `class` (`w-engine--compact`, `w-engine--dark`), `intro` |
| `globe` | The Shanghai to Durban import globe with day slider | `class` (`w-globe--light`), `id` (slider id if two on a page) |
| `model` | The VSG Core node canvas | `class` (`w-model--light`), `height` (default `460px`), `align` (`right`) |
| `cta` | Closing call to action on obsidian | `title`, `sub` |
| `winbar` | Halo window bar for a floating UI | `product`, `org` (default Karoo Industrial Supply), `crumb`, `right` (HTML, single quotes only) |
| `mark`, `wordmark` | The Sign-off logo, inline | `size` / `height`, `class` |

`nav`, `footer`, `head`, `announce` and `icons.svg` are shared and filled by the build.
Param values cannot contain double quotes.

## Icons

`partials/icons.svg` holds the Halo icon set (20-unit grid, 1.5 stroke) plus website additions.
The build copies only the icons a page uses into an inline sprite:
`<svg class="w-i" aria-hidden="true"><use href="#i-check"/></svg>`.
Names: menu, x, home, search, pin, hist, folder, grid, layers, shield, chart, users, user, cal,
clock, agent, spark, check, chev, down, arrow, warn, filter, doc, bolt, inbox, plus, minus, link,
graph, table, eye, gear, globe, wrench, truck, factory, flag, note, send, ext, lock, server, mail,
ship, box, receipt, list, trace, play, pause, rotate, cmd, code, coins.

## Classes

Halo (`assets/site/halo.css`, the product pack minus its font section) supplies tokens and the
product components used inside illustrations (`.btn`, `.tbl`, `.ag`, `.st`, `.nav`, `.kv`, ...).
`assets/site/site.css` is the website layer; every website class starts with `w-`.

**Type:** `.w-display` (hero H1 only, 44 to 84px, 22ch measure; add `.w-display--long` for a headline line longer than about 25 characters), `.w-h1` (page heroes), `.w-h2`, `.w-h3`, `.w-h4`,
`.w-mute` (the grey second clause of a two-tone headline), `.w-accent` (the solid cobalt second
line of a hero; never gradient), `.w-lead`, `.w-body`, `.w-small`, `.w-tiny`, `.w-num` (mono figures),
`.w-prose`, `.w-word` (the huge "products" / "custom" word).

**Layout:** `.w-wrap` (1200), `.w-wrap--wide` (1320), `.w-wrap--narrow` (760); `.w-sec` (section
rhythm), `--tight`, `--flush-top`, `--flush-bottom`; backgrounds `.w-bg-white`, `.w-bg-canvas`,
`.w-dark` (obsidian, 2 or 3 per page), `.w-band` (rounded); `.w-head` (stacked header), `--center`,
`--split` (only when the right column earns it); `.w-split` (copy beside a visual), `--rev`, `--even`,
`--top`; `.w-actions` (button row), `--center`; `.w-trust` (one small line under hero buttons).

**Buttons and links:** Halo `.btn .btn-p` (primary, cobalt) and `.btn .btn-s` (secondary) at
`.btn-lg` (44px) or `.btn-xl` (52px). `.w-link` for a cobalt text link with an arrow.
One label per intent. Home and Bootcamp: **Book a Bootcamp** (`/bootcamp#book`) primary. Procure, Endorse
and Core: **Request a demo** (`/contact?topic=<key>-demo`) primary. Custom: **Tell us what you need**
(`/contact?topic=custom`). The secondary is always **Contact us** (`/contact?topic=contact`); the nav link
reads **Contact**. Topic keys: procure-demo, endorse-demo, core-demo, bootcamp, custom, contact.
The `cta` partial takes `title`, `sub`, `primary`, `primary_href`, `secondary`, `secondary_href`.

**Labels:** `.w-badge` plus `--sample` (Sample data) and `--lg` size. The site shows no product stage
or availability labels; the other badge modifiers stay in the CSS for product UIs only.
`.w-chip` is a hero pill holding a badge and a short line.

**Blocks:** `.w-hero` + `.w-hero-in` + `.w-hero-shot` (centred hero with a window under it);
`.w-glow` (ambient cobalt and violet light, two `<i>`); `.w-bento` (2 columns), `--lead`, `.w-span-2`;
`.w-tile` + `--cobalt` (the lead product), `--dark`, `--sunk`, `--tint`, `--wide`; `.w-tile-head`,
`.w-tile-art`, `--bleed` (UI crops off the tile edge); `.w-rows` (hairline rows, status on the right);
`.w-feats` (icon well, title, one line); `.w-board` + `.w-board-col` + `.w-board-h` + `.w-board-card`
(grouped cards, no statuses or dates); `.w-facts` (a `<dl>`, mono values); `.w-cta` (use the partial);
`.w-form`, `.w-form-card`, `.w-form-foot`, `.w-form-note`, `.w-form-status` with Halo `.field`, `.fld`.

**Illustration kit:**
- `.w-frame` tinted frame (radius 24) holding a window: cobalt wash by default, `--ai` violet wash
  (Endorse only), `--sunk`, `--white`, `--dark`, `--bleed`.
- `.w-float` a floating product window: white, 14px radius, Halo elevation, product-scale type
  (14px) so Halo components render as in the product. `--lg`, `--mini` (shrink to fit), `--flat`.
  Inside: `{{> winbar}}`, then `.w-float-app` (`.w-float-side` with a Halo `.nav`, and
  `.w-float-main`), `.w-float-pad`. It is a size container: below 640px the side nav hides.
- `.w-ui` gives loose Halo components the product context without a window.
- `.w-msgs` / `.w-msg` feed rows: `.avt.sq` avatar (`.w-avt-prod` obsidian, `.w-avt-ai` violet for
  Endorse, `.w-avt-person`), `.w-msg-hd` (name, `<time>`, status), text, an `.ag` card, `.w-msg-acts`.
- `.w-over` + `--br`/`--bl`/`--tr` a mini card overlapping out of its frame (inline on phones).
- `.w-cap` caption under an illustration, always with the Sample data badge when it shows figures. Wrap
  long caption text in a `<span>` so the badge stays on its line.
- `.w-stack` layered cards (each child sits behind the last).
- `.w-fit[data-w="880"] > .w-fit-in` a fixed-width UI scaled down to fit (JS); no JS crops it.
- `.w-flip > .w-flip-in > .w-flip-front + .w-flip-back`, each with a `button[data-flip]`: the figure
  on the front, how it is built on the back. Without JS both faces show, stacked.
- `.w-iso > .w-iso-world` (camera, `--iso-rx`, `--iso-rz`) and `.w-cube` (`--x --y --z` position,
  `--w --d --h` size, three `<i>`: `.w-cube-top`, `.w-cube-front`, `.w-cube-side`), variants `--dark`,
  `--acc`, `--ai`, `--ghost`. Build containers, day blocks and layer models from these.

### Behaviour attributes (site.js)

| Attribute | Does |
|---|---|
| `.w-tilt[data-tilt] > .w-tilt-obj` | Tilted product shot that settles flat as it scrolls into view, plus pointer parallax. Options `data-rx` (18), `data-rz` (-6), `data-scale` (.92). Children of `.w-tilt-obj` with `data-depth="110"` float forward while tilted. Put depth layers **beside** the window, not inside it: `overflow:hidden` flattens 3D |
| `data-hover-tilt="4"` | Lift and tilt up to 4 degrees on fine pointers. The element must have no other transform |
| `data-reveal` / `data-reveal-group` | Fade up once when scrolled into view (group staggers its children, max 4). Content above the fold and without JS is simply visible |
| `data-count="18808" data-format="rand"` | Counts up once in view. `data-format`: `rand`, `int`, `dec` (+ `data-dp`); `data-prefix`, `data-suffix`, `data-from`, `data-dur`. Write the final figure in the HTML |
| `data-pause-offscreen` | Pauses CSS animations inside while off screen (`.w-glow` has it built in) |
| `form[data-lead="bootcamp"]` | Posts JSON to `/api/lead` (needs `name`, `email`; `message` or `data-lead-message`). Errors go in each `.field .emsg`, `data-err` sets the message, `[data-lead-status]` shows the result. A `company_site` input is a honeypot |

### window.VSG for page scripts

```js
VSG.reduced / VSG.fine            // reduced motion, fine pointer
VSG.watch(el, inView => {})       // viewport enter and leave
VSG.every(el, 5000, fn)           // loop only while on screen and the tab is visible; never under reduced motion
VSG.countTo(el, 184200, {from})   // tick a [data-format] number to a value
VSG.fmtR(18808)                   // "R 18 808" (non-breaking spaces)
VSG.type(el, 'text', {speed})     // type text, returns cancel()
VSG.onScroll(fn)                  // batched per frame
```

Page scripts load after site.js (both `defer`), so `VSG` exists when yours runs.

## Reduced motion and 3D

Halo's global reduced-motion rule sets `animation:none!important` on every element. A 3D model whose
settled state depends on where a paused animation stops will collapse under reduced motion. Give every
model a static settled position in plain CSS (outside any `@keyframes`), and use the animation only to
move away from it and back.

## 3D components

- **Engine stack** `{{> engine}}`, read bottom up: "Your ERP and spreadsheets: we only read them",
  "VSG Core: your data in one clean place" (suppliers, stock, orders, customers, invoices), "VSG software:
  Procure, Endorse, custom builds, with AI doing the digging", and "Your people approve every decision"
  (buyer, credit controller, CFO). The legend carries one worked example (an overdue invoice moving from
  the ERP to the credit controller). Plates explode on scroll, pulses rise, a product
  lights the data it works from (hover, focus or click the legend or a plate tile), mouse drag
  turns it and it springs back. `w-engine--compact` for a bento tile, `w-engine--dark` or a `.w-dark`
  section for obsidian.
- **Import globe** `{{> globe}}`: dotted continents, the lane Shanghai, Singapore, Durban. Ships sail on
  a slow loop (two days a second, a pause at day 61 when cover runs out, a pause at the end, a quick
  rewind); the slider and the pause button take over. Import A is cobalt (in plan), Import B is hollow
  (too late). Drawn for obsidian; `w-globe--light` for light frames. Without JS a flat SVG timeline shows.
- **Tilted shot**: `.w-tilt[data-tilt]` above.
- **VSG Core canvas** `{{> model}}`: the five parts of Core on a plane, the three products above; the
  focus moves every 4.2s (Endorse in violet, the others cobalt), pulses travel the edges.

All of them pause off screen and when the tab is hidden, show a settled state under reduced motion,
and work at 390px.

## The rules (read before you write)

- **Truth first.** Write in the calm voice of an established company, and claim only what is built.
  Never invent logos, testimonials, quotes, savings, awards or partners. Say "your ERP", and never
  claim VSG writes into the ERP.
- **Karoo Industrial Supply** is the demo company in every illustration (bearings, conveyor belting, PVC pipe,
  electrical cable, fasteners, safety boots, industrial paint, pumps). Keep its numbers consistent across pages
  (R 18 808, R 562, 86%, W38).
- **Colour law.** Cobalt is the human action (buttons, links, focus, selection). Violet only where AI
  output is shown (Endorse suggestions, the `.ag` card, the Endorse frame). Green, amber and red only for
  status inside product UIs and badges. Two or three obsidian sections per page.
- **No photos, no raster images.** Every visual is HTML, CSS, SVG or canvas. The logo SVGs and the
  favicon are the only image files.
- **Fonts:** Switzer from Fontshare and IBM Plex Mono from Google, linked in `head.html`. Never copy
  Switzer files into this public repo.
- **Copy:** human, plain, short sentences, SA English, rand as `R&nbsp;18&nbsp;808`. No en or em dashes,
  no emoji, no technical jargon. Headline states the outcome, subline says how.
- **Design bans:** no eyebrow labels above headings, no gradient text, no identical three-card rows,
  no decorative shadows except the Halo elevation on floating UIs, uppercase only in tiny product
  labels and tags, no scroll cues, no dated changelogs.
- **Motion:** UI state changes under 300ms ease-out; loops slow and calm (one change every 4s or
  slower); everything pauses off screen; `prefers-reduced-motion` shows the settled state; every
  screen reads correctly with no JS.
- **Accessibility:** AA contrast (the website darkens Halo's Mist labels inside windows to 4.6:1),
  visible focus, one `<h1>`, landmarks from the build, `aria-hidden` on decorative illustrations with a
  `.w-sr` text alternative when the picture carries meaning.
- **Check your page** at 1440 and 390 with the screenshot tool, then run the detector:
  `cd /c/VSG-Tech-Solutions/VSG_WebsiteV2 && .claude/skills/impeccable/scripts/impeccable detect --json <abs path to your built page>`.
  Known and accepted findings: Halo's `--e3` elevation ("thin border wide shadow"), `.w-sec` and window
  bars as "cramped padding", Halo's unused `.prog.ind` as "marquee", `body` clipping horizontal overflow.
