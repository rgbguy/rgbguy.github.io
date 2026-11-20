// ── Learn: every track and every lesson, in one list ──
//
// Run `node tools/build-learn.js` after editing. It writes learn/index.html
// and one page per lesson at learn/<track>/<slug>.html.
//
// A NEW TRACK: add it to TRACKS. It gets its own tab on the Learn page.
//
// A NEW LESSON: add ONE entry to LESSONS.
//
//   { slug: 'url-name', track: 'games', title: 'What it is called',
//     hook: 'One line that makes you want to open it.',
//     date: 'YYYY-MM-DD',
//     video: 'YouTubeId',            // optional. A Short unless videoKind: 'long'
//     desmos: 'https://www.desmos.com/3d/...',   // optional live graph
//     tags: ['rendering'],
//     links: [{ title: 'A paper, talk or tool', url: 'https://...' }] }
//
// A longer write-up (text, visualisers) goes in learn/content/<slug>.html.
// If that file exists, the lesson page includes it and the card says "write-up".

var TRACKS = [
  {
    id: 'games',
    name: 'How Games Work',
    short: 'Games',
    blurb: 'The tricks behind the games you play. Rendering, shaders, physics, animation and engines, each one explained with a video, a write-up and something you can poke at.',
    accent: 'games',
    tags: ['rendering', 'shaders', 'physics', 'engines', 'animation', 'procedural', 'ai', 'maths']
  },
  {
    id: 'maths',
    name: 'Made with Maths',
    short: 'Maths',
    blurb: 'Animals, objects and motion drawn with nothing but equations. Watch how one is built, then open the live graph and change the numbers yourself.',
    accent: 'maths',
    tags: []
  }
];

