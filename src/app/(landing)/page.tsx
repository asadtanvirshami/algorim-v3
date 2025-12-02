import Beams from "@/components/Beams";
import FloatingLines from "@/components/FloatingLines";
import LaserFlow from "@/components/LaserFlow";
import SEO from "@/components/seo/seo-head";
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
    <main>
      <SEO
        title="Algorim.io | Full-stack Development, Blockchain, & AI Solutions"
        description="Utilizing the technology of Blockchain & AI for Business. We build robust, scalable, and secure solutions for your business."
        url="https://algorimsoft.com"
        image="https://algorimsoft.com/og-image.jpg"
      />

      <div className="relative  sm:pb-32 lg:flex lg:pb-30 ">
        <section className="relative !bg-transparent flex flex-col items-center justify-center min-h-screen w-full bg-black overflow-hidden">
          <div className="absolute z-10 text-center bg-transparent">
            <HeroSection />
          </div>
        </section>
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

          {/* <CeoSaying /> */}

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
    </main>
  );
};

export default memo(Landing);
