import React from 'react';

export default function Preloader({ brandName }) {
  return (
    <div className="loader" id="loader" aria-hidden="true">
      <div className="loader-inner">
        <p className="loader-wordmark">{brandName}</p>
        <span className="loader-rule"><i id="loaderBar"></i></span>
      </div>
    </div>
  );
}
