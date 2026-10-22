/* The poster family: a playful poster system for any brand, flat and bold.
   Sized in cqw on the 4:5 post (1cqw = 10.8px): one big heavy line at the top-left margin, a picture
   or a glyph so big it runs off an edge, the key word on a block of the opposite colour, the name at the foot.

   Slots any post may use:
     art:    a picture, one of art.js's (phone, app, card, calendar, pin, home) or the brand's own 'assets/illos/x.svg'.
             Give the brand's mascot or character here and it peeks in, rises, fills the bottom.
     glyph:  a big character or two (a letter, a number, a symbol) set in the brand's font.
     kicker: a small line over the headline (the topic). label: the same as a pill (releases, launches).
     sticker: a little sticker on the post ('New!', 'v2.0', 'Free'): scallop, circle, tag, pill or blob, never pointy.
     alt:    a second line in another script, set in brand.json font.alt if there is one; dir: 'rtl' for Arabic, Hebrew…
   Colours: only the colourway's own pairs (bg/fg, chip/chipfg, card/cardfg) and the brand's swatches with their
   measured text colour (--c-x / --c-x-fg). A panel of "the opposite colour" is a nested colourway (.t-x), so a picture
   in it takes that colourway's colours and never sits on a ground of its own colour. */
import { BRAND, THEMES, esc, art, photo, h, sub, handle, logo, theme } from '../core.js';
import { contrast } from '../brand.js';

const C = { paper: '#FFFFFF', ...BRAND.colors };

// the second script's font, if the brand has one (brand.json font.alt: { family, google })
const ALT = BRAND.font?.alt;
if (ALT?.family && typeof document !== 'undefined' && !document.getElementById('po-alt-font')) {
  if (ALT.google) document.head.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=${ALT.google.replace(/ /g, '+')}&display=block">`);
  document.head.insertAdjacentHTML('beforeend', `<style id="po-alt-font">.post{--font-alt:"${ALT.family}",var(--font)}</style>`);
}

/* ── colour: what may sit on what ── */
const bgOf = p => theme(p).bg;
const dark = p => theme(p).dark;
// another colourway for a panel, cloud or shape: the first of prefs whose ground stands apart from the post's
const ground = (p, prefs, min = 1.4) => prefs.find(n => THEMES[n] && THEMES[n].bg !== bgOf(p) && contrast(THEMES[n].bg, bgOf(p)) >= min)
  || Object.keys(THEMES).filter(n => THEMES[n].bg !== bgOf(p)).sort((a, b) => contrast(THEMES[b].bg, bgOf(p)) - contrast(THEMES[a].bg, bgOf(p)))[0];
// the opposite colour: light panel on a dark post, dark panel on a light post
const opp = p => ground(p, dark(p) ? ['tint', 'paper', 'accent'] : ['ink', 'primary'], 2.5);
// a light ground for clouds and frames
const soft = p => ground(p, dark(p) ? ['accent', 'tint', 'paper'] : ['paper', 'tint', 'accent', 'primary', 'ink'], 1.3);
// the brand's swatches that show on this post, the brightest first
const swatches = (p, min = 1.5) => {
  const s = ['accent', 'accent2', 'paper', 'tint', 'primary', 'ink'].filter(n => C[n] && contrast(C[n], bgOf(p)) >= min);
  return s.length ? s : ['paper', 'ink'].filter(n => C[n] !== bgOf(p));
};
const sw = n => `--sw:var(--c-${n});--swfg:var(--c-${n}-fg)`;
// a pill that reads as "the opposite": the mark on a dark post, the words' colour on a light one
const inv = p => dark(p) ? 'po-chip' : 'po-inv';

