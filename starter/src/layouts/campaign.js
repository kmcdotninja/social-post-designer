/* The campaign family: a full launch campaign's worth of post designs (teasers, ten-day countdowns, travel objects,
   services, neighbourhoods, tips and engagement), proven on a 146-post city launch and made brand-agnostic.
   Every layout keeps one grid (top 64 · first line 170 · call bottom 120–140 · foot 58 · margin --m); the brand
   brings its font, colours, pictures, places and contacts.

   The look: one heavy face set big and tight; countdown numbers that are the poster; real paper objects (boarding
   passes, a passport page, a luggage tag, a departures board, calendar notes, torn paper, polaroids, perforated
   stamps) drawn in the brand's colours with only a very soft shadow under the paper; tilted pill stickers; quiet
   texture in the ground's own tone (rays, rings, bubbles, a halftone sparkle).

   Colours: every pair comes from the colourway (bg/fg, chip/chipfg, card/cardfg) or from the brand's swatches with
   the text colour measured against them. kit() below adds the few the layouts need on top:
     --ca-pop / --ca-popfg     the loud colour that reads on the ground (countdown numbers, "days to go" boxes)
     --ca-pop2                 a second, decorative colour (bursts, asterisks, tape)
     --ca-cpop / --ca-cpop2    colours that read on the card (pins, ticks, the calendar tile)
     --ca-ppop / 2 / 3         colours that read on the brand's paper (airport codes, stamps)
     --ca-invmark              the key-word colour on the inverse ground (fg as ground, bg as words: torn paper)
   Pictures: `art` is a picture slot (an art.js name or 'assets/…svg'); where a layout wants a landmark, a skyline or
   a street, a plain drawing stands in until the brand supplies its own. `photo` is a photo path. */
import { BRAND, esc, words, icon, top, foot, cta, art, photo, h, sub, handle, theme, logo, phones } from '../core.js';
import { contrast } from '../brand.js';

/* ── colour kit ── */
const C = { paper: '#FFFFFF', ...BRAND.colors }, WHITE = '#FFFFFF', INK = C.ink || '#111111';
const same = (a, b) => !!a && !!b && a.toLowerCase() === b.toLowerCase();
const best = (bg, ...cs) => cs.filter(Boolean).sort((a, b) => contrast(b, bg) - contrast(a, bg))[0];
const pick = (bg, min, ...cs) => cs.find(c => c && !same(c, bg) && contrast(c, bg) >= min);
function kit(p){
  const t = theme(p);
  const pop = pick(t.bg, 3, C.accent, C.primary, C.accent2, INK, WHITE) || t.fg;
  const pop2 = pick(t.bg, 1.6, ...[C.accent2, C.accent, C.primary, t.fg].filter(c => !same(c, pop))) || pop;
  const cpop = pick(t.card, 3, C.primary, INK) || t.cardFg;
  const cpop2 = pick(t.card, 3, ...[C.accent2, C.accent, C.primary].filter(c => !same(c, cpop))) || cpop;
  const cpop3 = pick(t.card, 3, ...[C.accent2, C.accent, C.primary, INK].filter(c => !same(c, cpop) && !same(c, cpop2))) || t.cardFg;
  const invmark = pick(t.fg, 1.6, C.accent, C.accent2, C.primary, t.bg) || t.bg;
  // on the brand's paper (passes, tickets, tags, polaroids): codes, stamps
  const ppop = pick(C.paper, 3, C.primary, INK) || INK;
  const ppop2 = pick(C.paper, 3, ...[C.accent2, C.accent, C.primary].filter(c => !same(c, ppop))) || ppop;
  const ppop3 = pick(C.paper, 3, ...[C.accent, C.accent2, C.primary, INK].filter(c => !same(c, ppop) && !same(c, ppop2))) || INK;
  const band = C.accent2 || C.accent || C.primary;
  const v = { pop, popfg: best(pop, WHITE, INK), pop2, cpop, cpop2, cpop3, invmark, ppop, ppop2, ppop3, band, bandfg: best(band, WHITE, INK),
    boardpop: pick(INK, 3, C.accent, C.accent2, WHITE) || WHITE };
  return Object.entries(v).map(([k, c]) => `--ca-${k}:${c}`).join(';');
}
// the extruded-number poster needs three colours that all differ: the ground, a blob, and the number on the blob
function trio(p){
  const t = theme(p), pool = [C.primary, INK, C.accent, C.accent2, C.paper, WHITE].filter(c => c && !same(c, t.bg));
  const blob = pool.sort((a, b) => contrast(b, t.bg) - contrast(a, t.bg))[0];
  const num = pool.filter(c => !same(c, blob)).sort((a, b) => contrast(b, blob) - contrast(a, blob))[0];
  return `--ca-blob:${blob};--ca-num:${num};--ca-numfg:${best(num, WHITE, INK)}`;
}
// photo-led layouts need a real photo: they never fall back to a block of colour with a small picture
const need = (p, name, ok = p.photo) => { if (!ok) throw new Error(`Layout "${name}" (post ${p.id}) needs a photo: set photo: 'assets/photos/…jpg'.`); };
const ca = (p, html, extra = '') => `<div class="ca" style="${kit(p)}${extra ? ';' + extra : ''}">${html}</div>`;

