/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card } from "@/components/ui/card";
import React from "react";

type PortfolioProject = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  results: string[];
  href?: string;
  status?: "LIVE" | "SOON" | any;
};

const PORTFOLIO: PortfolioProject[] = [
  {
    id: "case-001",
    title: "n0hacks.com",
    subtitle: "Cybersecurity services — offensive + defensive operations.",
    year: "2025",
    tags: ["Pentesting", "Red Team", "Cloud", "Incident Response"],
    results: [
      "High-trust security offering",
      "Premium positioning + clarity",
      "Security-first delivery system",
    ],
    href: "https://n0hacks.com",
    status: "LIVE",
  },
  {
    id: "case-002",
    title: "tradingbacktesting.com",
    subtitle: "Trading research + backtesting workflows and analytics.",
    year: "2024",
    tags: ["FinTech", "Backtesting", "Data", "Performance"],
    results: [
      "Faster strategy iteration",
      "Better simulation UX",
      "Built for signal + speed",
    ],
    href: "https://tradingbacktesting.com",
    status: "LIVE",
  },
  {
    id: "case-003",
    title: "Internal AI Systems",
    subtitle: "Agents + automation wired into real ops.",
    year: "2025",
    tags: ["Agents", "RAG", "Automation", "Evaluation"],
    results: [
      "Reduced manual ops",
      "Reliable workflows",
      "Production-safe agent loops",
    ],
    status: "LIVE",
  },
  {
    id: "case-004",
    title: "Launching our product soon",
    subtitle: "A new platform we’re shipping — built for scale & defense.",
    year: "2025",
    tags: ["Product", "SaaS", "Security-first", "Stealth"],
    results: [
      "Built from first principles",
      "Hardening baked into architecture",
      "Designed to scale globally",
    ],
    status: "SOON",
  },
];

