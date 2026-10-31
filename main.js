/* Saranay demo: menu toggle + copy location pin. The mobile CTA bar is pinned in CSS. No tracking, no dependencies. */
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
