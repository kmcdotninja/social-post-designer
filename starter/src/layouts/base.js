/* The base family: sixteen general layouts that suit any brand. */
import { BRAND, esc, words, icon, top, foot, cta, chip, art, photo, h, sub, handle } from '../core.js';

const base = {
  // a sticker, the line huge, one sentence, the call at the foot
  hero: p => `${top(p)}${chip(p.kicker, p.icon)}${h(p.title, 'hero-h')}${sub(p.sub, 'hero-sub')}${cta('at-foot', p)}${foot(p, { phone: false })}`,

  // the line in the middle of the page, a picture above it
  statement: p => `${top(p)}${art(p.art, 'st-art')}${h(p.title, 'st-h')}${sub(p.sub, 'st-sub')}${foot(p)}`,

  // one word or number so big it fills the width; a line over it and one under it
  mega: p => `${top(p)}${h(p.title, 'mg-top mid')}<div class="mega fit-w">${esc(p.word)}</div>${sub(p.sub, 'mg-sub')}${foot(p)}`,

  // the countdown: the number is the poster
  countdown: p => `${top(p)}<div class="cd-n fit-w">${esc(p.number)}</div><p class="cd-l">${esc(p.label || 'days to go')}</p>${h(p.title, 'cd-h mid')}${foot(p)}`,

  // the photo fills the post, the line big over its lower part on a flat shade
  photo: p => `${photo(p, 'full')}<i class="shade"></i>${top(p)}${p.place ? `<span class="chip on-photo">${esc(p.place)}</span>` : ''}${h(p.title, 'ph-h')}${foot(p)}`,

  // the line on top, the photo in a rounded frame under it
  frame: p => `${top(p)}${h(p.title, 'fr-h')}${photo(p, 'fr-photo')}${foot(p)}`,

  // words on one half, a photo filling the other half. Photo only: without a photo it becomes the corner layout
  // (a half-panel holding a small illustration looks unfinished)
  split: p => !p.photo ? base.corner(p) : `<div class="sp-side">${photo(p, 'cover')}</div>${top(p, '')}${h(p.title, 'sp-h')}${sub(p.sub, 'sp-sub')}${cta('sp-cta', p)}<footer class="foot sp-foot">${handle()}</footer>`,

  // the services, each with its icon (never numbered), the call at the foot
  list: p => `${top(p)}${h(p.title, 'ls-h')}<ul class="ls">${(p.items || BRAND.services).map(s => `<li><i class="ls-ic">${icon(s.icon)}</i><b>${esc(s.name || s)}</b></li>`).join('')}</ul>${cta('at-foot', p)}${foot(p, { phone: false })}`,

  // a saying set big, centred, a giant quotation mark over it
  quote: p => `${top(p)}<i class="qt-mark">“</i><blockquote class="qt fit">${words(p.title)}</blockquote>${p.by ? `<p class="qt-by">${esc(p.by)}</p>` : ''}${foot(p)}`,

  // words in pills, stacked and a little off-kilter, each its own colour
  stack: p => `${top(p)}${h(p.title, 'sk-h mid')}<div class="sk">${(p.items || []).map((w, i) => `<span style="--t:${(i % 3 - 1) * 3}deg" class="sk-${i % 3}">${esc(w)}</span>`).join('')}</div>${foot(p)}`,

  // a question with lettered answers
  quiz: p => `${top(p)}<div class="qz-h fit-w">${esc(p.word || 'Quiz')}</div><p class="qz-q fit">${words(p.title)}</p><ol class="qz">${(p.items || []).map((o, i) => `<li><b>${'ABCD'[i]}</b>${esc(o)}</li>`).join('')}</ol><p class="note">${esc(p.note || 'Answer in the comments')}</p>${foot(p)}`,

  // Swiss: one word edge to edge, details small on a two-column grid
  swiss: p => `<div class="sw-word fit-w">${esc(p.word)}</div>${h(p.title, 'sw-h mid')}<div class="sw-cols"><p>${words(p.sub || '')}</p><ul>${(p.items || []).map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>${foot(p)}`,

  // a ticket: from and to, a tear line, a stub
  ticket: p => `${top(p)}${h(p.title, 'tk-h')}<div class="tk"><div class="tk-main"><div class="tk-row"><div><small>From</small><b>${esc(p.from)}</b><span>${esc(p.fromName)}</span></div><div class="tk-arrow">→</div><div><small>To</small><b>${esc(p.to)}</b><span>${esc(p.toName)}</span></div></div>
    <div class="tk-grid">${(p.fields || []).map(([k, v]) => `<div><small>${esc(k)}</small><span>${esc(v)}</span></div>`).join('')}</div></div><div class="tk-stub"><span>${esc(p.stub || BRAND.handle)}</span></div></div>${foot(p)}`,

  // a tip on a paper card
  tip: p => `${top(p)}${chip(p.kicker || 'Tip', p.icon)}${h(p.title, 'tp-h')}<div class="paper tp-paper"><p class="tp-body fit">${words(p.body)}</p></div>${cta('at-foot', p)}${foot(p, { phone: false })}`,

  // the picture huge, running off the corner; the line top-left
  corner: p => `${top(p)}<div class="cn-col">${h(p.title, 'cn-h')}${sub(p.sub, 'cn-sub')}</div>${art(p.art, 'cn-art')}<footer class="foot">${handle()}</footer>`,

  // places as pills
  places: p => `${top(p)}${h(p.title, 'pl-h')}<ul class="pl">${(p.items || BRAND.places || []).map(a => `<li>${esc(a)}</li>`).join('')}</ul><p class="note">${esc(p.note || 'Which one is yours?')}</p>${foot(p)}`,
};
export default base;
