/* Export the print set as print-ready PDFs: every side is its own one-page file at its full size with bleed.
     npm run print            → out/print/*.pdf, *.svg and *.png
   Banners are too big for one PDF page in Chrome, so they go out as vector art at 1:4, for the printer to enlarge 400%. */
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { mkdir, rm } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const server = await createServer({ root, logLevel: 'error', server: { port: 0 } });
await server.listen();
const url = server.resolvedUrls.local[0];
const { PIECES, files } = await server.ssrLoadModule('/src/print.js');
const dir = `${root}out/print/`; await rm(dir, { recursive: true, force: true }); await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();

for (const p of PIECES) {
  const k = p.trim[0] > 40 ? .25 : 1, w = (p.trim[0] + 2 * p.bleed) * k, h = (p.trim[1] + 2 * p.bleed) * k;
  for (const [i, f] of files(p).entries()) {
    await page.goto(`${url}print.html?piece=${p.id}&side=${i}`);
    await page.waitForSelector('body[data-ready]', { timeout: 60000 });
    await page.addStyleTag({ content: `@page { margin: 0 } html, body { margin: 0; background: #fff; overflow: hidden } body > .pc { break-inside: avoid } .pc .ph { background: none }` });
    await page.pdf({ path: dir + f.name, width: `${w}in`, height: `${h}in`, scale: k, printBackground: true, pageRanges: '1' });
    // the same side as vector SVG, text as outlines so no fonts are needed (needs poppler: brew install poppler)
    execFileSync('pdftocairo', ['-svg', dir + f.name, dir + f.name.replace(/\.pdf$/, '.svg')]);
    // and as high-quality PNG: 300 dpi, or 150 dpi at full size for banners (their PDF is 1:4, so 600 dpi of it)
    execFileSync('pdftocairo', ['-png', '-singlefile', '-r', k < 1 ? '600' : '300', dir + f.name, dir + f.name.replace(/\.pdf$/, '')]);
    console.log(`out/print/${f.name}  ${w.toFixed(3)} × ${h.toFixed(3)} in${k < 1 ? ' (print at 400%)' : ''}`);
  }
}
await browser.close(); await server.close();
