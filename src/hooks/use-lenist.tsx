"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReactLenis>{children}</ReactLenis>
    </>
  );
}

export default Layout;
