import {} from "lucide-react";
import React from "react";
import { Separator } from "../../separator";

const IndustryCard = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="p-4 border bg-card rounded-lg space-y-6  font(var(--font-redhat))">
      {/* Card Header */}
      <div className="flex justify-between gap-4">
        <h1 className="font-bold text-xl">{title}</h1>
      </div>

      {/* Card Content */}
      <p className="text-justify text-[14.5px] hyphens-auto">{content}</p>
    </div>
  );
};

const IndustriesSection = () => {
  const services = [
    {
      title: "Web3 & AI Solutions",
      content:
        "We specialize in helping startups and enterprises leverage Web3 and AI technologies to stay ahead of the curve and drive innovation in their industries.",
    },
    {
      title: "Lifestyle & Luxury Services",
      content:
        "From fitness apps to personalized coaching solutions, we empower health and wellness brands to offer impactful, user-focused digital experiences.",
    },
    {
      title: "Health, Wellness & Coaching",
      content:
        "We work with premium brands to create seamless digital experiences that elevate lifestyle and luxury services to new heights.",
    },
    {
      title: "Retail & Ecommerce",
      content:
        "We build scalable, user-friendly ecommerce platforms that help retail businesses enhance their online presence and drive conversions.",
    },
  ];
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left space-y-12 font-(-var(--font-redhat))">
      <div className="w-full flex justify-center">
        <h6 className="text-2xl w-fit text-center md:text-left lg:text-left font-semibold tracking-tight sm:text-2xl md:text-2xl lg:text-2xl">
          Industries We Serve <Separator className="mt-2" />
        </h6>
      </div>
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        Pioneering Advanced Solutions Across All Sectors.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {services.map((service, index) => (
          <IndustryCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default IndustriesSection;
