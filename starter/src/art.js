/* Drawn parts that take the colourway they sit on (CSS variables), so they never vanish into the ground:
   social icons, service icons, and a few placeholder pictures. Flat: no outlines, no shadows, no faces.
   Replace the pictures with the brand's own illustrations (assets/illos/*.svg) as soon as you have them. */

const svg = (vb, body, cls = '') => `<svg class="${cls}" viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;

// platform icons, one colour (currentColor)
export const SOCIAL = {
  instagram: svg('0 0 24 24', '<rect x="2.5" y="2.5" width="19" height="19" rx="5.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="17.4" cy="6.6" r="1.4" fill="currentColor"/>'),
  facebook: svg('0 0 24 24', '<path d="M13.6 21.5v-7.8h2.6l.4-3h-3V8.8c0-.9.3-1.5 1.5-1.5h1.6V4.6a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6v7.8z" fill="currentColor"/>'),
  x: svg('0 0 24 24', '<path d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.5z" fill="currentColor"/>'),
  tiktok: svg('0 0 24 24', '<path d="M16.6 2.5c.4 2.3 1.8 3.8 4.1 4v3.2a7.6 7.6 0 0 1-4.1-1.3v6.4a6.3 6.3 0 1 1-6.3-6.3h.6v3.3a3 3 0 1 0 2.4 2.9V2.5z" fill="currentColor"/>'),
  whatsapp: svg('0 0 24 24', '<path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.3A9.5 9.5 0 1 0 12 2.5z" fill="currentColor"/><path d="M9.2 7.4c-.3-.6-.5-.6-.8-.6h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.1-1.2 2.7s1.2 3.2 1.4 3.4c.2.2 2.3 3.6 5.6 4.9 2.8 1.1 3.3.9 3.9.8.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.2-.7-.4l-2.2-1.1c-.3-.1-.5-.2-.8.2l-1 1.2c-.2.2-.4.2-.7.1-.4-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.4-.2-.3 0-.5.2-.7l.5-.6.3-.6c.1-.2 0-.4 0-.6z" fill="var(--bg)"/>'),
  linkedin: svg('0 0 24 24', '<rect x="2.5" y="2.5" width="19" height="19" rx="3" fill="currentColor"/><path d="M7 10h2.4v7.5H7zm1.2-3.9a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8zM11 10h2.3v1c.3-.6 1.1-1.2 2.3-1.2 2.4 0 2.9 1.6 2.9 3.7v4H16v-3.6c0-.9 0-2-1.2-2s-1.4.9-1.4 1.9v3.7H11z" fill="var(--bg)"/>'),
  youtube: svg('0 0 24 24', '<rect x="1.5" y="5" width="21" height="14" rx="4" fill="currentColor"/><path d="M10 9v6l5.2-3z" fill="var(--bg)"/>'),
};

// service icons: two flat tones, the icon's own disc behind them is the card colour
const I = (body) => svg('0 0 64 64', body, 'icon');
const A = 'var(--fg-on-card, var(--cardfg))', B = 'var(--mark)';
export const ICONS = {
  sparkle: I(`<path d="M30 8c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18z" fill="${B}"/><path d="M48 38c1 5 3 7 8 8-5 1-7 3-8 8-1-5-3-7-8-8 5-1 7-3 8-8z" fill="${A}"/>`),
  sofa: I(`<rect x="12" y="20" width="40" height="18" rx="6" fill="${B}"/><rect x="6" y="28" width="52" height="16" rx="6" fill="${A}"/><rect x="10" y="44" width="6" height="8" rx="2" fill="${A}"/><rect x="48" y="44" width="6" height="8" rx="2" fill="${A}"/>`),
  spray: I(`<rect x="18" y="26" width="22" height="30" rx="6" fill="${B}"/><path d="M20 26l4-12h14v12z" fill="${A}"/><rect x="38" y="14" width="10" height="6" rx="2" fill="${A}"/><circle cx="54" cy="12" r="2.5" fill="${B}"/><circle cx="56" cy="20" r="2" fill="${B}"/><circle cx="52" cy="26" r="2" fill="${B}"/>`),
  shield: I(`<path d="M32 6l20 8v14c0 14-9 24-20 30C21 52 12 42 12 28V14z" fill="${B}"/><path d="M23 31l6 6 12-13" stroke="${A}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  home: I(`<path d="M32 10l22 18v26H10V28z" fill="${B}"/><rect x="26" y="36" width="12" height="18" rx="2" fill="${A}"/>`),
  bug: I(`<ellipse cx="32" cy="36" rx="13" ry="17" fill="${B}"/><circle cx="32" cy="18" r="7" fill="${A}"/><path d="M19 30l-9-4M19 40l-9 2M45 30l9-4M45 40l9 2" stroke="${A}" stroke-width="4" stroke-linecap="round"/>`),
  truck: I(`<rect x="6" y="18" width="32" height="24" rx="4" fill="${B}"/><path d="M38 26h10l8 8v8H38z" fill="${A}"/><circle cx="18" cy="46" r="6" fill="${A}"/><circle cx="46" cy="46" r="6" fill="${A}"/>`),
  phone: I(`<rect x="18" y="6" width="28" height="52" rx="6" fill="${A}"/><rect x="22" y="12" width="20" height="36" rx="3" fill="${B}"/>`),
  check: I(`<circle cx="32" cy="32" r="24" fill="${B}"/><path d="M21 33l7 7 15-16" stroke="${A}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  wallet: I(`<rect x="8" y="16" width="48" height="36" rx="8" fill="${B}"/><path d="M14 16l26-8 4 8z" fill="${A}"/><rect x="38" y="28" width="18" height="12" rx="4" fill="${A}"/>`),
  card: I(`<rect x="6" y="14" width="52" height="36" rx="7" fill="${B}"/><rect x="6" y="22" width="52" height="7" fill="${A}"/><rect x="12" y="38" width="16" height="5" rx="2.5" fill="${A}"/>`),
  send: I(`<path d="M8 30L56 10 42 56 32 36z" fill="${B}"/><path d="M32 36l24-26-28 22z" fill="${A}"/>`),
  chart: I(`<rect x="10" y="34" width="10" height="20" rx="3" fill="${A}"/><rect x="27" y="24" width="10" height="30" rx="3" fill="${B}"/><rect x="44" y="12" width="10" height="42" rx="3" fill="${A}"/>`),
  lock: I(`<path d="M20 28v-6a12 12 0 0 1 24 0v6" stroke="${A}" stroke-width="6" fill="none"/><rect x="12" y="28" width="40" height="28" rx="7" fill="${B}"/><circle cx="32" cy="41" r="4" fill="${A}"/>`),
  bell: I(`<path d="M32 8c-10 0-16 8-16 18v12l-6 8h44l-6-8V26c0-10-6-18-16-18z" fill="${B}"/><circle cx="32" cy="52" r="6" fill="${A}"/>`),
  gift: I(`<rect x="10" y="26" width="44" height="30" rx="5" fill="${B}"/><rect x="6" y="18" width="52" height="12" rx="4" fill="${A}"/><rect x="28" y="18" width="8" height="38" fill="${A}"/>`),
  clock: I(`<circle cx="32" cy="32" r="24" fill="${B}"/><path d="M32 18v15l10 6" stroke="${A}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  people: I(`<circle cx="24" cy="22" r="9" fill="${B}"/><path d="M8 52c0-10 7-17 16-17s16 7 16 17z" fill="${B}"/><circle cx="44" cy="24" r="7" fill="${A}"/><path d="M36 52c1-9 4-14 8-14 7 0 12 6 12 14z" fill="${A}"/>`),
  chat: I(`<path d="M10 14h44v30H28l-12 10V44h-6z" fill="${B}"/><rect x="18" y="24" width="28" height="5" rx="2.5" fill="${A}"/><rect x="18" y="33" width="18" height="5" rx="2.5" fill="${A}"/>`),
  star: I(`<path d="M32 6l7.6 16.4 17.9 2-13.3 12.2 3.7 17.6L32 45.3 16.1 54.2l3.7-17.6L6.5 24.4l17.9-2z" fill="${B}"/>`),
  bolt: I(`<path d="M36 4L12 36h16l-4 24 26-34H34z" fill="${B}"/>`),
  heart: I(`<path d="M32 54S8 40 8 23c0-8 6-14 13-14 5 0 9 3 11 7 2-4 6-7 11-7 7 0 13 6 13 14 0 17-24 31-24 31z" fill="${B}"/>`),
  globe: I(`<circle cx="32" cy="32" r="24" fill="${B}"/><path d="M8 32h48M32 8c8 8 8 40 0 48M32 8c-8 8-8 40 0 48" stroke="${A}" stroke-width="4" fill="none"/>`),
};
export const icon = n => ICONS[n] || ICONS.sparkle;

