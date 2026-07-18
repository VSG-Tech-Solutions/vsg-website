/* Build Google-Business-style square profile photos (1080×1080).
   The current mark-cream.svg has the V· edge-to-edge, so circular
   crops bite off corners. This rebuilds it with a "safe circle"
   inside the square — V· composition fits inside, with breathing
   room on every side, so any platform's circular avatar mask works.

   Three theme variants × two compositions = six files:
     · cream / dark / coral background
     · "v-dot"  — full V· composition (V + coral dot)
     · "v-only" — just the V, no dot (max safe-zone, best for tiny circles)
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = __dirname;
const OUT  = path.join(ROOT, 'profile');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

const PAPER = '#F5F0E8';
const INK   = '#1A1612';
const CORAL = '#C9633A';

const SIZE = 1080;            // Google Business recommended profile size
const CENTER = SIZE / 2;      // 540
const SAFE_R = SIZE * 0.42;   // safe circle radius — ~454 px (≈ 84% of half-canvas)

/* ---- the V· geometry, scaled to fit inside the safe circle ----
   Original mark viewBox 256×256:
     V chevron:  M(40,60) L(108,200) L(176,60)  stroke 32
     dot:        cx=212 cy=184 r=20
   Tightest bbox of the V+dot composition:
     x: 40 - 16 (stroke radius)  =  24
     x: 212 + 20                 = 232
     y: 60 - 16                  =  44
     y: 200 + 16 (stroke radius) = 216
   bbox: 208 × 172  → scale to safe area
*/

function buildSvg({ theme, composition }) {
  let bg, ink, dot;
  if (theme === 'cream') { bg = PAPER; ink = INK;   dot = CORAL; }
  if (theme === 'dark')  { bg = INK;   ink = PAPER; dot = CORAL; }
  if (theme === 'coral') { bg = CORAL; ink = PAPER; dot = PAPER; }

  // Composition: scale V· bbox to fit within ~75% of safe-circle diameter,
  // then center it within the canvas.
  const targetW = SAFE_R * 1.55;            // ~700 px wide target
  const bboxW = 232 - 24;                   // 208
  const bboxH = 216 - 44;                   // 172
  const scale = targetW / bboxW;            // ~3.37
  const drawnH = bboxH * scale;

  // top-left corner of the scaled bbox, so the WHOLE bbox is centered.
  const offsetX = CENTER - (bboxW * scale) / 2 - 24 * scale;
  const offsetY = CENTER - (drawnH) / 2 - 44 * scale;

  const corner = 220;   // rounded-corner radius for the underlying square

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}"
     shape-rendering="geometricPrecision">

  <!-- background (rounded square — most platforms square-crop OR circle-crop, this works for both) -->
  <rect width="${SIZE}" height="${SIZE}" rx="${corner}" fill="${bg}"/>

  <!-- V· mark, scaled and centered inside the safe circle -->
  <g transform="translate(${offsetX}, ${offsetY}) scale(${scale})">
    <!-- V chevron -->
    <path d="M 40 60 L 108 200 L 176 60"
          fill="none" stroke="${ink}" stroke-width="32"
          stroke-linecap="round" stroke-linejoin="round"/>
    ${composition === 'v-dot' ? `
    <!-- coral baseline dot -->
    <circle cx="212" cy="184" r="20" fill="${dot}"/>
    ` : ''}
  </g>
</svg>`;
}

async function render(theme, composition) {
  const svg = buildSvg({ theme, composition });
  const tag = `profile-${composition}-${theme}-${SIZE}x${SIZE}`;
  const svgPath = path.join(OUT, `${tag}.svg`);
  const pngPath = path.join(OUT, `${tag}.png`);
  const jpgPath = path.join(OUT, `${tag}.jpg`);

  fs.writeFileSync(svgPath, svg);

  await sharp(Buffer.from(svg), { density: 512, limitInputPixels: false })
    .resize(SIZE, SIZE)
    .png({ compressionLevel: 9 })
    .toFile(pngPath);

  await sharp(Buffer.from(svg), { density: 512, limitInputPixels: false })
    .flatten({ background: theme === 'cream' ? PAPER : theme === 'dark' ? INK : CORAL })
    .resize(SIZE, SIZE)
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(jpgPath);

  const pngKB = (fs.statSync(pngPath).size / 1024).toFixed(0);
  const jpgKB = (fs.statSync(jpgPath).size / 1024).toFixed(0);
  console.log(`  ${tag}.png  ${pngKB} KB`);
  console.log(`  ${tag}.jpg  ${jpgKB} KB`);
}

(async () => {
  console.log(`Rendering Google Business profile photos → brand-assets-v2/profile/`);
  console.log(`Canvas: ${SIZE}×${SIZE}  ·  Safe circle r=${SAFE_R.toFixed(0)}\n`);
  for (const composition of ['v-dot', 'v-only']) {
    for (const theme of ['cream', 'dark', 'coral']) {
      await render(theme, composition);
    }
  }
  console.log(`\nDone.`);
})();
