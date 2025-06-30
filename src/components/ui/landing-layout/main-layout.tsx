import React from "react";
import { ThemeProvider } from "@/components/theme-provider/provider";
import Header from "../header";
import Footer from "../footer";

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
      <Header />
      {children}
      <Footer/>
    </ThemeProvider>
  );
}
