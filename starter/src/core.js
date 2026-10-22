/* The pieces every layout family builds with: the brand's logo, handle, call, sticker, pictures, headlines.
   Every layout sits on one grid: the brand's margin (--m) left and right, the top bar at 64, the first line at 170
   (or 262 under a sticker), the call at the foot (bottom 130), the handle and number at the very foot (bottom 58).
   Copy: [word] is the key word (gets the brand's mark), \n is a line break. */
import { BRAND, THEMES } from './brand.js';
import { SOCIAL, ICONS, icon, picture } from './art.js';
export { BRAND, THEMES, SOCIAL, ICONS, icon, picture };

export const RAW = import.meta.glob('../assets/**/*.svg', { query: '?raw', import: 'default', eager: true });
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
export const plain = s => String(s ?? '').replace(/[[\]]/g, '').replace(/\n/g, ' ');

// words: [key] gets the mark, a hyphenated word never splits, a full stop stays with its word, \n breaks
export const words = s => esc(s)
  .replace(/\[([^\]]+)\]([.,!?:;’']*)/g, (_, w, p) => `<span class="nw"><span class="hl">${w}</span>${p}</span>`)
  .replace(/(^|\s)([\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)+)/gu, '$1<span class="nw">$2</span>')
  .replace(/\n/g, '<br>');

/* ── the brand's pieces ── */
export const theme = p => THEMES[p.theme] || Object.values(THEMES)[0];
export function logo(p){
  const L = BRAND.logo || {}, t = theme(p);
  const file = L.mono ? L.file : (t.dark ? L.light || L.file : L.dark || L.file);
  const raw = RAW['../' + file];
  if (!raw) return `<b class="wm-text">${esc(BRAND.name)}</b>`;
  const s = L.mono ? raw.replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"').replace(/fill:\s*#[0-9a-fA-F]{3,6}/g, 'fill:currentColor') : raw;
  return s.replace(/<\?xml[^>]*>/, '').replace('<svg', '<svg class="wm"');
}
export const handle = () => `<span class="handle">${(BRAND.socials || []).map(n => `<i>${SOCIAL[n] || ''}</i>`).join('')}${esc(BRAND.handle)}</span>`;
export const phones = () => (BRAND.phones || []).filter(Boolean);
export const top = (p, right = BRAND.city) => `<header class="top">${logo(p)}${right ? `<span class="place">${esc(right)}</span>` : ''}</header>`;
export const foot = (p, { phone = true } = {}) => `<footer class="foot">${handle()}${phone && phones()[0] ? `<span class="foot-ph">${esc(phones()[0])}</span>` : ''}</footer>`;
// the call: a light line, then where to act, big: the phone numbers, else the website, else the handle.
// A post can set its own: cta: ['Get it on', 'kudi.app']
export const cta = (cls = '', p = {}) => {
  const [line, ...big] = p.cta || [BRAND.cta || 'Find us at', ...(phones().length ? phones() : [BRAND.website || BRAND.handle])];
  return `<div class="cta ${cls}"><small>${esc(line)}</small>${big.filter(Boolean).map(n => `<b>${esc(n)}</b>`).join('')}</div>`;
};
export const chip = (t, ic) => t ? `<span class="chip">${ic ? `<i class="chip-ic">${icon(ic)}</i>` : ''}${esc(t)}</span>` : '';
// a picture slot: one of art.js's placeholders, or the brand's own file (svg inline, image as <img>)
export const art = (a, cls = '') => {
  if (!a) return '';
  if (picture(a)) return `<div class="art ${cls}">${picture(a)}</div>`;
  const raw = RAW['../' + a];
  return `<div class="art ${cls}">${raw ? raw.replace(/<\?xml[^>]*>/, '') : `<img src="${a}" alt="">`}</div>`;
};
export const photo = (p, cls = '') => `<div class="photo ${cls}"><img src="${p.photo}" alt="" style="object-position:${p.pos || '50% 50%'}"></div>`;
export const h = (s, cls, extra = '') => `<h1 class="h fit ${cls}" ${extra}>${words(s)}</h1>`;
export const sub = (s, cls) => s ? `<p class="sub fit ${cls}">${words(s)}</p>` : '';

