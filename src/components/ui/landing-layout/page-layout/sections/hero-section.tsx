"use client";
import React from "react";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import Lottie from "lottie-react";
import animationData from "../../../../../../public/assets/hero/Scene.json";
import { Button } from "../../../button";

const HeroSection = () => {
  return (
    <section  data-anim="hero" className="min-h-screen flex items-center justify-center">
      <div className="relative w-full h-[90vh] lg:h-screen overflow-hidden">
        {/* Background Lottie Animation */}
        <Lottie
          animationData={animationData}
          loop
          autoplay
          className="absolute inset-0 w-screen h-full object-contain z-0 opacity-30 pointer-events-none"
        />

        {/* Gradient Overlay (optional for contrast) */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-transparent z-0" />

        {/* Content */}
        <div className="relative z-10 flex justify-center items-center w-full h-full px-12 md:px-20 lg:px-28 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
            {/* Column Left */}
            <div className="fade-up space-y-6">
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-7xl lg:text-7xl leading-[1.1]">
                Elite Teams, Designs & Branding
              </h1>

              <p className="text-lg sm:text-md md:text-lg lg:text-xl text-gray-300 max-w-2xl">
                Our expertise enables startups and corporates to achieve
                superior, faster engineering outcomes. From Design, Branding to
                Engineered Teams.
              </p>

              <div>
                <Button
                  variant="ghost"
                  className="!w-fit border !h-12 px-5 py-2 shimmer-btn flex items-center gap-2"
                >
                  <Link href="https://meet.brevo.com/algorim-consultation">
                    Get Consultation
                  </Link>
                  <ArrowUpRightIcon />
                </Button>
              </div>
            </div>

            {/* Column Right */}
            <div></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
