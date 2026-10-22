---
name: social-post-designer
description: Design a complete set of social media posts for any brand in any industry (fintech, food, services, health, education, retail, SaaS, events…) — from a one-line brief to a planned campaign, a gallery of finished 1080×1350 posts with captions, PNG export and a collision check. Also brand illustrations (flat, traced hands), print pieces, logo packs and social covers. Use when asked to design posts, a campaign, a launch or countdown, a content calendar, Instagram/Facebook/LinkedIn graphics, or illustrations for a brand.
---

# Social post designer

You turn a brief like "posts for our fintech app's savings launch" into a finished, on-brand set of posts. The skill
has two halves:

- **The thinking** (you): understand the brand and the moment, plan the campaign, write the words, choose layouts
  and pictures, and judge the result like a senior designer.
- **The engine** (`starter/`): a small Vite project that draws any brand's posts from `brand.json` and `posts.js`,
  picks readable colour pairs by measured contrast, fits every headline, checks that nothing touches, and exports PNG.

It was distilled from two complete campaigns made for real projects (a 146-post city launch for a home-services company
and 100+ posts for a children's app), and tested on brands it had never seen: fintech, fashion, a kids' app. Nothing in it
is tied to one industry, font or palette.

## The workflow

**1. Understand the brief.** Read [references/campaigns.md](references/campaigns.md) §1. Get six answers: the brand,
the audience, the moment, the action you want, where and how many, and what must never be said. Infer what you can
from what the user gave (a website, a logo, files in the repo, one sentence). Ask only for facts that change the work
and can't be inferred: contact details, real offers, dates. Never invent prices, rates, claims or reviews.

**2. Fill the brand.** Read [references/brand-intake.md](references/brand-intake.md). Whatever the user brings comes
first — their photos, brand guide, colours, fonts, design-system tokens, existing posts — and overrides your defaults.
Write `brand.json`: name, contacts, logo, font, colours, mark style, services/products, places. Only what's missing
is yours to choose (a fitting Google font, a palette from the logo); say which values you chose.

**3. Plan the campaign.** Pick the shape (launch, feature drop, promo, always-on month, event) and the series from
campaigns.md, using the playbook for the industry. Show the user the plan before building 100 posts: the series with
counts and layouts, ten sample headlines, and the facts you still need. If the user asked you to just go, build and
show the plan with the result.

**4. Scaffold the project.**
```sh
node ~/.claude/skills/social-post-designer/scripts/new-project.mjs <folder> [brand.json]
cd <folder> && npm install        # if npm's cache is not writable: npm install --cache <a temp dir>
npm run brand                     # every colourway's contrast; fix colours until nothing is flagged
```
Put the logo SVG and font files in `assets/`. Then the photos — a set needs plenty:
```sh
npm run photos -- --own ~/path/to/their/photos            # the brand's own, always first
npm run photos -- "nairobi street market" "friends saving together phone" "matatu city traffic" --n 3
```
Search for the brand's real world (its city, its customers, its product in use), several searches per series. Free
sources: Unsplash or Pexels with a free API key (`UNSPLASH_ACCESS_KEY`, `PEXELS_API_KEY`), otherwise Openverse
(Creative Commons; credits are added to captions automatically). Look at every photo and drop the weak ones.

**5. Write the posts** in `src/posts.js` (the example file shows every layout). Each post: series, layout, colourway
(theme), the words with one `[key word]`, picture or photo, and an Instagram caption. Follow the copy rules in
campaigns.md §5; choose layouts from the catalogues (`references/layouts-*.md`) and the guidance in
[references/posts.md](references/posts.md). Lean on photos: a set needs image-led posts (full-bleed photo, photo
cards and frames, photos in numbers and windows), not only type. Vary layouts and colourways so
no two neighbours look alike. Delete the example posts and the placeholder photo once you have your own.

**6. Build, check, look.**
```sh
npm run dev                # the gallery: filter by series, view large, copy captions, PNG ×1–×4, download all
npm run check              # must print 0 problems: nothing closer than 12px, nothing outside the safe area
npm run render -- --sheet  # out/sheet.png: every post on one page
npm run render             # out/@2x/*.png
```
Open the sheet and look at it, then crop into any post that seems off. Fix and repeat. Report what you saw, including
what's still weak.

**7. Make it the brand's own.** Replace the placeholder pictures with the brand's illustrations and photos
([references/illustrations.md](references/illustrations.md)); add layouts the brand needs (see "Extending" below).
Print, logo packs and social covers: [references/production.md](references/production.md).

## The design rules (from real client corrections)

Follow these from the first draft; they're what the clients sent back again and again.

- **Contrast always.** Light on dark or dark on light. The engine picks text colours by measured contrast; never
  override it with a colour that fails. An accent is a highlight, never the ground behind body text.
- **One margin, one grid.** Everything starts on the left margin. Fixed vertical stations so posts in a series line
  up. Nothing floats; every piece is anchored to a row, a column or a corner.
- **Nothing touches.** At least 12px between any two things, by their ink. `npm run check` enforces it.
- **Bold, not busy.** One idea per post, set big. No filler stars, squiggles, blobs or gradients. Fill the frame:
  a post with a big empty band is unfinished — give the idea more size or add the picture.
- **Typography with care.** One family; heavy for headlines, regular for body. The bigger the type, the tighter the
  leading and tracking. Balanced line breaks. Sentence case. **No all-caps small labels. No numbered lists** (use
  icons or just the words). No explainer lines under every title.
- **No shadows** on type, pictures or cards; no retro offsets, no glows. Separation comes from colour and space.
- **Pictures are flat and real.** Draw real things from photographs, so they're recognisable. No faces on objects.
  Hands are traced from a reference, never drawn freehand. Objects work physically (the finger is on the screen).
- **Facts come from one place.** Phone numbers, handles, emails come from brand.json, never typed into a layout.
  The handle always sits with its platform icons. Private details (an office address) never appear in public posts.
- **Vary the set.** A hundred posts should feel like ten systems, not one template.

## Extending the engine

- **A new layout:** add a function to `LAYOUTS` in `src/layouts.js` and its CSS in `src/post.css`, on the same grid
  (`--m` margins, top 170, call at bottom 130, foot at 58). Use `.fit` with a `max-height` on any headline box so it
  shrinks instead of overflowing; `.fit-w` for one-line words that must fit the width. Add its text and block
  selectors to `scripts/check.mjs`. The layout library to draw from (boarding passes, calendar notes, departure
  boards, Swiss grids, sticker walls, shape bands…) is in references/posts.md.
- **Another size** (stories 1080×1920, LinkedIn 1200×1200): add the size as a post field, set the article's width and
  height from it, and give the layouts a version for that frame; re-run the check at that size.
- **The brand's own illustrations:** put SVGs in `assets/illos/` and use `art: 'assets/illos/x.svg'`; the engine
  inlines them. Keep white parts `#FFFFFF` so they can be recoloured.
- **A call without a phone:** set `cta` in brand.json ("Download Kudi at"); the engine shows the phones, else the
  website, else the handle. A post can override it: `cta: ['Get it on', 'kudi.app']`.

## When the user sends a reference

"Copy this exactly" means its composition and shapes measured from the image, then put into the brand's colours —
trace it (`scripts/trace_reference.py`, illustrations.md). Then make what the user doesn't want copied their own
(clothing, screens, props). Mention the licence for stock images. A reference sent without words: say which of your
recent threads you assumed it's about.

## Files

- `starter/` — the engine (copied by `scripts/new-project.mjs`)
- `scripts/new-project.mjs` — start a project; `scripts/trace_reference.py` — trace a flat reference into layers
- `templates/print.mjs` — print PDF/SVG/PNG export, for when the brand needs print
- `references/campaigns.md` — the brief, campaign shapes, series, industry playbooks, copy
- `references/brand-intake.md` — filling brand.json
- `references/layouts-base.md`, `layouts-poster.md`, `layouts-campaign.md` — the catalogue: every layout, its fields, when to use it
- `references/posts.md` — layout, typography and alignment in depth
- `references/illustrations.md` — the flat style, spot illustrations, landmarks, scenes, hands
- `references/production.md` — fitting, the collision check, rendering, the gallery, print, logos, social covers
- `references/brands.md` — three worked brand files (fintech, fashion, kids' app) and why each choice was made
