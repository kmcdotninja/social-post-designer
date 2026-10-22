/* Examples of the campaign family (layouts/campaign.js), one or more per layout, written for whatever brand is in
   brand.json: a launch in BRAND.city, counted down, then open. Swap the placeholder photo and pictures for the
   brand's own (photo: 'assets/photos/…jpg', art: 'assets/illos/…svg'). */
import { BRAND, post } from '../brand.js';

const PH = 'assets/photos/example.jpg';
const CITY = BRAND.city || 'the city';
const NAME = BRAND.name;
const SV = BRAND.services || [];
const S0 = SV[0]?.name || 'Our service';
const PL = BRAND.places || [];

export default [
  /* teasers and launch */
  post('Launch', 'ca-type-hero', { theme: 'primary', kicker: 'Coming soon', title: `${CITY},\nwe’re [coming].`, sub: `${NAME} is opening in ${CITY}. Follow along for the date.`, follow: 'Follow for the date', caption: `${CITY}, we’re coming.` }),
  post('Launch', 'ca-type-hero', { theme: 'ink', kicker: 'Now open', title: `We’re [live] in ${CITY}!`, sub: BRAND.description, confetti: true, caption: `We’re live in ${CITY}.` }),
  post('Launch', 'ca-statement', { theme: 'paper', art: 'home', title: `${CITY} deserves a [better] start.`, sub: `${NAME} · ${CITY} · Coming soon`, caption: `${CITY} deserves a better start.` }),
  post('Launch', 'ca-statement', { theme: 'ink', title: `Day one in ${CITY}.\nStart with us [today].`, call: true, confetti: true, caption: `Day one in ${CITY}.` }),
  post('Launch', 'ca-skyline', { theme: 'primary', title: 'New city.\nSame [high] standard.', sub: `${BRAND.description}, now coming to ${CITY}.`, caption: 'New city, same standard.' }),
  post('Launch', 'ca-skyline', { theme: 'accent', title: `${CITY}, ${NAME}\nis [here].`, sub: SV.map(s => s.short || s.name).join(' · '), confetti: true, caption: `${CITY}, ${NAME} is here.` }),
  post('Launch', 'ca-landmark', { theme: 'accent', title: `${CITY}, get ready to [breathe] easy.`, sub: 'Something good is coming.', caption: `${CITY}, get ready.` }),
  post('Launch', 'ca-landmark', { theme: 'tint', title: 'Standards as [high] as the skyline.', sub: `${NAME} · ${CITY}`, art: 'pin', caption: 'High standards only.' }),
  post('Launch', 'ca-photo-full', { theme: 'ink', photo: PH, place: CITY, title: `Something [new] is coming to ${CITY}.`, caption: `Something new is coming to ${CITY}.` }),
  post('Launch', 'ca-photo-full', { theme: 'primary', photo: PH, place: `Now open in ${CITY}`, title: 'You are welcome.\nCome and see [us].', call: true, caption: 'You are welcome.' }),
  post('Launch', 'ca-photo-card', { theme: 'paper', photo: PH, place: CITY, title: `From ${PL[0] || 'here'} to ${PL[1] || 'there'}, ${CITY} is about to [shine].`, caption: `${CITY} is about to shine.` }),
  post('Launch', 'ca-photo-card', { theme: 'accent', photo: PH, place: `Now open in ${CITY}`, title: 'One tap and it’s [sorted].', call: true, caption: 'One tap and it’s sorted.' }),

  /* countdowns */
  post('Countdown', 'ca-count-big', { theme: 'primary', number: 10, line: `Until we open the doors in ${CITY}.`, place: CITY, caption: '10 days to go.' }),
  post('Countdown', 'ca-count-big', { theme: 'accent', number: 7, line: 'Standards as high as they come.', place: PL[0] || CITY, caption: '7 days to go.' }),
  post('Countdown', 'ca-count-big', { theme: 'paper', number: 3, line: 'Book early, we’re filling up.', place: PL[1] || CITY, caption: '3 days to go.' }),
  post('Countdown', 'ca-count-photo', { theme: 'primary', number: 10, photo: PH, place: CITY, title: `${CITY}, we’re [10 days] away.`, caption: '10 days to go.' }),
  post('Countdown', 'ca-cd-photo-bold', { theme: 'primary', number: 9, photo: PH, place: CITY, title: `${CITY}, get [ready].`, caption: '9 days to go.' }),
  post('Countdown', 'ca-cd-tile', { theme: 'primary', number: 10, ticket: 'Book now', where: `${CITY}\nNew branch`, caption: '10 days to go.' }),
  post('Countdown', 'ca-cd-extrude', { theme: 'accent', number: 8, caption: '8 days to go.' }),
  post('Countdown', 'ca-cd-window', { theme: 'primary', number: 6, photo: PH, line: 'Something good is almost here.', caption: '6 days to go.' }),
  post('Countdown', 'ca-cd-burst', { theme: 'paper', number: 4, line: 'Bookings open soon', art: 'calendar', caption: '4 days to go.' }),
  post('Countdown', 'ca-cd-note', { theme: 'ink', number: 2, month: `${CITY} launch`, caption: '2 days to go.' }),
  post('Countdown', 'ca-cd-save', { theme: 'accent', number: 1, stack: ['Get', 'ready,', CITY], sub: SV.slice(0, 3).map(s => s.short || s.name).join(' · '), caption: '1 day to go.' }),
  post('Countdown', 'ca-cd-save', { theme: 'tint', number: 10, stack: ['Save', 'the', 'date'], caption: '10 days to go.' }),
  post('Countdown', 'ca-cd-remix', { theme: 'primary', number: 5, photo: PH, place: CITY, title: 'Five days. Book your [first] visit.', caption: '5 days to go.' }),
  post('Countdown', 'ca-cd-remix', { theme: 'ink', number: 10, photo: PH, place: PL[0] || CITY, title: `${CITY}, you are [welcome].`, caption: '10 days to go.' }),

  /* travel objects */
  post('Boarding', 'ca-pass', { theme: 'tint', photo: PH, lead: 'Boarding soon', sub: SV.map(s => s.short || s.name).join(' · '), caption: `Now boarding: ${NAME} to ${CITY}.` }),
  post('Boarding', 'ca-pass-wide', { theme: 'primary', title: 'Departing in [10 days].', caption: 'Departing in 10 days.' }),
  post('Boarding', 'ca-passport', { theme: 'tint', title: 'Stamped and [arrived].', caption: `Stamped and arrived in ${CITY}.` }),
  post('Boarding', 'ca-pass-stub', { theme: 'accent', photo: PH, title: 'First class, [every] time.', caption: 'First class, every time.' }),
  post('Boarding', 'ca-pass-tag', { theme: 'ink', kicker: SV[0]?.short || 'Priority', title: 'Handled with [care].', rows: [['From', NAME], ['To', `Everyone in ${CITY}`], ['Contents', 'Good news only']], caption: 'Handled with care.' }),
  post('Boarding', 'ca-pass-board', { theme: 'ink', title: `Now departing to every corner of [${CITY}].`, caption: `Every corner of ${CITY}.` }),
  post('Boarding', 'ca-ticket', { theme: 'tint', title: `Next stop:\n[${CITY}].`, caption: `Next stop: ${CITY}.` }),
  post('Boarding', 'ca-ticket', { theme: 'accent', title: `Arrived:\n[${CITY}].`, stamp: 'Arrived', fields: [['Passenger', 'You'], ['Gate', 'Open'], ['Class', 'First']], caption: `Arrived in ${CITY}.` }),

  /* services */
  post('Services', 'ca-service-list', { theme: 'primary', title: `Now open in [${CITY}]`, caption: 'Everything we do.' }),
  post('Services', 'ca-service-list', { theme: 'paper', title: 'One app. [Everything] sorted.', caption: 'One app, everything sorted.' }),
  post('Services', 'ca-service', { theme: 'tint', service: 0, points: ['Set it up in a minute', 'Change it any time', 'See it all in one place'], caption: S0 }),
  post('Services', 'ca-service', { theme: 'ink', service: 1, points: ['No hidden fees', 'Fast and simple', 'Help when you need it'], caption: SV[1]?.name || S0 }),

  /* places */
  post('Places', 'ca-area', { theme: 'primary', area: PL[0] || CITY, title: 'Your neighbourhood called. It wants a [fresh start].', service: 0, caption: `${PL[0] || CITY}, we see you.` }),
  post('Places', 'ca-area', { theme: 'paper', area: PL[1] || CITY, title: `Every home here deserves a [warm] welcome.`, service: 1, caption: `${PL[1] || CITY}, we see you.` }),
  post('Places', 'ca-area-classic', { theme: 'primary', area: PL[2] || CITY, title: 'From the market to your door, we’re [on our way].', service: 0, caption: `${PL[2] || CITY}, we see you.` }),
  post('Places', 'ca-area-classic', { theme: 'accent', area: PL[3] || CITY, title: 'Right around the corner, and [right on time].', service: 2, caption: `${PL[3] || CITY}, we see you.` }),
  post('Places', 'ca-areas', { theme: 'paper', title: `Every corner of [${CITY}].`, caption: `Which part of ${CITY} are you in?` }),
  post('Places', 'ca-areas', { theme: 'primary', title: 'Which area should we visit [first]?', vote: true, caption: 'Vote in the comments.' }),

  /* help and engagement */
  post('Tips', 'ca-tip', { theme: 'tint', kicker: 'Tip 01', title: 'Start with the [easy] win.', body: 'Write the tip here in two or three plain sentences. Keep it useful on its own, even for someone who never buys.', art: 'calendar', caption: 'Save this for later.' }),
  post('Tips', 'ca-tip', { theme: 'accent', kicker: 'Tip 02', title: 'Little and [often] beats big and rare.', body: 'A small habit every week does more than a big push once a year. Set a reminder and let it run.', art: 'phone', seed: 3, caption: 'Little and often.' }),
  post('How it works', 'ca-steps', { theme: 'primary', title: 'Getting started is [easy].', steps: [['Say hello', `${BRAND.website || BRAND.handle}`, 'chat'], ['We set it up', 'A clear price before we start', 'check'], ['You relax', 'We take it from there', 'star']], caption: 'Getting started is easy.' }),
  post('How it works', 'ca-checklist', { theme: 'paper', title: 'Your [first week] checklist', items: ['Download the app', 'Set your first goal', 'Invite a friend', 'Turn on reminders', `Let ${NAME} do the rest`], caption: 'Save this checklist.' }),
  post('How it works', 'ca-checklist', { theme: 'tint', title: `Why [${NAME}]?`, items: ['A team that listens', 'Everything in one place', 'We show up when we say', `${NAME}, every time`], caption: `Why ${NAME}?` }),
  post('Engagement', 'ca-split', { theme: 'paper', title: 'Which one [first]?', a: ['This one', PH], b: ['That one', PH, '30% 50%'], caption: 'Comment A or B.' }),
  post('Engagement', 'ca-poll', { theme: 'primary', title: 'Rate your week.\n[Honestly].', ends: ['Help!', 'Perfect'], caption: 'Rate your week from 1 to 10.' }),
  post('Engagement', 'ca-quiz', { theme: 'paper', title: 'How often should you check in on your goals?', items: ['Every week', 'Once a year', 'Only when things go wrong'], caption: 'Quiz time.' }),
  post('Engagement', 'ca-quiz', { theme: 'ink', title: 'What makes a habit stick the most?', items: ['Doing it at the same time', 'Doing it perfectly', 'Waiting for motivation'], caption: 'Quiz time.' }),
];
