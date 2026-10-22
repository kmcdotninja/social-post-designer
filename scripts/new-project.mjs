/* Start a new brand's post project from the starter.
     node new-project.mjs <folder> [brand.json]
   Copies the starter into <folder> (which must be empty or new), puts the brand.json in if given, and prints the next
   steps. Then: npm install, npm run brand, npm run dev. */
import { cp, readdir, mkdir, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [dest, brand] = process.argv.slice(2);
if (!dest) { console.error('Usage: node new-project.mjs <folder> [brand.json]'); process.exit(1); }
const to = resolve(dest), from = resolve(dirname(fileURLToPath(import.meta.url)), '../starter');
if (existsSync(to) && (await readdir(to)).length) { console.error(`${to} is not empty; pick a new folder.`); process.exit(1); }
await mkdir(to, { recursive: true });
await cp(from, to, { recursive: true, filter: s => !/node_modules|\/out(\/|$)/.test(s) });
if (brand) await copyFile(resolve(brand), resolve(to, 'brand.json'));
console.log(`Created ${to}
Next:
  cd "${to}"
  npm install
  edit brand.json, put the logo, fonts and photos in assets/
  npm run brand     check the colourways' contrast
  npm run dev       the gallery
  npm run check     nothing touches anything
  npm run render    PNGs into out/`);
