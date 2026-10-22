# Three worked brands

Fictional brands the engine was tested on, chosen to be as different as possible. Use them to see how a brief turns
into `brand.json`, not as palettes to reuse.

## Kudi — a savings app (fintech)

```json
"font": { "family": "Plus Jakarta Sans", "google": "Plus Jakarta Sans:wght@400;500;700;800", "heavy": 800, "body": 500 },
"colors": { "primary": "#0B3D2E", "ink": "#06231A", "accent": "#C6F432", "accent2": "#FF8A5B", "tint": "#EEF6EF", "paper": "#FFFFFF" },
"style": { "mark": "block", "radius": 36, "margin": 72, "tracking": -0.04, "leading": 0.96 },
"cta": "Download Kudi at", "phones": [], "website": "kudi.app"
```
- A deep green reads as money and calm; lime is the loud, young accent. Green-on-lime and lime-on-green both pass.
- A geometric sans for confidence; the `block` mark makes the key word feel like a button.
- No phone: the call falls back to the website.
- Fintech rules: no promised returns, no licences or insurance that weren't given; rates only from the brand.

## Maison Adé — handmade womenswear (fashion)

```json
"font": { "family": "Fraunces", "google": "Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900", "heavy": 900, "body": 400 },
"colors": { "primary": "#7A2E1F", "ink": "#2A1410", "accent": "#E8B44C", "accent2": "#3F6B4F", "tint": "#F6EDE3", "paper": "#FFFCF7" },
"style": { "mark": "underline", "radius": 6, "margin": 88, "tracking": -0.03, "leading": 0.98 },
"cta": "Shop the collection at"
```
- A serif for an editorial voice; a wider margin (88) gives luxury air; small radius for sharper, tailored shapes.
- Earth tones from the clothes themselves; gold as the accent; an off-white paper instead of pure white.
- `underline` is quieter than a block, right for fashion. Photo-led layouts carry most of the set.

## Tinkle — a reading app for children (edtech)

```json
"font": { "family": "Nunito", "google": "Nunito:wght@400;700;900", "heavy": 900, "body": 700 },
"colors": { "primary": "#6C4CF1", "ink": "#16112E", "accent": "#FFD23F", "accent2": "#FF6FB5", "tint": "#F1EDFF", "paper": "#FFFFFF" },
"style": { "mark": "block", "radius": 40, "margin": 72, "tracking": -0.03, "leading": 1 },
"cta": "Download Tinkle at"
```
- A rounded font and big radius for warmth; body copy at 700 so it stays readable for young eyes and tired parents.
- Three bright colours for stickers and pill stacks; the engine pairs each with the text colour that reads on it.
- Speak to parents, show the child's world; never stock children's faces presented as users.

## What these show

- The same posts.js renders as three different brands: only `brand.json` changes.
- Each choice has a reason tied to the audience; write the reason down when you make the choice.
- Run `npm run brand` after every palette change; fix the colour, never the contrast rule.
