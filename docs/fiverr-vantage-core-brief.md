# Fiverr brief — Vantage Core (3D hero animation)

Copy-paste this directly into a Fiverr message to a Blender/3D artist.
Search Fiverr for "blender 3D animation hero website" or "3d product
animation"; sort by 5-star reviews, level 2 sellers, $200–500 range.
Attach the four reference images (Huly Laser, M5, white-orange beam,
red ambient blob) and the brand-color note ("monochrome, all dark").

---

## Project

Hero animation for a B2B SaaS company website (vsgtech.co.za / Vantage).
Style direction: **matte black, monochrome, premium industrial**. Think
Apple Vision Pro casing meets Linear's homepage meets a luxury watch
movement.

## What I need

A Blender model + animation, exported as:

1. **PNG frame sequence** — 200 numbered frames (`vantage_001.png` …
   `vantage_200.png`), 2048×1152, sRGB, transparent OR solid `#0A0A0A`
   background.
2. **`.glb` of frame 0** (the closed object, no animation) — for static
   fallback / SEO.
3. The original `.blend` file — so we can iterate later.

## The object — "Vantage Core"

A monolithic dark slab/cube. The whole brief in one sentence: it should
look like a server module made by Apple.

### Form
- Roughly 1.6:1 height-to-width ratio (vertical orientation).
- Clean machined edges with subtle bevels (~1mm radius).
- Etched panel seams at regular intervals — a thin vertical seam down
  the centre, plus 3 horizontal seams dividing the face into 4
  modular bands. The seams suggest the slab is composed of 12
  smaller modular blocks arranged in a 4×3 grid.
- Optional micro-detail: subtle dot pattern (think Bang & Olufsen
  speaker grille) embossed faintly on one of the bands.

### Material
- **Base colour**: dark gray, around `#1A1A1C`.
- **Roughness**: 0.45–0.6 (matte, not glossy — shouldn't reflect like
  metal).
- **Metalness**: 0.2 (slight sheen on edges only).
- **No emissive parts** at frame 0. Seams may glow faintly later in
  the animation.
- **Strictly one colour throughout. No accent colours, no hue
  variation.** Surface interest comes from light + bevel + roughness,
  not paint.

### Lighting
- One **key light** from upper-left at ~30° elevation, 60° azimuth —
  this is the rim-light that defines the slab's silhouette.
- One **fill light** ambient, very low intensity (~0.1) — just enough
  to keep the shadow side from going pure black.
- **No coloured lights.** All lights are pure white.

### Camera
- 35mm equivalent focal length (slight telephoto — flattens
  perspective, looks premium).
- Three-quarter view: camera at 25° azimuth from front, 5° elevation.
- Static framing — camera doesn't move during the animation.

## The animation (200 frames at 30fps = ~6.6 seconds)

| Frames | Action |
|---|---|
| **0–60** (closed) | Slab fully closed. Slow rotation around its Y axis — about 2°/frame, so 120° total over this range. |
| **60–100** (seams illuminate) | Rotation slows. Panel seams begin to faintly self-illuminate — soft white emissive on the seam lines, ramping from 0% to ~20%. |
| **100–180** (panels separate) | The slab opens. The 12 modular blocks slide apart in 3D space — each block translates outward from the slab centre by 1–3 units, creating a "exploded view" arrangement. They settle into a loose 4×3 grid orientation, all blocks visible. Seam emission fades back to 0. |
| **180–200** (settle) | Blocks hold position with very subtle floating idle (sine-wave bob, ~0.05 unit amplitude). |

The arc is: **closed → seams hint → opens → fans out → settles**.
No crashing, no fast cuts. Quiet, mechanical, deliberate. Like a
luxury watch back opening to reveal the movement.

## What you'll receive from me

- Reference image set (4 stills of the matte aesthetic we're matching).
- The website URL once it's deployed (you'll see how the animation will
  be used on scroll).
- Quick feedback turnaround on milestones.

## Licence + terms

- Full commercial buyout. All assets, source files, and IP transfer
  to me on delivery.
- No watermarks, no attribution required, royalty-free.

## Timeline + budget

- **Timeline**: 7–10 working days from kick-off.
- **Budget**: $200–400 USD. Open to your quote within that range.
- Milestones: greybox at day 3, lit + textured at day 6, animation
  + final renders at day 10.

## Deliverable format

A single `.zip` containing:
- `/frames/` — 200 numbered PNGs (`vantage_001.png` … `vantage_200.png`)
- `/vantage-core.glb` — frame 0 export
- `/vantage-core.blend` — source file
- `/preview.mp4` — optional 6-second h.264 preview of the full sequence

---

**One more note on what NOT to do:**
- No coloured rim lights. No purple, blue, teal, gold, or any colour
  in the lighting.
- No environment HDRI that introduces colour cast.
- No glossy/chrome materials.
- No moving camera.
- No sound design (we'll add later if needed).
- No text labels / logos on the slab (we'll add via overlay if needed).

If anything in the brief is unclear, ask before starting. Better one
question now than re-rendering 200 frames later.
