# The campaign family: layout catalogue

`src/layouts/campaign.js` + `.css`, examples in `src/examples/campaign.js`. 34 layouts, all prefixed `ca-`, built
from a proven 146-post city-launch campaign (teasers → a ten-day countdown → launch day → services → neighbourhoods →
tips and engagement) and made brand-agnostic: the brand brings the font, colours, pictures, places and contacts.

Every layout keeps one grid: top bar 64, first line 170 (262 under a sticker), the call at bottom 120–140, the foot
at 58, the brand's margin `--m`. Every headline shrinks to fit (`.fit`/`.fit-w`), every piece takes part in
`npm run check`.

## Shared fields

- `theme`: `primary`, `paper`, `tint`, `accent`, `ink`. Photo layouts read best on a dark one (`primary`, `ink`):
  the photo's shade and duotone are drawn in the colourway's ground.
- `title`: the headline; `[word]` gets the brand's mark, `\n` breaks the line.
- `label`: the small words top right (default `BRAND.city`).
- `number`: countdown number (1–2 digits). `unit`: default "Days to go" / "Day to go".
- `place`: a pin sticker (a neighbourhood, a venue, the city).
- `photo` (+ `pos`, CSS object-position): a photo path, e.g. `assets/photos/x.jpg`.
- `art`: a picture slot: an art.js name (`phone`, `calendar`, `pin`, `home`, `app`, `card`) or `assets/illos/x.svg`.
  Where a layout wants a landmark, skyline or street and no `art` is given, a plain drawing in the colourway stands in;
  replace it with the brand's own (a city landmark, the shop front, the product).
- `call: true` adds the call where it is optional; `cta: ['Get it on', 'site.com']` overrides its words.
- `confetti: true` / `deco: false`: confetti instead of the quiet bubbles and rings, or no texture at all.
- Copy: places and the city come from `BRAND.city` / `BRAND.places`; services from `BRAND.services`; contacts
  from brand.json. Never type them into a post.

## Image-led posts: make them a big part of the set

The photo layouts are the heart of the family: **`ca-photo-full`, `ca-photo-card`, `ca-cd-photo-bold`,
`ca-count-photo`, `ca-cd-remix`, `ca-cd-window`, `ca-pass`, `ca-pass-stub`, `ca-split`**. Plan roughly a third of a
campaign on them, with real photos of the brand's city, people and product. They **require** `photo` (`ca-split`:
a photo for each polaroid) and throw a clear error without one: none of them falls back to a block of colour with a
small picture. There are no half-and-half "words one side, colour block the other" layouts in this family.

## Type posts

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `ca-type-hero` | A tilted sticker, the line huge (210px), one sentence, the call (or "follow us" + the handle) at the foot; bubbles and rings or confetti | `kicker`, `title`, `sub`, `follow`, `confetti` | The first teaser; launch day ("We're live in …!") |
| `ca-statement` | A small picture (or a sticker) top left, the statement big in the middle, a line and the call at the foot | `art` or `kicker`, `title`, `sub`, `call`, `confetti` | One belief or promise; day one |
| `ca-skyline` | The line big on top, a sentence, the city's skyline along the foot standing on rays | `title`, `sub`, `art` (wide, 1080×420), `confetti` | "New city, same standard"; arrival |
| `ca-landmark` | The line on top, a sticker under it, a landmark drawing standing on rays | `title`, `sub` (the sticker), `art`, `tall` (narrow art) | Local pride: a city landmark, "Name this landmark" |

## Photo posts

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `ca-photo-full` | The photo fills the post; a flat shade in the ground under the words; a place sticker, the line big, the call | `photo`, `pos`, `place`, `title`, `call` | Any image-led post: the city, the team, the result |
| `ca-photo-card` | The line on top, the photo below it as a perforated paper stamp, tilted; a place sticker on the photo, the contact on a sticker | `photo`, `pos`, `place`, `title`, `call` | A softer image post on a coloured ground |

## Countdowns

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `ca-count-big` | The number fills the page, a "Days to go" box over it, a landmark drawing breaks over the number into a torn strip of paper carrying the call | `number`, `line`, `art`, `place` | The illustrated ten-day series (vary `art`, `theme`) |
| `ca-count-photo` | A duotone photo of the city under a calendar grid, ghost numbers, a pinned paper note with the number, the line below | `number`, `photo`, `place`, `title` | The photo countdown series |
| `ca-cd-photo-bold` | Full photo, the number huge with "Days to go" stacked beside it, the line under | `number`, `photo`, `place`, `title` | A louder photo countdown |
| `ca-cd-tile` | A paper calendar page knocked askew, a ticket tucked against it, the place ringed by hand | `number`, `ticket`, `stub`, `where`, `days` | Day 10: "book now" |
| `ca-cd-extrude` | The brand's name repeated behind, two blobs, the number on them, a sticker, sparkles | `number`, `word` | An energetic mid-countdown day (best on `accent`) |
| `ca-cd-window` | The giant number with an arched photo window breaking through it, a "Days to go" box, a halftone sparkle, side labels | `number`, `photo`, `line`, `side`, `side2` | A face or the product in the countdown |
| `ca-cd-burst` | Light poster: the number in the brand's colour, a burst over the box, a picture, an asterisk | `number`, `line`, `art` | A light day in a dark run (best on `paper`) |
| `ca-cd-note` | A sticky note pinned to a calendar on a dark ground, the neighbouring dates ghosted | `number`, `month` | "Pin this": two days to go (best on `ink`) |
| `ca-cd-save` | Stacked words left, the number huge right, a "Day to go" box, torn paper with the call | `number`, `stack` (3 short words), `sub`, `label` | The last day ("Get ready, city"); best with one digit |
| `ca-cd-remix` | A duotone photo above a torn sheet, the number straddling the tear with a sticker, the line on the paper | `number`, `photo`, `place`, `title`, `side` | The remix series: photo + countdown + headline |

