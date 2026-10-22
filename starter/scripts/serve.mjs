/* A Vite server and system Chrome, shared by the scripts. Chrome comes from the machine (channel: 'chrome');
   if there is none, run `npx playwright install chromium` and drop the channel. */
import { createServer } from 'vite';
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

export const root = fileURLToPath(new URL('..', import.meta.url));
export async function start(){
  const server = await createServer({ root, logLevel: 'error', server: { port: 0 } });
  await server.listen();
  const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL ?? 'chrome' }).catch(() => chromium.launch());
  return { server, browser, url: server.resolvedUrls.local[0], stop: async () => { await browser.close(); await server.close(); } };
}
