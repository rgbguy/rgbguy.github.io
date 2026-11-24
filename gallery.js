// ── Gallery lightbox: click a .gallery-item photo to see it large ──
// Arrow keys or the side buttons step through every photo on the page.
(function () {
  var items = [].slice.call(document.querySelectorAll('.gallery-item'));
  if (!items.length || !window.HTMLDialogElement) return;

  var box = document.createElement('dialog');
  box.className = 'lightbox';
  box.setAttribute('aria-label', 'Photo');
  box.innerHTML =
    '<img alt="" />' +
    '<p class="lightbox-cap"></p>' +
    '<button type="button" class="lightbox-btn lightbox-prev" aria-label="Previous photo">&#8592;</button>' +
    '<button type="button" class="lightbox-btn lightbox-next" aria-label="Next photo">&#8594;</button>' +
    '<button type="button" class="lightbox-btn lightbox-close" aria-label="Close">&#215;</button>';
  document.body.appendChild(box);

  var img = box.querySelector('img');
  var cap = box.querySelector('.lightbox-cap');
  var at = 0;

  function show(i) {
    at = (i + items.length) % items.length;
    var src = items[at].querySelector('img');
    img.src = src.src;
    img.alt = src.alt;
    cap.textContent = items[at].querySelector('figcaption').textContent;
  }

  items.forEach(function (it, i) {
    it.querySelector('.gallery-open').addEventListener('click', function () { show(i); box.showModal(); });
  });
  box.querySelector('.lightbox-prev').addEventListener('click', function () { show(at - 1); });
  box.querySelector('.lightbox-next').addEventListener('click', function () { show(at + 1); });
  box.querySelector('.lightbox-close').addEventListener('click', function () { box.close(); });
  box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  box.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') show(at - 1);
    if (e.key === 'ArrowRight') show(at + 1);
  });
})();
