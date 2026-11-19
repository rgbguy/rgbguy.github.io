// ── Learn hub: track tabs (kept in the URL hash) and topic filters ──
(function () {
  var tabs = document.querySelectorAll('.track-tab');
  var panels = document.querySelectorAll('.track-panel');
  if (!tabs.length) return;

  function show(id) {
    var found = false;
    panels.forEach(function (p) { if (p.getAttribute('data-track') === id) found = true; });
    if (!found) id = panels[0].getAttribute('data-track');
    tabs.forEach(function (t) { t.setAttribute('aria-selected', String(t.getAttribute('data-track') === id)); });
    panels.forEach(function (p) { p.hidden = p.getAttribute('data-track') !== id; });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function (e) {
      e.preventDefault();
      var id = t.getAttribute('data-track');
      history.replaceState(null, '', '#' + id);
      show(id);
    });
  });
  window.addEventListener('hashchange', function () { show(location.hash.slice(1)); });
  show(location.hash.slice(1));

  panels.forEach(function (p) {
    var chips = p.querySelectorAll('[data-filter]');
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        var f = c.getAttribute('data-filter');
        chips.forEach(function (o) { o.classList.toggle('active', o === c); });
        p.querySelectorAll('.lesson-grid .lesson-card').forEach(function (card) {
          var tags = (card.getAttribute('data-tags') || '').split(' ');
          card.hidden = f !== 'all' && tags.indexOf(f) < 0;
        });
      });
    });
  });
})();
