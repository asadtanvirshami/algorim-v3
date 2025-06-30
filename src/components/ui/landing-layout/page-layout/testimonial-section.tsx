import React from "react";
import { Separator } from "../../separator";

function TestimonialCard({
  title,
  name,
  quote,
}: {
  title: string;
  name: string;
  quote: string;
}) {
  return (
    <div className="p-4 bg-card fade-up">
      <blockquote className="mt-6 border-l-2 pl-6 italic text-justify [hyphens:auto] font-serif">
        {quote}
      </blockquote>
      <div className="text-right">
        <p className="font-semibold text-lg text-gray-600">-{name}</p>
        <p className="text-md text-gray-600">{title}</p>
      </div>
    </div>
  );
}

const TestimonalSection = () => {
  const testimonials = [
    {
      quote:
        "Our platform, FXBacktest, processes immense amounts of financial data where performance and precision are non-negotiable. We needed a team that could handle that complexity without the exorbitant costs typically associated with high-frequency tech. They didn't just meet our expectations; they optimized our infrastructure, significantly lowering our engineering overhead while boosting processing speed. It’s a rare and invaluable combination of expertise and efficiency.",
      name: "Paolo",
      title: "CEO, FXBacktest",
    },
    {
      quote:
        "In the security world, you can't afford mistakes. For N0Hacks, a rock-solid, reliable foundation is everything. We engaged them to build out a critical component of our service, and their commitment to quality was evident from the start. They delivered robust, clean code faster than any team we've worked with before. Their proactive approach saved us time and money by preventing issues before they could arise. We trust them completely.",
      name: "Samy Ennkhaili",
      title: "CEO, N0Hacks",
    },
    {
      quote:
        "As a startup, speed to market is life or death. We had a powerful vision for BuildU but needed to execute it quickly without our product feeling rushed. This team was the perfect partner. They immediately grasped our vision for a sleek, intuitive user experience and brought it to life with incredible speed. The smooth, polished result has been a major factor in our early user adoption. They gave us the velocity of a large corporate team on a startup-friendly budget.",
      name: "Jeremy William",
      title: "CEO, BuildU.AI",
    },
  ];
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left">
      <div className="w-full flex justify-center">
        <h6 className="text-2xl w-fit  md:text-left lg:text-center font-semibold  sm:text-2xl md:text-2xl lg:text-2xl">
          Testimonials <Separator className="mt-2" />
        </h6>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl mt-5 text-center fade-up  font(var(--font-redhat)) font-bold text-balance">
        What Are Our Clients Saying?
      </h1>
      {/* Testimonial Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.name} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default TestimonalSection;
