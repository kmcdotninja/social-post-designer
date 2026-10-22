# Brand intake: filling brand.json from whatever you're given

The whole look comes from `brand.json` in the project. Fill it from what exists; invent only what the brand doesn't
have yet, and say what you invented.

## The user's own material comes first

Whatever the user brings overrides the skill's defaults (except contrast and collisions, which no brand overrides):
- **Photos they've taken:** `npm run photos -- --own <folder>` copies them into `assets/photos/` and records them as the
  brand's own. Use them before any stock photo. Look at each one: pick the sharp ones with room for words.
- **A brand guide (PDF, slides, a Notion page):** read it all. Take the colours (with their exact values), fonts,
  logo files and clear-space rules, the tone of voice, the do's and don'ts, and the photography style. Its don'ts
  become rules for the whole set; write them into your plan so you check posts against them.
- **A design system or tokens:** CSS variables, a Tailwind config, Figma/Style Dictionary token JSON, a theme file.
  Map them: the main brand colour → `primary`, the darkest text colour → `ink`, the highlight → `accent`, the
  surface tint → `tint`, the background → `paper`; the heading font and weights → `font`; the corner radius → `radius`.
- **Existing posts or screens:** study them for what the brand already does (layout habits, mark style, photo
  treatment) and keep that continuity unless they ask for a new look.
- **Fonts they own:** put the files in `assets/fonts/` and list them in `font.files`.

Only when something is missing does the skill choose: a Google font that fits, a palette derived from the logo,
stock photos from `npm run photos`.

## Where the facts come from, best first

1. **Files the user points to or that sit in the repo:** a logo SVG/PNG, a brand guide PDF, an existing app or site's
   CSS (`--primary`, tailwind config, theme files), earlier posts.
2. **The brand's website or app store page** (if given): its CSS colours and `font-family`, the logo in the header,
   the tagline, the products, the contact page, the social links.
3. **The user's sentence:** "a fintech app in Lagos for students" gives industry, city and audience.
4. **Your judgement**, for what's left (below). List every invented value in your reply.

Never put the user's own email or account details into posts. Contact details come only from the brand.

## Each field

| Field | How to fill it |
|---|---|
| `name`, `description` | the brand's own words; description is one plain line ("Save, send and grow your money in one app") |
| `campaign`, `slug` | from the moment ("Savings launch" → `kudi-savings`); slug names the exported files |
| `city`, `places` | the brand's market; places are real neighbourhoods/areas the brand serves |
| `handle`, `socials` | the real handle; socials in the order the brand uses them (instagram, facebook, x, tiktok, whatsapp, linkedin, youtube). The handle always shows with these icons |
| `phones`, `email`, `website` | only real ones. Empty `phones` is fine: the call falls back to the website, then the handle. Unknown handle or website: use an obvious placeholder (`@yourhandle`, `yourbrand.example`) and list it as a fact still needed |
| `cta` | the verb for the business: "Call to book at", "Download {name} at", "Order on WhatsApp", "Register at" |
| `hashtags` | 3–5: the brand tag, the campaign tag, the city/industry tag |
| `logo.file` | an SVG in `assets/`. `mono: true` for a one-colour logo: the engine recolours it to suit every colourway. For a multi-colour logo set `mono: false` with `light` (for dark grounds) and `dark` files. No SVG yet: leave `file` empty and the name is set in the heading font |
| `font` | see below |
| `colors` | see below |
| `style` | see below |
| `services` | 3–6 offers, each `{ name, short, icon }`; icon from art.js (sparkle, sofa, spray, shield, home, bug, truck, phone, check, wallet, card, send, chart, lock, bell, gift, clock, people, chat, star, bolt, heart, globe) |

## Fonts

- Google fonts load over the network when posts render; offline, `npm run check` warns that the brand font did not
  load. For reliable renders, put the font files in `assets/fonts/` and list them in `font.files`.
- Look for the brand font: the brand guide, the website's CSS, then the machine (`ls ~/Library/Fonts /Library/Fonts`
  on a Mac; `fc-list` on Linux). Local files go in `assets/fonts/` and `font.files` (`{ "400": "assets/fonts/x.ttf",
  "900": "…" }`).
- Not available: pick a Google font that matches the brand's personality and set `font.google`
  ("Family:wght@400;700;900"):
  - confident, geometric, modern services → Plus Jakarta Sans, Manrope, Outfit, Figtree
  - friendly, rounded, children, food → Nunito, Baloo 2, Fredoka, Quicksand (heavy weights)
  - serious finance, enterprise → Inter, IBM Plex Sans, DM Sans
  - fashion, editorial → Fraunces or Playfair for headlines (then set `heavy` to its boldest weight)
- `heavy` is the boldest weight you have (900, or 800); `body` 400–500. Two weights carry everything.

## Colours

`primary` (the brand's main colour), `ink` (its darkest: near-black tinted with the primary's hue), `accent` (the
loud highlight), `accent2` (a second highlight, optional), `tint` (a very light wash of the primary), `paper` (white
or the brand's off-white).
- From a logo or site, take the 2–4 colours actually used. The most present saturated one is `primary`.
- Missing ink: the primary darkened to about 12% lightness. Missing tint: the primary mixed 8–10% into white.
  Missing accent: a colour far from the primary on the wheel with high lightness (lime or yellow against greens and
  blues; coral against blues; cyan against purples).
- Then run `npm run brand`: every colourway must show headline ≥ 3 and body ≥ 4.5. If one fails, change the colour,
  not the rule. The engine already picks white or ink text by measured contrast.

## Style

- `mark` — how the key word is marked: `stroke` (a drawn line under it; set `strokePath` if the brand has its own
  line), `block` (the word on a block of the opposite colour; bold and modern), `underline`
  (thick, offset), `color` (the word in the accent; only when the accent reads on every ground).
- `radius` — 0–12 sharp and corporate, 24–36 friendly, 40+ playful.
- `margin` — 72 is standard on 1080; 64 for dense brands, 88 for luxury/editorial air.
- `tracking` −0.03 to −0.055em, `leading` .9–1. Tighter for heavy geometric fonts, looser for rounded or serif.

## Assets

- Photos: the brand's own first. Otherwise free-licence photos (Unsplash, Pexels) of the brand's real market (its
  city, its customers), saved in `assets/photos/` with a `SOURCES.txt` (URL, author, licence). Wikimedia photos often
  need a credit in the caption.
- Illustrations: the art.js placeholders get you started; replace them with the brand's own (illustrations.md).
