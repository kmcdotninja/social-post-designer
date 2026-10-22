/* The gallery: every post at preview size, filter by series, download any one (or all) as PNG at ×1–×4.
   ?only=<id|all> shows posts at full size with no UI, for scripts/render.mjs. */
import { domToBlob } from 'modern-screenshot';
import JSZip from 'jszip';
import posts from './posts.js';
import { render, fit, plain } from './layouts.js';
import { BRAND, brandCSS, themeCSS } from './brand.js';

// the brand's type, shape and colourways; its web font if it has one
document.head.insertAdjacentHTML('beforeend', `<style>${brandCSS()}\n${themeCSS()}</style>`);
// nothing is measured until the brand's font is in: fitted with a fallback font, words wrap differently later
const fontsIn = (async () => {
  const link = g => new Promise(res => document.head.append(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: `https://fonts.googleapis.com/css2?family=${g.replace(/ /g, '+')}&display=block`, onload: res, onerror: res })));
  const alt = BRAND.font?.alt;   // a second script's font (Arabic, Amharic…): { family, google } or a family name
  await Promise.all([BRAND.font?.google && link(BRAND.font.google), alt?.google && link(alt.google)]);
  const fams = [BRAND.font.family, alt?.family || (typeof alt === 'string' ? alt : null)].filter(Boolean);
  await Promise.all(fams.flatMap(f => [BRAND.font?.heavy ?? 900, BRAND.font?.body ?? 400, 700].map(w => document.fonts.load(`${w} 100px "${f}"`).catch(() => {}))));
})();
document.title = `${BRAND.name} · ${BRAND.campaign || 'posts'}`;

const $ = id => document.getElementById(id);
const W = 1080, H = 1350;
const ready = root => Promise.all([fontsIn, document.fonts.ready, ...[...root.querySelectorAll('img')].map(i => i.decode().catch(() => {}))]);
const pad = n => String(n).padStart(3, '0');
const slug = p => plain(p.title || p.word || p.series).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const fileName = (p, s) => `${BRAND.slug || 'post'}-${pad(p.id)}-${slug(p)}@${s}x.png`;

/* ── raw mode for the render script ── */
const only = new URLSearchParams(location.search).get('only');
if (only) {
  document.body.className = 'raw';
  document.body.innerHTML = (only === 'all' ? posts : posts.filter(p => p.id === +only)).map(render).join('');
  await ready(document.body); fit(document.body);
  document.body.dataset.ready = '1';
} else gallery();

async function gallery(){
$('name').textContent = `${BRAND.name} · ${BRAND.campaign || 'Posts'}`;

/* ── light / dark: dark by default, the toggle's pick remembered on this device ── */
const SUN = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>';
const MOON = '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>';
const sysDark = matchMedia('(prefers-color-scheme: dark)');
const isDark = () => (document.documentElement.dataset.theme || (sysDark.matches ? 'dark' : 'light')) === 'dark';
function paintMode(){
  const b = $('mode'), d = isDark();
  b.innerHTML = d ? SUN : MOON;
  b.setAttribute('aria-label', d ? 'Switch to light mode' : 'Switch to dark mode'); b.title = d ? 'Light mode' : 'Dark mode';
}
$('mode').addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('posts.theme', next); } catch {}
  paintMode();
});
sysDark.addEventListener('change', paintMode);
paintMode();

/* ── state ── */
let scale = 2, filter = 'All', viewing = -1;
const series = ['All', ...new Set(posts.map(p => p.series))];
const shown = () => posts.filter(p => filter === 'All' || p.series === filter);

function toast(t, ms = 2600){ const el = $('toast'); el.textContent = t; el.classList.add('on'); clearTimeout(toast.t); if (ms) toast.t = setTimeout(() => el.classList.remove('on'), ms); }

/* ── grid ── */
const grid = $('grid');
grid.innerHTML = posts.map(p => `<figure class="card" data-id="${p.id}" data-series="${p.series}">
  <div class="frame" data-open="${p.id}"><div class="scaler">${render(p)}</div></div>
  <figcaption><span class="num">${pad(p.id)}</span><span class="ser">${p.series}</span>
    <button class="ib" data-copy="${p.id}" title="Copy caption" aria-label="Copy caption"><svg viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="3"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg></button>
    <button class="ib dl" data-dl="${p.id}" title="Download PNG" aria-label="Download PNG"><svg viewBox="0 0 24 24"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg><span>PNG</span></button>
  </figcaption></figure>`).join('');

await fontsIn; await document.fonts.ready; fit(grid);
const size = () => grid.querySelectorAll('.frame').forEach(f => f.style.setProperty('--k', f.clientWidth / W));
new ResizeObserver(size).observe(grid); size();

/* ── filters ── */
$('filters').innerHTML = series.map(s => `<button data-f="${s}" ${s === filter ? 'aria-pressed="true"' : ''}>${s}<span>${s === 'All' ? posts.length : posts.filter(p => p.series === s).length}</span></button>`).join('');
$('filters').addEventListener('click', e => {
  const b = e.target.closest('[data-f]'); if (!b) return;
  filter = b.dataset.f;
  $('filters').querySelectorAll('button').forEach(x => x.toggleAttribute('aria-pressed', x === b));
  grid.querySelectorAll('.card').forEach(c => { c.hidden = filter !== 'All' && c.dataset.series !== filter; });
  updateCount(); size();
});
function updateCount(){
  const n = shown().length;
  $('count').textContent = `${n} post${n === 1 ? '' : 's'}`;
  $('all').textContent = filter === 'All' ? `Download all ${n}` : `Download ${n}`;
}
updateCount();

