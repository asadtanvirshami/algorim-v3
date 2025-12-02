"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import GlassSurface from "@/components/GlassSurface";

const HeroSection = () => {
  return (
    <div className="flex justify-center items-center w-full h-full px-16 mx-auto text-center md:text-left">
      <div className="grid grid-cols-2">
        {/* //Column Left */}
        <div>
          <div className="fade-up">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Elite Engineered Teams At Subscription
            </h1>
            <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300">
              Our expertise enables startups and corporates to achieve superior,
              faster engineering outcomes at a fraction of the cost.
            </p>
          </div>
          <div className="mt-8">
            <GlassSurface className="w-full !h-12 shimmer-btn">
              <Link href="https://meet.brevo.com/algorim-consultation">
                Get Free Consultation
              </Link>
              <ArrowUpRightIcon />
            </GlassSurface>
          </div>
        </div>
        {/* //Column Right */}
        <div>
          <></>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