/* ── shapes: a scalloped circle of n bumps (cloud, frame, round sticker), never pointy ── */
const scallop = (n, r, bump) => {
  let d = '';
  for (let i = 0; i < n; i++) {
    const a0 = i / n * 2 * Math.PI, a1 = (i + 1) / n * 2 * Math.PI, am = (a0 + a1) / 2, R = r + bump;
    const pt = a => [50 + r * Math.cos(a), 50 + r * Math.sin(a)], c = [50 + R * 1.18 * Math.cos(am), 50 + R * 1.18 * Math.sin(am)], [x0, y0] = pt(a0), [x1, y1] = pt(a1);
    d += (i ? '' : `M${x0.toFixed(2)} ${y0.toFixed(2)}`) + `Q${c[0].toFixed(2)} ${c[1].toFixed(2)} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
  }
  return d + 'Z';
};
const CLOUD = scallop(12, 40, 6), BADGE = scallop(16, 42, 4), FRAME = scallop(18, 38, 5), SCAL = scallop(14, 40, 6);
const blob = (path, fill) => `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="${path}" fill="${fill}"/></svg>`;

/* ── the pieces ── */
// a picture, anchored to the edge it runs off (preserveAspectRatio), so it peeks in rather than floating
const pic = (a, cls = '', al = 'xMidYMax') => art(a, cls).replace(/<svg(?![^>]*preserveAspectRatio)/, `<svg preserveAspectRatio="${al} meet"`);
// the headline: as big as its longest word allows, then fitted to its box
const longest = s => Math.max(...String(s || '').replace(/[[\]]/g, '').split(/\s+/).map(w => w.length), 1);
const hd = (s, cls, base, k = .6) => h(s, `po-h ${cls}`, `style="--fs:${Math.min(base, 84 / (k * longest(s))).toFixed(2)}cqw"`);
const sb = (p, cls = '') => sub(p.sub, `po-sub ${cls}`);
// the small line over the headline: a pill (label), a plain line (kicker), or the brand's name when nothing else says it
const kick = (p, brand = false) => p.label ? `<span class="po-label box ${inv(p)}">${esc(p.label)}</span>`
  : p.kicker ? `<small class="po-kick ink">${esc(p.kicker)}</small>` : brand ? `<span class="po-kick po-kick-logo">${logo(p)}</span>` : '';
// the foot: the name, and where to find the brand in a pill (only where there's room for it)
const foot = (p, { pill = false, cls = '' } = {}) => `<footer class="po-foot ${cls}">${logo(p)}${pill ? `<span class="po-handle box ${inv(p)}">${handle()}</span>` : ''}</footer>`;
const glyph = (g, cls = '', max = 84) => `<b class="po-glyph ink ${cls}" style="--gs:${Math.min(max, 110 / Math.max(1, [...String(g)].length))}cqw">${esc(g)}</b>`;
// the second script's line
const alt = (p, cls = '') => p.alt ? `<span class="po-alt ink ${cls}" dir="${p.dir || 'auto'}">${esc(p.alt)}</span>` : '';

// a sticker: [text, shape] or text; colour from the swatches that show on the post
const SHAPES = ['scallop', 'circle', 'tag', 'pill', 'blob'], TILTS = [-8, 6, -4, 9, -6];
const hash = s => [...String(s)].reduce((a, c) => a + c.charCodeAt(0), 0);
const sticker = (p, s, k = 0, style = '', colour) => {
  const [t, shape0] = Array.isArray(s) ? s : [s], i = hash(t) + k, shape = shape0 || SHAPES[i % 5];
  const sws = swatches(p, 1.6), c = colour || sws[k % sws.length];
  return `<span class="po-st po-st-${shape} box" data-over=".art, .po-glyph, .photo, .po-ph-frame" style="${sw(c)};--tilt:${TILTS[i % 5]}deg;--stl:${Math.max(4, ...String(t).split(/\s+/).map(w => [...w].length))};${style}">${shape === 'scallop' ? blob(SCAL, 'var(--sw)') : ''}<b>${esc(t)}</b></span>`;
};
// the sticker on a post, where the layout leaves room for it
const stick = (p, at = '') => p.sticker ? `<div class="po-stick ${at}">${sticker(p, p.sticker, 0)}</div>` : '';

const col = (p, cls, inner) => `<div class="po po-col ${cls} ${dark(p) ? 'po-d' : ''}">${inner}</div>`;

/* ── the poster set ── */
const L = {
  // the picture rising from the bottom, in the middle
  'po-rise': p => col(p, '', `${kick(p, true)}${hd(p.title, 'po-h-top', 13.5)}${sb(p)}${pic(p.art, 'po-art po-a-rise bleed')}`) + stick(p),

  // the picture peeking in from the bottom-right corner
  'po-peek-right': p => col(p, '', `${kick(p, true)}${hd(p.title, 'po-h-top', 13.5)}${sb(p)}${pic(p.art, 'po-art po-a-right bleed', 'xMinYMin')}`) + stick(p),

  // the picture peeking in from the bottom-left corner
  'po-peek-left': p => col(p, '', `${kick(p, true)}${hd(p.title, 'po-h-top', 13.5)}${sb(p)}${pic(p.art, 'po-art po-a-left bleed', 'xMaxYMin')}`) + stick(p),

  // the line centred, the picture huge, filling the bottom
  'po-big': p => col(p, 'po-c', `${hd(p.title, 'po-h-top', 13.5)}${sb(p)}${pic(p.art, 'po-art po-a-big bleed', 'xMidYMin')}`) + stick(p),

  // a glyph (a letter, a number) running off the right edge, under the line
  'po-glyph': p => col(p, '', `${kick(p)}${hd(p.title, 'po-h-g', 13.5)}${sb(p, 'po-sub-g')}${foot(p)}`) + glyph(p.glyph, 'po-g-right fit-w bleed') + stick(p, 'po-stick-bl'),

  // the words so big they are the picture
  'po-mega': p => col(p, '', `${kick(p)}${hd(p.title, plainLen(p.title) > 22 ? 'po-mega2' : 'po-mega', plainLen(p.title) > 22 ? 17 : 27)}${foot(p, { pill: true })}`) + stick(p, 'po-stick-mega'),

  // the picture big in the bottom-right corner, running off both edges
  'po-corner-pic': p => col(p, '', `${kick(p)}${hd(p.title, 'po-h-top', 13.5)}${sb(p)}${pic(p.art, 'po-art po-a-corner bleed', 'xMinYMin')}`) + stick(p, 'po-stick-bl'),

  // the picture in the middle, in the room between the line and the foot
  'po-centre-pic': p => col(p, '', `${kick(p)}${hd(p.title, 'po-h-top', 13.5)}${sb(p)}<div class="po-mid">${pic(p.art, 'po-art po-a-mid', 'xMidYMid')}</div>${foot(p, { pill: true })}`) + stick(p),

  // a saying, centred, under a big quotation mark
  'po-quote': p => col(p, 'po-c', `<span class="po-qm ink">“</span>${hd(p.title, 'po-quote', 12)}${sb(p, 'po-sub-c')}${foot(p, { pill: true })}`),

  // a line inside a scalloped cloud
  'po-cloud': p => col(p, 'po-c', `<div class="po-cloud t-${soft(p)} box">${blob(CLOUD, 'var(--bg)')}<div>${kick(p)}${hd(p.title, 'po-cloud-h', 10)}${sb(p, 'po-sub-c')}</div></div>${foot(p, { pill: true })}`),

  // words in pills, stacked and a little off-kilter, each its own colour
  'po-pills': p => { const s = swatches(p);
    return col(p, 'po-c', `${kick(p)}${hd(p.title, 'po-h-pills', 13.5)}<div class="po-stack fit">${(p.items || []).map((w, k) => `<span class="box" style="${sw(s[k % s.length])};--k:${k - ((p.items.length - 1) / 2)}">${esc(w)}</span>`).join('')}</div>${foot(p)}`) + stick(p, 'po-stick-pills'); },

  // three glyphs in a row, the line under them
  'po-numbers': p => col(p, '', `${kick(p)}<div class="po-nums" dir="${p.dir || 'ltr'}">${(p.glyphs || ['1', '2', '3']).slice(0, 3).map(g => glyph(g, 'po-num', 40)).join('')}</div>${hd(p.title, 'po-h-nums', 11)}${foot(p, { pill: true })}`),

  // a big round dot to press, ringed, and the picture rising
  'po-ready': p => col(p, '', `${kick(p, true)}${hd(p.title, 'po-h-ready', 13.5)}<i class="po-dot box"></i>${pic(p.art, 'po-art po-a-rise bleed')}`),

  // a balloon holding a glyph, the picture peeking in
  'po-balloon': p => { const s = swatches(p, 1.6);
    return col(p, '', `${kick(p, true)}${hd(p.title, 'po-h-bal', 13.5)}${pic(p.art, 'po-art po-a-right bleed', 'xMinYMin')}`)
      + `<div class="po-bal box" style="${sw(s[0])}"><b>${esc(p.glyph || '')}</b><i></i></div>`; },

  // a glyph on a tile of the opposite colour at the foot, the picture peeking in
  'po-tile': p => col(p, '', `${kick(p, true)}${hd(p.title, 'po-h-top', 12.5)}${sb(p)}`)
    + `<div class="po-tile t-${opp(p)} box">${glyph(p.glyph, 'po-tile-g', 24)}</div>${pic(p.art, 'po-art po-a-tile bleed', 'xMinYMin')}`,

  // huge words, and a row of glyphs, the first ones solid
  'po-row': p => col(p, '', `${kick(p)}${hd(p.title, 'po-mega', 27)}<div class="po-row" dir="${p.dir || 'ltr'}">${(p.glyphs || []).slice(0, 5).map((g, i) => `<b class="po-row-g ink ${i < (p.solid ?? 2) ? '' : 'po-faint'}">${esc(g)}</b>`).join('')}</div>${foot(p)}`),

  /* ── releases ── */
  // a tag (new, or coming soon), the version, what it is, the line, a picture of it, a round sticker
  'po-release': p => col(p, 'po-rel', `<div class="po-rel-top"><span class="po-tag box ${p.status === 'soon' ? 'po-soon' : inv(p)}">${esc(p.tag || (p.status === 'soon' ? 'Coming soon' : `New in ${BRAND.name}`))}</span>${p.version ? `<small class="po-ver ink">${esc(p.version)}</small>` : ''}</div>
    ${kick(p)}${hd(p.title, 'po-h-rel', 10.5)}${sb(p)}<div class="po-vis">${p.glyphs ? `<div class="po-vis-g" dir="${p.dir || 'ltr'}">${p.glyphs.slice(0, 3).map(g => glyph(g, 'po-vg', 30)).join('')}</div>` : pic(p.art, 'po-art po-a-vis', 'xMidYMid')}
    ${p.badge ? `<span class="po-badge box" data-over=".art">${blob(BADGE, 'var(--sw)')}<b>${esc(p.badge)}</b></span>` : ''}</div>${foot(p)}`).replace('class="po-badge', `style="${sw(swatches(p, 1.6)[0])}" class="po-badge`),

  /* ── whole posts in any script: dir: 'rtl' sets them right to left ── */
  // huge words above and below, the picture in a soft scalloped frame between
  'po-word-frame': p => script(p, 'po-wf po-c', `<b class="po-huge fit-w ink">${esc(p.top)}</b><div class="po-frame t-${opp(p)} box">${blob(FRAME, 'var(--bg)')}${pic(p.art, 'po-art po-a-frame', 'xMidYMid')}</div><b class="po-huge fit-w ink">${esc(p.bottom)}</b>${sb(p, 'po-sub-c')}`),

  // words on one half, a real photo filling the other half. Photo only: a split with a block of colour and a small
  // picture is never made; without a photo the post falls back to po-flat (the picture big, the line at the foot)
  'po-half': p => p.photo
    ? script(p, 'po-half', `<div class="po-half-t"><span class="po-kick po-kick-logo">${logo(p)}</span>${hd(p.title, 'po-h-half', 10.5, .62)}${sb(p, 'po-sub-half')}</div>${photo(p, 'po-half-photo bleed')}`)
    : L['po-flat'](p),

  // the name on top, a big picture, the line at the foot
  'po-flat': p => script(p, '', `<div class="po-flat-top">${logo(p)}<span class="po-site ink">${esc(BRAND.website || BRAND.handle)}</span></div><div class="po-mid">${pic(p.art, 'po-art po-a-flat', 'xMidYMid')}</div>${hd(p.title, 'po-h-flat', 12)}${sb(p, 'po-sub-wide')}`),

  // a word repeated into a texture, the picture over it
  'po-pattern': p => script(p, '', `<div class="po-pattern" aria-hidden="true">${Array.from({ length: 7 }, () => `<span>${Array(4).fill(esc(p.word)).join(' ')}</span>`).join('')}</div><div class="po-patk">${pic(p.art, 'po-art po-a-pat', 'xMidYMid')}</div>${foot(p)}`),

  // one huge number, the line under it
  'po-number': p => script(p, '', `<b class="po-bignum fit-w ink" style="--ns:${Math.min(64, 150 / [...String(p.number)].length)}cqw">${esc(p.number)}</b>${hd(p.title, 'po-h-num', 11)}${sb(p, 'po-sub-wide')}${foot(p)}`),

  // one picture repeated, scattered round the edges, the line in the middle
  'po-scatter': p => script(p, 'po-c', `<div class="po-objs">${[[4, 5, -14, 30], [62, 4, 10, 32], [68, 74, -6, 28], [2, 76, 16, 30]].map(([x, y, r, w]) => `<span style="left:${x}%;top:${y}%;width:${w}cqw;transform:rotate(${r}deg)">${pic(p.art, 'po-obj bleed', 'xMidYMid')}</span>`).join('')}</div>
    <div class="po-objt">${hd(p.title, 'po-h-obj', 12)}${sb(p, 'po-sub-c')}</div>`),

  // a big line, almost nothing else
  'po-big-line': p => script(p, '', `${hd(p.title, 'po-h-bigline', 18)}${sb(p, 'po-sub-wide')}${foot(p)}`),

  /* ── the Swiss set: one word as big as the post allows, edge to edge; details small on a two-column grid ── */
  // the name huge on top, the word and details in two columns, the word big at the foot
  'po-swiss-mast': p => swiss(p, 'po-sw-mast', `${bigw(BRAND.name, 34)}<div class="po-sw-cols"><div><b class="po-sw-mid ink">${esc(p.word)}</b>${alt(p, 'po-alt-mid')}</div><ul>${(p.items || []).map(d => `<li class="ink">${esc(d)}</li>`).join('')}</ul></div>${bigw(p.word, 30, 'po-end')}`),

  // a word building, letter by letter
  'po-swiss-grow': p => { const w = p.word || BRAND.name, n = [...w].length;
    return swiss(p, '', `<div class="po-grow fit ink" style="--fs:${Math.min(34, 92 / (.62 * n), 96 / (n * .9)).toFixed(2)}cqw">${[...w].map((_, i) => `<b>${esc([...w].slice(0, i + 1).join(''))}</b>`).join('')}</div>
      <div class="po-sw-row"><span class="po-roundel box ${inv(p)}">${p.alt ? `<span class="po-alt" dir="${p.dir || 'auto'}">${esc(p.alt)}</span>` : `<b>${esc(BRAND.name)}</b>`}</span></div>`); },

  // a word turned on its side down the post; a picture tile, the details and the second script beside it
  'po-swiss-side': p => swiss(p, '', `<b class="po-side ink bleed" style="--fs:${Math.min(46, 100 / (.6 * [...p.word].length)).toFixed(2)}cqw">${esc(p.word)}</b>
    <div class="po-sideinfo">${p.glyph || p.art ? `<span class="po-sidepic t-${opp(p)} box">${p.glyph ? glyph(p.glyph, 'po-sideg', 26) : pic(p.art, 'po-art po-a-side', 'xMidYMid')}</span>` : ''}<ul>${(p.items || []).map(d => `<li class="ink">${esc(d)}</li>`).join('')}</ul>${alt(p, 'po-alt-big')}</div>`),

  // a big word, a framed picture, a three-part foot
  'po-swiss-frame': p => swiss(p, '', `${bigw(p.word, 27)}<div class="po-sw-pic t-${opp(p)} box">${pic(p.art, 'po-art po-a-swpic', 'xMidYMid')}</div>${swfoot(p, (p.items || []).join(', '))}`),

  // a word above and the name below, a picture between
  'po-swiss-sandwich': p => swiss(p, '', `${bigw(p.word, 30)}<div class="po-sw-pic po-bare">${pic(p.art, 'po-art po-a-swpic', 'xMidYMid')}${p.alt ? `<span class="po-alt po-alt-tag box ${inv(p)}" data-over=".art" dir="${p.dir || 'auto'}">${esc(p.alt)}</span>` : ''}</div>${bigw(BRAND.name, 30, 'po-end')}<p class="po-note ink">${esc((p.items || [])[0] || '')}</p>`),

  // flat blocks of colour and a small line
  'po-swiss-blocks': p => { const s = swatches(p, 1.6);
    return swiss(p, '', `${h(p.title, 'po-sw-head')}<p class="po-note po-note-top ink">${esc((p.items || [])[0] || '')}</p><div class="po-blocks"><i class="po-blk-a box" style="${sw(s[0])}"></i><i class="po-blk-b box"></i>${alt(p, 'po-alt-blk')}</div>${swfoot(p, '')}`); },

  // one word so big it runs off both edges
  'po-swiss-bleed': p => swiss(p, p.alt ? '' : 'po-solo', `<b class="po-bleedw ink bleed" style="--fs:${Math.min(60, 92 / (.5 * [...p.word].length)).toFixed(2)}cqw">${esc(p.word)}</b>${alt(p, 'po-alt-bleed')}${swfoot(p, '')}`),

  // a word repeated, line after line, as a texture; the second script in a pill over it
  'po-swiss-lines': p => swiss(p, '', `<div class="po-lines bleed" aria-hidden="true">${Array.from({ length: 11 }, () => `<b style="--fs:${Math.min(15, 92 / (.62 * [...p.word].length * 2 + 1)).toFixed(2)}cqw">${esc(p.word)} ${esc(p.word)}</b>`).join('')}</div>${p.alt ? `<span class="po-alt po-alt-over box po-inv" dir="${p.dir || 'auto'}">${esc(p.alt)}</span>` : ''}`),

  /* ── stickers and bands ── */
  // a big word, little stickers scattered round it, each a little tilted
  'po-stickers': p => `<div class="po po-stp ${dark(p) ? 'po-d' : ''}"><b class="po-stp-word ink fit-w">${esc(p.word)}</b>${(p.stickers || []).slice(0, 5).map((s, k) => `<div class="po-spot po-spot-${k}">${sticker(p, s, k)}</div>`).join('')}</div>`,

  // rows of big rounded shapes running off both edges, some holding a word, some a picture
  'po-bands': p => { const g = Object.keys(THEMES).filter(n => THEMES[n].bg !== bgOf(p) && contrast(THEMES[n].bg, bgOf(p)) >= 1.3), s = swatches(p, 1.3), rows = p.rows || [];
    let k = 0;
    return `<div class="po po-bands ${dark(p) ? 'po-d' : ''}" style="--bh:${rows.length > 2 ? 25 : 30}cqw">${rows.map((r, ri) => `<div class="po-band-row ${ri % 2 ? 'po-off' : ''}">${r.map(([shape, c]) => {
      const i = k++, isArt = c && c.startsWith('art:');
      // a picture takes a whole colourway (so its colours work on it); a word or an empty shape takes a swatch
      return isArt ? `<span class="po-bs po-bs-${shape} t-${g[i % g.length]} box bleed">${pic(c.slice(4), 'po-art po-a-band', 'xMidYMax')}</span>`
        : `<span class="po-bs po-bs-${shape} po-sw-bg box bleed" style="${sw(s[i % s.length])}">${c ? `<b class="ink ${[...c].length > 9 ? 'po-long' : ''}">${esc(c)}</b>` : ''}</span>`; }).join('')}</div>`).join('')}${foot(p, { pill: true, cls: 'po-band-foot' })}</div>`; },

  /* ── photos ── */
  // the photo fills the post, a flat shade, the line big over it
  'po-photo-full': p => `${photo(p, 'full')}<i class="shade po-shade"></i>${col(p, 'po-onphoto', `${hd(p.title, 'po-h-photo', 12)}${sb(p)}${alt(p, 'po-alt-photo')}${foot(p)}`)}` + stick(p, 'po-stick-photo'),

  // the post's colour, the photo in a soft frame, the second script in a pill on it
  'po-photo-framed': p => col(p, '', `${hd(p.title, 'po-h-photo', 12)}${sb(p)}<div class="po-ph-frame box">${photo(p, 'po-ph')}${p.alt ? `<span class="po-alt po-alt-tag2 po-inv" dir="${p.dir || 'auto'}">${esc(p.alt)}</span>` : ''}</div>${foot(p)}`) + stick(p, 'po-stick-frame'),

  // the photo in a big circle
  'po-photo-round': p => col(p, '', `${hd(p.title, 'po-h-photo', 12)}${sb(p)}<div class="po-ph-round">${photo(p, 'po-ph box')}</div>${alt(p, 'po-alt-round')}${foot(p)}`) + stick(p),

  // the photo across the top, the line under it, the picture peeking in at the corner
  'po-photo-peek': p => `${photo(p, 'po-ph-top bleed')}` + col(p, 'po-phk', `${hd(p.title, 'po-h-photo po-h-phk', 12)}${sb(p)}${pic(p.art, 'po-art po-a-phk bleed', 'xMinYMin')}`) + stick(p, 'po-stick-phk'),
};

function plainLen(s){ return String(s || '').replace(/[[\]]/g, '').length; }
// a word as wide as the post allows, on one line
function bigw(w, max, cls = ''){ return `<b class="po-sw-word fit-w ink bleed ${cls}" style="--fs:${Math.min(max, 92 / (.62 * Math.max(1, [...String(w)].length))).toFixed(2)}cqw">${esc(w)}</b>`; }
function swfoot(p, note){ return `<footer class="po-sw-foot">${logo(p)}<span class="ink">${esc(note)}</span></footer>`; }
function swiss(p, cls, inner){ return `<div class="po po-sw ${cls} ${dark(p) ? 'po-d' : ''}">${inner}</div>`; }
function script(p, cls, inner){ return `<div class="po po-col po-script ${cls} ${dark(p) ? 'po-d' : ''}" dir="${p.dir || 'ltr'}"${p.lang ? ` lang="${esc(p.lang)}"` : ''}>${inner}</div>`; }

export default L;
