import React from 'react';
import { SITE_CONTENT } from './content.js';
import { useImmersiveEngine } from './hooks/useImmersiveEngine.js';

import Preloader from './components/Preloader.jsx';
import Dock from './components/Dock.jsx';
import HeroScene from './components/HeroScene.jsx';
import ManifestoScene from './components/ManifestoScene.jsx';
import ProjectsScene from './components/ProjectsScene.jsx';
import MottoScene from './components/MottoScene.jsx';
import ProcessScene from './components/ProcessScene.jsx';
import TestimonialScene from './components/TestimonialScene.jsx';
import ObjectionsScene from './components/ObjectionsScene.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  useImmersiveEngine(SITE_CONTENT);

  return (
    <>
      {/* Préchargeur de marque */}
      <Preloader brandName={SITE_CONTENT.brand.name} />

      {/* Contenu principal avec défilement fluide lerp */}
      <main className="smooth" id="smooth">
        {/* Scène 1 : Hero, Pasteboard 10 visuels, Zoom texte, Série */}
        <HeroScene
          brand={SITE_CONTENT.brand}
          hook={SITE_CONTENT.hook}
          positioning={SITE_CONTENT.positioning}
        />

        {/* Scène 2 : Manifeste encré au scroll & Ovale manuscrit */}
        <ManifestoScene manifesto={SITE_CONTENT.manifesto} />

        {/* Scène 3 : Preuve & Réalisations (Grille masonry avec parallaxe) */}
        <ProjectsScene proof={SITE_CONTENT.proof} />

        {/* Scène 4 : Devise monumentale (Train de mots horizontal) */}
        <MottoScene motto={SITE_CONTENT.motto} />

        {/* Scène 5 : Processus (Intro-zoom, rideau de lames, odomètre géant) */}
        <ProcessScene universes={SITE_CONTENT.universes} />

        {/* Scène 6 : Preuve sociale & 3 Témoignages clients */}
        <TestimonialScene
          testimonials={SITE_CONTENT.testimonials}
          testimonial={SITE_CONTENT.testimonial}
        />

        {/* Scène 7 : Objections, Pilule manuscrite & Traînée d'images */}
        <ObjectionsScene
          objections={SITE_CONTENT.objections}
          trail={SITE_CONTENT.trail}
        />

        {/* Scène 8 : Pied de page, contact & Wordmark géant */}
        <Footer
          brand={SITE_CONTENT.brand}
          contact={SITE_CONTENT.contact}
        />
      </main>

      {/* Barre de navigation fixe supérieure et menu hamburger architectural */}
      <Dock brand={SITE_CONTENT.brand} nav={SITE_CONTENT.nav} contact={SITE_CONTENT.contact} />
    </>
  );
}
