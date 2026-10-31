/* Saranay demo: menu toggle, copy location pin, chooser, dock, clocks, and (v3.4) consent + dataLayer events.
   No dependencies. Tracking only pushes to window.dataLayer; nothing is sent anywhere until the owners add a real
   GTM container ID in index.html AND the visitor accepts cookies (Consent Mode v2, denied by default). */

/* v3.4 · dataLayer events, per the Saranay conversion tracking plan (31 Oct 2026). Must run before the chooser so
   a ?play= deep link is recorded as chooser_select with selection_method "deep_link". */
var SARANAY_UTM = 'utm_source=saranay_site&utm_medium=referral&utm_campaign=site_booking&utm_content=';
function saranayTag(href, loc) {
  if (/^https:\/\/(reclub\.co|app\.sports360\.ph)\//.test(href)) return href + (href.indexOf('?') < 0 ? '?' : '&') + SARANAY_UTM + loc;
  if (/^https:\/\/m\.me\//.test(href)) return href + '?ref=' + loc;
  return href;
}
(function () {
  var dl = window.dataLayer = window.dataLayer || [];
  var booting = true, play = null, split = null;
  try { play = new URL(location.href).searchParams.get('play'); } catch (e) {}
  setTimeout(function () { booting = false; }, 0);
  document.addEventListener('saranay:path', function (e) {
    play = e.detail || null;
    dl.push({ event: 'chooser_select', path: e.detail || 'none', selection_method: booting ? 'deep_link' : 'chip' });
  });
  var EVENTS = { reclub: 'click_reclub', sports360: 'click_sports360', messenger: 'click_messenger', instagram: 'click_instagram',
    ig_dm: 'click_ig_dm', call: 'click_call', directions: 'click_directions' };
  function destOf(a) {
    if (a.dataset.dest) return a.dataset.dest;
    var h = a.href;
    if (/reclub\.co/.test(h)) return 'reclub';
    if (/app\.sports360\.ph/.test(h)) return 'sports360';
    if (/^https:\/\/m\.me\//.test(h)) return 'messenger';
    if (/ig\.me\//.test(h)) return 'ig_dm';
    if (/instagram\.com/.test(h)) return 'instagram';
    if (/^tel:/.test(h)) return 'call';
    if (/maps\.app\.goo\.gl|google\.com\/maps/.test(h)) return 'directions';
    return null;
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var d = destOf(a), ev = d && EVENTS[d];
    if (!ev) return;
    var p = { event: ev, cta_location: a.dataset.cta || 'unlabeled', link_url: a.href, play_context: play || 'none' };
    if (d === 'sports360' && split) p.split_estimate = split;
    dl.push(p);
    var bar = a.closest('#cta-bar');
    if (bar) dl.push({ event: 'sticky_bar_click', bar_context: bar.dataset.ctx || 'none', cta_location: p.cta_location });
  }, true);
  var pin = document.getElementById('copy-pin');
  if (pin) pin.addEventListener('click', function () { dl.push({ event: 'click_directions', cta_location: 'find_us_copy_pin', link_url: 'copy-pin', play_context: play || 'none' }); });
  [].forEach.call(document.querySelectorAll('#faq details'), function (d) {
    d.addEventListener('toggle', function () { if (d.open) dl.push({ event: 'faq_open', faq_question: d.querySelector('summary').textContent.trim() }); });
  });
  var form = document.getElementById('split');
  if (form) {
    var used = false;
    var mark = function (e) {
      if (e.type === 'click' && !(e.target.closest && e.target.closest('.stepper__btn'))) return;
      setTimeout(function () {
        var each = document.getElementById('split-each');
        split = each ? each.textContent.trim() : null;
        if (!used) { used = true; dl.push({ event: 'split_calc_use', split_estimate: split }); }
      }, 0);
    };
    form.addEventListener('input', mark); form.addEventListener('click', mark);
  }
  var marks = [25, 50, 75, 90], ticking = false;
  function depth() {
    ticking = false;
    var doc = document.documentElement, pct = (window.scrollY + window.innerHeight) / doc.scrollHeight * 100;
    while (marks.length && pct >= marks[0]) dl.push({ event: 'scroll_depth', percent_scrolled: marks.shift() });
    if (!marks.length) window.removeEventListener('scroll', onScroll);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(depth); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  var cafe = document.getElementById('cafe');
  if (cafe && 'IntersectionObserver' in window) {
    var t = null;
    var io = new IntersectionObserver(function (es) {
      var vis = es[0].intersectionRatio >= 0.5 || es[0].intersectionRect.height >= window.innerHeight * 0.5;
      if (vis && !t) t = setTimeout(function () { dl.push({ event: 'cafe_menu_view', play_context: play || 'none' }); io.disconnect(); }, 2000);
      if (!vis && t) { clearTimeout(t); t = null; }
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    io.observe(cafe);
  }
})();

/* v3.4 · Cookie consent banner (RA 10173 + Consent Mode v2). Default is denied (set in <head>). The choice is kept in
   localStorage; "Change cookie choice" in the privacy notice reopens the banner. */
(function () {
  var box = document.getElementById('consent');
  if (!box) return;
  var KEY = 'saranay_consent', stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  function show() { box.hidden = false; }
  function choose(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    /* v3.4.1: Accept grants analytics_storage ONLY. Ad storage, ad user data and ad personalization stay denied always. */
    var state = { analytics_storage: v, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
    if (typeof gtag === 'function') gtag('consent', 'update', state);
    (window.dataLayer = window.dataLayer || []).push({ event: 'consent_update', consent: v, analytics_storage: state.analytics_storage, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    var had = box.contains(document.activeElement);
    box.hidden = true;
    if (had) { var nx = document.querySelector('.brand'); if (nx) nx.focus(); }
  }
  [].forEach.call(box.querySelectorAll('[data-consent]'), function (b) { b.addEventListener('click', function () { choose(b.dataset.consent); }); });
  var reopen = document.getElementById('consent-open');
  if (reopen) reopen.addEventListener('click', function () { show(); box.querySelector('[data-consent]').focus(); });
  if (stored !== 'granted' && stored !== 'denied') show();
})();

/* v3.4 · Next open play chip: Fri to Sun, about 6 PM, ₱150 per player (posted pattern). Manila clock. Never availability. */
(function () {
  var el = document.getElementById('hero-next');
  if (!el || !window.Intl) return;
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function tick() {
    var parts = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' })
      .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var base = Date.UTC(+parts.year, +parts.month - 1, +parts.day);  // Manila calendar date, held in UTC
    var mins = (+parts.hour % 24) * 60 + +parts.minute;
    for (var i = 0; i < 8; i++) {
      var d = new Date(base + i * 864e5), wd = d.getUTCDay();
      if ((wd === 5 || wd === 6 || wd === 0) && (i > 0 || mins < 18 * 60)) break;
    }
    var when = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : DAYS[wd] + ' ' + d.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'short', day: 'numeric' });
    el.innerHTML = '';
    var b = document.createElement('b'); b.textContent = 'Next open play';
    el.appendChild(b); el.appendChild(document.createTextNode(': ' + when + ' · ~6 PM · ₱150/player'));
    el.hidden = false;
  }
  tick(); setInterval(tick, 60000);
})();

/* Menu toggle + copy location pin */
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  var desktop = window.matchMedia('(min-width: 60rem)');

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    if (open || desktop.matches) nav.removeAttribute('hidden'); else nav.setAttribute('hidden', '');
  }
  function sync() { setOpen(false); }
  sync();
  desktop.addEventListener ? desktop.addEventListener('change', sync) : desktop.addListener(sync);

  toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a') && !desktop.matches) setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
  });

  // Copy location pin (for Grab / tricycle), with an aria-live confirmation.
  var pin = document.getElementById('copy-pin');
  var status = document.getElementById('copy-status');
  if (pin && status) {
    var text = pin.getAttribute('data-copy');
    function done(ok) {
      status.textContent = ok ? 'Copied. Paste it into Grab, Maps or a message.' : 'Could not copy. Our address: ' + text;
      status.classList.toggle('is-done', ok);
    }
    function fallback() {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); done(ok);
    }
    pin.addEventListener('click', function () {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(function () { done(true); }, fallback);
      else fallback();
    });
  }
})();

/* v2.0 "How are you playing?" chooser.
   Enhances four plain links into toggle buttons. Picking one swaps the hero buttons for that path
   and moves the matching sections to just under the hero (real DOM order, so focus order matches).
   ?play=open|rent|cafe|first preselects a path, for ad links. Pick again to undo. */
(function () {
  var box = document.getElementById('chooser');
  var panels = document.getElementById('chooser-panels');
  if (!box || !panels) return;
  var opts = [].slice.call(box.querySelectorAll('.chooser__opt'));
  var hero = document.getElementById('top');
  var main = document.getElementById('main');
  var order = [].slice.call(main.children); // original order, for undo
  var MOVE = { open: ['coming-up', 'open-play'], rent: ['rates', 'rent'], cafe: ['cafe', 'find-us'], first: ['new', 'open-play'] };
  var current = null;

  function restore() { order.forEach(function (n) { main.appendChild(n); }); }
  function pick(path, fromUser) {
    if (path === current) path = null;
    current = path;
    opts.forEach(function (o) { o.setAttribute('aria-pressed', String(o.dataset.path === path)); });
    [].forEach.call(panels.children, function (p) { p.hidden = p.dataset.panel !== (path || 'all'); });
    restore();
    if (path) {
      var anchor = hero.nextSibling;
      MOVE[path].forEach(function (id) { var el = document.getElementById(id); if (el) { main.insertBefore(el, anchor); anchor = el.nextSibling; } });
      if (fromUser) { var first = document.getElementById(MOVE[path][0]); first.classList.remove('is-picked'); void first.offsetWidth; first.classList.add('is-picked'); }
    }
    try { var u = new URL(location.href); if (path) u.searchParams.set('play', path); else u.searchParams.delete('play'); history.replaceState(null, '', u); } catch (e) {}
    document.dispatchEvent(new CustomEvent('saranay:path', { detail: path }));
  }
  opts.forEach(function (o) {
    o.setAttribute('role', 'button');
    o.setAttribute('aria-pressed', 'false');
    o.setAttribute('aria-controls', 'chooser-panels');
    o.addEventListener('click', function (e) { e.preventDefault(); pick(o.dataset.path, true); });
    o.addEventListener('keydown', function (e) { if (e.key === ' ') { e.preventDefault(); pick(o.dataset.path, true); } });
  });
  var q = null; try { q = new URL(location.href).searchParams.get('play'); } catch (e) {}
  if (q && MOVE[q]) pick(q, false);
})();

/* v2.1 day strip: place a "Now" marker at the current Manila time on the 6 AM to 2 AM price bar.
   This is the clock only. It says nothing about whether the court is free. */
(function () {
  var marker = document.getElementById('daystrip-marker');
  var now = document.getElementById('daystrip-now');
  if (!marker || !now || !window.Intl) return;
  function update() {
    var parts = {};
    new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', minute: 'numeric', hour12: false })
      .formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var h = (parseInt(parts.hour, 10) % 24) + parseInt(parts.minute, 10) / 60;
    var label = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', minute: '2-digit' }).format(new Date());
    var open = h >= 6 || h < 2;
    if (!open) { marker.hidden = true; now.textContent = 'Now in Manila, ' + label + ': closed. Opens 6 AM.'; now.hidden = false; return; }
    var pos = h >= 6 ? h - 6 : h + 18; // hours since 6 AM, 0 to 20
    var rate = (h >= 10 && h < 16) ? '₱200' : '₱300';
    marker.style.setProperty('--now', (pos / 20 * 100).toFixed(2) + '%');
    marker.hidden = false;
    now.textContent = 'Now in Manila, ' + label + ': ' + rate + '/hour';
    now.hidden = false;
  }
  update(); setInterval(update, 60000);
})();

/* v2.2 · Split the court: per-person estimate from posted rates and player caps */
(function () {
  var form = document.getElementById('split');
  if (!form) return;
  var art = document.querySelector('[data-split-fallback]');
  form.hidden = false;
  if (art) art.hidden = true;
  var players = form.querySelector('#split-players');
  var hours = form.querySelector('#split-hours');
  var paddles = form.querySelector('#split-paddles');
  var each = form.querySelector('#split-each');
  var brk = form.querySelector('#split-break');
  var peso = function (n) { return '₱' + Math.round(n).toLocaleString('en-PH'); };
  var clamp = function (el) {
    var v = parseInt(el.value, 10), mn = +el.min, mx = +el.max;
    if (isNaN(v)) v = mn;
    return Math.min(mx, Math.max(mn, v));
  };
  function update() {
    var p = clamp(players), h = clamp(hours), pad = Math.min(clamp(paddles), p);
    if (+paddles.value > p) paddles.value = pad;
    var rate = +(form.querySelector('input[name="split-rate"]:checked') || {}).value || 200;
    var cap = h >= 3 ? 12 : h * 4;
    var extra = Math.max(0, p - cap);
    var court = rate * h, total = court + extra * 100 + pad * 100;
    each.textContent = peso(total / p);
    var parts = ['Court ' + peso(court)];
    if (extra) parts.push(extra + ' extra player' + (extra > 1 ? 's' : '') + ' ' + peso(extra * 100));
    if (pad) parts.push(pad + ' paddle' + (pad > 1 ? 's' : '') + ' ' + peso(pad * 100));
    parts.push('Total ' + peso(total));
    brk.textContent = parts.join(' · ') + '. ' + h + (h > 1 ? ' hours cover' : ' hour covers') + ' up to ' + cap + ' players.';
    form.querySelectorAll('.stepper__btn').forEach(function (b) {
      var el = form.querySelector('#' + b.dataset.for), v = clamp(el);
      var mx = el === paddles ? Math.min(+el.max, p) : +el.max;
      b.disabled = b.dataset.step < 0 ? v <= +el.min : v >= mx;
    });
  }
  form.addEventListener('click', function (e) {
    var b = e.target.closest('.stepper__btn');
    if (!b) return;
    var el = form.querySelector('#' + b.dataset.for);
    el.value = clamp(el) + (+b.dataset.step);
    el.value = clamp(el);
    if (el !== paddles && +paddles.value > clamp(players)) paddles.value = clamp(players);
    update();
  });
  form.addEventListener('input', update);
  form.addEventListener('change', function (e) { if (e.target.type === 'number') e.target.value = clamp(e.target); update(); });
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  update();
})();

/* v2.3 · Context dock: the sticky bar swaps its summary and main action for the section in view */
(function () {
  var bar = document.getElementById('cta-bar');
  if (!bar || !('IntersectionObserver' in window)) return;
  var S360 = 'https://app.sports360.ph/sportshub/saranay-pickleball-court';
  var RECLUB = 'https://reclub.co/clubs/@saranay-pickleball-club';
  var MSG = 'https://m.me/61589930970148';
  var CTX = {
    play: { big: 'Open play', small: 'All levels · Join on Reclub', label: 'Join open play', href: RECLUB, cta: 'sticky_bar_join_open_play', dest: 'reclub', ext: ' on Reclub (opens in a new tab)' },
    court: { big: 'From ₱200/hour', small: 'Whole court · Book on Sports360', label: 'Book a court', href: S360, cta: 'sticky_bar_book_a_court', dest: 'sports360', ext: ' on Sports360 (opens in a new tab)' },
    cafe: { big: "D' Rafael's Cafe", small: 'At the court · Hours TBC', label: 'Message us', href: MSG, cta: 'sticky_bar_message_us', dest: 'messenger' }
  };
  var BY_SECTION = { 'coming-up': 'play', 'open-play': 'play', 'new': 'play', 'rates': 'court', 'rent': 'court', 'cafe': 'cafe', 'find-us': 'cafe' };
  var BY_PATH = { open: 'play', first: 'play', rent: 'court', cafe: 'cafe' };
  var base = 'play';
  try { base = BY_PATH[new URL(location.href).searchParams.get('play')] || 'play'; } catch (e) {}
  bar.classList.add('dock');
  bar.innerHTML = '<p class="dock__sum" style="margin:0"><span class="dock__big"><span class="dock__ctx" aria-hidden="true"></span><span data-dock="big"></span></span><span class="dock__small" data-dock="small"></span></p><a class="btn btn--ball" data-dock="btn"></a>';
  var big = bar.querySelector('[data-dock="big"]'), small = bar.querySelector('[data-dock="small"]'), btn = bar.querySelector('[data-dock="btn"]');
  var split = null, cur = null, inView = null;
  function render(key) {
    var c = CTX[key];
    var b = c.big, sm = c.small;
    if (key === 'court' && split) { b = split.each + ' each'; sm = split.players + ' players · ' + split.hours + (split.hours > 1 ? ' hours' : ' hour') + ' · estimate'; }
    var changed = key !== cur;
    cur = key;
    bar.dataset.ctx = key;
    big.textContent = b; small.textContent = sm;
    btn.textContent = c.label; btn.href = saranayTag(c.href, c.cta); btn.dataset.cta = c.cta; btn.dataset.dest = c.dest;
    if (c.ext) { btn.target = '_blank'; btn.rel = 'noopener'; btn.setAttribute('aria-label', c.label + c.ext); }
    else { btn.removeAttribute('target'); btn.removeAttribute('rel'); btn.removeAttribute('aria-label'); }
    if (changed) { bar.classList.remove('is-swapping'); void bar.offsetWidth; bar.classList.add('is-swapping'); }
  }
  function refresh() { render(inView || base); }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) inView = BY_SECTION[e.target.id] || null; });
    refresh();
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['top', 'coming-up', 'open-play', 'rates', 'rent', 'new', 'cafe', 'find-us', 'about', 'book', 'faq'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  document.addEventListener('saranay:path', function (e) { base = BY_PATH[e.detail] || 'play'; refresh(); });
  var form = document.getElementById('split');
  if (form) form.addEventListener('input', sync), form.addEventListener('click', function () { setTimeout(sync, 0); });
  function sync() {
    var each = document.getElementById('split-each');
    split = { each: each.textContent, players: form.querySelector('#split-players').value, hours: +form.querySelector('#split-hours').value };
    refresh();
  }
  refresh();
})();

