/* ═══════════════════════════════════════════════════════════
   TEMPLATE « SITE IMMERSIF » — content.js
   ► BRUNAK — Architecture contemporaine à Abomey-Calavi, Bénin
   ═══════════════════════════════════════════════════════════ */

window.SITE_CONTENT = {

  brand: {
    name: 'BRUNAK',
    title: 'BRUNAK — Architecture contemporaine, Abomey-Calavi',
    description: 'Cabinet d’architecture contemporaine et bioclimatique à Abomey-Calavi au Bénin. Conception de villas d’exception, résidences et espaces durables.',
    kicker: 'BRUNAK — ARCHITECTURE, ABOMEY-CALAVI',
    copyright: '© 2026 — ABOMEY-CALAVI, BÉNIN',
    signature: 'BÂTI AVEC RIGUEUR & ÉLÉGANCE',
    socials: [
      { label: 'INSTAGRAM ↗', url: 'https://www.instagram.com/brunak.architecture' },
      { label: 'LINKEDIN ↗', url: 'https://www.linkedin.com/company/brunak-architecture' }
    ]
  },

  /* 2 ancres + CTA du header — un mot chacun, CAPS */
  nav: { proof: 'PROJETS', universes: 'MÉTHODE', cta: 'CONTACT' },

  /* 1 · ACCROCHE — « line1 / line2a [image qui naît et devient
     plein écran] line2b ». Total line2a+line2b : court (nowrap). */
  hook: {
    line1: 'Bâtir l’épure,',
    line2a: 'révéler la',
    line2b: 'lumière.',
    image: 'images/hero.jpg',
    imageAlt: 'Villa contemporaine lumineuse aux volumes épurés à Abomey-Calavi',
    floaters: [
      'images/floater-1.jpg',
      'images/floater-2.jpg',
      'images/floater-3.jpg',
      'images/floater-4.jpg',
      'images/floater-5.jpg',
      'images/floater-6.jpg',
      'images/floater-7.jpg',
      'images/floater-8.jpg',
      'images/floater-9.jpg',
      'images/floater-10.jpg'
    ]
  },

  /* 2 · POSITIONNEMENT — ≤ 42 caractères (affiché nowrap, en blanc
     sur l'image plein écran) */
  positioning: 'Architecture pure — Abomey-Calavi, Bénin.',

  /* 3 · DÉMARCHE — [[…]] = ce qu'entoure l'ovale dessiné :
     2 à 3 MOTS MAXIMUM, JAMAIS une phrase entière (l'ovale est un tracé
     à la main : au-delà de 3 mots il s'étire et cesse d'être lisible). */
  manifesto: {
    text: 'Chaque parcelle porte son climat, sa terre et ses vents. Nous façonnons des volumes où [[la lumière naturelle]] sculpte la matière sans artifice superflu.'
  },

  /* 4 · PREUVE — layout: 'masonry' (8 photos de réalisations) */
  proof: {
    layout: 'masonry',
    kicker: 'SÉLECTION DE PROJETS',
    title: 'Volumes, ombres et matières',
    sub: 'Villas d’exception, pavillons tropicaux et résidences pensées pour le climat béninois.',
    meta: 'HUIT RÉALISATIONS — 2021 → 2026',
    projects: [
      { img: 'images/project-1.jpg', title: 'Villa Calavi Lagoon', meta: 'RÉSIDENCE PRIVÉE — 2025' },
      { img: 'images/project-2.jpg', title: 'Pavillon Zoca', meta: 'VILLA BIOCLIMATIQUE — 2024' },
      { img: 'images/project-3.jpg', title: 'Maison Béton & Bois', meta: 'HABITAT CONTEMPORAIN — 2025' },
      { img: 'images/project-4.jpg', title: 'Résidence Nokoué', meta: 'VILLA D’EXCEPTION — 2023' },
      { img: 'images/project-5.jpg', title: 'Atelier de Création', meta: 'ESPACE DE TRAVAIL — 2024' },
      { img: 'images/project-6.jpg', title: 'Domaine d’Arconville', meta: 'ENSEMBLE RÉSIDENTIEL — 2023' },
      { img: 'images/project-7.jpg', title: 'Institut Calavi Sud', meta: 'ÉQUIPEMENT TERTIAIRE — 2025' },
      { img: 'images/project-8.jpg', title: 'Belvédère Ouémé', meta: 'PAVILLON PANORAMIQUE — 2024' }
    ],
    features: []
  },

  /* 5 · DEVISE — 3 mots (train horizontal scrubé), hint d'une ligne */
  motto: {
    kicker: 'LES FONDATIONS DE BRUNAK',
    words: [
      { word: 'Climat', hint: 'Ventilation traversante et ombre portée pour un confort thermique naturel.' },
      { word: 'Matière', hint: 'Alliance rigoureuse du béton texturé, du bois chaleureux et des terres locales.' },
      { word: 'Épure', hint: 'Des lignes franches et des perspectives ouvertes vers le jardin et le ciel.' }
    ]
  },

  /* 6-7 · PROCESSUS — « introA introB [visuel] introC » puis les étapes.
     Scène 100 % TYPOGRAPHIQUE : compteur géant, aucune image.
     SEULE `image` est utilisée — c'est le visuel du zoom d'intro,
     1800×1200 (3:2), celui que le rideau de lames vient couper. */
  universes: {
    introA: 'Une',
    introB: 'vision,',
    introC: '3 jalons.',
    cta: 'Initier un projet →',
    image: 'images/process-hero.jpg',
    items: [
      { name: 'Écoute & Contexte', meta: 'ÉTAPE — 01', desc: 'Arpentage minutieux du site, analyse de l’ensoleillement et formalisation de vos aspirations de vie.' },
      { name: 'Esquisse & Maquette', meta: 'ÉTAPE — 02', desc: 'Modélisation 3D immersive, sélection tactile des matériaux et plans d’exécution au millimètre.' },
      { name: 'Chantier & Révélation', meta: 'ÉTAPE — 03', desc: 'Supervision rigoureuse de la mise en œuvre jusqu’à la livraison parfaite de votre ouvrage.' }
    ]
  },

  /* 8 · PREUVE SOCIALE — un avis client, court et crédible. */
  testimonial: {
    kicker: 'VILLA PRIVÉE, ABOMEY-CALAVI',
    figure: '+100',
    unit: '%',
    quote: 'La fraîcheur naturelle des pièces impressionne tous nos invités, sans jamais allumer la climatisation.',
    author: 'K. ADANHOUNME — MAÎTRE D’OUVRAGE'
  },

  /* 9 · OBJECTIONS — 3 freins + la chute (pill = mot entouré) */
  objections: {
    items: [
      'Pas de modèle standardisé,',
      'Pas de dépassement budgétaire,',
      'Pas d’inconfort thermique,'
    ],
    finale: 'Juste une architecture faite pour',
    pill: 'durer.'
  },

  /* 10 · CONVERSION */
  contact: {
    kicker: 'UN PROJET ARCHITECTURAL EN TÊTE ?',
    email: 'contact@brunak-architecture.bj',
    reassurance: 'RÉPONSE SOUS 24 H — PREMIÈRE ÉTUDE DE PARCELLE SANS ENGAGEMENT'
  },

  /* traînée sous la souris (finale) — 20 visuels, petits formats mixtes */
  trail: [
    'images/trail-1.jpg', 'images/trail-2.jpg',
    'images/trail-3.jpg', 'images/trail-4.jpg',
    'images/trail-5.jpg', 'images/trail-6.jpg',
    'images/trail-7.jpg', 'images/trail-8.jpg',
    'images/trail-9.jpg', 'images/trail-10.jpg',
    'images/trail-11.jpg', 'images/trail-12.jpg',
    'images/trail-13.jpg', 'images/trail-14.jpg',
    'images/trail-15.jpg', 'images/trail-16.jpg',
    'images/trail-17.jpg', 'images/trail-18.jpg',
    'images/trail-19.jpg', 'images/trail-20.jpg'
  ]
};

