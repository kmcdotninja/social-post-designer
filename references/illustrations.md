# Illustrations

Four kinds of picture carry a post set: **icons/objects** (one thing, 200 × 200), **spot illustrations**
(a product scene, 400 × 320), **landmarks** (a real building, sized by its container), and **scenes** (a whole street,
1000 × 470). All are SVG strings in JS modules so posts, print and the gallery share them.

## The style (both brands agreed on this)

- **Flat.** One colour per part, plus at most one darker tone of that colour for a few round marks or the turned side.
- **No outlines** (unless the brand's style is outlined), **no shadows** (no cast, drop, long or offset shadow),
  **no gradients, no gloss, no stray stars or sparkles.** "We don't have shadows. It's just bullshit."
- **Brand palette only.** Each colour defined once with its darker tone: `{ blue: ['#1F4AE3', '#1838B8'], ... }`.
- **Big readable silhouettes.** Someone names it at a glance. Fill the frame (the "bolder" pass: scale ×1.08).
- **No faces on objects.** Houses, rocks, bottles, machines never get eyes or smiles. Only people and mascots do.
- **Drawn from photographs.** Look at a photo of the real thing first; keep the details that make it recognisable
  (a famous rock's dome and its streaks, the exact shape of the city's towers). A named place is never a generic box.
- **Contrast with every ground it sits on.** Check each piece against the darkest and the lightest tile. White parts
  use exactly `#FFFFFF` so a light post can recolour them; pale parts get a soft tint so they never vanish on cream.
- **Things work physically.** A mop stands in its bucket; a hose runs from the machine to the wand; a basket of
  folded clothes sits beside the washing machine; a spray bottle has mist leaving the nozzle; a trolley's wheels
  touch the ground; a hand's fingertip sits on the screen it taps.
- Iterate as a set, one change per pass (deeper tones → tinted pale parts → bolder → brand palette → fewer marks →
  contrast pass), and keep the passes so the client can compare.

## Spot illustrations (product scenes)

viewBox `0 0 400 320`. The recipe that read as "world-class product illustration" (after Instacart's style):
1. A **soft colour block** (rounded rect, `rx 22`, a pale brand tint: lilac, blush, mint, butter, ice), sitting low
   and to one side.
2. The **object rising out of it**, breaking the block's top edge. Big: it fills most of the 400 × 320.
3. A **hand or a person's arm** using the object when it helps (see Hands).
4. One small **status badge**: a green circle with a white check (or coral with a cross), radius 25, at the top
   right, clear of the object.
5. Navy (`ink`) for the darkest details (phone frame, handles, text bars); white for screens and labels.

A screen inside a device: rounded rect inset from the frame, a coloured header bar, 3–4 message bubbles drawn as
rounded rects with text bars (no real text), one bubble in the brand colour.

## Landmarks and scenes

- **Landmarks:** three flat tones (light side, body, turned side) for volume, with light from the upper left. Sit on
  the ground line (`preserveAspectRatio="xMidYMax meet"`). Trees as clusters of circles in two greens.
- **Scenes** (a neighbourhood): a kit of parts with real local detail (perimeter walls and gates, black water tanks
  on roofs, AC units, green-and-white taxis, kekes, palms), the brand's crew at work and its van parked. One sky per
  scene so it reads the same on any post colour. Fixed bands: sky to 360, pavement 360–384, road below.
- A skyline strip for covers was rejected ("don't think we need illustration") — use it only when asked.

## Hands

Drawn freehand, hands were rejected every time ("doesn't look like hands", "the hand is not connecting").
Shading them with crescents or offsets was rejected too. What worked: **trace a real hand, then make it flat.**

### Method A: trace a flat vector reference (best; the client called it "a very good way to draw hands")
Use when the client gives an illustration reference (a flat stock-style hand).
1. Save the reference; read its exact palette (`np.unique` on pixels, top 30 colours).
2. Run `scripts/trace_reference.py` with a palette spec (see the script's docstring): every pixel goes to its nearest
   palette colour; each layer is cleaned (opening, small components dropped, closing), smoothed (Gaussian 1.2) and
   traced by potrace (`-a 1.1 -O 0.4`).
3. Layers are painted in order: sleeve → its tones → (the device) → skin → skin shade → nails.
   - Nails are usually near-white: find them as the holes inside the filled skin mask that are bright.
   - Watermarks: drop short components (bounding box < ~90px on a 1200 image) from thin layers.
   - A device the hand overlaps (a phone): don't trace it, rebuild it as a rounded rect measured from the image
     (frame thickness, corner radius from where the frame starts), and draw your own screen.
4. **Overlapping hands must be separate layers.** Split the mask by region (e.g. `X > 620 & Y > 598` for the tapping
   hand) and trace each, then move the top hand a few px so a gap shows: one fingertip sinking into the other hand
   reads as "inside the phone, not on top of it".
5. Recolour: skin to a real skin tone (`#8B5A3C` with shade `#6A4229` and nails `#E2B699` worked), sleeves to the
   brand. Then **redesign what the client doesn't want copied** — the clothing: e.g. a crew-shirt sleeve in brand
   blue, a navy rolled cuff with a coral trim and a white button, drawn inside a clipPath of the traced sleeve.
6. Compare side by side with the reference at the same scale before showing the client.
7. Tell the client about the licence: a near-copy of a stock image needs a commercial licence.

### Method B: trace a photograph
Use when there's no flat reference. Take a free-licence photo (Unsplash) of a hand holding the object; segment the skin
by colour (warm and not grey: `R > G + .04, G >= B - .02, V .22–.99, S > .08`), keep the largest several components
(fingertips get separated by the object), close and fill holes, smooth, potrace. Store as `{ t: transform, d: path }`
in photo pixel coordinates and place it with a nested `<svg viewBox>` over the object. Fill flat in one skin tone.

### Hand anatomy to keep (when adjusting a traced hand)
Holding a phone: the palm cups the lower part, the wrist leaves through the bottom, the thumb up the near edge,
four fingertips wrap round the far edge with nails showing, each a tilted capsule. Tapping: index extended, its pad
on the screen, the other fingers curled, the thumb tucked. A hand scaled must scale around its fingertip, or it stops
pointing at its target.

## Mascots and people

- A mascot has a fixed home (a corner) and fixed proportions; posts show it peeking in from an edge, cheering,
  holding something, scaled up until it runs off the tile.
- Characters respect the brand's limits (a faith brand may never draw its holy figures: tell their stories in words, an
  object at most). Ask what the brand won't depict.
- Perspective character illustrations (a full person at an angle) are a separate, later addition; do them with
  Method A from a reference.