/* v2.5.1 · Keep --cta-bar-h equal to the pinned bar's real height, so page padding and scroll clearance always match */
(function () {
  var bar = document.getElementById('cta-bar');
  if (!bar || !('ResizeObserver' in window)) return;
  var root = document.documentElement;
  new ResizeObserver(function () {
    var h = bar.offsetHeight;
    if (h > 0) root.style.setProperty('--cta-bar-h', h + 'px');
    else root.style.removeProperty('--cta-bar-h');
  }).observe(bar);
  /* Keyboard focus moving into the map embed: bring the whole map clear of the bar */
  window.addEventListener('blur', function () {
    setTimeout(function () {
      var f = document.activeElement;
      if (f && f.tagName === 'IFRAME' && bar.offsetHeight) f.scrollIntoView({ block: 'nearest' });
    }, 0);
  });
})();

/* v3.0 · Tuck the mobile bar while the hero's own booking buttons are on screen, so the first screen shows them once, uncovered.
   While tucked the bar is inert, so keyboard focus skips it. */
(function () {
  var bar = document.getElementById('cta-bar');
  var lead = document.getElementById('chooser-panels');
  if (!bar || !lead || !('IntersectionObserver' in window)) return;
  function set(tuck) { bar.classList.toggle('is-tucked', tuck); if (tuck) bar.setAttribute('inert', ''); else bar.removeAttribute('inert'); }
  new IntersectionObserver(function (es) { set(es[0].isIntersecting); }, { threshold: 0.35 }).observe(lead);
})();

/* v3.1 · Open-now chip: Manila clock vs posted hours (6 AM to 2 AM daily) and Sports360 rates. Never shows availability. */
(function () {
  var el = document.getElementById('hero-status');
  if (!el || !window.Intl) return;
  function tick() {
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    var h = parseInt(parts.filter(function (p) { return p.type === 'hour'; })[0].value, 10) % 24; // Manila hour 0-23 on any device timezone
    var open = h >= 6 || h < 2;
    var rate = h >= 10 && h < 16 ? 200 : 300;
    el.classList.toggle('is-closed', !open);
    el.textContent = open ? 'Open now · court ₱' + rate + '/hour · till 2 AM' : 'Closed now · opens 6 AM';
    el.hidden = false;
  }
  tick(); setInterval(tick, 60000);
})();
