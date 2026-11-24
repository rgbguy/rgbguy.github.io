// ── Fills every video spot on a page from graphics/videos.js ──
//
// A spot is an element with data-videos="place" (and data-template="how").
// It gets every video whose `on` has that place, in order (data-sort="views"
// for most viewed first), at most data-limit of them.
// Nothing here needs editing to add or move a video: edit graphics/videos.js.
// The Graphics page has its own renderer (graphics/graphics.js).
(function () {
  if (typeof VIDEOS === 'undefined') return;
  var SERIES = typeof VIDEO_SERIES === 'object' ? VIDEO_SERIES : {};

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  }

  // The videos for one place, each with its place options merged in.
  function pick(place, sort) {
    var list = [];
    VIDEOS.forEach(function (v, i) {
      if (!v || !v.id || !v.on || !v.on[place]) return;
      var o = v.on[place] === true ? {} : v.on[place];
      list.push({
        v: v, o: o, i: i,
        title: o.title || v.title,
        order: o.order != null ? o.order : v.ep != null ? v.ep : 1e6 + i
      });
    });
    list.sort(function (a, b) {
      if (sort === 'views') return (b.v.views || 0) - (a.v.views || 0) || a.i - b.i;
      return a.order - b.order || a.i - b.i;
    });
    return list;
  }

  function views(n) {
    if (!n) return '';
    if (n >= 1e6) return (Math.round(n / 1e5) / 10) + 'M views';
    return Math.round(n / 1e3) + 'K views';
  }

  function playlist(x) {
    var s = x.v.series && SERIES[x.v.series];
    return s && s.playlist ? s.playlist : '';
  }

  // The thumbnail button nav.js turns into a player on click.
  function button(x, opts) {
    var cls = 'lite-yt' + (opts.cls ? ' ' + opts.cls : '');
    var params = opts.params ? ' data-params="' + esc(opts.params) + '"' : '';
    var lazy = opts.eager ? '' : ' loading="lazy"';
    var time = opts.time && x.v.length ? '<span class="lite-yt-time">' + esc(x.v.length) + '</span>' : '';
    return '<button class="' + cls + '" type="button" data-id="' + esc(x.v.id) + '"' + params +
      ' data-title="' + esc(x.title) + '" aria-label="Play: ' + esc(x.title) + '">' +
      '<img src="' + esc(ytThumb(x.v.id, opts.thumb)) + '" alt=""' + lazy + ' />' +
      '<span class="lite-yt-play" aria-hidden="true"></span>' + time + '</button>';
  }

  function tags(list) {
    return '<div class="lab-tags">' + (list || []).map(function (t) {
      return '<span class="tag">' + esc(t) + '</span>';
    }).join('') + '</div>';
  }

  var TEMPLATES = {
    // Home and Videos: most watched Shorts
    'short-card': function (x) {
      return '<div class="short-card">' + button(x, { cls: 'lite-yt--short', thumb: 'hqdefault' }) +
        '<div class="short-meta"><span class="short-title">' + esc(x.title) + '</span>' +
        '<span class="short-views">' + views(x.v.views) + '</span></div></div>';
    },
    // Home and Videos: long videos
    'ep-card': function (x) {
      var label = x.o.label || (x.v.series && x.v.ep ? 'EP ' + x.v.ep : '');
      return '<div class="ep-card">' + button(x, { thumb: 'hq720' }) +
        '<div class="ep-meta"><span class="ep-label">' + esc(label) + '</span>' +
        '<span class="ep-title">' + esc(x.title) + '</span></div></div>';
    },
    // Home: the big video at the top
    'hero': function (x) {
      return button(x, { thumb: 'maxresdefault', eager: true }) +
        '<div class="home-hero-caption"><span>' + esc(x.title) + '</span><span>' + esc(x.o.caption || x.v.length || '') + '</span></div>';
    },
    // Learn: a Short next to its Desmos graph
    'learn-pair': function (x, n) {
      var graph = (x.v.resources || []).filter(function (r) { return /desmos\.com/.test(r.url); })[0];
      var label = x.o.label || x.title;
      return '<div class="learn-pair"><div class="section-label">// ' + (n < 9 ? '0' : '') + (n + 1) + ' · ' + esc(label) + '</div>' +
        '<div class="learn-pair-row">' + button(x, { cls: 'lite-yt--short learn-pair-video', thumb: 'hqdefault' }) +
        (graph ? '<iframe class="learn-pair-graph" src="' + esc(graph.url) + '" title="' + esc(label) + ' · Desmos 3D" frameborder="0" loading="lazy" allowfullscreen></iframe>' : '') +
        '</div></div>';
    },
    // Lab: an engine's video, and a build log card's video
    'lab-video': function (x) {
      var list = playlist(x);
      return button(x, { thumb: 'hq720', eager: x.o.eager, time: true, params: list ? 'list=' + list : '' });
    },
    'log-video': function (x) {
      return button(x, { thumb: 'hqdefault', time: true });
    },
    // Lab: the FuzX episode list
    'ep-link': function (x) {
      var list = playlist(x);
      var url = 'https://www.youtube.com/watch?v=' + x.v.id + (list ? '&list=' + list : '');
      return '<li><a href="' + esc(url) + '" target="_blank" rel="noopener"><span>EP ' + esc(x.v.ep) + '</span>' + esc(x.title) + '</a></li>';
    },
    // Lab: a demo card
    'demo': function (x) {
      return '<article class="demo-item" data-api="' + esc(x.o.api || '') + '">' +
        button(x, { thumb: 'hqdefault', time: true }) +
        '<h3>' + esc(x.title) + '</h3><p>' + esc(x.o.about || '') + '</p>' + tags(x.o.tech) + '</article>';
    },
    // Blog posts: a plain player
    'iframe': function (x) {
      return '<iframe src="https://www.youtube.com/embed/' + esc(x.v.id) + '" title="' + esc(x.title) + '" frameborder="0" ' +
        'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    }
  };

  document.querySelectorAll('[data-videos]').forEach(function (spot) {
    var tpl = TEMPLATES[spot.getAttribute('data-template')];
    if (!tpl) return;
    var list = pick(spot.getAttribute('data-videos'), spot.getAttribute('data-sort'));
    var limit = parseInt(spot.getAttribute('data-limit'), 10);
    if (limit > 0) list = list.slice(0, limit);
    spot.innerHTML = list.map(tpl).join('');
  });
})();
