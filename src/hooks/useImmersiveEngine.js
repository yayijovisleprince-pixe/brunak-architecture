import { useEffect } from 'react';

export function useImmersiveEngine(content) {
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const staticMode = reduced;

    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
    const mix = (a, b, t) => a + (b - a) * t;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const seg = (p, a, b, e) => { const t = clamp((p - a) / (b - a), 0, 1); return e ? e(t) : t; };

    const $ = (s, c = document) => c.querySelector(s);
    const $$ = (s, c = document) => [...c.querySelectorAll(s)];

    const wrapper = $('#smooth');
    if (!wrapper) return;

    if (staticMode) document.body.classList.add('static');
    else document.body.classList.add('is-smooth');

    let vh = window.innerHeight, vw = window.innerWidth;
    let target = 0, current = 0;
    let paused = false;
    let isDisposed = false;
    let animId = null;

    function docTop(el) {
      let t = 0, n = el;
      while (n) { t += n.offsetTop; n = n.offsetParent; }
      return t;
    }

    /* ═══════════ OUTILS ═══════════ */
    const drawRegistry = [];
    function makeDraw(el) {
      if (!el) return () => {};
      if (staticMode) { el.style.strokeDasharray = 'none'; el.style.strokeDashoffset = '0'; return () => {}; }
      const item = { el, L: 1, lastV: 1 };
      item.calc = () => {
        const svg = el.ownerSVGElement;
        const vb = svg?.viewBox?.baseVal;
        const sx = (svg?.clientWidth || 100) / ((vb && vb.width) || 100);
        const sy = (svg?.clientHeight || 100) / ((vb && vb.height) || 100);
        item.L = el.getTotalLength() * Math.max(sx, sy, 1) * 1.25;
        el.style.strokeDasharray = item.L;
        el.style.strokeDashoffset = item.L * item.lastV;
        el.style.opacity = item.lastV >= 0.999 ? '0' : '1';
      };
      item.calc();
      drawRegistry.push(item);
      return (v) => {
        item.lastV = clamp(v, 0, 1);
        el.style.strokeDashoffset = item.L * item.lastV;
        el.style.opacity = item.lastV >= 0.999 ? '0' : '1';
      };
    }
    function refreshDraws() { drawRegistry.forEach((d) => d.calc()); }
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refreshDraws);

    function makeGrow(el) {
      if (!el) return { measure() {}, set() {} };
      const img = $('img', el);
      const line = el.parentElement;
      const pin = line?.closest('.pin');
      let xOff = 0, yOff = 0, fs = 57;
      return {
        measure() {
          if (!line || !pin) return;
          fs = parseFloat(getComputedStyle(line).fontSize) || 57;
          let leftW = 0, rightW = 0, seen = false;
          [...line.children].forEach((c) => {
            if (c === el) { seen = true; return; }
            if (c.classList.contains('hl')) { if (seen) rightW += c.offsetWidth; else leftW += c.offsetWidth; }
          });
          xOff = (leftW - rightW) / 2;
          yOff = (docTop(line) - docTop(pin)) + line.offsetHeight / 2 - vh / 2;
        },
        set(t, zoom = 1, lift = t) {
          if (!line || !img) return;
          const w = vw * t;
          const h = Math.min(vh, Math.max(w / 1.9, vh * Math.pow(t, 1.6)));
          el.style.width = w.toFixed(1) + 'px';
          el.style.height = h.toFixed(1) + 'px';
          const m = fs * 0.13 + Math.min(t * 60, fs * 0.12);
          el.style.marginLeft = el.style.marginRight = m.toFixed(1) + 'px';
          el.style.borderRadius = t > 0.985 ? '0' : '2px';
          line.style.transform = `translate(${(-xOff * t).toFixed(1)}px, ${(-yOff * lift).toFixed(1)}px)`;
          img.style.transform = `translate(-50%, -50%) scale(${zoom})`;
        }
      };
    }

    /* ═══════════ SPLITS ═══════════ */
    function splitFillChars(root) {
      if (!root) return;
      const walk = (node) => {
        [...node.childNodes].forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const frag = document.createDocumentFragment();
            child.textContent.split(/(\s+)/).forEach((part) => {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
              const w = document.createElement('span');
              w.style.whiteSpace = 'nowrap';
              [...part].forEach((c) => {
                const sp = document.createElement('span');
                sp.className = 'fc';
                sp.textContent = c;
                w.appendChild(sp);
              });
              frag.appendChild(w);
            });
            node.replaceChild(frag, child);
          } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName.toLowerCase() !== 'svg') {
            walk(child);
          }
        });
      };
      walk(root);
    }

    const fillText = $('#fillText');
    splitFillChars(fillText);
    const fillChars = $$('.fc', fillText);

    $$('.floaters .fl').forEach((f, i) => f.style.setProperty('--fi', i));

    /* ═══════════ RÉVÉLATIONS ═══════════ */
    const footerName = $('#footerName');
    const revealTargets = [...$$('.reveal'), footerName, ...$$('.band-block')].filter(Boolean);
    let revealCache = [];
    function cacheReveals() {
      revealCache = revealTargets
        .filter((el) => !el.classList.contains('in-view'))
        .map((el) => ({ el, top: docTop(el) }));
    }
    function checkReveals(pos) {
      for (let i = revealCache.length - 1; i >= 0; i--) {
        if (pos + vh * 0.88 > revealCache[i].top) {
          const el = revealCache[i].el;
          el.classList.add('in-view');
          revealCache.splice(i, 1);
        }
      }
    }

    /* ═══════════ PARALLAXE ═══════════ */
    let pxCache = [];
    function cacheParallax() {
      pxCache = $$('[data-pspeed]').map((el) => ({
        el, speed: +el.dataset.pspeed, top: docTop(el), h: el.offsetHeight
      }));
    }

    let mx = 0, my = 0, mxT = 0, myT = 0;
    const onMouseMove = (e) => {
      mxT = (e.clientX / vw - 0.5) * 2;
      myT = (e.clientY / vh - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    /* ═══════════ SYSTÈME DE SCÈNES ═══════════ */
    const scenes = [];
    function addScene(sel, update) {
      const root = $(sel);
      if (!root) return;
      scenes.push({ root, pin: $('.pin', root), mult: +root.dataset.pin, start: 0, len: 1, update, lastP: -1 });
    }
    function measureScenes() {
      scenes.forEach((s) => {
        s.root.style.height = s.mult * vh + 'px';
        s.start = docTop(s.root);
        s.len = (s.mult - 1) * vh;
        s.lastP = -1;
      });
    }
    function renderScenes(pos) {
      scenes.forEach((s) => {
        if (pos + vh < s.start - vh || pos > s.start + s.len + vh * 2) return;
        const y = clamp(pos - s.start, 0, s.len);
        if (s.pin) s.pin.style.transform = `translate3d(0, ${y}px, 0)`;
        const p = clamp((pos - s.start) / s.len, 0, 1);
        if (Math.abs(p - s.lastP) < 0.0004) return;
        s.lastP = p;
        s.update(p);
      });
    }

    /* ─── SCÈNE 1 · HERO ─── */
    const grow1 = makeGrow($('#grow1'));
    const grow1Img = $('#grow1 img');
    const floaters = $$('.floaters .fl');
    let flDirs = [];
    const heroLine1 = $('#heroLine1');
    const heroKicker = $('#heroKicker');
    const introWords = $$('#spotIntro span');

    function measureFloaters() {
      flDirs = floaters.map((f) => {
        f.style.transform = 'none';
        const r = f.getBoundingClientRect();
        const ex = r.left + r.width / 2 - vw / 2;
        const ey = r.top + r.height / 2 - vh / 2;
        const n = Math.max(1, Math.hypot(ex, ey));
        return { x: ex / n, y: (ey / n) * 1.5, d: +(f.dataset.d || 0.5), ex, ey };
      });
    }

    addScene('.s-hero', (p) => {
      const enter = seg(p, 0, 0.17, easeOut);
      const drift = seg(p, 0.06, 0.46);
      const flScale = mix(0.74, 1, enter) * mix(1, 1.22, drift);
      floaters.forEach((f, i) => {
        const dir = flDirs[i] || { x: 0, y: -1, d: 0.5, ex: 0, ey: 0 };
        const pull = (1 - enter) * 0.16;
        const dist = drift * (0.8 + dir.d) * vh * 1.15;
        const tx = -dir.ex * pull + dir.x * dist + mx * dir.d * 40;
        const ty = -dir.ey * pull + dir.y * dist + my * dir.d * 26;
        f.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${(drift * dir.d * (i % 2 ? 8 : -8)).toFixed(2)}deg) scale(${flScale.toFixed(3)})`;
      });

      if (heroKicker) heroKicker.style.opacity = 1 - seg(p, 0.01, 0.10);
      if (heroLine1) heroLine1.style.opacity = 1 - seg(p, 0.03, 0.15);
      const lift = seg(p, 0.05, 0.22, easeInOut);

      const g = seg(p, 0.26, 0.58, easeInOut);
      grow1.set(g, 1 + seg(p, 0.58, 1) * 0.06, Math.max(lift, g));
      if (grow1Img) grow1Img.style.filter = `brightness(${(1 - seg(p, 0.58, 0.70) * 0.16).toFixed(3)})`;

      const fadeOut = seg(p, 0.82, 0.92);
      introWords.forEach((w, i) => {
        const k = seg(p, 0.50 + i * 0.022, 0.60 + i * 0.022, easeOut);
        w.style.opacity = (k * (1 - fadeOut)).toFixed(3);
        w.style.transform = `translateY(${((1 - k) * 14).toFixed(1)}px)`;
      });
    });

    /* ─── SCÈNE 2 · MANIFESTE ─── */
    const boxDraw = makeDraw($('#boxPath'));
    let lastFillIdx = 0;
    addScene('.s-fill', (p) => {
      const idx = Math.round(seg(p, 0.05, 0.58) * fillChars.length);
      if (idx !== lastFillIdx) {
        const lo = Math.min(idx, lastFillIdx), hi = Math.max(idx, lastFillIdx);
        for (let i = lo; i < hi; i++) fillChars[i]?.classList.toggle('on', i < idx);
        lastFillIdx = idx;
      }
      boxDraw(1 - seg(p, 0.42, 0.56));
      fillText?.classList.toggle('greyed', p > 0.68);
    });

    /* Arrivée des cartes */
    const arrivals = [];
    function measureArrivals() {
      arrivals.length = 0;
      $$('.coll-grid .card').forEach((card, i) => {
        const seed = ((i * 137 + 41) % 89) / 89;
        arrivals.push({
          card,
          top: docTop(card),
          dx: (i % 2 ? 1 : -1) * (70 + seed * 120),
          dy: 150 + seed * 170,
          rot: (i % 3 === 0 ? 1 : -1) * (4 + seed * 7)
        });
      });
    }
    function renderArrivals(pos) {
      for (const a of arrivals) {
        const t = seg(pos + vh, a.top + 60, a.top + 60 + vh * 0.6, easeOut);
        const k = 1 - t;
        a.card.style.transform = `translate3d(${(a.dx * k).toFixed(1)}px, ${(a.dy * k).toFixed(1)}px, 0) rotate(${(a.rot * k).toFixed(2)}deg)`;
      }
    }

    /* ─── SCÈNE 4 · DEVISE ─── */
    const mottoTrack = $('#mottoTrack');
    const mottoHint = $('#mottoHint');
    const mottoHints = content.motto.words.map((w, i) => `0${i + 1} — ${w.hint}`);
    let mottoWords = [], mottoActive = -1, mottoHintTimer = 0;

    function measureMotto() {
      if (!mottoTrack) return;
      mottoWords = $$('.mw', mottoTrack).map((el) => {
        const chars = $$('.sc', el);
        return {
          el, chars,
          amps: chars.map((_, i) => (((i * 7919 + 31) % 13) - 6) / 6 || 0.45),
          center: el.offsetLeft + el.offsetWidth / 2
        };
      });
    }

    addScene('.s-motto', (p) => {
      if (!mottoWords.length || !mottoTrack) return;
      const t = seg(p, 0.03, 0.97);
      const first = mottoWords[0].center;
      const last = mottoWords[mottoWords.length - 1].center;
      const x = vw / 2 - mix(first, last, t);
      mottoTrack.style.transform = `translate(${x.toFixed(1)}px, -50%)`;

      let best = 0, bestD = 1e9;
      const ampHeight = vw < 900 ? vh * 0.08 : vh * 0.3;
      mottoWords.forEach((w, wi) => {
        const rel = clamp((w.center + x - vw / 2) / vw, -1.3, 1.3);
        const d = Math.abs(rel);
        if (d < bestD) { bestD = d; best = wi; }
        w.el.style.opacity = (1 - Math.min(d * 1.1, 0.75)).toFixed(3);
        w.chars.forEach((c, i) => {
          c.style.transform = `translate3d(0, ${(w.amps[i] * rel * ampHeight).toFixed(1)}px, 0) rotate(${(w.amps[i] * rel * (vw < 900 ? 3 : 6)).toFixed(2)}deg)`;
        });
      });

      if (best !== mottoActive && mottoHint) {
        mottoActive = best;
        mottoHint.classList.add('swap');
        clearTimeout(mottoHintTimer);
        mottoHintTimer = setTimeout(() => {
          if (mottoHint) {
            mottoHint.textContent = mottoHints[best] || '';
            mottoHint.classList.remove('swap');
          }
        }, 150);
      }
    });

    /* ─── SCÈNE 5 · PROCESSUS ─── */
    const grow2 = makeGrow($('#grow2'));
    const nightLineEl = $('#nightLine');
    const nightWords = [$('#nw1'), $('#nw2'), $('#nw3')].filter(Boolean);
    const STEPS = content.universes.items;
    const stepEls = $$('.pstep');
    const stepsCta = $('#stepsCta');
    const ctaOvalDraw = makeDraw($('#stepsCtaPath'));
    const slats = $$('.wipe .blade');
    const bigNum = $('#bignum'), bigRoll = $('#bignumRoller');

    addScene('.s-night', (p) => {
      nightWords.forEach((w, i) => {
        const k = seg(p, 0.005 + i * 0.012, 0.025 + i * 0.012, easeOut);
        w.style.opacity = k.toFixed(3);
        w.style.transform = `translateY(${((1 - k) * 16).toFixed(1)}px)`;
      });

      const g = seg(p, 0.08, 0.30, easeInOut);
      grow2.set(g, 1 + seg(p, 0.30, 0.52, easeOut) * 0.18);

      slats.forEach((sl, i) => {
        const j = slats.length - 1 - i;
        const cover = seg(p, 0.30 + i * 0.005, 0.360 + i * 0.005, easeInOut);
        const clear = seg(p, 0.42 + j * 0.005, 0.480 + j * 0.005, easeInOut);
        sl.style.transformOrigin = clear > 0 ? 'top' : 'bottom';
        sl.style.transform = `scaleY(${(cover - clear).toFixed(4)})`;
      });
      if (nightLineEl) nightLineEl.style.opacity = p > 0.41 ? 0 : 1;

      const cont = seg(p, 0.50, 0.88) * Math.max(STEPS.length - 1, 1);
      const gate = seg(p, 0.335, 0.44);
      if (bigNum) bigNum.style.opacity = gate.toFixed(3);
      if (bigRoll) bigRoll.style.transform = `translateY(${(-cont).toFixed(4)}em)`;

      stepEls.forEach((el, i) => {
        const d = cont - i;
        const vis = d >= 0 ? clamp(1 - d / 0.35, 0, 1) : clamp((d + 0.75) / 0.4, 0, 1);
        el.style.opacity = (vis * gate).toFixed(3);
        el.style.transform = `translateY(calc(-50% + ${(-d * 96).toFixed(1)}px))`;
      });

      const eCta = seg(p, 0.89, 0.94, easeOut);
      if (stepsCta) {
        stepsCta.style.opacity = eCta;
        stepsCta.style.transform = `translate(-50%, ${((1 - eCta) * 26).toFixed(1)}px)`;
      }
      ctaOvalDraw(1 - seg(p, 0.92, 0.99));
    });

    /* ─── SCÈNE 8 · TÉMOIGNAGE (3 AVIS CLIENTS) ─── */
    const qGlyph = $('.q-glyph'), qRule = $('#quoteRule');
    const qFig = $('#qFig'), figVal = $('#figVal');
    const TESTIMONIALS = content.testimonials || [content.testimonial];
    let currentTestimonialIdx = 0;
    let figLast = null;

    addScene('.s-quote', (p) => {
      const g = seg(p, 0.02, 0.12, easeOut);
      if (qGlyph) {
        qGlyph.style.opacity = Math.max(0.4, g).toFixed(3);
        qGlyph.style.transform = `translateY(${((1 - g) * 20).toFixed(1)}px)`;
      }

      if (qRule) qRule.style.transform = `scaleX(${seg(p, 0.1, 0.35, easeInOut).toFixed(4)})`;

      const activeIdx = clamp(Math.floor(seg(p, 0.05, 0.95) * TESTIMONIALS.length), 0, TESTIMONIALS.length - 1);
      if (activeIdx !== currentTestimonialIdx) {
        currentTestimonialIdx = activeIdx;
        window.dispatchEvent(new CustomEvent('testimonial-change', { detail: { index: activeIdx } }));
      }
    });

    /* ─── SCÈNE 6 · FINALE & OBJECTIONS ─── */
    const fsEls = [$('#fs1'), $('#fs2'), $('#fs3'), $('#fs4')].filter(Boolean);
    const pillDraw = makeDraw($('#pillPath'));

    addScene('.s-final', (p) => {
      [0.08, 0.2, 0.34, 0.52].forEach((th, i) => fsEls[i]?.classList.toggle('on', p > th));
      pillDraw(1 - seg(p, 0.56, 0.72));
    });

    /* Traînée sous la souris */
    const sceneFinal = scenes.find((s) => s.root.classList.contains('s-final'));
    const trailImgs = $$('#trail .trail-item img');
    let trailIdx = 0, trailZ = 10, trailAcc = 0, trailX = null, trailY = null;

    const onTrailMove = (e) => {
      if (staticMode || !sceneFinal) return;
      if (current + vh < sceneFinal.start || current > sceneFinal.start + sceneFinal.len + vh) {
        trailX = trailY = null;
        return;
      }
      if (trailX === null) { trailX = e.clientX; trailY = e.clientY; return; }
      trailAcc += Math.hypot(e.clientX - trailX, e.clientY - trailY);
      trailX = e.clientX; trailY = e.clientY;
      if (trailAcc < 38) return;
      trailAcc = 0;
      const r = sceneFinal.pin.getBoundingClientRect();
      spawnTrail(e.clientX - r.left, e.clientY - r.top);
    };
    window.addEventListener('mousemove', onTrailMove, { passive: true });

    function spawnTrail(x, y) {
      if (!trailImgs.length) return;
      const img = trailImgs[trailIdx % trailImgs.length];
      trailIdx++;
      const rot = ((trailIdx * 47) % 17) - 8;
      img.style.zIndex = ++trailZ;
      img.getAnimations().forEach((a) => a.cancel());
      const at = (s) => `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px) translate(-50%, -50%) rotate(${rot}deg) scale(${s})`;
      img.animate(
        [
          { opacity: 0, transform: at(0.5) },
          { opacity: 1, transform: at(1), offset: 0.14 },
          { opacity: 1, transform: at(1), offset: 0.72 },
          { opacity: 0, transform: at(1), offset: 0.72 },
          { opacity: 0, transform: at(0.94) }
        ],
        { duration: 3600, easing: 'cubic-bezier(0.19, 1, 0.22, 1)', fill: 'forwards' }
      );
    }

    /* ═══════════ MESURE GLOBALE ═══════════ */
    let docH = 1;
    function measure() {
      if (isDisposed) return;
      vh = window.innerHeight; vw = window.innerWidth;
      if (!staticMode) {
        measureScenes();
        grow1.measure(); grow2.measure();
        measureFloaters();
        measureMotto();
        measureArrivals();
        refreshDraws();
      }
      docH = wrapper.scrollHeight;
      if (!staticMode) document.body.style.height = docH + 'px';
      cacheReveals();
      cacheParallax();
    }

    /* ═══════════ RENDU ═══════════ */
    function render(pos) {
      if (!staticMode) {
        wrapper.style.transform = `translate3d(0, ${-pos.toFixed(1)}px, 0)`;
        renderScenes(pos);
        renderArrivals(pos);
        for (const px of pxCache) {
          px.el.style.transform = `translate3d(0, ${((pos + vh / 2 - (px.top + px.h / 2)) * px.speed).toFixed(2)}px, 0)`;
        }
      }
      checkReveals(pos);
      document.body.classList.toggle('is-scrolled', pos > vh * 0.08);
    }

    function frame() {
      if (isDisposed) return;
      if (!paused) {
        target = window.scrollY;
        current = staticMode ? target : lerp(current, target, 0.085);
        if (Math.abs(current - target) < 0.05) current = target;
        mx = lerp(mx, mxT, 0.06);
        my = lerp(my, myT, 0.06);
        render(current);
      }
      animId = requestAnimationFrame(frame);
    }

    /* Gestion des ancres */
    const handleAnchor = (e) => {
      const a = e.target.closest('a[data-nav], a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (!id || !id.startsWith('#')) return;
      const el = $(id);
      if (!el) return;
      e.preventDefault();
      const scene = scenes.find((s) => s.root === el);
      const baseTop = scene ? scene.start : docTop(el);
      const landing = staticMode ? 0 : (+a.dataset.landing || 0) * vh;
      window.scrollTo({ top: baseTop + landing, behavior: staticMode ? 'smooth' : 'auto' });
    };
    document.addEventListener('click', handleAnchor);

    /* ═══════════ PRELOADER / BOOT ═══════════ */
    const loader = $('#loader'), loaderBar = $('#loaderBar');
    const loaderWordmark = $('.loader-wordmark');
    const HANDOFF_MS = 900;

    function handOffWordmark() {
      const dockWordmark = $('.dock-wordmark');
      if (!dockWordmark || !loaderWordmark) return;
      document.body.classList.add('handoff');
      const from = loaderWordmark.getBoundingClientRect();
      const to = dockWordmark.getBoundingClientRect();
      if (!from.width || !to.width) { document.body.classList.remove('handoff'); return; }
      const dx = (to.left + to.width / 2) - (from.left + from.width / 2);
      const dy = (to.top + to.height / 2) - (from.top + from.height / 2);
      loaderWordmark.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) scale(${(to.width / from.width).toFixed(4)})`;
      setTimeout(() => {
        loaderWordmark.classList.add('landed');
        document.body.classList.remove('handoff');
      }, HANDOFF_MS);
    }

    function boot() {
      if (isDisposed) return;
      measure();
      current = target = window.scrollY;
      animId = requestAnimationFrame(frame);
      document.body.classList.add('is-ready');
      handOffWordmark();
      if (loader) {
        loader.classList.add('done');
        setTimeout(() => loader.remove(), 1400);
      }
      $$('img').forEach((img) => {
        if (!img.complete) {
          img.addEventListener('load', () => setTimeout(measure, 100), { once: true });
        }
      });
    }

    let timer = null;
    if (reduced) {
      if (loader) loader.remove();
      document.body.classList.add('is-ready');
      boot();
    } else {
      const t0 = performance.now(), dur = 700;
      timer = setInterval(() => {
        const p = clamp((performance.now() - t0) / dur, 0, 1);
        if (loaderBar) loaderBar.style.transform = `scaleX(${(1 - Math.pow(1 - p, 2)).toFixed(4)})`;
        if (p >= 1) {
          clearInterval(timer);
          setTimeout(boot, 60);
        }
      }, 16);
    }

    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    return () => {
      isDisposed = true;
      clearInterval(timer);
      clearTimeout(mottoHintTimer);
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', onTrailMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', handleAnchor);
      document.body.style.height = '';
      document.body.classList.remove('is-ready', 'is-smooth', 'static', 'handoff', 'is-scrolled');
    };
  }, [content]);
}