/* ── scale ── */
$('scale').addEventListener('click', e => {
  const b = e.target.closest('[data-s]'); if (!b) return;
  scale = +b.dataset.s;
  $('scale').querySelectorAll('button').forEach(x => x.setAttribute('aria-checked', x === b));
  $('px').textContent = `${W * scale} × ${H * scale} px`;
  $('vdl').textContent = `Download PNG ×${scale}`;
});

/* ── export: a fresh full-size copy off screen, pictured by the browser ── */
const host = Object.assign(document.createElement('div'), { className: 'export-host' });
document.body.append(host);
async function png(p, s = scale){
  host.innerHTML = render(p);
  const node = host.firstElementChild;
  await ready(host); fit(host);
  const blob = await domToBlob(node, { scale: s, width: W, height: H, type: 'image/png', backgroundColor: null });
  host.innerHTML = '';
  return blob;
}
const save = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 5000); };
async function downloadOne(id, btn){
  const p = posts.find(x => x.id === id);
  btn?.classList.add('busy'); toast(`Rendering ${pad(id)} at ×${scale}…`, 0);
  try { save(await png(p), fileName(p, scale)); toast(`Saved ${fileName(p, scale)}`); }
  catch (e) { console.error(e); toast('Could not render that one. Try again.'); }
  finally { btn?.classList.remove('busy'); }
}

$('all').addEventListener('click', async () => {
  const list = shown(), btn = $('all');
  if (btn.disabled) return;
  btn.disabled = true;
  const folder = window.showDirectoryPicker && (scale >= 2 || list.length > 20);
  try {
    if (folder) {   // write straight into a folder: no giant zip held in memory (Chrome, Edge)
      const dir = await window.showDirectoryPicker({ mode: 'readwrite' });
      for (const [i, p] of list.entries()) {
        toast(`Rendering ${i + 1} of ${list.length} at ×${scale}…`, 0);
        const fh = await dir.getFileHandle(fileName(p, scale), { create: true }), w = await fh.createWritable();
        await w.write(await png(p)); await w.close();
      }
      toast(`Saved ${list.length} PNGs to “${dir.name}”`, 5000);
    } else {
      const zip = new JSZip();
      for (const [i, p] of list.entries()) { toast(`Rendering ${i + 1} of ${list.length} at ×${scale}…`, 0); zip.file(fileName(p, scale), await png(p)); }
      toast('Zipping…', 0);
      save(await zip.generateAsync({ type: 'blob' }), `${BRAND.slug || 'posts'}-${filter === 'All' ? 'all' : slug({ title: filter })}@${scale}x.zip`);
      toast(`Saved ${list.length} posts`, 5000);
    }
  } catch (e) { if (e.name !== 'AbortError') { console.error(e); toast('Something went wrong while saving.'); } else toast('Cancelled'); }
  finally { btn.disabled = false; }
});

/* ── copy captions ── */
async function copy(id){
  const p = posts.find(x => x.id === id);
  try { await navigator.clipboard.writeText(p.caption); toast('Caption copied'); } catch { toast('Copy blocked by the browser'); }
}

/* ── viewer ── */
const view = $('view');
function open(id){
  const list = shown(); viewing = list.findIndex(p => p.id === id); if (viewing < 0) return;
  const p = list[viewing];
  $('vstage').innerHTML = `<div class="frame big"><div class="scaler">${render(p)}</div></div>`;
  $('vmeta').innerHTML = `<b>${pad(p.id)}</b> · ${p.series} · ${p.layout}`;
  $('vcap').textContent = p.caption;
  view.hidden = false; document.body.style.overflow = 'hidden';
  const f = $('vstage').firstElementChild;
  requestAnimationFrame(() => { f.style.setProperty('--k', f.clientWidth / W); fit(f); });
}
const close = () => { view.hidden = true; document.body.style.overflow = ''; viewing = -1; };
const step = d => { const list = shown(); open(list[(viewing + d + list.length) % list.length].id); };
$('vx').onclick = close; $('vp').onclick = () => step(-1); $('vn').onclick = () => step(1);
$('vdl').onclick = e => downloadOne(shown()[viewing].id, e.currentTarget);
$('vcopy').onclick = () => copy(shown()[viewing].id);
view.addEventListener('click', e => { if (e.target === view) close(); });
addEventListener('keydown', e => {
  if (view.hidden) return;
  if (e.key === 'Escape') close(); else if (e.key === 'ArrowLeft') step(-1); else if (e.key === 'ArrowRight') step(1);
});
addEventListener('resize', () => { const f = $('vstage').firstElementChild; if (!view.hidden && f) f.style.setProperty('--k', f.clientWidth / W); });

grid.addEventListener('click', e => {
  const t = e.target.closest('[data-open],[data-copy],[data-dl]'); if (!t) return;
  if (t.dataset.open) open(+t.dataset.open);
  else if (t.dataset.copy) copy(+t.dataset.copy);
  else downloadOne(+t.dataset.dl, t);
});
}
