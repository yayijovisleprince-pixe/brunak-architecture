import React from 'react';

const SPEEDS = [-0.05, 0.06, -0.028, 0.085];

export default function ProjectsScene({ proof }) {
  // 4 colonnes x 2 projets par colonne
  const columns = [
    proof.projects.slice(0, 2),
    proof.projects.slice(2, 4),
    proof.projects.slice(4, 6),
    proof.projects.slice(6, 8)
  ];

  return (
    <section className="scene collection" id="travaux" data-pin="4">
      <div className="pin">
        <header className="coll-head">
          <p className="mono ash">{proof.kicker}</p>
          <h2 className="coll-title">{proof.title}</h2>
          <p className="coll-sub">{proof.sub}</p>
          <p className="mono ash">{proof.meta}</p>
        </header>

        <div className="coll-grid" id="collGrid">
          {columns.map((colProjects, ci) => (
            <div key={ci} className="col" data-pspeed={SPEEDS[ci]}>
              {colProjects.map((p, pi) => (
                <figure key={pi} className="card">
                  <div className="card-img">
                    <img src={p.img} alt={`${p.title} — ${p.meta}`} />
                  </div>
                  <figcaption>
                    {p.title}
                    <span className="mono">{p.meta}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
