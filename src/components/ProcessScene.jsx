import React from 'react';

export default function ProcessScene({ universes }) {
  return (
    <section className="scene s-night" id="explorer" data-pin="5">
      <div className="pin">
        {/* Ligne d'intro avec l'image zoomable */}
        <h2 className="night-line" id="nightLine">
          <span className="nw" id="nw1">{universes.introA}</span>
          <span className="nw" id="nw2">{universes.introB}</span>
          <span className="grow" id="grow2">
            <img src={universes.image} alt="" />
          </span>
          <span className="nw" id="nw3">{universes.introC}</span>
        </h2>

        {/* Rideau de lames */}
        <div className="wipe" id="wipe" aria-hidden="true">
          <div className="blade"></div>
          <div className="blade"></div>
          <div className="blade"></div>
          <div className="blade"></div>
          <div className="blade"></div>
          <div className="blade"></div>
          <div className="blade"></div>
          <div className="blade"></div>
        </div>

        {/* Compteur géant en odomètre */}
        <div className="bignum" id="bignum" aria-hidden="true">
          <span className="mono">0</span>
          <span className="roller" id="bignumRoller">
            <i>1</i><i>2</i><i>3</i>
          </span>
        </div>

        {/* Étapes du processus */}
        <div className="psteps" id="psteps">
          {universes.items.map((item, i) => (
            <div key={i} className="pstep">
              <span className="pstep-meta mono ash">{item.meta}</span>
              <h3>{item.name}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA final avec tracé manuscrit */}
        <div className="steps-cta" id="stepsCta">
          <a href="#contact" data-nav id="stepsCtaLink">
            {universes.cta}
            <svg className="cta-oval" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path id="stepsCtaPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
