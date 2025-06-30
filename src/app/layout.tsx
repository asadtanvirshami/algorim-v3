import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
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
    <html lang="en">
      <body className={`${revamped.variable} ${redhat.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
