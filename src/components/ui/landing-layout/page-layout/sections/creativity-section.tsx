import { Code2, Palette } from "lucide-react";
import React from "react";

const CreativitySection = ({ creativityTechSectionRef, CONTAINER, UI }) => {
  return (
    <section
      ref={creativityTechSectionRef}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/8 blur-[210px]" />
        <div className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full bg-white/6 blur-[240px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/75" />
      </div>

      <div
        className={`${CONTAINER} h-full flex items-center justify-center relative z-10`}
      >
        <div className="ct-shell relative w-full h-[72svh] md:h-[80svh]">
          <div
            className={[
              "ct-card relative w-full h-full rounded-[28px] sm:rounded-[36px] overflow-hidden flex flex-col md:flex-row transition-colors",
              UI.glass,
              UI.border,
              "shadow-[0_30px_110px_rgba(0,0,0,0.78)]",
            ].join(" ")}
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:46px_46px]" />

            <div className="ct-glow-a pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-emerald-300/10 blur-[190px]" />
            <div className="ct-glow-b pointer-events-none absolute -right-48 -bottom-48 h-[620px] w-[620px] rounded-full bg-violet-300/10 blur-[220px]" />

            <div className="ct-divider pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-white/10 md:top-0 md:bottom-0 md:left-1/2 md:right-auto md:h-auto md:w-px" />

            <div className="ct-left relative w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
              <div className="ct-icon-left absolute top-5 left-5 sm:top-7 sm:left-7 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-[0_0_18px_rgba(255,255,255,0.10)] flex items-center justify-center">
                <Palette className="h-6 w-6 sm:h-7 sm:w-7 text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.10)]" />
              </div>

              <p
                className={`ct-kicker-left text-[11px] uppercase tracking-[0.35em] ${UI.textMuted}`}
              >
                Creativity
              </p>

              <h2
                className={`ct-title-left mt-3 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight ${UI.accentText}`}
              >
                Creativity
              </h2>

              <p
                className={`ct-copy-left mt-4 sm:mt-5 max-w-md text-sm md:text-base ${UI.textSub} leading-relaxed`}
              >
                The palette, motion and story that make Algorim feel like a
                brand — not just a stack of features.
              </p>

              <div className="ct-chip-left mt-6 sm:mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_0_14px_rgba(255,255,255,0.12)]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/85">
                  Craft / Motion / Voice
                </span>
              </div>
            </div>

            <div className="ct-right relative w-full md:w-1/2 p-6 sm:p-8 md:p-12 flex flex-col justify-center md:text-right">
              <div className="ct-icon-right absolute bottom-5 right-5 sm:bottom-7 sm:right-7 h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-xl shadow-[0_0_18px_rgba(255,255,255,0.10)] flex items-center justify-center">
                <Code2 className="h-6 w-6 sm:h-7 sm:w-7 text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.10)]" />
              </div>

              <p
                className={`ct-kicker-right text-[11px] uppercase tracking-[0.35em] ${UI.textMuted}`}
              >
                Technicality
              </p>

              <h2 className="ct-title-right mt-3 text-3xl sm:text-4xl md:text-5xl font-mono font-semibold tracking-tight text-white/92">
                <span className="text-white/55">&lt;</span>
                <span className="mx-1">Technicality</span>
                <span className="text-white/55">/&gt;</span>
              </h2>

              <p
                className={`ct-copy-right mt-4 sm:mt-5 md:ml-auto max-w-md text-sm md:text-base ${UI.textSub} leading-relaxed`}
              >
                The engineering, architecture and security that keep every
                interaction fast, correct and safe.
              </p>

              <div className="ct-chip-right mt-6 sm:mt-7 md:ml-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_0_14px_rgba(255,255,255,0.12)]" />
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/85">
                  Perf / Security / Scale
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreativitySection;
