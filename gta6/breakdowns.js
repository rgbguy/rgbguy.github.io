// ── GTA 6 breakdowns: the list the page draws from ──
//
// To add a breakdown, copy one { ... } block below, paste it at the top of
// the list and fill it in. No layout code to touch: the page builds a card
// for every entry and sorts them newest first by date.
//
//   title     what the breakdown is about
//   date      'YYYY-MM-DD'
//   topic     short tag shown on the card: 'lighting', 'reflections', 'water', 'weather', 'crowds'...
//   summary   one or two sentences
//   thumbnail image path or URL. Paths are from the gta6/ folder, so a file in
//             assets/ is '../assets/your-image.jpg'. A YouTube thumbnail works too:
//             'https://i.ytimg.com/vi/VIDEO_ID/hq720.jpg'. Leave '' for a blank frame.
//   link      the video or write-up
//   type      'video' or 'write-up' (sets the card's button text)
//   placeholder  true shows a "placeholder" badge. Delete the line on real entries.

window.GTA6_BREAKDOWNS = [
  {
    title: 'How GTA 6 lights Vice City',
    date: '2026-11-18',
    topic: 'lighting',
    summary: 'Sample entry. Sunlight, bounce light and neon at night: what the trailers show about how the game lights its world. Replace this with the first real breakdown.',
    thumbnail: '',
    link: 'https://www.youtube.com/@rgbguy',
    type: 'video',
    placeholder: true
  }
];
