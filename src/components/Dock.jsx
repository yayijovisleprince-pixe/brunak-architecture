import React, { useState, useEffect } from 'react';

export default function Dock({ brand, nav, contact }) {
  const [isOpen, setIsOpen] = useState(false);

  // Verrouillage du scroll en arrière-plan lorsque le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  // Fermeture du menu avec la touche Échap
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { num: '01', label: 'PROJETS', sub: 'Volumes & réalisations', href: '#travaux', landing: 0 },
    { num: '02', label: 'MÉTHODE', sub: 'Une vision, 3 jalons', href: '#explorer', landing: 0.25 },
    { num: '03', label: 'MANIFESTE', sub: 'Philosophie bioclimatique', href: '#manifeste', landing: 0 },
    { num: '04', label: 'TÉMOIGNAGES', sub: 'Retours d’expérience', href: '#temoignage', landing: 0 },
    { num: '05', label: 'CONTACT', sub: 'Initier une étude de parcelle', href: '#contact', landing: 0 }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className={`dock ${isOpen ? 'is-active' : ''}`} id="dock">
        <a className="dock-wordmark" href="#hero" data-nav onClick={handleLinkClick}>
          {brand.name}
        </a>

        {/* Navigation Desktop classique */}
        <nav className="dock-nav" aria-label="Navigation principale">
          <a className="dock-link mono" href="#travaux" data-nav>{nav.proof}</a>
          <a className="dock-link mono" href="#explorer" data-nav data-landing="0.25">{nav.universes}</a>
        </nav>

        <a className="dock-cta mono" href="#contact" data-nav onClick={handleLinkClick}>
          {nav.cta}
        </a>

        {/* Bouton Hamburger Architectural Mobile / Tablette (2 traits + texte MENU) */}
        <button
          type="button"
          className={`dock-burger ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
          aria-controls="mobileMenu"
        >
          <span className="burger-label mono">{isOpen ? 'FERMER' : 'MENU'}</span>
          <span className="burger-icon" aria-hidden="true">
            <span className="b-line b-top"></span>
            <span className="b-line b-bottom"></span>
          </span>
        </button>
      </header>

      {/* Rideau plein écran du Menu Hamburger Architectural */}
      <div
        className={`menu-overlay ${isOpen ? 'is-open' : ''}`}
        id="mobileMenu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation mobile"
        aria-hidden={!isOpen}
      >
        <div className="menu-backdrop" onClick={() => setIsOpen(false)} aria-hidden="true" />
        <div className="menu-panel">
          <div className="menu-inner">
            {/* Haut du menu */}
            <div className="menu-head">
              <span className="mono ash menu-kicker">{brand.kicker}</span>
              <button
                type="button"
                className="menu-close-pill mono"
                onClick={() => setIsOpen(false)}
                aria-label="Fermer le menu"
              >
                FERMER ✕
              </button>
            </div>

            {/* Liens principaux de navigation */}
            <nav className="menu-nav" aria-label="Navigation du menu">
              {navItems.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  data-nav
                  data-landing={item.landing}
                  className="menu-item"
                  onClick={handleLinkClick}
                  style={{ '--delay': `${idx * 0.05 + 0.05}s` }}
                >
                  <div className="menu-item-left">
                    <span className="menu-num mono">{item.num}</span>
                    <span className="menu-title">{item.label}</span>
                  </div>
                  <span className="menu-sub mono ash">{item.sub} ↗</span>
                </a>
              ))}
            </nav>

            {/* Pied du menu avec contact & crédits */}
            <div className="menu-footer">
              <div className="menu-contact-col">
                <span className="mono ash">LOCALISATION</span>
                <p className="menu-city">Abomey-Calavi, Bénin</p>
                {contact?.email && (
                  <a href={`mailto:${contact.email}`} className="menu-mail mono">
                    {contact.email}
                  </a>
                )}
              </div>

              <div className="menu-socials-col">
                <div className="menu-socials">
                  {brand.socials?.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="mono ash">
                      {s.label}
                    </a>
                  ))}
                </div>
                <div className="menu-craft">
                  <a
                    href="https://jovisleprinceyayi.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="craft-link mono"
                  >
                    <span>CRAFT BY</span>
                    <span className="craft-author">JODEV ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
