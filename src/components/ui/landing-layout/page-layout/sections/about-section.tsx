/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { Compass, Target, Eye } from "lucide-react";
import { Card } from "@/components/ui/card";

type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type WhoCardDef = {
  id: string;
  title: string;
  subtitle?: string;
  body: string[];
  icon: SvgIcon;
};
const AboutSection = ({whoSectionRef, CONTAINER, UI}) => {
  const whoCards: WhoCardDef[] = [
    {
      id: "who-1",
      title: "Who We Are",
      subtitle: "Architects of the digital future.",
      body: [
        'At Algorim, we are architects of the digital future. Our name is inspired by "algorithm"—a testament to our core belief in creating logical, efficient, and powerful solutions to complex business challenges.',
      ],
      icon: Compass,
    },
    {
      id: "who-2",
      title: "Mission",
      subtitle: "",
      body: [
        "To democratize access to elite technology talent, empowering businesses worldwide to build secure, intelligent, and decentralized solutions without the Silicon Valley price tag.",
        "We bridge the gap between brilliant ideas and world-class execution.",
      ],
      icon: Target,
    },
    {
      id: "who-3",
      title: "Vision",
      subtitle: "",
      body: [
        "To be the world's most trusted partner for applied innovation.",
        "We’re building a future where any company—from ambitious startups to established enterprises—can harness the power of AI, Web3, and secure development to build what's next.",
      ],
      icon: Eye,
    },
  ];
  return (
    <section
      ref={whoSectionRef}
      className="relative min-h-[100svh] overflow-hidden py-16 md:py-24"
    >
      <div
        className={`relative ${CONTAINER} h-full flex flex-col md:flex-row items-center gap-10`}
      >
        {/* MOBILE: normal flow cards */}
        <div className="md:hidden w-full space-y-4">
          {whoCards.map((card: any) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.id}
                className={[
                  "rounded-2xl overflow-hidden",
                  UI.glass,
                  UI.border,
                  "shadow-[0_18px_60px_rgba(0,0,0,0.65)]",
                ].join(" ")}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`text-[11px] uppercase tracking-[0.25em] ${UI.textMuted}`}
                      >
                        {card.title}
                      </p>
                      {card.subtitle && (
                        <h3
                          className={`text-lg font-semibold mt-1 ${UI.textStrong}`}
                        >
                          {card.subtitle}
                        </h3>
                      )}
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
                      <Icon className="h-5 w-5 text-white/90" />
                    </div>
                  </div>

                  <div className={`mt-4 space-y-3 text-sm ${UI.textSub}`}>
                    {card.body.map((p: string, idx: number) => (
                      <p key={idx} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* DESKTOP: pinned stacked cards */}
        <div className="hidden md:block relative w-full md:w-1/2 h-[70vh]">
          {whoCards.map((card: any, index: number) => {
            const Icon = card.icon;
            const number = String(index + 1).padStart(2, "0");

            return (
              <Card
                key={card.id}
                className={[
                  "who-card group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[65vh] overflow-hidden flex flex-col justify-between will-change-transform rounded-none transition-colors",
                  UI.glass,
                  UI.border,
                  "shadow-[0_22px_60px_rgba(0,0,0,0.78)]",
                ].join(" ")}
              >
                <div className="pointer-events-none absolute inset-0 -z-10">
                  <div
                    className="absolute inset-0 opacity-[0.10]"
                    style={{
                      backgroundImage: `
                            linear-gradient(to right, rgba(255,255,255,0.10) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)
                          `,
                      backgroundSize: "34px 34px",
                      maskImage:
                        "radial-gradient(circle at 30% 20%, black 0%, black 45%, transparent 75%)",
                      WebkitMaskImage:
                        "radial-gradient(circle at 30% 20%, black 0%, black 45%, transparent 75%)",
                    }}
                  />
                  <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-white/8 blur-3xl" />
                  <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-white/6 blur-3xl" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/55" />
                </div>

                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
                  <div className="absolute left-8 right-8 bottom-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                  <div className="absolute top-8 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" />
                  <div className="absolute top-8 bottom-8 right-0 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" />

                  <span className="absolute left-3 top-3 h-6 w-6 border-l border-t border-white/18" />
                  <span className="absolute right-3 top-3 h-6 w-6 border-r border-t border-white/16" />
                  <span className="absolute left-3 bottom-3 h-6 w-6 border-l border-b border-white/14" />
                  <span className="absolute right-3 bottom-3 h-6 w-6 border-r border-b border-white/14" />

                  <span className="absolute left-0 top-10 h-0 w-0 border-y-[10px] border-y-transparent border-r-[12px] border-r-white/10" />
                  <span className="absolute right-0 bottom-10 h-0 w-0 border-y-[10px] border-y-transparent border-l-[12px] border-l-white/8" />
                </div>

                <div className="pointer-events-none absolute top-5 left-6 select-none">
                  <span className="text-[72px] font-extrabold tracking-tight text-white/10">
                    {number}
                  </span>
                </div>

                <div className="relative z-10 flex items-start justify-between px-6 pt-6">
                  <div className="mt-2">
                    <p
                      className={`text-[11px] uppercase tracking-[0.25em] ${UI.textMuted}`}
                    >
                      {card.title}
                    </p>
                    {card.subtitle && (
                      <h3
                        className={`text-xl font-semibold mt-1 ${UI.textStrong}`}
                      >
                        {card.subtitle}
                      </h3>
                    )}

                    <div className="mt-3 inline-flex items-center gap-2 rounded-none border border-white/10 bg-white/[0.06] px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-white/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_0_14px_rgba(255,255,255,0.12)]" />
                      classified brief
                    </div>
                  </div>

                  <div className="who-icon flex h-10 w-10 items-center justify-center rounded-none border border-white/10 bg-white/[0.06] shadow-[0_0_22px_rgba(255,255,255,0.10)] transition-transform duration-300 group-hover:scale-[1.06]">
                    <Icon className="h-5 w-5 text-white/90 drop-shadow-[0_0_10px_rgba(255,255,255,0.10)]" />
                  </div>
                </div>

                <div
                  className={`relative z-10 px-6 pb-6 space-y-3 text-base ${UI.textSub} mt-4`}
                >
                  {card.body.map((paragraph: string, idx: number) => (
                    <p key={idx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pointer-events-none absolute bottom-0 left-0 right-0">
                  <div
                    className={`mx-6 mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] ${UI.textMuted}`}
                  >
                    <span>scroll to decrypt</span>
                    <span className="text-white/45">⟶</span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div
          id="who-heading"
          className="w-full md:w-1/2 space-y-4 text-left md:text-right relative z-10"
        >
          <p className={`text-xs uppercase tracking-[0.25em] ${UI.textMuted}`}>
            Who We Are
          </p>
          <h2
            className={`text-3xl md:text-4xl font-semibold md:leading-tight max-w-xl md:ml-auto ${UI.textStrong}`}
          >
            Architects of the digital future.
          </h2>
          <p
            className={`text-sm md:text-base ${UI.textSub} max-w-md md:ml-auto`}
          >
            Scroll to watch each card slide from bottom-right to top-left,
            layering the story of Algorim step by step.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
