# Posts: layout, typography, alignment

Everything here is measured from two finished sets: the **launch system** (146 posts, 1080 × 1350, sized in px, a
geometric sans) and the **poster system** (100+ posts, 4:5 tiles sized in `cqw`, a rounded sans). Where the two differ, both ways are given. Pick one system per brand and
hold it across the whole set.

## The canvas

- **Instagram post: 1080 × 1350 (4:5).** Lay it out at true pixel size in CSS; render at ×2–×4 for export.
- Build each post as `<article class="post t-{theme} tpl-{layout}">`, `position: relative; overflow: hidden`.
- Two ways to size things, both work:
  - **Pixels on a fixed 1080 canvas** (launch system): `--m: 72px` margin, sizes in px.
  - **Container units** (poster system): `container-type: inline-size` on the tile, everything in `cqw` (1cqw = 1% of the
    tile's width), so the same post renders at any size. Margin 8cqw (5cqw on the Swiss set).

## The grid and alignment

- **One margin, used everywhere.** Launch system: 72px left and right (6.7% of 1080). Poster system: 8% of the width on every side.
  Every headline, sub, list and CTA starts on the left margin. Nothing sits at 70 or 75 because it "looked right".
- **Flush left, ragged right** is the default. Centre only a whole composition (a quote, a stack of pills, a big
  number), never one line in a left-aligned post.
- **Fixed vertical stations** (launch system, 1350 tall), so posts in a series line up when scrolled:
  - top bar (wordmark left, small place label or sticker right): `top: 64px`
  - sticker/kicker row: `top: 176–178px`
  - headline: `top: 170px` (no sticker above) or `top: 270px` (sticker above)
  - foot (handle left, number or chip right): `bottom: 58px`
  - CTA block: `bottom: 120–140px`, left margin
- **The poster system's three-band tile:** the line big and heavy at the top-left margin; the picture or mascot in the middle, scaled
  up until it **runs off an edge** (right corner, bottom, peeking in head first); the name and promise on the bottom
  margin, `margin-top: auto`. The middle picture takes only the room left between line and foot (`flex: 1 1 0;
  min-height: 0`) so it never pushes the foot off.
- **Pieces on one row share a centre line** (`align-items: center`). Footers: name left, handle/promise right, or the
  reverse; one line, one baseline.
- **Bleed on purpose:** a picture, a giant number or one huge word may run off the edge. A small thing near an edge
  is a mistake; a big thing past the edge is a decision.
- **Spacing:** ≥12px between any two blocks by their ink (the launch system's check). Gaps inside a group are smaller than the
  gap between groups. Poster system: separation from spacing alone, no divider lines in the foot.
- **No divider lines between list rows** when icons or space can carry it. (An early service list had rules; the client
  removed them.)

## Typography

One family per brand. Two or three weights at most.

| Role | Launch system (px on 1080) | Poster system (cqw) |
|---|---|---|
| Hero headline | 900, 150–210px, leading .94, tracking −.045 to −.055em | 800, 13.5cqw, leading .98, −.035em |
| Standard headline | 900, 100–136px, leading .94 | 800, 12.5cqw (stacks) |
| Mid headline (two to four lines in a card) | 900, 58–84px, leading 1.02, −.035em | 800, 10.5cqw quote, leading 1.1 |
| Mega word / number | 900, 400–1480px, leading .74–.86, −.07 to −.09em, `text-indent` the same negative to pull it to the margin | 800, 27–30cqw, leading .86, −.05 to −.055em, `margin-left: -.04em` |
| Sub / body | 400, 38px, leading 1.28, −.01em, `--body` colour | 700, 5cqw, leading 1.25, max-width 62% |
| Sticker / pill | 900, 28–32px, `padding: 14px 28px`, radius 99px | 800, 3.4cqw pill |
| Small details | 700, 22–23px | 700, 3.2–4.4cqw, leading 1.15–1.25 |
| CTA number | 900, 76–96px, leading .95, −.035em | — |

Rules that hold across both:
- **The bigger the type, the tighter the tracking and leading.** Never set a 150px headline at the body's leading.
- **Measure the leading against the glyphs.** Tight leading lets ascenders poke out of the line box; fit by measuring
  the unclipped height (see production.md, `fit()`), or the headline over-shrinks.
- `text-wrap: balance` on headlines, `text-wrap: pretty` on paragraphs. Keep hyphenated words whole
  (`rock-solid`, `pest-free` in a nowrap span). Keep a full stop with its word.
- **Optical margin:** big type has side-bearing, so pull it left by its negative tracking (`text-indent: -.05em` or
  `margin-left: -.04em`) so the letter's ink, not its box, sits on the margin.
- Sentence case everywhere. No all-caps kickers, no letter-spaced small labels. (Uppercase only inside a real object
  that would have it: a boarding pass airport code, a stamp.)
- Paragraphs never grey on a dark ground: near-white. Body colour on light grounds is a dark tint of the brand
  (e.g. `#33406B` against a royal blue), not grey.
- Numbers that change or align: tabular figures.

## The key word

Every headline has one word to look at, marked `[word]` in the copy.
- **Launch system:** the brand stroke under it: a line across, back on a slant, across again (`M0.7 0.22 H75 L22 0.78
  H99.3` in a 100 × 1 box, `preserveAspectRatio="none"`). Drawn as SVG per line of the word, sitting on the font's
  baseline (from `measureText().fontBoundingBoxAscent`) + 5.5% of the size, height = 8.5% of the size (min 7px).
  Yellow on blue/ink/white, navy on yellow.
- **Poster system:** the word on a block of the opposite colour: `display: inline-block; padding: 0 .14em .04em;
  border-radius: .18em`. Contrast, not just a coloured word.

## The call to action

The launch system's, used on most posts: a light line, then the number big.
```
Call to book at            ← 400 weight, 36px
0800 000 0000              ← 900 weight, 76–96px, leading .95
@yourbrand  [ig][fb]       ← handle with its platform icons beside it
```
- Wording the client chose: "Call to book at", "To book us, call us at". Not "Call now!!!".
- Left-aligned on the margin, anchored to the bottom (`bottom: 120–140px`). On the illustrated series it runs along
  the foot: number left, handle right.
- The poster system's foot: the name (800, 6.5cqw) and where to find it in a pill (`border-radius: 999px`, the accent).

## Colourways (themes)

Every theme is a pair that is light on dark or dark on light. Define each as CSS custom properties on the post:
`--bg --fg --body --stroke --accent --stk --stkfg --note --notefg --tone --line`. Layouts only use the variables, so
any layout works in any theme. The launch system: blue, white, sky, yellow, ink, photo, coral. The poster system: cyan, dark, cream,
violet, pink.

Contrast traps the clients caught:
- A picture that shares the tile's colour vanishes into it (a cyan balloon on the cyan tile). Give each picture the
  tiles it may sit on; pale pictures only on the dark tile.
- The logo on yellow is navy, not blue.
- Coral is a highlight; white text on coral fails.
- A drawn landmark's white parts disappear on a white post; recolour them per theme (exact `#FFFFFF` in the SVG, so
  it can be swapped).

## The layout library

Give each series its own layouts; 100 posts should feel like 10 systems, not one template.

**Type-led**
- *typeHero:* sticker on top, a 210px headline, a sub, the CTA at the foot.
- *statement:* a headline mid-page, an illustration or sparkle, one line under.
- *mega / bleed:* one word or number so big it runs off both edges.
- *Swiss* (after MASP's identity): one word edge to edge, heavy and tight; small details on a two-column grid
  (1.2fr 1fr); variants: *mast* (picture huge on top, details, a big word at the foot), *grow* (a word building
  letter by letter), *side* (the word turned 90° down the left edge), *sandwich* (a word above and below, a picture
  between), *blocks* (flat blocks of colour and a small line), *lines* (a word repeated line after line as texture).
- *quote:* a giant quotation mark in the accent, the saying set big and centred.
- *stack:* words in pills, stacked, each a different colour, tilted ±3° in turn.
- *stickers:* a big word with small shaped stickers round it (pill, scallop, ticket, circle, blob, **never pointy**).
- *shape bands:* rows of big rounded shapes (rect, pill, dome, circle, cap) running off both edges, some holding a
  word, some a picture.

**Picture-led**
- *photoFull:* the photo fills the tile; the headline big over its darker half; a chip with the place.
- *photoCard / framed:* the tile's colour, the photo in a soft frame or rounded card; the headline above or below.
- *round:* the photo in a big circle.
- *landmark:* a drawn landmark large at the foot, the headline above.
- *picture corner:* the picture huge in a corner, running off two edges; the line at the top-left margin.
- *split:* words on one half, a picture on the other half in the opposite colour.
- *objects:* one picture repeated and scattered, the line in the middle.

**Object metaphors** (the launch system's countdown and launch): a boarding pass (photo window, destination set vertically,
tear line, barcode), a passport stamp, a luggage tag, a ticket and its stub, a split-flap departures board, a pinned
note on a calendar, a calendar page knocked askew, a sticky note, a torn paper strip. Draw them as real objects:
paper is white with a hairline, the tear is a real zigzag, the stamp is rotated a few degrees.

**Countdown:** the number is the poster. Variants that landed: the number filling the page and running into a torn
strip with the landmark breaking over it; a 3D extruded number (stacked offset copies in one darker tone, no blur);
the number with a photo window cut through it; a calendar tile; a "save the date" note. Keep the "days to go" words
small and tight beside or under the number.

**Engagement:** poll (a five-point scale in rounded tiles), quiz (big question, three options in rounded rows with a
letter tile), this-or-that (two tilted photo prints), areas (place names as pills, wrapping), checklist (a note with
dashed rows, ticks).

**Places:** one post per neighbourhood: the name huge on one line (fit to width), a short line, the service as a
sticker, an illustrated scene of the area in a rounded frame, the CTA along the foot. Write a different line for each
place; don't repeat the same sentence with the name swapped.

## Copy

- Short. A headline is 3–8 words. A sub is one sentence.
- Speak to the city and the person ("Lagos, we're coming."), not about the company.
- Every post carries its own Instagram caption: the line, one emoji at most per sentence, then the hashtags.
- Facts the client gives (services, numbers) are used exactly; don't invent offers, prices or claims.
