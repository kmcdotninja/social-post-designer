/* The brand, read from brand.json, and the colourways made from it. Every colourway is a pair that is light on dark
   or dark on light, chosen by measured contrast (WCAG), so any layout in any colourway stays readable.
   Edit brand.json, not this file. */
import BRAND from '../brand.json';
export { BRAND };

const hex = h => h.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255);
const lum = h => hex(h).map(c => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4).reduce((s, c, i) => s + c * [.2126, .7152, .0722][i], 0);
export const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + .05) / (y + .05); };
// of the candidates, the one that reads best on bg
const best = (bg, ...cs) => cs.filter(Boolean).sort((a, b) => contrast(b, bg) - contrast(a, bg))[0];
// c if it reads on bg as large type (3:1), else the fallback
const ok = (c, bg, fb, min = 3) => c && contrast(c, bg) >= min ? c : fb;
const rgba = (h, a) => `rgba(${hex(h).map(c => Math.round(c * 255)).join(',')},${a})`;

const C = { paper: '#FFFFFF', ...BRAND.colors };
const WHITE = '#FFFFFF', INK = C.ink || '#111111';

/* one colourway: the ground, the words, the body copy, the key-word mark, the sticker, the paper card */
function way(name, bg, prefer){
  const fg = ok(prefer, bg, best(bg, WHITE, INK), 3);
  const body = contrast(fg, bg) >= 4.5 ? fg : best(bg, WHITE, INK);
  const mark = [C.accent, C.accent2, C.primary, fg].find(c => c && c !== bg && contrast(c, bg) >= 1.6 && c !== fg) || fg;
  const chip = mark, chipFg = best(chip, WHITE, INK);
  const card = bg === C.paper ? (C.tint || '#F2F4F8') : C.paper, cardFg = best(card, INK, WHITE);
  const markText = contrast(mark, bg) >= 3 ? mark : fg;   // the mark as big coloured words: only if it reads
  return { name, bg, fg, body, mark, markText, chip, chipFg, card, cardFg, line: rgba(fg, .22), dark: lum(bg) < .3 };
}
export const THEMES = Object.fromEntries([
  way('primary', C.primary, WHITE),
  way('paper', C.paper, C.primary),
  C.tint && way('tint', C.tint, C.primary),
  C.accent && way('accent', C.accent, INK),
  way('ink', INK, WHITE),
].filter(Boolean).map(t => [t.name, t]));

// CSS for the colourways: .t-primary { --bg: …; --fg: …; … }
export const themeCSS = () => Object.values(THEMES).map(t =>
  `.t-${t.name}{--bg:${t.bg};--fg:${t.fg};--bg0:${t.bg};--fg0:${t.fg};--body:${t.body};--mark:${t.mark};--marktext:${t.markText};--chip:${t.chip};--chipfg:${t.chipFg};--card:${t.card};--cardfg:${t.cardFg};--line:${t.line}}`).join('\n');

// one post's data: its series, layout and words, with the brand's hashtags added to the caption
// a photo whose licence needs a credit (scripts/photos.mjs records it) gets it added to the caption
const PHOTOS = Object.values(import.meta.glob('../assets/photos/photos.json', { eager: true, import: 'default' }))[0] || {};
const credit = p => [p.photo, ...(p.photos || [])].map(f => PHOTOS[f]).filter(m => m?.credit).map(m => `Photo: ${m.author}, ${m.license}`).join(' · ');
export const post = (series, layout, p) => ({ series, layout, ...p,
  caption: p.caption ? [p.caption, BRAND.hashtags, credit(p)].filter(Boolean).join(' ').trim() : '' });

// every brand colour with the text colour that reads on it, for layouts that use several colours at once
// (sticker walls, pill stacks, shape bands): --c-primary / --c-primary-fg, --c-accent / --c-accent-fg, …
const swatches = () => Object.entries(C).map(([k, v]) => `--c-${k}:${v};--c-${k}-fg:${best(v, WHITE, INK)}`).join(';');

// CSS for the brand's type and shape
export const brandCSS = () => {
  const f = BRAND.font, s = BRAND.style;
  const faces = Object.entries(f.files || {}).map(([w, url]) => `@font-face{font-family:"${f.family}";src:url(${url});font-weight:${w};font-display:block}`).join('\n');
  return `${faces}
.post{--font:"${f.family}",system-ui,sans-serif;--heavy:${f.heavy ?? 900};--regular:${f.body ?? 400};--m:${s.margin ?? 72}px;
  --r:${s.radius ?? 28}px;--track:${s.tracking ?? -.045}em;--lead:${s.leading ?? .94};--primary:${C.primary};--ink:${INK};--accent:${C.accent || C.primary};--paper:${C.paper};${swatches()}}`;
};

// a report of every colourway's contrast, for scripts/brand-check.mjs
export const report = () => Object.values(THEMES).map(t => ({ theme: t.name, bg: t.bg, fg: t.fg, headline: +contrast(t.fg, t.bg).toFixed(2), body: +contrast(t.body, t.bg).toFixed(2), mark: +contrast(t.mark, t.bg).toFixed(2) }));
