// ── Every video on the site, in one list ──
//
// No page has a video written into it. Each page has empty spots
// (data-videos="place") and fills them from this list. To add, move or swap
// a video, edit only this file.
//
//   { id: 'YouTubeId', title: 'What it is called', date: 'YYYY-MM-DD',
//     area: 'graphics',                    // or 'maths'
//     tags: ['rendering', 'shaders'],
//     resources: [
//       { title: 'A paper, article, talk or doc', url: 'https://...' }
//     ],
//     on: { graphics: true } },            // where it shows (see below)
//
// id        the part after youtube.com/shorts/ (or watch?v=)
// title     its name. A place can show a different one: on: { learn: { title: '...' } }
// date      the upload date ('' if not known yet). The Graphics page sorts by it:
//           on or after GRAPHICS_NEW_FROM it goes in "New", before it in "Earlier Shorts".
// area      'graphics' or 'maths'
// tags      topics, lower case. Reuse these:
//           rendering, shaders, physics, animation, procedural, ai, maths, engines
// resources optional. Links to dig deeper. A desmos.com link is the graph the
//           Learn page puts next to the video.
// Optional: long (true for a long video, not a Short), length ('4:11', shown on
//           the thumbnail on the Lab page), views (a number, for "most watched"),
//           series + ep (an episode of a series in VIDEO_SERIES).
//
// on        the places it shows, each with its own options (or just true):
//   graphics                 the Graphics page (/graphics/)
//   most-watched             Home (top 6) and Videos, ordered by views
//   long-form                Videos page, long form.  { order, label }
//   home-hero                the big video on Home.  { title, caption }
//   home-engine              Home, "A game engine, from scratch".  { order }
//   learn                    Learn page: the video and its Desmos graph.  { order, label }
//   lab-fuzx, lab-webgl      Lab page, the two engines.  { title, eager }
//   lab-eps                  Lab page, the FuzX episode list.  { order, title }
//   lab-<post>               Lab page, a build log card
//   lab-demos                Lab page, demos.  { api: 'opengl' or 'webgl', about, tech }
//   blog-<post>              the video inside blogs/<post>.html.  { title }
// order defaults to the episode number, then to the order in this file.

var GRAPHICS_NEW_FROM = '2026-11-19';

// ── Thumbnails ──
// Every thumbnail comes live from YouTube, built from the id, so a thumbnail
// changed on YouTube shows here too. Shorts use hqdefault (it follows the
// thumbnail picked on YouTube; oar2 keeps the first auto frame). The ?v= gets
// past browser caches: after changing thumbnails on YouTube, add 1 to it.
var THUMB_VERSION = 2;

function ytThumb(id, size) {
  return 'https://i.ytimg.com/vi/' + id + '/' + (size || 'hqdefault') + '.jpg?v=' + THUMB_VERSION;
}

var VIDEO_SERIES = {
  fuzx: { title: 'FuzX', playlist: 'PLSPtS15mOXMdVzjdtfMOc_Ekx0UVydaiy' }
};

