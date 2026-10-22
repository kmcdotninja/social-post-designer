/* The layouts: every family in src/layouts/ (each file's default export is { name: post => html }, its CSS beside it
   in a .css of the same name) is picked up here. render(post) returns the post at 1080 × 1350 in its colourway. */
import { BRAND, THEMES, theme } from './core.js';
export { plain, words } from './core.js';

const FAMILIES = import.meta.glob('./layouts/*.js', { eager: true, import: 'default' });
import.meta.glob('./layouts/*.css', { eager: true });
export const LAYOUTS = Object.assign({}, ...Object.values(FAMILIES));

export function render(p){
  const L = LAYOUTS[p.layout];
  if (!L) throw new Error(`No layout called "${p.layout}" (post ${p.id}). Layouts: ${Object.keys(LAYOUTS).join(', ')}`);
  const mark = BRAND.style?.mark || 'stroke';
  return `<article class="post t-${theme(p).name} l-${p.layout} m-${mark}" data-id="${p.id}"${p.example ? ' data-example' : ''}>${L(p)}</article>`;
}

/* ── after layout: shrink every .fit / .fit-w into its box, then draw the strokes ── */
export function fit(root){
  for (const el of root.querySelectorAll('.fit, .fit-w')) {
    el.style.fontSize = '';
    const cs = getComputedStyle(el), room = parseFloat(cs.maxHeight) || el.clientHeight;
    let size = parseFloat(cs.fontSize), n = 0;
    const k = el.getBoundingClientRect().width / el.offsetWidth || 1;   // the preview's scale
    // measured unclipped: tight leading lets glyphs poke out of the line box
    const over = () => {
      el.style.maxHeight = 'none'; el.style.height = 'auto';
      const rg = document.createRange(); rg.selectNodeContents(el);
      const tall = el.offsetHeight > room + 1, wide = rg.getBoundingClientRect().width / k > el.clientWidth + 1;   // the words' own width, unscaled
      el.style.maxHeight = el.style.height = '';
      return (el.classList.contains('fit') && tall) || wide;
    };
    while (over() && size > 18 && n++ < 90) { size *= .96; el.style.fontSize = size + 'px'; }
  }
  strokes(root);
}

/* the stroke under each line of a key word, sitting on the font's baseline */
const STROKE = BRAND.style?.strokePath || 'M0.7 0.22 H75 L22 0.78 H99.3';
const ctx = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
export function strokes(root){
  const posts = root.matches?.('.post') ? [root] : root.querySelectorAll('.post');
  for (const post of posts) {
    post.querySelectorAll('.stroke').forEach(s => s.remove());
    if (!post.classList.contains('m-stroke')) continue;
    const o = post.getBoundingClientRect(), k = o.width / 1080;
    if (!k) continue;
    for (const hl of post.querySelectorAll('.hl')) {
      const cs = getComputedStyle(hl), fs = parseFloat(cs.fontSize);
      ctx.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
      const asc = ctx.measureText(hl.textContent).fontBoundingBoxAscent;
      for (const r of hl.getClientRects()) {
        if (r.width < 2) continue;
        const x = (r.left - o.left) / k, w = r.width / k, ht = Math.max(7, fs * .085), y = (r.top - o.top) / k + asc + fs * .055;
        post.insertAdjacentHTML('beforeend', `<svg class="stroke" style="left:${x}px;top:${y}px;width:${w}px;height:${ht}px" viewBox="0 0 100 1" preserveAspectRatio="none"><path d="${STROKE}" fill="none" stroke="var(--mark)" stroke-width="${ht}" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
      }
    }
  }
}
