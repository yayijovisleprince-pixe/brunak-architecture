import React from 'react';

export default function ManifestoScene({ manifesto }) {
  const boxedWord = manifesto.boxedWord || 'la lumière naturelle';
  const parts = manifesto.text.split(boxedWord);
  const beforeText = parts[0] || '';
  const afterText = parts.slice(1).join(boxedWord) || '';

  return (
    <section className="scene s-fill" id="manifeste" data-pin="3">
      <div className="pin">
        <div className="fill-rail">
          <p className="fill-text" id="fillText">
            {beforeText}
            <span className="boxed" id="boxedPhrase">
              {boxedWord}
              <svg className="box-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path id="boxPath" d="M50,6 C88,4 98,22 97,50 C96,82 76,96 49,95 C16,94 3,76 4,48 C5,18 20,7 50,6 Z" />
              </svg>
            </span>
            {afterText}
          </p>
        </div>
      </div>
    </section>
  );
}
