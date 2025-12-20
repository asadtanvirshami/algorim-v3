/* eslint-disable @typescript-eslint/no-explicit-any */
// DevLayout.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import { useLenis } from "lenis/react";

import HeroOverlay from "../landing-layout/page-layout/sections/hero_overlay";
import IntroSection from "../landing-layout/page-layout/sections/intro-section";
// import ProcessSection from "../landing-layout/page-layout/sections/process-section";
import AboutSection from "../landing-layout/page-layout/sections/about-section";
import ServicesSection from "../landing-layout/page-layout/sections/services-section";
import CreativitySection from "../landing-layout/page-layout/sections/creativity-section";
import GlobeSection from "../landing-layout/page-layout/sections/globe-section";
import CTASection from "../landing-layout/page-layout/sections/cta-section";
import PortfolioSection from "../landing-layout/page-layout/sections/portfolio-section";
import BrandSections from "../landing-layout/page-layout/sections/brand-section";
import ASection from "../landing-layout/page-layout/sections/A-section";
import OutroSection from "../landing-layout/page-layout/sections/outro-section";
import Footer from "../footer";

/** =========================
 *  RESPONSIVE LAYOUT HELPERS
 *  ========================= */
const CONTAINER =
  "mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10 lg:px-16 2xl:max-w-7xl";

/** =========================
 *  COLOR SYSTEM (dark, premium)
 *  ========================= */
