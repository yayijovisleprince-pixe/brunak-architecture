import React, { useState, useEffect } from 'react';

export default function TestimonialScene({ testimonials, testimonial }) {
  // Supporte à la fois un tableau de 3 avis ou un objet unique
  const items = testimonials && testimonials.length ? testimonials : [testimonial];
  const [activeIndex, setActiveIndex] = useState(0);

  const current = items[activeIndex] || items[0];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
  };

  // Permet au moteur de scroll de notifier le changement d'avis selon la position
  useEffect(() => {
    const handleScrollSync = (e) => {
      if (typeof e.detail?.index === 'number' && e.detail.index !== activeIndex) {
        setActiveIndex(e.detail.index);
      }
    };
    window.addEventListener('testimonial-change', handleScrollSync);
    return () => window.removeEventListener('testimonial-change', handleScrollSync);
  }, [activeIndex]);

  return (
    <section className="scene s-quote" id="temoignage" data-pin="4">
      <div className="pin">
        <div className="q-stack">
          {/* Navigation supérieure des 3 témoignages */}
          <div className="q-header">
            <div className="q-tabs" role="tablist" aria-label="Avis clients">
              {items.map((t, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === activeIndex}
                  className={`q-tab ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span>0{idx + 1}</span>
                  <span>{t.kicker.split('—')[0].trim()}</span>
                </button>
              ))}
            </div>

            <div className="q-controls" aria-label="Contrôles témoignages">
              <button
                type="button"
                className="q-ctrl-btn"
                onClick={handlePrev}
                title="Témoignage précédent"
                aria-label="Précédent"
              >
                ←
              </button>
              <button
                type="button"
                className="q-ctrl-btn"
                onClick={handleNext}
                title="Témoignage suivant"
                aria-label="Suivant"
              >
                →
              </button>
            </div>
          </div>

          {/* Citation mise en scène */}
          <blockquote className="quote">
            <span className="q-glyph" aria-hidden="true">“</span>
            <div className="q-block">
              <p className="q-text" id="quoteText" key={activeIndex}>
                {current.quote}
              </p>
            </div>
            <div className="q-rule" id="quoteRule"></div>
            <footer className="q-foot">
              <div className="q-sign-row">
                <cite className="q-name mono" id="quoteAuthor" key={`author-${activeIndex}`}>
                  {current.author}
                </cite>
                <span className="q-ctx mono ash" id="figKicker" key={`ctx-${activeIndex}`}>
                  {current.kicker}
                </span>
                <div className="q-fig" id="qFig">
                  <span className="q-pre" id="figPre">{current.figurePre}</span>
                  <span className="q-val" id="figVal">{current.figureVal}</span>
                  <span className="q-unit mono" id="figUnit">{current.unit}</span>
                </div>
              </div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
