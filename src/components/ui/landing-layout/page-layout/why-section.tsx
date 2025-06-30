/* eslint-disable react/no-unescaped-entities */

import React from "react";

const WhySection = () => {
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left">
      {" "}
      {/* WHY CHOOSE US*/}
      <div className="space-y-6 gap-5 items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <h1 className="text-4xl md:text-5xl lg:text-6xl  fade-up font-bold text-balance">
          Choose Wisely With{" "}
          <h1 className="font-[family-name:var(--font-revamped)] text-7xl">
            Algorim
          </h1>
        </h1>
        <div className="space-y-3 text-left">
          <ul className="fade-up">
            <p className="text-xl font-bold">
              Silicon Valley Caliber, Global Access
            </p>
            <p className="text-justify hyphens-auto max-w-2xl">
              Get the same level of expertise that powers the world's leading
              tech hubs, without the geographical constraints.
            </p>
          </ul>
          <ul className="fade-up">
            <p className="text-xl font-bold">
              Seamless Collaboration in Your Timezone:
            </p>
            <p className="text-justify hyphens-auto max-w-2xl">
              Our teams work your hours. No more late-night calls or
              communication delays. We function as a true extension of your
              local team.
            </p>
          </ul>
          <ul className="fade-up">
            <p className="text-xl font-bold">Cost-Effective Excellence</p>
            <p className="text-justify hyphens-auto max-w-2xl">
              Access a premium talent pool and a fully managed team structure at
              a fraction of the cost of hiring in primary tech markets.
            </p>
          </ul>
          <ul className="fade-up">
            <p className="text-xl font-bold">Full-Spectrum Tech Mastery</p>
            <p className="text-justify hyphens-auto max-w-2xl">
              From building your core product and securing your perimeter to
              implementing AI and launching a Web3 platform, we are your single,
              trusted partner for all your technology needs.
            </p>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WhySection;