/* ═══════════════════════════════════════════════════════════
   INJECTION — NE PAS MODIFIER (remplit le DOM avant app.js)
   ═══════════════════════════════════════════════════════════ */
(() => {
  const C = window.SITE_CONTENT;
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const set = (sel, txt) => { const el = $(sel); if (el) el.textContent = txt; };

  document.title = C.brand.title;
  const md = document.querySelector('meta[name="description"]');
  if (md) md.setAttribute('content', C.brand.description);

  // chrome
  set('.loader-wordmark', C.brand.name);
  set('.dock-wordmark', C.brand.name);
  set('.dock-link[href="#travaux"]', C.nav.proof);
  set('.dock-link[href="#explorer"]', C.nav.universes);
  set('.dock-cta', C.nav.cta);

  // 1 · accroche
  set('#heroKicker', C.brand.kicker);
  set('#heroLine1', C.hook.line1);
  const hls = $$('#heroLine2 .hl');
  if (hls.length === 2) { hls[0].textContent = C.hook.line2a; hls[1].textContent = C.hook.line2b; }
  const g1 = $('#grow1 img');
  if (g1) { g1.src = C.hook.image; g1.alt = C.hook.imageAlt; }
  $$('.floaters .fl img').forEach((img, i) => { if (C.hook.floaters[i]) img.src = C.hook.floaters[i]; });

  // 2 · positionnement (un span par mot)
  const intro = $('#spotIntro');
  if (intro) intro.innerHTML = C.positioning.split(' ').map((w) => `<span>${w}</span>`).join(' ');

  // 3 · démarche
  const fill = $('#fillText');
  if (fill) {
    fill.innerHTML = C.manifesto.text.replace(
      /\[\[(.+?)\]\]/,
      '<span class="boxed" id="boxedPhrase">$1<svg class="box-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="boxPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>'
    );
  }

  // 4 · preuve : masonry (8 photos) ou bento (4 features big/tall/tall/big)
  const head = $$('.coll-head > *');
  if (head.length === 4) {
    head[0].textContent = C.proof.kicker;
    head[1].textContent = C.proof.title;
    head[2].textContent = C.proof.sub;
    head[3].textContent = C.proof.meta;
  }
  const grid = $('#collGrid');
  if (grid && C.proof.layout === 'bento') {
    grid.className = 'bento-grid';
    grid.innerHTML = C.proof.features.map((f) =>
      `<figure class="card${f.size ? ' b-' + f.size : ''}"><div class="card-img"><img src="${f.illu}" alt="${f.title}"></div><figcaption>${f.title}<span class="mono">${f.meta}</span></figcaption></figure>`
    ).join('');
  } else if (grid) {
    grid.className = 'coll-grid';
    const SPEEDS = [-0.05, 0.06, -0.028, 0.085];
    grid.innerHTML = SPEEDS.map((s, ci) =>
      `<div class="col" data-pspeed="${s}">` +
      C.proof.projects.slice(ci * 2, ci * 2 + 2).map((p) =>
        `<figure class="card"><div class="card-img"><img src="${p.img}" alt="${p.title} — ${p.meta}"></div><figcaption>${p.title}<span class="mono">${p.meta}</span></figcaption></figure>`
      ).join('') + '</div>'
    ).join('');
  }

  // 5 · devise (train de mots-clés)
  set('#mottoKicker', C.motto.kicker);
  const mtrack = $('#mottoTrack');
  if (mtrack) mtrack.innerHTML = C.motto.words.map((w) => `<span class="mw">${w.word}</span>`).join('');

  // 6-7 · processus immersif (visuels posés un à un)
  set('#nw1', C.universes.introA);
  set('#nw2', C.universes.introB);
  set('#nw3', C.universes.introC);
  const g2 = $('#grow2 img');
  if (g2) g2.src = C.universes.image || (C.universes.items[0] || {}).img || g2.src;
  const psteps = $('#psteps');
  if (psteps) {
    psteps.innerHTML = C.universes.items.map((u) =>
      `<div class="pstep"><span class="pstep-meta mono ash">${u.meta}</span><h3>${u.name}</h3><p>${u.desc || ''}</p></div>`
    ).join('');
  }
  const sCta = $('#stepsCtaLink');
  if (sCta) sCta.childNodes[0].textContent = C.universes.cta;

  // 8 · preuve sociale — le chiffre qui frappe
  set('#figKicker', C.testimonial.kicker || '');
  const figM = String(C.testimonial.figure || '').trim().match(/^([^\d.,+-]*[+\u2212-]?)\s*(-?[\d.,]+)/);
  set('#figPre', figM ? figM[1] : '');
  set('#figVal', figM ? figM[2] : '');
  set('#figUnit', C.testimonial.unit || '');
  set('#quoteText', C.testimonial.quote);
  set('#quoteAuthor', C.testimonial.author);

  // 9 · objections
  C.objections.items.forEach((t, i) => set('#fs' + (i + 1), t));
  const fs4 = $('#fs4');
  if (fs4) {
    fs4.innerHTML = `${C.objections.finale} <span class="pill" id="pillPhrase">${C.objections.pill}<svg class="pill-svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path id="pillPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z"/></svg></span>`;
  }
  $$('#trail img').forEach((img, i) => { img.src = C.trail[i % C.trail.length]; });

  // 10 · conversion
  set('.footer-kicker', C.contact.kicker);
  const mail = $('.footer-mail');
  if (mail) { mail.href = 'mailto:' + C.contact.email; mail.querySelector('.footer-mail-text').textContent = C.contact.email; }
  set('.footer-reassurance', C.contact.reassurance);
  const fname = $('#footerName');
  if (fname) { fname.textContent = C.brand.name; fname.setAttribute('aria-label', C.brand.name); }
  const bottom = $$('.footer-bottom > p');
  if (bottom.length === 3) {
    bottom[0].textContent = C.brand.copyright;
    bottom[1].innerHTML = C.brand.socials.map((s) => `<a href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('&nbsp;&nbsp;&nbsp;');
    bottom[2].innerHTML = '<a href="https://jovisleprinceyayi.com" target="_blank" rel="noopener noreferrer" style="color:inherit">Craft by <u>JoDev ↗</u></a>';
  }
})();
