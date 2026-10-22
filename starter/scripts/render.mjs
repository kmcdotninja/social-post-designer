/* Export posts as PNG, rendered by Chrome:
     npm run render                      every post at ×2 → out/@2x/
     npm run render -- --scale 4         ×4 (4320 × 5400)
     npm run render -- --ids 1,5-9       some of them
     npm run render -- --sheet           one contact sheet → out/sheet.png
   One post per page load: a page holding every post grows too heavy to capture reliably. */
import { mkdir } from 'node:fs/promises';
import { start, root } from './serve.mjs';

const arg = (k, d) => { const i = process.argv.indexOf('--' + k); return i < 0 ? d : process.argv[i + 1] ?? true; };
const scale = +arg('scale', 2), sheet = process.argv.includes('--sheet');
const ids = arg('ids', null)?.split(',').flatMap(r => { const [a, b = a] = r.split('-').map(Number); return Array.from({ length: b - a + 1 }, (_, i) => a + i); });
const { server, browser, url, stop } = await start();
const { default: posts } = await server.ssrLoadModule('/src/posts.js');
const { BRAND } = await server.ssrLoadModule('/src/brand.js');
await mkdir(`${root}out`, { recursive: true });

if (sheet) {
  const page = await browser.newPage({ viewport: { width: 2200, height: 1000 }, deviceScaleFactor: 1 });
  await page.goto(url);
  await page.waitForFunction(() => document.querySelectorAll('.card').length > 0);
  await page.addStyleTag({ content: '.bar{display:none}.ib{display:none}.grid{grid-template-columns:repeat(6,1fr);max-width:none;padding:28px}' });
  await page.evaluate(() => document.fonts.ready); await page.waitForTimeout(1500);
  await page.screenshot({ path: `${root}out/sheet.png`, fullPage: true });
  console.log('out/sheet.png');
} else {
  const dir = arg('out', null) ? `${root}${arg('out')}/` : `${root}out/@${scale}x/`; await mkdir(dir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: scale });
  const slug = p => String(p.title || p.word || p.series).replace(/[[\]\n]/g, ' ').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
  for (const p of posts) {
    if (ids && !ids.includes(p.id)) continue;
    const name = `${BRAND.slug || 'post'}-${String(p.id).padStart(3, '0')}-${slug(p)}@${scale}x.png`;
    await page.goto(`${url}?only=${p.id}`);
    await page.waitForSelector('body[data-ready]', { timeout: 60000 });
    await page.locator('.post').screenshot({ path: dir + name, animations: 'disabled' });
    process.stdout.write(`\r${p.id}/${posts.length} ${name.padEnd(70)}`);
  }
  console.log(`\nSaved to ${dir.replace(root, '')}`);
}
await stop();
