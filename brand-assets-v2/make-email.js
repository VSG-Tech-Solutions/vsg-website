/* Build the email-signature images (teal brand, 2026-10).

   Output, all in assets/email/ and all 3x so they stay sharp on phones:
     vsg-logo-v1.png    264x120, shown at 88x40  the "VSG." wordmark on a white rounded box
     icon-mail-v1.png    48x48,  shown at 16   outlined envelope, teal
     icon-phone-v1.png   48x48,  shown at 16   outlined smartphone, teal
     icon-web-v1.png     48x48,  shown at 16   outlined globe, teal

   Why a white box and not a transparent wordmark: Outlook, Apple Mail and
   Gmail's apps darken the message in dark mode but never touch images, so ink
   letters on a transparent background disappear. On white mail the box blends
   in and reads as the plain "VSG." logo; in dark mode it shows as a white badge
   that keeps the black letters readable. The box is padded tight (7px at the
   sides) so on white mail the letters sit almost flush with the text above, and
   the letters are larger than a square tile would allow at the same height.
   The icons are brand teal #00A396 because it holds up on both grounds,
   where the darker text teal goes muddy on black.

   Icons are outlined to match the site's hairline look. The phone is a
   smartphone, not a handset: a curved handset collapses into a blob at 16px.
   Shapes are drawn in a 24-unit viewBox, rendered large, cropped to the ink,
   then scaled into the square, which is what keeps the 16px edges clean.

   Why assets/email/ and not brand-assets-v2/: .vercelignore keeps brand-assets-v2
   out of the deploy, which is what broke the first signature. assets/ is served,
   and every signature already sent hot-links these files, so never move, rename
   or overwrite them. /assets/ is cached as immutable for a year: a changed image
   gets a new file name (-v2) and new signature HTML.

   Run from the repo root with sharp available:  node brand-assets-v2/make-email.js
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = path.join(__dirname, '..');
const OUT  = path.join(ROOT, 'assets/email');
const TEAL = '#00A396';
const W    = 1.9;                       // stroke weight, in viewBox units

fs.mkdirSync(OUT, { recursive: true });

const ICONS = {
  // box: share of the square the icon's longest side fills. The phone is tall
  // and thin, so it gets more than the envelope to carry equal optical weight.
  mail: { box: 0.84, body:
    `<rect x="2" y="4.5" width="20" height="15" rx="2.6"/>
     <polyline points="3.3,6 12,13.4 20.7,6"/>` },
  phone: { box: 1.00, body:
    `<rect x="6.4" y="2.6" width="11.2" height="18.8" rx="2.7"/>
     <line x1="10.2" y1="6" x2="13.8" y2="6" stroke-width="1.5"/>
     <circle cx="12" cy="18.2" r="1" fill="${TEAL}" stroke="none"/>` },
  web: { box: 0.94, body:
    // one meridian ellipse reads as a globe at 16px; a second latitude just muddies it
    `<circle cx="12" cy="12" r="9.9"/>
     <line x1="2.1" y1="12" x2="21.9" y2="12"/>
     <ellipse cx="12" cy="12" rx="4.65" ry="9.9"/>` },
};

async function icon(name, { box, body }, px) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="960" height="960">
    <g fill="none" stroke="${TEAL}" stroke-width="${W}" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`;
  const ink = await sharp(Buffer.from(svg)).trim().png().toBuffer();
  const side = Math.round(px * box);
  const fit = await sharp(ink).resize(side, side, { fit: 'inside', kernel: 'lanczos3' }).png().toBuffer();
  const { width, height } = await sharp(fit).metadata();
  const left = Math.floor((px - width) / 2), top = Math.floor((px - height) / 2);
  await sharp(fit)
    .extend({ left, top, right: px - width - left, bottom: px - height - top,
              background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, `icon-${name}-v1.png`));
  console.log(`assets/email/icon-${name}-v1.png`, px + 'x' + px);
}

(async () => {
  // The wordmark's ink and teal paths, re-boxed on white. In wordmark.svg units
  // the letters run x 7.8..2192.4 and y -696.3..16.3.
  const paths = fs.readFileSync(path.join(ROOT, 'assets/site/logo/wordmark.svg'), 'utf8').match(/<path[^>]*\/>/g).join('');
  const BW = 88, BH = 40, CAP = 24;      // display px: box, letter height
  const k = CAP / 712.6, lw = 2184.6 * k;
  const tx = (BW - lw) / 2 - 7.8 * k, ty = (BH - CAP) / 2 + 696.3 * k;
  const logo = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BW} ${BH}" width="${BW * 3}" height="${BH * 3}">
    <rect width="${BW}" height="${BH}" rx="8" fill="#FFFFFF"/>
    <g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${k.toFixed(6)})">${paths}</g></svg>`;
  await sharp(Buffer.from(logo))
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, 'vsg-logo-v1.png'));
  console.log(`assets/email/vsg-logo-v1.png ${BW * 3}x${BH * 3}, letters ${lw.toFixed(1)}x${CAP} at display size`);

  for (const [name, spec] of Object.entries(ICONS)) await icon(name, spec, 48);
})();
