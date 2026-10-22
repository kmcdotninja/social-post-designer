/* Find and download free-licence photos for the posts.
     npm run photos -- "nairobi street market" "friends laughing phone" --n 3
     npm run photos -- "lagos skyline" --n 4 --orientation landscape
     npm run photos -- --own ~/Pictures/brand-shoot      the brand's own photos: copied in and recorded, always first choice
   For each search it saves the best matches as assets/photos/<search>-<n>.jpg (1600px wide) and records the
   photographer, link and licence in assets/photos/photos.json and SOURCES.txt. Posts use them as
   photo: 'assets/photos/nairobi-street-market-1.jpg'; when a licence needs a credit, post() adds it to the caption.

   Sources, best first:
     Unsplash  — set UNSPLASH_ACCESS_KEY (free: unsplash.com/developers). Unsplash Licence, no credit required.
     Pexels    — set PEXELS_API_KEY (free: pexels.com/api). Pexels Licence, no credit required.
     Openverse — no key. Creative Commons photos (Wikimedia, Flickr…), only licences that allow commercial use and
                 changes; CC BY / BY-SA need the credit, which is recorded and added to captions. */
import { mkdir, readFile, writeFile, readdir, copyFile } from 'node:fs/promises';
import { resolve, extname, basename } from 'node:path';
import { existsSync } from 'node:fs';
import { root } from './serve.mjs';

const args = process.argv.slice(2), opt = (k, d) => { const i = args.indexOf('--' + k); return i < 0 ? d : args.splice(i, 2)[1]; };
const n = +opt('n', 3), orientation = opt('orientation', 'portrait'), only = opt('source', null), own = opt('own', null);
const queries = args.filter(a => !a.startsWith('--'));
if (!queries.length && !own) { console.error('Usage: npm run photos -- "search words" ["more words" …] [--n 3] [--orientation portrait|landscape|square] [--source unsplash|pexels|openverse]'); process.exit(1); }

const dir = `${root}assets/photos/`; await mkdir(dir, { recursive: true });
const manifestPath = dir + 'photos.json';
const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : {};
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
const get = async (url, headers = {}) => { const r = await fetch(url, { headers: { 'User-Agent': 'social-post-designer', ...headers } }); if (!r.ok) throw new Error(`${r.status} ${url}`); return r; };

const SOURCES = {
  async unsplash(q){
    const key = process.env.UNSPLASH_ACCESS_KEY; if (!key) return null;
    const H = { Authorization: `Client-ID ${key}` };
    const j = await (await get(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=${n * 2}&orientation=${orientation === 'square' ? 'squarish' : orientation}&content_filter=high`, H)).json();
    return j.results.map(p => ({
      url: `${p.urls.raw}&w=1600&q=82&fm=jpg&fit=max`, page: `${p.links.html}?utm_source=social-post-designer&utm_medium=referral`,
      author: p.user.name, license: 'Unsplash Licence', credit: false, alt: p.alt_description || q,
      ping: () => get(p.links.download_location, H).catch(() => {}),   // Unsplash asks for this on every download
    }));
  },
  async pexels(q){
    const key = process.env.PEXELS_API_KEY; if (!key) return null;
    const j = await (await get(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=${n * 2}&orientation=${orientation}`, { Authorization: key })).json();
    return j.photos.map(p => ({ url: p.src.large2x, page: p.url, author: p.photographer, license: 'Pexels Licence', credit: false, alt: p.alt || q }));
  },
  async openverse(q){
    const ar = { portrait: 'tall', landscape: 'wide', square: 'square' }[orientation] || 'tall';
    const j = await (await get(`https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial,modification&aspect_ratio=${ar}&size=large&page_size=${n * 4}&mature=false`)).json();
    return j.results.filter(p => (p.width || 0) >= 1200 && !/\.(gif|svg|png)$/i.test(p.url)).map(p => ({
      url: p.url, page: p.foreign_landing_url, author: p.creator || 'unknown', alt: p.title || q,
      license: `${p.license === 'cc0' || p.license === 'pdm' ? p.license.toUpperCase() : 'CC ' + p.license.toUpperCase()} ${p.license_version || ''}`.trim(),
      credit: !['cc0', 'pdm'].includes(p.license),
    }));
  },
};

// the brand's own photos: copy them in, named by their file, licensed to the brand
if (own) {
  const from = resolve(own.replace(/^~/, process.env.HOME));
  for (const f of (await readdir(from)).filter(f => /\.(jpe?g|png|webp)$/i.test(f))) {
    const file = `own-${slug(basename(f, extname(f)))}${extname(f).toLowerCase().replace('jpeg', 'jpg')}`;
    await copyFile(resolve(from, f), dir + file);
    manifest[`assets/photos/${file}`] = { source: 'own', author: 'the brand', license: 'own', credit: false, alt: basename(f, extname(f)) };
    console.log(`assets/photos/${file}  the brand's own`);
  }
}

const order = only ? [only] : ['unsplash', 'pexels', 'openverse'];
let lines = existsSync(dir + 'SOURCES.txt') ? (await readFile(dir + 'SOURCES.txt', 'utf8')).trimEnd().split('\n') : [];
for (const q of queries) {
  let found = null, from = '';
  for (const s of order) { try { found = await SOURCES[s](q); } catch (e) { console.warn(`${s}: ${e.message}`); found = null; } if (found?.length) { from = s; break; } }
  if (!found?.length) { console.log(`"${q}": nothing found`); continue; }
  let saved = 0;
  for (const p of found) {
    if (saved >= n) break;
    const file = `${slug(q)}-${saved + 1}.jpg`;
    try {
      const buf = Buffer.from(await (await get(p.url)).arrayBuffer());
      if (buf.length < 40000) continue;   // a thumbnail or an error page, not a photo
      await writeFile(dir + file, buf); await p.ping?.();
      manifest[`assets/photos/${file}`] = { query: q, source: from, author: p.author, page: p.page, license: p.license, credit: p.credit, alt: p.alt };
      lines = lines.filter(l => !l.startsWith(file + ' ')).concat(`${file} ${p.page} · ${p.author} · ${p.license}${p.credit ? ' · CREDIT REQUIRED' : ''}`);
      saved++;
      console.log(`assets/photos/${file}  ${from} · ${p.author} · ${p.license}${p.credit ? ' (credit added to captions)' : ''}`);
    } catch (e) { console.warn(`skip ${p.url}: ${e.message}`); }
  }
}
await writeFile(manifestPath, JSON.stringify(manifest, null, 1));
await writeFile(dir + 'SOURCES.txt', lines.join('\n') + '\n');
console.log(`\nLook at each photo before using it: it must show the brand's real world (its city, its kind of customer), be sharp, and leave room for the words.`);
