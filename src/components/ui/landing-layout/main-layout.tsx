"use client";

import React from "react";
import { ThemeProvider } from "@/components/theme-provider/provider";
import ModernSideMenu, {
  NavItem,
  SocialItem,
} from "@/components/ui/off-canvas";

const menuItems: NavItem[] = [
  { label: "Client", href: "/client" },
  { label: "Portal", href: "/portal" },
  { label: "Archive", href: "/archive", badge: "36" },
  { label: "Branding", href: "/branding" },
  { label: "Contact", href: "/contact", badge: "New" },
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
          items={menuItems}
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
