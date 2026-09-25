import React from 'react';

const FLOATER_CONFIGS = [
  { x: '-4%', y: '13%', w: '196px', d: '0.55' },
  { x: '21%', y: '3%', w: '142px', d: '0.90' },
  { x: '40%', y: '-8%', w: '232px', d: '0.40' },
  { x: '63%', y: '7%', w: '126px', d: '0.75' },
  { x: '85%', y: '1%', w: '208px', d: '1.00' },
  { x: '-2%', y: '45%', w: '116px', d: '0.50' },
  { x: '94%', y: '37%', w: '172px', d: '0.70' },
  { x: '13%', y: '71%', w: '248px', d: '0.35' },
  { x: '44%', y: '81%', w: '134px', d: '0.85' },
  { x: '73%', y: '64%', w: '188px', d: '0.60' }
];

export default function HeroScene({ brand, hook, positioning }) {
  const words = positioning.split(' ');

  return (
    <section className="scene s-hero" id="hero" data-pin="5">
      <div className="pin">
        <div className="floaters" aria-hidden="true">
          {hook.floaters.map((src, i) => {
            const cfg = FLOATER_CONFIGS[i] || FLOATER_CONFIGS[0];
            return (
              <figure
                key={i}
                className="fl"
                style={{ '--x': cfg.x, '--y': cfg.y, '--w': cfg.w }}
                data-d={cfg.d}
              >
                <img src={src} alt="" />
              </figure>
            );
          })}
        </div>

        <div className="hero-copy">
          <p className="hero-kicker mono" id="heroKicker">{brand.kicker}</p>
          <h1 className="hero-title">
            <span className="hero-line1" id="heroLine1">{hook.line1}</span>
            <span className="hero-line2" id="heroLine2">
              <span className="hl">{hook.line2a}</span>
              <span className="grow" id="grow1">
                <img src={hook.image} alt={hook.imageAlt} />
              </span>
              <span className="hl">{hook.line2b}</span>
            </span>
          </h1>
        </div>

        <div className="spot" id="spot" aria-hidden="true">
          <h2 className="spot-intro" id="spotIntro">
            {words.map((w, idx) => (
              <React.Fragment key={idx}>
                <span>{w}</span>
                {idx < words.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </h2>
        </div>
      </div>
    </section>
  );
}
