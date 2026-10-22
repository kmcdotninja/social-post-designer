/* Examples of the base family's layouts (layouts/base.js), one each, written for whatever brand is in brand.json. */
import { BRAND, post } from '../brand.js';

export default [post('Launch', 'hero', { theme: 'primary', kicker: 'Now open', title: `${BRAND.city},\nwe’re [here].`, sub: `${BRAND.name} is now open in ${BRAND.city}.`, caption: `${BRAND.city}, we’re here.` }),
post('Launch', 'statement', { theme: 'paper', art: 'home', title: 'Built for the way you [live].', sub: BRAND.description, caption: 'Built for the way you live.' }),
post('Launch', 'mega', { theme: 'ink', title: 'Say hello to', word: BRAND.name, sub: BRAND.description, caption: `Say hello to ${BRAND.name}.` }),
post('Countdown', 'countdown', { theme: 'accent', number: '7', label: 'days to go', title: 'Something new is [coming].', caption: '7 days to go.' }),
post('Launch', 'frame', { theme: 'tint', photo: 'assets/photos/example.jpg', title: 'Made for [you].', caption: 'Made for you.' }),
post('Launch', 'photo', { theme: 'primary', photo: 'assets/photos/example.jpg', place: BRAND.city, title: 'Your city, [better].', caption: 'Your city, better.' }),
post('Services', 'list', { theme: 'primary', title: 'What we [do].', caption: 'Everything we do, in one place.' }),
post('Services', 'split', { theme: 'paper', photo: 'assets/photos/example.jpg', title: 'Book in one [message].', sub: 'Send us a message and we’ll take it from there.', caption: 'Book in one message.' }),
post('Voices', 'quote', { theme: 'tint', title: 'Fast, friendly and exactly what they [promised].', by: 'A happy customer', caption: 'Thank you for the kind words.' }),
post('Engagement', 'stack', { theme: 'ink', title: 'We are', items: ['On time', 'Friendly', 'Trusted'], caption: 'On time. Friendly. Trusted.' }),
post('Engagement', 'quiz', { theme: 'paper', word: 'Quick quiz', title: 'Which matters most to you?', items: ['Speed', 'Price', 'Quality'], caption: 'Tell us in the comments.' }),
post('Engagement', 'swiss', { theme: 'accent', word: 'Hello', title: `${BRAND.name} is [new] in ${BRAND.city}.`, sub: BRAND.description, items: (BRAND.services || []).slice(0, 3).map(s => s.short || s.name), caption: `Hello, ${BRAND.city}.` }),
post('Launch', 'ticket', { theme: 'primary', title: 'Next stop:\n[' + BRAND.city + '].', from: 'NOW', fromName: 'Today', to: 'YOU', toName: BRAND.city, fields: [['Gate', 'Open'], ['Seat', 'Yours'], ['Time', 'Now']], caption: `Next stop: ${BRAND.city}.` }),
post('Tips', 'tip', { theme: 'tint', kicker: 'Tip', icon: 'sparkle', title: 'One small habit that [helps].', body: 'Write the tip here in two or three plain sentences. Keep it useful on its own, even for someone who never books.', caption: 'Save this for later.' }),
post('Launch', 'corner', { theme: 'accent', art: 'calendar', title: 'Pick a [day].\nWe’ll be there.', sub: 'Choose a time that suits you.', caption: 'Pick a day.' }),
post('Engagement', 'places', { theme: 'paper', title: `Every corner of [${BRAND.city}].`, caption: `Which part of ${BRAND.city} are you in?` })
];
