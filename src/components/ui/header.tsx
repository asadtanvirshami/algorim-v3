/* eslint-disable react/no-unescaped-entities */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModeToggle } from "../theme-provider/toggle-button";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "./separator";
import { Button } from "./button";
import { ArrowRight } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // Close mobile menu if open
    }
  };
  return (
    <header className="w-full bg-background -b sticky top-0 z-50">
      {/* Headline Banner*/}
      <div className="max-w-screen-xl hidden lg:flex xl:flex mx-auto justify-between items-center px-4 py-2">
        {/* Socials*/}
        <div className="flex gap-2">
          <div>
            <div className="flex h-5 items-center space-x-4 text-sm  font-[family-name:var(--font-redhat)]">
              {/* LinkedIn */}
              <Link href={"https://www.linkedin.com/company/algorim-io/"}>
                LinkedIn
              </Link>
              <Separator orientation="vertical" />
              {/* Facebook */}
              <Link
                href={"https://www.facebook.com/profile.php?id=61568140792184#"}
              >
                Facebook
              </Link>
              {/* Instagram */}
              <Separator orientation="vertical" />
              <Link href={"https://www.instagram.com/algorim.io/"}>
                Instagram
              </Link>
              {/* Twitter
              <Separator orientation="vertical" />
              <Link href={"/"}>Twitter</Link> */}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <div className="flex h-5 items-center space-x-4 text-sm  font-[family-name:var(--font-redhat)]">
              {/* Cell */}
              <h2>+92 301 1234567</h2>
              {/* Email */}
              <Separator orientation="vertical" />
              <h2>info@algorimsoft.com</h2>
            </div>
          </div>
        </div>
      </div>
      <Separator
        orientation="horizontal"
        className="mt-1 hidden lg:flex xl:flex"
      />

      {/* Navigation*/}
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-4 py-1 fade-up">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2">
          <h1 className="text-4xl pt-2 font-semibold font-[family-name:var(--font-revamped)]">
            A
          </h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {/* Navigation */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Button
                    variant={"ghost"}
                    type="button"
                    onClick={() => scrollToSection("testimonials")}
                  >
                    TESTIMONIALS
                  </Button>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Button
                    variant={"ghost"}
                    type="button"
                    onClick={() => scrollToSection("who-we-are")}
                  >
                    WHO WE ARE?
                  </Button>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Button
                    variant={"ghost"}
                    onClick={() => scrollToSection("services")}
                    type="button"
                  >
                    SERVICES
                  </Button>
                </NavigationMenuLink>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Button
                    variant={"ghost"}
                    type="button"
                    onClick={() => scrollToSection("inquiry")}
                  >
                    INQUIRY
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant={"outline"}
              className="flex items-center cursor-pointer shimmer-btn !border dark:text-white dark:bg-black"
            >
              <Link href="https://calendly.com/algorim">
                {"Let's connect"}{" "}
              </Link>
              <ArrowRight />
            </Button>
            <ModeToggle />
          </div>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <button
            className="flex flex-col gap-1.5 w-6 h-6 justify-center items-center group relative"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block h-0.5 w-full bg-foreground transform transition duration-300 ease-in-out ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-foreground transition-all duration-300 ease-in-out ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block h-0.5 w-full bg-foreground transform transition duration-300 ease-in-out ${
                isOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden md:hidden transition-all duration-200 ease-in-out ${
          isOpen ? "max-h-[300px] py-2" : "max-h-0 py-0"
        }`}
      >
        <div className="px-4 flex flex-col gap-3">
          <Button
            variant={"ghost"}
            type="button"
            onClick={() => scrollToSection("testimonials")}
          >
            TESTIMONIALS
          </Button>

          <Button
            variant={"ghost"}
            type="button"
            onClick={() => scrollToSection("who-we-are")}
          >
            WHO WE ARE?
          </Button>

          <Button
            variant={"ghost"}
            onClick={() => scrollToSection("services")}
            type="button"
          >
            SERVICES
          </Button>

          <Button
            variant={"ghost"}
            type="button"
            onClick={() => scrollToSection("inquiry")}
          >
            INQUIRY
          </Button>

          <Button
            variant="default"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium"
          >
            Let's Connect
          </Button>
          {/* Add more mobile links here if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;
