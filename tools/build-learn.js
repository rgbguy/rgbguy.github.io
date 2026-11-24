// ── Builds the Learn section from learn/data.js ──
//
//   node tools/build-learn.js
//
// Writes learn/index.html (the hub, one tab per track) and
// learn/<track>/<slug>.html for every lesson. Write-ups live in
// learn/content/<slug>.html and are pasted into the lesson page as-is.
// Generated pages are overwritten on every run: edit data.js or content/, not them.

var fs = require('fs');
var path = require('path');

var ROOT = path.join(__dirname, '..');
var LEARN = path.join(ROOT, 'learn');
var data = require(path.join(LEARN, 'data.js'));
var TRACKS = data.TRACKS;
var LESSONS = data.LESSONS;

var TAG_LABEL = { ai: 'AI' };
var SITE = 'https://rgbguy.in';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
}

function contentFor(slug) {
  var f = path.join(LEARN, 'content', slug + '.html');
  return fs.existsSync(f) ? fs.readFileSync(f, 'utf8') : '';
}

// What a lesson has inside, shown as chips on cards and pages
function badges(l) {
  var b = [];
  if (l.desmos) b.push(['graph', 'live graph']);
  if (l.hasVis) b.push(['vis', 'interactive']);
  if (l.hasWriteup) b.push(['read', 'write-up']);
  if (!l.video) b.push(['soon', 'video soon']);
  return b;
}

function badgeHtml(l) {
  return '<span class="lesson-badges">' + badges(l).map(function (b) {
    return '<span class="badge badge-' + b[0] + '">' + b[1] + '</span>';
  }).join('') + '</span>';
}

function thumb(l, prefix) {
  if (l.video) {
    return '<img src="https://i.ytimg.com/vi/' + l.video + '/oar2.jpg" alt="" loading="lazy" decoding="async" width="270" height="480" />';
  }
  // No video yet: a drawing of the idea instead
  return '<svg class="thumb-art" viewBox="0 0 90 160" aria-hidden="true">' +
    '<rect width="90" height="160" fill="#000"/>' +
    '<path d="M-5 120 C 15 100, 25 140, 45 110 S 70 60, 95 80" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9" filter="url(#b' + l.slug + ')"/>' +
    '<path d="M10 40 C 25 30, 35 55, 55 45 S 75 25, 95 35" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".35" filter="url(#b' + l.slug + ')"/>' +
    '<defs><filter id="b' + l.slug + '"><feGaussianBlur stdDeviation="1.6"/></filter></defs></svg>';
}

