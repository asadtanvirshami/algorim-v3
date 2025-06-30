"use client";

import elon from "../../../../../public/assets/entreprenuers/elon.jpg";
import bill from "../../../../../public/assets/entreprenuers/bill.jpg";
import jeff from "../../../../../public/assets/entreprenuers/jeff.jpeg";
import mark from "../../../../../public/assets/entreprenuers/mark.jpg";
import sundar from "../../../../../public/assets/entreprenuers/sundar.jpeg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const leaderQuotes = [
  {
    id: "1",
    name: "Mark Zuckerberg",
    image: mark,
    quote:
      "The biggest risk is not taking any risk. In a world that is changing really quickly, the only strategy that is guaranteed to fail is not taking risks.",
  },
  {
    id: "2",
    name: "Elon Musk",
    image: elon,
    quote:
      "When something is important enough, you do it even if the odds are not in your favor.",
  },
  {
    id: "3",
    name: "Bill Gates",
    image: bill,
    quote: "Your most unhappy customers are your greatest source of learning.",
  },
  {
    id: "4",
    name: "Sundar Pichai",
    image: sundar,
    quote: "If you don't fail sometimes, you are not being ambitious enough.",
  },
  {
    id: "5",
    image: jeff,
    name: "Jeff Bezos",
    quote: "We are stubborn on vision. We are flexible on details.",
  },
];
export default function QuotesSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* 4. Updated heading to match content */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl mt-5 text-center fade-up  font(var(--font-redhat)) font-bold text-balance">
        Wisdom from Tech Leaders
      </h1>

      <Carousel
        className="w-full mt-12"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {leaderQuotes.map((quote) => (
            <CarouselItem
              key={quote.id}
              // 5. Added lg:basis-1/3 for better large-screen layout
              className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <Card className="h-full flex flex-col overflow-hidden">
                {/* 1. Created a container for the image with a defined height */}
                <div className="relative w-full h-48">
                  <Image
                    // 2. Used the `fill` prop to make the image cover its parent div
                    fill
                    // 3. Cleaned up classes: `object-cover` is all you need here
                    className="object-cover"
                    src={quote.image}
                    alt={quote.name}
                  />
                </div>
                <div className="flex flex-col flex-grow p-6">
                  <CardHeader className="p-0">
                    <CardTitle className="text-lg"></CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 mt-4 flex-grow">
                    {/* 6. Corrected font syntax - this should be defined in your tailwind config */}
                    <blockquote className="border-l-2 pl-4 italic font-serif text-justify [hyphens:auto]">
                      {quote.quote}
                    </blockquote>
                  </CardContent>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
