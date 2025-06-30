import Container from "@/components/ui/container";
import WhoWeAreSection from "@/components/ui/landing-layout/page-layout/about-section";
import CeoSaying from "@/components/ui/landing-layout/page-layout/ceo-saying";
import { ContactInfo } from "@/components/ui/landing-layout/page-layout/contact-info";
import ContactForm from "@/components/ui/landing-layout/page-layout/contact-section";
import FAQsSection from "@/components/ui/landing-layout/page-layout/faqs-section";
import HeroSection from "@/components/ui/landing-layout/page-layout/hero-section";
import IndustriesSection from "@/components/ui/landing-layout/page-layout/industries-section";
import NewsLetterSection from "@/components/ui/landing-layout/page-layout/newsletter-section";
import QuotesSection from "@/components/ui/landing-layout/page-layout/quotes-section";
import ServicesSection from "@/components/ui/landing-layout/page-layout/services-section";
import StrategySection from "@/components/ui/landing-layout/page-layout/strategy-section";
import TestimonalSection from "@/components/ui/landing-layout/page-layout/testimonial-section";
import ValueSection from "@/components/ui/landing-layout/page-layout/value-section";
import WhySection from "@/components/ui/landing-layout/page-layout/why-section";
import React, { memo } from "react";

const Landing = () => {
  return (
    <div className="relative isolate overflow-hidden w-full h-full  font-[family-name:var(--font-redhat)] ">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-gray-100 [mask-image:radial-gradient(100%_100%_at_center,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M.5 200V.5H200"
              fill="none"
              stroke="gray"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        />
      </svg>

      <div className="mx-auto h-full mt-12  justify-center items-center align-middle max-w-7xl  sm:pb-32 lg:flex lg:py-30 lg:px-8">
        <HeroSection />
      </div>
      <div className="w-full">
        <div className="space-y-26 mt-12 font-[family-name:var(--font-redhat)] p-4">
          
          <section id="who-we-are">
            <WhoWeAreSection />
          </section>

          <ValueSection />
          <WhySection />
          <StrategySection />
          
          <section id="testimonials">
            <TestimonalSection />
          </section>
          
          <CeoSaying />
          
          <section id="services">
            <ServicesSection />
          </section>
          
          <IndustriesSection />
          <QuotesSection />
          <FAQsSection />
          <NewsLetterSection />
          
          <section id="inquiry">
            <ContactForm />
          </section>
          
          <ContactInfo />
        </div>
      </div>
    </div>
  );
};

export default memo(Landing);
