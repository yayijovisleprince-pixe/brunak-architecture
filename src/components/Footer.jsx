import React from 'react';

export default function Footer({ brand, contact }) {
  const letters = [...brand.name];

  return (
    <footer className="footer" id="contact">
      <div className="footer-top">
        <p className="footer-kicker mono ash">{contact.kicker}</p>
        <a className="footer-mail" href={`mailto:${contact.email}`}>
          <span className="footer-mail-text">{contact.email}</span>
        </a>
        <p className="footer-reassurance mono ash">{contact.reassurance}</p>
      </div>

      <div className="footer-giant">
        <h2 className="footer-name" id="footerName" aria-label={brand.name}>
          {letters.map((char, i) => (
            <span key={i} className="ch">
              <span className="chi" style={{ '--i': i }}>{char}</span>
            </span>
          ))}
        </h2>
      </div>

      <div className="footer-bottom">
        <p className="mono ash">{brand.copyright}</p>
        <p className="footer-socials mono ash">
          {brand.socials.map((s, i) => (
            <React.Fragment key={i}>
              <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
              {i < brand.socials.length - 1 ? '\u00A0\u00A0\u00A0' : ''}
            </React.Fragment>
          ))}
        </p>
        <p className="footer-craft mono">
          <a
            href="https://jovisleprinceyayi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="craft-link"
          >
            Craft by <span className="craft-author">JoDev ↗</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
