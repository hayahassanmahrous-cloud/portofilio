/* ============================================================
   Languages: English · العربية · 한국어 · 日本語
   - Text in the HTML is English. Elements with data-i18n="key" get swapped for the chosen language.
   - Edit / add translations in the HAYA_I18N table below.
   - The choice is remembered (localStorage) and applied before the page animates.
   ============================================================ */
(function () {
  const LANGS = [
    { code: 'en', label: 'English', short: 'EN' },
    { code: 'ar', label: 'العربية', short: 'ع' },
    { code: 'ko', label: '한국어', short: '한' },
    { code: 'ja', label: '日本語', short: '日' },
  ];
  const HEART = '';

  const D = {
    en: {
      'name1': 'Haya', 'name2': 'Hassan',
      'loader.hint': "Opening Haya's little world ✦", 'loader.skip': 'Skip intro',
      'nav.process': 'Behind the Scenes', 'nav.work': 'Work', 'nav.about': 'About', 'nav.skills': 'Skills', 'nav.contact': 'Contact',
      'cat.2d.label': '2D Animation', 'cat.2d.blurb': 'Characters, acting & frame-by-frame',
      'cat.mg.label': '2D / 3D Motion Graphics', 'cat.mg.blurb': 'Logo reveals, titles & explainers',
      'cat.3d.label': '3D Animation', 'cat.3d.blurb': 'Models, scenes & renders',
      'cat.story.label': 'Storyboard', 'cat.story.blurb': 'Boards & animatics',
      'cat.concept.label': 'Concept Art &amp; Illustrations', 'cat.concept.blurb': 'Characters, worlds & mood',
      'cat.interior.label': 'Interior Design', 'cat.interior.blurb': 'Spaces & architecture',
      'hero.role': '2D ANIMATION &amp;<br>VISUAL STORYTELLER', 'hero.tag': 'Bringing characters<br>and stories to life ',
      'btn.reel': 'Watch My Showreel',
      'cmp.l': 'Key drawings', 'cmp.r': 'Final animation', 'cmp.hint': 'Drag to compare ✦',
      'proc.num': 'I · Process', 'proc.h2': 'Behind<br>the Scenes', 'proc.note': 'From sketches<br>to final animation!',
      'logos.title': 'Worked with', 'logos.more': 'and many more',
      'work.num': 'II · Work', 'work.note': 'Pick a category to explore.', 'work.all': 'View All Work',
      'about.num': 'III · About', 'about.h2': 'About Me',
      'about.lead': "Hi! I'm Haya Hassan, a 2D animator and visual storyteller based in Alexandria, Egypt. I love bringing characters, emotions, and stories to life through animation — especially children's educational animation. ",
      'about.s1': 'years of animation &amp; motion work', 'about.s2': 'countries worked with', 'about.s3': 'in my animation diploma class',
      'about.more': 'Learn More ',
      'edu.h': 'Education', 'edu.p': '2D Animation &amp; Motion Graphics Diploma, ITI<br>B.A. Interior Architecture, Alexandria University',
      'exp.h': 'Experience', 'exp.p': '2D Animator &amp; Motion Designer<br>Egypt · KSA · UAE · Kuwait · Oman',
      'skills.num': 'IV · Skills', 'skills.h2': 'Animation<br>Skills',
      'sk1': '2D Character Animation', 'sk2': 'Frame-by-frame Animation', 'sk3': 'Cutout Animation', 'sk4': 'Motion Graphics', 'sk5': 'Visual Storytelling', 'sk6': 'Storyboarding',
      'soft.h': ' Software Proficiency',
      'contact.num': 'V · Contact', 'contact.h2': "Let's Create<br>Together! ", 'contact.loc': 'Alexandria, Egypt', 'contact.btn': 'Get in Touch',
      'wk.back': 'Back home', 'wk.num': 'Choose a category', 'wk.note': '2D, 3D, motion and more — my selected work in one place.', 'wk.vimeo': 'More on Vimeo',
      'all': 'All', 'soon': 'Coming soon', 'proj1': '{n} project', 'projN': '{n} projects', 'emptyMsg': '{cat} projects are coming soon.',
      'play': 'Play', 'copied': 'Email copied ✦', 'local': 'local', 'music': 'Tap for music ♪',
      'cur.play': 'Play', 'cur.open': 'Open', 'cur.soon': 'Soon',
    },
    ar: {
      'name1': 'هيا', 'name2': 'حسن',
      'loader.hint': 'نفتح عالم هيا الصغير ✦', 'loader.skip': 'تخطّي المقدمة',
      'nav.process': 'خلف الكواليس', 'nav.work': 'الأعمال', 'nav.about': 'نبذة عني', 'nav.skills': 'المهارات', 'nav.contact': 'تواصل معي',
      'cat.2d.label': 'الرسوم المتحركة ثنائية الأبعاد', 'cat.2d.blurb': 'شخصيات وأداء تمثيلي وإطارًا بإطار',
      'cat.mg.label': 'موشن جرافيك ثنائي / ثلاثي الأبعاد', 'cat.mg.blurb': 'كشف الشعارات والعناوين والفيديوهات التوضيحية',
      'cat.3d.label': 'الرسوم المتحركة ثلاثية الأبعاد', 'cat.3d.blurb': 'نماذج ومشاهد ولقطات مُخرَجة',
      'cat.story.label': 'ستوري بورد', 'cat.story.blurb': 'لوحات قصصية وأنيماتيك',
      'cat.concept.label': 'الفن التصوري والرسوم التوضيحية', 'cat.concept.blurb': 'شخصيات وعوالم وأجواء',
      'cat.interior.label': 'التصميم الداخلي', 'cat.interior.blurb': 'مساحات وعمارة',
      'hero.role': 'رسوم متحركة ثنائية الأبعاد<br>وراوية قصص بصرية', 'hero.tag': 'أبثّ الحياة في الشخصيات<br>والحكايات ',
      'btn.reel': 'شاهد عرض أعمالي',
      'cmp.l': 'الرسومات المفتاحية', 'cmp.r': 'الأنيميشن النهائي', 'cmp.hint': 'اسحب للمقارنة ✦',
      'proc.num': '١ · العملية', 'proc.h2': 'خلف<br>الكواليس', 'proc.note': 'من الاسكتشات<br>إلى الأنيميشن النهائي!',
      'logos.title': 'عملتُ مع', 'logos.more': 'وغيرهم الكثير',
      'work.num': '٢ · الأعمال', 'work.note': 'اختر فئة لاستكشافها.', 'work.all': 'عرض كل الأعمال',
      'about.num': '٣ · نبذة', 'about.h2': 'نبذة عني',
      'about.lead': 'مرحبًا! أنا هيا حسن، رسّامة رسوم متحركة ثنائية الأبعاد وراوية قصص بصرية من الإسكندرية، مصر. أحب أن أبثّ الحياة في الشخصيات والمشاعر والقصص عبر الأنيميشن، وخاصةً الأنيميشن التعليمي للأطفال. ',
      'about.s1': 'سنوات من العمل في الأنيميشن والموشن', 'about.s2': 'دول عملتُ معها', 'about.s3': 'في دفعتي بدبلومة الأنيميشن',
      'about.more': 'اعرف المزيد ',
      'edu.h': 'التعليم', 'edu.p': 'دبلومة الأنيميشن ثنائي الأبعاد والموشن جرافيك، ITI<br>بكالوريوس العمارة الداخلية، جامعة الإسكندرية',
      'exp.h': 'الخبرة', 'exp.p': 'رسّامة أنيميشن ثنائي الأبعاد ومصمّمة موشن<br>مصر · السعودية · الإمارات · الكويت · عُمان',
      'skills.num': '٤ · المهارات', 'skills.h2': 'مهارات<br>الأنيميشن',
      'sk1': 'أنيميشن الشخصيات ثنائي الأبعاد', 'sk2': 'أنيميشن إطارًا بإطار', 'sk3': 'أنيميشن القصاصات (Cutout)', 'sk4': 'الموشن جرافيك', 'sk5': 'السرد البصري', 'sk6': 'الستوري بورد',
      'soft.h': ' إتقان البرامج',
      'contact.num': '٥ · تواصل', 'contact.h2': 'لنبتكر<br>معًا! ', 'contact.loc': 'الإسكندرية، مصر', 'contact.btn': 'تواصل معي',
      'wk.back': 'العودة للرئيسية', 'wk.num': 'اختر فئة', 'wk.note': 'ثنائي وثلاثي الأبعاد وموشن وأكثر — أعمالي المختارة في مكان واحد.', 'wk.vimeo': 'المزيد على Vimeo',
      'all': 'الكل', 'soon': 'قريبًا', 'proj1': 'مشروع', 'projN': '{n} مشاريع', 'emptyMsg': 'أعمال «{cat}» قادمة قريبًا.',
      'play': 'تشغيل', 'copied': 'تم نسخ البريد ✦', 'local': 'بالتوقيت المحلي', 'music': 'اضغط لتشغيل الموسيقى ♪',
      'cur.play': 'تشغيل', 'cur.open': 'افتح', 'cur.soon': 'قريبًا',
    },
    ko: {
      'name1': '하야', 'name2': '하산',
      'loader.hint': '하야의 작은 세계를 여는 중 ✦', 'loader.skip': '인트로 건너뛰기',
      'nav.process': '비하인드 더 신', 'nav.work': '작업', 'nav.about': '소개', 'nav.skills': '스킬', 'nav.contact': '연락',
      'cat.2d.label': '2D 애니메이션', 'cat.2d.blurb': '캐릭터, 연기, 프레임 바이 프레임',
      'cat.mg.label': '2D / 3D 모션 그래픽', 'cat.mg.blurb': '로고 리빌, 타이틀, 설명 영상',
      'cat.3d.label': '3D 애니메이션', 'cat.3d.blurb': '모델, 장면, 렌더',
      'cat.story.label': '스토리보드', 'cat.story.blurb': '보드와 애니매틱',
      'cat.concept.label': '콘셉트 아트 &amp; 일러스트레이션', 'cat.concept.blurb': '캐릭터, 세계관, 무드',
      'cat.interior.label': '인테리어 디자인', 'cat.interior.blurb': '공간과 건축',
      'hero.role': '2D 애니메이션 &amp;<br>비주얼 스토리텔러', 'hero.tag': '캐릭터와 이야기에<br>생명을 불어넣습니다 ',
      'btn.reel': '쇼릴 보기',
      'cmp.l': '키 드로잉', 'cmp.r': '최종 애니메이션', 'cmp.hint': '드래그해서 비교 ✦',
      'proc.num': 'I · 과정', 'proc.h2': '비하인드<br>더 신', 'proc.note': '스케치에서<br>최종 애니메이션까지!',
      'logos.title': '함께 일한 곳', 'logos.more': '그 외 다수',
      'work.num': 'II · 작업', 'work.note': '카테고리를 선택해 보세요.', 'work.all': '모든 작업 보기',
      'about.num': 'III · 소개', 'about.h2': '저는요',
      'about.lead': '안녕하세요! 이집트 알렉산드리아에서 활동하는 2D 애니메이터이자 비주얼 스토리텔러, 하야 하산입니다. 캐릭터와 감정, 이야기에 애니메이션으로 생명을 불어넣는 일을 좋아하며, 특히 어린이 교육용 애니메이션을 사랑합니다. ',
      'about.s1': '년간의 애니메이션 · 모션 작업', 'about.s2': '함께 일한 국가', 'about.s3': '애니메이션 디플로마 과정에서',
      'about.more': '더 알아보기 ',
      'edu.h': '학력', 'edu.p': '2D 애니메이션 &amp; 모션 그래픽 디플로마, ITI<br>인테리어 건축 학사, 알렉산드리아 대학교',
      'exp.h': '경력', 'exp.p': '2D 애니메이터 &amp; 모션 디자이너<br>이집트 · 사우디 · UAE · 쿠웨이트 · 오만',
      'skills.num': 'IV · 스킬', 'skills.h2': '애니메이션<br>스킬',
      'sk1': '2D 캐릭터 애니메이션', 'sk2': '프레임 바이 프레임 애니메이션', 'sk3': '컷아웃 애니메이션', 'sk4': '모션 그래픽', 'sk5': '비주얼 스토리텔링', 'sk6': '스토리보딩',
      'soft.h': ' 소프트웨어 숙련도',
      'contact.num': 'V · 연락', 'contact.h2': '함께<br>만들어요! ', 'contact.loc': '이집트 알렉산드리아', 'contact.btn': '연락하기',
      'wk.back': '홈으로', 'wk.num': '카테고리 선택', 'wk.note': '2D, 3D, 모션 등 — 선별한 작업을 한곳에.', 'wk.vimeo': 'Vimeo에서 더 보기',
      'all': '전체', 'soon': '곧 공개', 'proj1': '{n}개', 'projN': '{n}개', 'emptyMsg': '{cat} 프로젝트는 곧 공개됩니다.',
      'play': '재생', 'copied': '이메일 복사됨 ✦', 'local': '현지 시간', 'music': '탭하여 음악 재생 ♪',
      'cur.play': '재생', 'cur.open': '열기', 'cur.soon': '곧',
    },
    ja: {
      'name1': 'ハヤ', 'name2': 'ハッサン',
      'loader.hint': 'ハヤの小さな世界をひらいています ✦', 'loader.skip': 'イントロをスキップ',
      'nav.process': '制作の裏側', 'nav.work': '作品', 'nav.about': 'プロフィール', 'nav.skills': 'スキル', 'nav.contact': 'お問い合わせ',
      'cat.2d.label': '2Dアニメーション', 'cat.2d.blurb': 'キャラクター、芝居、フレームバイフレーム',
      'cat.mg.label': '2D／3Dモーショングラフィックス', 'cat.mg.blurb': 'ロゴリビール、タイトル、解説動画',
      'cat.3d.label': '3Dアニメーション', 'cat.3d.blurb': 'モデル、シーン、レンダー',
      'cat.story.label': 'ストーリーボード', 'cat.story.blurb': 'ボードとアニマティック',
      'cat.concept.label': 'コンセプトアート＆イラスト', 'cat.concept.blurb': 'キャラクター、世界観、ムード',
      'cat.interior.label': 'インテリアデザイン', 'cat.interior.blurb': '空間と建築',
      'hero.role': '2Dアニメーション＆<br>ビジュアルストーリーテラー', 'hero.tag': 'キャラクターと物語に<br>命を吹き込みます ',
      'btn.reel': 'ショーリールを見る',
      'cmp.l': '原画', 'cmp.r': '完成アニメーション', 'cmp.hint': 'ドラッグして比較 ✦',
      'proc.num': 'I · プロセス', 'proc.h2': '制作の<br>舞台裏', 'proc.note': 'スケッチから<br>完成アニメーションまで！',
      'logos.title': '共に仕事をした先', 'logos.more': 'ほか多数',
      'work.num': 'II · 作品', 'work.note': 'カテゴリーを選んでご覧ください。', 'work.all': 'すべての作品を見る',
      'about.num': 'III · 自己紹介', 'about.h2': '私について',
      'about.lead': 'こんにちは！エジプトのアレクサンドリアを拠点に活動する、2Dアニメーター兼ビジュアルストーリーテラーのハヤ・ハッサンです。キャラクターや感情、物語にアニメーションで命を吹き込むことが大好きで、特に子ども向けの教育アニメーションに力を入れています。',
      'about.s1': '年のアニメーション＆モーション制作経験', 'about.s2': '共に仕事をした国', 'about.s3': 'アニメーション専攻ディプロマ',
      'about.more': 'もっと見る ',
      'edu.h': '学歴', 'edu.p': '2Dアニメーション＆モーショングラフィックス ディプロマ（ITI）<br>インテリア建築 学士（アレクサンドリア大学）',
      'exp.h': '経歴', 'exp.p': '2Dアニメーター＆モーションデザイナー<br>エジプト · サウジ · UAE · クウェート · オマーン',
      'skills.num': 'IV · スキル', 'skills.h2': 'アニメーション<br>スキル',
      'sk1': '2Dキャラクターアニメーション', 'sk2': 'フレームバイフレームアニメーション', 'sk3': 'カットアウトアニメーション', 'sk4': 'モーショングラフィックス', 'sk5': 'ビジュアルストーリーテリング', 'sk6': 'ストーリーボード',
      'soft.h': ' ソフトウェア習熟度',
      'contact.num': 'V · お問い合わせ', 'contact.h2': '一緒に<br>つくりましょう！', 'contact.loc': 'エジプト、アレクサンドリア', 'contact.btn': '連絡する',
      'wk.back': 'ホームへ戻る', 'wk.num': 'カテゴリーを選ぶ', 'wk.note': '2D、3D、モーションなど — 厳選した作品をひとつの場所に。', 'wk.vimeo': 'Vimeoでもっと見る',
      'all': 'すべて', 'soon': '近日公開', 'proj1': '{n}件', 'projN': '{n}件', 'emptyMsg': '{cat}のプロジェクトは近日公開です。',
      'play': '再生', 'copied': 'メールアドレスをコピーしました ✦', 'local': '現地時間', 'music': 'タップして音楽を再生 ♪',
      'cur.play': '再生', 'cur.open': '開く', 'cur.soon': '近日',
    },
  };
  window.HAYA_I18N = D; window.HAYA_LANGS = LANGS;

  let lang = 'en';
  try { const s = localStorage.getItem('hayaLang'); if (s && D[s]) lang = s; else { const n = (navigator.language || '').slice(0, 2); if (D[n] && n !== 'en') lang = n; } } catch (e) {}

  const T = (k, fb) => (D[lang] && D[lang][k] != null ? D[lang][k] : (D.en[k] != null ? D.en[k] : (fb != null ? fb : k)));
  window.HAYA_T = T;
  window.HAYA_LANG = () => lang;
  window.HAYA_FMT = (k, vars) => T(k).replace(/\{(\w+)\}/g, (_, v) => (vars[v] != null ? vars[v] : ''));

  /* ---------- fonts for the non-Latin languages (loaded only when needed) ---------- */
  const FONTS = {
    ar: 'family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Cairo:wght@400;600;700',
    ko: 'family=Nanum+Myeongjo:wght@400;700;800&family=Noto+Sans+KR:wght@400;500;700',
    ja: 'family=Shippori+Mincho:wght@400;600;700&family=Noto+Sans+JP:wght@400;500;700',
  };
  function loadFont(l) {
    if (!FONTS[l] || document.getElementById('font-' + l)) return;
    const a = document.createElement('link'); a.id = 'font-' + l; a.rel = 'stylesheet'; a.href = 'https://fonts.googleapis.com/css2?' + FONTS[l] + '&display=swap';
    document.head.appendChild(a);
  }

  /* ---------- swap text, keeping icons (svg) and ornaments ---------- */
  const keep = n => n.nodeType === 1 && (n.tagName.toLowerCase() === 'svg' || n.classList.contains('orn'));
  function setText(el, html) {
    const pre = [], post = []; let seen = false;
    [...el.childNodes].forEach(n => {
      if (keep(n)) (seen ? post : pre).push(n);
      else if (n.nodeType === 1 || (n.textContent || '').trim()) seen = true;
    });
    el.innerHTML = html;
    if (pre.length) el.prepend(...pre);
    if (post.length) el.append(...post);
  }
  let apply = function apply(root) {
    (root || document).querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n'), v = T(k, null);
      if (v != null) setText(el, v);
    });
  };
  const nameAria = () => { const h = document.querySelector('.hero__title'); if (h) h.setAttribute('aria-label', T('name1') + ' ' + T('name2')); };
  const _apply = apply;
  apply = function (r) { _apply(r); nameAria(); };
  window.HAYA_APPLY = apply;

  function setDoc() {
    const h = document.documentElement;
    h.lang = lang; h.dir = 'ltr'; h.classList.toggle('rtl', lang === 'ar');
    h.classList.remove('l-en', 'l-ar', 'l-ko', 'l-ja'); h.classList.add('l-' + lang);
    loadFont(lang);
  }
  setDoc();
  const run = () => { if (lang !== 'en') apply(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();

  /* ---------- switcher in the nav ---------- */
  function mount() {
    const nav = document.getElementById('nav'); if (!nav || nav.querySelector('.lang')) return;
    const box = document.createElement('div'); box.className = 'lang';
    box.innerHTML = '<button type="button" class="lang__btn" aria-haspopup="true" aria-expanded="false" aria-label="Language"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg><span class="lang__cur"></span></button><ul class="lang__list" role="menu">' +
      LANGS.map(l => `<li><button type="button" role="menuitem" data-l="${l.code}" lang="${l.code}">${l.label}</button></li>`).join('') + '</ul>';
    const burger = nav.querySelector('.nav__burger'); burger ? nav.insertBefore(box, burger) : nav.appendChild(box);
    const cur = box.querySelector('.lang__cur'), btn = box.querySelector('.lang__btn');
    const paint = () => { cur.textContent = LANGS.find(l => l.code === lang).short; box.querySelectorAll('[data-l]').forEach(b => b.classList.toggle('is-on', b.dataset.l === lang)); };
    paint();
    const close = () => { box.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); };
    btn.addEventListener('click', e => { e.stopPropagation(); const o = box.classList.toggle('is-open'); btn.setAttribute('aria-expanded', o); });
    document.addEventListener('click', close); document.addEventListener('keydown', e => e.key === 'Escape' && close());
    box.querySelectorAll('[data-l]').forEach(b => b.addEventListener('click', () => { close(); window.HAYA_SETLANG(b.dataset.l); paint(); }));
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();

  window.HAYA_SETLANG = function (l) {
    if (!D[l] || l === lang) return;
    lang = l; try { localStorage.setItem('hayaLang', l); } catch (e) {}
    setDoc(); apply();
    window.HAYA_REBUILD && window.HAYA_REBUILD();   // cards, tabs, ornaments…
    const snd = document.querySelector('.snd__tip'); if (snd) snd.textContent = T('music');
    document.dispatchEvent(new CustomEvent('hayalang', { detail: l }));
  };
})();
