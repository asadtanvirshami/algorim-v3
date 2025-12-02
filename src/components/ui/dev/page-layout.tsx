// DevLayout.tsx
"use client";

import React, { useLayoutEffect, useRef, useEffect } from "react";
import { useLenis } from "lenis/react";
import { Card } from "../card";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../../ui/globe").then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700" />
  ),
});

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Compass,
  Target,
  Eye,
  Palette,
  Code2,
  Bot,
  ShieldHalf,
  Cloud,
  Cuboid,
} from "lucide-react";
import HeroOverlay from "../landing-layout/page-layout/sections/hero_overlay";

gsap.registerPlugin(ScrollTrigger);

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

type Service = {
  id: string;
  label: string;
  tag: string;
  description: string;
  bullets: string[];
  icon: React.ElementType;
};

const services: Service[] = [
  {
    id: "branding",
    label: "Branding & Design",
    tag: "Brand Systems · Creative",
    description:
      "We build brands that are visually consistent, strategically sharp and ready to scale across every touchpoint.",
    bullets: [
      "Complete branding systems & guidelines",
      "Business cards, e-cards & presentation templates",
      "Social media posts & campaign assets",
      "Meta Ads creatives & Business Manager setup",
      "SEO-friendly brand foundations & content direction",
      "Logo design & identity systems",
      "UI/UX design for web & mobile products",
      "Brand strategy & long-term brand development",
    ],
    icon: Palette,
  },
  {
    id: "fullstack",
    label: "Full-Stack & Product Engineering",
    tag: "Web · Mobile · Platforms",
    description:
      "From MVPs to enterprise platforms, we ship fast, stable and secure apps across web and mobile.",
    bullets: [
      "Backend: Node.js, NestJS, Go (Gin), REST & GraphQL APIs",
      "Frontend: Next.js, Vite, React (SPA/SSR/ISR)",
      "Mobile: React Native & Flutter for iOS & Android",
      "Architecture, code reviews & performance optimization",
      "Design systems wired directly into engineering",
      "CI/CD pipelines, testing automation & observability",
    ],
    icon: Code2,
  },
  {
    id: "ai",
    label: "AI Automation & Personal Agents",
    tag: "LLMs · Agents · Workflows",
    description:
      "We plug AI into your tools and data to build automations, copilots and agents that actually move KPIs.",
    bullets: [
      "LLM integration into products (chat, copilots, assistants)",
      "RAG & semantic search over docs, tickets, CRM & logs",
      "Personal AI agents for sales, support, ops & internal tools",
      "End-to-end AI workflows (Zapier, n8n, custom orchestration)",
      "Email, Slack, CRM and backoffice automations",
      "Prompt, safety and evaluation loops to keep agents reliable",
    ],
    icon: Bot,
  },
  {
    id: "security",
    label: "Cyber Security",
    tag: "Offensive & Defensive",
    description:
      "Offensive and defensive security operations to keep your products, infra and data safe.",
    bullets: [
      "Penetration testing (apps, APIs, infra, networks)",
      "SOC services & continuous monitoring",
      "Blue Teaming: detection & response playbooks",
      "Red Teaming: realistic attack simulations",
      "Security hardening, policies & training",
    ],
    icon: ShieldHalf,
  },
  {
    id: "cloud",
    label: "Cloud & DevOps Solutions",
    tag: "Cloud · DevOps",
    description:
      "We design cloud-native architectures with DevOps baked in, so shipping is fast and reliable.",
    bullets: [
      "Cloud architecture (AWS, GCP, Azure or hybrid)",
      "Infrastructure as Code (IaC) & automation",
      "CI/CD pipelines, observability & logging",
      "Scalability, cost optimization & reliability",
      "Developer experience & platform engineering basics",
    ],
    icon: Cloud,
  },
  {
    id: "3d",
    label: "3D Websites & High-End Frontend",
    tag: "Immersive Experiences",
    description:
      "Cinematic web experiences that blend motion, 3D and micro-interactions without sacrificing performance.",
    bullets: [
      "3D experiences using Three.js & WebGL",
      "Smooth motion with GSAP, Lenis & Framer Motion",
      "Lottie animations & micro-interactions",
      "Landing pages, product demos & storytelling sites",
      "Performance-aware, SEO-friendly implementations",
    ],
    icon: Cuboid,
  },
];

