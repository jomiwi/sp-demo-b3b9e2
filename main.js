/* Saranay demo: menu toggle + sticky mobile CTA bar. No tracking, no dependencies. */
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

  // Show the sticky CTA bar once the hero buttons scroll out of view.
  var bar = document.getElementById('cta-bar');
  var heroCtas = document.getElementById('hero-ctas');
  if ('IntersectionObserver' in window && bar && heroCtas) {
    new IntersectionObserver(function (entries) {
      var hidden = entries[0].isIntersecting;
      bar.classList.toggle('is-hidden', hidden);
      bar.querySelectorAll('a').forEach(function (a) { hidden ? a.setAttribute('tabindex', '-1') : a.removeAttribute('tabindex'); });
      bar.setAttribute('aria-hidden', String(hidden));
    }, { threshold: 0 }).observe(heroCtas);
  } else if (bar) { bar.classList.remove('is-hidden'); }
})();
