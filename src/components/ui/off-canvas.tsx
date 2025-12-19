/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "./button";
import { Badge } from "./badge";
import Link from "next/link";

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface SocialItem {
  label: string;
  href: string;
}

export interface PhoneItem {
  label: string;
  value: string;
}

interface ModernSideMenuProps {
  items: NavItem[];
  socials: SocialItem[];
  logoSrc?: string;
  logoAlt?: string;

  homeLabel?: string;
  showAlgorimWordmark?: boolean;

  email?: string;
  phones?: PhoneItem[];

  primaryCtaLabel?: string;
  primaryCtaHref?: string;
}

const ModernSideMenu: React.FC<ModernSideMenuProps> = ({
  items,
  socials,
  homeLabel = "Let's connect!",
  showAlgorimWordmark = true,

  email = "business@algorimsoft.com",
  phones = [
    { label: "Andorra", value: "+371 665 320" },
    { label: "United Arab Emirates", value: "+971 50 697 5307" },
    { label: "Spain", value: "+34 635 110 145" },
    { label: "Pakistan", value: "+92 331 2051939" },
    { label: "United States", value: "+1 707-657-5347" },
  ],

  primaryCtaLabel = "Book a call",
  primaryCtaHref = "https://meet.brevo.com/algorim-consultation",
}) => {
  const [open, setOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const year = useMemo(() => new Date().getFullYear(), []);
  const handleTag = useMemo(() => `algorim@${year}`, [year]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const ctx = gsap.context(() => {
      const navItemsEls = gsap.utils.toArray<HTMLElement>("[data-nav-item]");
      const socialItemsEls =
        gsap.utils.toArray<HTMLElement>("[data-social-item]");
      const metaItemsEls = gsap.utils.toArray<HTMLElement>("[data-meta-item]");

      if (open) {
        gsap.set(overlay, {
          autoAlpha: 1,
          pointerEvents: "auto",
          display: "block",
        });

        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(
          overlay,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.35, ease: "power2.out" }
        )
          .from(
            "[data-topbar]",
            { y: -16, autoAlpha: 0, duration: 0.45 },
            "-=0.05"
          )
          .from(
            "[data-home-title]",
            { y: 24, autoAlpha: 0, duration: 0.55 },
            "-=0.15"
          )
          .from(
            navItemsEls,
            { y: 28, autoAlpha: 0, duration: 0.65, stagger: 0.07 },
            "-=0.22"
          )
          .from(
            "[data-right-panel]",
            { x: 20, autoAlpha: 0, duration: 0.65 },
            "-=0.55"
          )
          .from(
            socialItemsEls,
            { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.08 },
            "-=0.35"
          )
          .from(
            metaItemsEls,
            { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.08 },
            "-=0.35"
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

  const isHash = (href: string) => href.startsWith("#");
  const isExternal = (href: string) => /^https?:\/\//i.test(href);
  const isMail = (href: string) => href.startsWith("mailto:");
  const isTel = (href: string) => href.startsWith("tel:");

  const scrollToHash = (hash: string) => {
    const target = document.querySelector(hash);
    if (!target) return;

    const anyWindow = window;
    const lenis = (anyWindow as any)?.lenis;

    if (lenis?.scrollTo) lenis.scrollTo(target, { offset: -40, duration: 1.1 });
    else {
      const top =
        (target as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        40;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navigate = (href: string) => {
    if (isHash(href)) return window.setTimeout(() => scrollToHash(href), 90);
    if (isExternal(href))
      return window.open(href, "_blank", "noopener,noreferrer");
    if (isMail(href) || isTel(href)) return (window.location.href = href);
    window.location.href = href;
  };

  const handleNavClick = (href: string) => {
    setOpen(false);
    navigate(href);
  };

  const handlePrimaryCta = () => {
    setOpen(false);
    window.setTimeout(() => navigate(primaryCtaHref), 90);
  };

  // const NavRow: React.FC<{ children: React.ReactNode; badge?: string }> = ({
  //   children,
  //   badge,
  // }) => (
  //   <li data-nav-item className="flex items-center gap-3">
  //     <div
  //       className="
  //         group relative
  //         inline-flex items-center gap-4
  //         text-left
  //         text-3xl sm:text-4xl lg:text-4xl
  //         font-semibold tracking-tight
  //         text-zinc-950/85 dark:text-white/90
  //         transition
  //         hover:text-zinc-950 dark:hover:text-white
  //       "
  //     >
  //       <span
  //         className="
  //           h-[2px] w-6
  //           bg-black/20 dark:bg-white/20
  //           transition-all duration-300
  //           group-hover:w-10 group-hover:bg-white/65
  //           shadow-[0_0_18px_rgba(255,255,255,0.16)]
  //         "
  //       />
  //       <div className="transition-transform duration-300 group-hover:-translate-x-1">
  //         {children}
  //       </div>
  //       <span
  //         className="
  //           pointer-events-none absolute -bottom-2 left-10
  //           h-px w-0
  //           bg-gradient-to-r from-zinc-900/70 via-zinc-400/50 to-transparent
  //           dark:from-white/35 dark:via-white/20
  //           transition-all duration-300
  //           group-hover:w-[70%]
  //         "
  //       />
  //     </div>

  //     {badge && (
  //       <span
  //         className="
  //           rounded-full
  //           bg-zinc-900 text-white
  //           dark:bg-white/90 dark:text-black
  //           px-2.5 py-0.5
  //           text-xs font-semibold
  //           shadow-[0_0_18px_rgba(0,0,0,0.18)] dark:shadow-[0_0_18px_rgba(255,255,255,0.10)]
  //         "
  //       >
  //         {badge}
  //       </span>
  //     )}
  //   </li>
  // );

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed top-6 right-6 z-40
            inline-flex items-center gap-2
            rounded-full
            border border-black/10 dark:border-white/15
            bg-white/75 dark:bg-black/70
            px-4 py-2
            text-zinc-950 dark:text-white
            backdrop-blur-xl
            shadow-[0_18px_70px_rgba(0,0,0,0.18)] dark:shadow-[0_18px_70px_rgba(0,0,0,0.55)]
            transition
            hover:scale-[1.03] hover:border-black/20 dark:hover:border-white/25
          "
          aria-label="Open menu"
        >
          <span className="text-[11px] uppercase tracking-[0.22em] text-zinc-950/90 dark:text-white/90">
            Menu
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-zinc-900/70 dark:bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.12)]" />
        </button>
      )}

      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 opacity-0 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Click-catcher */}
        <button
          type="button"
          aria-label="Close menu backdrop"
          className="absolute inset-0"
          onClick={() => setOpen(false)}
        />

        {/* Background */}
        <div className="pointer-events-none absolute inset-0 bg-[#0A0B0E]">
          <div className="absolute -top-56 -left-56 h-[760px] w-[760px] rounded-full bg-white/[0.06] blur-[220px]" />
          <div className="absolute -bottom-72 -right-72 h-[900px] w-[900px] rounded-full bg-zinc-300/[0.05] blur-[260px]" />

          <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_35%,rgba(255,255,255,0.06),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1400px_circle_at_50%_120%,rgba(0,0,0,0.92),transparent_55%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/55 to-black/85" />

          <div
            className="
              absolute inset-0 opacity-[0.16]
              [background-image:
                linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),
                linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)]
              [background-size:64px_64px]
            "
          />

          <div className="absolute left-0 right-0 top-[18%] h-24 bg-gradient-to-r from-transparent via-white/8 to-transparent blur-2xl opacity-70" />
        </div>

        {/* Content wrapper (prevents overflow) */}
        <div className="relative h-full w-full overflow-y-auto">
          <div className="relative flex min-h-full w-full flex-col px-6 py-6 md:px-12 md:py-10 lg:px-16 lg:py-12 text-white">
            {/* Topbar */}
            <div data-topbar className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {showAlgorimWordmark && (
                  <div className="flex flex-col leading-none">
                    <span
                      className="
                        text-xl md:text-2xl
                        font-[family-name:var(--font-revamped)]
                        tracking-tight
                        text-transparent bg-clip-text
                        bg-gradient-to-b from-white via-zinc-200 to-white
                        drop-shadow-[0_0_18px_rgba(255,255,255,0.10)]
                      "
                    >
                      Algorim
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.26em] text-white/55">
                      Studio
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-full
                  border border-white/12
                  bg-white/[0.06]
                  backdrop-blur-xl
                  shadow-[0_18px_60px_rgba(0,0,0,0.45)]
                  transition
                  hover:scale-105 hover:border-white/22
                "
                aria-label="Close menu"
              >
                <span className="text-lg leading-none text-white">×</span>
              </button>
            </div>

            {/* Main grid */}
            <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 flex-1 items-start">
              {/* LEFT */}
              <div className="flex flex-col">
                <div className="mb-10">
                  <p
                    data-home-title
                    className="
                      text-4xl sm:text-5xl lg:text-6xl
                      font-semibold tracking-tight
                      text-white
                    "
                  >
                    <span className="font-[family-name:var(--font-redhat)]">
                      {homeLabel}
                    </span>
                  </p>

                  <div className="mt-5 h-px w-44 bg-gradient-to-r from-white/35 via-white/18 to-transparent shadow-[0_0_28px_rgba(255,255,255,0.10)]" />
                </div>

                <nav aria-label="Main navigation">
                  <ul className="space-y-3 sm:space-y-4">
                    {items.map((item) => (
                      <li
                        key={item.label}
                        data-nav-item
                        className="flex items-center gap-3"
                      >
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className="
                            group relative
                            inline-flex items-center gap-4
                            text-left
                            text-3xl sm:text-4xl lg:text-4xl
                            font-semibold tracking-tight
                            text-white/88
                            transition
                            hover:text-white
                          "
                        >
                          <span
                            className="
                              h-[2px] w-6
                              bg-white/18
                              transition-all duration-300
                              group-hover:w-10 group-hover:bg-white/65
                              shadow-[0_0_18px_rgba(255,255,255,0.14)]
                            "
                          />
                          <span className="transition-transform duration-300 group-hover:-translate-x-1">
                            {item.label}
                          </span>
                          <span
                            className="
                              pointer-events-none absolute -bottom-2 left-10
                              h-px w-0
                              bg-gradient-to-r from-white/35 via-white/18 to-transparent
                              transition-all duration-300
                              group-hover:w-[70%]
                            "
                          />
                        </button>

                        {item.badge && (
                          <span className="rounded-full bg-white/12 px-2.5 py-0.5 text-xs font-semibold text-white shadow-[0_0_18px_rgba(255,255,255,0.10)]">
                            {item.badge}
                          </span>
                        )}
                      </li>
                    ))}

                    {/* Theme toggle as a nav item */}
                    {/* <NavRow badge="Theme">
                      <div className="inline-flex items-center gap-3">
                        <span className="text-white/85">Mode</span>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          onMouseDown={(e) => e.stopPropagation()}
                          className="relative -translate-y-[1px]"
                        >
                          <ModeToggle />
                        </div>
                      </div>
                    </NavRow> */}
                  </ul>
                </nav>
              </div>

              {/* RIGHT (hidden on small, visible from lg and up) */}
              <aside
                data-right-panel
                className="
                  hidden lg:block
                  relative
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.05]
                  backdrop-blur-2xl
                  shadow-[0_22px_80px_rgba(0,0,0,0.65)]
                  overflow-hidden
                  max-h-[600px]
                "
              >
                <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-zinc-200/[0.05] blur-3xl" />

                <div
                  className="
                    max-h-full
                    pointer-events-none absolute inset-0 opacity-[0.18]
                    [background-image:
                      linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),
                      linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
                    [background-size:32px_32px]
                  "
                />

                <div className="relative p-6 md:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">
                        Operator Handle
                      </p>
                      <p
                        className="
                          font-mono text-sm md:text-base
                          text-transparent bg-clip-text
                          bg-gradient-to-r from-white via-zinc-200 to-white
                          drop-shadow-[0_0_18px_rgba(255,255,255,0.10)]
                        "
                      >
                        {handleTag}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.12)]" />
                      <span className="text-[10px] uppercase tracking-[0.24em] text-white/70">
                        online
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-1 gap-3">
                    <div
                      data-meta-item
                      className="
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.04]
                        backdrop-blur-xl
                        p-3
                      "
                    >
                      <p className="text-[10px] uppercase tracking-[0.26em] text-white/55">
                        Email
                      </p>
                      <a
                        href={`mailto:${email}`}
                        className="
                          mt-2 inline-flex items-center gap-2
                          font-mono text-sm md:text-base
                          text-white/90
                          hover:text-white
                          transition
                        "
                      >
                        <span className="text-white/55">↗</span>
                        {email}
                      </a>
                    </div>

                    <div
                      data-meta-item
                      className="
                        rounded-2xl
                        border border-white/10
                        bg-white/[0.04]
                        backdrop-blur-xl
                        p-4
                      "
                    >
                      <p className="text-[10px] uppercase tracking-[0.26em] text-white/55">
                        Numbers
                      </p>

                      <div className="mt-3 space-y-2">
                        {phones.map((p) => (
                          <a
                            key={`${p.label}-${p.value}`}
                            href={`tel:${p.value.replace(/\s+/g, "")}`}
                            className="
                              flex items-center justify-between gap-3
                              rounded-xl
                              border border-white/10
                              bg-white/[0.03]
                              px-3 py-1
                              font-mono text-sm
                              text-white/80
                              hover:text-white
                              hover:border-white/20
                              transition
                            "
                          >
                            <span className="text-[10px] uppercase tracking-[0.22em] text-white/55">
                              {p.label}
                            </span>
                            <span className="inline-flex items-center gap-2">
                              <span className="text-white/55">↗</span>
                              {p.value}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-[10px] uppercase tracking-[0.26em] text-white/55">
                      Social
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {socials.map((s) => (
                        <Link
                          key={s.label}
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Badge
                            variant={"outline"}
                            className="
                              cursor-pointer
                              border-white/15
                              text-white/80
                              hover:bg-white/10 hover:text-white
                              transition
                            "
                          >
                            {s.label}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant={"outline"}
                      onClick={handlePrimaryCta}
                      className="
                        mt-4 justify-center
                        !bg-white/90 hover:text-black
                        shimmer-btn
                        text-black
                        border-transparent
                        shadow-[0_18px_60px_rgba(0,0,0,0.35)]
                        hover:!shadow-[0_18px_70px_rgba(0,0,0,0.45)]
                      "
                    >
                      {primaryCtaLabel}
                    </Button>

                    <button
                      onClick={() => {
                        setOpen(false);
                        window.setTimeout(() => {
                          const footer =
                            document.querySelector("#contact") ||
                            document.querySelector("#footer");
                          if (footer) {
                            const anyWindow = window as any;
                            const lenis = anyWindow?.lenis;
                            if (lenis?.scrollTo)
                              lenis.scrollTo(footer, { offset: -40 });
                            else
                              footer.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          } else window.location.href = `mailto:${email}`;
                        }, 90);
                      }}
                      data-meta-item
                      className="
                        inline-flex items-center justify-center
                        rounded-2xl px-5 py-3
                        text-sm font-semibold
                        border border-white/18
                        bg-white/[0.06]
                        text-white/85
                        shadow-[0_0_22px_rgba(255,255,255,0.08)]
                        hover:bg-white/14 hover:text-white
                        transition
                      "
                    >
                      Contact
                    </button>
                  </div>

                  <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/55">
                    <span className="font-mono">UI: COMMAND_MENU</span>
                    <span>© {year} Algorim</span>
                  </div>
                </div>
              </aside>
            </div>

            <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.26em] text-white/45">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/55 shadow-[0_0_14px_rgba(255,255,255,0.10)]" />
                navigate · scroll · deploy
              </span>
              <span className="font-mono">ESC: close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernSideMenu;
