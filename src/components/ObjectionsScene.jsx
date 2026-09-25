import React from 'react';

export default function ObjectionsScene({ objections, trail }) {
  return (
    <section className="scene s-final" id="objections" data-pin="3">
      <div className="pin">
        <div className="final-text">
          {objections.items.map((item, i) => (
            <p key={i} className="fs" id={`fs${i + 1}`}>{item}</p>
          ))}
          <p className="fs" id="fs4">
            {objections.finale}{' '}
            <span className="pill" id="pillPhrase">
              {objections.pill}
              <svg className="pill-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path id="pillPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z" />
              </svg>
            </span>
          </p>
        </div>

        {/* Traînée d'images interactive au curseur */}
        <div className="trail" id="trail" aria-hidden="true">
          {trail.map((src, i) => (
            <figure key={i} className="trail-item">
              <img src={src} alt="" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
