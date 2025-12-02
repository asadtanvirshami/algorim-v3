import React from "react";
import HeroSection from "../hero-section";

const HeroOverlay = ({ heroScrollRef }: { heroScrollRef: any }) => {
  return (
    <section
      ref={heroScrollRef}
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <div className="relative z-0">
        <HeroSection />
      </div>

      <div className="hero-overlay absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-[11px] uppercase tracking-[0.3em] text-neutral-400 mb-4">
            Algorim Studio
          </p>
          <h1 className="hero-word font-[family-name:var(--font-revamped)] text-8xl md:text-[15rem] giant-a leading-none">
            ALGORIM
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-sm md:text-base text-neutral-300">
            Web, product, AI and security — engineered as one system instead of
            a patchwork of agencies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroOverlay;
