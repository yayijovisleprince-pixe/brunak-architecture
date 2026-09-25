import React from 'react';

export default function MottoScene({ motto }) {
  return (
    <section className="scene s-motto" id="motto" data-pin="3">
      <div className="pin">
        <p className="motto-kicker mono ash" id="mottoKicker">{motto.kicker}</p>
        <div className="motto-track" id="mottoTrack">
          {motto.words.map((w, i) => (
            <span key={i} className="mw">
              {[...w.word].map((char, ci) => (
                <span key={ci} className="sc">{char}</span>
              ))}
            </span>
          ))}
        </div>
        <p className="motto-hint mono" id="mottoHint">
          01 — {motto.words[0]?.hint}
        </p>
      </div>
    </section>
  );
}
