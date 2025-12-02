import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import ReactLenis from "lenis/react";
import localFont from "next/font/local";

const revamped = localFont({
  src: "./../fonts/Revamped.otf",
  weight: "100 900",
  variable: "--font-revamped",
});

const redhat = Red_Hat_Display({
  subsets: ["latin"],
  variable: "--font-redhat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Algorim - Blockchain & AI Solutions",
  description:
    "Utilizing the technology of Blockchain & AI for Business. We build robust, scalable, and secure solutions for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${revamped.variable} ${redhat.variable} antialiased`}>
        <ReactLenis
          root
          options={{
            lerp: 0.08, // smoothing (0–1)
            duration: 1.2, // approximate duration of scroll
            syncTouch: true, // ✅ works in new Lenis instead of smoothTouch
            wheelMultiplier: 1,
            gestureOrientation: "vertical",
          }}
        >
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}