/* ── small drawn parts ── */
const svg = (vb, body, cls = '') => `<svg class="${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
const PIN = svg('0 0 24 24', '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" fill="currentColor"/>');
const PLANE = svg('0 0 120 120', '<path d="M112 14 C118 8 108 0 100 6 L74 30 L18 12 L8 22 L54 50 L32 72 L14 70 L6 78 L28 90 L40 112 L48 104 L46 86 L68 64 L96 110 L106 100 L88 44Z" fill="currentColor"/>');
const PHONE = svg('0 0 24 24', '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>');
const GLOBE = svg('0 0 24 24', '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" fill="none" stroke="currentColor" stroke-width="2"/>');
const CHECK = svg('0 0 40 40', '<circle cx="20" cy="20" r="20" fill="currentColor"/><path d="M11 20.5l6 6 12-13" stroke="var(--ca-tick, #fff)" stroke-width="4.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>');
const BIGPIN = svg('0 0 100 130', '<path d="M50 0 C22 0 0 22 0 50 C0 86 50 130 50 130 C50 130 100 86 100 50 C100 22 78 0 50 0Z" fill="var(--ca-pop)"/><circle cx="50" cy="48" r="20" fill="var(--bg)"/>');
const RINGS = svg('0 0 400 400', [190, 150, 110, 70].map(r => `<circle cx="200" cy="200" r="${r}" fill="none" stroke="currentColor" stroke-width="16"/>`).join(''));
const SQUIGGLES = svg('0 0 300 300', '<g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round"><path d="M40 60 c20 -30 40 30 60 0 s40 30 60 0"/><path d="M200 140 c-30 10 -10 50 10 30 s-10 -40 -30 -20 s10 60 40 40"/><path d="M60 200 q20 -40 40 0 t40 0"/></g>');
const BURST = svg('0 0 200 90', '<g stroke="currentColor" stroke-width="14" stroke-linecap="round"><path d="M100 80 V10"/><path d="M60 82 L34 26"/><path d="M140 82 L166 26"/><path d="M28 86 L4 66"/><path d="M172 86 L196 66"/></g>');
const ASTER = svg('0 0 100 100', '<g stroke="currentColor" stroke-width="16" stroke-linecap="round"><path d="M50 8 V92"/><path d="M14 29 L86 71"/><path d="M14 71 L86 29"/></g>');
const LOOP = svg('0 0 400 200', '<path d="M60 40 C150 0 360 10 380 90 C400 170 220 200 120 180 C30 165 0 110 40 60 C60 35 110 22 150 20" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" vector-effect="non-scaling-stroke"/>', 'ca-loop');

// a barcode: bars across (dir 'x') or stacked (dir 'y')
const bars = (n, dir = 'x', w = [3, 7, 2, 9, 4, 2, 6]) => Array.from({ length: n }, (_, i) => `<i style="${dir === 'x' ? 'width' : 'height'}:${w[i % w.length]}px"></i>`).join('');
// a tilted pill sticker in the chip colours (an optional pin or icon)
const stk = (raw, r = -4, cls = '', ic = '', text = raw && esc(raw)) => text ? `<span class="ca-stk box ${cls}" style="--rot:${r}deg">${ic === 'pin' ? `<i class="ca-ic">${PIN}</i>` : ic ? `<i class="ca-ic disc">${icon(ic)}</i>` : ''}<span class="ca-stk-t">${text}</span></span>` : '';
const stkHtml = (html, r, cls) => stk(' ', r, cls, '', html);
const place = (text, r = 3, cls = '') => stk(text, r, 'place ' + cls, 'pin');
// quiet texture in the ground's own tone
const bubbles = (seed = 1) => `<div class="ca-bubbles">${[[90, 14, 54], [95, 24, 22], [84, 9, 18], [6, 70, 26], [3, 62, 14]].map(([x, y, r], i) =>
  `<i style="left:${x - (seed % 3) * 2}%;top:${y + (seed % 4) * (i % 2 ? 1 : -1)}%;width:${r}px;height:${r}px"></i>`).join('')}</div>`;
const rings = () => `<div class="ca-rings">${RINGS}</div>`;
const rays = cls => `<i class="ca-rays ${cls}"></i>`;
const confetti = () => {
  const spots = Array.from({ length: 140 }, (_, i) => [(i * 197) % 1080, (i * 311) % 1350]).filter(([x, y]) => (x < 34 || x > 1016) && y > 140 && y < 1230)
    .concat([[520, 120], [640, 140], [880, 1228], [1030, 1300], [40, 1320]]).slice(0, 40);
  const cols = ['var(--ca-pop)', 'var(--ca-pop2)', 'var(--fg)', 'var(--mark)'];
  return `<div class="ca-confetti">${svg('0 0 1080 1350', spots.map(([x, y], i) => i % 3
    ? `<rect x="${x}" y="${y}" width="${14 + (i % 4) * 4}" height="34" rx="6" fill="${cols[i % 4]}" transform="rotate(${(i * 37) % 180} ${x} ${y})"/>`
    : `<circle cx="${x}" cy="${y}" r="${8 + (i % 5) * 3}" fill="${cols[i % 4]}"/>`).join(''))}</div>`;
};
const deco = (p, seed) => p.confetti ? confetti() : p.deco === false ? '' : bubbles(seed) + rings();

/* ── stand-in pictures (until the brand sends its own): flat, in the colourway's own colours ── */
// a city skyline, 1080 × 420, buildings in the words' colour with the ground's colour for windows
const SKYLINE = svg('0 0 1080 420', (() => {
  const b = [[40, 170, 120], [170, 110, 230], [290, 90, 160], [390, 140, 290], [540, 120, 200], [670, 80, 330], [760, 130, 180], [900, 100, 250], [1000, 70, 150]];
  return b.map(([x, w, ht], i) => {
    const y = 404 - ht, fill = i % 3 === 1 ? 'var(--ca-pop)' : 'var(--fg)', win = i % 3 === 1 ? 'var(--ca-popfg)' : 'var(--bg)';
    const rows = Math.floor((ht - 40) / 46), cols = Math.max(1, Math.floor((w - 24) / 34));
    const wins = Array.from({ length: rows * cols }, (_, k) => `<rect x="${x + 16 + (k % cols) * ((w - 32) / cols)}" y="${y + 26 + Math.floor(k / cols) * 46}" width="${(w - 32) / cols - 12}" height="22" rx="4" fill="${win}" opacity=".5"/>`).join('');
    const roof = i === 3 ? `<path d="M${x} ${y} Q${x + w / 2} ${y - 120} ${x + w} ${y}Z" fill="var(--ca-pop)"/>` : i === 5 ? `<rect x="${x + w / 2 - 5}" y="${y - 90}" width="10" height="90" rx="5" fill="var(--fg)"/>` : '';
    return `${roof}<rect x="${x}" y="${y}" width="${w}" height="${ht}" rx="6" fill="${fill}"/>${wins}`;
  }).join('') + '<rect x="0" y="398" width="1080" height="22" rx="11" fill="var(--ca-pop)"/>';
})());
// a landmark: a city gate, two towers and a beam, 520 × 420
const GATE = svg('0 0 520 420', `<path d="M70 398 L110 60 Q120 30 140 60 L170 398Z" fill="var(--fg)"/><path d="M350 398 L380 60 Q400 30 410 60 L450 398Z" fill="var(--fg)"/>
  <rect x="150" y="230" width="220" height="52" rx="8" fill="var(--ca-pop)"/><rect x="176" y="248" width="168" height="16" rx="8" fill="var(--ca-popfg)" opacity=".7"/>
  <path d="M130 120 Q260 210 390 120" fill="none" stroke="var(--ca-pop)" stroke-width="10"/><rect x="236" y="96" width="48" height="60" rx="6" fill="var(--ca-pop2)"/>
  <rect x="0" y="398" width="520" height="22" rx="11" fill="var(--ca-pop)"/>`);
// a street: houses, trees, a road, 1000 × 300, drawn on the card colour
const STREET = svg('0 0 1000 300', `<rect width="1000" height="300" fill="var(--card)"/><circle cx="860" cy="70" r="42" fill="var(--ca-cpop2)" opacity=".85"/>
  ${[[60, 150, 120], [330, 220, 150], [640, 170, 110]].map(([x, w, ht], i) => `<path d="M${x - 14} ${244 - ht} L${x + w / 2} ${190 - ht} L${x + w + 14} ${244 - ht}Z" fill="${i === 1 ? 'var(--ca-cpop)' : 'var(--ca-cpop2)'}"/>
    <rect x="${x}" y="${244 - ht}" width="${w}" height="${ht}" fill="var(--paper)"/><rect x="${x}" y="${244 - ht}" width="${w}" height="${ht}" fill="var(--ca-cpop)" opacity=".12"/>
    <rect x="${x + w / 2 - 18}" y="${244 - 64}" width="36" height="64" rx="4" fill="var(--ca-cpop)"/>
    ${[0.18, 0.66].map(f => `<rect x="${x + w * f}" y="${244 - ht + 26}" width="${w * .18}" height="34" rx="4" fill="var(--ca-cpop)" opacity=".55"/>`).join('')}`).join('')}
  ${[[250, 1], [560, 1.2], [880, .9]].map(([x, s]) => `<rect x="${x - 5}" y="${244 - 90 * s}" width="10" height="${90 * s}" fill="var(--ca-cpop)"/><circle cx="${x}" cy="${244 - 100 * s}" r="${34 * s}" fill="var(--ca-cpop)" opacity=".75"/>`).join('')}
  <rect x="0" y="244" width="1000" height="56" fill="var(--cardfg)"/>${Array.from({ length: 9 }, (_, i) => `<rect x="${30 + i * 112}" y="268" width="60" height="8" rx="4" fill="var(--card)"/>`).join('')}`);
const STAND = { skyline: SKYLINE, gate: GATE, street: STREET };
// a picture slot: the brand's art if given, else the stand-in
const slot = (a, fallback, cls) => a ? art(a, cls) : `<div class="art ${cls}">${STAND[fallback]}</div>`;

/* ── the brand's facts ── */
const city = p => p.city || BRAND.city || '';
const contact = () => phones()[0] || BRAND.website || BRAND.handle;
const contactIcon = () => phones()[0] ? PHONE : GLOBE;
const code = s => String(s || '').replace(/[^\p{L}]/gu, '').slice(0, 3).toUpperCase();
const from = p => p.from || code(BRAND.name);
const to = p => p.to || code(city(p));
const num = p => String(p.number ?? p.n ?? 7);
const pad2 = n => String(n).padStart(2, '0');
const unit = (p, br = true) => esc(p.unit || (+num(p) === 1 ? 'Day to go' : 'Days to go')).replace(' to', br ? '<br>to' : ' to');
const services = p => (p.items || BRAND.services || []).map(s => typeof s === 'string' ? { name: s } : s);
const places = p => p.places || BRAND.places || [];
// the call along the foot: the number or site left, a place sticker and the handle right
const callFoot = (p, pl) => `<footer class="ca-cbfoot">${ctaF('ca-cb', p)}<div class="ca-cbside">${pl ? place(pl, -3, 'sm') : ''}${handle()}</div></footer>`;
// the call, its big line shrinking to fit when a website or number is long
const ctaF = (cls, p) => cta(cls, p).replace(/<b>/g, '<b class="fit-w">');
const lines = s => esc(s).replace(/\n/g, '<br>');
// what a poster-sized number may sit under or over (it is the ground of the post, not a word beside the others)
const OVER = '.ca-days, .ca-win, .ca-stk, .art, .h, .cta small, .cta b, .handle';

/* ── the layouts ── */
export default {
  /* ─────────── type ─────────── */
  // the poster: a tilted sticker, the line huge, one sentence, then the call (or "follow us" and the handle)
  'ca-type-hero': p => ca(p, `${deco(p, 3)}${top(p, p.label)}${stk(p.kicker, -6, 'ca-th-stk')}${h(p.title, 'ca-th-h')}${sub(p.sub, 'ca-th-sub')}
    ${p.follow ? ctaF('ca-th-cta', { cta: [p.follow, BRAND.handle] }) : ctaF('ca-th-cta', p)}${foot(p, { phone: false })}`),

  // a statement in the middle of the page: a picture (or a sticker) above it, a line and the call under it
  'ca-statement': p => ca(p, `${deco(p, 2)}${top(p, p.label)}
    ${p.art ? art(p.art, 'ca-st-art') : stk(p.kicker || `${BRAND.name} · ${city(p)}`, -5, 'ca-st-stk')}
    ${h(p.title, `ca-st-h ${p.art ? '' : 'tall'}`)}
    <div class="ca-st-bot">${p.sub ? `<p class="sub ink fit ca-st-sub">${words(p.sub)}</p>` : ''}${p.call ? ctaF('', p) : ''}</div>${foot(p, { phone: false })}`),

  // the line on top, the city's skyline along the foot on rays
  'ca-skyline': p => ca(p, `${p.confetti ? confetti() : ''}${rays('b')}${top(p, p.label)}${h(p.title, 'ca-sk-h')}${sub(p.sub, 'ca-sk-sub')}
    ${slot(p.art, 'skyline', 'ca-sk-art bleed')}${foot(p, { phone: !p.confetti })}`),

  // a landmark drawing standing on rays, the line above it, a sticker between
  'ca-landmark': p => ca(p, `${rays('b')}${top(p, p.label)}${h(p.title, 'ca-lm-h')}${stk(p.sub, -3, 'ca-lm-stk')}
    ${slot(p.art, 'gate', `ca-lm-art ${p.tall ? 'tall' : ''}`)}${foot(p)}`),

  /* ─────────── photos ─────────── */
  // the photo fills the post; a flat shade in the colourway's ground under the words; a place sticker, the line, the call
  'ca-photo-full': p => need(p, 'ca-photo-full') || ca(p, `${photo(p, 'full ca-fill')}<i class="ca-shade"></i>${top(p, p.label)}
    <div class="ca-pf-body">${place(p.place, -3)}${h(p.title, 'ca-pf-h')}${p.call ? ctaF('', p) : ''}</div>${foot(p)}`),

  // the line on top, the photo as a perforated stamp under it, a place sticker on the photo
  'ca-photo-card': p => need(p, 'ca-photo-card') || ca(p, `${top(p, p.label)}<div class="ca-pc-col">${h(p.title, 'ca-pc-h')}
    <div class="ca-pc-stamp box" style="--rot:-2.5deg"><div class="ca-pc-in">${photo(p, 'ca-fill')}${place(p.place, 2, 'ca-pc-place')}
    ${p.call ? stk(contact(), 4, 'ca-pc-call alt') : ''}</div></div></div>${foot(p)}`),

  /* ─────────── countdowns ─────────── */
  // the number is the poster: it fills the page and runs into a torn strip of paper; a picture breaks over it
  'ca-count-big': p => ca(p, `${top(p, '')}<div class="ca-mega ink bleed ${num(p).length > 1 ? 'two' : 'one'}" data-over="${OVER}">${esc(num(p))}</div>
    <div class="ca-days box"><b>${unit(p)}</b>${p.line ? `<span class="fit">${esc(p.line)}</span>` : ''}</div>
    ${slot(p.art, 'gate', 'ca-cb-art')}<i class="ca-torn"></i><div class="ca-inv ca-cb-inv">${callFoot(p, p.place)}</div>`),

  // a note pinned to a calendar laid over a duotone photo of the city
  'ca-count-photo': p => need(p, 'ca-count-photo') || ca(p, `<div class="ca-duo">${photo(p, 'ca-fill')}</div><i class="ca-cal"></i>
    <span class="ca-ghost a">${+num(p) + 1}</span><span class="ca-ghost b">${+num(p) > 1 ? +num(p) - 1 : ''}</span>${top(p, '')}
    <div class="ca-cp-note box" style="--rot:-4deg"><i class="ca-tack"></i><b>${pad2(num(p))}</b><span>${unit(p, false).toLowerCase()}</span>${place(p.place, 5, 'ca-cp-place')}</div>
    ${h(p.title, 'mid ca-cp-h')}${foot(p)}`),

  // the full-photo countdown, louder: the number with "days to go" stacked beside it, the line under
  'ca-cd-photo-bold': p => need(p, 'ca-cd-photo-bold') || ca(p, `${photo(p, 'full ca-fill')}<i class="ca-shade bold"></i>${top(p, '')}
    <div class="ca-pb-body">${place(p.place, -3)}<div class="ca-pb-count"><span class="ca-pb-num ink">${esc(num(p))}</span><span class="ca-pb-dtg ink">${unit(p)}</span></div>${h(p.title, 'ca-pb-h')}</div>${foot(p)}`),

  // a calendar page knocked askew, a ticket tucked against it, the place ringed by hand
  'ca-cd-tile': p => ca(p, `<i class="ca-tgrid"></i><span class="ca-tday d1">${esc(p.days?.[0] || 'Fri')}</span><span class="ca-tday d2">${esc(p.days?.[1] || 'Sun')}</span>
    ${top(p, '')}<div class="ca-tile box" style="--rot:-6deg"><span class="ca-tile-top fit-w">${esc(city(p))}</span><b>${pad2(num(p))}</b><span class="ca-tile-dtg">${unit(p, false)}</span></div>
    <div class="ca-tix box bleed" data-over=".ca-tile" style="--rot:14deg"><div class="ca-tix-main"><b class="fit-w">${esc(p.ticket || 'Book now')}</b><small>${esc(contact())}</small></div><div class="ca-tix-stub"><span>${esc(p.stub || 'Open')}</span></div></div>
    <p class="ca-twhere ink fit">${lines(p.where || `${city(p)}\n${p.sub || 'Coming soon'}`)}${LOOP}</p>${foot(p, { phone: false })}`),

  // the brand's name repeated behind, two blobs, the number on them, a sticker
  'ca-cd-extrude': p => ca(p, `<div class="ca-ex-bd a">${(esc(p.word || BRAND.name) + ' ').repeat(4)}</div><div class="ca-ex-bd b">${(esc(p.word || BRAND.name) + ' ').repeat(4)}</div>
    <i class="ca-blob b1"></i><i class="ca-blob b2"></i><i class="ca-pix"></i>${top(p, '')}
    <div class="ca-ex-num ink bleed" data-over="${OVER}">${esc(num(p))}</div>${stkHtml(unit(p, false), -8, 'ca-ex-stk alt')}
    <i class="ca-spark a"></i><i class="ca-spark b"></i>${foot(p)}`, trio(p)),

  // the giant number with a window of a face (or the product) breaking through it
  'ca-cd-window': p => need(p, 'ca-cd-window') || ca(p, `${top(p, '')}<div class="ca-mega ink bleed one win" data-over="${OVER}">${esc(num(p))}</div>
    <i class="ca-ht" style="top:540px;left:40px"></i><div class="ca-squig" style="top:170px;right:40px">${SQUIGGLES}</div>
    <div class="ca-win box">${photo(p, 'ca-fill')}</div>
    <div class="ca-days box win"><b>${unit(p)}</b>${p.line ? `<span class="fit">${esc(p.line)}</span>` : ''}</div>
    <span class="ca-vert ink l">${esc(p.side || `${BRAND.name} · countdown`)}</span><span class="ca-vert ink r">${esc(p.side2 || `${city(p)} · ${BRAND.campaign || 'launch'}`)}</span>${foot(p)}`),

  // light poster: the number in the brand's colour, a burst over the words, a picture, an asterisk
  'ca-cd-burst': p => ca(p, `${top(p, '')}<div class="ca-mega ink bleed burst" data-over="${OVER}">${esc(num(p))}</div><div class="ca-burst">${BURST}</div>
    <div class="ca-days box burst"><b>${unit(p)}</b>${p.line ? `<span class="fit">${esc(p.line)}</span>` : ''}</div>
    ${art(p.art || 'calendar', 'ca-bu-art')}<div class="ca-aster">${ASTER}</div>
    <span class="ca-vert ink r">${esc(p.side || `${BRAND.name} · ${city(p)} countdown`)}</span>${foot(p)}`),

  // a sticky note pinned to a calendar on a dark ground
  'ca-cd-note': p => {
    const n = +num(p);
    return ca(p, `<i class="ca-dots"></i><i class="ca-cal"></i><span class="ca-nt-n a">${n + 1}</span><span class="ca-nt-m ink">${esc(p.month || `${city(p)} launch`)}</span>
    <span class="ca-nt-n b">${n + 2}</span><span class="ca-nt-n c">${Math.max(0, n - 1)}</span><span class="ca-nt-n d">${n + 3}</span>${top(p, '')}
    <div class="ca-nt-back" style="--rot:4deg"></div><div class="ca-nt box" style="--rot:-3deg"><i class="ca-tack"></i><b>${pad2(n)}</b><span>${unit(p, false).toLowerCase()}</span></div>${foot(p)}`);
  },

  // stacked words, stripes, the number huge, torn paper at the foot with the call
  'ca-cd-save': p => {
    const two = num(p).length > 1 ? 'two' : '';
    return ca(p, `<i class="ca-stripes"></i>${top(p, '')}
    <div class="ca-sv-row"><div class="ca-sv-col"><h1 class="h fit ca-sv-stack">${(p.stack || ['Get', 'ready,', city(p)]).map(esc).join('<br>')}</h1>
      ${p.sub ? `<p class="ca-sv-sub ink fit">${lines(p.sub)}</p>` : ''}</div>
      <div class="ca-sv-num ink bleed ${two}" data-over=".ca-sv-dtg, .ca-sv-paper">${esc(num(p))}</div></div>
    <div class="ca-sv-dtg box">${unit(p)}</div>
    <div class="ca-sv-paper box bleed"><div class="ca-sv-l"><span class="ca-sv-lab ink">${esc(p.label || `${city(p)} launch`)}</span>${handle()}</div>${ctaF('', p)}</div>`);
  },

  // a duotone photo above a torn sheet, the number straddling the tear, the line on the paper
  'ca-cd-remix': p => need(p, 'ca-cd-remix') || ca(p, `<div class="ca-duo ca-rx-ph">${photo(p, 'ca-fill')}</div>${top(p, '')}
    ${place(p.place, 4, 'ca-rx-place')}<i class="ca-ht" style="top:430px;right:70px;--htc:var(--ca-pop)"></i>
    <div class="ca-squig" style="top:600px;right:250px;width:170px;height:170px">${SQUIGGLES}</div>
    <span class="ca-vert ink r ca-rx-vert">${esc(p.side || `${BRAND.name} · ${city(p)} countdown`)}</span>
    <div class="ca-inv ca-rx-paper"></div>
    <div class="ca-rx-num ink bleed ${num(p).length > 1 ? 'two' : 'one'}" data-over="${OVER}">${esc(num(p))}</div>
    ${stkHtml(unit(p, false), -8, `ca-rx-stk ${num(p).length > 1 ? 'two' : 'one'}`)}
    <div class="ca-inv ca-rx-low">${h(p.title, 'mid ca-rx-h')}${foot(p)}</div>`),

  /* ─────────── travel objects ─────────── */
  // a portrait boarding pass: a photo window, the destination set vertically, a tear line, two tiles, the details, a barcode
  'ca-pass': p => need(p, 'ca-pass') || ca(p, `${p.back ? photo({ photo: p.back, pos: p.backPos }, 'full ca-fill') : ''}
    <div class="ca-ps-back" style="--rot:5deg"><i class="ca-ps-band"></i></div>
    <div class="ca-ps box">
      <i class="ca-ps-band"></i><div class="ca-ps-win">${photo(p, 'ca-fill')}</div>
      <div class="ca-ps-logo">${logo({ theme: 'paper' })}</div>
      <div class="ca-ps-vt"><span class="ca-ps-small fit">${esc(p.small || `${BRAND.name} to`)}</span><b class="ca-ps-big fit">${esc(p.big || city(p))}</b></div>
      <i class="ca-ps-tear"></i>
      <div class="ca-ps-tiles">${(p.tiles || [['New', 'Branch'], [to(p), city(p)]]).map(([a, b]) => `<div class="ca-ps-tile"><b class="fit-w">${esc(a)}</b><span class="fit-w">${esc(b)}</span></div>`).join('')}</div>
      <ul class="ca-ps-info">
        <li class="lead fit-w">${esc(p.lead || 'Boarding soon')}</li>
        <li><i class="ca-ic">${PIN}</i>${esc(p.place || city(p))}</li>
        <li><i class="ca-ic">${contactIcon()}</i>${esc(contact())}</li>
        <li>${handle()}</li>
        ${p.sub ? `<li class="svc fit-w">${esc(p.sub)}</li>` : ''}
      </ul>
      <div class="ca-ps-bars">${bars(110)}</div>
    </div>`),

  // a landscape boarding pass knocked across the ground, a dotted flight path behind it
  'ca-pass-wide': p => ca(p, `<svg class="ca-pw-path" viewBox="0 0 1080 1350"><path d="M-40 1230 C 260 1150, 420 560, 1130 300" stroke="currentColor" stroke-width="7" stroke-dasharray="2 24" stroke-linecap="round" fill="none"/></svg>
    ${top(p, p.label)}${h(p.title, 'ca-pw-h')}
    <div class="ca-pw box" style="--rot:-8deg">
      <div class="ca-pw-main">
        <div class="ca-pw-top"><span>Boarding pass</span><span class="ca-pw-logo">${logo({ theme: 'paper' })}</span></div>
        <div class="ca-pw-route"><div><b>${esc(from(p))}</b><span>${esc(p.fromName || BRAND.name)}</span></div><i class="ca-pw-ic">${PLANE}</i><div class="r"><b>${esc(to(p))}</b><span>${esc(p.toName || city(p))}</span></div></div>
        <div class="ca-pw-grid">${(p.fields || [['Flight', `${from(p).slice(0, 2)} 001`], ['Gate', 'A'], ['Seat', '1A'], ['Boards', 'Soon']]).map(([a, b]) => `<div><small>${esc(a)}</small><span>${esc(b)}</span></div>`).join('')}</div>
      </div>
      <div class="ca-pw-stub"><small>${esc(city(p))}</small><b>${esc(to(p))}</b><div class="ca-pw-bars">${bars(30, 'y', [3, 6, 2, 8, 4])}</div><small>${esc(p.stubNote || 'Boards soon')}</small></div>
    </div>${foot(p)}`),

  // a passport page, stamped on arrival
  'ca-passport': p => {
    const st = p.stamps || [['Arrived', city(p), `${BRAND.name} · New`], ['Cleared', 'With care'], ['Valid for', 'Everyone']];
    const ring = (p.ring || `${city(p)} · ${BRAND.name} · ${city(p)} · ${BRAND.name} ·`).toUpperCase();
    return ca(p, `${top(p, p.label)}${h(p.title, 'ca-pp-h')}
    <div class="ca-pp box" style="--rot:2deg"><span class="ca-pp-head">Entries · ${esc(BRAND.name)}</span><span class="ca-pp-no">07</span>
      <div class="ca-stamp s1" style="--rot:-12deg"><small>${esc(st[0][0])}</small><b class="fit-w">${esc(st[0][1])}</b><small>${esc(st[0][2] || '')}</small></div>
      <div class="ca-stamp s2" style="--rot:10deg"><svg viewBox="0 0 200 200"><defs><path id="ca-ring" d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0"/></defs>
        <circle cx="100" cy="100" r="94" fill="none" stroke="currentColor" stroke-width="6"/><circle cx="100" cy="100" r="52" fill="none" stroke="currentColor" stroke-width="3"/>
        <text font-weight="900" font-size="20" letter-spacing="3" fill="currentColor" style="font-family:var(--font)" textLength="440"><textPath href="#ca-ring">${esc(ring)}</textPath></text>
        <g transform="translate(72 72) scale(.47)">${PLANE.replace(/<\/?svg[^>]*>/g, '')}</g></svg></div>
      <div class="ca-stamp s3" style="--rot:6deg"><b class="fit-w">${esc(st[1][0])}</b><small>${esc(st[1][1] || '')}</small></div>
      <div class="ca-stamp s4" style="--rot:-5deg"><small>${esc(st[2][0])}</small><b class="fit-w">${esc(st[2][1])}</b></div>
    </div>${ctaF('ca-pp-cta', p)}${foot(p, { phone: false })}`);
  },

  // a ticket and its torn-off stub: the photo, the route, class and seat; the stub keeps the number
  'ca-pass-stub': p => need(p, 'ca-pass-stub') || ca(p, `<i class="ca-stripes"></i>${top(p, p.label)}${h(p.title, 'ca-pst-h')}
    <div class="ca-pst-main box" style="--rot:-4deg">
      <div class="ca-pst-ph">${photo(p, 'ca-fill')}</div>
      <div class="ca-pst-route"><b>${esc(from(p))}</b><i>${PLANE}</i><b>${esc(to(p))}</b></div>
      <div class="ca-pst-grid">${(p.fields || [['Class', 'First'], ['Seat', '1A'], ['Service', 'Full']]).map(([a, b]) => `<div><small>${esc(a)}</small><span>${esc(b)}</span></div>`).join('')}</div>
    </div>
    <div class="ca-pst-stub box" style="--rot:7deg"><small>${esc(p.stub || 'Keep this')}</small><b class="ca-pst-num fit">${esc(contact())}</b><div class="ca-pst-bars">${bars(24, 'y', [3, 6, 2, 8, 4])}</div><b class="ca-pst-code">${esc(to(p))}</b></div>
    ${foot(p, { phone: false })}`),

  // a luggage tag on its string
  'ca-pass-tag': p => ca(p, `<i class="ca-canvas"></i>${top(p, p.label)}${h(p.title, 'ca-tg-h')}${stk(p.kicker, -5, 'ca-tg-stk')}
    <svg class="ca-tg-str" viewBox="0 0 1080 1350"><path d="M700 560 C 760 440, 900 470, 1100 300" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round"/></svg>
    <div class="ca-tag box" style="--rot:8deg">
      <i class="ca-tag-hole"></i>
      <div class="ca-tag-top"><small>Destination</small><b>${esc(to(p))}</b><small>${esc(city(p))} · Priority</small></div>
      <div class="ca-tag-band">${esc(p.band || 'Priority handling')}</div>
      <ul class="ca-tag-rows">${(p.rows || [['From', BRAND.name], ['To', `Every home in ${city(p)}`]]).map(([a, b]) => `<li><small>${esc(a)}</small><span class="fit-w">${esc(b)}</span></li>`).join('')}</ul>
      <div class="ca-tag-bars">${bars(48, 'x', [3, 6, 2, 8, 4])}</div>
    </div>${foot(p)}`),

  // a split-flap departures board: every service leaving for a part of the city
  'ca-pass-board': p => {
    const rows = p.rows || services(p).slice(0, 5).map((s, i) => [s.short || s.name, places(p)[i] || city(p), ['Boarding', 'On time', 'On time', 'Boarding', 'Final call'][i]]);
    const L1 = Math.max(...rows.map(r => r[0].length)), L2 = Math.max(...rows.map(r => r[1].length));
    const cell = Math.min(30, Math.floor(700 / (L1 + L2)));
    const flaps = t => [...t.toUpperCase()].map(c => `<i class="ca-fl">${c === ' ' ? '' : esc(c)}</i>`).join('');
    const pill = st => `<span class="ca-bd-st ${/board/i.test(st) ? 'b' : /final|last/i.test(st) ? 'f' : 'o'}">${esc(st)}</span>`;
    return ca(p, `${top(p, p.label)}${h(p.title, 'ca-bd-h')}
    <div class="ca-board box" style="--fw:${cell - 3}px;--c1:${L1 * cell}px;--c2:${L2 * cell}px">
      <div class="ca-bd-top"><b>${esc(p.boardTitle || 'Departures')}</b><span>${esc(to(p))} · ${esc(city(p))}</span></div>
      <div class="ca-bd-row lab"><span>${esc(p.cols?.[0] || 'Service')}</span><span>${esc(p.cols?.[1] || 'To')}</span><span>${esc(p.cols?.[2] || 'Status')}</span></div>
      ${rows.map(([a, b, c]) => `<div class="ca-bd-row"><span class="ca-flaps">${flaps(a)}</span><span class="ca-flaps">${flaps(b)}</span>${pill(c)}</div>`).join('')}
    </div>${ctaF('ca-bd-cta', p)}${foot(p, { phone: false })}`);
  },

  // a ticket: from and to, the details, a tear line, a stub with a barcode (and a stamp on arrival)
  'ca-ticket': p => ca(p, `${bubbles(6)}${top(p, p.label)}${h(p.title, 'ca-tk-h')}
    <div class="ca-tk box" style="--rot:-3deg">
      <div class="ca-tk-main">
        <div class="ca-tk-row"><div><small>From</small><b>${esc(from(p))}</b><span>${esc(p.fromName || BRAND.name)}</span></div><i class="ca-tk-plane">${PLANE}</i><div class="r"><small>To</small><b>${esc(to(p))}</b><span>${esc(p.toName || city(p))}</span></div></div>
        <div class="ca-tk-grid">${(p.fields || [['Passenger', 'You'], ['Gate', 'Open'], ['Class', 'First']]).map(([a, b]) => `<div><small>${esc(a)}</small><span>${esc(b)}</span></div>`).join('')}</div>
      </div>
      <div class="ca-tk-stub"><div class="ca-tk-bars">${bars(34, 'x', [3, 6, 2, 8, 4])}</div>${p.stamp ? `<span class="ca-tk-stamp">${esc(p.stamp)}</span>` : ''}</div>
    </div>${foot(p)}`),

  /* ─────────── services ─────────── */
  // an index of the services, each with its icon, lines between, the call at the foot
  'ca-service-list': p => ca(p, `${top(p, p.label)}${h(p.title, 'ca-sl-h')}
    <ul class="ca-sl" style="--n:${Math.min(5, services(p).length)}">${services(p).slice(0, 5).map(s => `<li><i class="ca-sl-ic">${icon(s.icon)}</i><b class="ink fit-w">${esc(s.name)}</b></li>`).join('')}</ul>
    ${ctaF('ca-sl-cta', p)}${foot(p, { phone: false })}`),

  // one service: a sticker, its picture on a disc in rays, its name, three ticks, the call
  'ca-service': p => {
    const s = services(p)[p.service ?? 0] || {};
    return ca(p, `${top(p, p.label)}${stk(p.kicker || `Now in ${city(p)}`, -6, 'ca-sv-stk')}
    <div class="ca-sv-art">${rays('c')}<span class="ca-sv-disc"></span>${p.art ? art(p.art, 'ca-sv-a') : `<div class="art ca-sv-a ic">${icon(s.icon)}</div>`}</div>
    ${h(p.title || (s.name || '').replace(/^(\S+)/, '[$1]'), 'ca-sv-h')}
    <ul class="ca-ticks">${(p.points || s.points || []).slice(0, 3).map(t => `<li class="ink"><i class="ca-ic">${CHECK}</i>${esc(t)}</li>`).join('')}</ul>
    ${ctaF('ca-sv-cta', p)}${foot(p, { phone: false })}`);
  },

  /* ─────────── places ─────────── */
  // a neighbourhood: a pin, its name huge, the line, the service it needs, a framed scene, the call along the foot
  'ca-area': p => {
    const s = p.service != null ? services(p)[p.service] : null;
    return ca(p, `${top(p, `${city(p)} · ${p.area}`)}<div class="ca-ar-pin">${BIGPIN}</div>
    <div class="ca-ar-name ink fit-w">${esc(p.area)}</div>${h(p.title, 'mid ca-ar-h')}
    ${s ? stk(s.name, -3, 'ca-ar-svc', s.icon) : ''}
    <div class="ca-ar-scene box">${p.art ? art(p.art, 'ca-fill') : `<div class="ca-fill">${STREET}</div>`}</div>${callFoot(p)}`);
  },

  // the first neighbourhood design: the name bigger, a picture strip of the area along the foot, unframed
  'ca-area-classic': p => {
    const s = p.service != null ? services(p)[p.service] : null;
    return ca(p, `${top(p, `${city(p)} · ${p.area}`)}<div class="ca-ar-pin big">${BIGPIN}</div>
    <div class="ca-ar-name ink big fit-w">${esc(p.area)}</div>${h(p.title, 'mid ca-ar-h big')}
    ${s ? stk(s.name, -3, 'ca-ar-svc big', s.icon) : ''}
    ${slot(p.art, 'skyline', 'ca-ar-strip')}${callFoot(p)}`);
  },

  // places as tilted pills, each with a pin (or lettered, to vote on)
  'ca-areas': p => {
    const list = places(p);
    return ca(p, `${bubbles(8)}${top(p, p.label)}${h(p.title, 'ca-as-h')}
    <ul class="ca-as ${p.vote ? 'vote' : ''} ${list.length <= 8 ? 'few' : ''}">${list.map((a, i) => `<li class="box" style="--rot:${p.vote ? 0 : [-3, 2, -1, 3, -2, 1][i % 6]}deg">${p.vote ? `<b>${'ABCDEFGHIJ'[i]}</b>` : `<i class="ca-ic">${PIN}</i>`}${esc(a)}</li>`).join('')}</ul>
    <p class="ca-note ink">${esc(p.note || (p.vote ? 'Comment your letter below' : '…and everywhere in between'))}</p>${foot(p)}`);
  },

  /* ─────────── help and engagement ─────────── */
  // a tip: a sticker, the line, the advice on a taped note with a picture, the call
  'ca-tip': p => ca(p, `${deco(p, p.seed || 1)}${top(p, p.label)}${stk(p.kicker || 'Tip', -5, 'ca-tp-stk')}${h(p.title, 'ca-tp-h')}
    <div class="ca-paper ca-tp-note box" style="--rot:-1.5deg"><i class="ca-tape"></i><p class="ca-tp-body fit">${words(p.body)}</p>${art(p.art || 'home', 'ca-tp-art')}</div>
    ${ctaF('ca-tp-cta', p)}`),

  // how it works: three rows on dashed lines, an icon each (never numbered)
  'ca-steps': p => ca(p, `${top(p, p.label)}${h(p.title, 'ca-stp-h')}
    <ul class="ca-stp">${(p.steps || []).map(([a, b, ic]) => `<li><i class="ca-stp-ic">${icon(ic || 'check')}</i><div><b class="ink">${esc(a)}</b>${b ? `<span class="ink">${esc(b)}</span>` : ''}</div></li>`).join('')}</ul>${foot(p)}`),

  // a checklist on a taped note; the last line is the brand
  'ca-checklist': p => ca(p, `${p.deco === false ? '' : rings()}${top(p, p.label)}${h(p.title, 'ca-ck-h')}
    <div class="ca-paper ca-ck-note box" style="--rot:1.2deg"><i class="ca-tape"></i><ul class="ca-ck">${(p.items || []).map((t, i, a) => `<li class="${i === a.length - 1 ? 'last' : ''}"><i class="ca-ic">${CHECK}</i>${esc(t)}</li>`).join('')}</ul></div>
    ${foot(p, { phone: false })}`),

  // this or that: two polaroids, lettered
  'ca-split': p => need(p, 'ca-split', p.a?.[1] && p.b?.[1]) || ca(p, `${top(p, p.label)}${h(p.title, 'ca-spl-h')}
    <div class="ca-spl">${[p.a, p.b].map(([label, ph, pos], i) => `<figure class="ca-pola box" style="--rot:${i ? 3 : -3}deg"><div class="ca-pola-ph">${photo({ photo: ph, pos }, 'ca-fill')}${stk('AB'[i], i ? 6 : -6, 'ca-pola-ab round')}</div><figcaption class="fit-w">${esc(label)}</figcaption></figure>`).join('')}</div>
    <p class="ca-note ink">${esc(p.note || 'Comment A or B below')}</p>${foot(p)}`),

  // rate it: the question huge, a scale of ten, the ends named
  'ca-poll': p => ca(p, `${bubbles(10)}${top(p, p.label)}${h(p.title, 'ca-pl-h')}
    <div class="ca-pl-scale">${Array.from({ length: 10 }, (_, i) => `<span class="box">${i + 1}</span>`).join('')}</div>
    <div class="ca-pl-ends"><span class="ink">${esc(p.ends?.[0] || 'Not yet')}</span><span class="ink">${esc(p.ends?.[1] || 'Perfect')}</span></div>${foot(p)}`),

  // a quiz: "Quiz time" huge, the question, three lettered answers
  'ca-quiz': p => ca(p, `${deco(p, 11)}${top(p, p.label)}<h1 class="h fit-w ca-qz-h">${words(p.word || 'Quiz [time]')}</h1>
    <p class="ca-qz-q ink fit">${words(p.title)}</p>
    <ul class="ca-qz">${(p.items || []).slice(0, 4).map((o, i) => `<li class="box" style="--rot:${[-1, .6, -.4, .8][i]}deg"><b>${'ABCD'[i]}</b><span class="fit-w">${esc(o)}</span></li>`).join('')}</ul>
    <p class="ca-note ink">${esc(p.note || 'Comment your answer below')}</p>${foot(p, { phone: false })}`),
};
