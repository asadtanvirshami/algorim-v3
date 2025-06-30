import React from "react";

const StrategySection = () => {
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left">
      <div className="bg-white text-black border p-6 rounded-lg">
        <h1 className="text-4xl md:text-5xl lg:text-4xl  fade-up font-bold text-center">
          Our Strategic 3-Step Talent Allocation Framework
        </h1>
        <div className="grid gap-4 mt-12 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 ">
          {/* Step 01 */}
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold">
              01. Comprehensive Profile Analysis
            </h1>
            <desc className=" text-justify hyphens-auto">
              We initiate by conducting a comprehensive analysis of each
              candidate's professional background, meticulously aligning their
              skills, experience, and industry exposure with your project's
              strategic objectives.
            </desc>
          </div>
          {/* Step 02 */}
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold">
              02. Rigorous Competency Evaluation
            </h1>
            <desc className=" text-justify hyphens-auto">
              Candidates undergo a multi-faceted evaluation to assess not only
              their technical acumen and problem-solving capabilities but also
              their communication skills, ensuring a holistic fit for your team.
            </desc>
          </div>
          {/* Step 03 */}
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold">
              03. Seamless Team Integration
            </h1>
            <desc className=" text-justify hyphens-auto">
              Following final approval, we facilitate the seamless integration
              of your chosen engineer into your team within 48 hours, ensuring
              they are prepared for immediate contribution and rapid value
              delivery
            </desc>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategySection;
