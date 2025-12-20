"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider/provider";
import ModernSideMenu, {
  NavItem,
  SocialItem,
} from "@/components/ui/off-canvas";

const items = [
  { label: "Process", href: "#process" },
  { label: "Who", href: "#who" },
  { label: "Creativity", href: "#creativity" }, // or "#ct" if you prefer
  { label: "Services", href: "#services", badge: "12" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Colors", href: "#colors" },
  { label: "Contact", href: "#contact" },
];

const socialItems: SocialItem[] = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* Sider overlay, floats above everything */}
      <>
        <ModernSideMenu
          items={items as NavItem[]}
          socials={socialItems}
          logoSrc="/your-logo.svg"
          logoAlt="The Internet Company"
        />
      </>

      {/* Page content under it */}
      {children}
    </ThemeProvider>
  );
}