type WhoCardDef = {
  id: string;
  title: string;
  subtitle?: string;
  body: string[];
  icon: React.ElementType;
};

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

const globeConfig = {
  pointSize: 4,
  globeColor: "#161617",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#161617",
  emissiveIntensity: 0.1,
  shininess: 0.15,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#d2d2d6",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

const colors = ["#e3a44b", "#e3a44b", "#e3a44b"];

const globeArcs = [
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 1,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -1.303396,
    endLng: 36.852443,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 3.139,
    endLng: 101.6869,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 2,
    startLat: -15.785493,
    startLng: -47.909029,
    endLat: 36.162809,
    endLng: -115.119411,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: -33.8688,
    startLng: 151.2093,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: 21.3099,
    startLng: -157.8581,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 3,
    startLat: -6.2088,
    startLng: 106.8456,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: 11.986597,
    startLng: 8.571831,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: -34.6037,
    startLng: -58.3816,
    endLat: 22.3193,
    endLng: 114.1694,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 4,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 14.5995,
    startLng: 120.9842,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 5,
    startLat: 34.0522,
    startLng: -118.2437,
    endLat: 48.8566,
    endLng: -2.3522,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: -15.432563,
    startLng: 28.315853,
    endLat: 1.094136,
    endLng: -63.34546,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: 37.5665,
    startLng: 126.978,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 6,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: -19.885592,
    startLng: -43.951191,
    endLat: -15.595412,
    endLng: -56.05918,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: 48.8566,
    startLng: -2.3522,
    endLat: 52.52,
    endLng: 13.405,
    arcAlt: 0.1,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 7,
    startLat: 52.52,
    startLng: 13.405,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: -8.833221,
    startLng: 13.264837,
    endLat: -33.936138,
    endLng: 18.436529,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: 49.2827,
    startLng: -123.1207,
    endLat: 52.3676,
    endLng: 4.9041,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 8,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: 40.7128,
    endLng: -74.006,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 51.5072,
    startLng: -0.1276,
    endLat: 34.0522,
    endLng: -118.2437,
    arcAlt: 0.2,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 22.3193,
    startLng: 114.1694,
    endLat: -22.9068,
    endLng: -43.1729,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 9,
    startLat: 1.3521,
    startLng: 103.8198,
    endLat: -34.6037,
    endLng: -58.3816,
    arcAlt: 0.5,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
  {
    order: 10,
    startLat: -22.9068,
    startLng: -43.1729,
    endLat: 28.6139,
    endLng: 77.209,
    arcAlt: 0.7,
    color: colors[Math.floor(Math.random() * (colors.length - 1))],
  },
];

const DevLayout: React.FC = () => {
  const lenis = useLenis();

  const layoutRef = useRef<HTMLElement | null>(null);
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

  // Preload the globe before user reaches the section
  useEffect(() => {
    (World as any)?.preload?.();
  }, []);

  useLayoutEffect(() => {
    if (!layoutRef.current) return;

    const ctx = gsap.context(() => {
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
      }

      // ========= HERO pinned =========
      if (heroScrollRef.current) {
        const tlHero = gsap.timeline({
          scrollTrigger: {
            trigger: heroScrollRef.current,
            start: "top top",
            end: "+=160%",
            scrub: 1.1,
            pin: true,
          },
        });

        gsap.set(".hero-overlay", { yPercent: 100 });
        gsap.set(".hero-word", { opacity: 0, scale: 0.75, y: 40 });

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

      // ========= OUR PROCESS – pinned =========
      if (pinnedSectionRef.current) {
        const section = pinnedSectionRef.current;
        const lineFill = section.querySelector(
          ".process-line-fill"
        ) as HTMLElement | null;
        const labels = gsap.utils.toArray<HTMLElement>(".process-step-label");
        const cards = gsap.utils.toArray<HTMLElement>(".process-card-inner");

        if (cards.length) {
          const totalSteps = cards.length;

          cards.forEach((card, index) => {
            gsap.set(card, {
              opacity: index === 0 ? 1 : 0,
              scale: index === 0 ? 1 : 0.9,
            });
          });

          if (lineFill) {
            gsap.set(lineFill, {
              scaleY: 0,
              transformOrigin: "top center",
            });
          }

          gsap.set(labels, { opacity: 0.45 });
          if (labels[0]) {
            gsap.set(labels[0], { opacity: 1 });
          }

          gsap.from(
            [
              "#process-kicker",
              "#process-title",
              "#process-sub",
              ".process-cards-window",
            ],
            {
              opacity: 0,
              y: 24,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
              },
            }
          );

          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "+=" + totalSteps * 160 + "%",
            scrub: 1.1,
            pin: true,
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
                : false,
            onUpdate: (self) => {
              const progress = self.progress;
              const activeIndex = Math.round(progress * (totalSteps - 1));

              cards.forEach((card, index) => {
                const isActive = index === activeIndex;
                gsap.to(card, {
                  opacity: isActive ? 1 : 0,
                  scale: isActive ? 1 : 0.9,
                  duration: 0.25,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              });

              if (lineFill) {
                gsap.to(lineFill, {
                  scaleY: progress,
                  duration: 0.2,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              }

              labels.forEach((label, index) => {
                gsap.to(label, {
                  opacity: index === activeIndex ? 1 : 0.45,
                  duration: 0.2,
                  ease: "power2.out",
                  overwrite: "auto",
                });
              });
            },
          });
        }
      }

      // ========= generic fades =========
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

      // ========= WHO WE ARE stack =========
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
          });
        });

        const tlWho = gsap.timeline({
          scrollTrigger: {
            trigger: whoSectionRef.current,
            start: "top top",
            end: "+=350%",
            scrub: 1.15,
            pin: true,
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
          const iconEl = card.querySelector(".who-icon") as HTMLElement | null;

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

      // ========= CREATIVITY vs TECHNICALITY =========
      if (creativityTechSectionRef.current) {
        const tlCT = gsap.timeline({
          scrollTrigger: {
            trigger: creativityTechSectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1.1,
            pin: true,
            anticipatePin: 1,
          },
        });

        gsap.set(".creativity-icon", {
          scale: 0.7,
          opacity: 0,
          x: -40,
          y: -40,
        });
        gsap.set(".technicality-icon", {
          scale: 0.7,
          opacity: 0,
          x: 40,
          y: 40,
        });
        gsap.set("#creativity-word", { opacity: 0, y: 40 });
        gsap.set("#technicality-word", { opacity: 0, y: -40 });

        tlCT
          .to(
            [".creativity-icon", ".technicality-icon"],
            {
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: "power3.out",
              stagger: 0.1,
            },
            0
          )
          .to(
            "#creativity-word",
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.3"
          )
          .to(
            "#technicality-word",
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5"
          );
      }

      // ========= WORLD – Global footprint (pinned text + globe shell) =========
      if (worldSectionRef.current) {
        const section = worldSectionRef.current;
        const globeShell = section.querySelector(
          ".world-globe-shell"
        ) as HTMLElement | null;

        gsap.set(["#world-kicker", "#world-title", "#world-copy"], {
          opacity: 0,
          y: 30,
        });
        gsap.set(".world-stat", { opacity: 0, y: 20 });

        if (globeShell) {
          gsap.set(globeShell, {
            opacity: 0,
            y: 80,
            scale: 0.85,
            rotateX: -10,
            rotateY: 18,
            transformStyle: "preserve-3d",
            transformOrigin: "50% 50%",
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
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            },
            0
          )
          .to(
            "#world-title",
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            0.05
          )
          .to(
            "#world-copy",
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
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

      // ========= SERVICES – horizontal deck =========
      const servicesSection = servicesHorizontalSectionRef.current;
      const servicesTrack = servicesTrackRef.current;

      if (servicesSection && servicesTrack) {
        const cards = gsap.utils.toArray<HTMLElement>(".service-card-h");

        const getScrollDistance = () =>
          Math.max(servicesTrack.scrollWidth - servicesSection.clientWidth, 0);

        const horizontalTween = gsap.to(servicesTrack, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: servicesSection,
            start: "top top",
            end: () => `+=${getScrollDistance() + window.innerWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

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
          });
          if (iconEl) {
            gsap.set(iconEl, { y: 20, opacity: 0, scale: 0.7 });
          }

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
              });
              if (iconEl) {
                gsap.to(iconEl, {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.6,
                  ease: "power2.out",
                });
              }
            },
            onLeaveBack: () => {
              gsap.to(card, {
                opacity: 0,
                y: 80,
                rotateY: 10 * direction,
                scale: 0.9,
                duration: 0.5,
                ease: "power2.in",
              });
              if (iconEl) {
                gsap.to(iconEl, {
                  y: 20,
                  opacity: 0,
                  scale: 0.7,
                  duration: 0.4,
                  ease: "power2.in",
                });
              }
            },
          });
        });

        const endCard = servicesSection.querySelector(
          ".services-end-card"
        ) as HTMLElement | null;

        if (endCard) {
          gsap.set(endCard, { opacity: 0, y: 60, scale: 0.95 });

          ScrollTrigger.create({
            trigger: endCard,
            containerAnimation: horizontalTween,
            start: "left 90%",
            end: "left 30%",
            onEnter: () => {
              gsap.to(endCard, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.9,
                ease: "power3.out",
              });
            },
          });
        }
      }

      // ========= Brand color circles pinned =========
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
          },
        });

        tlBrand.from("#brand-circles-heading", {
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power3.out",
        });

        circles.forEach((circle, index) => {
          tlBrand.from(
            circle,
            {
              opacity: 0,
              scale: 0.5,
              y: 40,
              filter: "blur(10px)",
              duration: 0.9,
              ease: "power3.out",
            },
            index === 0 ? "+=0.4" : "+=0.5"
          );
        });

        tlBrand.from(
          "#brand-quote",
          {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
          },
          "+=0.6"
        );

        gsap.to(".brand-circle", {
          scale: 1.04,
          repeat: -1,
          yoyo: true,
          duration: 2.5,
          ease: "sine.inOut",
          stagger: { each: 0.3, from: "center" },
        });
      }

      // ========= Giant A zoom =========
      if (giantASectionRef.current && giantARef.current) {
        const zoomTl = gsap.timeline({
          scrollTrigger: {
            trigger: giantASectionRef.current,
            start: "top top",
            end: "+=200%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
          },
        });

        zoomTl.fromTo(
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

      ScrollTrigger.refresh();
    }, layoutRef);

    return () => {
      ctx.revert();
    };
  }, [lenis]);

  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* Global radial gradient background (applies to all sections) */}
      <div
        className="
          pointer-events-none fixed inset-0 -z-10
          bg-[radial-gradient(circle_at_10%_0,rgba(15,23,42,0.08),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(15,23,42,0.12),transparent_55%)]
          dark:bg-[radial-gradient(circle_at_10%_0,rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(255,255,255,0.05),transparent_55%)]
        "
      />

      <main ref={layoutRef} className="relative">
        {/* Section 0 – Hero + ALGORIM overlay */}
        <HeroOverlay heroScrollRef={heroScrollRef} />

        {/* Section 0.5 – Intro / bridge */}
        <section className="fade-section relative min-h-[60vh] flex items-center justify-center">
          <div className="max-w-2xl px-6 text-center space-y-4 relative z-10">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
              Studio · Engineering · AI
            </p>
            <h2 className="text-3xl md:text-4xl font-semibold">
              We build brands, products and AI-powered platforms that feel
              premium end-to-end.
            </h2>
          </div>
        </section>

        {/* Section 1 – Pinned process */}
        <section
          ref={pinnedSectionRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="relative w-full max-w-5xl px-6 py-16 grid grid-cols-1 md:grid-cols-[0.55fr_0.65fr] gap-10 md:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <p
                  id="process-kicker"
                  className="text-[11px] uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400"
                >
                  Our process
                </p>
                <h2
                  id="process-title"
                  className="text-3xl md:text-4xl font-semibold leading-tight"
                >
                  A clear, engineered path from{" "}
                  <span className="text-foreground/90">idea</span> to{" "}
                  <span className="text-foreground/90">impact</span>.
                </h2>
                <p
                  id="process-sub"
                  className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 max-w-md"
                >
                  No chaos, no black box. Just a repeatable system that keeps
                  your team, stakeholders and roadmap aligned.
                </p>
              </div>

              <div className="hidden md:flex items-stretch gap-4">
                <div className="relative w-[3px] rounded-full bg-neutral-200 dark:bg-white/5 overflow-hidden">
                  <div className="process-line-fill absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-500 dark:from-white dark:via-white dark:to-white/60" />
                </div>
                <div className="flex flex-col justify-between py-1 text-xs space-y-4">
                  <span className="process-step-label text-neutral-500 dark:text-neutral-500">
                    01 · Discover
                  </span>
                  <span className="process-step-label text-neutral-500 dark:text-neutral-500">
                    02 · Design & Brand
                  </span>
                  <span className="process-step-label text-neutral-500 dark:text-neutral-500">
                    03 · Ship & Evolve
                  </span>
                </div>
              </div>
            </div>

            <div className="process-cards-window relative h-[420px] md:h-[360px] overflow-hidden">
              <div className="relative h-full">
                {cardsData.map((step, index) => (
                  <div
                    key={step.id}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Card className="process-card-inner w-full relative rounded-2xl border border-black/10 dark:border-white/12 bg-white/70 dark:bg-white/[0.03] backdrop-blur-lg px-5 py-5 md:px-6 md:py-6 shadow-[0_22px_70px_rgba(0,0,0,0.18)] dark:shadow-[0_22px_70px_rgba(0,0,0,0.85)] overflow-hidden">
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/50 opacity-60" />

                      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-white/25 bg-black/5 dark:bg-white/5 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-neutral-800 dark:text-neutral-100 mb-3">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-semibold">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {index === 0 && "Discover"}
                        {index === 1 && "Design & Brand"}
                        {index === 2 && "Ship & Iterate"}
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-700 dark:text-neutral-200 mt-2">
                        {step.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                        {index === 0 && (
                          <>
                            <span className="px-2 py-1 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                              Audit
                            </span>
                            <span className="px-2 py-1 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                              Strategy
                            </span>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <span className="px-2 py-1 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                              Systems
                            </span>
                            <span className="px-2 py-1 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                              Prototypes
                            </span>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <span className="px-2 py-1 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                              Launch
                            </span>
                            <span className="px-2 py-1 rounded-full border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5">
                              Feedback loop
                            </span>
                          </>
                        )}
                      </div>
                    </Card>
                  </div>
                ))}
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background via-background/90 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background via-background/90 to-transparent" />
            </div>
          </div>
        </section>

        {/* Section 2 – WHO WE ARE */}
        <section
          ref={whoSectionRef}
          className="relative min-h-screen overflow-hidden py-16 md:py-24"
        >
          <div className="relative max-w-6xl mx-auto px-6 h-full flex flex-col md:flex-row itemscenter gap-10">
            <div className="relative w-full md:w-1/2 h-[60vh] md:h-[70vh]">
              {whoCards.map((card, index) => {
                const Icon = card.icon;
                const number = String(index + 1).padStart(2, "0");

                return (
                  <Card
                    key={card.id}
                    className="who-card absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                               w-[88vw] sm:w-[70vw] md:w-[460px]
                               h-[60vh] md:h-[65vh]
                               bg-white text-black
                               border border-neutral-200 rounded-2xl
                               shadow-[0_22px_60px_rgba(0,0,0,0.18)]
                               overflow-hidden flex flex-col justify-between
                               will-change-transform"
                  >
                    <div className="pointer-events-none absolute top-5 left-6 select-none">
                      <span className="text-[52px] sm:text-[64px] md:text-[72px] font-extrabold tracking-tight text-neutral-200">
                        {number}
                      </span>
                    </div>

                    <div className="relative z-10 flex items-start justify-between px-6 pt-6">
                      <div className="mt-2">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                          {card.title}
                        </p>
                        {card.subtitle && (
                          <h3 className="text-lg md:text-xl font-semibold mt-1">
                            {card.subtitle}
                          </h3>
                        )}
                      </div>
                      <div className="who-icon flex h-9 w-9 items-center justify-center rounded-full border border-neutral-300 bg-white shadow-[0_0_18px_rgba(0,0,0,0.25)]">
                        <Icon className="h-5 w-5 text-black" />
                      </div>
                    </div>

                    <div className="relative z-10 px-6 pb-6 space-y-3 text-sm md:text-base text-neutral-800 mt-4">
                      {card.body.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>

            <div
              id="who-heading"
              className="w-full md:w-1/2 space-y-4 text-left md:text-right relative z-10"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                Who We Are
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold md:leading-tight max-w-xl md:ml-auto">
                Architects of the digital future.
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 max-w-md md:ml-auto">
                Scroll to watch each card slide from bottom-right to top-left,
                layering the story of Algorim step by step.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2.5 – Creativity & Technicality */}
        <section
          ref={creativityTechSectionRef}
          className="relative min-h-screen overflow-hidden"
        >
          <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-center relative z-10">
            <div className="relative w-full h-[70vh] md:h-[80vh]">
              <div className="creativity-icon absolute top-6 left-4 sm:top-10 sm:left-10 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/20 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.2)] dark:shadow-[0_0_40px_rgba(0,0,0,0.7)]">
                <Palette className="h-6 w-6 text-black dark:text-white" />
              </div>

              <div className="technicality-icon absolute bottom-6 right-4 sm:bottom-10 sm:right-10 flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/20 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.2)] dark:shadow-[0_0_40px_rgba(0,0,0,0.7)]">
                <Code2 className="h-6 w-6 text-black dark:text-white" />
              </div>

              <div className="absolute top-[18%] left-0 sm:left-[6%]">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2">
                  Creativity
                </p>
                <h2
                  id="creativity-word"
                  className="text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-emerald-400 via-sky-400 to-purple-400 bg-clip-text text-transparent"
                >
                  Creativity
                </h2>
                <p className="mt-3 max-w-sm text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                  The palette, motion and story that make Algorim feel like a
                  brand, not just a stack of features.
                </p>
              </div>

              <div className="absolute bottom-[16%] right-0 sm:right-[6%] text-right">
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2">
                  Technicality
                </p>
                <h2
                  id="technicality-word"
                  className="text-3xl sm:text-4xl md:text-5xl font-mono"
                >
                  <span className="text-neutral-500">&lt;</span>
                  technicality
                  <span className="text-neutral-500">/&gt;</span>
                </h2>
                <p className="mt-3 max-w-sm text-sm md:text-base text-neutral-600 dark:text-neutral-300 ml-auto">
                  The engineering, architecture and security that keep every
                  interaction fast, correct and safe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2.6 – Global footprint / Globe */}
        <section
          ref={worldSectionRef}
          className="relative min-h-screen overflow-hidden"
        >
          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col gap-12 z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-3 max-w-xl">
                <p
                  id="world-kicker"
                  className="text-[11px] uppercase tracking-[0.28em] text-sky-600/80 dark:text-sky-300/80"
                >
                  Global footprint
                </p>
                <h2
                  id="world-title"
                  className="text-4xl md:text-5xl font-semibold"
                >
                  We work internationally with{" "}
                  <span className="text-sky-700 dark:text-sky-200">
                    distributed teams
                  </span>
                  .
                </h2>
                <p
                  id="world-copy"
                  className="text-sm md:text-base text-neutral-600 dark:text-neutral-300"
                >
                  From Europe to the Middle East, North America and
                  Asia–Pacific, we plug directly into your stack and ship on
                  your timezone while keeping security, performance and brand
                  experience aligned.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 text-right text-xs md:text-sm">
                <div className="world-stat space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                    Time zones
                  </p>
                  <p className="text-2xl md:text-3xl font-semibold text-sky-700 dark:text-sky-300">
                    08+
                  </p>
                </div>
                <div className="world-stat space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                    Countries
                  </p>
                  <p className="text-2xl md:text-3xl font-semibold text-sky-600 dark:text-sky-100">
                    15
                  </p>
                </div>
                <div className="world-stat space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                    Continents
                  </p>
                  <p className="text-2xl md:text-3xl font-semibold">04</p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center mt-10">
              <div
                className="
    world-globe-shell
    relative
    h-full
    rounded-full

    overflow-hidden
  "
              >
                <World globeConfig={globeConfig} data={globeArcs} />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 – SERVICES (horizontal deck) */}
        <section
          id="services"
          ref={servicesHorizontalSectionRef}
          className="relative h-screen overflow-hidden py-16 md:py-20"
        >
          <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col z-10">
            <div
              id="services-heading"
              className="shrink-0 space-y-3 pt-2 md:pt-4"
            >
              <div className="flex flex-wrap gap-2 mb-1">
                <span className="services-pill text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                  Services
                </span>
                <span className="services-pill text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-500">
                  Branding · Product · AI · Cloud · Security
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold max-w-xl">
                A horizontal deck of capabilities. Scroll to move sideways.
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300 max-w-md">
                Every card is a fully managed unit you can plug into your
                company: brand, engineering, AI, security and cloud.
              </p>
            </div>

            <div className="relative flex-1 mt-10 md:mt-12">
              <div ref={servicesTrackRef} className="flex h-full items-stretch">
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Card
                      key={service.id}
                      className="service-card-h relative flex-shrink-0 h-full
                                 w-[80vw] sm:w-[65vw] md:w-[440px]
                                 mr-6
                                 overflow-hidden
                                 border border-black/10 dark:border-white/15 bg-white/80 dark:bg-white/[0.03] backdrop-blur-sm
                                 rounded-2xl p-6 md:p-7 shadow-[0_10px_40px_rgba(0,0,0,0.15)] dark:shadow-xl
                                 transition-transform duration-300
                                 hover:-translate-y-2 hover:scale-[1.02] hover:border-black/20 dark:hover:border-white/40 hover:bg-white dark:hover:bg-white/[0.06]"
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/40 opacity-60" />

                      <div className="flex h-full flex-col justify-between gap-4">
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                              {service.tag}
                            </span>
                            <div className="service-icon flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/25 bg-black/5 dark:bg-white/10 shadow-[0_0_22px_rgba(0,0,0,0.15)] dark:shadow-[0_0_22px_rgba(255,255,255,0.25)]">
                              <Icon className="h-5 w-5 text-black dark:text-white" />
                            </div>
                          </div>

                          <h3 className="text-xl md:text-2xl font-semibold">
                            {service.label}
                          </h3>
                          <p className="text-sm text-neutral-700 dark:text-neutral-100 mt-2">
                            {service.description}
                          </p>
                        </div>

                        <ul className="space-y-1.5 text-xs md:text-sm text-neutral-700 dark:text-neutral-200/90 mt-4">
                          {service.bullets.map((item, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="mt-1 h-[3px] w-[10px] rounded-full bg-neutral-400 dark:bg-neutral-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  );
                })}

                <Card
                  className="services-end-card relative flex-shrink-0 h-full
                             w-[80vw] sm:w-[65vw] md:w-[440px]
                             mr-6 last:mr-0
                             border border-black/10 dark:border-white/20 bg-white/90 dark:bg-white/[0.06] backdrop-blur-md
                             rounded-2xl p-6 md:p-7 shadow-[0_14px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.75)]
                             flex flex-col items-start justify-between"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/15 to-transparent dark:via-white/60 opacity-80" />
                  <div className="space-y-3">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-300">
                      End of the deck
                    </p>
                    <h3 className="text-2xl md:text-3xl font-semibold">
                      One continuous team, not six disconnected vendors.
                    </h3>
                    <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-100">
                      Brand, product, AI, security and cloud all come from a
                      single crew that ships on the same cadence as your team.
                    </p>
                  </div>
                  <p className="mt-6 text-xs md:text-sm uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    Scroll down to see how we color the Algorim universe.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3.5 – Brand color circles */}
        <section
          ref={brandCirclesSectionRef}
          className="relative min-h-screen overflow-hidden py-16 md:py-24"
        >
          <div className="max-w-5xl mx-auto px-6 h-full flex flex-col items-center justify-center gap-10 relative z-10">
            <div
              id="brand-circles-heading"
              className="text-center space-y-3 max-w-2xl"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                Color System
              </p>
              <h2 className="text-3xl md:text-4xl font-semibold">
                Every great brand starts with a disciplined color language.
              </h2>
              <p className="text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                Scroll to reveal the tones that power Algorim&apos;s visual
                voice.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:flex-wrap gap-8 md:gap-10 items-center justify-center">
              {brandColors.map((c) => (
                <div
                  key={c.id}
                  className="brand-circle-wrapper flex flex-col items-center gap-3"
                >
                  <div
                    className={`brand-circle h-28 w-28 sm:h-32 sm:w-32 rounded-full bg-gradient-to-tr ${c.gradientClass} shadow-[0_0_40px_rgba(255,255,255,0.15)]`}
                  />
                  <span className="text-xs uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
                    {c.label}
                  </span>
                  <span className="font-mono text-sm text-neutral-800 dark:text-neutral-200">
                    {c.hex}
                  </span>
                </div>
              ))}
            </div>

            <div
              id="brand-quote"
              className="max-w-xl text-center text-lg md:text-xl text-neutral-800 dark:text-neutral-100"
            >
              “Branding isn&apos;t just how you look. It&apos;s a repeatable
              pattern of choices that makes you unmistakable — even when the
              logo is nowhere on screen.”
            </div>
          </div>
        </section>

        {/* Section 4 – Giant “A” zoom */}
        <section
          ref={giantASectionRef}
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div
            ref={giantARef}
            className="font-black tracking-tight leading-none select-none relative z-10"
          >
            <span className="block font-[family-name:var(--font-revamped)] text-[22vw] md:text-[18vw] lg:text-[16vw]">
              A
            </span>
          </div>
        </section>

        {/* Section 5 – Outro */}
        <section className="fade-section relative min-h-screen flex items-center justify-center">
          <div className="max-w-3xl px-6 text-center space-y-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-semibold">
              Elite Engineering, AI & Security on Subscription.
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              Plug in a senior, cross-functional team that covers branding,
              product, AI automation, personal agents, security and cloud —{" "}
              instead of stitching five agencies together.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DevLayout;
