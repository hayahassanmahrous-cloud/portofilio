/* ============================================================
   Haya Hassan — portfolio · main.js
   intro sequence → looping landing → cursor system → scroll anims
   ============================================================ */
(() => {
  'use strict';

  /* ---------- CONFIG (edit me) ---------- */
  const CONFIG = {
    fps: 24,
    intro: { count: 41, path: i => `./intro/i${String(i).padStart(3, '0')}.webp` },
    loop:  { count: 32, path: i => `./loop/l${String(i).padStart(3, '0')}.webp` },
    showreel: { id: '1247734704', h: 'c49ad48897' },
    compareSource: 'local',   // 'local' = instant (recommended) · 'vimeo' = your Vimeo versions
    vimeoCompare: { genka: { id: '1247734705', h: '13a37f51ef' }, final: { id: '1247734706', h: '086fb55e4e' } },
    genkaLocal: { genkaVideo: './media/genka.mp4', finalVideo: './media/final.mp4' },
    poster: './media/showreel-poster.jpg',
    email: 'hayahassanmahrous@gmail.com',
    timezone: 'Africa/Cairo',
  };

  /* project list lives in js/data.js */
  const WORK = window.HAYA_WORK || [];
  const CATS = window.HAYA_CATS || [];
  const catLabel = k => (CATS.find(c => c.key === k) || {}).label || k;
  const countOf = k => WORK.filter(w => w.cat === k).length;
  const PAGE = document.body.dataset.page || 'home';
  const vimeoSrc = w => `https://player.vimeo.com/video/${w.id}?${w.h ? 'h=' + w.h + '&' : ''}autoplay=1&title=0&byline=0&portrait=0`;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';
  if (!hasGsap) root.classList.add('no-gsap');
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  /* ============================================================
     Frame sets + player
     ============================================================ */
  const sets = { intro: [], loop: [] };
  let loaded = 0;
  const totalFrames = CONFIG.intro.count + CONFIG.loop.count;

  function preload(onProgress) {
    return new Promise(resolve => {
      let done = false;
      const finish = () => { if (!done) { done = true; resolve(); } };
      ['intro', 'loop'].forEach(name => {
        for (let i = 0; i < CONFIG[name].count; i++) {
          const img = new Image(); img.decoding = 'async';
          img.onload = img.onerror = () => { loaded++; onProgress(loaded / totalFrames); if (loaded >= totalFrames) finish(); };
          img.src = CONFIG[name].path(i);
          sets[name][i] = img;
        }
      });
      setTimeout(finish, 15000);
    });
  }

  class Player {
    constructor(canvas, set, { cover = true, alpha = false, loop = false } = {}) {
      Object.assign(this, { c: canvas, set, cover, alpha, loop, raf: 0, last: -1, t0: 0, fx: .5, fy: .5 });
      this.ctx = canvas.getContext('2d', { alpha: true });
      this.resize = this.resize.bind(this);
      addEventListener('resize', this.resize);
      this.resize();
    }
    resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const r = this.c.getBoundingClientRect();
      this.c.width = Math.max(2, Math.round(r.width * dpr));
      this.c.height = Math.max(2, Math.round(r.height * dpr));
      if (this.last >= 0) this.draw(this.last);
    }
    draw(i) {
      const img = this.set[i];
      if (!img || !img.complete || !img.naturalWidth) return;
      const { width: cw, height: ch } = this.c;
      const s = (this.cover ? Math.max : Math.min)(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      this.ctx.clearRect(0, 0, cw, ch);
      this.ctx.drawImage(img, (cw - w) * this.fx, (ch - h) * this.fy, w, h);
      this.last = i;
    }
    play(onEnd) {
      cancelAnimationFrame(this.raf); this.running = true;
      this.t0 = performance.now(); const n = this.set.length;
      const step = now => {
        if (!this.running) return;
        const f = (now - this.t0) / 1000 * CONFIG.fps;
        const i = this.loop ? Math.floor(f) % n : Math.min(n - 1, Math.floor(f));
        if (i !== this.last) this.draw(i);
        if (!this.loop && f >= n - 1) { this.running = false; onEnd && onEnd(); return; }
        this.raf = requestAnimationFrame(step);
      };
      this.raf = requestAnimationFrame(step);
    }
    pause() { this.running = false; cancelAnimationFrame(this.raf); }
    resume() { if (!this.running && this.loop) { this.running = true; this.t0 = performance.now() - (Math.max(this.last, 0) / CONFIG.fps) * 1000; this.play(); } }
    destroy() { this.pause(); removeEventListener('resize', this.resize); }
  }

  /* ============================================================
     Smooth scroll (Lenis)
     ============================================================ */
  let lenis = null;
  function initScroll() {
    if (typeof Lenis === 'undefined' || reduce) return;
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
    lenis.stop();
  }
  const scrollTo = (target, opts = {}) => {
    if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.6, ...opts });
    else (typeof target === 'number' ? scrollBy({ top: target - scrollY, behavior: 'smooth' }) : target.scrollIntoView({ behavior: 'smooth' }));
  };

  /* ============================================================
     Helpers
     ============================================================ */
  function splitChars(el) {
    const txt = el.textContent; el.textContent = '';
    [...txt].forEach(ch => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = ch; el.appendChild(s); });
    return $$('.ch', el);
  }
  function splitWords(el) {
    const out = [];
    const walk = node => [...node.childNodes].forEach(n => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          const w = document.createElement('span'); w.className = 'word'; w.textContent = part; frag.appendChild(w); out.push(w);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR' && !n.closest('svg')) walk(n);
    });
    walk(el); return out;
  }

  function buildSky() {
    const box = $('#skyStars'); if (!box) return;
    const f = document.createDocumentFragment();
    for (let i = 0; i < 70; i++) {
      const s = document.createElement('i');
      s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;--s:${6 + Math.random() * 14}px;--d:${3 + Math.random() * 4}s;--dl:${-Math.random() * 6}s`;
      f.appendChild(s);
    }
    box.appendChild(f);
  }

  // thumbnail loader: Vimeo (oEmbed) / YouTube; resolves null when offline or private, so the placeholder stays
  const thumbCache = {};
  function thumbFor(w) {
    if (w.img) return Promise.resolve({ src: w.img });
    const key = w.yt || w.id; if (!key) return Promise.resolve(null);
    if (thumbCache[key]) return thumbCache[key];
    const load = src => new Promise(res => { const im = new Image(); im.onload = () => res(src); im.onerror = () => res(null); im.src = src; });
    return thumbCache[key] = w.yt
      ? load(`https://i.ytimg.com/vi/${w.yt}/hqdefault.jpg`).then(src => src && { src })
      : fetch(`https://vimeo.com/api/oembed.json?width=1280&url=${encodeURIComponent(`https://vimeo.com/${w.id}${w.h ? '/' + w.h : ''}`)}`)
          .then(r => r.ok ? r.json() : Promise.reject())
          .then(d => d.thumbnail_url ? load(d.thumbnail_url.replace(/_\d+x\d+/, '_1280')).then(src => src && { src, title: d.title }) : null)
          .catch(() => null);
  }

  function makeCard(w, i, n) {
    const b = document.createElement('button');
    b.className = 'card'; b.type = 'button'; b.dataset.cursor = 'Play'; b.dataset.lb = i;
    b.innerHTML = `<span class="card__in"><svg class="card__flower"><use href="#i-flower"/></svg><span class="card__img is-loading"><span class="ph" aria-hidden="true"><svg width="34" height="34"><use href="#i-play"/></svg></span><img alt="" decoding="async"><span class="card__play"><svg width="24" height="24"><use href="#i-play"/></svg></span></span><span class="card__cap"><b>${String(n + 1).padStart(2, '0')}</b> <span class="t"></span><em></em></span>${w.desc ? '<span class="card__desc"></span>' : ''}</span>`;
    $('.t', b).textContent = w.title; $('em', b).textContent = catLabel(w.cat); if (w.desc) $('.card__desc', b).textContent = w.desc;
    b.setAttribute('aria-label', `Play ${w.title}`);
    thumbFor(w).then(d => {
      const box = $('.card__img', b);
      if (!d) { box.classList.remove('is-loading'); box.classList.add('is-empty'); return; }
      const im = $('img', b); im.src = d.src; im.alt = (d.title || w.title);
      box.classList.remove('is-loading'); box.classList.add('is-ready');
      if (d.title && /^(Project|Shot|Motion) ?\d+$/i.test(w.title)) $('.t', b).textContent = d.title;
    });
    return b;
  }

  // home: Selected Work = the category menu
  function buildMenu() {
    const wrap = $('#cards'); if (!wrap) return;
    wrap.className = 'cats';
    CATS.forEach((c, i) => {
      const n = countOf(c.key), a = document.createElement('a');
      a.className = 'cat' + (n ? '' : ' is-soon'); a.href = `work.html#${c.key}`; a.dataset.iris = ''; a.dataset.cursor = n ? 'Open' : 'Soon';
      a.innerHTML = `<span class="cat__in"><svg class="card__flower"><use href="#i-flower"/></svg><span class="cat__img is-loading" data-k="${c.key}"><span class="ph"><b>${c.code}</b></span><img alt="" decoding="async">${n ? '' : '<i class="cat__soon">Coming soon</i>'}</span><span class="cat__cap"><b>${String(i + 1).padStart(2, '0')}</b><span class="t">${c.label}</span><em>${n ? n + (n === 1 ? ' project' : ' projects') : ''}</em></span><span class="cat__blurb">${c.blurb}</span></span>`;
      const first = WORK.find(w => w.cat === c.key && (w.id || w.yt || w.img));
      first ? thumbFor(first).then(d => { const box = $('.cat__img', a); box.classList.remove('is-loading'); if (d) { $('img', a).src = d.src; box.classList.add('is-ready'); } else box.classList.add('is-empty'); }) : $('.cat__img', a).classList.replace('is-loading', 'is-empty');
      wrap.appendChild(a);
    });
  }

  // home: the category links inside the Selected Work panel
  function buildChips() {
    const box = $('#catChips'); if (!box) return;
    CATS.forEach(c => { const a = document.createElement('a'); a.href = `work.html#${c.key}`; a.textContent = c.label; a.setAttribute('data-iris', ''); box.appendChild(a); });
  }

  // work page: category tabs + filtered grid
  function buildWork() {
    const wrap = $('#cards'), tabs = $('#tabs'); if (!wrap) return;
    const all = [{ key: 'all', label: 'All' }, ...CATS];
    let cur = 'all';
    const render = (key, animate) => {
      cur = key; wrap.replaceChildren();
      const list = WORK.map((w, i) => ({ w, i })).filter(x => key === 'all' || x.w.cat === key);
      list.forEach((x, n) => wrap.appendChild(makeCard(x.w, x.i, n)));
      if (!list.length) { const e = document.createElement('p'); e.className = 'empty'; e.innerHTML = `<svg class="gem" width="26" height="26"><use href="#i-star4"/></svg>${catLabel(key)} projects are coming soon.`; wrap.appendChild(e); }
      $$('button', tabs).forEach(t => { const on = t.dataset.k === key; t.classList.toggle('is-on', on); t.setAttribute('aria-selected', on); });
      if (hasGsap && !reduce && animate) { gsap.from(wrap.children, { opacity: 0, y: 50, scale: .92, duration: .8, stagger: .07, ease: 'power3.out', clearProps: 'all' }); }
      if (finePointer && hasGsap && !reduce) $$('.card', wrap).forEach(tiltCard);
      hasGsap && ScrollTrigger.refresh();
    };
    tabs.replaceChildren(...all.map(c => {
      const b = document.createElement('button'); b.type = 'button'; b.role = 'tab'; b.dataset.k = c.key; b.dataset.cursor = '';
      const n = c.key === 'all' ? WORK.length : countOf(c.key);
      b.innerHTML = `<span>${c.label}</span><sup>${n}</sup>`; b.addEventListener('click', () => { history.replaceState(null, '', c.key === 'all' ? 'work.html' : '#' + c.key); render(c.key, true); });
      return b;
    }));
    const fromHash = () => { const k = location.hash.slice(1); return all.some(c => c.key === k) ? k : 'all'; };
    render(fromHash(), false);
    addEventListener('hashchange', () => render(fromHash(), true));
  }

  /* ============================================================
     CURSOR SYSTEM  (sprites extracted from your cursor board)
       normal · hover · link · click   — star states
       trail                          — ribbon + sparkles + flowers
       click animation                — ring burst
     ============================================================ */
  const HOT = { normal: [.42, .50], hover: [.40, .55], link: [.36, .46], click: [.50, .56] };
  const SCALE = .36; // sprite px → screen px
  const fx = { x: -100, y: -100, rx: -100, ry: -100, vx: 0, vy: 0, state: 'normal', down: false, tag: '' };
  const sprites = {};
  function loadSprite(n) { const i = new Image(); i.src = `./cursor/${n}.png`; sprites[n] = i; return i; }

  function burstAt(x, y) {
    if (reduce) return;
    const im = new Image(); im.src = './cursor/burst.png'; im.className = 'burst';
    im.style.left = x - 100 + 'px'; im.style.top = y - 100 * (215 / 295) + 'px'; im.style.width = '200px';
    document.body.appendChild(im);
    const a = im.animate([
      { opacity: 0, transform: 'scale(.25) rotate(-40deg)' },
      { opacity: 1, transform: 'scale(.8) rotate(0deg)', offset: .3 },
      { opacity: 0, transform: 'scale(1.5) rotate(60deg)' }], { duration: 760, easing: 'cubic-bezier(.22,1,.36,1)' });
    a.onfinish = () => im.remove();
    for (let i = 0; i < 9; i++) spawn(x, y, { burst: true, a: (i / 9) * Math.PI * 2 + Math.random() * .4 });
  }

  const parts = [];
  function spawn(x, y, o = {}) {
    if (parts.length > 90) return;
    const r = Math.random(); const kind = o.burst ? (r < .6 ? 'spark' : r < .8 ? 'star4' : 'flower') : (r < .55 ? 'spark' : r < .75 ? 'star4' : 'flower');
    const ang = o.a ?? Math.random() * Math.PI * 2, sp = o.burst ? 2.2 + Math.random() * 2.6 : Math.random() * .6;
    parts.push({ kind, x: x + (o.burst ? 0 : (Math.random() - .5) * 18), y: y + (o.burst ? 0 : (Math.random() - .5) * 18),
      vx: Math.cos(ang) * sp + (o.burst ? 0 : (Math.random() - .5) * .5), vy: Math.sin(ang) * sp + (o.burst ? 0 : .25),
      rot: Math.random() * 6.28, vr: (Math.random() - .5) * .08, size: kind === 'flower' ? 15 + Math.random() * 12 : 9 + Math.random() * 14,
      life: 0, max: (o.burst ? 650 : 900) + Math.random() * 600 });
  }

  function initCursor() {
    ['spark', 'star4', 'flower'].forEach(loadSprite);
    const canvas = $('#fx'), ctx = canvas.getContext('2d');
    const cur = $('#cur'), imgs = $$('.cur__img', cur), tag = $('#curTag');
    const dpr = () => Math.min(devicePixelRatio || 1, 2);
    const size = () => { canvas.width = innerWidth * dpr(); canvas.height = innerHeight * dpr(); };
    size(); addEventListener('resize', size);

    // size + hotspot per sprite
    imgs.forEach(im => {
      const set = () => { const [hx, hy] = HOT[im.dataset.s]; im.style.setProperty('--w', im.naturalWidth * SCALE + 'px'); im.style.setProperty('--hx', hx * 100 + '%'); im.style.setProperty('--hy', hy * 100 + '%'); };
      im.complete ? set() : im.addEventListener('load', set);
    });
    const setState = s => {
      if (fx.state === s) return; fx.state = s;
      imgs.forEach(im => im.classList.toggle('is-on', im.dataset.s === s));
    };
    const stateFor = t => {
      if (fx.down) return 'click';
      const el = t && t.closest ? t.closest('a[href],button,[data-cursor],[role=slider],input,textarea,select,summary') : null;
      if (!el) return 'normal';
      return el.matches('a[href]') && !el.matches('[data-cursor]') ? 'link' : 'hover';
    };
    let lastT = null;
    addEventListener('pointermove', e => {
      if (e.pointerType === 'touch') return;
      fx.x = e.clientX; fx.y = e.clientY; lastT = e.target;
      if (fx.rx < 0) { fx.rx = fx.x; fx.ry = fx.y; }
      setState(stateFor(e.target));
      const t = e.target.closest && e.target.closest('[data-cursor]');
      const txt = t ? t.dataset.cursor : '';
      if (txt !== fx.tag) { fx.tag = txt; tag.textContent = txt; tag.classList.toggle('is-on', !!txt); }
    }, { passive: true });
    document.addEventListener('pointerdown', e => { if (e.pointerType === 'touch') return; fx.down = true; setState('click'); burstAt(e.clientX, e.clientY); });
    addEventListener('pointerup', () => { fx.down = false; setState(stateFor(lastT)); });
    document.documentElement.addEventListener('pointerleave', () => { cur.style.opacity = 0; }); document.documentElement.addEventListener('pointerenter', () => { cur.style.opacity = 1; });

    // trail
    const trail = []; let acc = 0, lx = fx.x, ly = fx.y, prev = performance.now();
    const loop = now => {
      const dt = Math.min(48, now - prev); prev = now;
      // smooth follow
      fx.rx += (fx.x - fx.rx) * Math.min(1, dt * .028); fx.ry += (fx.y - fx.ry) * Math.min(1, dt * .028);
      fx.vx += ((fx.x - fx.rx) - fx.vx) * .15;
      const tilt = Math.max(-18, Math.min(18, (fx.x - fx.rx) * .35));
      cur.style.transform = `translate3d(${fx.rx}px,${fx.ry}px,0) rotate(${tilt}deg)`;

      // ribbon points
      const last = trail[trail.length - 1];
      if (!last || Math.hypot(fx.rx - last.x, fx.ry - last.y) > 1.5) trail.push({ x: fx.rx, y: fx.ry, t: now });
      while (trail.length && now - trail[0].t > 620) trail.shift();
      const moved = Math.hypot(fx.rx - lx, fx.ry - ly); lx = fx.rx; ly = fx.ry; acc += moved;
      if (!reduce && acc > 30) { acc = 0; spawn(fx.rx, fx.ry); }

      const D = dpr(); ctx.setTransform(D, 0, 0, D, 0, 0); ctx.clearRect(0, 0, innerWidth, innerHeight);
      if (!reduce && trail.length > 3) {
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        for (let pass = 0; pass < 3; pass++) {
          for (let i = 1; i < trail.length; i++) {
            const a = trail[i - 1], b = trail[i], k = i / trail.length, age = 1 - (now - b.t) / 620;
            const w = (pass === 0 ? 26 : pass === 1 ? 12 : 3.2) * Math.pow(k, 1.1);
            ctx.strokeStyle = pass === 0 ? `rgba(196,160,255,${.16 * age * k})` : pass === 1 ? `rgba(226,190,255,${.42 * age})` : `rgba(255,243,220,${.95 * age * k})`;
            ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(a.x, a.y);
            const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2; ctx.quadraticCurveTo(a.x, a.y, mx, my); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // particles
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.life += dt; if (p.life > p.max) { parts.splice(i, 1); continue; }
        p.x += p.vx * dt * .06; p.y += p.vy * dt * .06; p.vx *= .985; p.vy *= .985; p.vy += .004 * dt * .06; p.rot += p.vr * dt * .06;
        const k = p.life / p.max, a = k < .15 ? k / .15 : 1 - (k - .15) / .85, img = sprites[p.kind];
        if (!img.complete) continue;
        const s = p.size * (p.kind === 'flower' ? 1 : 1 + Math.sin(k * 12) * .12);
        ctx.save(); ctx.globalAlpha = Math.max(0, a); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.shadowColor = 'rgba(140,90,230,.8)'; ctx.shadowBlur = 8;
        ctx.drawImage(img, -s / 2, -s / 2 * (img.naturalHeight / img.naturalWidth), s, s * (img.naturalHeight / img.naturalWidth)); ctx.restore();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    root.classList.add('has-cursor');
  }

  /* ============================================================
     Hero + page animations
     ============================================================ */
  const heroChars = [];
  function prepHero() { $$('.hero__title .chars').forEach(el => heroChars.push(...splitChars(el))); }

  function heroIn() {
    if (!hasGsap || reduce) { root.classList.add('no-gsap'); return; }
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.from(heroChars, { yPercent: 70, opacity: 0, scale: .7, filter: 'blur(14px)', duration: 1.1, stagger: .06, ease: 'power3.out' }, .1)
      .from('.hero__role', { opacity: 0, y: 14, letterSpacing: '.4em', duration: 1.2 }, .5)
      .from('.orbit', { opacity: 0, scale: .6, rotate: -25, duration: 1.5, ease: 'power3.out' }, .2)
      .fromTo('.hero__tag', { y: 40 }, { opacity: 1, y: 0, duration: 1 }, .45)
      .fromTo('.hero__foot .btn', { y: 40 }, { opacity: 1, y: 0, duration: 1 }, .6)
      .from('.hero__sky svg', { opacity: 0, y: 40, duration: 1.5, stagger: .15 }, .2)
      .from('.nav', { yPercent: -150, opacity: 0, duration: .9, onComplete: () => { const n = $('#nav'); n.style.removeProperty('transform'); n.style.removeProperty('translate'); n.style.removeProperty('rotate'); n.style.removeProperty('scale'); } }, .5);
  }


  // animated gold line + star ornament before each section title
  function addOrnaments() {
    $$('.h2:not(.h2--xl)').forEach(h => {
      if (h.querySelector('.orn')) return;
      const o = document.createElement('span'); o.className = 'orn'; o.setAttribute('aria-hidden', 'true');
      o.innerHTML = '<svg viewBox="0 0 96 48"><path class="ln" d="M4 24h26"/><path class="ln r" d="M66 24h26"/><path class="st" d="M48 6c2 12 6 16 18 18-12 2-16 6-18 18-2-12-6-16-18-18 12-2 16-6 18-18Z"/><circle class="dt" cx="76" cy="10" r="2.4"/><circle class="dt b" cx="20" cy="38" r="2"/></svg>';
      h.insertBefore(o, h.firstChild);
    });
  }

  function scrollAnims() {
    if (!hasGsap || reduce) return;

    $$('[data-split]').forEach(h => {
      const words = splitWords(h);
      gsap.from(words, { yPercent: 70, opacity: 0, filter: 'blur(8px)', duration: 1.1, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 88%' } });
      const gem = $('.gem.lg', h); if (gem) gsap.from(gem, { scale: 0, rotate: -180, duration: 1.2, ease: 'back.out(2)', scrollTrigger: { trigger: h, start: 'top 88%' } });
    });

    $$('[data-reveal]').forEach(el => {
      const kind = el.dataset.reveal;
      const from = { opacity: 0, y: 46, duration: 1.1, ease: 'power3.out' };
      if (kind === 'left') Object.assign(from, { x: -80, y: 20, rotate: -4 });
      if (kind === 'right') Object.assign(from, { x: 80, y: 20, rotate: 6 });
      if (kind === 'pop') Object.assign(from, { scale: .8, y: 60, rotate: 4, ease: 'back.out(1.5)', duration: 1.3 });
      gsap.fromTo(el, from, { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, duration: from.duration, ease: from.ease, immediateRender: true, clearProps: 'transform',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
    });

    $$('.card__in,.cat__in').forEach((el, i) => gsap.from(el, { opacity: 0, y: 90, scale: .86, rotate: i % 2 ? 6 : -6, duration: 1.2, ease: 'back.out(1.4)', scrollTrigger: { trigger: el, start: 'top 92%' } }));

    $$('[data-speed]').forEach(el => {
      const sp = parseFloat(el.dataset.speed);
      gsap.to(el, { y: () => -sp * 260, ease: 'none', scrollTrigger: { trigger: el.closest('section') || document.body, start: 'top bottom', end: 'bottom top', scrub: .6 } });
    });
    if ($('.about__art img')) gsap.fromTo('.about__art img', { yPercent: 6 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.about', start: 'top bottom', end: 'bottom top', scrub: true } });
    if ($('.contact__art img')) gsap.fromTo('.contact__art img', { yPercent: 10 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top 80%', end: 'center center', scrub: true } });

    $$('[data-count]').forEach(el => {
      const end = +el.dataset.count, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', o = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => gsap.to(o, { v: end, duration: 1.8, ease: 'power2.out', onUpdate: () => el.textContent = pre + Math.round(o.v) + suf }) });
    });
    $$('.bar').forEach(bar => {
      const pct = +bar.dataset.pct, fill = $('u', bar), num = $('b', bar), o = { v: 0 };
      ScrollTrigger.create({ trigger: bar, start: 'top 92%', once: true, onEnter: () => {
        gsap.to(fill, { scaleX: pct / 100, duration: 1.6, ease: 'power3.out' });
        gsap.to(o, { v: pct, duration: 1.6, ease: 'power3.out', onUpdate: () => num.textContent = Math.round(o.v) + '%' });
      } });
    });
    gsap.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: .3 } });
  }

  /* ---------- nav ---------- */
  function initNav() {
    const nav = $('#nav'), links = $$('#navLinks a'), burger = $('#burger'), menu = $('#navLinks');
    let lastY = 0;
    const onScroll = y => {
      nav.classList.toggle('is-solid', y > 40);
      nav.classList.toggle('is-hidden', y > lastY && y > 400 && !menu.classList.contains('is-open'));
      lastY = y;
    };
    if (lenis) lenis.on('scroll', e => onScroll(e.scroll)); else addEventListener('scroll', () => onScroll(scrollY), { passive: true });
    const map = new Map(links.map(a => [a.getAttribute('href'), a]));
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { links.forEach(l => l.classList.remove('is-active')); map.get('#' + e.target.id)?.classList.add('is-active'); }
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('section[id]').forEach(s => io.observe(s));
    const closeMenu = () => { menu.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); lenis && lenis.start(); };
    $$('[data-scroll]').forEach(a => a.addEventListener('click', e => {
      const id = a.getAttribute('href'); if (!id || id[0] !== '#' || !(id === '#top' || $(id))) return;
      e.preventDefault(); closeMenu();
      id === '#top' ? scrollTo(0) : scrollTo($(id), { offset: id === '#work' ? -20 : 0 });
    }));
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') !== 'true';
      burger.setAttribute('aria-expanded', open); menu.classList.toggle('is-open', open);
      lenis && (open ? lenis.stop() : lenis.start());
    });
    $('#toTop')?.addEventListener('click', () => scrollTo(0));
  }

  function tiltCard(c) {
    const inn = $('.card__in,.cat__in', c); if (!inn) return;
    const rx = gsap.quickTo(inn, 'rotationX', { duration: .5, ease: 'power3' }), ry = gsap.quickTo(inn, 'rotationY', { duration: .5, ease: 'power3' });
    c.addEventListener('pointermove', e => { const r = c.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - .5) * 14); rx(-((e.clientY - r.top) / r.height - .5) * 14); });
    c.addEventListener('pointerleave', () => { rx(0); ry(0); });
  }

  function initPointerFx() {
    if (!finePointer || !hasGsap || reduce) return;
    $$('[data-magnetic]').forEach(b => {
      const qx = gsap.quickTo(b, 'x', { duration: .6, ease: 'elastic.out(1,.5)' }), qy = gsap.quickTo(b, 'y', { duration: .6, ease: 'elastic.out(1,.5)' });
      b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); qx((e.clientX - r.left - r.width / 2) * .3); qy((e.clientY - r.top - r.height / 2) * .4); });
      b.addEventListener('pointerleave', () => { qx(0); qy(0); });
    });
    $$('.card,.cat').forEach(tiltCard);
  }

  /* ---------- key drawings ↔ final compare ---------- */
  function initCompare() {
    const box = $('#compare'), handle = $('#handle');
    if (!box) return;
    // ---- Vimeo mode: two background-mode players kept in lock-step with the Vimeo Player SDK ----
    // ---- Fallback: the two local mp4s (same sync idea) if Vimeo can't load ----
    let inView = false, fell = false, onView = () => {};
    new IntersectionObserver(es => es.forEach(e => { inView = e.isIntersecting; onView(); }), { threshold: .25 }).observe(box);

    // Local clips (tiny, instant). Set CONFIG.compareSource = 'vimeo' to use the Vimeo versions instead (slower to start).
    const useLocal = () => {
      if (fell) return; fell = true;
      $$('iframe', box).forEach(f => f.remove());
      let video = $('#genkaVideo', box), fin = $('#finalVideo', box);
      const mk = (id, cls) => { const v = document.createElement('video'); v.id = id; if (cls) v.className = cls; v.src = CONFIG.genkaLocal[id]; v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'; return v; };
      if (!video) { video = mk('genkaVideo'); box.prepend(video); }
      if (!fin) { fin = mk('finalVideo', 'compare__final'); box.prepend(fin); }
      const rate = () => { if (video.duration && fin.duration) fin.playbackRate = fin.duration / video.duration; };
      [video, fin].forEach(v => v.readyState >= 1 ? rate() : v.addEventListener('loadedmetadata', rate));
      onView = () => { if (inView) { video.currentTime = 0; fin.currentTime = 0; video.play().catch(() => {}); fin.play().catch(() => {}); } else { video.pause(); fin.pause(); } };
      const tick = () => {
        if (inView && video.duration && fin.duration) { const want = video.currentTime / video.duration * fin.duration; if (Math.abs(fin.currentTime - want) > .07) fin.currentTime = want; }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick); onView();
    };

    const useVimeo = () => {
      const mkF = (v, cls) => { const f = document.createElement('iframe'); f.id = cls ? 'finalVideo' : 'genkaVideo'; if (cls) f.className = cls; f.src = `https://player.vimeo.com/video/${v.id}?h=${v.h}&background=1&autoplay=1&loop=1&muted=1&autopause=0&dnt=1`; f.allow = 'autoplay; fullscreen'; f.tabIndex = -1; return f; };
      const fa = mkF(CONFIG.vimeoCompare.genka), fb = mkF(CONFIG.vimeoCompare.final, 'compare__final');
      $$('video', box).forEach(v => v.remove()); box.prepend(fb); box.prepend(fa);
      const pa = new Vimeo.Player(fa), pb = new Vimeo.Player(fb);
      const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error('vimeo timeout')), 9000));
      Promise.race([Promise.all([pa.ready(), pb.ready(), pa.getDuration(), pb.getDuration()]), timeout]).then(([, , da, db]) => {
        if (fell) return;
        pa.setLoop(true).catch(() => {}); pb.setLoop(true).catch(() => {});
        const run = () => { if (fell) return; (inView ? Promise.all([pa.play(), pb.play()]) : Promise.all([pa.pause(), pb.pause()])).catch(() => {}); };
        onView = run; run();
        setInterval(() => {
          if (!inView || fell) return;
          Promise.all([pa.getCurrentTime(), pb.getCurrentTime()]).then(([ta, tb]) => { const want = ta / da * db, diff = Math.abs(tb - want); if (diff > .25 && diff < db / 2) pb.setCurrentTime(want).catch(() => {}); }).catch(() => {});
        }, 500);
        pa.on('error', useLocal); pb.on('error', useLocal);
      }).catch(useLocal);
    };

    if (CONFIG.compareSource === 'vimeo') {
      const s = document.createElement('script'); s.src = './vendor/vimeo-player.min.js'; s.onload = () => (typeof Vimeo !== 'undefined' ? useVimeo() : useLocal()); s.onerror = useLocal; document.head.appendChild(s);
    } else useLocal();
    const set = pct => { pct = Math.max(2, Math.min(98, pct)); box.style.setProperty('--x', pct + '%'); handle.setAttribute('aria-valuenow', Math.round(pct)); };
    let drag = false;
    const move = e => { const r = box.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); };
    box.addEventListener('pointerdown', e => { drag = true; box.setPointerCapture(e.pointerId); move(e); });
    box.addEventListener('pointermove', e => { if (drag) move(e); });
    box.addEventListener('pointerup', () => drag = false);
    handle.addEventListener('keydown', e => { const v = +handle.getAttribute('aria-valuenow'); if (e.key === 'ArrowLeft') set(v - 5); if (e.key === 'ArrowRight') set(v + 5); });
    if (hasGsap && !reduce) {
      const o = { v: 92 };
      ScrollTrigger.create({ trigger: box, start: 'top 70%', once: true, onEnter: () => gsap.fromTo(o, { v: 92 }, { v: 50, duration: 2, ease: 'power3.inOut', onUpdate: () => set(o.v) }) });
      set(92);
    }
  }

  /* ---------- modal ---------- */
  function initModal() {
    const modal = $('#modal'), stage = $('#modalStage'), cap = $('#modalCap');
    let lastFocus = null;
    const open = (node, caption, desc) => {
      lastFocus = document.activeElement;
      stage.classList.toggle('is-img', node.tagName === 'IMG');
      stage.replaceChildren(node); cap.textContent = caption || '';
      if (desc) { const d = document.createElement('span'); d.className = 'modal__desc'; d.textContent = desc; cap.appendChild(d); }
      modal.hidden = false; requestAnimationFrame(() => modal.classList.add('is-open'));
      lenis && lenis.stop(); $('#modalClose').focus();
    };
    const close = () => {
      modal.classList.remove('is-open');
      setTimeout(() => { modal.hidden = true; stage.replaceChildren(); }, 400);
      lenis && lenis.start(); lastFocus && lastFocus.focus();
    };
    $('#modalClose').addEventListener('click', close);
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
    addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.hidden) close(); });

    document.addEventListener('click', e => {
      const b = e.target.closest && e.target.closest('[data-lb]'); if (!b) return;
      const w = WORK[+b.dataset.lb]; let f;
      if (w.img) { f = document.createElement('img'); f.src = w.img.replace('=w1280', '=w2000'); f.alt = w.title; f.onerror = () => { f.onerror = null; f.src = w.img; }; }
      else { f = document.createElement('iframe'); f.src = w.yt ? `https://www.youtube.com/embed/${w.yt}?autoplay=1&rel=0` : vimeoSrc(w); f.allow = 'autoplay; fullscreen; picture-in-picture'; f.allowFullscreen = true; f.title = w.title; }
      open(f, `${String(+b.dataset.lb + 1).padStart(2, '0')} · ${w.title} — ${catLabel(w.cat)}`, w.desc);
    });
    const showreel = () => {
      const f = document.createElement('iframe'); f.src = vimeoSrc(CONFIG.showreel); f.allow = 'autoplay; fullscreen; picture-in-picture'; f.allowFullscreen = true; f.title = 'Showreel — Haya Hassan';
      open(f, 'Showreel — Haya Hassan');
    };
    $$('[data-reel]').forEach(b => b.addEventListener('click', showreel));
  }

  function initMisc() {
    const clock = $('#clock');
    const tick = () => { try { clock.textContent = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: CONFIG.timezone }).format(new Date()) + ' local'; } catch (e) { clock.textContent = ''; } };
    if (clock) { tick(); setInterval(tick, 30000); }
    const toast = $('#toast'); let tt;
    const say = m => { toast.textContent = m; toast.classList.add('is-on'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('is-on'), 2200); };
    $('#mailLink')?.addEventListener('click', e => {
      if (navigator.clipboard && finePointer) { e.preventDefault(); navigator.clipboard.writeText(CONFIG.email).then(() => say('Email copied ✦ ' + CONFIG.email), () => (location.href = 'mailto:' + CONFIG.email)); }
    });
    // tap burst on touch devices
    if (!finePointer && !reduce) document.addEventListener('pointerdown', e => { if (e.pointerType === 'touch') { sprites.spark || ['spark', 'star4', 'flower'].forEach(loadSprite); startFxLoopForTouch(); burstAt(e.clientX, e.clientY); } });
  }
  // minimal particle loop for touch (no pointer cursor)
  let touchLoop = false;
  function startFxLoopForTouch() {
    if (touchLoop) return; touchLoop = true;
    const canvas = $('#fx'), ctx = canvas.getContext('2d'); canvas.style.display = 'block';
    const D = Math.min(devicePixelRatio || 1, 2); canvas.width = innerWidth * D; canvas.height = innerHeight * D; let prev = performance.now();
    const loop = now => {
      const dt = Math.min(48, now - prev); prev = now; ctx.setTransform(D, 0, 0, D, 0, 0); ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]; p.life += dt; if (p.life > p.max) { parts.splice(i, 1); continue; }
        p.x += p.vx * dt * .06; p.y += p.vy * dt * .06; p.vx *= .985; p.vy *= .985; p.rot += p.vr * dt * .06;
        const k = p.life / p.max, a = k < .15 ? k / .15 : 1 - (k - .15) / .85, img = sprites[p.kind]; if (!img || !img.complete) continue;
        const s = p.size; ctx.save(); ctx.globalAlpha = Math.max(0, a); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.shadowColor = 'rgba(140,90,230,.8)'; ctx.shadowBlur = 8;
        ctx.drawImage(img, -s / 2, -s / 2 * (img.naturalHeight / img.naturalWidth), s, s * (img.naturalHeight / img.naturalWidth)); ctx.restore();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ============================================================
     Full-bleed hero layout — the landing frame always covers the whole hero;
     the orb title/orbit follow the art via CSS vars (--ox --oy --u).
     ============================================================ */
  const ART = { w: 16, h: 9, orbX: .332 };
  function layoutHero() {
    const stage = $('#stage'); if (!stage) return;
    const W = stage.clientWidth, H = stage.clientHeight; if (!W || !H) return;
    const rw = Math.max(W, H * ART.w / ART.h), rh = rw * ART.h / ART.w;
    const narrow = W < 900;
    const fx = !narrow || rw <= W ? .5 : Math.min(1, Math.max(0, (ART.orbX * rw - W / 2) / (rw - W)));
    const fy = 0;
    stage.style.setProperty('--ox', (W - rw) * fx + 'px');
    stage.style.setProperty('--oy', (H - rh) * fy + 'px');
    stage.style.setProperty('--u', rw / 100 + 'px');
    if (loopPlayer) { loopPlayer.fx = fx; loopPlayer.fy = fy; loopPlayer.resize(); }
    layoutHero.fx = fx; layoutHero.fy = fy;
  }

  /* ============================================================
     Page iris transition (home ↔ work)
     ============================================================ */
  function initIris() {
    const iris = $('#iris'); if (!iris) return;
    if (root.classList.contains('iris-in')) {
      try { sessionStorage.removeItem('hayaIris'); } catch (e) {}
      const a = iris.animate([{ clipPath: 'circle(150% at 50% 50%)' }, { clipPath: 'circle(0% at 50% 50%)' }], { duration: 750, easing: 'cubic-bezier(.65,0,.2,1)', delay: 80, fill: 'both' });
      a.onfinish = () => { root.classList.remove('iris-in'); a.cancel(); };
    }
    $$('a[data-iris]').forEach(link => link.addEventListener('click', e => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
      e.preventDefault();
      const href = link.href, r = link.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      try { sessionStorage.setItem('hayaIris', '1'); } catch (er) {}
      if (reduce) { location.href = href; return; }
      const a = iris.animate([{ clipPath: `circle(0% at ${x}px ${y}px)` }, { clipPath: `circle(150% at ${x}px ${y}px)` }], { duration: 650, easing: 'cubic-bezier(.65,0,.2,1)', fill: 'forwards' });
      a.onfinish = () => { location.href = href; };
      setTimeout(() => { location.href = href; }, 1400);
    }));
    addEventListener('pageshow', e => { if (e.persisted) { iris.getAnimations().forEach(a => a.cancel()); root.classList.remove('iris-in'); } });
  }

  /* ============================================================
     "Worked with" revolving logo strip (speeds up with scroll)
     ============================================================ */
  function initLogos() {
    const track = $('#logoTrack'); if (!track) return;
    [...track.children].forEach(li => { const c = li.cloneNode(true); c.setAttribute('aria-hidden', 'true'); $$('img', c).forEach(im => im.alt = ''); track.appendChild(c); });
    if (reduce) { $('#logoRail').style.overflowX = 'auto'; return; }
    let x = 0, half = 0, boost = 0, hover = false, lastY = scrollY, prev = performance.now(), vis = true;
    const measure = () => { half = track.scrollWidth / 2; };
    measure(); addEventListener('resize', measure); $$('img', track).forEach(im => im.addEventListener('load', measure));
    const rail = $('#logoRail');
    rail.addEventListener('pointerenter', () => hover = true); rail.addEventListener('pointerleave', () => hover = false);
    new IntersectionObserver(es => vis = es[0].isIntersecting).observe(rail);
    const loop = now => {
      const dt = Math.min(50, now - prev) / 1000; prev = now;
      const dy = scrollY - lastY; lastY = scrollY; boost += (dy - boost) * .12;
      if (vis && half) {
        const sp = (hover ? 0 : 70) + Math.min(900, Math.abs(boost) * 40);
        x -= sp * dt * (boost < -2 ? -1 : 1);
        while (x <= -half) x += half; while (x > 0) x -= half;
        track.style.transform = `translate3d(${x}px,0,0)`;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ============================================================
     Boot: loader (intro animation) → landing loop
     ============================================================ */
  const loader = $('#loader'), num = $('#loaderNum'), bar = $('#loaderBar'), skip = $('#loaderSkip');
  let revealed = false, introPlayer = null, loopPlayer = null;

  function startLanding() {
    loopPlayer = new Player($('#loopCanvas'), sets.loop, { cover: true, loop: true });
    layoutHero();
    if (reduce) { loopPlayer.draw(0); return; }
    loopPlayer.play();
    new IntersectionObserver(es => es.forEach(e => e.isIntersecting ? loopPlayer.resume() : loopPlayer.pause()), { threshold: 0 }).observe($('#stage'));
  }

  // intro → homepage: no hold, no fade — a fast iris wipe over the landing loop while the title pops in
  function reveal() {
    if (revealed) return; revealed = true;
    introPlayer && introPlayer.pause();
    root.classList.remove('is-loading', 'iris-in');
    window.scrollTo(0, 0);
    lenis && (lenis.scrollTo(0, { immediate: true }), lenis.start());
    hasGsap && ScrollTrigger.refresh();
    startLanding();
    if (cameByIris && location.hash && $(location.hash)) requestAnimationFrame(() => { hasGsap && ScrollTrigger.refresh(); lenis ? lenis.scrollTo($(location.hash), { immediate: true }) : $(location.hash).scrollIntoView(); });
    if (hasGsap && !reduce && loader && loader.classList.contains('is-playing')) {
      loader.querySelector('.loader__skip').style.opacity = 0;
      gsap.set(loader, { clipPath: 'circle(150% at 50% 50%)' });
      gsap.to(loader, { clipPath: 'circle(0% at 50% 45%)', duration: .62, ease: 'power3.inOut', onComplete: () => { introPlayer && introPlayer.destroy(); loader.remove(); } });
      gsap.delayedCall(.08, heroIn);
    } else { loader && loader.remove(); heroIn(); }
  }

  async function boot() {
    initIris();
    if (PAGE === 'work') return bootWork();
    prepHero(); buildSky(); buildMenu(); buildChips(); initScroll(); initNav(); initModal(); initMisc(); initLogos();
    layoutHero(); addEventListener('resize', layoutHero);
    addOrnaments(); if (hasGsap) scrollAnims();
    initPointerFx();
    if (finePointer && !reduce) initCursor();

    if (cameByIris && loader) loader.style.display = 'none';
    const quick = reduce || /[?&]nointro/.test(location.search) || cameByIris;
    skip.addEventListener('click', () => { introPlayer && introPlayer.pause(); reveal(); });
    await preload(p => { const v = Math.round(p * 100); num.textContent = v; bar.style.width = v + '%'; });
    initCompare();
    if (revealed) return;
    if (quick) return reveal();
    num.textContent = '100'; bar.style.width = '100%';
    await new Promise(r => setTimeout(r, 60));
    if (revealed) return;
    loader.classList.add('is-playing');
    introPlayer = new Player($('#loaderCanvas'), sets.intro, { cover: true });
    introPlayer.play(reveal);
  }

  function bootWork() {
    buildSky(); buildWork(); initScroll(); lenis && lenis.start(); initNav(); initModal(); initMisc();
    addOrnaments(); if (hasGsap) { scrollAnims(); gsap.from('.wk-hero > .wrap > *', { opacity: 0, y: 40, duration: 1, stagger: .12, ease: 'power3.out', delay: .5 }); }
    initPointerFx();
    if (finePointer && !reduce) initCursor();
    root.classList.remove('is-loading');
  }

  const cameByIris = root.classList.contains('iris-in');
  (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(() => {
    try { boot(); } catch (err) { console.error(err); root.classList.add('no-gsap'); root.classList.remove('is-loading'); $('#loader')?.remove(); }
  });
})();
