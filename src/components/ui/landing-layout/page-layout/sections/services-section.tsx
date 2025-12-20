/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Palette, Code2, Bot, ShieldHalf, Cloud, Cuboid } from "lucide-react";
import { Card } from "@/components/ui/card";
type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;

type Service = {
  id: string;
  label: string;
  tag: string;
  description: string;
  bullets: string[];
  icon: SvgIcon;
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
const ServicesSection = ({
  servicesHorizontalSectionRef,
  servicesTrackRef,
  CONTAINER,
  UI,
}) => {
  return (
    <section
      id="services"
      ref={servicesHorizontalSectionRef}
      className="relative min-h-[80svh] md:min-h-[100svh] overflow-hidden"
    >
      <div
        className={`relative h-full ${CONTAINER} flex flex-col z-10 overflow-r-hidden mt-10 md:mt-12`}
      >
        <div id="services-heading" className="shrink-0 space-y-3 pt-2 md:pt-4">
          <div className="flex flex-wrap gap-2 mb-1">
            <span
              className={`services-pill text-[11px] uppercase tracking-[0.25em] ${UI.textMuted}`}
            >
              Services
            </span>
            <span
              className={`services-pill text-[11px] uppercase tracking-[0.25em] ${UI.textMuted}`}
            >
              Branding · Product · AI · Cloud · Security
            </span>
          </div>

          <h2
            className={`text-3xl md:text-4xl font-semibold max-w-xl ${UI.textStrong}`}
          >
            A horizontal deck of capabilities. Scroll to move sideways.
          </h2>

          <p className={`text-sm md:text-base ${UI.textSub} max-w-md`}>
            Every card is a fully managed unit you can plug into your company:
            brand, engineering, AI, security and cloud.
          </p>
        </div>

        <div className="relative flex-1 mt-10 md:mt-12 flex items-center">
          <div
            ref={servicesTrackRef}
            className="
                  flex items-stretch gap-4 sm:gap-5 md:gap-6
                  overflow-x-auto md:overflow-visible
                  snap-x snap-mandatory md:snap-none
                  scroll-pl-4 sm:scroll-pl-6 pr-4 sm:pr-6 pb-3
                  [-webkit-overflow-scrolling:touch]
                "
          >
            {services.map((service: any) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  className={[
                    "service-card-h relative flex-shrink-0",
                    "w-[min(88vw,520px)] sm:w-[min(70vw,520px)] md:w-[460px] lg:w-[520px]",
                    "rounded-2xl p-5 sm:p-6 md:p-7 snap-start overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02]",
                    UI.glassSoft,
                    UI.border,
                    "shadow-[0_18px_70px_rgba(0,0,0,0.78)] hover:border-white/20",
                  ].join(" ")}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
                  <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-emerald-300/8 blur-3xl opacity-70" />
                  <div className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full bg-violet-300/8 blur-3xl opacity-60" />

                  <div className="relative flex h-full flex-col justify-between gap-4 z-10">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <span
                          className={`text-[11px] uppercase tracking-[0.22em] ${UI.textMuted}`}
                        >
                          {service.tag}
                        </span>

                        <div className="service-icon flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] shadow-[0_0_22px_rgba(255,255,255,0.10)]">
                          <Icon className="h-5 w-5 text-white/90 drop-shadow-[0_0_12px_rgba(255,255,255,0.10)]" />
                        </div>
                      </div>

                      <h3
                        className={`text-xl md:text-2xl font-semibold ${UI.accentText}`}
                      >
                        {service.label}
                      </h3>
                      <p className={`text-sm ${UI.textSub} mt-2`}>
                        {service.description}
                      </p>
                    </div>

                    <ul
                      className={`space-y-1.5 text-xs md:text-sm ${UI.textSub} mt-4`}
                    >
                      {service.bullets.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="mt-1 h-[4px] w-[14px] rounded-full bg-white/20" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              );
            })}

            <div className="w-[min(88vw,520px)] sm:w-[min(70vw,520px)] md:w-[460px] lg:w-[520px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
