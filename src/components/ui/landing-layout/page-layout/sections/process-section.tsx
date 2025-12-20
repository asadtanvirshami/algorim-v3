/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card } from "@/components/ui/card";
import React from "react";

const ProcessSection = ({ pinnedSectionRef, CONTAINER, UI }) => {
  const SECTION_Y = "py-16 sm:py-20 md:py-24 lg:py-28";
  const cardsData = [
    {
      id: 0,
      title: "Discover",
      description: "Scroll to explore what we build, ship and optimize.",
    },
    {
      id: 1,
      title: "Design & Branding",
      description:
        "High-end product design and brand systems for digital products.",
    },
    {
      id: 2,
      title: "Engineering",
      description:
        "Elite engineering teams shipping fast, stable and secure apps.",
    },
  ];
  return (
    <section
      ref={pinnedSectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
    >
      <div
        className={`relative w-full ${CONTAINER} ${SECTION_Y} grid grid-cols-1 md:grid-cols-[0.55fr_0.65fr] gap-10 md:gap-16 items-center`}
      >
        <div className="space-y-8">
          <div className="space-y-3">
            <p
              id="process-kicker"
              className={`text-[11px] uppercase tracking-[0.28em] ${UI.textMuted}`}
            >
              Our process
            </p>
            <h2
              id="process-title"
              className={`text-3xl md:text-4xl font-semibold leading-tight ${UI.textStrong}`}
            >
              A clear, engineered path from{" "}
              <span className={UI.accentText}>idea</span> to{" "}
              <span className={UI.accentText}>impact</span>.
            </h2>
            <p
              id="process-sub"
              className={`text-sm md:text-base ${UI.textSub} max-w-md`}
            >
              No chaos, no black box. Just a repeatable system that keeps your
              team, stakeholders and roadmap aligned.
            </p>
          </div>

          <div className="hidden md:flex items-stretch gap-4">
            <div className="relative w-[3px] rounded-full bg-white/10 overflow-hidden">
              <div className="process-line-fill absolute inset-0 bg-gradient-to-b from-emerald-300/30 via-white/20 to-violet-300/25" />
            </div>
            <div className="flex flex-col justify-between py-1 text-xs space-y-4">
              <span className={`process-step-label ${UI.textMuted}`}>
                01 · Discover
              </span>
              <span className={`process-step-label ${UI.textMuted}`}>
                02 · Design & Brand
              </span>
              <span className={`process-step-label ${UI.textMuted}`}>
                03 · Ship & Evolve
              </span>
            </div>
          </div>
        </div>

        {/* MOBILE: stacked list (prevents overlap) */}
        <div className="md:hidden space-y-4">
          {cardsData.map((step: any, index: number) => (
            <Card
              key={step.id}
              className={[
                "rounded-2xl px-5 py-5 overflow-hidden",
                UI.glass,
                UI.border,
                "shadow-[0_18px_60px_rgba(0,0,0,0.65)]",
              ].join(" ")}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-white/85 mb-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/85 text-black text-[10px] font-semibold">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {index === 0 && "Discover"}
                {index === 1 && "Design & Brand"}
                {index === 2 && "Ship & Iterate"}
              </div>

              <h3 className={`text-lg font-semibold ${UI.textStrong}`}>
                {step.title}
              </h3>
              <p className={`text-sm ${UI.textSub} mt-2`}>{step.description}</p>
            </Card>
          ))}
        </div>

        {/* DESKTOP: pinned window (GSAP targets .process-card-inner) */}
        <div className="hidden md:block process-cards-window relative h-[360px] overflow-hidden">
          <div className="relative h-full">
            {cardsData.map((step: any, index: number) => (
              <div
                key={step.id}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Card
                  className={[
                    "process-card-inner w-full relative rounded-2xl px-6 py-6 overflow-hidden transition-colors",
                    UI.glass,
                    UI.border,
                    "shadow-[0_22px_70px_rgba(0,0,0,0.75)]",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                    <div className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-white/8 blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:44px_44px]" />
                  </div>

                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent opacity-70" />

                  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-white/85 mb-3 shadow-[0_0_18px_rgba(255,255,255,0.08)]">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/85 text-black text-[10px] font-semibold shadow-[0_0_12px_rgba(255,255,255,0.14)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {index === 0 && "Discover"}
                    {index === 1 && "Design & Brand"}
                    {index === 2 && "Ship & Iterate"}
                  </div>

                  <h3 className={`text-xl font-semibold ${UI.textStrong}`}>
                    {step.title}
                  </h3>
                  <p className={`text-sm ${UI.textSub} mt-2`}>
                    {step.description}
                  </p>

                  <div
                    className={`mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] ${UI.textMuted}`}
                  >
                    {index === 0 && (
                      <>
                        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/75">
                          Audit
                        </span>
                        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/75">
                          Strategy
                        </span>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/75">
                          Systems
                        </span>
                        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/75">
                          Prototypes
                        </span>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/75">
                          Launch
                        </span>
                        <span className="px-2 py-1 rounded-full border border-white/10 bg-white/[0.04] text-white/75">
                          Feedback loop
                        </span>
                      </>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