// ── Shared page shell ──
function shell(o) {
  var up = o.depth === 2 ? '../../' : '../';
  return '<!DOCTYPE html>\n<html lang="en">\n\n<head>\n' +
    '  <!-- Google tag (gtag.js) -->\n' +
    '  <script async src="https://www.googletagmanager.com/gtag/js?id=G-H4ZKJ77Z2W"></script>\n' +
    '  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag(\'js\', new Date());\n\n    gtag(\'config\', \'G-H4ZKJ77Z2W\');\n  </script>\n' +
    '  <meta charset="UTF-8" />\n' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n' +
    '  <title>' + esc(o.title) + '</title>\n' +
    '  <meta name="description" content="' + esc(o.desc) + '" />\n' +
    '  <link rel="canonical" href="' + SITE + o.url + '" />\n' +
    '  <meta property="og:type" content="website" />\n' +
    '  <meta property="og:site_name" content="rgbguy" />\n' +
    '  <meta property="og:title" content="' + esc(o.title) + '" />\n' +
    '  <meta property="og:description" content="' + esc(o.desc) + '" />\n' +
    '  <meta property="og:url" content="' + SITE + o.url + '" />\n' +
    '  <meta property="og:image" content="' + (o.image || SITE + '/assets/og.jpg') + '" />\n' +
    '  <meta name="twitter:card" content="summary_large_image" />\n' +
    '  <link rel="icon" type="image/jpeg" href="' + up + 'assets/dp.jpg" />\n' +
    '  <link rel="preconnect" href="https://i.ytimg.com" />\n' +
    '  <link rel="stylesheet" href="' + up + 'style.css" />\n' +
    '  <link rel="stylesheet" href="' + up + 'learn/learn.css" />\n' +
    '</head>\n\n<body class="' + o.bodyClass + '">\n\n' +
    '  <nav class="site-nav">\n' +
    '    <a href="' + up + 'index.html" class="nav-logo">rgb<b>guy</b></a>\n' +
    '    <ul class="nav-links">\n' +
    '      <li><a href="' + up + 'projects.html">work</a></li>\n' +
    '      <li><a href="' + up + 'experience.html">experience</a></li>\n' +
    '      <li><a href="' + up + 'socials.html">socials</a></li>\n' +
    '      <li><a href="' + up + 'gallery.html">gallery</a></li>\n' +
    '    </ul>\n' +
    '    <a href="' + up + 'learn/index.html" class="nav-cta">Learn</a>\n' +
    '  </nav>\n\n' +
    o.body +
    '\n  <footer class="site-footer">\n    <div class="footer-inner">\n' +
    '      <div class="footer-brand">\n        <a href="' + up + 'index.html" class="nav-logo">rgb<b>guy</b></a>\n' +
    '        <p>Graphics, gamedev and maths. Built from scratch, explained simply.</p>\n' +
    '        <a class="footer-mail" href="mailto:partnerships@rgbguy.in">partnerships@rgbguy.in</a>\n      </div>\n' +
    '      <div class="footer-col">\n        <div class="footer-head">Learn</div>\n' +
    TRACKS.map(function (t) { return '        <a href="' + up + 'learn/index.html#' + t.id + '">' + esc(t.name) + '</a>\n'; }).join('') +
    '      </div>\n' +
    '      <div class="footer-col">\n        <div class="footer-head">rgbguy</div>\n' +
    '        <a href="' + up + 'projects.html">Work</a>\n        <a href="' + up + 'experience.html">Experience</a>\n        <a href="' + up + 'socials.html">Socials</a>\n        <a href="' + up + 'gallery.html">Gallery</a>\n' +
    '        <a href="' + up + 'blog.html">Blog</a>\n        <a href="' + up + 'connect.html">Work with me</a>\n      </div>\n' +
    '      <div class="footer-col">\n        <div class="footer-head">Follow</div>\n' +
    '        <a href="https://www.youtube.com/@rgbguy" target="_blank" rel="noopener">YouTube</a>\n' +
    '        <a href="https://www.instagram.com/rgbguy/" target="_blank" rel="noopener">Instagram</a>\n' +
    '        <a href="https://www.facebook.com/p/RGBguy-100072263191125/" target="_blank" rel="noopener">Facebook</a>\n' +
    '        <a href="https://www.linkedin.com/in/rgbguy/" target="_blank" rel="noopener">LinkedIn</a>\n' +
    '        <a href="https://github.com/rgbguy" target="_blank" rel="noopener">GitHub</a>\n      </div>\n' +
    '    </div>\n    <div class="footer-bottom">&copy; 2026 rgbguy &middot; Bengaluru, India</div>\n  </footer>\n\n' +
    '  <script src="' + up + 'nav.js"></script>\n' + (o.scripts || '') +
    '</body>\n\n</html>\n';
}

// ── Prepare lessons ──
LESSONS.forEach(function (l, i) {
  l.order = i;
  l.tags = l.tags || [];
  l.links = l.links || [];
  l.content = contentFor(l.slug);
  l.hasWriteup = !!l.content;
  l.hasVis = /class="vis"/.test(l.content);
});

function lessonsOf(track) {
  return LESSONS.filter(function (l) { return l.track === track.id; });
}

// ── A card on the hub ──
function card(l, base) {
  return '        <a class="lesson-card" href="' + base + l.slug + '.html" data-tags="' + l.tags.join(' ') + '">\n' +
    '          <span class="lesson-thumb">' + thumb(l) + '</span>\n' +
    '          <span class="lesson-card-body">\n' +
    '            <span class="lesson-card-title">' + esc(l.title) + '</span>\n' +
    '            ' + badgeHtml(l) + '\n' +
    '          </span>\n        </a>\n';
}

function featured(l, base) {
  return '      <a class="lesson-feature" href="' + base + l.slug + '.html">\n' +
    '        <span class="lesson-thumb">' + thumb(l) + '</span>\n' +
    '        <span class="lesson-feature-body">\n' +
    '          <span class="lesson-kicker">' + (l.hasVis ? 'New &middot; interactive' : 'Start here') + '</span>\n' +
    '          <span class="lesson-feature-title">' + esc(l.title) + '</span>\n' +
    (l.hook ? '          <span class="lesson-feature-hook">' + esc(l.hook) + '</span>\n' : '') +
    '          ' + badgeHtml(l) + '\n' +
    '          <span class="lesson-go">Open the lesson &#8594;</span>\n' +
    '        </span>\n      </a>\n';
}

