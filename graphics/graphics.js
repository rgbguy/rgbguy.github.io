// ── Graphics page: builds the sections, topic chips and cards from videos.js ──
// Nothing here needs editing to add a video: add an entry to videos.js.
(function () {
  var root = document.getElementById('gfx-root');
  if (!root || typeof GRAPHICS_VIDEOS === 'undefined') return;

  var NEW_FROM = typeof GRAPHICS_NEW_FROM === 'string' ? GRAPHICS_NEW_FROM : '9999-12-31';
  var TAG_ORDER = ['rendering', 'shaders', 'physics', 'engines', 'animation', 'procedural', 'ai', 'maths'];
  var TAG_LABEL = { ai: 'AI' };
  var BATCH = { 'new': 6, earlier: 12 };

  var videos = GRAPHICS_VIDEOS
    .filter(function (v) { return v && v.id && v.title; })
    .map(function (v) {
      return {
        id: v.id,
        title: v.title,
        date: v.date || '',
        tags: (v.tags || []).map(function (t) { return String(t).toLowerCase(); }),
        resources: (v.resources || []).filter(function (r) { return r && r.url; })
      };
    })
    .sort(function (a, b) { return a.date < b.date ? 1 : a.date > b.date ? -1 : 0; });

  function label(tag) { return TAG_LABEL[tag] || tag; }

  function fmtDate(iso) {
    var p = iso.split('-');
    if (p.length !== 3) return '';
    var m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][+p[1] - 1];
    return m ? (+p[2]) + ' ' + m + ' ' + p[0] : '';
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // ── One card ──
  function card(v, compact) {
    var c = el('article', 'short-card gfx-card' + (compact ? ' gfx-card--compact' : ''));

    var btn = el('button', 'lite-yt lite-yt--short');
    btn.type = 'button';
    btn.setAttribute('data-id', v.id);
    btn.setAttribute('data-title', v.title);
    btn.setAttribute('aria-label', 'Play: ' + v.title);
    var img = el('img');
    img.src = 'https://i.ytimg.com/vi/' + v.id + '/oar2.jpg';
    img.alt = '';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.width = 270;
    img.height = 480;
    img.onerror = function () { img.onerror = null; img.src = 'https://i.ytimg.com/vi/' + v.id + '/hqdefault.jpg'; };
    btn.appendChild(img);
    var play = el('span', 'lite-yt-play');
    play.setAttribute('aria-hidden', 'true');
    btn.appendChild(play);
    c.appendChild(btn);

    var meta = el('div', 'short-meta');
    meta.appendChild(el('h3', 'short-title', v.title));

    var line = el('div', 'gfx-line');
    var d = fmtDate(v.date);
    if (d) {
      var t = el('time', 'gfx-date', d);
      t.dateTime = v.date;
      line.appendChild(t);
    }
    var watch = el('a', 'gfx-watch', 'Watch on YouTube ↗');
    watch.href = 'https://www.youtube.com/shorts/' + v.id;
    watch.target = '_blank';
    watch.rel = 'noopener';
    watch.setAttribute('aria-label', 'Watch ' + v.title + ' on YouTube');
    line.appendChild(watch);
    meta.appendChild(line);

    if (!compact && v.tags.length) {
      var tags = el('div', 'gfx-tags');
      v.tags.forEach(function (tg) { tags.appendChild(el('span', 'gfx-tag', label(tg))); });
      meta.appendChild(tags);
    }

    // Resources only when there are some: never an empty box.
    if (v.resources.length) {
      var det = el('details', 'gfx-res');
      det.appendChild(el('summary', null, 'Resources (' + v.resources.length + ')'));
      var ul = el('ul');
      v.resources.forEach(function (r) {
        var li = el('li');
        var a = el('a', null, r.title || r.url);
        a.href = r.url;
        a.target = '_blank';
        a.rel = 'noopener';
        li.appendChild(a);
        ul.appendChild(li);
      });
      det.appendChild(ul);
      meta.appendChild(det);
    }

    c.appendChild(meta);
    return c;
  }

  // ── Sections ──
  function section(key, heading, sub, list, compact) {
    var s = el('section', 'page-section gfx-section gfx-section--' + key);
    var head = el('div', 'gfx-section-head');
    var h = el('h2', 'gfx-h2', heading);
    head.appendChild(h);
    if (sub) head.appendChild(el('p', 'gfx-section-sub', sub));
    s.appendChild(head);

    var grid = el('div', 'shorts-grid gfx-grid' + (compact ? ' gfx-grid--compact' : ''));
    var cards = list.map(function (v) {
      var c = card(v, compact);
      grid.appendChild(c);
      return { v: v, el: c };
    });
    s.appendChild(grid);

    var more = el('button', 'gfx-more');
    more.type = 'button';
    s.appendChild(more);

    var state = { el: s, h: h, cards: cards, more: more, shown: BATCH[key], batch: BATCH[key] };
    more.addEventListener('click', function () { state.shown += state.batch; apply(); });
    root.appendChild(s);
    return state;
  }

  var newList = videos.filter(function (v) { return v.date >= NEW_FROM; });
  var oldList = videos.filter(function (v) { return v.date < NEW_FROM; });
  var hasNew = newList.length > 0;

  // ── Topic chips ──
  var allTags = {};
  videos.forEach(function (v) { v.tags.forEach(function (t) { allTags[t] = (allTags[t] || 0) + 1; }); });
  var tagList = Object.keys(allTags).sort(function (a, b) {
    var ia = TAG_ORDER.indexOf(a), ib = TAG_ORDER.indexOf(b);
    if (ia < 0) ia = 99;
    if (ib < 0) ib = 99;
    return ia - ib || (a < b ? -1 : 1);
  });

  var active = 'all';
  var chips = el('div', 'gfx-chips');
  chips.setAttribute('role', 'group');
  chips.setAttribute('aria-label', 'Filter by topic');
  function chip(tag, text, n) {
    var b = el('button', 'gfx-chip');
    b.type = 'button';
    b.setAttribute('data-tag', tag);
    b.appendChild(document.createTextNode(text + ' '));
    b.appendChild(el('span', 'gfx-chip-n', String(n)));
    b.addEventListener('click', function () {
      active = tag;
      sections.forEach(function (s) { s.shown = s.batch; });
      apply();
    });
    chips.appendChild(b);
  }
  chip('all', 'all', videos.length);
  tagList.forEach(function (t) { chip(t, label(t), allTags[t]); });
  root.appendChild(chips);

  var sections = [];
  if (hasNew) sections.push(section('new', 'New', 'The latest videos, with links to dig deeper.', newList, false));
  sections.push(section('earlier', hasNew ? 'Earlier Shorts' : 'Shorts', null, oldList, true));

  function apply() {
    chips.querySelectorAll('.gfx-chip').forEach(function (b) {
      var on = b.getAttribute('data-tag') === active;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    sections.forEach(function (s) {
      var match = s.cards.filter(function (c) { return active === 'all' || c.v.tags.indexOf(active) >= 0; });
      s.cards.forEach(function (c) { c.el.hidden = true; });
      match.forEach(function (c, i) { c.el.hidden = i >= s.shown; });
      s.el.hidden = match.length === 0;
      var left = match.length - s.shown;
      s.more.hidden = left <= 0;
      s.more.textContent = 'Show more (' + Math.max(left, 0) + ')';
    });
  }
  apply();

  var count = document.getElementById('gfx-count');
  if (count) count.textContent = videos.length + ' videos';

  // ── Lazy embeds: thumbnail first, the YouTube player only on click ──
  root.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('button.lite-yt');
    if (!btn || !root.contains(btn)) return;
    var frame = document.createElement('iframe');
    frame.src = 'https://www.youtube.com/embed/' + btn.getAttribute('data-id') + '?autoplay=1&rel=0';
    frame.title = btn.getAttribute('data-title') || 'YouTube video';
    frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    frame.allowFullscreen = true;
    var box = document.createElement('div');
    box.className = btn.className + ' is-playing';
    box.appendChild(frame);
    btn.replaceWith(box);
  });
})();
