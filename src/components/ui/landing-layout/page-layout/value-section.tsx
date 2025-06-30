import { Award, CircleDollarSignIcon, LucideUsers2 } from "lucide-react";
import React from "react";

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
      <p className="text-justify [hyphens:auto]">{content}</p>
    </div>
  );
};

const ValueSection = () => {
  const values = [
    {
      title: "Elite Talent, Accelerated Delivery",
      content:
        "Leverage our global network of high-caliber engineers, selected for rapid integration and immediate productivity. We provide a strategic balance of profound expertise and operational velocity from day one.",
      icon: <LucideUsers2 className="w-16 h-16" />,
    },
    {
      title: "Optimized Efficiency, Predictable Costs.",
      content:
        "Eliminate protracted recruitment timelines and budgetary uncertainties. Our subscription-based model provides a streamlined path to acquiring talent, ensuring significant efficiencies in both time and capital investment while upholding an unwavering commitment to quality.",
      icon: <CircleDollarSignIcon className="w-16 h-16" />,
    },
    {
      title: "A Foundation of Quality and Cultural Congruence.",
      content:
        "Our selection process is designed to ensure deep alignment on what matters most. We provide professionals who not only possess the required skills but also share your core values and commitment to quality, facilitating seamless team integration.",
      icon: <Award className="w-16 h-16" />,
    },
  ];
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left space-y-12 font-(-var(--font-redhat))">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        Our Core Differentiators: Three Strategic Advantages for Your Business.
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {values.map((value, index) => (
          <ValueCard key={index} {...value} />
        ))}
      </div>
    </div>
  );
};

export default ValueSection;