var LESSONS = [
  // ── How Games Work ──
  { slug: 'rdr2-snow', track: 'games', video: 'n3ygUN0IHUQ', title: 'How ground deformation works in games', date: '2026-11-19',
    hook: 'The ground has no idea what is crossing it. Every footprint and tyre track is a picture.',
    tags: ['rendering', 'shaders'],
    links: [
      { title: 'Graphics Study: Red Dead Redemption 2, a RenderDoc frame breakdown (imgeself)', url: 'https://imgeself.github.io/posts/2020-06-19-graphics-study-rdr2/' },
      { title: 'Deformable Snow Rendering in Batman: Arkham Origins, GDC 2014 (PDF)', url: 'https://colinbarrebrisebois.com/wp-content/uploads/2022/06/gdc2014-deformable_snow_rendering.pdf' },
      { title: 'Deformable Snow Rendering in Batman: Arkham Origins (SlideShare)', url: 'https://www.slideshare.net/colinbb/gdc2014-deformable-snow-rendering-in-batman-arkham-origins' },
      { title: 'GPU Pro 7: Advanced Rendering Techniques (Rise of the Tomb Raider snow chapter)', url: 'https://www.routledge.com/GPU-Pro-7-Advanced-Rendering-Techniques/Engel/p/book/9781498742535' },
      { title: 'The Rendering of Rise of the Tomb Raider (elopezr)', url: 'https://www.elopezr.com/the-rendering-of-rise-of-the-tomb-raider/' },
      { title: 'RDR2 optimized settings: what Tessellation does (PCOptimizedSettings)', url: 'https://pcoptimizedsettings.com/red-dead-redemption-2-rdr2-optimized-settings-for-pc-2024/' },
      { title: 'Steam: tessellation needed for mud and snow', url: 'https://steamcommunity.com/app/1174180/discussions/0/2961642185092923091/' },
      { title: 'Steam: the deepsurfaceQuality setting', url: 'https://steamcommunity.com/app/1174180/discussions/0/5056966106388936723' },
      { title: 'Steam: strange square deformity in snow', url: 'https://steamcommunity.com/app/1174180/discussions/0/1742268065075385587/' },
      { title: 'Steam: terrain and snow deformation glitch', url: 'https://steamcommunity.com/app/1174180/discussions/0/1735507300805016886/' },
      { title: 'Best Red Dead Redemption 2 settings (GamesRadar)', url: 'https://www.gamesradar.com/best-red-dead-redemption-2-settings/' },
      { title: 'RDR2 tech analysis: animations, physics, weather (GamingBolt)', url: 'https://gamingbolt.com/red-dead-redemption-2-tech-analysis-animations-physics-post-processing-effects-weather-systems-and-more' },
      { title: 'Red Dead Redemption 2 details players noticed (GameRant)', url: 'https://gamerant.com/red-dead-redemption-incredible-details/' },
      { title: "Assassin's Creed III PC technology (Geeks3D)", url: 'https://www.geeks3d.com/20121123/assassins-creed-iii-pc-technology-video/' },
      { title: 'Snakes in the snow, in real life (Metroparks)', url: 'https://www.metroparks.com/snakes-in-the-snow/' }
    ] },
  { slug: 'dot-product', track: 'games', video: 'n_V5RLQhW4c', title: 'Dot product in games', date: '2026-11-08', tags: ['maths'] },
  { slug: 'physics-with-maths', track: 'games', video: 'CyYfOpHcBUs', title: 'Physics simulated using maths', date: '2026-10-31', tags: ['physics', 'maths'] },
  { slug: 'fog', track: 'games', video: 'dXGgZs1sFTE', title: 'How video games create fog', date: '2026-10-27', tags: ['rendering', 'shaders'] },
  { slug: 'lods', track: 'games', video: 'bnIEjybgFhg', title: 'Why do LODs exist?', date: '2026-10-21', tags: ['rendering', 'engines'] },
  { slug: 'gta6-beer-bottle', track: 'games', video: 'lIVxZkAzfdw', title: 'The tricks behind a beer bottle in GTA 6', date: '2026-10-17', tags: ['physics'] },
  { slug: 'bugs', track: 'games', video: 'NIDtiMvYdfw', title: 'Learning gamedev through bugs', date: '2026-10-10', tags: ['engines'] },
  { slug: 'path-tracing', track: 'games', video: 'fcLpaz-pvZc', title: 'Path tracing explained', date: '2026-10-08', tags: ['rendering'] },
  { slug: 'procedural-creatures', track: 'games', video: 'sGoBnJ-gbaE', title: 'Procedural creatures with simple maths', date: '2026-10-05', tags: ['procedural', 'animation'] },
  { slug: 'l-systems', track: 'games', video: 'YeMA29cxQRk', title: 'L-systems: the algorithm that mimics nature', date: '2026-09-10', tags: ['procedural'] },
  { slug: 'ps1-wobble', track: 'games', video: '6tyq31mf5KQ', title: 'PlayStation wobble explained', date: '2026-09-05', tags: ['rendering', 'shaders'],
    links: [{ title: 'My write-up: faking PS1 wobble in OpenGL', url: '../../blogs/ps1-wobble.html' }] },
  { slug: 'boids', track: 'games', video: 'T9gPOd90yQM', title: 'Flock simulation with boids', date: '2026-06-29', tags: ['ai', 'procedural'] },
  { slug: 'physics-mesh', track: 'games', video: 'e8uDK9RxAew', title: 'Rendered mesh vs physics mesh', date: '2026-02-18', tags: ['physics', 'engines'] },
  { slug: 'gamedev-maths', track: 'games', video: 'd2DXJq2acEs', title: 'Gamedev + maths', date: '2026-01-19', tags: ['maths'] },
  { slug: 'flags', track: 'games', video: 'NN6u7h133AI', title: 'Flags with maths and computer graphics', date: '2026-01-10', tags: ['shaders', 'maths'] },
  { slug: 'spot-lights', track: 'games', video: 'y2lc8M2umBc', title: 'Spot lights x maths', date: '2025-11-09', tags: ['rendering', 'maths'] },
  { slug: 'euphoria', track: 'games', video: 'GyV9Ntnt_gM', title: 'Euphoria and game physics', date: '2025-05-19', tags: ['physics', 'animation'] },
  { slug: 'volumetric-clouds', track: 'games', video: 'H3f0xymAuWo', title: 'What are volumetric clouds?', date: '2025-05-12', tags: ['rendering', 'shaders'] },
  { slug: 'mesh-slicing', track: 'games', video: 'vQp2LWYao4Q', title: 'Real-time mesh slicing', date: '2025-03-31', tags: ['engines', 'maths'] },
  { slug: 'spatial-partitioning', track: 'games', video: 'D8XIdpayrYA', title: 'Spatial partitioning explained', date: '2025-03-29', tags: ['engines'] },
  { slug: 'photo-mode', track: 'games', video: '5AYmkL7rOM0', title: 'Photo mode in games', date: '2025-03-27', tags: ['rendering', 'engines'] },
  { slug: 'bezier-curves', track: 'games', video: 'wuOVpV3RTLc', title: 'Bézier curves', date: '2025-03-10', tags: ['maths'] },
  { slug: 'animation-retargeting', track: 'games', video: 'Mh5QuhmuI0g', title: 'Animation retargeting', date: '2025-02-07', tags: ['animation'] },
  { slug: 'inverse-kinematics', track: 'games', video: '_9mOjllndIY', title: 'Inverse kinematics', date: '2025-01-17', tags: ['animation', 'maths'] },
  { slug: 'cheat-codes', track: 'games', video: 'HK-bpWlnuLI', title: 'Cheat codes', date: '2025-01-03', tags: ['engines'] },
  { slug: 'fifa-machine-learning', track: 'games', video: '4L0_sUGtbGw', title: 'Machine learning in FIFA', date: '2024-12-06', tags: ['ai', 'animation'] },
  { slug: 'mocap', track: 'games', video: '8isjlIVUxLM', title: 'Mocap explained', date: '2024-12-04', tags: ['animation'] },

  // ── Made with Maths ──
  { slug: 'stingray', track: 'maths', video: 'IAP_ROdsvLI', desmos: 'https://www.desmos.com/3d/g5fj29hqfn', title: 'Stingray with maths', featured: true,
    hook: 'A stingray gliding through water, and every curve of it is an equation.' },
  { slug: 'snake', track: 'maths', video: 'EO43eP9UdbM', desmos: 'https://www.desmos.com/3d/tfr8fhjbdc', title: 'Snake with maths',
    hook: 'A snake slithering in 3D, built from a sine wave that refuses to sit still.' },
  { slug: 'butterfly', track: 'maths', video: 'UztQHKFW-54', desmos: 'https://www.desmos.com/3d/fck2ykkuqt', title: 'Butterfly with maths',
    hook: 'Two wings, one equation, mirrored.' },
  { slug: 'matka', track: 'maths', video: 'sHhY7sy8BK4', desmos: 'https://www.desmos.com/3d/zbubp5zx5s', title: 'Matka with maths',
    hook: 'A clay pot, spun out of a single curve.' },
  { slug: 'taylor-sine', track: 'maths', video: 'r6JmUIAmmKM', desmos: 'https://www.desmos.com/3d/15gspqv07t', title: 'How computers calculate a sine wave',
    hook: 'Your calculator never draws a circle. It adds up a Taylor series.' },
  { slug: 'flower', track: 'maths', video: 'sIImxVJ5gLw', desmos: 'https://www.desmos.com/3d/nzs07ciyib', title: 'Flower with maths',
    hook: 'Petals that open and close with one slider.' },
  { slug: 'curtain', track: 'maths', video: '2RCf-FMppNY', desmos: 'https://www.desmos.com/3d/qspztv52ou', title: 'Curtain with maths',
    hook: 'A curtain blowing in the wind, and it is just equations.' },
  { slug: 'tornado', track: 'maths', video: 'zD3sEyn7VMk', desmos: 'https://www.desmos.com/3d/ikzhdyzipx', title: 'Tornado and ice cream',
    hook: 'Same spiral, two very different results.' },
  { slug: 'navratri-wave', track: 'maths', video: '8msMqNKTcbU', desmos: 'https://www.desmos.com/3d/xof66kx4ml', title: 'Navratri lighting wave',
    hook: 'Festival lights that ripple like a wave. I had to work out why.' },
  { slug: 'bird', track: 'maths', video: 'KB8XO5RPhcc', title: 'Bird with maths',
    hook: 'My most watched one. A bird in flight, drawn with equations.' },
  { slug: 'raindrop-waves', track: 'maths', video: 'scVlgR9ElZo', title: 'Raindrop waves',
    hook: 'Ripples on water, one drop at a time.' }
];

if (typeof module !== 'undefined') module.exports = { TRACKS: TRACKS, LESSONS: LESSONS };
