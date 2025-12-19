/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

type BrandColor = {
  id: string;
  label: string;
  hex: string;
  gradientClass: string;
};

const brandColors: BrandColor[] = [
  {
    id: "emerald",
    label: "Neon Emerald",
    hex: "#22F39B",
    gradientClass: "from-emerald-400 via-lime-300 to-cyan-300",
  },
  {
    id: "violet",
    label: "Electric Violet",
    hex: "#7C3BFF",
    gradientClass: "from-violet-500 via-fuchsia-500 to-sky-400",
  },
  {
    id: "gold",
    label: "Solar Gold",
    hex: "#FACC15",
    gradientClass: "from-amber-300 via-yellow-400 to-orange-400",
  },
  {
    id: "infrared",
    label: "Infrared Coral",
    hex: "#FF4E6A",
    gradientClass: "from-rose-500 via-red-500 to-orange-500",
  },
  {
    id: "cyan",
    label: "Deep Space Cyan",
    hex: "#22D3EE",
    gradientClass: "from-cyan-400 via-sky-300 to-blue-500",
  },
];
const BrandSections = ({ brandCirclesSectionRef, CONTAINER, UI }) => {
  return (
    <section
      ref={brandCirclesSectionRef}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-48 -left-48 h-[620px] w-[620px] rounded-full bg-emerald-300/8 blur-[220px]" />
        <div className="absolute top-1/3 -right-52 h-[680px] w-[680px] rounded-full bg-violet-300/8 blur-[240px]" />
        <div className="absolute -bottom-56 left-1/2 -translate-x-1/2 h-[720px] w-[720px] rounded-full bg-white/6 blur-[260px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/75" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px]" />
      </div>

      <div
        className={`${CONTAINER} py-24 flex flex-col items-center gap-12 relative z-10`}
      >
        <div
          id="brand-circles-heading"
          className="text-center space-y-3 max-w-2xl"
        >
          <p className={`text-xs uppercase tracking-[0.25em] ${UI.textMuted}`}>
            Color System
          </p>

          <h2 className={`text-3xl md:text-4xl font-semibold ${UI.accentText}`}>
            Every great brand starts with disciplined color language.
          </h2>

          <p className={`text-sm md:text-base ${UI.textSub}`}>
            Tap a tile to copy the HEX. On desktop, scroll reveals the system.
          </p>
        </div>

        <div
          className="
                pointer-events-none absolute inset-0 flex items-center justify-center
                text-[40vw] md:text-[28vw]
                font-black leading-none
                text-white/[0.04]
                select-none -z-10
              "
        >
          <span className="brand-aa">Aa</span>
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {brandColors.map((c: any) => (
            <button
              key={c.id}
              type="button"
              className={[
                "brand-circle-wrapper group relative overflow-hidden text-left rounded-3xl transition-transform duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
                UI.glassSoft,
                UI.border,
                "shadow-[0_18px_70px_rgba(0,0,0,0.78)]",
              ].join(" ")}
              aria-label={`Copy ${c.label} ${c.hex}`}
              onClick={() => navigator.clipboard?.writeText(c.hex)}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
              <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/8 blur-3xl opacity-80" />
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-white/6 blur-3xl opacity-70" />

              <div className="relative z-10 p-5 md:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p
                      className={`text-[10px] uppercase tracking-[0.28em] ${UI.textMuted}`}
                    >
                      {c.label}
                    </p>
                    <p className="font-mono text-sm text-white/92">{c.hex}</p>
                  </div>

                  <span
                    className={`text-[10px] uppercase tracking-[0.22em] ${UI.textMuted}`}
                  >
                    copy ↗
                  </span>
                </div>

                <div className="brand-circle relative mt-4 h-40 rounded-2xl overflow-hidden border border-white/10 shadow-[0_14px_60px_rgba(0,0,0,0.60)]">
                  <div
                    className={`absolute inset-0 bg-gradient-to-tr ${c.gradientClass}`}
                  />
                  <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_bottom,rgba(0,0,0,0.12)_1px,transparent_1px)] [background-size:100%_12px]" />
                </div>

                <div
                  className={`mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.26em] ${UI.textMuted}`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-white/45 shadow-[0_0_14px_rgba(255,255,255,0.10)]" />
                    token
                  </span>
                  <span className="font-mono">{c.id}</span>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ring-1 ring-white/15" />
            </button>
          ))}
        </div>

        <div
          id="brand-quote"
          className="max-w-2xl text-center text-base md:text-lg text-white/85"
        >
          “Branding isn&apos;t just how you look. It&apos;s a repeatable pattern
          of choices that makes you unmistakable — even when the logo is nowhere
          on screen.”
        </div>
      </div>
    </section>
  );
};

export default BrandSections;
