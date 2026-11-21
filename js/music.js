/* Background music — soft loop with a little on/off button (bottom-left).
   Browsers block sound until the first click/tap/key, so it starts on the visitor's first interaction.
   Pauses while a video is open, remembers on/off and the position when moving between pages. */
(function () {
  const SRC = './media/music.mp3', VOL = 0.35;
  const store = { get: k => { try { return sessionStorage.getItem(k) || localStorage.getItem(k); } catch (e) { return null; } },
                  set: (k, v, s) => { try { (s ? sessionStorage : localStorage).setItem(k, v); } catch (e) {} } };
  const a = window.hayaAudio = new Audio(); a.src = SRC; a.loop = true; a.preload = 'auto'; a.volume = 0;
  let want = store.get('hayaMusic') !== 'off';      // visitor's choice
  let held = false;                                  // paused because a video is open / tab hidden
  const t0 = parseFloat(store.get('hayaMusicT')); if (t0) a.addEventListener('loadedmetadata', () => { try { a.currentTime = t0 % (a.duration || 1e9); } catch (e) {} }, { once: true });

  const btn = document.createElement('button');
  btn.className = 'snd'; btn.type = 'button'; btn.dataset.cursor = 'Music';
  btn.innerHTML = '<i></i><i></i><i></i><i></i><span class="snd__tip">' + (window.HAYA_T ? HAYA_T('music') : 'Tap for music ♪') + '</span>';
  const paint = () => { const on = !a.paused && want; btn.classList.toggle('is-on', on); btn.setAttribute('aria-pressed', on); btn.setAttribute('aria-label', on ? 'Turn music off' : 'Turn music on'); };

  let fade;
  const ramp = (to, done) => { clearInterval(fade); fade = setInterval(() => { const d = to - a.volume; if (Math.abs(d) < .03) { a.volume = to; clearInterval(fade); done && done(); } else a.volume = Math.max(0, Math.min(1, a.volume + Math.sign(d) * .03)); }, 40); };
  const play = () => { if (!want || held) return Promise.resolve(); return a.play().then(() => { ramp(VOL); paint(); }).catch(() => { btn.classList.add('need'); paint(); }); };
  const hint = () => { const h = document.querySelector('.loader__hint'); if (h && !h.dataset.snd) { h.dataset.snd = 1; h.innerHTML += '<br><span style="opacity:.85">♪ tap anywhere to start the music</span>'; } };
  const stop = () => { ramp(0, () => { a.pause(); paint(); }); };

  btn.addEventListener('click', e => { e.stopPropagation(); want = !want; store.set('hayaMusic', want ? 'on' : 'off'); want ? play() : stop(); paint(); });

  // first interaction starts the music (autoplay rules)
  const EVS = ['pointerdown', 'click', 'keydown', 'touchend'];
  const unlock = () => { if (want && a.paused) play(); };
  a.addEventListener('playing', () => btn.classList.remove('need'));
  a.addEventListener('playing', () => EVS.forEach(ev => removeEventListener(ev, unlock, true)));
  EVS.forEach(ev => addEventListener(ev, unlock, true));
  play();                                            // works straight away if the browser already allows it

  // pause while a video / the showreel is open
  const modal = document.getElementById('modal');
  if (modal) new MutationObserver(() => { held = !modal.hidden; held ? stop() : play(); }).observe(modal, { attributes: true, attributeFilter: ['hidden'] });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { held = true; a.pause(); } else { held = !!(modal && !modal.hidden); play(); } });

  // remember position for the next page
  const save = () => store.set('hayaMusicT', String(a.currentTime || 0), true);
  setInterval(save, 1000); addEventListener('pagehide', save);

  window.hayaMusic = { start: () => play(), playing: () => !a.paused, wanted: () => want };

  const mount = () => { document.body.appendChild(btn); paint(); };
  document.body ? mount() : addEventListener('DOMContentLoaded', mount);
  a.addEventListener('play', paint); a.addEventListener('pause', paint);
})();
