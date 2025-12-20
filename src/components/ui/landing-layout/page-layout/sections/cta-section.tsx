import React from "react";

const CTASection = ({ ctaSectionRef, CONTAINER, UI }) => {
  return (
    <section
      ref={ctaSectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/65" />
      </div>

      <div className={`relative ${CONTAINER}`}>
        <div
          data-cta-card
          className={[
            "relative overflow-hidden rounded-3xl transition-colors",
            UI.glass,
            UI.border,
            "shadow-[0_18px_70px_rgba(0,0,0,0.78)]",
          ].join(" ")}
        >
          <div
            data-cta-glow
            className="pointer-events-none absolute inset-0 opacity-0"
          >
            <div className={`absolute inset-0 ${UI.glowA}`} />
            <div className={`absolute inset-0 ${UI.glowB}`} />
          </div>

          <div
            data-cta-sheen
            className="pointer-events-none absolute -inset-y-10 -left-1/2 w-1/2 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)] blur-sm opacity-0"
          />

          <div className="relative p-7 sm:p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <div className="max-w-2xl">
                <div
                  data-cta-kicker
                  className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] ${UI.textMuted}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white/45" />
                  Secure · Ship · Scale
                </div>

                <h3
                  data-cta-title
                  className={`mt-4 text-3xl md:text-4xl font-semibold ${UI.textStrong}`}
                >
                  Ready to ship something{" "}
                  <span className={UI.accentText}>premium</span>?
                </h3>

                <p
                  data-cta-subtitle
                  className={`mt-3 text-sm md:text-base ${UI.textSub}`}
                >
                  Book a quick call and we’ll map your roadmap, stack, and risk
                  surface — then propose a clean execution plan.
                </p>
              </div>

              <div
                data-cta-actions
                className="flex flex-col sm:flex-row gap-3 sm:items-center"
              >
                <a
                  href="https://meet.brevo.com/algorim-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                        inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium
                        bg-white text-black hover:bg-white/90
                        shadow-[0_18px_60px_rgba(0,0,0,0.45)]
                        transition
                      "
                >
                  Book a Call
                </a>

                <a
                  href="#services"
                  className="
                        inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium
                        border border-white/12
                        bg-white/[0.05]
                        text-white/90
                        hover:border-white/20
                        transition
                      "
                >
                  See Services
                </a>
              </div>
            </div>

            <div
              className={`mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs ${UI.textMuted}`}
            >
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                Response in <span className="text-white/90">24h</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                Fixed-scope or <span className="text-white/90">retainer</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
                Reports built for <span className="text-white/90">execs</span>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