const UI = {
  pageBg: "bg-[#0A0B0E] text-neutral-100",
  textMuted: "text-white/55",
  textSub: "text-white/70",
  textStrong: "text-white/92",
  border: "border-white/10",
  borderStrong: "border-white/14",
  glass: "bg-white/[0.05] backdrop-blur-2xl",
  glassSoft: "bg-white/[0.04] backdrop-blur-xl",
  glowA:
    "bg-[radial-gradient(900px_circle_at_30%_20%,rgba(255,255,255,0.10),transparent_45%)]",
  glowB:
    "bg-[radial-gradient(700px_circle_at_70%_65%,rgba(212,212,216,0.09),transparent_50%)]",
  accentGrad: "bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-300",
  accentText:
    "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-200 to-cyan-300",
};
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const DevLayout: React.FC = () => {
  const lenis = useLenis(); // must be provided by <ReactLenis root />

  const layoutRef = useRef<HTMLDivElement | null>(null);
  const heroScrollRef = useRef<HTMLElement | null>(null);
  const pinnedSectionRef = useRef<HTMLDivElement | null>(null);
  const whoSectionRef = useRef<HTMLElement | null>(null);
  const creativityTechSectionRef = useRef<HTMLElement | null>(null);
  const servicesHorizontalSectionRef = useRef<HTMLElement | null>(null);
  const servicesTrackRef = useRef<HTMLDivElement | null>(null);
  const brandCirclesSectionRef = useRef<HTMLElement | null>(null);
  const giantASectionRef = useRef<HTMLElement | null>(null);
  const giantARef = useRef<HTMLDivElement | null>(null);
  const worldSectionRef = useRef<HTMLElement | null>(null);
  const footerSectionRef = useRef<HTMLElement | null>(null);
  const portfolioSectionRef = useRef<HTMLElement | null>(null);
  const ctaSectionRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!layoutRef.current) return;
    if (typeof window === "undefined") return;

    // Register on client only
    gsap.registerPlugin(ScrollTrigger);

    // ✅ NEVER at module scope in Next. Do it here.
    ScrollTrigger.config({
      ignoreMobileResize: true,
      limitCallbacks: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    });

    // ✅ Lenis + GSAP ticker sync (THIS is what usually “fixes everything”)
    const onLenisScroll = () => ScrollTrigger.update();
    const ticker = (time: number) => {
      // gsap time is seconds, Lenis expects ms
      lenis?.raf(time * 1000);
    };

    if (lenis) {
      lenis.on("scroll", onLenisScroll);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const mm: any = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // -------------------------
        // YOUR ORIGINAL ANIMATIONS
        // -------------------------

        // =========================
        // HERO pinned (KEEP GLOBAL, but add willChange)
        // =========================
        if (heroScrollRef.current) {
          const tlHero = gsap.timeline({
            scrollTrigger: {
              trigger: heroScrollRef.current,
              start: "top top",
              end: "+=160%",
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          gsap.set(".hero-overlay", { yPercent: 100, willChange: "transform" });
          gsap.set(".hero-word", {
            opacity: 0,
            scale: 0.75,
            y: 40,
            willChange: "transform,opacity,filter",
          });

          tlHero
            .to(".hero-overlay", {
              yPercent: 0,
              backgroundColor: "rgba(0,0,0,1)",
              duration: 1.1,
              ease: "power3.out",
            })
            .to(
              ".hero-word",
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1,
                ease: "power3.out",
              },
              "-=0.6"
            )
            .to(
              ".hero-word",
              {
                scale: 1.06,
                y: -10,
                filter:
                  "drop-shadow(0px 0px 25px rgba(255,255,255,0.45)) drop-shadow(0px 20px 60px rgba(0,0,0,0.85))",
                duration: 1.3,
                ease: "power2.inOut",
              },
              "+=0.2"
            );
        }

        // =========================
        // OUR PROCESS pinned (SCOPED + discrete updates)
        // =========================
        if (pinnedSectionRef.current) {
          const section = pinnedSectionRef.current;

          const lineFill = section.querySelector(
            ".process-line-fill"
          ) as HTMLElement | null;

          // Scope to section to avoid grabbing wrong nodes
          const labels = gsap.utils.toArray<HTMLElement>(
            ".process-step-label",
            section
          );
          const cards = gsap.utils.toArray<HTMLElement>(
            ".process-card-inner",
            section
          );

          if (cards.length) {
            const totalSteps = cards.length;
            let lastIdx = -1;

            cards.forEach((card, index) => {
              gsap.set(card, {
                opacity: index === 0 ? 1 : 0,
                scale: index === 0 ? 1 : 0.94,
                y: index === 0 ? 0 : 18,
                willChange: "transform,opacity",
              });
            });

            if (lineFill) {
              gsap.set(lineFill, {
                scaleY: 0,
                transformOrigin: "top center",
                willChange: "transform",
              });
            }

            gsap.set(labels, { opacity: 0.45 });
            if (labels[0]) gsap.set(labels[0], { opacity: 1 });

            gsap.from(
              [
                section.querySelector("#process-kicker"),
                section.querySelector("#process-title"),
                section.querySelector("#process-sub"),
                section.querySelector(".process-cards-window"),
              ].filter(Boolean),
              {
                opacity: 0,
                y: 24,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.08,
                scrollTrigger: { trigger: section, start: "top 80%" },
              }
            );

            ScrollTrigger.create({
              trigger: section,
              start: "top top",
              end: "+=" + totalSteps * 160 + "%",
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
              snap:
                totalSteps > 1
                  ? {
                      snapTo: (value) => {
                        const seg = 1 / (totalSteps - 1);
                        return Math.round(value / seg) * seg;
                      },
                      duration: 0.35,
                      ease: "power1.out",
                    }
                  : undefined,
              onUpdate: (self) => {
                const progress = self.progress;

                // Continuous but cheap
                if (lineFill) gsap.set(lineFill, { scaleY: progress });

                const idx = Math.round(progress * (totalSteps - 1));
                if (idx === lastIdx) return; // ✅ stops update spam
                lastIdx = idx;

                cards.forEach((card, i) => {
                  const isActive = i === idx;
                  gsap.to(card, {
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.94,
                    y: isActive ? 0 : 18,
                    duration: 0.25,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                });

                labels.forEach((label, i) => {
                  gsap.to(label, {
                    opacity: i === idx ? 1 : 0.45,
                    duration: 0.2,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                });
              },
            });
          }
        }

        // =========================
        // Generic fades
        // =========================
        gsap.utils.toArray<HTMLElement>(".fade-section").forEach((section) => {
          gsap.from(section, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        });

        // =========================
        // WHO WE ARE stack
        // =========================
        if (whoSectionRef.current) {
          const cards = gsap.utils.toArray<HTMLElement>(".who-card");

          cards.forEach((card, index) => {
            gsap.set(card, {
              opacity: 0,
              x: 220,
              y: 220,
              scale: 0.96,
              rotateX: -4,
              rotateY: 4,
              transformPerspective: 1200,
              zIndex: index + 1,
              willChange: "transform,opacity",
            });
          });

          const tlWho = gsap.timeline({
            scrollTrigger: {
              trigger: whoSectionRef.current,
              start: "top top",
              end: "+=350%",
              scrub: 1.15,
              pin: true,
              anticipatePin: 1,
            },
          });

          tlWho.from("#who-heading", {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power3.out",
          });

          cards.forEach((card, index) => {
            const offset = index * 32;
            const iconEl = card.querySelector(
              ".who-icon"
            ) as HTMLElement | null;

            tlWho.to(
              card,
              {
                opacity: 1,
                x: -offset,
                y: -offset,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                duration: 1,
                ease: "power2.out",
              },
              index === 0 ? "+=0.4" : ">-=0.25"
            );

            if (iconEl) {
              tlWho.fromTo(
                iconEl,
                { y: 16, opacity: 0, scale: 0.85 },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.6,
                  ease: "power2.out",
                },
                "<+0.1"
              );
            }
          });
        }

        // =========================
        // CREATIVITY vs TECHNICALITY (kept as-is)
        // =========================
        if (creativityTechSectionRef.current) {
          const section = creativityTechSectionRef.current;

          const tlCT = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=220%",
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          gsap.set(".ct-card", {
            opacity: 0,
            y: 40,
            scale: 0.98,
            filter: "blur(6px)",
            willChange: "transform,opacity,filter",
          });
          gsap.set(".ct-divider", {
            scaleY: 0,
            transformOrigin: "top",
            willChange: "transform",
          });

          gsap.set(
            [
              ".ct-kicker-left",
              ".ct-title-left",
              ".ct-copy-left",
              ".ct-chip-left",
              ".ct-kicker-right",
              ".ct-title-right",
              ".ct-copy-right",
              ".ct-chip-right",
            ],
            { opacity: 0, y: 18, willChange: "transform,opacity" }
          );

          gsap.set(".ct-icon-left", {
            opacity: 0,
            scale: 0.85,
            x: -10,
            y: -10,
            willChange: "transform,opacity",
          });
          gsap.set(".ct-icon-right", {
            opacity: 0,
            scale: 0.85,
            x: 10,
            y: 10,
            willChange: "transform,opacity",
          });

          gsap.set(".ct-glow-a", { x: -60, y: -40, scale: 0.9, opacity: 0.6 });
          gsap.set(".ct-glow-b", { x: 60, y: 40, scale: 0.9, opacity: 0.55 });

          tlCT
            .to(".ct-card", {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "power3.out",
            })
            .to(
              [".ct-icon-left", ".ct-icon-right"],
              {
                opacity: 1,
                scale: 1,
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.12,
              },
              "-=0.55"
            )
            .to(
              [
                ".ct-kicker-left",
                ".ct-title-left",
                ".ct-copy-left",
                ".ct-chip-left",
              ],
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.08,
              },
              "-=0.45"
            )
            .to(
              ".ct-divider",
              { scaleY: 1, duration: 0.7, ease: "power2.out" },
              "-=0.55"
            )
            .to(
              [
                ".ct-kicker-right",
                ".ct-title-right",
                ".ct-copy-right",
                ".ct-chip-right",
              ],
              {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                stagger: 0.08,
              },
              "-=0.5"
            )
            .to(
              ".ct-glow-a",
              {
                x: 30,
                y: 10,
                scale: 1.08,
                opacity: 0.85,
                duration: 1.4,
                ease: "sine.inOut",
              },
              0.2
            )
            .to(
              ".ct-glow-b",
              {
                x: -30,
                y: -10,
                scale: 1.1,
                opacity: 0.8,
                duration: 1.4,
                ease: "sine.inOut",
              },
              0.2
            )
            .to(
              ".ct-icon-left",
              { y: -6, duration: 1.2, ease: "sine.inOut" },
              0.4
            )
            .to(
              ".ct-icon-right",
              { y: 6, duration: 1.2, ease: "sine.inOut" },
              0.4
            );
        }

        // =========================
        // WORLD (kept as-is, minor willChange)
        // =========================
        if (worldSectionRef.current) {
          const section = worldSectionRef.current;
          const globeShell = section.querySelector(
            ".world-globe-shell"
          ) as HTMLElement | null;

          gsap.set(["#world-kicker", "#world-title", "#world-copy"], {
            opacity: 0,
            y: 30,
            willChange: "transform,opacity",
          });
          gsap.set(".world-stat", {
            opacity: 0,
            y: 20,
            willChange: "transform,opacity",
          });

          if (globeShell) {
            gsap.set(globeShell, {
              opacity: 0,
              y: 80,
              scale: 0.85,
              rotateX: -10,
              rotateY: 18,
              transformStyle: "preserve-3d",
              transformOrigin: "50% 50%",
              willChange: "transform,opacity",
            });
          }

          const tlWorld = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=220%",
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          tlWorld
            .to(
              "#world-kicker",
              { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
              0
            )
            .to(
              "#world-title",
              { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
              0.05
            )
            .to(
              "#world-copy",
              { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
              0.1
            )
            .to(
              ".world-stat",
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: 0.12,
              },
              0.25
            );

          if (globeShell) {
            tlWorld.to(
              globeShell,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                duration: 1.2,
                ease: "power3.out",
              },
              0.2
            );
          }
        }

        // =========================
        // SERVICES horizontal (scoped cards + stable refresh)
        // =========================
        const servicesSection = servicesHorizontalSectionRef.current;
        const servicesTrack = servicesTrackRef.current;

        if (servicesSection && servicesTrack) {
          const cards = gsap.utils.toArray<HTMLElement>(
            ".service-card-h",
            servicesSection
          );

          const getScrollDistance = () => {
            const raw = servicesTrack.scrollWidth - servicesSection.clientWidth;
            return raw > 0 ? raw + 64 : 0;
          };

          const horizontalTween = gsap.to(servicesTrack, {
            x: () => -getScrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: servicesSection,
              start: "top top",
              end: () => `+=${getScrollDistance()}`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          // keep your float, but keep it light
          gsap.to(".service-icon", {
            y: -4,
            repeat: -1,
            yoyo: true,
            duration: 2.2,
            ease: "sine.inOut",
          });

          cards.forEach((card, index) => {
            const direction = index % 2 === 0 ? -1 : 1;
            const iconEl = card.querySelector(
              ".service-icon"
            ) as HTMLElement | null;

            gsap.set(card, {
              opacity: 0,
              y: 80,
              rotateY: 10 * direction,
              scale: 0.9,
              willChange: "transform,opacity",
            });
            if (iconEl)
              gsap.set(iconEl, {
                y: 20,
                opacity: 0,
                scale: 0.7,
                willChange: "transform,opacity",
              });

            ScrollTrigger.create({
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 90%",
              end: "left 30%",
              onEnter: () => {
                gsap.to(card, {
                  opacity: 1,
                  y: 0,
                  rotateY: 0,
                  scale: 1,
                  duration: 0.9,
                  ease: "power3.out",
                  overwrite: "auto",
                });
                if (iconEl)
                  gsap.to(iconEl, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
              },
              onLeaveBack: () => {
                gsap.to(card, {
                  opacity: 0,
                  y: 80,
                  rotateY: 10 * direction,
                  scale: 0.9,
                  duration: 0.5,
                  ease: "power2.in",
                  overwrite: "auto",
                });
                if (iconEl)
                  gsap.to(iconEl, {
                    y: 20,
                    opacity: 0,
                    scale: 0.7,
                    duration: 0.4,
                    ease: "power2.in",
                    overwrite: "auto",
                  });
              },
            });
          });
        }

        // =========================
        // CTA (kept as-is)
        // =========================
        if (ctaSectionRef.current) {
          const section = ctaSectionRef.current;

          gsap.set("[data-cta-card]", {
            y: 40,
            autoAlpha: 0,
            scale: 0.985,
            willChange: "transform,opacity",
          });
          gsap.set(
            [
              "[data-cta-kicker]",
              "[data-cta-title]",
              "[data-cta-subtitle]",
              "[data-cta-actions]",
            ],
            { y: 18, autoAlpha: 0, willChange: "transform,opacity" }
          );
          gsap.set("[data-cta-sheen]", {
            xPercent: -120,
            autoAlpha: 0,
            willChange: "transform,opacity",
          });
          gsap.set("[data-cta-glow]", { autoAlpha: 0 });

          const tlCTA = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              end: "bottom 35%",
              scrub: 1,
              anticipatePin: 1,
            },
          });

          tlCTA
            .to("[data-cta-card]", {
              y: 0,
              autoAlpha: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            })
            .to(
              ["[data-cta-kicker]", "[data-cta-title]", "[data-cta-subtitle]"],
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.08,
              },
              0.08
            )
            .to(
              "[data-cta-actions]",
              { y: 0, autoAlpha: 1, duration: 0.8, ease: "power3.out" },
              0.18
            )
            .to(
              "[data-cta-sheen]",
              { xPercent: 120, autoAlpha: 1, duration: 1.2, ease: "none" },
              0.1
            );

          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            onEnter: () =>
              gsap.to("[data-cta-glow]", {
                autoAlpha: 1,
                duration: 0.7,
                ease: "power2.out",
              }),
            onLeaveBack: () =>
              gsap.to("[data-cta-glow]", {
                autoAlpha: 0,
                duration: 0.25,
                ease: "power2.out",
              }),
          });
        }

        // =========================
        // PORTFOLIO pinned (discrete index updates + cheap continuous sets)
        // =========================
        if (portfolioSectionRef.current) {
          const section = portfolioSectionRef.current;

          const items = gsap.utils.toArray<HTMLElement>(
            "[data-portfolio-item]",
            section
          );
          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-portfolio-panel]",
            section
          );

          const scan = section.querySelector(
            ".portfolio-scan"
          ) as HTMLElement | null;
          const glow = section.querySelector(
            ".portfolio-glow"
          ) as HTMLElement | null;
          const needle = section.querySelector(
            ".portfolio-needle"
          ) as HTMLElement | null;

          gsap.set(panels, {
            autoAlpha: 0,
            y: 18,
            filter: "blur(6px)",
            willChange: "transform,opacity,filter",
          });
          gsap.set(items, {
            autoAlpha: 0,
            x: -16,
            willChange: "transform,opacity",
          });

          if (scan)
            gsap.set(scan, {
              y: -80,
              autoAlpha: 0,
              willChange: "transform,opacity",
            });
          if (glow)
            gsap.set(glow, {
              autoAlpha: 0,
              scale: 0.92,
              willChange: "transform,opacity",
            });
          if (needle)
            gsap.set(needle, {
              scaleY: 0.1,
              transformOrigin: "top center",
              willChange: "transform",
            });

          const total = Math.max(1, panels.length);
          let lastIdx = -1;

          const activate = (activeIndex: number) => {
            if (activeIndex === lastIdx) return;
            lastIdx = activeIndex;

            items.forEach((el, i) => {
              el.setAttribute(
                "data-active",
                i === activeIndex ? "true" : "false"
              );
              gsap.to(el, {
                autoAlpha: 1,
                x: 0,
                duration: 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
              gsap.to(el, {
                opacity: i === activeIndex ? 1 : 0.55,
                duration: 0.2,
                ease: "power2.out",
                overwrite: "auto",
              });
            });

            panels.forEach((p, i) => {
              const on = i === activeIndex;
              gsap.to(p, {
                autoAlpha: on ? 1 : 0,
                y: on ? 0 : 18,
                filter: on ? "blur(0px)" : "blur(6px)",
                duration: on ? 0.35 : 0.25,
                ease: "power2.out",
                overwrite: "auto",
              });
            });
          };

          activate(0);

          gsap.fromTo(
            section.querySelectorAll(
              ".portfolio-kicker, .portfolio-title, .portfolio-sub"
            ),
            { autoAlpha: 0, y: 18 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: section, start: "top 80%" },
            }
          );

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: `+=${total * 140}%`,
            scrub: 1.1,
            pin: true,
            anticipatePin: 1,
            snap:
              total > 1
                ? {
                    snapTo: (value) => {
                      const seg = 1 / (total - 1);
                      return Math.round(value / seg) * seg;
                    },
                    duration: 0.35,
                    ease: "power2.out",
                  }
                : undefined,
            onUpdate: (self) => {
              const idx = Math.round(self.progress * (total - 1));
              activate(idx);

              // continuous but cheap
              if (needle)
                gsap.set(needle, { scaleY: 0.12 + self.progress * 0.88 });
              if (scan)
                gsap.set(scan, { autoAlpha: 1, y: -60 + self.progress * 260 });
            },
          });

          if (glow) {
            gsap.to(glow, {
              autoAlpha: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: section, start: "top 60%" },
            });
          }

          gsap.to(section.querySelectorAll(".portfolio-radar"), {
            rotate: 360,
            duration: 26,
            ease: "none",
            repeat: -1,
          });
        }

        // =========================
        // Brand circles (kept as-is)
        // =========================
        if (brandCirclesSectionRef.current) {
          const circles = gsap.utils.toArray<HTMLElement>(
            ".brand-circle-wrapper"
          );

          const tlBrand = gsap.timeline({
            scrollTrigger: {
              trigger: brandCirclesSectionRef.current,
              start: "top top",
              end: "+=320%",
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          tlBrand.from(".brand-aa", {
            opacity: 0,
            y: 24,
            scale: 0.96,
            filter: "blur(6px)",
            duration: 1,
            ease: "power3.out",
          });

          tlBrand.from(
            "#brand-circles-heading > :not(.brand-aa)",
            {
              opacity: 0,
              y: 40,
              duration: 0.9,
              ease: "power3.out",
              stagger: 0.08,
            },
            "-=0.4"
          );

          circles.forEach((circle, index) => {
            tlBrand.from(
              circle,
              {
                opacity: 0,
                scale: 0.92,
                y: 30,
                filter: "blur(8px)",
                duration: 0.8,
                ease: "power3.out",
              },
              index === 0 ? "+=0.2" : "-=0.45"
            );
          });

          tlBrand.from(
            "#brand-quote",
            { opacity: 0, y: 30, duration: 0.9, ease: "power3.out" },
            "+=0.2"
          );

          gsap.to(".brand-circle", {
            scale: 1.03,
            repeat: -1,
            yoyo: true,
            duration: 3,
            ease: "sine.inOut",
            stagger: { each: 0.4, from: "center" },
          });
        }

        // =========================
        // Giant A zoom (kept as-is)
        // =========================
        if (giantASectionRef.current && giantARef.current) {
          gsap
            .timeline({
              scrollTrigger: {
                trigger: giantASectionRef.current,
                start: "top top",
                end: "+=200%",
                scrub: 1.2,
                pin: true,
                anticipatePin: 1,
              },
            })
            .fromTo(
              giantARef.current,
              {
                scale: 1,
                opacity: 0.9,
                filter:
                  "drop-shadow(0 0 8px rgba(255,255,255,0.25)) drop-shadow(0 0 24px rgba(255,255,255,0.12))",
              },
              {
                scale: 8,
                opacity: 0,
                filter:
                  "drop-shadow(0 0 40px rgba(255,255,255,0.8)) drop-shadow(0 0 110px rgba(255,255,255,0.45))",
                ease: "power2.inOut",
              }
            );
        }

        // =========================
        // FOOTER pinned reveal (kept as-is)
        // =========================
        if (footerSectionRef.current) {
          const section = footerSectionRef.current;

          gsap.set(
            [".footer-head", ".footer-cta", ".footer-grid", ".footer-bottom"],
            {
              opacity: 0,
              y: 26,
              willChange: "transform,opacity",
            }
          );
          gsap.set(".footer-glow", {
            opacity: 0,
            scale: 0.9,
            y: 40,
            willChange: "transform,opacity",
          });

          const tlFooter = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=170%",
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
            },
          });

          tlFooter
            .to(".footer-glow", {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            })
            .to(
              ".footer-head",
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              0.05
            )
            .to(
              ".footer-cta",
              { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
              0.18
            )
            .to(
              ".footer-grid",
              { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
              0.28
            )
            .to(
              ".footer-bottom",
              { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
              0.45
            )
            .to(
              ".footer-glow",
              { y: -60, duration: 1.2, ease: "sine.inOut" },
              0.2
            );

          gsap.to(".footer-dot", {
            scale: 1.25,
            repeat: -1,
            yoyo: true,
            duration: 1.2,
            ease: "sine.inOut",
          });
        }

        ScrollTrigger.refresh();
        requestAnimationFrame(() => ScrollTrigger.refresh());
        setTimeout(() => ScrollTrigger.refresh(), 250);

        return () => {};
      });
    }, layoutRef);

    return () => {
      ctx.revert();

      if (lenis) {
        lenis.off("scroll", onLenisScroll);
        gsap.ticker.remove(ticker);
      }
    };
  }, []);

  return (
    <div
      className={[
        "relative min-h-screen selection:bg-white/20 selection:text-white transition-colors duration-300",
        UI.pageBg,
      ].join(" ")}
    >
      {/* GLOBAL ATMOSPHERE */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-56 -left-56 h-[760px] w-[760px] rounded-full bg-white/[0.06] blur-[220px]" />
        <div className="absolute -bottom-72 -right-72 h-[900px] w-[900px] rounded-full bg-neutral-300/[0.05] blur-[260px]" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_35%,rgba(255,255,255,0.06),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(1400px_circle_at_50%_120%,rgba(0,0,0,0.92),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/80" />
        <div
          className="
            absolute inset-0 opacity-[0.16]
            [background-image:
              linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]
            [background-size:64px_64px]
          "
        />
      </div>

      <div
        ref={layoutRef}
        className="relative font-[family-name:var(--font-redhat)]"
      >
        <HeroOverlay heroScrollRef={heroScrollRef} />
        <IntroSection UI={UI} />
        {/* 
        <ProcessSection
          pinnedSectionRef={pinnedSectionRef}
          UI={UI}
          CONTAINER={CONTAINER}
        /> */}
        <AboutSection
          whoSectionRef={whoSectionRef}
          UI={UI}
          CONTAINER={CONTAINER}
        />
        <CreativitySection
          UI={UI}
          creativityTechSectionRef={creativityTechSectionRef}
          CONTAINER={CONTAINER}
        />
        <GlobeSection
          worldSectionRef={worldSectionRef}
          UI={UI}
          CONTAINER={CONTAINER}
        />
        <CTASection
          ctaSectionRef={ctaSectionRef}
          UI={UI}
          CONTAINER={CONTAINER}
        />
        <ServicesSection
          servicesTrackRef={servicesTrackRef}
          servicesHorizontalSectionRef={servicesHorizontalSectionRef}
          CONTAINER={CONTAINER}
          UI={UI}
        />
        <PortfolioSection
          portfolioSectionRef={portfolioSectionRef}
          CONTAINER={CONTAINER}
          UI={UI}
        />
        <BrandSections
          brandCirclesSectionRef={brandCirclesSectionRef}
          CONTAINER={CONTAINER}
          UI={UI}
        />
        <ASection giantARef={giantARef} giantASectionRef={giantASectionRef} />
        <OutroSection UI={UI} />
        <Footer
          footerSectionRef={footerSectionRef}
          CONTAINER={CONTAINER}
          UI={UI}
          lenis={lenis}
        />
      </div>
    </div>
  );
};

export default DevLayout;
