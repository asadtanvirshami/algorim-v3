"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export interface NavItem {
  label: string;
  href: string;
  badge?: string; // e.g. "New" or "36"
}

export interface SocialItem {
  label: string;
  href: string;
}

interface ModernSideMenuProps {
  items: NavItem[];
  socials: SocialItem[];
  logoSrc: string;
  logoAlt?: string;
}

const ModernSideMenu: React.FC<ModernSideMenuProps> = ({
  items,
  socials,
  logoSrc,
  logoAlt = "Logo",
}) => {
  const [open, setOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Open / close animation
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      const navItems = gsap.utils.toArray<HTMLElement>("[data-nav-item]");
      const socialItems = gsap.utils.toArray<HTMLElement>("[data-social-item]");
      const metaItems = gsap.utils.toArray<HTMLElement>("[data-meta-item]");

      if (open) {
        gsap.set(overlay, { autoAlpha: 1, pointerEvents: "auto", display: "block" });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
        )
          .from(
            "[data-logo]",
            { y: -20, autoAlpha: 0, duration: 0.45 },
            "-=0.1"
          )
          .from(
            "[data-home-title]",
            { y: 40, autoAlpha: 0, duration: 0.6 },
            "-=0.1"
          )
          .from(
            navItems,
            {
              y: 40,
              autoAlpha: 0,
              duration: 0.65,
              stagger: 0.08,
            },
            "-=0.25"
          )
          .from(
            socialItems,
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.45,
              stagger: 0.08,
            },
            "-=0.35"
          )
          .from(
            metaItems,
            {
              y: 20,
              autoAlpha: 0,
              duration: 0.5,
              stagger: 0.1,
            },
            "-=0.4"
          );

        tlRef.current = tl;
      } else {
        const tl = tlRef.current;
        if (tl) {
          tl.reverse().eventCallback("onReverseComplete", () => {
            gsap.set(overlay, {
              autoAlpha: 0,
              pointerEvents: "none",
              display: "none",
            });
          });
        } else {
          gsap.set(overlay, {
            autoAlpha: 0,
            pointerEvents: "none",
            display: "none",
          });
        }
      }
    }, overlay);

    return () => ctx.revert();
  }, [open]);

  const handleNavClick = (href: string) => {
    setOpen(false);
    // normal navigation
    window.location.href = href;
  };

  return (
    <>
      {/* Floating open button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/80 text-sm font-medium text-white backdrop-blur-sm transition hover:scale-105 hover:border-white/50 hover:bg-black"
          aria-label="Open menu"
        >
          <span className="text-[11px] tracking-[0.12em] uppercase">
            Menu
          </span>
        </button>
      )}

      {/* Fullscreen overlay menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-black text-white opacity-0 pointer-events-none"
      >
        <div className="flex h-full w-full flex-col px-10 py-8 lg:px-16 lg:py-10">
          {/* Top row: logo + close */}
          <div className="flex items-center justify-between">
            <div
              data-logo
              className="flex items-center gap-3 text-left"
            >
              <img
                src={logoSrc}
                alt={logoAlt}
                className="h-10 w-auto object-contain"
              />
            </div>

            <button
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white text-black shadow-lg transition hover:scale-105 hover:border-white"
              aria-label="Close menu"
            >
              <span className="text-lg leading-none">×</span>
            </button>
          </div>

          {/* Middle layout */}
          <div className="mt-16 flex flex-1 flex-col gap-12 lg:mt-20 lg:flex-row lg:items-start lg:justify-between">
            {/* Left / center: Home + main nav */}
            <div className="flex flex-col gap-10 lg:max-w-xl">
              <div>
                <p
                  data-home-title
                  className="text-4xl font-semibold tracking-tight lg:text-6xl"
                >
                  Home
                </p>
              </div>

              <nav aria-label="Main navigation">
                <ul className="space-y-4 lg:space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.label}
                      data-nav-item
                      className="flex items-center gap-3"
                    >
                      <button
                        onClick={() => handleNavClick(item.href)}
                        className="group inline-flex items-center text-left text-4xl font-semibold tracking-tight lg:text-6xl"
                      >
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">
                          {item.label}
                        </span>
                      </button>

                      {item.badge && (
                        <span className="rounded-full bg-lime-400 px-2.5 py-0.5 text-xs font-semibold text-black">
                          {item.badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
                  
            {/* Right: socials */}
            <div className="flex flex-col items-start gap-3 lg:items-end lg:text-right">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-social-item
                  className="text-base font-medium tracking-tight text-white/90 transition hover:text-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Bottom row: CTA + copyright */}
          <div className="mt-10 flex items-end justify-between gap-6 text-sm lg:text-base">
            <button
              data-meta-item
              className="rounded-full border border-white px-5 py-2 text-sm font-medium tracking-tight transition hover:bg-white hover:text-black"
            >
              contact
            </button>

            <div
              data-meta-item
              className="text-right text-[11px] leading-snug text-white/70"
            >
              <p>© Copyright TIC GLOBAL SERVICES</p>
              <p>SERVICES</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernSideMenu;