// placeholder pictures for the picture slots, 400 × 320, in the colourway's card, mark and words colours
const P = (body) => svg('0 0 400 320', body, 'pic');
export const PICTURES = {
  phone: P(`<rect x="70" y="120" width="260" height="170" rx="26" fill="var(--card)" opacity=".18"/>
    <rect x="130" y="20" width="140" height="280" rx="24" fill="var(--fg)"/><rect x="140" y="32" width="120" height="256" rx="16" fill="var(--card)"/>
    <rect x="140" y="32" width="120" height="40" rx="16" fill="var(--mark)"/><rect x="140" y="56" width="120" height="16" fill="var(--mark)"/>
    <rect x="152" y="90" width="76" height="30" rx="10" fill="var(--bg)" opacity=".25"/><rect x="172" y="132" width="76" height="40" rx="10" fill="var(--mark)"/>
    <rect x="152" y="184" width="64" height="26" rx="10" fill="var(--bg)" opacity=".25"/>
    <circle cx="300" cy="60" r="26" fill="var(--mark)"/><path d="M288 60l8 8 16-17" stroke="var(--chipfg)" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  calendar: P(`<rect x="80" y="40" width="240" height="250" rx="28" fill="var(--card)"/><rect x="80" y="40" width="240" height="66" rx="28" fill="var(--mark)"/><rect x="80" y="80" width="240" height="26" fill="var(--mark)"/>
    <rect x="128" y="22" width="18" height="44" rx="9" fill="var(--fg)"/><rect x="254" y="22" width="18" height="44" rx="9" fill="var(--fg)"/>
    ${[0, 1, 2, 3].flatMap(r => [0, 1, 2, 3, 4].map(c => `<rect x="${104 + c * 40}" y="${126 + r * 38}" width="26" height="24" rx="7" fill="var(--cardfg)" opacity="${r === 2 && c === 3 ? 1 : .14}"/>`)).join('')}`),
  pin: P(`<rect x="40" y="200" width="320" height="90" rx="26" fill="var(--card)" opacity=".2"/>
    <path d="M200 20c-56 0-96 40-96 94 0 70 96 164 96 164s96-94 96-164c0-54-40-94-96-94z" fill="var(--mark)"/><circle cx="200" cy="112" r="38" fill="var(--card)"/>`),
  home: P(`<rect x="40" y="250" width="320" height="40" rx="20" fill="var(--card)" opacity=".2"/>
    <path d="M200 40l130 110v120H70V150z" fill="var(--card)"/><path d="M200 26l150 128-18 20-132-112L68 174l-18-20z" fill="var(--mark)"/>
    <rect x="170" y="190" width="60" height="80" rx="8" fill="var(--mark)"/><rect x="96" y="170" width="50" height="46" rx="8" fill="var(--bg)" opacity=".3"/><rect x="254" y="170" width="50" height="46" rx="8" fill="var(--bg)" opacity=".3"/>
    <path d="M330 40c3 18 9 24 27 27-18 3-24 9-27 27-3-18-9-24-27-27 18-3 24-9 27-27z" fill="var(--mark)"/>`),
  // an app screen: a balance, a chart, two rows
  app: P(`<rect x="60" y="150" width="280" height="150" rx="28" fill="var(--card)" opacity=".18"/>
    <rect x="125" y="14" width="150" height="296" rx="26" fill="var(--fg)"/><rect x="135" y="26" width="130" height="272" rx="18" fill="var(--card)"/>
    <rect x="149" y="44" width="60" height="10" rx="5" fill="var(--cardfg)" opacity=".35"/><rect x="149" y="62" width="96" height="22" rx="7" fill="var(--cardfg)"/>
    <rect x="149" y="98" width="102" height="66" rx="12" fill="var(--mark)"/><path d="M158 150l18-16 16 10 24-26 26 12" stroke="var(--chipfg)" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    ${[0, 1].map(i => `<circle cx="161" cy="${190 + i * 40}" r="11" fill="var(--mark)"/><rect x="180" y="${184 + i * 40}" width="54" height="10" rx="5" fill="var(--cardfg)" opacity=".5"/><rect x="236" y="${184 + i * 40}" width="16" height="10" rx="5" fill="var(--cardfg)"/>`).join('')}
    <circle cx="316" cy="66" r="26" fill="var(--mark)"/><path d="M304 66l8 8 16-17" stroke="var(--chipfg)" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
  // a bank card, tilted a little, over a second one
  card: P(`<g transform="rotate(-8 200 170)"><rect x="70" y="70" width="270" height="170" rx="22" fill="var(--card)"/></g>
    <g transform="rotate(6 200 170)"><rect x="60" y="90" width="280" height="176" rx="22" fill="var(--mark)"/><rect x="88" y="130" width="46" height="34" rx="8" fill="var(--chipfg)" opacity=".85"/>
    <rect x="88" y="200" width="150" height="14" rx="7" fill="var(--chipfg)" opacity=".85"/><circle cx="282" cy="226" r="20" fill="var(--chipfg)" opacity=".5"/><circle cx="304" cy="226" r="20" fill="var(--chipfg)" opacity=".85"/></g>`),
};
export const picture = n => PICTURES[n] || null;
