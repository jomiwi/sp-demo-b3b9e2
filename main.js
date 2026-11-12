function saranayGA(name, params) {
  try { if (window.SARANAY_TAG_MODE === 'gtag' && window.saranayGAOn && localStorage.getItem('saranay_consent') === 'granted' && typeof gtag === 'function') gtag('event', name, params); } catch (e) {}
}
function saranayConsent() { try { return localStorage.getItem('saranay_consent') === 'granted' ? 'granted' : 'denied'; } catch (e) { return 'denied'; } }
var SARANAY_UTM = 'utm_source=saranay_site&utm_medium=referral&utm_campaign=site_booking&utm_content=';
function saranayTag(href, loc) {
  if (/^https:\/\/(reclub\.co|app\.sports360\.ph)\//.test(href)) return href + (href.indexOf('?') < 0 ? '?' : '&') + SARANAY_UTM + loc;
  return href;
}
(function () {
  var dl = window.dataLayer = window.dataLayer || [];
  function dlEvent(o) { o.analytics_consent = saranayConsent(); dl.push(o); }
  var booting = true, play = null, split = null;
  try { play = new URL(location.href).searchParams.get('play'); } catch (e) {}
  setTimeout(function () { booting = false; }, 0);
  document.addEventListener('saranay:path', function (e) {
    play = e.detail || null;
    dlEvent({ event: 'chooser_select', path: e.detail || 'none', selection_method: booting ? 'deep_link' : 'chip' });
  });
  var EVENTS = { reclub: 'click_reclub', sports360: 'click_sports360', messenger: 'click_messenger', instagram: 'click_instagram',
    ig_dm: 'click_ig_dm', call: 'click_call', directions: 'click_directions', tiktok: 'click_tiktok' };
  function destOf(a) {
    if (a.dataset.dest) return a.dataset.dest;
    var h = a.href;
    if (/reclub\.co/.test(h)) return 'reclub';
    if (/app\.sports360\.ph/.test(h)) return 'sports360';
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
    if (!ev && /\/cafe\/$/.test(a.pathname) && a.origin === location.origin && !a.dataset.path && !/\/cafe\/$/.test(location.pathname)) {
      var cp = { cta_location: a.dataset.cta || 'unlabeled', link_url: a.href, play_context: play || 'none' };
      dlEvent({ event: 'cafe_link_click', cta_location: cp.cta_location, link_url: cp.link_url, play_context: cp.play_context });
      saranayGA('cafe_link_click', cp); return;
    }
    if (!ev) return;
    var p = { event: ev, cta_location: a.dataset.cta || 'unlabeled', link_url: a.href, play_context: play || 'none' };
    if (d === 'sports360') p.cta_location = 'rates_citation';
    if (d === 'sports360' && split) p.split_estimate = split;
    dlEvent(p);
    saranayGA(ev, { cta_location: p.cta_location, link_url: p.link_url, play_context: p.play_context });
    if (d === 'reclub') { var jp = { cta_location: p.cta_location, link_url: p.link_url, play_context: p.play_context }; dlEvent(Object.assign({ event: 'join_open_play_click' }, jp)); saranayGA('join_open_play_click', jp); }
    if (a.dataset.lesson) { var lp = { cta_location: p.cta_location, link_url: p.link_url, play_context: p.play_context, lesson_channel: d }; dlEvent(Object.assign({ event: 'lesson_click' }, lp)); saranayGA('lesson_click', lp); }
    var bar = a.closest('#cta-bar');
    if (bar) dlEvent({ event: 'sticky_bar_click', bar_context: bar.dataset.ctx || 'none', cta_location: p.cta_location });
  }, true);
  var pin = document.getElementById('copy-pin');
  if (pin) pin.addEventListener('click', function () { dlEvent({ event: 'click_directions', cta_location: 'find_us_copy_pin', link_url: 'copy-pin', play_context: play || 'none' }); });
  [].forEach.call(document.querySelectorAll('#faq details'), function (d) {
    d.addEventListener('toggle', function () { if (d.open) dlEvent({ event: 'faq_open', faq_question: d.querySelector('summary').textContent.trim() }); });
  });
  var form = document.getElementById('split');
  if (form) {
    var used = false;
    var mark = function (e) {
      if (e.type === 'click' && !(e.target.closest && e.target.closest('.stepper__btn'))) return;
      setTimeout(function () {
        var each = document.getElementById('split-each');
        split = each ? each.textContent.trim() : null;
        if (!used) { used = true; dlEvent({ event: 'split_calc_use', split_estimate: split }); }
      }, 0);
    };
    form.addEventListener('input', mark); form.addEventListener('click', mark);
  }
  var marks = [25, 50, 75, 90], ticking = false;
  function depth() {
    ticking = false;
    var doc = document.documentElement, pct = (window.scrollY + window.innerHeight) / doc.scrollHeight * 100;
    while (marks.length && pct >= marks[0]) dlEvent({ event: 'scroll_depth', percent_scrolled: marks.shift() });
    if (!marks.length) window.removeEventListener('scroll', onScroll);
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(depth); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  var cafe = document.getElementById('cafe');
  if (cafe && 'IntersectionObserver' in window) {
    var t = null;
    var io = new IntersectionObserver(function (es) {
      var vis = es[0].intersectionRatio >= 0.5 || es[0].intersectionRect.height >= window.innerHeight * 0.5;
      if (vis && !t) t = setTimeout(function () { dlEvent({ event: 'cafe_menu_view', play_context: play || 'none' }); io.disconnect(); }, 2000);
      if (!vis && t) { clearTimeout(t); t = null; }
    }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    io.observe(cafe);
  }
})();
(function () {
  var box = document.getElementById('consent');
  if (!box) return;
  var KEY = 'saranay_consent', stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  var chip = document.getElementById('hero-next');
  function fit() {
    var root = document.documentElement.style;
    root.removeProperty('--consent-h');
    if (chip) chip.style.marginTop = '';
    if (box.hidden || getComputedStyle(box).top !== '0px') return;
    root.setProperty('--consent-h', Math.ceil(box.getBoundingClientRect().bottom) + 'px'); 
    if (!chip || chip.hidden) return;
    var over = box.getBoundingClientRect().bottom + 8 - (chip.getBoundingClientRect().top + window.scrollY);
    if (over > 0) chip.style.marginTop = Math.ceil(over) + 'px';
  }
  function show() { box.hidden = false; fit(); }
  window.addEventListener('resize', function () { if (!box.hidden) fit(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (!box.hidden) fit(); });
  function choose(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
    var state = { analytics_storage: v, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' };
    if (typeof gtag === 'function') gtag('consent', 'update', state);
    if (v === 'granted' && typeof window.saranayLoadGA === 'function') window.saranayLoadGA(); 
    (window.dataLayer = window.dataLayer || []).push({ event: 'consent_update', analytics_consent: v, consent: v, analytics_storage: state.analytics_storage, ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    var had = box.contains(document.activeElement);
    box.hidden = true;
    fit();
    if (had) { var nx = document.querySelector('.brand'); if (nx) nx.focus(); }
  }
  [].forEach.call(box.querySelectorAll('[data-consent]'), function (b) { b.addEventListener('click', function () { choose(b.dataset.consent); }); });
  var reopen = document.getElementById('consent-open');
  if (reopen) reopen.addEventListener('click', function () { show(); box.querySelector('[data-consent]').focus(); });
  if (stored !== 'granted' && stored !== 'denied') show();
})();
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
(function () {
  var box = document.getElementById('chooser');
  var panels = document.getElementById('chooser-panels');
  if (!box || !panels) return;
  var opts = [].slice.call(box.querySelectorAll('.chooser__opt'));
  var hero = document.getElementById('top');
  var main = document.getElementById('main');
  var order = [].slice.call(main.children);
  var MOVE = { open: ['coming-up', 'open-play'], rent: ['rates', 'rent'], lessons: ['lessons', 'new'], cafe: ['cafe-teaser', 'find-us'], first: ['new', 'open-play'] }; 
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
    var bands = document.querySelectorAll('.daystrip__band'), bi = !open ? -1 : (h >= 6 && h < 10) ? 0 : (h >= 10 && h < 16) ? 1 : 2;
    [].forEach.call(bands, function (b, i) { b.classList.toggle('is-now', i === bi); });
    if (!open) { marker.hidden = true; now.textContent = 'Now in Manila, ' + label + ': closed. Opens 6 AM.'; now.hidden = false; return; }
    var pos = h >= 6 ? h - 6 : h + 18;
    var rate = (h >= 10 && h < 16) ? '₱200' : '₱300';
    marker.style.setProperty('--now', (pos / 20 * 100).toFixed(2) + '%');
    marker.hidden = false;
    now.textContent = 'Now in Manila, ' + label + ': ' + rate + '/hour';
    now.hidden = false;
  }
  update(); setInterval(update, 60000);
})();
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
    each.textContent = peso(total);
    var parts = ['Court ' + peso(court)];
    if (extra) parts.push(extra + ' extra player' + (extra > 1 ? 's' : '') + ' ' + peso(extra * 100));
    if (pad) parts.push(pad + ' paddle' + (pad > 1 ? 's' : '') + ' ' + peso(pad * 100));
    brk.textContent = '≈ ' + peso(total / p) + ' each · ' + parts.join(' · ');
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
(function () {
  var bar = document.getElementById('cta-bar');
  if (!bar) return;
  var staticBook = bar.querySelector('a[data-dest="book"]');
  var BOOK = staticBook ? staticBook.getAttribute('href') : 'book/?cta=sticky_bar_book_a_court';
  var RECLUB = 'https://reclub.co/clubs/@saranay-pickleball-club';
  var CAP = {
    play: ['Open play', 'All levels · come solo, we rotate you in'],
    court: ['Court', '₱200 to ₱300/hour · 6 AM to 2 AM daily'],
    cafe: ["D' Rafael's Cafe", 'Open during court bookings']
  };
  var BY_SECTION = { 'coming-up': 'play', 'open-play': 'play', 'new': 'play', 'rates': 'court', 'rent': 'court', 'cafe': 'cafe', 'cafe-teaser': 'cafe', 'lessons': 'play', 'find-us': 'court', 'welcome': 'play', 'start': 'play', 'family': 'court', 'getting-here': 'court', 'ready': 'play' };
  var BY_PATH = { open: 'play', first: 'play', rent: 'court', lessons: 'play', cafe: 'cafe' };
  var base = 'play';
  try { base = BY_PATH[new URL(location.href).searchParams.get('play')] || document.body.dataset.dockBase || 'play'; } catch (e) {}
  var CAL = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3 10h18M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
  var BALL = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="10" r="1.2" fill="currentColor"/><circle cx="15" cy="10" r="1.2" fill="currentColor"/><circle cx="12" cy="15" r="1.2" fill="currentColor"/></svg>';
  var TEL = 'tel:+639065458384';
  var PHONE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>';
  bar.classList.add('dock', 'dock--duo', 'dock--trio');
  bar.innerHTML = '<p class="dock__cap"><span class="dock__ctx" aria-hidden="true"></span><strong data-dock="big"></strong> <span data-dock="small"></span></p>' +
    '<a class="btn" data-dock="book" target="_blank" rel="noopener" data-cta="sticky_bar_book_a_court" data-dest="book" aria-label="Book a court (opens in a new tab)" href="' + BOOK + '">' + CAL + 'Book a court</a>' +
    '<a class="btn btn--ball" data-dock="join" target="_blank" rel="noopener" data-cta="sticky_bar_join_open_play" data-dest="reclub" aria-label="Join open play on Reclub (opens in a new tab)" href="' + saranayTag(RECLUB, 'sticky_bar_join_open_play') + '">' + BALL + 'Join open play</a>' +
    '<a class="btn btn--outline-light dock__call" data-dock="call" data-cta="sticky_bar_call" data-dest="call" aria-label="Call to book: +63 906 545 8384" href="' + TEL + '">' + PHONE + '</a>';
  var big = bar.querySelector('[data-dock="big"]'), small = bar.querySelector('[data-dock="small"]');
  var split = null, cur = null, inView = null;
  function render(key) {
    var b = CAP[key][0], sm = CAP[key][1];
    if (key === 'court' && split) { b = split.each; sm = split.players + ' players · ' + split.hours + (split.hours > 1 ? ' hours' : ' hour') + ' · estimate'; }
    var changed = key !== cur;
    cur = key; bar.dataset.ctx = key;
    big.textContent = b; small.textContent = sm;
    if (changed) { bar.classList.remove('is-swapping'); void bar.offsetWidth; bar.classList.add('is-swapping'); }
  }
  function refresh() { render(inView || base); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) inView = BY_SECTION[e.target.id] || null; });
      refresh();
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['top', 'coming-up', 'open-play', 'rates', 'rent', 'new', 'lessons', 'cafe', 'cafe-teaser', 'find-us', 'about', 'book', 'faq', 'welcome', 'start', 'family', 'getting-here', 'ready'].forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }
  document.addEventListener('saranay:path', function (e) { base = BY_PATH[e.detail] || document.body.dataset.dockBase || 'play'; refresh(); });
  var form = document.getElementById('split');
  if (form) form.addEventListener('input', sync), form.addEventListener('click', function () { setTimeout(sync, 0); });
  function sync() {
    var each = document.getElementById('split-each');
    split = { each: each.textContent, players: form.querySelector('#split-players').value, hours: +form.querySelector('#split-hours').value };
    refresh();
  }
  refresh();
})();
(function () {
  var bar = document.getElementById('cta-bar');
  if (!bar || !('ResizeObserver' in window)) return;
  var root = document.documentElement;
  new ResizeObserver(function () {
    var h = bar.offsetHeight;
    if (h > 0) root.style.setProperty('--cta-bar-h', h + 'px');
    else root.style.removeProperty('--cta-bar-h');
  }).observe(bar);
  window.addEventListener('blur', function () {
    setTimeout(function () {
      var f = document.activeElement;
      if (f && f.tagName === 'IFRAME' && bar.offsetHeight) f.scrollIntoView({ block: 'nearest' });
    }, 0);
  });
})();
(function () {
  var bar = document.getElementById('cta-bar');
  var lead = document.getElementById('chooser-panels') || document.getElementById('hero-ctas'); 
  if (!bar || !lead || !('IntersectionObserver' in window)) return;
  function set(tuck) { bar.classList.toggle('is-tucked', tuck); if (tuck) bar.setAttribute('inert', ''); else bar.removeAttribute('inert'); }
  new IntersectionObserver(function (es) { set(es[0].isIntersecting); }, { threshold: 0.35 }).observe(lead);
})();
(function () {
  var el = document.getElementById('hero-status');
  if (!el || !window.Intl) return;
  function tick() {
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Manila', hour: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
    var h = parseInt(parts.filter(function (p) { return p.type === 'hour'; })[0].value, 10) % 24;
    var open = h >= 6 || h < 2;
    var rate = h >= 10 && h < 16 ? 200 : 300;
    el.classList.toggle('is-closed', !open);
    el.textContent = open ? 'Open now · court ₱' + rate + '/hour · till 2 AM' : 'Closed now · opens 6 AM';
    el.hidden = false;
  }
  tick(); setInterval(tick, 60000);
})();
(function () {
  var frame = document.getElementById('map-frame'), wrap = document.getElementById('map-cta-js'), btn = document.getElementById('map-load');
  if (!frame || !wrap || !btn) return;
  wrap.hidden = false;
  btn.addEventListener('click', function () {
    var f = document.createElement('iframe');
    f.title = frame.getAttribute('data-map-title');
    f.src = frame.getAttribute('data-map-src');
    f.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    f.setAttribute('allowfullscreen', '');
    f.setAttribute('tabindex', '0');
    frame.textContent = '';
    frame.appendChild(f);
    frame.classList.add('is-live');
    var dn = document.getElementById('map-drawn-note'); if (dn) dn.remove();
    f.focus();
  });
})();
