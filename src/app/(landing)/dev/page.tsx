import SEO from "@/components/seo/seo-head";
import DevLayout from "@/components/ui/dev/page-layout";
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
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_10%_0,rgba(255,255,255,0.06),transparent_55%),radial-gradient(circle_at_90%_100%,rgba(255,255,255,0.05),transparent_55%)]" />

      <DevLayout />
    </main>
  );
};

export default memo(Landing);
