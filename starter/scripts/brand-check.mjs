/* The colourways made from brand.json, with their contrast. Headlines need 3:1, body copy 4.5:1.
     npm run brand */
import { start } from './serve.mjs';
const { server, stop } = await start();
const { report, BRAND } = await server.ssrLoadModule('/src/brand.js');
const rows = report();
console.log(`${BRAND.name}: ${rows.length} colourways\n`);
let bad = 0;
for (const r of rows) {
  const flag = (r.headline < 3 ? ' headline too faint' : '') + (r.body < 4.5 ? ' body too faint' : '') + (r.mark < 1.6 ? ' mark hard to see' : '');
  if (flag) bad++;
  console.log(`${r.theme.padEnd(8)} ${r.bg} / ${r.fg}   headline ${String(r.headline).padEnd(5)} body ${String(r.body).padEnd(5)} mark ${r.mark}${flag ? '  ←' + flag : ''}`);
}
await stop();
process.exit(bad ? 1 : 0);
