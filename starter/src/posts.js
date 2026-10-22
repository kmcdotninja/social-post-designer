/* The posts. Write the brand's campaign here with post(series, layout, { theme, title, …, caption }); see the skill's
   references/campaigns.md for planning and references/layouts-*.md for every layout and its fields.
   Until you do, the gallery shows src/examples/: every layout family, written for the brand in brand.json.
   For a real project, delete src/examples/ (or set SHOW_EXAMPLES to false). */
import { post } from './brand.js';

const SHOW_EXAMPLES = true;
const EXAMPLES = import.meta.glob('./examples/*.js', { eager: true, import: 'default' });

const mine = [
  // post('Launch', 'hero', { theme: 'primary', kicker: 'Now open', title: 'Hello, [world].', caption: 'Hello, world.' }),
];

export default [...mine, ...(SHOW_EXAMPLES || !mine.length ? Object.values(EXAMPLES).flat() : [])].map((p, i) => ({ id: i + 1, ...p }));
