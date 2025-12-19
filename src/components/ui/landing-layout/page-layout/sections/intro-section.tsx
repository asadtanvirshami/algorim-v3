import React from "react";

const IntroSection = (UI) => {
  return (
    <section data-anim="process" className="fade-section z-10 relative min-h-[60svh] flex items-center justify-center">
      <div className="max-w-2xl px-4 sm:px-6 text-center space-y-4 relative z-10">
        <p className={`text-sm uppercase tracking-[0.2em] ${UI.textMuted}`}>
          Studio · Engineering · AI
        </p>
        <h2 className={`text-3xl md:text-4xl font-semibold ${UI.textStrong}`}>
          We build brands, products and AI-powered platforms that feel premium
          end-to-end.
        </h2>
      </div>
    </section>
  );
};

export default IntroSection;
