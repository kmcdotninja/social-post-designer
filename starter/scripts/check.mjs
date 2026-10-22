/* Collision check: nothing on a post may ride on anything else. Words are measured by their ink, pictures by their
   drawn shapes; any two closer than 12px, or anything outside the safe area, is reported.
     npm run check
   Any layout family takes part by class: .ink on words (measured by their ink), .box on blocks and pictures (by their
   drawn shapes), .bleed on things meant to run off the post. A deliberate overlap: data-over=".selector" on the
   element names what it may sit on. */
import { start } from './serve.mjs';
const { browser, url, stop } = await start();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
await page.goto(url + '?only=all');
await page.waitForSelector('body[data-ready]', { timeout: 120000 });

const { BRAND } = await import('../brand.json', { with: { type: 'json' } }).then(m => ({ BRAND: m.default }));
const fontOk = await page.evaluate(f => document.fonts.check(`${f.heavy ?? 900} 80px "${f.family}"`), BRAND.font);
if (!fontOk) console.log(`Warning: the brand font "${BRAND.font.family}" did not load; posts were measured in a fallback font.\n`);

const problems = await page.evaluate(() => {
  const TEXT = '.ink, .h, .sub, .mega, .cd-n, .cd-l, .qt, .qt-by, .qz-h, .qz-q, .sw-word, .note, .cta small, .cta b, .tp-body, .handle, .foot-ph, .place, .wm-text';
  const BLOCK = '.box, .wm, .chip, .art:not(.cn-art), .fr-photo, .paper, .ls li, .qz li, .sk span, .pl li, .tk, .sw-cols';
  const BLEED = '.bleed, .cn-art, .sp-side, .photo.full, .shade, .sw-word, [data-bleed]';
  const GAP = 12, SAFE = 40;
  const name = el => (el.className.baseVal ?? el.className).split(' ').filter(Boolean).slice(0, 2).join('.') || el.tagName;
  const union = rs => rs.reduce((a, r) => !a ? { left: r.left, top: r.top, right: r.right, bottom: r.bottom } : { left: Math.min(a.left, r.left), top: Math.min(a.top, r.top), right: Math.max(a.right, r.right), bottom: Math.max(a.bottom, r.bottom) }, null);
  const out = [], ctx = document.createElement('canvas').getContext('2d');
  for (const post of document.querySelectorAll('.post')) {
    const o = post.getBoundingClientRect(), items = [];
    const rel = r => ({ left: r.left - o.left, top: r.top - o.top, right: r.right - o.left, bottom: r.bottom - o.top });
    for (const el of post.querySelectorAll(TEXT)) {
      const cs = getComputedStyle(el), fs = parseFloat(cs.fontSize), rg = document.createRange(); rg.selectNodeContents(el);
      ctx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      const m = ctx.measureText(el.textContent.trim() || 'H');
      const rs = [...rg.getClientRects()].filter(r => r.width > 1).map(r => ({ left: r.left, right: Math.min(r.right, el.getBoundingClientRect().right),
        top: r.top + m.fontBoundingBoxAscent - m.actualBoundingBoxAscent, bottom: r.top + m.fontBoundingBoxAscent + m.actualBoundingBoxDescent }));
      if (rs.length) items.push({ el, r: rel(union(rs)) });
    }
    for (const el of post.querySelectorAll(BLOCK)) {
      const svg = el.querySelector(':scope > svg');
      const r = svg ? union([...svg.querySelectorAll('*')].filter(c => c.getBBox).map(c => c.getBoundingClientRect()).filter(b => b.width && b.height)) : el.getBoundingClientRect();
      if (r) items.push({ el, r: rel(r) });
    }
    const id = post.dataset.id;
    // air: the tallest band across the post with nothing in it (between the top bar and the foot)
    if (!post.querySelector('.photo.full, .bleed, .sp-side')) {
      const fill = [...items, ...[...post.querySelectorAll(BLEED)].map(el => ({ r: rel(el.getBoundingClientRect()) }))];   // pictures that run off the edge fill space too
      const ys = fill.map(i => [Math.max(i.r.top, 140), Math.min(i.r.bottom, 1240)]).filter(([a, b]) => b > a).sort((a, b) => a[0] - b[0]);
      let y = 140, gap = 0;
      for (const [a, b] of ys) { gap = Math.max(gap, a - y); y = Math.max(y, b); }
      gap = Math.max(gap, 1240 - y);
      if (gap > 300) window.__air = [...(window.__air || []), `${id}: ${Math.round(gap)}px of empty band`];
    }
    for (const { el, r } of items) if (!el.closest(BLEED) && (r.left < SAFE || r.top < SAFE || r.right > 1080 - SAFE || r.bottom > 1350 - SAFE))
      out.push(`${id}: ${name(el)} outside the safe area (${[r.left, r.top, r.right, r.bottom].map(Math.round)})`);
    for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
      const a = items[i], b = items[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      const over = (x, y) => { const d = x.el.closest('[data-over]'); return d && y.el.matches(d.dataset.over); };
      if (over(a, b) || over(b, a)) continue;
      const ox = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left), oy = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (ox > -GAP && oy > -GAP) out.push(`${id}: ${name(a.el)} × ${name(b.el)} (${Math.round(Math.min(ox, oy))}px)`);
    }
  }
  return { out, air: window.__air || [] };
});
const { out: list, air } = problems;
if (air.length) console.log(`Unfinished-looking (an empty band over 300px; give the idea more size or add the picture):\n${air.join('\n')}\n`);
console.log(list.length ? list.join('\n') : 'No collisions.');
console.log(`\n${list.length} problem${list.length === 1 ? '' : 's'}`);
await stop();
process.exit(list.length ? 1 : 0);
