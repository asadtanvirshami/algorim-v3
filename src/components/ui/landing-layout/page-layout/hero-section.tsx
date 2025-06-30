import React from "react";
import { Button } from "../../button";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="w-full fade-up max-w-5xl px-4 mx-auto text-center md:text-left">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Elite Engineered Teams At Subscription
        </h1>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300">
          Our expertise enables startups and corporates to achieve superior,
          faster engineering outcomes at a fraction of the cost.
        </p>
      </div>
      <div className="mt-8">
        <Button
          size={"lg"}
          className="px-8 py-3 text-lg font-semibold text-white bg-gradient-to-tr from-blue-500 to-sky-500 rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 ease-in-out"
        >
          <Link href="https://calendly.com/algorim">Get Free Consultation</Link>
          <ArrowUpRightIcon />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
