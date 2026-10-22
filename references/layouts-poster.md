# The poster family (`po-` layouts)

A playful, flat poster system: one big heavy line at the top-left margin, a picture or a glyph so big it runs off an
edge, the key word on a block of the opposite colour, the brand's name at the foot. It suits brands that want to feel
friendly and confident (apps, kids and family, food, lifestyle, launches), and it holds up in any font: tested with a
geometric sans, a heavy serif and a rounded sans.

Files: `src/layouts/poster.js`, `src/layouts/poster.css`, examples in `src/examples/poster.js`. Everything is sized in
`cqw` of the post (1cqw = 10.8px on the 1080 × 1350 post).

## Fields every layout understands

| Field | What it does |
|---|---|
| `theme` | the colourway: `primary`, `paper`, `tint`, `accent`, `ink` |
| `title` | the headline; `[word]` is the key word (gets the brand's mark; with `mark: "block"` it sits on a block in the mark colour), `\n` breaks a line |
| `sub` | one short line under the headline |
| `kicker` | a small line over the headline (the topic). When a layout has no foot and no kicker, the brand's name or logo goes there instead |
| `label` | the same, as a pill ("New in …", "What we do"). Takes the place of `kicker` |
| `art` | a picture: one of art.js's (`phone`, `app`, `card`, `calendar`, `pin`, `home`) or the brand's own `assets/illos/x.svg`. A mascot or character works best: it peeks in, rises and fills the bottom |
| `glyph` | one or two big characters (a letter, a number, a symbol) set in the brand's font |
| `sticker` | a little sticker: `'New!'` or `['30 days', 'circle']`. Shapes: `scallop`, `circle`, `tag`, `pill`, `blob` (never pointy); colour picked from the brand's swatches that show on the post |
| `alt`, `dir` | a second line in another script, set in `brand.json` `font.alt` (`{ family, google }`) if present, else the brand font. `dir: 'rtl'` for Arabic, Hebrew…; without it the direction is detected |
| `dir`, `lang` | on the "any script" layouts, sets the whole post's direction |
| `photo`, `pos` | the photo and its object-position (photo layouts) |

Colour pairs are always ones the colourways guarantee. A "panel of the opposite colour" (frames, tiles, halves) is a
nested colourway, so a picture in it is never on a ground of its own colour.

## The poster set

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `po-rise` | headline and sub at the top; the picture rises from the bottom edge in the middle | title, sub, art, kicker/label, sticker | meeting the brand or its character, a launch hero |
| `po-peek-right` | headline at the top; the picture peeks in from the bottom-right corner | title, sub, art, kicker/label, sticker | a friendly line with a character or object |
| `po-peek-left` | the same, from the bottom-left corner | title, sub, art, kicker/label, sticker | alternating with peek-right in a run |
| `po-big` | the line centred at the top; the picture huge, filling the bottom and running off three edges | title, sub, art, sticker | a short exclamation, a greeting, a mood post |
| `po-glyph` | headline at the top; a giant letter or number runs off the right edge below it; name at the foot | title, sub, glyph, kicker, sticker | a letter, a number, an initial, "7 days", "24h" |
| `po-mega` | the words so big they are the picture (two sizes: short lines huge, long lines large); name and handle at the foot | title, kicker, sticker | the promise, a tagline, "Hello, city." |
| `po-corner-pic` | headline at the top; the picture big in the bottom-right corner, running off both edges | title, sub, art, kicker, sticker | an object post: a product, a card, a tool |
| `po-centre-pic` | headline at the top; the picture centred in the room left; name and handle at the foot | title, sub, art, kicker, sticker | a picture that must be seen whole |
| `po-quote` | a big quotation mark in the mark colour, the saying centred, who said it under | title, sub (the source) | testimonials, sayings, values |
| `po-cloud` | a line inside a big scalloped cloud of another colourway | title, sub, kicker | a gentle promise, a reassurance, a saying |
| `po-pills` | headline centred; three to five words in pills of the brand's colours, stacked and a little tilted | title, items, label, sticker | services, steps, a list without numbers |
| `po-numbers` | three glyphs in a row filling the middle, the line under them | glyphs (three), title, kicker, dir | "1, 2, 3", a countdown, three letters |
| `po-ready` | headline at the top; a ringed dot to press on the right; the picture rising from the bottom | title, art | a call to start, "ready?" posts |
| `po-balloon` | a short stacked headline; a balloon holding a glyph at the top right; the picture peeking in | title, glyph, art | playful, celebratory, kids |
| `po-tile` | headline at the top; a glyph on a rounded tile of the opposite colour bottom-left; the picture peeking in bottom-right | title, sub, glyph, art | a letter, initial or icon plus a character |
| `po-row` | huge words; a row of five glyphs under them, the first ones solid, the rest faint | title, glyphs (five), solid (how many solid, default 2), dir | ranges ("From A to Z"), progress, a collection |

## Releases

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `po-release` | a tag ("New in …" filled, or "Coming soon" outlined) and the version on the top row; what it is, the line, a sub; the picture or three glyphs in the middle; a round scalloped badge | status (`new`/`soon`), version, tag, kicker, title, sub, art or glyphs, badge | feature launches, updates, roadmap teasers |

Any poster layout also works as a release post with `label` and `sticker` (e.g. `po-rise` with `label: 'New in …', sticker: 'v2.0'`).

## Whole posts in any script

Set `dir: 'rtl'` (and `lang`) for right-to-left posts; the alignment follows.

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `po-word-frame` | a huge word above, the picture in a scalloped frame of the opposite colour, a huge word below, a line | top, bottom, art, sub | greetings ("Meet / Name"), two-word sayings |
| `po-half` | words on one half (name at the top, headline and sub at the foot); a real photo filling the other half. **Photo only**: without `photo` it renders as `po-flat` | title, sub, photo, pos | a person, a place or a product shot beside its line |
| `po-flat` | name and website on top; a big picture in the middle; the line at the foot | title, sub, art | an object post read bottom-up |
| `po-pattern` | a word repeated into a faint texture filling the post; the picture big over it | word, art | brand moments, a name, a greeting |
| `po-number` | one huge number at the top in the mark colour; the line and sub under it | number, title, sub | stats, counts, anniversaries |
| `po-scatter` | one picture repeated four times round the edges, tilted; the line centred | title, sub, art | seasonal greetings, celebrations |
| `po-big-line` | a big line, almost nothing else | title, sub | statements, promises, a line in another language |

## The Swiss set

Tighter margins, one word as big as the post allows, details small on a two-column grid. Best with short words.

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `po-swiss-mast` | the brand name huge on top; the word (and its second script) and three details in two columns; the word huge at the foot | word, items (three), alt, dir | a word and its meanings, a value |
| `po-swiss-grow` | a word building letter by letter, line by line; a round badge (the second script or the name) at the foot | word (short, up to 7 letters), alt | the brand name, a one-word idea |
| `po-swiss-side` | a word turned on its side down the left edge; on the right a tile with a glyph or picture, two details, the second script big | word, glyph or art, items, alt | a letter or service explained |
| `po-swiss-frame` | a big word on top; a picture in a rounded panel of the opposite colour; a foot of name and note | word, art, items (joined into the note) | a theme, a story, a collection |
| `po-swiss-sandwich` | a big word on top, the picture between (the second script in a pill), the brand name big below, one line | word, art, items[0], alt | a verb + the brand ("Play / Name") |
| `po-swiss-blocks` | the line big, a small note; flat blocks of colour (one wide and low, one tall) with the second script; name at the foot | title, items[0], alt | an announcement with nothing to picture |
| `po-swiss-bleed` | one word so big it runs off both edges; the second script under it; name at the foot | word, alt | a greeting, an exclamation |
| `po-swiss-lines` | a word repeated line after line as a texture; the second script in a pill over the middle | word, alt | brand texture, a thank-you, a filler between busy posts |

## Stickers and bands

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `po-stickers` | a big word in the middle ("Name is", "We do"); up to five stickers round it, tilted, in the brand's colours | word, stickers (`'text'` or `['text', 'shape']`) | what the brand is, its promises, a release round-up |
| `po-bands` | two or three rows of big rounded shapes (rect, cap, circle, dome) running off both edges, some holding a word, some a picture (`'art:phone'`); name and handle under | rows: `[[shape, content], …]` | greetings, a bright brand wall, a set of services |

## Photos

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `po-photo-full` | the photo fills the post under a flat shade; the line big at the top in white; the second script; name at the foot | photo, title, sub, alt, sticker | real people and places |
| `po-photo-framed` | the post's colour; the line at the top; the photo in a soft rounded frame with the second script in a pill on it | photo, title, sub, alt, sticker | events, seasons, products |
| `po-photo-round` | the line at the top; the photo in a big circle; the second script under it | photo, title, sub, alt | a detail, food, an object |
| `po-photo-peek` | the photo across the top; the line under it; the picture peeking in at the bottom-right corner | photo, art, title, sub, sticker | mixing a real photo with the brand's character |

## Notes

- **No split layouts with a picture on a block of colour.** Words on one half and a block of colour with a small
  illustration on the other is never made. A split is allowed only when the other half is a real photo filling it
  (`po-half` with `photo`); without a photo, `po-half` falls back to `po-flat`. Don't build new split variants.

- Every headline box has a max-height and shrinks to fit; very short copy on `po-big-line` and `po-mega`
  can leave an empty band (the check warns): give those layouts a longer line or a picture.
- Pictures run off the edges by design. Placeholders are wide objects; the brand's own character or object
  illustrations (drawn to fill their box) make these layouts look their best.
- The second script falls back to the system font for that script unless `font.alt` is set in `brand.json`.