const PortfolioSection = ({ portfolioSectionRef, CONTAINER, UI }) => {
  return (
    <section
      id="portfolio"
      ref={portfolioSectionRef}
      className="relative min-h-[100svh] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-white/8 blur-[190px]" />
        <div className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full bg-white/6 blur-[210px]" />
        <div
          className="absolute inset-0 opacity-[0.22]
              [background-image:
                linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
                linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
              [background-size:40px_40px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/75" />
      </div>

      <div
        className={`relative ${CONTAINER} pt-20 pb-16 md:pt-24 md:pb-20 z-10`}
      >
        <div className="space-y-3 max-w-2xl">
          <p
            className={`portfolio-kicker text-[11px] uppercase tracking-[0.28em] ${UI.textMuted}`}
          >
            Portfolio / Case Files
          </p>

          <h2
            className={`portfolio-title text-4xl md:text-5xl font-semibold leading-tight ${UI.textStrong}`}
          >
            Proof of work — <span className={UI.accentText}>built to ship</span>
            .
          </h2>

          <p className={`portfolio-sub text-sm md:text-base ${UI.textSub}`}>
            Scroll to browse each case file. The panel updates like a command
            console—clean, fast, and intentional.
          </p>
        </div>

        {/* MOBILE: list (prevents overlap) */}
        <div className="md:hidden mt-8 space-y-4">
          {PORTFOLIO.map((p) => (
            <Card
              key={p.id}
              className={[
                "rounded-2xl p-5",
                UI.glassSoft,
                UI.border,
                "shadow-[0_18px_60px_rgba(0,0,0,0.65)]",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p
                    className={`text-[10px] uppercase tracking-[0.26em] ${UI.textMuted}`}
                  >
                    {p.id} · {p.year} · {p.status}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">
                    <span className={UI.accentText}>{p.title}</span>
                  </h3>
                  <p className={`mt-2 text-sm ${UI.textSub}`}>{p.subtitle}</p>
                </div>

                {p.href ? (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold bg-white text-black"
                  >
                    Visit ↗
                  </a>
                ) : null}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full border border-white/12 bg-white/[0.05] text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {p.results.map((r, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3"
                  >
                    <p className={`text-sm ${UI.textSub}`}>{r}</p>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* DESKTOP: pinned console */}
        <div className="hidden md:grid mt-10 md:mt-12 grid-cols-1 md:grid-cols-[0.44fr_0.56fr] gap-6 md:gap-8 items-stretch">
          {/* LEFT: index */}
          <div
            className={[
              "relative overflow-hidden rounded-3xl transition-colors",
              UI.glassSoft,
              UI.border,
              "shadow-[0_18px_70px_rgba(0,0,0,0.78)]",
            ].join(" ")}
          >
            <div className="portfolio-glow pointer-events-none absolute -inset-20 -z-10 rounded-full bg-white/8 blur-[140px]" />

            <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.45]">
              <div className="portfolio-radar absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
              <div className="portfolio-radar absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />
              <div className="portfolio-radar absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/6" />
            </div>

            <div className="relative p-6 md:p-7">
              <div className="flex items-center justify-between gap-3">
                <p
                  className={`text-xs uppercase tracking-[0.22em] ${UI.textMuted}`}
                >
                  Index
                </p>
                <span
                  className={`text-[10px] uppercase tracking-[0.22em] ${UI.textMuted}`}
                >
                  scroll-controlled
                </span>
              </div>

              <div className="mt-5 space-y-2">
                {PORTFOLIO.map((p: any, i: number) => (
                  <div
                    key={p.id}
                    data-portfolio-item
                    className="group relative rounded-2xl px-4 py-3 border border-white/10 bg-white/[0.04] backdrop-blur-md transition-colors"
                  >
                    <div
                      className="
                            pointer-events-none absolute inset-0 rounded-2xl opacity-0
                            group-[&[data-active='true']]:opacity-100
                            transition-opacity
                            bg-gradient-to-r from-white/8 via-white/10 to-white/8
                          "
                    />

                    <div className="relative flex items-start justify-between gap-4">
                      <div>
                        <p
                          className={`text-[10px] uppercase tracking-[0.26em] ${UI.textMuted}`}
                        >
                          {p.id} · {p.year}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-white/92">
                          {p.title}
                        </p>
                        <p className={`mt-1 text-xs ${UI.textSub}`}>
                          {p.subtitle}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span
                          className={[
                            "text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full border",
                            p.status === "SOON"
                              ? "border-white/18 bg-white/[0.06] text-white/90"
                              : "border-white/12 bg-white/[0.05] text-white/80",
                          ].join(" ")}
                        >
                          {p.status === "SOON" ? "SOON" : "LIVE"}
                        </span>

                        <span className={`text-[10px] ${UI.textMuted}`}>
                          #{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute right-4 top-6 bottom-6 w-[2px] rounded-full bg-white/10 overflow-hidden">
                <div className="portfolio-needle absolute inset-0 bg-gradient-to-b from-emerald-300/25 via-white/20 to-violet-300/20" />
              </div>
            </div>
          </div>

          {/* RIGHT: active case file */}
          <div
            className={[
              "relative overflow-hidden rounded-3xl transition-colors",
              UI.glassSoft,
              UI.border,
              "shadow-[0_18px_70px_rgba(0,0,0,0.78)]",
            ].join(" ")}
          >
            <div className="portfolio-scan pointer-events-none absolute left-0 right-0 top-[-60px] h-10 opacity-0 bg-gradient-to-r from-transparent via-white/18 to-transparent blur-md" />

            <div className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full bg-emerald-300/8 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-violet-300/8 blur-3xl" />

            <div className="relative p-6 md:p-7 h-full">
              <div className="flex items-center justify-between gap-3">
                <p
                  className={`text-xs uppercase tracking-[0.22em] ${UI.textMuted}`}
                >
                  Active Case File
                </p>
                <p
                  className={`text-[10px] uppercase tracking-[0.22em] ${UI.textMuted}`}
                >
                  verified output
                </p>
              </div>

              <div className="mt-5 relative min-h-[420px]">
                {PORTFOLIO.map((p: any) => (
                  <div
                    key={p.id}
                    data-portfolio-panel
                    className="absolute inset-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <p
                          className={`text-[10px] uppercase tracking-[0.26em] ${UI.textMuted}`}
                        >
                          {p.id} · {p.year}
                        </p>

                        <h3 className="text-3xl font-semibold leading-tight">
                          <span className={UI.accentText}>{p.title}</span>
                        </h3>

                        <p className={`text-base ${UI.textSub} max-w-xl`}>
                          {p.subtitle}
                        </p>
                      </div>

                      {p.href ? (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                                inline-flex items-center justify-center
                                rounded-2xl px-4 py-2 text-xs font-semibold
                                bg-white text-black hover:bg-white/90
                                shadow-[0_18px_60px_rgba(0,0,0,0.45)]
                                hover:scale-[1.02] active:scale-[0.98]
                                transition-transform
                              "
                        >
                          Visit ↗
                        </a>
                      ) : (
                        <div className="text-[10px] uppercase tracking-[0.22em] px-3 py-2 rounded-2xl border border-white/12 bg-white/[0.06] text-white/85">
                          Internal
                        </div>
                      )}
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {p.tags.map((t: string) => (
                        <span
                          key={t}
                          className="text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full border border-white/12 bg-white/[0.05] text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {p.results.map((r: string, idx: number) => (
                        <div
                          key={idx}
                          className="rounded-2xl p-4 border border-white/10 bg-white/[0.04] backdrop-blur-md"
                        >
                          <div className="flex items-start gap-3">
                            <span className="mt-2 h-[4px] w-[14px] rounded-full bg-white/25 shadow-[0_0_16px_rgba(255,255,255,0.10)]" />
                            <p className={`text-sm ${UI.textSub}`}>{r}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {p.status === "SOON" && (
                      <div className="mt-6 rounded-2xl border border-white/12 bg-white/[0.06] p-4">
                        <p className="text-[11px] uppercase tracking-[0.26em] text-white/90">
                          Launch notice
                        </p>
                        <p className={`mt-2 text-sm ${UI.textSub}`}>
                          We’re launching our own product soon. If you want
                          early access, hit the footer email and we’ll whitelist
                          you.
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/55">
                <span className="font-mono">SCROLL: NEXT_CASE</span>
                <span className="font-mono">STATUS: OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
