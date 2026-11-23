/* ============================================================
   Shared project list — edit titles / descriptions / order here.
   Used by both the home page and work.html.
     desc  = short description (leave '' to hide)
     id    = Vimeo video id,  h = privacy hash for unlisted videos
     yt    = YouTube video id      img = image URL (concept art / illustration)
     still = fallback thumbnail (./img/<still>.webp)
   Thumbnails + titles are pulled from Vimeo automatically when online.
   ============================================================ */
window.HAYA_WORK = [
  // --- one project = one card; the viewer steps through its stages (rough → genka → douga → clean-up → final) ---
  { title: 'Jujutsu Kaisen — Rough Animation & Stills', cat: '2d', desc: '', cover: './media/proj/cover-jjk.webp', groups: [
      { k: 'anim', label: 'Rough animation', stages: [ { k: 'rough', label: 'Rough', video: './media/proj/jjk-rough.mp4' } ] },
      { k: 'shot', n: 1, stages: [ { k: 'rough', label: 'Rough', img: './art/jjk-s1-rough.webp' }, { k: 'key2', label: 'Second key animation', img: './art/jjk-s1-key.webp' }, { k: 'final', label: 'Final', img: './art/jjk-s1-final.webp' } ] },
      { k: 'shot', n: 2, stages: [ { k: 'rough', label: 'Rough', img: './art/jjk-s2-rough.webp' }, { k: 'cleanup', label: 'Clean-up', img: './art/jjk-s2-clean.webp' }, { k: 'final', label: 'Final', img: './art/jjk-s2-final.webp' } ] },
      { k: 'shot', n: 3, stages: [ { k: 'rough', label: 'Rough', img: './art/jjk-s3-rough.webp' }, { k: 'cleanup', label: 'Clean-up', img: './art/jjk-s3-clean.webp' }, { k: 'final', label: 'Final', img: './art/jjk-s3-final.webp' } ] } ] },
  { title: 'Intro Animation', cat: '2d', desc: '', cover: './media/proj/cover-intro.webp', stages: [
      { k: 'rough',       label: 'Rough',          video: './media/proj/intro-rough.mp4' },
      { k: 'genka_douga', label: 'Genka & Douga',  video: './media/proj/intro-genka.mp4' },
      { k: 'final',       label: 'Final',          video: './media/proj/intro-final.mp4' } ] },
  { title: 'Douja — Library Scene', cat: '2d', desc: '', cover: './media/proj/cover-library.webp', stages: [
      { k: 'rough_genka_douga', label: 'Rough · Genka · Douga', video: './media/proj/lib-rough.mp4' },
      { k: 'cleanup',           label: 'Clean-up',              video: './media/proj/lib-cleanup.mp4' } ] },
  { id: '1166961421', desc: '', title: 'Animation',  cat: '2d' },
  { id: '1166960065', desc: '', title: 'Shot 1',     cat: '2d' },
  { id: '1166959849', desc: '', title: 'Shot 2',     cat: '2d' },
  { id: '1166966630', desc: '', title: 'Shot 3',     cat: '2d' },
  { id: '1004654983', h: 'a4b1042178', desc: '', title: 'Project 05', cat: '2d' },
  { id: '943289765',  h: '62941bdc83', desc: '', title: 'Project 06', cat: '2d' },
  { id: '1038555319', h: '727cf0bb25', desc: '', title: 'Project 07', cat: '2d' },
  { id: '1004638267', h: 'd77d30948d', desc: '', title: 'Project 08', cat: '2d' },
  { id: '1004659400', h: 'bdd012937d', desc: '', title: 'Project 09', cat: '2d' },
  { id: '1019159166', h: '4ba25dad3e', desc: '', title: 'Project 10', cat: '2d' },
  { id: '1196698114', h: 'd057ead15c', desc: '', title: 'Motion 01', cat: 'mg' },
  { id: '1204310957', h: '3e91c362d5', desc: '', title: 'Motion 02', cat: 'mg' },
  { id: '858739009', h: '46c6654d9f', desc: '', title: 'Motion 03', cat: 'mg' },
  { id: '1004658994', desc: '', title: 'Phalstine', cat: 'mg' },
  { id: '1038561397', h: '09f56a3c1e', desc: '', title: 'Motion 05', cat: 'mg' },
  { id: '714741516', h: '636d171cf9', desc: '', title: 'Motion 06', cat: 'mg' },
  { id: '1017162086', desc: '', title: 'Logo Reveal V02', cat: 'mg' },
  { id: '607660948', h: 'e71d9bc0fe', desc: '', title: 'Motion 08', cat: 'mg' },
  { id: '934547425', h: '4308c8222e', desc: '', title: 'Motion 09', cat: 'mg' },
  { id: '1017154008', h: 'cf19dec748', desc: '', title: 'Motion 10', cat: 'mg' },
  { id: '793930494', h: 'd3e854bd2b', desc: '', title: 'Motion 11', cat: 'mg' },
  { id: '793634150', h: 'e79c4dfd17', desc: '', title: 'Motion 12', cat: 'mg' },
  { id: '793630375', h: 'd6292dced0', desc: '', title: 'Motion 13', cat: 'mg' },
  { id: '1004634654', h: '726c85a9cd', desc: '', title: 'Motion 14', cat: 'mg' },
  { id: '1004674625', h: '72ff487699', desc: '', title: 'Motion 15', cat: 'mg' },
  { id: '1004684569', h: 'cfddeb5fc8', desc: '', title: 'Motion 16', cat: 'mg' },
  { id: '1004678768', h: '0bd50ec4f3', desc: '', title: 'Motion 17', cat: 'mg' },
  { yt: 'DH37IXD3R0c', desc: '', title: '3D Animation 01', cat: '3d' },
  { yt: '7E5NxxpOQLw', desc: '', title: '3D Animation 02', cat: '3d' },
  { yt: 'DOIkSV3GdDE', desc: '', title: '3D Animation 03', cat: '3d' },
  { yt: 'rH4fhqTVE0k', desc: '', title: '3D Animation 04', cat: '3d' },
  { id: '934549247', h: 'a7de1ffaa5', desc: '', title: 'Storyboard 01', cat: 'story' },
  { id: '934548932', h: '2d66d367ab', desc: '', title: 'Storyboard 02', cat: 'story' },
  { id: '934549858', h: 'ffa2161705', desc: '', title: 'Storyboard 03', cat: 'story' },
  { id: '858815708', h: '787ee76169', desc: '', title: 'Interior 01', cat: 'interior' },
  { id: '682315399', h: 'ec72a52c8b', desc: '', title: 'Interior 02', cat: 'interior' },
  { id: '793634150', h: 'e79c4dfd17', desc: '', title: 'Interior 03', cat: 'interior' },
  { id: '934548670', h: '06a7cc1e0e', desc: '', title: 'Interior 04', cat: 'interior' },
  { img: './art/art1.webp', desc: '', title: 'Character Design — Turnaround', cat: 'concept' },
  { img: './art/art2.webp', desc: '', title: 'Brush in a Rush — Logo & Mascot', cat: 'concept' },
  { img: './art/art3.webp', desc: '', title: 'Character Design — Redwan the Entrepreneur', cat: 'concept' },
  { img: './art/art4.webp', desc: '', title: 'Desert Environment & Penguin', cat: 'concept' },
  { title: 'Egyptian Spaceship — Throne Room', cat: 'concept', desc: '', cover: './art/art5.webp', stages: [ { k: 'final', label: 'Final', img: './art/art5.webp' }, { k: 'value', label: 'Value sketch & palette', img: './art/art6.webp' } ] },
  { img: './art/art7.webp', desc: '', title: 'Egyptian Light Whip', cat: 'concept' },
  { title: 'Futuristic Lava City', cat: 'concept', desc: '', cover: './art/art8.webp', stages: [ { k: 'final', label: 'Final', img: './art/art8.webp' }, { k: 'flat', label: 'Value scale & flat colors', img: './art/art9.webp' } ] },
  { img: './art/art10.webp', desc: '', title: 'Rocky Coast — Thumbnails & Painting', cat: 'concept' },
  { title: 'Cairo', cat: 'concept', desc: '', cover: './art/art11.webp', stages: [ { k: 'day', label: 'Day', img: './art/art11.webp' }, { k: 'night', label: 'Night', img: './art/art12.webp' }, { k: 'ref', label: 'Reference & thumbnail', img: './art/art13.webp' } ] },
  { title: 'Hades & Persephone', cat: 'concept', desc: '', cover: './art/art14.webp', stages: [ { k: 'final', label: 'Final', img: './art/art14.webp' }, { k: 'sketch', label: 'Sketch', img: './art/art15.webp' }, { k: 'moodboard', label: 'Moodboard', img: './art/art16.webp' } ] },
];

/* Menu categories for "Work" (same as your Google Sites menu). Set a project's cat to one of these keys. */
window.HAYA_CATS = [
  { key: '2d', code: '2D',       label: '2D Animation',               blurb: 'Characters, acting & frame-by-frame' },
  { key: 'mg', code: '2D·3D',       label: '2D / 3D Motion Graphics',    blurb: 'Logo reveals, titles & explainers',   still: 'work5' },
  { key: '3d', code: '3D',       label: '3D Animation',               blurb: 'Models, scenes & renders',            still: 'work3' },
  { key: 'story', code: 'SB',    label: 'Storyboard',                 blurb: 'Boards & animatics',                  still: 'work2' },
  { key: 'concept', code: 'CA',  label: 'Concept Art & Illustrations', blurb: 'Characters, worlds & mood',          still: 'work1' },
  { key: 'interior', code: 'ID', label: 'Interior Design',            blurb: 'Spaces & architecture',               still: 'work4' },
];