// ── Hub ──
function buildHub() {
  var tabs = TRACKS.map(function (t, i) {
    var n = lessonsOf(t).length;
    return '      <a class="track-tab track-' + t.accent + '" role="tab" href="#' + t.id + '" data-track="' + t.id + '" aria-selected="' + (i === 0) + '">\n' +
      '        <span class="track-tab-num">' + String(i + 1).padStart(2, '0') + '</span>\n' +
      '        <span class="track-tab-name">' + esc(t.name) + '</span>\n' +
      '        <span class="track-tab-meta">' + n + ' lessons</span>\n' +
      '      </a>\n';
  }).join('');

  var panels = TRACKS.map(function (t, i) {
    var ls = lessonsOf(t);
    var feat = ls.filter(function (l) { return l.featured; })[0];
    var rest = ls.filter(function (l) { return l !== feat; });
    var base = t.id + '/';
    var used = t.tags.filter(function (tag) { return ls.some(function (l) { return l.tags.indexOf(tag) >= 0; }); });
    var chips = used.length ? '      <div class="track-filter" role="group" aria-label="Filter by topic">\n' +
      '        <button class="tag active" type="button" data-filter="all">All</button>\n' +
      used.map(function (tag) { return '        <button class="tag" type="button" data-filter="' + tag + '">' + (TAG_LABEL[tag] || tag) + '</button>\n'; }).join('') +
      '      </div>\n' : '';
    return '    <section class="track-panel track-' + t.accent + '" id="track-' + t.id + '" data-track="' + t.id + '"' + (i === 0 ? '' : ' hidden') + '>\n' +
      '      <p class="track-blurb">' + esc(t.blurb) + '</p>\n' +
      (feat ? featured(feat, base) : '') +
      chips +
      '      <div class="lesson-grid">\n' + rest.map(function (l) { return card(l, base); }).join('') + '      </div>\n' +
      '    </section>\n';
  }).join('');

  var body = '  <div class="page learn-hub">\n\n' +
    '    <header class="learn-hero">\n' +
    '      <div class="page-eyebrow">learn</div>\n' +
    '      <h1>See how it <em>actually</em> works.</h1>\n' +
    '      <p class="page-sub">Every video I make lands here with the full explanation, a live graph or a toy you can play with, and the links I used. Free, and it keeps growing.</p>\n' +
    '    </header>\n\n' +
    '    <div class="track-tabs" role="tablist">\n' + tabs + '    </div>\n\n' +
    panels +
    '\n  </div>\n';

  var html = shell({
    depth: 1, url: '/learn/', bodyClass: 'learn-page',
    title: 'Learn · rgbguy',
    desc: 'How games work and maths you can see. Videos, write-ups, live graphs and interactive demos by rgbguy.',
    body: body,
    scripts: '  <script src="learn.js"></script>\n'
  });
  fs.writeFileSync(path.join(LEARN, 'index.html'), html);
}

