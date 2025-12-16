"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "./button";
import { Badge } from "./badge";
import Link from "next/link";

export interface NavItem {
  label: string;
  href: string; // "#services" etc, or "/page", or "https://..."
  badge?: string;
}

export interface SocialItem {
  label: string;
  href: string;
}

export interface PhoneItem {
  label: string; // e.g. "UAE", "ES"
  value: string; // e.g. "+971 50 000 0000"
}

interface ModernSideMenuProps {
  items: NavItem[];
  socials: SocialItem[];
  logoSrc?: string; // optional now, we can show it or skip
  logoAlt?: string;

  homeLabel?: string;
  showAlgorimWordmark?: boolean;

  // NEW: meta + contacts
  email?: string;
  phones?: PhoneItem[];

  // NEW: primary CTA button (bottom-right panel)
  primaryCtaLabel?: string;
  primaryCtaHref?: string; // mailto, https, #contact, etc
}

const ModernSideMenu: React.FC<ModernSideMenuProps> = ({
  items,
  socials,
  logoSrc,
  logoAlt = "Logo",
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

    const anyWindow = window as any;
    const lenis = anyWindow?.lenis;

    if (lenis?.scrollTo) {
      lenis.scrollTo(target, { offset: -40, duration: 1.1 });
    } else {
      const top =
        (target as HTMLElement).getBoundingClientRect().top +
        window.scrollY -
        40;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navigate = (href: string) => {
    if (isHash(href)) {
      window.setTimeout(() => scrollToHash(href), 90);
      return;
    }
    if (isExternal(href)) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    if (isMail(href) || isTel(href)) {
      window.location.href = href;
      return;
    }
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

  return (
    <>
      {/* Floating open button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="
            fixed top-6 right-6 z-40
            inline-flex items-center gap-2
            rounded-full
            border border-white/15
            bg-black/70
            px-4 py-2
            text-white
            backdrop-blur-xl
            shadow-[0_18px_70px_rgba(0,0,0,0.45)]
            transition
            hover:scale-[1.03] hover:border-orange-400/40
          "
          aria-label="Open menu"
        >
          <span
            className="
              text-[11px] uppercase tracking-[0.22em]
              text-white/90
            "
          >
            Menu
          </span>
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(249,115,22,0.8)]" />
        </button>
      )}

      {/* Fullscreen overlay menu */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 opacity-0 pointer-events-none"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Background: grid + orange atmosphere + vignette */}
        <div className="pointer-events-none absolute inset-0 bg-black">
          <div className="absolute -top-48 -left-52 h-[620px] w-[620px] rounded-full bg-orange-400/18 blur-[180px]" />
          <div className="absolute -bottom-60 -right-60 h-[720px] w-[720px] rounded-full bg-amber-300/14 blur-[200px]" />

          <div
            className="
              absolute inset-0 opacity-[0.28]
              [background-image:
                linear-gradient(to_right,rgba(249,115,22,0.14)_1px,transparent_1px),
                linear-gradient(to_bottom,rgba(249,115,22,0.12)_1px,transparent_1px)]
              [background-size:46px_46px]
            "
          />

          {/* subtle “scan” band */}
          <div className="absolute left-0 right-0 top-[18%] h-24 bg-gradient-to-r from-transparent via-orange-400/10 to-transparent blur-2xl opacity-70" />

          {/* vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/65 to-black" />
        </div>

        <div className="relative flex h-full w-full flex-col px-6 py-6 md:px-12 md:py-10 lg:px-16 lg:py-12 text-white">
          {/* Topbar */}
          <div data-topbar className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* {logoSrc ? (
                <img
                  src={logoSrc}
                  alt={logoAlt}
                  className="h-10 w-auto object-contain"
                />
              ) : null} */}

              {showAlgorimWordmark && (
                <div className="flex flex-col leading-none">
                  <span
                    className="
                      text-xl md:text-2xl
                      font-[family-name:var(--font-revamped)]
                      tracking-tight
                      text-transparent bg-clip-text
                      bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400
                      drop-shadow-[0_0_16px_rgba(249,115,22,0.55)]
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

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              className="
                flex h-11 w-11 items-center justify-center
                rounded-full
                border border-white/20
                bg-white/10
                backdrop-blur-xl
                shadow-[0_18px_60px_rgba(0,0,0,0.35)]
                transition
                hover:scale-105 hover:border-orange-400/40
              "
              aria-label="Close menu"
            >
              <span className="text-lg leading-none text-white">×</span>
            </button>
          </div>

          {/* Main grid */}
          <div className="mt-10 h-fit md:mt-14 grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 lg:gap-12 flex-1 items-start">
            {/* LEFT: Nav */}
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

                {/* micro line */}
                <div className="mt-5 h-px w-44 bg-gradient-to-r from-orange-400/60 via-amber-300/40 to-transparent shadow-[0_0_20px_rgba(249,115,22,0.35)]" />
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
                          text-white/90
                          transition
                          hover:text-white
                        "
                      >
                        {/* left “cursor” */}
                        <span
                          className="
                            h-[2px] w-6
                            bg-white/20
                            transition-all duration-300
                            group-hover:w-10 group-hover:bg-orange-400/80
                            shadow-[0_0_18px_rgba(249,115,22,0.4)]
                          "
                        />

                        <span className="transition-transform duration-300 group-hover:-translate-x-1">
                          {item.label}
                        </span>

                        {/* subtle hover underline */}
                        <span
                          className="
                            pointer-events-none absolute -bottom-2 left-10
                            h-px w-0
                            bg-gradient-to-r from-orange-400/70 via-amber-300/40 to-transparent
                            transition-all duration-300
                            group-hover:w-[70%]
                          "
                        />
                      </button>

                      {item.badge && (
                        <span
                          className="
                            rounded-full
                            bg-orange-400
                            px-2.5 py-0.5
                            text-xs font-semibold text-black
                            shadow-[0_0_18px_rgba(249,115,22,0.45)]
                          "
                        >
                          {item.badge}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* RIGHT: Info panel */}
            <aside
              data-right-panel
              className="
                relative
                rounded-3xl
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-2xl
                shadow-[0_22px_80px_rgba(0,0,0,0.55)]
                overflow-hidden
                max-h-[600px]
              "
            >
              {/* inner glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-orange-400/14 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-amber-300/10 blur-3xl" />

              {/* micro grid */}
              <div
                className="
                max-h-full
                  pointer-events-none absolute inset-0 opacity-[0.20]
                  [background-image:
                    linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),
                    linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]
                  [background-size:32px_32px]
                "
              />

              <div className="relative p-6 md:p-7">
                {/* Handle + status */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/60">
                      Operator Handle
                    </p>
                    <p
                      className="
                        font-mono text-sm md:text-base
                        text-transparent bg-clip-text
                        bg-gradient-to-r from-orange-300 via-amber-300 to-orange-400
                        drop-shadow-[0_0_16px_rgba(249,115,22,0.55)]
                      "
                    >
                      {handleTag}
                    </p>
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_16px_rgba(249,115,22,0.75)]" />
                    <span className="text-[10px] uppercase tracking-[0.24em] text-orange-200/90">
                      online
                    </span>
                  </div>
                </div>

                {/* Contact block */}
                <div className="mt-2 grid grid-cols-1 gap-3">
                  <div
                    data-meta-item
                    className="
                      rounded-2xl
                      border border-white/10
                      bg-black/20
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
                        text-white/90 hover:text-white
                        transition
                      "
                    >
                      <span className="text-orange-300/80">↗</span>
                      {email}
                    </a>
                  </div>

                  <div
                    data-meta-item
                    className="
                      rounded-2xl
                      border border-white/10
                      bg-black/20
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
                            text-white/85
                            hover:text-white
                            hover:border-orange-400/25
                            transition
                          "
                        >
                          <span className="text-[10px] uppercase tracking-[0.22em] text-white/60">
                            {p.label}
                          </span>
                          <span className="inline-flex items-center gap-2">
                            <span className="text-orange-300/80">↗</span>
                            {p.value}
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Socials */}
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
                          key={s.label}
                          variant={"outline"}
                          className=" cursor-pointer hover:bg-orange-400/20 hover:text-orange-300 transition"
                        >
                          {s.label}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* CTA row */}
                <div className=" flex flex-col sm:flex-row gap-3">
                  <Button
                    variant={"outline"}
                    onClick={handlePrimaryCta}
                    className=" mt-4 justify-center !bg-orange-400/90 hover:!bg-orange-400 shadow-[0_0_22px_rgba(249,115,22,0.25)] hover:!shadow-[0_0_32px_rgba(249,115,22,0.45)] text-white"
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
                        } else {
                          window.location.href = `mailto:${email}`;
                        }
                      }, 90);
                    }}
                    data-meta-item
                    className="
                      inline-flex items-center justify-center
                      rounded-2xl px-5 py-3
                      text-sm font-semibold
                      border border-orange-400/30
                      bg-orange-500/10
                      text-orange-200
                      shadow-[0_0_22px_rgba(249,115,22,0.18)]
                      hover:bg-orange-400 hover:text-black
                      transition
                    "
                  >
                    Contact
                  </button>
                </div>

                {/* Footer micro copy */}
                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] text-white/55">
                  <span className="font-mono">UI: COMMAND_MENU</span>
                  <span>© {year} Algorim</span>
                </div>
              </div>
            </aside>
          </div>

          {/* Bottom hint (optional, super subtle) */}
          <div className="mt-8 flex items-center justify-between text-[10px] uppercase tracking-[0.26em] text-white/45">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400/70 shadow-[0_0_14px_rgba(249,115,22,0.6)]" />
              navigate · scroll · deploy
            </span>
            <span className="font-mono">ESC: close</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModernSideMenu;
