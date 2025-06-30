import React from "react";
import { Separator } from "../../separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
function FAQCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 fade-up">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>{title}</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>{description}</p>
          </AccordionContent>
        </AccordionItem>
        <Separator />
      </Accordion>
    </div>
  );
}

const FAQsSection = () => {
  const testimonials = [
    {
      title: "What is Algorim and What you offer?",
      description:
        "We’re a software development company that provides full-time remote engineers, designers, and marketing experts to businesses. Our teams work 9–5 for you at a fixed monthly rate no hidden fees, no long-term contracts.",
    },
    {
      title: "What kind of engineer do we provide?",
      description:
        "We offer engineers skilled in AI, Blockchain, Full-Stack (MERN/MEAN/MEVN), Mobile App Development, Penetration testers and more. All of them have at least 3–5 years of experience and are available on a monthly basis.",
    },
    {
      title: "How does free trial work?",
      description:
        "We offer a free 2-week or 4-week trial (depending on the project) where our engineers work directly with your team. If you're happy, we continue. If not, no problem — no charges, no strings attached.",
    },
    {
      title: "Where are your engineers based?",
      description:
        "Pricing starts at just $1,000/month for full-time developers and can vary depending on the skill set and experience. You can check out our detailed rate sheet below.",
    },
    {
      title: "Can I scale my team up or down anytime?",
      description:
        "Yes! You can scale your team based on your project needs — add more engineers or pause the service anytime. Flexibility is built into our model.",
    },
  ];
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left">
      <div className="w-full flex justify-center">
        <h6 className="text-2xl w-fit  md:text-left lg:text-center font-semibold  sm:text-2xl md:text-2xl lg:text-2xl">
          Question & Answer
          <Separator className="mt-2" />
        </h6>
      </div>
      <h1 className="text-4xl md:text-5xl lg:text-6xl mt-5 text-center fade-up  font(var(--font-redhat)) font-bold text-balance">
        Frequently Asked Questions
      </h1>
      {/* Testimonial Cards Section */}
      <div className="mt-12 border bg-card rounded-lg">
        {testimonials.map((testimonial) => (
          <FAQCard key={testimonial.title} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default FAQsSection;