var VIDEOS = [

  // ── Graphics and gamedev Shorts ──
  { id: 'n_V5RLQhW4c', title: 'Dot product in games', date: '2026-11-08', area: 'graphics', tags: ['maths'], on: { graphics: true } },
  { id: 'CyYfOpHcBUs', title: 'Physics simulated using maths', date: '2026-10-31', area: 'graphics', tags: ['physics', 'maths'], on: { graphics: true } },
  { id: 'dXGgZs1sFTE', title: 'How video games create fog', date: '2026-10-27', area: 'graphics', tags: ['rendering', 'shaders'], on: { graphics: true } },
  { id: 'bnIEjybgFhg', title: 'Why do LODs exist?', date: '2026-10-21', area: 'graphics', tags: ['rendering', 'engines'], on: { graphics: true } },
  { id: 'lIVxZkAzfdw', title: 'The tricks behind a beer bottle in GTA 6', date: '2026-10-17', area: 'graphics', tags: ['physics'], on: { graphics: true } },
  { id: 'NIDtiMvYdfw', title: 'Learning gamedev through bugs', date: '2026-10-10', area: 'graphics', tags: ['engines'], on: { graphics: true } },
  { id: 'fcLpaz-pvZc', title: 'Path tracing explained', date: '2026-10-08', area: 'graphics', tags: ['rendering'], on: { graphics: true } },
  { id: 'sGoBnJ-gbaE', title: 'Procedural creatures with simple maths', date: '2026-10-05', area: 'graphics', tags: ['procedural', 'animation'], on: { graphics: true } },
  { id: 'YeMA29cxQRk', title: 'L-systems: the algorithm that mimics nature', date: '2026-09-10', area: 'graphics', tags: ['procedural'], on: { graphics: true } },
  { id: '6tyq31mf5KQ', title: 'PlayStation wobble explained', date: '2026-09-05', area: 'graphics', tags: ['rendering', 'shaders'], on: { graphics: true } },
  { id: 'T9gPOd90yQM', title: 'Flock simulation with boids', date: '2026-06-29', area: 'graphics', tags: ['ai', 'procedural'], on: { graphics: true } },
  { id: 'e8uDK9RxAew', title: 'Rendered mesh vs physics mesh', date: '2026-02-18', area: 'graphics', tags: ['physics', 'engines'], views: 449000, on: { graphics: true, 'most-watched': true } },
  { id: 'd2DXJq2acEs', title: 'Gamedev + maths', date: '2026-01-19', area: 'graphics', tags: ['maths'], views: 411000, on: { graphics: true, 'most-watched': true } },
  { id: 'NN6u7h133AI', title: 'Flags with maths and computer graphics', date: '2026-01-10', area: 'graphics', tags: ['shaders', 'maths'], views: 207000, on: { graphics: true, 'most-watched': { title: 'Flags with maths' } } },
  { id: 'y2lc8M2umBc', title: 'Spot lights x maths', date: '2025-11-09', area: 'graphics', tags: ['rendering', 'maths'], views: 335000, on: { graphics: true, 'most-watched': true } },
  { id: 'GyV9Ntnt_gM', title: 'Euphoria and game physics', date: '2025-05-19', area: 'graphics', tags: ['physics', 'animation'], on: { graphics: true } },
  { id: 'H3f0xymAuWo', title: 'What are volumetric clouds?', date: '2025-05-12', area: 'graphics', tags: ['rendering', 'shaders'], on: { graphics: true } },
  { id: 'vQp2LWYao4Q', title: 'Real-time mesh slicing', date: '2025-03-31', area: 'graphics', tags: ['engines', 'maths'], on: { graphics: true } },
  { id: 'D8XIdpayrYA', title: 'Spatial partitioning explained', date: '2025-03-29', area: 'graphics', tags: ['engines'], on: { graphics: true } },
  { id: '5AYmkL7rOM0', title: 'Photo mode in games', date: '2025-03-27', area: 'graphics', tags: ['rendering', 'engines'], on: { graphics: true } },
  { id: 'wuOVpV3RTLc', title: 'Bézier curves', date: '2025-03-10', area: 'graphics', tags: ['maths'], on: { graphics: true } },
  { id: 'Mh5QuhmuI0g', title: 'Animation retargeting', date: '2025-02-07', area: 'graphics', tags: ['animation'], views: 591000, on: { graphics: true, 'most-watched': true } },
  { id: '_9mOjllndIY', title: 'Inverse kinematics', date: '2025-01-17', area: 'graphics', tags: ['animation', 'maths'], views: 498000, on: { graphics: true, 'most-watched': true } },
  { id: 'HK-bpWlnuLI', title: 'Cheat codes', date: '2025-01-03', area: 'graphics', tags: ['engines'], views: 596000, on: { graphics: true, 'most-watched': true } },
  { id: '4L0_sUGtbGw', title: 'Machine learning in FIFA', date: '2024-12-06', area: 'graphics', tags: ['ai', 'animation'], views: 585000, on: { graphics: true, 'most-watched': true } },
  { id: '8isjlIVUxLM', title: 'Mocap explained', date: '2024-12-04', area: 'graphics', tags: ['animation'], on: { graphics: true } },
  { id: '9zDXQxEAB9c', title: 'LeapMotion', date: '', area: 'graphics', tags: ['engines'], views: 223000, on: { 'most-watched': true } },
  { id: 'IqfHdK8G8Bk', title: 'C and C++ use cases', date: '', area: 'graphics', tags: ['engines'], views: 141000, on: { 'most-watched': true } },

  // ── Maths Shorts (most have a Desmos graph on the Learn page) ──
  { id: 'KB8XO5RPhcc', title: 'Bird with maths', date: '', area: 'maths', tags: ['maths', 'animation'], views: 1400000, on: { 'most-watched': true } },
  { id: 'EO43eP9UdbM', title: 'Snake with maths', date: '', area: 'maths', tags: ['maths', 'animation'], views: 1300000,
    resources: [{ title: 'Snake · Desmos 3D', url: 'https://www.desmos.com/3d/tfr8fhjbdc' }],
    on: { 'most-watched': true, learn: { order: 6, label: 'Snake' } } },
  { id: 'IAP_ROdsvLI', title: 'Stingray with maths', date: '', area: 'maths', tags: ['maths', 'animation'], views: 1000000,
    resources: [{ title: 'Stingray · Desmos 3D', url: 'https://www.desmos.com/3d/g5fj29hqfn' }],
    on: { 'most-watched': true, learn: { order: 1, label: 'Stingray' } } },
  { id: 'UztQHKFW-54', title: 'Butterfly with maths', date: '', area: 'maths', tags: ['maths', 'animation'], views: 1000000,
    resources: [{ title: 'Butterfly · Desmos 3D', url: 'https://www.desmos.com/3d/fck2ykkuqt' }],
    on: { 'most-watched': true, learn: { order: 4, label: 'Butterfly' } } },
  { id: '2RCf-FMppNY', title: 'Curtain with maths', date: '', area: 'maths', tags: ['maths', 'physics'], views: 210000,
    resources: [{ title: 'Curtain · Desmos 3D', url: 'https://www.desmos.com/3d/qspztv52ou' }],
    on: { 'most-watched': { title: 'Curtain using maths' }, learn: { order: 7, label: 'Curtain' } } },
  { id: 'sHhY7sy8BK4', title: 'Matka with maths', date: '', area: 'maths', tags: ['maths'], views: 187000,
    resources: [{ title: 'Matka · Desmos 3D', url: 'https://www.desmos.com/3d/zbubp5zx5s' }],
    on: { 'most-watched': true, learn: { order: 2, label: 'Matka' } } },
  { id: 'AnU-UFp-ZTk', title: 'Maths in daily life', date: '', area: 'maths', tags: ['maths'], views: 132000, on: { 'most-watched': true } },
  { id: 'scVlgR9ElZo', title: 'Raindrop waves', date: '', area: 'maths', tags: ['maths', 'shaders'], views: 112000, on: { 'most-watched': true } },
  { id: 'r6JmUIAmmKM', title: 'How computers calculate sine wave', date: '', area: 'maths', tags: ['maths'],
    resources: [{ title: 'Sine wave with Taylor series · Desmos 3D', url: 'https://www.desmos.com/3d/15gspqv07t' }],
    on: { learn: { order: 3, label: 'Sine wave with Taylor series' } } },
  { id: 'sIImxVJ5gLw', title: 'Flower with maths', date: '', area: 'maths', tags: ['maths', 'procedural'],
    resources: [{ title: 'Flower · Desmos 3D', url: 'https://www.desmos.com/3d/nzs07ciyib' }],
    on: { learn: { order: 5, label: 'Flower' } } },
  { id: 'zD3sEyn7VMk', title: 'Tornado and Ice cream using maths!', date: '', area: 'maths', tags: ['maths'],
    resources: [{ title: 'Tornado and ice cream · Desmos 3D', url: 'https://www.desmos.com/3d/ikzhdyzipx' }],
    on: { learn: { order: 8, label: 'Tornado and ice cream' } } },
  { id: '8msMqNKTcbU', title: 'Another curious observation!', date: '', area: 'maths', tags: ['maths'],
    resources: [{ title: 'Navratri lighting wave · Desmos 3D', url: 'https://www.desmos.com/3d/xof66kx4ml' }],
    on: { learn: { order: 9, label: 'Navratri lighting wave' } } },

  // ── Long videos ──
  { id: 'iQvv2xveKZ8', title: "I'm building a game engine from scratch in C++", date: '', area: 'graphics', tags: ['engines'], long: true, series: 'fuzx', ep: 1,
    on: { 'long-form': true, 'home-engine': true, 'lab-fuzx': { title: 'FuzX, my C++ game engine', eager: true }, 'lab-eps': { title: "I'm building a game engine from scratch" } } },
  { id: 'bKG9B0Fj6ME', title: 'How GPUs turn math into pixels', date: '', area: 'graphics', tags: ['rendering', 'engines'], long: true, series: 'fuzx', ep: 2,
    on: { 'long-form': true, 'home-engine': true, 'lab-eps': true } },
  { id: 'RFbUsjLI1RA', title: 'Scene graph, components, assets', date: '', area: 'graphics', tags: ['engines'], long: true, series: 'fuzx', ep: 3,
    on: { 'long-form': true, 'home-engine': true, 'lab-eps': true } },
  { id: 'nMq2D-wM12A', title: 'My C++ game engine runs on Android', date: '', area: 'graphics', tags: ['engines'], long: true, series: 'fuzx', ep: 4,
    on: { 'long-form': true, 'home-engine': true, 'lab-eps': { title: 'Running on Android' } } },
  { id: 'SdM3yCF6x_0', title: 'This curtain blows in the wind, and it is just equations', date: '', area: 'maths', tags: ['maths', 'physics'], long: true,
    on: { 'long-form': { order: 5, label: 'Desmos 3D' } } },
  { id: 'BLeW-_uKQIE', title: 'Why rgbguy exists, and what is next', date: '', area: 'graphics', tags: [], long: true,
    on: { 'long-form': { order: 6, label: 'Channel' }, 'home-hero': { title: 'Why rgbguy exists', caption: '4 min' } } },

  // ── Lab: engines, build logs and demos ──
  { id: 'oxQNt2xViic', title: 'Custom WebGL engine', date: '', area: 'graphics', tags: ['engines', 'rendering'], long: true, length: '4:11', on: { 'lab-webgl': true } },
  { id: 'qcI3KpnP8Cg', title: 'Object picking in OpenGL', date: '', area: 'graphics', tags: ['engines', 'rendering'], length: '0:18',
    on: { 'lab-object-picking': true, 'blog-object-picking': { title: 'Object Picking in OpenGL' } } },
  { id: 'AFimRp_aFlg', title: 'PS1 wobble', date: '', area: 'graphics', tags: ['rendering', 'shaders'], length: '0:23',
    on: { 'lab-ps1-wobble': true, 'blog-ps1-wobble': { title: 'PS1 aesthetic video' } } },
  { id: 'sxpLHyw5RyY', title: 'Texture space shading', date: '', area: 'graphics', tags: ['rendering', 'shaders'], length: '0:31',
    on: { 'lab-texture-space-shading': true, 'blog-texture-space-shading': true } },
  { id: 'o8Brf2rFM8Y', title: 'The Jungle Book', date: '', area: 'graphics', tags: ['rendering'], long: true, length: '7:05',
    on: { 'lab-demos': { api: 'opengl', tech: ['OpenGL', 'C++'], about: 'A 7 minute demo about Mowgli and Raksha, the wolf mother who raised him. Fixed-function OpenGL and Win32.' } } },
  { id: 'cvptUELMK70', title: 'Nindiya', date: '', area: 'graphics', tags: ['rendering', 'shaders'], long: true, length: '8:08',
    on: { 'lab-demos': { api: 'webgl', tech: ['WebGL', 'GLSL'], about: "A delivery boy's journey through modern India. A team demo with the Shader Group, in WebGL and GLSL ES." } } },
  { id: 'yIO6v3G_8TI', title: 'Dynamic Bharat', date: '', area: 'graphics', tags: ['rendering'], length: '1:48',
    on: { 'lab-demos': { api: 'opengl', tech: ['OpenGL'], about: 'A Win32 and OpenGL demo.' } } },
  { id: 'bewdDM67J3s', title: 'Physically based rendering', date: '', area: 'graphics', tags: ['rendering', 'shaders'], length: '0:29',
    on: { 'lab-demos': { api: 'opengl', tech: ['OpenGL'], about: 'PBR materials and lighting.' } } },
  { id: 'HZ_laNsUPm4', title: 'Tessellation shaders', date: '', area: 'graphics', tags: ['rendering', 'shaders'], length: '1:01',
    on: { 'lab-demos': { api: 'opengl', tech: ['OpenGL'], about: 'Subdividing geometry on the GPU.' } } },
  { id: 'XCUSl0CkOtc', title: 'Batched grass', date: '', area: 'graphics', tags: ['rendering'], length: '0:56',
    on: { 'lab-demos': { api: 'opengl', tech: ['OpenGL', 'C'], about: 'Batched rendering of grass blades.' } } },
  { id: 'osvT-_h_s7s', title: 'Spline editor', date: '', area: 'graphics', tags: ['engines', 'maths'], length: '1:32',
    on: { 'lab-demos': { api: 'opengl', tech: ['OpenGL', 'C'], about: 'A spline editor inside my 3D engine.' } } },
  { id: 'Yu5HVNnA5Ew', title: 'Spritesheet animations', date: '', area: 'graphics', tags: ['animation', 'engines'], length: '4:36',
    on: { 'lab-demos': { api: 'opengl', tech: ['OpenGL', 'C'], about: 'Sprite-based animation in my C engine.' } } },
  { id: 'sNCmQ-88t_I', title: 'Font rendering', date: '', area: 'graphics', tags: ['rendering', 'engines'], length: '0:39',
    on: { 'lab-demos': { api: 'opengl', tech: ['OpenGL', 'C'], about: 'A font rendering system.' } } },
  { id: 'DGoThAgsPJ4', title: 'God rays', date: '', area: 'graphics', tags: ['rendering', 'shaders'], length: '0:07',
    on: { 'lab-demos': { api: 'webgl', tech: ['WebGL', 'GLSL'], about: 'Volumetric light shafts.' } } },
  { id: 'ZHmmYcPi6qU', title: 'Fog', date: '', area: 'graphics', tags: ['rendering', 'shaders'], length: '0:24',
    on: { 'lab-demos': { api: 'webgl', tech: ['WebGL', 'GLSL'], about: 'Distance fog in a shader.' } } },
  { id: 'on7MYx6dL5Q', title: 'Lighting', date: '', area: 'graphics', tags: ['rendering', 'shaders'], length: '0:28',
    on: { 'lab-demos': { api: 'webgl', tech: ['WebGL', 'GLSL'], about: 'Real-time lighting in WebGL.' } } }
];
