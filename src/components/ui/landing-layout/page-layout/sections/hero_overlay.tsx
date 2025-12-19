import React from "react";
import HeroSection from "../hero-section";

const HeroOverlay = ({ heroScrollRef }: { heroScrollRef }) => {
  return (
    <section
      ref={heroScrollRef}
      className="relative min-h-screen bg-card text-white overflow-hidden"
    >
      <div className="relative z-0">
        <HeroSection />
      </div>

      <div className="hero-overlay relative bg-black md:absolute lg:absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-6 my-5">
          <p
            className="
    text-[11px] uppercase tracking-[0.3em] mb-4
    text-sky-200
    drop-shadow-[0_0_10px_rgba(249,115,22,0.55)]
    animate-[pulse_4s_ease-in-out_infinite]
  "
          >
            Algorim Studio
          </p>

          <h1 className="hero-word font-[family-name:var(--font-revamped)] text-6xl md:text-[15rem] giant-a leading-none">
            ALGORIM
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-sm md:text-base text-neutral-300">
            Web, product, AI and security engineered as one system instead of a
            patchwork of agencies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroOverlay;
