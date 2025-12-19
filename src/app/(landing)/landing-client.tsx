"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import ReactLenis from "lenis/react";
import SEO from "@/components/seo/seo-head";

// ✅ Code-split DevLayout for faster first paint
const DevLayout = dynamic(() => import("@/components/ui/dev/page-layout"), {
  ssr: false,
  loading: () => null,
});

const LandingClient = () => {
  return (
    <>
      <SEO
        title="Algorim.io | Full-stack Development, Blockchain, & AI Solutions"
        description="Utilizing the technology of Blockchain & AI for Business. We build robust, scalable, and secure solutions for your business."
        url="https://algorimsoft.com"
        image="https://algorimsoft.com/og-image.jpg"
      />

      <ReactLenis
        root
        options={{
          lerp: 0.08,
          duration: 1.1,
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1,
          syncTouch: true,
          gestureOrientation: "vertical",
        }}
      >
        <DevLayout />
      </ReactLenis>
    </>
  );
};

export default memo(LandingClient);
