// DevLayout.tsx
"use client";

import React, {
  useLayoutEffect,
  useRef,
  useEffect,
  useCallback,
  useState,
} from "react";
import { useLenis } from "lenis/react";
import { Card } from "../card";
import dynamic from "next/dynamic";

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

const World = dynamic(() => import("../../ui/globe").then((m) => m.World), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-700" />
  ),
});

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

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type ContactItem = {
  country: string;
  phone: string;
};

const FOOTER_CONTACTS: ContactItem[] = [
  { country: "Andorra", phone: "+371 665 320" },
  { country: "United Arab Emirates", phone: "+971 50 697 5307" },
  { country: "Spain", phone: "+34 635 110 145" },
  { country: "Pakistan", phone: "+92 331 2051939" },
  { country: "United States", phone: "+1 707-657-5347" },
];

// Helper: keep tel: clean
const toTel = (phone: string) => phone.replace(/[^\d+]/g, "");

const FOOTER_LINKS: FooterColumn[] = [
  {
    title: "Services",
    links: [
      { label: "Branding", href: "#services" },
      { label: "Engineering", href: "#services" },
      { label: "AI Automation", href: "#services" },
      { label: "Cyber Security", href: "#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#who-heading" },
      { label: "Process", href: "#process-kicker" },
      { label: "Contact", href: "mailto:business@algorimsoft.com" },
    ],
  },
  {
    title: "Social",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/algorim-io",
        external: true,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/algorim.io",
        external: true,
      },
      // {
      //   label: "X / Twitter",
      //   href: "https://twitter.com/algorim",
      //   external: true,
      // },
      // { label: "GitHub", href: "https://github.com/algorim", external: true },
      // {
      //   label: "Dribbble",
      //   href: "https://dribbble.com/algorim",
      //   external: true,
      // },
    ],
  },
  // {
  //   title: "Legal",
  //   links: [
  //     { label: "Privacy", href: "/privacy" },
  //     { label: "Terms", href: "/terms" },
  //     { label: "Security", href: "/security" },
  //     { label: "Cookies", href: "/cookies" },
  //   ],
  // },
];

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
  const footerSectionRef = useRef<HTMLElement | null>(null);
  const portfolioSectionRef = useRef<HTMLElement | null>(null);

  const ctaSectionRef = useRef<HTMLElement | null>(null);

  const [activeProjectId, setActiveProjectId] = useState(PORTFOLIO[0]?.id);
  const activeProject =
    PORTFOLIO.find((p) => p.id === activeProjectId) ?? PORTFOLIO[0];

  useEffect(() => {
    (World as any)?.preload?.();
  }, []);

  const handleAnchorClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      external?: boolean
    ) => {
      if (external) return;
      if (!href.startsWith("#")) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (target && lenis) {
        lenis.scrollTo(target, { offset: -40 });
      }
    },
    [lenis]
  );

  useLayoutEffect(() => {
    if (!layoutRef.current) return;

    const ctx = gsap.context(() => {
      const mm: any = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        if (lenis) lenis.on("scroll", ScrollTrigger.update);

        // HERO pinned
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

        // OUR PROCESS pinned
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
                scale: index === 0 ? 1 : 0.94,
                y: index === 0 ? 0 : 18,
              });
            });

            if (lineFill) {
              gsap.set(lineFill, { scaleY: 0, transformOrigin: "top center" });
            }

            gsap.set(labels, { opacity: 0.4 });
            if (labels[0]) gsap.set(labels[0], { opacity: 1 });

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
                scrollTrigger: { trigger: section, start: "top 80%" },
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
                    scale: isActive ? 1 : 0.94,
                    y: isActive ? 0 : 18,
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
                    opacity: index === activeIndex ? 1 : 0.4,
                    duration: 0.2,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                });
              },
            });
          }
        }

        // Generic fades
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

        // WHO WE ARE stack
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

        // CREATIVITY vs TECHNICALITY (ORANGE — pinned cinematic)
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

          // initial states
          gsap.set(".ct-card", {
            opacity: 0,
            y: 40,
            scale: 0.98,
            filter: "blur(6px)",
          });
          gsap.set(".ct-divider", { scaleY: 0, transformOrigin: "top" });

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
            { opacity: 0, y: 18 }
          );

          gsap.set(".ct-icon-left", {
            opacity: 0,
            scale: 0.85,
            x: -10,
            y: -10,
          });
          gsap.set(".ct-icon-right", { opacity: 0, scale: 0.85, x: 10, y: 10 });

          gsap.set(".ct-glow-a", { x: -60, y: -40, scale: 0.9, opacity: 0.6 });
          gsap.set(".ct-glow-b", { x: 60, y: 40, scale: 0.9, opacity: 0.55 });

          tlCT
            // bring in the glass card
            .to(".ct-card", {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 1.0,
              ease: "power3.out",
            })
            // icons pop
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
            // left content
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
            // divider reveal
            .to(
              ".ct-divider",
              { scaleY: 1, duration: 0.7, ease: "power2.out" },
              "-=0.55"
            )
            // right content
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
            // cinematic “living” motion through the pinned scroll
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
            // micro parallax of icons
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

        // WORLD section
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

        // SERVICES horizontal
        const servicesSection = servicesHorizontalSectionRef.current;
        const servicesTrack = servicesTrackRef.current;

        if (servicesSection && servicesTrack) {
          const cards = gsap.utils.toArray<HTMLElement>(".service-card-h");

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
            if (iconEl) gsap.set(iconEl, { y: 20, opacity: 0, scale: 0.7 });

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
                if (iconEl)
                  gsap.to(iconEl, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: "power2.out",
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
                });
                if (iconEl)
                  gsap.to(iconEl, {
                    y: 20,
                    opacity: 0,
                    scale: 0.7,
                    duration: 0.4,
                    ease: "power2.in",
                  });
              },
            });
          });
        }
        // ======== CTA section (scroll reveal + sheen) ========
        if (ctaSectionRef.current) {
          const section = ctaSectionRef.current;

          gsap.set("[data-cta-card]", { y: 40, autoAlpha: 0, scale: 0.985 });
          gsap.set(
            [
              "[data-cta-kicker]",
              "[data-cta-title]",
              "[data-cta-subtitle]",
              "[data-cta-actions]",
            ],
            { y: 18, autoAlpha: 0 }
          );
          gsap.set("[data-cta-sheen]", { xPercent: -120, autoAlpha: 0 });
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
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.8,
                ease: "power3.out",
              },
              0.18
            )
            // sheen / scanner sweep while entering
            .to(
              "[data-cta-sheen]",
              {
                xPercent: 120,
                autoAlpha: 1,
                duration: 1.2,
                ease: "none",
              },
              0.1
            );

          // glow appears when in view (clean, premium)
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

        // ======== PORTFOLIO — Cyber Command Center (pinned) ========
        if (portfolioSectionRef.current) {
          const section = portfolioSectionRef.current;

          const items = gsap.utils.toArray<HTMLElement>(
            "[data-portfolio-item]"
          );
          const panels = gsap.utils.toArray<HTMLElement>(
            "[data-portfolio-panel]"
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

          // init
          gsap.set([items, panels], { willChange: "transform,opacity,filter" });
          gsap.set(panels, { autoAlpha: 0, y: 18, filter: "blur(6px)" });
          gsap.set(items, { autoAlpha: 0, x: -16 });

          if (scan) gsap.set(scan, { y: -80, autoAlpha: 0 });
          if (glow) gsap.set(glow, { autoAlpha: 0, scale: 0.92 });
          if (needle)
            gsap.set(needle, { scaleY: 0.1, transformOrigin: "top center" });

          const total = Math.max(1, panels.length);

          // helper: activate one case
          const activate = (activeIndex: number) => {
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

          // first active
          activate(0);

          // entrance
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

          const tl = gsap.timeline({
            scrollTrigger: {
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
                  : false,
              onUpdate: (self) => {
                const idx = Math.round(self.progress * (total - 1));
                activate(idx);

                // needle moves down with progress
                if (needle) {
                  gsap.to(needle, {
                    scaleY: 0.12 + self.progress * 0.88,
                    duration: 0.2,
                    ease: "power2.out",
                    overwrite: "auto",
                  });
                }

                // scanline pulses
                if (scan) {
                  gsap.to(scan, {
                    autoAlpha: 1,
                    y: -60 + self.progress * 260,
                    duration: 0.25,
                    ease: "none",
                    overwrite: "auto",
                  });
                }
              },
            },
          });

          if (glow) {
            tl.to(
              glow,
              { autoAlpha: 1, scale: 1, duration: 0.8, ease: "power3.out" },
              0
            );
          }

          // subtle radar rotation (independent)
          gsap.to(section.querySelectorAll(".portfolio-radar"), {
            rotate: 360,
            duration: 26,
            ease: "none",
            repeat: -1,
          });
        }

        // Brand circles (desktop only)
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

          // Aa — soft cinematic entrance
          tlBrand.from(".brand-aa", {
            opacity: 0,
            y: 24,
            scale: 0.96,
            filter: "blur(6px)",
            duration: 1,
            ease: "power3.out",
          });

          // Heading
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

          // Cards
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

          // Quote
          tlBrand.from(
            "#brand-quote",
            {
              opacity: 0,
              y: 30,
              duration: 0.9,
              ease: "power3.out",
            },
            "+=0.2"
          );

          // Subtle living system pulse (kept light)
          gsap.to(".brand-circle", {
            scale: 1.03,
            repeat: -1,
            yoyo: true,
            duration: 3,
            ease: "sine.inOut",
            stagger: { each: 0.4, from: "center" },
          });
        }

        // Giant A zoom
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

        // FOOTER pinned reveal
        if (footerSectionRef.current) {
          const section = footerSectionRef.current;

          gsap.set(
            [".footer-head", ".footer-cta", ".footer-grid", ".footer-bottom"],
            { opacity: 0, y: 26 }
          );
          gsap.set(".footer-glow", { opacity: 0, scale: 0.9, y: 40 });

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

        return () => {
          if (lenis) lenis.off("scroll", ScrollTrigger.update);
        };
      });
    }, layoutRef);

    return () => ctx.revert();
  }, [lenis]);

  return (
    <div className="relative min-h-screen bg-white text-black dark:bg-black dark:text-white">
      {/* GLOBAL ATMOSPHERE */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-400/15 blur-[150px]" />
        <div className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full bg-amber-300/10 blur-[170px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/5 dark:to-black/40" />
      </div>

      <main
        ref={layoutRef}
        className="relative font-[family-name:var(--font-redhat)]"
      >
        <HeroOverlay heroScrollRef={heroScrollRef} />

        {/* Intro */}
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

        {/* Process */}
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
                  <div className="process-line-fill absolute inset-0 bg-gradient-to-b from-orange-900 via-orange-900 to-orange-500 " />
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
                      <div className="pointer-events-none absolute inset-0 -z-10">
                        <div className="absolute -top-16 -left-16 h-40 w-40 rounded-full bg-orange-500/25 blur-3xl" />
                        <div className="absolute -bottom-20 -right-16 h-48 w-48 rounded-full bg-orange-400/20 blur-3xl" />
                      </div>

                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/50 opacity-60" />

                      <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-orange-600 dark:text-orange-300 mb-3 shadow-[0_0_18px_rgba(249,115,22,0.35)]">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-black text-[10px] font-semibold shadow-[0_0_12px_rgba(249,115,22,0.9)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        {index === 0 && "Discover"}
                        {index === 1 && "Design & Brand"}
                        {index === 2 && "Ship & Iterate"}
                      </div>

                      <h3 className="text-lg md:text-xl font-semibold text-orange-600 dark:text-orange-300 drop-shadow-[0_0_14px_rgba(249,115,22,0.6)]">
                        {step.title}
                      </h3>

                      <p className="text-sm text-neutral-700 dark:text-neutral-200 mt-2">
                        {step.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-neutral-500 dark:text-neutral-400">
                        {index === 0 && (
                          <>
                            <span className="px-2 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
                              Audit
                            </span>
                            <span className="px-2 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
                              Strategy
                            </span>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <span className="px-2 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
                              Systems
                            </span>
                            <span className="px-2 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
                              Prototypes
                            </span>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <span className="px-2 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
                              Launch
                            </span>
                            <span className="px-2 py-1 rounded-full border border-orange-500/30 bg-orange-500/10">
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

        {/* WHO WE ARE */}
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
                    className="
    who-card group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
    w-[88vw] sm:w-[70vw] md:w-[460px]
    h-[60vh] md:h-[65vh]
    overflow-hidden flex flex-col justify-between
    will-change-transform

    bg-white/70 text-black backdrop-blur-xl
    dark:bg-neutral-950/70 dark:text-white

    border border-black/10 dark:border-white/10
    shadow-[0_22px_60px_rgba(0,0,0,0.18)]
    dark:shadow-[0_22px_60px_rgba(0,0,0,0.85)]

    rounded-none
  "
                  >
                    {/* ===== cyber atmosphere + subtle grid ===== */}
                    <div className="pointer-events-none absolute inset-0 -z-10">
                      <div
                        className="absolute inset-0 opacity-[0.18] dark:opacity-[0.12]"
                        style={{
                          backgroundImage: `
          linear-gradient(to right, rgba(249,115,22,0.12) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(249,115,22,0.10) 1px, transparent 1px)
        `,
                          backgroundSize: "34px 34px",
                          maskImage:
                            "radial-gradient(circle at 30% 20%, black 0%, black 45%, transparent 75%)",
                          WebkitMaskImage:
                            "radial-gradient(circle at 30% 20%, black 0%, black 45%, transparent 75%)",
                        }}
                      />
                      <div className="absolute -top-28 -left-28 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
                      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/5 dark:to-black/35" />
                    </div>

                    {/* ===== sharp “arrow” frame (corners + notches) ===== */}
                    <div className="pointer-events-none absolute inset-0">
                      {/* top line */}
                      <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
                      {/* bottom line */}
                      <div className="absolute left-8 right-8 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />
                      {/* left line */}
                      <div className="absolute top-8 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />
                      {/* right line */}
                      <div className="absolute top-8 bottom-8 right-0 w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent" />

                      {/* corner arrows (L shapes) */}
                      <span className="absolute left-3 top-3 h-6 w-6 border-l border-t border-orange-500/40" />
                      <span className="absolute right-3 top-3 h-6 w-6 border-r border-t border-orange-500/35" />
                      <span className="absolute left-3 bottom-3 h-6 w-6 border-l border-b border-orange-500/30" />
                      <span className="absolute right-3 bottom-3 h-6 w-6 border-r border-b border-orange-500/30" />

                      {/* “arrow” notches */}
                      <span className="absolute left-0 top-10 h-0 w-0 border-y-[10px] border-y-transparent border-r-[12px] border-r-orange-500/20" />
                      <span className="absolute right-0 bottom-10 h-0 w-0 border-y-[10px] border-y-transparent border-l-[12px] border-l-orange-500/18" />
                    </div>

                    {/* ===== LARGE NUMBER (more cyber) ===== */}
                    <div className="pointer-events-none absolute top-5 left-6 select-none">
                      <span
                        className="
        text-[52px] sm:text-[64px] md:text-[72px]
        font-extrabold tracking-tight
        text-neutral-300/70 dark:text-neutral-800/80
      "
                      >
                        {number}
                      </span>
                    </div>

                    {/* ===== HEADER ===== */}
                    <div className="relative z-10 flex items-start justify-between px-6 pt-6">
                      <div className="mt-2">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500 dark:text-neutral-400">
                          {card.title}
                        </p>
                        {card.subtitle && (
                          <h3 className="text-lg md:text-xl font-semibold mt-1 text-neutral-900 dark:text-neutral-100">
                            {card.subtitle}
                          </h3>
                        )}
                        {/* tiny status chip */}
                        <div className="mt-3 inline-flex items-center gap-2 rounded-none border border-orange-500/25 bg-orange-500/10 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-orange-600 dark:text-orange-300">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.7)]" />
                          classified brief
                        </div>
                      </div>

                      {/* ICON (square + sharp) */}
                      <div
                        className="
        who-icon flex h-10 w-10 items-center justify-center
        rounded-none
        border border-orange-500/25
        bg-orange-500/10
        shadow-[0_0_22px_rgba(249,115,22,0.25)]
        transition-transform duration-300
        group-hover:scale-[1.06]
      "
                      >
                        <Icon className="h-5 w-5 text-orange-500 drop-shadow-[0_0_10px_rgba(249,115,22,0.85)]" />
                      </div>
                    </div>

                    {/* ===== BODY ===== */}
                    <div className="relative z-10 px-6 pb-6 space-y-3 text-sm md:text-base text-neutral-800 dark:text-neutral-200 mt-4">
                      {card.body.map((paragraph, idx) => (
                        <p key={idx} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* ===== bottom “arrow” action hint ===== */}
                    <div className="pointer-events-none absolute bottom-0 left-0 right-0">
                      <div className="mx-6 mb-5 flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-500">
                        <span>scroll to decrypt</span>
                        <span className="text-orange-500/70">⟶</span>
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

        {/* Creativity & Technicality (ORANGE) */}
        {/* Creativity & Technicality (ORANGE) */}
        <section
          ref={creativityTechSectionRef}
          className="relative min-h-screen overflow-hidden"
        >
          {/* atmosphere */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-400/18 blur-[150px]" />
            <div className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full bg-amber-300/14 blur-[170px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/35 dark:to-black/70" />
          </div>

          <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-center relative z-10">
            <div className="ct-shell relative w-full h-[72vh] md:h-[80vh]">
              {/* MAIN GLASS CARD */}
              <div
                className="
          ct-card relative w-full h-full
          rounded-[36px]
          border border-white/10
          bg-white/[0.05]
          backdrop-blur-2xl
          shadow-[0_30px_110px_rgba(0,0,0,0.65)]
          overflow-hidden

          flex flex-col md:flex-row
        "
              >
                {/* inner grid */}
                <div
                  className="
            pointer-events-none absolute inset-0 opacity-[0.14]
            [background-image:
              linear-gradient(to_right,rgba(249,115,22,0.18)_1px,transparent_1px),
              linear-gradient(to_bottom,rgba(249,115,22,0.14)_1px,transparent_1px)]
            [background-size:46px_46px]
          "
                />

                {/* warm glows */}
                <div className="ct-glow-a pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-orange-400/18 blur-[140px]" />
                <div className="ct-glow-b pointer-events-none absolute -right-48 -bottom-48 h-[620px] w-[620px] rounded-full bg-amber-300/14 blur-[170px]" />

                {/* divider (vertical on desktop, horizontal on mobile) */}
                <div className="ct-divider pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-white/10 md:top-0 md:bottom-0 md:left-1/2 md:right-auto md:h-auto md:w-px" />

                {/* LEFT */}
                <div className="ct-left relative w-full md:w-1/2 p-7 sm:p-9 md:p-12 flex flex-col justify-center">
                  <div
                    className="
              ct-icon-left absolute top-6 left-6 sm:top-8 sm:left-8
              h-12 w-12 sm:h-14 sm:w-14 rounded-2xl
              bg-black/35 border border-orange-400/25
              backdrop-blur-xl
              shadow-[0_0_18px_rgba(249,115,22,0.55),0_0_42px_rgba(249,115,22,0.18)]
              flex items-center justify-center
            "
                  >
                    <Palette className="h-6 w-6 sm:h-7 sm:w-7 text-orange-300 drop-shadow-[0_0_12px_rgba(249,115,22,0.9)]" />
                  </div>

                  <p className="ct-kicker-left text-[11px] uppercase tracking-[0.35em] text-white/60">
                    Creativity
                  </p>

                  <h2
                    className="
              ct-title-left mt-3
              text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight
              text-transparent bg-clip-text
              bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400
              drop-shadow-[0_0_24px_rgba(249,115,22,0.45)]
            "
                  >
                    Creativity
                  </h2>

                  <p className="ct-copy-left mt-4 sm:mt-5 max-w-md text-sm md:text-base text-white/75 leading-relaxed">
                    The palette, motion and story that make Algorim feel like a
                    brand — not just a stack of features.
                  </p>

                  <div className="ct-chip-left mt-6 sm:mt-7 inline-flex w-fit items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_14px_rgba(249,115,22,0.75)]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-orange-200/90">
                      Craft / Motion / Voice
                    </span>
                  </div>
                </div>

                {/* RIGHT (TECHNICALITY) */}
                <div className="ct-right relative w-full md:w-1/2 p-7 sm:p-9 md:p-12 flex flex-col justify-center md:text-right">
                  <div
                    className="
              ct-icon-right absolute bottom-6 right-6 sm:bottom-8 sm:right-8
              h-12 w-12 sm:h-14 sm:w-14 rounded-2xl
              bg-black/35 border border-orange-400/25
              backdrop-blur-xl
              shadow-[0_0_18px_rgba(249,115,22,0.55),0_0_42px_rgba(249,115,22,0.18)]
              flex items-center justify-center
            "
                  >
                    <Code2 className="h-6 w-6 sm:h-7 sm:w-7 text-orange-200 drop-shadow-[0_0_12px_rgba(249,115,22,0.95)]" />
                  </div>

                  <p className="ct-kicker-right text-[11px] uppercase tracking-[0.35em] text-white/55">
                    Technicality
                  </p>

                  <h2
                    className="
              ct-title-right mt-3
              text-3xl sm:text-4xl md:text-5xl font-mono font-semibold tracking-tight
              text-transparent bg-clip-text
              bg-gradient-to-r from-orange-200 via-amber-200 to-orange-300
              drop-shadow-[0_0_22px_rgba(249,115,22,0.45)]
            "
                  >
                    <span className="text-orange-200 drop-shadow-[0_0_14px_rgba(249,115,22,0.9)]">
                      &lt;
                    </span>
                    <span className="mx-1 text-orange-300 drop-shadow-[0_0_26px_rgba(249,115,22,0.8)]">
                      Technicality
                    </span>
                    <span className="text-orange-200 drop-shadow-[0_0_14px_rgba(249,115,22,0.9)]">
                      /&gt;
                    </span>
                  </h2>

                  <p className="ct-copy-right mt-4 sm:mt-5 md:ml-auto max-w-md text-sm md:text-base text-white/75 leading-relaxed">
                    The engineering, architecture and security that keep every
                    interaction fast, correct and safe.
                  </p>

                  <div className="ct-chip-right mt-6 sm:mt-7 md:ml-auto inline-flex w-fit items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-4 py-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.7)]" />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-orange-200/90">
                      Perf / Security / Scale
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Globe */}
        <section
          ref={worldSectionRef}
          className="relative min-h-screen overflow-hidden"
        >
          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24 flex flex-col gap-12 z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
              <div className="space-y-3 max-w-xl">
                <p
                  id="world-kicker"
                  className="text-[11px] uppercase tracking-[0.28em] text-orange-500/80 drop-shadow-[0_0_10px_rgba(249,115,22,0.45)]"
                >
                  Global footprint
                </p>

                <h2
                  id="world-title"
                  className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 drop-shadow-[0_0_22px_rgba(249,115,22,0.55)]"
                >
                  We work internationally with{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 drop-shadow-[0_0_28px_rgba(249,115,22,0.75)]">
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
                  <p className="text-2xl md:text-3xl font-semibold text-orange-400 drop-shadow-[0_0_16px_rgba(249,115,22,0.65)]">
                    08+
                  </p>
                </div>

                <div className="world-stat space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                    Countries
                  </p>
                  <p className="text-2xl md:text-3xl font-semibold text-orange-300 drop-shadow-[0_0_14px_rgba(249,115,22,0.55)]">
                    15
                  </p>
                </div>

                <div className="world-stat space-y-1">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                    Continents
                  </p>
                  <p className="text-2xl md:text-3xl font-semibold text-orange-200 drop-shadow-[0_0_12px_rgba(249,115,22,0.45)]">
                    04
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center mt-10">
              <div className="world-globe-shell overflow-hidden">
                <World globeConfig={globeConfig} data={globeArcs} />
              </div>
            </div>
          </div>
        </section>
        {/* CTA */}
        <section
          ref={ctaSectionRef}
          className="relative py-24 md:py-32 bg-neutral-950 overflow-hidden"
        >
          {/* ambient */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_55%)] blur-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.06),transparent_40%)]" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6">
            <div
              data-cta-card
              className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/55 backdrop-blur-xl"
            >
              {/* glow layer */}
              <div
                data-cta-glow
                className="pointer-events-none absolute inset-0 opacity-0"
              >
                <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_30%_20%,rgba(255,255,255,0.10),transparent_40%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_70%_60%,rgba(255,255,255,0.06),transparent_45%)]" />
              </div>

              {/* sheen / scanner */}
              <div
                data-cta-sheen
                className="pointer-events-none absolute -inset-y-10 -left-1/2 w-1/2 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] blur-sm opacity-0"
              />

              <div className="relative p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                  <div className="max-w-2xl">
                    <div
                      data-cta-kicker
                      className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-neutral-400"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-400/70" />
                      Secure · Ship · Scale
                    </div>

                    <h3
                      data-cta-title
                      className="mt-4 text-3xl md:text-4xl font-semibold text-neutral-50"
                    >
                      Ready to ship something premium?
                    </h3>

                    <p
                      data-cta-subtitle
                      className="mt-3 text-sm md:text-base text-neutral-300"
                    >
                      Book a quick call and we’ll map your roadmap, stack, and
                      risk surface — then propose a clean execution plan.
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
                      className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium text-neutral-950 bg-neutral-50 hover:bg-white transition"
                    >
                      Book a Call
                    </a>

                    <a
                      href="#services"
                      className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium text-neutral-50 border border-neutral-700 hover:border-neutral-500 bg-neutral-950/30 hover:bg-neutral-950/40 transition"
                    >
                      See Services
                    </a>
                  </div>
                </div>

                {/* micro-trust row */}
                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-neutral-400">
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 px-4 py-3">
                    Response in <span className="text-neutral-200">24h</span>
                  </div>
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 px-4 py-3">
                    Fixed-scope or{" "}
                    <span className="text-neutral-200">retainer</span>
                  </div>
                  <div className="rounded-2xl border border-neutral-800 bg-neutral-950/30 px-4 py-3">
                    Reports built for{" "}
                    <span className="text-neutral-200">execs</span>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-500/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* Services */}
        <section
          id="services"
          ref={servicesHorizontalSectionRef}
          className="relative min-h-[80vh] md:h-screen overflow-hidden "
        >
          <div className="relative h-full max-w-6xl mx-auto px-6 flex flex-col z-10 overflow-r-hidden">
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

            <div className="relative flex-1 mt-10 md:mt-12 flex items-center">
              <div
                ref={servicesTrackRef}
                className="flex items-stretch gap-4 md:gap-6 h-auto md:h-[420px] overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scroll-pl-6 pr-6 pb-2"
              >
                {services.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Card
                      key={service.id}
                      className="
                        service-card-h relative flex-shrink-0
                        w-[80vw] sm:w-[65vw] md:w-[440px]
                        mr-2 md:mr-6
                        rounded-xl p-6 md:p-7
                        snap-start overflow-hidden
                        border border-black/10 dark:border-white/10
                        bg-white/70 dark:bg-white/[0.03]
                        backdrop-blur-xl
                        shadow-[0_18px_60px_rgba(0,0,0,0.10)]
                        dark:shadow-[0_18px_70px_rgba(0,0,0,0.70)]
                        transition-all duration-300 ease-out
                        hover:-translate-y-2 hover:scale-[1.02]
                        hover:border-black/20 dark:hover:border-white/20
                      "
                    >
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/20" />
                      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl opacity-70" />
                      <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-orange-300/10 blur-3xl opacity-60" />

                      <div className="relative flex h-full flex-col justify-between gap-4 z-10">
                        <div>
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                              {service.tag}
                            </span>

                            <div className="service-icon flex h-10 w-10 items-center justify-center rounded-2xl border border-orange-500/25 bg-orange-500/10 shadow-[0_0_22px_rgba(249,115,22,0.35)] dark:shadow-[0_0_26px_rgba(249,115,22,0.55)]">
                              <Icon className="h-5 w-5 text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.85)]" />
                            </div>
                          </div>

                          <h3 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 drop-shadow-[0_0_16px_rgba(249,115,22,0.55)]">
                            {service.label}
                          </h3>

                          <p className="text-sm text-neutral-700 dark:text-neutral-200 mt-2">
                            {service.description}
                          </p>
                        </div>

                        <ul className="space-y-1.5 text-xs md:text-sm text-neutral-700 dark:text-neutral-200/90 mt-4">
                          {service.bullets.map((item, idx) => (
                            <li key={idx} className="flex gap-2 items-start">
                              <span className="mt-1 h-[4px] w-[14px] rounded-full bg-neutral-300 dark:bg-white/20" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Card>
                  );
                })}

                <div className="w-[80vw] sm:w-[65vw] md:w-[440px]" />
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio — Cyber Command Center */}
        <section
          id="portfolio"
          ref={portfolioSectionRef}
          className="relative min-h-screen overflow-hidden"
        >
          {/* orange cyber atmosphere */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-400/18 blur-[150px]" />
            <div className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full bg-amber-300/14 blur-[170px]" />

            {/* cyber grid */}
            <div
              className="absolute inset-0 opacity-[0.35]
        [background-image:
          linear-gradient(to_right,rgba(249,115,22,0.12)_1px,transparent_1px),
          linear-gradient(to_bottom,rgba(249,115,22,0.12)_1px,transparent_1px)]
        [background-size:40px_40px]"
            />

            {/* vignette */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/30 dark:to-black/65" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 md:pt-24 md:pb-20 z-10">
            <div className="space-y-3 max-w-2xl">
              <p className="portfolio-kicker text-[11px] uppercase tracking-[0.28em] text-orange-500/80 drop-shadow-[0_0_12px_rgba(249,115,22,0.45)]">
                Portfolio / Case Files
              </p>

              <h2 className="portfolio-title text-4xl md:text-5xl font-semibold leading-tight">
                Proof of work —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 drop-shadow-[0_0_22px_rgba(249,115,22,0.55)]">
                  built to ship
                </span>
                .
              </h2>

              <p className="portfolio-sub text-sm md:text-base text-neutral-600 dark:text-neutral-300">
                Scroll to browse each case file. The panel updates like a
                command console—clean, fast, and intentional.
              </p>
            </div>

            {/* command center */}
            <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-[0.44fr_0.56fr] gap-6 md:gap-8 items-stretch">
              {/* LEFT: index */}
              <div
                className="
          relative overflow-hidden rounded-3xl
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-white/[0.03]
          backdrop-blur-xl
          shadow-[0_18px_60px_rgba(0,0,0,0.10)]
          dark:shadow-[0_18px_70px_rgba(0,0,0,0.70)]
        "
              >
                {/* inner glow */}
                <div className="portfolio-glow pointer-events-none absolute -inset-20 -z-10 rounded-full bg-orange-400/10 blur-[120px]" />

                {/* radar rings */}
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.55]">
                  <div className="portfolio-radar absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/15" />
                  <div className="portfolio-radar absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/12" />
                  <div className="portfolio-radar absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-400/10" />
                </div>

                <div className="relative p-6 md:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                      Index
                    </p>
                    <span className="text-[10px] uppercase tracking-[0.22em] text-orange-400/90">
                      scroll-controlled
                    </span>
                  </div>

                  <div className="mt-5 space-y-2">
                    {PORTFOLIO.map((p, i) => (
                      <div
                        key={p.id}
                        data-portfolio-item
                        className="
                  group relative
                  rounded-2xl px-4 py-3
                  border border-black/10 dark:border-white/10
                  bg-white/50 dark:bg-white/[0.02]
                  backdrop-blur-md
                  transition-colors
                "
                      >
                        {/* active glow */}
                        <div
                          className="
                    pointer-events-none absolute inset-0 rounded-2xl opacity-0
                    group-[&[data-active='true']]:opacity-100
                    transition-opacity
                    bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/10
                  "
                        />

                        <div className="relative flex items-start justify-between gap-4">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-500 dark:text-neutral-400">
                              {p.id} · {p.year}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-neutral-900 dark:text-neutral-50">
                              {p.title}
                            </p>
                            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
                              {p.subtitle}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span
                              className={`
                        text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full
                        border
                        ${
                          p.status === "SOON"
                            ? "border-orange-500/40 bg-orange-500/15 text-orange-300 shadow-[0_0_18px_rgba(249,115,22,0.35)]"
                            : "border-amber-400/30 bg-amber-400/10 text-amber-400"
                        }
                      `}
                            >
                              {p.status === "SOON" ? "SOON" : "LIVE"}
                            </span>

                            <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
                              #{String(i + 1).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* vertical “needle” */}
                  <div className="pointer-events-none absolute right-4 top-6 bottom-6 w-[2px] rounded-full bg-orange-400/15 overflow-hidden">
                    <div className="portfolio-needle absolute inset-0 bg-gradient-to-b from-orange-400 via-amber-300 to-orange-500" />
                  </div>
                </div>
              </div>

              {/* RIGHT: active case file */}
              <div
                className="
          relative overflow-hidden rounded-3xl
          border border-black/10 dark:border-white/10
          bg-white/70 dark:bg-white/[0.03]
          backdrop-blur-xl
          shadow-[0_18px_60px_rgba(0,0,0,0.10)]
          dark:shadow-[0_18px_70px_rgba(0,0,0,0.70)]
        "
              >
                {/* scanline */}
                <div className="portfolio-scan pointer-events-none absolute left-0 right-0 top-[-60px] h-10 opacity-0 bg-gradient-to-r from-transparent via-orange-400/35 to-transparent blur-md" />

                {/* panel glow */}
                <div className="pointer-events-none absolute -top-28 -right-28 h-72 w-72 rounded-full bg-orange-400/14 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-amber-300/12 blur-3xl" />

                <div className="relative p-6 md:p-7 h-full">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                      Active Case File
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-orange-400/80">
                      verified output
                    </p>
                  </div>

                  <div className="mt-5 relative min-h-[360px] md:min-h-[420px]">
                    {PORTFOLIO.map((p) => (
                      <div
                        key={p.id}
                        data-portfolio-panel
                        className="absolute inset-0"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="space-y-2">
                            <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-500 dark:text-neutral-400">
                              {p.id} · {p.year}
                            </p>

                            <h3 className="text-2xl md:text-3xl font-semibold leading-tight">
                              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 drop-shadow-[0_0_18px_rgba(249,115,22,0.45)]">
                                {p.title}
                              </span>
                            </h3>

                            <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-200 max-w-xl">
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
                        bg-black text-white dark:bg-white dark:text-black
                        shadow-[0_18px_60px_rgba(0,0,0,0.22)]
                        hover:scale-[1.02] active:scale-[0.98]
                        transition-transform
                      "
                            >
                              Visit ↗
                            </a>
                          ) : (
                            <div className="text-[10px] uppercase tracking-[0.22em] px-3 py-2 rounded-2xl border border-orange-500/30 bg-orange-500/10 text-orange-300">
                              Internal
                            </div>
                          )}
                        </div>

                        <div className="mt-5 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full border border-orange-500/25 bg-orange-500/10 text-neutral-700 dark:text-neutral-200"
                            >
                              {t}
                            </span>
                          ))}
                        </div>

                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {p.results.map((r, idx) => (
                            <div
                              key={idx}
                              className="
                        rounded-2xl p-4
                        border border-black/10 dark:border-white/10
                        bg-white/50 dark:bg-white/[0.02]
                        backdrop-blur-md
                      "
                            >
                              <div className="flex items-start gap-3">
                                <span className="mt-2 h-[4px] w-[14px] rounded-full bg-orange-400/75 shadow-[0_0_16px_rgba(249,115,22,0.6)]" />
                                <p className="text-sm text-neutral-700 dark:text-neutral-200">
                                  {r}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {p.status === "SOON" && (
                          <div className="mt-6 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4">
                            <p className="text-[11px] uppercase tracking-[0.26em] text-orange-300">
                              Launch notice
                            </p>
                            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-200">
                              We’re launching our own product soon. If you want
                              early access, hit the footer email and we’ll
                              whitelist you.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* bottom console hint */}
                  <div className="mt-6 pt-5 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                    <span className="font-mono">SCROLL: NEXT_CASE</span>
                    <span className="font-mono">STATUS: OK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand circles */}
        <section
          ref={brandCirclesSectionRef}
          className="relative min-h-screen overflow-hidden "
        >
          {/* ORANGE GLASS ATMOSPHERE (lighter DOM, fewer layers) */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-48 -left-48 h-[620px] w-[620px] rounded-full bg-orange-400/18 blur-[160px]" />
            <div className="absolute top-1/3 -right-52 h-[680px] w-[680px] rounded-full bg-amber-300/14 blur-[180px]" />
            <div className="absolute -bottom-56 left-1/2 -translate-x-1/2 h-[720px] w-[720px] rounded-full bg-orange-500/10 blur-[190px]" />

            <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/60 to-white/80 dark:from-black/55 dark:via-black/35 dark:to-black/65" />
            <div
              className="
        absolute inset-0 opacity-[0.18] dark:opacity-[0.12]
        [background-image:
          linear-gradient(to_right,rgba(249,115,22,0.16)_1px,transparent_1px),
          linear-gradient(to_bottom,rgba(249,115,22,0.14)_1px,transparent_1px)]
        [background-size:44px_44px]
      "
            />
          </div>
          <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col items-center gap-12 relative z-10">
            <div
              id="brand-circles-heading"
              className="text-center space-y-3 max-w-2xl"
            >
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-600 dark:text-neutral-400">
                Color System
              </p>

              <h2 className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 drop-shadow-[0_0_20px_rgba(249,115,22,0.45)]">
                Every great brand starts with disciplined color language.
              </h2>

              <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                Tap a tile to copy the HEX. On desktop, scroll reveals the
                system.
              </p>
            </div>
            <div
              className="
    pointer-events-none absolute inset-0 flex items-center justify-center
    text-[40vw] md:text-[28vw]
    font-black leading-none
    text-orange-400/[0.03] dark:text-orange-400/[0.40]
    select-none -z-10
  "
            >
              Aa
            </div>

            {/* Optimized grid: fewer nested layers, clear hit-targets */}
            <div
              className="
    w-full
    grid
    grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
    gap-6 md:gap-8
    max-w-6xl
  "
            >
              {brandColors.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className="
            brand-circle-wrapper group relative overflow-hidden text-left
            rounded-3xl
            border border-black/10 dark:border-white/10
            bg-white/55 dark:bg-white/[0.035]
            backdrop-blur-xl
            shadow-[0_18px_70px_rgba(0,0,0,0.10)]
            dark:shadow-[0_18px_70px_rgba(0,0,0,0.70)]
            transition-transform duration-300
            hover:-translate-y-1
            focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/40
          "
                  aria-label={`Copy ${c.label} ${c.hex}`}
                  onClick={() => navigator.clipboard?.writeText(c.hex)}
                >
                  {/* subtle top hairline */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/25 to-transparent" />

                  {/* tile halo */}
                  <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-orange-400/12 blur-3xl opacity-80" />
                  <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl opacity-70" />

                  <div className="relative z-10 p-5 md:p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-600 dark:text-neutral-400">
                          {c.label}
                        </p>
                        <p className="font-mono text-sm text-neutral-900 dark:text-neutral-100">
                          {c.hex}
                        </p>
                      </div>

                      <span className="text-[10px] uppercase tracking-[0.22em] text-orange-500/80">
                        copy ↗
                      </span>
                    </div>

                    {/* Color plate */}
                    <div
                      className="
                brand-circle relative mt-4 h-40 rounded-2xl overflow-hidden
                border border-black/10 dark:border-white/10
                shadow-[0_14px_50px_rgba(0,0,0,0.12)]
                dark:shadow-[0_14px_60px_rgba(0,0,0,0.55)]
              "
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-tr ${c.gradientClass}`}
                      />
                      <div
                        className="
                  pointer-events-none absolute inset-0 opacity-30 dark:opacity-20
                  [background-image:linear-gradient(to_bottom,rgba(0,0,0,0.12)_1px,transparent_1px)]
                  [background-size:100%_12px]
                "
                      />
                    </div>

                    {/* micro footer */}
                    <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.26em] text-neutral-600 dark:text-neutral-400">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-400/80 shadow-[0_0_14px_rgba(249,115,22,0.6)]" />
                        token
                      </span>
                      <span className="font-mono">{c.id}</span>
                    </div>
                  </div>

                  {/* hover ring */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity ring-1 ring-orange-400/20" />
                </button>
              ))}
            </div>

            <div
              id="brand-quote"
              className="max-w-2xl text-center text-base md:text-lg text-neutral-800 dark:text-neutral-100"
            >
              “Branding isn&apos;t just how you look. It&apos;s a repeatable
              pattern of choices that makes you unmistakable — even when the
              logo is nowhere on screen.”
            </div>
          </div>
        </section>

        {/* Giant A */}
        <section
          ref={giantASectionRef}
          className="relative min-h-screen flex bg-black items-center justify-center overflow-hidden"
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

        {/* Outro */}
        <section className="fade-section relative min-h-screen flex items-center justify-center">
          <div className="max-w-3xl px-6 text-center space-y-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-semibold">
              Elite Engineering, AI & Security on Subscription.
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              Plug in a senior, cross-functional team that covers branding,
              product, AI automation, personal agents, security and cloud —
              instead of stitching five agencies together.
            </p>
          </div>
        </section>

        {/* Footer */}
        <section
          ref={footerSectionRef}
          className="relative min-h-[90vh] md:min-h-screen overflow-hidden"
        >
          {/* <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-orange-400/15 blur-[150px]" />
            <div className="absolute -bottom-52 -right-52 h-[620px] w-[620px] rounded-full bg-amber-300/10 blur-[170px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/0 to-black/5 dark:to-black/40" />
          </div> */}

          <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-14 md:pt-24 md:pb-16 h-full flex flex-col justify-between">
            <div className="footer-inner space-y-10">
              <div className="footer-head space-y-3">
                <p className="text-[11px] uppercase tracking-[0.28em] text-neutral-500 dark:text-neutral-400">
                  Let’s build something dangerous (in a good way)
                </p>

                <h2 className="footer-title text-4xl md:text-5xl font-semibold leading-tight">
                  Ready to ship a{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400 drop-shadow-[0_0_22px_rgba(249,115,22,0.55)]">
                    premium
                  </span>{" "}
                  product?
                </h2>

                <p className="footer-sub text-sm md:text-base text-neutral-600 dark:text-neutral-300 max-w-2xl">
                  Brand, engineering, AI, security and cloud — one team, one
                  system, one delivery standard.
                </p>
              </div>

              <div className="footer-cta flex flex-col sm:flex-row gap-3 sm:items-center">
                <a
                  href="https://meet.brevo.com/algorim-consultation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center
                    rounded-2xl px-5 py-3 text-sm font-semibold
                    bg-black text-white dark:bg-white dark:text-black
                    shadow-[0_18px_60px_rgba(0,0,0,0.22)]
                    hover:scale-[1.02] active:scale-[0.98]
                    transition-transform
                  "
                >
                  Book a call
                </a>

                <a
                  href="mailto:business@algorimsoft.com"
                  className="
                    inline-flex items-center justify-center
                    rounded-2xl px-5 py-3 text-sm font-semibold
                    border border-black/10 dark:border-white/12
                    bg-white/60 dark:bg-white/[0.03]
                    backdrop-blur-xl
                    hover:border-black/20 dark:hover:border-white/20
                    transition-colors
                  "
                >
                  business@algorimsoft.com
                </a>
              </div>
              {/* CONTACT */}
              <div className="footer-contact space-y-4 pt-4">
                <p className="text-xs uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                  Contact
                </p>

                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {FOOTER_CONTACTS.map((c) => (
                    <li
                      key={c.country}
                      className="
          group flex items-center justify-between gap-3
          rounded-2xl
          border border-black/10 dark:border-white/10
          bg-white/55 dark:bg-white/[0.03]
          backdrop-blur-xl
          px-4 py-3
          transition-all
          hover:border-black/20 dark:hover:border-white/20
          hover:-translate-y-[1px]
        "
                    >
                      <span className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                        {c.country}
                      </span>

                      <a
                        href={`tel:${toTel(c.phone)}`}
                        className="
            font-mono text-sm
            text-neutral-900 dark:text-neutral-100
            inline-flex items-center gap-2
            opacity-90 group-hover:opacity-100
            transition-opacity
          "
                      >
                        <span className="hidden sm:inline text-[10px] opacity-60">
                          ↗
                        </span>
                        {c.phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer-grid grid grid-cols-2 md:grid-cols-4 gap-8 pt-6">
                {FOOTER_LINKS.map((col) => (
                  <div key={col.title} className="footer-col space-y-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-neutral-500 dark:text-neutral-400">
                      {col.title}
                    </p>

                    <ul className="space-y-2 text-sm text-neutral-700 dark:text-neutral-200">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={(e) =>
                              handleAnchorClick(e, link.href, link.external)
                            }
                            target={link.external ? "_blank" : undefined}
                            rel={
                              link.external ? "noopener noreferrer" : undefined
                            }
                            className="inline-flex items-center gap-1 hover:opacity-80 transition-opacity"
                          >
                            {link.label}
                            {link.external && (
                              <span className="text-[10px] opacity-60">↗</span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="footer-bottom mt-14 pt-8 border-t border-black/10 dark:border-white/10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                © {new Date().getFullYear()} Algorim. All rights reserved.
              </p>

              <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-400">
                <span className="footer-dot inline-block h-2 w-2 rounded-full bg-orange-400/80 shadow-[0_0_16px_rgba(249,115,22,0.65)]" />
                <span>Build fast · Ship safe · Look premium</span>
              </div>
            </div>

            <div className="footer-glow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[520px] w-[520px] rounded-full bg-orange-400/10 blur-[140px] -z-10" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DevLayout;
