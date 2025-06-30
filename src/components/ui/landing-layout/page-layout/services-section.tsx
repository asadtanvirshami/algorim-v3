import {
  Blocks,
  BrainCircuit,
  Code,
  LucideUsers2,
  ShieldCheckIcon,
  Smartphone,
} from "lucide-react";
import React from "react";
import { Separator } from "../../separator";

const ValueCard = ({
  icon,
  title,
  content,
}: {
  icon: React.ReactNode;
  title: string;
  content: string;
}) => {
  return (
    <div className="p-4 border bg-card rounded-lg space-y-6  font(var(--font-redhat))">
      {/* Card Header */}
      <div className="flex justify-between gap-4">
        <h1 className="font-bold text-xl">{title}</h1>
        {icon}
      </div>

      {/* Card Content */}
      <p className="text-justify text-[14.5px] hyphens-auto">{content}</p>
    </div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      title: "Artificial Intelligence",
      content:
        "We build AI solutions that help your business make smarter decisions, automate processes, and enhance customer experiences with cutting-edge technology.",
      icon: <BrainCircuit className="w-8 h-8" />,
    },
    {
      title: "Blockchain Development",
      content:
        "We create secure, transparent blockchain solutions that streamline processes, boost trust, and enable new business models for startups and enterprises alike.",
      icon: <Blocks className="w-8 h-8" />,
    },
    {
      title: "Full-Stack Development",
      content:
        "Our full-stack developers provide end-to-end solutions, building reliable, scalable, and secure applications for businesses across all industries.",
      icon: <Code className="w-8 h-8" />,
    },
    {
      title: "Engineers Augmentation",
      content:
        "We provide expert engineers to strengthen your team, filling skill gaps and accelerating project timelines without the hassle of recruitment.",
      icon: <LucideUsers2 className="w-8 h-8" />,
    },
    {
      title: "Cyber Security",
      content:
        "In an increasingly complex digital landscape, proactive defense is crucial. Our cybersecurity services provide comprehensive, multi-layered protection for your most critical assets. ",
      icon: <ShieldCheckIcon className="w-8 h-8" />,
    },
    {
      title: "Mobile Applications",
      content:
        "We develop high-performance mobile apps that are sleek, fast, and deliver a seamless experience across iOS and Android platforms, helping you reach more users.",
      icon: <Smartphone className="w-8 h-8" />,
    },
  ];
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left space-y-12 font-(-var(--font-redhat))">
      <div className="w-full flex justify-center">
        <h6 className="text-2xl w-fit text-center md:text-left lg:text-left font-semibold tracking-tight sm:text-2xl md:text-2xl lg:text-2xl">
          Our Services <Separator className="mt-2" />
        </h6>
      </div>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        The Full-Spectrum Skillset for Startup Success.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <ValueCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
