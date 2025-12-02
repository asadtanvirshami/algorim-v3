"use client";

import React from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/scroll-stack";

const ScrollSection = () => {
  return (
    <div className="relative w-full bg-slate-950 text-white">
      <ScrollStack>
        <ScrollStackItem itemClassName="bg-gradient-to-br from-rose-500/10 via-slate-900 to-black">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Card 1
          </h2>
          <p className="mt-4 text-lg text-slate-200/90">
            This is the first card in the stack.
          </p>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-gradient-to-br from-blue-500/10 via-slate-900 to-black">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Card 2
          </h2>
          <p className="mt-4 text-lg text-slate-200/90">
            This is the second card in the stack.
          </p>
        </ScrollStackItem>

        <ScrollStackItem itemClassName="bg-gradient-to-br from-emerald-500/10 via-slate-900 to-black">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Card 3
          </h2>
          <p className="mt-4 text-lg text-slate-200/90">
            This is the third card in the stack.
          </p>
        </ScrollStackItem>
      </ScrollStack>
    </div>
  );
};

export default ScrollSection;