// ── Lesson page ──
function buildLesson(l) {
  var t = TRACKS.filter(function (x) { return x.id === l.track; })[0];
  var ls = lessonsOf(t);
  var idx = ls.indexOf(l);
  var next = [1, 2, 3].map(function (k) { return ls[(idx + k) % ls.length]; }).filter(function (x) { return x !== l; });

  var video = l.video
    ? '        <button class="lite-yt lite-yt--short lesson-video" type="button" data-id="' + l.video + '" data-title="' + esc(l.title) + '" aria-label="Play: ' + esc(l.title) + '"><img src="https://i.ytimg.com/vi/' + l.video + '/oar2.jpg" alt="" /><span class="lite-yt-play" aria-hidden="true"></span></button>\n'
    : '        <div class="lesson-video lesson-video-soon">\n          <span class="lesson-kicker">Video coming</span>\n          <p>The short for this one is in the edit. Follow and you\'ll catch it first.</p>\n' +
      '          <a class="btn btn-sm" href="https://www.instagram.com/rgbguy/" target="_blank" rel="noopener">Instagram</a>\n' +
      '          <a class="btn btn-sm" href="https://www.youtube.com/@rgbguy?sub_confirmation=1" target="_blank" rel="noopener">YouTube</a>\n        </div>\n';

  // "In this lesson": what's on the page
  var inside = [];
  if (l.desmos) inside.push(['#graph', 'Play with the live graph']);
  if (l.hasVis) inside.push(['#try-it', 'Try the interactive demo']);
  if (l.hasWriteup) inside.push(['#read', 'Read how it works']);
  if (l.links.length) inside.push(['#links', 'Sources and links']);

  var side = '        <div class="lesson-side">\n' +
    '          <div class="lesson-kicker">' + esc(t.name) + '</div>\n' +
    '          <h1>' + esc(l.title) + '</h1>\n' +
    (l.hook ? '          <p class="lesson-hook">' + esc(l.hook) + '</p>\n' : '') +
    '          ' + badgeHtml(l) + '\n' +
    (inside.length ? '          <ol class="lesson-toc">\n' + inside.map(function (x) { return '            <li><a href="' + x[0] + '">' + x[1] + '</a></li>\n'; }).join('') + '          </ol>\n'
      : '          <p class="lesson-grow">The write-up for this one is on its way. Lessons here grow over time.</p>\n') +
    (l.video ? '          <a class="lesson-yt" href="https://www.youtube.com/shorts/' + l.video + '" target="_blank" rel="noopener">Watch on YouTube &#8599;</a>\n' : '') +
    '        </div>\n';

  var graph = l.desmos
    ? '      <section class="lesson-block" id="graph">\n        <div class="section-label">// live graph</div>\n' +
      '        <h2>Change the numbers yourself</h2>\n' +
      '        <p>This is the exact graph from the video. Drag the sliders, press play on the animated ones, break it.</p>\n' +
      '        <div class="lesson-graph"><iframe src="' + l.desmos + '" title="' + esc(l.title) + ' · Desmos 3D" frameborder="0" loading="lazy" allowfullscreen></iframe></div>\n' +
      '        <a class="lesson-yt" href="' + l.desmos + '" target="_blank" rel="noopener">Open full screen in Desmos &#8599;</a>\n      </section>\n'
    : '';

  var read = l.hasWriteup ? '      <div class="lesson-read" id="read">\n' + l.content + '      </div>\n' : '';

  var links = l.links.length
    ? '      <section class="lesson-block" id="links">\n        <div class="section-label">// sources and links</div>\n        <ul class="lesson-links">\n' +
      l.links.map(function (k) {
        var ext = /^https?:/.test(k.url);
        return '          <li><a href="' + esc(k.url) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + esc(k.title) + (ext ? ' &#8599;' : ' &#8594;') + '</a></li>\n';
      }).join('') + '        </ul>\n      </section>\n'
    : '';

  var more = '      <section class="lesson-block lesson-next">\n        <div class="section-label">// keep going</div>\n' +
    '        <div class="lesson-grid lesson-grid-3">\n' + next.map(function (n) { return card(n, ''); }).join('') + '        </div>\n' +
    '        <a class="lesson-yt" href="../index.html#' + t.id + '">All ' + ls.length + ' lessons in ' + esc(t.name) + ' &#8594;</a>\n      </section>\n';

  var body = '  <div class="page lesson-page track-' + t.accent + '">\n' +
    '    <div class="crumbs"><a href="../index.html">Learn</a><span>/</span><a href="../index.html#' + t.id + '">' + esc(t.name) + '</a></div>\n\n' +
    '    <header class="lesson-top">\n' + video + side + '    </header>\n\n' +
    graph + read + links + more +
    '  </div>\n';

  var html = shell({
    depth: 2, url: '/learn/' + t.id + '/' + l.slug + '.html', bodyClass: 'learn-page',
    title: l.title + ' · ' + t.name + ' · rgbguy',
    desc: l.hook || (l.title + '. A lesson in ' + t.name + ' by rgbguy.'),
    image: l.video ? 'https://i.ytimg.com/vi/' + l.video + '/oar2.jpg' : null,
    body: body
  });
  var dir = path.join(LEARN, t.id);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
  fs.writeFileSync(path.join(dir, l.slug + '.html'), html);
}

buildHub();
LESSONS.forEach(buildLesson);
console.log('Learn: ' + TRACKS.length + ' tracks, ' + LESSONS.length + ' lessons written.');
