// ── Zoom sync across pages ──
// Intercepts Ctrl+scroll and Ctrl+±/0, saves to localStorage, restores on load.
(function () {
  var KEY = 'site-zoom';
  var MIN = 0.6, MAX = 2.0, STEP = 0.1;

  function get() {
    return parseFloat(localStorage.getItem(KEY)) || 1;
  }

  function apply(z) {
    z = Math.max(MIN, Math.min(MAX, Math.round(z * 10) / 10));
    localStorage.setItem(KEY, z);
    document.documentElement.style.zoom = z;
  }

  // Apply saved zoom immediately (before paint)
  document.documentElement.style.zoom = get();

  // Ctrl+scroll
  window.addEventListener('wheel', function (e) {
    if (!e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    apply(get() + (e.deltaY < 0 ? STEP : -STEP));
  }, { passive: false });

  // Ctrl + / - / 0
  window.addEventListener('keydown', function (e) {
    if (!e.ctrlKey && !e.metaKey) return;
    var k = e.key;
    if (k === '+' || k === '=' || k === 'Add') { e.preventDefault(); apply(get() + STEP); }
    else if (k === '-' || k === 'Subtract')    { e.preventDefault(); apply(get() - STEP); }
    else if (k === '0')                         { e.preventDefault(); apply(1); }
  });
})();

// ── Active nav link ──
(function () {
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
})();

// ── Burger + mobile drawer ──
(function () {
  var nav = document.querySelector('nav.site-nav');
  if (!nav) return;

  var burger = document.createElement('button');
  burger.className = 'nav-burger';
  burger.setAttribute('aria-label', 'Toggle menu');
  burger.innerHTML = '<span></span><span></span><span></span>';
  nav.appendChild(burger);

  var links = nav.querySelectorAll('.nav-links a');
  var cta   = nav.querySelector('.nav-cta');

  var drawer = document.createElement('nav');
  drawer.className = 'nav-mobile';

  links.forEach(function (a) {
    var clone = document.createElement('a');
    clone.href = a.href;
    clone.textContent = a.textContent;
    if (a.classList.contains('active')) clone.classList.add('active');
    drawer.appendChild(clone);
  });

  if (cta) {
    var ctaClone = document.createElement('a');
    ctaClone.href = cta.href;
    ctaClone.textContent = cta.textContent;
    ctaClone.className = 'nav-mobile-cta';
    drawer.appendChild(ctaClone);
  }

  document.body.appendChild(drawer);

  burger.addEventListener('click', function () {
    var open = drawer.classList.toggle('open');
    burger.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  drawer.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      drawer.classList.remove('open');
      burger.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();
