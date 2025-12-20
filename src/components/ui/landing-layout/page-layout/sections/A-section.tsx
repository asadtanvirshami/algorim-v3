import React from "react";

const ASection = ({ giantASectionRef, giantARef }) => {
  return (
    <section
      ref={giantASectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden transition-colors"
    >
      <div
        ref={giantARef}
        className="font-black tracking-tight leading-none select-none relative z-10"
      >
        <span
          className={`block font-[family-name:var(--font-revamped)] text-[95vw] md:text-[18vw] lg:text-[16vw]`}
        >
          A
        </span>
      </div>
    </section>
  );
};

export default ASection;
