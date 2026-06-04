/* global React, ReactDOM */

/* Homepage — overview pitching everything, with link-outs to detail pages. */

function HomePageContent({ onBookDemo }) {
  return (
    <React.Fragment>
      <Hero onBookDemo={onBookDemo} />
      <TrustStrip />
      <Products onBookDemo={onBookDemo} />
      <WhatWeAre />
      <Services onBookDemo={onBookDemo} />
      <Ace />
      <HowItWorks />
      <FAQ />
      <CTAFinal onBookDemo={onBookDemo} />
    </React.Fragment>
  );
}

requestAnimationFrame(() => {
  ReactDOM.createRoot(document.getElementById("app")).render(
    <PageShell current="home">
      <HomePageContent />
    </PageShell>
  );
});
