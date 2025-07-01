import Image from "next/image";
import React from "react";

import ceo from "../../../../../public/assets/ceo/ceo.png";
import LinkedIn from "../../../../../public/assets/socials/in.png";

import { Button } from "../../button";
import Link from "next/link";
import { SquareArrowOutUpRight } from "lucide-react";

const CeoSaying = () => {
  return (
    <div className="w-full max-w-5xl px-4 mx-auto text-center md:text-left">
      <div className="grid grid-cols-1 space-y-12  md:grid-cols-2 lg:grid-cols-2">
        {/* Image of CEO */}
        <Image
          src={ceo}
          alt="CEO"
          className="rounded-xl"
          width={400}
          height={400}
        />

        {/* Saying of CEO */}
        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Leadership & Vision.
          </h1>
          <div className="p-4 bg-transparent  fade-up">
            <blockquote className="mt-6 border-l-2 pl-6 italic font(var(--font-redhat)) text-justify [hyphens:auto]">
              True leadership is realized when the vision is no longer just
              yours, but becomes ours, and the path forward transforms into a
              journey we are all excited to take together.
            </blockquote>
            <div className="text-right">
              <p className="font-semibold text-lg text-gray-600">
                -Asad Tanvir Shami
              </p>
              <p className="text-md text-gray-600">-CEO, Algorim</p>
            </div>
          </div>
          <div>
            <p className="font(var(--font-redhat)) text-justify [hyphens:auto]">
              Asad Tanvir Shami, our Chief Executive Officer, leads with a
              foundational principle: that superior talent is the ultimate
              competitive advantage in any technological endeavor. His
              leadership is deeply rooted in his extensive background as an
              engineer and architect, giving him a unique perspective that
              values not just vision, but flawless execution. He believes that
              the most innovative products are born from world-class teams, and
              he has structured the entire firm around this core tenet. This
              philosophy is more than a belief; it is an operational strategy he
              has personally architected. With direct experience building
              complex back-end systems, scalable cloud infrastructure, and
              advanced AI-driven solutions, Asad possesses a granular
              understanding that transcends superficial analysis. He has
              cultivated an elite team of professionals who operationalize this
              vision, ensuring that every project is powered by the precise
              human capital required to accelerate strategic objectives and
              deliver exceptional results.
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div>
            <Button
              variant={"ghost"}
              className="shimmer-btn border bg-card"
              size={"lg"}
            >
              <Link
                className="flex items-center gap-4"
                href={"https://www.linkedin.com/in/asadtanvirshami/"}
              >
                Connect with Asad <SquareArrowOutUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CeoSaying;
