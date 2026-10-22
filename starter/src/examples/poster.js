/* Examples of the poster family's layouts (layouts/poster.js), at least one each, written for whatever brand is in brand.json.
   The pictures are art.js's placeholders; give the brand's own character or illustrations as art: 'assets/illos/x.svg'. */
import { BRAND, post } from '../brand.js';

const N = BRAND.name, CITY = BRAND.city || 'your city', FIRST = N.split(' ')[0];
const SV = (BRAND.services || []).map(s => s.short || s.name);
const sv = i => SV[i % (SV.length || 1)] || ['Fast', 'Friendly', 'Fair'][i % 3];
const PHOTO = 'assets/photos/example.jpg';
const S = 'Posters';

export default [
  // the poster set
  post(S, 'po-rise', { theme: 'ink', art: 'phone', label: `New in ${N}`, title: `${FIRST} just got [bigger].`, sub: 'Everything you asked for, in one update.', sticker: 'v2.0', caption: `${N} just got bigger.` }),
  post(S, 'po-peek-right', { theme: 'paper', art: 'app', kicker: 'Made for you', title: `Ready when [you] are.`, sub: 'Five minutes is plenty.', caption: 'Ready when you are.' }),
  post(S, 'po-peek-left', { theme: 'tint', art: 'calendar', title: 'Small steps.\n[Big] smiles.', sub: 'Every day is a little win.', caption: 'Small steps. Big smiles.' }),
  post(S, 'po-big', { theme: 'primary', art: 'home', title: 'A friend who never [rushes].', caption: 'A friend who never rushes.' }),
  post(S, 'po-glyph', { theme: 'accent', glyph: FIRST[0], kicker: 'Hello', title: `It all starts with [${FIRST[0]}].`, sub: `The first letter of ${N}.`, caption: `It all starts with ${FIRST[0]}.` }),
  post(S, 'po-glyph', { theme: 'ink', glyph: '7', kicker: 'Every day', title: 'Open [seven] days a week.', sticker: ['Every day', 'circle'], caption: 'Seven days a week.' }),
  post(S, 'po-mega', { theme: 'paper', kicker: N, title: `Hello, ${CITY}.`, sticker: 'New!', caption: `Hello, ${CITY}.` }),
  post(S, 'po-mega', { theme: 'ink', title: BRAND.description || `Made for ${CITY}.`, caption: BRAND.description }),
  post(S, 'po-corner-pic', { theme: 'tint', art: 'card', kicker: sv(0), title: 'Learning that feels like [play].', sub: 'Quick, simple and yours.', sticker: 'Free', caption: 'It should feel like play.' }),
  post(S, 'po-centre-pic', { theme: 'primary', art: 'pin', kicker: CITY, title: `Now in [${CITY}].`, caption: `Now in ${CITY}.` }),
  post(S, 'po-quote', { theme: 'paper', title: 'Fast, friendly and exactly what they promised.', sub: 'A happy customer', caption: 'Thank you for the kind words.' }),
  post(S, 'po-cloud', { theme: 'accent', kicker: 'Our promise', title: 'No pressure. No fuss. Just [help].', sub: `That’s the ${FIRST} way.`, caption: 'No pressure. No fuss.' }),
  post(S, 'po-cloud', { theme: 'ink', title: 'Kind words are worth more than [gold].', sub: 'Something we live by', caption: 'Kind words.' }),
  post(S, 'po-pills', { theme: 'primary', label: 'What we do', title: `${SV.length || 4} ways to [start].`, items: SV.length ? SV.slice(0, 4) : ['Save', 'Send', 'Pay', 'Grow'], caption: 'Pick one and start.' }),
  post(S, 'po-numbers', { theme: 'tint', kicker: 'Easy as', glyphs: ['1', '2', '3'], title: 'One, two, [three].', caption: 'Easy as one, two, three.' }),
  post(S, 'po-ready', { theme: 'ink', art: 'phone', title: 'Who’s ready to [start]?', caption: 'Who’s ready?' }),
  post(S, 'po-balloon', { theme: 'paper', art: 'app', glyph: FIRST[0], title: 'Try,\nplay,\n[repeat].', caption: 'Try, play, repeat.' }),
  post(S, 'po-tile', { theme: 'tint', art: 'home', glyph: FIRST[0], title: 'Small things.\nBig [feelings].', caption: 'Small things, big feelings.' }),
  post(S, 'po-row', { theme: 'paper', title: 'From A to Z.', glyphs: ['A', 'B', 'C', 'D', 'E'], caption: 'Everything, from A to Z.' }),

  // releases
  post(S, 'po-release', { theme: 'ink', status: 'new', version: 'v2.0', kicker: sv(1), title: `Say hello to [${sv(1).toLowerCase()}].`, sub: 'The thing you asked for most, now in the app.', art: 'app', badge: 'Update now', caption: `New in ${N}.` }),
  post(S, 'po-release', { theme: 'paper', status: 'soon', version: 'Coming', kicker: 'Next up', title: 'Something new is [coming].', sub: 'We’ll tell you the moment it lands.', glyphs: ['1', '2', '3'], caption: 'Coming soon.' }),

  // whole posts in any script (dir: 'rtl' for Arabic, Hebrew…)
  post(S, 'po-word-frame', { theme: 'accent', art: 'phone', top: 'Meet', bottom: FIRST, sub: BRAND.description, caption: `Meet ${N}.` }),
  post(S, 'po-half', { theme: 'paper', photo: PHOTO, title: 'Pick a day. We’ll be [there].', sub: 'Choose a time that suits you.', caption: 'Pick a day.' }),
  post(S, 'po-flat', { theme: 'tint', art: 'card', title: 'All of it, in one [place].', sub: BRAND.description, caption: 'All in one place.' }),
  post(S, 'po-pattern', { theme: 'ink', art: 'phone', word: FIRST, caption: N }),
  post(S, 'po-number', { theme: 'accent', number: String((BRAND.places || []).length || 6), title: `Places in ${CITY}`, sub: 'And more on the way.', caption: `Now in ${(BRAND.places || []).length || 6} places.` }),
  post(S, 'po-scatter', { theme: 'paper', art: 'card', title: 'Happy [holidays]!', sub: `From all of us at ${N}.`, caption: 'Happy holidays.' }),
  post(S, 'po-big-line', { theme: 'primary', title: 'No ads. No pressure. Just what you [need].', sub: 'Our promise', caption: 'Just what you need.' }),
  post(S, 'po-big-line', { theme: 'tint', dir: 'rtl', lang: 'ar', title: 'كل ما تحتاجه في مكان واحد.', sub: 'وعدنا لك', caption: 'Everything you need, in one place.' }),

  // the Swiss set
  post(S, 'po-swiss-mast', { theme: 'accent', word: 'Welcome', alt: 'أهلاً وسهلاً', dir: 'rtl', items: [`To ${CITY}`, `To ${FIRST}`, 'To you'], caption: 'Welcome.' }),
  post(S, 'po-swiss-grow', { theme: 'ink', word: FIRST.toUpperCase().slice(0, 7), caption: N }),
  post(S, 'po-swiss-side', { theme: 'paper', word: sv(0), glyph: FIRST[0], items: [`The first thing ${FIRST} does`, 'And does well'], caption: sv(0) }),
  post(S, 'po-swiss-frame', { theme: 'ink', word: 'Family', art: 'home', items: ['Made together', 'for everyone at home'], caption: 'For the whole family.' }),
  post(S, 'po-swiss-sandwich', { theme: 'tint', word: 'Play', art: 'phone', alt: 'العب', dir: 'rtl', items: [SV.slice(0, 4).join(' · ') || 'Try · Play · Repeat'], caption: 'Play.' }),
  post(S, 'po-swiss-blocks', { theme: 'paper', title: `${FIRST} grew up.`, items: ['Now with everything you asked for'], alt: '123', caption: `${FIRST} grew up.` }),
  post(S, 'po-swiss-bleed', { theme: 'primary', word: 'Hello', alt: 'مرحبا', dir: 'rtl', caption: 'Hello.' }),
  post(S, 'po-swiss-bleed', { theme: 'accent', word: 'Yay!', caption: 'Yay!' }),
  post(S, 'po-swiss-lines', { theme: 'tint', word: FIRST.toUpperCase(), alt: 'شكراً', dir: 'rtl', caption: 'Thank you.' }),

  // stickers and bands
  post(S, 'po-stickers', { theme: 'ink', word: `${FIRST} is`, stickers: [['Simple', 'scallop'], ['No ads', 'pill'], ['Friendly', 'circle'], ['Free to try', 'tag'], ['Made with love', 'blob']], caption: `${N} is…` }),
  post(S, 'po-stickers', { theme: 'paper', word: 'We do', stickers: SV.slice(0, 4).concat(['And more']).slice(0, 5), caption: 'What we do.' }),
  post(S, 'po-bands', { theme: 'ink', rows: [[['circle', ''], ['rect', 'Hello!'], ['dome', 'art:phone'], ['cap', 'Welcome']], [['cap', 'Hi there'], ['circle', 'art:pin'], ['rect', CITY], ['dome', 'art:card']]], caption: `Hello, ${CITY}.` }),
  post(S, 'po-bands', { theme: 'paper', rows: [[['rect', sv(0)], ['dome', 'art:home'], ['cap', sv(1)]], [['circle', 'art:calendar'], ['cap', sv(2)], ['rect', 'v2.0']], [['cap', 'Open'], ['circle', ''], ['rect', CITY]]], caption: 'Everything we do.' }),

  // photos
  post(S, 'po-photo-full', { theme: 'ink', photo: PHOTO, title: 'Friends who [grow] together.', sub: 'Made for every day.', sticker: 'New!', caption: 'Friends who grow together.' }),
  post(S, 'po-photo-framed', { theme: 'paper', photo: PHOTO, title: `${CITY}, [welcome]!`, sub: 'The month of good things.', alt: 'أهلاً', dir: 'rtl', sticker: ['30 days', 'circle'], caption: `Welcome, ${CITY}.` }),
  post(S, 'po-photo-round', { theme: 'tint', photo: PHOTO, title: 'Start your day with [us].', sub: 'Every morning, right on time.', caption: 'Start your day with us.' }),
  post(S, 'po-photo-peek', { theme: 'primary', photo: PHOTO, art: 'phone', title: 'Little hands, [big] hearts.', sub: 'For the whole family.', caption: 'Little hands, big hearts.' }),
];
