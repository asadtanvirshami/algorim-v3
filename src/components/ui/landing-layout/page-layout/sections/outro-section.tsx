import React from "react";

const OutroSection = ({ UI }) => {
  return (
    <section className="fade-section relative min-h-[100svh] flex items-center justify-center">
      <div className="max-w-3xl px-4 sm:px-6 text-center space-y-4 relative z-10">
        <h2 className={`text-4xl md:text-5xl font-semibold ${UI.textStrong}`}>
          Elite Engineering, AI & Security on Subscription.
        </h2>
        <p className={`text-lg ${UI.textSub}`}>
          Plug in a senior, cross-functional team that covers branding, product,
          AI automation, personal agents, security and cloud — instead of
          stitching five agencies together.
        </p>
      </div>
    </section>
  );
};

export default OutroSection;
