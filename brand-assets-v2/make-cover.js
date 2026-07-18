/* Build Google-Business-style 16:9 cover photos (2400×1350)
   Three variants: cream, dark, coral.
   Reuses the embedded Geist @font-face from wordmark-cream.svg
   so the wordmark renders crisp without falling back to a system font.
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = __dirname;
const OUT  = path.join(ROOT, 'cover');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

// ---- pull the embedded @font-face block out of the existing wordmark SVG ----
const wordmarkSrc = fs.readFileSync(
  path.join(ROOT, 'svg', 'wordmark-cream.svg'),
  'utf8'
);
const styleMatch = wordmarkSrc.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) {
  console.error('Could not extract @font-face from wordmark-cream.svg');
  process.exit(1);
}
const fontCss = styleMatch[1];

// ---- design tokens (mirror colors_and_type.css) ----
const PAPER = '#F5F0E8';   // cream
const INK   = '#1A1612';   // near-black
const CORAL = '#C9633A';   // accent

// ---- canvas ----
const W = 2400;
const H = 1350;            // 16:9

// ---- compose one SVG variant ----
// `theme`: 'cream' | 'dark' | 'coral'
function buildSvg(theme) {
  let bg, ink, dot, tagInk;
  if (theme === 'cream') { bg = PAPER; ink = INK;   dot = CORAL; tagInk = '#6E6862'; }
  if (theme === 'dark')  { bg = INK;   ink = PAPER; dot = CORAL; tagInk = '#9C948C'; }
  if (theme === 'coral') { bg = CORAL; ink = PAPER; dot = PAPER; tagInk = '#FBEEE6'; }

  // wordmark size
  const wmFont = 540;   // px — big, centered
  // baseline-shifted coral dot to match the V· house style
  // Centered "VSG" with a coral dot to the right of the G baseline.
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"
     shape-rendering="geometricPrecision"
     text-rendering="geometricPrecision">
  <defs>
    <style>${fontCss}</style>
  </defs>

  <!-- background -->
  <rect width="${W}" height="${H}" fill="${bg}"/>

  <!-- subtle radial glow (cream/dark only, skip on coral) -->
  ${theme !== 'coral' ? `
  <defs>
    <radialGradient id="glow" cx="50%" cy="55%" r="55%">
      <stop offset="0%"   stop-color="${theme === 'dark' ? CORAL : CORAL}" stop-opacity="${theme === 'dark' ? 0.10 : 0.06}"/>
      <stop offset="100%" stop-color="${theme === 'dark' ? CORAL : CORAL}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  ` : ''}

  <!-- top-left mark slug (mono caps eyebrow) -->
  <text x="120" y="160"
        font-family="Geist"
        font-weight="500"
        font-size="34"
        letter-spacing="9"
        fill="${tagInk}"
        text-anchor="start">VSG · TECH SOLUTIONS</text>

  <!-- centered wordmark "VSG·" -->
  <g transform="translate(${W/2}, ${H/2 - 20})">
    <text x="-60" y="0"
          font-family="Geist"
          font-weight="800"
          font-size="${wmFont}"
          letter-spacing="-26"
          fill="${ink}"
          text-anchor="middle"
          dominant-baseline="middle">VSG</text>
    <!-- coral baseline dot to mirror the V· house style -->
    <circle cx="${wmFont * 0.85}" cy="${wmFont * 0.30}" r="${wmFont * 0.055}" fill="${dot}"/>
  </g>

  <!-- tagline under wordmark -->
  <text x="${W/2}" y="${H/2 + 280}"
        font-family="Geist"
        font-weight="500"
        font-size="58"
        fill="${tagInk}"
        text-anchor="middle">AI software for South African manufacturing &amp; distribution.</text>

  <!-- bottom-left location/url strip -->
  <text x="120" y="${H - 90}"
        font-family="Geist"
        font-weight="500"
        font-size="30"
        letter-spacing="7"
        fill="${tagInk}">CAPE TOWN · ZA</text>
  <text x="${W - 120}" y="${H - 90}"
        font-family="Geist"
        font-weight="500"
        font-size="30"
        letter-spacing="7"
        fill="${tagInk}"
        text-anchor="end">VSGTECH.CO.ZA</text>
</svg>`;
}

async function render(theme) {
  const svg = buildSvg(theme);
  const svgPath = path.join(OUT, `cover-${theme}.svg`);
  const pngPath = path.join(OUT, `cover-${theme}-2400x1350.png`);
  const jpgPath = path.join(OUT, `cover-${theme}-2400x1350.jpg`);

  fs.writeFileSync(svgPath, svg);

  await sharp(Buffer.from(svg), { density: 384, limitInputPixels: false })
    .resize(W, H)
    .png({ compressionLevel: 9 })
    .toFile(pngPath);

  await sharp(Buffer.from(svg), { density: 384, limitInputPixels: false })
    .resize(W, H)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(jpgPath);

  const pngKB = (fs.statSync(pngPath).size / 1024).toFixed(0);
  const jpgKB = (fs.statSync(jpgPath).size / 1024).toFixed(0);
  console.log(`  ${theme.padEnd(6)} → PNG ${pngKB} KB · JPG ${jpgKB} KB`);
}

(async () => {
  console.log('Rendering Google Business cover photos → brand-assets-v2/cover/');
  console.log(`Size: ${W} × ${H} px (16:9)\n`);
  await render('cream');
  await render('dark');
  await render('coral');
  console.log('\nDone.');
})();
