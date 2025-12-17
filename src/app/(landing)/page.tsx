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
      <DevLayout />
    </main>
  );
};

export default memo(Landing);