## Travel objects (paper, drawn in the brand's colours; uppercase only inside these objects)

Airport-style codes come from the brand's name and the city (`from`/`to` override them).

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `ca-pass` | A portrait boarding pass over the ground (or a photo `back`): a photo window, "Brand to City" set vertically, tear line, two dark tiles, details (place, contact, handle), a barcode | `photo`, `back`, `small`, `big`, `tiles`, `lead`, `place`, `sub` | "Now boarding": the announcement |
| `ca-pass-wide` | A landscape boarding pass knocked across the ground, a dotted flight path behind it | `title`, `from`, `to`, `fromName`, `toName`, `fields`, `stubNote` | "Departing in 10 days" |
| `ca-passport` | A passport page stamped on arrival: a framed stamp with the city, a round stamp, a pill stamp, a dashed stamp; the call below | `title`, `stamps` `[[small, big, small], [big, small], [small, big]]`, `ring` | "Stamped and arrived": launch day |
| `ca-pass-stub` | A ticket with a photo and the route, its torn-off stub carrying the contact vertically and a barcode | `photo`, `title`, `fields`, `stub` | A premium service ("First class") |
| `ca-pass-tag` | A luggage tag on its string: destination code, a priority band, three rows, a barcode; a sticker left | `title`, `kicker`, `rows` `[[label, value]]`, `band` | A playful promise ("Handled with care", "No pests on board") |
| `ca-pass-board` | A split-flap departures board: each service leaving for a part of the city, with a status pill | `title`, `rows` `[[service, place, status]]` (default from services × places), `boardTitle`, `cols` | Every service, every corner |
| `ca-ticket` | A ticket: from and to, three details, a tear line, a barcode stub (and an "arrived" stamp) | `title`, `fields`, `stamp` | "Next stop: City"; "Arrived" |

## Services

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `ca-service-list` | The line, then every service on a ruled list with its icon, the call | `title`, `items` (default `BRAND.services`, up to 5) | What we do, in one post |
| `ca-service` | A sticker, the service's picture on a disc in rays, its name with the first word marked, three ticks, the call | `service` (index), `points`, `art`, `kicker`, `title` | One post per service |

## Places

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `ca-area` | A pin, the neighbourhood's name huge, the line, the service it needs on a sticker, a framed scene of the area, the call along the foot | `area`, `title`, `service`, `art` | A neighbourhood series (one per place) |
| `ca-area-classic` | Same, the name bigger, an unframed picture strip of the area along the foot | `area`, `title`, `service`, `art` | The same series, lighter |
| `ca-areas` | The line, the places as tilted pills with pins (or lettered, to vote on) | `title`, `places` (default `BRAND.places`), `vote`, `note` | "Every corner of the city"; "Where should we go first?". Best with 8–12 places |

## Help and engagement

| Layout | Composition | Fields | Use it for |
|---|---|---|---|
| `ca-tip` | A sticker, the line, the advice on a taped paper note with a picture, the call | `kicker` ("Tip 01"), `title`, `body`, `art`, `seed` | A tips series |
| `ca-steps` | Three rows on dashed rules, an icon each (never numbered) | `title`, `steps` `[[title, line, icon]]` | How it works |
| `ca-checklist` | A checklist on a taped note; the last line is the brand | `title`, `items` (4–5) | Move-in lists, "Why us?" |
| `ca-split` | This or that: two tilted polaroid photos, lettered A and B | `title`, `a: [label, photo, pos]`, `b: [...]`, `note` | Engagement: "Which one first?" (photos required) |
| `ca-poll` | The question huge, a 1–10 scale of tiles, the ends named | `title`, `ends` | "Rate your … honestly" |
| `ca-quiz` | "Quiz time" huge, the question, three lettered answers | `word`, `title`, `items`, `note` | Quizzes |

## Notes for whoever extends it

- Extra colours come from `kit()` in the layout file (`--ca-pop`, `--ca-pop2`, `--ca-cpop*`, `--ca-ppop*`,
  `--ca-invmark`), each picked by measured contrast against the ground it sits on.
- Giant numbers are `.ink.bleed` with `data-over`: the check measures them, but they may sit under the boxes and
  pictures that are meant to cross them.
- Tilted stickers don't shrink (the fitter measures the tilted box); long sticker text ends in an ellipsis, so keep
  sticker words short.
