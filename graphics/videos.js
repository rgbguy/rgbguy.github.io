// ── Graphics page: every video it shows, in one list ──
//
// To add a video, add ONE entry anywhere in the list (the page sorts by date):
//
//   { id: 'YouTubeId', title: 'What it is called', date: 'YYYY-MM-DD',
//     tags: ['rendering', 'shaders'],
//     resources: [
//       { title: 'A paper, article, talk or doc', url: 'https://...' }
//     ] },
//
// id        the part after youtube.com/shorts/
// date      the upload date. On or after GRAPHICS_NEW_FROM it goes in the top
//           "New" section; before it, in "Earlier Shorts".
// tags      topics, lower case. Each one becomes a filter chip. Reuse these:
//           rendering, shaders, physics, animation, procedural, ai, maths, engines
// resources optional. Leave it out (or empty) and the card shows no resources.

var GRAPHICS_NEW_FROM = '2026-11-19';

var GRAPHICS_VIDEOS = [
  { id: 'n_V5RLQhW4c', title: 'Dot product in games', date: '2026-11-08', tags: ['maths'] },
  { id: 'CyYfOpHcBUs', title: 'Physics simulated using maths', date: '2026-10-31', tags: ['physics', 'maths'] },
  { id: 'dXGgZs1sFTE', title: 'How video games create fog', date: '2026-10-27', tags: ['rendering', 'shaders'] },
  { id: 'bnIEjybgFhg', title: 'Why do LODs exist?', date: '2026-10-21', tags: ['rendering', 'engines'] },
  { id: 'lIVxZkAzfdw', title: 'The tricks behind a beer bottle in GTA 6', date: '2026-10-17', tags: ['physics'] },
  { id: 'NIDtiMvYdfw', title: 'Learning gamedev through bugs', date: '2026-10-10', tags: ['engines'] },
  { id: 'fcLpaz-pvZc', title: 'Path tracing explained', date: '2026-10-08', tags: ['rendering'] },
  { id: 'sGoBnJ-gbaE', title: 'Procedural creatures with simple maths', date: '2026-10-05', tags: ['procedural', 'animation'] },
  { id: 'YeMA29cxQRk', title: 'L-systems: the algorithm that mimics nature', date: '2026-09-10', tags: ['procedural'] },
  { id: '6tyq31mf5KQ', title: 'PlayStation wobble explained', date: '2026-09-05', tags: ['rendering', 'shaders'] },
  { id: 'T9gPOd90yQM', title: 'Flock simulation with boids', date: '2026-06-29', tags: ['ai', 'procedural'] },
  { id: 'e8uDK9RxAew', title: 'Rendered mesh vs physics mesh', date: '2026-02-18', tags: ['physics', 'engines'] },
  { id: 'd2DXJq2acEs', title: 'Gamedev + maths', date: '2026-01-19', tags: ['maths'] },
  { id: 'NN6u7h133AI', title: 'Flags with maths and computer graphics', date: '2026-01-10', tags: ['shaders', 'maths'] },
  { id: 'y2lc8M2umBc', title: 'Spot lights x maths', date: '2025-11-09', tags: ['rendering', 'maths'] },
  { id: 'GyV9Ntnt_gM', title: 'Euphoria and game physics', date: '2025-05-19', tags: ['physics', 'animation'] },
  { id: 'H3f0xymAuWo', title: 'What are volumetric clouds?', date: '2025-05-12', tags: ['rendering', 'shaders'] },
  { id: 'vQp2LWYao4Q', title: 'Real-time mesh slicing', date: '2025-03-31', tags: ['engines', 'maths'] },
  { id: 'D8XIdpayrYA', title: 'Spatial partitioning explained', date: '2025-03-29', tags: ['engines'] },
  { id: '5AYmkL7rOM0', title: 'Photo mode in games', date: '2025-03-27', tags: ['rendering', 'engines'] },
  { id: 'wuOVpV3RTLc', title: 'Bézier curves', date: '2025-03-10', tags: ['maths'] },
  { id: 'Mh5QuhmuI0g', title: 'Animation retargeting', date: '2025-02-07', tags: ['animation'] },
  { id: '_9mOjllndIY', title: 'Inverse kinematics', date: '2025-01-17', tags: ['animation', 'maths'] },
  { id: 'HK-bpWlnuLI', title: 'Cheat codes', date: '2025-01-03', tags: ['engines'] },
  { id: '4L0_sUGtbGw', title: 'Machine learning in FIFA', date: '2024-12-06', tags: ['ai', 'animation'] },
  { id: '8isjlIVUxLM', title: 'Mocap explained', date: '2024-12-04', tags: ['animation'] }
];
