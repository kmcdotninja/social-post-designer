# Production: the repo, the checks, the exports

The engine in `../starter/` already does fitting, the collision check, rendering and the gallery for posts; this
file explains how they work and covers what the starter doesn't (print, logos, social covers). `../templates/print.mjs`
is a print exporter to adapt.

## Repo shape (a full brand project, once it grows past posts)

```
index.html  src/app.js  src/app.css        the gallery (posts), tabs to the other pages
print.html  src/print-page.js              print set: viewer, PDFs per side, zip selector
logos.html  socials.html  illustrations.html
src/posts.js      the words: every post's layout (tpl), theme, copy, caption. BRAND contacts at the top
src/render.js     one function per layout; fit(); strokes()
src/post.css      themes (CSS variables) and every layout
src/art.js        landmarks and icons      src/scenes.js  scenes      src/spots.js  spot illustrations
src/traced.js     traced hand paths        src/print-data.js  contacts for print
scripts/          render, check, print, logos, socials, spots (illustrations)
assets/           fonts, logos, photos (+ SOURCES.txt with licences), illos, exports
```
Stack: Vite (dev server, `?raw` imports for SVG), plain ES modules, Playwright with system Chrome
(`chromium.launch({ channel: 'chrome' })`), JSZip, modern-screenshot for in-browser PNG.

## Fitting headlines (`fit()`)

Every headline box has a max size; the words shrink until they fit, never overflow or clip.
- Set the font size high in CSS, give the box `max-height` (or a height), add `.fit` (`.fit-w` for one-line words
  that must fit the width).
- Loop: shrink by 4% while the words are taller than the room or wider than the box (max 80 steps, floor 20px).
- **Measure unclipped:** set `max-height: none; height: auto`, read `offsetHeight`, restore. Tight leading makes glyphs
  poke out of the line box, so `scrollHeight` reports overflow at every size and the headline over-shrinks.
- Wait for `document.fonts.ready` first; then draw the strokes; then set `body[data-ready]` for the scripts.

## The collision check (`npm run check`)

Run it after every change; "elements riding on each other" was the most repeated complaint.
- Text blocks are measured by **ink**: each line's client rect, trimmed to the glyphs with `measureText`
  (`fontBoundingBoxAscent − actualBoundingBoxAscent` to `+ actualBoundingBoxDescent`).
- Illustrations are measured by their **drawn shapes** (union of the SVG children's boxes), not their frame.
- Any two blocks closer than 12px, or anything outside the safe area (40px on 1080 × 1350), is a problem.
- Deliberate overlaps are declared in markup: `data-over=".selector"` names what it may sit on; `data-bleed` for
  things meant to leave the edge. The check exits 1 on problems.

## Rendering

- **One post per page load** (`?only=<id>`), wait for `body[data-ready]`, screenshot the `.post` locator with
  `deviceScaleFactor` = the scale (×2 default, ×4 = 4320 × 5400). A page holding all 146 posts times out.
- `--ids 1,11-20` for some, `--sheet` for a contact sheet of all, `--out` for a folder.
- Long runs on a Mac: wrap in `caffeinate -i`.
- File names: `brand-campaign-001-slug@2x.png`.

## Looking at your work

Render, then open the PNG and look at it before reporting. Crop and zoom into the area under question (a fingertip,
a stroke under a word). When the client sent a reference, put yours beside it at the same scale in one image. Report
what you saw, including what's still off.

## The gallery page

Dark by default (a light toggle). Top: tabs (posts, print, logos, socials, illustrations), filter chips by series,
×1–×4 size, Download all (File System Access API into a folder where supported, otherwise a zip). Grid of posts at
preview scale (`transform: scale()` of the true-size post). Click opens a viewer: the post large, its caption with a
copy button, ← → and Esc. Each card: PNG download.

## Print

- Lay out every piece at true size, **96px to the inch**, including bleed. `trim` and `bleed` in inches; `safe` is the
  inset text keeps. Show trim, safe and fold guides in the preview only.
- Standard sizes (the client is in Nigeria; use what local printers use): business card 3.5 × 2 in, 0.125 in bleed;
  DL 99 × 210 mm, 3 mm bleed; door hanger 3.5 × 8.5 in; tent card 4 × 6 flat; banners in feet (13/10/7 × 3.5 ft, 1 in
  bleed, 3 in safe for hems and eyelets); apparel prints without bleed, single colour, with a mock-up for the tailor.
- **One PDF per side** (`page.pdf` with `width/height` in inches, `printBackground: true`, `pageRanges: '1'`). Then
  `pdftocairo -svg` (text as outlines) and `pdftocairo -png -singlefile -r 300`.
- Chrome can't make huge pages: export banners at 1:4 (`scale: .25`), PNG at 600 dpi of that, and tell the printer to
  enlarge 400%.
- Chrome drops SVG masks in PDFs: draw die-cut holes and slits as white shapes; put the dieline on its own page.
  `<g>` isn't allowed inside `<clipPath>`: put the transform on the path.
- Placeholders in `[brackets]` print highlighted so they can't reach the printer unnoticed.
- The print page: click a side to view large, flip sides, Print opens the PDF (the browser's own print drops
  backgrounds), select pieces and download a zip as PDF, PNG or SVG.
- Print rules the client set: no yellow; private details (office address) only on the meeting business cards;
  "Pick-up & delivery only" where there's no walk-in; minimal business card backs (big name in the heaviest weight,
  role in the brand colour, contacts aligned on one left edge, no stripes or rings).

## Logos

Every lockup (full left-aligned, full centred, sub-brand, wordmark, mark) × every colour (blue, navy, black, white),
as SVG and transparent PNG, plus a `-bg` version on a fitting ground. **One uniform scale** for all PNGs (e.g. 4000px
per 464 SVG units) so the mark is the same size in every file. Align a tagline to the mark's or the wordmark's edge
by measuring the glyph outlines (opentype.js), not by eye; a few pixels off is visible. Gap between wordmark and
tagline: tighter than you think.

## Social images

Profile picture 1080 × 1080 (mark or full centred lockup inside the circle); Facebook cover 1640 × 624 (safe middle
1200); X header 1500 × 500 (profile picture covers bottom left); LinkedIn 1128 × 191; YouTube 2560 × 1440 (safe middle
1546 × 423); Instagram highlight covers 1080 × 1920 (the icon on a white disc in the middle). Covers: logo and one
line left, "Call to book at" + numbers + handle with icons right, all inside the platform's safe area.
